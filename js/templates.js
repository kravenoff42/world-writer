var btnAddNewTemp;
var btnNewBlank;
var txtNewTemp0;
var newQuestionTemplate;
var cats;
var templates;
var templatesView;

window.onload = function(){
  btnAddNewTemp = document.getElementById("btnAddNewTemp");
  btnNewBlank = document.getElementById("btnNewBlank");
  txtNewTemp0 = document.getElementById("txtNewTemp_0");
  newQuestionTemplate = document.getElementById("newQuestionTemplate");
  templatesView = document.getElementById('templatesView');

  //events
  if(btnNewBlank){btnNewBlank.addEventListener('click', insertBlank);}
  if(btnAddNewTemp){btnAddNewTemp.addEventListener('click', getTemplateInfo);}
  
  //preselect text
  var selection = window.getSelection();
  var range = document.createRange();
  if(txtNewTemp0){
    range.selectNodeContents(txtNewTemp0);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  cats = new Categories();
  cats.setList();
  templates = new TempList();
  templates.setList();
}

function insertBlank(){
  var text = txtNewTemp0.innerHTML;
  var idCnt = document.querySelectorAll("select").length;
  var ddl = cats.createDDL(idCnt);
  newQuestionTemplate.insertBefore(ddl, btnNewBlank);
  var span = document.createElement("span");
  span.id = "txtNewTemp_"+(idCnt+1);
  span.setAttribute("contenteditable", true);
  span.classList.add('well');
  span.classList.add('well-sm');
  span.appendChild( document.createTextNode("?"));
  newQuestionTemplate.insertBefore(span, btnNewBlank);
  var last = newQuestionTemplate.lastElementChild;
  last.previousElementSibling.focus();

}

function getTemplateInfo(){
  var ddls = document.querySelectorAll("select");
  var q="";
  var cid = cats.toID(ddls[0].selectedOptions[0].value);
  var cnt = ddls.length;
  for (var i=0;i<ddls.length+1;i++){
    var span = document.getElementById("txtNewTemp_"+i);
    q +=span.innerText;
    if(i<ddls.length){
    q +="0"+ddls[i].selectedOptions[0].value+"0";
    }
  }
  var minusQM = q.length-1;
  q = q.substr(0,minusQM);
  var t = new Template(null,cid,cnt,q);
  t.insertTemplate();
}

function makeList(){
  //if(templates.list.length>0){
    for(var i = 0;i<templates.list.length;i++){
      var div = templates.list[i].createListGroupItem();
      templatesView.appendChild(div);
    }
  //}
}

