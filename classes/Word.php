<?php 
require (__DIR__ . "DB.php");
class Word { 
    //Properties
    public $wordID; 
    public $topID; 
    public $wordStr; 
    public $catID; 
    public $plural; 
    public $main; 
    public $pages = array(); 
    
    //Constructors
    function __construct() 
    { 
        $this->$wordID = null;
        $this->$topID = null;
        $this->$wordStr = null;
        $this->$catID = null;
        $this->$plural = null;
        $this->$main = null;
        $this->$pages = null;
    }
    
    //Methods
    
    public function getPages() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    public function isMain() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    public function getCatagory() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    public function changeString() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    public function deleteWord() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    public function isPlural() { 
        print 'Inside `aMemberFunc()`'; 
    } 

} 

?>