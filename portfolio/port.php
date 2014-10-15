<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">

</head>
<body>

    <div class="port-close-button"><img src="/img/icons/btn-close.png"></div>
    <div id="port">

    	<?php
    	    $pid = $_GET['pid'];
        ?>
        <div class="port-image">
            <img class="port-img" src="" alt=""/>
        </div>

        <div class="port-info">
            <span class="title-port"></span>
        	<span class="info-port"></span>
        	<span class="agency-port"></span>
        	<span class="tech-port"></span>
        	<span class="role-port"></span>
        	<span class="link-port">
        	    <a href="" target="_blank"></a>
        	</span>
        	<span class="awards-port"></span>
        </div>
	</div>

    <script>
        var data = <?php echo $pid; ?>;
    </script>
	<script src="/js/portfolio.js"></script>
</body>
</html>