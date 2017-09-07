<?php 

function deleteTopic($topID, $db) { 
    try {
    
        // calling stored procedure command
        $sql = 'CALL deleteTopic(@topID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@topID', $topID, PDO::PARAM_INT);

        // execute the stored procedure
        $stmt->execute();
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return null;
} 
function getTopicsAll($db) { 
    try {
        $topics = array();
        // calling stored procedure command
        $sql = 'CALL getTopicsAll()';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['topID']);
            $p2 = htmlspecialchars($row['catID']);
            $p3 = htmlspecialchars($row['topTitle']);
            $p4 = htmlspecialchars($row['relevant']);
            $t = Topic::fromTopic($p1,$p2,$p3,$p4);
            array_push($topics,$t);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $topics;
} 
function getTopicsByID($topID, $db) { 
    try {
        $topics = array();
        // calling stored procedure command
        $sql = 'CALL getTopicsByID(@topID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@topID', $topID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = $topID;
            $p2 = htmlspecialchars($row['catID']);
            $p3 = htmlspecialchars($row['topTitle']);
            $p4 = htmlspecialchars($row['relevant']);
            $t = Topic::fromTopic($p1,$p2,$p3,$p4);
            array_push($topics,$t);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $topics;
} 
function getTopicsByCategory($catID, $db) { 
    try {
        $topics = array();
        // calling stored procedure command
        $sql = 'CALL getTopicsByCategory(@catID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@catID', $catID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['topID']);
            $p2 = $catID;
            $p3 = htmlspecialchars($row['topTitle']);
            $p4 = htmlspecialchars($row['relevant']);
            $t = Topic::fromTopic($p1,$p2,$p3,$p4);
            array_push($topics,$t);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $topics;
} 
function getRelevantTopics($db) { 
    try {
        $topics = array();
        // calling stored procedure command
        $sql = 'CALL getRelevantTopics()';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['topID']);
            $p2 = htmlspecialchars($row['catID']);
            $p3 = htmlspecialchars($row['topTitle']);
            $p4 = true;
            $t = Topic::fromTopic($p1,$p2,$p3,$p4);
            array_push($topics,$t);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $topics;
} 
function insertTopic($catID, $topTitle, $relevant, $db) { 
    print'Inside `aMemberFunc()`'; 
} 
function updateTopic($topID,$catID, $topTitle, $relevant, $db) { 
    print'Inside `aMemberFunc()`'; 
} 
function updateTopicRelevantState($topID, $relevant, $db) { 
    print'Inside `aMemberFunc()`'; 
} 

?>