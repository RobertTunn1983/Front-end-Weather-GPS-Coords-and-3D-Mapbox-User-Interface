//Author Robert Tunn, 2021

var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var humidity = document.querySelector('.humidity');
var sunrise = document.querySelector('.sunrise');
var sunset = document.querySelector('.sunset');
var desc = document.querySelector('.desc');
var wind = document.querySelector('.wind');
var latitude = document.querySelector('.latitude');
var longitude = document.querySelector('.longitude'); 
var placeNameButton = document.querySelector('.placeSubmit');
var coordinatesButton	= document.querySelector('.coordsSubmit');
var input = document.querySelector('.locationInput');
var latCoord = document.querySelector('.latCoord');
var lonCoord = document.querySelector('.lonCoord');
var address = document.querySelector('.address');
var addressButton = document.querySelector('.addressInputSubmit');

//RETRIEVAL OF DATA FROM OPENWEATHERMAP.ORG

//API key is 3774b063eae689a1ca8fa8229d45b18d
//Data returned always in Celcius and not Kelvin! &units=metric

placeNameButton.addEventListener('click', function(name){
	
	fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=3774b063eae689a1ca8fa8229d45b18d&units=metric')
		.then(response => response.json())
		.then(data => {
  
	var nameValue = data['name'];
	var tempValue = data['main']['feels_like'];
  	var descValue = data['weather'][0]['description'];
	var humidLevel = data['main']['humidity'];
	var windSpeed = data['wind']['speed'];

	//Take variables for sunrise and sunset variables from API		
	//This following code may need to be improved on and done through php for next semester		
	//Times for sunset and sunrise come as Unix timestamps 
	var sunriseTime = data['sys']['sunrise'];  	//Unix timestamp
	var sunsetTime = data['sys']['sunset'];		//Unix timestamp

	//Convert to milliseconds since 1 Jan 1970
	var sunriseTimeConvert = (sunriseTime * 1000);
	var sunsetTimeConvert = (sunsetTime * 1000);
	
	//Create Date objects
	var outputSunrise = new Date(sunriseTimeConvert);
	var outputSunset = new Date(sunsetTimeConvert);
				
	main.innerHTML = nameValue;
	latitude.innerHTML = "";
	longitude.innerHTML = "";
	
	//Output in HH:MM 24 Hours format using inbuilt Javascript getHours() and getMinutes() functions
	sunrise.innerHTML = "Sunrise is at: " + outputSunrise.getHours() + ":" + outputSunrise.getMinutes();
	sunset.innerHTML = "Sunset is at: " + outputSunset.getHours() + ":" + outputSunset.getMinutes();
	
	temp.innerHTML = "Current Temperature: " + tempValue + '&#8451';
	humidity.innerHTML = "Humidity: " + humidLevel + "%";
	wind.innerHTML = "Wind Speed: " + windSpeed + "mph";
	desc.innerHTML = "General remarks: " + descValue;
	})
})

//This retrieves the data from openweathermap API based on coordinates entered in second and third input boxes
coordinatesButton.addEventListener('click', function(name){
	
	fetch('http://api.openweathermap.org/data/2.5/weather?lat='+latCoord.value+'&lon='+lonCoord.value+'&appid=3774b063eae689a1ca8fa8229d45b18d&units=metric')
		.then(response => response.json())
		.then(data => {
  
	var nameValue = data['name'];
	var tempValue = data['main']['feels_like'];
  	var descValue = data['weather'][0]['description'];
	var humidLevel = data['main']['humidity'];
	var windSpeed = data['wind']['speed'];
	var sunriseTime = data['sys']['sunrise'];  	//Unix timestamp
	var sunsetTime = data['sys']['sunset'];		//Unix timestamp
	var sunriseTimeConvert = (sunriseTime * 1000);
	var sunsetTimeConvert = (sunsetTime * 1000);
	var outputSunrise = new Date(sunriseTimeConvert);
	var outputSunset = new Date(sunsetTimeConvert);
				
	main.innerHTML = nameValue;
	latitude.innerHTML = "";
	longitude.innerHTML = "";
	sunrise.innerHTML = "Sunrise is at: " + outputSunrise.getHours() + ":" + outputSunrise.getMinutes();
	sunset.innerHTML = "Sunset is at: " + outputSunset.getHours() + ":" + outputSunset.getMinutes();
	
	temp.innerHTML = "Current Temperature: " + tempValue + '&#8451';
	humidity.innerHTML = "Humidity: " + humidLevel + "%";
	wind.innerHTML = "Wind Speed: " + windSpeed + "mph";
	desc.innerHTML = "General remarks: " + descValue;
	})
})

