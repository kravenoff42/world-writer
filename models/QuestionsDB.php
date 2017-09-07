<?php 

function deleteQuestion($questionID, $db) { 
    try {
    
        // calling stored procedure command
        $sql = 'CALL deleteQuestion(@questionID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@questionID', $questionID, PDO::PARAM_INT);

        // execute the stored procedure
        $stmt->execute();
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return null;
} 
function getQuestionsAll($db) { 
    try {
        $questions = array();
        // calling stored procedure command
        $sql = 'CALL getQuestionsAll()';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['questionID']);
            $p2 = htmlspecialchars($row['tempID']);
            $p3 = htmlspecialchars($row['relevant']);
            $q = new Question($p1,$p2,$p3);
            array_push($questions,$q);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $questions;
} 
function getQuestionsByID($questionID, $db) { 
    try {
        $questions = array();
        // calling stored procedure command
        $sql = 'CALL getQuestionsByID(@questionID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@questionID', $questionID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = $questionID;
            $p2 = htmlspecialchars($row['tempID']);
            $p3 = htmlspecialchars($row['relevant']);
            $q = new Question($p1,$p2,$p3);
            array_push($questions,$q);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $questions;
} 
function getQuestionsByTemplate($tempID, $db) { 
    try {
        $questions = array();
        // calling stored procedure command
        $sql = 'CALL getQuestionsByTemplate(@tempID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@tempID', $tempID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['questionID']);
            $p2 = $tempID;
            $p3 = htmlspecialchars($row['relevant']);
            $q = new Question($p1,$p2,$p3);
            array_push($questions,$q);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $questions;
} 
function getRelevantQuestions($db) { 
    try {
        $questions = array();
        // calling stored procedure command
        $sql = 'CALL getRelevantQuestions()';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['questionID']);
            $p2 = htmlspecialchars($row['tempID']);
            $p3 = true;
            $q = new Question($p1,$p2,$p3);
            array_push($questions,$q);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $questions;
} 
function insertQuestion($tempID, $relevant, $db) { 
    print'Inside `aMemberFunc()`'; 
} 
function updateQuestion($questionID, $tempID, $relevant, $db) { 
    print'Inside `aMemberFunc()`'; 
} 
function updateQuestionRelevantState($questionID, $relevant, $db) { 
    print'Inside `aMemberFunc()`'; 
} 

use Google\Cloud\Language\LanguageClient;
use Google\Cloud\Language\Annotation;

function analyze_entities($text, $projectId = "world-writer-nouns")
{
    // Create the Natural Language client
    $language = new LanguageClient([
        'projectId' => $projectId,
    ]);
    // Call the analyzeEntities function
    $annotation = $language->analyzeEntities($text);
    return $annotation;
}

?>