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

//Method variables
let temperatureCelsius;
let condition;
let temperatureFahrenheit;
let windspeedKmh;
let windspeedMph;
let humidity;
let rain;

// Default at start
document.addEventListener("DOMContentLoaded", () => {
    getUserLocation();
    setupEventListeners();
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
 * Sets up event listeners
 */
function setupEventListeners() {
    //For search events
    searchButton.addEventListener("click", handleSearch);
    searchBar.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            handleSearch();
        }   
    });

    //For interactivity toggles on main UI
    temperatureElement.addEventListener("click", toggleTemperature);
    icon.addEventListener("click", displayWeatherCondition);

    windElement.addEventListener("click", toggleWindspeed);
    windSleeve.addEventListener("click", toggleWindspeed);

    humidityElement.addEventListener("click", toggleHumidity);
    droplet.addEventListener("click", toggleHumidity);

    //For displaying table of advanced data
    showTableButton.addEventListener('click', () => {
        document.querySelector('.climate').classList.add('hidden');
        tableView.classList.remove('hidden');
    });

    hideTableButton.addEventListener('click', () => {
        tableView.classList.add('hidden');
        document.querySelector('.climate').classList.remove('hidden');
    });
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

        //Create table of data
        updateTable(response);

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

/**
 * This function is to allow the user to see a comprehensive breakdown of the 
 * weather data when they click the arrow pointing right
 */
function updateTable(response) {

    //clear before use
    weatherTableBody.innerHTML = "";

    //Weather data from 'current' section of API response
    const currentData = [
        { property: 'Feels Like (C)', value: `${response.current.feelslike_c}°C` },
        { property: 'Feels Like (F)', value: `${response.current.feelslike_f}°F` },
        { property: 'Dew Point (C)', value: `${response.current.dewpoint_c}°C` },
        { property: 'Dew Point (F)', value: `${response.current.dewpoint_f}°F` },
        { property: 'Wind Chill (C)', value: `${response.current.windchill_c}°C` },
        { property: 'Wind Chill (F)', value: `${response.current.windchill_f}°F` },
        { property: 'Wind Direction', value: `${response.current.wind_dir}` },
        { property: 'Precipitation (in)', value: `${response.current.precip_in} in` },
        { property: 'Visibility (km)', value: `${response.current.vis_km} km` },
        { property: 'Visibility (miles)', value: `${response.current.vis_miles} miles` },
        { property: 'UV Index', value: `${response.current.uv}` },
        { property: 'Last Updated', value: `${response.current.last_updated}` }
    ];

    // Data from the 'location' section of the API response
    const locationData = [
        { property: 'Location Name', value: response.location.name },
        { property: 'Country', value: response.location.country },
        { property: 'Latitude', value: `${response.location.lat}` },
        { property: 'Longitude', value: `${response.location.lon}` },
        { property: 'Local Time', value: `${response.location.localtime}` }
    ];

    // Combine the data
    const combinedData = [...locationData, ...currentData];

    //Populate each row with a corresponding property and value then append the row to the table
    combinedData.forEach(item => {
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');
        cell1.textContent = item.property;
        cell2.textContent = item.value;
        row.appendChild(cell1);
        row.appendChild(cell2);
        weatherTableBody.appendChild(row);
    });
}