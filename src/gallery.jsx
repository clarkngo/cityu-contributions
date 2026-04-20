// Shared YouTube gallery — marquee of thumbnails

function VideoGallery({ accentColor = '#b8521c', bgColor = 'transparent', textColor = '#14233b', mutedColor = '#5e6b7d', variant = 'warm' }) {
  const p = window.PORTFOLIO;
  const vids = p.videos;
  const [hoverIdx, setHoverIdx] = React.useState(null);

  // Duplicate for seamless marquee
  const row1 = vids.slice(0, 57);
  const row2 = vids.slice(57);

  const Row = ({ ids, dir = 'left', speed = 80 }) => (
    <div style={{ overflow: 'hidden', marginBottom: 18 }}>
      <div
        style={{
          display: 'flex',
          gap: 14,
          width: 'max-content',
          animation: `marquee-${dir} ${speed}s linear infinite`,
        }}
      >
        {[...ids, ...ids].map((id, i) => (
          <a
            key={`${id}-${i}`}
            href={`https://www.youtube.com/watch?v=${id}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              window.open(`https://www.youtube.com/watch?v=${id}`, '_blank', 'noopener,noreferrer');
            }}
            onMouseEnter={() => setHoverIdx(`${id}-${i}`)}
            onMouseLeave={() => setHoverIdx(null)}
            style={{
              flexShrink: 0,
              width: 224,
              height: 126,
              position: 'relative',
              display: 'block',
              background: '#000',
              overflow: 'hidden',
              border: `1px solid ${hoverIdx === `${id}-${i}` ? accentColor : 'rgba(0,0,0,0.1)'}`,
              transition: 'border-color 200ms, transform 240ms',
              transform: hoverIdx === `${id}-${i}` ? 'scale(1.04)' : 'scale(1)',
              zIndex: hoverIdx === `${id}-${i}` ? 3 : 1,
            }}
          >
            <img
              src={`https://i.ytimg.com/vi/${id}/mqdefault.jpg`}
              alt=""
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => { e.target.style.opacity = 0.2; }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: hoverIdx === `${id}-${i}`
                  ? `linear-gradient(180deg, rgba(0,0,0,0) 40%, ${accentColor}cc 100%)`
                  : 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.5) 100%)',
                transition: 'background 200ms',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                padding: 8,
              }}
            >
              <div
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 10,
                  color: '#fff',
                  letterSpacing: '0.05em',
                  opacity: hoverIdx === `${id}-${i}` ? 1 : 0.7,
                }}
              >
                ▶ watch
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <section style={{ background: bgColor, padding: '72px 0 80px', overflow: 'hidden' }}>
      <div style={{ padding: '0 56px 32px' }}>
        <div
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: accentColor,
            marginBottom: 12,
          }}
        >
          Open teaching library · YouTube
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 40, alignItems: 'end' }}>
          <h2
            style={{
              fontFamily: variant === 'warm' ? '"Fraunces", Georgia, serif' : '"Inter Tight", sans-serif',
              fontSize: 64,
              fontWeight: 300,
              letterSpacing: '-0.025em',
              lineHeight: 0.98,
              margin: 0,
              color: textColor,
              textWrap: 'balance',
            }}
          >
            114 lessons, <span style={{ fontStyle: variant === 'warm' ? 'italic' : 'normal', color: accentColor }}>free to the world.</span>
          </h2>
          <p
            style={{
              fontFamily: '"Inter Tight", sans-serif',
              fontSize: 15,
              lineHeight: 1.55,
              color: mutedColor,
              margin: 0,
              textWrap: 'pretty',
            }}
          >
            A public extension of CityU's classroom — full-stack development, AI engineering,
            Linux, databases, and workshop recordings. Hover any tile to visit the lesson.
          </p>
        </div>
      </div>

      <Row ids={row1} dir="left" speed={120} />
      <Row ids={row2} dir="right" speed={140} />

      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}

