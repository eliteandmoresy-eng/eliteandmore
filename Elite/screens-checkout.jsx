// Cart, Checkout, Favorites, About

function CartScreen() {
  return (
    <div style={{ width: 1440, background: ELITE.cream, fontFamily: ELITE.arabic, direction: 'rtl' }}>
      <TopAnnouncementBar />
      <SiteHeader active="shop" />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 32px' }}>
        <div style={{ fontSize: 13, color: ELITE.textMuted, display: 'flex', gap: 6, alignItems: 'center', marginBottom: 16 }}>
          <Icon name="home" size={14} /> الرئيسية <span>/</span> <span style={{ color: ELITE.primary, fontWeight: 700 }}>سلة التسوق</span>
        </div>
        <h1 style={{ fontFamily: ELITE.display, fontSize: 36, fontWeight: 900, color: ELITE.primary, margin: 0 }}>سلة التسوق</h1>
        <div style={{ fontSize: 14, color: ELITE.textMuted, marginTop: 4 }}>لديك 3 منتجات في السلة</div>
      </div>

      <div style={{ maxWidth: 1280, margin: '24px auto 80px', padding: '0 32px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24 }}>
        <div style={{ background: '#fff', borderRadius: 16, border: `1px solid ${ELITE.border}`, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', background: ELITE.surfaceDim, display: 'grid', gridTemplateColumns: '80px 1fr 120px 120px 120px 40px', gap: 16, fontSize: 12, fontWeight: 700, color: ELITE.textMuted, alignItems: 'center' }}>
            <div></div><div>المنتج</div><div style={{textAlign:'center'}}>السعر</div><div style={{textAlign:'center'}}>الكمية</div><div style={{textAlign:'left'}}>الإجمالي</div><div></div>
          </div>
          {[
            { name: 'منظف أرضيات لافندر 2لتر', brand: 'NUK Clean', variant: 'الحجم: 2 لتر', price: 32000, qty: 2, tone: 'sky' },
            { name: 'شامبو عناية بالشعر 500مل', brand: 'Millia', variant: 'الرائحة: بابونج', price: 52000, qty: 1, tone: 'primary' },
            { name: 'معطر جو لافندر فاخر', brand: 'PRESTIGE', variant: null, price: 32000, qty: 1, tone: 'gold' },
          ].map((it, i) => (
            <div key={i} style={{ padding: '20px', display: 'grid', gridTemplateColumns: '80px 1fr 120px 120px 120px 40px', gap: 16, alignItems: 'center', borderTop: i > 0 ? `1px solid ${ELITE.border}` : 'none' }}>
              <div style={{ width: 80, height: 80, borderRadius: 10, overflow: 'hidden' }}>
                <PhotoPlaceholder tone={it.tone} label="" radius={0} />
              </div>
              <div>
                <div style={{ fontSize: 10, color: ELITE.gold, fontWeight: 700, letterSpacing: 0.5, fontFamily: ELITE.latin }}>{it.brand}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: ELITE.text, marginTop: 2 }}>{it.name}</div>
                {it.variant && <div style={{ fontSize: 12, color: ELITE.textMuted, marginTop: 4 }}>{it.variant}</div>}
              </div>
              <div style={{ fontFamily: ELITE.latin, fontSize: 14, fontWeight: 700, color: ELITE.text, textAlign: 'center' }}>{fmtSYP(it.price)}</div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${ELITE.border}`, borderRadius: 8 }}>
                  <div style={{ width: 32, height: 32, display: 'grid', placeItems: 'center', color: ELITE.textMuted, cursor: 'pointer' }}><Icon name="minus" size={14} /></div>
                  <div style={{ width: 32, textAlign: 'center', fontSize: 14, fontWeight: 700 }}>{it.qty}</div>
                  <div style={{ width: 32, height: 32, display: 'grid', placeItems: 'center', color: ELITE.primary, cursor: 'pointer' }}><Icon name="plus" size={14} /></div>
                </div>
              </div>
              <div style={{ fontFamily: ELITE.latin, fontSize: 15, fontWeight: 800, color: ELITE.primary, textAlign: 'left' }}>{fmtSYP(it.price * it.qty)}</div>
              <div style={{ width: 32, height: 32, borderRadius: 8, display: 'grid', placeItems: 'center', color: ELITE.danger, cursor: 'pointer', background: '#FEF2F2' }}>
                <Icon name="trash" size={16} color={ELITE.danger} />
              </div>
            </div>
          ))}
          <div style={{ padding: 16, background: ELITE.surfaceDim, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Btn variant="ghost" size="md" icon="chevronRight">متابعة التسوق</Btn>
            <div style={{ fontSize: 12, color: ELITE.textMuted }}>🔒 الدفع آمن — لن تُحفظ بياناتك</div>
          </div>
        </div>

        {/* Summary */}
        <div>
          <div style={{ background: '#fff', borderRadius: 16, border: `1px solid ${ELITE.border}`, padding: 24, position: 'sticky', top: 20 }}>
            <h3 style={{ fontFamily: ELITE.display, fontSize: 20, fontWeight: 900, color: ELITE.primary, margin: '0 0 20px' }}>ملخص الطلب</h3>
            <SummaryRow label="مجموع المنتجات" value="148,000 ل.س" />
            <SummaryRow label="الخصم" value="- 13,000 ل.س" color={ELITE.success} />
            <div style={{ padding: 12, background: ELITE.primary50, borderRadius: 10, margin: '16px 0', fontSize: 12, color: ELITE.primary, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <Icon name="info" size={14} color={ELITE.primary} />
              <div>اختر محافظتك في صفحة إتمام الطلب لحساب تكلفة الشحن.</div>
            </div>
            <div style={{ padding: 12, background: '#FFF8E1', border: `1px dashed ${ELITE.gold}`, borderRadius: 10, margin: '0 0 20px', fontSize: 12, color: ELITE.goldDark }}>
              🎁 اشترِ بـ 152,000 ل.س إضافية للحصول على شحن مجاني!
            </div>
            <div style={{ borderTop: `1px solid ${ELITE.border}`, paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: ELITE.text }}>الإجمالي</div>
              <div>
                <div style={{ fontFamily: ELITE.latin, fontSize: 24, fontWeight: 900, color: ELITE.primary }}>135,000 ل.س</div>
                <div style={{ fontFamily: ELITE.latin, fontSize: 12, color: ELITE.textMuted, textAlign: 'left' }}>≈ 9.00 $</div>
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <Btn variant="primary" size="lg" full icon="chevronLeft">متابعة إلى إتمام الطلب</Btn>
            </div>
            <div style={{ marginTop: 16, padding: 12, background: '#F0FDF4', border: `1px solid #BBF7D0`, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="whatsapp" size={16} color={ELITE.whatsapp} />
              <div style={{ fontSize: 12, color: '#065F46' }}>سيتم إرسال الطلب عبر واتساب</div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

function SummaryRow({ label, value, color }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 14 }}>
      <div style={{ color: ELITE.textMuted }}>{label}</div>
      <div style={{ fontFamily: ELITE.latin, fontWeight: 700, color: color || ELITE.text }}>{value}</div>
    </div>
  );
}

function CheckoutScreen() {
  return (
    <div style={{ width: 1440, background: ELITE.cream, fontFamily: ELITE.arabic, direction: 'rtl' }}>
      <TopAnnouncementBar />
      <SiteHeader active="shop" />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 32px' }}>
        {/* Stepper */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, justifyContent: 'center' }}>
          {[
            { n: 1, label: 'السلة', done: true },
            { n: 2, label: 'إتمام الطلب', active: true },
            { n: 3, label: 'واتساب' },
          ].map((s, i) => (
            <React.Fragment key={s.n}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: s.done ? ELITE.success : s.active ? ELITE.primary : ELITE.border,
                  color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 14,
                }}>{s.done ? <Icon name="check" size={16} color="#fff" /> : s.n}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: s.active ? ELITE.primary : s.done ? ELITE.success : ELITE.textMuted }}>{s.label}</div>
              </div>
              {i < 2 && <div style={{ width: 60, height: 2, background: s.done ? ELITE.success : ELITE.border }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto 80px', padding: '0 32px', display: 'grid', gridTemplateColumns: '1fr 400px', gap: 24 }}>
        {/* Form */}
        <div style={{ background: '#fff', borderRadius: 16, border: `1px solid ${ELITE.border}`, padding: 32 }}>
          <h2 style={{ fontFamily: ELITE.display, fontSize: 22, fontWeight: 900, color: ELITE.primary, margin: '0 0 24px' }}>بيانات التوصيل</h2>

          <FormGrid>
            <FormField label="الاسم الكامل" required value="محمد أحمد" />
            <FormField label="رقم الهاتف" required value="+963 93 666 6950" hint="صيغة سورية (يبدأ بـ 09 أو +963)" />
          </FormGrid>
          <FormField label="المحافظة" required dropdown value="دمشق" />

          <div style={{ padding: 12, background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 8, marginBottom: 16, display: 'flex', gap: 8, fontSize: 12, color: '#78350F' }}>
            <Icon name="info" size={16} color="#92400E" />
            <div>تأكد من توفر كل منتجات السلة في المحافظة المختارة قبل إتمام الطلب.</div>
          </div>

          <FormField label="العنوان بالتفصيل" required textarea placeholder="المنطقة، الشارع، رقم البناء، الطابق..." rows={3} />
          <FormField label="ملاحظات إضافية (اختياري)" textarea placeholder="أي تعليمات خاصة بالتوصيل..." rows={2} />

          <h2 style={{ fontFamily: ELITE.display, fontSize: 22, fontWeight: 900, color: ELITE.primary, margin: '32px 0 20px' }}>طريقة الدفع</h2>

          <div style={{ display: 'grid', gap: 12 }}>
            <PayOption
              active
              icon="cash"
              title="الدفع عند الاستلام"
              sub="ادفع نقداً عند وصول الطلب إلى بابك"
              hint="متاح في كل المحافظات"
            />
            <PayOption
              active={false}
              iconCustom={<div style={{ width: 28, height: 28, borderRadius: 6, background: '#FF5722', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 900, fontSize: 11, fontFamily: ELITE.latin }}>SC</div>}
              title="شام كاش"
              sub="ادفع عبر تطبيق شام كاش قبل الشحن"
              hint="آمن وسريع"
            />
          </div>

          {/* Sham Cash details shown conditionally */}
          <div style={{ marginTop: 16, padding: 20, background: `linear-gradient(135deg, ${ELITE.primary50}, #fff)`, border: `1.5px solid ${ELITE.primary200}`, borderRadius: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: ELITE.primary, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="info" size={16} color={ELITE.primary} /> تعليمات دفع شام كاش
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 16, alignItems: 'start' }}>
              <div style={{ width: 140, height: 140, background: '#fff', border: `1px solid ${ELITE.border}`, borderRadius: 8, display: 'grid', placeItems: 'center' }}>
                <div style={{ width: 100, height: 100, background: `repeating-linear-gradient(0deg, #000 0 3px, #fff 3px 6px), repeating-linear-gradient(90deg, transparent 0 3px, #fff 3px 6px)`, backgroundBlendMode: 'multiply' }} />
              </div>
              <div>
                <CopyField label="رقم الحساب" value="SHAM-483920-1A" />
                <CopyField label="رقم الهاتف" value="+963 936 666 950" />
                <div style={{ fontSize: 12, color: ELITE.textMuted, lineHeight: 1.7, marginTop: 8 }}>
                  بعد إرسال طلبك عبر واتساب، حوّل المبلغ إلى الحساب أعلاه عبر تطبيق شام كاش. يمكنك طلب التفاصيل عبر واتساب بعد إتمام الطلب.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div>
          <div style={{ background: '#fff', borderRadius: 16, border: `1px solid ${ELITE.border}`, padding: 24, position: 'sticky', top: 20 }}>
            <h3 style={{ fontFamily: ELITE.display, fontSize: 18, fontWeight: 900, color: ELITE.primary, margin: '0 0 16px' }}>ملخص الطلب</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 16, borderBottom: `1px solid ${ELITE.border}` }}>
              {[
                { name: 'منظف أرضيات لافندر', qty: 2, p: 64000, tone: 'sky' },
                { name: 'شامبو عناية بالشعر', qty: 1, p: 52000, tone: 'primary' },
                { name: 'معطر جو لافندر', qty: 1, p: 32000, tone: 'gold' },
              ].map((it, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
                    <PhotoPlaceholder tone={it.tone} label="" radius={0} />
                    <div style={{ position: 'absolute', top: -4, right: -4, minWidth: 18, height: 18, borderRadius: 9, background: ELITE.primary, color: '#fff', fontSize: 10, fontWeight: 700, display: 'grid', placeItems: 'center', padding: '0 4px' }}>{it.qty}</div>
                  </div>
                  <div style={{ flex: 1, fontSize: 12, fontWeight: 600, color: ELITE.text }}>{it.name}</div>
                  <div style={{ fontSize: 12, fontFamily: ELITE.latin, fontWeight: 700 }}>{fmtSYP(it.p)}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <SummaryRow label="المجموع" value="148,000 ل.س" />
              <SummaryRow label="الخصم" value="- 13,000 ل.س" color={ELITE.success} />
              <SummaryRow label="الشحن لدمشق" value="5,000 ل.س" />
            </div>
            <div style={{ padding: '14px 0', borderTop: `1px solid ${ELITE.border}`, borderBottom: `1px solid ${ELITE.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div style={{ fontSize: 16, fontWeight: 900, color: ELITE.text }}>الإجمالي</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontFamily: ELITE.latin, fontSize: 22, fontWeight: 900, color: ELITE.primary }}>140,000 ل.س</div>
                <div style={{ fontFamily: ELITE.latin, fontSize: 11, color: ELITE.textMuted }}>≈ 9.33 $</div>
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <Btn variant="whatsapp" size="lg" full icon="whatsapp">إرسال الطلب عبر واتساب</Btn>
            </div>
            <div style={{ fontSize: 11, color: ELITE.textMuted, textAlign: 'center', marginTop: 10, lineHeight: 1.6 }}>
              بالضغط على الزر أعلاه، تقبل شروط البيع. لن يتم حفظ أي بيانات في قاعدة البيانات.
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

function FormGrid({ children }) { return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>{children}</div>; }

function FormField({ label, required, value, placeholder, hint, textarea, rows = 1, dropdown }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: ELITE.text, marginBottom: 6 }}>
        {label} {required && <span style={{ color: ELITE.danger }}>*</span>}
      </div>
      <div style={{
        border: `1.5px solid ${value ? ELITE.primary200 : ELITE.border}`, borderRadius: 8,
        background: '#fff', padding: textarea ? '10px 14px' : '12px 14px', fontSize: 14,
        minHeight: textarea ? rows * 22 + 20 : 'auto',
        color: value ? ELITE.text : ELITE.textMuted,
        display: 'flex', alignItems: dropdown ? 'center' : 'flex-start', justifyContent: 'space-between',
      }}>
        {value || placeholder || ''}
        {dropdown && <Icon name="chevronDown" size={14} color={ELITE.textMuted} />}
      </div>
      {hint && <div style={{ fontSize: 11, color: ELITE.textMuted, marginTop: 4 }}>{hint}</div>}
    </div>
  );
}

function PayOption({ active, icon, iconCustom, title, sub, hint }) {
  return (
    <div style={{
      padding: 16, borderRadius: 12,
      border: `2px solid ${active ? ELITE.primary : ELITE.border}`,
      background: active ? ELITE.primary50 : '#fff',
      display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
    }}>
      <div style={{
        width: 20, height: 20, borderRadius: '50%',
        border: `2px solid ${active ? ELITE.primary : ELITE.border}`,
        display: 'grid', placeItems: 'center', flexShrink: 0,
      }}>
        {active && <div style={{ width: 10, height: 10, borderRadius: '50%', background: ELITE.primary }} />}
      </div>
      {iconCustom || <div style={{ width: 40, height: 40, borderRadius: 8, background: '#fff', display: 'grid', placeItems: 'center', border: `1px solid ${ELITE.border}` }}><Icon name={icon} size={22} color={ELITE.primary} /></div>}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: ELITE.text }}>{title}</div>
        <div style={{ fontSize: 12, color: ELITE.textMuted, marginTop: 2 }}>{sub}</div>
      </div>
      <div style={{ fontSize: 11, color: active ? ELITE.primary : ELITE.textMuted, fontWeight: 700, background: active ? '#fff' : 'transparent', padding: '4px 8px', borderRadius: 4 }}>{hint}</div>
    </div>
  );
}

function CopyField({ label, value }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ fontSize: 11, color: ELITE.textMuted, marginBottom: 3 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: `1px solid ${ELITE.border}`, borderRadius: 8, padding: '6px 10px' }}>
        <div style={{ flex: 1, fontFamily: ELITE.latin, fontSize: 13, fontWeight: 700, color: ELITE.text }}>{value}</div>
        <div style={{ padding: '4px 10px', background: ELITE.primary50, color: ELITE.primary, borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
          <Icon name="copy" size={12} color={ELITE.primary} /> نسخ
        </div>
      </div>
    </div>
  );
}

function FavoritesScreen() {
  return (
    <div style={{ width: 1440, background: ELITE.cream, fontFamily: ELITE.arabic, direction: 'rtl' }}>
      <TopAnnouncementBar />
      <SiteHeader active="shop" />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 32px' }}>
        <h1 style={{ fontFamily: ELITE.display, fontSize: 36, fontWeight: 900, color: ELITE.primary, margin: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
          <Icon name="heartFill" size={32} color={ELITE.danger} /> منتجاتي المفضلة
        </h1>
        <div style={{ padding: 14, background: ELITE.primary50, border: `1px solid ${ELITE.primary200}`, borderRadius: 10, marginTop: 16, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Icon name="info" size={18} color={ELITE.primary} />
          <div style={{ fontSize: 13, color: ELITE.primary, lineHeight: 1.7 }}>
            المنتجات المفضلة محفوظة في متصفحك الحالي فقط. إذا بدّلت الجهاز أو مسحت بيانات المتصفح، ستُفقد.
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: '24px auto 80px', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          <ProductCard name="شامبو عناية بالشعر الجاف" brand="Millia" price={68000} salePrice={52000} placeholder="primary" favorite />
          <ProductCard name="معطر جو لافندر فاخر" brand="PRESTIGE" price={32000} placeholder="gold" favorite />
          <ProductCard name="ملمّع زجاج وسطوح" brand="banat" price={18000} placeholder="sky" favorite />
          <ProductCard name="صابون سائل لليدين" brand="Vizon" price={14000} placeholder="neutral" favorite />
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

function AboutScreen() {
  return (
    <div style={{ width: 1440, background: ELITE.cream, fontFamily: ELITE.arabic, direction: 'rtl' }}>
      <TopAnnouncementBar />
      <SiteHeader active="about" />
      <div style={{ background: `linear-gradient(120deg, ${ELITE.primary}, ${ELITE.primaryDark})`, color: '#fff', padding: '60px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 20, right: 40, opacity: 0.15 }}><Butterfly size={140} color={ELITE.gold} /></div>
        <div style={{ position: 'absolute', bottom: 20, left: 40, opacity: 0.1 }}><Butterfly size={100} color="#fff" /></div>
        <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#fff', display: 'grid', placeItems: 'center', margin: '0 auto 20px', boxShadow: `0 0 0 4px ${ELITE.gold}` }}>
          <Butterfly size={60} color={ELITE.primary} />
        </div>
        <h1 style={{ fontFamily: ELITE.display, fontSize: 48, fontWeight: 900, margin: 0 }}>من نحن</h1>
        <div style={{ fontFamily: ELITE.latin, fontStyle: 'italic', fontSize: 18, color: ELITE.gold, marginTop: 8 }}>"The Best In your Hands"</div>
      </div>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '60px 32px' }}>
        <p style={{ fontSize: 17, lineHeight: 2, color: ELITE.text }}>
          مرحباً بك في <strong style={{ color: ELITE.primary }}>Elite and More</strong> — وجهتك المفضلة لمنتجات التنظيف والعناية الأصلية في سوريا.
        </p>
        <p style={{ fontSize: 15, lineHeight: 2, color: ELITE.text }}>
          نحن في Elite and More نؤمن أن الجودة ليست خياراً، بل معياراً. نعمل على اختيار أفضل البرندات العالمية والمحلية بعناية فائقة، ونوصلها إليك بأسعار عادلة وخدمة موثوقة في كل المحافظات السورية.
        </p>

        <h2 style={{ fontFamily: ELITE.display, fontSize: 24, color: ELITE.primary, marginTop: 40 }}>برنداتنا</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 20 }}>
          {['BESTON','banat','PRESTIGE','Millia','Vizon','ActiveX','NUK Clean','Elite Select'].map(b => (
            <div key={b} style={{ padding: '16px 8px', background: '#fff', border: `1px solid ${ELITE.border}`, borderRadius: 10, textAlign: 'center', fontFamily: ELITE.latin, fontWeight: 700, color: ELITE.primary, fontSize: 13 }}>{b}</div>
          ))}
        </div>

        <h2 style={{ fontFamily: ELITE.display, fontSize: 24, color: ELITE.primary, marginTop: 40 }}>لماذا Elite and More؟</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginTop: 16 }}>
          {[
            'منتجات أصلية 100% من مصادر موثوقة',
            'توصيل لكل المحافظات السورية',
            'دعم مباشر عبر واتساب',
            'خيارات دفع متعددة',
            'أسعار شفافة بالليرة والدولار',
            'شحن مجاني للطلبات الكبيرة',
          ].map(t => (
            <div key={t} style={{ padding: 14, background: '#fff', border: `1px solid ${ELITE.border}`, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: ELITE.primary50, display: 'grid', placeItems: 'center' }}>
                <Icon name="check" size={16} color={ELITE.primary} />
              </div>
              <div style={{ fontSize: 13, color: ELITE.text }}>{t}</div>
            </div>
          ))}
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

Object.assign(window, { CartScreen, CheckoutScreen, FavoritesScreen, AboutScreen });
