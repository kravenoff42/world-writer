<?php 

function getQuestionsAll($db) { 
    try {
        $questions = array();
        // calling stored procedure command
        $sql = "CALL getQuestionsAll()";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            array_push($questions,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($questions);
} 
function getQuestionsByPage($pageID, $db) {
    try {
        $questions = array();
        // calling stored procedure command
        $sql = "CALL getQuestionsByPage(:pageID)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':pageID', $pageID, PDO::PARAM_INT);
    
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            array_push($questions,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($questions);
} 
function insertQuestion($tempID, $relevant, $db) { 
    try {
        $questions = array();
        // calling stored procedure command
        $sql = "CALL insertQuestion(:tempID ,:relevant)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':tempID', $tempID, PDO::PARAM_INT);
        $stmt->bindParam(':relevant', $relevant, PDO::PARAM_INT);
        
        // execute the stored procedure
        $stmt->execute();
    
        $stmt->setFetchMode(PDO::FETCH_ASSOC);

        while ($row = $stmt->fetch()):
            array_push($questions,$row);
        endwhile;

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
    echo json_encode($questions);
} 
function updateQuestion($questionID, $tempID, $relevant, $db) { 
    try {
        $questions = array();
        // calling stored procedure command
        $sql = "CALL updateQuestion(:questionID,:tempID ,:relevant)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':questionID', $questionID, PDO::PARAM_INT);
        $stmt->bindParam(':tempID', $tempID, PDO::PARAM_INT);
        $stmt->bindParam(':relevant', $relevant, PDO::PARAM_INT);
        
        // execute the stored procedure
        $stmt->execute();

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
} 
function updateQuestionRelevantState($questionID, $relevant, $db) { 
    try {
        $questions = array();
        // calling stored procedure command
        $sql = "CALL updateQuestionRelevantState(:questionID,:relevant)";
    
        // prepare for execution of the stored procedure
        $stmt = $db->prepare($sql);
    
        // pass value to the command
        $stmt->bindParam(':questionID', $questionID, PDO::PARAM_INT);
        $stmt->bindParam(':relevant', $relevant, PDO::PARAM_INT);
        
        // execute the stored procedure
        $stmt->execute();

        $stmt->closeCursor();
    
    } catch (PDOException $e) {
        die("Error occurred:" . $e->getMessage());
    }
} 

?>