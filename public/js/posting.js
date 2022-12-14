import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { doc,getFirestore,updateDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

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
var str = "";
var str1 = "";
var str2 = "";
var img = [];
var content = "";

// 送信ボタンが押された処理
document.getElementById("send").addEventListener("click", async function () {

  // i番目のチェックボックスがチェックされているかを判定
  for (var i = 0; i < settlement.length; i++) {
    if (settlement[i].checked) {
      payStr += settlement[i].value + ",";
      img.push(settlement[i].value);
    }
  }

  // 何が押されたかをコンソールに出す
  console.log(img);

  // 画像のパスを変数に代入する
  for (var i = 0; i < img.length; i++) {
    switch (img[i]) {
      case "LINE Pay":
        window.global.content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FLINE%20Pay.jpg?alt=media&token=0fda58e6-2632-43da-bf39-8592b1b976f0" width="50" height="50" alt="nothing" />'
        break;
      case "PayPay":
        window.global.content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FPayPay.jpeg?alt=media&token=d8206fc4-4923-4284-9c58-aa13d24599b8" width="50" height="45" alt="nothing" />'
        break;
      case "楽天 Pay":
        window.global.content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2F%E6%A5%BD%E5%A4%A9%20Pay.png?alt=media&token=2a875fe0-1436-4f87-a78e-c8b3b6204395" width="50" height="38" alt="nothing" />'
        break;
      case "Bank Pay":
        window.global.content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FBank%20Pay.jpg?alt=media&token=3565a03a-8c94-489f-a12c-117f6e235ec6" width="50" height="50" alt="nothing" />'
        break;
      case "楽天 Edy":
        window.global.content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2F%E6%A5%BD%E5%A4%A9%20Edy.png?alt=media&token=6459e4ae-5a70-4f95-a792-819b259b946b" width="45" height="45" alt="nothing" />'
        break;
      case "QUICPay":
        window.global.content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FQUICPay.png?alt=media&token=e9ec4be9-7092-4df7-b02e-326ded83dfda" width="40" height="40" alt="nothing" />'
        break;
      case "au Pay":
        window.global.content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2Fau%20Pay.png?alt=media&token=4490d2f1-58c0-4d86-8b5a-1f28a52051ec" width="40" height="40" alt="nothing" />'
        break;
      case "Origami Pay":
        window.global.content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FOrigami%20Pay.jpg?alt=media&token=fbcd0993-ef0a-45f8-a8c8-7c72ff11475f" width="50" height="50" alt="nothing" />'
        break;
      case "d 払い":
        window.global.content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2Fd%E6%89%95%E3%81%84.jpg?alt=media&token=c28033e3-8950-4225-a9ef-f49dcce9d536" width="38" height="38" alt="nothing" />'
        break;
      case "メルペイ":
        window.global.content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2F%E3%83%A1%E3%83%AB%E3%83%9A%E3%82%A4.jpeg?alt=media&token=56ecc3cc-cfc1-4d34-a695-6266cb547323" width="50" height="45" alt="nothing" />'
        break;
      case "ゆうちょPay":
        window.global.content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2F%E3%82%86%E3%81%86%E3%81%A1%E3%82%87Pay.jpeg?alt=media&token=50193d17-2eb8-419a-ad12-dd8de98abd56" width="82" height="72" alt="nothing" />'
        break;
      case "QUOカードPay":
        window.global.content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FQUO%E3%82%AB%E3%83%BC%E3%83%89Pay.png?alt=media&token=22732de3-19ec-4c0b-be12-82a8647975f6" width="47" height="47" alt="nothing" />'
        break;
      default:
        console.log("画像が見つかりませんでした");
        break;
    }
  }

  // 最後の一文字を消去
  pay = payStr.slice(0, -1);

  // 全項目を入力しているかを判定
  if (store.value != "" && address.value != "" && pay != "") {
    window.globalFunction.showAddress();
    // 正規表現の処理
    str = address.value.replace(/(.*[県郡])(.*[市町村]).*/, '$2');
    if (str == "名古屋市") {
      str1 = address.value.replace(/(.*[市町村])(.*区).*/, '$2');
      // 区があったら
      if (str1 != address.value) {
        str2 = str + str1;
      } else {
        str2 = str;
      }
    } else if (str == "名古屋市中村") {
      str2 = str + "区";
    } else {
      str2 = str;
    }
    console.log(str);
    console.log(str2);
    // 0.5秒処理を待つ
    setTimeout(function () {
      SetFirebase();
    }, 500)

  }
  // imgを初期化する
  img = [];

  async function SetFirebase() {

    // 検索結果が見つかったら
    if (count > 0) {
      console.log("検索結果が見つかった" + count);
      // Firestoreに書き込む
      try {
        await updateDoc(doc(db, "決済先生sample", str2), {
          [store.value]: pay
        });
        console.log("登録完了しました。");
        alert("登録完了しました。");
      } catch (e) {
        console.log(e);
      }


      // リアルタイムの更新を取得する
      // const unsub = onSnapshot(doc(db, "決済先生sample", store.value), (doc) => {
      //   console.log("store data: ", doc.id);
      //   console.log("address data: ", doc.data().address);
      //   console.log("pay data: ", doc.data().pay);
      //　GoogleMapのPINを立てる処理



      // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
      // });
    } else {
      console.log("posting_pin.js:件数" + count);
    }
    // payStrとpayを初期化する
    payStr = "";
    pay = "";

    str="";
    str1="";
    str2="";
  }
});


// 全ての情報を取得
// window.onload = async function () {
//   const shot = await getDocs(collection(db, "決済先生"));
//   shot.forEach((doc) => {
//     console.log(doc.id, "=>", doc.data().pay);
//   })
// }

/*---------------------------------------------------------------------------------------------------------------------------------------------------*/
// グローバル変数の設定
window.global = {};
window.global.content = content;

