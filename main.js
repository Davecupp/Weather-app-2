// input form

var zipInput = document.getElementById('zipInput');
var weatherButton = document.getElementById('weatherButton');
var output = document.getElementById('output');

// Output
var city = document.getElementById('city')
var condition = document.getElementById('condition');
var tempKelvin = document.getElementById('tempKelvin');
var tempCelsius = document.getElementById('tempCelsius');
var tempFahrenheit = document.getElementById('tempFahrenheit'); 

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

		errorMessage.innerHtml = apiRequest.statusText;

		output.style.display = 'none';
		error.style.display = 'block';
	}
	
}


function parseResponse(results) {
	console.dir(results);

	// console.log(results.name); // <- works

	city.innerHtml = results.name;
	condition.innerHtml = results.weather[0].description;
	tempKelvin.innerHtml = Math.round(results.main.temp) + '&#176 K';
	tempCelsius.innerHtml = convertKToC(results.main.temp) + '&#176 C';
	tempFahrenheit.innerHtml = convertKToF(results.main.temp) + '&#176 F';

//	displaySeasonalImage(convertKToF)
}

// go back to 1:25 in the video. 

function convertKToC(kelvin) {
	return kelvin-273.15; 

}

function convertKToF(kelvin) {
	return ((kelvin*9)/5)-459.67; 

} 


function httpRequestOnError() {
	console.log('getWeather failed');
}

function parseResults(results) {
	console.log('Parsing the results from the API call.')
}