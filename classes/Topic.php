<?php 
require (__DIR__ . "DB.php");
class Topic { 
    //Properties
    public $topID; 
    public $catID; 
    public $topTitle; 
    public $relevant;
    public $words = array();
    public $pageID; 
    public $pageTitle; 
    public $projID; 
    public $content;
    public $dateCreated;
    public $pageNum;
    public $lastModified;

    //Constructors
    function __construct() 
    { 
        $this->$topID = null;
        $this->$catID = null;
        $this->$topTitle = null;
        $this->$relevant = null;
        $this->$words = null;
        $this->$pageID = null;
        $this->$pageTitle = null;
        $this->$projID = null;
        $this->$content = null;
        $this->$dateCreated = null;
        $this->$pageNum = null;
        $this->$lastModified = null;
    }
    
    //Construct helpers
    public function fromTopic() { 
        print 'Inside `aMemberFunc()`';
    } 
    public function fromPage() { 
        print 'Inside `aMemberFunc()`';
    } 
    public function fromWord() { 
        print 'Inside `aMemberFunc()`';
    } 
    
    //Methods
    public function isRelevant() { 
        print 'Inside `aMemberFunc()`';
    } 
    public function getWords() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    public function getTitle() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    public function getCategory() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    public function changeTitle() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    public function getPage() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    public function getPageLink() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    public function getEmbededLinks() { 
        print 'Inside `aMemberFunc()`'; 
    } 
  
} 

?>