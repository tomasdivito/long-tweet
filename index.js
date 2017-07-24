let twit = require("twit");
let config = require("./config.js")

let Twitter = new twit(config);

// Format of the tweets
// TEXT + twitter.com/{username}/status/889283017285529600 (Vamos a tomar como si fuesen 20 caracteres del id)
// Por lo que la separacion del texto enorme seria no de 140 caracteres si no de 140 - FORMATO
// El formato seria twitter.com//status/889283017285529600 + username.length

// TODO: Actually implement username length.
let userName = "totiiimon";

let longTweet = "Bueno les cuento, esto que estoy haciendo es basicamente una aplicacion en donde podes escribir algo muy largo, desde una boludes que quieras contar, hasta una historia como un cuento y eso. asi que nada, si a alguien le sirve que bien ";
// Refeer to https://stackoverflow.com/a/7033662/1493828 for the match part of the code.
// Now we are hardcoding the number because i know my username is `totiiimon` but it could be used 
// by whoever and it should work exactly the same.
// Also the matching should separate words correctly and add a `...` to the tweets!
longTweet = longTweet.match(/(.|[\r\105]){1,105}/g);

let currentIndex = longTweet.length - 1;
let postObj = {};
let pastURLFormat = "…  twitter.com/totiiimon/status/{id}"

let tweetLong = function (pastID) {
  if (!pastID) {
    postObj = {status: longTweet[currentIndex]};
  } else {
    postObj = {status: longTweet[currentIndex] + pastURLFormat.replace("{id}", pastID)};
  }

  Twitter.post("statuses/update", postObj, (err, data) => {
    if (currentIndex <= 0) {
      console.log("finished");
    } else {
      currentIndex--;
      tweetLong(data.id_str);
    }
  });
};

tweetLong();

