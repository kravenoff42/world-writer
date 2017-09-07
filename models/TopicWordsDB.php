<?php 

function deleteTopicWord($wordID, $db) { 
    try {
    
        // calling stored procedure command
        $sql = 'CALL deleteTopicWord(@wordID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@wordID', $wordID, PDO::PARAM_INT);

        // execute the stored procedure
        $stmt->execute();
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return null;
} 
function getWordsAll($db) { 
    try {
        $words = array();
        // calling stored procedure command
        $sql = 'CALL getWordsAll()';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['wordID']);
            $p2 = htmlspecialchars($row['topID']);
            $p3 = htmlspecialchars($row['wordStr']);
            $p4 = htmlspecialchars($row['plural']);
            $w = new Word($p1,$p2,$p3,$p4);
            array_push($words,$w);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $words;
} 
function getWordsByID($wordID, $db) { 
    try {
        $words = array();
        // calling stored procedure command
        $sql = 'CALL getWordsByID(@wordID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@wordID', $wordID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = $wordID;
            $p2 = htmlspecialchars($row['topID']);
            $p3 = htmlspecialchars($row['wordStr']);
            $p4 = htmlspecialchars($row['plural']);
            $w = new Word($p1,$p2,$p3,$p4);
            array_push($words,$w);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $words;
} 
function getWordsByTopic($topID, $db) { 
    try {
        $words = array();
        // calling stored procedure command
        $sql = 'CALL getWordsByTopic(@topID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@topID', $topID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['wordID']);
            $p2 = $topID;
            $p3 = htmlspecialchars($row['wordStr']);
            $p4 = htmlspecialchars($row['plural']);
            $w = new Word($p1,$p2,$p3,$p4);
            array_push($words,$w);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $words;
} 
function insertWord($db) { 
    print'Inside `aMemberFunc()`'; 
} 
function updateWord($messageID, $db) { 
    print'Inside `aMemberFunc()`'; 
} 

?>