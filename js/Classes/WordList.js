function WordList(){
    this.list = [];
    this.instanceList = [];
}

WordList.prototype.setList = function(){
    window.$.ajax({
        url: '/models/DB.php',
        type: 'POST',
        datatype: 'jsonp',
        jsonp: 'callback',
        data: {
            'table':'topicWords',
            'function':'getWordsAll',
            },
         error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log(data);
         }
    });
    window.$( document ).ajaxSuccess(function( event, xhr, settings ) {
        var d = settings.data;
        if ( settings.url == "/models/DB.php"  && d.includes("getWordsAll")) {
          try{
              var results = JSON.parse(xhr.responseText);
    
              for(var i = 0;i<results.length;i++){
                //   console.log(results[i])
                  var word = new window.Word(results[i],i);
                  window.words.list.push(word);
              }
              console.log('Words.list Set');
          }catch(e){
              console.log(e);
             // console.log(xhr.responseText);
            //   var footerLog = document.getElementById('log');
            //   footerLog.innerHTML = xhr.responseText;
          }
        }
    });
};
WordList.prototype.setInstanceList = function(){
    window.$.ajax({
        url: '/models/DB.php',
        type: 'POST',
        datatype: 'jsonp',
        jsonp: 'callback',
        data: {
            'table':'questionWords',
            'function':'getQuestionWordsAll',
            },
         error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log(data);
         }
    });
    window.$( document ).ajaxSuccess(function( event, xhr, settings ) {
        var d = settings.data;
        if ( settings.url == "/models/DB.php"  && d.includes("getQuestionWordsAll")) {
          try{
              var results = JSON.parse(xhr.responseText);
    
              for(var i = 0;i<results.length;i++){
                   window.words.instanceList.push(results[i]);
              }
              console.log('Words.instanceList Set');
          }catch(e){
              console.log(e);
             // console.log(xhr.responseText);
            //   var footerLog = document.getElementById('log');
            //   footerLog.innerHTML = xhr.responseText;
          }
        }
    });
};
WordList.prototype.updateList = function(wordArr){
    for ( var i=0, len=wordArr.length; i < len; i++ ){
        if(!this.findWord(wordArr[i])){
            var index = this.list.length;
            var newWord = new window.Word(null,index,wordArr[i]);
            this.list.push(newWord);
        }
    }
};
WordList.prototype.updateInstanceList = function(wordArr,qid){
    for ( var i=0, len=wordArr.length; i < len; i++ ){
        if(!this.findWord(wordArr[i])){
            var instance = {};
            instance.wordID = wordArr[i].wordID;
            instance.questionID = qid;
            this.instanceList.push(instance);
        }
    }
};
WordList.prototype.len = function(){
    return this.list.length;
};

WordList.prototype.findWord = function(word){ 
    for(var i=0, len = this.list.length;i<len;i++){
        if(this.list[i].wordStr==word){
            
            return this.list[i];
        }
    }
    return false;
};
WordList.prototype.getWord = function(wordID){ 
    for(var i=0, len = this.list.length;i<len;i++){
        if(this.list[i].wordID==wordID){
            
            return this.list[i];
        }
    }
    return false;
};
