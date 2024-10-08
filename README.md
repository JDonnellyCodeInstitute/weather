# World Wide Weather

World Wide Weather is a simple web app that allows users to make API calls that provide feedback on the temperature, condition, humidity, rainfall and windspeed of a location of their choice. Points of importance will increase in size and display a title with extra information when the user hovers over them with their mouse, the user can also alternate between centigrade and fahrenheit, mph and km/h windspeed, as well as humidity and rainfall. Additionally, the user can pan to a more data-intensive table of potentially useful weather information.

![Responsive Mockup](assets/images/mock-up.png)

## The Five Planes of User Experience

- __The Strategy Plane__
  - Defining Goals and User Needs:
    - Our goal is to provide a user-friendly web app that allows users to search by location for various weather factors including wind speed, humidity and temperature.
    - User needs are clear, aesthetically pleasing presentation of the required information, easy and logical site navigation, such as the use of the search bar, and interactivity via responsive data points and a table of additional information.

- __The Scope Plane__
  - Determining Features and Content:
    - The main tools for the user are the search bar and search button. They can input a location, as the placeholder text suggests, and search by clicking the button or by hitting enter. A method is called to add their input to the API call that requests the weather data as a JSON. If they search for something that is not a recognised location they will receive an alert stating "Location not found. Please enter a valid location."
    - Upon a successful search, the user will see an image relevant to the weather condition stipulated in the JSON, the temperature, the humidity and the windspeed.
    - The user can hover over the icons for search, weather condition, humidity and windspeed and a string of additional information will appear on screen.
    - The user can click on any of the data pieces/ icons to get some alternate information.
    - The user can click the supplementary data button and view a table of information such as wind direction, location information, and UV index.
    - There is a visually appealing background image of the sky.

- __The Structure Plane__
  - Setting the Sitemap:
    - Search Bar and Button - Set at the highest point of the user interface for ease of use.
    - Weather Icon and Temperature - Largest and most relevant information in the centre of the screen.
    - Sub-data - Humidity and Windspeed sections smaller housed low to left and right of centre.
    - Supplementary data - Can be clicked to change the user's screen entirely.
    - Additional information - Changing line at the bottom of the site that reacts to user clicks.

- __The Skeleton Plane__
  - The layout and navigation design plan across device types can be seen below. Note that at inception the idea for the table of supplementary data hadn't yet been suggested.

    [Wireframe Desktop](assets/images/wireframe-laptop.png)
    [Wireframe Tablet](assets/images/wireframe-tablet.png)
    [Wireframe Mobile](assets/images/wireframe-mobile.png)

- __The Surface Plane__
  - The Visual Design:
    - The focus area is a cool blue gradient reminiscent of the sky and is translucent so the user can see the attractive background image.
    - The font is Montserrat taken from Google Fonts, it is simple, clear and attractive. The colour contrasts well with the background.
    - The condition images are clear and show an array of weather conditions through simple icons.

## Features

- __User Interface__
  - The UI is laid out to be simple, attractive and easy to use.

![User Interface](assets/images/full-screen.png)

- __Search Bar__

  - The search bar takes user input in the form of a location, when the user initiates a search by hitting enter or clicking on the search button the interactive area of the page will display the weather details of the location the user has entered. Except in cases where the input is not a valid location in which case the user will get an alert to say so.
  - The user is guided on the required info by the placeholder text, when phone/tablet users tap the search button it will increase in size, when laptop users hover over the search button the button will increase in size and a line of text will pop up that says 'Click to search'.

![Search Bar](assets/images/search-bar.png)
![Invalid Input](assets/images/invalid-input.png)

- __Weather Icon, Temperature and Location__ 

  - The weather icon changes depending on the condition field in the weather data pulled from the JSON.
  - When the phone/tablet user taps on the weather icon it increases in size, when the laptop user hovers over the weather icon it increases in size and a line of text appears on screen stating the current weather condition.
  - Users can click on the weather icon and the text at the bottom of the page will show the weather condition.
  - Users can click on the temperature to toggle between centigrade and fahrenheit.
  - Temperature is the largest text on the page as the most important written data.
  - The location can be seen just under the temperature.

![Weather Icon, Temperature and Location](assets/images/temp-icon-location.png)

