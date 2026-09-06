import nodemailer from 'nodemailer';

let transporterPromise = null;

const getTransporter = async () => {
  if (transporterPromise) return transporterPromise;

  transporterPromise = (async () => {
    const host = process.env.SMTP_HOST || 'smtp.ethereal.email';
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (user && pass) {
      console.log(`[Mailer] Initializing SMTP transporter with host: ${host}:${port}`);
      return nodemailer.createTransport({
        host,
        port,
        secure: process.env.SMTP_SECURE === 'true' || port === 465,
        auth: { user, pass }
      });
    }

    // Dev/Fallback: Create an automated Ethereal test inbox so emails are testable without real SMTP
    console.log('[Mailer] No live SMTP credentials found in .env. Creating Ethereal testing account...');
    try {
      const testAccount = await nodemailer.createTestAccount();
      console.log(`[Mailer] Ethereal test account ready: ${testAccount.user}`);
      return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    } catch (err) {
      console.warn('[Mailer] Could not create Ethereal account, using console-fallback transporter:', err.message);
      // Mock transporter that logs to console
      return {
        sendMail: async (options) => {
          console.log('\n=================== [SIMULATED EMAIL DISPATCH] ===================');
          console.log(`TO: ${options.to}`);
          console.log(`SUBJECT: ${options.subject}`);
          console.log(`TEXT PREVIEW:\n${options.text}`);
          console.log('==================================================================\n');
          return { messageId: `simulated-${Date.now()}` };
        }
      };
    }
  })();

  return transporterPromise;
};

const ROLE_LABELS = {
  employee: 'Employee (Self-Service)',
  hr_manager: 'HR Manager',
  hr_payroll_user: 'HR Payroll User',
  hr_payroll_manager: 'HR Payroll Manager',
  admin: 'System Administrator'
};

