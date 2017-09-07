<?php 
require (__DIR__ . "DB.php");
class Message { 
    //Properties
    public $messageID; 
    public $email; 
    public $userID; 
    public $subject;
    public $message;
    public $dateSubmitted;

    //Constructors
    function __construct() 
    { 
        $this->$messageID = null; 
        $this->$email = null; 
        $this->$userID = null; 
        $this->$subject = null; 
        $this->$message = null; 
        $this->$dateSubmitted = null; 
    }
    
    //Methods
    
    public function aMemberFunc() { 
        print 'Inside `aMemberFunc()`'; 
    } 
} 

?>