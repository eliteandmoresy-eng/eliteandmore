// Admin Panel screens: Login, Dashboard, Brands list, Product form, Banners, Settings

function AdminLoginScreen() {
  return (
    <div style={{
      width: 1440, height: 900,
      background: `linear-gradient(135deg, ${ELITE.primary}, ${ELITE.primaryDark} 50%, #1a0933)`,
      fontFamily: ELITE.arabic, direction: 'rtl',
      display: 'grid', placeItems: 'center', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 60, right: 80, opacity: 0.1 }}><Butterfly size={300} color={ELITE.gold} /></div>
      <div style={{ position: 'absolute', bottom: 40, left: 60, opacity: 0.08 }}><Butterfly size={220} color="#fff" /></div>
      <div style={{ width: 420, background: '#fff', borderRadius: 20, padding: 36, boxShadow: '0 24px 80px rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: `linear-gradient(135deg, ${ELITE.primary}, ${ELITE.primaryDark})`, display: 'grid', placeItems: 'center', margin: '0 auto 14px', boxShadow: `0 0 0 3px ${ELITE.gold}` }}>
            <Butterfly size={40} />
          </div>
          <h1 style={{ fontFamily: ELITE.display, fontSize: 24, fontWeight: 900, color: ELITE.primary, margin: 0 }}>لوحة تحكم Elite and More</h1>
          <div style={{ fontSize: 13, color: ELITE.textMuted, marginTop: 4 }}>سجّل دخولك لإدارة المتجر</div>
        </div>
        <FormField label="البريد الإلكتروني" required value="admin@eliteandmore.sy" />
        <FormField label="كلمة المرور" required value="••••••••••" />
        <div style={{ marginTop: 20 }}>
          <Btn variant="gold" size="lg" full>تسجيل الدخول</Btn>
        </div>
        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: ELITE.textMuted }}>
          🔒 الدخول مخصص للمدراء فقط
        </div>
      </div>
    </div>
  );
}

