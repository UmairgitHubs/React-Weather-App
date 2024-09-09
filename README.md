Weather Dashboard App
This is a React-based weather dashboard that allows users to view and manage weather information for any city in the world. The app integrates the WeatherAPI to provide real-time weather updates and X-RapidAPI GeoDB for smart location suggestions in the search bar.

![Screenshot 2024-09-10 034155](https://github.com/user-attachments/assets/63f5f742-b5c1-4df8-856f-2511992d363b)


Features
-> Search Cities: Users can search for cities using the search bar, which provides location suggestions powered by the X-RapidAPI GeoDB API.
-> Real-Time Weather Data: Fetches live weather information, including temperature, humidity, wind speed, and weather conditions (clear, cloudy, misty, etc.), using the WeatherAPI.
-> Add Multiple Cities: Users can add multiple cities to their weather dashboard to monitor different locations at the same time.
-> Remove Cities: Cities can be easily removed from the list when they are no longer needed.
-> Responsive Design: The app is fully responsive, with a collapsible sidebar for city management on mobile devices.

Tech Stack
Frontend: React.js, SCSS
APIs:
WeatherAPI: For fetching real-time weather data.
X-RapidAPI GeoDB API: For providing city suggestions in the search bar.
Installation
Clone the repository:

bash
Copy code
https://github.com/UmairgitHubs/React-Weather-App.git
cd weather-dashboard
Install dependencies:

bash
Copy code
npm install
Create a .env file in the root of your project and add your API keys:

bash
Copy code
REACT_APP_WEATHER_API_KEY=your_weatherapi_key
REACT_APP_RAPIDAPI_KEY=your_rapidapi_key
Start the development server:

bash
Copy code
npm start
The app will run locally on http://localhost:3000/.

Usage
Add a City: Type a city name into the search bar, and select from the suggestions provided. The weather for the selected city will be displayed on the dashboard.
Remove a City: Click the "Remove" button next to any city in the list to remove it.
View Weather Data: After adding a city, the dashboard will display current temperature, weather conditions, and more.
API Integration
WeatherAPI: Used to fetch current weather data for selected cities, such as temperature, humidity, and weather conditions.
X-RapidAPI GeoDB API: Provides location suggestions as the user types into the search bar, allowing for quick and easy city selection.
Responsive Design
The app is fully responsive, with a collapsible sidebar for city management on mobile devices. When the app is viewed on smaller screens, the sidebar can be toggled with a hamburger menu icon.
