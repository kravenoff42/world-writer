function Topic(topicFromDB,index,topTitle,catID,pageID,relevant,topID){ 
    //Properties
    this.index = index;
    this.topID = null;
    this.catID = null; 
    this.pageID = null; 
    this.topTitle = null; 
    this.relevant = null;
    this.words = [];
    this.validTemps = [];
    if(topicFromDB){
        if(topicFromDB.topID){
            this.topID = topicFromDB.topID;
        }
        if(topicFromDB.pageID){
            this.pageID = topicFromDB.pageID; 
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
        if(pageID){
            this.pageID = pageID; 
        }
        if(catID){
            this.catID = catID; 
        }
        if(topTitle){
            this.topTitle = topTitle;
            var i = this.words.length;
            this.words.push( new window.Word(null,i,topTitle));
        }
        if(relevant!=undefined && relevant != null){
            this.relevant = relevant;
        }
    }
}

//Methods
 
Topic.prototype.insertTopic = function(){
    window.$.ajax({
        url: '/models/DB.php',
        type: 'POST',
        jsonp: 'callback',
        data: {
            'table':'topics',
            'function':'insertTopic', 
            'topTitle': this.topTitle,
            'catID': this.catID,
            'relevant':this.relevant,
            'pageID':this.pageID
        },
        index:this.index,
        error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log(data);
        }
    });
    window.$( document ).ajaxSuccess(function( event, xhr, settings ) {
        var d = settings.data;
        var i = settings.index;
      if ( settings.url == "/models/DB.php"  && d.includes("insertTopic")) {
          try{
            var results = JSON.parse(xhr.responseText);
            var id = results[0]['LAST_INSERT_ID()'];
            window.topics.list[i].topID = id;
            console.log(window.topics.list[i]);
            window.topics.list[i].updateWords();
            console.log('Topic Inserted');
          }catch(e){
              console.log(e);
              console.log(xhr.responseText);
          }
      }
    });
};
Topic.prototype.getValidTemps = function(){
    if(!(this.catID && window.templates)) { return false;}
    var len = window.templates.list.length;
    var tempArr =[];
    for(var i = 0; i <len;i++){
        if(window.templates.list[i].catID == this.catID){
            tempArr.push(window.templates.list[i]);
        }
    }
    this.validTemps = tempArr;
    // $.ajax({
    //     url: '/models/DB.php',
    //     type: 'POST',
    //     datatype: 'jsonp',
    //     jsonp: 'callback',
    //     data: {
    //         'table':'templates',
    //         'function':'getTemplateByCategory', 
    //         'catID':this.catID
    //         },
    //      error: function(data){
    //         alert("oh No something when wrong with saving the data");
    //         console.log(data)
    //      }
    // });
    // $( document ).ajaxSuccess(function( event, xhr, settings ) {
    //     if ( settings.url == "/models/DB.php"  && d.includes("getTemplateByCategory") ) {
    //     var results = JSON.parse(xhr.responseText);
    //         for(var i = 0;i<results.length;i++){
    //             var temp = new Template(results[i]);
    //             this.validTemps = [];
    //             this.validTemps.push(temp);
    //         }
    //     }
    // });
};
Topic.prototype.updateWords = function(){ 
    if(!(this.topID && this.words)) { return false;}
    var len = this.words.length;
    for(var i = 0; i <len;i++){
        if(window.words.topID != this.topID){
            this.words[i].topID = this.topID;
        }
    }
}
Topic.prototype.getWords = function(){ 
    if(!(this.topID && window.words)) { return false;}
    var len = window.words.list.length;
    var tempList = [];
    for(var i = 0; i <len;i++){
        if(window.words.list[i].topID == this.topID){
            tempList.push(window.words.list[i]);
        }
    }
    this.words = tempList; 
    // $.ajax({
    //     url: '/models/DB.php',
    //     type: 'POST',
    //     datatype: 'jsonp',
    //     jsonp: 'callback',
    //     data: {
    //         'table':'topicWords',
    //         'function':'getWordsByTopic',
    //         'pageID': this.topID
    //         },
    //      error: function(data){
    //         alert("oh No something when wrong with saving the data");
    //         console.log(data)
    //      }
    // });
    // $( document ).ajaxSuccess(function( event, xhr, settings ) {
    //     var d = settings.data;
    //     if ( settings.url == "/models/DB.php"  && d.includes("getWordsByTopic")) {
    //       try{
    //           var results = JSON.parse(xhr.responseText);
    
    //           for(var i = 0;i<results.length;i++){
    //             //   console.log(results[i])
    //               var word = new Word(results[i]);
    //               tempList.push(word);
    //           }
    //       }catch(e){
    //           console.log(e);
    //          // console.log(xhr.responseText);
    //         //   var footerLog = document.getElementById('log');
    //         //   footerLog.innerHTML = xhr.responseText;
    //       }
    //     }
    // });
    // this.words = tempList; 
} ;
Topic.prototype.findWord = function(word){ 
    for(var i=0, len = this.words.length;i<len;i++){
        if(this.words[i].wordStr==word){
            
            var found = this.words.splice(i,1);
            console.log(found);
            var newArray =[found];
            newArray.concat(this.words);
            console.log(this.words);
            this.words = newArray;
            console.log(this.words);
            return true;
        }
    }
    return false;
};
Topic.prototype.changeTitle = function(wordStr){ 
    var wordFound = this.findWord(wordStr);
    // if(wordFound){
        this.topTitle = wordFound.wordStr;
    // }
} ;
Topic.prototype.generateTopicItem = function(){
    //Label
    var tLabel = document.createElement('label');
    tLabel.classList.add('pageList');
    
    //radio button
    var tRadio = document.createElement('input');
    tRadio.id = "radio_"+this.topTitle;
    tRadio.classList.add('radios');
    tRadio.setAttribute('type','radio');
    tRadio.setAttribute('name','selectTopicID');
    tRadio.value = this.topTitle;
    
    //list group Item
    var tItem = document.createElement('a');
    tItem.setAttribute('href','#');
    tItem.classList.add('list-group-item');
    
    //item Heading
    var tHead = document.createElement('h4');
    tHead.classList.add('list-group-item-heading');
    tHead.innerHTML = "Topic: "+ this.topTitle;
    tItem.appendChild(tHead);
    
    //item text
    var tText = document.createElement('p');
    tText.classList.add('list-group-item-text');
    tText.innerHTML = "Topic: "+ this.topTitle;
    tItem.appendChild(tText);
    
    //append elements
    
    tLabel.appendChild(tRadio);
    tLabel.appendChild(tItem);
    
    return tLabel;
}  ;

