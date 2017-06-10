console.log('sanity check');

var favoriteBoard = 'agnarr';
var randomBoards = ['everquest', 'wow', 'leagueoflegends', 'dota', 'hearthstone'];

var builder = function(response){

  response.data.children.forEach( function(arty){
    var thisArty = document.createElement('div');
    thisArty.className = 'arty-box';

    var title = document.createElement('h2');
    title.innerHTML = arty.data.title;
    thisArty.appendChild(title);

    var author = document.createElement('p');
    author.innerHTML = "By: " + arty.data.author;
    thisArty.appendChild(author);

    document.getElementById('arty-container').appendChild(thisArty);
  });

};

var clearContainer = function() {

  var container = document.getElementById('arty-container');

  while ( container.hasChildNodes() ){
    container.removeChild(container.childNodes[0]);
  }

};

var creator = function(url){

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

  clearContainer();
  console.log('this is random');
  var choice = Math.floor( Math.random() * randomBoards.length );
  var url = "https://www.reddit.com/r/" + randomBoards[choice] + ".json";
  console.log(url);
  creator(url);

};

var favorite = function(){

  clearContainer();
  console.log("this is favorite");
  var url = "https://www.reddit.com/r/" + favoriteBoard + ".json";
  console.log(url);
  creator(url);

};

document.getElementById('random').addEventListener('click', random);

document.getElementById('my-boards').addEventListener('click', favorite);

document.getElementById('get-app').addEventListener('click', random);