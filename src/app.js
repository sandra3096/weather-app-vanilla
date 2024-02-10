function refreshWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  let temperatureUnit = "°C";
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#weather-humidity");
  let windElement = document.querySelector("#weather-wind");
  let feelsLikeElement = document.querySelector("#weather-feels-like");
  let feelsLike = Math.round(response.data.temperature.feels_like);
  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#time-data");
  let dayElement = document.querySelector("#date-data");
  let iconElement = document.querySelector("#icon");
  let temperatureAndUnitElement = document.querySelector(
    "#temperature-and-unit"
  );
  let dayTime = formatDate(date) + " " + formatTime(date);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity} %`;
  windElement.innerHTML = `${response.data.wind.speed} km/h`;
  feelsLikeElement.innerHTML = `${feelsLike} ${temperatureUnit}`;
  dayElement.innerHTML = dayTime;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon">`;
  temperatureAndUnitElement.innerHTML = `${temperature}${temperatureUnit}`;
}

function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day}`;
}

function searchCity(city) {
  let apiKey = "ce31d48a35tdeac06fa6d59d3bofb4f7";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let city = searchInput.value;
  searchCity(city);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Cork");
