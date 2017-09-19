<?php 

function deletePage($pageID, $db) { 
    try {
    
        // calling stored procedure command
        $sql = 'CALL deletePage(:pageID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':pageID', $pageID, PDO::PARAM_INT);

        // execute the stored procedure
        $stmt->execute();
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
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
            $r = $row['content'];
            $row['content'] = htmlspecialchars_decode( $r, ENT_HTML5);
            array_push($pages,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($pages);
}
function getPagesAllphp($db) { 
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
            $r = $row['content'];
            $row['content'] = htmlspecialchars_decode( $r, ENT_HTML5);
            array_push($pages,$row);
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
        $sql = 'CALL getPagesByID(:pageID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':pageID', $pageID, PDO::PARAM_INT);
        
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $r = $row['content'];
            $row['content'] = htmlspecialchars_decode( $r, ENT_HTML5);
            array_push($pages,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($pages);
} 
function getPagesByIDphp($pageID, $db) { 
    try {
        
        // calling stored procedure command
        $sql = 'CALL getPagesByID(:pageID)';

        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
        
        // pass value to the command
        $stmt->bindParam(':pageID', $pageID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $r = $row['content'];
            $row['content'] = htmlspecialchars_decode( $r, ENT_HTML5);
            $row['pageID'] = $pageID;
            $page = $row;
        endwhile;
            
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $page;
} 
function insertPage($pageTitle, $content, $db) { 
    try {
        $pages = array();
        // calling stored procedure command
        $sql = 'CALL insertPage(:content,:pageTitle)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);

        // pass value to the command
        $stmt->bindParam(':pageTitle', $pageTitle, PDO::PARAM_STR);
        $stmt->bindParam(':content', htmlspecialchars($content, ENT_HTML5), PDO::PARAM_STR);

        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            
            array_push($pages,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($pages);
} 
function updatePage($pageID, $pageTitle, $content, $db) { 
    try {
        $pages = array();
        // calling stored procedure command
        $sql = 'CALL updatePage(:pageID,:content,:pageTitle)';
        
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
        
        // pass value to the command
        $stmt->bindParam(':pageID', $pageID, PDO::PARAM_INT);
        $stmt->bindParam(':pageTitle', $pageTitle, PDO::PARAM_STR);
        $stmt->bindParam(':content', htmlspecialchars($content, ENT_HTML5), PDO::PARAM_STR);

        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            
            array_push($pages,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($pages);
} 


?>
