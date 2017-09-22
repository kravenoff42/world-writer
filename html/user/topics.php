<div class="modal" id="mdlTopics">
  <div class="modal-dialog">
    <div class="modal-content">
      
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Select a Topic</h4>
      </div>
      <form action="index.php" method="post">
      <div class="modal-body" >
         <div class="list-group" id="mdlTopicsGroup">
           
            <label class="pageList">
              <input type="radio" name="loadPageID" value="<?php echo $pages[$i]['pageID']; ?>" style="visibility: hidden; position: absolute;" >
              <a href ="#" class="list-group-item" >
                <h4 class="list-group-item-heading"><?php echo $pages[$i]['pageTitle']; ?></h4>
                <p class="list-group-item-text"><?php echo "Page ID: ".$pages[$i]['pageID']; ?></p>
                <p class="list-group-item-text"><?php echo "Last Modifeied: ".$pages[$i]['lastModified']; ?></p>
              </a>
            </label>
          
          
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        <button type="submit" class="btn btn-primary"  id="btnLoadPage">Load</button>
      </div>
      </form>
    </div>
  </div>
</div>