// ─── Outside experience strip ───
function OutsideExperience({ accentColor = '#b8521c', textColor = '#14233b', mutedColor = '#5e6b7d', ruleColor = 'rgba(0,0,0,0.12)', bgColor = 'transparent', variant = 'warm' }) {
  const p = window.PORTFOLIO;
  return (
    <section style={{ background: bgColor, padding: '72px 56px' }}>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: accentColor,
          marginBottom: 12,
        }}
      >
        Outside the university · Industry practice
      </div>
      <h2
        style={{
          fontFamily: variant === 'warm' ? '"Fraunces", Georgia, serif' : '"Inter Tight", sans-serif',
          fontSize: 56,
          fontWeight: 300,
          letterSpacing: '-0.025em',
          margin: '0 0 36px',
          color: textColor,
          textWrap: 'balance',
        }}
      >
        Why the teaching <span style={{ fontStyle: variant === 'warm' ? 'italic' : 'normal', color: accentColor }}>lands.</span>
      </h2>
      <div>
        {p.industry.map((e, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '100px 260px 1fr',
              gap: 32,
              padding: '22px 0',
              borderTop: `1px solid ${ruleColor}`,
              borderBottom: i === p.industry.length - 1 ? `1px solid ${ruleColor}` : 'none',
              alignItems: 'baseline',
            }}
          >
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, color: accentColor }}>
              {e.year}
            </div>
            <div>
              <div
                style={{
                  fontFamily: variant === 'warm' ? '"Fraunces", Georgia, serif' : '"Inter Tight", sans-serif',
                  fontSize: 22,
                  fontWeight: variant === 'warm' ? 400 : 500,
                  color: textColor,
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                }}
              >
                {e.role}
              </div>
              <div
                style={{
                  fontFamily: '"Inter Tight", sans-serif',
                  fontSize: 13,
                  color: mutedColor,
                  marginTop: 4,
                }}
              >
                {e.org}
              </div>
            </div>
            <div
              style={{
                fontFamily: '"Inter Tight", sans-serif',
                fontSize: 14,
                lineHeight: 1.6,
                color: mutedColor,
                textWrap: 'pretty',
              }}
            >
              {e.note}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Community / volunteer strip ───
function VolunteerImpact({ accentColor = '#b8521c', textColor = '#14233b', mutedColor = '#5e6b7d', ruleColor = 'rgba(0,0,0,0.12)', bgColor = 'transparent', variant = 'warm' }) {
  const p = window.PORTFOLIO;
  return (
    <section style={{ background: bgColor, padding: '72px 56px' }}>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: accentColor,
          marginBottom: 12,
        }}
      >
        Community · Mentoring · Coaching
      </div>
      <h2
        style={{
          fontFamily: variant === 'warm' ? '"Fraunces", Georgia, serif' : '"Inter Tight", sans-serif',
          fontSize: 56,
          fontWeight: 300,
          letterSpacing: '-0.025em',
          margin: '0 0 18px',
          color: textColor,
          textWrap: 'balance',
        }}
      >
        Teaching beyond <span style={{ fontStyle: variant === 'warm' ? 'italic' : 'normal', color: accentColor }}>the classroom.</span>
      </h2>
      <p style={{ fontFamily: '"Inter Tight", sans-serif', fontSize: 15, lineHeight: 1.55, color: mutedColor, maxWidth: 640, margin: '0 0 36px', textWrap: 'pretty' }}>
        Youth mentorship, high-school and club coaching, hackathon guidance, and community speaking — a decade of unpaid commitment to the same students and communities that also shape my CityU work.
      </p>
      <div>
        {p.volunteer.map((e, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '120px 260px 1fr',
              gap: 32,
              padding: '18px 0',
              borderTop: `1px solid ${ruleColor}`,
              borderBottom: i === p.volunteer.length - 1 ? `1px solid ${ruleColor}` : 'none',
              alignItems: 'baseline',
            }}
          >
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12, color: accentColor }}>
              {e.year}
            </div>
            <div>
              <div
                style={{
                  fontFamily: variant === 'warm' ? '"Fraunces", Georgia, serif' : '"Inter Tight", sans-serif',
                  fontSize: 20,
                  fontWeight: variant === 'warm' ? 400 : 500,
                  color: textColor,
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                }}
              >
                {e.role}
              </div>
              <div style={{ fontFamily: '"Inter Tight", sans-serif', fontSize: 13, color: mutedColor, marginTop: 4 }}>
                {e.org}
              </div>
            </div>
            <div style={{ fontFamily: '"Inter Tight", sans-serif', fontSize: 14, lineHeight: 1.6, color: mutedColor, textWrap: 'pretty' }}>
              {e.note}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Photo gallery — tagged mosaic of CityU moments ───
