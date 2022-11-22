import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { doc, setDoc, getFirestore, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

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

// コレクションの取得
// const colRef = collection(db, "決済先生");
// console.log(colRef);

//ドキュメントの取得
// const docRef = doc(colRef, "trident");
// console.log(docRef);

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
      await setDoc(doc(db, "決済先生", store.value), {
        address: address.value,
        pay: pay
      });
      console.log("登録完了しました。");
    } catch (e) {
      console.log(e);
    }
    // payStrとpayを初期化する
    payStr = "";
    pay = "";
    // リアルタイムの更新を取得する
    const unsub = onSnapshot(doc(db, "決済先生", store.value), (doc) => {
      console.log("Current data: ", doc.data());
      //　GoogleMapのPINを立てる処理




      // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
    });
  }
});

