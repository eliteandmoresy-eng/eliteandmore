// Shared chrome — Header, Footer, TopBar, FloatingWhatsApp, ProductCard, Tag badge
// Used across all public-site screens.

function TopAnnouncementBar() {
  return (
    <div style={{
      height: 36, background: ELITE.primary, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, fontFamily: ELITE.arabic, direction: 'rtl',
      gap: 24, position: 'relative',
    }}>
      <span>شحن لكل المحافظات السورية</span>
      <span style={{ color: ELITE.gold }}>•</span>
      <span>الدفع عند الاستلام متاح</span>
      <span style={{ color: ELITE.gold }}>•</span>
      <span>دفع شام كاش متاح</span>
      <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', opacity: 0.7 }}>
        <Icon name="close" size={14} />
      </div>
    </div>
  );
}

function SiteHeader({ active = 'home', compact = false }) {
  const links = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'shop', label: 'المتجر' },
    { id: 'brands', label: 'البرندات', hasDropdown: true },
    { id: 'about', label: 'من نحن' },
  ];
  return (
    <header style={{
      height: 80, background: '#fff', borderBottom: `1px solid ${ELITE.border}`,
      display: 'flex', alignItems: 'center', padding: '0 32px',
      direction: 'rtl', fontFamily: ELITE.arabic,
      position: 'relative', zIndex: 10,
    }}>
      <EliteLogo size="md" />
      <nav style={{ display: 'flex', gap: 32, margin: '0 64px', flex: 1 }}>
        {links.map(l => (
          <div key={l.id} style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: 15, fontWeight: l.id === active ? 700 : 500,
            color: l.id === active ? ELITE.primary : ELITE.text,
            position: 'relative', cursor: 'pointer', padding: '6px 0',
          }}>
            {l.label}
            {l.hasDropdown && <Icon name="chevronDown" size={14} />}
            {l.id === active && (
              <div style={{
                position: 'absolute', bottom: -8, right: 0, left: 0, height: 3,
                background: ELITE.gold, borderRadius: 2,
              }}/>
            )}
          </div>
        ))}
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: ELITE.surfaceDim, padding: '8px 14px', borderRadius: 24,
          width: 220, color: ELITE.textMuted, fontSize: 13,
        }}>
          <Icon name="search" size={16} />
          <span>ابحث عن منتج...</span>
        </div>
        <IconButton badge="3"><Icon name="heart" size={20} color={ELITE.primary} /></IconButton>
        <IconButton badge="2" filled><Icon name="cart" size={20} color="#fff" /></IconButton>
      </div>
    </header>
  );
}

function IconButton({ children, badge, filled }) {
  return (
    <div style={{
      position: 'relative', width: 42, height: 42, borderRadius: '50%',
      background: filled ? ELITE.primary : ELITE.surfaceDim,
      display: 'grid', placeItems: 'center', cursor: 'pointer',
    }}>
      {children}
      {badge && (
        <div style={{
          position: 'absolute', top: -2, left: -2,
          minWidth: 18, height: 18, padding: '0 5px',
          background: ELITE.gold, color: ELITE.primary, fontSize: 10, fontWeight: 700,
          borderRadius: 9, display: 'grid', placeItems: 'center',
          border: '2px solid #fff',
        }}>{badge}</div>
      )}
    </div>
  );
}