function PhotoGallery({ accentColor = '#b8521c', textColor = '#14233b', mutedColor = '#5e6b7d', ruleColor = 'rgba(0,0,0,0.12)', bgColor = 'transparent', variant = 'warm' }) {
  const p = window.PORTFOLIO;
  const photos = p.photos || [];
  const tags = ['All', ...Array.from(new Set(photos.map(ph => ph.tag)))];
  const [filter, setFilter] = React.useState('All');
  const [lightbox, setLightbox] = React.useState(null);

  const filtered = filter === 'All' ? photos : photos.filter(ph => ph.tag === filter);

  return (
    <section style={{ background: bgColor, padding: '72px 56px' }}>
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: accentColor,
          marginBottom: 12,
        }}
      >
        Photo archive · {photos.length} moments
      </div>
      <h2
        style={{
          fontFamily: variant === 'warm' ? '"Fraunces", Georgia, serif' : '"Inter Tight", sans-serif',
          fontSize: 56,
          fontWeight: 300,
          letterSpacing: '-0.025em',
          margin: '0 0 24px',
          color: textColor,
          textWrap: 'balance',
        }}
      >
        The work, <span style={{ fontStyle: variant === 'warm' ? 'italic' : 'normal', color: accentColor }}>in pictures.</span>
      </h2>

      {/* Tag filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
        {tags.map(t => {
          const active = filter === t;
          return (
            <button
              key={t}
              onClick={() => setFilter(t)}
              style={{
                padding: '7px 14px',
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                background: active ? textColor : 'transparent',
                color: active ? (variant === 'warm' ? '#fbf6ec' : '#ffffff') : mutedColor,
                border: `1px solid ${active ? textColor : ruleColor}`,
                borderRadius: 999,
                cursor: 'pointer',
                transition: 'all 160ms ease',
              }}
            >
              {t}
            </button>
          );
        })}
      </div>

      {/* Masonry-ish grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gridAutoRows: '200px',
        gap: 10,
      }}>
        {filtered.map((ph, i) => {
          // Sprinkle variety: every 7th = tall, every 5th = wide
          const tall = i % 7 === 3;
          const wide = i % 5 === 2 && !tall;
          return (
            <div
              key={ph.src}
              onClick={() => setLightbox(ph)}
              style={{
                position: 'relative',
                gridRow: tall ? 'span 2' : 'span 1',
                gridColumn: wide ? 'span 2' : 'span 1',
                overflow: 'hidden',
                cursor: 'zoom-in',
                background: '#000',
                borderRadius: 2,
              }}
            >
              <img
                src={ph.src}
                alt={ph.caption}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 400ms ease, filter 300ms ease',
                  filter: 'saturate(1.02)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
              />
              {/* Gradient + caption */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0) 50%)',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute',
                top: 10,
                left: 10,
                padding: '4px 9px',
                background: 'rgba(255,255,255,0.92)',
                color: accentColor,
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 9,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}>
                {ph.tag}
              </div>
              <div style={{
                position: 'absolute',
                bottom: 10,
                left: 12,
                right: 12,
                color: '#fff',
                fontFamily: '"Inter Tight", sans-serif',
                fontSize: 12.5,
                lineHeight: 1.35,
                textWrap: 'pretty',
                textShadow: '0 1px 6px rgba(0,0,0,0.5)',
              }}>
                {ph.caption}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.92)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 40,
            cursor: 'zoom-out',
          }}
        >
          <div style={{ maxWidth: '90vw', maxHeight: '88vh', textAlign: 'center' }}>
            <img
              src={lightbox.src}
              alt={lightbox.caption}
              style={{ maxWidth: '100%', maxHeight: '80vh', display: 'block', margin: '0 auto' }}
            />
            <div style={{
              marginTop: 16,
              color: '#fff',
              fontFamily: '"Inter Tight", sans-serif',
              fontSize: 15,
              opacity: 0.92,
              textWrap: 'pretty',
            }}>
              <span style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 10,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#f3a66a',
                marginRight: 10,
              }}>{lightbox.tag}</span>
              {lightbox.caption}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Interactive labs — hands-on companions to teaching ───
