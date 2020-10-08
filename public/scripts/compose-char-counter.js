//Calculate the characters in new tweet text field

$(document).ready(function () {
  $("#tweet-text").on("keyup", function () {
    let charCount = $(this).val().length;
    let charRemaining = 140 - charCount;

    $(this).siblings("div").children(".counter").text(charRemaining);
    if (charRemaining < 0) {
      $(this).siblings("div").children(".counter").addClass("negative");
    } else {
      $(this).siblings("div").children(".counter").removeClass("negative");
    }
  });
});
