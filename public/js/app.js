console.log('sanity check');

var favoriteBoard = 'agnarr';
var randomBoards = ['everquest', 'wow', 'leagueoflegends', 'dota', 'hearthstone'];

var builder = function(response){

  response.data.children.forEach( function(article){
    var thisCard = document.createElement('div');
    thisCard.className = 'card';

    if(article.data.thumbnail !== "self"){
      var media = document.createElement('img');
      media.src = article.data.url;
      thisCard.appendChild(media);
    }

    var title = document.createElement('h2');
    title.innerHTML = article.data.title;
    thisCard.appendChild(title);

    var author = document.createElement('p');
    author.innerHTML = "By: " + article.data.author;
    thisCard.appendChild(author);

    var timeStamp = document.createElement('p');
    timeStamp.innerHTML = "created on... " + new Date(article.data.created);
    thisCard.appendChild(timeStamp);

    var score = document.createElement('p');
    score.innerHTML = "Score... " + article.data.score;
    thisCard.appendChild(score);

    var snippet = document.createElement('p');
    snippet.innerHTML = article.data.selftext;
    thisCard.appendChild(snippet);

    document.getElementById('card-container').appendChild(thisCard);
  });

};


var clearContainer = function() {

  var container = document.getElementById('card-container');

  while ( container.hasChildNodes() ){
    container.removeChild(container.childNodes[0]);
  }

};

var creator = function(url){

  clearContainer();
  var reqListener = function(){
    var response = JSON.parse(this.responseText);
    console.log(response);
    builder(response);
  };

  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load', reqListener);
  oReq.open('GET', url);
  oReq.send();



};

var random = function(){

  console.log('this is random');
  var choice = Math.floor( Math.random() * randomBoards.length );
  var url = "https://www.reddit.com/r/" + randomBoards[choice] + ".json";
  console.log(url);
  creator(url);

};

var favorite = function(){


  console.log("this is favorite");
  var url = "https://www.reddit.com/r/" + favoriteBoard + ".json";
  console.log(url);
  creator(url);

};

document.getElementById('random').addEventListener('click', random);

document.getElementById('my-boards').addEventListener('click', favorite);

document.getElementById('get-app').addEventListener('click', random);

favorite();