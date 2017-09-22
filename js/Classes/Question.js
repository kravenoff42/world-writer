function Question(questionFromDB,index,question,tempID,template,varCnt,relevant,questionID) { 
    //Properties
    this.index = index;
    this.questionID = null;
    this.tempID = null;
    this.template = null;
    this.varCnt = null;
    this.relevant = null;
    this.words = []; 
    this.question = null;
    if(questionFromDB){
        if(questionFromDB.questionID){
            this.questionID = questionFromDB.questionID; 
        }
        if(questionFromDB.tempID){
            this.tempID = questionFromDB.tempID; 
        }
        if(questionFromDB.relevant){
            this.relevant = questionFromDB.relevant; 
        }
    }else{
        if(question){
            this.question = question; 
        }
        if(questionID){
            this.questionID = questionID; 
        }
        if(tempID){
            this.tempID = tempID; 
        }
        if(template){
            this.template = template; 
        }
        if(varCnt){
            this.varCnt = varCnt; 
        }
        if(relevant){
            this.relevant = relevant; 
        }
    }
}


 //Methods

Question.prototype.getWords = function() { 
    if(!(this.questionID && window.words)) { return false;}
    var len = window.words.instanceList.length;
    var tempList = [];
    for(var i = 0; i <len;i++){
        if(window.words.instanceList[i].questionID == this.questionID){
            var id = window.words.instanceList[i].wordID;
            if(window.words.list[i].getWord(id)){
                tempList.push(window.words.list[i].getWord(id));
            }
        }
    }
    this.words = tempList; 
    // if(!(this.questionID)) { return false;}
    // $.ajax({
    //     url: '/models/DB.php',
    //     type: 'POST',
    //     datatype: 'jsonp',
    //     jsonp: 'callback',
    //     data: {
    //         'table':'questionWords',
    //         'function':'getWordByQuestion', 
    //         'questionID':this.questionID
    //         },
    //      error: function(data){
    //         alert("oh No something when wrong with saving the data");
    //         console.log(data)
    //      }
    // });
    // $( document ).ajaxSuccess(function( event, xhr, settings ) {
    //     if ( settings.url == "/models/DB.php"  && d.includes("getWordByQuestion") ) {
    //     var results = JSON.parse(xhr.responseText);
    //         for(var i = 0;i<results.length;i++){
    //             var word = new Word(results[i]);
    //             this.words = [];
    //             this.words.push(word);
    //         }
    //     }
    // });
};
Question.prototype.insertQuestion = function(){ 
    if(!(this.topTitle && this.catID && this.relevant && this.pageID)) { return false;}
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
        error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log(data);
        }
    });
    window.$( document ).ajaxSuccess(function( event, xhr, settings ) {
        var d = settings.data;
      if ( settings.url == "/models/DB.php"  && d.includes("insertTopic")) {
          try{
            var results = JSON.parse(xhr.responseText);
            var id = results[0]['LAST_INSERT_ID()'];
            this.questionID = id;
            window.words.updateInstanceList(this.words,this.questionID);
            //return id;
          }catch(e){
              console.log(e);
              console.log(xhr.responseText);
          }
      }
    });
};
Question.prototype.getTemplate = function() { 
    if(!(this.tempID && window.templates)) { return false;}
    var len = window.templates.list.length;
    for(var i = 0; i <len;i++){
        if(window.templates.list[i].tempID == this.tempID){
            this.template = window.templates.list[i].template;
            this.varCnt = window.templates.list[i].varCnt;
        }
    }
 
};
Question.prototype.buildQuestion = function() {
    if(!this.questionID ) { return false;}
    this.getTemplate();
    var tString = this.template;
    var qArray = tString.split("0");
    var wordCnt=0;
    for(var j = 1;j<qArray.length;j+=2){
        qArray[j] = this.words[wordCnt].wordStr;
        wordCnt++;
    }
    this.question = qArray.join("");
};




Question.prototype.createQuestionCard = function(i) { 
    var qCard = document.createElement("li");
    if(this.relevant==null){
        qCard.classList.add('question_card');
    }else{
        qCard.classList.add('old_question_card');
    }
    //chk div
    var chkDiv = document.createElement("div");
    chkDiv.classList.add('q_div');
    var chkSpan = document.createElement('span');
    chkSpan.id = "chk_"+i;
    chkSpan.classList.add('clickable');
    var chkI = document.createElement('i');
    if(this.relevant===true){
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
    qSpan.id = 'qid_'+i;
    qSpan.classList.add('question');
    qSpan.innerHTML = this.question;
    qDiv.appendChild(qSpan);
    
    // dismiss div
    var disDiv = document.createElement("div");
    disDiv.classList.add('q_div');
    var disSpan = document.createElement('span');
    var disI = document.createElement('i');
    if(this.relevant===null){
        disSpan.id = "dismiss_"+i;
        disI.innerHTML = 'not_interested';
    }else{
        disSpan.id = "restore_"+i;
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
    
    return qCard;
};