function InteractiveLabs({ accentColor = '#b8521c', textColor = '#14233b', mutedColor = '#5e6b7d', ruleColor = 'rgba(0,0,0,0.12)', bgColor = 'transparent', variant = 'warm' }) {
  const p = window.PORTFOLIO;
  const labs = p.labs || [];
  return (
    <section style={{ background: bgColor, padding: '72px 56px' }}>
      <div style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 11,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: accentColor,
        marginBottom: 12,
      }}>
        Interactive labs · Public, open-source
      </div>
      <h2 style={{
        fontFamily: variant === 'warm' ? '"Fraunces", Georgia, serif' : '"Inter Tight", sans-serif',
        fontSize: 56,
        fontWeight: 300,
        letterSpacing: '-0.025em',
        margin: '0 0 18px',
        color: textColor,
        textWrap: 'balance',
      }}>
        Hands-on <span style={{ fontStyle: variant === 'warm' ? 'italic' : 'normal', color: accentColor }}>companions</span> to the classroom.
      </h2>
      <p style={{
        fontFamily: '"Inter Tight", sans-serif',
        fontSize: 15,
        lineHeight: 1.55,
        color: mutedColor,
        maxWidth: 680,
        margin: '0 0 36px',
        textWrap: 'pretty',
      }}>
        A growing library of interactive modules built for CityU students and the broader community — run in the browser, fork-friendly, and maintained as living references instead of dead slide decks.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 1,
        background: ruleColor,
        border: `1px solid ${ruleColor}`,
      }}>
        {labs.map((lab, i) => (
          <div
            key={i}
            style={{
              background: bgColor,
              padding: '30px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              transition: 'background 180ms ease',
              cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = variant === 'warm' ? 'rgba(184,82,28,0.04)' : 'rgba(217,119,23,0.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = bgColor; }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ fontSize: 32, lineHeight: 1 }}>{lab.icon}</div>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 10,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: accentColor,
                textAlign: 'right',
              }}>{lab.tag}</div>
            </div>
            <h3 style={{
              fontFamily: variant === 'warm' ? '"Fraunces", Georgia, serif' : '"Inter Tight", sans-serif',
              fontSize: 26,
              fontWeight: variant === 'warm' ? 400 : 500,
              letterSpacing: '-0.015em',
              color: textColor,
              margin: 0,
              lineHeight: 1.15,
              textWrap: 'balance',
            }}>{lab.title}</h3>
            <p style={{
              fontFamily: '"Inter Tight", sans-serif',
              fontSize: 14,
              lineHeight: 1.55,
              color: mutedColor,
              margin: 0,
              textWrap: 'pretty',
            }}>{lab.blurb}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
              {lab.pillars.map((pl, j) => (
                <span key={j} style={{
                  padding: '3px 9px',
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 10,
                  letterSpacing: '0.08em',
                  color: textColor,
                  background: variant === 'warm' ? 'rgba(184,82,28,0.08)' : 'rgba(217,119,23,0.1)',
                  border: `1px solid ${ruleColor}`,
                }}>{pl}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { VideoGallery, OutsideExperience, VolunteerImpact, PhotoGallery, InteractiveLabs });
