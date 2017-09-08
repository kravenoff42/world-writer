
function Topic(){ 
    //Properties
    this.topID; 
    this.catID; 
    this.topTitle; 
    this.relevant;
    this.words = [];
    this.pageID; 
    this.pageTitle; 
    this.projID; 
    this.content;
    this.dateCreated;
    this.pageNum;
    this.lastModified;

    
}
//Construct helpers
Topic.prototype.fromTopic = function(){ 
    // print 'Inside `aMemberFunc()`';
} 
Topic.prototype.fromPage = function(){ 
    // print 'Inside `aMemberFunc()`';
} 
Topic.prototype.fromWord = function(){ 
    // print 'Inside `aMemberFunc()`';
} 

//Methods
Topic.prototype.isRelevant = function(){ 
    // print 'Inside `aMemberFunc()`';
} 
Topic.prototype.getWords = function(){ 
    // print 'Inside `aMemberFunc()`'; 
} 
Topic.prototype.getTitle = function(){ 
    // print 'Inside `aMemberFunc()`'; 
} 
Topic.prototype.getCategory = function(){ 
    // print 'Inside `aMemberFunc()`'; 
} 
Topic.prototype.changeTitle = function(){ 
    // print 'Inside `aMemberFunc()`'; 
} 
Topic.prototype.getPage = function(){ 
    // print 'Inside `aMemberFunc()`'; 
} 
Topic.prototype.getPageLink = function(){ 
    // print 'Inside `aMemberFunc()`'; 
} 
Topic.prototype.getEmbededLinks = function(){ 
    // print 'Inside `aMemberFunc()`'; 
}
Topic.prototype.createCandidateCard = function(topicList){ 
    //card
    var tCard = document.createElement("li");
    // if(topicList[i].relevant==null){
    //     qCard.classList.add('topic_card');
    // }else{
    //     qCard.classList.add('old_question_card');
    // }
    
    tCard.classList.add('topic_card');

    //t div
    var qDiv = document.createElement("div");
    qDiv.classList.add('q_div');
    var qSpan = document.createElement('span');
    qSpan.id = 'tid_'+topicList[i].topicID;
    qSpan.classList.add('question');
    qSpan.innerHTML = topicList[i];
    qDiv.appendChild(qSpan);
    
    //select div
    var ddlDiv = document.createElement("div");
    ddlDiv.id = "ddlWordCat_"+topicList[i].topicID;
    ddlDiv.classList.add('hidden');
    var ddl = document.createElement("select");
    
    for(var j = 0; j<arrVal.length;j++){
        var opt = document.createElement("option");
        opt.value = arrVal[j][0];
        opt.label = arrVal[j][1];
        if(topicList[i].words[0].catAbbrev==arrVal[j][0]){
            opt.selected = true;
        }
        ddl.options.add(opt);
    }
    ddlDiv.appendChild(ddl);
    
    // dismiss div
    var disDiv = document.createElement("div");
    disDiv.classList.add('q_div');
    var disSpan = document.createElement('span');
    var disI = document.createElement('i');
    disSpan.id = "dismissT_"+topicList[i].topicID;
    disI.innerHTML = 'not_interested';
    disSpan.classList.add('clickable');
    disI.classList.add('material-icons');
    disSpan.appendChild(disI);
    disDiv.appendChild(disSpan);
    
    //adding everything to list
    tCard.appendChild(qDiv);
    tCard.appendChild(ddlDiv);
    tCard.appendChild(disDiv);
    if(!c_list){ getElements(); console.log(c_list); }
    c_list.appendChild(tCard);
    badgeCount++;
    // if(topicList[i].relevant===null){
    //     if(!q_list){ getElements(); console.log(q_list); }
    //     q_list.appendChild(qCard);
    //     badgeCount++;
    // }else{
    //     if(!old_q_list){ getElements(); console.log(old_q_list); }
    //     old_q_list.appendChild(qCard);
      
    // }
}
  

