import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an unhandled rendering error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '520px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--border-subtle, #E2E8F0)',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)'
          }}>
            <div style={{
              width: '52px',
              height: '52px',
              backgroundColor: '#FEF2F2',
              color: '#DC2626',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 18px auto'
            }}>
              <AlertTriangle size={28} />
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
              Something went wrong loading this view
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '20px', lineHeight: '1.5' }}>
              An unexpected error occurred during rendering. You can reload the page or return to the main dashboard.
            </p>

            {this.state.error && (
              <div style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '6px',
                padding: '10px 14px',
                fontSize: '0.78rem',
                color: '#991B1B',
                fontFamily: 'JetBrains Mono, monospace',
                textAlign: 'left',
                marginBottom: '20px',
                overflowX: 'auto',
                maxHeight: '120px'
              }}>
                {this.state.error.toString()}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                type="button"
                className="btn-action-primary"
                onClick={this.handleReload}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px' }}
              >
                <RefreshCw size={15} />
                <span>Reload Page</span>
              </button>
              <button
                type="button"
                className="btn-status-action"
                onClick={this.handleGoHome}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px' }}
              >
                <Home size={15} />
                <span>Go to Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
