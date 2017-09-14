<?php 

function deleteTopicWord($wordID, $db) { 
    try {
    
        // calling stored procedure command
        $sql = "CALL deleteTopicWord(:wordID)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':wordID', $wordID, PDO::PARAM_INT);

        // execute the stored procedure
        $stmt->execute();
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
} 
function getWordsAll($db) { 
    try {
        $words = array();
        // calling stored procedure command
        $sql = "CALL getWordsAll()";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            array_push($words,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($words);
} 
function getWordsByID($wordID, $db) { 
    try {
        $words = array();
        // calling stored procedure command
        $sql = "CALL getWordsByID(:wordID)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':wordID', $wordID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            array_push($words,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($words);
} 
function getWordsByTopic($topID, $db) { 
    try {
        $words = array();
        // calling stored procedure command
        $sql = "CALL getWordsByTopic(:topID)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':topID', $topID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            array_push($words,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($words);
} 
function insertWord($topID, $wordStr, $plural, $db) { 
    try {
        $words = array();
        // calling stored procedure command
        $sql = "CALL insertWord(:topID ,:wordStr,:plural)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':topID', $topID, PDO::PARAM_INT);
        $stmt->bindParam(':wordStr', $wordStr);
        $stmt->bindParam(':plural', $plural, PDO::PARAM_INT);
        
        //echo var_dump($catName, $catAbbrev, $db);
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            array_push($words,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($words);
} 
function updateWord($wordID, $topID, $wordStr, $plural, $db) { 
    try {
        $words = array();
        // calling stored procedure command
        $sql = "CALL updateWord(:wordID, :topID ,:wordStr,:plural)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':wordID', $wordID, PDO::PARAM_INT);
        $stmt->bindParam(':topID', $topID, PDO::PARAM_INT);
        $stmt->bindParam(':wordStr', $wordStr);
        $stmt->bindParam(':plural', $plural, PDO::PARAM_INT);
        
        //echo var_dump($catName, $catAbbrev, $db);
        // execute the stored procedure
        $stmt->execute();

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
} 

?>