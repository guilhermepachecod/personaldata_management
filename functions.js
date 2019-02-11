
/*
 * This is a main JavaScript functions page

it has three global namespaces with one method each.

MYCONN has events

showOneRecord is a function to get just one record from database table.

 showPrevNextRecord is to navigate for personal records
saveNewRecord save or update personal records

MYFORM has events

enableEdit manage the buttons to edit and save records, enableing or desableing them

enableNew preparing form for new registri.
validadeFields validates the required fields 
putMask this function puts mask in specied fields

MYREGEX has types

This types are the regular expressions for the data fields

validateUsername validates the user name, it need have more than three caracthers;
validateEmail validates if is a valid e-mail
validateStandField validates all others fields
validatePhone validates if is a real telfone number
validateState Validates if is a abreviation of state name
validateZip validates if the zipcode has a valid struture
justFone format the phone numeber field 
justNumber enable just numbers on field
*/


//global namespace

var MYCONN = MYCONN || {};
//subspacename

MYCONN.events = {};
// Method declaration with object

MYCONN.events = {


	showOneRecord: function(urlID) {
			if(urlID){
				playcntrl = "names.php?playcontroler=one&getnumberid="+urlID;
			}else{
				playcntrl = "names.php";
			}
		$.getJSON(playcntrl, function(result){
			$("#numberid").text(result[0].numberid);
			$("#firstName").val(result[0].givenname);
			$("#lastName").val(result[0].surname);
			$("#email").val(result[0].emailaddress);
			$("#city").val(result[0].city);
			$("#state").val(result[0].state);
			$("#validationServerUsername").val(result[0].username);
			$("#streetaddress").val(result[0].streetaddress);
			$("#zipcode").val(result[0].zipcode);
			var birthdaydate = new Date(result[0].birthday);
			$("#birthDate").val(birthdaydate.getFullYear()+"-"+("0" + (birthdaydate.getMonth())).slice(-2)+"-"+("0" + (birthdaydate.getDay())).slice(-2));
			$("#phoneNumber").val(result[0].telephonenumber);
			$('input[name=gender]').filter('[value='+ result[0].gender+']').prop('checked', true);
		});
	},
	showPrevNextRecord: function(cntrl) {
		var numberidval = $("#numberid").text();
		if(cntrl=='prev'){
			playcntrl = "names.php?playcontroler=prev&getnumberid="+numberidval;
		}else{
			playcntrl = "names.php?playcontroler=next&getnumberid="+numberidval;
		}
		$.getJSON(playcntrl, function(result){
			$("#numberid").text(result[0].numberid);
			$("#firstName").val(result[0].givenname);
			$("#lastName").val(result[0].surname);
			$("#email").val(result[0].emailaddress);
			$("#city").val(result[0].city);
			$("#state").val(result[0].state);
			$("#validationServerUsername").val(result[0].username);
			$("#streetaddress").val(result[0].streetaddress);
			$("#zipcode").val(result[0].zipcode);
			var birthdaydate = new Date(result[0].birthday);
			$("#birthDate").val(birthdaydate.getFullYear()+"-"+("0" + (birthdaydate.getMonth())).slice(-2)+"-"+("0" + (birthdaydate.getDay())).slice(-2));
			$("#phoneNumber").val(result[0].telephonenumber);
			$('input[name=gender]').filter('[value='+ result[0].gender+']').prop('checked', true);
		});
	},
	saveNewRecord: function() {
			var flagerror = 0;
			var numberidval = $("#numberid").text();
			var email = $("#email").val();
			var validationServerUsername = $("#validationServerUsername").val();
			var firstName = $("#firstName").val();
			var lastName = $("#lastName").val();
			var city = $("#city").val();
			var gender = $('input[name="gender"]:checked').val();
			var birthDate = $("#birthDate").val();
			var phoneNumber = $("#phoneNumber").val();
			var state = $("#state").val();
			var streetaddress = $("#streetaddress").val();
			var zipcode = $("#zipcode").val();

			if (MYREGEX.types.validateEmail(email)) {
				$("#email").css('border-color','green');
				$("#email").css('color','green');	
			}else{
				$("#email").css('border-color','red');
				$("#email").css('color','red');	
				flagerror = 1;
			}
			if (MYREGEX.types.validateUsername(validationServerUsername)) {
				$("#validationServerUsername").css('border-color','green');
				$("#validationServerUsername").css('color','green');	
			}else{
				$("#validationServerUsername").css('border-color','red');
				$("#validationServerUsername").css('color','red');	
				flagerror = 1;
			}
			if (MYREGEX.types.validatePhone(phoneNumber)) {
				$("#phoneNumber").css('border-color','green');
				$("#phoneNumber").css('color','green');	
			}else{
				$("#phoneNumber").css('border-color','red');
				$("#phoneNumber").css('color','red');	
				flagerror = 1;
			}
			if (Date.parse(birthDate)) {
				$("#birthDate").css('border-color','green');
				$("#birthDate").css('color','green');	
			} else {
				$("#birthDate").css('border-color','red');
				$("#birthDate").css('color','red');
				flagerror = 1;
			}
			if(!flagerror){
				var jsonpostdata = '[{ "getnumberid" : "'+numberidval+'", "email" : "'+email+'", "validationServerUsername" : "'+validationServerUsername+'", "firstName" : "'+firstName+'", "lastName" : "'+lastName+'", "city" : "'+city+'", "gender" : "'+gender+'", "birthDate" : "'+birthDate+'", "phoneNumber" : "'+phoneNumber+'", "state" : "'+state+'", "streetaddress" : "'+streetaddress+'", "zipcode" : "'+zipcode+'" }]';
				insertjsonpage = "insertname.php";
				$.post(insertjsonpage,jsonpostdata, function (result) {
					resultreturn = $.parseJSON(result);
					MYFORM.events.enableEdit(resultreturn.getnumberid);
				});
			}
	},
	

}

