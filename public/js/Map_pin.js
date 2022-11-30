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

function showAddress() {

    var query = document.getElementById('storeform').value;

    var url = "https://map.yahooapis.jp/search/local/V1/localSearch?appid=dj00aiZpPVdnQVloSFUxTEdUaSZzPWNvbnN1bWVyc2VjcmV0Jng9ZDM-&results=100&query=" + encodeURI(query) + "&output=json&callback=showResult";
    callJSONP(url);
}

/*------------------------------------------------------------------------------------------------- */

//JSONPを実行する関数
function callJSONP(url) {
    var target = document.createElement('script');
    target.charset = 'utf-8';
    target.src = url;
    document.body.appendChild(target);
}

/*------------------------------------------------------------------------------------------------- */

//JSONPの結果として実行される関数
function showResult(result) {

    // 取得件数が1件以上の場合
    if (result.ResultInfo.Count > 0) {

        // 件数の通知
        // alert(result.ResultInfo.Count + "件の結果が見つかりました。");
        console.log(result.ResultInfo.Count + "件の結果が見つかりました。");

        // マーカーの配列の宣言。　取得件数分行う
        var marker = [result.ResultInfo.Count];

        // infwindowの配列の宣言。　取得件数分行う
        var infoWindow = [result.ResultInfo.Count];

        // for文で取得件数分繰り返す
        for (let int = 0; int < result.ResultInfo.Count; int++) {

            var titleInfo = result.Feature[int].Name + "　：　" + result.Feature[int].Property.Address;

            var splitLatLng = result.Feature[int].Geometry.Coordinates.split(',');

            YahooLatLng = new google.maps.LatLng(Number(splitLatLng[1]), Number(splitLatLng[0]));

            marker[int] = new google.maps.Marker({
                map: map,           //表示している地図を指定する
                position: YahooLatLng, //マーカーの表示位置を設定する
                title: titleInfo,
            });

            var rand = Math.round(Math.random() * 5);

            console.log(rand);

            var randx = rand.toString;

            infoWindow[int] = new google.maps.InfoWindow({

                // content: e.latLng.toString() //イベントの発生した位置を toString() で文字列に変換

                // content: '<img src="./../images/image-sample' + rand + '.jpg" width="70" height="70" alt="home" />'

            });

            marker[int].addListener('mouseover', function (e) {

                // console.log(marker[int].title);
                infoWindow[int].open(map, marker[int]);

            });

            marker[int].addListener('mouseout', function (e) {

                // console.log(marker[int].title);
                infoWindow[int].close(map, marker[int]);

            });

            console.log(result.Feature[int].Name);

        }

    } else {
        alert("検索結果が見つかりませんでした。");
    }

}

window.globalFunction = {};
window.globalFunction.showAddress = showAddress;