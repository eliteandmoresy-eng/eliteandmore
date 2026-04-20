// Shop + Brand page + Product detail page

function ShopScreen() {
  return (
    <div style={{ width: 1440, background: ELITE.cream, fontFamily: ELITE.arabic, direction: 'rtl' }}>
      <TopAnnouncementBar />
      <SiteHeader active="shop" />

      {/* Breadcrumbs */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 32px' }}>
        <div style={{ fontSize: 13, color: ELITE.textMuted, display: 'flex', gap: 6, alignItems: 'center' }}>
          <Icon name="home" size={14} color={ELITE.textMuted} /> الرئيسية <span>/</span> <span style={{ color: ELITE.primary, fontWeight: 700 }}>المتجر</span>
        </div>
      </div>

      {/* Header block */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 24px' }}>
        <h1 style={{ fontFamily: ELITE.display, fontSize: 36, fontWeight: 900, color: ELITE.primary, margin: 0 }}>كل المنتجات</h1>
        <div style={{ fontSize: 14, color: ELITE.textMuted, marginTop: 6 }}>اكتشف منتجاتنا من أفضل البرندات العالمية والمحلية</div>
      </div>

      {/* Main grid: sidebar + content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 60px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 28 }}>
        {/* Sidebar */}
        <aside>
          <div style={{ background: '#fff', borderRadius: 16, border: `1px solid ${ELITE.border}`, padding: 20, position: 'sticky', top: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: ELITE.primary, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name="filter" size={18} color={ELITE.primary} /> الفلاتر
              </div>
              <div style={{ fontSize: 11, color: ELITE.gold, fontWeight: 700, cursor: 'pointer' }}>مسح الكل</div>
            </div>

            <FilterBlock title="البحث">
              <div style={{ background: ELITE.surfaceDim, borderRadius: 8, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: ELITE.textMuted }}>
                <Icon name="search" size={14} /> ابحث بالاسم...
              </div>
            </FilterBlock>

            <FilterBlock title="السعر (ل.س)">
              <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                <div style={{ flex: 1, border: `1px solid ${ELITE.border}`, borderRadius: 6, padding: '6px 8px', fontSize: 11, color: ELITE.textMuted }}>من 0</div>
                <div style={{ flex: 1, border: `1px solid ${ELITE.border}`, borderRadius: 6, padding: '6px 8px', fontSize: 11, color: ELITE.textMuted }}>إلى 100,000</div>
              </div>
              <div style={{ height: 4, background: ELITE.border, borderRadius: 2, position: 'relative' }}>
                <div style={{ position: 'absolute', right: '10%', left: '25%', top: 0, bottom: 0, background: ELITE.primary, borderRadius: 2 }} />
                <div style={{ position: 'absolute', right: '8%', top: -4, width: 12, height: 12, borderRadius: '50%', background: ELITE.gold, border: '2px solid #fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                <div style={{ position: 'absolute', left: '23%', top: -4, width: 12, height: 12, borderRadius: '50%', background: ELITE.gold, border: '2px solid #fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </div>
            </FilterBlock>

            <FilterBlock title="البرند">
              {['BESTON (24)', 'banat (18)', 'PRESTIGE (12)', 'Millia (9)', 'NUK Clean (22)'].map((b, i) => (
                <label key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', fontSize: 13, color: ELITE.text, cursor: 'pointer' }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${i < 2 ? ELITE.primary : ELITE.border}`, background: i < 2 ? ELITE.primary : '#fff', display: 'grid', placeItems: 'center' }}>
                    {i < 2 && <Icon name="check" size={10} color="#fff" />}
                  </div>
                  {b}
                </label>
              ))}
            </FilterBlock>

            <FilterBlock title="التصنيف">
              {['منظفات (32)', 'معطرات (14)', 'العناية الشخصية (20)', 'أدوات (8)'].map((b, i) => (
                <label key={b} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', fontSize: 13, color: ELITE.text, cursor: 'pointer' }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${ELITE.border}`, background: '#fff' }} />
                  {b}
                </label>
              ))}
            </FilterBlock>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderTop: `1px solid ${ELITE.border}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: ELITE.text }}>المتوفر فقط</div>
              <Switch on />
            </div>
          </div>
        </aside>

        {/* Content */}
        <div>
          {/* top bar: governorate + sort */}
          <div style={{ background: '#fff', borderRadius: 12, border: `1px solid ${ELITE.border}`, padding: 14, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'space-between' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px',
              background: ELITE.primary50, borderRadius: 10, border: `1.5px solid ${ELITE.primary200}`,
            }}>
              <Icon name="location" size={16} color={ELITE.primary} />
              <div>
                <div style={{ fontSize: 10, color: ELITE.primary, fontWeight: 700 }}>اختر محافظتك</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: ELITE.primary, display: 'flex', alignItems: 'center', gap: 6 }}>
                  دمشق <Icon name="chevronDown" size={12} color={ELITE.primary} />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ fontSize: 13, color: ELITE.textMuted }}>96 منتج</div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
                border: `1px solid ${ELITE.border}`, borderRadius: 8, fontSize: 13, fontWeight: 600, color: ELITE.text,
              }}>
                الترتيب: الأحدث <Icon name="chevronDown" size={12} />
              </div>
            </div>
          </div>

          {/* active filters */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            {['BESTON', 'banat', 'دمشق', '0 - 75,000 ل.س'].map(f => (
              <div key={f} style={{ background: ELITE.primary50, border: `1px solid ${ELITE.primary200}`, borderRadius: 20, padding: '4px 10px 4px 6px', fontSize: 12, color: ELITE.primary, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                {f} <div style={{ width: 16, height: 16, borderRadius: '50%', background: ELITE.primary, display: 'grid', placeItems: 'center' }}><Icon name="close" size={10} color="#fff" /></div>
              </div>
            ))}
          </div>

          {/* product grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            <ProductCard name="منظف أرضيات معطر لافندر 2 لتر" brand="NUK Clean" price={45000} placeholder="sky" tags={[{label:'جديد', color:ELITE.primary}]} />
            <ProductCard name="شامبو عناية يومية 500مل" brand="Millia" price={68000} salePrice={52000} placeholder="primary" favorite />
            <ProductCard name="معطر جو لافندر فاخر" brand="PRESTIGE" price={32000} placeholder="gold" tags={[{label:'الأكثر مبيعاً', color:ELITE.gold}]} />
            <ProductCard name="مسحوق غسيل 5كغ أوتوماتيك" brand="BESTON" price={95000} placeholder="neutral" />
            <ProductCard name="سائل جلي ليمون 1لتر" brand="banat" price={22000} salePrice={17000} placeholder="sky" tags={[{label:'عرض', color:ELITE.danger}]} />
            <ProductCard name="مبيض ملابس مركّز" brand="NUK Clean" price={38000} placeholder="primary" outOfStock />
            <ProductCard name="ملمّع زجاج وسطوح" brand="banat" price={18000} placeholder="gold" />
            <ProductCard name="صابون سائل لليدين" brand="Vizon" price={14000} placeholder="neutral" favorite />
            <ProductCard name="منظف حمامات متعدد" brand="ActiveX Clean" price={26000} placeholder="primary" />
          </div>

          {/* pagination */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 32 }}>
            {[1,2,3,4].map(n => (
              <div key={n} style={{
                minWidth: 36, height: 36, borderRadius: 8, display: 'grid', placeItems: 'center',
                background: n === 1 ? ELITE.primary : '#fff', color: n === 1 ? '#fff' : ELITE.text,
                border: `1px solid ${n === 1 ? ELITE.primary : ELITE.border}`, fontSize: 13, fontWeight: 700,
              }}>{n}</div>
            ))}
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

function FilterBlock({ title, children }) {
  return (
    <div style={{ padding: '12px 0', borderTop: `1px solid ${ELITE.border}` }}>
      <div style={{ fontSize: 13, fontWeight: 800, color: ELITE.text, marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}

function Switch({ on = false }) {
  return (
    <div style={{ width: 36, height: 20, borderRadius: 10, background: on ? ELITE.primary : ELITE.border, position: 'relative', transition: 'all 0.2s' }}>
      <div style={{ position: 'absolute', top: 2, [on ? 'left' : 'right']: 2, width: 16, height: 16, borderRadius: '50%', background: '#fff' }} />
    </div>
  );
}

function BrandPageScreen() {
  return (
    <div style={{ width: 1440, background: ELITE.cream, fontFamily: ELITE.arabic, direction: 'rtl' }}>
      <TopAnnouncementBar />
      <SiteHeader active="brands" />

      {/* BrandHeader */}
      <div style={{ position: 'relative', height: 300, background: `linear-gradient(120deg, ${ELITE.primary}, ${ELITE.primaryDark})`, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.12 }}>
          <div style={{ position: 'absolute', top: 40, right: 80 }}><Butterfly size={160} color={ELITE.gold} /></div>
          <div style={{ position: 'absolute', bottom: 20, left: 200 }}><Butterfly size={100} color="#fff" /></div>
        </div>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 80px' }}>
          <div>
            <div style={{ fontSize: 13, color: ELITE.gold, fontWeight: 700, marginBottom: 8 }}>🦋 برند أصلي معتمد</div>
            <h1 style={{ fontFamily: ELITE.display, fontSize: 56, fontWeight: 900, color: '#fff', margin: 0, lineHeight: 1.1 }}>
              NUK Clean
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, maxWidth: 540, marginTop: 12, lineHeight: 1.7 }}>
              تشكيلة متكاملة من منتجات التنظيف المنزلية المصممة لتحافظ على نظافة وجمال بيتك مع رائحة تدوم طويلاً.
            </p>
          </div>
        </div>
        {/* Logo overlap */}
        <div style={{ position: 'absolute', bottom: -60, right: 80, width: 120, height: 120, borderRadius: '50%', background: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', border: `4px solid ${ELITE.gold}` }}>
          <div style={{ fontFamily: ELITE.latin, fontSize: 20, fontWeight: 800, color: ELITE.primary }}>NUK</div>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px 24px' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { label: 'الكل', count: 42, active: true },
            { label: 'منظفات منزلية', count: 18 },
            { label: 'معطرات', count: 12 },
            { label: 'أدوات تنظيف', count: 8 },
            { label: 'العناية الشخصية', count: 4 },
          ].map((t, i) => (
            <div key={i} style={{
              padding: '10px 18px', borderRadius: 24, fontSize: 13, fontWeight: 700,
              background: t.active ? ELITE.primary : '#fff',
              color: t.active ? '#fff' : ELITE.text,
              border: `1.5px solid ${t.active ? ELITE.primary : ELITE.border}`,
              display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
            }}>
              {t.label}
              <span style={{ fontSize: 11, opacity: 0.7 }}>({t.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          <ProductCard name="منظف أرضيات معطر لافندر 2 لتر" brand="NUK Clean" price={45000} placeholder="sky" tags={[{label:'جديد', color:ELITE.primary}]} />
          <ProductCard name="منظف زجاج وسطوح 750مل" brand="NUK Clean" price={18000} placeholder="primary" tags={[{label:'الأكثر مبيعاً', color:ELITE.gold}]} />
          <ProductCard name="سائل جلي ليمون 1لتر" brand="NUK Clean" price={22000} salePrice={17000} placeholder="gold" />
          <ProductCard name="مبيض ملابس مركّز 2لتر" brand="NUK Clean" price={38000} placeholder="neutral" outOfStock />
          <ProductCard name="منظف حمامات قوي 1لتر" brand="NUK Clean" price={28000} placeholder="sky" />
          <ProductCard name="معقم أرضيات 5لتر" brand="NUK Clean" price={72000} placeholder="primary" />
          <ProductCard name="ملمّع خشب وأثاث" brand="NUK Clean" price={24000} salePrice={19000} placeholder="gold" tags={[{label:'عرض', color:ELITE.danger}]} />
          <ProductCard name="منظف مكيفات 500مل" brand="NUK Clean" price={16000} placeholder="neutral" favorite />
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

function ProductDetailScreen() {
  return (
    <div style={{ width: 1440, background: ELITE.cream, fontFamily: ELITE.arabic, direction: 'rtl' }}>
      <TopAnnouncementBar />
      <SiteHeader active="shop" />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 32px' }}>
        <div style={{ fontSize: 13, color: ELITE.textMuted, display: 'flex', gap: 6, alignItems: 'center' }}>
          <Icon name="home" size={14} /> الرئيسية <span>/</span> NUK Clean <span>/</span> منظفات <span>/</span>
          <span style={{ color: ELITE.primary, fontWeight: 700 }}>منظف أرضيات معطر لافندر</span>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 32px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
        {/* Gallery */}
        <div>
          <div style={{ background: '#fff', borderRadius: 20, border: `1px solid ${ELITE.border}`, padding: 20, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 32, right: 32, zIndex: 2, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <TagBadge label="جديد" color={ELITE.primary} />
              <TagBadge label="-29%" color={ELITE.gold} />
            </div>
            <div style={{ position: 'absolute', top: 32, left: 32, zIndex: 2, width: 40, height: 40, borderRadius: '50%', background: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: `1px solid ${ELITE.border}` }}>
              <Icon name="heart" size={20} color={ELITE.textMuted} />
            </div>
            <div style={{ aspectRatio: '1', borderRadius: 12, overflow: 'hidden' }}>
              <PhotoPlaceholder tone="sky" label="product hero shot" radius={12} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginTop: 12 }}>
            {['sky', 'primary', 'gold', 'neutral', 'sky'].map((t, i) => (
              <div key={i} style={{ aspectRatio: '1', borderRadius: 8, overflow: 'hidden', border: `2px solid ${i === 0 ? ELITE.primary : ELITE.border}` }}>
                <PhotoPlaceholder tone={t} label={`view ${i+1}`} radius={0} />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div style={{ fontSize: 11, color: ELITE.gold, fontWeight: 700, letterSpacing: 1, fontFamily: ELITE.latin, marginBottom: 8 }}>NUK CLEAN</div>
          <h1 style={{ fontFamily: ELITE.display, fontSize: 32, fontWeight: 900, color: ELITE.text, margin: 0, lineHeight: 1.3 }}>
            منظف أرضيات معطر بخلاصة اللافندر — 2 لتر
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '12px 0 20px' }}>
            <div style={{ display: 'flex', gap: 2 }}>
              {[1,2,3,4,5].map(i => <Icon key={i} name="star" size={16} color={i <= 4 ? ELITE.gold : ELITE.border} />)}
            </div>
            <div style={{ fontSize: 13, color: ELITE.textMuted }}>(24 تقييم)</div>
            <div style={{ fontSize: 12, color: ELITE.success, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: ELITE.success }} /> متوفر في المخزون
            </div>
          </div>

          {/* Price */}
          <div style={{ padding: 20, background: ELITE.surfaceDim, borderRadius: 16, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
              <div style={{ fontFamily: ELITE.latin, fontSize: 32, fontWeight: 900, color: ELITE.primary }}>32,000 ل.س</div>
              <div style={{ fontFamily: ELITE.latin, fontSize: 16, color: ELITE.textMuted, textDecoration: 'line-through' }}>45,000 ل.س</div>
              <TagBadge label="وفّر 13,000 ل.س" color={ELITE.danger} size="md" />
            </div>
            <div style={{ fontFamily: ELITE.latin, fontSize: 14, color: ELITE.textMuted, marginTop: 4 }}>≈ 2.13 $ (بسعر صرف 15,000 ل.س)</div>
          </div>

          <p style={{ fontSize: 14, lineHeight: 1.9, color: ELITE.text, marginBottom: 24 }}>
            منظف أرضيات فاخر بخلاصة اللافندر الطبيعية — يزيل الأوساخ العنيدة بسهولة ويترك رائحة منعشة تدوم لساعات. مناسب لجميع أنواع الأرضيات.
          </p>

          {/* Variants: Size */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: ELITE.text, marginBottom: 10 }}>الحجم:</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[{v:'500مل', p:'12,000'}, {v:'1 لتر', p:'22,000'}, {v:'2 لتر', p:'32,000', active:true}, {v:'5 لتر', p:'75,000'}].map(s => (
                <div key={s.v} style={{
                  padding: '10px 16px', borderRadius: 10,
                  background: s.active ? ELITE.primary : '#fff',
                  color: s.active ? '#fff' : ELITE.text,
                  border: `1.5px solid ${s.active ? ELITE.primary : ELITE.border}`,
                  fontSize: 13, fontWeight: 700, cursor: 'pointer', textAlign: 'center',
                }}>
                  <div>{s.v}</div>
                  <div style={{ fontSize: 10, opacity: 0.75, marginTop: 2, fontFamily: ELITE.latin }}>{s.p} ل.س</div>
                </div>
              ))}
            </div>
          </div>

          {/* Governorate availability */}
          <div style={{ padding: 16, background: '#fff', border: `1px solid ${ELITE.border}`, borderRadius: 12, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 800, color: ELITE.primary, marginBottom: 10 }}>
              <Icon name="location" size={16} color={ELITE.primary} /> اختر محافظتك
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
              {[
                { n: 'دمشق', active: true, ok: true },
                { n: 'حلب', ok: true },
                { n: 'حمص', ok: true },
                { n: 'اللاذقية', ok: true },
                { n: 'طرطوس', ok: true },
                { n: 'درعا', ok: true },
                { n: 'حماه', ok: false },
                { n: 'الرقة', ok: false },
              ].map(g => (
                <div key={g.n} style={{
                  padding: '8px 4px', borderRadius: 8, textAlign: 'center',
                  background: g.active ? ELITE.primary : g.ok ? ELITE.primary50 : '#F5F3F7',
                  color: g.active ? '#fff' : g.ok ? ELITE.primary : '#B9B0C4',
                  fontSize: 12, fontWeight: 700,
                  cursor: g.ok ? 'pointer' : 'not-allowed',
                  border: g.active ? `1.5px solid ${ELITE.primary}` : '1.5px solid transparent',
                  textDecoration: g.ok ? 'none' : 'line-through',
                }}>{g.n}</div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: ELITE.success, marginTop: 10, fontWeight: 600 }}>
              <Icon name="truck" size={14} color={ELITE.success} /> شحن إلى دمشق: 5,000 ل.س (خلال 24-48 ساعة)
            </div>
          </div>

          {/* Quantity + CTA */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'stretch', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${ELITE.border}`, borderRadius: 10, background: '#fff' }}>
              <div style={{ width: 40, height: 48, display: 'grid', placeItems: 'center', color: ELITE.textMuted, cursor: 'pointer' }}><Icon name="minus" size={16} /></div>
              <div style={{ width: 48, textAlign: 'center', fontSize: 16, fontWeight: 800, color: ELITE.text }}>1</div>
              <div style={{ width: 40, height: 48, display: 'grid', placeItems: 'center', color: ELITE.primary, cursor: 'pointer' }}><Icon name="plus" size={16} /></div>
            </div>
            <div style={{ flex: 1 }}>
              <Btn variant="primary" size="lg" full icon="cart">أضف إلى السلة</Btn>
            </div>
            <Btn variant="outlineGold" size="lg" icon="heart">المفضلة</Btn>
          </div>
          <div style={{ fontSize: 12, color: ELITE.textMuted, textAlign: 'center', marginTop: 8 }}>
            🔒 الدفع عند الاستلام متاح — عبر واتساب الطلب
          </div>
        </div>
      </div>

      {/* Related */}
      <div style={{ background: ELITE.surfaceDim, padding: '64px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <h2 style={{ fontFamily: ELITE.display, fontSize: 28, fontWeight: 900, color: ELITE.primary, margin: '0 0 24px' }}>منتجات مشابهة</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            <ProductCard name="منظف زجاج وسطوح 750مل" brand="NUK Clean" price={18000} placeholder="primary" />
            <ProductCard name="سائل جلي ليمون 1لتر" brand="NUK Clean" price={22000} salePrice={17000} placeholder="gold" />
            <ProductCard name="معقم أرضيات 5لتر" brand="NUK Clean" price={72000} placeholder="sky" />
            <ProductCard name="ملمّع خشب وأثاث" brand="NUK Clean" price={24000} placeholder="neutral" tags={[{label:'جديد', color:ELITE.primary}]} />
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

Object.assign(window, { ShopScreen, BrandPageScreen, ProductDetailScreen, FilterBlock, Switch });
