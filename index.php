<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>World Writer</title>
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/main.css">
  </head>
  <body>
    <?php incude 'html/header.php' ?>
    <textarea>
      <!--tinymce-->
    </textarea>
    <div id="wrapper">
      <div id="stats">

      </div>
    </div>
    <div id="controls">
      <input id="btnStart" type="button" value="Start"/>
      <input id="btnStop" type="button" value="Stop"/>
      <input id="btnStep" type="button" value=">"/>
      <input id="btnReload" type="button" value="Reload"/>
      <input id="btnNew" type="button" value="New Spec"/>
    </div>
    <?php incude 'html/sideBar.php' ?>
    <?php incude 'html/footer.php' ?>
    <script src="https://cloud.tinymce.com/stable/tinymce.min.js?apiKey=i777wu96ia6kbekuf05skbp9565wrw0ovwgw5oxwzfi2gxlx"></script>
    <script src="js/rita-full.js" charset="utf-8"></script>
    <script src="js/p5.js" charset="utf-8"></script>
    <script src="js/p5.dom.js" charset="utf-8"></script>
    <!-- <script src="js/p5.sound.js" charset="utf-8"></script> -->
    <script src="js/Convert.js" charset="utf-8"></script>
    <script src="js/Probability.js" charset="utf-8"></script>
    <script src="js/main.js" charset="utf-8"></script>
  </body>
</html>
