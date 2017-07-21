var canvas;
var btnStart;
var btnStop;
var btnStep;
var btnNew;
var btnReload;
var wrapper;
var tinymce

tinymce.init({
  selector: 'textarea',
  height: 500,
  theme: 'modern',
  plugins: [
    'advlist autolink lists link image charmap print preview hr anchor pagebreak',
    'searchreplace wordcount visualblocks visualchars code fullscreen',
    'insertdatetime media nonbreaking save table contextmenu directionality',
    'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc help'
  ],
  browser_spellcheck: true,
  toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
  toolbar2: 'print preview media | forecolor backcolor emoticons | codesample help',
  image_advtab: true,
  templates: [
    { title: 'Test template 1', content: 'Test 1' },
    { title: 'Test template 2', content: 'Test 2' }
  ],
  content_css: [
    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i'
  ]
 });

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
