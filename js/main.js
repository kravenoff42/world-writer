var chkArr;
var ddlArr;
var dismissArr;
var restoreArr;
var expArr;
var viewAll;
var c_list;
var q_list;
var old_q_list;
var q_after;
var panel;
var btnAddNewTemp = document.getElementById("btnAddNewTemp");
var btnNewBlank = document.getElementById("btnNewBlank");
var txtNewTemp0 = document.getElementById("txtNewTemp_0");
var newQuestionTemplate = document.getElementById("newQuestionTemplate");
var textArea;
var tinymce;
var badgeCount = 0;
var cats = new Categories();

//Placeholder data
var topics = [];
var candidateTopics = [];
var questions = [];
for(var i = 0;i<7;i++){
    var q={};
    q['questionID'] = i;
    var r = Math.random();
    if(r>0.6666){
        q['relevant'] = true;
    }else if(r<0.3333){
        q['relevant'] = false;
    }else{
        q['relevant'] = null;
    }
    q['question'] = "Who lives in <a href='#'>Narnia</a>?";
    q['words'] = [{}];
        q.words[0].word = "<a href='#'>Narnia</a>";
        q.words[0].wordID = 1;
        q.words[0].pageID = 3;
        q.words[0].catID = 2;
        q.words[0].catAbbrev = "Pla";
    questions.push(q);
}

