
function Topic(topTitle,topID){ 
    //Properties
    this.topID;
    if(topID){
        this.topID= topID;
    }
    this.catID; 
    this.topTitle = topTitle; 
    this.relevant;
    this.words = [];
    this.content;
}

//Methods
Topic.prototype.isRelevant = function(){ 
    // print 'Inside `aMemberFunc()`';
} 
Topic.prototype.insertNewTopic = function(){ 
    $.ajax({
        url: '/models/TopicsDB.php',
        data: {'function':'insertTopic', 
        'params':{
            'catID':this.catID ,
            'topTitle':this.topTitle,
            'relevant':this.relevant,
            'content':this.content
         }
        }
    });
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
Topic.prototype.setContent = function(content){ 
    this.content = content;
}
Topic.prototype.saveContent = function(){ 
    
} 
Topic.prototype.changeTitle = function(){ 
    // print 'Inside `aMemberFunc()`'; 
} 

Topic.prototype.createCandidateCard = function(i, cats){ 
    //card
    var tCard = document.createElement("li");
    
    tCard.classList.add('topic_card');

    //t div
    var qDiv = document.createElement("div");
    qDiv.classList.add('q_div');
    var qSpan = document.createElement('span');
    qSpan.id = 'tid_'+i;
    qSpan.classList.add('topic');
    qSpan.innerHTML = this.topTitle;
    qDiv.appendChild(qSpan);
    
    //select div
    var ddlDiv = document.createElement("div");
    ddlDiv.classList.add('q_div');
    var ddl = cats.createDDL(i);
    ddlDiv.appendChild(ddl);
    
    // dismiss div
    var disDiv = document.createElement("div");
    disDiv.classList.add('q_div');
    var disSpan = document.createElement('span');
    var disI = document.createElement('i');
    disSpan.id = "dismissT_"+i;
    disI.innerHTML = 'not_interested';
    disSpan.classList.add('clickable');
    disI.classList.add('material-icons');
    disSpan.appendChild(disI);
    disDiv.appendChild(disSpan);
    
    //adding everything to list
    tCard.appendChild(qDiv);
    tCard.appendChild(ddlDiv);
    tCard.appendChild(disDiv);
    
    return tCard;
}
  

