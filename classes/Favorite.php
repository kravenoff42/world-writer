<?php 
require (__DIR__ . "DB.php");
class Favorite { 
    //Properties
    public $projID; 
    public $userID; 
    
    //Constructors
    function __construct() 
    { 
        $this->$projID = null; 
        $this->$userID = null;
        
    }
    function __construct1($p,$u) 
    { 
        $this->$projID = $p; 
        $this->$userID = $u; 
    }
    
    //Methods
    
    public function aMemberFunc() { 
        print 'Inside `aMemberFunc()`'; 
    } 
} 

?>