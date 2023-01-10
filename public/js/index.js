// document.getElementById("search-submit").onclick = function () {
//   // 処理
//   var search_text = document.getElementById("search-box");
//   console.log(search_text.value);
//   if (
//     search_text.value == "mac" ||
//     search_text == "マック" ||
//     search_text == "マクドナルド"
//   ) {
//     window.scrollTo({
//       top: 400, //上からの位置
//       //   left: 100, //左からの位置
//       behavior: "smooth", //smoothでスクロールしながら移動a
//     });
//   }
// };
jQuery(function ($) {
  $(".acordion-contents").css("display", "none");
  // 質問の答えをあらかじめ非表示

  //質問をクリック
  $(".acordion-title").click(function () {
    $(".acordion-title").not(this).removeClass("open");
    //クリックしたquestion以外の全てのopenを取る

    $(".acordion-title").not(this).next().slideUp(300);
    //クリックされたquestion以外のanswerを閉じる

    $(this).toggleClass("open");
    //thisにopenクラスを付与

    $(this).next().slideToggle(300);
    //thisのanswerを展開、開いていれば閉じる
  });
});
$(function () {
  $(".hamburger").click(function () {
    $(".hamburger").toggleClass("active");
    $(".menu").toggleClass("open");
  });
});
