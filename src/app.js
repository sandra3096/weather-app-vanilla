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

  getForecast(response.data.city);
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

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "ce31d48a35tdeac06fa6d59d3bofb4f7";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  for (let i = 1; i < response.data.daily.length && i < 6; i++) {
    let day = response.data.daily[i];
    forecastHtml += `
      <div class="weather-forecast-day">
        <div class="forecast-date">${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}" width="55"/>
        <div class="forecast-temperature">
          <span class="forecast-temperature-max">${Math.round(
            day.temperature.maximum
          )}°C</span> /
          <span class="forecast-temperature-min">${Math.round(
            day.temperature.minimum
          )}°C</span>
        </div>
      </div>`;
  }
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Cork");
