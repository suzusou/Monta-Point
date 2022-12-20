/*------------------------------------------------------------------------------------------------- */
/*- initmap...mapの初期設定＆初期表示に必須 -*/
function initMap() {

  /*- GPS機能を実装していないので数値で座標を設定しています。  -*/
  latLng = new google.maps.LatLng(35.17263, 136.88602);

  var options = {
    zoom: 8,       //地図の縮尺値を設定する
    center: latLng   //地図の中心座標を設定する
  };

  map = new google.maps.Map(document.getElementById('map'), options);

}

/*------------------------------------------------------------------------------------------------- */

//住所を表示する
function showAddress() {
  if (window.globalData.count == 0) {
    console.time("count")
  }

  var url = "https://map.yahooapis.jp/geocode/V1/geoCoderV1/localSearch?appid=dj00aiZpPVdnQVloSFUxTEdUaSZzPWNvbnN1bWVyc2VjcmV0Jng9ZDM-&query=" + encodeURI(window.globalData.addressData[window.globalData.count]) + "&output=json&callback=showResult";
  callJSONP(url);


}

//JSONPを実行する関数
function callJSONP(url) {

  var target = document.createElement('script');
  target.charset = 'utf-8';
  target.src = url;
  document.body.appendChild(target);

}

//JSONPの結果として実行される関数
function showResult(result) {

  if (result.ResultInfo.Count > 0) {
    console.log(result)

    var splitLatLng = result.Feature[0].Geometry.Coordinates.split(',');
    var realLat = splitLatLng[1] + "," + splitLatLng[0];

    // alert(result.ResultInfo.Count + "件の結果が見つかりました。\n" +
    //   result.Feature[0].Name + "の座標は" + realLat + "です。" + splitLatLng[2]);
    // console.log(window.globalData.payData[window.globalData.count]);
    var paySplit = window.globalData.payData[window.globalData.count].split(',');
    console.log(paySplit);
    var content = "";

    // 画像のパスを変数に代入する
    for (var i = 0; i < paySplit.length; i++) {
      switch (paySplit[i]) {
        case "LINE Pay":
          content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FLINE%20Pay.jpg?alt=media&token=0fda58e6-2632-43da-bf39-8592b1b976f0" width="50" height="50" alt="nothing" />'
          break;
        case "PayPay":
          content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FPayPay.jpeg?alt=media&token=d8206fc4-4923-4284-9c58-aa13d24599b8" width="50" height="45" alt="nothing" />'
          break;
        case "楽天 Pay":
          content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2F%E6%A5%BD%E5%A4%A9%20Pay.png?alt=media&token=2a875fe0-1436-4f87-a78e-c8b3b6204395" width="50" height="38" alt="nothing" />'
          break;
        case "Bank Pay":
          content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FBank%20Pay.jpg?alt=media&token=3565a03a-8c94-489f-a12c-117f6e235ec6" width="50" height="50" alt="nothing" />'
          break;
        case "楽天 Edy":
          content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2F%E6%A5%BD%E5%A4%A9%20Edy.png?alt=media&token=6459e4ae-5a70-4f95-a792-819b259b946b" width="45" height="45" alt="nothing" />'
          break;
        case "QUICPay":
          content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FQUICPay.png?alt=media&token=e9ec4be9-7092-4df7-b02e-326ded83dfda" width="40" height="40" alt="nothing" />'
          break;
        case "au Pay":
          content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2Fau%20Pay.png?alt=media&token=4490d2f1-58c0-4d86-8b5a-1f28a52051ec" width="40" height="40" alt="nothing" />'
          break;
        case "Origami Pay":
          content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FOrigami%20Pay.jpg?alt=media&token=fbcd0993-ef0a-45f8-a8c8-7c72ff11475f" width="50" height="50" alt="nothing" />'
          break;
        case "d 払い":
          content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2Fd%E6%89%95%E3%81%84.jpg?alt=media&token=c28033e3-8950-4225-a9ef-f49dcce9d536" width="38" height="38" alt="nothing" />'
          break;
        case "メルペイ":
          content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2F%E3%83%A1%E3%83%AB%E3%83%9A%E3%82%A4.jpeg?alt=media&token=56ecc3cc-cfc1-4d34-a695-6266cb547323" width="50" height="45" alt="nothing" />'
          break;
        case "ゆうちょPay":
          content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2F%E3%82%86%E3%81%86%E3%81%A1%E3%82%87Pay.jpeg?alt=media&token=50193d17-2eb8-419a-ad12-dd8de98abd56" width="82" height="72" alt="nothing" />'
          break;
        case "QUOカードPay":
          content += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FQUO%E3%82%AB%E3%83%BC%E3%83%89Pay.png?alt=media&token=22732de3-19ec-4c0b-be12-82a8647975f6" width="47" height="47" alt="nothing" />'
          break;
        default:
          console.log("画像が見つかりませんでした");
          break;
      }
    }
    console.log("content: " + content);
    var titleInfo = result.Feature[0].Name + "　：　" + result.Feature[0].Property.Address;


    YahooLatLng = new google.maps.LatLng(Number(splitLatLng[1]), Number(splitLatLng[0]));

    var marker = new google.maps.Marker({
      map: map,           //表示している地図を指定する
      position: YahooLatLng, //マーカーの表示位置を設定する
      title: titleInfo,
    });

    var infoWindow = new google.maps.InfoWindow({

      content: content

    });

    marker.addListener('mouseover', function (e) {

      // console.log(marker[int].title);
      infoWindow.open(map, marker);

    });

    marker.addListener('mouseout', function (e) {

      // console.log(marker[int].title);
      infoWindow.close(map, marker);

    });


  } else {

    alert("検索結果が見つかりませんでした。");

  }


  if (window.globalData.count < window.globalData.addressData.length - 1) {
    window.globalData.count++;
    showAddress();
    console.log(window.globalData.count);
  } else {
    console.timeEnd("count");
  }
}

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 以下ローカルサーチ

