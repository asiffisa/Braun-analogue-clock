import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

interface ErrorBoundaryState {
  failed: boolean;
}

/**
 * Without this, any render-time throw leaves the visitor on a blank page with
 * no hint that anything went wrong. The fallback is deliberately plain — it
 * only has to stay legible against the page background.
 */
class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error('[Timelapse] Render failed.', error);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div
        role="alert"
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          padding: '24px',
          color: '#e8e7e1',
          background: '#101110',
          textAlign: 'center',
        }}
      >
        <p>
          Something went wrong loading Timelapse.{' '}
          <a href="/" style={{ color: '#e9aa17' }}>
            Reload the page
          </a>
          .
        </p>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
