//Const element declarations
const locationElement = document.querySelector('.location');
const temperatureElement = document.querySelector('.temperature');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');

//API and URL info
const apiKeyCode = "ecf9c35dccc24ecc834142452241808";
const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKeyCode}&aqi=no&q=`;

// Default at start
document.addEventListener("DOMContentLoaded", () => {
    displayWeather("Belfast");
    setupEventListeners();
    // Logging to ensure required elements are visible in DOM and for ease of testing API call response
    console.log(locationElement, temperatureElement, humidityElement, windElement);
});

/**
 * Sets up event listeners for the search functionality.
 */
function setupEventListeners() {
    document.getElementById('search').addEventListener("click", handleSearch);
    document.getElementById('search-bar').addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            handleSearch();
        }
    });
}

/**
 * Handles the search event.
 */
function handleSearch() {
    const place = document.getElementById('search-bar').value;
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

        updateDOM(response);
        setWeatherIcon(response.current.condition.text);

    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        alert("Location not found. Please enter a valid location.");
    }
}

/**
 * Updates the DOM elements with weather data.
 */
function updateDOM(response) {
    document.querySelector('.location').innerHTML = response.location.name;
    document.querySelector('.temperature').innerHTML = `${response.current.temp_c}°C`;
    document.querySelector('.humidity').innerHTML = `${response.current.humidity}%`;
    document.querySelector('.wind').innerHTML = `${response.current.wind_kph} km/hr`;
}

/**
 * Sets the weather icon based on the condition.
 */
function setWeatherIcon(condition) {
    const icon = document.querySelector('.icon');
    // Give user condition info when they hover over the icon
    icon.title = condition;

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