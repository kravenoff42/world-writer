<?php 
 
?>
<div class="modal" id="mdlSave">
  <div class="modal-dialog">
    <div class="modal-content">
      
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Save Page</h4>
      </div>
      <div class="modal-body">
        <h6>Are you sure you want to save?</h6>
        <p><b>Title: </b><span id="lblPageTitleSave"><?php echo $title; ?></span></p>
        <p>
          <b>Last Modified: </b>
          <?php
          if(!isset($lastModified)){$lastModified = date("Y-m-d h:i:sa");}
          echo $lastModified; ?>
          </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary"  id="btnSavePage" data-dismiss="modal">Save</button>
      </div>
      
    </div>
  </div>
</div>