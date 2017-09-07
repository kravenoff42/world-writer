<?php 

function deleteQuestionWord($questionID, $wordID, $db) { 
    try {
    
        // calling stored procedure command
        $sql = 'CALL deleteQuestionWord(@questionID,@wordID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@questionID', $questionID, PDO::PARAM_INT);
        $stmt->bindParam('@wordID', $wordID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
        
        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return null;
} 
function getQuestionWordsAll($db) { 
    try {
        $qwords = array();
        // calling stored procedure command
        $sql = 'CALL getQuestionWordsAll()';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['questionID']);
            $p2 = htmlspecialchars($row['wordID']);
            $p3 = htmlspecialchars($row['wordPosition']);
            $qw = new QuestionWord($p1,$p2,$p3);
            array_push($qwords,$qw);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $users;
} 
function getQuestionsByWord($wordID, $db) { 
    try {
        $qwords = array();
        // calling stored procedure command
        $sql = 'CALL getQuestionsByWord(@wordID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@wordID', $wordID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = htmlspecialchars($row['questionID']);
            $p2 = $wordID;
            $p3 = htmlspecialchars($row['wordPosition']);
            $qw = new QuestionWord($p1,$p2,$p3);
            array_push($qwords,$qw);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $qwords;
} 
function getWordByQuestion($questionID, $db) { 
    try {
        $qwords = array();
        // calling stored procedure command
        $sql = 'CALL getWordByQuestion(@questionID)';
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam('@questionID', $questionID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            $p1 = $questionID;
            $p2 = htmlspecialchars($row['wordID']);
            $p3 = htmlspecialchars($row['wordPosition']);
            $qw = new QuestionWord($p1,$p2,$p3);
            array_push($qwords,$qw);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    return $qwords;
} 
function insertQuestionWord($questionID, $wordID, $wordPosition, $db) { 
    print'Inside `aMemberFunc()`'; 
} 
function updateQuestionWord($questionID, $wordID, $wordPosition, $db) { 
    print'Inside `aMemberFunc()`'; 
} 

?>