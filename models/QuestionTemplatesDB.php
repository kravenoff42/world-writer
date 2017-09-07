<?php 

function deleteTemplate($tempID, $db) { 
    try {
    
        // calling stored procedure command
        $sql = 'CALL deleteTemplate(@tempID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@tempID', $tempID, PDO::PARAM_INT);

        // execute the stored procedure
        $stmt->execute();
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return null;
} 
function getTemplateByCategory($catID, $db) { 
    try {
        $templates = array();
        // calling stored procedure command
        $sql = 'CALL getTemplateByCategory(@catID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@catID', $catID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['tempID']);
            $p2 = $catID;
            $p3 = htmlspecialchars($row['template']);
            $p4 = htmlspecialchars($row['varCnt']);
            $t = new Template($p1,$p2,$p3,$p4);
            array_push($templates,$t);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $templates;
} 
function getTemplateByCount($varCnt, $db) { 
    try {
        $templates = array();
        // calling stored procedure command
        $sql = 'CALL getTemplateByID(@varCnt)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@varCnt', $varCnt, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['tempID']);
            $p2 = htmlspecialchars($row['catID']);
            $p3 = htmlspecialchars($row['template']);
            $p4 = $varCnt;
            $t = new Template($p1,$p2,$p3,$p4);
            array_push($templates,$t);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $templates;
} 
function getTemplateByID($tempID, $db) { 
    try {
        $templates = array();
        // calling stored procedure command
        $sql = 'CALL getTemplateByID(@tempID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@tempID', $tempID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = $tempID;
            $p2 = htmlspecialchars($row['catID']);
            $p3 = htmlspecialchars($row['template']);
            $p4 = htmlspecialchars($row['varCnt']);
            $t = new Template($p1,$p2,$p3,$p4);
            array_push($templates,$t);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $templates;
} 
function getTemplatesAll($db) { 
    try {
        $templates = array();
        // calling stored procedure command
        $sql = 'CALL getTemplatesAll()';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['tempID']);
            $p2 = htmlspecialchars($row['catID']);
            $p3 = htmlspecialchars($row['template']);
            $p4 = htmlspecialchars($row['varCnt']);
            $t = new Template($p1,$p2,$p3,$p4);
            array_push($templates,$t);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $templates;
} 
function insertTemplate($catID, $template, $varCnt, $db) { 
    print'Inside `aMemberFunc()`'; 
} 
function updateTemplate($tempID, $catID, $template, $varCnt, $db) { 
    print'Inside `aMemberFunc()`'; 
} 

?>