<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

         <button v-on:click="start()">start</button>
  <button v-on:click="stop()">stop</button>
  <button v-on:click="download()">download</button>
   <button v-on:click="send('what')">send</button>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>


  </div>
</template>

<script>
  var rec;
 var recblob;

 rec=Recorder({
   type:"wav"
   ,bitRate:16
   ,sampleRate:16000
   ,bufferSize:4096
 });


console.log(rec)
import axios from 'axios'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components:{
    axios
  },
  methods: {
    start: function () {
      console.log("start recored")


      rec.open(function(){
  console.log("已打开:record:");

  },function(e,isUserNotAllow){

  });

      rec.start();

    },
    stop: function () {
      if(rec){
    		var t1=Date.now();
    		rec.stop(function(blob,time){
    			var id=100;

          console.log(blob)






          let formdata = new FormData() ; //create a from to of data to upload to the server
          formdata.append('soundBlob',blob,  'myfiletosave.wav')



          var postData = {
          	body: formdata
          };


            var headers={
          	  'enctype': 'multipart/form-data',
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }



          		axios.post('http://localhost:13000/upload', formdata, {"headers" : headers})
          		.then(function (response) {
          			console.log(response);
          		})
          		.catch(function (error) {
          			console.log(error);
          		});








    		},function(s){
    		console.log("失败："+s);

    		});
    	};
      console.log("stop recored")
    },
    download: function () {
     console.log("stop recored")

    },
    send: function () {
     console.log("stop recored")



    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
