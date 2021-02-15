// メニューバー
$("#hamburger-btn").click(function () {
  $(this).toggleClass("in-open");
  $("#nav-menu").toggleClass("hamburger-menu");
});

$(".menu-item").click(function () {
  $("#hamburger-btn").toggleClass("in-open");
  $("#nav-menu").toggleClass("hamburger-menu");
});

// 特定の位置までスクロール
let scroll = (link, target) => {
  let offset = document.documentElement.offsetWidth > 768 ? 80 : 0;
  $(link).click(() => {
    $("html,body").animate({ scrollTop: $(target).offset().top - offset });
    $("#overlay").removeClass("open");
    $("html div").removeClass("blur");
    $("#toggle").toggleClass("active");
  });
};

scroll("#top-link", "#title");
scroll("#aboutme-link", "#aboutme");
scroll("#skills-link", "#skills");
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

// Animate.cssのfadeInUpエフェクトを適用
$(".main-image").waypoint(
  function (direction) {
    if (direction === "down") {
      $(this.element).addClass("bg-dilute");
    }
    if (direction === "up") {
      $(this.element).removeClass("bg-dilute");
    }
  },
  { offset: "0%" }
);
