function TopicsList(pageID){
    this.list = [];
    this.pageID = null;
    if(pageID){
        //console.log('pageID set')
        this.pageID = pageID;
    }
}

TopicsList.prototype.setList = function(){
    if(!this.pageID) { return false;}
    var tempList = [];
    window.$.ajax({
        url: '/models/DB.php',
        type: 'POST',
        datatype: 'jsonp',
        jsonp: 'callback',
        data: {
            'table':'topics',
            'function':'getTopicsByPage',
            'pageID': this.pageID
            },
         error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log(data);
         }
    });
    window.$( document ).ajaxSuccess(function( event, xhr, settings ) {
        var d = settings.data;
        if ( settings.url == "/models/DB.php"  && d.includes("getTopicsByPage")) {
          try{
              var results = JSON.parse(xhr.responseText);
    
              for(var i = 0;i<results.length;i++){
                //   console.log(results[i])
                  var topic = new window.Topics(results[i]);
                  tempList.push(topic);
              }
          }catch(e){
              console.log(e);
             // console.log(xhr.responseText);
            //   var footerLog = document.getElementById('log');
            //   footerLog.innerHTML = xhr.responseText;
          }
        }
    });
    this.list = tempList;
};
TopicsList.prototype.updateList = function(wordArr){
    for ( var i=0, len=wordArr.length; i < len; i++ ){
        if(!this.findTopic(wordArr[i])){
            var newTopic = new window.Topic(null,wordArr[i],this.pageID);
            this.list.push(newTopic);
        }
    }
};
TopicsList.prototype.findTopic = function(word){
    for(var i=0, len = this.len();i<len;i++){
        if(this.list[i].topTitle==word || this.list[i].findWord(word)){
            return this.list[i];
        }
    }
    return false;
};
TopicsList.prototype.hasFromDB = function(){
    for(var i=0,len = this.len();i<len;i++){
        if(this.list[i].wordID){
            return true;
        }
    }
    return false;
};

TopicsList.prototype.len = function(){
    return this.list.length;
};
TopicsList.prototype.renderTopicCards = function(addedTopic){
    var first = false;
    if(addedTopic){first = true;}
    var candidates = this.getCandidates();
    var len = candidates.length;
    // console.log(candidates);
    // console.log(this.list);
    var tCard;
    for(var i=0;i<4 && i<len;i++){
        if(first){
            tCard = addedTopic.words[0].createCandidateCard(index);
            first = false;
        }else{
            var rt = Math.floor(Math.random()*(len-1));
            var top = candidates[rt][1];
            var rw = Math.floor(Math.random()*(top.words.length-1));
            var index = candidates[rt][0];
            console.log(top);

            console.log(top.words[rw]);
            tCard = top.words[rw].createCandidateCard(index);
        }
        if(window.c_list==null){ window.setContainers(); window.getElements(); console.log(window.c_list);  }
        window.c_list.appendChild(tCard);
    }
};
TopicsList.prototype.addTopic = function(word){
    //console.log(this.findTopic(word));
    var newTop = new window.Topic(null,word,this.pageID);
    if(!this.findTopic(word)){
        this.list.push(newTop);
    }else{
        newTop = this.findTopic(word);
    }
    return newTop;
};
TopicsList.prototype.getCandidates = function(){
    var array = [];
    
    for(var i=0,len = this.len();i<len;i++){
        if(this.list[i].relevant===null){
            array.push([i,this.list[i]]);
        }
    }
    return array;
};
TopicsList.prototype.getTopicsByCat = function(catID){
    var array = [];
    for(var i=0,len = this.len();i<len;i++){
        if(this.list[i].catID===catID){
            array.push([i,this.list[i]]);
        }
    }
    return array;
};
TopicsList.prototype.getRelevant = function(){
    var array = [];
    
    for(var i=0,len = this.len();i<len;i++){
        if(this.list[i].relevant===true){
            array.push([i,this.list[i]]);
        }
    }
    return array;
};
TopicsList.prototype.removeTopic = function(t){
    for(var i=0,len = this.len();i<len;i++){
        if(this.list[i].topTitle===t.topTitle){
            this.list.splice(i,1);
        }
    }
    return false;
};
TopicsList.prototype.fillTopicsModel = function(){
    var listGroup = document.getElementById('mdlTopicsGroup');
    for(var i=0,len = this.len();i<len;i++){
        var tLabel = this.list[i].generateTopicItem();
        listGroup.appendChild(tLabel);
    }
};
TopicsList.prototype.getTopicWords = function(){
    var array = [];
    for(var i=0,len = this.len();i<len;i++){
        this.list[i].getWords();
    }
    return array;
};
TopicsList.prototype.insertNewTopics = function(pid){
    for(var i=0,len = this.len();i<len;i++){
        if(this.list[i].pageID==null){
            this.list[i].pageID = pid;
            this.list[i].insertTopic();
        }
    }
};
