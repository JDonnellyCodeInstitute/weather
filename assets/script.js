const apiKeyCode = "ecf9c35dccc24ecc834142452241808";
const apiUrlExample = `https://api.weatherapi.com/v1/current.json?key=${apiKeyCode}&aqi=no&q=`;

//Default at start
document.addEventListener("DOMContentLoaded", function() {
    displayWeather("Belfast");
});
/**
 * Main function which uses the weather API call data to display
 * location, wind speed, temperature and humidity.
 */
async function displayWeather(location) {
    try {
        const dataCheck = await fetch(apiUrlExample + location);

        if (!dataCheck.ok) {
            throw new Error(`HTTP error! status: ${dataCheck.status}`);
        }

        const response = await dataCheck.json();

        // Logging the selected elements to ensure required elements are visible in DOM
        const locationElement = document.querySelector('.location');
        const temperatureElement = document.querySelector('.temperature');
        const humidityElement = document.querySelector('.humidity');
        const windElement = document.querySelector('.wind');
        console.log(locationElement, temperatureElement, humidityElement, windElement);

        document.querySelector('.location').innerHTML = response.location.name;
        document.querySelector('.temperature').innerHTML = `${response.current.temp_c}°C`;
        document.querySelector('.humidity').innerHTML = `${response.current.humidity}%`;
        document.querySelector('.wind').innerHTML = `${response.current.wind_kph} km/hr`;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
}

        