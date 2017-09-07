<?php 

function deletePage($pageID, $db) { 
    try {
    
        // calling stored procedure command
        $sql = 'CALL deletePage(@pageID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@pageID', $pageID, PDO::PARAM_INT);

        // execute the stored procedure
        $stmt->execute();
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return null;
} 
function getPagesAll($db) { 
    try {
        $pages = array();
        // calling stored procedure command
        $sql = 'CALL getPagesAll()';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
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
            array_push($pages,$p);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $pages;
} 
function getPageByWord($wordID, $db) { 
    try {
        $pages = array();
        // calling stored procedure command
        $sql = 'CALL getPageByWord(@wordID)';
    
        // pass value to the command
        $stmt->bindParam('@wordID', $wordID, PDO::PARAM_INT);
        
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = $pageID;
            $p2 = htmlspecialchars($row['projID']);
            $p3 = htmlspecialchars($row['topID']);
            $p4 = htmlspecialchars($row['pageNum']);
            $p5 = htmlspecialchars($row['content']);
            $p6 = htmlspecialchars($row['dateCreated']);
            $p7 = htmlspecialchars($row['lastModified']);
            $p8 = htmlspecialchars($row['topTitle']);
            $p9 = htmlspecialchars($row['word']);
            $p = Topic::fromPage($p1,$p2,$p3,$p4,$p5,$p6,$p7,$p8,$p9);
            array_push($pages,$p);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $pages;
}
function getPagesByID($pageID, $db) { 
    try {
        $pages = array();
        // calling stored procedure command
        $sql = 'CALL getPagesByID(@pageID)';
    
        // pass value to the command
        $stmt->bindParam('@pageID', $pageID, PDO::PARAM_INT);
        
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = $pageID;
            $p2 = htmlspecialchars($row['projID']);
            $p3 = htmlspecialchars($row['topID']);
            $p4 = htmlspecialchars($row['pageNum']);
            $p5 = htmlspecialchars($row['content']);
            $p6 = htmlspecialchars($row['dateCreated']);
            $p7 = htmlspecialchars($row['lastModified']);
            $p = Topic::fromPage($p1,$p2,$p3,$p4,$p5,$p6,$p7);
            array_push($pages,$p);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $pages;
} 
function getPagesByProject($projID, $db) { 
    try {
        $pages = array();
        // calling stored procedure command
        $sql = 'CALL getPagesByProject(@projID)';
    
        // pass value to the command
        $stmt->bindParam('@projID', $projID, PDO::PARAM_INT);
        
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['pageID']);
            $p2 = $projID;
            $p3 = htmlspecialchars($row['topID']);
            $p4 = htmlspecialchars($row['pageNum']);
            $p5 = htmlspecialchars($row['content']);
            $p6 = htmlspecialchars($row['dateCreated']);
            $p7 = htmlspecialchars($row['lastModified']);
            $p = Topic::fromPage($p1,$p2,$p3,$p4,$p5,$p6,$p7);
            array_push($pages,$p);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $pages;
} 
function insertPage($pageTitle, $projID, $content, $pageNum, $lastModified, $db) { 
    print'Inside `aMemberFunc()`'; 
} 
function updatePage($pageID, $pageTitle, $projID, $content, $pageNum, $lastModified, $db) { 
    print'Inside `aMemberFunc()`'; 
} 
function updatePageContent($pageID, $content, $lastModified, $db) { 
    print'Inside `aMemberFunc()`'; 
} 
function updatePageNumber($pageID, $pageNum, $db) { 
    print'Inside `aMemberFunc()`'; 
} 
function updatePageTopic($pageID, $pageTitle, $db) { 
    print'Inside `aMemberFunc()`'; 
} 

?>