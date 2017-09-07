<?php 

function deleteCategory($catID, $db) { 
    try {
    
        // calling stored procedure command
        $sql = 'CALL deleteCategory(@catID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@catID', $catID, PDO::PARAM_INT);

        // execute the stored procedure
        $stmt->execute();
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return null;
} 
function getCategoriesAll($db) { 
    try {
        $cats = array();
        // calling stored procedure command
        $sql = 'CALL getCategoriesAll()';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        
        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['catID']);
            $p2 = htmlspecialchars($row['catAbbrev']);
            $p3 = htmlspecialchars($row['catName']);
            $c = new WordCategory($p1,$p2,$p3);
            array_push($cats,$c);
        endwhile;
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $cats;
} 
function getCategoriesByAbbrev($catAbbrev, $db) { 
    try {
        $cats = array();
        // calling stored procedure command
        $sql = 'CALL getCategoriesByAbbrev(@catAbbrev)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
        
        // pass value to the command
        $stmt->bindParam('@catAbbrev', $catAbbrev, PDO::PARAM_STR);

        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        
        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['catID']);
            $p2 = $catAbbrev;
            $p3 = htmlspecialchars($row['catName']);
            $c = new WordCategory($p1,$p2,$p3);
            array_push($cats,$c);
        endwhile;
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $cats;
} 
function getCategoriesByID($catID, $db) { 
    try {
        $cats = array();
        // calling stored procedure command
        $sql = 'CALL getCategoriesByID(@catID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
        
        // pass value to the command
        $stmt->bindParam('@catID', $catID, PDO::PARAM_STR);

        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        
        while ($row = $stmt->fetch()):
            $p1 = $catID;
            $p2 = htmlspecialchars($row['catAbbrev']);
            $p3 = htmlspecialchars($row['catName']);
            $c = new WordCategory($p1,$p2,$p3);
            array_push($cats,$c);
        endwhile;
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $cats;
} 
function insertCategory($catName, $catAbbrev, $db) { 
    print 'Inside `aMemberFunc()`'; 
} 
function updateCategory($catID, $catName, $catAbbrev, $db) { 
    print 'Inside `aMemberFunc()`'; 
} 

?>