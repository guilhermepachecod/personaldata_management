<?php
/*

	This page is a PHP of JSON structure construct
	 
	Navigating in data records moving to next or previous, selecting the 
	one specific record or even select a random record 
	this json returns all personal data.

	The first part gets with the get method a playcontroler and number id 
	after that , it set the mysql select string.
	Runs the query command and return all fields data with fetch_assoc()
	and then closing; 
	
	
*/
include_once 'dbconnect.php'; 
$PlayControler = $_GET['playcontroler'];
$getNumberID = $_GET['getnumberid'];
switch ($PlayControler) {
    case "next":
        $fakenamequery = "SELECT gender, surname, givenname, streetaddress, city, state, zipcode, emailaddress, username, telephonenumber, birthday, id FROM name_data.fakenames WHERE id > ".$getNumberID." ORDER BY id LIMIT 1;";
        break;
    case "prev":
        $fakenamequery = "SELECT gender, surname, givenname, streetaddress, city, state, zipcode, emailaddress, username, telephonenumber, birthday, id FROM name_data.fakenames WHERE id < ".$getNumberID." ORDER BY id DESC LIMIT 1;";
        break;
    case "one":
        $fakenamequery = "SELECT gender, surname, givenname, streetaddress, city, state, zipcode, emailaddress, username, telephonenumber, birthday, id FROM name_data.fakenames WHERE id = ".$getNumberID.";";
        break;
    default:
        $fakenamequery = "SELECT gender, surname, givenname, streetaddress, city, state, zipcode, emailaddress, username, telephonenumber, birthday, id FROM name_data.fakenames ORDER BY RAND() DESC LIMIT 1;";
}
$result_profile = $mysqli->query($fakenamequery);
$json_str .= '[';
    while ($row_profile = $result_profile->fetch_assoc()) {
		$json_str .= '{"gender":"'.htmlentities($row_profile["gender"]).
						'","surname":"'.htmlentities($row_profile["surname"]).
						'", "givenname":"'.htmlentities($row_profile["givenname"]).
						'", "streetaddress":"'.htmlentities($row_profile["streetaddress"]).
						'", "city":"'.htmlentities($row_profile["city"]).
						'", "state":"'.htmlentities($row_profile["state"]).
						'", "zipcode":"'.htmlentities($row_profile["zipcode"]).
						'", "emailaddress":"'.htmlentities($row_profile["emailaddress"]).
						'", "username":"'.htmlentities($row_profile["username"]).
						'", "telephonenumber":"'.htmlentities($row_profile["telephonenumber"]).
						'", "birthday":"'.htmlentities($row_profile["birthday"]).
						'", "numberid":"'.$row_profile["id"].'"}';
    }
$json_str .= ']';
echo $json_str;
$result_profile->close();

?>
