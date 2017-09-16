<div class="modal" id="mdlLoad">
  <div class="modal-dialog">
    <div class="modal-content">
      
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">Load Page</h4>
      </div>
      <div class="modal-body" id="mdlLoadBody">
         <div class="list-group">
           <?php $pages = array();
            array_push($pages, array('pageTitle'=>'The Lion','pageID'=>'1','lastModified'=>'09/01/2017'));
            array_push($pages, array('pageTitle'=>'The Witch','pageID'=>'2','lastModified'=>'09/03/2017'));
            array_push($pages, array('pageTitle'=>'The Wardrobe','pageID'=>'3','lastModified'=>'09/07/2017'));
            array_push($pages, array('pageTitle'=>'A New Hope','pageID'=>'4','lastModified'=>'09/08/2017'));
            array_push($pages, array('pageTitle'=>'The Empire Strikes Back','pageID'=>'5','lastModified'=>'09/10/2017'));
            array_push($pages, array('pageTitle'=>'Return of the Jedi','pageID'=>'6','lastModified'=>'09/11/2017'));
            array_push($pages, array('pageTitle'=>'The Matrix','pageID'=>'7','lastModified'=>'09/12/2017'));
            array_push($pages, array('pageTitle'=>'The Void','pageID'=>'8','lastModified'=>'09/14/2017'));
            $count = count($pages);
            for($i=0;$i<$count;$i++){ ?>
          <a href="#" class="list-group-item">
            <h4 class="list-group-item-heading"><?php echo $pages[$i]['pageTitle']; ?></h4>
            <p class="list-group-item-text"><?php echo "Page ID: ".$pages[$i]['pageID']; ?></p>
            <p class="list-group-item-text"><?php echo "Last Modifeied: ".$pages[$i]['lastModified']; ?></p>
          </a>
          <?php }?>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary"  id="btnLoadPage">Load</button>
      </div>
      
    </div>
  </div>
</div>