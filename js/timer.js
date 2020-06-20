window.onload=init;
var numHours =0;
var numMin=0;
var numSec=0;
var crono=setInterval(update, 1000);
var cronoRunning = 0;
var timeSet = 10; //Default initial time
var remaniningTime=0;
var blink = 0; //Used to change the background in alarm status
var alarmStatus = 0; //1 when time has expired 
function init(){
//timeSet=10; //For test purposes
remaniningTime=timeSet;
document.getElementById("startstopBtn").innerHTML="Start";
document.getElementById("startstopBtn").style.background="#059E2C";

document.getElementById("clkframe").onclick = switchtocontrol;
document.getElementById("backBtn").onclick = switchtoclock;

document.getElementById("resetBtn").onclick = resetTime;
document.getElementById("setBtn").onclick = setTime;
document.getElementById("startstopBtn").onclick = start_stop;

document.getElementById("clktext1").onclick = switchtosetting;
document.getElementById("clktext2").onclick = switchtosetting;
document.getElementById("clktext3").onclick = switchtocontrol;

$("#appearance2").roundSlider({
    radius: 200,
    width: 14,
    handleSize: "+8",
    handleShape: "dot",
    sliderType: "min-range",
    value: 100
});

switchtocontrol();
}
function setTime(){
    remaniningTime=timeSet;
    timeString = getTimeString(remaniningTime);
    document.getElementById("clktext1").innerHTML=timeString;
    document.getElementById("clktext2").innerHTML=timeString;
    document.getElementById("clktext3").innerHTML=timeString;
};
function resetTime(){
    if (cronoRunning==0){
    remaniningTime=0;
    timeSet=0;
    timeString = getTimeString(remaniningTime);
    document.getElementById("clktext1").innerHTML=timeString;
    document.getElementById("clktext2").innerHTML=timeString;
    document.getElementById("clktext3").innerHTML=timeString;
    }
};
function switchtocontrol(){
document.getElementById("clkframe").style.display="none";
document.getElementById("ctrlframe").style.display="flex";
document.getElementById("setframe").style.display="none";
}
function switchtoclock(){
document.getElementById("clkframe").style.display="flex";
document.getElementById("ctrlframe").style.display="none";
document.getElementById("setframe").style.display="none";
}
function switchtosetting(){
document.getElementById("clkframe").style.display="none";
document.getElementById("ctrlframe").style.display="none";
document.getElementById("setframe").style.display="flex";
}
function start_stop(){
if(cronoRunning == 1){
    cronoRunning = 0;
    document.getElementById("startstopBtn").innerHTML="Start";
    document.getElementById("startstopBtn").style.background="#059E2C";
    
}
else if(cronoRunning == 0){
    cronoRunning = 1;
    document.getElementById("startstopBtn").innerHTML="Stop"
    document.getElementById("startstopBtn").style.background="#F0210C"
}
}
function getTimeString(remTime){
    h = Math.floor(remTime/3600);
    m = Math.floor((remTime - h*3600)/60);
    s = Math.floor(remTime - h*3600 - m*60);
    if(h<10){
    hs="0" + h.toString();
    }else{
    hs= h.toString();
    }
    if(m<10){
    ms="0" + m.toString();
    }else{
    ms=m.toString(); 
    }
    if(s<10){
    ss="0" + s.toString();
    }else{
    ss=s.toString(); 
    }
    str = hs + ":" + ms + ":" + ss;
    return str;
}
function update(){
    if (cronoRunning==1) {
    if (remaniningTime > 0){
        remaniningTime -=1;
    }
    updatedValue=remTimePercentCalc(remaniningTime, timeSet);
    $("#appearance2").roundSlider({
        radius: 200,
        width: 14,
        handleSize: "+8",
        handleShape: "dot",
        sliderType: "min-range",
        value: updatedValue
    });
    timeString = getTimeString(remaniningTime);
    document.getElementById("clktext1").innerHTML=timeString;
    document.getElementById("clktext2").innerHTML=timeString;
    document.getElementById("clktext3").innerHTML=timeString;
    }
    //Blinking variable
    blink = (blink == 0) ? 1 : 0
    checkAlarm();
}
function checkAlarm(){
    alarmStatus = (remaniningTime == 0 && cronoRunning == 1) ? 1 : 0;
    if(alarmStatus){
    document.getElementById("warningSound").play();
    }
    backgroundBlink();
}
function backgroundBlink(){
    if(blink*alarmStatus == 0){
        document.getElementById("clkframe").style.backgroundColor="#FFFFFF";
        document.getElementById("ctrlframe").style.backgroundColor="#FFFFFF";
        document.getElementById("setframe").style.backgroundColor="#FFFFFF";
        
    }else{
        document.getElementById("clkframe").style.backgroundColor="#F0210C";
        document.getElementById("ctrlframe").style.backgroundColor="#F0210C";
        document.getElementById("setframe").style.backgroundColor="#F0210C";
    }   
}
function remTimePercentCalc(remTime, setT){
    if (setT != 0){
        rtpc = remTime * 100 /setT;
    }else{
        rtpc = 0;
    }
    return rtpc;
}
$(function() {
    $('#fugit').fugit().on('change.fugit', function(e) {
        hourSet=parseInt(($(e.currentTarget).val()).split(":")[0]);
        minuteSet=parseInt(($(e.currentTarget).val()).split(":")[1]);
        timeSet=hourSet*3600+minuteSet*60;
    });
});