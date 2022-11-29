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

// 各要素の取得
var store = document.getElementById("storeform");
var address = document.getElementById("addressform");
// var category = document.getElementById("categoryform");
// var pay = document.getElementById("payform");
var settlement = document.getElementsByName("settlement");
var payStr = "";
var pay = "";


// 送信ボタンが押された処理
document.getElementById("send").addEventListener("click", async function () {
  // i番目のチェックボックスがチェックされているかを判定
  for (var i = 0; i < settlement.length; i++) {
    if (settlement[i].checked) {
      payStr += settlement[i].value + ","
    }
  }
  // 最後の一文字を消去
  pay = payStr.slice(0, -1);

  // 全項目を入力しているかを判定
  if (store.value != "" && address.value != "" && pay != "") {
    // Firestoreに書き込む
    try {
      await setDoc(doc(db, "決済先生sample", store.value), {
        address: address.value,
        pay: pay
      });
      console.log("登録完了しました。");
      alert("登録完了しました。");
    } catch (e) {
      console.log(e);
    }
    // payStrとpayを初期化する
    payStr = "";
    pay = "";
    // リアルタイムの更新を取得する
    const unsub = onSnapshot(doc(db, "決済先生sample", store.value), (doc) => {
      console.log("store data: ", doc.id);
      console.log("address data: ", doc.data().address);
      console.log("pay data: ", doc.data().pay);
      //　GoogleMapのPINを立てる処理




      // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
    });
  }
});

// 全ての情報を取得
window.onload = async function () {
  const shot = await getDocs(collection(db, "決済先生"));
  shot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data().pay);
  })
}

