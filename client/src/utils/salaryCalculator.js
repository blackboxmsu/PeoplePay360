// PeoplePay360 Salary Calculation Engine
// Complies with A5 & A6: Structured, sequenced rule evaluation supporting
// Fixed Amounts, Percentages, and Formulas with category grouping.

export function evaluateSalaryRules(wage, rules = [], workedDays = 22, totalPeriodDays = 22) {
  const sortedRules = [...rules].sort((a, b) => (a.sequence || 0) - (b.sequence || 0));
  
  // Evaluation context holds computed amounts for referencing in later rules
  const context = {
    WAGE: Number(wage) || 0,
    BASIC: 0,
    WORKED_DAYS: workedDays,
    TOTAL_DAYS: totalPeriodDays,
    RATIO: totalPeriodDays > 0 ? (workedDays / totalPeriodDays) : 1
  };

  const lines = [];

  for (const rule of sortedRules) {
    let amount = 0;
    const compType = rule.computation || 'Fixed Amount';

    if (compType === 'Fixed Amount') {
      amount = Number(rule.fixedAmount) || 0;
    } else if (compType === 'Percentage of Wage') {
      const pct = Number(rule.percentage) || 0;
      amount = (context.WAGE * pct) / 100;
    } else if (compType === 'Percentage of Basic') {
      const pct = Number(rule.percentage) || 0;
      amount = (context.BASIC * pct) / 100;
    } else if (compType === 'Formula') {
      amount = evaluateFormula(rule.formula, context);
    } else {
      // Fallback
      amount = Number(rule.fixedAmount) || 0;
    }

    // Round to 2 decimals or whole rupee
    amount = Math.round(amount);

    // Save into evaluation context by rule code
    if (rule.code) {
      context[rule.code] = amount;
    }

    lines.push({
      ruleId: rule.id || rule.code,
      ruleName: rule.name,
      code: rule.code,
      category: rule.category,
      sequence: rule.sequence,
      amount,
      formattedAmount: `${rule.category === 'Deduction' ? '-' : ''}₹${Math.abs(amount).toLocaleString('en-IN')}`,
      computation: compType,
      formula: rule.formula || ''
    });
  }

  // Derive summary totals by category
  const basicLine = lines.find((l) => l.category === 'Basic');
  const grossLine = lines.find((l) => l.category === 'Gross');
  const netLine = lines.find((l) => l.category === 'Net');

  const basicTotal = basicLine ? basicLine.amount : context.BASIC;
  const allowancesTotal = lines
    .filter((l) => l.category === 'Allowance')
    .reduce((sum, l) => sum + l.amount, 0);

  const deductionsTotal = lines
    .filter((l) => l.category === 'Deduction')
    .reduce((sum, l) => sum + Math.abs(l.amount), 0);

  const grossTotal = grossLine ? grossLine.amount : (basicTotal + allowancesTotal);
  const netTotal = netLine ? netLine.amount : (grossTotal - deductionsTotal);

  return {
    lines,
    context,
    summary: {
      basic: basicTotal,
      allowances: allowancesTotal,
      deductions: deductionsTotal,
      gross: grossTotal,
      net: netTotal,
      formattedBasic: `₹${basicTotal.toLocaleString('en-IN')}`,
      formattedGross: `₹${grossTotal.toLocaleString('en-IN')}`,
      formattedNet: `₹${netTotal.toLocaleString('en-IN')}`,
      formattedDeductions: `₹${deductionsTotal.toLocaleString('en-IN')}`
    }
  };
}

/**
 * Safe arithmetic expression evaluator for salary rules
 * Handles symbols present in context like BASIC + HRA + STD or GROSS - PF - PT
 */
function evaluateFormula(formulaStr, context) {
  if (!formulaStr || typeof formulaStr !== 'string') return 0;

  try {
    let sanitized = formulaStr.trim();
    // Replace tokens in reverse length order to avoid substring collisions
    const tokens = Object.keys(context).sort((a, b) => b.length - a.length);

    for (const token of tokens) {
      const regex = new RegExp(`\\b${token}\\b`, 'g');
      sanitized = sanitized.replace(regex, String(context[token]));
    }

    // Only allow numbers, whitespace, and basic arithmetic symbols (+, -, *, /, (, ), .)
    if (!/^[0-9+\-*/().\s]+$/.test(sanitized)) {
      console.warn('Disallowed characters in formula:', formulaStr);
      return 0;
    }

    // Use Function constructor in isolated scope
    const result = new Function(`return (${sanitized});`)();
    return typeof result === 'number' && !isNaN(result) ? result : 0;
  } catch (err) {
    console.error(`Error evaluating formula: ${formulaStr}`, err);
    return 0;
  }
}
