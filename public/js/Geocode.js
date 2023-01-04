/*------------------------------------------------------------------------------------------------- */
/*- initmap...mapの初期設定＆初期表示に必須 -*/
function initMap() {

  /*- GPS機能を実装していないので数値で座標を設定しています。  -*/
  latLng = new google.maps.LatLng(35.17263, 136.88602);

  var options = {
    zoom: 8,       //地図の縮尺値を設定する
    center: latLng,  //地図の中心座標を設定する
    center: latLng, //地図の中心座標を設定する
    mapTypeControl: false, //falseでマップ名及び航空写真（マップタイプ）の非表示
    streetViewControl: false, //falseでストリートビュー非表示
    fullscreenControl: false, //falseで「」拡大表示を非表示
    zoomControl: false, //falseで＋とーのボタンを非表示
  };

  map = new google.maps.Map(document.getElementById('map'), options);

  geol(latLng);

  map.addListener('mouseup', function () {

    var tyuusin = map.getCenter();

    // var 中心座標 = tyuusin.lat() + "," + tyuusin.lng();

    // console.log(中心座標);

    Mapltlg = new google.maps.LatLng(tyuusin.lat(), tyuusin.lng());

    geol(Mapltlg);

  });

}

/*------------------------------------------------------------------------------------------------- */


function geol(position) {

  var lat = position.lat();
  var lon = position.lng();

  var url = "https://map.yahooapis.jp/geoapi/V1/reverseGeoCoder?lat=" + lat + "&lon=" + lon + "&appid=dj00aiZpPVdnQVloSFUxTEdUaSZzPWNvbnN1bWVyc2VjcmV0Jng9ZDM-&output=json&callback=geol_showResult";
  geol_callJSONP(url);
}

function geol_callJSONP(url) {

  var target = document.createElement('script');
  target.charset = 'utf-8';
  target.src = url;
  document.body.appendChild(target);

}

var str = "";
var str1 = "";
var str2 = "";

var ac_code = "";

function geol_showResult(result) {

  if (result.ResultInfo.Count > 0) {
    try {

      ac_code = result.Feature[0].Property.AddressElement[1].Code;

      var address = result.Feature[0].Property.AddressElement[1].Name;
      console.log(address);
      str = address.replace(/(.*郡)(.*[町村])/, '$2');
      console.log(str);
      if (window.globalData.address != str) {
        window.globalData.address = str;
        if (boola) {
          delete_marker();
          window.globalData.a();
        } else {
          boolb = false;
        }
      }
    } catch (e) {
      console.log("a" + e);
      setTimeout(function () {
        ac_code = result.Feature[0].Property.AddressElement[1].Code;

        var address = result.Feature[0].Property.AddressElement[1].Name;
        console.log(address);
        str = address.replace(/(.*郡)(.*[町村])/, '$2');
        console.log(str);
        if (window.globalData.address != str) {
          window.globalData.address = str;
          if (boola) {
            delete_marker();
            window.globalData.a();
          } else {
            boolb = false;
          }
        }
      }, 1000)
    }


  } else {

    console.log("検索結果が見つかりませんでした。");

  }
}


// -------------------------------------------------------------------------------------------------

//住所を表示する
function showAddress() {
  // if (window.globalData.count == 0) {
  //   console.time("count")
  // }
  var url = "https://map.yahooapis.jp/geocode/V1/geoCoderV1/localSearch?appid=dj00aiZpPVdnQVloSFUxTEdUaSZzPWNvbnN1bWVyc2VjcmV0Jng9ZDM-&query=" + encodeURI(window.globalData.addressData[window.globalData.count]) + "&ac=" + ac_code + "&output=json&callback=showResult";
  callJSONP(url);
}

//JSONPを実行する関数
function callJSONP(url) {

  var target = document.createElement('script');
  target.charset = 'utf-8';
  target.src = url;
  document.body.appendChild(target);

}
var marker = [];
var infoWindow = [];
//JSONPの結果として実行される関数
function showResult(result) {

  if (result.ResultInfo.Count > 0) {
    console.log(result)

    var splitLatLng = result.Feature[0].Geometry.Coordinates.split(',');
    // var realLat = splitLatLng[1] + "," + splitLatLng[0];

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

    marker[window.globalData.count] = new google.maps.Marker({
      map: map,           //表示している地図を指定する
      position: YahooLatLng, //マーカーの表示位置を設定する
      title: titleInfo,
    });
    infoWindow[window.globalData.count] = new google.maps.InfoWindow({
      content: content
    });
    for (let i = 0; i <= window.globalData.count; i++) {
      if (marker[i] != null) {

        marker[i].addListener('mouseover', function (e) {
          infoWindow[i].open(map, marker[i]);
        });

        marker[i].addListener('mouseout', function (e) {
          infoWindow[i].close(map, marker[i]);
        });
      }
    }

  } else {

    alert("検索結果が見つかりませんでした。");

  }


  if (window.globalData.count < window.globalData.addressData.length - 1) {
    window.globalData.count++;
    showAddress();
    console.log(window.globalData.count);
  } else {
    // console.timeEnd("count");
  }
}

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 以下localSearch

