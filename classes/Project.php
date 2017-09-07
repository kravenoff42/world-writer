<?php 
require (__DIR__ . "DB.php");
class Project { 
    //Properties
    public $projID; 
    public $ownerID; 
    public $projTitle; 
    public $public;
    public $favorties = array();

    //Constructors
    function __construct() 
    { 
        $this->$projID = null; 
        $this->$ownerID = null; 
        $this->$projTitle = null; 
        $this->$public = null; 
        $this->$favorties = null; 
    }
    
    //Methods
    
    public function isFaved() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    public function isPublic() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    
} 

?>