// global variables
// change this back to the other key
const BKG_URL = "https://api.unsplash.com/photos/random?query=landscape,nature&client_id=xgrZsD-IRb-Hc2X8YKcrb-Az_FnTGy5VciL5UUSsdYM"
const icon = document.createElement('i')




// fetch background photo from unsplash
fetch(BKG_URL)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const imageUrl = data.urls.full
        document.body.style.backgroundImage = `url(${imageUrl})`

        // get location name
        const locationName = data.location.name ? data.location.name : 'Unknown Location'

        // create div element
        const div = document.createElement('div')

        // set text content of the div
        div.textContent = locationName
        document.body.appendChild(div)

        // create icon element
        icon.className = 'fas fa-map-marker-alt'

        // append icon to the div
        div.insertBefore(icon, div.firstChild)

        // css properties of icon
        icon.style.marginRight = '5px'


        // CSS properties of the div
        div.style.position = 'absolute'
        div.style.bottom = '5px'
        div.style.left = '8px'
        div.style.padding = '5px 10px'
        div.style.backgroundColor = '#2f2f2f'
        div.style.fontFamily = 'Lato'

    })
    // if unsplash api exceeds rate limit of 50 requests per hour
    .catch(error => {
        console.error('Error: can not load picture', error)
        document.body.style.backgroundImage ='url(images/fallback-bkg.png)'

        // div element for fallback image
        const div = document.createElement('div')
        div.textContent = 'Unknown Location'
        document.body.appendChild(div)
        div.style.position = 'absolute'
        div.style.bottom = '5px'
        div.style.left = '8px'
        div.style.padding = '5px 10px'
        div.style.backgroundColor = '#2f2f2f'
        div.style.fontFamily = 'Lato'
    })

// get data from crypto API
fetch('https://api.coingecko.com/api/v3/coins/dogecoin')
    .then(response => response.json())
    .then(data => {
        
        document.getElementById('crypto-top').innerHTML = `
        <div style = "margin-top: 15px; margin-left: 15px; margin-bottom: 10px">
            <img src=${data.image.small} />
            <span style="margin-left: 10px; text-transform: uppercase;">${data.name}</span>
        </div>
        <div class="crypto-info">
            <p>🎯 Price: $${data.market_data.current_price.usd}</p>
            <p>👆 High: $${data.market_data.high_24h.usd}</p>
            <p>👇 Low: $${data.market_data.low_24h.usd}</p>
        </div>
        `
    })
    .catch(error => console.error('Error:', error))
    


// get data from motivational quotes API
let quoteElement = document.querySelector("h2")

fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    let randomQuote = data[Math.floor(Math.random() * data.length)]
    quoteElement.innerHTML = randomQuote.text
  })


// get current time
  function updateTime() {
    try {
        var now = new Date();
        var formattedTime = now.toLocaleTimeString()
        var timeElement = document.getElementById("local-time")
        timeElement.textContent = formattedTime;
    } catch (error) {
        console.error("Error updating time:", error)
    }
}

window.onload = function () {
    updateTime()
    setInterval(updateTime, 1000)
};

// use geolocation API to get user's location for weather from OpenWeatherMap API
document.addEventListener('DOMContentLoaded', () => {
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(response => {
            if (!response.ok) {
                throw Error("Weather data not available")
            }
            return response.json()
        })
        .then(data => {
            const weatherIconCode = data.weather[0].icon;
            const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}.png`;
            const weatherDiv = document.getElementById('weather');
        
            // create div for weather icon and temperature
            const weatherInfoDiv = document.createElement('div');
            const imgElement = document.createElement('img');
            imgElement.src = weatherIconUrl;
            weatherInfoDiv.appendChild(imgElement);
            const temperature = Math.round(data.main.temp);
            const temperatureTextNode = document.createTextNode(`${temperature}°`);
            weatherInfoDiv.appendChild(temperatureTextNode);
            weatherDiv.appendChild(weatherInfoDiv);
        
            // create div for city name
            const cityNameDiv = document.createElement('div');
            const cityName = data.name;
            const cityTextNode = document.createTextNode(cityName);
            cityNameDiv.appendChild(cityTextNode);
            weatherDiv.appendChild(cityNameDiv);
        
            // create div for feels like
            const feelsLikeDiv = document.createElement('div');
            const feelsLike = Math.round(data.main.feels_like);
            const feelsLikeTextNode = document.createTextNode(`Feels Like: ${feelsLike}°`);
            feelsLikeDiv.appendChild(feelsLikeTextNode);
            weatherDiv.appendChild(feelsLikeDiv);
        
            // create div for humidity
            const humidityDiv = document.createElement('div');
            const humidity = data.main.humidity;
            const humidityTextNode = document.createTextNode(`Humidity: ${humidity}%`);
            humidityDiv.appendChild(humidityTextNode);
            weatherDiv.appendChild(humidityDiv);
        })
        .catch(error => console.error(error));
    })
})
