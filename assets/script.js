const apiKeyCode = "ecf9c35dccc24ecc834142452241808";
const apiUrlExample = "http://api.weatherapi.com/v1/current.json?q=London&aqi=no";

async function getWeather() {
    const dataCheck = await fetch(apiUrlExample + `&key=${apiKeyCode}`);
    let response = await dataCheck.json();

    console.log(response);
}