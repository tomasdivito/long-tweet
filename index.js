let twit = require("twit");
let config = require("./config.js")

let Twitter = new twit(config);

// Format of the tweets
// TEXT + twitter.com/{username}/status/889283017285529600 (Vamos a tomar como si fuesen 20 caracteres del id)
// Por lo que la separacion del texto enorme seria no de 140 caracteres si no de 140 - FORMATO
// El formato seria twitter.com//status/889283017285529600 + username.length

// TODO: Actually implement username length.
let userName = "totiiimon";

let longTweet = "Bueno esto es una prueba de un tweet muy largo para probar si esto que estoy haciendo funciona, y si lo hace, que bien, porque la verdad que esto lo pense hace ya un rato y bueno nada, estaria copado que funcionara asi nomas porque me parece que tendria que ser una idea facil de implementar asi que espero que sea util aunque creo que no porque todo lo que hago es inutil";
// Refeer to https://stackoverflow.com/a/7033662/1493828 for the match part of the code.
// Now we are hardcoding the number because i know my username is `totiiimon` but it could be used 
// by whoever and it should work exactly the same.
longTweet = longTweet.match(/(.|[\r\105]){1,105}/g);

let currentIndex = longTweet.length - 1;
let postObj = {};
let pastURLFormat = " twitter.com/totiiimon/status/{id}"

let tweetLong = function (pastID) {
  if (!pastID) {
    postObj = {status: longTweet[currentIndex]};
  } else {
    postObj = {status: longTweet[currentIndex] + pastURLFormat.replace("{id}", pastID)};
  }

  Twitter.post("statuses/update", postObj, (err, data) => {
    if (currentIndex === 0) {
      console.log("finished");
    } else {
      currentIndex--;
      tweetLong(data.id_str);
    }
  });
};

tweetLong();

