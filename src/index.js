let apiKey = `1b0ea497e82983c26b919b587144daf8`;
let city = "Portland";
let units = `imperial`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

function displayWeather(response) {
  console.log(response.data);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.main.temp);

  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;

  let currentCondition = document.querySelector("#weather-condition");
  currentCondition.innerHTML = response.data.weather[0].main;

  let lowTemp = document.querySelector("#low-temp");
  lowTemp.innerHTML = response.data.main.temp_min;

  let highTemp = document.querySelector("#high-temp");
  highTemp.innerHTML = response.data.main.temp_max;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
}
axios.get(apiUrl).then(displayWeather);
