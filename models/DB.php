<?php 
//declaring db vars
// $dsn = "mysql:host=localhost;port=5500;dbname=se265sum17group2";
$user = "db_writer";
$pass = "se265";
// $user = "kravenoff42";
// $pass = "";
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
    include (__DIR__ . '/WordCategoriesDB.php');
    include (__DIR__ . '/TopicWordsDB.php');
    include (__DIR__ . '/TopicsDB.php');
    include (__DIR__ . '/QuestionWordsDB.php');
    include (__DIR__ . '/QuestionTemplatesDB.php');
    include (__DIR__ . '/QuestionsDB.php');

if(isset($_POST['table'])){$table = $_POST['table'];}
switch($table){
    case "questions":
        if(isset($_POST['function'])){$function = $_POST['function'];}
        
        if(isset($_POST['questionID'])){$questionID = $_POST['questionID'];}
        if(isset($_POST['tempID'])){$tempID = $_POST['tempID'];}
        if(isset($_POST['relevant'])){$relevant = $_POST['relevant'];}
        
        switch($function){
            case 'deleteQuestion':
                deleteQuestion($questionID, $db);
                break;
            case 'getQuestionsAll':
                getQuestionsAll($db);
                break;
            case 'getQuestionsByID':
                getQuestionsByID($questionID, $db);
                break;
            case 'getQuestionsByTemplate':
                getQuestionsByTemplate($tempID, $db);
                break;
            case 'getRelevantQuestions':
                getRelevantQuestions($db);
                break;
            case 'insertQuestion':
                insertQuestion($tempID, $relevant, $db);
                break;
            case 'updateQuestion':
                updateQuestion($questionID, $tempID, $relevant, $db);
                break;
            case 'updateQuestionRelevantState':
                updateQuestionRelevantState($questionID, $relevant, $db);
                break;
        }
        break;
    case "questionTemplates":
        if(isset($_POST['function'])){$function = $_POST['function'];}
        
        if(isset($_POST['tempID'])){$tempID = $_POST['tempID'];}
        if(isset($_POST['catID'])){$catID = $_POST['catID'];}
        if(isset($_POST['varCnt'])){$varCnt = $_POST['varCnt'];}
        if(isset($_POST['template'])){$template = $_POST['template'];}
        
        switch($function){
            case 'deleteTemplate':
                deleteTemplate($tempID, $db);
                break;
            case 'getTemplateByCategory':
                getTemplateByCategory($catID, $db);
                break;
            case 'getTemplateByCount':
                getTemplateByCount($varCnt, $db);
                break;
            case 'getTemplateByID':
                 getTemplateByID($tempID, $db);
                break;
            case 'getTemplatesAll':
                getTemplatesAll($db);
                break;
            case 'insertTemplate':
                insertTemplate($catID, $varCnt, $template, $db);
                break;
            case 'updateTemplate':
                updateTemplate($tempID, $catID, $varCnt, $template, $db);
                break;
        }
        break;
    case "questionWords":
        if(isset($_POST['function'])){$function = $_POST['function'];}
        
        if(isset($_POST['questionID'])){$questionID = $_POST['questionID'];}
        if(isset($_POST['wordID'])){$wordID = $_POST['wordID'];}
        if(isset($_POST['wordPosition'])){$wordPosition = $_POST['wordPosition'];}
        
        switch($function){
            case 'deleteQuestionWord':
                deleteQuestionWord($questionID, $wordID, $db);
                break;
            case 'getQuestionWordsAll':
                getQuestionWordsAll($db);
                break;
            case 'getQuestionsByWord':
                getQuestionsByWord($wordID, $db) ;
                break;
            case 'getWordByQuestion':
                getWordByQuestion($questionID, $db);
                break;
            case 'insertQuestionWord':
                insertQuestionWord($questionID, $wordID, $wordPosition, $db);
                break;
            case 'updateQuestionWord':
                updateQuestionWord($questionID, $wordID, $wordPosition, $db);
                break;
        }
        break;
    case "topics":
        if(isset($_POST['function'])){$function = $_POST['function'];}
        
        if(isset($_POST['topID'])){$topID = $_POST['topID'];}
        if(isset($_POST['catID'])){$catID = $_POST['catID'];}
        if(isset($_POST['topTitle'])){$topTitle = $_POST['topTitle'];}
        if(isset($_POST['relevant'])){$relevant = $_POST['relevant'];}
        
        switch($function){
            case 'deleteTopic':
                deleteTopic($topID, $db);
                break;
            case 'getTopicsAll':
                getTopicsAll($db);
                break;
            case 'getTopicsByID':
                getTopicsByID($topID, $db);
                break;
            case 'getTopicsByCategory':
                getTopicsByCategory($catID, $db);
                break;
            case 'getRelevantTopics':
                getRelevantTopics($db);
                break;
            case 'insertTopic':
                insertTopic($catID, $topTitle, $relevant, $db);
                break;
            case 'updateTopic':
                updateTopic($topID,$catID, $topTitle, $relevant, $db);
                break;
            case 'updateTopicRelevantState':
                updateTopicRelevantState($topID, $relevant, $db);
                break;
        }
        break;
    case "topicWords":
        if(isset($_POST['function'])){$function = $_POST['function'];}
        
        if(isset($_POST['wordID'])){$wordID = $_POST['wordID'];}
        if(isset($_POST['topID'])){$topID = $_POST['topID'];}
        if(isset($_POST['wordStr'])){$wordStr = $_POST['wordStr'];}
        if(isset($_POST['plural'])){$catAbbrev = $_POST['plural'];}
        
        switch($function){
            case 'deleteTopicWord':
                deleteTopicWord($wordID, $db);
                break;
            case 'getWordsAll':
                getWordsAll($db);
                break;
            case 'getWordsByID':
                getWordsByID($wordID, $db);
                break;
            case 'getWordsByTopic':
                getWordsByTopic($topID, $db);
                break;
            case 'insertWord':
                insertWord($topID, $wordStr, $plural, $db);
                break;
            case 'updateWord':
                updateWord($wordID, $topID, $wordStr, $plural, $db);
                break;
        }
        break;
    case "wordCategories":
            if(isset($_POST['function'])){$function = $_POST['function'];}
            else {die("Post Err: No function");}
            
            if(isset($_POST['catID'])){$catID = $_POST['catID'];}
            if(isset($_POST['catName'])){$catName = $_POST['catName'];}
            if(isset($_POST['catAbbrev'])){$catAbbrev = $_POST['catAbbrev'];}

            switch($function){
                case 'deleteCategory':
                    deleteCategory($catID, $db);
                    break;
                case 'getCategoriesAll':
                    getCategoriesAll($db);
                    break;
                case 'getCategoriesByAbbrev':
                    getCategoriesByAbbrev($catAbbrev, $db);
                    break;
                case 'getCategoriesByID':
                    getCategoriesByID($catID, $db);
                    break;
                case 'insertCategory':
                    insertCategory($catName, $catAbbrev, $db);
                    break;
                case 'updateCategory':
                    updateCategory($catID, $catName, $catAbbrev, $db);
                    break;
            }
        break;
}


?>