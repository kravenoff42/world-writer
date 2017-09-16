var btnAddNewTemp = document.getElementById("btnAddNewTemp");
var btnNewBlank = document.getElementById("btnNewBlank");
var txtNewTemp0 = document.getElementById("txtNewTemp_0");
var newQuestionTemplate = document.getElementById("newQuestionTemplate");
var cats;
var templates = [];

window.onload = function(){
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
  makeList()
}

function insertBlank(){
  var text = txtNewTemp0.innerHTML;
  var idCnt = document.querySelectorAll("select").length;
  var ddl = document.createElement("select");
  ddl.classList.add('form-control');
  ddl.id = "ddlTempWordCat_"+idCnt;
  console.log(cats.list.length);
  for(var i = 0; i<cats.list.length;i++){
    var opt = document.createElement("option");
    console.log(cats.list[i]);
    opt.value = cats.list[i].catAbbrev;
    opt.label = cats.list[i].catName;
    ddl.options.add(opt);
  }
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
  var qid = cats.toID(ddls[0].selectedOptions[0].value);
  var cnt = ddls.length;
  for (var i=0;i<ddls.length+1;i++){
    var span = document.getElementById("txtNewTemp_"+i);
    q +=span.innerText;
    if(i<ddls.length){
    q +="0"+ddls[i].selectedOptions[0].value+"0";
    }
  }
  // var minusQM = q.length;
  // q = q.substr(0,minusQM);
  var t = new Template(qid,cnt,q);
  
}

function makeList(){
    var tempList = [];
    $.ajax({
        url: '/models/DB.php',
        type: 'POST',
        datatype: 'jsonp',
        jsonp: 'callback',
        data: {
            'table':'questionTemplates',
            'function':'getTemplatesAll', 
            },
        error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log(data);
        }
    });
    $( document ).ajaxSuccess(function( event, xhr, settings ) {
        var d = settings.data;
      if ( settings.url == "/models/DB.php" && d.includes("getTemplatesAll")) {
        try{
          var templatesView = document.getElementById('templatesView')
          var results = JSON.parse(xhr.responseText);
          if(results.length>0){
            for(var i = 0;i<results.length;i++){
                var t = new Template(results[i].catID,results[i].varCnt,results[i].template,results[i].tempID);
                tempList.push(t);
                var div = t.createListGroupItem();
                templatesView.appendChild(t.createListGroupItem());
            }
          }
        }catch(e){
          console.log(e);
          console.log(xhr);
        }
      }
    });
    templates = tempList;
}

