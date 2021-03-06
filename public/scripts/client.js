//Script for Get and Post Ajax Requests.  Populate and Render Tweets from DB.

$(document).ready(() => {
  const renderTweets = (tweetData) => {
    for (let tweet of tweetData) {
      const newTweet = createTweetElement(tweet);
      $(".tweets-container").append(newTweet);
    }
  };

  const calculateDays = (timestamp) => {
    const dateCreated = new Date(timestamp);
    const todaysDate = new Date();
    const daysAgo = Math.round(
      (todaysDate - dateCreated) / 1000 / 60 / 60 / 24
    );
    return daysAgo;
  };

  //XSS Security Feature
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Creates the HTML for each tweet
  const createTweetElement = (tweetData) => {
    const daysAgo = calculateDays(tweetData.created_at);
    const $tweet = $(
      `</article>
    <article class="tweet">
      <header>
        <div><img src='${tweetData.user.avatars}' width="35" height="35"><p>${
        tweetData.user.name
      }</p></div>
    <a class="user-id">${tweetData.user.handle}</a>
      </header >

      <main>
        <p>${escape(tweetData.content.text)}</p>
      </main>
      <footer>
        <p>Posted ${daysAgo} days ago</p>
        <div>
          <a href="#"> <i
              class="fas fa-flag"></i>
          </a>
          <a href="#"> <i
              class="fas fa-retweet"></i></a>
          <a href="#"> <i
              class="fas fa-heart"></i></a>
        </div>

      </footer>
    </article > `
    );

    return $tweet;
  };

  const loadTweets = () => {
    $.ajaxSetup({
      cache: false,
    });
    $.get("/tweets")
      .then((tweets) => {
        renderTweets(tweets.reverse());
      })
      .catch((err) => console.log(err));
  };

  $("#create-tweet").submit(function (event) {
    //reset slidedown error message if active
    if ($(".input-error").is(":visible")) {
      $(".input-error").slideUp(200);
    }

    $.ajaxSetup({
      cache: false,
    });

    event.preventDefault();

    const charCount = $("#create-tweet")
      .children("div")
      .children(".counter")
      .val();

    //trim whitespace to fix bug on form validator
    const textField = $.trim($("#tweet-text").val());

    //Error Handling for empty text/over 140 chars.
    if (charCount < 0) {
      setTimeout(() => {
        $(".input-error")
          .text("⚠️ Tweet exceeds the max of 140 characters. ⚠️")
          .slideDown();
      }, 100);
    } else if (textField === "" || textField === null) {
      setTimeout(() => {
        $(".input-error")
          .slideDown()
          .text("⚠️ The textbox is empty. Please write a tweet below. ⚠️");
      }, 100);
      //Submit Tweet for rendering if it passes validation.
    } else {
      const tweetMessage = $(this).serialize();
      $.post("/tweets", tweetMessage)
        .then(() => {
          $("output.counter").val(140);
          $("#tweet-text").val("");
          $(".tweets-container").empty();
          loadTweets();
        })
        .catch((err) => console.log(err));
    }
  });

  //Gets tweets from DB on initial page load
  loadTweets();

  //Nav Button Slider
  $(".nav-menu").click(() => {
    $("#create-tweet").slideToggle();
    $("#create-tweet textarea").focus();
  });

  //Click on Tweeter Logo to go back to top
  $(".nav-title").click(() => {
    $(".back-to-top").trigger("click");
  });
});
