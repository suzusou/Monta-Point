import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, collection, getDocs, getDoc, doc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

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

let storeData = [];
let addressData = [];
let payData = [];
let count = 0;

let localSearch_store = [];
let localSearch_pay = [];

// 決済先生 住所登録の全ての情報を取得
async function ReadFirebase() {
  storeData = [];
  addressData = [];
  payData = [];
  count = 0;

  localSearch_store = [];
  localSearch_pay = [];
  let area = window.globalData.address;
  const shot = await getDocs(collection(db, "決済先生 住所登録"));
  shot.forEach((doc1) => {
    if (doc1.data().address.indexOf(area) !== -1 && (area !== "名古屋市" || doc1.data().address.indexOf("区") === -1)) {
      console.log(doc1.id, "=>", doc1.data().pay, doc1.data().address);
      storeData.push(doc1.id);
      addressData.push(doc1.data().address);
      payData.push(doc1.data().pay);
    }
  })

  const shot2 = await getDoc(doc(db, "決済先生", area));

  for (let key in shot2.data()) {
    localSearch_store.push(key);
    localSearch_pay.push(shot2.data()[key]);

  }

  console.log("storeData: " + storeData);
  console.log("addressData: " + addressData);
  console.log("payData: " + payData);
  console.log("addressData.length: " + addressData.length);

  window.globalData.addressData = addressData;
  window.globalData.payData = payData;
  window.globalData.count = count;

  window.globalData.localSearch_count = count;
  window.globalData.localSearch_store = localSearch_store;
  window.globalData.localSearch_pay = localSearch_pay;

 
  if (window.globalData.addressData.length > 0) {
    showAddress();
  }
  showAddress_localSearch();
  console.log(window.globalData.count);
  
}

window.globalData = {};
window.globalData.address = "";
window.globalData.addressData = addressData;
window.globalData.payData = payData;
window.globalData.count = count;

window.globalData.localSearch_count = count;
window.globalData.localSearch_store = localSearch_store;
window.globalData.localSearch_pay = localSearch_pay;

window.globalData.ReadFirebase = ReadFirebase;
