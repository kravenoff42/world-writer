
function Topic(topicFromDB,topTitle,catID,relevant,topID){ 
    //Properties
    this.topID = null;
    this.catID = null; 
    this.topTitle = null; 
    this.relevant = null;
    this.words = [];
    if(topicFromDB){
        if(topicFromDB.topID){
            this.topID = topicFromDB.topID;
        }
        if(topicFromDB.catID){
            this.catID = topicFromDB.catID; 
        }
        if(topicFromDB.topTitle){
            this.topTitle = topicFromDB.topTitle; 
        }
        if(topicFromDB.relevant){
            this.relevant = topicFromDB.relevant;
        }
    }else{
        if(topID){
            this.topID = topID;
        }
        if(catID){
            this.catID = catID; 
        }
        if(topTitle){
            this.topTitle = topTitle; 
        }
        if(relevant){
            this.relevant = relevant;
        }
    }

    this.words = [];
    //this.content;
}

//Methods
 
Topic.prototype.insertNewTopic = function(){ 
    $.ajax({
        url: '/models/DB.php',
        type: 'POST',
        jsonp: 'callback',
        data: {
            'table':'wordCategories',
            'function':'insertCategory', 
            'topTitle': this.topTitle,
            'catID': this.catID,
            'relevant':this.relevant
        },
        error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log(data);
        }
    });
    $( document ).ajaxSuccess(function( event, xhr, settings ) {
        var d = settings.data;
      if ( settings.url == "/models/DB.php"  && d.includes("insertCategory")) {
          try{
          var results = JSON.parse(xhr.responseText);
        $( ".log" ).text( "Respnse: CatID = " +
           results[0]["LAST_INSERT_ID()"]);
          }catch(e){
              console.log(e);
              console.log(xhr.responseText);
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

// Topic.prototype.createCandidateCard = function(i, cats){ 
//     //card
//     var tCard = document.createElement("li");
    
//     tCard.classList.add('topic_card');

//     //t div
//     var qDiv = document.createElement("div");
//     qDiv.classList.add('q_div');
//     var qSpan = document.createElement('span');
//     qSpan.id = 'tid_'+i;
//     qSpan.classList.add('topic');
//     qSpan.innerHTML = this.topTitle;
//     qDiv.appendChild(qSpan);
    
//     //select div
//     var ddlDiv = document.createElement("div");
//     ddlDiv.classList.add('q_div');
//     var ddl = cats.createDDL(i);
//     ddlDiv.appendChild(ddl);
    
//     // dismiss div
//     var disDiv = document.createElement("div");
//     disDiv.classList.add('q_div');
//     var disSpan = document.createElement('span');
//     var disI = document.createElement('i');
//     disSpan.id = "dismissT_"+i;
//     disI.innerHTML = 'not_interested';
//     disSpan.classList.add('clickable');
//     disI.classList.add('material-icons');
//     disSpan.appendChild(disI);
//     disDiv.appendChild(disSpan);
    
//     //adding everything to list
//     tCard.appendChild(qDiv);
//     tCard.appendChild(ddlDiv);
//     tCard.appendChild(disDiv);
    
//     return tCard;
// }
  

