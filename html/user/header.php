<nav class="navbar navbar-default">
  <div class="container-fluid">
      
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="index.php">World Writer</a>
    </div>

    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
          
        <li><a href="index.php?action=newPage">New</a></li>
        <li>
          <a class="clickable" data-toggle="modal" data-target="#mdlSave" id="lnkSave">Save</a>
        </li>
        <li>
          <a class="clickable" data-toggle="modal" data-target="#mdlLoad"  id="lnkload">Load</a>
        </li>

      </ul>
      
      <ul class="nav navbar-nav navbar-right">
        <?php 
          if($_SESSION['admin']){?>
              <li><a href="index.php?action=newTemp">Admin</a></li>
      <?php } ?>
                
          <li><a href="index.php?action=contact">Contact</a></li>
      </ul>
      
    </div><!-end collapse>
    
  </div><!-end container>
</nav>