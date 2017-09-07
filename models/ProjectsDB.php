<?php 

function deleteProj($projID, $db) { 
    try {
    
        // calling stored procedure command
        $sql = 'CALL deleteProj(@projID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@projID', $projID, PDO::PARAM_INT);

        // execute the stored procedure
        $stmt->execute();
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return null;
} 
function getProjectsAll($db) { 
    try {
        $projects = array();
        // calling stored procedure command
        $sql = 'CALL getProjectsAll()';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['projID']);
            $p2 = htmlspecialchars($row['ownerID']);
            $p3 = htmlspecialchars($row['projTitle']);
            $p4 = htmlspecialchars($row['public']);
            $p = new Project($p1,$p2,$p3,$p4);
            array_push($projects,$p);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $projects;
} 
function getProjectsByID($projID, $db) { 
    try {
        $projects = array();
        // calling stored procedure command
        $sql = 'CALL getProjectsByID(@projID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@projID', $projID, PDO::PARAM_INT);
 
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = $projID;
            $p2 = htmlspecialchars($row['ownerID']);
            $p3 = htmlspecialchars($row['projTitle']);
            $p4 = htmlspecialchars($row['public']);
            $p = new Project($p1,$p2,$p3,$p4);
            array_push($projects,$p);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $projects;
} 
function getProjectsByUser($userID, $db) { 
    try {
        $projects = array();
        // calling stored procedure command
        $sql = 'CALL getProjectsByUser(@userID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@userID', $userID, PDO::PARAM_INT);
 
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['projID']);
            $p2 = $userID;
            $p3 = htmlspecialchars($row['projTitle']);
            $p4 = htmlspecialchars($row['public']);
            $p = new Project($p1,$p2,$p3,$p4);
            array_push($projects,$p);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $projects;
} 
function getPublicProjects($db) { 
    try {
        $projects = array();
        // calling stored procedure command
        $sql = 'CALL getProjectsAll()';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['projID']);
            $p2 = htmlspecialchars($row['ownerID']);
            $p3 = htmlspecialchars($row['projTitle']);
            $p4 = true;
            $p = new Project($p1,$p2,$p3,$p4);
            array_push($projects,$p);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $projects;
} 
function insertProject($ownerID, $projTitle, $public, $db) { 
    print'Inside `aMemberFunc()`'; 
} 
function updateProject($projID, $ownerID, $projTitle, $public, $db) { 
    print'Inside `aMemberFunc()`'; 
} 
function updateProjectPublicState($projID, $public, $db) { 
    print'Inside `aMemberFunc()`'; 
} 

?>