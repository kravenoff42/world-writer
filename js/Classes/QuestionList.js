function QuestionList(pageID){
    this.list = [];
    this.pageID = null;
    if(pageID){
        //console.log('pageID set')
        this.pageID = pageID;
    }
}

QuestionList.prototype.getQuestionsAll = function(){
    window.$.ajax({
        url: '/models/DB.php',
        type: 'POST',
        datatype: 'jsonp',
        jsonp: 'callback',
        data: {
            'table':'questions',
            'function':'getQuestionsAll' 
            },
         error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log(data);
         }
    });
    window.$( document ).ajaxSuccess(function( event, xhr, settings ) {
      if ( settings.url == "/models/DB.php" ) {
          var results = JSON.parse(xhr.responseText);
          console.log(results);
        
      }
    });
};
QuestionList.prototype.buildQuestions = function(){
    for(var i=0,len = this.len();i<len;i++){
        if(this.list[i].relevant!==false){
            this.list[i].buildQuestion();
        }
    }
};
QuestionList.prototype.len = function(){
    return this.list.length;
};
QuestionList.prototype.setList = function(){
    if(!this.pageID){console.log('no pageID!');return;}
    window.$.ajax({
        url: '/models/DB.php',
        type: 'POST',
        datatype: 'jsonp',
        jsonp: 'callback',
        data: {
            'table':'questions',
            'function':'getQuestionsByPage',
            'pageID': this.pageID
            },
         error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log(data);
         }
    });
    window.$( document ).ajaxSuccess(function( event, xhr, settings ) {
        var d = settings.data;
      if ( settings.url == "/models/DB.php"  && d.includes("getQuestionsByPage")) {
            try{
                var results = JSON.parse(xhr.responseText);
                for(var i = 0;i<results.length;i++){
                    console.log(results[i]);
                    var question = new window.Question(results[i],i);
                    window.questions.list.push(question);
                }
                console.log('questions.list Set');
                window.questions.buildQuestions();
            }catch(e){
                console.log(e);
                var footerLog = document.getElementById('log');
                footerLog.innerHTML = xhr.responseText;
            }
      }
    });
};
QuestionList.prototype.findQuestion = function(question){ 
    for(var i=0, len = this.list.length;i<len;i++){
        if(this.list[i].question==question){
            
            return this.list[i];
        }
    }
    return false;
};
QuestionList.prototype.updateList = function(qlist){
    for ( var i=0, len=qlist.length; i < len; i++ ){
        if(!this.findWord(qlist[i])){
            var index = this.list.length;
            var newQuestion = new window.Question(null,index,qlist[i]);
            this.list.push(newQuestion);
        }
    }
};
QuestionList.prototype.getCandidates = function(){
    var array = [];
    
    for(var i=0,len = this.len();i<len;i++){
        if(this.list[i].relevant===null){
            array.push(this.list[i]);
        }
    }
    return array;
};
QuestionList.prototype.getOldQuestions = function(){
    var array = [];
    for(var i=0,len = this.len();i<len;i++){
        if(this.list[i].relevant!==null){
            array.push(this.list[i]);
        }
    }
    return array;
};
QuestionList.prototype.renderCandidatesQuestionCards = function(){
    var candidates = this.getCandidates();
    var len = candidates.length;
    console.log(candidates);
    console.log(this.list);
    for(var i=0;i<4 && i<len;i++){
        var rq = Math.floor(Math.random()*(len-1));
        var ques = candidates[rq];
        var qCard = ques.createQuestionCard();
        if(window.q_list==null){ window.setContainers(); window.getElements(); console.log(window.q_list);  }
        window.q_list.appendChild(qCard);
    }
};
QuestionList.prototype.renderOldQuestionCards = function(){
    var oldQuestions = this.getOldQuestions();
    var len = oldQuestions.length;
    console.log(oldQuestions);
    console.log(this.list);
    for(var i=0; i<len;i++){
        var qCard = oldQuestions[i].createQuestionCard();
        if(window.old_q_list==null){ window.setContainers(); window.getElements(); console.log(window.old_q_list);  }
        window.old_q_list.appendChild(qCard);
    }
};

QuestionList.prototype.newQuestion = function() { 
    console.log('STARTING NEW Q');
    var validTopics = window.topics.getRelevant();
    if(validTopics.length<1){console.log('No Valid Topics'); return;}
    console.log(validTopics);
    var rt = Math.floor(Math.random()*(validTopics.length-1));
    var chosenTopic = validTopics[rt];
    if(!chosenTopic){console.log('Cant Choose Topic'); return;}
    console.log(chosenTopic);
    var rw = Math.floor(Math.random()*(chosenTopic.words.length-1));
    var chosenWord = chosenTopic.words[rw];
    console.log(chosenWord);
    chosenTopic.getValidTemps();
    var rtp = Math.floor(Math.random()*(chosenTopic.validTemps.length-1));
    var chosenTemplate = chosenTopic.validTemps[rtp];
    var templateWords=[];
    templateWords.push(chosenWord);
    if(chosenTemplate.varCnt>1){
        chosenTemplate.getAdditionalCats();
        for(var i = 0, len = chosenTemplate.additionalCats.length;i>len;i++){
            var topicsByCat = window.topics.getTopicsByCat(chosenTemplate.additionalCats[i]);
            rt = Math.floor(Math.random()*(topicsByCat.length-1));
            var additionalTopic = topicsByCat[rt];
            rw = Math.floor(Math.random()*(additionalTopic.words.length-1));
            templateWords.push(additionalTopic.words[rw]);
        }
    }
    var tString = chosenTemplate.template;
    console.log(tString);
    var qArray = tString.split("0");
    var wordCnt=0;
    for(var j = 1;j<qArray.length;j+=2){
        qArray[j] = templateWords[wordCnt].wordStr;
        wordCnt++;
    }
    console.log(qArray);
    
    var newQuestionStr = qArray.join("");
    console.log(newQuestionStr);
    var index = this.list.length;
    var newQuestion = new window.Question(null,index,newQuestionStr,chosenTemplate.tempID,chosenTemplate.template,chosenTemplate.template.varCnt);
    console.log(newQuestion);
    this.list.push(newQuestion);
    this.list[index].insertQuestion();
};
QuestionList.prototype.updateQuestion = function(index,rel){
    this.list[index].relevant = rel;
    
}