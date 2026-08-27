// Shared helpers — animated counter, expandable section, hover-card
// Exported to window for cross-script use.

function useInView(ref, rootMargin = '-10% 0px') {
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setSeen(true);
      },
      { rootMargin, threshold: 0.15 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, seen, rootMargin]);
  return seen;
}

function CountUp({ to, duration = 1400, prefix = '', suffix = '', className, style }) {
  const ref = React.useRef(null);
  const seen = useInView(ref);
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!seen) return;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to, duration]);
  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}

function Expand({ open: controlled, defaultOpen = false, renderHeader, children, style }) {
  const [openU, setOpenU] = React.useState(defaultOpen);
  const open = controlled ?? openU;
  return (
    <div style={style}>
      {renderHeader({ open, toggle: () => setOpenU((o) => !o) })}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: 'grid-template-rows 420ms cubic-bezier(.2,.8,.2,1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>{children}</div>
      </div>
    </div>
  );
}

function linkify(text, color) {
  if (!text) return text;
  const regex = /((?:https?:\/\/|www\.)[^\s,]+|[a-z0-9-]+\.github\.io\/[^\s,]+)/gi;
  const parts = String(text).split(regex);
  return parts.map((p, i) => {
    if (i % 2 === 1) {
      const href = p.startsWith('http') ? p : `https://${p}`;
      return <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{ color, textDecoration: 'underline', textDecorationThickness: 1, textUnderlineOffset: 3 }}>{p}</a>;
    }
    return <React.Fragment key={i}>{p}</React.Fragment>;
  });
}

Object.assign(window, { useInView, CountUp, Expand, linkify });