function SiteFooter() {
  return (
    <footer style={{
      background: ELITE.primary, color: '#fff', padding: '48px 32px 0',
      direction: 'rtl', fontFamily: ELITE.arabic,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 40, paddingBottom: 40 }}>
        <div>
          <EliteLogo size="md" dark />
          <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', marginTop: 16 }}>
            Elite and More وجهتك المفضلة لمنتجات التنظيف والعناية الأصلية في سوريا. نختار أفضل البرندات بعناية.
          </p>
          <div style={{ color: ELITE.gold, fontStyle: 'italic', fontSize: 13, marginTop: 12, fontFamily: ELITE.latin }}>
            "The Best In your Hands"
          </div>
        </div>
        <FooterCol title="روابط سريعة" items={['الرئيسية', 'المتجر', 'البرندات', 'من نحن', 'المفضلة', 'السلة']} />
        <FooterCol title="التواصل" items={[
          <><Icon name="phone" size={14} color={ELITE.gold} /> +963 936 666 950</>,
          <><Icon name="whatsapp" size={14} color={ELITE.gold} /> واتساب: 0936 666 950</>,
          <><Icon name="location" size={14} color={ELITE.gold} /> دمشق - سوريا</>,
          'السبت - الخميس: 9 ص - 9 م',
          'الجمعة: مغلق',
        ]} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>تابعنا</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'grid', placeItems: 'center' }}>
              <Icon name="facebook" size={18} color="#fff" />
            </div>
          </div>
          <div style={{ marginTop: 24, padding: 16, background: 'rgba(255,255,255,0.06)', borderRadius: 12, border: `1px solid ${ELITE.gold}40` }}>
            <div style={{ fontSize: 12, color: ELITE.gold, fontWeight: 700, marginBottom: 4 }}>🦋 منتجات أصلية 100%</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>كل منتجاتنا من مصادر موثوقة ومعتمدة.</div>
          </div>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', padding: '16px 0', textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
        © 2026 Elite and More. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>{title}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map((it, i) => (
          <div key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: 8 }}>{it}</div>
        ))}
      </div>
    </div>
  );
}

function FloatingWhatsApp({ bottom = 24 }) {
  return (
    <div style={{
      position: 'absolute', bottom, left: 24, zIndex: 20,
      width: 56, height: 56, borderRadius: '50%', background: ELITE.whatsapp,
      display: 'grid', placeItems: 'center',
      boxShadow: '0 8px 24px rgba(37, 211, 102, 0.4)',
      cursor: 'pointer',
    }}>
      <Icon name="whatsapp" size={28} color="#fff" />
      <div style={{
        position: 'absolute', inset: -6, borderRadius: '50%',
        border: `2px solid ${ELITE.whatsapp}`, opacity: 0.4,
      }}/>
    </div>
  );
}

// Tag badge (new, sale, best seller...)
function TagBadge({ label, color = ELITE.primary, size = 'md' }) {
  const sizes = { sm: { fs: 10, pad: '2px 8px' }, md: { fs: 11, pad: '4px 10px' }, lg: { fs: 13, pad: '6px 14px' } };
  const s = sizes[size];
  return (
    <div style={{
      fontSize: s.fs, padding: s.pad, borderRadius: 4,
      background: color, color: '#fff', fontWeight: 700,
      fontFamily: ELITE.arabic, display: 'inline-block',
      letterSpacing: 0.2,
    }}>{label}</div>
  );
}

