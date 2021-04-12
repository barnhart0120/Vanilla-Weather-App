let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();

let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${day}<br /> ${month} ${date}, ${year}`;

function displayTime() {
  let minutes = now.getMinutes();
  let hour = now.getHours();
  let lateHour = hour - 12;

  if (minutes > 10 && hour < 12) {
    let currentTime = document.querySelector("#time");
    currentTime.innerHTML = `${hour}:${minutes}`;
  } else if (minutes < 10 && hour > 12) {
    let currentTime = document.querySelector("#time");
    currentTime.innerHTML = `${lateHour}:0${minutes}`;
  } else if (minutes > 10 && hour > 12) {
    let currentTime = document.querySelector("#time");
    currentTime.innerHTML = `${lateHour}:${minutes}`;
  } else if (minutes < 10 && hour < 12) {
    let currentTime = document.querySelector("#time");
    currentTime.innerHTML = `${hour}:0${minutes}`;
  }

  if (hour >= 12) {
    let timeFormat = document.querySelector("#am-pm");
    timeFormat.innerHTML = `PM`;
  } else {
    let timeFormat = document.querySelector("#am-pm");
    timeFormat.innerHTML = `AM`;
  }
}
displayTime();

function displayWeather(response) {
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.main.temp);

  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;

  let currentCondition = document.querySelector("#weather-condition");
  currentCondition.innerHTML = response.data.weather[0].description;

  let lowTemp = document.querySelector("#low-temp");
  lowTemp.innerHTML = Math.round(response.data.main.temp_min);

  let highTemp = document.querySelector("#high-temp");
  highTemp.innerHTML = Math.round(response.data.main.temp_max);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}

function searchCity(city) {
  let apiKey = `1b0ea497e82983c26b919b587144daf8`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-bar");
  searchCity(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function convertToCelsius(event) {
  event.preventDefault();
  let celsiusTemp = document.querySelector("#current-temp");
  let temperature = celsiusTemp.innerHTML;
  celsiusTemp.innerHTML = Math.round((temperature - 32) * 0.56);

  let tempUnit = document.querySelector(".temp-unit");
  tempUnit.innerHTML = "C";

  let highTemp = document.querySelector("#high-temp");
  let highTempCelsius = highTemp.innerHTML;
  highTemp.innerHTML = Math.round((highTempCelsius - 32) * 0.56);

  let lowTemp = document.querySelector("#low-temp");
  let lowTempCelsius = lowTemp.innerHTML;
  lowTemp.innerHTML = Math.round((lowTempCelsius - 32) * 0.56);

  let lowUnit = document.querySelector(".low-unit");
  lowUnit.innerHTML = "C";
  let highUnit = document.querySelector(".high-unit");
  highUnit.innerHTML = "C";

  let windSpeed = document.querySelector("#wind-speed");
  let windSpeedMetric = windSpeed.innerHTML;
  windSpeed.innerHTML = Math.round(windSpeedMetric * 1.609);

  let windUnit = document.querySelector(".wind-unit");
  windUnit.innerHTML = " km/h";
}
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = document.querySelector("#current-temp");
  let temperature = fahrenheitTemp.innerHTML;
  fahrenheitTemp.innerHTML = Math.round(temperature * 1.8 + 32);

  let tempUnit = document.querySelector(".temp-unit");
  tempUnit.innerHTML = "F";

  let highTemp = document.querySelector("#high-temp");
  let highTempFahrenheit = highTemp.innerHTML;
  highTemp.innerHTML = Math.round(highTempFahrenheit * 1.8 + 32);

  let lowTemp = document.querySelector("#low-temp");
  let lowTempFahrenheit = lowTemp.innerHTML;
  lowTemp.innerHTML = Math.round(lowTempFahrenheit * 1.8 + 32);

  let lowUnit = document.querySelector(".low-unit");
  lowUnit.innerHTML = "F";
  let highUnit = document.querySelector(".high-unit");
  highUnit.innerHTML = "F";

  let windSpeed = document.querySelector("#wind-speed");
  let windSpeedImperial = windSpeed.innerHTML;
  windSpeed.innerHTML = Math.round(windSpeedImperial / 1.609);

  let windUnit = document.querySelector(".wind-unit");
  windUnit.innerHTML = " mph";
}
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

searchCity("Rome");
