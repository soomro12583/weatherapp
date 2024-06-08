const apiKey = "3fd00eb41b88c2332a6305fa2f4a6104";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "image/cloud.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "image/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "image/raining.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "image/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "image/mist.png";
        }
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value;
    checkWeather(city);
});

// You can also add functionality to handle pressing Enter key in the input box to trigger the search.
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = searchBox.value;
        checkWeather(city);
    }
});
