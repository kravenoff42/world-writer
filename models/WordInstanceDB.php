<?php 

function deleteWordInstance($userID, $pageID, $db) { 
    try {
    
        // calling stored procedure command
        $sql = 'CALL deleteWordInstance(@wordID,@pageID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@wordID', $wordID, PDO::PARAM_INT);
        $stmt->bindParam('@pageID', $pageID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return null;
} 
function getWordInstancesAll($db) { 
    try {
        $wordIns = array();
        // calling stored procedure command
        $sql = 'CALL getWordsByPage(@pageID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);

        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        
        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['wordID']);
            $p2 = htmlspecialchars($row['pageID']);
            $wi = Word::fromPage($p1,$p2);
            array_push($wordIns,$wi);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $wordIns;
} 
function getWordsByPage($pageID, $db) { 
    try {
        $wordIns = array();
        // calling stored procedure command
        $sql = 'CALL getWordsByPage(@pageID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@pageID', $pageID, PDO::PARAM_INT);
    
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
    return $wordIns;
} 
function getPagesByWord($wordID, $db) { 
    try {
        $pages = array();
        // calling stored procedure command
        $sql = 'CALL getPagesByWord(@wordID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@wordID', $wordID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        
        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['pageID']);
            $p2 = htmlspecialchars($row['projID']);
            $p3 = htmlspecialchars($row['topID']);
            $p4 = htmlspecialchars($row['pageNum']);
            $p5 = htmlspecialchars($row['content']);
            $p6 = htmlspecialchars($row['dateCreated']);
            $p7 = htmlspecialchars($row['lastModified']);
            $p = Topic::fromPage($p1,$p2,$p3,$p4,$p5,$p6,$p7);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $pages;
} 
function insertWordInstance($wordID, $pageID, $db) { 
    print 'Inside `aMemberFunc()`'; 
} 

?>