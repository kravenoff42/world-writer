<?php 
require (__DIR__ . "DB.php");

class User { 
    //Properties
    public $userID; 
    public $userFName; 
    public $userLName; 
    public $userUName;
    public $userBio;
    public $userAvatar;
    public $userEmail;
    public $userHashP;
    public $admin;
    public $valid;
    public $userProjects = array();
    public $userFavs = array();
    
    //Constructors
    function __construct() 
    { 
        echo('__construct with new Word'); 
    }
    
    //Methods

    public function isLoggedIn() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    public function changePass() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    public function editProfile() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    public function getFullName() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    public function getProjects() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    public function getFavorites() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    public function deleteAccount() { 
        print 'Inside `aMemberFunc()`'; 
    } 
    public function isAdmin() { 
        print 'Inside `aMemberFunc()`'; 
    }
    public function hashPass() { 
        print 'Inside `aMemberFunc()`'; 
    }

} 

?>