// var count_localSearch = 0;

var miss_localSearch = [];

var boola = true;

var boolb = true;

//住所を表示する
function showAddress_localSearch() {
  boola = false;
  var query_localSearch = window.globalData.localSearch_store[window.globalData.localSearch_count];
  var url_localSearch = "https://map.yahooapis.jp/search/local/V1/localSearch?appid=dj00aiZpPVdnQVloSFUxTEdUaSZzPWNvbnN1bWVyc2VjcmV0Jng9ZDM-&query=" + encodeURI(query_localSearch) + "&ac=" + ac_code + "&output=json&callback=showResult_localSearch&results=1";
  callJSONP_localSearch(url_localSearch);

}

//JSONPを実行する関数
function callJSONP_localSearch(url_localSearch) {

  var target_localSearch = document.createElement('script');
  target_localSearch.charset = 'utf-8';
  target_localSearch.src = url_localSearch;
  target_localSearch.id = 'pin';
  try {
    document.body.appendChild(target_localSearch);
  } catch (e) {
    console.log("CORBが発生しました。")
  }
  // scriptタグをたまりすぎるのを防ぐ
  if (window.globalData.localSearch_count % 100 == 0 && window.globalData.localSearch_count != 0) {
    console.log("削除します");
    for (let a = 0; a < 100; a++) {
      document.getElementById('pin').remove();
    }
  }

}
var marker_localSearch = [];
var infoWindow_localSearch = [];
//JSONPの結果として実行される関数
function showResult_localSearch(result) {

  if (result.ResultInfo.Count > 0) {

    var titleInfo_localSearch = result.Feature[0].Name + "　：　" + result.Feature[0].Property.Address;

    var splitLatLng_localSearch = result.Feature[0].Geometry.Coordinates.split(',');

    latLang_localSearch = new google.maps.LatLng(Number(splitLatLng_localSearch[1]), Number(splitLatLng_localSearch[0]));

    // var marker_localSearch = new google.maps.Marker({
    //   map: map,           //表示している地図を指定する
    //   position: latLang_localSearch, //マーカーの表示位置を設定する
    //   title: titleInfo_localSearch,
    // });
    marker_localSearch[window.globalData.localSearch_count] = new google.maps.Marker({
      map: map,           //表示している地図を指定する
      position: latLang_localSearch, //マーカーの表示位置を設定する
      title: titleInfo_localSearch,
    });

    var paySplit_localSearch = window.globalData.localSearch_pay[window.globalData.localSearch_count].split(',');

    var content_localSearch = "";

    for (var i = 0; i < paySplit_localSearch.length; i++) {
      switch (paySplit_localSearch[i]) {
        case "LINE Pay":
          content_localSearch += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FLINE%20Pay.jpg?alt=media&token=0fda58e6-2632-43da-bf39-8592b1b976f0" width="50" height="50" alt="nothing" />'
          break;
        case "PayPay":
          content_localSearch += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FPayPay.jpeg?alt=media&token=d8206fc4-4923-4284-9c58-aa13d24599b8" width="50" height="45" alt="nothing" />'
          break;
        case "楽天 Pay":
          content_localSearch += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2F%E6%A5%BD%E5%A4%A9%20Pay.png?alt=media&token=2a875fe0-1436-4f87-a78e-c8b3b6204395" width="50" height="38" alt="nothing" />'
          break;
        case "Bank Pay":
          content_localSearch += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FBank%20Pay.jpg?alt=media&token=3565a03a-8c94-489f-a12c-117f6e235ec6" width="50" height="50" alt="nothing" />'
          break;
        case "楽天 Edy":
          content_localSearch += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2F%E6%A5%BD%E5%A4%A9%20Edy.png?alt=media&token=6459e4ae-5a70-4f95-a792-819b259b946b" width="45" height="45" alt="nothing" />'
          break;
        case "QUICPay":
          content_localSearch += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FQUICPay.png?alt=media&token=e9ec4be9-7092-4df7-b02e-326ded83dfda" width="40" height="40" alt="nothing" />'
          break;
        case "au Pay":
          content_localSearch += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2Fau%20Pay.png?alt=media&token=4490d2f1-58c0-4d86-8b5a-1f28a52051ec" width="40" height="40" alt="nothing" />'
          break;
        case "Origami Pay":
          content_localSearch += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FOrigami%20Pay.jpg?alt=media&token=fbcd0993-ef0a-45f8-a8c8-7c72ff11475f" width="50" height="50" alt="nothing" />'
          break;
        case "d 払い":
          content_localSearch += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2Fd%E6%89%95%E3%81%84.jpg?alt=media&token=c28033e3-8950-4225-a9ef-f49dcce9d536" width="38" height="38" alt="nothing" />'
          break;
        case "メルペイ":
          content_localSearch += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2F%E3%83%A1%E3%83%AB%E3%83%9A%E3%82%A4.jpeg?alt=media&token=56ecc3cc-cfc1-4d34-a695-6266cb547323" width="50" height="45" alt="nothing" />'
          break;
        case "ゆうちょPay":
          content_localSearch += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2F%E3%82%86%E3%81%86%E3%81%A1%E3%82%87Pay.jpeg?alt=media&token=50193d17-2eb8-419a-ad12-dd8de98abd56" width="82" height="72" alt="nothing" />'
          break;
        case "QUOカードPay":
          content_localSearch += '<img src="https://firebasestorage.googleapis.com/v0/b/montapoint-7b9dd.appspot.com/o/MontaPoint%2FQUO%E3%82%AB%E3%83%BC%E3%83%89Pay.png?alt=media&token=22732de3-19ec-4c0b-be12-82a8647975f6" width="47" height="47" alt="nothing" />'
          break;
        default:
          console.log("画像が見つかりませんでした");
          break;
      }
    }
    infoWindow_localSearch[window.globalData.localSearch_count] = new google.maps.InfoWindow({
      content: content_localSearch
    });

    for (let i = 0; i <= window.globalData.localSearch_count; i++) {
      if (marker_localSearch[i] != null) {

        marker_localSearch[i].addListener('mouseover', function (e) {
          infoWindow_localSearch[i].open(map, marker_localSearch[i]);
        });

        marker_localSearch[i].addListener('mouseout', function (e) {
          infoWindow_localSearch[i].close(map, marker_localSearch[i]);
        });
      }
    }


  } else {

    miss_localSearch.push(window.globalData.localSearch_store[window.globalData.localSearch_count]);
    console.log(window.globalData.localSearch_store[window.globalData.localSearch_count] + " :" + window.globalData.localSearch_count);

  }

  // if (count_localSearch < window.globalData.localSearch_store.length - 1) {
  if (boolb) {
    if (window.globalData.localSearch_count < window.globalData.localSearch_store.length - 1) {
      window.globalData.localSearch_count++;

      showAddress_localSearch();


    } else {
      boola = true;
      console.log("検索に引っかからなかったのは　:　" + miss_localSearch)
    }
  } else {
    delete_marker()
    boolb = true;
    window.globalData.a();
  }

}

