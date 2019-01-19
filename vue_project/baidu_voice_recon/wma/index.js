const express = require('express'); 
const app = express();
var cors = require('cors')
const multer  = require('multer') 
const upload = multer(); 
const fs = require('fs'); 
var AipSpeechClient = require("baidu-aip-sdk").speech;

var APP_ID = "15448586";
var API_KEY = "o84ZjdIIZeEGM16gHav8dZTg";
var SECRET_KEY = "k5uCVX8A1MZRkYkrnVgcTqQNCbCacmIi";
app.use(cors())
// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);


app.post('/upload', upload.single('soundBlob'), function (req, res, next) {
   console.log(req.file); 

  let uploadLocation = __dirname + '/uploads/' + req.file.originalname 

  fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer))); 

  client.recognize(Buffer.from(new Uint8Array(req.file.buffer)), 'wav', 16000).then(function (result) {
    console.log('<recognize>: ' + JSON.stringify(result));
    res.send(JSON.stringify(result))
}, function(err) {
    console.log(err);
});


   //send back that everything went ok

})



app.post('/speach', upload.single('soundBlob'), function (req, res, next) {
  console.log(req.file); 

 let uploadLocation = __dirname + '/uploads/' + req.file.originalname 

 fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer))); 

 client.recognize(Buffer.from(new Uint8Array(req.file.buffer)), 'wav', 16000).then(function (result) {
   console.log('<recognize>: ' + JSON.stringify(result));
   res.send(JSON.stringify(result))
}, function(err) {
   console.log(err);
});


  //send back that everything went ok

})


//serve out any static files in our public HTML folder
app.use(express.static('/home/wma/project/node_server/'))


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


//makes the app listen for requests on port 3000
app.listen(13000, function(){
  console.log("app listening on port 13000!")
})
