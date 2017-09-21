<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>World Writer</title>
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/main.css">
    <!--<link rel="stylesheet" href="css/questions.css">-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <?php
    if(isset($_SESSION)){
    session_destroy();
    
    }
    session_start();
    $_SESSION['admin']=true;
    include(__DIR__.'/models/DB.php'); 
    // unset($_POST);
    
    ?>

  </head>
  <body>
    <div class="container-fluid">
      <?php
        include (__DIR__ . "/html/user/header.php"); 
        switch($_GET['action']){
          case "contact":
            include (__DIR__ . "/html/user/contact.php"); 
            break;
          case "newTemp":
            include (__DIR__ . "/html/user/templates.php"); 
            break;
          case "newPage":
            unset($_POST['loadPageID']);
          default:
            if(isset($_POST['loadPageID'])){
              $loaded = true;
              $p = $_POST['loadPageID'];
              $currPage = getPagesByIDphp($p, $db);
            }
            include (__DIR__ . "/html/user/page.php"); 
            include (__DIR__ . "/html/user/save.php"); 
            include (__DIR__ . "/html/user/load.php"); 
            break;
        }
        
        
        include (__DIR__ . "/html/user/footer.php"); 
      
      ?>
    </div><!--end container-->
    <!--3rd Party Scripts-->
    <script src="js/jquery.min.js" ></script>
    <script src="js/tinymce/tinymce.min.js"></script>
    <script src="js/tinymce/jquery.tinymce.min.js"></script>
    <script src="js/bootstrap.min.js" ></script>
    <script src="js/rita-full.js" charset="utf-8"></script>
    <!--<script src="js/p5.js" charset="utf-8"></script>-->
    
    <!--JS Classes-->
    <script src="js/Classes/Question.js" charset="utf-8"></script>
    <script src="js/Classes/QuestionList.js" charset="utf-8"></script>
    <script src="js/Classes/Topic.js" charset="utf-8"></script>
    <script src="js/Classes/Word.js" charset="utf-8"></script>
    <script src="js/Classes/TopicsList.js" charset="utf-8"></script>
    <script src="js/Classes/Template.js" charset="utf-8"></script>
    <script src="js/Classes/TempList.js" charset="utf-8"></script>
    <script src="js/Classes/Categories.js" charset="utf-8"></script>
    <script src="js/Classes/Page.js" charset="utf-8"></script>
    
    <!--main logic-->
    <script src="js/main.js" charset="utf-8"></script>
    <?php if($_GET['action']=="newTemp"){ ?><script src="js/templates.js" charset="utf-8"></script><?php } ?>
    <?php if($loaded){ ?> <script> currPage = <?php echo json_encode($currPage) ?> ; loaded = true;  </script><?php } ?>

  </body>
</html>