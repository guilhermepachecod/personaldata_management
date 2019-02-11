<?php
/*
	This PHP page connect the application to the database in Mysql
using the data in psl-config file
 
*/
include_once 'psl-config.php';   // Já que functions.php não está incluso
$mysqli = new mysqli(HOST, USER, PASSWORD, DATABASE);
if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
}
?>