// Product card — used everywhere
function ProductCard({ name, brand, price, salePrice, tags = [], placeholder = 'primary', favorite = false, outOfStock = false }) {
  const discount = salePrice ? Math.round((1 - salePrice / price) * 100) : 0;
  return (
    <div style={{
      background: '#fff', borderRadius: 16, overflow: 'hidden',
      border: `1px solid ${ELITE.border}`,
      boxShadow: '0 4px 20px rgba(107, 45, 138, 0.08)',
      fontFamily: ELITE.arabic, direction: 'rtl', position: 'relative',
    }}>
      {/* tags row */}
      <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', flexDirection: 'column', gap: 4, zIndex: 2 }}>
        {tags.map((t, i) => <TagBadge key={i} label={t.label} color={t.color} size="sm" />)}
        {salePrice && <TagBadge label={`-${discount}%`} color={ELITE.gold} size="sm" />}
      </div>
      {/* heart */}
      <div style={{
        position: 'absolute', top: 10, left: 10, zIndex: 2,
        width: 32, height: 32, borderRadius: '50%', background: '#fff',
        display: 'grid', placeItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <Icon name={favorite ? 'heartFill' : 'heart'} size={16} color={favorite ? ELITE.danger : ELITE.textMuted} />
      </div>

      <div style={{ aspectRatio: '1 / 1', background: ELITE.surfaceDim, position: 'relative' }}>
        <PhotoPlaceholder tone={placeholder} label={name} radius={0} />
        {outOfStock && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(45, 27, 61, 0.6)',
            display: 'grid', placeItems: 'center',
          }}>
            <div style={{ background: '#fff', padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 700, color: ELITE.danger }}>
              غير متوفر حالياً
            </div>
          </div>
        )}
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ fontSize: 10, color: ELITE.gold, fontWeight: 700, letterSpacing: 0.5, marginBottom: 4, fontFamily: ELITE.latin, textTransform: 'uppercase' }}>{brand}</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: ELITE.text, marginBottom: 10, lineHeight: 1.4, minHeight: 36 }}>{name}</div>
        {salePrice ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: ELITE.primary, fontFamily: ELITE.latin }}>{fmtSYP(salePrice)}</span>
              <span style={{ fontSize: 12, color: ELITE.textMuted, textDecoration: 'line-through', fontFamily: ELITE.latin }}>{fmtSYP(price)}</span>
            </div>
            <div style={{ fontSize: 11, color: ELITE.textMuted, fontFamily: ELITE.latin, marginTop: 2 }}>{fmtUSD(salePrice)}</div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: ELITE.primary, fontFamily: ELITE.latin }}>{fmtSYP(price)}</div>
            <div style={{ fontSize: 11, color: ELITE.textMuted, fontFamily: ELITE.latin, marginTop: 2 }}>{fmtUSD(price)}</div>
          </div>
        )}
        <button style={{
          marginTop: 12, width: '100%', padding: '10px 12px', border: 'none',
          background: outOfStock ? ELITE.border : ELITE.primary, color: outOfStock ? ELITE.textMuted : '#fff',
          borderRadius: 8, fontSize: 13, fontWeight: 700, fontFamily: ELITE.arabic,
          cursor: outOfStock ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <Icon name="cart" size={14} color={outOfStock ? ELITE.textMuted : '#fff'} />
          {outOfStock ? 'غير متاح' : 'أضف إلى السلة'}
        </button>
      </div>
    </div>
  );
}

// Button (shared)
function Btn({ children, variant = 'primary', size = 'md', icon, full = false, disabled = false }) {
  const variants = {
    primary: { bg: ELITE.primary, fg: '#fff', border: 'transparent' },
    gold: { bg: ELITE.gold, fg: ELITE.primary, border: 'transparent' },
    outline: { bg: 'transparent', fg: ELITE.primary, border: ELITE.primary },
    outlineGold: { bg: 'transparent', fg: ELITE.goldDark, border: ELITE.gold },
    whatsapp: { bg: ELITE.whatsapp, fg: '#fff', border: 'transparent' },
    ghost: { bg: ELITE.surfaceDim, fg: ELITE.text, border: 'transparent' },
    danger: { bg: ELITE.danger, fg: '#fff', border: 'transparent' },
  };
  const sizes = { sm: { pad: '6px 12px', fs: 12 }, md: { pad: '10px 20px', fs: 14 }, lg: { pad: '14px 28px', fs: 16 } };
  const v = variants[variant], s = sizes[size];
  return (
    <button style={{
      padding: s.pad, fontSize: s.fs, fontWeight: 700,
      background: disabled ? ELITE.border : v.bg, color: disabled ? ELITE.textMuted : v.fg,
      border: `1.5px solid ${disabled ? ELITE.border : v.border}`,
      borderRadius: 8, fontFamily: ELITE.arabic, cursor: disabled ? 'not-allowed' : 'pointer',
      width: full ? '100%' : 'auto',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    }}>
      {icon && <Icon name={icon} size={s.fs + 2} color={disabled ? ELITE.textMuted : v.fg} />}
      {children}
    </button>
  );
}

Object.assign(window, {
  TopAnnouncementBar, SiteHeader, SiteFooter, FloatingWhatsApp,
  TagBadge, ProductCard, Btn, IconButton,
});
