import jsPDF from 'jspdf';

export function downloadPayslipPDF(payslip, companyInfo = {}) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 16;
  let y = 20;

  // Colors
  const primaryGreen = [5, 150, 105]; // #059669
  const darkNavy = [15, 23, 42];     // #0F172A
  const slateMuted = [100, 116, 139]; // #64748B
  const lightBg = [248, 250, 252];   // #F8FAFC
  const borderGray = [226, 232, 240];

  // Header Box
  doc.setFillColor(...lightBg);
  doc.roundedRect(margin, margin, pageWidth - (margin * 2), 32, 3, 3, 'F');
  doc.setDrawColor(...primaryGreen);
  doc.setLineWidth(0.8);
  doc.line(margin, margin, margin, margin + 32);

  // Company Name & Info
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...primaryGreen);
  doc.text('PeoplePay360', margin + 6, y + 2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...slateMuted);
  doc.text('OxP Pvt Ltd • HR & Payroll Operations Suite', margin + 6, y + 8);
  doc.text('CIN: U72200MH2026PTC123456 | GSTIN: 27AABCU9603R1ZM', margin + 6, y + 13);
  doc.text('Bandra Kurla Complex, Mumbai, Maharashtra, 400051', margin + 6, y + 18);

  // Payslip Title & Period Badge (Right aligned)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...darkNavy);
  doc.text('SALARY PAYSLIP', pageWidth - margin - 6, y + 2, { align: 'right' });

  doc.setFontSize(9);
  doc.setTextColor(...primaryGreen);
  doc.text(`Pay Period: ${payslip.period || 'February 2026'}`, pageWidth - margin - 6, y + 9, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...slateMuted);
  doc.text(`Status: ${payslip.status || 'Paid'}`, pageWidth - margin - 6, y + 15, { align: 'right' });

  y += 38;

  // Employee Information Section
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...borderGray);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 28, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...slateMuted);

  const col1 = margin + 6;
  const col2 = margin + 52;
  const col3 = margin + 105;
  const col4 = margin + 148;

  // Row 1
  doc.text('Employee Name:', col1, y + 8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkNavy);
  doc.text(payslip.employeeName || 'Parth Solanki', col2, y + 8);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...slateMuted);
  doc.text('Payrun Batch:', col3, y + 8);
  doc.setTextColor(...darkNavy);
  doc.text(payslip.payrunName || 'February 2026', col4, y + 8);

  // Row 2
  doc.setTextColor(...slateMuted);
  doc.text('Designation:', col1, y + 16);
  doc.setTextColor(...darkNavy);
  doc.text(payslip.jobPosition || 'Employee Specialist', col2, y + 16);

  doc.setTextColor(...slateMuted);
  doc.text('Worked Days:', col3, y + 16);
  doc.setTextColor(...darkNavy);
  doc.text(`${payslip.workedDays || 22} Days`, col4, y + 16);

  // Row 3
  doc.setTextColor(...slateMuted);
  doc.text('Salary Structure:', col1, y + 24);
  doc.setTextColor(...darkNavy);
  doc.text(payslip.structure || 'Regular Salary', col2, y + 24);

  doc.setTextColor(...slateMuted);
  doc.text('Payment Status:', col3, y + 24);
  doc.setTextColor(...primaryGreen);
  doc.text(payslip.status || 'Paid', col4, y + 24);

  y += 36;

  // Table Header
  doc.setFillColor(...primaryGreen);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 8, 1, 1, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('Salary Component / Rule', margin + 6, y + 5.5);
  doc.text('Rule Code', margin + 85, y + 5.5);
  doc.text('Category', margin + 120, y + 5.5);
  doc.text('Amount (INR)', pageWidth - margin - 6, y + 5.5, { align: 'right' });

  y += 10;

  // Earnings & Deductions lines
  const lines = payslip.lines || [
    { rule: 'Basic Salary', category: 'Basic', amount: payslip.basic || '₹45,000', code: 'BASIC' },
    { rule: 'House Rent Allowance', category: 'Allowance', amount: '₹18,000', code: 'HRA' },
    { rule: 'Standard Allowance', category: 'Allowance', amount: '₹9,000', code: 'STD' },
    { rule: 'Gross Salary', category: 'Gross', amount: payslip.gross || '₹72,000', code: 'GROSS' },
    { rule: 'Provident Fund (12%)', category: 'Deduction', amount: '-₹3,000', code: 'PF' },
    { rule: 'Professional Tax', category: 'Deduction', amount: '-₹3,000', code: 'PT' },
    { rule: 'Net Salary', category: 'Net', amount: payslip.net || '₹66,000', code: 'NET' }
  ];

  lines.forEach((line, index) => {
    const isEven = index % 2 === 0;
    const isNet = line.category === 'Net';
    const isGross = line.category === 'Gross';

    if (isNet) {
      doc.setFillColor(220, 252, 231); // light green
      doc.rect(margin, y - 2, pageWidth - (margin * 2), 9, 'F');
    } else if (isEven) {
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, y - 2, pageWidth - (margin * 2), 8, 'F');
    }

    doc.setFont('helvetica', isNet || isGross ? 'bold' : 'normal');
    doc.setFontSize(8.5);

    if (isNet) {
      doc.setTextColor(6, 78, 59); // dark green
    } else {
      doc.setTextColor(...darkNavy);
    }

    doc.text(line.rule, margin + 6, y + 3.5);

    doc.setFont('courier', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...slateMuted);
    doc.text(line.code, margin + 85, y + 3.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(
      line.category === 'Deduction' ? 185 : 5,
      line.category === 'Deduction' ? 28 : 150,
      line.category === 'Deduction' ? 28 : 105
    );
    doc.text(line.category, margin + 120, y + 3.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(
      isNet ? primaryGreen[0] : (line.category === 'Deduction' ? 185 : darkNavy[0]),
      isNet ? primaryGreen[1] : (line.category === 'Deduction' ? 28 : darkNavy[1]),
      isNet ? primaryGreen[2] : (line.category === 'Deduction' ? 28 : darkNavy[2])
    );
    doc.text(line.amount, pageWidth - margin - 6, y + 3.5, { align: 'right' });

    y += isNet ? 10 : 8;
  });

  // Net Salary Summary Box
  y += 6;
  doc.setFillColor(...lightBg);
  doc.setDrawColor(...primaryGreen);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 22, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...slateMuted);
  doc.text('TOTAL NET SALARY DISBURSED', margin + 6, y + 8);

  doc.setFontSize(16);
  doc.setTextColor(...primaryGreen);
  doc.text(payslip.net || '₹66,000', margin + 6, y + 17);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...slateMuted);
  doc.text('Direct Deposit to Bank Account ending in ****4321', pageWidth - margin - 6, y + 10, { align: 'right' });
  doc.text('Confidential Document • Generated automatically by PeoplePay360', pageWidth - margin - 6, y + 16, { align: 'right' });

  // Signatures Section
  y += 34;
  doc.setDrawColor(...borderGray);
  doc.setLineWidth(0.4);
  doc.line(margin + 10, y + 12, margin + 65, y + 12);
  doc.line(pageWidth - margin - 65, y + 12, pageWidth - margin - 10, y + 12);

  doc.setFontSize(8);
  doc.setTextColor(...slateMuted);
  doc.text('Employee Signature', margin + 22, y + 17);
  doc.text('Authorized Signatory (HR / Payroll)', pageWidth - margin - 60, y + 17);

  // Footer note
  y += 24;
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(
    'This is a computer-generated payslip and does not require a physical stamp. For queries, contact hr@oxp.com.',
    pageWidth / 2,
    y,
    { align: 'center' }
  );

  // Save file with dynamic name
  const safeName = (payslip.employeeName || 'Employee').replace(/\s+/g, '_');
  const safePeriod = (payslip.period || 'Current').replace(/[\s—]+/g, '_');
  doc.save(`Payslip_${safeName}_${safePeriod}.pdf`);
}
