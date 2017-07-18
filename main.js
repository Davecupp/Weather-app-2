// input form

var zipInput = document.getElementById('zipInput');
var weatherButton = document.getElementById('weatherButton');
var output = document.getElementById('output');
var error = document.getElementById('error');

// Output
var city = document.getElementById('city');
var condition = document.getElementById('condition');
var tempKelvin = document.getElementById('tempKelvin');
var tempCelsius = document.getElementById('tempCelsius');
var tempFahrenheit = document.getElementById('tempFahrenheit'); 
var weatherImage = document.getElementById('weatherImage');

document.onreadystatechange = function () {
	if (document.readyState == "interactive") {
		weatherButton.onclick = getWeather;
	}
}

function getWeather() {
var url = "http://api.openweathermap.org/data/2.5/weather?zip=<zipCode>&us&appid=58e92c763df5499a2c9ae20da806e2dc";
 url = url.replace("<zipCode>",zipInput.value );
 console.log(url);
 apiRequest = new XMLHttpRequest();
 apiRequest.onload = catchResponse;
 apiRequest.onerror = httpRequestOnError;
 apiRequest.open('get', url, true);
 apiRequest.send();
}

function catchResponse() {
	if (apiRequest.statusText == 'OK') {
		console.log ('This was a good request');

		parseResponse(JSON.parse(apiRequest.responseText));
		output.style.display = 'block';
		error.style.display = 'none';
	} else {
	
		console.log ('This was a bad request');

		// errorMessage.innerHtml = apiRequest.statusText;

		output.style.display = 'none';
		error.style.display = 'block';
	}
	output.style.display = 'block';
}


function parseResponse(results) {
	console.dir(results);

 	console.log("Results Name: ", results.name); // <- works

 	console.log("city: ", city);


	city.innerHTML = results.name;
	condition.innerHTML = results.weather[0].description;
	tempKelvin.innerHTML = Math.round(results.main.temp) + '&#176 K';
	tempCelsius.innerHTML = convertKToC(results.main.temp) + '&#176 C';
	tempFahrenheit.innerHTML = convertKToF(results.main.temp) + '&#176 F';

	displaySeasonalImage(convertKToF(results.main.temp));
}

// go back to 1:25 in the video. 

function convertKToC(kelvin) {
	return Math.round(kelvin-273.15); 

}

function convertKToF(kelvin) {
	return Math.round(((kelvin*9)/5)-459.67); 

} 


function httpRequestOnError() {
	console.log('getWeather failed');

	errorMessage.innerHTML = apiRequest.statusText;

	output.style.display = 'none';
	error.style.display = 'block';
}

function parseResults(results) {
	console.log('Parsing the results from the API call.')
}

function displaySeasonalImage(fahr) {

	if(fahr > 75) {
	weatherImage.src = 'http://cdn.triathlete.com/wp-content/uploads/2012/07/shutterstock_109563572-650x421.jpg';
 
} else if (fahr > 65) {
	weatherImage.src = 'data:image/jpeg;base64,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';

} else {
	weatherImage.src = 'http://www.fieldandstream.com/sites/fieldandstream.com/files/styles/large_1x_/public/import/2015/winter.jpg?itok=aA57xUr1';
}
}









