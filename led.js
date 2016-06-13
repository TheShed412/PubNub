

var channel = "disco";
var sendStr = "";
var button = document.getElementById('butt');

 var pub = PUBNUB.init({
   subscribe_key: 'sub-c-73e6721a-304c-11e6-8bc8-0619f8945a4f',
  publish_key: 'pub-c-3ef60582-c7a1-498f-8aed-5a34d2265af5'
 });

function disco(){
   sendStr = document.getElementById('mess').value;
   pub.publish({
     channel: channel,
     message: {"led": 1, "mess": sendStr}
   });
}

if(button){
  button.addEventListener("click", disco);
}
