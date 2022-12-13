function initMap() {

    // ------------------------------------------------------------------------------------

    //地図の中心座標を指定する
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    var my_lati;
    var my_longi;

    var latLng;

    // 位置座標が取得できた場合
    function successCallback(position) {
        my_lati = position.coords.latitude;
        my_longi = position.coords.longitude;

        latLng = new google.maps.LatLng(my_lati, my_longi);

        console.log(my_lati, my_longi);

        //地図の表示設定をする
        var options = {
            zoom: 19,       //地図の縮尺値を設定する
            center: latLng  //地図の中心座標を設定する
        };

        // ------------------------------------------------------------------------------------

        //Mapクラスのインスタンスを作成する
        var map = new google.maps.Map(document.getElementById('map'), options);

        // ------------------------------------------------------------------------------------

        //マーカーとタイトルを表示する
        // var marker = new google.maps.Marker({
        //     map: map,           //表示している地図を指定する
        //     position: latLng,   //マーカーの表示位置を設定する
        //     // title: "地図の中心は東京駅です。"    //タイトルに値を設定する
        // });

        // ------------------------------------------------------------------------------------

        // 円を表示する
        // var circle = new google.maps.Circle({
        //     map: map,
        //     center: latLng,
        //     radius: 800,
        // });

        // ------------------------------------------------------------------------------------

        map.addListener('click', function (e) {

            var marker = new google.maps.Marker({
                map: map,           //表示している地図を指定する
                position: e.latLng,   //マーカーの表示位置を設定する
                // title: "新しいマーカーです"    //タイトルに値を設定する
            });

            // ------------------------------------------------------------------------------------

            var infoWindow = new google.maps.InfoWindow({

                // content: e.latLng.toString() //イベントの発生した位置を toString() で文字列に変換

                content:  '<img src="./../img/paypay.png" width="24" height="24" alt="home" />' + 
                '<img src="./../img/rakuten.jpg" width="24" height="24" alt="home" /><br/>'+
                '<img src="./../img/Dpointo.png" width="24" height="24"  />'  

            });

            // ------------------------------------------------------------------------------------

            //マーカーに対して，クリック時のイベントを登録。クリックされたらウィンドウを開く処理。
            // marker.addListener('click', function (l) {

            //     infoWindow.open(map, marker); //marker の位置に情報ウィンドウを表示

            //     //  this.setMap(null); //マーカー削除

            // });

            // ------------------------------------------------------------------------------------

            marker.addListener('mouseover', function (l) {

                infoWindow.open(map, marker); //marker の位置に情報ウィンドウを表示

                //  this.setMap(null); //マーカー削除

            });

            marker.addListener('mouseout', function (l) {

                infoWindow.close(); //情報ウィンドウを閉じる

                //  this.setMap(null); //マーカー削除

            });

            // ------------------------------------------------------------------------------------

        });

        // 35.1768376,136.8931463

    };

    // 位置情報が取得できない場合
    function errorCallback(error) {
        var err_msg = "";
        switch (error.code) {
            case 1:
                err_msg = "位置情報の利用が許可されていません";
                break;
            case 2:
                err_msg = "デバイスの位置が判定できません";
                break;
            case 3:
                err_msg = "タイムアウトしました";
                break;
        }
        console.log(err_msg);

        latLng = new google.maps.LatLng(35.17263,136.88602);

        //地図の表示設定をする
        var options = {
            zoom: 19,       //地図の縮尺値を設定する
            center: latLng  //地図の中心座標を設定する
        };

        // ------------------------------------------------------------------------------------

        //Mapクラスのインスタンスを作成する
        var map = new google.maps.Map(document.getElementById('map'), options);

        // ------------------------------------------------------------------------------------

        //マーカーとタイトルを表示する
        // var marker = new google.maps.Marker({
        //     map: map,           //表示している地図を指定する
        //     position: latLng,   //マーカーの表示位置を設定する
        //     // title: "地図の中心は東京駅です。"    //タイトルに値を設定する
        // });

        // ------------------------------------------------------------------------------------

        // 円を表示する
        // var circle = new google.maps.Circle({
        //     map: map,
        //     center: latLng,
        //     radius: 800,
        // });

        // ------------------------------------------------------------------------------------

        map.addListener('click', function (e) {

            var marker = new google.maps.Marker({
                map: map,           //表示している地図を指定する
                position: e.latLng,   //マーカーの表示位置を設定する
                // title: "新しいマーカーです"    //タイトルに値を設定する
            });

            // ------------------------------------------------------------------------------------

            var infoWindow = new google.maps.InfoWindow({

                // content: e.latLng.toString() //イベントの発生した位置を toString() で文字列に変換

                content: "all ok"

            });

            // ------------------------------------------------------------------------------------

            //マーカーに対して，クリック時のイベントを登録。クリックされたらウィンドウを開く処理。
            // marker.addListener('click', function (l) {

            //     infoWindow.open(map, marker); //marker の位置に情報ウィンドウを表示

            //     //  this.setMap(null); //マーカー削除

            // });

            // ------------------------------------------------------------------------------------

            marker.addListener('mouseover', function (l) {

                infoWindow.open(map, marker); //marker の位置に情報ウィンドウを表示

                //  this.setMap(null); //マーカー削除

            });

            marker.addListener('mouseout', function (l) {

                infoWindow.close(); //情報ウィンドウを閉じる

                //  this.setMap(null); //マーカー削除

            });

            // ------------------------------------------------------------------------------------

        });

    };

    // ------------------------------------------------------------------------------------


};