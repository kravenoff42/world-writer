<?php 
require (__DIR__ . "DB.php");
class QuestionWord { 
    //Properties
    public $questionID; 
    public $wordID; 
    public $wordPosition; 

    //Constructors
    function __construct() 
    { 
        $this->$questionID = null;
        $this->$wordID = null;
        $this->$wordPosition = null;
    }

    //Methods
    
    public function aMemberFunc() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    
} 

?>