//This retrieves the data from openweathermap API based on coordinates entered in second and third input boxes
coordinatesButton.addEventListener('click', function(name){
	
	fetch('http://api.openweathermap.org/data/2.5/weather?lat='+latCoord.value+'&lon='+lonCoord.value+'&appid=3774b063eae689a1ca8fa8229d45b18d&units=metric')
		.then(response => response.json())
		.then(data => {
  
	var nameValue = data['name'];
	var tempValue = data['main']['feels_like'];
  	var descValue = data['weather'][0]['description'];
	var humidLevel = data['main']['humidity'];
	var windSpeed = data['wind']['speed'];
	var sunriseTime = data['sys']['sunrise'];
	var sunsetTime = data['sys']['sunset'];
		
	main.innerHTML = nameValue;
	sunrise.innerHTML = "Sunrise is at: " + sunriseTime;
	sunset.innerHTML = "Sunset is at: " + sunsetTime;
	temp.innerHTML = "Current Temperature: " + tempValue + '&#8451';
	humidity.innerHTML = "Humidity: " + humidLevel + "%";
	wind.innerHTML = "Wind Speed: " + windSpeed + "mph";
	desc.innerHTML = "General remarks: " + descValue;
	})
})

//RETRIEVAL OF DATA FROM OPENCAGE API

//This retrieves GPS coordinates based on an address i.e. forward geocoding
//API key is 3132a3417e8e4a3294c93c57b2f5674f 
//Limited to first result so that e.g. Aberdeen does not return 23 different Aberdeens
//e.g. https://api.opencagedata.com/geocode/v1/json?q=42%2C+Don%20Street%2C+Old%20Aberdeen%2C+Scotland%2C&key=3132a3417e8e4a3294c93c57b2f5674f&pretty=1&limit=1
addressButton.addEventListener('click', function(name){
	
	fetch('https://api.opencagedata.com/geocode/v1/json?q='+address.value+'&key=3132a3417e8e4a3294c93c57b2f5674f&pretty=1&limit=1')
		.then(response => response.json())
		.then(data => {
  
	var nameValue = address.value;
	var latGrab = data['results'][0]['geometry']['lat'];
  	var lonGrab = data['results'][0]['geometry']['lng'];
	
	main.innerHTML = nameValue;
	latitude.innerHTML = "Latitude is: " + latGrab;
	longitude.innerHTML = "Longitude is: " + lonGrab;
	sunrise.innerHTML = "";
	sunset.innerHTML = "";
	temp.innerHTML = "";
	humidity.innerHTML = "";
	wind.innerHTML = "";
	desc.innerHTML = "";
	})
})

//RETRIEVAL OF DATA FROM MAPBOX API

//Access Token is pk.eyJ1Ijoicm9iZXJ0dHVubiIsImEiOiJja3doc3Z6YWIxMXAzMm9wbXN6ZmswN2lrIn0.LBKJGIUkoh7Lm_5nFNM9HQ

