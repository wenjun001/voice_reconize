var AipSpeechClient = require("baidu-aip-sdk").speech;

// 设置APPID/AK/SK
var APP_ID = "15448586";
var API_KEY = "o84ZjdIIZeEGM16gHav8dZTg";
var SECRET_KEY = "k5uCVX8A1MZRkYkrnVgcTqQNCbCacmIi";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);


let fs = require('fs');
let voice = fs.readFileSync('recording.wav');

let voiceBuffer = new Buffer(voice);

// 识别本地文件
client.recognize(voiceBuffer, 'wav', 16000).then(function (result) {
    console.log('<recognize>: ' + JSON.stringify(result));
}, function(err) {
    console.log(err);
});