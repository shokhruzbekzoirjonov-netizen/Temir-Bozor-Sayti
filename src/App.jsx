import React, { useState } from 'react';

const PRODUCTS_DATA = [
  {
    id: 1,
    name: 'Armnatura 12 (A500C)',
    description: 'Yengil va mustahkam Armaturalar.',
    price: 7000,
    unit: 'metr',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnBBBHSSjQBeRhVrXe1051_ZqzIlZXLSFT2A&s'
  },
  {
    id: 2,
    name: 'Armnatura 14 (A500C)',
    description: 'Yengil va mustahkam Armaturalar.',
    price: 10000,
    unit: 'metr',
    image: 'https://www.prom.uz/_ipx/f_webp/https://devel.prom.uz/upload//products/2026/5/15/2/24.png'
  },
  {
    id: 3,
    name: 'Armnatura 16 (A500C)',
    description: 'Yengil va mustahkam Armaturalar.',
    price: 13000,
    unit: 'metr',
    image: 'https://www.prom.uz/_ipx/f_webp/https://devel.prom.uz/upload//products/2026/5/15/2/25.png'
  },
  {
    id: 4,
    name: 'Armnatura 18 (A500C)',
    description: 'Yengil va mustahkam Armaturalar.',
    price: 17000,
    unit: 'metr',
    image: 'https://www.prom.uz/_ipx/f_webp/https://devel.prom.uz/upload//products/2026/5/15/2/26.png'
  },
  {
    id: 5,
    name: 'Armnatura 20 (A500C)',
    description: 'Yengil va mustahkam Armaturalar.',
    price: 20000,
    unit: 'metr',
    image: 'https://www.prom.uz/_ipx/f_webp/https://devel.prom.uz/upload//products/2026/5/15/2/27.png'
  },
  {
    id: 6,
    name: 'Armnatura 22 (A500C)',
    description: 'Yengil va mustahkam Armaturalar.',
    price: 25000,
    unit: 'metr',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPnD9LsuvDoq6sR2flgddOkdkPe9kHDPVeVA&s'
  },
  {
    id: 7,
    name: 'Armnatura 25 (A500C)',
    description: 'Yengil va mustahkam Armaturalar.',
    price: 32000,
    unit: 'metr',
    image: 'https://rt-metall.ru/wp-content/uploads/2016/04/a500c-25-mm.jpg'
  },

  {
    id: 8,
    name: 'Armnatura 12 (A400C)',
    description: 'Yengil va mustahkam Armaturalar.',
    price: 7000,
    unit: 'metr',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnBBBHSSjQBeRhVrXe1051_ZqzIlZXLSFT2A&s'
  },
  {
    id: 9,
    name: 'Armnatura 14 (A400C)',
    description: 'Yengil va mustahkam Armaturalar.',
    price: 9500,
    unit: 'metr',
    image: 'https://www.prom.uz/_ipx/f_webp/https://devel.prom.uz/upload//products/2026/5/15/2/24.png'
  },
  {
    id: 10,
    name: 'Armnatura 16 (A400C)',
    description: 'Yengil va mustahkam Armaturalar.',
    price: 12000,
    unit: 'metr',
    image: 'https://www.prom.uz/_ipx/f_webp/https://devel.prom.uz/upload//products/2026/5/15/2/25.png'
  },
  {
    id: 11,
    name: 'Armnatura 18 (A400C)',
    description: 'Yengil va mustahkam Armaturalar.',
    price: 16000,
    unit: 'metr',
    image: 'https://www.prom.uz/_ipx/f_webp/https://devel.prom.uz/upload//products/2026/5/15/2/26.png'
  },
  {
    id: 12,
    name: 'Armnatura 20 (A400C)',
    description: 'Yengil va mustahkam Armaturalar.',
    price: 19000,
    unit: 'metr',
    image: 'https://www.prom.uz/_ipx/f_webp/https://devel.prom.uz/upload//products/2026/5/15/2/27.png'
  },
  {
    id: 13,
    name: 'Armnatura 22 (A400C)',
    description: 'Yengil va mustahkam Armaturalar.',
    price: 24000,
    unit: 'metr',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPnD9LsuvDoq6sR2flgddOkdkPe9kHDPVeVA&sf'
  },
  {
    id: 14,
    name: 'Armnatura 25 (A400C)',
    description: 'Yengil va mustahkam Armaturalar.',
    price: 30000,
    unit: 'metr',
    image: 'https://rt-metall.ru/wp-content/uploads/2016/04/a500c-25-mm.jpg'
  },
    {
    id: 15,
    name: 'Profil',
    description: 'Bizda profilni xili juda kop turlari mavjud, ushan uchun sizga telefon qilgan odamlardan qanaqa kerakligini surang!',
    price: 0,
    unit: 'metr',
    image: 'https://insaat.az/uploads/news/74497f9142031bcb3b70bf4a628f9066.jpg'
  }
];