function AdminShell({ active = 'dashboard', children }) {
  const nav = [
    { id: 'dashboard', label: 'الرئيسية', icon: 'home' },
    { id: 'brands', label: 'البرندات', icon: 'tag' },
    { id: 'categories', label: 'التصنيفات', icon: 'grid' },
    { id: 'products', label: 'المنتجات', icon: 'box' },
    { id: 'governorates', label: 'المحافظات', icon: 'location' },
    { id: 'tags', label: 'الشارات', icon: 'star' },
    { id: 'banners', label: 'سلايدر الصور', icon: 'image' },
    { id: 'settings', label: 'الإعدادات', icon: 'settings' },
  ];
  return (
    <div style={{ width: 1440, minHeight: 900, background: ELITE.surfaceDim, fontFamily: ELITE.arabic, direction: 'rtl', display: 'grid', gridTemplateColumns: '260px 1fr' }}>
      <aside style={{ background: '#fff', borderLeft: `1px solid ${ELITE.border}`, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: 20, borderBottom: `1px solid ${ELITE.border}` }}>
          <EliteLogo size="sm" />
          <div style={{ fontSize: 11, color: ELITE.gold, fontWeight: 700, marginTop: 8, letterSpacing: 1 }}>لوحة التحكم</div>
        </div>
        <div style={{ padding: 12, flex: 1 }}>
          {nav.map(n => (
            <div key={n.id} style={{
              padding: '10px 14px', borderRadius: 10, fontSize: 14, fontWeight: n.id === active ? 800 : 500,
              color: n.id === active ? '#fff' : ELITE.text,
              background: n.id === active ? ELITE.primary : 'transparent',
              display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', marginBottom: 3,
            }}>
              <Icon name={n.icon} size={18} color={n.id === active ? '#fff' : ELITE.textMuted} />
              {n.label}
            </div>
          ))}
        </div>
        <div style={{ padding: 16, borderTop: `1px solid ${ELITE.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: ELITE.primary, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 14 }}>م</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: ELITE.text }}>محمد</div>
            <div style={{ fontSize: 11, color: ELITE.textMuted }}>مدير</div>
          </div>
          <div style={{ cursor: 'pointer', color: ELITE.textMuted }}><Icon name="logout" size={18} /></div>
        </div>
      </aside>
      <main style={{ padding: 28 }}>{children}</main>
    </div>
  );
}

function AdminDashScreen() {
  const items = [
    { id: 'brands', label: 'البرندات', icon: 'tag', count: 8, color: ELITE.primary },
    { id: 'categories', label: 'التصنيفات', icon: 'grid', count: 24, color: ELITE.goldDark },
    { id: 'products', label: 'المنتجات', icon: 'box', count: 156, color: ELITE.success },
    { id: 'governorates', label: 'المحافظات', icon: 'location', count: 14, color: ELITE.info },
    { id: 'tags', label: 'الشارات', icon: 'star', count: 6, color: ELITE.warning },
    { id: 'banners', label: 'سلايدر الصور', icon: 'image', count: 3, color: ELITE.danger },
    { id: 'settings', label: 'الإعدادات', icon: 'settings', count: null, color: ELITE.textMuted },
  ];
  return (
    <AdminShell active="dashboard">
      <h1 style={{ fontFamily: ELITE.display, fontSize: 28, fontWeight: 900, color: ELITE.primary, margin: 0 }}>مرحباً محمد 👋</h1>
      <div style={{ fontSize: 14, color: ELITE.textMuted, marginTop: 6 }}>استخدم القائمة الجانبية لإدارة متجرك.</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 28 }}>
        {items.map(it => (
          <div key={it.id} style={{
            padding: 22, background: '#fff', borderRadius: 16, border: `1px solid ${ELITE.border}`,
            cursor: 'pointer', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: -20, left: -20, opacity: 0.08 }}>
              <Icon name={it.icon} size={120} color={it.color} />
            </div>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${it.color}15`, display: 'grid', placeItems: 'center', marginBottom: 14 }}>
              <Icon name={it.icon} size={22} color={it.color} />
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, color: ELITE.text }}>{it.label}</div>
            {it.count !== null && <div style={{ fontSize: 28, fontWeight: 900, color: it.color, fontFamily: ELITE.latin, marginTop: 4 }}>{it.count}</div>}
            <div style={{ fontSize: 12, color: ELITE.primary, fontWeight: 700, marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
              إدارة ← 
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}

function AdminProductFormScreen() {
  return (
    <AdminShell active="products">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 13, color: ELITE.textMuted, marginBottom: 6 }}>المنتجات / تعديل</div>
          <h1 style={{ fontFamily: ELITE.display, fontSize: 26, fontWeight: 900, color: ELITE.primary, margin: 0 }}>تعديل المنتج</h1>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn variant="ghost" size="md">إلغاء</Btn>
          <Btn variant="primary" size="md" icon="check">حفظ التغييرات</Btn>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <AdminCard title="معلومات أساسية">
            <FormGrid>
              <FormField label="اسم المنتج" required value="منظف أرضيات معطر لافندر" />
              <FormField label="Slug" required value="nuk-lavender-floor-cleaner" />
            </FormGrid>
            <FormGrid>
              <FormField label="البرند" required value="NUK Clean" dropdown />
              <FormField label="التصنيف" required value="منظفات" dropdown />
            </FormGrid>
            <FormField label="الوصف" textarea rows={3} value="منظف أرضيات فاخر بخلاصة اللافندر الطبيعية يزيل الأوساخ ويترك رائحة منعشة." />
          </AdminCard>

          <AdminCard title="السعر" helper="السعر بالليرة السورية فقط. الدولار يُحسب تلقائياً من سعر الصرف في الإعدادات.">
            <FormGrid>
              <FormField label="السعر الأساسي (ل.س)" required value="45,000" />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '4px 0 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, background: ELITE.primary50, borderRadius: 10, border: `1px dashed ${ELITE.primary200}` }}>
                  <div style={{ fontSize: 12, color: ELITE.primary }}>معاينة بالدولار</div>
                  <div style={{ fontFamily: ELITE.latin, fontSize: 16, fontWeight: 800, color: ELITE.primary }}>≈ 3.00 $</div>
                </div>
              </div>
            </FormGrid>
            <div style={{ padding: 16, background: '#FFF8E1', border: `1px dashed ${ELITE.gold}`, borderRadius: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: ELITE.goldDark, display: 'flex', alignItems: 'center', gap: 6 }}>
                    تفعيل التخفيض <Icon name="help" size={14} color={ELITE.goldDark} />
                  </div>
                  <div style={{ fontSize: 11, color: ELITE.textMuted, marginTop: 4 }}>يعرض السعر القديم مشطوباً + نسبة خصم</div>
                </div>
                <Switch on />
              </div>
              <div style={{ marginTop: 12 }}>
                <FormField label="سعر التخفيض (ل.س)" required value="32,000" />
                <div style={{ fontSize: 12, color: ELITE.success, fontWeight: 700 }}>خصم 29% — وفّر 13,000 ل.س</div>
              </div>
            </div>
          </AdminCard>

          <AdminCard title="الصور">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
              {['sky','primary','gold','neutral'].map((t, i) => (
                <div key={i} style={{ aspectRatio: '1', borderRadius: 10, position: 'relative', overflow: 'hidden', border: `2px solid ${i === 0 ? ELITE.gold : ELITE.border}` }}>
                  <PhotoPlaceholder tone={t} label={`img ${i+1}`} radius={0} />
                  {i === 0 && <div style={{ position: 'absolute', top: 4, right: 4, width: 22, height: 22, borderRadius: '50%', background: ELITE.gold, display: 'grid', placeItems: 'center' }}><Icon name="star" size={12} color="#fff" /></div>}
                  <div style={{ position: 'absolute', top: 4, left: 4, width: 22, height: 22, borderRadius: '50%', background: ELITE.danger, display: 'grid', placeItems: 'center', cursor: 'pointer' }}><Icon name="close" size={12} color="#fff" /></div>
                </div>
              ))}
              <div style={{ aspectRatio: '1', border: `2px dashed ${ELITE.primary200}`, borderRadius: 10, display: 'grid', placeItems: 'center', background: ELITE.primary50, cursor: 'pointer', gap: 4, gridAutoFlow: 'row' }}>
                <Icon name="plus" size={24} color={ELITE.primary} />
                <div style={{ fontSize: 10, color: ELITE.primary, fontWeight: 700 }}>إضافة صورة</div>
              </div>
            </div>
          </AdminCard>

          <AdminCard title="المتغيرات" optional>
            <div style={{ border: `1px solid ${ELITE.border}`, borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ padding: '10px 14px', background: ELITE.surfaceDim, display: 'grid', gridTemplateColumns: '120px 1fr 100px 120px 40px', gap: 10, fontSize: 11, fontWeight: 700, color: ELITE.textMuted }}>
                <div>النوع</div><div>الاسم</div><div>القيمة</div><div>السعر (ل.س)</div><div></div>
              </div>
              {[
                { type: 'الحجم', name: '500 مل', value: '-', price: '12,000' },
                { type: 'الحجم', name: '1 لتر', value: '-', price: '22,000' },
                { type: 'الحجم', name: '2 لتر', value: '-', price: '32,000' },
              ].map((v, i) => (
                <div key={i} style={{ padding: '10px 14px', borderTop: `1px solid ${ELITE.border}`, display: 'grid', gridTemplateColumns: '120px 1fr 100px 120px 40px', gap: 10, fontSize: 13, alignItems: 'center' }}>
                  <div style={{ padding: '4px 10px', background: ELITE.primary50, color: ELITE.primary, fontSize: 12, fontWeight: 700, borderRadius: 4, textAlign: 'center' }}>{v.type}</div>
                  <div style={{ fontWeight: 600, color: ELITE.text }}>{v.name}</div>
                  <div style={{ color: ELITE.textMuted }}>{v.value}</div>
                  <div style={{ fontFamily: ELITE.latin, fontWeight: 700, color: ELITE.primary }}>{v.price}</div>
                  <div style={{ color: ELITE.danger, cursor: 'pointer' }}><Icon name="trash" size={16} color={ELITE.danger} /></div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 10 }}>
              <Btn variant="outline" size="sm" icon="plus">إضافة متغير</Btn>
            </div>
          </AdminCard>

          <AdminCard title="التوفر بالمحافظات">
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <Btn variant="ghost" size="sm">اختيار الكل</Btn>
              <Btn variant="ghost" size="sm">إلغاء الكل</Btn>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {['دمشق','حلب','حمص','اللاذقية','طرطوس','حماه','درعا','السويداء','القنيطرة'].map((g, i) => (
                <div key={g} style={{ padding: 12, border: `1px solid ${ELITE.border}`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: ELITE.text }}>{g}</div>
                  <Switch on={i < 6} />
                </div>
              ))}
            </div>
          </AdminCard>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <AdminCard title="الحالة">
            <SettingRow label="فعّال" control={<Switch on />} />
            <SettingRow label="مميّز في الرئيسية" control={<Switch on />} />
            <SettingRow label="حالة المخزون" control={<div style={{ fontSize: 12, color: ELITE.success, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: ELITE.success }} /> متوفر</div>} />
          </AdminCard>
          <AdminCard title="الشارات">
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
              <TagBadge label="جديد" color={ELITE.primary} />
              <TagBadge label="عرض" color={ELITE.gold} />
            </div>
            <div style={{ fontSize: 12, color: ELITE.textMuted, marginBottom: 8 }}>الشارات المتاحة:</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['الأكثر مبيعاً','حصري','نفد','موسمي'].map(s => (
                <div key={s} style={{ padding: '4px 10px', background: '#fff', border: `1px dashed ${ELITE.border}`, borderRadius: 4, fontSize: 11, color: ELITE.textMuted, cursor: 'pointer' }}>+ {s}</div>
              ))}
            </div>
          </AdminCard>
          <AdminCard title="الترتيب">
            <FormField label="ترتيب الظهور" value="0" hint="الأقل يظهر أولاً" />
          </AdminCard>
        </div>
      </div>
    </AdminShell>
  );
}

