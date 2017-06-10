console.log('sanity check');

var myBoards = ['agnarr'];
var randomBoards = ['everquest', 'wow', 'leagueoflegends', 'dota', 'hearthstone'];

var grabber = function(url){

  var reqListener = function(){
    var response = JSON.parse(this.responseText);
    console.log(response);
  };

  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load', reqListener);
  oReq.open('GET', url);
  oReq.send();

};

var random = function(){

  console.log('this is random');

};

var favorite = function(){

  console.log("this is favorite");
  var url = "https://www.reddit.com/r/" + myBoards[0] + ".json";
  console.log(url);
  grabber(url);

};

document.getElementById('random').addEventListener('click', random);

document.getElementById('my-boards').addEventListener('click', favorite);

document.getElementById('get-app').addEventListener('click', random);