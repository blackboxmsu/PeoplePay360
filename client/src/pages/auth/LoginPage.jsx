import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth, DEMO_CREDENTIALS } from '../../context/AuthContext';
import {
  Shield,
  Lock,
  Mail,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  X,
  Sparkles,
  Eye,
  EyeOff,
  KeyRound,
  RotateCcw,
  Check,
  Clock
} from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, quickDemoLogin, sendResetOTP, resetPasswordWithOTP, authError, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('admin@peoplepay360.com');
  const [password, setPassword] = useState('Demo@123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // OTP Forgot password modal states
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState('email'); // 'email' | 'verify' | 'success'
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState(null);
  const [forgotNotice, setForgotNotice] = useState(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  const from = location.state?.from?.pathname || '/';

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Resend OTP countdown timer
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message || 'Invalid email or password');
    }
  };

  const handleSelectDemo = async (demoEmail) => {
    setEmail(demoEmail);
    setPassword('Demo@123');
    setError(null);
    setLoading(true);

    const result = await quickDemoLogin(demoEmail);
    setLoading(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.message || 'Quick login failed');
    }
  };

  const handleOpenForgotModal = () => {
    setForgotEmail(email || '');
    setForgotOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setForgotError(null);
    setForgotNotice(null);
    setForgotStep('email');
    setForgotModalOpen(true);
  };

  const handleRequestOtp = async (e) => {
    if (e) e.preventDefault();
    if (!forgotEmail.trim()) {
      setForgotError('Please enter your work email address');
      return;
    }
    setForgotError(null);
    setForgotNotice(null);
    setForgotLoading(true);

    try {
      const res = await sendResetOTP(forgotEmail.trim());
      setForgotLoading(false);
      setForgotNotice(res?.message || `A 6-digit OTP code has been sent to your email (${forgotEmail.trim()}). Please check your inbox.`);
      setForgotStep('verify');
      setResendCooldown(60);
    } catch (err) {
      setForgotLoading(false);
      setForgotError(err.message || 'Failed to send OTP code. Please verify your email.');
    }
  };

  const handleResetWithOtp = async (e) => {
    e.preventDefault();
    setForgotError(null);

    const cleanOtp = forgotOtp.trim();
    if (cleanOtp.length !== 6) {
      setForgotError('Please enter a valid 6-digit OTP code.');
      return;
    }

    if (newPassword.length < 6) {
      setForgotError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setForgotError('Passwords do not match. Please re-enter.');
      return;
    }

    setForgotLoading(true);

    try {
      await resetPasswordWithOTP(forgotEmail.trim(), cleanOtp, newPassword);
      setForgotLoading(false);
      setForgotStep('success');
    } catch (err) {
      setForgotLoading(false);
      setForgotError(err.message || 'Failed to reset password. Please check your OTP.');
    }
  };

  const handleReturnToLogin = () => {
    setEmail(forgotEmail);
    if (newPassword) {
      setPassword(newPassword);
    }
    setForgotModalOpen(false);
    setForgotStep('email');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-app)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
        <div style={{
          width: '38px',
          height: '38px',
          background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
          color: 'white',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: '1.2rem',
          boxShadow: '0 4px 10px rgba(5, 150, 105, 0.25)'
        }}>
          P
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            PeoplePay360
          </span>
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            HR & Payroll Operations Platform
          </span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="odoo-form-card" style={{ width: '100%', maxWidth: '480px', padding: '36px' }}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            HR Portal
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
            Welcome back
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Sign in to continue to your workspace.
          </p>
        </div>

        {/* Error banner */}
        {(error || authError) && (
          <div style={{
            backgroundColor: 'var(--status-danger-bg)',
            border: '1px solid var(--status-danger-border)',
            color: 'var(--status-danger-text)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '18px'
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error || authError}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="field-group">
            <label className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} style={{ color: '#059669' }} />
              <span>Work Email</span>
            </label>
            <input
              type="email"
              className="field-input"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field-group">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={14} style={{ color: '#059669' }} />
                <span>Password</span>
              </label>
              <button
                type="button"
                onClick={handleOpenForgotModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.78rem',
                  color: '#059669',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                Forgot password?
              </button>
            </div>
            <input
              type="password"
              className="field-input"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-action-primary"
            style={{
              padding: '11px',
              justifyContent: 'center',
              fontSize: '0.925rem',
              fontWeight: 700,
              marginTop: '4px'
            }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
            <ArrowRight size={16} />
          </button>
        </form>

        {/* 5 Demo Accounts / Seed Users Section (Restored) */}
        <div style={{
          marginTop: '24px',
          paddingTop: '18px',
          borderTop: '1px dashed var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={13} style={{ color: '#059669' }} />
              <span>Demo Seed Accounts (5 Roles)</span>
            </span>
            <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600 }}>
              Password: Demo@123
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {DEMO_CREDENTIALS.map((demo) => (
              <button
                key={demo.role}
                type="button"
                onClick={() => handleSelectDemo(demo.email)}
                disabled={loading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  backgroundColor: email === demo.email ? 'var(--bg-green-soft)' : '#FFFFFF',
                  border: `1px solid ${email === demo.email ? 'var(--border-green)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.12s ease'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {demo.roleLabel} <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>({demo.name})</span>
                  </div>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                    {demo.email} • {demo.desc}
                  </div>
                </div>
                <span className="status-pill active" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                  Select
                </span>
              </button>
            ))}
          </div>
        </div>

        <div style={{
          marginTop: '20px',
          paddingTop: '14px',
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Accounts are managed by the administrator. Access is role-protected.
          </p>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            After sign-in, show only the modules and actions allowed by the user's assigned role.
          </p>
        </div>
      </div>

      {/* OTP-Based Forgot Password & Reset Modal */}
      {forgotModalOpen && (
        <div className="modal-overlay" style={{ backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog" style={{ maxWidth: '440px', width: '100%', borderRadius: '14px', overflow: 'hidden' }}>
            
            {/* Header */}
            <div className="modal-header" style={{ borderBottom: '1px solid var(--border-subtle)', padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#ECFDF5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <KeyRound size={17} />
                </div>
                <div>
                  <h3 className="modal-title" style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>
                    {forgotStep === 'email' && 'Forgot Password'}
                    {forgotStep === 'verify' && 'Verify OTP & Reset Password'}
                    {forgotStep === 'success' && 'Password Updated'}
                  </h3>
                  <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                    {forgotStep === 'email' && 'Step 1 of 2: Request verification OTP'}
                    {forgotStep === 'verify' && 'Step 2 of 2: Enter OTP & new password'}
                    {forgotStep === 'success' && 'Operation Complete'}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setForgotModalOpen(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94A3B8', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Step Progression Bar */}
            {forgotStep !== 'success' && (
              <div style={{ display: 'flex', height: '3px', backgroundColor: '#F1F5F9' }}>
                <div style={{
                  width: forgotStep === 'email' ? '50%' : '100%',
                  backgroundColor: '#059669',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            )}

            {/* Error banner inside modal */}
            {forgotError && (
              <div style={{
                margin: '16px 20px 0 20px',
                backgroundColor: 'var(--status-danger-bg)',
                border: '1px solid var(--status-danger-border)',
                color: 'var(--status-danger-text)',
                borderRadius: '8px',
                padding: '10px 12px',
                fontSize: '0.825rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px'
              }}>
                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{forgotError}</span>
              </div>
            )}

            {/* Notice banner inside modal */}
            {forgotNotice && forgotStep === 'verify' && (
              <div style={{
                margin: '16px 20px 0 20px',
                backgroundColor: '#ECFDF5',
                border: '1px solid #A7F3D0',
                color: '#065F46',
                borderRadius: '8px',
                padding: '10px 12px',
                fontSize: '0.825rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px'
              }}>
                <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '2px', color: '#059669' }} />
                <div>
                  <div style={{ fontWeight: 600 }}>OTP Sent Successfully</div>
                  <div style={{ fontSize: '0.78rem', marginTop: '2px' }}>{forgotNotice}</div>
                </div>
              </div>
            )}

            {/* STEP 1: Enter Email to receive OTP */}
            {forgotStep === 'email' && (
              <form onSubmit={handleRequestOtp}>
                <div className="modal-body" style={{ padding: '20px' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
                    Enter your registered work email address. We will immediately dispatch a <strong>6-digit OTP verification code</strong> to verify your identity.
                  </p>

                  <div className="field-group">
                    <label className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Mail size={14} style={{ color: '#059669' }} />
                      <span>Registered Work Email</span>
                    </label>
                    <input
                      type="email"
                      className="field-input"
                      placeholder="e.g. employee@peoplepay360.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>

                  <div style={{
                    marginTop: '12px',
                    padding: '10px 12px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    color: '#64748B'
                  }}>
                    💡 The OTP is valid for <strong>10 minutes</strong>. No reset link will be sent; authentication is verified using the numeric code.
                  </div>
                </div>

                <div className="modal-footer" style={{ padding: '14px 20px', borderTop: '1px solid var(--border-subtle)' }}>
                  <button
                    type="button"
                    className="btn-status-action"
                    onClick={() => setForgotModalOpen(false)}
                    disabled={forgotLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-action-primary"
                    disabled={forgotLoading || !forgotEmail.trim()}
                    style={{ minWidth: '150px', justifyContent: 'center' }}
                  >
                    {forgotLoading ? (
                      <>
                        <Clock size={15} className="animate-spin" />
                        <span>Sending OTP...</span>
                      </>
                    ) : (
                      <>
                        <span>Send 6-Digit OTP</span>
                        <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Enter OTP and New Password */}
            {forgotStep === 'verify' && (
              <form onSubmit={handleResetWithOtp}>
                <div className="modal-body" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  {/* Email confirmation info */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748B' }}>
                    <span>
                      Target: <strong>{forgotEmail}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setForgotStep('email');
                        setForgotError(null);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#059669',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      Change Email
                    </button>
                  </div>

                  {/* Email Inbox Notice (No OTP shown on webpage) */}
                  <div
                    style={{
                      padding: '10px 14px',
                      backgroundColor: '#F0FDF4',
                      border: '1px solid #BBF7D0',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      color: '#166534',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      lineHeight: 1.4
                    }}
                  >
                    <Mail size={16} style={{ color: '#16A34A', flexShrink: 0 }} />
                    <span>
                      Please check your email inbox at <strong>{forgotEmail}</strong> for the 6-digit verification code.
                    </span>
                  </div>

                  {/* 6-Digit OTP Code Input */}
                  <div className="field-group">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <label className="field-label" style={{ fontWeight: 700, margin: 0 }}>
                        Enter 6-Digit Verification OTP *
                      </label>
                      <button
                        type="button"
                        onClick={handleRequestOtp}
                        disabled={resendCooldown > 0 || forgotLoading}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '0.75rem',
                          color: resendCooldown > 0 ? '#94A3B8' : '#059669',
                          fontWeight: 600,
                          cursor: resendCooldown > 0 ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: 0
                        }}
                      >
                        <RotateCcw size={12} />
                        {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : 'Resend OTP'}
                      </button>
                    </div>
                    <input
                      type="text"
                      className="field-input"
                      placeholder="• • • • • •"
                      maxLength={6}
                      value={forgotOtp}
                      onChange={(e) => setForgotOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      required
                      autoFocus
                      style={{
                        letterSpacing: '8px',
                        textAlign: 'center',
                        fontSize: '1.4rem',
                        fontWeight: 800,
                        fontFamily: 'monospace',
                        padding: '10px'
                      }}
                    />
                  </div>

                  {/* New Password Input */}
                  <div className="field-group">
                    <label className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Lock size={14} style={{ color: '#059669' }} />
                      <span>New Password *</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        className="field-input"
                        placeholder="At least 6 characters"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength={6}
                        style={{ paddingRight: '36px' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          color: '#94A3B8',
                          cursor: 'pointer',
                          padding: 0
                        }}
                      >
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password Input */}
                  <div className="field-group">
                    <label className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Lock size={14} style={{ color: '#059669' }} />
                      <span>Confirm New Password *</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="field-input"
                        placeholder="Re-enter new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                        style={{ paddingRight: '36px' }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          color: '#94A3B8',
                          cursor: 'pointer',
                          padding: 0
                        }}
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                </div>

                <div className="modal-footer" style={{ padding: '14px 20px', borderTop: '1px solid var(--border-subtle)' }}>
                  <button
                    type="button"
                    className="btn-status-action"
                    onClick={() => {
                      setForgotStep('email');
                      setForgotError(null);
                    }}
                    disabled={forgotLoading}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn-action-primary"
                    disabled={forgotLoading || forgotOtp.length !== 6 || !newPassword || !confirmPassword}
                    style={{ minWidth: '160px', justifyContent: 'center' }}
                  >
                    {forgotLoading ? (
                      <>
                        <Clock size={15} className="animate-spin" />
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <span>Reset Password</span>
                        <Check size={15} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Success Confirmation */}
            {forgotStep === 'success' && (
              <div style={{ padding: '32px 24px', textAlign: 'center' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#ECFDF5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  border: '2px solid #A7F3D0'
                }}>
                  <CheckCircle2 size={32} />
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Password Reset Successfully!
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.5 }}>
                  The password for <strong>{forgotEmail}</strong> has been updated. Your new credentials are ready to use.
                </p>

                <button
                  type="button"
                  className="btn-action-primary"
                  onClick={handleReturnToLogin}
                  style={{ width: '100%', padding: '12px', justifyContent: 'center', fontSize: '0.95rem', fontWeight: 700 }}
                >
                  Return to Sign In
                  <ArrowRight size={16} />
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}


