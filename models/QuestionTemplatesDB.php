<?php 

function getTemplateByCategory($catID, $db) { 
    try {
        $templates = array();
        // calling stored procedure command
        $sql = "CALL getTemplateByCategory(:catID)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':catID', $catID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            array_push($templates,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($templates);
} 
function getTemplateByTopic($topID, $db) { 
    try {
        $templates = array();
        // calling stored procedure command
        $sql = "CALL getTemplateByTopic(:topID)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':topID', $topID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            array_push($templates,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($templates);
} 
function getTemplatesAll($db) { 
    try {
        $templates = array();
        // calling stored procedure command
        $sql = "CALL getTemplatesAll()";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            array_push($templates,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($templates);
    
} 
function insertTemplate($catID,  $varCnt, $template, $db) { 
    try {
        $templates = array();
        // calling stored procedure command
        $sql = "CALL insertTemplate(:catID,:varCnt ,:template)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':catID', $catID, PDO::PARAM_INT);
        $stmt->bindParam(':varCnt', $varCnt, PDO::PARAM_INT);
        $stmt->bindParam(':template', $template, PDO::PARAM_STR);
        
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            array_push($templates,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($templates);
} 

?>