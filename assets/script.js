//API and URL info
const apiKeyCode = "ecf9c35dccc24ecc834142452241808";
const apiUrlExample = `https://api.weatherapi.com/v1/current.json?key=${apiKeyCode}&aqi=no&q=`;

//Default at start
document.addEventListener("DOMContentLoaded", function () {
    displayWeather("Belfast");
});
//Facilitate use of search bar
document.getElementById('search').addEventListener("click", function () {
    let place = document.getElementById('search-bar').value;
    displayWeather(place);
})
//Allow use of enter button to search
document.getElementById('search-bar').addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        let place = document.getElementById('search-bar').value;
        displayWeather(place);
    }
})

/**
 * Main function which uses the weather API call data to display
 * location, wind speed, temperature and humidity as well as changing the weather icon.
 */
async function displayWeather(location) {
    try {
        const dataCheck = await fetch(apiUrlExample + location);

        if (!dataCheck.ok) {
            throw new Error(`HTTP error! status: ${dataCheck.status}`);
        }

        const response = await dataCheck.json();

        // Logging to ensure required elements are visible in DOM and for ease of testing API call response
        const locationElement = document.querySelector('.location');
        const temperatureElement = document.querySelector('.temperature');
        const humidityElement = document.querySelector('.humidity');
        const windElement = document.querySelector('.wind');
        console.log(locationElement, temperatureElement, humidityElement, windElement);
        console.log(response);

        document.querySelector('.location').innerHTML = response.location.name;
        document.querySelector('.temperature').innerHTML = `${response.current.temp_c}°C`;
        document.querySelector('.humidity').innerHTML = `${response.current.humidity}%`;
        document.querySelector('.wind').innerHTML = `${response.current.wind_kph} km/hr`;

        //Change weather icon depending on condition
        let condition = response.current.condition.text;
        let icon = document.querySelector('.icon');
        //Give user condition info when the hover over icon
        icon.title = `${condition}`;

        if (condition === "Sunny" ||
            condition === "Clear") {
            icon.src = "assets/images/1530392_weather_sun_sunny_temperature_icon.png";
        } else if (condition === "Partly cloudy" ||
            condition === "Cloudy") {
            icon.src = "assets/images/1530369_weather_cloud_clouds_cloudy_icon.png";
        } else if (condition === "Mist" ||
            condition === "Fog" ||
            condition === "Freezing fog") {
            icon.src = "assets/images/2682821_fog_foggy_forecast_mist_weather_icon.png";
        } else if (condition === "Overcast" ||
            condition === "Patchy light rain with thunder" ||
            condition === "Moderate or heavy rain with thunder"
        ) {
            icon.src = "assets/images/2682845_cloud_cloudy_forecast_rain_sun_icon.png";
        } else if (
            condition === "Patchy rain possible" ||
            condition === "Patchy light drizzle" ||
            condition === "Light drizzle" ||
            condition === "Patchy light rain" ||
            condition === "Light rain" ||
            condition === "Moderate rain at times" ||
            condition === "Moderate rain" ||
            condition === "Heavy rain at times" ||
            condition === "Heavy rain" ||
            condition === "Light rain shower" ||
            condition === "Moderate or heavy rain shower" ||
            condition === "Torrential rain shower"
        ) {
            icon.src = "assets/images/2995003_cloud_rain_weather_day_water_icon.png";
        } else if (
            condition === "Thundery outbreaks possible" ||
            condition === "Blowing snow" ||
            condition === "Blizzard"
        ) {
            icon.src = "assets/images/3741354_weather_wind_windy_icon.png"
        } else if (
            condition === "Patchy snow possible" ||
            condition === "Patchy sleet possible" ||
            condition === "Patchy freezing drizzle possible" ||
            condition === "Freezing drizzle" ||
            condition === "Heavy freezing drizzle" ||
            condition === "Light freezing rain" ||
            condition === "Moderate or heavy freezing rain" ||
            condition === "Light sleet" ||
            condition === "Moderate or heavy sleet" ||
            condition === "Patchy light snow" ||
            condition === "Light snow" ||
            condition === "Patchy moderate snow" ||
            condition === "Moderate snow" ||
            condition === "Patchy heavy snow" ||
            condition === "Heavy snow" ||
            condition === "Ice pellets" ||
            condition === "Light sleet showers" ||
            condition === "Moderate or heavy sleet showers" ||
            condition === "Light snow showers" ||
            condition === "Moderate or heavy snow showers" ||
            condition === "Light showers of ice pellets" ||
            condition === "Moderate or heavy showers of ice pellets" ||
            condition === "Patchy light snow with thunder" ||
            condition === "Moderate or heavy snow with thunder"
        ) {
            icon.src = "assets/images/3741362_weather_cold_light snow_snow_icon.png";
        }

    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        alert("Location not found. Please enter a valid location.");
    }
}