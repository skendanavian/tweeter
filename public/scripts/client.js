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



  const createTweetElement = (tweetData) => {
    const timeStampMilliseconds = tweetData.created_at * 1000;
    const dateCreated = new Date(timeStampMilliseconds);
    const todaysDate = new Date();
    const daysAgo = (todaysDate - dateCreated).toLocaleString(("en-US", {day: "numeric"}));
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
        <p>${daysAgo} days ago</p>
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

