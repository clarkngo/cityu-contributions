// V3 — The Curriculum
// Warm, student-voice-led. Large testimonials as the spine.
// Navy + warm accent on ivory; structured like a syllabus index.

const C_TOKENS = {
  navy: '#122038',
  navySoft: '#2d4266',
  ivory: '#faf5ea',
  ivory2: '#f0e6d2',
  warm: '#c9623a',        // clay
  warmSoft: '#e8a078',
  muted: '#6a6558',
  rule: 'rgba(18, 32, 56, 0.12)',
};

const CSans = '"Inter Tight", "Helvetica Neue", Helvetica, Arial, sans-serif';
const CSerif = '"Fraunces", "Source Serif Pro", Georgia, serif';
const CMono = '"JetBrains Mono", ui-monospace, monospace';

// ─── HERO — student-voice-led ───
function CurrHero({ p }) {
  const lead = p.testimonials[0];
  return (
    <section style={{ padding: '72px 80px 64px', position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'end' }}>
        <div>
          <div
            style={{
              fontFamily: CMono,
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: C_TOKENS.warm,
              marginBottom: 24,
            }}
          >
            Syllabus · CityU of Seattle · 2019 → 2026
          </div>
          <h1
            style={{
              fontFamily: CSerif,
              fontSize: 120,
              fontWeight: 300,
              letterSpacing: '-0.03em',
              lineHeight: 0.92,
              margin: 0,
              color: C_TOKENS.navy,
              textWrap: 'balance',
            }}
          >
            Taught as if it <span style={{ fontStyle: 'italic', color: C_TOKENS.warm }}>mattered.</span>
          </h1>
          <p
            style={{
              marginTop: 28,
              fontFamily: CSerif,
              fontSize: 22,
              lineHeight: 1.4,
              color: C_TOKENS.navySoft,
              maxWidth: 560,
              fontStyle: 'italic',
              textWrap: 'pretty',
            }}
          >
            Two chapters of contribution by {p.person.name} — measured not in slides delivered, but in students shipped.
          </p>
        </div>
        <div
          style={{
            background: C_TOKENS.navy,
            color: C_TOKENS.ivory,
            padding: '44px 40px',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -14,
              left: 32,
              fontFamily: CSerif,
              fontSize: 160,
              lineHeight: 0.6,
              color: C_TOKENS.warmSoft,
            }}
          >
            “
          </div>
          <div
            style={{
              fontFamily: CSerif,
              fontSize: 28,
              lineHeight: 1.3,
              fontWeight: 400,
              color: C_TOKENS.ivory,
              paddingTop: 32,
              textWrap: 'pretty',
            }}
          >
            {lead.quote}
          </div>
          <div
            style={{
              marginTop: 24,
              paddingTop: 20,
              borderTop: `1px solid rgba(232, 160, 120, 0.3)`,
              fontFamily: CMono,
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: C_TOKENS.warmSoft,
            }}
          >
            {lead.who} · {lead.where}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── METRICS — warm, personable ───
function CurrMetrics({ p }) {
  return (
    <section style={{ padding: '48px 80px 80px' }}>
      <div style={{ borderTop: `2px solid ${C_TOKENS.navy}`, borderBottom: `1px solid ${C_TOKENS.rule}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {p.metrics.map((m, i) => (
            <div
              key={i}
              style={{
                padding: '36px 28px',
                borderLeft: i === 0 ? 'none' : `1px solid ${C_TOKENS.rule}`,
              }}
            >
              <div
                style={{
                  fontFamily: CSerif,
                  fontSize: 84,
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  color: C_TOKENS.navy,
                }}
              >
                <CountUp to={m.value} suffix={m.suffix} prefix={m.prefix || ''} />
              </div>
              <div
                style={{
                  marginTop: 16,
                  fontFamily: CSans,
                  fontSize: 14,
                  fontWeight: 600,
                  color: C_TOKENS.navy,
                  letterSpacing: '-0.005em',
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontFamily: CSans,
                  fontSize: 13,
                  color: C_TOKENS.muted,
                  lineHeight: 1.5,
                  textWrap: 'pretty',
                }}
              >
                {m.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CASE STUDIES — syllabus-style "units" with hover-reveal ───
function CurrCases({ p }) {
  const [hover, setHover] = React.useState(null);
  const [openId, setOpenId] = React.useState(p.cases[0].id);
  return (
    <section style={{ background: C_TOKENS.ivory2, padding: '88px 80px' }}>
      <div style={{ marginBottom: 48 }}>
        <div
          style={{
            fontFamily: CMono,
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: C_TOKENS.warm,
          }}
        >
          Coursework · Six units of contribution
        </div>
        <h2
          style={{
            fontFamily: CSerif,
            fontSize: 72,
            fontWeight: 300,
            letterSpacing: '-0.025em',
            lineHeight: 1,
            margin: '14px 0 0',
            color: C_TOKENS.navy,
          }}
        >
          What I taught. What it did.
        </h2>
      </div>

      <div>
        {p.cases.map((c, i) => {
          const isOpen = openId === c.id;
          const isHover = hover === c.id;
          return (
            <div
              key={c.id}
              onMouseEnter={() => setHover(c.id)}
              onMouseLeave={() => setHover(null)}
              style={{
                borderTop: `1px solid ${C_TOKENS.rule}`,
                borderBottom: i === p.cases.length - 1 ? `1px solid ${C_TOKENS.rule}` : 'none',
                background: isHover ? C_TOKENS.ivory : 'transparent',
                transition: 'background 240ms',
              }}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : c.id)}
                style={{
                  width: '100%',
                  padding: '28px 0',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'grid',
                  gridTemplateColumns: '100px 140px 1fr 100px 40px',
                  gap: 24,
                  alignItems: 'center',
                  color: C_TOKENS.navy,
                }}
              >
                <span
                  style={{
                    fontFamily: CSerif,
                    fontSize: 36,
                    fontStyle: 'italic',
                    color: isHover || isOpen ? C_TOKENS.warm : C_TOKENS.navySoft,
                    transition: 'color 240ms',
                  }}
                >
                  Unit {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontFamily: CMono,
                    fontSize: 10,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: C_TOKENS.muted,
                  }}
                >
                  {c.tag}
                </span>
                <span
                  style={{
                    fontFamily: CSerif,
                    fontSize: 28,
                    fontWeight: 400,
                    lineHeight: 1.15,
                    letterSpacing: '-0.01em',
                    textWrap: 'balance',
                  }}
                >
                  {c.title}
                </span>
                <span
                  style={{
                    fontFamily: CMono,
                    fontSize: 12,
                    color: C_TOKENS.muted,
                    textAlign: 'right',
                  }}
                >
                  {c.year}
                </span>
                <span
                  style={{
                    color: C_TOKENS.warm,
                    fontSize: 24,
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
                    transition: 'transform 320ms cubic-bezier(.2,.8,.2,1)',
                    display: 'inline-block',
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
                  <div
                    style={{
                      padding: '0 0 40px 100px',
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr',
                      gap: 56,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: CSerif,
                          fontSize: 24,
                          fontStyle: 'italic',
                          lineHeight: 1.35,
                          color: C_TOKENS.navy,
                          marginBottom: 20,
                          textWrap: 'pretty',
                        }}
                      >
                        {c.lead}
                      </div>
                      <div
                        style={{
                          fontFamily: CSans,
                          fontSize: 15,
                          lineHeight: 1.65,
                          color: C_TOKENS.muted,
                          textWrap: 'pretty',
                        }}
                      >
                        {c.body}
                      </div>
                      <div
                        style={{
                          marginTop: 20,
                          display: 'inline-block',
                          padding: '8px 14px',
                          background: C_TOKENS.navy,
                          color: C_TOKENS.warmSoft,
                          fontFamily: CMono,
                          fontSize: 11,
                          letterSpacing: '0.1em',
                        }}
                      >
                        ★ {linkify(c.proof, C_TOKENS.warm)}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: CMono,
                          fontSize: 10,
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: C_TOKENS.warm,
                          marginBottom: 12,
                        }}
                      >
                        Learning outcomes
                      </div>
                      {c.outcomes.map((o, j) => (
                        <div
                          key={j}
                          style={{
                            padding: '12px 0',
                            borderTop: j === 0 ? 'none' : `1px dotted ${C_TOKENS.rule}`,
                            fontFamily: CSans,
                            fontSize: 14,
                            lineHeight: 1.55,
                            color: C_TOKENS.navy,
                            display: 'grid',
                            gridTemplateColumns: '24px 1fr',
                            gap: 12,
                          }}
                        >
                          <span style={{ color: C_TOKENS.warm, fontFamily: CMono, fontSize: 12 }}>
                            ↳
                          </span>
                          <span style={{ textWrap: 'pretty' }}>{o}</span>
                        </div>
                      ))}
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

// ─── TESTIMONIAL WALL — bigger, more prominent ───
function CurrVoices({ p }) {
  return (
    <section style={{ padding: '96px 80px', background: C_TOKENS.ivory }}>
      <div
        style={{
          fontFamily: CMono,
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: C_TOKENS.warm,
        }}
      >
        In their words · LinkedIn
      </div>
      <h2
        style={{
          fontFamily: CSerif,
          fontSize: 72,
          fontWeight: 300,
          letterSpacing: '-0.025em',
          lineHeight: 1,
          margin: '14px 0 56px',
          color: C_TOKENS.navy,
          textWrap: 'balance',
        }}
      >
        The record that matters most.
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '48px 60px' }}>
        {p.testimonials.map((t, i) => (
          <figure
            key={i}
            style={{
              margin: 0,
              padding: '36px 36px 28px',
              background: i % 2 === 0 ? C_TOKENS.ivory2 : C_TOKENS.navy,
              color: i % 2 === 0 ? C_TOKENS.navy : C_TOKENS.ivory,
              position: 'relative',
              transition: 'transform 300ms',
            }}
          >
            <div
              style={{
                fontFamily: CSerif,
                fontSize: 90,
                lineHeight: 0.3,
                color: i % 2 === 0 ? C_TOKENS.warm : C_TOKENS.warmSoft,
                marginBottom: 24,
                height: 18,
              }}
            >
              “
            </div>
            <div
              style={{
                fontFamily: CSerif,
                fontSize: 24,
                lineHeight: 1.35,
                fontWeight: 400,
                textWrap: 'pretty',
              }}
            >
              {t.quote}
            </div>
            <figcaption
              style={{
                marginTop: 28,
                paddingTop: 16,
                borderTop: `1px solid ${i % 2 === 0 ? C_TOKENS.rule : 'rgba(232,160,120,0.3)'}`,
                fontFamily: CMono,
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: i % 2 === 0 ? C_TOKENS.warm : C_TOKENS.warmSoft,
              }}
            >
              {t.who}
              <span style={{ opacity: 0.6, marginLeft: 10 }}>· {t.where}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

// ─── WORKSHOPS + TIMELINE combined ───
function CurrPractice({ p }) {
  return (
    <section style={{ padding: '88px 80px', background: C_TOKENS.navy, color: C_TOKENS.ivory }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
        <div>
          <div
            style={{
              fontFamily: CMono,
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: C_TOKENS.warmSoft,
            }}
          >
            Practice
          </div>
          <h2
            style={{
              fontFamily: CSerif,
              fontSize: 56,
              fontWeight: 300,
              letterSpacing: '-0.025em',
              lineHeight: 1,
              margin: '14px 0 32px',
              color: C_TOKENS.ivory,
            }}
          >
            Workshops <span style={{ fontStyle: 'italic', color: C_TOKENS.warmSoft }}>delivered.</span>
          </h2>
          {p.workshops.map((w, i) => (
            <div
              key={i}
              style={{
                padding: '24px 0',
                borderTop: `1px solid rgba(232, 160, 120, 0.22)`,
                borderBottom: i === p.workshops.length - 1 ? `1px solid rgba(232, 160, 120, 0.22)` : 'none',
                display: 'grid',
                gridTemplateColumns: '60px 1fr',
                gap: 16,
                alignItems: 'baseline',
              }}
            >
              <span style={{ fontFamily: CMono, fontSize: 14, color: C_TOKENS.warmSoft }}>{w.year}</span>
              <div>
                <div style={{ fontFamily: CSerif, fontSize: 22, color: C_TOKENS.ivory, lineHeight: 1.2 }}>
                  {w.title}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontFamily: CSans,
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: 'rgba(250, 245, 234, 0.65)',
                    textWrap: 'pretty',
                  }}
                >
                  {w.body}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div
            style={{
              fontFamily: CMono,
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: C_TOKENS.warmSoft,
            }}
          >
            Arc
          </div>
          <h2
            style={{
              fontFamily: CSerif,
              fontSize: 56,
              fontWeight: 300,
              letterSpacing: '-0.025em',
              lineHeight: 1,
              margin: '14px 0 32px',
              color: C_TOKENS.ivory,
            }}
          >
            The through-line.
          </h2>
          {p.timeline.map((t, i) => (
            <div
              key={i}
              style={{
                padding: '18px 0',
                borderTop: `1px solid rgba(232, 160, 120, 0.22)`,
                display: 'grid',
                gridTemplateColumns: '80px 1fr',
                gap: 20,
                alignItems: 'baseline',
              }}
            >
              <span style={{ fontFamily: CSerif, fontSize: 26, fontStyle: 'italic', color: C_TOKENS.warmSoft }}>
                {t.year}
              </span>
              <span
                style={{
                  fontFamily: CSans,
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: 'rgba(250, 245, 234, 0.85)',
                  textWrap: 'pretty',
                }}
              >
                {t.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS as "topics I teach" cards ───
function CurrSkills({ p }) {
  return (
    <section style={{ padding: '88px 80px', background: C_TOKENS.ivory }}>
      <div
        style={{
          fontFamily: CMono,
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: C_TOKENS.warm,
        }}
      >
        Topics I teach · Topics I build
      </div>
      <h2
        style={{
          fontFamily: CSerif,
          fontSize: 64,
          fontWeight: 300,
          letterSpacing: '-0.025em',
          lineHeight: 1,
          margin: '14px 0 40px',
          color: C_TOKENS.navy,
        }}
      >
        Fluencies.
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
        {p.skills.map((s, i) => (
          <div
            key={i}
            style={{
              padding: '28px 32px',
              background: C_TOKENS.ivory2,
              borderLeft: `3px solid ${C_TOKENS.warm}`,
            }}
          >
            <div
              style={{
                fontFamily: CSerif,
                fontSize: 28,
                fontWeight: 500,
                color: C_TOKENS.navy,
                letterSpacing: '-0.01em',
                lineHeight: 1.15,
              }}
            >
              {s.area}
            </div>
            <div
              style={{
                marginTop: 14,
                fontFamily: CSans,
                fontSize: 15,
                lineHeight: 1.7,
                color: C_TOKENS.navySoft,
                textWrap: 'pretty',
              }}
            >
              {s.items.join(' · ')}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CurrAwards({ p }) {
  return (
    <section style={{ padding: '80px 80px', background: C_TOKENS.ivory2 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
        <div>
          <div
            style={{
              fontFamily: CMono,
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: C_TOKENS.warm,
            }}
          >
            Honors
          </div>
          <h2
            style={{
              fontFamily: CSerif,
              fontSize: 48,
              fontWeight: 300,
              letterSpacing: '-0.025em',
              margin: '14px 0 24px',
              color: C_TOKENS.navy,
            }}
          >
            Recognition.
          </h2>
          {p.awards.map((a, i) => (
            <div
              key={i}
              style={{
                padding: '16px 0',
                borderTop: `1px solid ${C_TOKENS.rule}`,
                display: 'grid',
                gridTemplateColumns: '70px 1fr',
                gap: 16,
              }}
            >
              <span style={{ fontFamily: CSerif, fontSize: 22, fontStyle: 'italic', color: C_TOKENS.warm }}>
                {a.year}
              </span>
              <div>
                <div style={{ fontFamily: CSerif, fontSize: 19, color: C_TOKENS.navy, lineHeight: 1.25 }}>
                  {a.title}
                </div>
                <div style={{ marginTop: 4, fontFamily: CSans, fontSize: 13, color: C_TOKENS.muted, lineHeight: 1.5 }}>
                  {a.body}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div
            style={{
              fontFamily: CMono,
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: C_TOKENS.warm,
            }}
          >
            Credentials
          </div>
          <h2
            style={{
              fontFamily: CSerif,
              fontSize: 48,
              fontWeight: 300,
              letterSpacing: '-0.025em',
              margin: '14px 0 24px',
              color: C_TOKENS.navy,
            }}
          >
            Certifications & study.
          </h2>
          {p.person.certifications.map((c, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '14px 0',
                borderTop: `1px solid ${C_TOKENS.rule}`,
              }}
            >
              <span style={{ fontFamily: CSerif, fontSize: 19, color: C_TOKENS.navy }}>{c.name}</span>
              <span style={{ fontFamily: CMono, fontSize: 12, color: C_TOKENS.warm }}>{c.year}</span>
            </div>
          ))}
          <div style={{ marginTop: 28 }}>
            {p.person.credentials.map((cr, i) => (
              <div
                key={i}
                style={{
                  padding: '10px 0',
                  borderTop: i === 0 ? `1px solid ${C_TOKENS.rule}` : `1px dotted ${C_TOKENS.rule}`,
                  fontFamily: CSans,
                  fontSize: 14,
                  color: C_TOKENS.navy,
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

function CurrFooter({ p }) {
  return (
    <section style={{ padding: '72px 80px', background: C_TOKENS.ivory }}>
      <div
        style={{
          borderTop: `2px solid ${C_TOKENS.navy}`,
          paddingTop: 32,
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: 48,
          alignItems: 'end',
        }}
      >
        <h2
          style={{
            fontFamily: CSerif,
            fontSize: 48,
            fontWeight: 300,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            margin: 0,
            color: C_TOKENS.navy,
            textWrap: 'balance',
          }}
        >
          The next chapter — whatever it is — should be <span style={{ fontStyle: 'italic', color: C_TOKENS.warm }}>bigger</span>.
        </h2>
        <div
          style={{
            fontFamily: CMono,
            fontSize: 12,
            color: C_TOKENS.muted,
            lineHeight: 1.9,
            textAlign: 'right',
          }}
        >
          <div>{p.person.name.toUpperCase()}</div>
          <div>{p.person.contact.email}</div>
          <div>{p.person.contact.linkedin}</div>
          <div>{p.person.contact.github}</div>
        </div>
      </div>
    </section>
  );
}

function V3Curriculum() {
  const p = window.PORTFOLIO;
  return (
    <div style={{ background: C_TOKENS.ivory, color: C_TOKENS.navy, minHeight: '100%', fontFamily: CSans }}>
      <CurrHero p={p} />
      <CurrMetrics p={p} />
      <CurrCases p={p} />
      <VideoGallery accentColor={C_TOKENS.warm} bgColor={C_TOKENS.ivory} textColor={C_TOKENS.navy} mutedColor={C_TOKENS.muted} variant="warm" />
      <InteractiveLabs accentColor={C_TOKENS.warm} textColor={C_TOKENS.navy} mutedColor={C_TOKENS.muted} ruleColor={C_TOKENS.rule} bgColor={C_TOKENS.ivory} variant="warm" />
      <PhotoGallery accentColor={C_TOKENS.warm} textColor={C_TOKENS.navy} mutedColor={C_TOKENS.muted} ruleColor={C_TOKENS.rule} bgColor={C_TOKENS.ivory2} variant="warm" />
      <CurrVoices p={p} />
      <OutsideExperience accentColor={C_TOKENS.warm} textColor={C_TOKENS.navy} mutedColor={C_TOKENS.muted} ruleColor={C_TOKENS.rule} bgColor={C_TOKENS.ivory2} variant="warm" />
      <VolunteerImpact accentColor={C_TOKENS.warm} textColor={C_TOKENS.navy} mutedColor={C_TOKENS.muted} ruleColor={C_TOKENS.rule} bgColor={C_TOKENS.ivory} variant="warm" />
      <CurrPractice p={p} />
      <CurrSkills p={p} />
      <CurrAwards p={p} />
      <CurrFooter p={p} />
    </div>
  );
}

window.V3Curriculum = V3Curriculum;
