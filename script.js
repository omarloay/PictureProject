//Define Time Variables
let mseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let ResultArr  = [];

//Define Variables to hold "display" values
let displayMSeconds = 0;
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

//Pictures Counter
let i = 1;
let iMax =  7; //Pictures Count + 1

//Email Body
let emailBody = "";

//Define Variable to hold setIntreval() function
let interval = null;

//Define Variable to hold stopwatch status
let status = "stopped";


//Stopwatch logic
function stopWatch(){
	mseconds++;
	
	//When to add a second
	if (mseconds / 100 == 1){
		mseconds = 0;
		seconds++;
		if (seconds / 60 == 1) {
			seconds = 0;
			minutes++;
		}
	}
	

	//Leading zeroes logic
	if (mseconds < 10) {
		displayMSeconds = "0" + mseconds.toString();
	}
	else {
		displayMSeconds = mseconds;
	}
	if (seconds < 10) {
		displaySeconds = "0" + seconds.toString();
	}
	else {
		displaySeconds = seconds;
	}
	if (minutes < 10) {
		displayMinutes = "0" + minutes.toString();
	}
	else {
		displayMinutes = minutes;
	}

}


//Function to start and stop the stopwatch
function startStop(){

	if (status == "stopped"){
		//start the stop watch
		interval = window.setInterval(stopWatch, 10);
		status = "started";
		
	}
	else {
	
		window.clearInterval(interval);
		status = "stopped";
	}

}

//Function to go to the Next Picture
function next(){
	
	ResultArr [i] = ["Picture " + i, displayMinutes + ":" + displaySeconds + ":" + displayMSeconds];
	emailBody = emailBody + "Picture " + i + ": " + displayMinutes + ":" + displaySeconds + ":" + displayMSeconds + "<br>";
	window.clearInterval(interval);
	mseconds = 0;
	seconds = 0;
	minutes = 0;
	hours = 0;
	status = "stopped";
	if (i + 1 < iMax){
		document.getElementById("img").setAttribute('src', "images/P" + (i + 1).toString() + ".png");
		i ++;
		startStop();
	}
	else{
		//Show the first page again
		endingPage()
		//Call the Email Function
		sendEmail(emailBody);
		emailBody = "";
		i = 1;
		setTimeout(function(){document.getElementById("Start").style.display='inline'},2000);
	}
	
}

//Function to change the picture as the user press "Start Here"
function startingPage() {
	document.getElementById("next").style.display='inline';
	document.getElementById("Start").style.display='none';
	document.getElementById("img").setAttribute('src', "images/P"+ i +".png");
	startStop();

}

//Function for the Last Page
function endingPage() {
	
	document.getElementById("next").style.display='none';
	document.getElementById("Start").style.display='none';
	document.getElementById("img").setAttribute('src', "images/Start.png");
	startStop();

}


//Email Sending Function Uses SMTP
function sendEmail(emailBody) {
	Email.send({
	Host: "smtp.gmail.com",
	Username : "pixproject2022@gmail.com",
	Password : "Omar@123456",
	To : "Omarloay.95@gmail.com",
	From : "pixproject2022@gmail.com",
	Subject : "Pictures Project",
	Body : "Results: <br>" + emailBody,
	}).then(
		//message => alert("mail sent successfully")
	);
}

//End of everything
