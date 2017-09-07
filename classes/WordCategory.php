<?php 
require (__DIR__ . "DB.php");
class WordCat { 
    //Properties
    public $catID; 
    public $catName; 
    public $catAbbrev; 

    //Constructors
    function __construct() 
    { 
        $this->$catID = null;
        $this->$catName = null;
        $this->$catAbbrev = null;
    }
    
    //Methods
    
    public function toAbbrev() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    public function toFullName() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    
} 

?>