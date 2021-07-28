let url = "https://api.openweathermap.org/data/2.5/weather?q=Stockton,ca,usa&units=imperial&appid=c3f0a91bddaf387d60a31b1c24fef012";
let place = document.getElementById("place"),
    temp = document.getElementById("temp"),
    temp_min = document.getElementById("temp_min"),
    temp_max = document.getElementById("temp_max"),
    feels_like = document.getElementById("feels_like"),
    speed = document.getElementById("speed"),
    deg = document.getElementById("deg"),
    search = document.getElementById("search"),
    searchBtn = document.getElementById("searchBtn"),
    tempIcon = document.getElementById("temp-icon"),
    fav = document.getElementById('favBtn'),
    injectFav = document.getElementById('inject'),
    favArr = [],
    weatherArr = [],
    searchedCity = "";

function fetchWeather(url) {
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => {
           
            getWeather(data);
        })
}

function getWeather(weatherData) {
    // console.log('ran');
    // weatherArr = [];
    weatherArr.push(weatherData);
    // console.log(weatherData);
    let main = weatherData.main;
    place.innerText = `${weatherData.name}, ${weatherData.sys.country}`;
    temp.innerText = `${parseInt(main.temp)}`;
    temp_min.innerText = `L / ${parseInt(main.temp_min)}`;
    temp_max.innerText = `H / ${parseInt(main.temp_max)}`;
    feels_like.innerText =`Feels like / ${parseInt(main.feels_like)}`;
    speed.innerText = `Speed / ${parseInt(weatherData.wind.speed)}`;
    deg.innerText = `Degrees / ${parseInt(weatherData.wind.deg)}`;

}

search.addEventListener("keypress", function (event) {
    console.log(search.value);
    if (event.key == "Enter") {
        fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=imperial&appid=c3f0a91bddaf387d60a31b1c24fef012`);
    }
})
searchBtn.addEventListener('click', function () {
    console.log(`https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=imperial&appid=c3f0a91bddaf387d60a31b1c24fef012`);
    // alert(search.value);
    fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=imperial&appid=c3f0a91bddaf387d60a31b1c24fef012`);
})

favBtn.addEventListener('click', function(e){
    
    let colDiv = document.createElement('div');
    colDiv.classList = 'col';
    let pTag = document.createElement('p');
    pTag.innerText = search.value;
    console.log(pTag.innerText);
    colDiv.appendChild(pTag);
    injectFav.appendChild(colDiv);
})


fetchWeather(url);


