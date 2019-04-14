var express = require("express");
var app = express();
const APIAI_TOKEN = process.env.APIAI_TOKEN;
const APIAI_SESSION_ID = '1';
const apiai = require('apiai')('fb534d2846944a3da50a4c5c1a18b209');

app.use(express.static("views")); // html
app.use(express.static("public"));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

const io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('a user connected');
});

console.log("chatbot started");
app.get('/',function(req,res)
{
  console.log("hello");
    //alert("hello there");
    res.send('index.html');
});

io.on('connection',function(socket){
    socket.on('chat message',function(text){
      console.log('Message: ' + text);

      let apiaiReq = apiai.textRequest(text, {
         sessionId: APIAI_SESSION_ID
       });

       apiaiReq.on('response',function(response){
         let aiText = response.result.fulfillment.speech;
         console.log('Bot reply: ' + aiText);
         socket.emit("bot reply",aiText);
       });

       apiaiReq.on('error',(error)=>{

         console.log(error);
       });

       apiaiReq.end();
    });
});
