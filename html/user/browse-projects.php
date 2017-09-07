
//TODO add for loop to build cards
<div class="card">

    <!--Card image-->
    <img class="img-fluid" src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%282%29.jpg" alt="Card image cap">

    <!--Card content-->
    <div class="card-body">
        <!--Title-->
        <h4 class="card-title">Card title</h4>
        <!--Text-->
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Button</a>
    </div>

</div>


<div id="page-outer-body">
	<div id="page-body" class="container">
		<?php//if ( ) {?>
			<div class="row">
				<section class="col-md-3 toc-sidebar"></section>
				<section class="col-md-9 wiki-body-section">
			<?php	//}//end if?>
		
					<div class="pagetitle page-header">
						<h1><?php $pg->content( 'title' ) ?> <small><?php $pg->content('subtitle') ?></small></h1>
					</div>	
	
					<div class="body">
					<?php $pg->content( 'bodytext' ) ?>
					</div>
	
					<?php if ( $pg->content['catlinks'] ){ ?>
					<div class="category-links">
					<!-- catlinks -->
					
					<?php //endif; ?>
					<?php	//if ( 'sidebar' == $wgTOCLocation ) {
							?>
							</section></section>
							<?php
						}//end if
					?>
	</div><!-- container -->
</div>

