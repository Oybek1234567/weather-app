const api = {
    key: "def5732e5c3a7cfa66806e593cf27fae",
    baseURL: "https://api.openweathermap.org/data/2.5/",
};
const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", setQuery);

function setQuery(event) {
    if (event.code == "Enter") {
        event.preventDefault();
        getResults(searchBox.value);
        console.log(searchBox.value);
    }
}
function getResults(query) {
    fetch(`${api.baseURL}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((weather) => {
            return weather.json();
        })
        .then(displayResults);
}
function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector(".location .city");
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector(".date");
    date.innerHTML = dateBuilder(now);
    let temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.round(weather.main.temp)} <span>°C</span>`;

    let weatherEl = document.querySelector(".weather");
    weatherEl.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector(".hi-low");
    hilow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
        weather.main.temp_max
    )}°C`;
}
function dateBuilder(o) {
    let month = [
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
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[o.getDay()];
    let date = o.getDate();
    let months = month[o.getMonth()];
    let year = o.getFullYear();
    return `${day} ${date} ${months} ${year}`;
}
