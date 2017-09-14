function Question() { 
    //Properties
    this.questionID; 
    this.tempID; 
    this.relevant; 
    this.words = []; 
    this.pages = []; 
    this.question; 
    
    

} 
 //Methods
Question.prototype.wrapWords = function(){
    var wrapped = [];
    if(words!=null){
        for(var i=0; i<words.length;i++){
            
            var word = getWordsByID(wordID, db);
            var page_id = word.pageID;
            var temp = '<a href="'+__DIR__+'/page-Render.php?page_id='+page_id+'">'+words[i]+'</a>';
            wrapped.push(temp);
        }
    }else{
        wrapped = null;
    }
    return wrapped;
}
Question.prototype.isRelevant = function() { 
    // print 'Inside `aMemberFunc()`'; 
} 
Question.prototype.getWords = function() { 
    // print 'Inside `aMemberFunc()`'; 
} 
Question.prototype.getQuestion = function() { 
    // print 'Inside `aMemberFunc()`'; 
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
function getTemplatesByCat(catID){
    sql query
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
    
}
*/

Question.prototype.createQuestionCard = function() { 
}