var count_localserch = 0;

var miss_localserch = [];

//住所を表示する
function showAddress2() {

  var query2 = window.globalData.localSerch_store[count_localserch];

 

  var url2 = "https://map.yahooapis.jp/search/local/V1/localSearch?appid=dj00aiZpPVdnQVloSFUxTEdUaSZzPWNvbnN1bWVyc2VjcmV0Jng9ZDM-&query=" + encodeURI(query2) + "&output=json&callback=showResult2&results=1&ac=23";
  callJSONP2(url2);

}

//JSONPを実行する関数
function callJSONP2(url2) {

  var target2 = document.createElement('script');
  target2.charset = 'utf-8';
  target2.src = url2;
  document.body.appendChild(target2);

}

//JSONPの結果として実行される関数
function showResult2(result2) {

  if (result2.ResultInfo.Count > 0) {

    var titleInfo2 = result2.Feature[0].Name + "　：　" + result2.Feature[0].Property.Address;

    var splitLatLng2 = result2.Feature[0].Geometry.Coordinates.split(',');

    LatLang2 = new google.maps.LatLng(Number(splitLatLng2[1]), Number(splitLatLng2[0]));

    var marker2 = new google.maps.Marker({
      map: map,           //表示している地図を指定する
      position: LatLang2, //マーカーの表示位置を設定する
      title: titleInfo2,
    });

    var paySplit2 = window.globalData.localSerch_pay[count_localserch].split(',');
   
    var content2 = "";

    for (var i = 0; i < paySplit2.length; i++) {
      switch (paySplit2[i]) {
        case "LINE Pay":
          content2 += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FLINE%20Pay.jpg?alt=media&token=0fda58e6-2632-43da-bf39-8592b1b976f0" width="50" height="50" alt="nothing" />'
          break;
        case "PayPay":
          content2 += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FPayPay.jpeg?alt=media&token=d8206fc4-4923-4284-9c58-aa13d24599b8" width="50" height="45" alt="nothing" />'
          break;
        case "楽天 Pay":
          content2 += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2F%E6%A5%BD%E5%A4%A9%20Pay.png?alt=media&token=2a875fe0-1436-4f87-a78e-c8b3b6204395" width="50" height="38" alt="nothing" />'
          break;
        case "Bank Pay":
          content2 += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FBank%20Pay.jpg?alt=media&token=3565a03a-8c94-489f-a12c-117f6e235ec6" width="50" height="50" alt="nothing" />'
          break;
        case "楽天 Edy":
          content2 += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2F%E6%A5%BD%E5%A4%A9%20Edy.png?alt=media&token=6459e4ae-5a70-4f95-a792-819b259b946b" width="45" height="45" alt="nothing" />'
          break;
        case "QUICPay":
          content2 += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FQUICPay.png?alt=media&token=e9ec4be9-7092-4df7-b02e-326ded83dfda" width="40" height="40" alt="nothing" />'
          break;
        case "au Pay":
          content2 += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2Fau%20Pay.png?alt=media&token=4490d2f1-58c0-4d86-8b5a-1f28a52051ec" width="40" height="40" alt="nothing" />'
          break;
        case "Origami Pay":
          content2 += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FOrigami%20Pay.jpg?alt=media&token=fbcd0993-ef0a-45f8-a8c8-7c72ff11475f" width="50" height="50" alt="nothing" />'
          break;
        case "d 払い":
          content2 += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2Fd%E6%89%95%E3%81%84.jpg?alt=media&token=c28033e3-8950-4225-a9ef-f49dcce9d536" width="38" height="38" alt="nothing" />'
          break;
        case "メルペイ":
          content2 += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2F%E3%83%A1%E3%83%AB%E3%83%9A%E3%82%A4.jpeg?alt=media&token=56ecc3cc-cfc1-4d34-a695-6266cb547323" width="50" height="45" alt="nothing" />'
          break;
        case "ゆうちょPay":
          content2 += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2F%E3%82%86%E3%81%86%E3%81%A1%E3%82%87Pay.jpeg?alt=media&token=50193d17-2eb8-419a-ad12-dd8de98abd56" width="82" height="72" alt="nothing" />'
          break;
        case "QUOカードPay":
          content2 += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FQUO%E3%82%AB%E3%83%BC%E3%83%89Pay.png?alt=media&token=22732de3-19ec-4c0b-be12-82a8647975f6" width="47" height="47" alt="nothing" />'
          break;
        default:
          console.log("画像が見つかりませんでした");
          break;
      }
    }

    var infoWindow2 = new google.maps.InfoWindow({

      content: content2

    });

    marker2.addListener('mouseover', function (e) {

      // console.log(marker[int].title);
      infoWindow2.open(map, marker2);

    });

    marker2.addListener('mouseout', function (e) {

      // console.log(marker[int].title);
      infoWindow2.close(map, marker2)

    });

  } else {

    miss_localserch.push(window.globalData.localSerch_store[count_localserch]);

  }

  // if (count_localserch < window.globalData.localSerch_store.length - 1) {
    if (count_localserch < 1000) {

    count_localserch++;

    showAddress2();

  } else {

    console.log("検索に引っかからなかったのは　:　" + miss_localserch)

  }

}