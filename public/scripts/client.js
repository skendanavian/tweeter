/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(() => {


  const renderTweets = (tweetData) => {
    for (let tweet of tweetData) {
      const newTweet = createTweetElement(tweet)
      $('.tweets-container').append(newTweet);
    }

  };

  const calculateDays = (timestamp) => {
    const dateCreated = new Date(timestamp);
    const todaysDate = new Date();
    const daysAgo = Math.round((todaysDate - dateCreated) / 1000 / 60 / 60 / 24);;
    return daysAgo;

  }

  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement = (tweetData) => {
    const daysAgo = calculateDays(tweetData.created_at)
    const $tweet = $(
      `</article>
    <article class="tweet">
      <header>
        <div><img src='${tweetData.user.avatars}' width="35" height="35"><p>${tweetData.user.name}</p></div>
    <a class="user-id">${tweetData.user.handle}</a>
      </header >

      <main>
        <p>${escape(tweetData.content.text)}</p>
      </main>
      <footer>
        <p>Posted ${daysAgo} days ago</p>
        <div>
          <a href=""> <i
              class="fas fa-flag"></i>
          </a>
          <a href=""> <i
              class="fas fa-retweet"></i></a>
          <a href=""> <i
              class="fas fa-heart"></i></a>
        </div>

      </footer>
    </article > `)

    return $tweet;

  }


  const loadTweets = () => {
    $.ajaxSetup({
      cache: false
    });

    $.get('/tweets')
      .then((tweets) => {
        renderTweets(tweets.reverse());
      })
      .catch(err => console.log(err))
  }





  $('#create-tweet').submit(function(event) {

    //reset slidedown error message if active
    if ($('.input-error').is(":visible")) {
      console.log('visible')
      $('.input-error').slideUp(200);
    }

    $.ajaxSetup({
      cache: false
    });
    event.preventDefault();

    const charCount = $('#create-tweet').children('div').children('.counter').val();
    const textField = $('#tweet-text').val();

    if (charCount < 0) {
      setTimeout(() => {$('.input-error').text('⚠️ Tweet exceeds the max of 140 characters. ⚠️').slideDown()}, 100)

    } else if (textField === '' || textField === null) {
      setTimeout(() => {$('.input-error').slideDown().text('⚠️ The textbox is empty. Please write a tweet below. ⚠️')}, 100)
    } else {

      const tweetMessage = $(this).serialize()
      $.post('/tweets', tweetMessage).then(() => {

        $('.tweets-container').empty();
        loadTweets();

      })
        .catch(err => console.log(err))
    }

  })

  loadTweets();


  $('.nav-menu').click(() => {
    $('#create-tweet').slideToggle()
    $("#create-tweet textarea").focus();
  })

})

// $('.nav-menu').slideDown()


















