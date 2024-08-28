//Const element declarations
const locationElement = document.querySelector('.location');
const temperatureElement = document.querySelector('.temperature');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');
const icon = document.querySelector('.icon');
const windSleeve = document.getElementById('wind-sleeve');
const droplet = document.getElementById('water');
const explainerElement = document.querySelector('.explainer');
const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search');

//Table specific const declarations
const showTableButton = document.getElementById('show-table');
const hideTableButton = document.getElementById('hide-table');
const tableView = document.getElementById('table-view');
const weatherTableBody = document.querySelector('#weather-table tbody');

//API and URL info
const apiKeyCode = "ecf9c35dccc24ecc834142452241808";
const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKeyCode}&aqi=no&q=`;

// Default at start
document.addEventListener("DOMContentLoaded", () => {
    getUserLocation();
    setupEventListeners();
    // Logging to ensure required elements are visible in DOM and for ease of testing API call response
    console.log(locationElement, temperatureElement, humidityElement, windElement);
});

/**
 * Attempts to get the user's location and fetches weather data for that location.
 */
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                displayWeather(`${lat},${lon}`);
            },
            error => {
                console.error("Error getting location: ", error);
                // Fallback to a default location if the user denies location access or there's an error
                displayWeather("Belfast");
            }
        );
    } else {
        // Geolocation is not supported by the browser, use a default location
        displayWeather("Belfast");
    }
}

/**
 * Sets up event listeners for the search functionality.
 */
function setupEventListeners() {
    searchButton.addEventListener("click", handleSearch);
    searchBar.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            handleSearch();
        }
        
    });
    temperatureElement.addEventListener("click", toggleTemperature);
    icon.addEventListener("click", displayWeatherCondition);

    windElement.addEventListener("click", toggleWindspeed);
    windSleeve.addEventListener("click", toggleWindspeed);

    humidityElement.addEventListener("click", toggleHumidity);
    droplet.addEventListener("click", toggleHumidity);
}

/**
 * Handles the search event.
 */
function handleSearch() {
    const place = searchBar.value;
    displayWeather(place);
}

/**
 * Main function which uses the weather API call data to display
 * location, wind speed, temperature and humidity as well as changing the weather icon.
 * @param {string} location 
 */
async function displayWeather(location) {
    try {
        const dataCheck = await fetch(apiUrl + location);

        if (!dataCheck.ok) {
            throw new Error(`HTTP error! status: ${dataCheck.status}`);
        }

        const response = await dataCheck.json();

        // Logging to ensure required elements are visible in DOM and for ease of testing API call response
        console.log(response);

        //Store condition
        condition = `${response.current.condition.text}`;
        // Store temperatures in both units
        temperatureCelsius = `${response.current.temp_c}°C`;
        temperatureFahrenheit = `${response.current.temp_f}°F`;
        //Store windspeed in both units
        windspeedKmh = `${response.current.wind_kph} km/hr<br>Windspeed`;
        windspeedMph = `${response.current.wind_mph} miles/hr<br>Windspeed`;
        //Store humidity and precipitation
        humidity = `${response.current.humidity}%<br>Humidity`;
        rain = `${response.current.precip_mm}mm<br>Rainfall`;

        //Display data
        updateDOM(response);
        setWeatherIcon(condition);

    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        alert("Location not found. Please enter a valid location.");
    }
}

/**
 * Updates the DOM elements with weather data.
 */
function updateDOM(response) {
    locationElement.innerHTML = response.location.name;
    temperatureElement.innerHTML = `${response.current.temp_c}°C`;
    humidityElement.innerHTML = `${response.current.humidity}%<br>Humidity`;
    windElement.innerHTML = `${response.current.wind_kph} km/hr<br>Windspeed`;
}

/**
 * Sets the weather icon based on the condition.
 */
function setWeatherIcon(condition) {
    
    // Give user condition info when they hover over the icon
    icon.title = condition;

    //Default for icon source
    let iconSrc = "assets/images/1530392_weather_sun_sunny_temperature_icon.png";

    if (condition === "Sunny" || condition === "Clear") {
        iconSrc = "assets/images/1530392_weather_sun_sunny_temperature_icon.png";
    } else if (condition === "Partly cloudy" || condition === "Cloudy") {
        iconSrc = "assets/images/1530369_weather_cloud_clouds_cloudy_icon.png";
    } else if (["Mist", "Fog", "Freezing fog"].includes(condition)) {
        iconSrc = "assets/images/2682821_fog_foggy_forecast_mist_weather_icon.png";
    } else if (["Overcast", "Patchy light rain with thunder", "Moderate or heavy rain with thunder"].includes(condition)) {
        iconSrc = "assets/images/2682845_cloud_cloudy_forecast_rain_sun_icon.png";
    } else if ([
        "Patchy rain possible", "Patchy light drizzle", "Light drizzle", "Patchy light rain", "Light rain",
        "Moderate rain at times", "Moderate rain", "Heavy rain at times", "Heavy rain", "Light rain shower",
        "Moderate or heavy rain shower", "Torrential rain shower"
    ].includes(condition)) {
        iconSrc = "assets/images/2995003_cloud_rain_weather_day_water_icon.png";
    } else if (["Thundery outbreaks possible", "Blowing snow", "Blizzard"].includes(condition)) {
        iconSrc = "assets/images/3741354_weather_wind_windy_icon.png";
    } else if ([
        "Patchy snow possible", "Patchy sleet possible", "Patchy freezing drizzle possible", "Freezing drizzle",
        "Heavy freezing drizzle", "Light freezing rain", "Moderate or heavy freezing rain", "Light sleet",
        "Moderate or heavy sleet", "Patchy light snow", "Light snow", "Patchy moderate snow", "Moderate snow",
        "Patchy heavy snow", "Heavy snow", "Ice pellets", "Light sleet showers", "Moderate or heavy sleet showers",
        "Light snow showers", "Moderate or heavy snow showers", "Light showers of ice pellets", "Moderate or heavy showers of ice pellets",
        "Patchy light snow with thunder", "Moderate or heavy snow with thunder"
    ].includes(condition)) {
        iconSrc = "assets/images/3741362_weather_cold_light snow_snow_icon.png";
    }

    icon.src = iconSrc;
}

/**
 * This increases interactivity by allowing users to switch between
 * centigrade and farenheit by clicking on the temperature
 */
function toggleTemperature() {
    if (temperatureElement.innerHTML === temperatureCelsius) {
        temperatureElement.innerHTML = temperatureFahrenheit;
        explainerElement.innerHTML = `<p>Current temperature level is ${temperatureFahrenheit}.</p>`;
    } else {
        temperatureElement.innerHTML = temperatureCelsius;
        explainerElement.innerHTML = `<p>Current temperature level is ${temperatureCelsius}.</p>`;
    }
}

/**
 * This increases interactivity by allowing users to switch between
 * kilometers/hr and miles/hr windspeed by clicking on the windspeed
 */
function toggleWindspeed() {
    if (windElement.innerHTML === windspeedKmh) {
        windElement.innerHTML = windspeedMph;
        explainerElement.innerHTML = `<p>Current readings show ${windspeedMph}.</p>`;
    } else {
        windElement.innerHTML = windspeedKmh;
        explainerElement.innerHTML = `<p>Current readings show ${windspeedKmh}.</p>`;
    }
}

/**
 * This increases interactivity by allowing users to switch between
 * humidity and precipitation by clicking on the humidity
 */
function toggleHumidity() {
    if (humidityElement.innerHTML.trim() === humidity.trim()) {
        humidityElement.innerHTML = rain;
        explainerElement.innerHTML = `<p>Current precipitation level is ${rain}.</p>`;
    } else {
        humidityElement.innerHTML = humidity;
        explainerElement.innerHTML = `<p>There is ${humidity} (water vapour) in the atmosphere.</p>`;
    }
}

/**
 * This function displays the current weather condition when the user clicks 
 * on the weather icon
 */
function displayWeatherCondition() {
    explainerElement.innerHTML = `<p>The current weather condition is ${condition}.</p>`;
}