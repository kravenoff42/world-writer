var chkArr;
var ddlArr;
var dismissArr;
var restoreArr;
var expArr;
var viewAll;
var c_list;
var c_listDDLs;
var c_listBtns;
var q_list;
var old_q_list;
var q_after;
var panel;
var pageListItems;
var pageListRadios =[];
var btnSavePage;
var currPage;
var loaded = false;
var lnkLoad;
var lnkSave;
var footerLog;
var panelRendered;
var templatesView;

var tinymce;
var badgeCount = 0;
var cats;
var topics;
var words;
var questions;
var templates;

window.onload = function(){
  //caching data
  cats = new window.Categories();
  cats.setList();
  templates = new window.TempList();
  templates.setList();
  words = new window.WordList();
  words.setList();
  
  panelRendered = false;
  pageListItems = document.querySelectorAll(".pageList");
  if(pageListItems){
    for(var i = 0; i<pageListItems.length;i++){
      pageListItems[i].addEventListener('click', toggleRadio);
      pageListRadios.push(pageListItems[i].firstElementChild);
    }
  }
  btnSavePage = document.getElementById('btnSavePage');
  if(btnSavePage){
  btnSavePage.addEventListener('click', savePage);
  }
  if(currPage){
    var temp = currPage;
    currPage = new window.Page(temp);
  }else{
    currPage = new window.Page();
  }
  topics = new window.TopicsList(currPage.pageID);
  topics.setList();
  questions = new window.QuestionList();
  questions.setList();

  lnkLoad = document.getElementById('lnkLoad');
  if(lnkLoad){
  lnkLoad.addEventListener('click', updatePageList);
  }
  lnkSave = document.getElementById('lnkSave');
  if(lnkSave){
  lnkSave.addEventListener('click', updateSaveModal);
  }
};

function updatePageList(){
  
}

function updateSaveModal(){
  currPage = new window.Page();
  currPage.getNewInfo();
  var lblTitle = document.getElementById('lblPageTitleSave');
  lblTitle.innerHTML = currPage.pageTitle;
}

function savePage(event){
  currPage = new window.Page();
  currPage.getNewInfo();
  if(loaded){
    currPage.updatePage();
  }else{
    currPage.insertPage();
    topics.insertNewTopics();
  }
}

function periodPressed(event){
  if(event.keyCode == 190){
    analyzeText(event);
  }
}

function contentChanged(event){
  clearQuestions();
  renderPanel();
  analyzeText(event);
  getElements();
  setListeners();
}
function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}
function analyzeText(event){
  var frame = document.getElementById('tny_ifr');
  var body = frame.contentDocument.getElementById('tinymce');
  var text = body.innerText;
  var r = new window.RiString(text);
  var pos = r.pos();
  var words = r.words();
      console.log("NEW CHECK");
  var wList = [];
  for(var i = 0; i <words.length;i++){
    if(pos[i]=="nnps" || pos[i]=="nnp"){
      wList.push(words[i]);
    }
  }
  var newList = uniq(wList);
  //topics.setList();
  topics.updateList(newList);
  updateTopicsList();
  updateBadgeCount();
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

function updateBadgeCount(){
  var badge = document.getElementById('question_badge');
  var qCon = document.getElementById('q_container');
  badgeCount = qCon.querySelectorAll("li").length;
  badge.innerHTML = badgeCount;
}

function defineWord(){
  var frame = document.getElementById('tny_ifr');
  // console.log("set topic")
    var text = "";
    if (window.getSelection) {
        text = frame.contentDocument.getSelection().toString();
        // console.log(text);
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
        // console.log(text);
    }
    // console.log(text);
    var newList =[text];
    topics.updateList(newList);
    updateTopicsList();
    updateBadgeCount();
}

// function renderCandidateTopics(){
//   getElements();
//   if(topics){
//     var candidates = topics.getCandidates();
//     if(candidates.length>0){
//       topics.renderTopicCards();
//     }
//   }
// }

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
        setContainers();
        onStart();
        insertQuestionBadge();
      }//,
      // onshow: function (api) {
      //   updateBadgeCount();
      // },
      // onhide: function (api) {
      //   updateBadgeCount();
      // }
    });

  editor.addButton('newTopic', {
    text: "Set Topic",
    onclick: defineWord
  });
  }
 });

