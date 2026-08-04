import React, { useState } from 'react';
import { Square2StackIcon } from '@heroicons/react/24/outline';
import { PullCord, type PullCordConfig } from 'pullcord';
import 'pullcord/pullcord.css';
import Clock from './components/Clock';
import type { ClockThemeName } from './components/Clock/constants';

type InstallTarget = 'react' | 'agent';

const INSTALL_SNIPPETS: Record<InstallTarget, string> = {
  react: `// 1. Copy components/Clock/ and hooks/ from GitHub.
// 2. Copy the clock CSS into your app stylesheet.
import Clock from './components/Clock';

export default function App() {
  return <Clock theme="light" />;
}`,
  agent: `Add the Timelapse clock to this React app.

Copy components/Clock/, components/Clock.tsx,
and hooks/ from github.com/asiffisa/Braun-analogue-clock.
Keep the clock CSS and assets intact. Expose a theme prop
with "light" and "dark" values.`,
};

const ReactInstallSnippet = () => (
  <>
    <span className="syntax-comment">// 1. Copy components/Clock/ and hooks/ from GitHub.</span>{'\n'}
    <span className="syntax-comment">// 2. Copy the clock CSS into your app stylesheet.</span>{'\n'}
    <span className="syntax-keyword">import</span>{' '}
    <span className="syntax-component">Clock</span>{' '}
    <span className="syntax-keyword">from</span>{' '}
    <span className="syntax-string">'./components/Clock'</span>;{'\n\n'}
    <span className="syntax-keyword">export default function</span>{' '}
    <span className="syntax-function">App</span>() {'{'}{'\n'}
    {'  '}<span className="syntax-keyword">return</span>{' '}
    {'<'}<span className="syntax-component">Clock</span>{' '}
    <span className="syntax-property">theme</span>=<span className="syntax-string">"light"</span>{' />'};{'\n'}
    {'}'}
  </>
);

// Tuned to the FeralUI reference feel: taut, responsive, and deep enough to read as a real pull.
const PULLCORD_CONFIG: Partial<PullCordConfig> = {
  gravity: 1925,
  damping: 0.935,
  iterations: 17,
  stretchMax: 49,
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<ClockThemeName>('light');
  const [installTarget, setInstallTarget] = useState<InstallTarget>('agent');
  const [copied, setCopied] = useState(false);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  const copySnippet = async () => {
    const snippet = INSTALL_SNIPPETS[installTarget];

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(snippet);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = snippet;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }

      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const nextThemeLabel = theme === 'light' ? 'dark' : 'light';

  return (
    <main className={`timelapse-page timelapse-page--${theme}`}>
      <div className="timelapse-frame">
        <header className="site-header">
          <a className="wordmark" href="#playground" aria-label="Timelapse home">
            <span className="wordmark__mark" aria-hidden="true" />
            timelapse
          </a>
        </header>

        <section className="intro" aria-labelledby="site-title">
          <h1 id="site-title">A wall clock<br />for the web.</h1>
        </section>

        <section id="playground" className="wall-scene" aria-label="Clock playground">
          <div className="wall-clock">
            <Clock theme={theme} />
          </div>

          <PullCord
            className="pull-cord"
            onPull={toggleTheme}
            pulled={theme === 'dark'}
            ariaLabel={`Pull cord to switch to ${nextThemeLabel} mode`}
            config={PULLCORD_CONFIG}
          />

          <div id="install" className="monitor" aria-label="Installation monitor">
            <div className="monitor__bezel">
              <div className="monitor__camera" aria-hidden="true" />
              <div className="monitor__screen">
                <div className="monitor__statusbar" aria-label="Terminal status">
                  <div className="monitor__lights" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="monitor__statusbar-title">timelapse / install</span>
                  <span className="monitor__statusbar-state">ready</span>
                </div>
                <div className="monitor__toolbar">
                  <div className="install-tabs" role="tablist" aria-label="Installation format">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={installTarget === 'agent'}
                      className={installTarget === 'agent' ? 'is-active' : undefined}
                      onClick={() => setInstallTarget('agent')}
                    >
                      Agent
                    </button>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={installTarget === 'react'}
                      className={installTarget === 'react' ? 'is-active' : undefined}
                      onClick={() => setInstallTarget('react')}
                    >
                      React
                    </button>
                  </div>
                  <button
                    type="button"
                    className={`copy-button${copied ? ' is-copied' : ''}`}
                    aria-label={`Copy ${installTarget} code`}
                    onClick={copySnippet}
                  >
                    <Square2StackIcon className="copy-button__icon" strokeWidth={1.8} aria-hidden="true" />
                    <span className="visually-hidden" aria-live="polite">
                      {copied ? 'Copied' : ''}
                    </span>
                  </button>
                </div>
                <pre aria-label={`${installTarget} code example`}>
                  <code>
                    {installTarget === 'react' ? <ReactInstallSnippet /> : INSTALL_SNIPPETS.agent}
                    <span className="code-cursor" aria-hidden="true" />
                  </code>
                </pre>
              </div>
            </div>
            <div className="monitor__stand" aria-hidden="true" />
            <div className="monitor__foot" aria-hidden="true" />
          </div>
        </section>
      </div>
    </main>
  );
};

export default App;
