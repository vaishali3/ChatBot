document.addEventListener('DOMContentLoaded',function(){
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  var socket=io();

  var you=document.querySelector('.output-you');
  var bot=document.querySelector('.output-bot');
  function synthVoice(text)
  {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.text=text;
    synth.speak(utterance);
   }

  document.querySelector('button').addEventListener('click',function(){
    recognition.start();
  });
  recognition.addEventListener('result',function(e){
    let last=e.results.length-1;
    let text=e.results[last][0].transcript;

    socket.emit('chat message',text);
    you.textContent=text;
    //alert('confidence :'+ e.results[0][0].confidence);
  });

  socket.on('bot reply',function(replyText){
    bot.textContent=replyText;
    synthVoice(replyText);
  });
});
