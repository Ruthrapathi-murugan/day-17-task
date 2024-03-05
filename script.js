var res = fetch("https://restcountries.com/v3.1/all")
    .then((data) => data.json())
    .then((data1) => bar(data1));

var container = document.createElement("div");
container.className = "container";

var row = document.createElement("div");
row.className = "row";

function bar(data1) {
    for (var i = 0; i < data1.length; i++) {
        var col = document.createElement("div");
        col.className = "col-md-4";

        // Extracting country name, capital, flag, and region
        var countryName = data1[i].name.common;
        var capital = data1[i].capital[0];
        var flag = data1[i].flags.png;
        var region = data1[i].region;
        var countrycode  = data1[i].cca3;

        // Creating card HTML with country details and weather button
        col.innerHTML = `<div class="card" style="background-color: silver;" style="width: 18rem;">
            <div class="ruthra"><center> <h5 class="card-title" style="color:white;">${countryName}</h5><center></div>
            <img src="${flag}" class="card-img-top" alt="Flag" style="padding:50px;">
            <div class="card-body" ><center>
                <p class="card-text">Capital: ${capital}</p>
                <p class="card-text">Region: ${region}</p>
                <p class="card-text">countrycode: ${countrycode}</p>
                <button class="btn btn-primary" style="background-color: silver;" onclick="getWeather('${countryName}')">click for Weather</button>
                <div id="${countryName}-weather"></div> <!-- Weather element -->
            </div>
        </div>`;

        row.append(col);
        container.append(row);
        document.body.append(container);
    }
}

function getWeather(countryName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=903b35c41ff65545e7fe3903f2fbb43a`)
        .then(response => response.json())
        .then(data => {
            // Display weather information
            var weatherDiv = document.getElementById(`${countryName}-weather`);
            weatherDiv.innerHTML = `
                <p>Weather: ${data.weather[0].main}</p>
                <p>Description: ${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Humidity: ${data.main.humidity} %</p>
            `;
        })
        .catch(error => {
            console.log('Error fetching weather data:', error);
        });
}
