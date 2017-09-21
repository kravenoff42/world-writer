function TopicsList(pageID){
    this.list = [];
    this.pageID = null;
    if(pageID){
        console.log('pageID set')
        this.pageID = pageID;
    }
}

TopicsList.prototype.setList = function(){
    var tempList = [];
    $.ajax({
        url: '/models/DB.php',
        type: 'POST',
        datatype: 'jsonp',
        jsonp: 'callback',
        data: {
            'table':'topicWords',
            'function':'getWordsByPage',
            'pageID': this.pageID
            },
         error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log(data)
         }
    });
    $( document ).ajaxSuccess(function( event, xhr, settings ) {
        var d = settings.data;
        if ( settings.url == "/models/DB.php"  && d.includes("getTemplatesAll")) {
          try{
              var results = JSON.parse(xhr.responseText);
    
              for(var i = 0;i<results.length;i++){
                //   console.log(results[i])
                  var word = new Word(results[i]);
                  tempList.push(word);
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
}
TopicsList.prototype.updateList = function(wordArr){
    // if(this.hasFromDB()){
        for ( var i=0, len=wordArr.length; i < len; i++ ){
            if(!this.findWord(wordArr[i])){
                var w = new Word(null,wordArr[i]);
                this.list.push(w);
            }
        }
    // }
}
TopicsList.prototype.findWord = function(word){
    for(var i=0, len = this.len();i<len;i++){
        if(this.list[i].wordStr==word){
            return this.list[i];
        }
    }
    return false;
}
TopicsList.prototype.hasFromDB = function(){
    for(var i=0,len = this.len();i<len;i++){
        if(this.list[i].wordID){
            return true;
        }
    }
    return false;
}

TopicsList.prototype.len = function(){
    return this.list.length;
}
TopicsList.prototype.renderTopicCards = function(addedWord){
    var first = false;
    if(addedWord){first = true;}
    for(var i=0;i<4 &&i<this.len();i++){
        if(first){
            var tCard = addedWord.createCandidateCard(i,cats);
            first = false;
        }else{
            var r = Math.floor(Math.random()*(this.list.length-1));
            var tCard = this.list[r].createCandidateCard(i,cats);
        }
        if(c_list==null){ setContainers(); getElements(); console.log(c_list);  }
        window.c_list.appendChild(tCard);
        //console.log(c_list);
        badgeCount++;
    }
}
TopicsList.prototype.addWord = function(word){
    console.log(this.findWord(word));
    var w = new Word(null,word);
    if(!this.findWord(word)){
        this.list.push(w);
    }else{
        w = this.findWord(word);
    }
    if(c_list==null){ setContainers(); getElements(); console.log(c_list);  }
    window.c_list.innerHTML = "";
    this.renderTopicCards(w);
}
