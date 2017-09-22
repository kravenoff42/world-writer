<?php 
if(isset($currPage)){
    $pID = $currPage['pageID'];
    
    // $page = getPagesByIDphp($pID, $db);
    $title = $currPage['pageTitle'];
    $content = $currPage['content'];
}
?>

<div id="divPageTitle" class="well well-sm">
    <h4><span contenteditable="true" id="pTitle"><?php if(isset($title)){echo $title; }else{?>New Page<?php } ?></span></h4>
    <input id="pageContent" type="hidden" name="pageID" value="<?php echo $pID;?>" />
</div>
<textarea id="tny" >
    <?php if(isset($content)){echo $content; }?>
</textarea>