export default function App() {
  const [selectedId, setSelectedId] = useState(1);s
  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState(''); 
  const [loading, setLoading] = useState(false); 

  const TELEGRAM_BOT_TOKEN = '8939723627:AAFB_pfW7pBmfOKve2qPoM0K_tYweSKCfHU'; 

  const CHAT_ID = '-5083266505';
  const selectedProduct = PRODUCTS_DATA.find(p => p.id === Number(selectedId)) || PRODUCTS_DATA[0];
  const totalPrice = selectedProduct.price * quantity;

  const sendOrderToBot = async (e) => {
    e.preventDefault();
    if (!phone) {
      alert("Iltimos, telefon raqamingizni kiriting!");
      return;
    }

    setLoading(true);

    const message = `🔔 <b>YANGI BUYURTMA KELDI!</b>\n\n` +
                    `📦 <b>Mahsulot:</b> ${selectedProduct.name}\n` +
                    `📏 <b>Miqdori:</b> ${quantity} ${selectedProduct.unit}\n` +
                    `💵 <b>Summa:</b> ${totalPrice.toLocaleString('uz-UZ')} so'm\n\n` +
                    `📱 <b>Mijoz telefoni:</b> ${phone}\n\n` +
                    `✍️ <i>Sotib oluvchi bilan tezda bog'laning!</i>`;

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        })
      });

      if (response.ok) {
        alert("🎉 Buyurtmangiz muvaffaqiyatli qabul qilindi! Mas'ul xodimlar tez orada siz bilan bog'lanishadi.");
        setPhone(''); 
      } else {
        alert("Xatolik! Bot guruhga qo'shilganini va Admin qilinganini tekshiring!");
      }
    } catch (error) {
      console.error(error);
      alert("Error 404!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f4f6f9', minHeight: '100vh', paddingBottom: '50px', margin: 0 }}>
      <nav style={{ backgroundColor: '#1e293b', color: 'white', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: '#f59e0b' }}>🏗 TEMIR BOZOR</h2>
        <span style={{ color: '#94a3b8', fontSize: '14px' }}>Onlayn Savdo Tizimi</span>
      </nav>
      <div style={{ backgroundColor: '#0f172a', color: 'white', textAlign: 'center', padding: '60px 20px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', margin: 0 }}>Sifatli Metall Prokati</h1>
      </div>
      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', color: '#1e293b' }}>Mahsulotlarimiz:</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', marginTop: '20px' }}>
          {PRODUCTS_DATA.map((product) => (
            <div key={product.id} style={{ backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '300px' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#1e293b' }}>{product.name}</h3>
                <p style={{ color: '#64748b', fontSize: '14px', height: '40px', margin: 0 }}>{product.description}</p>
                <div style={{ color: '#e11d48', fontWeight: 'bold', fontSize: '18px', margin: '15px 0' }}>
                  {product.price.toLocaleString('uz-UZ')} so'm / {product.unit}
                </div>
                <a 
                  href="#calculator" 
                  onClick={() => setSelectedId(product.id)}
                  style={{ display: 'block', textAlign: 'center', backgroundColor: '#f59e0b', color: '#0f172a', padding: '10px', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}
                >
                  🧮 Miqdorini belgilash
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id="calculator" style={{ maxWidth: '450px', margin: '40px auto', backgroundColor: '#1e293b', color: 'white', padding: '30px', borderRadius: '15px', boxSizing: 'border-box' }}>
        <h3 style={{ textAlign: 'center', color: '#f59e0b', margin: '0 0 20px 0' }}>🧮 Buyurtma Rasmiylashtirish</h3>
        
        <form onSubmit={sendOrderToBot}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#cbd5e1' }}>Tanlangan mahsulot:</label>
            <select 
              value={selectedId} 
              onChange={(e) => setSelectedId(Number(e.target.value))}
              style={{ width: '100%', padding: '10px', borderRadius: '5px', fontSize: '16px', color: '#0f172a', fontWeight: 'bold' }}
            >
              {PRODUCTS_DATA.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#cbd5e1' }}>Miqdori: ({selectedProduct.unit}):</label>
            <input 
              type="number" 
              value={quantity} 
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              min="1"
              style={{ width: '100%', padding: '10px', borderRadius: '5px', fontSize: '16px', boxSizing: 'border-box', color: '#0f172a', fontWeight: 'bold' }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#cbd5e1' }}>Sotib oluvchining telefon raqami:</label>
            <input 
              type="text" 
              placeholder="+998 90 123-4567"
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', borderRadius: '5px', fontSize: '16px', boxSizing: 'border-box', color: '#0f172a', fontWeight: 'bold' }}
            />
          </div>

          <div style={{ textAlign: 'center', borderTop: '1px solid #334155', paddingTop: '15px', marginBottom: '25px' }}>
            <span style={{ color: '#94a3b8', display: 'block', marginBottom: '5px' }}>Umumiy summa:</span>
            <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b' }}>
              {totalPrice.toLocaleString('uz-UZ')} so'm
            </span>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ width: '100%', backgroundColor: '#e11d48', color: 'white', padding: '15px', border: 'none', borderRadius: '5px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {loading ? "Yuborilmoqda..." : "🚀 Tezkor Xarid Qilish"}
          </button>
        </form>
      </div>

    </div>
  );
}