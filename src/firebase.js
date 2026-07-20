import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// Firebase konsolidan nusxalangan sening shaxsiy ma'lumotlaring
const firebaseConfig = {
  apiKey: "AIzaSyB6-Zh1nGwb8DxUfcxTPIzrXYmWin7RIDs",
  authDomain: "javokhirbarber-2fcc7.firebaseapp.com",
  projectId: "javokhirbarber-2fcc7",
  storageBucket: "javokhirbarber-2fcc7.firebasestorage.app",
  messagingSenderId: "258119349743",
  appId: "1:258119349743:web:1d469bb8b12d98b43d771a"
};

// Firebase-ni ishga tushiramiz
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// Brauzerdan xabarnoma yuborish uchun ruxsat so'raydigan funksiya
export const requestForToken = () => {
  // DIQQAT: Pastdagi 'YOUR_FAV_KEY_FROM_FCM' o'rniga Firebase konsolidan nusxalagan uzun VAPID kalitingni qo'yasan!
  return getToken(messaging, { vapidKey: 'BITAmz89xTaw3zjzCjyGtiova6Odjppc1gF8mNnEGFmltPTamZwTeVLZ2FpMyLYRX84SCjKVIA06UhitVDNyjOQ' })
    .then((currentToken) => {
      if (currentToken) {
        console.log("Token olindi:", currentToken);
        // Tokenni backend serverga saqlash uchun yuboramiz
        fetch('http://localhost:5000/api/save-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: currentToken })
        });
      } else {
        console.log('Bildirishnomaga ruxsat berilmadi yoki token olinmadi.');
      }
    })
    .catch((err) => console.log('Token olishda xato:', err));
};