import React, { useState } from 'react';
import { Square2StackIcon, CheckIcon } from '@heroicons/react/24/outline';
import { PullCord, type PullCordConfig } from 'pullcord';
import 'pullcord/pullcord.css';
import Clock from './components/Clock';
import type { ClockThemeName } from './components/Clock/constants';
import timelapseLogo from './timelapse logo.png';

type InstallTarget = 'react' | 'agent';

const INSTALL_SNIPPETS: Record<InstallTarget, string> = {
  react: `// Copy only Clock.tsx, Clock/, and hooks/ from GitHub.
// Clock.tsx imports its own styles. Do not copy the demo UI.
// Defaults to IST (Asia/Chennai, UTC+05:30).
import Clock from './components/Clock';

export default function App() {
  return <Clock theme="light" timeZone="America/New_York" />;
}`,
  agent: `Add the Timelapse Clock to this React app.

Follow COMPONENT_COPY.md from github.com/asiffisa/Braun-analogue-clock.
Copy only its “Copy” paths. Exclude every “Do not copy” path.
<Clock theme="dark" timeZone="Europe/London" />`,
};

const ReactInstallSnippet = () => (
  <>
    <span className="syntax-comment">// Copy only Clock.tsx, Clock/, and hooks/ from GitHub.</span>{'\n'}
    <span className="syntax-comment">// Clock.tsx imports its styles — not the demo UI.</span>{'\n'}
    <span className="syntax-comment">// Defaults to IST (Asia/Chennai, UTC+05:30).</span>{'\n'}
    <span className="syntax-keyword">import</span>{' '}
    <span className="syntax-component">Clock</span>{' '}
    <span className="syntax-keyword">from</span>{' '}
    <span className="syntax-string">'./components/Clock'</span>;{'\n\n'}
    <span className="syntax-keyword">export default function</span>{' '}
    <span className="syntax-function">App</span>() {'{'}{'\n'}
    {'  '}<span className="syntax-keyword">return</span>{' '}
    {'<'}<span className="syntax-component">Clock</span>{' '}
    <span className="syntax-property">theme</span>=<span className="syntax-string">"light"</span>{' '}
    <span className="syntax-property">timeZone</span>=<span className="syntax-string">"America/New_York"</span>{' />'};{'\n'}
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
      window.setTimeout(() => setCopied(false), 4000);
    } catch {
      setCopied(false);
    }
  };

  const nextThemeLabel = theme === 'light' ? 'dark' : 'light';

  return (
    <main className={`timelapse-page timelapse-page--${theme}`}>
      <div className="timelapse-frame">
        <header className="site-header">
          <a className="site-logo-link" href="#playground" aria-label="Timelapse home">
            <img src={timelapseLogo} alt="Timelapse Logo" className="header-logo" />
          </a>
        </header>

        <section className="intro" aria-labelledby="site-title">
          <h1 id="site-title">Analogue soul<br />on web canvas</h1>
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
                    {copied ? (
                      <CheckIcon className="copy-button__icon text-emerald-400" strokeWidth={2.2} aria-hidden="true" />
                    ) : (
                      <Square2StackIcon className="copy-button__icon" strokeWidth={1.8} aria-hidden="true" />
                    )}
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
