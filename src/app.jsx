// App shell — tab switcher between V1/V2/V3 + Tweaks panel

const TABS = [
  { id: 'v1', label: 'I. The Dossier', sub: 'Editorial long-read', comp: 'V1Dossier' },
  { id: 'v2', label: 'II. The Ledger', sub: 'Impact report', comp: 'V2Ledger' },
  { id: 'v3', label: 'III. The Curriculum', sub: 'Student-voice-led', comp: 'V3Curriculum' },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "comfortable",
  "accentWarmth": "terracotta"
}/*EDITMODE-END*/;

function TabBar({ active, onChange }) {
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        alignItems: 'center',
        padding: '14px 40px',
        background: '#0b1526',
        color: '#f4ede1',
        borderBottom: '1px solid rgba(244,237,225,0.12)',
        fontFamily: '"Inter Tight", Helvetica, sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 24,
            height: 24,
            background: '#b8521c',
            display: 'grid',
            placeItems: 'center',
            fontFamily: '"Fraunces", serif',
            fontSize: 16,
            fontWeight: 600,
            color: '#f4ede1',
          }}
        >
          C
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: '-0.01em' }}>
            Clark Jason Ngo · Contributions Portfolio
          </div>
          <div style={{ fontSize: 11, color: 'rgba(244,237,225,0.55)', fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            City University of Seattle · 2019 → 2026
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 6 }}>
        {TABS.map((t) => {
          const isActive = t.id === active;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              style={{
                background: isActive ? '#b8521c' : 'transparent',
                color: isActive ? '#f4ede1' : 'rgba(244,237,225,0.7)',
                border: isActive ? 'none' : '1px solid rgba(244,237,225,0.15)',
                padding: '10px 18px',
                fontFamily: 'inherit',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                letterSpacing: '-0.005em',
                transition: 'all 200ms',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 2,
                minWidth: 180,
                textAlign: 'left',
              }}
            >
              <span>{t.label}</span>
              <span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: isActive ? 'rgba(244,237,225,0.85)' : 'rgba(244,237,225,0.45)',
                }}
              >
                {t.sub}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: 'rgba(244,237,225,0.55)', letterSpacing: '0.08em' }}>
        ↓ scroll
      </div>
    </nav>
  );
}

function TweaksPanel({ open, tweaks, setTweak, close }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: 'fixed',
        right: 24,
        bottom: 24,
        width: 300,
        zIndex: 100,
        background: '#0b1526',
        color: '#f4ede1',
        border: '1px solid rgba(232,162,58,0.35)',
        fontFamily: '"Inter Tight", sans-serif',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      }}
    >
      <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(244,237,225,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#e8a23a' }}>
          Tweaks
        </div>
        <button
          onClick={close}
          style={{ background: 'none', border: 'none', color: '#f4ede1', cursor: 'pointer', fontSize: 16 }}
        >
          ×
        </button>
      </div>
      <div style={{ padding: 18 }}>
        <div style={{ fontSize: 12, color: 'rgba(244,237,225,0.7)', marginBottom: 10, letterSpacing: '0.02em' }}>
          Accent warmth
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
          {[
            { id: 'terracotta', label: 'Terracotta' },
            { id: 'amber', label: 'Amber' },
            { id: 'clay', label: 'Clay' },
          ].map((o) => (
            <button
              key={o.id}
              onClick={() => setTweak('accentWarmth', o.id)}
              style={{
                flex: 1,
                padding: '8px',
                background: tweaks.accentWarmth === o.id ? '#b8521c' : 'transparent',
                color: '#f4ede1',
                border: '1px solid rgba(244,237,225,0.2)',
                fontFamily: 'inherit',
                fontSize: 11,
                cursor: 'pointer',
              }}
            >
              {o.label}
            </button>
          ))}
        </div>

        <div style={{ fontSize: 12, color: 'rgba(244,237,225,0.7)', marginBottom: 10, letterSpacing: '0.02em' }}>
          Density
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { id: 'compact', label: 'Compact' },
            { id: 'comfortable', label: 'Comfortable' },
            { id: 'spacious', label: 'Spacious' },
          ].map((o) => (
            <button
              key={o.id}
              onClick={() => setTweak('density', o.id)}
              style={{
                flex: 1,
                padding: '8px',
                background: tweaks.density === o.id ? '#b8521c' : 'transparent',
                color: '#f4ede1',
                border: '1px solid rgba(244,237,225,0.2)',
                fontFamily: 'inherit',
                fontSize: 11,
                cursor: 'pointer',
              }}
            >
              {o.label}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 20, fontFamily: '"JetBrains Mono", monospace', fontSize: 10, color: 'rgba(244,237,225,0.4)', lineHeight: 1.5 }}>
          // Applies to all three variations.
        </div>
      </div>
    </div>
  );
}

function App() {
  const [tab, setTab] = React.useState(() => localStorage.getItem('portfolio_tab') || 'v1');
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = React.useState(false);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    localStorage.setItem('portfolio_tab', tab);
    if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  }, [tab]);

  React.useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === '__activate_edit_mode') setTweaksOpen(true);
      if (d.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  // Apply accent colors globally via CSS vars
  React.useEffect(() => {
    const accentMap = {
      terracotta: '#b8521c',
      amber: '#c97f15',
      clay: '#a24b28',
    };
    document.documentElement.style.setProperty('--accent', accentMap[tweaks.accentWarmth] || '#b8521c');
  }, [tweaks.accentWarmth]);

  const setTweak = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };

  const activeTab = TABS.find((t) => t.id === tab);
  const Component = window[activeTab.comp];

  // density scaling
  const densityScale = { compact: 0.88, comfortable: 1, spacious: 1.1 }[tweaks.density] || 1;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TabBar active={tab} onChange={setTab} />
      <div
        ref={scrollRef}
        data-screen-label={activeTab.label}
        style={{
          flex: 1,
          fontSize: `${16 * densityScale}px`,
        }}
      >
        {Component ? <Component /> : <div style={{ padding: 40 }}>Loading…</div>}
      </div>
      <TweaksPanel
        open={tweaksOpen}
        tweaks={tweaks}
        setTweak={setTweak}
        close={() => setTweaksOpen(false)}
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
