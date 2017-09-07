<?php 
function getUsersByID($userID, $db) {
    try {
        $users = array();
        // calling stored procedure command
        $sql = 'CALL getUsersByID(@userID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@userID', $userID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
    
        while ($row = $stmt->fetch()):
            $p1 = $userID;
            $p2 = htmlspecialchars($row['fName']);
            $p3 = htmlspecialchars($row['lName']);
            $p4 = htmlspecialchars($row['uName']);
            $p5 = htmlspecialchars($row['userBio']);
            $p6 = htmlspecialchars($row['userAvatar']);
            $p7 = htmlspecialchars($row['email']);
            $p8 = htmlspecialchars($row['psHashed']);
            $p9 = htmlspecialchars($row['admin']);
            $u = new User($p1,$p2,$p3,$p4,$p5,$p6,$p7,$p8,$p9);
            array_push($users,$u);
       endwhile;
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $users;
}
function getUsersAll($db) {
    try {
        $users = array();
        // calling stored procedure command
        $sql = 'CALL getUsersAll()';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['userID']);
            $p2 = htmlspecialchars($row['fName']);
            $p3 = htmlspecialchars($row['lName']);
            $p4 = htmlspecialchars($row['uName']);
            $p5 = htmlspecialchars($row['userBio']);
            $p6 = htmlspecialchars($row['userAvatar']);
            $p7 = htmlspecialchars($row['email']);
            $p8 = htmlspecialchars($row['psHashed']);
            $p9 = htmlspecialchars($row['admin']);
            $u = new User($p1,$p2,$p3,$p4,$p5,$p6,$p7,$p8,$p9);
            array_push($users,$u);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $users;
}
function getAdminUsers($db) {
    try {
        $admins = array();
        // calling stored procedure command
        $sql = 'CALL getAdminUsers()';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
        
        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['userID']);
            $p2 = htmlspecialchars($row['fName']);
            $p3 = htmlspecialchars($row['lName']);
            $p4 = htmlspecialchars($row['uName']);
            $p5 = htmlspecialchars($row['userBio']);
            $p6 = htmlspecialchars($row['userAvatar']);
            $p7 = htmlspecialchars($row['email']);
            $p8 = htmlspecialchars($row['psHashed']);
            $p9 = true;
            $u = new User($p1,$p2,$p3,$p4,$p5,$p6,$p7,$p8,$p9);
            array_push($users,$u);
        endwhile;
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $admins;
}
function deleteUser($userID, $db) {
    try {
    
        // calling stored procedure command
        $sql = 'CALL deleteUser(@userID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@userID', $userID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return null;
}
function getUsersByEmail($userEmail, $db) {
    try {
    
        // calling stored procedure command
        $sql = 'CALL getUsersByEmail(@email)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@email', $userEmail, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
    
        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['userID']);
            $p2 = htmlspecialchars($row['fName']);
            $p3 = htmlspecialchars($row['lName']);
            $p4 = htmlspecialchars($row['uName']);
            $p5 = htmlspecialchars($row['userBio']);
            $p6 = htmlspecialchars($row['userAvatar']);
            $p7 = $userEmail;
            $p8 = htmlspecialchars($row['psHashed']);
            $p9 = htmlspecialchars($row['admin']);
            $u = new User($p1,$p2,$p3,$p4,$p5,$p6,$p7,$p8,$p9);
            array_push($users,$u);
        endwhile;
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return null;
}
function getUsersByUsername($userUName, $db) {
    try {
        $users = array();
        // calling stored procedure command
        $sql = 'CALL getUserByID(@uName)';
 
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
 
        // pass value to the command
        $stmt->bindParam('@uName', $userUName, PDO::PARAM_STR);
 
        // execute the stored procedure
        $stmt->execute();
 
        $stmt->setFetchMode(PDO::FETCH_ASSOC);
 
        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['userID']);
            $p2 = htmlspecialchars($row['fName']);
            $p3 = htmlspecialchars($row['lName']);
            $p4 = $userUName;
            $p5 = htmlspecialchars($row['userBio']);
            $p6 = htmlspecialchars($row['userAvatar']);
            $p7 = htmlspecialchars($row['email']);
            $p8 = htmlspecialchars($row['psHashed']);
            $p9 = htmlspecialchars($row['admin']);
            $u = new User($p1,$p2,$p3,$p4,$p5,$p6,$p7,$p8,$p9);
            array_push($users,$u);
        endwhile;
        
        $stmt->closeCursor();

    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $users;
}
function insertNewUser($userFName, $userLName, $userUName, $userBio, $userAvatar, $userEmail, $userHashP, $admin, $db) { 
    print'Inside `aMemberFunc()`'; 
} 
function updateUser($userID, $userFName, $userLName, $userUName, $userBio, $userAvatar, $userEmail, $userHashP, $admin, $db) { 
    print'Inside `aMemberFunc()`'; 
} 
function updateUserAdminState($userID, $admin, $db) { 
    print'Inside `aMemberFunc()`'; 
} 
function updateUserPassword($userID, $userHashP, $db) { 
    print'Inside `aMemberFunc()`'; 
} 
function updateUserProfile($userID, $userFName, $userLName, $userBio, $userAvatar, $userEmail, $db) { 
    print'Inside `aMemberFunc()`'; 
} 

?>