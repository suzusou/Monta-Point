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