//INITIALISE MAP, STYLE AND STARTING POSITION
//Unique API key from MapBox website 
mapboxgl.accessToken = "pk.eyJ1Ijoicm9iZXJ0dHVubiIsImEiOiJja3doc3Z6YWIxMXAzMm9wbXN6ZmswN2lrIn0.LBKJGIUkoh7Lm_5nFNM9HQ";
    var instructions = document.getElementById('instructions');
    var map = new mapboxgl.Map({
        container: 'map',        
		//Customised sports style map with 3d terrain
		style: 'mapbox://styles/roberttunn/ckwhxh7ph1qa114pg8l7fh0h2', 
        //Starting point arbitrarily set to Ballater
		center: [-3.0405173, 57.0495064],
		//Start zoom set to 12
        zoom: 12, // starting zoom
    });
    
	//Geocoder
    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
    });

    //After the map style has loaded on the page, add a source layer and default
    //styling for a single point.
    map.on('load', function() {
        //Listen for the `result` event from the MapboxGeocoder that is triggered when a user
        //makes a selection and add a symbol that matches the result.
        geocoder.on('result', function(ev) {
            console.log(ev.result.center);
        });
    });

    var draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
            line_string: true,
            trash: true
        },
        styles: [
            {
                "id": "gl-draw-line",
                "type": "line",
                "filter": ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
                "layout": {
                    "line-cap": "round",
                    "line-join": "round"
                },
                "paint": {
                    "line-color": "#3b9ddd",
                    "line-dasharray": [0.2, 2],
                    "line-width": 4,
                    "line-opacity": 0.7
                }
            },
            //Vertexes
            {
                "id": "gl-draw-polygon-and-line-vertex-halo-active",
                "type": "circle",
                "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
                "paint": {
                    "circle-radius": 10,
                    "circle-color": "#FFF"
                }
            },
            //Vertex points
            {
                "id": "gl-draw-polygon-and-line-vertex-active",
                "type": "circle",
                "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
                "paint": {
                    "circle-radius": 6,
                    "circle-color": "#3b9ddd",
                }
            },
        ]
    });

	//Add Mapbox draw tool to the map
    map.addControl(draw);

    //Add create, update and delete actions
    map.on('draw.create', updateRoute);
    map.on('draw.update', updateRoute);
    map.on('draw.delete', removeRoute);

    //Use coordinates from self made line to form Mapbox Directions request
    function updateRoute() {
        removeRoute(); // overwrite any existing layers
        var data = draw.getAll();
        var lastFeature = data.features.length - 1;
        var coords = data.features[lastFeature].geometry.coordinates;
        var newCoords = coords.join(';');
        getMatch(newCoords);
    }

    //Make a MapBox Directions API request
    function getMatch(e) {
		//Call API, make XMLHttpRequest
		var url = 'https://api.mapbox.com/directions/v5/mapbox/walking/' + e
            +'?geometries=geojson&steps=true&access_token=' + mapboxgl.accessToken;
        var req = new XMLHttpRequest();
        req.responseType = 'json';
        req.open('GET', url, true);
        req.onload  = function() {   //Break down JSON
            var jsonResponse = req.response;
            var distance = jsonResponse.routes[0].distance*0.001;
            var duration = jsonResponse.routes[0].duration/60;
            var steps = jsonResponse.routes[0].legs[0].steps;
            var coords = jsonResponse.routes[0].geometry;

			console.log(coords);
            
			//Get route directions on load map
            steps.forEach(function(step){
                instructions.insertAdjacentHTML('beforeend', '<p>' + step.maneuver.instruction + '</p>');
            });
			
            //Get distance and duration, convert to miles (1 km = 0.621371 miles)
			//Round output time to nearest minute
            instructions.insertAdjacentHTML('beforeend', '<p>' +  'Distance: ' + (0.62 * distance).toFixed(2) + ' miles<br>Duration: ' + duration.toFixed(0) + ' minutes' + '</p>');

            //Add route to interactive map
            addRoute(coords);
        };
        req.send();
    }

    //Add route as a layer over the interactive map
    function addRoute (coords) {
        //Checkin case route is already loaded
        if (map.getSource('route')) {
            map.removeLayer('route');
            map.removeSource('route')
        } else {  //Otherwise output line in following format
            map.addLayer({
                "id": "route",
                "type": "line",
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "Feature",
                        "properties": {},
                        "geometry": coords
                    }
                },
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
				//Output route line in bright red
                "paint": {
                    "line-color": "#DE1F1F",
                    "line-width": 8,
                    "line-opacity": 0.8
                }
            });
        };
    }

    //Remove the layer if it already exists
    function removeRoute () {
        if (map.getSource('route')) {
            map.removeLayer('route');
            map.removeSource('route');
            instructions.innerHTML = '';
        } else  {
            return;
        }
    }

document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
