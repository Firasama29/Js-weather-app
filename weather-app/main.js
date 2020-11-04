const api = {
    key: "b596664921015cabb6f4b942e09d2e5e",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery); //1. first

function setQuery(evt) { //2. second, a key is clicked
    if (evt.keyCode == 13) { //'13' is the Enter key
        getResults(searchbox.value);
    }
}

function getResults(query) { //result is fetched
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json(); //result is converted to json
        }).then(displayResults); //result is parsed
}


function displayResults(weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
    let temp = document.querySelector('.current .temp');
    //temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');

    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d) {
    let months = ["jaunary", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    let days = ["monday", "tuesday", "wednesday", "thursday", "Friday", "saturday", "sunday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();

    return `${day}  ${date} ${month} ${year}`;
}