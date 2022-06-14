// the array that holds all tweets
let tweets = [];
//  placed the first tweet in the array
tweets.unshift(document.getElementById('f-tweet'))
//called the function actions to enable listeners for this tweet
actions()

// createTweet function is activated onClick to the acceptButton
var acceptButton = document.getElementsByClassName("draft-accept-button")[0];
acceptButton.addEventListener('click', createTweet);
function createTweet() {

  var tweetText = document.getElementById("tweet-text-input").value;
  var author = document.getElementById("tweet-attribution-input").value;


  if (tweetText == "" || author == "") {
    alert("Please insert author name and the tweet text to post the tweet!");
  }

  // used unshift to place to newest element upfront
  //makeHTML function gives our new element the style that is needed
  tweets.unshift(makeHTML(author, tweetText))
  appendToNewsFeed()


}
function appendToNewsFeed() {
  const container = document.getElementById("tweet-container");
  container.innerHTML = '';

  for (let i = 0; i < tweets.length; i++) {
    container.appendChild(tweets[i]);
  }

  actions()
}

function actions() {
  // event listeners to change the color of the tweet
  for (let i = 0; i < document.querySelectorAll('.like').length; i++) {
    const color = "#eeeeee";
    document.querySelectorAll('.like')[i].addEventListener('click', (e) => {
      const element = document.getElementsByClassName("tweet-container")[0].children[i]
      element.style.background = color
      element.children[0].children[1].style.background = color;
    });
  }

  for (let i = 0; i < tweets.length; i++) {

    document.querySelectorAll('.retweet')[i].addEventListener('click', (e) => {

      retweet(tweets[i].children[0].children[0].children[1].textContent
        , tweets[i].children[0].children[1].value)


    });
  }
}




function retweet(author_retweeted, tweetText_retweeted) {


  if (tweetText_retweeted == "" || author_retweeted == "") {
    alert("Please enter something into the 'tweet text' or 'author' box");
    return;
  }
  tweets.unshift(makeHTML(author_retweeted, tweetText_retweeted))
  appendToNewsFeed()

}

function makeHTML(author, tweetText) {
  var tweetArticle = document.createElement('article');
  tweetArticle.classList.add("tweet");

  var tweetContentDiv = document.createElement('div');
  tweetContentDiv.classList.add("tweet-content");
  tweetArticle.appendChild(tweetContentDiv);

  var tweetIconDiv = document.createElement('div');
  tweetIconDiv.classList.add("tweet-icon");
  tweetContentDiv.appendChild(tweetIconDiv);

  var Icon = document.createElement('i');
  Icon.classList.add("fas");
  Icon.classList.add("fa-dove");
  tweetIconDiv.appendChild(Icon);

  var tweetAuthorPar = document.createElement('p');
  tweetAuthorPar.classList.add("tweet-author");
  tweetAuthorPar.textContent = author;
  tweetIconDiv.appendChild(tweetAuthorPar);

  var tweetTextPar = document.createElement('textarea');
  tweetTextPar.classList.add("tweet-text");
  tweetTextPar.textContent = tweetText;
  tweetContentDiv.appendChild(tweetTextPar);


  var interactions = document.createElement('div');
  interactions.classList.add("interactions");
  tweetArticle.appendChild(interactions);

  var likeButton = document.createElement('input');
  likeButton.setAttribute('type', 'submit');
  likeButton.setAttribute('id', 'like');
  likeButton.classList.add('like');
  likeButton.setAttribute('style', 'width:75px;');
  likeButton.setAttribute('value', 'Like');
  interactions.appendChild(likeButton);

  var retweetButton = document.createElement('input');
  retweetButton.setAttribute('type', 'submit');
  retweetButton.setAttribute('id', 'retweet');
  retweetButton.setAttribute('style', 'width:75px;');
  retweetButton.classList.add('retweet');
  retweetButton.setAttribute('value', 'Retweet');
  interactions.appendChild(retweetButton);
  return tweetArticle;
}
