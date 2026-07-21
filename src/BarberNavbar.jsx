import { useState, useEffect, useMemo, useCallback } from "react";

// 1. BotFather'dan olingan tokenni tekshirib qo'ying:
const TELEGRAM_BOT_TOKEN = "8952129410:AAGCxdTKV9F9_Vb40vftG1qCSULsVBPiOMc";
const TELEGRAM_CHAT_ID = "-5012396870";

// 2. Yo'qolgan massiv va konstantalar:
const DOW = ["Yak", "Dush", "Sesh", "Chor", "Pay", "Jum", "Shan"];
const MON = ["Yan", "Fev", "Mar", "Apr", "May", "Iyun", "Iyul", "Avg", "Sen", "Okt", "Noy", "Dek"];
const MON_FULL = [
  "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
  "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr",
];
const SLOT_HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

const COLOR = {
  charcoal: "#171513",
  charcoal2: "#211e1a",
  charcoal3: "#2b2622",
  cream: "#F6EFE2",
  creamDim: "#b9b0a0",
  gold: "#C9A227",
  goldBright: "#EFC94C",
  goldSoft: "rgba(201,162,39,0.14)",
  green: "#4C9271",
  greenBg: "rgba(76,146,113,0.12)",
  greenBorder: "rgba(76,146,113,0.5)",
  red: "#B85248",
  redBg: "rgba(184,82,72,0.12)",
  redBorder: "rgba(184,82,72,0.5)",
};

// 3. Yo'qolgan yordamchi funksiyalar:
function pad(n) {
  return n < 10 ? "0" + n : "" + n;
}

function dateKey(d) {
  return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
}

async function sendTelegramNotification(text) {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: "HTML",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.warn("Telegram API xatosi:", data.description);
    } else {
      console.log("Xabar Telegram'ga muvaffaqiyatli yuborildi!");
    }
  } catch (err) {
    console.warn("Tarmoq yoki server xatoligi:", err.message);
  }
}

