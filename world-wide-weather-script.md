World Wide Weather Test Script

Tests:

Action | Expectation | Pass/Fail
----- | ----- | -----
On Load Tests |  | 
Load page | User should receive a pop-up asking for approval for their location to be used | Pass
User provides location approval | Their location should automatically be searched and weather data displayed | Pass
User does not provide location approval | Page should default to a weather search for Belfast | Pass
Search Tests |  | 
Search valid location by clicking button | Page should display weather information for the searched location | Pass
Search invalid location by clicking button | An alert pop-up should appear explaining that the entry is invalid | Pass
Search valid location by pressing enter | Page should display weather information for the searched location | Pass
Search invalid location by pressing enter | An alert pop-up should appear explaining that the entry is invalid | Pass
Hover Tests |  | 
Hover over search image | Image should grow and title should provide additional information | Pass
Hover over weather icon | Image should grow and title should provide additional information | Pass
Hover over droplet icon | Image should grow and title should provide additional information | Pass
Hover over wind sleeve icon | Image should grow and title should provide additional information | Pass
Interactivity Tests |  | 
Click/tap weather icon | Explainer section at the bottom of the screen should detail weather condition | Pass
Click/tap droplet icon | Content should toggle between humidity % and rainfall in mm and explainer section at the bottom of the screen should detail humidity/rain based on the data point on display | Pass
Click/tap wind sleeve icon | Windspeed content should toggle between km/hr and mph and explainer section at the bottom of the screen should detail windspeed based on the data point on display | Pass
Click/tap temperature content | Temperature content should toggle between centigrade and Fahrenheit and explainer section at the bottom of the screen should detail temperature | Pass
Click/tap droplet content | Content should toggle between humidity % and rainfall in mm and explainer section at the bottom of the screen should detail humidity/rain based on the data point on display | Pass
Click/tap windspeed content | Windspeed content should toggle between km/hr and mph and explainer section at the bottom of the screen should detail windspeed based on the data point on display | Pass
Data Table Tests |  | 
Click "TO SUPPLEMENTARY DATA →" button | User is shown a table of data full of supplementary weather information | Pass
Click "TO STANDARD DATA ←" button | User is returned to the standard UI | Pass
Responsive Width Tests |  | 
Resize screen to phone size | All elements should fit the screen, be clearly legible where applicable and shouldn't overlap | Pass
Resize screen to tablet size | All elements should fit the screen, be clearly legible where applicable and shouldn't overlap | Pass
Resize screen to laptop size | All elements should fit the screen, be clearly legible where applicable and shouldn't overlap | Pass

Browsers: 

Action | Expectation | Pass/Fail
----- | ----- | -----
Action all of the above tests in Google Chrome | All tests should pass | Pass
Action all of the above tests in Microsoft Edge | All tests should pass | Pass
Action all of the above tests in Safari | All tests should pass | Pass