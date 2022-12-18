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

    console.log("showAddress : 開始");

    var query = document.getElementById('storeform').value;

    var url = "https://map.yahooapis.jp/search/local/V1/localSearch?appid=dj00aiZpPVdnQVloSFUxTEdUaSZzPWNvbnN1bWVyc2VjcmV0Jng9ZDM-&results=100&query=" + encodeURI(query) + "&output=json&callback=showResult";
    callJSONP(url);

    console.log("showAddress : 停止");

}

/*------------------------------------------------------------------------------------------------- */

//JSONPを実行する関数
function callJSONP(url) {

    console.log("callJSONP : 開始");

    var target = document.createElement('script');
    target.charset = 'utf-8';
    target.src = url;
    document.body.appendChild(target);

    console.log("callJSONP : 停止");
}

/*------------------------------------------------------------------------------------------------- */
var count = 0;
//JSONPの結果として実行される関数
function showResult(result) {
    
        

        console.log("showResult : 開始");
        count = 0;
        // 取得件数が1件以上の場合
        if (result.ResultInfo.Count > 0) {
            count = result.ResultInfo.Count;
            
            // 件数の通知
            // alert(result.ResultInfo.Count + "件の結果が見つかりました。");
            console.log(result.ResultInfo.Count + "件の結果が見つかりました。");

            // マーカーの配列の宣言。　取得件数分行う
            var marker = [result.ResultInfo.Count];

            // infwindowの配列の宣言。　取得件数分行う
            var infoWindow = [result.ResultInfo.Count];

            // for文で取得件数分繰り返す
            for (let i = 0; i < result.ResultInfo.Count; i++) {

                var titleInfo = result.Feature[i].Name + "　：　" + result.Feature[i].Property.Address;

                var splitLatLng = result.Feature[i].Geometry.Coordinates.split(',');

                YahooLatLng = new google.maps.LatLng(Number(splitLatLng[1]), Number(splitLatLng[0]));

                marker[i] = new google.maps.Marker({
                    map: map,           //表示している地図を指定する
                    position: YahooLatLng, //マーカーの表示位置を設定する
                    title: titleInfo,
                });



                infoWindow[i] = new google.maps.InfoWindow({

                    content: window.global.content

                });

                marker[i].addListener('mouseover', function (e) {

                    // console.log(marker[int].title);
                    infoWindow[i].open(map, marker[i]);

                });

                marker[i].addListener('mouseout', function (e) {

                    // console.log(marker[int].title);
                    infoWindow[i].close(map, marker[i]);

                });

                console.log(result.Feature[i].Name);

            }

            console.log(window.global.content);


        } else {
            alert("検索結果が見つかりませんでした。");
        }

        window.global.content = "";
        console.log(count);
        console.log("showResult : 終了");
    
}

window.globalFunction = {};
window.globalFunction.showAddress = showAddress;