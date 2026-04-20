// Shared design tokens & primitives for Elite and More designs
// All screens consume these — palette matches PLAN.md §1.1 exactly.

const ELITE = {
  primary: '#6B2D8A',
  primaryDark: '#4E1F66',
  primaryLight: '#8B4DAB',
  primary50: '#F5EEF9',
  primary100: '#E5D4F0',
  primary200: '#C9A5DD',
  primary700: '#4E1F66',
  primary900: '#26103A',
  gold: '#D4AF37',
  goldLight: '#E3C867',
  goldDark: '#A8871F',
  sky: '#DDE8F3',
  skyLight: '#EEF4FA',
  cream: '#FFFDF8',
  surface: '#FFFFFF',
  surfaceDim: '#F7F3FA',
  text: '#2D1B3D',
  textMuted: '#6B5A7A',
  border: '#E8DFF0',
  success: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  whatsapp: '#25D366',
  arabic: '"Tajawal", "Cairo", system-ui, sans-serif',
  display: '"Cairo", "Tajawal", system-ui, sans-serif',
  latin: '"Inter", system-ui, sans-serif',
};

// Butterfly mark — simple gold silhouette, used in header/footer
function Butterfly({ size = 28, color = ELITE.gold }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 8 C10 2, 2 4, 3 12 C3 18, 9 18, 16 16 C23 18, 29 18, 29 12 C30 4, 22 2, 16 8 Z M16 16 L16 26 M14 26 L18 26" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.15"/>
      <circle cx="16" cy="13" r="1.2" fill={color}/>
    </svg>
  );
}

// Logo lockup used across headers
function EliteLogo({ size = 'md', dark = false }) {
  const scales = { sm: { badge: 32, fs: 14, sub: 9 }, md: { badge: 44, fs: 18, sub: 10 }, lg: { badge: 64, fs: 26, sub: 12 } };
  const s = scales[size];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, direction: 'rtl' }}>
      <div style={{
        width: s.badge, height: s.badge, borderRadius: '50%',
        background: `linear-gradient(135deg, ${ELITE.primary}, ${ELITE.primaryDark})`,
        display: 'grid', placeItems: 'center',
        boxShadow: `0 0 0 2px ${ELITE.gold}`,
      }}>
        <Butterfly size={s.badge * 0.55} />
      </div>
      <div style={{ lineHeight: 1 }}>
        <div style={{ fontFamily: ELITE.display, fontWeight: 900, fontSize: s.fs, color: dark ? '#fff' : ELITE.primary, letterSpacing: -0.5 }}>
          Elite <span style={{ color: ELITE.gold }}>&</span> More
        </div>
        <div style={{ fontFamily: ELITE.latin, fontSize: s.sub, color: dark ? 'rgba(255,255,255,0.7)' : ELITE.textMuted, fontStyle: 'italic', marginTop: 3, letterSpacing: 0.3 }}>
          The Best In your Hands
        </div>
      </div>
    </div>
  );
}

// Reusable placeholder "photo" — striped with label
function PhotoPlaceholder({ w = '100%', h = '100%', label = 'product shot', tone = 'primary', radius = 12 }) {
  const toneColors = {
    primary: { a: ELITE.primary100, b: ELITE.primary50, fg: ELITE.primary },
    sky: { a: ELITE.sky, b: ELITE.skyLight, fg: ELITE.primary },
    gold: { a: '#F5E6B8', b: '#FFF8E1', fg: ELITE.goldDark },
    neutral: { a: '#E8DFF0', b: '#F7F3FA', fg: ELITE.textMuted },
  };
  const t = toneColors[tone];
  return (
    <div style={{
      width: w, height: h, borderRadius: radius, overflow: 'hidden', position: 'relative',
      background: `repeating-linear-gradient(135deg, ${t.a} 0 12px, ${t.b} 12px 24px)`,
      display: 'grid', placeItems: 'center',
    }}>
      <div style={{
        fontFamily: 'ui-monospace, "Courier New", monospace',
        fontSize: 10, color: t.fg, background: 'rgba(255,255,255,0.7)',
        padding: '4px 10px', borderRadius: 4, letterSpacing: 0.5,
      }}>{label}</div>
    </div>
  );
}

