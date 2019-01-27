<?php
	
$nam_sinh=  $_GET['nam_sinh'];
$gender = $_GET['gender'];
require "boitoan.php";
?>
get_cung: <?php echo BoiToan::get_cung($nam_sinh,$gender,1)?><br>
Can: <?php echo BoiToan::get_can($nam_sinh)?><br>
Chi: <?php echo BoiToan::get_chi($nam_sinh)?><br>
Thiên can: <?php echo BoiToan::get_thien_can($nam_sinh)?><br>
Địa chi: <?php echo BoiToan::get_can_chi($nam_sinh,1)?><br>
Ngũ hành: <?php echo BoiToan::get_ngu_hanh($nam_sinh,1)?><br>
Menh: <?php echo BoiToan::get_menh($nam_sinh)?><br>
Cung hoang dao: <?php echo BoiToan::get_hoang_dao($nam_sinh)->text_vi?><br>
