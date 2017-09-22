<?php 

function getQuestionWordsAll($db) { 
    try {
        $qwords = array();
        // calling stored procedure command
        $sql = "CALL getQuestionWordsAll()";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            array_push($qwords,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($qwords);
} 
function getWordByQuestion($questionID, $db) { 
    try {
        $qwords = array();
        // calling stored procedure command
        $sql = "CALL getWordByQuestion(:questionID)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':questionID', $questionID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            array_push($qwords,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($qwords);
} 
function insertQuestionWord($questionID, $wordID, $wordPosition, $db) { 
    try {
        $qwords = array();
        // calling stored procedure command
        $sql = "CALL insertQuestionWord(:questionID ,:wordID,:wordPosition)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':questionID', $questionID, PDO::PARAM_INT);
        $stmt->bindParam(':wordID', $wordID, PDO::PARAM_INT);
        $stmt->bindParam(':wordPosition', $wordPosition, PDO::PARAM_INT);
        
        //echo var_dump($catName, $catAbbrev, $db);
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            array_push($qwords,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($qwords);
} 

?>