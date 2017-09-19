<footer class="footer">
    <h1>FOOTER</h1>
    <div id="log">
        <?php 
        echo "<p>Session: \n\r"; print_r( $_SESSION['pageID']);
        echo "<p>pID: \n\r"; print_r( $pID);
        echo "<p>Post: \n\r"; print_r( $_POST);
        echo "<p>Content: ";  print_r($content);
        ?></div>
</footer>

