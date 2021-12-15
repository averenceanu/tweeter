/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetsDatabase = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1639423456892
};

$(document).ready(function(){
  const createTweetElement = function(tweetsDatabase){
    //Display time, when tweet was created; 
    const time = timeago.format(tweetsDatabase.created_at); 
    //return a tweet article element containing the entire HTML structure of tweet
    const $header = $('<header>');
    const $headerElem1 = $('<p>').text(tweetsDatabase.user.name).addClass('username');
    const $avatar = $('<img>').attr("src", tweetsDatabase.user.avatars).addClass('avatar');
    const $headerElem2 = $('<p>').text(tweetsDatabase.user.handle).addClass('username-login');
    const $tweetContent = $('<p>').text(tweetsDatabase.content.text).addClass('tweet-content');
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
  }
  const $tweet = createTweetElement(tweetsDatabase)
  console.log($tweet);

  $('#all-tweets-container').append($tweet)
});
