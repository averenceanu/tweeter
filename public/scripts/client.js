/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const tweetsDatabase = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" 
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ];

$(document).ready(function(){
  const createTweetElement = function(tweet){
    //Display time, when tweet was created; 
    const time = timeago.format(tweet.created_at); 
    //return a tweet article element containing the entire HTML structure of tweet
    const $header = $('<header>');
    const $headerElem1 = $('<p>').text(tweet.user.name).addClass('username');
    const $avatar = $('<img>').attr("src", tweet.user.avatars).addClass('avatar');
    const $headerElem2 = $('<p>').text(tweet.user.handle).addClass('username-login');
    const $tweetContent = $('<p>').text(tweet.content.text).addClass('tweet-content');
    const $footer = $('<footer>'); 
    const $timePassed = $('<p>').text(time);
    const $icons = $('<span>').addClass('reaction-icons');
    const $icon1 = $('<i>').addClass('fab fa-font-awesome-flag');
    const $icon2 = $('<i>').addClass('fas fa-retweet');
    const $icon3 = $('<i>').addClass('far fa-heart');
    const $tweet = $('<article>') 

    //appred elements together 
    $headerElem1.prepend($avatar)
    $header.append($headerElem1, $headerElem2); 
    $icons.append($icon1, $icon2, $icon3);
    $footer.append($timePassed, $icons);
    $tweet.append($header, $tweetContent, $footer);
    
    return $tweet;
  };

  const renderTweets = function (tweets) {
    //looping through tweets and
    const $tweetsContainer = $('#all-tweets-container');
    $tweetsContainer.empty(); 
    for (const tweet of tweets){
      //calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet); 
      $tweetsContainer.prepend($tweet)
    }
    //takes return value and appends it to the tweets container
  };
  

  //add an event listener for submit and prevent its default behaviour
  const $newTweet = $('#new-tweet-form');

  $newTweet.on('submit', function(event){
    event.preventDefault();
    const message = $("#tweet-text").val().trim().length;
    const serializedData = $(this).serialize();
    //if the tweet content is too long > alert too many caracters 
    if (message > 140) {
      alert('Your tweet contains too many caracters!')
    } 
    // else if (message === 0) {
    //   alert('Your tweet is empty...')
    // }
    $.ajax({
      method: 'POST',
      url: '/tweets/',
      data: serializedData,
      success: (response) => {
        loadTweets();
      },
      error: (err) => {
        console.log(err)
        alert("Your tweet is empty...")
      }
    });
  });

  //function reponsible for fetching tweets from /tweets page
  const loadTweets = function (){
    $.ajax({
      url: '/tweets/',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (err) => {
        console.log(`error: ${err}`)
      }
    });
  };

  loadTweets();

});
