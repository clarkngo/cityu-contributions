// V2 — The Ledger
// Data-forward impact report. Navy + warm amber.
// Big animated metrics, tabular case studies.

const L_TOKENS = {
  navy: '#0d1b33',
  navyDeep: '#070f1f',
  navyLight: '#1b2d4d',
  paper: '#fbf7ef',
  paper2: '#f3ecdd',
  amber: '#e8a23a',
  amberDeep: '#c97f15',
  rule: 'rgba(13, 27, 51, 0.14)',
  muted: 'rgba(13, 27, 51, 0.6)',
  mutedOnDark: 'rgba(251, 247, 239, 0.65)',
};

function LMono({ children, style }) {
  return (
    <span
      style={{
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        letterSpacing: '0.04em',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function LSans({ children, size = 16, weight = 500, style }) {
  return (
    <span
      style={{
        fontFamily: '"Inter Tight", "Helvetica Neue", Helvetica, Arial, sans-serif',
        fontSize: size,
        fontWeight: weight,
        letterSpacing: '-0.01em',
        lineHeight: 1.2,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

// ─── HEADER STRIP (ledger header) ───
function LedgerHeader({ p }) {
  const now = new Date();
  return (
    <div
      style={{
        background: L_TOKENS.navy,
        color: L_TOKENS.paper,
        padding: '18px 56px',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto auto',
        gap: 40,
        alignItems: 'center',
        borderBottom: `3px solid ${L_TOKENS.amber}`,
      }}
    >
      <LMono style={{ fontSize: 11, color: L_TOKENS.amber, textTransform: 'uppercase' }}>
        CITYU / IMPACT LEDGER / VOL. 07
      </LMono>
      <LMono style={{ fontSize: 11, color: L_TOKENS.mutedOnDark }}>
        Filed for: Executive Leadership · Provost · Deans
      </LMono>
      <LMono style={{ fontSize: 11, color: L_TOKENS.mutedOnDark }}>
        Principal: {p.person.name.toUpperCase()}
      </LMono>
      <LMono style={{ fontSize: 11, color: L_TOKENS.mutedOnDark }}>
        2019 → 2026
      </LMono>
    </div>
  );
}

// ─── HERO — big metric block ───
function LedgerHero({ p }) {
  return (
    <section style={{ background: L_TOKENS.navy, color: L_TOKENS.paper, padding: '72px 56px 88px', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 56,
          width: 1,
          height: '100%',
          background: 'rgba(232, 162, 58, 0.12)',
        }}
      />

      <LMono style={{ fontSize: 11, color: L_TOKENS.amber, textTransform: 'uppercase', marginBottom: 32, display: 'block' }}>
        Summary of Contribution · 2018–2021 · 2024–present
      </LMono>

      <h1
        style={{
          fontFamily: '"Inter Tight", Helvetica, sans-serif',
          fontSize: 128,
          fontWeight: 300,
          letterSpacing: '-0.04em',
          lineHeight: 0.92,
          margin: 0,
          maxWidth: 1200,
          textWrap: 'balance',
        }}
      >
        A measurable record of teaching, research, and industry partnership at City University of{' '}
        <span style={{ color: L_TOKENS.amber, fontStyle: 'italic', fontWeight: 400 }}>Seattle.</span>
      </h1>

      <div
        style={{
          marginTop: 72,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          borderTop: `1px solid rgba(232, 162, 58, 0.25)`,
          borderBottom: `1px solid rgba(232, 162, 58, 0.25)`,
        }}
      >
        {p.metrics.map((m, i) => (
          <div
            key={i}
            style={{
              padding: '36px 24px 36px 0',
              borderLeft: i === 0 ? 'none' : `1px solid rgba(232, 162, 58, 0.15)`,
              paddingLeft: i === 0 ? 0 : 24,
            }}
          >
            <LMono style={{ fontSize: 10, color: L_TOKENS.amber, textTransform: 'uppercase' }}>
              Metric {String(i + 1).padStart(2, '0')}
            </LMono>
            <div
              style={{
                fontFamily: '"Inter Tight", sans-serif',
                fontSize: 96,
                fontWeight: 200,
                letterSpacing: '-0.04em',
                lineHeight: 1,
                marginTop: 12,
                color: L_TOKENS.paper,
              }}
            >
              <CountUp to={m.value} suffix={m.suffix} prefix={m.prefix || ''} />
            </div>
            <div
              style={{
                marginTop: 18,
                fontFamily: '"Inter Tight", sans-serif',
                fontSize: 14,
                fontWeight: 600,
                color: L_TOKENS.paper,
                letterSpacing: '-0.005em',
              }}
            >
              {m.label}
            </div>
            <div
              style={{
                marginTop: 6,
                fontFamily: '"Inter Tight", sans-serif',
                fontSize: 13,
                color: L_TOKENS.mutedOnDark,
                lineHeight: 1.5,
                textWrap: 'pretty',
              }}
            >
              {m.caption}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── BAR CHART: publications by year ───
function LedgerPubChart({ p }) {
  const years = ['2019', '2020', '2023', '2024', '2025'];
  const counts = { '2019': 2, '2020': 1, '2023': 1, '2024': 1, '2025': 1 };
  const max = Math.max(...years.map((y) => counts[y]));

  const ref = React.useRef(null);
  const seen = useInView(ref);

  return (
    <section style={{ background: L_TOKENS.paper, padding: '72px 56px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }}>
        <div>
          <LMono style={{ fontSize: 11, color: L_TOKENS.amberDeep, textTransform: 'uppercase' }}>
            Exhibit A
          </LMono>
          <h2
            style={{
              fontFamily: '"Inter Tight", sans-serif',
              fontSize: 56,
              fontWeight: 300,
              letterSpacing: '-0.025em',
              lineHeight: 1,
              margin: '16px 0 20px',
              color: L_TOKENS.navy,
            }}
          >
            Sustained academic output.
          </h2>
          <p style={{ fontFamily: '"Inter Tight", sans-serif', fontSize: 16, lineHeight: 1.55, color: L_TOKENS.muted, margin: 0, textWrap: 'pretty' }}>
            One peer-reviewed publication (UKC 2024) plus five conference presentations across ISCAP, CISSE, and ICOAF — spanning foundational serverless security through agentic-AI threat modeling.
          </p>
        </div>
        <div ref={ref} style={{ position: 'relative', paddingTop: 8 }}>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${years.length}, 1fr)`, gap: 24, alignItems: 'end', height: 280 }}>
            {years.map((y, i) => {
              const c = counts[y];
              const h = (c / max) * 240;
              return (
                <div key={y} style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                    <div
                      style={{
                        width: '100%',
                        height: seen ? h : 0,
                        background: L_TOKENS.navy,
                        borderTop: `4px solid ${L_TOKENS.amber}`,
                        transition: `height 900ms cubic-bezier(.2,.8,.2,1) ${i * 80}ms`,
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: -30,
                          left: 0,
                          right: 0,
                          textAlign: 'center',
                          color: L_TOKENS.navy,
                          fontFamily: '"Inter Tight", sans-serif',
                          fontSize: 20,
                          fontWeight: 600,
                          opacity: seen ? 1 : 0,
                          transition: `opacity 400ms ${i * 80 + 500}ms`,
                        }}
                      >
                        {c}
                      </div>
                    </div>
                  </div>
                  <div style={{ borderTop: `1px solid ${L_TOKENS.rule}`, marginTop: 0 }} />
                  <div
                    style={{
                      paddingTop: 10,
                      textAlign: 'center',
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: 12,
                      color: L_TOKENS.muted,
                    }}
                  >
                    {y}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CASE STUDIES — tabular expandable ───
function LedgerCases({ p }) {
  const [active, setActive] = React.useState(p.cases[0].id);
  const activeCase = p.cases.find((c) => c.id === active);
  return (
    <section style={{ background: L_TOKENS.paper2, padding: '80px 56px' }}>
      <div style={{ marginBottom: 40 }}>
        <LMono style={{ fontSize: 11, color: L_TOKENS.amberDeep, textTransform: 'uppercase' }}>
          Exhibit B — Line items
        </LMono>
        <h2
          style={{
            fontFamily: '"Inter Tight", sans-serif',
            fontSize: 72,
            fontWeight: 300,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            margin: '16px 0 0',
            color: L_TOKENS.navy,
          }}
        >
          Contributions, itemized.
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1.4fr',
          gap: 0,
          border: `1px solid ${L_TOKENS.rule}`,
          background: L_TOKENS.paper,
        }}
      >
        {/* LEFT: list */}
        <div style={{ borderRight: `1px solid ${L_TOKENS.rule}` }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '48px 1fr 80px',
              background: L_TOKENS.navy,
              color: L_TOKENS.amber,
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              padding: '12px 20px',
            }}
          >
            <span>No.</span>
            <span>Contribution</span>
            <span style={{ textAlign: 'right' }}>FY</span>
          </div>
          {p.cases.map((c, i) => {
            const isActive = c.id === active;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                onMouseEnter={() => setActive(c.id)}
                style={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '48px 1fr 80px',
                  alignItems: 'center',
                  padding: '20px',
                  background: isActive ? L_TOKENS.paper : 'transparent',
                  borderLeft: isActive ? `3px solid ${L_TOKENS.amber}` : '3px solid transparent',
                  borderTop: i === 0 ? 'none' : `1px solid ${L_TOKENS.rule}`,
                  borderRight: 'none',
                  borderBottom: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  color: L_TOKENS.navy,
                  transition: 'all 200ms',
                }}
              >
                <LMono style={{ fontSize: 12, color: L_TOKENS.amberDeep }}>
                  {String(i + 1).padStart(2, '0')}
                </LMono>
                <div>
                  <LSans size={18} weight={600} style={{ display: 'block', color: L_TOKENS.navy, lineHeight: 1.25 }}>
                    {c.title}
                  </LSans>
                  <LMono style={{ fontSize: 10, color: L_TOKENS.muted, textTransform: 'uppercase', marginTop: 6, display: 'inline-block' }}>
                    {c.tag}
                  </LMono>
                </div>
                <LMono style={{ fontSize: 12, color: L_TOKENS.muted, textAlign: 'right' }}>
                  {c.year}
                </LMono>
              </button>
            );
          })}
        </div>

        {/* RIGHT: detail */}
        <div style={{ padding: '36px 44px', background: L_TOKENS.paper, minHeight: 480 }}>
          <LMono style={{ fontSize: 11, color: L_TOKENS.amberDeep, textTransform: 'uppercase' }}>
            {activeCase.tag} · {activeCase.year}
          </LMono>
          <h3
            style={{
              fontFamily: '"Inter Tight", sans-serif',
              fontSize: 40,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              margin: '14px 0 20px',
              color: L_TOKENS.navy,
              textWrap: 'balance',
            }}
          >
            {activeCase.title}
          </h3>
          <p
            style={{
              fontFamily: '"Inter Tight", sans-serif',
              fontSize: 19,
              lineHeight: 1.45,
              color: L_TOKENS.navyLight,
              fontWeight: 500,
              margin: 0,
              textWrap: 'pretty',
            }}
          >
            {activeCase.lead}
          </p>
          <p
            style={{
              fontFamily: '"Inter Tight", sans-serif',
              fontSize: 15,
              lineHeight: 1.65,
              color: L_TOKENS.muted,
              margin: '20px 0 28px',
              textWrap: 'pretty',
            }}
          >
            {activeCase.body}
          </p>

          <div
            style={{
              border: `1px solid ${L_TOKENS.rule}`,
              background: L_TOKENS.paper2,
            }}
          >
            <div
              style={{
                padding: '10px 16px',
                background: L_TOKENS.navy,
                color: L_TOKENS.amber,
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 10,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              Outcomes
            </div>
            {activeCase.outcomes.map((o, j) => (
              <div
                key={j}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '28px 1fr',
                  padding: '12px 16px',
                  borderTop: j === 0 ? 'none' : `1px dotted ${L_TOKENS.rule}`,
                  fontFamily: '"Inter Tight", sans-serif',
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: L_TOKENS.navy,
                }}
              >
                <LMono style={{ fontSize: 11, color: L_TOKENS.amberDeep }}>
                  {String(j + 1).padStart(2, '0')}
                </LMono>
                <span style={{ textWrap: 'pretty' }}>{o}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 20,
              padding: '14px 16px',
              background: L_TOKENS.navy,
              color: L_TOKENS.amber,
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 12,
              letterSpacing: '0.02em',
            }}
          >
            // PROOF — {linkify(activeCase.proof, L_TOKENS.amberDeep)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TIMELINE ───
function LedgerTimeline({ p }) {
  return (
    <section style={{ background: L_TOKENS.paper, padding: '72px 56px', borderTop: `1px solid ${L_TOKENS.rule}` }}>
      <LMono style={{ fontSize: 11, color: L_TOKENS.amberDeep, textTransform: 'uppercase' }}>
        Exhibit C
      </LMono>
      <h2
        style={{
          fontFamily: '"Inter Tight", sans-serif',
          fontSize: 56,
          fontWeight: 300,
          letterSpacing: '-0.025em',
          margin: '16px 0 40px',
          color: L_TOKENS.navy,
        }}
      >
        Chronology.
      </h2>
      <div style={{ position: 'relative', paddingLeft: 0 }}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 32, height: 2, background: L_TOKENS.rule }} />
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${p.timeline.length}, 1fr)`, gap: 24 }}>
          {p.timeline.map((t, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 0,
                  background: L_TOKENS.amber,
                  border: `2px solid ${L_TOKENS.navy}`,
                  transform: 'rotate(45deg)',
                  marginTop: 25,
                  marginBottom: 20,
                }}
              />
              <LMono style={{ fontSize: 14, color: L_TOKENS.navy, fontWeight: 600 }}>{t.year}</LMono>
              <div
                style={{
                  marginTop: 8,
                  fontFamily: '"Inter Tight", sans-serif',
                  fontSize: 14,
                  lineHeight: 1.45,
                  color: L_TOKENS.muted,
                  textWrap: 'pretty',
                }}
              >
                {t.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WORKSHOPS + TESTIMONIAL STRIP ───
function LedgerWorkshops({ p }) {
  return (
    <section style={{ background: L_TOKENS.navy, color: L_TOKENS.paper, padding: '80px 56px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 80 }}>
        <div>
          <LMono style={{ fontSize: 11, color: L_TOKENS.amber, textTransform: 'uppercase' }}>
            Exhibit D — Teaching
          </LMono>
          <h2
            style={{
              fontFamily: '"Inter Tight", sans-serif',
              fontSize: 56,
              fontWeight: 300,
              letterSpacing: '-0.025em',
              margin: '16px 0 40px',
              color: L_TOKENS.paper,
            }}
          >
            Workshops designed &{' '}
            <span style={{ color: L_TOKENS.amber }}>delivered.</span>
          </h2>
          <div>
            {p.workshops.map((w, i) => (
              <div
                key={i}
                style={{
                  padding: '24px 0',
                  borderTop: `1px solid rgba(232, 162, 58, 0.25)`,
                  borderBottom: i === p.workshops.length - 1 ? `1px solid rgba(232, 162, 58, 0.25)` : 'none',
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr',
                  gap: 20,
                  alignItems: 'baseline',
                }}
              >
                <LMono style={{ fontSize: 14, color: L_TOKENS.amber }}>{w.year}</LMono>
                <div>
                  <LSans size={22} weight={500} style={{ color: L_TOKENS.paper, display: 'block' }}>
                    {w.title}
                  </LSans>
                  <div
                    style={{
                      marginTop: 8,
                      fontFamily: '"Inter Tight", sans-serif',
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: L_TOKENS.mutedOnDark,
                      textWrap: 'pretty',
                    }}
                  >
                    {w.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <LMono style={{ fontSize: 11, color: L_TOKENS.amber, textTransform: 'uppercase' }}>
            Exhibit E — Voices from the field
          </LMono>
          <div style={{ marginTop: 24 }}>
            {p.testimonials.slice(0, 3).map((t, i) => (
              <div
                key={i}
                style={{
                  padding: '24px 0',
                  borderTop: `1px solid rgba(232, 162, 58, 0.25)`,
                }}
              >
                <div
                  style={{
                    fontFamily: '"Inter Tight", sans-serif',
                    fontSize: 18,
                    lineHeight: 1.45,
                    color: L_TOKENS.paper,
                    textWrap: 'pretty',
                  }}
                >
                  <span style={{ color: L_TOKENS.amber, marginRight: 4 }}>“</span>
                  {t.quote}
                </div>
                <LMono style={{ fontSize: 10, color: L_TOKENS.amber, textTransform: 'uppercase', letterSpacing: '0.18em', marginTop: 12, display: 'inline-block' }}>
                  {t.who}
                </LMono>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS MATRIX ───
function LedgerSkills({ p }) {
  const [hover, setHover] = React.useState(null);
  return (
    <section style={{ background: L_TOKENS.paper, padding: '80px 56px' }}>
      <LMono style={{ fontSize: 11, color: L_TOKENS.amberDeep, textTransform: 'uppercase' }}>
        Exhibit F
      </LMono>
      <h2
        style={{
          fontFamily: '"Inter Tight", sans-serif',
          fontSize: 56,
          fontWeight: 300,
          letterSpacing: '-0.025em',
          margin: '16px 0 40px',
          color: L_TOKENS.navy,
        }}
      >
        Competency matrix.
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', border: `1px solid ${L_TOKENS.rule}` }}>
        {p.skills.map((s, i) => {
          const isHover = hover === i;
          return (
            <div
              key={i}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              style={{
                padding: '28px 22px',
                borderLeft: i === 0 ? 'none' : `1px solid ${L_TOKENS.rule}`,
                background: isHover ? L_TOKENS.navy : L_TOKENS.paper,
                color: isHover ? L_TOKENS.paper : L_TOKENS.navy,
                transition: 'background 260ms, color 260ms',
                minHeight: 260,
                cursor: 'default',
              }}
            >
              <LMono style={{ fontSize: 10, color: isHover ? L_TOKENS.amber : L_TOKENS.amberDeep, textTransform: 'uppercase' }}>
                {String(i + 1).padStart(2, '0')}
              </LMono>
              <div
                style={{
                  fontFamily: '"Inter Tight", sans-serif',
                  fontSize: 22,
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  margin: '14px 0 18px',
                  lineHeight: 1.15,
                  color: isHover ? L_TOKENS.paper : L_TOKENS.navy,
                  textWrap: 'pretty',
                }}
              >
                {s.area}
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {s.items.map((it, j) => (
                  <li
                    key={j}
                    style={{
                      fontFamily: '"Inter Tight", sans-serif',
                      fontSize: 13,
                      lineHeight: 1.6,
                      color: isHover ? L_TOKENS.mutedOnDark : L_TOKENS.muted,
                      padding: '4px 0',
                    }}
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function LedgerAwards({ p }) {
  return (
    <section style={{ background: L_TOKENS.paper2, padding: '80px 56px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
        <div>
          <LMono style={{ fontSize: 11, color: L_TOKENS.amberDeep, textTransform: 'uppercase' }}>
            Exhibit G
          </LMono>
          <h2
            style={{
              fontFamily: '"Inter Tight", sans-serif',
              fontSize: 48,
              fontWeight: 300,
              letterSpacing: '-0.025em',
              margin: '16px 0 24px',
              color: L_TOKENS.navy,
            }}
          >
            Recognition.
          </h2>
          {p.awards.map((a, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr',
                padding: '18px 0',
                borderTop: `1px solid ${L_TOKENS.rule}`,
                gap: 16,
              }}
            >
              <LMono style={{ fontSize: 13, color: L_TOKENS.amberDeep }}>{a.year}</LMono>
              <div>
                <LSans size={17} weight={600} style={{ color: L_TOKENS.navy, display: 'block', lineHeight: 1.3 }}>
                  {a.title}
                </LSans>
                <div
                  style={{
                    marginTop: 4,
                    fontFamily: '"Inter Tight", sans-serif',
                    fontSize: 13,
                    color: L_TOKENS.muted,
                    lineHeight: 1.5,
                  }}
                >
                  {a.body}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <LMono style={{ fontSize: 11, color: L_TOKENS.amberDeep, textTransform: 'uppercase' }}>
            Exhibit H
          </LMono>
          <h2
            style={{
              fontFamily: '"Inter Tight", sans-serif',
              fontSize: 48,
              fontWeight: 300,
              letterSpacing: '-0.025em',
              margin: '16px 0 24px',
              color: L_TOKENS.navy,
            }}
          >
            Credentials.
          </h2>
          {p.person.certifications.map((c, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '18px 0',
                borderTop: `1px solid ${L_TOKENS.rule}`,
              }}
            >
              <LSans size={17} weight={500} style={{ color: L_TOKENS.navy }}>
                {c.name}
              </LSans>
              <LMono style={{ fontSize: 13, color: L_TOKENS.amberDeep }}>{c.year}</LMono>
            </div>
          ))}

          <div style={{ marginTop: 32 }}>
            {p.person.credentials.map((cr, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 0',
                  borderTop: i === 0 ? `1px solid ${L_TOKENS.rule}` : `1px dotted ${L_TOKENS.rule}`,
                  fontFamily: '"Inter Tight", sans-serif',
                  fontSize: 14,
                  color: L_TOKENS.navy,
                  lineHeight: 1.5,
                }}
              >
                {cr}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LedgerFooter({ p }) {
  return (
    <section style={{ background: L_TOKENS.navyDeep, color: L_TOKENS.paper, padding: '56px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'end' }}>
        <div>
          <LMono style={{ fontSize: 11, color: L_TOKENS.amber, textTransform: 'uppercase' }}>
            End of report
          </LMono>
          <h2
            style={{
              fontFamily: '"Inter Tight", sans-serif',
              fontSize: 40,
              fontWeight: 300,
              letterSpacing: '-0.025em',
              margin: '14px 0 0',
              color: L_TOKENS.paper,
              textWrap: 'balance',
            }}
          >
            Submitted for review, <span style={{ color: L_TOKENS.amber }}>with receipts.</span>
          </h2>
        </div>
        <div style={{ textAlign: 'right', fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: L_TOKENS.mutedOnDark, lineHeight: 2 }}>
          <div>{p.person.name.toUpperCase()}</div>
          <div>{p.person.contact.email}</div>
          <div>{p.person.contact.linkedin}</div>
        </div>
      </div>
    </section>
  );
}

function V2Ledger() {
  const p = window.PORTFOLIO;
  return (
    <div style={{ background: L_TOKENS.paper, minHeight: '100%' }}>
      <LedgerHeader p={p} />
      <LedgerHero p={p} />
      <LedgerPubChart p={p} />
      <LedgerCases p={p} />
      <LedgerTimeline p={p} />
      <VideoGallery accentColor={L_TOKENS.amberDeep} bgColor={L_TOKENS.paper} textColor={L_TOKENS.navy} mutedColor={L_TOKENS.muted} variant="cool" />
      <InteractiveLabs accentColor={L_TOKENS.amberDeep} textColor={L_TOKENS.navy} mutedColor={L_TOKENS.muted} ruleColor={L_TOKENS.rule} bgColor={L_TOKENS.paper} variant="cool" />
      <PhotoGallery accentColor={L_TOKENS.amberDeep} textColor={L_TOKENS.navy} mutedColor={L_TOKENS.muted} ruleColor={L_TOKENS.rule} bgColor={L_TOKENS.paper2} variant="cool" />
      <LedgerWorkshops p={p} />
      <OutsideExperience accentColor={L_TOKENS.amberDeep} textColor={L_TOKENS.navy} mutedColor={L_TOKENS.muted} ruleColor={L_TOKENS.rule} bgColor={L_TOKENS.paper2} variant="cool" />
      <VolunteerImpact accentColor={L_TOKENS.amberDeep} textColor={L_TOKENS.navy} mutedColor={L_TOKENS.muted} ruleColor={L_TOKENS.rule} bgColor={L_TOKENS.paper} variant="cool" />
      <LedgerSkills p={p} />
      <LedgerAwards p={p} />
      <LedgerFooter p={p} />
    </div>
  );
}

window.V2Ledger = V2Ledger;
