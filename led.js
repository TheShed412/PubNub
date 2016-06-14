

var channel = "disco";
var sendStr = "";
var button = document.getElementById('butt');

var button_0 = document.getElementById("button_0");
var button_1 = document.getElementById("button_1");
var button_2 = document.getElementById("button_2");
var button_3 = document.getElementById("button_3");
var button_4 = document.getElementById("button_4");
var button_5 = document.getElementById("button_5");
var button_6 = document.getElementById("button_6");
var button_7 = document.getElementById("button_7");

var leds = [button_0, button_1, button_2, button_3, button_4, button_5, button_6, button_7];

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

function change_pin(pic){
    var lightNum = parseInt(pic.id.charAt(7));
    var lightClr = pic.alt;
    if(lightClr==="red"){
      pic.src="data/img/green/green_"+lightNum+".jpg";
      pic.alt="green";

      pub.publish({
        channel: channel,
        message: {"led": lightNum, "state": 1}
      });
    }else{
      pic.src="data/img/red/red_"+lightNum+".jpg";
      pic.alt="red"

      pub.publish({
        channel: channel,
        message: {"led": lightNum, "state": 0}
      });
    }
}

for(var i=0; i<leds.length; i++){
  leds[i].addEventListener("click", function(){
    change_pin(this);
  });
}

if(button){
  button.addEventListener("click", disco);
}
