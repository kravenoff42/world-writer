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

    <?php// require(__DIR__.'/models/DB.php'); 
     include(__DIR__.'/models/DB.php'); 
     
    ?>

  </head>
  <body>
    <div class="container-fluid">
      <?php
        include (__DIR__ . "/html/user/header.php"); 
        switch($action){
          case "newPage":
            include (__DIR__ . "/html/user/page.php"); 
            break;
          case "savePage":
            include (__DIR__ . "/html/user/page.php"); 
            include (__DIR__ . "/html/user/page.php"); 
            break;
          case "loadPage":
            include (__DIR__ . "/html/user/page.php"); 
            include (__DIR__ . "/html/user/page.php"); 
            break;
          case "contact":
            include (__DIR__ . "/html/user/contact.php"); 
            break;
          case "newTemp":
            include (__DIR__ . "/html/admin/page.php"); 
            break;
          default:
            include (__DIR__ . "/html/user/page.php"); 
            break;
        }
        
        
        include (__DIR__ . "/html/user/footer.php"); 
      
      ?>
    </div><!--end container-->
    <!--<script src="https://cloud.tinymce.com/stable/tinymce.min.js?apiKey=i777wu96ia6kbekuf05skbp9565wrw0ovwgw5oxwzfi2gxlx"></script>-->
    <script src="js/jquery.min.js" ></script>
    <script src="js/tinymce/tinymce.min.js"></script>
    <script src="js/tinymce/jquery.tinymce.min.js"></script>
    <script src="js/bootstrap.min.js" ></script>
    <script src="js/rita-full.js" charset="utf-8"></script>
    <!--<script src="js/p5.js" charset="utf-8"></script>-->
    <script src="js/Convert.js" charset="utf-8"></script>
    <script src="js/Probability.js" charset="utf-8"></script>
    <script src="js/Question.js" charset="utf-8"></script>
    <script src="js/Topic.js" charset="utf-8"></script>
    <script src="js/Categories.js" charset="utf-8"></script>
    <script src="js/main.js" charset="utf-8"></script>
  </body>
</html>
