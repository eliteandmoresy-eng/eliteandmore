// Mobile views — Home + Product (iPhone-sized frames)

function MobileFrame({ children, label }) {
  return (
    <div style={{ width: 390, height: 844, background: '#000', borderRadius: 48, padding: 10, boxShadow: '0 20px 60px rgba(0,0,0,0.25)' }}>
      <div style={{ width: '100%', height: '100%', borderRadius: 40, overflow: 'hidden', position: 'relative', background: ELITE.cream }}>
        {/* status bar */}
        <div style={{ height: 44, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', fontFamily: ELITE.latin, fontSize: 14, fontWeight: 700, color: ELITE.text, position: 'relative', zIndex: 5 }}>
          <div>9:41</div>
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: 8, width: 100, height: 28, background: '#000', borderRadius: 20 }} />
          <div style={{ display: 'flex', gap: 4, fontSize: 12 }}>●●● 100%</div>
        </div>
        {children}
      </div>
    </div>
  );
}

function MobileHomeScreen() {
  return (
    <MobileFrame>
      {/* header */}
      <div style={{ padding: '12px 16px', background: '#fff', borderBottom: `1px solid ${ELITE.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', direction: 'rtl', fontFamily: ELITE.arabic }}>
        <Icon name="menu" size={22} color={ELITE.primary} />
        <EliteLogo size="sm" />
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ position: 'relative' }}>
            <Icon name="heart" size={22} color={ELITE.primary} />
            <div style={{ position: 'absolute', top: -6, left: -6, width: 14, height: 14, borderRadius: 7, background: ELITE.gold, color: ELITE.primary, fontSize: 9, fontWeight: 800, display: 'grid', placeItems: 'center' }}>3</div>
          </div>
          <div style={{ position: 'relative' }}>
            <Icon name="cart" size={22} color={ELITE.primary} />
            <div style={{ position: 'absolute', top: -6, left: -6, width: 14, height: 14, borderRadius: 7, background: ELITE.gold, color: ELITE.primary, fontSize: 9, fontWeight: 800, display: 'grid', placeItems: 'center' }}>2</div>
          </div>
        </div>
      </div>

      <div style={{ height: 'calc(100% - 44px - 62px - 70px)', overflow: 'hidden', direction: 'rtl', fontFamily: ELITE.arabic }}>
        {/* Hero */}
        <div style={{ height: 220, background: `linear-gradient(135deg, ${ELITE.sky}, ${ELITE.primary50})`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 16, left: 16, opacity: 0.2 }}><Butterfly size={80} color={ELITE.primary} /></div>
          <div style={{ position: 'absolute', inset: 0, padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontFamily: ELITE.display, fontSize: 36, fontWeight: 900, color: ELITE.primary, lineHeight: 1 }}>
              Elite <span style={{ color: ELITE.gold }}>&</span> More
            </div>
            <div style={{ fontFamily: ELITE.latin, fontSize: 13, color: ELITE.goldDark, fontStyle: 'italic', margin: '6px 0 12px' }}>
              The Best In your Hands
            </div>
            <Btn variant="gold" size="sm">تسوّق الآن ←</Btn>
          </div>
        </div>

        {/* banner slider */}
        <div style={{ padding: '12px 16px' }}>
          <div style={{ borderRadius: 12, overflow: 'hidden', background: ELITE.primary, height: 120, padding: 16, display: 'flex', alignItems: 'center', gap: 12, color: '#fff', position: 'relative' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: ELITE.gold, fontWeight: 700, marginBottom: 4 }}>عرض خاص</div>
              <div style={{ fontFamily: ELITE.display, fontSize: 18, fontWeight: 900, lineHeight: 1.2 }}>خصم 40% على BESTON</div>
            </div>
            <div style={{ width: 70, height: 70 }}><PhotoPlaceholder tone="gold" label="" radius={8} /></div>
            <div style={{ position: 'absolute', bottom: 6, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 4 }}>
              <div style={{ width: 16, height: 4, borderRadius: 2, background: ELITE.gold }} />
              <div style={{ width: 4, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.5)' }} />
              <div style={{ width: 4, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.5)' }} />
            </div>
          </div>
        </div>

        {/* features */}
        <div style={{ padding: '4px 16px 12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[{i:'truck',l:'شحن'},{i:'cash',l:'كاش'},{i:'star',l:'أصلي'},{i:'whatsapp',l:'دعم'}].map(f => (
              <div key={f.i} style={{ textAlign: 'center', padding: 10, background: '#fff', borderRadius: 10 }}>
                <Icon name={f.i} size={20} color={ELITE.primary} />
                <div style={{ fontSize: 10, fontWeight: 700, color: ELITE.text, marginTop: 4 }}>{f.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* brands */}
        <div style={{ padding: '4px 16px 12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <div style={{ fontFamily: ELITE.display, fontSize: 18, fontWeight: 900, color: ELITE.primary }}>برنداتنا</div>
            <div style={{ fontSize: 11, color: ELITE.gold, fontWeight: 700 }}>عرض الكل</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {['NUK','BESTON','Millia','PRESTIGE'].map(b => (
              <div key={b} style={{ aspectRatio: '1', borderRadius: 10, background: '#fff', border: `1px solid ${ELITE.border}`, display: 'grid', placeItems: 'center', fontFamily: ELITE.latin, fontSize: 11, fontWeight: 800, color: ELITE.primary }}>{b}</div>
            ))}
          </div>
        </div>

        {/* products */}
        <div style={{ padding: '8px 16px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <div style={{ fontFamily: ELITE.display, fontSize: 18, fontWeight: 900, color: ELITE.primary }}>جديد</div>
            <div style={{ fontSize: 11, color: ELITE.gold, fontWeight: 700 }}>عرض الكل</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <ProductCard name="منظف أرضيات لافندر" brand="NUK" price={45000} placeholder="sky" />
            <ProductCard name="شامبو عناية" brand="Millia" price={68000} salePrice={52000} placeholder="primary" favorite />
          </div>
        </div>
      </div>

      {/* bottom tab bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: `1px solid ${ELITE.border}`, padding: '10px 20px 24px', display: 'flex', justifyContent: 'space-around', direction: 'rtl' }}>
        {[
          { i: 'home', l: 'الرئيسية', a: true },
          { i: 'search', l: 'تسوّق' },
          { i: 'heart', l: 'المفضلة' },
          { i: 'cart', l: 'السلة', badge: 2 },
        ].map(t => (
          <div key={t.i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, position: 'relative' }}>
            <Icon name={t.i} size={20} color={t.a ? ELITE.primary : ELITE.textMuted} />
            <div style={{ fontSize: 10, fontWeight: 700, color: t.a ? ELITE.primary : ELITE.textMuted, fontFamily: ELITE.arabic }}>{t.l}</div>
            {t.badge && <div style={{ position: 'absolute', top: -4, left: 8, width: 16, height: 16, borderRadius: 8, background: ELITE.gold, color: ELITE.primary, fontSize: 9, fontWeight: 800, display: 'grid', placeItems: 'center' }}>{t.badge}</div>}
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 90, left: 16, width: 48, height: 48, borderRadius: '50%', background: ELITE.whatsapp, display: 'grid', placeItems: 'center', boxShadow: '0 6px 20px rgba(37,211,102,0.5)' }}>
        <Icon name="whatsapp" size={24} color="#fff" />
      </div>
    </MobileFrame>
  );
}

function MobileProductScreen() {
  return (
    <MobileFrame>
      <div style={{ padding: '10px 16px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', direction: 'rtl', borderBottom: `1px solid ${ELITE.border}` }}>
        <Icon name="chevronRight" size={22} color={ELITE.text} />
        <div style={{ fontFamily: ELITE.arabic, fontSize: 14, fontWeight: 700, color: ELITE.text }}>تفاصيل المنتج</div>
        <Icon name="heart" size={22} color={ELITE.primary} />
      </div>
      <div style={{ height: 'calc(100% - 44px - 54px - 90px)', overflowY: 'hidden', direction: 'rtl', fontFamily: ELITE.arabic }}>
        <div style={{ aspectRatio: '1', background: ELITE.skyLight, position: 'relative' }}>
          <PhotoPlaceholder tone="sky" label="product hero" radius={0} />
          <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <TagBadge label="جديد" color={ELITE.primary} size="sm" />
            <TagBadge label="-29%" color={ELITE.gold} size="sm" />
          </div>
          <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 4 }}>
            {[0,1,2,3].map(i => <div key={i} style={{ width: i === 0 ? 16 : 6, height: 6, borderRadius: 3, background: i === 0 ? ELITE.primary : 'rgba(0,0,0,0.3)' }} />)}
          </div>
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ fontSize: 10, color: ELITE.gold, fontWeight: 700, letterSpacing: 0.5, fontFamily: ELITE.latin, marginBottom: 4 }}>NUK CLEAN</div>
          <h1 style={{ fontFamily: ELITE.display, fontSize: 18, fontWeight: 900, color: ELITE.text, margin: 0, lineHeight: 1.4 }}>
            منظف أرضيات معطر بخلاصة اللافندر
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '8px 0' }}>
            <div style={{ display: 'flex', gap: 1 }}>{[1,2,3,4,5].map(i => <Icon key={i} name="star" size={12} color={i <= 4 ? ELITE.gold : ELITE.border} />)}</div>
            <div style={{ fontSize: 11, color: ELITE.textMuted }}>(24)</div>
          </div>
          <div style={{ padding: 14, background: ELITE.surfaceDim, borderRadius: 12, margin: '12px 0' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
              <div style={{ fontFamily: ELITE.latin, fontSize: 22, fontWeight: 900, color: ELITE.primary }}>32,000 ل.س</div>
              <div style={{ fontFamily: ELITE.latin, fontSize: 13, color: ELITE.textMuted, textDecoration: 'line-through' }}>45,000</div>
            </div>
            <div style={{ fontFamily: ELITE.latin, fontSize: 11, color: ELITE.textMuted, marginTop: 2 }}>≈ 2.13 $</div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: ELITE.text, marginBottom: 6 }}>الحجم:</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {[{v:'500مل'},{v:'1 لتر'},{v:'2 لتر', a: true},{v:'5 لتر'}].map(s => (
                <div key={s.v} style={{ padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 700, background: s.a ? ELITE.primary : '#fff', color: s.a ? '#fff' : ELITE.text, border: `1.5px solid ${s.a ? ELITE.primary : ELITE.border}` }}>{s.v}</div>
              ))}
            </div>
          </div>

          <div style={{ padding: 12, background: '#fff', border: `1px solid ${ELITE.border}`, borderRadius: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: ELITE.primary, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon name="location" size={14} color={ELITE.primary} /> اختر محافظتك
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
              {[{n:'دمشق',a:true,ok:true},{n:'حلب',ok:true},{n:'حمص',ok:true},{n:'اللاذقية',ok:true},{n:'طرطوس',ok:true},{n:'درعا',ok:true},{n:'حماه'},{n:'الرقة'}].map(g => (
                <div key={g.n} style={{ padding: '6px 2px', borderRadius: 6, textAlign: 'center', fontSize: 11, fontWeight: 700, background: g.a ? ELITE.primary : g.ok ? ELITE.primary50 : '#F5F3F7', color: g.a ? '#fff' : g.ok ? ELITE.primary : '#B9B0C4', textDecoration: g.ok ? 'none' : 'line-through' }}>{g.n}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Sticky CTA */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 16px 28px', background: '#fff', borderTop: `1px solid ${ELITE.border}`, display: 'flex', gap: 8, direction: 'rtl' }}>
        <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${ELITE.border}`, borderRadius: 8 }}>
          <div style={{ width: 32, height: 40, display: 'grid', placeItems: 'center' }}><Icon name="minus" size={14} /></div>
          <div style={{ width: 28, textAlign: 'center', fontSize: 14, fontWeight: 800 }}>1</div>
          <div style={{ width: 32, height: 40, display: 'grid', placeItems: 'center' }}><Icon name="plus" size={14} color={ELITE.primary} /></div>
        </div>
        <div style={{ flex: 1 }}><Btn variant="primary" size="md" full icon="cart">أضف للسلة</Btn></div>
      </div>
    </MobileFrame>
  );
}

Object.assign(window, { MobileFrame, MobileHomeScreen, MobileProductScreen });
