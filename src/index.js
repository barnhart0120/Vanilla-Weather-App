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

function showFullMinutes() {
  let hour = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    let currentTime = document.querySelector("#time");
    currentTime.innerHTML = `${hour}:0${minutes}`;
  } else {
    let currentTime = document.querySelector("#time");
    currentTime.innerHTML = `${hour}:${minutes}`;
  }
  if (hour >= 12) {
    let timeFormat = document.querySelector("#am-pm");
    timeFormat.innerHTML = `PM`;
  } else {
    let timeFormat = document.querySelector("#am-pm");
    timeFormat.innerHTML = `AM`;
  }
}
showFullMinutes();

function displayWeather(response) {
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.main.temp);

  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;

  let currentCondition = document.querySelector("#weather-condition");
  currentCondition.innerHTML = response.data.weather[0].main;

  let lowTemp = document.querySelector("#low-temp");
  lowTemp.innerHTML = Math.round(response.data.main.temp_min);

  let highTemp = document.querySelector("#high-temp");
  highTemp.innerHTML = Math.round(response.data.main.temp_max);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}
let apiKey = `1b0ea497e82983c26b919b587144daf8`;
let city = "Portland";
let units = `imperial`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayWeather);