function renderPanel(){
    getElements();
  if(!panelRendered){
    var btn = document.getElementById('mceu_29-button');
    btn.click();
    btn.click();
  }
}

function onStart(){
    renderPanel();
    updateQuestionsList();
    updateTopicsList();
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
    c_listDDLs = document.querySelectorAll(".wordCatSelect");
    c_listBtns = document.querySelectorAll(".tCardBtn");
  }

function setListeners(){
      getElements();
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
  if(c_listDDLs){
      for(var i = 0; i<c_listDDLs.length;i++){
        c_listDDLs[i].addEventListener('change', toggleCatConfirm);
      }
  }
  if(c_listBtns){
      for(var i = 0; i<c_listBtns.length;i++){
        c_listBtns[i].addEventListener('click', setTopicRelevance);
      }
  }
  
  viewAll.addEventListener('click', showAllQuestions);
}

function toggleRadio(event){
  var label = this;
  // console.log(label);
  var radio = label.firstElementChild;
  // console.log(radio);
  radio.checked = true;
  // console.log(radio);
  
}

function toggleCatConfirm(event){
  var id = this.id.split("_")[1];
  var confirm = document.getElementById('confirmT_'+id);
  if(this.selectedOptions[0].value!="NaN"){
    confirm.classList.remove('hidden');
  }else{
    confirm.classList.add('hidden');
  }
}

function setRelevance(event){
  //TODO move upadateQuestionRelevantState to Question Class
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
    updateBadgeCount();
}

function setTopicRelevance(event){
    var t_elements = this.id.split('_');
    var prefix = t_elements[0];
    var wid = t_elements[1];
    console.log(wid);
    var ddl = document.getElementById('ddlWordCat_'+wid);
    var selected = ddl.selectedOptions[0].value;
    console.log(selected);
    var cat = null;
    if(selected!="Top"){
      cat = cats.toID(selected);
    }
    var word = document.getElementById('wid_'+wid).innerHTML;
    
    var newTopic = topics.findTopic(word);
    var rel;
    var newWord;
    if(!newTopic){return;}
    
    if(prefix == "confirmT"){
      if(selected=="Top"){
        newWord = new window.Word(null,null,newTopic.topTitle);
        topics.removeTopic(newTopic);
        toggleTopicSelect(newWord);
        return;
      }
      rel = true;
    }else if(prefix == "dismissT"){
      rel = false;
    }
    topics.list[wid].catID = cat;
    topics.list[wid].relevant = rel;
    topics.list[wid].insertTopic();
    // newWord.insertWord();
    updateTopicsList();
    
    //card.classList.add("relevanceSet");
    updateBadgeCount();
}

function toggleTopicSelect(){
  
}

function updateTopicsList(word){
  if(c_list==null){ setContainers(); getElements(); console.log(c_list);  }
  window.c_list.innerHTML = "";
  if(!word){word=false;}
  topics.renderTopicCards(word);
  setListeners();
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
    updateTopicsList();
    updateQuestionsList();
    getElements();
    setListeners();
}

function updateQuestionsList(){
    getElements();
    for(var i=0;i<questions.length;i++){
        //card
        var qCard = questions[i].createQuestionCard();
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
  if(c_list){
    c_list.innerHTML="";
  }
  if(q_list){
    q_list.innerHTML="";
  }
  if(old_q_list){
    old_q_list.innerHTML="";
  }
  if(badgeCount!=0){
    badgeCount = 0;
  }
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

