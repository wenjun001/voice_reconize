const express = require('express'); 
const app = express();
const multer  = require('multer') 
const upload = multer(); 
const fs = require('fs'); 

app.post('/upload', upload.single('soundBlob'), function (req, res, next) {
   console.log(req.file); 

  let uploadLocation = __dirname + '/uploads/' + req.file.originalname 

  fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer))); 
  res.sendStatus(200); //send back that everything went ok

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