function AdminCard({ title, helper, optional, children }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, border: `1px solid ${ELITE.border}`, padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <h3 style={{ margin: 0, fontFamily: ELITE.display, fontSize: 16, fontWeight: 900, color: ELITE.primary }}>{title}</h3>
        {optional && <div style={{ fontSize: 10, color: ELITE.textMuted, background: ELITE.surfaceDim, padding: '2px 8px', borderRadius: 4 }}>اختياري</div>}
      </div>
      {helper && <div style={{ fontSize: 12, color: ELITE.textMuted, marginBottom: 12, padding: 10, background: ELITE.primary50, borderRadius: 8, display: 'flex', gap: 6, alignItems: 'flex-start' }}><Icon name="info" size={14} color={ELITE.primary} />{helper}</div>}
      {children}
    </div>
  );
}

function SettingRow({ label, control }) {
  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}><div style={{ fontSize: 13, fontWeight: 600, color: ELITE.text }}>{label}</div>{control}</div>;
}

function AdminBannersScreen() {
  return (
    <AdminShell active="banners">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div>
          <h1 style={{ fontFamily: ELITE.display, fontSize: 26, fontWeight: 900, color: ELITE.primary, margin: 0 }}>إدارة سلايدر الصور</h1>
          <div style={{ fontSize: 13, color: ELITE.textMuted, marginTop: 4, maxWidth: 600 }}>
            هذه الصور تظهر في سلايدر متحرك في أعلى الصفحة الرئيسية (تحت البانر الثابت).
          </div>
        </div>
        <Btn variant="primary" size="md" icon="plus">إضافة صورة جديدة</Btn>
      </div>
      <div style={{ padding: 12, background: '#FFF8E1', border: `1px dashed ${ELITE.gold}`, borderRadius: 10, margin: '16px 0 20px', fontSize: 12, color: ELITE.goldDark, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon name="info" size={14} color={ELITE.goldDark} />
        <div><strong>نصيحة:</strong> استخدم صوراً بنسبة 2:1 (مثلاً 1600×800 بكسل). الحد الأقصى الموصى به: 5 صور.</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {[
          { title: 'عرض BESTON - خصم 40%', order: 1, active: true, tone: 'primary' },
          { title: 'وصل حديثاً - Millia', order: 2, active: true, tone: 'gold' },
          { title: 'شحن مجاني على طلبات 200k+', order: 3, active: false, tone: 'sky' },
        ].map((b, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 14, border: `1px solid ${ELITE.border}`, overflow: 'hidden' }}>
            <div style={{ aspectRatio: '2 / 1', position: 'relative' }}>
              <PhotoPlaceholder tone={b.tone} label={b.title} radius={0} />
              {!b.active && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'grid', placeItems: 'center' }}>
                  <div style={{ background: ELITE.danger, color: '#fff', padding: '6px 16px', borderRadius: 6, fontSize: 13, fontWeight: 800 }}>معطّل</div>
                </div>
              )}
            </div>
            <div style={{ padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: ELITE.text }}>{b.title}</div>
                <div style={{ fontSize: 11, color: ELITE.textMuted, marginTop: 2 }}>ترتيب: {b.order}</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: b.active ? '#ECFDF5' : ELITE.surfaceDim, color: b.active ? ELITE.success : ELITE.textMuted, display: 'grid', placeItems: 'center', cursor: 'pointer' }}><Icon name="eye" size={16} color={b.active ? ELITE.success : ELITE.textMuted} /></div>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#EFF6FF', color: ELITE.info, display: 'grid', placeItems: 'center', cursor: 'pointer' }}><Icon name="edit" size={16} color={ELITE.info} /></div>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#FEF2F2', color: ELITE.danger, display: 'grid', placeItems: 'center', cursor: 'pointer' }}><Icon name="trash" size={16} color={ELITE.danger} /></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}

