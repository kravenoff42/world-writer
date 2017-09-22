<?php 
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
?>