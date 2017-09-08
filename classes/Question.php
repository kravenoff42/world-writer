<?php 
require (__DIR__ . "DB.php");
class Question { 
    //Properties
    public $questionID; 
    public $tempID; 
    public $relevant; 
    public $words = array(); 
    public $pages = array(); 
    public $question; 
    
    //Constructors
    function __construct() 
    { 
        $this->$questionID = null;
        $this->$tempID = null;
        $this->$relevant = null;
        $this->$words = null;
        $this->$pages = null;
        $this->$question = null;
    }
    
    //Methods
    public function wrapWords(){
        $wrapped = array();
        if($words!=null){
            for($i=0;$i<$words.length;$i++){
                
                $word = getWordsByID($wordID, $db);
                $page_id = $word['pageID'];
                $temp = '<a href="'.__DIR__.'/page-Render.php?page_id='.$page_id.'">'.$words[$i].'</a>';
                array_push($wrapped, $temp);
            }
        }else{
            $wrapped = null;
        }
        return $wrapped;
    }
    public function isRelevant() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    public function getWords() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    public function getQuestion() { 
        print 'Inside `aMemberFunc()`'; 
    }
    public function newQuestion(/*newWord, */) { 
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

} 
 
?>