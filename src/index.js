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

function displayTime() {
  let minutes = now.getMinutes();
  let hour = now.getHours();
  let lateHour = hour - 12;

  if (minutes > 10 && hour <= 12) {
    let currentTime = document.querySelector("#time");
    currentTime.innerHTML = `${hour}:${minutes}`;
  } else if (minutes < 10 && hour > 12) {
    let currentTime = document.querySelector("#time");
    currentTime.innerHTML = `${lateHour}:0${minutes}`;
  } else if (minutes > 10 && hour > 12) {
    let currentTime = document.querySelector("#time");
    currentTime.innerHTML = `${lateHour}:${minutes}`;
  } else if (minutes < 10 && hour <= 12) {
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
  let currentDate = document.querySelector("#date");
  currentDate.innerHTML = `${day}<br /> ${month} ${date}, ${year}`;
}
displayTime();

function displayForecast(response) {
  let forecast = document.querySelector("#weather-forecast");
  let forecastHTML = "";
  let days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="row">
              <div class="col-2"></div>
              <div class="col-3 my-auto text-center" id="forecast-day">${day}</div>
              <div class="col-2 my-auto text-center" id="forecast-icon"><img src="https://raw.githubusercontent.com/barnhart0120/Vanilla-Weather-App/main/Vanilla%20Weather%20App%20icons/Clear.png" width="50px"></div>
              <div class="col-3 my-auto text-center"> <span id="forecast-high"></span>° | <span id="forecast-low"></span>°</div>
              <div class="col-2"></div>
            </div>
            <div class="row">
              <div class="col-2"></div>
              <div class="col-8"><hr /></div>
              <div class="col-2"></div>
            </div>`;
    forecast.innerHTML = forecastHTML;
  });
}

function getForecast(coordinates) {
  let apiKey = `1b0ea497e82983c26b919b587144daf8`;
  let part = `current,minutely,hourly`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=${part}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  fahrenheitTemperature = response.data.main.temp;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(fahrenheitTemperature);

  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;

  let currentCondition = document.querySelector("#weather-condition");
  currentCondition.innerHTML = response.data.weather[0].description;

  fahrenheitLowTemp = response.data.main.temp_min;
  let lowTemp = document.querySelector("#low-temp");
  lowTemp.innerHTML = Math.round(fahrenheitLowTemp);

  fahrenheitHighTemp = response.data.main.temp_max;
  let highTemp = document.querySelector("#high-temp");
  highTemp.innerHTML = Math.round(fahrenheitHighTemp);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  windSpeedImperial = response.data.wind.speed;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(windSpeedImperial);

  let icon = document.querySelector("#weather-icon");
  icon.setAttribute(
    "src",
    `https://raw.githubusercontent.com/barnhart0120/Vanilla-Weather-App/main/Vanilla%20Weather%20App%20icons/${response.data.weather[0].main}.png`
  );
  getForecast(response.data.coord);
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
  celsiusTemp.innerHTML = Math.round((fahrenheitTemperature - 32) * 0.56);

  let tempUnit = document.querySelector(".temp-unit");
  tempUnit.innerHTML = "C";

  let highTemp = document.querySelector("#high-temp");
  highTemp.innerHTML = Math.round((fahrenheitHighTemp - 32) * 0.56);

  let lowTemp = document.querySelector("#low-temp");
  lowTemp.innerHTML = Math.round((fahrenheitLowTemp - 32) * 0.56);

  let lowUnit = document.querySelector(".low-unit");
  lowUnit.innerHTML = "C";
  let highUnit = document.querySelector(".high-unit");
  highUnit.innerHTML = "C";

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(windSpeedImperial * 1.609);

  let windUnit = document.querySelector(".wind-unit");
  windUnit.innerHTML = " km/h";

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = document.querySelector("#current-temp");
  fahrenheitTemp.innerHTML = Math.round(fahrenheitTemperature);

  let tempUnit = document.querySelector(".temp-unit");
  tempUnit.innerHTML = "F";

  let highTemp = document.querySelector("#high-temp");
  highTemp.innerHTML = Math.round(fahrenheitHighTemp);

  let lowTemp = document.querySelector("#low-temp");
  lowTemp.innerHTML = Math.round(fahrenheitLowTemp);

  let lowUnit = document.querySelector(".low-unit");
  lowUnit.innerHTML = "F";
  let highUnit = document.querySelector(".high-unit");
  highUnit.innerHTML = "F";

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(windSpeedImperial);

  let windUnit = document.querySelector(".wind-unit");
  windUnit.innerHTML = " mph";

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let fahrenheitTemperature = null;
let fahrenheitLowTemp = null;
let fahrenheitHighTemp = null;
let windSpeedImperial = null;

searchCity("Rome");
