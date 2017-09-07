<?php 

function deleteMessage($userID, $db) { 
    try {
    
        // calling stored procedure command
        $sql = 'CALL deleteMessage(@messageID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@messageID', $messageID, PDO::PARAM_INT);

        // execute the stored procedure
        $stmt->execute();
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return null;
} 
function getMessagesAll($db) { 
    try {
        $messages = array();
        // calling stored procedure command
        $sql = 'CALL getMessagesAll()';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['messageID']);
            $p2 = htmlspecialchars($row['email']);
            $p3 = htmlspecialchars($row['userID']);
            $p4 = htmlspecialchars($row['subject']);
            $p5 = htmlspecialchars($row['message']);
            $p6 = htmlspecialchars($row['dateSubmitted']);
            $m = new Message($p1,$p2,$p3,$p4,$p5,$p6);
            array_push($messages,$m);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $messages;
} 
function getMessagesByID($messageID, $db) { 
    try {
        $messages = array();
        // calling stored procedure command
        $sql = 'CALL getMessagesByID(@messageID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
      
        // pass value to the command
        $stmt->bindParam('@messageID', $messageID, PDO::PARAM_INT);
 
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = $messageID;
            $p2 = htmlspecialchars($row['email']);
            $p3 = htmlspecialchars($row['userID']);
            $p4 = htmlspecialchars($row['subject']);
            $p5 = htmlspecialchars($row['message']);
            $p6 = htmlspecialchars($row['dateSubmitted']);
            $m = new Message($p1,$p2,$p3,$p4,$p5,$p6);
            array_push($messages,$m);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $messages;
} 
function insertMessageNoUser($email, $subject, $message, $db) { 
    print'Inside `aMemberFunc()`'; 
} 
function insertMessageWithUser($email, $subject, $message, $userID, $db) { 
    print'Inside `aMemberFunc()`'; 
} 

?>