// Icon glyph (very simple — no complex SVG)
function Icon({ name, size = 18, color = 'currentColor' }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" fill="none"/><path d="M20 20 L16 16" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    heart: <path d="M12 21 C12 21, 3 14, 3 8 A4 4 0 0 1 12 6 A4 4 0 0 1 21 8 C21 14, 12 21, 12 21 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round"/>,
    heartFill: <path d="M12 21 C12 21, 3 14, 3 8 A4 4 0 0 1 12 6 A4 4 0 0 1 21 8 C21 14, 12 21, 12 21 Z" fill={color}/>,
    cart: <><path d="M3 4 H6 L8 16 H19 L21 7 H7" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round"/><circle cx="9" cy="20" r="1.5" fill={color}/><circle cx="18" cy="20" r="1.5" fill={color}/></>,
    menu: <path d="M4 7 H20 M4 12 H20 M4 17 H20" stroke={color} strokeWidth="2" strokeLinecap="round"/>,
    close: <path d="M6 6 L18 18 M18 6 L6 18" stroke={color} strokeWidth="2" strokeLinecap="round"/>,
    chevronDown: <path d="M6 9 L12 15 L18 9" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>,
    chevronLeft: <path d="M15 6 L9 12 L15 18" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>,
    chevronRight: <path d="M9 6 L15 12 L9 18" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>,
    whatsapp: <path d="M12 2 C6.5 2, 2 6.5, 2 12 C2 14, 2.5 15.8, 3.4 17.4 L2 22 L6.8 20.7 C8.3 21.5, 10.1 22, 12 22 C17.5 22, 22 17.5, 22 12 C22 6.5, 17.5 2, 12 2 Z M9 7 C9.5 7, 10 7.5, 10 8 L10.5 9.5 C10.7 10, 10.5 10.3, 10.3 10.5 L9.8 11 C10.2 12, 11 12.8, 12 13.2 L12.5 12.7 C12.7 12.5, 13 12.3, 13.5 12.5 L15 13 C15.5 13, 16 13.5, 16 14 L16 15 C16 16, 15 16.5, 14 16.5 C10.5 16.5, 7.5 13.5, 7.5 10 C7.5 9, 8 8, 9 8 Z" fill={color}/>,
    truck: <><rect x="2" y="7" width="12" height="9" stroke={color} strokeWidth="2" fill="none"/><path d="M14 10 H18 L21 13 V16 H14" stroke={color} strokeWidth="2" fill="none"/><circle cx="7" cy="18" r="2" stroke={color} strokeWidth="2" fill="none"/><circle cx="17" cy="18" r="2" stroke={color} strokeWidth="2" fill="none"/></>,
    cash: <><rect x="2" y="6" width="20" height="12" rx="2" stroke={color} strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" fill="none"/></>,
    star: <path d="M12 3 L14.5 9 L21 9.5 L16 14 L17.5 20.5 L12 17 L6.5 20.5 L8 14 L3 9.5 L9.5 9 Z" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.2"/>,
    phone: <path d="M5 4 H9 L10 9 L7.5 10.5 C8.5 12.5, 11.5 15.5, 13.5 16.5 L15 14 L20 15 V19 C20 20, 19 21, 18 21 C10 21, 3 14, 3 6 C3 5, 4 4, 5 4 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round"/>,
    location: <><path d="M12 22 C12 22, 5 14, 5 9 A7 7 0 0 1 19 9 C19 14, 12 22, 12 22 Z" stroke={color} strokeWidth="2" fill="none"/><circle cx="12" cy="9" r="2.5" stroke={color} strokeWidth="2" fill="none"/></>,
    facebook: <path d="M13 22 V13 H16 L16.5 9.5 H13 V7.5 C13 6.5, 13.5 6, 14.5 6 H16.5 V3 C16 3, 15 2.8, 14 2.8 C11.5 2.8, 10 4.3, 10 7 V9.5 H7 V13 H10 V22 Z" fill={color}/>,
    plus: <path d="M12 5 V19 M5 12 H19" stroke={color} strokeWidth="2" strokeLinecap="round"/>,
    minus: <path d="M5 12 H19" stroke={color} strokeWidth="2" strokeLinecap="round"/>,
    trash: <><path d="M4 7 H20 M10 4 H14 M6 7 V20 C6 21, 7 22, 8 22 H16 C17 22, 18 21, 18 20 V7" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/><path d="M10 11 V18 M14 11 V18" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    edit: <><path d="M4 20 H20" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M14 4 L20 10 L10 20 L4 20 L4 14 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round"/></>,
    check: <path d="M5 12 L10 17 L19 7" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>,
    eye: <><path d="M2 12 C4 7, 7.5 5, 12 5 C16.5 5, 20 7, 22 12 C20 17, 16.5 19, 12 19 C7.5 19, 4 17, 2 12 Z" stroke={color} strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" fill="none"/></>,
    filter: <path d="M4 5 H20 L14 13 V20 L10 18 V13 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round"/>,
    grid: <><rect x="4" y="4" width="7" height="7" stroke={color} strokeWidth="2" fill="none"/><rect x="13" y="4" width="7" height="7" stroke={color} strokeWidth="2" fill="none"/><rect x="4" y="13" width="7" height="7" stroke={color} strokeWidth="2" fill="none"/><rect x="13" y="13" width="7" height="7" stroke={color} strokeWidth="2" fill="none"/></>,
    tag: <><path d="M3 12 L12 3 L21 3 L21 12 L12 21 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round"/><circle cx="16" cy="8" r="1.5" fill={color}/></>,
    box: <><path d="M3 7 L12 3 L21 7 L12 11 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round"/><path d="M3 7 V17 L12 21 L21 17 V7 M12 11 V21" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round"/></>,
    settings: <><circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" fill="none"/><path d="M12 2 V5 M12 19 V22 M2 12 H5 M19 12 H22 M5 5 L7 7 M17 17 L19 19 M5 19 L7 17 M17 7 L19 5" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="2" stroke={color} strokeWidth="2" fill="none"/><circle cx="9" cy="10" r="1.5" fill={color}/><path d="M21 16 L15 11 L3 19" stroke={color} strokeWidth="2" fill="none"/></>,
    users: <><circle cx="9" cy="8" r="3.5" stroke={color} strokeWidth="2" fill="none"/><path d="M2 20 C2 16, 5 14, 9 14 C13 14, 16 16, 16 20" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/></>,
    home: <path d="M3 11 L12 3 L21 11 V21 H15 V14 H9 V21 H3 Z" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round"/>,
    copy: <><rect x="8" y="8" width="12" height="12" rx="2" stroke={color} strokeWidth="2" fill="none"/><path d="M16 8 V6 C16 5, 15 4, 14 4 H6 C5 4, 4 5, 4 6 V14 C4 15, 5 16, 6 16 H8" stroke={color} strokeWidth="2" fill="none"/></>,
    info: <><circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none"/><path d="M12 8 V8.1 M12 11 V17" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    help: <><circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none"/><path d="M9.5 9 C9.5 7.5, 10.5 7, 12 7 C13.5 7, 14.5 7.8, 14.5 9 C14.5 11, 12 11, 12 13 M12 16 V16.1" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/></>,
    logout: <><path d="M10 4 H5 C4 4, 3 5, 3 6 V18 C3 19, 4 20, 5 20 H10" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/><path d="M16 8 L20 12 L16 16 M20 12 H9" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}>
      {paths[name] || null}
    </svg>
  );
}

// Pretty SYP formatting
const fmtSYP = (n) => new Intl.NumberFormat('en-US').format(n) + ' ل.س';
const fmtUSD = (n, rate = 15000) => '≈ ' + (n / rate).toFixed(2) + ' $';

Object.assign(window, { ELITE, Butterfly, EliteLogo, PhotoPlaceholder, Icon, fmtSYP, fmtUSD });
