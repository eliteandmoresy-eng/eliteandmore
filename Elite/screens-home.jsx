// Homepage screen — Hero, BannerSlider, Features, About, Brands, TagSection, BrandSection
function HomepageScreen() {
  return (
    <div style={{ width: 1440, background: ELITE.cream, fontFamily: ELITE.arabic, direction: 'rtl', position: 'relative' }}>
      <TopAnnouncementBar />
      <SiteHeader active="home" />

      {/* HERO */}
      <div style={{ position: 'relative', height: 500, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(135deg, ${ELITE.sky} 0%, ${ELITE.skyLight} 50%, ${ELITE.primary50} 100%)`,
        }}>
          <div style={{ position: 'absolute', top: 40, right: 60, opacity: 0.15 }}><Butterfly size={200} color={ELITE.primary} /></div>
          <div style={{ position: 'absolute', bottom: 60, left: 80, opacity: 0.1 }}><Butterfly size={140} color={ELITE.gold} /></div>
        </div>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 80px' }}>
          <div style={{ maxWidth: 600 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.8)', padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700, color: ELITE.primary, marginBottom: 20 }}>
              <Butterfly size={14} /> متجر منتجات العناية والتنظيف الأصلية
            </div>
            <h1 style={{ fontFamily: ELITE.display, fontSize: 72, fontWeight: 900, color: ELITE.primary, margin: 0, lineHeight: 1, letterSpacing: -1, textShadow: '0 2px 6px rgba(107,45,138,0.1)' }}>
              Elite <span style={{ color: ELITE.gold }}>&</span> More
            </h1>
            <div style={{ fontFamily: ELITE.latin, fontSize: 26, color: ELITE.goldDark, fontStyle: 'italic', margin: '12px 0 24px', fontWeight: 600 }}>
              The Best In your Hands
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: ELITE.text, marginBottom: 32, maxWidth: 480 }}>
              اكتشف أرقى البرندات العالمية لمنتجات التنظيف والعناية الشخصية — أصلية، موثوقة، وتصلك إلى بابك في كل المحافظات.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Btn variant="gold" size="lg" icon="cart">تسوّق الآن</Btn>
              <Btn variant="outline" size="lg">شاهد البرندات</Btn>
            </div>
          </div>
        </div>
      </div>

      {/* BANNER SLIDER */}
      <div style={{ maxWidth: 1280, margin: '16px auto 0', padding: '0 32px' }}>
        <div style={{
          aspectRatio: '2 / 1', maxHeight: 500, borderRadius: 20, overflow: 'hidden',
          background: ELITE.skyLight, position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(110deg, ${ELITE.primary} 0%, ${ELITE.primaryDark} 60%, #1a0933 100%)`,
            display: 'flex', alignItems: 'center', padding: '0 80px', color: '#fff',
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: ELITE.gold, fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>عرض خاص محدود</div>
              <div style={{ fontFamily: ELITE.display, fontSize: 56, fontWeight: 900, lineHeight: 1.1, marginBottom: 16 }}>
                خصم حتى<br />
                <span style={{ color: ELITE.gold }}>40%</span> على منتجات BESTON
              </div>
              <Btn variant="gold" size="lg">اكتشف العرض</Btn>
            </div>
            <div style={{ width: 360, height: 360 }}>
              <PhotoPlaceholder tone="gold" label="promo product" radius={24} />
            </div>
          </div>
          {/* arrows */}
          <div style={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.8)', display: 'grid', placeItems: 'center' }}>
            <Icon name="chevronRight" size={20} color={ELITE.primary} />
          </div>
          <div style={{ position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.8)', display: 'grid', placeItems: 'center' }}>
            <Icon name="chevronLeft" size={20} color={ELITE.primary} />
          </div>
          {/* pagination */}
          <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
            <div style={{ width: 22, height: 6, borderRadius: 3, background: ELITE.gold }} />
            <div style={{ width: 6, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.55)' }} />
            <div style={{ width: 6, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.55)' }} />
          </div>
        </div>
      </div>

      {/* FEATURES STRIP */}
      <div style={{ maxWidth: 1280, margin: '40px auto 0', padding: '0 32px' }}>
        <div style={{
          background: ELITE.surfaceDim, borderRadius: 16, padding: '24px 32px',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
        }}>
          {[
            { icon: 'truck', title: 'شحن لكل المحافظات', sub: 'توصيل سريع وآمن' },
            { icon: 'cash', title: 'الدفع عند الاستلام', sub: 'أو عبر شام كاش' },
            { icon: 'star', title: 'منتجات أصلية 100%', sub: 'من مصادر موثوقة' },
            { icon: 'whatsapp', title: 'دعم عبر واتساب', sub: 'رد سريع ومباشر' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: '#fff', display: 'grid', placeItems: 'center', color: ELITE.primary, boxShadow: '0 2px 8px rgba(107,45,138,0.08)' }}>
                <Icon name={f.icon} size={22} color={ELITE.primary} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: ELITE.text }}>{f.title}</div>
                <div style={{ fontSize: 12, color: ELITE.textMuted, marginTop: 2 }}>{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <div style={{ maxWidth: 1280, margin: '80px auto', padding: '0 32px', display: 'grid', gridTemplateColumns: '400px 1fr', gap: 60, alignItems: 'center' }}>
        <div style={{ aspectRatio: '1', borderRadius: 24, overflow: 'hidden', position: 'relative', background: `linear-gradient(135deg, ${ELITE.primary}, ${ELITE.primaryDark})`, display: 'grid', placeItems: 'center' }}>
          <div style={{ width: 260, height: 260, borderRadius: '50%', background: '#fff', display: 'grid', placeItems: 'center', boxShadow: `0 0 0 4px ${ELITE.gold}` }}>
            <Butterfly size={160} color={ELITE.gold} />
          </div>
          <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, textAlign: 'center', color: '#fff', fontFamily: ELITE.latin, fontStyle: 'italic', fontSize: 14, fontWeight: 600 }}>
            "The Best In your Hands"
          </div>
        </div>
        <div>
          <div style={{ fontSize: 13, color: ELITE.gold, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>من نحن</div>
          <h2 style={{ fontFamily: ELITE.display, fontSize: 40, fontWeight: 900, color: ELITE.primary, margin: 0, lineHeight: 1.2, marginBottom: 20 }}>
            الجودة ليست خياراً، بل معياراً
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.9, color: ELITE.text, marginBottom: 28, maxWidth: 580 }}>
            Elite and More وجهتك المفضلة لمنتجات التنظيف والعناية الأصلية في سوريا. نختار أفضل البرندات ونوصلها إليك بأسعار عادلة في كل المحافظات.
          </p>
          <Btn variant="primary" size="md">اقرأ المزيد</Btn>
        </div>
      </div>

      {/* BRANDS GRID */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 80px' }}>
        <SectionTitle eyebrow="تسوّق حسب البرند" title="برنداتنا" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginTop: 32 }}>
          {['BESTON', 'banat', 'PRESTIGE', 'Millia', 'Vizon', 'ActiveX Clean', 'NUK Clean', 'Elite Select'].map((b, i) => (
            <div key={b} style={{
              background: '#fff', borderRadius: 16, padding: 20,
              border: `1px solid ${ELITE.border}`, boxShadow: '0 4px 20px rgba(107,45,138,0.08)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
            }}>
              <div style={{ width: 160, height: 160, borderRadius: 12, background: i % 3 === 0 ? ELITE.sky : i % 3 === 1 ? ELITE.primary50 : '#FFF8E1', display: 'grid', placeItems: 'center', position: 'relative' }}>
                <div style={{ fontFamily: ELITE.latin, fontSize: 22, fontWeight: 800, color: ELITE.primary }}>{b}</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: ELITE.text }}>{b}</div>
              <div style={{ fontSize: 11, color: ELITE.textMuted }}>{(i + 1) * 12} منتج</div>
            </div>
          ))}
        </div>
      </div>

      {/* TAG SECTION — جديد */}
      <div style={{ background: ELITE.surfaceDim, padding: '64px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <TagBadge label="جديد" color={ELITE.primary} size="md" />
                <div style={{ fontSize: 13, color: ELITE.gold, fontWeight: 700 }}>وصل حديثاً</div>
              </div>
              <h2 style={{ fontFamily: ELITE.display, fontSize: 36, fontWeight: 900, color: ELITE.primary, margin: 0 }}>
                أحدث الإضافات
              </h2>
            </div>
            <Btn variant="outline" size="md">عرض الكل ←</Btn>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            <ProductCard name="منظف أرضيات معطر 2 لتر" brand="NUK Clean" price={45000} tags={[{label:'جديد', color:ELITE.primary}]} placeholder="sky" />
            <ProductCard name="شامبو عناية بالشعر الجاف 500مل" brand="Millia" price={68000} salePrice={52000} tags={[{label:'جديد', color:ELITE.primary}]} placeholder="primary" favorite />
            <ProductCard name="معطر جو لافندر فاخر" brand="PRESTIGE" price={32000} tags={[{label:'جديد', color:ELITE.primary}]} placeholder="gold" />
            <ProductCard name="مسحوق غسيل أوتوماتيك 5كغ" brand="BESTON" price={95000} tags={[{label:'جديد', color:ELITE.primary}]} placeholder="neutral" />
          </div>
        </div>
      </div>

      {/* BRAND SECTION with TABS */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px' }}>
        <div style={{ background: '#fff', borderRadius: 24, padding: 40, border: `1px solid ${ELITE.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 72, height: 72, borderRadius: 12, background: ELITE.sky, display: 'grid', placeItems: 'center', fontFamily: ELITE.latin, fontSize: 16, fontWeight: 800, color: ELITE.primary }}>NUK</div>
              <div>
                <h3 style={{ fontFamily: ELITE.display, fontSize: 28, fontWeight: 900, color: ELITE.primary, margin: 0 }}>NUK Clean</h3>
                <div style={{ fontSize: 13, color: ELITE.textMuted, marginTop: 4 }}>منتجات تنظيف متخصصة للمنازل والمكاتب</div>
              </div>
            </div>
            <Btn variant="outline" size="md">عرض كل منتجات NUK Clean ←</Btn>
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 24, borderBottom: `1px solid ${ELITE.border}`, paddingBottom: 2 }}>
            {['الكل', 'منظفات', 'معطرات', 'أدوات'].map((t, i) => (
              <div key={t} style={{
                padding: '10px 20px', fontSize: 13, fontWeight: 700,
                color: i === 0 ? ELITE.primary : ELITE.textMuted,
                borderBottom: i === 0 ? `3px solid ${ELITE.gold}` : '3px solid transparent',
                marginBottom: -2, cursor: 'pointer',
              }}>{t}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            <ProductCard name="منظف متعدد الاستخدامات 1لتر" brand="NUK Clean" price={28000} placeholder="sky" />
            <ProductCard name="سائل جلي ليمون 1لتر" brand="NUK Clean" price={22000} salePrice={17000} placeholder="gold" />
            <ProductCard name="مبيض ملابس مركّز 2لتر" brand="NUK Clean" price={38000} placeholder="neutral" outOfStock />
            <ProductCard name="ملمّع زجاج 750مل" brand="NUK Clean" price={18000} placeholder="primary" tags={[{label:'الأكثر مبيعاً', color:ELITE.gold}]} />
          </div>
        </div>
      </div>

      <SiteFooter />
      <FloatingWhatsApp bottom={100} />
    </div>
  );
}

function SectionTitle({ eyebrow, title, align = 'center' }) {
  return (
    <div style={{ textAlign: align }}>
      <div style={{ fontSize: 13, color: ELITE.gold, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>{eyebrow}</div>
      <h2 style={{ fontFamily: ELITE.display, fontSize: 36, fontWeight: 900, color: ELITE.primary, margin: 0 }}>{title}</h2>
      <div style={{ width: 60, height: 3, background: ELITE.gold, borderRadius: 2, margin: align === 'center' ? '12px auto 0' : '12px 0 0' }} />
    </div>
  );
}

Object.assign(window, { HomepageScreen, SectionTitle });
