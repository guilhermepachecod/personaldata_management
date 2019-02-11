<?php
/*

	This page is a PHP Mysql insert
	Using the post method to get form fields data.

	First it getting the contents, and after decoded to json, it verify if that is a new registration or a data record update.

	Using Json to return a inserted id if in case a new registration,
	or just return the updated record;

*/
include_once 'dbconnect.php'; 
$newPersonal = json_decode(file_get_contents('php://input'));
$date = new DateTime($newPersonal[0]->birthDate);
$resultdate = $date->format('Y-m-d');
	$gender = htmlentities($newPersonal[0]->gender);
	$firstName = htmlentities($newPersonal[0]->firstName);
	$lastName = htmlentities($newPersonal[0]->lastName);
	$streetaddress = htmlentities($newPersonal[0]->streetaddress);
	$city = htmlentities($newPersonal[0]->city);
	$zipcode = htmlentities($newPersonal[0]->zipcode);
	$email = htmlentities($newPersonal[0]->email);
	$validationServerUsername = htmlentities($newPersonal[0]->validationServerUsername);
	$state = htmlentities($newPersonal[0]->state);
	$phoneNumber = htmlentities($newPersonal[0]->phoneNumber);
	
if($newPersonal[0]->getnumberid=="New Record"){
	$insertnamequery = "INSERT INTO `name_data`.`fakenames` (`gender`,`givenname`,`surname`,`streetaddress`,`city`,`zipcode`,`emailaddress`,`username`,`birthday`,`state`,`telephonenumber`)VALUES('".$gender."','".$firstName."','".$lastName."','".$streetaddress."','".$city."','".$zipcode."','".$email."','".$validationServerUsername."','".$resultdate."','".$state."','".$phoneNumber."');";
		}else{
	$insertnamequery = "UPDATE `name_data`.`fakenames` SET `gender` = '".$gender."', `givenname` = '".$firstName."', `surname` = '".$lastName."', `streetaddress` = '".$streetaddress."', `zipcode` = '".$zipcode."', `emailaddress`= '".$email."', `username` = '".$validationServerUsername."', `city` = '".$city."', `telephonenumber` = '".$phoneNumber."', `birthday` = '".$resultdate."', `state` = '".$state."' WHERE `id`='".$newPersonal[0]->getnumberid."';";
}

if ($mysqli->query($insertnamequery)) {
    $queryreturn = 1;
} else {
    $queryreturn = 0;
}
echo json_encode(array("getnumberid"=>$mysqli->insert_id,"insertnamequery"=>$insertnamequery,"queryreturn"=>$queryreturn)); 
$mysqli->close();

?>
