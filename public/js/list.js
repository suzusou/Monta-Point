import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { doc, setDoc, getFirestore, collection, onSnapshot, getDocs } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

// MontaPointのFirebaseの情報
const firebaseConfig = {
    apiKey: "AIzaSyD_79sImJA0dXW57NOBc_g0YivQUFd5Z9s",
    authDomain: "montapoint-7b9dd.firebaseapp.com",
    projectId: "montapoint-7b9dd",
    storageBucket: "montapoint-7b9dd.appspot.com",
    messagingSenderId: "586924704219",
    appId: "1:586924704219:web:790e06214656936c2427fe"
  };

  // Firebaseの初期化
const app = initializeApp(firebaseConfig);

// Firestoreを取得
const db = getFirestore(app);

// 全ての情報を取得
// window.onload = async function () {
//   const shot = await getDocs(collection(db, "決済先生sample"));
//   shot.forEach((doc) => {
//     console.log(doc.id, "=>", doc.data().pay);
//   })
// }