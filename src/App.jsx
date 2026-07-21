import React, { useState, useRef } from 'react';

const PRODUCTS_DATA = [
  { id: 1, name: 'Armatura 12', grade: 'A500C', diameter: 12, description: 'Yengil va mustahkam armaturalar.', price: 7000, unit: 'metr', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnBBBHSSjQBeRhVrXe1051_ZqzIlZXLSFT2A&s' },
  { id: 2, name: 'Armatura 14', grade: 'A500C', diameter: 14, description: 'Yengil va mustahkam armaturalar.', price: 10000, unit: 'metr', image: 'https://www.prom.uz/_ipx/f_webp/https://devel.prom.uz/upload//products/2026/5/15/2/24.png' },
  { id: 3, name: 'Armatura 16', grade: 'A500C', diameter: 16, description: 'Yengil va mustahkam armaturalar.', price: 13000, unit: 'metr', image: 'https://www.prom.uz/_ipx/f_webp/https://devel.prom.uz/upload//products/2026/5/15/2/25.png' },
  { id: 4, name: 'Armatura 18', grade: 'A500C', diameter: 18, description: 'Yengil va mustahkam armaturalar.', price: 17000, unit: 'metr', image: 'https://www.prom.uz/_ipx/f_webp/https://devel.prom.uz/upload//products/2026/5/15/2/26.png' },
  { id: 5, name: 'Armatura 20', grade: 'A500C', diameter: 20, description: 'Yengil va mustahkam armaturalar.', price: 20000, unit: 'metr', image: 'https://www.prom.uz/_ipx/f_webp/https://devel.prom.uz/upload//products/2026/5/15/2/27.png' },
  { id: 6, name: 'Armatura 22', grade: 'A500C', diameter: 22, description: 'Yengil va mustahkam armaturalar.', price: 25000, unit: 'metr', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPnD9LsuvDoq6sR2flgddOkdkPe9kHDPVeVA&s' },
  { id: 7, name: 'Armatura 25', grade: 'A500C', diameter: 25, description: 'Yengil va mustahkam armaturalar.', price: 32000, unit: 'metr', image: 'https://rt-metall.ru/wp-content/uploads/2016/04/a500c-25-mm.jpg' },
  { id: 8, name: 'Armatura 12', grade: 'A400C', diameter: 12, description: 'Yengil va mustahkam armaturalar.', price: 7000, unit: 'metr', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnBBBHSSjQBeRhVrXe1051_ZqzIlZXLSFT2A&s' },
  { id: 9, name: 'Armatura 14', grade: 'A400C', diameter: 14, description: 'Yengil va mustahkam armaturalar.', price: 9500, unit: 'metr', image: 'https://www.prom.uz/_ipx/f_webp/https://devel.prom.uz/upload//products/2026/5/15/2/24.png' },
  { id: 10, name: 'Armatura 16', grade: 'A400C', diameter: 16, description: 'Yengil va mustahkam armaturalar.', price: 12000, unit: 'metr', image: 'https://www.prom.uz/_ipx/f_webp/https://devel.prom.uz/upload//products/2026/5/15/2/25.png' },
  { id: 11, name: 'Armatura 18', grade: 'A400C', diameter: 18, description: 'Yengil va mustahkam armaturalar.', price: 16000, unit: 'metr', image: 'https://www.prom.uz/_ipx/f_webp/https://devel.prom.uz/upload//products/2026/5/15/2/26.png' },
  { id: 12, name: 'Armatura 20', grade: 'A400C', diameter: 20, description: 'Yengil va mustahkam armaturalar.', price: 19000, unit: 'metr', image: 'https://www.prom.uz/_ipx/f_webp/https://devel.prom.uz/upload//products/2026/5/15/2/27.png' },
  { id: 13, name: 'Armatura 22', grade: 'A400C', diameter: 22, description: 'Yengil va mustahkam armaturalar.', price: 24000, unit: 'metr', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPnD9LsuvDoq6sR2flgddOkdkPe9kHDPVeVA&sf' },
  { id: 14, name: 'Armatura 25', grade: 'A400C', diameter: 25, description: 'Yengil va mustahkam armaturalar.', price: 30000, unit: 'metr', image: 'https://rt-metall.ru/wp-content/uploads/2016/04/a500c-25-mm.jpg' },
  { id: 15, name: 'Profil', grade: 'STD', diameter: null, description: "Profilning juda kop turlari mavjud — qo'ng'iroq qilganda kerakli o'lchamni ayting!", price: 0, unit: 'metr', image: 'https://insaat.az/uploads/news/74497f9142031bcb3b70bf4a628f9066.jpg' },
];

const COLORS = {
  bg: '#101317',
  panel: '#1a1e24',
  panelAlt: '#20252c',
  line: '#333a44',
  lineSoft: '#282e36',
  iron: '#e9e7e0',
  ironDim: '#9aa0a8',
  safety: '#ff7a1a',
  safetyDim: '#c95f11',
  amber: '#ffbe3d',
};

export default function App() {
  const [selectedId, setSelectedId] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const audioCtxRef = useRef(null);

  const playHoverClick = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch (err) {
      // Audio is a nice-to-have; never let it break the UI.
    }
  };

  const TELEGRAM_BOT_TOKEN = process.env.REACT_APP_TELEGRAM_BOT_TOKEN || '8939723627:AAFB_pfW7pBmfOKve2qPoM0K_tYweSKCfHU';
  const CHAT_ID = process.env.REACT_APP_CHAT_ID || '-5083266505';

  const selectedProduct = PRODUCTS_DATA.find(p => p.id === Number(selectedId)) || PRODUCTS_DATA[0];
  const totalPrice = selectedProduct.price * quantity;
  const orderNo = String(1000 + selectedProduct.id * 7 + quantity).slice(-4);

  const scrollToCalc = (id) => {
    setSelectedId(id);
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const sendOrderToBot = async (e) => {
    e.preventDefault();
    if (!phone) {
      alert("Iltimos, telefon raqamingizni kiriting!");
      return;
    }
    setLoading(true);

    const message = `🔔 <b>YANGI BUYURTMA KELDI!</b>\n\n` +
      `📦 <b>Mahsulot:</b> ${selectedProduct.name}${selectedProduct.grade !== 'STD' ? ' (' + selectedProduct.grade + ')' : ''}\n` +
      `📏 <b>Miqdori:</b> ${quantity} ${selectedProduct.unit}\n` +
      `💵 <b>Summa:</b> ${totalPrice.toLocaleString('uz-UZ')} so'm\n\n` +
      `📱 <b>Mijoz telefoni:</b> ${phone}\n\n` +
      `✍️ <i>Sotib oluvchi bilan tezda bog'laning!</i>`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'HTML' })
      });

      if (response.ok) {
        alert("🎉 Buyurtmangiz muvaffaqiyatli qabul qilindi! Mas'ul xodimlar tez orada siz bilan bog'lanishadi.");
        setPhone('');
      } else {
        alert("Xatolik! Bot guruhga qo'shilganini va Admin qilinganini tekshiring!");
      }
    } catch (error) {
      console.error(error);
      alert("Xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: COLORS.bg, minHeight: '100vh', margin: 0, color: COLORS.iron }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');

        * { box-sizing: border-box; }

        .hazard {
          background-image: repeating-linear-gradient(45deg, ${COLORS.safety} 0, ${COLORS.safety} 10px, #14171a 10px, #14171a 20px);
        }
        .pulse-dot {
          animation: pulse 1.6s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(255,122,26,0.6); }
          50% { opacity: 0.6; box-shadow: 0 0 0 6px rgba(255,122,26,0); }
        }
        .tb-card {
          transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
        }
        .tb-card:hover {
          transform: translateY(-6px);
          border-color: ${COLORS.safety};
          box-shadow: 0 18px 34px rgba(0,0,0,0.45);
        }
        .tb-card:hover .tb-card-img {
          filter: grayscale(0%);
        }
        .tb-card-img {
          filter: grayscale(35%);
          transition: filter .3s ease, transform .4s ease;
        }
        .tb-card:hover .tb-card-img { transform: scale(1.05); }
        .tb-btn {
          transition: background-color .18s ease, transform .12s ease, box-shadow .18s ease;
        }
        .tb-btn:hover { background-color: ${COLORS.amber} !important; box-shadow: 0 8px 18px rgba(255,122,26,0.35); }
        .tb-btn:active { transform: scale(0.97); }
        .tb-submit {
          transition: background-color .18s ease, transform .12s ease;
        }
        .tb-submit:hover:not(:disabled) { background-color: ${COLORS.amber} !important; }
        .tb-submit:active:not(:disabled) { transform: scale(0.98); }
        .tb-input, .tb-select {
          transition: border-color .15s ease, box-shadow .15s ease;
        }
        .tb-input:focus, .tb-select:focus {
          outline: none;
          border-color: ${COLORS.safety} !important;
          box-shadow: 0 0 0 3px rgba(255,122,26,0.18);
        }
        ::selection { background: ${COLORS.safety}; color: #101317; }
        @media (max-width: 640px) {
          .hero-title { font-size: 2.1rem !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 20, backgroundColor: COLORS.panel, borderBottom: `1px solid ${COLORS.line}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px', maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <RebarMark size={30} />
            <span style={{ fontFamily: "'Oswald', sans-serif", fontSize: 21, fontWeight: 700, letterSpacing: 1, color: COLORS.iron }}>
              TEMIR<span style={{ color: COLORS.safety }}>BOZOR</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.ironDim, letterSpacing: 0.5 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: COLORS.safety, display: 'inline-block' }} className="pulse-dot" />
            ONLAYN SAVDO TIZIMI
          </div>
        </div>
        <div className="hazard" style={{ height: 4 }} />
      </nav>

      {/* HERO */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        backgroundColor: '#0c0e11',
        backgroundImage: `repeating-linear-gradient(115deg, #14171b 0px, #14171b 2px, #0c0e11 2px, #0c0e11 26px)`,
        padding: '72px 20px 0',
        textAlign: 'center',
        borderBottom: `1px solid ${COLORS.line}`,
      }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: COLORS.safety, border: `1px solid ${COLORS.safetyDim}`, borderRadius: 999, padding: '5px 14px', marginBottom: 22, backgroundColor: 'rgba(255,122,26,0.07)' }}>
            GOST 34028-2016 &nbsp;•&nbsp; A400C / A500C
          </div>
          <h1 className="hero-title" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: '3.4rem', lineHeight: 1.05, letterSpacing: 0.5, margin: 0, textTransform: 'uppercase' }}>
            Sifatli metall<br /><span style={{ color: COLORS.safety }}>prokati</span>
          </h1>
          <p style={{ color: COLORS.ironDim, fontSize: 16, marginTop: 18, maxWidth: 520, marginLeft: 'auto', marginRight: 'auto' }}>
            Armatura va profil — ombordan to'g'ridan-to'g'ri, o'lchamini tanlang, telefon raqamingizni qoldiring — qolganini biz bajaramiz.
          </p>
        </div>

        {/* spec ticker */}
        <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 0, fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: COLORS.iron, borderTop: `1px solid ${COLORS.line}`, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
          {[
            ['Ø DIAMETR', '12 — 25 mm'],
            ['SINF', 'A400C / A500C'],
            ['BIRLIK', "metr / narx"],
            ['YETKAZISH', "Jizzax bo'ylab"],
          ].map(([label, val], i) => (
            <div key={i} style={{ flex: '1 1 180px', padding: '14px 10px', borderRight: i < 3 ? `1px solid ${COLORS.line}` : 'none' }}>
              <div style={{ color: COLORS.ironDim, fontSize: 10, letterSpacing: 1 }}>{label}</div>
              <div style={{ marginTop: 4, fontWeight: 700 }}>{val}</div>
            </div>
          ))}
        </div>
        <div className="hazard" style={{ height: 6, marginTop: 40 }} />
      </div>

      {/* PRODUCTS */}
      <div style={{ maxWidth: 1200, margin: '56px auto', padding: '0 20px' }}>
        <SectionHeading eyebrow="KATALOG" title="Mahsulotlarimiz" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))', gap: 22, marginTop: 34 }}>
          {PRODUCTS_DATA.map((product) => (
            <div
              key={product.id}
              className="tb-card"
              onMouseEnter={playHoverClick}
              style={{
                position: 'relative',
                backgroundColor: COLORS.panel,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <Rivet top left /><Rivet top right /><Rivet bottom left /><Rivet bottom right />

              <div style={{ position: 'relative', height: 176, overflow: 'hidden', backgroundColor: '#0c0e11' }}>
                <img src={product.image} alt={product.name} className="tb-card-img" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                {product.diameter && (
                  <div style={{
                    position: 'absolute', bottom: 8, left: 8,
                    fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 13,
                    color: '#101317', backgroundColor: COLORS.amber,
                    padding: '3px 8px', borderRadius: 3,
                  }}>
                    ⌀{product.diameter}mm
                  </div>
                )}
                <div style={{
                  position: 'absolute', top: 10, right: -30, transform: 'rotate(35deg)',
                  backgroundColor: product.grade === 'A500C' ? COLORS.safety : product.grade === 'A400C' ? '#4a90d9' : COLORS.ironDim,
                  color: '#101317', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700,
                  fontSize: 10.5, letterSpacing: 1, padding: '3px 34px', boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                }}>
                  {product.grade}
                </div>
              </div>

              <div style={{ padding: '16px 18px 18px' }}>
                <h3 style={{ margin: 0, fontFamily: "'Oswald', sans-serif", fontSize: 18, fontWeight: 600, letterSpacing: 0.3, textTransform: 'uppercase' }}>
                  {product.name}
                </h3>
                <p style={{ color: COLORS.ironDim, fontSize: 12.5, minHeight: 34, margin: '8px 0 14px', lineHeight: 1.4 }}>
                  {product.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderTop: `1px dashed ${COLORS.line}`, paddingTop: 12, marginBottom: 14 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 19, color: COLORS.safety }}>
                    {product.price.toLocaleString('uz-UZ')} <span style={{ fontSize: 11, color: COLORS.ironDim, fontWeight: 500 }}>so'm</span>
                  </span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.ironDim }}>/ {product.unit}</span>
                </div>

                <button
                  onClick={() => scrollToCalc(product.id)}
                  onMouseEnter={playHoverClick}
                  className="tb-btn"
                  style={{
                    width: '100%', backgroundColor: COLORS.safety, color: '#101317', border: 'none',
                    padding: '11px', borderRadius: 3, fontFamily: "'Oswald', sans-serif",
                    fontWeight: 600, fontSize: 13, letterSpacing: 0.6, textTransform: 'uppercase', cursor: 'pointer',
                  }}
                >
                  Miqdorini belgilash →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CALCULATOR / ORDER DOCKET */}
      <div style={{ padding: '10px 20px 80px' }}>
        <SectionHeading eyebrow="RASMIYLASHTIRISH" title="Buyurtma varag'i" center />

        <form
          id="calculator"
          onSubmit={sendOrderToBot}
          style={{
            maxWidth: 460, margin: '30px auto 0', backgroundColor: COLORS.panelAlt,
            border: `1px solid ${COLORS.line}`, borderRadius: 6, position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 22px', borderBottom: `1px dashed ${COLORS.line}`, backgroundColor: COLORS.panel }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: COLORS.ironDim, letterSpacing: 1 }}>BUYURTMA №{orderNo}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: COLORS.safety }}>● TAYYORLANMOQDA</span>
          </div>

          <div style={{ padding: '24px 22px 22px' }}>
            <Field label="01 · TANLANGAN MAHSULOT">
              <select
                value={selectedId}
                onChange={(e) => setSelectedId(Number(e.target.value))}
                className="tb-select"
                style={inputStyle}
              >
                {PRODUCTS_DATA.map(p => (
                  <option key={p.id} value={p.id}>{p.name}{p.grade !== 'STD' ? ` (${p.grade})` : ''}</option>
                ))}
              </select>
            </Field>

            <Field label={`02 · MIQDORI (${selectedProduct.unit})`}>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                className="tb-input"
                style={inputStyle}
              />
            </Field>

            <Field label="03 · TELEFON RAQAMINGIZ">
              <input
                type="text"
                placeholder="+998 90 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="tb-input"
                style={inputStyle}
              />
            </Field>

            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderTop: `1px dashed ${COLORS.line}`, borderBottom: `1px dashed ${COLORS.line}`,
              padding: '16px 2px', margin: '22px 0',
            }}>
              <span style={{ color: COLORS.ironDim, fontSize: 12.5, fontFamily: "'JetBrains Mono', monospace" }}>UMUMIY SUMMA</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 26, fontWeight: 700, color: COLORS.safety }}>
                {totalPrice.toLocaleString('uz-UZ')} <span style={{ fontSize: 13, color: COLORS.ironDim }}>so'm</span>
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="tb-submit"
              style={{
                width: '100%', backgroundColor: loading ? COLORS.lineSoft : COLORS.safety,
                color: loading ? COLORS.ironDim : '#101317', border: 'none', padding: '15px',
                borderRadius: 3, fontFamily: "'Oswald', sans-serif", fontSize: 15, fontWeight: 600,
                letterSpacing: 0.6, textTransform: 'uppercase', cursor: loading ? 'default' : 'pointer',
              }}
            >
              {loading ? 'Yuborilmoqda…' : '🚀 Tezkor xarid qilish'}
            </button>
          </div>

          <div className="hazard" style={{ height: 5 }} />
        </form>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${COLORS.line}`, padding: '22px 20px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <RebarMark size={18} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.ironDim, letterSpacing: 0.5 }}>
            TEMIR BOZOR — sifatli metall prokati
          </span>
        </div>
      </footer>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '11px 12px', borderRadius: 4, fontSize: 15,
  backgroundColor: '#101317', color: COLORS.iron, border: `1px solid ${COLORS.line}`,
  fontFamily: "'JetBrains Mono', monospace", boxSizing: 'border-box',
};

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', marginBottom: 6, color: COLORS.ironDim, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 0.6 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title, center = true }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left' }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: COLORS.safety, letterSpacing: 2, marginBottom: 8 }}>
        {eyebrow}
      </div>
      <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: 30, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5, margin: 0, color: COLORS.iron }}>
        {title}
      </h2>
      <div style={{ width: 64, height: 4, margin: center ? '14px auto 0' : '14px 0 0', backgroundImage: `repeating-linear-gradient(45deg, ${COLORS.safety} 0, ${COLORS.safety} 5px, #14171a 5px, #14171a 10px)` }} />
    </div>
  );
}

function Rivet({ top, bottom, left, right }) {
  const style = {
    position: 'absolute', width: 7, height: 7, borderRadius: '50%',
    background: 'radial-gradient(circle at 35% 35%, #6b7280, #23272e)',
    boxShadow: '0 1px 1px rgba(0,0,0,0.6)', zIndex: 2,
  };
  if (top) style.top = 7; if (bottom) style.bottom = 7;
  if (left) style.left = 7; if (right) style.right = 7;
  return <div style={style} />;
}

function RebarMark({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" stroke={COLORS.safety} strokeWidth="2.4" />
      <circle cx="16" cy="16" r="8.5" stroke={COLORS.iron} strokeWidth="2" strokeDasharray="3.2 3.2" />
      <circle cx="16" cy="16" r="2.6" fill={COLORS.safety} />
    </svg>
  );
}