export default function BarberNavbar() {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const dates = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      arr.push(d);
    }
    return arr;
  }, [today]);

  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [bookings, setBookings] = useState({});
  const [loadingSlots, setLoadingSlots] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [ism, setIsm] = useState("");
  const [tel, setTel] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [toast, setToast] = useState({ show: false, text: "" });

  const loadBookings = useCallback((date) => {
    setLoadingSlots(true);
    const key = "booking:" + dateKey(date);
    try {
      const result = localStorage.getItem(key);
      setBookings(result ? JSON.parse(result) : {});
    } catch (e) {
      setBookings({});
    }
    setLoadingSlots(false);
  }, []);

  useEffect(() => {
    loadBookings(selectedDate);
  }, [selectedDate, loadBookings]);

  useEffect(() => {
    if (!toast.show) return;
    const t = setTimeout(() => setToast({ show: false, text: "" }), 3800);
    return () => clearTimeout(t);
  }, [toast.show]);

  function openModal(timeStr) {
    setSelectedTime(timeStr);
    setIsm("");
    setTel("");
    setErrMsg("");
    setModalClosing(false);
    setModalOpen(true);
  }

  function closeModal() {
    setModalClosing(true);
    setTimeout(() => {
      setModalOpen(false);
      setModalClosing(false);
      setSelectedTime(null);
    }, 160);
  }

  async function handleConfirm() {
    const ismVal = ism.trim();
    const telVal = tel.trim();

    if (!ismVal || !telVal) {
      setErrMsg("Iltimos, ism va telefon raqamingizni kiriting.");
      return;
    }

    setSubmitting(true);
    setErrMsg("");
    const key = "booking:" + dateKey(selectedDate);

    try {
      let latest = {};
      try {
        const result = localStorage.getItem(key);
        latest = result ? JSON.parse(result) : {};
      } catch (e) {
        latest = {};
      }

      if (latest[selectedTime]) {
        setErrMsg("Kechirasiz, bu vaqt hozirgina band qilindi. Boshqa vaqtni tanlang.");
        setBookings(latest);
        setSubmitting(false);
        return;
      }

      latest[selectedTime] = { ism: ismVal, tel: telVal, ts: Date.now() };

      localStorage.setItem(key, JSON.stringify(latest));
      setBookings(latest);

      const sana = `${selectedDate.getDate()}-${MON_FULL[selectedDate.getMonth()]}`;
      const notifText = `✂️ <b>Yangi navbat!</b>\n\n👤 Mijoz: <b>${ismVal}</b>\n📞 Telefon: ${telVal}\n📅 Sana: ${sana}\n🕒 Vaqt: ${selectedTime}`;

      await sendTelegramNotification(notifText);

      closeModal();
      setToast({
        show: true,
        text: `Muvaffaqiyatli band qilindi! ${selectedDate.getDate()} ${MON_FULL[selectedDate.getMonth()]}, soat ${selectedTime}`,
      });
    } catch (e) {
      setErrMsg("Xatolik yuz berdi. Qaytadan urinib ko'ring.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ position: "relative", background: COLOR.charcoal, color: COLOR.cream, minHeight: "100vh", fontFamily: "'Manrope', sans-serif", WebkitFontSmoothing: "antialiased", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800;900&family=Manrope:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');

        .bn-scroll::-webkit-scrollbar{ height:0px; }
        .bn-slot:hover.bn-available{ transform:translateY(-3px); box-shadow: 0 10px 24px rgba(76,146,113,0.22); }
        .bn-date:hover.bn-date-inactive{ border-color: rgba(201,162,39,0.5) !important; transform: translateY(-2px); }
        .bn-btn-primary:hover:not(:disabled){ filter:brightness(1.08); transform: translateY(-1px); box-shadow: 0 10px 26px rgba(201,162,39,0.32); }
        .bn-btn-primary:active:not(:disabled){ transform: translateY(0); }
        .bn-btn-ghost:hover{ border-color: rgba(243,237,227,0.4) !important; color: ${COLOR.cream} !important; }
        .bn-input:focus{ border-color: ${COLOR.gold} !important; box-shadow: 0 0 0 3px rgba(201,162,39,0.16); }

        @keyframes bnFadeUp { from { opacity:0; transform: translateY(10px);} to { opacity:1; transform: translateY(0);} }
        @keyframes bnScaleIn { from { opacity:0; transform: scale(0.94) translateY(8px);} to { opacity:1; transform: scale(1) translateY(0);} }
        @keyframes bnScaleOut { from { opacity:1; transform: scale(1) translateY(0);} to { opacity:0; transform: scale(0.96) translateY(6px);} }
        @keyframes bnGlow { 0%,100% { opacity:0.55; } 50% { opacity:1; } }

        .bn-appear { animation: bnFadeUp 0.5s ease both; }
        .bn-modal-in { animation: bnScaleIn 0.22s cubic-bezier(.2,.9,.3,1) both; }
        .bn-modal-out { animation: bnScaleOut 0.16s ease both; }
      `}</style>

      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: 900, height: 500, background: "radial-gradient(ellipse at center, rgba(201,162,39,0.14), transparent 70%)", animation: "bnGlow 6s ease-in-out infinite" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.5, backgroundImage: `repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 3px)` }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", padding: "34px 18px 90px" }}>
        <div className="bn-appear" style={{ textAlign: "center", paddingBottom: 26, marginBottom: 30 }}>
          <div style={{ width: 68, height: 68, borderRadius: "50%", margin: "0 auto 16px", border: `1.5px solid ${COLOR.gold}`, display: "flex", alignItems: "center", justifyContent: "center", background: `radial-gradient(circle at 35% 30%, ${COLOR.charcoal3}, ${COLOR.charcoal2})`, boxShadow: "0 0 0 6px rgba(201,162,39,0.08), 0 12px 30px rgba(0,0,0,0.4)" }}>
            <ScissorsMark />
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 34, letterSpacing: "0.01em", lineHeight: 1.05, color: COLOR.cream, margin: 0 }}>
            Javohir Barber
          </h1>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 12 }}>
            <span style={{ width: 22, height: 1, background: "rgba(201,162,39,0.5)" }} />
            <p style={{ fontSize: 11.5, color: COLOR.gold, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, margin: 0 }}>
              Barbershop &middot; Jizzax
            </p>
            <span style={{ width: 22, height: 1, background: "rgba(201,162,39,0.5)" }} />
          </div>
        </div>

        <div className="bn-appear" style={{ animationDelay: "0.05s" }}>
          <SectionLabel num="01" title="Sanani tanlang" />
          <div className="bn-scroll" style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 6, marginBottom: 34 }}>
            {dates.map((d) => {
              const active = dateKey(d) === dateKey(selectedDate);
              return (
                <div
                  key={dateKey(d)}
                  onClick={() => setSelectedDate(d)}
                  className={`bn-date ${!active ? "bn-date-inactive" : ""}`}
                  style={{
                    flexShrink: 0,
                    width: 66,
                    padding: "13px 0 11px",
                    background: active ? `linear-gradient(160deg, ${COLOR.goldBright}, ${COLOR.gold})` : COLOR.charcoal2,
                    border: `1px solid ${active ? COLOR.gold : "rgba(243,237,227,0.09)"}`,
                    borderRadius: 12,
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.18s ease",
                    boxShadow: active ? "0 8px 22px rgba(201,162,39,0.35)" : "none",
                  }}
                >
                  <div style={{ fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.07em", color: active ? "#2c2205" : COLOR.creamDim, marginBottom: 4, fontWeight: 700 }}>
                    {DOW[d.getDay()]}
                  </div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 800, color: active ? "#1C1B1A" : COLOR.cream }}>
                    {d.getDate()}
                  </div>
                  <div style={{ fontSize: 10, color: active ? "#2c2205" : COLOR.creamDim, marginTop: 2, fontWeight: 600 }}>
                    {MON[d.getMonth()]}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bn-appear" style={{ animationDelay: "0.1s" }}>
          <SectionLabel num="02" title="Vaqtni tanlang" />
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Playfair Display', serif", fontSize: 17, color: COLOR.goldBright, marginBottom: 18 }}>
            {selectedDate.getDate()} {MON_FULL[selectedDate.getMonth()]}
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 12.5, color: COLOR.creamDim, fontWeight: 600 }}>
              &middot; {DOW[selectedDate.getDay()]}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(92px, 1fr))", gap: 12 }}>
            {SLOT_HOURS.map((h) => {
              const timeStr = pad(h) + ":00";
              const booked = !loadingSlots && bookings[timeStr];
              const isLoading = loadingSlots;
              return (
                <div
                  key={timeStr}
                  className={`bn-slot ${!isLoading && !booked ? "bn-available" : ""}`}
                  onClick={() => !isLoading && !booked && openModal(timeStr)}
                  style={{
                    position: "relative",
                    borderRadius: 12,
                    padding: "17px 6px 13px",
                    textAlign: "center",
                    cursor: isLoading ? "default" : booked ? "not-allowed" : "pointer",
                    border: `1px solid ${isLoading ? "rgba(243,237,227,0.07)" : booked ? COLOR.redBorder : COLOR.greenBorder}`,
                    background: isLoading ? COLOR.charcoal3 : booked ? COLOR.redBg : COLOR.greenBg,
                    overflow: "hidden",
                    transition: "transform 0.15s ease, box-shadow 0.15s ease",
                  }}
                >
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2.5, background: isLoading ? "transparent" : booked ? COLOR.red : COLOR.green }} />
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 16.5, fontWeight: 700, color: booked ? "#e6bab3" : COLOR.cream, letterSpacing: "-0.02em" }}>
                    {timeStr}
                  </div>
                  <div style={{ fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.09em", marginTop: 6, fontWeight: 700, color: isLoading ? COLOR.creamDim : booked ? COLOR.red : COLOR.green }}>
                    {isLoading ? "···" : booked ? "Band" : "Bo'sh"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bn-appear" style={{ animationDelay: "0.15s", display: "flex", gap: 22, marginTop: 26, paddingTop: 20, borderTop: "1px solid rgba(243,237,227,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: COLOR.creamDim }}>
            <span style={{ width: 9, height: 9, borderRadius: 3, background: COLOR.green, display: "inline-block", boxShadow: `0 0 8px ${COLOR.green}` }} />
            Bo'sh vaqt
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: COLOR.creamDim }}>
            <span style={{ width: 9, height: 9, borderRadius: 3, background: COLOR.red, display: "inline-block", boxShadow: `0 0 8px ${COLOR.red}` }} />
            Band qilingan
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 46 }}>
          <div style={{ width: 34, height: 1, background: "rgba(201,162,39,0.35)", margin: "0 auto 14px" }} />
          <div style={{ fontSize: 11, color: "rgba(243,237,227,0.32)", letterSpacing: "0.06em" }}>
            Javohir Barber &middot; Jizzax shahri
          </div>
        </div>
      </div>

      {modalOpen && (
        <div
          onClick={(e) => e.target === e.currentTarget && closeModal()}
          style={{ position: "fixed", inset: 0, background: "rgba(8,7,6,0.78)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 50 }}
        >
          <div className={modalClosing ? "bn-modal-out" : "bn-modal-in"} style={{ width: "100%", maxWidth: 380, background: `linear-gradient(165deg, ${COLOR.charcoal2}, ${COLOR.charcoal3})`, border: "1px solid rgba(201,162,39,0.32)", borderRadius: 18, padding: "30px 26px 24px", position: "relative", boxShadow: "0 30px 70px rgba(0,0,0,0.55)" }}>
            <div style={{ width: 46, height: 46, borderRadius: "50%", background: COLOR.goldSoft, border: `1px solid ${COLOR.gold}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <ScissorsMark size={20} />
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: COLOR.cream, marginBottom: 4 }}>
              Navbatni tasdiqlash
            </h3>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: COLOR.goldBright, marginBottom: 24 }}>
              {selectedDate.getDate()} {MON_FULL[selectedDate.getMonth()]} — {selectedTime}
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: COLOR.creamDim, marginBottom: 7, fontWeight: 700 }}>
                Ismingiz
              </label>
              <input
                type="text"
                value={ism}
                onChange={(e) => setIsm(e.target.value)}
                placeholder="Masalan: Aziz"
                className="bn-input"
                style={{ width: "100%", background: COLOR.charcoal, border: "1px solid rgba(243,237,227,0.13)", borderRadius: 9, padding: "12px 13px", color: COLOR.cream, fontFamily: "'Manrope', sans-serif", fontSize: 14.5, outline: "none", boxSizing: "border-box", transition: "border-color 0.15s ease, box-shadow 0.15s ease" }}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: COLOR.creamDim, marginBottom: 7, fontWeight: 700 }}>
                Telefon raqamingiz
              </label>
              <input
                type="tel"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                placeholder="+998 90 123 45 67"
                className="bn-input"
                style={{ width: "100%", background: COLOR.charcoal, border: "1px solid rgba(243,237,227,0.13)", borderRadius: 9, padding: "12px 13px", color: COLOR.cream, fontFamily: "'Manrope', sans-serif", fontSize: 14.5, outline: "none", boxSizing: "border-box", transition: "border-color 0.15s ease, box-shadow 0.15s ease" }}
              />
            </div>

            {errMsg && (
              <div style={{ background: COLOR.redBg, border: `1px solid ${COLOR.redBorder}`, borderRadius: 8, padding: "9px 12px", color: "#e6b0a8", fontSize: 12.5, marginTop: 8 }}>
                {errMsg}
              </div>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button
                className="bn-btn-ghost"
                onClick={closeModal}
                style={{ flex: 1, padding: "13px 0", borderRadius: 9, border: "1px solid rgba(243,237,227,0.18)", background: "transparent", color: COLOR.creamDim, fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all 0.15s ease" }}
              >
                Bekor qilish
              </button>
              <button
                className="bn-btn-primary"
                onClick={handleConfirm}
                disabled={submitting}
                style={{ flex: 1.3, padding: "13px 0", borderRadius: 9, border: "none", background: `linear-gradient(160deg, ${COLOR.goldBright}, ${COLOR.gold})`, color: "#241c04", fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: 14, cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.55 : 1, transition: "all 0.15s ease", boxShadow: "0 6px 18px rgba(201,162,39,0.25)" }}
              >
                {submitting ? "Yuborilmoqda..." : "Tasdiqlash"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        style={{
          position: "fixed",
          bottom: 26,
          left: "50%",
          transform: `translateX(-50%) translateY(${toast.show ? 0 : 24}px)`,
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: `linear-gradient(135deg, ${COLOR.green}, #3a7a5c)`,
          color: "#fff",
          padding: "14px 22px",
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 700,
          opacity: toast.show ? 1 : 0,
          pointerEvents: "none",
          transition: "all 0.28s cubic-bezier(.2,.9,.3,1)",
          zIndex: 60,
          boxShadow: "0 14px 36px rgba(0,0,0,0.45)",
          textAlign: "center",
          maxWidth: "90vw",
        }}
      >
        <span style={{ fontSize: 17 }}>✂️</span>
        {toast.text}
      </div>
    </div>
  );
}

function SectionLabel({ num, title }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
      <span style={{ fontFamily: "'Space Mono', monospace", color: "#241c04", background: COLOR.gold, borderRadius: 7, width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>{num}</span>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: COLOR.cream, margin: 0 }}>{title}</h2>
      <span style={{ flex: 1, height: 1, background: "rgba(243,237,227,0.08)" }} />
    </div>
  );
}

function ScissorsMark({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="6" cy="6" r="3" stroke="#C9A227" strokeWidth="1.6" />
      <circle cx="6" cy="18" r="3" stroke="#C9A227" strokeWidth="1.6" />
      <line x1="8.2" y1="8.2" x2="20" y2="20" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="8.2" y1="15.8" x2="20" y2="4" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}