// 検索機能　↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function showAddressZoom() {

  var querySearch = document.getElementById('search-box').value;

  var urlSearch = "https://map.yahooapis.jp/search/local/V1/localSearch?appid=dj00aiZpPVdnQVloSFUxTEdUaSZzPWNvbnN1bWVyc2VjcmV0Jng9ZDM-&query=" + encodeURI(querySearch) + "&output=json&callback=execFitBounds&results=1&ac=" + ac_code;
  callJSONP_Search(urlSearch);

}

//JSONPを実行する関数
function callJSONP_Search(urlSearch) {

  var targetSearch = document.createElement('script');
  targetSearch.charset = 'utf-8';
  targetSearch.src = urlSearch;
  document.body.appendChild(targetSearch);

}

function execFitBounds(result) {
  // 取得件数が1件以上の場合
  if (result.ResultInfo.Count > 0) {
    alert("検索できました。");

    var splitLatLng_Search = result.Feature[0].Geometry.Coordinates.split(',');

    console.log(Number(splitLatLng_Search[1]));


    var latLngBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(Number(splitLatLng_Search[1]) - 0.01, Number(splitLatLng_Search[0]) - 0.01),
      new google.maps.LatLng(Number(splitLatLng_Search[1]) + 0.01, Number(splitLatLng_Search[0]) + 0.01)
    );

    console.log(latLngBounds);

    map.fitBounds(latLngBounds);

  } else {
    alert("検索結果が見つかりませんでした。");
  }
}


var search = document.getElementsByClassName('search-submit');
var btns = Array.from(search);

btns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    showAddressZoom();
  });
})
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

function delete_marker() {
  for (var i = 0; i < marker_localSearch.length; i++) {
    if (marker_localSearch[i] != null) {
      marker_localSearch[i].setMap(null);
    }
  }
  marker_localSearch = [];
  infoWindow_localSearch = [];
  for (var i = 0; i < marker.length; i++) {
    if (marker[i] != null) {
      marker[i].setMap(null);
    }
  }
  marker = [];
  infoWindow = [];
  console.log(marker_localSearch);
}
