import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

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

var storeData = [];
var addressData = [];
var payData = [];
var count = -1;

var localSerch_store = [];
var localserch_pay = [];

// 決済先生 住所登録の全ての情報を取得
window.onload = async function () {
  const shot = await getDocs(collection(db, "決済先生 住所登録"));
  shot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data().pay, doc.data().address);
    storeData.push(doc.id);
    addressData.push(doc.data().address);
    payData.push(doc.data().pay);
  })

  const shot2 = await getDocs(collection(db, "決済先生"));
  shot2.forEach((doc1) => {
    
    for (let key in doc1.data()) {

      localSerch_store.push(key);
      localserch_pay.push(doc1.data()[key]);

    }

  })

  console.log("storeData: " + storeData);
  console.log("addressData: " + addressData);
  console.log("payData: " + payData);
  console.log("addressData.length: " + addressData.length);

  // setInterval(function () {
  //   showAddress();
  //   if(window.globalData.count>=addressData.length-1){
  //     clearInterval();
  //   }
  //   window.globalData.count++;
  //   console.log(count);

  // }, 1000)

  // var tid = setInterval(function () {
  window.globalData.count++;
  showAddress();
  showAddress2();
  console.log(window.globalData.count);
  //   if (window.globalData.count >= addressData.length - 1) {
  //     clearInterval(tid);
  //   }
  // }, 1000)

  // setPin();
}

// document.getElementById("sample").addEventListener("click", function () {


//   for (let a = 0; a < addressData.length; a++) {
//     setTimeout(function () {
//       console.log( window.globalData.count);
//       showAddress();
//       window.globalData.count++;
//     }, 1000)
//   }
//   console.log("a");
// });


// console.log("addressData.length: " + addressData.length);


window.globalData = {};
window.globalData.addressData = addressData;
window.globalData.payData = payData;
window.globalData.count = count;

window.globalData.localSerch_store = localSerch_store;
window.globalData.localSerch_pay = localserch_pay;
