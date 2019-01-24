<?php
	
$nam_sinh=  $_GET['nam_sinh'];
$gender = $_GET['gender'];
require "boitoan.php";
?>
get_cung: <?php echo BoiToan::get_text('cung',BoiToan::get_cung($nam_sinh,''))?><br>
Can: <?php echo BoiToan::get_can($nam_sinh)?><br>
Chi: <?php echo BoiToan::get_chi($nam_sinh)?><br>
Thiên can: <?php echo BoiToan::get_thien_can($nam_sinh)?><br>
Địa chi: <?php echo BoiToan::get_dia_chi($nam_sinh)?><br>
Ngũ hành: <?php echo BoiToan::get_ngu_hanh($nam_sinh)?><br>
Menh: <?php echo BoiToan::get_menh($nam_sinh)?><br>
