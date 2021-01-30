// // メニューバー
// $('#toggle').click(function() {
//    $(this).toggleClass("active");
//    $('#overlay').toggleClass("open");
//    if ($("html div").not("#overlay").hasClass("blur")){
//       $("html div").not("#overlay").not(".button_container").removeClass("blur")
//    }else{
//       $("html div").not("#overlay").not(".button_container").addClass("blur")
//    }
// });

// 特定の位置までスクロール
let scroll = (link, target) => {
  $(link).click(() => {
    $("html,body").animate({ scrollTop: $(target).offset().top - 80 });
    $("#overlay").removeClass("open");
    $("html div").removeClass("blur");
    $("#toggle").toggleClass("active");
  });
};

scroll("#top-link", "#title");
scroll("#aboutme-link", "#aboutme");
scroll("#services-link", "#services");
scroll("#works-link", "#works");
scroll("#contact-link", "#contact");

// Animate.cssのfadeInUpエフェクトを適用
$(".fadein").waypoint(
  function (direction) {
    if (direction === "down") {
      $(this.element).css("visibility", "visible");
      $(this.element).addClass("fadeInUp");
      this.destroy();
    }
  },
  { offset: "90%" }
);
