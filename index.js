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
let iMax =  6; //Pictures Count + 1

//Define Variable to hold setIntreval() function
let interval = null;

//Define Variable to hold stopwatch status
let status = "stopped";


//Stopwatch logic
//window.alert("Here");
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
	window.clearInterval(interval);
	mseconds = 0;
	seconds = 0;
	minutes = 0;
	hours = 0;
	status = "stopped";
	if (i + 1 < iMax){
		document.getElementById("img").setAttribute('src', "images/p" + (i + 1).toString() + ".png");
		i ++;
		startStop();
	}
	else{
		//Show the first page again
		endingPage()
		//Call the CSV Creation Function
		createCSV(ResultArr);
		i = 1;
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
	document.getElementById("Start").style.display='inline';
	document.getElementById("img").setAttribute('src', "images/Start.png");
	startStop();

}

//Function to Create a CSV file
function createCSV(paramArray){
	
	let csvContent = "data:text/csv;charset=utf-8,";

	paramArray.forEach(function(rowArray) {
		let row = rowArray.join(",");
		csvContent += row + "\r\n";
	});

	var encodedUri = encodeURI(csvContent);
	window.open(encodedUri);
	window.open('mailto:omarloay.95@gmail.com?subject="Hello"&body="Hellooooo"');
	//window.open('mailto:omarloay.95@gmail.com');

}

//Later
function sendCSV(csvFile){

	var downloadLink = document.createElement("a");
	var blob = new Blob(["\ufeff", csvFile]);
	var url = URL.createObjectURL(blob);
	downloadLink.href = url;
	downloadLink.download = "data.csv";

	document.body.appendChild(downloadLink);
	downloadLink.click();
	document.body.removeChild(downloadLink);
	
}


//End of everything