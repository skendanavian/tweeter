/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(() => {


  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

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
        <p>${tweetData.content.text}</p>
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

  renderTweets(data);

})

















// })

