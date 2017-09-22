<?php 
function getTopicsByPage($pageID, $db) {
    try {
        $topics = array();
        // calling stored procedure command
        $sql = "CALL getTopicsByPage(:pageID)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':pageID', $pageID, PDO::PARAM_INT);
    
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
function insertTopic($catID, $topTitle, $relevant, $pageID, $db) { 
    try {
        $topics = array();
        // calling stored procedure command
        $sql = "CALL insertTopic(:topTitle ,:catID,:relevant,:pageID)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':catID', $catID, PDO::PARAM_INT);
        $stmt->bindParam(':topTitle', $topTitle);
        $stmt->bindParam(':relevant', $relevant);
        $stmt->bindParam(':pageID', $pageID, PDO::PARAM_INT);
        

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
function updateTopic($topID,$catID, $topTitle, $relevant, $pageID, $db) { 
    try {
        $topics = array();
        // calling stored procedure command
        $sql = "CALL updateTopic(:topID, :topTitle ,:catID,:relevant,:pageID)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':topID', $topID, PDO::PARAM_INT);
        $stmt->bindParam(':catID', $catID, PDO::PARAM_INT);
        $stmt->bindParam(':topTitle', $topTitle);
        $stmt->bindParam(':relevant', $relevant);
        $stmt->bindParam(':pageID', $pageID, PDO::PARAM_INT);

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
        $stmt->bindParam(':relevant', $relevant);
        
        //echo var_dump($catName, $catAbbrev, $db);
        // execute the stored procedure
        $stmt->execute();

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
} 

?>