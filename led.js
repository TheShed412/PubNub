

var channel = "disco";
var button = document.getElementById('butt');

// var pub = PUBNUB.init({
//   subscribe_key: 'lights',
//   publish_key: 'lightswitch'
// });

function disco(){
  alert("Working");
  // p.publish({
  //   channel: channel,
  //   message: {led: 1}
  // });
}

if(button){
  button.addEventListener("click", disco);
}
