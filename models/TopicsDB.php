<?php 

function deleteTopic($topID, $db) { 
    try {
    
        // calling stored procedure command
        $sql = "CALL deleteTopic(:topID)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':topID', $topID, PDO::PARAM_INT);

        // execute the stored procedure
        $stmt->execute();
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
} 
function getTopicsAll($db) { 
    try {
        $topics = array();
        // calling stored procedure command
        $sql = "CALL getTopicsAll()";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            array_push($topics,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($topics);
} 
function getTopicsByID($topID, $db) {
    try {
        $topics = array();
        // calling stored procedure command
        $sql = "CALL getTopicsByID(:topID)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':topID', $topID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            array_push($topics,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($topics);
} 
function getTopicsByCategory($catID, $db) { 
    try {
        $topics = array();
        // calling stored procedure command
        $sql = "CALL getTopicsByCategory(:catID)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':catID', $catID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            array_push($topics,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($topics);
} 
function getRelevantTopics($db) { 
    try {
        $topics = array();
        // calling stored procedure command
        $sql = "CALL getRelevantTopics()";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            array_push($topics,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($topics);
} 
function insertTopic($catID, $topTitle, $relevant, $db) { 
    try {
        $topics = array();
        // calling stored procedure command
        $sql = "CALL insertTopic(:catID ,:topTitle,:relevant)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':catID', $catID, PDO::PARAM_INT);
        $stmt->bindParam(':topTitle', $topTitle);
        $stmt->bindParam(':relevant', $relevant, PDO::PARAM_INT);
        
        //echo var_dump($catName, $catAbbrev, $db);
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            array_push($topics,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($topics);
} 
function updateTopic($topID,$catID, $topTitle, $relevant, $db) { 
    try {
        $topics = array();
        // calling stored procedure command
        $sql = "CALL updateTopic(:topID, :catID ,:topTitle,:relevant)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':topID', $topID, PDO::PARAM_INT);
        $stmt->bindParam(':catID', $catID, PDO::PARAM_INT);
        $stmt->bindParam(':topTitle', $topTitle);
        $stmt->bindParam(':relevant', $relevant, PDO::PARAM_INT);
        
        //echo var_dump($catName, $catAbbrev, $db);
        // execute the stored procedure
        $stmt->execute();

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
} 
function updateTopicRelevantState($topID, $relevant, $db) { 
    try {
        $topics = array();
        // calling stored procedure command
        $sql = "CALL updateTopicRelevantState(:topID,:relevant)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':topID', $topID, PDO::PARAM_INT);
        $stmt->bindParam(':relevant', $relevant, PDO::PARAM_INT);
        
        //echo var_dump($catName, $catAbbrev, $db);
        // execute the stored procedure
        $stmt->execute();

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
} 

?>