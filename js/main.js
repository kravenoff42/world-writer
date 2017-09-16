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

var textArea;
var tinymce;
var badgeCount = 0;
var cats = new Categories();

//Placeholder data
var topics = [];
var candidateTopics = [];
var questions = [];
//making fake data
for(var i = 0;i<7;i++){
    var q = new Question();
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
        var qCard = questions[i].createQuestionCard()
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

