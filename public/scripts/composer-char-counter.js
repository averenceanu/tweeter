$(document).ready(function() {

  $("#tweet-text").on("input", function() {
    // get the value of the length of the textarea
    const $textareaLength = $(this).val().length;
    //calculate # of caracters left  
    const caractersLeft = 140 - $textareaLength;
    // change the value of the counter HTML to number of carathers left and
    const $tweetCaracterCounter = $(this).siblings(".submit-counter").find(".counter").html(caractersLeft)
    //add class .red when counter negative
    if (caractersLeft < 0){
      $(this).siblings(".submit-counter").find(".counter").addClass("red");
    } else if (caractersLeft > 0) {
      $(this).siblings(".submit-counter").find(".counter").removeClass("red");
    }
  });
});