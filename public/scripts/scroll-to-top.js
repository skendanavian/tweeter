//Scroll to Top Button Functionality

$(document).ready(function () {
  scrollBtn = $(".back-to-top");

  $(window).scroll(() => {
    if ($(window).scrollTop() > 75) {
      scrollBtn.addClass("show");
      $(".nav-menu").fadeOut();
    } else {
      scrollBtn.removeClass("show");
      $(".nav-menu").fadeIn();
    }
  });

  scrollBtn.click(() => {
    $("html,body").animate({ scrollTop: 0 }, "250");
    $("#create-tweet textarea").focus();
    if ($("#create-tweet").css("display") === "none") {
      $(".nav-menu").trigger("click");
      $("#create-tweet textarea").focus();
    }
  });
});