function AdminBrandsScreen() {
  return (
    <AdminShell active="brands">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontFamily: ELITE.display, fontSize: 26, fontWeight: 900, color: ELITE.primary, margin: 0 }}>البرندات</h1>
          <div style={{ fontSize: 13, color: ELITE.textMuted, marginTop: 4 }}>إدارة 8 برندات</div>
        </div>
        <Btn variant="primary" size="md" icon="plus">إضافة برند جديد</Btn>
      </div>

      <div style={{ background: '#fff', borderRadius: 14, border: `1px solid ${ELITE.border}`, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', background: ELITE.surfaceDim, display: 'grid', gridTemplateColumns: '60px 2fr 1fr 1fr 80px 80px 100px', gap: 16, fontSize: 12, fontWeight: 700, color: ELITE.textMuted, alignItems: 'center' }}>
          <div>الشعار</div><div>الاسم</div><div>التصنيفات</div><div>المنتجات</div><div>الحالة</div><div>الترتيب</div><div>إجراءات</div>
        </div>
        {[
          { name: 'NUK Clean', cats: 4, prods: 42, active: true, order: 1, tone: 'sky' },
          { name: 'BESTON', cats: 3, prods: 24, active: true, order: 2, tone: 'primary' },
          { name: 'Millia', cats: 2, prods: 18, active: true, order: 3, tone: 'gold' },
          { name: 'PRESTIGE', cats: 3, prods: 12, active: true, order: 4, tone: 'neutral' },
          { name: 'banat', cats: 2, prods: 18, active: true, order: 5, tone: 'sky' },
          { name: 'Vizon', cats: 1, prods: 9, active: false, order: 6, tone: 'primary' },
        ].map((b, i) => (
          <div key={i} style={{ padding: '14px 20px', display: 'grid', gridTemplateColumns: '60px 2fr 1fr 1fr 80px 80px 100px', gap: 16, alignItems: 'center', borderTop: `1px solid ${ELITE.border}` }}>
            <div style={{ width: 44, height: 44, borderRadius: 8, overflow: 'hidden' }}><PhotoPlaceholder tone={b.tone} label="" radius={0} /></div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: ELITE.text, fontFamily: ELITE.latin }}>{b.name}</div>
              <div style={{ fontSize: 11, color: ELITE.textMuted, marginTop: 2 }}>/brands/{b.name.toLowerCase()}</div>
            </div>
            <div style={{ fontSize: 13, color: ELITE.text, fontWeight: 600 }}>{b.cats} تصنيف</div>
            <div style={{ fontSize: 13, color: ELITE.text, fontWeight: 600 }}>{b.prods} منتج</div>
            <div>
              {b.active ? <div style={{ fontSize: 11, color: ELITE.success, fontWeight: 700, background: '#ECFDF5', padding: '3px 8px', borderRadius: 4, display: 'inline-block' }}>فعّال</div> : <div style={{ fontSize: 11, color: ELITE.textMuted, fontWeight: 700, background: ELITE.surfaceDim, padding: '3px 8px', borderRadius: 4, display: 'inline-block' }}>معطّل</div>}
            </div>
            <div style={{ fontFamily: ELITE.latin, fontSize: 13, color: ELITE.textMuted }}>{b.order}</div>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: '#EFF6FF', display: 'grid', placeItems: 'center', cursor: 'pointer' }}><Icon name="edit" size={14} color={ELITE.info} /></div>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: '#FEF2F2', display: 'grid', placeItems: 'center', cursor: 'pointer' }}><Icon name="trash" size={14} color={ELITE.danger} /></div>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}

