function Question(questionFromDB,question,tempID,relevant,questionID) { 
    //Properties
    this.questionID = null;
    this.tempID = null;
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
        if(questionID){
            this.questionID = questionID; 
        }
        if(tempID){
            this.tempID = tempID; 
        }
        if(relevant){
            this.relevant = relevant; 
        }
    }
}


 //Methods
Question.prototype.isRelevant = function() { 
    if(this.revelant){
        return true;
    }else{
        return false;
    }
} 
Question.prototype.getWords = function() { 
    if(!(this.questionID)) { return false;}
    $.ajax({
        url: '/models/DB.php',
        type: 'POST',
        datatype: 'jsonp',
        jsonp: 'callback',
        data: {
            'table':'questionWords',
            'function':'getWordByQuestion', 
            'questionID':this.questionID
            },
         error: function(data){
            alert("oh No something when wrong with saving the data");
            console.log(data)
         }
    });
    $( document ).ajaxSuccess(function( event, xhr, settings ) {
        if ( settings.url == "/models/DB.php"  && d.includes("getWordByQuestion") ) {
        var results = JSON.parse(xhr.responseText);
            for(var i = 0;i<results.length;i++){
                var word = new Word(results[i]);
                this.words = [];
                this.words.push(word);
            }
        }
    });
} 
Question.prototype.buildQuestion = function(templates) {
    if(!(this.questionID)) { return false;}
    var tString
    for(var i = 0; i < templates.length;i++){
        if(this.tempID==templates[i].tempID){
            tString = templates[i].template;
        }
    }
    qArray = tString.split("0");
    var wordCnt=0;
    for(var j = 1;j<qArray.length;j+=2){
        qArray[j] = this.words[wordCnt].wordStr;
    }
    this.question = qArray.join("");
}

Question.prototype.newQuestion = function(/*newWord, */) { 
/*
if(wordFound){
    var cat = findCat(newWord);
    var validTemps = getTemplatesByCat(cat);
    var temp = chooseRandom(temps);
    var words = [];
    words.push(newWord);
    if(temp.varCnt > 1){
        var cats = getRemainingCats(temp);
        for(var i = 0; i<cats.length; i++){
            var validTopics = getTopicsByCat(cats[i]);
            if(!validTopics){return false;}
            var topic = chooseRandom(topics);
            words.push(topic.title);
        }
    }
    var question = buildTemp(temp,words)
}
*/
}
/*
function findCat(wordStr){
    rita logic
    or
    Ask user (maybe Alert?)
}

function getRemainingCats(strTemplate){
    var catIDs = [];
    var cats = sliceAbbrevs(strTemplate);
    for(var i = 0; i<cats.length; i++){
        var catID = getCategoryByAbbrev(cats[i]);
        catIDs.push(catID);
    }
    return catIDs;
}
function getTopicsByCat(catAbbev)
function chooseRandom(array)
function buildTemp(strTemplate, arrWords)
function sliceAbbrevs()
function getCategoryByAbbrev(){
    
}*/


Question.prototype.createQuestionCard = function() { 
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
    chkSpan.id = "chk_"+this.questionID;
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
    qSpan.id = 'qid_'+this.questionID;
    qSpan.classList.add('question');
    qSpan.innerHTML = this.question;
    qDiv.appendChild(qSpan);
    
    // dismiss div
    var disDiv = document.createElement("div");
    disDiv.classList.add('q_div');
    var disSpan = document.createElement('span');
    var disI = document.createElement('i');
    if(this.relevant===null){
        disSpan.id = "dismiss_"+this.questionID;
        disI.innerHTML = 'not_interested';
    }else{
        disSpan.id = "restore_"+this.questionID;
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
    
    return qcard;
}