var MYFORM = MYFORM || {};


MYFORM.events = {};

MYFORM.events = {


	enableEdit: function(retnumberid) {
			if($("#frmcontrol input").prop("disabled")){
				$("#frmcontrol input").prop("disabled", false);
				$("#btnsave").prop("disabled", false);
				$("#btnn").prop("disabled", true);
				$("#btnp").prop("disabled", true);
				$("#btnnew").prop("disabled", true);
				$("#btnsort").prop("disabled", true);
				$("#btnedit").text("Cancel");
				$("#btnedit").css('background-color','red');
			}else{
				$("#btnnew").prop("disabled", false);
				$("#frmcontrol input").prop("disabled", true);
				$("#btnsave").prop("disabled", true);
				$("#btnn").prop("disabled", false);
				$("#btnp").prop("disabled", false);
				$("#btnedit").text("Edit");
				$("#btnsort").prop("disabled", false);
				$("#btnedit").css('background-color','');
				$("#frmcontrol input").css('border-color','');
				$("#frmcontrol input").css('color','');
				var numberidval = $("#numberid").text();
				if(retnumberid){
					MYCONN.events.showOneRecord(retnumberid);
				}else{
					if(numberidval=="New Record"){
						MYCONN.events.showOneRecord();
					}else{
						MYCONN.events.showOneRecord(numberidval);
					}
				}
				
			}
			
	},
	
	enableNew: function() {	
				$("#frmcontrol input").prop("disabled", false);
				$("#btnsave").prop("disabled", false);
				$("#btnnew").prop("disabled", true);
				$("#btnsort").prop("disabled", true);
				$("#btnn").prop("disabled", true);
				$("#btnp").prop("disabled", true);
				$("#btnedit").text("Cancel");
				$("#btnedit").css('background-color','red');
				$("#numberid").text("New Record");
				$("#frmcontrol input").val("");
				$("#femaleRadio").val("female");
				$("#maleRadio").val("male");
			
	},
	
	validadeFields: function(xfield) {	
			switch(xfield.id) {
				case "validationServerUsername":
					if (MYREGEX.types.validateUsername(xfield.value)) {
						$(xfield).css('border-color','green');
						$(xfield).css('color','green');	
					}else{
						$(xfield).css('border-color','red');
						$(xfield).css('color','red');	
					}
				break;
				case "email":
					if (MYREGEX.types.validateEmail(xfield.value)) {
						$(xfield).css('border-color','green');
						$(xfield).css('color','green');	
					}else{
						$(xfield).css('border-color','red');
						$(xfield).css('color','red');	
					}
				break;
				case "phoneNumber":
					if (MYREGEX.types.validatePhone(xfield.value)) {
						$(xfield).css('border-color','green');
						$(xfield).css('color','green');	
					}else{
						$(xfield).css('border-color','red');
						$(xfield).css('color','red');	
					}
				break;
				case "state":
					if (MYREGEX.types.validateState(xfield.value)) {
						$(xfield).css('border-color','green');
						$(xfield).css('color','green');	
					}else{
						$(xfield).css('border-color','red');
						$(xfield).css('color','red');	
					}
				break;
				case "zipcode":
					if (MYREGEX.types.validateZip(xfield.value)) {
						$(xfield).css('border-color','green');
						$(xfield).css('color','green');	
					}else{
						$(xfield).css('border-color','red');
						$(xfield).css('color','red');	
					}
				break;
				default:
					if (MYREGEX.types.validateStandField(xfield.value)) {
						$(xfield).css('border-color','green');
						$(xfield).css('color','green');	
					}else{
						$(xfield).css('border-color','red');
						$(xfield).css('color','red');	
					}
				break;
			}
	},
	
	putMask: function(vobj, vfun) {
		switch(vobj.id) {
			case "phoneNumber":
					setTimeout(vobj.value=MYREGEX.types.justFone(vobj.value),1);					
			break;
			case "zipcode":
					setTimeout(vobj.value=MYREGEX.types.justNumber(vobj.value),1);					
			break;
		}
	},
}
var MYREGEX = MYREGEX || {};

