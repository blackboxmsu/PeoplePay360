import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, Mail, AlertCircle, ArrowRight, CheckCircle2, X } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, authError, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Forgot password modal state
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const from = location.state?.from?.pathname || '/';

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

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

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
    setTimeout(() => {
      setForgotModalOpen(false);
      setForgotSent(false);
      setForgotEmail('');
    }, 2500);
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

      {/* Main Login Card (Matching Screenshot 1) */}
      <div className="odoo-form-card" style={{ width: '100%', maxWidth: '440px', padding: '36px' }}>
        <div style={{ marginBottom: '24px' }}>
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
                onClick={() => {
                  setForgotEmail(email);
                  setForgotModalOpen(true);
                }}
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

<<<<<<< HEAD
        <div style={{
          marginTop: '16px',
          padding: '10px 12px',
          backgroundColor: 'var(--bg-green-soft)',
          border: '1px solid var(--border-green)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '8px'
        }}>
          <Shield size={16} style={{ color: '#059669', flexShrink: 0, marginTop: '2px' }} />
          <p style={{ fontSize: '0.74rem', color: '#065F46', margin: 0, lineHeight: 1.45 }}>
            <strong>Strict RBAC Enforcement:</strong> Self-registration is disabled. Accounts and roles are provisioned exclusively by authorized <strong>HR Managers</strong> and <strong>Administrators</strong>. Credentials are automatically delivered to work inboxes via <strong>Nodemailer</strong>.
          </p>
        </div>

        {/* 1-Click Demo Accounts Quick-Switcher for Judges */}
=======
>>>>>>> 7308a1a19ac45766a4e802277d1e9927d0c4b81d
        <div style={{
          marginTop: '24px',
          paddingTop: '18px',
          borderTop: '1px solid var(--border-subtle)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Accounts are created by an administrator.
          </p>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            After sign-in, show only the modules and actions allowed by the user's assigned role.
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog" style={{ maxWidth: '420px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Reset Password</h3>
              <button
                type="button"
                onClick={() => setForgotModalOpen(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#94A3B8' }}
              >
                <X size={18} />
              </button>
            </div>

            {forgotSent ? (
              <div className="modal-body" style={{ textAlign: 'center', padding: '32px 24px' }}>
                <CheckCircle2 size={42} style={{ color: '#059669', margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Reset Instructions Sent
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  If an account exists for <strong>{forgotEmail}</strong>, password reset instructions have been sent to your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit}>
                <div className="modal-body">
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Enter your registered work email and we will send you a secure link to reset your password.
                  </p>
                  <div className="field-group">
                    <label className="field-label">Work Email</label>
                    <input
                      type="email"
                      className="field-input"
                      placeholder="name@company.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn-status-action"
                    onClick={() => setForgotModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-action-primary"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
