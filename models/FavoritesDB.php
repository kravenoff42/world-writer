<?php 

function deleteFavorite($userID, $projID, $db) { 
    try {
    
        // calling stored procedure command
        $sql = 'CALL deleteFavorite(@userID,@projID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@userID', $userID, PDO::PARAM_INT);
        $stmt->bindParam('@projID', $projID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return null;
} 
function getFavoritesAll() { 
    try {
        $favs = array();
        // calling stored procedure command
        $sql = 'CALL getFavoritesAll()';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        
        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['userID']);
            $p2 = htmlspecialchars($row['projID']);
            $f = new Favorite($p1,$p2);
            array_push($favs,$f);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $favs;
} 
function getFavsByProject($projID, $db) { 
    try {
        $favs = array();
        // calling stored procedure command
        $sql = 'CALL getFavsByProject(@projID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@projID', $projID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        
        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['userID']);
            $p2 = $projID;
            $f = new Favorite($p1,$p2);
            array_push($favs,$f);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $favs;
} 
function getFavsByUser($userID, $db) { 
    try {
        $favs = array();
        // calling stored procedure command
        $sql = 'CALL getFavsByUser(@userID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@userID', $userID, PDO::PARAM_INT);

        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        
        while ($row = $stmt->fetch()):
            $p1 = $userID;
            $p2 = htmlspecialchars($row['projID']);
            $f = new Favorite($p1,$p2);
            array_push($favs,$f);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $favs;
} 
function insertFavorite($userID, $projID, $db) { 
    print'Inside `aMemberFunc()`'; 
} 

?>