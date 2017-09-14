<?php 

function deleteCategory($catID, $db) { 
    try {
    
        // calling stored procedure command
        $sql = "CALL deleteCategory(:catID)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':catID', $catID, PDO::PARAM_INT);

        // execute the stored procedure
        $stmt->execute();
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
} 
function getCategoriesAll($db) { 
    try {
        $cats = array();
        // calling stored procedure command
        $sql = "CALL getCategoriesAll()";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        
        while ($row = $stmt->fetch()):
            array_push($cats,$row);
        endwhile;
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($cats);
} 
function getCategoriesByAbbrev($catAbbrev, $db) { 
    try {
        $cats = array();
        // calling stored procedure command
        $sql = "CALL getCategoriesByAbbrev(:catAbbrev)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
        
        // pass value to the command
        $stmt->bindParam(':catAbbrev', $catAbbrev, PDO::PARAM_STR);

        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        
        while ($row = $stmt->fetch()):
            array_push($cats,$row);
        endwhile;
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($cats);
} 
function getCategoriesByID($catID, $db) { 
    try {
        $cats = array();
        // calling stored procedure command
        $sql = "CALL getCategoriesByID(:catID)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
        
        // pass value to the command
        $stmt->bindParam(':catID', $catID, PDO::PARAM_INT);

        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        
        while ($row = $stmt->fetch()):
            array_push($cats,$row);
        endwhile;
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($cats);
} 
function insertCategory($catName, $catAbbrev, $db) { 
    try {
        $cats = array();
        // calling stored procedure command
        $sql = "CALL insertCategory(:catName ,:catAbbrev)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':catName', $catName);
        $stmt->bindParam(':catAbbrev', $catAbbrev);
        
        //echo var_dump($catName, $catAbbrev, $db);
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            array_push($cats,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($cats);
} 
function updateCategory($catID, $catName, $catAbbrev, $db) { 
    try {
        $cats = array();
        // calling stored procedure command
        $sql = "CALL updateCategory(:catID, :catName ,:catAbbrev)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':catID', $catID, PDO::PARAM_INT);
        $stmt->bindParam(':catName', $catName);
        $stmt->bindParam(':catAbbrev', $catAbbrev);
        
        //echo var_dump($catName, $catAbbrev, $db);
        // execute the stored procedure
        $stmt->execute();

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
} 


?>