MYREGEX.types = {};

MYREGEX.types = {	
	
	validateUsername: function(xfieldvalue) {
		var regularExpression = /^[a-zA-Z0-9]+\w{3,}$/;
             return regularExpression.test(xfieldvalue);
	},
	validateEmail: function(xfieldvalue) {
		var regularExpression = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))){2,6}$/i;
             return regularExpression.test(xfieldvalue);
	},
	validateStandField: function(xfieldvalue) {
		var regularExpression = /^[a-zA-Z]+$/;
             return regularExpression.test(xfieldvalue);
	},
	validatePhone: function(xfieldvalue) {
		var regularExpression = /^(\(11\) [9][0-9]{4}-[0-9]{4})|(\(1[2-9]\) [5-9][0-9]{3}-[0-9]{4})|(\([2-9][1-9]\) [5-9][0-9]{3}-[0-9]{5})$/;
             return regularExpression.test(xfieldvalue);
	},
	validateState: function(xfieldvalue) {
		var regularExpression = /^[a-zA-Z]+\w{1,}$/;
             return regularExpression.test(xfieldvalue);
	},
	validateZip: function(xfieldvalue) {
		var regularExpression = /^[0-9]{6,10}$/;
             return regularExpression.test(xfieldvalue);
	},
	justFone: function(v) {
		v = v.replace( /\D/g , ""); 
		v = v.replace( /(\d{0})(\d)/ , "$1($2"); 
		v = v.replace( /(\d{2})(\d)/ , "$1) $2");
		v = v.replace( /(\d{4})(\d)/ , "$1-$2"); 
		return v;
	},
	justNumber: function(v) {
		return v.replace(/\D/g,"");
	},
}
