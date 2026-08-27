// V1 — The Dossier
// Editorial, serif-forward, ink on warm cream.
// Inspired by print magazine long-reads.

const D_TOKENS = {
  ink: '#14233b',        // deep navy — almost ink
  ink2: '#243a5c',
  cream: '#f4ede1',
  cream2: '#ede3d2',
  rule: '#c9bfa9',
  accent: '#b8521c',     // warm terracotta
  accentSoft: '#d97a3f',
  muted: '#5e6b7d',
};

function DossierSerifH({ children, size = 96, style }) {
  return (
    <h1
      style={{
        fontFamily: '"Fraunces", "Playfair Display", "Cormorant Garamond", Georgia, serif',
        fontWeight: 400,
        fontSize: size,
        lineHeight: 0.98,
        letterSpacing: '-0.02em',
        color: D_TOKENS.ink,
        margin: 0,
        fontVariationSettings: '"opsz" 144, "SOFT" 20',
        ...style,
      }}
    >
      {children}
    </h1>
  );
}

function DossierEyebrow({ children, style }) {
  return (
    <div
      style={{
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        textTransform: 'uppercase',
        letterSpacing: '0.24em',
        fontSize: 11,
        color: D_TOKENS.accent,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function DossierRule({ style }) {
  return (
    <div
      style={{
        height: 1,
        background: D_TOKENS.rule,
        ...style,
      }}
    />
  );
}

// ─── HERO ───
function DossierHero({ p }) {
  return (
    <section style={{ padding: '80px 72px 48px', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 72 }}>
        <DossierEyebrow>A Contributions Portfolio · Vol. I · Spring 2026</DossierEyebrow>
        <DossierEyebrow style={{ color: D_TOKENS.muted }}>CityU · Seattle, WA</DossierEyebrow>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 80, alignItems: 'end' }}>
        <div>
          <DossierSerifH size={168} style={{ fontWeight: 300 }}>
            Two chapters
          </DossierSerifH>
          <DossierSerifH size={168} style={{ fontWeight: 300, fontStyle: 'italic', color: D_TOKENS.accent, marginTop: -8 }}>
            of quiet work.
          </DossierSerifH>
        </div>
        <div style={{ paddingBottom: 24 }}>
          <DossierRule style={{ marginBottom: 20 }} />
          <p
            style={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontSize: 22,
              lineHeight: 1.45,
              color: D_TOKENS.ink2,
              fontStyle: 'italic',
              margin: 0,
              textWrap: 'pretty',
            }}
          >
            The contributions of{' '}
            <span style={{ fontStyle: 'normal', fontWeight: 600, color: D_TOKENS.ink }}>
              {p.person.name}
            </span>{' '}
            to City University of Seattle — across teaching, research, curriculum, and industry partnership.
          </p>
        </div>
      </div>

      <DossierRule style={{ margin: '80px 0 28px' }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 48 }}>
        {p.metrics.map((m, i) => (
          <div key={i}>
            <div
              style={{
                fontFamily: '"Fraunces", Georgia, serif',
                fontSize: 72,
                fontWeight: 300,
                color: D_TOKENS.ink,
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}
            >
              <CountUp to={m.value} suffix={m.suffix} prefix={m.prefix || ''} />
            </div>
            <div
              style={{
                marginTop: 14,
                fontSize: 13,
                fontWeight: 600,
                color: D_TOKENS.ink,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
              }}
            >
              {m.label}
            </div>
            <div style={{ marginTop: 6, fontSize: 13, color: D_TOKENS.muted, lineHeight: 1.5, textWrap: 'pretty' }}>
              {m.caption}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── BY THE NUMBERS (secondary line) ───
function DossierStatline({ p }) {
  return (
    <section style={{ padding: '32px 72px 56px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 40,
          padding: '28px 0',
          borderTop: `1px solid ${D_TOKENS.rule}`,
          borderBottom: `1px solid ${D_TOKENS.rule}`,
          flexWrap: 'wrap',
        }}
      >
        {p.statline.map((s, i) => (
          <div key={i} style={{ flex: '1 1 auto' }}>
            <div style={{ fontSize: 11, color: D_TOKENS.muted, textTransform: 'uppercase', letterSpacing: '0.18em' }}>
              {s.k}
            </div>
            <div
              style={{
                fontFamily: '"Fraunces", Georgia, serif',
                fontSize: 28,
                color: D_TOKENS.ink,
                marginTop: 4,
                letterSpacing: '-0.01em',
              }}
            >
              {s.v}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CASE STUDIES — editorial drop-cap long-reads ───
function DossierCases({ p }) {
  const [open, setOpen] = React.useState(p.cases[0].id);
  return (
    <section style={{ padding: '64px 72px 96px', background: D_TOKENS.cream2 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'baseline', marginBottom: 48 }}>
        <DossierSerifH size={64}>The work, in six chapters.</DossierSerifH>
        <DossierEyebrow>Click any chapter to expand</DossierEyebrow>
      </div>

      <div>
        {p.cases.map((c, i) => {
          const isOpen = open === c.id;
          return (
            <div
              key={c.id}
              style={{
                borderTop: `1px solid ${D_TOKENS.rule}`,
                borderBottom: i === p.cases.length - 1 ? `1px solid ${D_TOKENS.rule}` : 'none',
              }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : c.id)}
                style={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '60px 120px 1fr 80px auto',
                  gap: 24,
                  alignItems: 'center',
                  padding: '28px 0',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  color: D_TOKENS.ink,
                  fontFamily: 'inherit',
                }}
              >
                <span
                  style={{
                    fontFamily: '"Fraunces", Georgia, serif',
                    fontSize: 28,
                    fontStyle: 'italic',
                    color: D_TOKENS.accent,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    color: D_TOKENS.muted,
                  }}
                >
                  {c.tag}
                </span>
                <span
                  style={{
                    fontFamily: '"Fraunces", Georgia, serif',
                    fontSize: 32,
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                    lineHeight: 1.1,
                  }}
                >
                  {c.title}
                </span>
                <span
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 12,
                    color: D_TOKENS.muted,
                    textAlign: 'right',
                  }}
                >
                  {c.year}
                </span>
                <span
                  style={{
                    fontSize: 22,
                    color: D_TOKENS.accent,
                    transition: 'transform 300ms',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    display: 'inline-block',
                    width: 22,
                  }}
                >
                  +
                </span>
              </button>
              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: isOpen ? '1fr' : '0fr',
                  transition: 'grid-template-rows 520ms cubic-bezier(.2,.8,.2,1)',
                }}
              >
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ padding: '0 0 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
                    <div>
                      <p
                        style={{
                          fontFamily: '"Fraunces", Georgia, serif',
                          fontSize: 26,
                          lineHeight: 1.35,
                          color: D_TOKENS.ink,
                          margin: '0 0 20px',
                          fontStyle: 'italic',
                          textWrap: 'pretty',
                        }}
                      >
                        {c.lead}
                      </p>
                      <p
                        style={{
                          fontFamily: 'Georgia, "Times New Roman", serif',
                          fontSize: 16,
                          lineHeight: 1.7,
                          color: D_TOKENS.ink2,
                          margin: 0,
                          textWrap: 'pretty',
                        }}
                      >
                        {c.body}
                      </p>
                    </div>
                    <div>
                      <DossierEyebrow style={{ marginBottom: 16 }}>Outcomes</DossierEyebrow>
                      <ol style={{ margin: 0, paddingLeft: 0, listStyle: 'none' }}>
                        {c.outcomes.map((o, j) => (
                          <li
                            key={j}
                            style={{
                              display: 'grid',
                              gridTemplateColumns: '24px 1fr',
                              gap: 14,
                              padding: '14px 0',
                              borderTop: j === 0 ? 'none' : `1px dotted ${D_TOKENS.rule}`,
                              fontFamily: 'Georgia, serif',
                              fontSize: 15,
                              lineHeight: 1.55,
                              color: D_TOKENS.ink,
                            }}
                          >
                            <span
                              style={{
                                fontFamily: '"JetBrains Mono", monospace',
                                fontSize: 11,
                                color: D_TOKENS.accent,
                                paddingTop: 3,
                              }}
                            >
                              {String(j + 1).padStart(2, '0')}
                            </span>
                            <span style={{ textWrap: 'pretty' }}>{o}</span>
                          </li>
                        ))}
                      </ol>
                      <div
                        style={{
                          marginTop: 24,
                          padding: '14px 18px',
                          background: D_TOKENS.cream,
                          borderLeft: `2px solid ${D_TOKENS.accent}`,
                          fontFamily: '"JetBrains Mono", monospace',
                          fontSize: 12,
                          color: D_TOKENS.ink,
                          letterSpacing: '0.02em',
                        }}
                      >
                        {linkify(c.proof, D_TOKENS.accent)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── PULL QUOTE / TESTIMONIALS ───
function DossierQuotes({ p }) {
  return (
    <section style={{ padding: '96px 72px', background: D_TOKENS.ink, color: D_TOKENS.cream }}>
      <DossierEyebrow style={{ color: D_TOKENS.accentSoft, marginBottom: 32 }}>
        Voices · from LinkedIn
      </DossierEyebrow>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '56px 80px' }}>
        {p.testimonials.map((t, i) => (
          <figure key={i} style={{ margin: 0 }}>
            <div
              style={{
                fontFamily: '"Fraunces", Georgia, serif',
                fontSize: 28,
                lineHeight: 1.3,
                fontStyle: 'italic',
                color: D_TOKENS.cream,
                letterSpacing: '-0.01em',
                textWrap: 'pretty',
              }}
            >
              <span style={{ color: D_TOKENS.accentSoft, fontSize: 56, lineHeight: 0, verticalAlign: '-0.3em', marginRight: 6 }}>“</span>
              {t.quote}
            </div>
            <figcaption
              style={{
                marginTop: 20,
                fontSize: 12,
                fontFamily: '"JetBrains Mono", monospace',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: D_TOKENS.accentSoft,
              }}
            >
              {t.who} · <span style={{ color: 'rgba(244, 237, 225, 0.55)' }}>{t.where}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

// ─── SKILLS — editorial index ───
function DossierSkills({ p }) {
  return (
    <section style={{ padding: '96px 72px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }}>
        <div>
          <DossierEyebrow style={{ marginBottom: 16 }}>Practice</DossierEyebrow>
          <DossierSerifH size={80}>
            A working <span style={{ fontStyle: 'italic', color: D_TOKENS.accent }}>fluency.</span>
          </DossierSerifH>
          <p
            style={{
              marginTop: 24,
              fontFamily: 'Georgia, serif',
              fontSize: 16,
              lineHeight: 1.65,
              color: D_TOKENS.muted,
              maxWidth: 380,
              textWrap: 'pretty',
            }}
          >
            Skills accumulated across industry certification, graduate study, and the classroom — each one
            tested against real students and real deployments.
          </p>
        </div>
        <div>
          {p.skills.map((s, i) => (
            <div
              key={i}
              style={{
                borderTop: `1px solid ${D_TOKENS.rule}`,
                padding: '22px 0',
                display: 'grid',
                gridTemplateColumns: '220px 1fr',
                gap: 40,
                alignItems: 'baseline',
              }}
            >
              <div
                style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontSize: 22,
                  color: D_TOKENS.ink,
                  letterSpacing: '-0.01em',
                }}
              >
                {s.area}
              </div>
              <div
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 16,
                  color: D_TOKENS.ink2,
                  lineHeight: 1.6,
                  textWrap: 'pretty',
                }}
              >
                {s.items.map((it, j) => (
                  <span key={j}>
                    {it}
                    {j < s.items.length - 1 && (
                      <span style={{ color: D_TOKENS.accent, margin: '0 10px' }}>·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${D_TOKENS.rule}` }} />
        </div>
      </div>
    </section>
  );
}

// ─── AWARDS + CERTIFICATIONS ───
function DossierAwards({ p }) {
  return (
    <section style={{ padding: '64px 72px 96px', background: D_TOKENS.cream2 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
        <div>
          <DossierEyebrow style={{ marginBottom: 20 }}>Recognition</DossierEyebrow>
          <DossierSerifH size={56}>Awards & honors.</DossierSerifH>
          <div style={{ marginTop: 32 }}>
            {p.awards.map((a, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: 20,
                  padding: '20px 0',
                  borderTop: `1px solid ${D_TOKENS.rule}`,
                }}
              >
                <div
                  style={{
                    fontFamily: '"Fraunces", serif',
                    fontSize: 28,
                    fontStyle: 'italic',
                    color: D_TOKENS.accent,
                  }}
                >
                  {a.year}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: '"Fraunces", Georgia, serif',
                      fontSize: 20,
                      color: D_TOKENS.ink,
                      lineHeight: 1.2,
                    }}
                  >
                    {a.title}
                  </div>
                  <div
                    style={{
                      marginTop: 4,
                      fontFamily: 'Georgia, serif',
                      fontSize: 14,
                      color: D_TOKENS.muted,
                      lineHeight: 1.5,
                    }}
                  >
                    {a.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <DossierEyebrow style={{ marginBottom: 20 }}>Credentials</DossierEyebrow>
          <DossierSerifH size={56}>Certifications.</DossierSerifH>
          <div style={{ marginTop: 32 }}>
            {p.person.certifications.map((c, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  padding: '20px 0',
                  borderTop: `1px solid ${D_TOKENS.rule}`,
                  fontFamily: '"Fraunces", Georgia, serif',
                  fontSize: 20,
                  color: D_TOKENS.ink,
                }}
              >
                <div>{c.name}</div>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, color: D_TOKENS.accent }}>
                  {c.year}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 40,
              padding: 28,
              background: D_TOKENS.cream,
              border: `1px solid ${D_TOKENS.rule}`,
            }}
          >
            <DossierEyebrow style={{ marginBottom: 12 }}>Graduate Study</DossierEyebrow>
            {p.person.credentials.map((cr, i) => (
              <div
                key={i}
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 15,
                  color: D_TOKENS.ink,
                  lineHeight: 1.55,
                  padding: '8px 0',
                  borderTop: i === 0 ? 'none' : `1px dotted ${D_TOKENS.rule}`,
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

function DossierColophon({ p }) {
  return (
    <section style={{ padding: '64px 72px 80px' }}>
      <DossierRule style={{ marginBottom: 40 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40 }}>
        <div>
          <DossierEyebrow style={{ marginBottom: 16 }}>Colophon</DossierEyebrow>
          <p
            style={{
              fontFamily: '"Fraunces", Georgia, serif',
              fontSize: 22,
              lineHeight: 1.4,
              fontStyle: 'italic',
              color: D_TOKENS.ink,
              maxWidth: 640,
              margin: 0,
              textWrap: 'pretty',
            }}
          >
            Prepared for the leadership of City University of Seattle — an accounting of contribution made in the open, with receipts.
          </p>
        </div>
        <div style={{ textAlign: 'right', fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: D_TOKENS.muted, lineHeight: 2 }}>
          <div>{p.person.name.toUpperCase()}</div>
          <div>{p.person.contact.email}</div>
          <div>{p.person.contact.linkedin}</div>
          <div>{p.person.contact.github}</div>
        </div>
      </div>
    </section>
  );
}

function V1Dossier() {
  const p = window.PORTFOLIO;
  return (
    <div
      style={{
        background: D_TOKENS.cream,
        color: D_TOKENS.ink,
        fontFamily: 'Georgia, "Times New Roman", serif',
        minHeight: '100%',
      }}
    >
      <DossierHero p={p} />
      <DossierStatline p={p} />
      <DossierCases p={p} />
      <VideoGallery accentColor={D_TOKENS.accent} bgColor={D_TOKENS.cream} textColor={D_TOKENS.ink} mutedColor={D_TOKENS.muted} variant="warm" />
      <InteractiveLabs accentColor={D_TOKENS.accent} textColor={D_TOKENS.ink} mutedColor={D_TOKENS.muted} ruleColor={D_TOKENS.rule} bgColor={D_TOKENS.cream} variant="warm" />
      <PhotoGallery accentColor={D_TOKENS.accent} textColor={D_TOKENS.ink} mutedColor={D_TOKENS.muted} ruleColor={D_TOKENS.rule} bgColor={D_TOKENS.cream2} variant="warm" />
      <DossierQuotes p={p} />
      <OutsideExperience accentColor={D_TOKENS.accent} textColor={D_TOKENS.ink} mutedColor={D_TOKENS.muted} ruleColor={D_TOKENS.rule} bgColor={D_TOKENS.cream} variant="warm" />
      <VolunteerImpact accentColor={D_TOKENS.accent} textColor={D_TOKENS.ink} mutedColor={D_TOKENS.muted} ruleColor={D_TOKENS.rule} bgColor={D_TOKENS.cream2} variant="warm" />
      <DossierSkills p={p} />
      <DossierAwards p={p} />
      <DossierColophon p={p} />
    </div>
  );
}

window.V1Dossier = V1Dossier;