- __Humidity and Windspeed__ 

  - The bottom section of the user interface displays both the humidity and the windspeed at the chosen location.
  - Phone/tablet users can tap on the icons and they will increase in size, the laptop/desktop user can hover over the icons and they will increase in size and they will see a short description of what each feature means. When either type of user clicks on the data points the text at the bottom of the screen will change to give a more detailed explanation of each data point.
  - All users can click/tap the windspeed text/icon to toggle between windspeed in km/hr and mph, or the droplet icon/text and toggle between precipitation and humidity.

![Humidity and Windspeed](assets/images/humidity.png)

- __Supplementary Table of Data__ 

  - The user can click the button that says "TO SUPPLEMENTARY DATA →" to be brought to a table with a wide variety of additional location and weather information.
  - When looking at the table the user will be able to return to the main page by clicking the button that says "TO STANDARD DATA ←".

![Data Table](assets/images/table.png)

## Bugs

  - FIXED: Wind and humidity icons pushing each other out of the UI area when clicked on, fixed with media query
  - FIXED: Incorrect selector used for table of data event listener causing the whole body to be hidden
  - FIXED: Explainer section overlapping with other elements due to fixed position, fixed with media queries
  - Outstanding: Inconsistencies in geolocation across different browsers - this is not something the dev will be able to fix as this is an issue with the API itself and is outside the scope of this project

## Testing 

We undertook a broad array of tests across Google Chrome, Microsoft Edge and Safari as proof of the efficacy of the site.

Testing was mainly focused on functionality and responsivity. The full test script can be observed by going to the file below. No tests failed.

[World Wide Weather Test Script](world-wide-weather-script.md)

### Validator Testing 

- HTML

  - No errors were returned when passing through the official [W3C validator](https://validator.w3.org/) - screenshots confirming the same are linked below
  - [index.html validation](assets/images/html-check.png)

- CSS
  - No errors were found when passing through the official [Jigsaw validator](https://jigsaw.w3.org/css-validator/)
  - [style.css validation](assets/images/css-check.png)

- JavaScript
  - No errors were found when passing through the official [JSHint](https://jshint.com/), the only warning was the use of an async function which is only available in ES8 upward
  -[script.js validation](assets/images/js-validation.png)

### Lighthouse Scores

The lighthouse evaluation is a dev ops tool that allows you to get a score measured on performance, accessibility, best practices, and search engine optimisation. The aim is to have a score of over 90 for each evaluation point. Below are the World Wide Weather scores:

![Lighthouse](assets/images/lighthouse.png)

## Deployment

- The site was deployed to GitHub pages. The steps to deploy are as follows: 
  - In the GitHub repository, navigate to the Settings tab
  - On the left-hand sidebar, in the Code and Automation section, select Pages.
  Ensure:
    -  Source is set to 'Deploy from Branch'.
    -  Main branch is selected.
    -  Folder is set to / (root).
  - Under Branch, click Save.
  - Go to Code tab - refresh after a few minutes.
  - Under Environments on the right-hand side click 'github-pages' then View Deployment to see the sight.

### Cloning and Forking

The code can be easily cloned and forked in GitHub

Cloning is the process of completely recreating the code in a directory on your local system with the intent to change/add to it and reincorporate it in the existing site, forking is more akin to branching off with the intention of building on the code and creating something separate of your own.

To clone:
  - Go to the repository in GitHub and hit the button that says <>Code.
  - Once clicked, details for cloning either via HTTP or SSH will appear, the below example shows HTTP.
  - Copy the URL.
  - Use git clone and enter the URL in a git-attuned terminal to create an exact copy of the code locally.

To fork:
  - Go to the repository in GitHub, choose the file you wish to edit, click the edit button, then GitHub will respond with a pop-up to say you do not have write access to the code.
  - At this point, you may opt to fork.
  - The ability to do this is dependent on the author's privacy settings.

## Credits

  - I did the following walkthrough on YouTube as the initial guidance for the project and built on it https://www.youtube.com/watch?v=MIYQR-Ybrn4.
  - The explanation for deployment was taken from Code Institute's Love Running tutorial.
  - For design planning, I used the app Balsamiq Wireframes.
  - For guidance on using geolocation API I went to [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API).
  - Guidance on the proper use of forEach loops was taken from [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) also.

### Content
  - Fonts taken from [Google Fonts](https://fonts.google.com/)
  - Weather API sourced from [weatherapi.com](https://www.weatherapi.com/)

### Media
  - Weather icons taken from [Icon Finder](https://www.iconfinder.com/)
  - [Pexels](https://www.pexels.com/photo/cloudy-sky-531756/) used for background image 