export const sendCredentialsEmail = async ({ to, name, email, password, role, loginUrl = 'http://localhost:5173/login' }) => {
  try {
    const transporter = await getTransporter();
    const from = process.env.EMAIL_FROM || '"PeoplePay360 HR" <no-reply@peoplepay360.com>';
    const roleTitle = ROLE_LABELS[role] || role;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; margin: 0; padding: 24px; color: #1E293B; }
          .container { max-width: 560px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: linear-gradient(135deg, #059669 0%, #10B981 100%); padding: 28px; text-align: center; color: #FFFFFF; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
          .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; }
          .content { padding: 32px 28px; }
          .greeting { font-size: 16px; font-weight: 700; margin-bottom: 12px; }
          .info-text { font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 24px; }
          .credentials-box { background: #F1F5F9; border: 1px solid #CBD5E1; border-radius: 8px; padding: 18px 20px; margin-bottom: 24px; }
          .cred-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #E2E8F0; font-size: 13px; }
          .cred-row:last-child { border-bottom: none; }
          .cred-label { color: #64748B; font-weight: 600; }
          .cred-value { font-weight: 700; color: #0F172A; font-family: 'Courier New', Courier, monospace; }
          .role-badge { display: inline-block; background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 700; }
          .btn-container { text-align: center; margin: 28px 0; }
          .btn { background: #059669; color: #FFFFFF !important; text-decoration: none; padding: 12px 28px; border-radius: 6px; font-weight: 700; font-size: 14px; display: inline-block; }
          .footer { background: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 16px 28px; font-size: 12px; color: #94A3B8; text-align: center; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>PeoplePay360</h1>
            <p>HR & Payroll Operations Suite</p>
          </div>
          <div class="content">
            <div class="greeting">Welcome to the Team, ${name}!</div>
            <p class="info-text">
              An account has been created for you by the HR Department. You have been granted access with the following assigned role:
            </p>
            <div style="margin-bottom: 20px;">
              <span class="role-badge">${roleTitle}</span>
            </div>

            <div class="credentials-box">
              <div class="cred-row">
                <span class="cred-label">Login Email:</span>
                <span class="cred-value">${email}</span>
              </div>
              <div class="cred-row">
                <span class="cred-label">Temporary Password:</span>
                <span class="cred-value">${password}</span>
              </div>
              <div class="cred-row">
                <span class="cred-label">Assigned Role:</span>
                <span class="cred-value">${role}</span>
              </div>
            </div>

            <div class="btn-container">
              <a href="${loginUrl}" class="btn">Sign In to PeoplePay360</a>
            </div>

            <p style="font-size: 12px; color: #64748B; line-height: 1.5;">
              Security Notice: This is an automated message. Please keep your credentials confidential and change your password upon initial sign-in.
            </p>
          </div>
          <div class="footer">
            © ${new Date().getFullYear()} PeoplePay360 Operations • All rights reserved.<br>
            Strict Role-Based Access Enforcement Enabled.
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
Welcome to PeoplePay360, ${name}!

An account has been provisioned for you by the HR Department.

Your Account Credentials:
- Work Email: ${email}
- Temporary Password: ${password}
- Assigned Role: ${roleTitle} (${role})
- Login URL: ${loginUrl}

Please sign in and change your password upon your first session.
    `.trim();

    const info = await transporter.sendMail({
      from,
      to,
      subject: `Your PeoplePay360 Account Credentials (${roleTitle})`,
      text: textContent,
      html: htmlContent
    });

    let previewUrl = null;
    if (nodemailer.getTestMessageUrl) {
      previewUrl = nodemailer.getTestMessageUrl(info);
      if (previewUrl) {
        console.log(`[Mailer] 📧 Nodemailer preview URL: ${previewUrl}`);
      }
    }

    console.log(`[Mailer] Email sent successfully to ${to}, Message ID: ${info.messageId}`);
    return {
      success: true,
      messageId: info.messageId,
      previewUrl: previewUrl || null
    };
  } catch (error) {
    console.error('[Mailer Error] Failed to send credentials email:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Send Password Reset OTP verification email
 */
export const sendOTPEmail = async ({ to, name, otp }) => {
  try {
    const transporter = await getTransporter();
    const from = process.env.EMAIL_FROM || '"PeoplePay360 Security" <no-reply@peoplepay360.com>';

    console.log(`\n=================== [PASSWORD RESET OTP] ===================`);
    console.log(`TO:   ${to} (${name})`);
    console.log(`CODE: ${otp}`);
    console.log(`EXP:  10 minutes`);
    console.log(`============================================================\n`);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; margin: 0; padding: 24px; color: #1E293B; }
          .container { max-width: 520px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .header { background: linear-gradient(135deg, #059669 0%, #10B981 100%); padding: 28px 24px; text-align: center; color: #FFFFFF; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
          .header p { margin: 6px 0 0 0; font-size: 13px; opacity: 0.9; }
          .content { padding: 32px 28px; }
          .greeting { font-size: 16px; font-weight: 700; margin-bottom: 12px; color: #0F172A; }
          .info-text { font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 24px; }
          .otp-box { background: #ECFDF5; border: 2px dashed #059669; border-radius: 10px; padding: 20px; text-align: center; margin: 24px 0; }
          .otp-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 700; color: #047857; margin-bottom: 8px; }
          .otp-code { font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #065F46; font-family: 'Courier New', Courier, monospace; }
          .expiry-note { font-size: 12px; color: #64748B; margin-top: 8px; }
          .warning-text { font-size: 12px; color: #94A3B8; line-height: 1.5; border-top: 1px solid #E2E8F0; padding-top: 16px; margin-top: 24px; }
          .footer { background: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 16px 28px; font-size: 12px; color: #94A3B8; text-align: center; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>PeoplePay360</h1>
            <p>Identity & Security Verification</p>
          </div>
          <div class="content">
            <div class="greeting">Hello ${name || 'User'},</div>
            <p class="info-text">
              We received a request to reset the password for your PeoplePay360 account (<strong>${to}</strong>).
              Please use the verification code below to complete your password change:
            </p>

            <div class="otp-box">
              <div class="otp-label">Verification Code (OTP)</div>
              <div class="otp-code">${otp}</div>
              <div class="expiry-note">⏱ Valid for 10 minutes</div>
            </div>

            <p class="warning-text">
              <strong>Security Warning:</strong> Never share this code with anyone. PeoplePay360 support staff will never ask for your verification code.
              If you did not initiate this request, you can safely disregard this email.
            </p>
          </div>
          <div class="footer">
            © ${new Date().getFullYear()} PeoplePay360 Operations • All rights reserved.<br>
            Secure Multi-Factor Authentication Gateway
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
PeoplePay360 - Password Reset Verification Code

Hello ${name || 'User'},

We received a request to reset your password.
Your 6-digit verification code is:

${otp}

This code is valid for 10 minutes.
If you did not request this password reset, please ignore this email.
    `.trim();

    const info = await transporter.sendMail({
      from,
      to,
      subject: `${otp} is your PeoplePay360 password reset code`,
      text: textContent,
      html: htmlContent
    });

    console.log(`[Mailer] OTP email dispatched to ${to}, Message ID: ${info.messageId}`);
    return {
      success: true,
      messageId: info.messageId
    };
  } catch (error) {
    console.error('[Mailer Error] Failed to send OTP email:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

