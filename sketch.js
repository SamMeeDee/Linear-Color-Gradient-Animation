var from, to, c;
var amt=0.00;
var dir;
var animStart;

function setup() { 
  var canvas = createCanvas(400, 400);
  canvas.parent('container')    
  c = color(220);
  animStart=false;
  fromPicker = document.querySelector("#from");
  toPicker = document.querySelector("#to");
  swtch = document.querySelector("#switch");
  fromPicker.addEventListener("change", colFrom, false);
  toPicker.addEventListener("change", colTo, false);
  swtch.addEventListener("click", strtStp, false);
} 

function draw() {
  if (animStart && (frameCount % 5 == 0)) { 
    tweenColor(from,to);
    text(frameCount, width / 2, height / 2);
  }
  background(c);
  console.log(c.toString("#rrggbb"));
  document.querySelector("#colorLabel").innerHTML = "Current Color: " + ntc.name(c.toString('#rrggbb'))[1];    
}

function colFrom(event) {
  from = color(event.target.value);
  c = from;  
  amt=0.00;
  dir = 'up'; 
  document.querySelector("#fromLabel").innerHTML = "Starting color (" + ntc.name(event.target.value)[1] + "): ";    
}

function colTo(event) {
  to = color(event.target.value);
  amt=0.00;
  dir = 'up';
  document.querySelector("#toLabel").innerHTML = "Ending color (" + ntc.name(event.target.value)[1] + "): ";
}

function tweenColor(from,to) {
  updateCycle();
  c = lerpColor(from, to, amt);
  console.log(amt + ", " + color);
}

function updateCycle() {
  if (!dir) {throw new Error("Cycle position unknown");}
  else {
    if (amt < 0.00 || amt > 1.00) {
      if (amt < 0.00) {
        amt = 0.00; 
        dir = 'up';
      }
      else if (amt > 1.00) {
        amt = 1.00; 
        dir = 'down';
      } 
    } 
  
    else if (amt === 0.00 || amt === 1.00) {
      if (amt === 0.00) {
        amt = parseFloat((amt+0.01).toPrecision(4)); 
        dir = 'up';
      }
      else if (amt === 1.00) {
        amt = parseFloat((amt-0.01).toPrecision(4)); 
        dir = 'down';
      }
    } 
  
    else if (amt > 0.00 && amt < 1.00) {
      if (dir === 'up') { amt = parseFloat((amt+0.01).toPrecision(4)); }
      else if (dir === 'down') { amt = parseFloat((amt-0.01).toPrecision(4)); }
    }
  }
}

function strtStp(event) {
    if (from && to && c){
        if(event.srcElement.innerText==="Start"){
            animStart=true;
            document.querySelector("#switch").innerHTML="Stop";
        } 
        else if(event.srcElement.innerText==="Stop"){
            animStart=false;
            document.querySelector("#switch").innerHTML="Start";
        }     
    }
    else {alert("Please select a starting and ending color!!!");}
}