function AdminSettingsScreen() {
  return (
    <AdminShell active="settings">
      <h1 style={{ fontFamily: ELITE.display, fontSize: 26, fontWeight: 900, color: ELITE.primary, margin: 0 }}>الإعدادات</h1>
      <div style={{ fontSize: 13, color: ELITE.textMuted, marginTop: 4, marginBottom: 20 }}>إعدادات عامة للمتجر</div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, borderBottom: `1px solid ${ELITE.border}`, marginBottom: 20 }}>
        {['عام', 'المالية', 'شام كاش', 'نصوص الموقع'].map((t, i) => (
          <div key={t} style={{
            padding: '10px 18px', fontSize: 13, fontWeight: 700,
            color: i === 1 ? ELITE.primary : ELITE.textMuted,
            borderBottom: i === 1 ? `3px solid ${ELITE.gold}` : '3px solid transparent',
            marginBottom: -1, cursor: 'pointer',
          }}>{t}</div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <AdminCard title="سعر الصرف" helper="يُستخدم لحساب معادل كل المنتجات بالدولار. حدّثه كلما تغيّر سعر السوق.">
          <FormField label="كم ليرة تساوي 1 دولار" required value="15,000" />
          <div style={{ padding: 12, background: ELITE.primary50, borderRadius: 10, fontSize: 13, color: ELITE.primary, display: 'flex', justifyContent: 'space-between' }}>
            <div>مثال: 45,000 ل.س</div>
            <div style={{ fontFamily: ELITE.latin, fontWeight: 800 }}>= 3.00 $</div>
          </div>
        </AdminCard>
        <AdminCard title="الشحن المجاني" helper="اتركه فارغاً لتعطيل الميزة.">
          <FormField label="عتبة الشحن المجاني (ل.س)" value="300,000" hint="أي طلب يتجاوز هذا المبلغ = شحن مجاني" />
          <div style={{ padding: 12, background: '#ECFDF5', border: `1px solid #BBF7D0`, borderRadius: 10, fontSize: 12, color: '#065F46', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name="check" size={16} color={ELITE.success} /> هذه الميزة مفعّلة حالياً
          </div>
        </AdminCard>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
        <Btn variant="primary" size="md" icon="check">حفظ التغييرات</Btn>
      </div>
    </AdminShell>
  );
}

Object.assign(window, {
  AdminLoginScreen, AdminDashScreen, AdminProductFormScreen,
  AdminBannersScreen, AdminBrandsScreen, AdminSettingsScreen,
});
