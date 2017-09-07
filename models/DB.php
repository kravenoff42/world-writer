<?php 
//declaring db vars
// $dsn = "mysql:host=localhost;port=5500;dbname=se265sum17group2";
$user = "db_writer";
$pass = "se265";
$devDB = "mysql:host=localhost;dbname=se265sum17group2";
//try creating DB object
try{
    $db = new PDO($devDB, $user, $pass);
    //set Error modes
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){
    //if error is trown kill process and display error message
    die("Error occured while accessing Database");
    //   vv Use This vv -if you don't know what the errors are
    //die("Error: " . $e["message"]);
}

require (__DIR__ . 'FavoritesDB.php');
require (__DIR__ . 'MassagesDB.php');
require (__DIR__ . 'PagesDB.php');
require (__DIR__ . 'ProjectsDB.php');
require (__DIR__ . 'QuestionsDB.php');
require (__DIR__ . 'QuestionTemplatesDB.php');
require (__DIR__ . 'QuestionsWordsDB.php');
require (__DIR__ . 'TopicssDB.php');
require (__DIR__ . 'TopicWordsDB.php');
require (__DIR__ . 'UsersDB.php');
require (__DIR__ . 'WordCategoriesDB.php');
require (__DIR__ . 'WordInstanceDB.php');

?>