window.onload = function(){
  //events
  if(btnNewBlank){btnNewBlank.addEventListener('click', insertBlank);}
  if(btnAddNewTemp){btnAddNewTemp.addEventListener('click', getString);}
  
  //preselect text
  var selection = window.getSelection();
  var range = document.createRange();
  if(txtNewTemp0){
    range.selectNodeContents(txtNewTemp0);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}

function periodPressed(event){
  if(event.keyCode == 190){
    analyzeText(event);
    renderCandidateTopics();
  }
}

function contentChanged(event){
  analyzeText(event);
  renderCandidateTopics();
}

function analyzeText(event){
  var frame = document.getElementById('tny_ifr');
  var body = frame.contentDocument.getElementById('tinymce');
  var text = body.innerText;
  var r = new RiString(text);
  var pos = r.pos();
  var words = r.words();
      console.log("NEW CHECK");
  candidateTopics = [];
  for(var i = 0; i <words.length;i++){
    if(pos[i]=="nnps" || pos[i]=="nnp"){
      var topicID = candidateTopics.length+1;
      candidateTopics.push(new Topic(words[i],topicID));
      console.log(words[i]);
      // console.log(pos[i]);
    }
  }
}

function insertQuestionBadge(){
  var btnList = document.getElementById('mceu_29-button');
  var i = btnList.children[0];
  var badge = document.createElement('span');
  badge.classList.add('badge');
  badge.id = "question_badge";
  badge.innerHTML = badgeCount;
  i.appendChild(badge);
}

function updateQuestionBadge(){
  var badge = document.getElementById('question_badge');
  badge.innerHTML = badgeCount;
}

function defineWord(){
  var frame = document.getElementById('tny_ifr');
  console.log("set topic")
    var text = "";
    if (window.getSelection) {
        text = frame.contentDocument.getSelection().toString();
        console.log(text);
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
        console.log(text);
    }
    console.log(text);
    topics.push(text);
    
}

function renderCandidateTopics(){
  for(var i=0;i<candidateTopics.length;i++){
    
    var tCard = candidateTopics[i].createCandidateCard(i,cats);
    if(c_list==null){ setContainers(); getElements(); console.log(c_list);  }
    window.c_list.appendChild(tCard);
    console.log(c_list);
    badgeCount++;
  }
}



function getWords(){
$.ajax({
      url: 'models/ajax-follow.php',
      type: 'post',
      data: {'action': 'follow', 'userid': '11239528343'},
      success: function(data, status) {
        if(data == "ok") {
          console.log(status);
        }
      },
      error: function(xhr, desc, err) {
        console.log(xhr);
        console.log("Details: " + desc + "\nError:" + err);
      }
    }); // end ajax call
}

tinymce.init({
  selector: '#tny',
  height: 600,
  width: 'inherit',
  theme: 'modern',
  plugins: [
    'autolink lists link charmap hr anchor pagebreak',
    'searchreplace wordcount visualchars code',
    'insertdatetime nonbreaking contextmenu directionality',
    'paste'
  ],
  browser_spellcheck: true,
  toolbar1: 'undo redo | insert | styleselect | bold italic underline | link image | newTopic',
  content_css: [
    '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
    '/css/bootstrap.min.css',
    '/css/normalize.css',
    '/css/main.css'
  ],
  
  setup: function (editor) {
    
    editor.on('change', contentChanged),
    editor.on('keyup', periodPressed),
    editor.addSidebar('mysidebar', {
      tooltip: 'My sidebar',
      icon: 'mylist',
      onrender: function (api) {
        console.log('Render panel', api.element());
        setContainers();
        onStart();
        insertQuestionBadge()
      },
      onshow: function (api) {
        console.log('Show panel', api.element());
        updateQuestionBadge()
      },
      onhide: function (api) {
        updateQuestionBadge()
        console.log('Hide panel', api.element());
      }
    });
    
  editor.addButton('newTopic', {
    text: "Set Topic",
    onclick: defineWord
  });
  
  }
  
  
 });



function insertBlank(){
  var text = txtNewTemp0.innerHTML;
  var arrVal = [["Per","Person"], ["Pla","Place"], ["Occ","Occupation"], ["Evt","Event"],["Obj", "Object"], ["Spc","Species"], ["Act","Action"], ["Ida","Idea"], ["Qlt","Quality"], ["GpO","Group-Object"], ["GpP","Group-Person"], ["GpI","Group-Idea"], ["GpE","Group-Event"]];
  var idCnt = document.querySelectorAll("select").length;
  var ddl = document.createElement("select");
  ddl.id = "ddlTempWordCat_"+idCnt;
  for(var i = 0; i<arrVal.length;i++){
    var opt = document.createElement("option");
    opt.value = arrVal[i][0];
    opt.label = arrVal[i][1];
    ddl.options.add(opt);
  }
  newQuestionTemplate.appendChild(ddl);
  var span = document.createElement("span");
  span.id = "txtNewTemp_"+(idCnt+1);
  span.setAttribute("contenteditable", true);
  span.appendChild( document.createTextNode("?"));
  newQuestionTemplate.appendChild(span);
  newQuestionTemplate.lastElementChild.focus();

}

function getString(){
  var ddls = document.querySelectorAll("select");
  var q="";
  for (var i=0;i<ddls.length+1;i++){
    var span = document.getElementById("txtNewTemp_"+i);
    q +=span.innerText;
    if(i<ddls.length){
    q +=" #"+ddls[i].selectedOptions[0].value+"# ";
    }
  }
  console.log(q);
}

function onStart(){
    getElements();
    renderQuestions();
    renderCandidateTopics();
    getElements();
    setListeners();
}

function getElements(){
    chkArr = document.querySelectorAll("[id^='chk']");
    ddlArr = document.querySelectorAll("[id^='ddlWordCat']");
    dismissArr = document.querySelectorAll("[id^='dismiss']");
    restoreArr = document.querySelectorAll("[id^='restore']");
    expArr = document.querySelectorAll("[id^='exp']");
    viewAll = document.getElementById("viewAll");
    c_list = document.getElementById("c_list");
    q_list = document.getElementById("q_list");
    old_q_list = document.getElementById("old_q_list");
    q_after = document.querySelectorAll(".q_after");
    
}

function setListeners(){
  //events
  if(chkArr){
      for(var i = 0; i<chkArr.length;i++){
        chkArr[i].addEventListener('click', setRelevance);
      }
  }
  if(dismissArr){
      for(var i = 0; i<dismissArr.length;i++){
        dismissArr[i].addEventListener('click', setRelevance);
      }
  }
   if(restoreArr){
      for(var i = 0; i<restoreArr.length;i++){
        restoreArr[i].addEventListener('click', setRelevance);
      }
  }
  if(expArr){
      for(var i = 0; i<expArr.length;i++){
        expArr[i].addEventListener('click', toggleVisible);
      }
  }
  viewAll.addEventListener('click', showAllQuestions);
}

function setRelevance(event){
    var q_elements = this.id.split('_');
    var prefix = q_elements[0];
    var qid = q_elements[1];
    if(prefix == "restore"){
        upadateQuestionRelevantState(qid,null);
    }else if(prefix == "dismiss"){
        upadateQuestionRelevantState(qid,false);
    }else if(prefix == "chk"){
        upadateQuestionRelevantState(qid,true);
    }
    var div = this.parentElement;
    var card = div.parentElement;
    card.classList.add("relevanceSet");
    updateQuestionBadge()
}

function toggleVisible(event){
    var temp = this.id.split('_');
    var id = temp[1];
    var ddl = getArrElementByID(ddlArr,id);
    if(ddl){
        if(ddl.classList.contains('hidden')){
            ddl.classList.remove('hidden');
            this.innerHTML = "expand_less";
        } else{
            ddl.classList.add('hidden');
            this.innerHTML = "expand_more";
        }
    }
    
}

function showAllQuestions(event){
    if(old_q_list){
        var h1 = this.previousElementSibling;
        if(old_q_list.classList.contains('hidden')){
            old_q_list.classList.remove('hidden');
            h1.innerHTML = "Hide Old";
            this.innerHTML = "expand_less";
        } else{
            old_q_list.classList.add('hidden');
            h1.innerHTML = "View All";
            this.innerHTML = "expand_more";
        }
    }else{
        console.log("no old list found");
    }
}

function getArrElementByID(array,id){
    for(var i =  0; i<array.length;i++){
        var temp = array[i].id.split('_');
        var tempId = temp[1];
        if(tempId==id){return array[i];}
    }
    return null;
}

function upadateQuestionRelevantState(questionID, relevant){
    //client side version dev only
    questions[questionID].relevant = relevant;
    updateQuestions();
}

function updateQuestions(){
    clearQuestions();
    renderCandidateTopics()
    renderQuestions();
    getElements();
    setListeners();
}

function renderQuestions(){
    for(var i=0;i<questions.length;i++){
        //card
        var qCard = document.createElement("li");
        if(questions[i].relevant==null){
            qCard.classList.add('question_card');
        }else{
            qCard.classList.add('old_question_card');
        }
        //chk div
        var chkDiv = document.createElement("div");
        chkDiv.classList.add('q_div');
        var chkSpan = document.createElement('span');
        chkSpan.id = "chk_"+questions[i].questionID;
        chkSpan.classList.add('clickable');
        var chkI = document.createElement('i');
        if(questions[i].relevant===true){
            chkI.innerHTML = 'check_box';
        }else{
            chkI.innerHTML = 'check_box_outline_blank';
        }
        chkI.classList.add('material-icons');
        chkSpan.appendChild(chkI);
        chkDiv.appendChild(chkSpan);
        //q div
        var qDiv = document.createElement("div");
        qDiv.classList.add('q_div');
        var qSpan = document.createElement('span');
        qSpan.id = 'qid_'+questions[i].questionID;
        qSpan.classList.add('question');
        qSpan.innerHTML = questions[i].question;
        qDiv.appendChild(qSpan);
        
        // dismiss div
        var disDiv = document.createElement("div");
        disDiv.classList.add('q_div');
        var disSpan = document.createElement('span');
        var disI = document.createElement('i');
        if(questions[i].relevant===null){
            disSpan.id = "dismiss_"+questions[i].questionID;
            disI.innerHTML = 'not_interested';
        }else{
            disSpan.id = "restore_"+questions[i].questionID;
            disI.innerHTML = 'refresh';
        }        
        disSpan.classList.add('clickable');
        disI.classList.add('material-icons');
        disSpan.appendChild(disI);
        disDiv.appendChild(disSpan);
        
        //adding everything to list
        qCard.appendChild(chkDiv);
        qCard.appendChild(qDiv);
        qCard.appendChild(disDiv);
        if(questions[i].relevant===null){
            if(q_list==null){ getElements(); console.log(q_list); }
            q_list.appendChild(qCard);
            badgeCount++;
        }else{
            if(old_q_list==null){ getElements(); console.log(old_q_list); }
            old_q_list.appendChild(qCard);
          
        }
        
    }
}

function clearQuestions(){
    c_list.innerHTML="";
    q_list.innerHTML="";
    old_q_list.innerHTML="";
    badgeCount = 0;
}

function setContainers(){
  panel = document.getElementById("mceu_35-body");
  var qCon = document.createElement('div');
  qCon.id = "q_container";
  
  //head div
  var qhead  = document.createElement('div');
  qhead.classList.add('q_head');
  var h1Tag = document.createElement('h1');
  h1Tag.innerHTML = "Suggestions";
  qhead.appendChild(h1Tag);
  
  //candidate List
  var cL = document.createElement('ul');
  cL.id = "c_list";
  
  //question list
  var qL = document.createElement('ul');
  qL.id = "q_list";
  
  //divider
  var vSpc = document.createElement('div');
  vSpc.classList.add('vertSpacer');
  var hr = document.createElement('hr');
  vSpc.appendChild(hr);
  
  //old list
  var oldQL = document.createElement('ul');
  oldQL.id = "old_q_list";
  oldQL.classList.add('hidden');
  
  //view all 
  var qafter = document.createElement('div');
  qafter.classList.add('q_after');
  var h1View = document.createElement('h1');
  h1View.innerHTML = "View All";
  var iView = document.createElement('i');
  iView.id = "viewAll";
  iView.classList.add('material-icons');
  iView.classList.add('center');
  iView.classList.add('clickable');
  iView.innerHTML = "expand_more";
  qafter.appendChild(h1View);
  qafter.appendChild(iView);
  
  //more notes
  var qfoot = document.createElement('div');
  qfoot.classList.add('q_foot');
  var pfoot = document.createElement('p');
  qfoot.appendChild(pfoot);
  
  //adding elements to div
  qCon.appendChild(qhead);
  qCon.appendChild(cL);
  qCon.appendChild(qL);
  qCon.appendChild(vSpc);
  qCon.appendChild(oldQL);
  qCon.appendChild(qafter);
  qCon.appendChild(qfoot);

  //insert into panel
  panel.appendChild(qCon);
  
}

