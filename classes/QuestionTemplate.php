<?php 
require (__DIR__ . "DB.php");
class QuestionTeamplate { 
    //Properties
    public $tempID; 
    public $template; 
    public $catID; 
    public $varCnt;

    //Constructors
    function __construct() 
    { 
        $this->$tempID = null;
        $this->$template = null;
        $this->$catID = null;
        $this->$varCnt = null;
    }
    
    //Methods
    
    public function aMemberFunc() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    
} 

?>