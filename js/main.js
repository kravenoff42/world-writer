var canvas;
var btnStart;
var btnStop;
var btnStep;
var btnNew;
var btnReload;
var wrapper;

function setup(){
  wrapper = document.getElementById('wrapper');
  btnStart = document.getElementById('btnStart');
  btnStop = document.getElementById('btnStop');
  btnStep = document.getElementById('btnStep');
  btnNew = document.getElementById('btnNew');
  btnReload = document.getElementById('btnReload');


  canvas = createCanvas(800,800);
  canvas.parent(wrapper);

  // btnStart.addEventListener('click',function(){clock.ticking = true});
  // btnStop.addEventListener('click',function(){clock.ticking = false});
  // btnStep.addEventListener('click',function(){clock.tick("one");});
  // //btnNew.addEventListener('click',function(){  });
  // btnReload.addEventListener('click',function() { location.reload(); });






}

function draw(){

}
