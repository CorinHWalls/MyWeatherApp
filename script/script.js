let url = "https://api.openweathermap.org/data/2.5/weather?q=Stockton,ca,usa&units=imperial&appid=597ea5faa7bc25bc18db1409a633aa87";
let = urlForcast = "https://api.openweathermap.org/data/2.5/forecast?q=stockton&units=imperial&appid=597ea5faa7bc25bc18db1409a633aa87";
// c3f0a91bddaf387d60a31b1c24fef012
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
  fav = document.getElementById("favBtn"),
  injectFav = document.getElementById("injectFav"),
  favArr = [],
  weatherArr = [],
  searchedCity = "";
  
  // Forcast Variables
  let date1 = document.getElementById('date1'),
  dOfWeek1 = document.getElementById('dOfWeek1'),
  middayTemp1 = document.getElementById('middayTemp1'),
  description1 = document.getElementById('description1'),
  icon1 = document.getElementById('icon1');                                                 


//Converting stringified arr into JSON obj
favData = JSON.parse(localStorage.getItem("favWeather"));

// creating the favorite on the offCanvas
if (favData && favData != null) {
  for (let i = 0; i < favData.length; i++) {
    if ((i == 0)) {
      fetchWeather(favData[i].url);
      // fetchForcast(favData[i].urlForcast);

      let colDiv = document.createElement("div");
      colDiv.classList = "col";
      let pTag = document.createElement("p");
      pTag.innerText = favData[i].name;
      pTag.addEventListener("click", function (e) {
        fetchWeather(favData[i].url);
      });
      colDiv.appendChild(pTag);
      injectFav.appendChild(colDiv);
    } else {
      let colDiv = document.createElement("div");
      colDiv.classList = "col";
      let pTag = document.createElement("p");
      pTag.innerText = favData[i].name;
      pTag.addEventListener("click", function (e) {
        fetchWeather(favData[i].url);
      });
      colDiv.appendChild(pTag);
      injectFav.appendChild(colDiv);
    }
  }
}

function fetchForcast(urlForcast){
  fetch(urlForcast)
  .then((response) => response.json())
  .then((data) =>{
      getForcast(data);
  })
}

function getForcast(forcastData){
  console.log(forcastData);
  let mainCast = forcastData.list[5].main;
  // dOfWeek1.innerText = forcastData.list[5].dt_txt.getDay();
  date1.innerText = forcastData.list[5].dt_txt;
  middayTemp1.innerText = parseInt(mainCast.temp);
  description1.innerText = forcastData.list[5].weather[0].description ;
  // console.log(forcastData.list[5].weather[0].description)
}

function fetchWeather(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      getWeather(data);
    });
}


function getWeather(weatherData) {
  weatherArr.push(weatherData);
  let main = weatherData.main;
  place.innerText = `${weatherData.name}, ${weatherData.sys.country}`;
  temp.innerText = `${parseInt(main.temp)}`;
  temp_min.innerText = `L / ${parseInt(main.temp_min)}`;
  temp_max.innerText = `H / ${parseInt(main.temp_max)}`;
  feels_like.innerText = `Feels like / ${parseInt(main.feels_like)}`;
  speed.innerText = `Speed / ${parseInt(weatherData.wind.speed)}`;
  deg.innerText = `Degrees / ${parseInt(weatherData.wind.deg)}`;
  // tempIcon.src = 'http://openweathermap.org/img/wn/${weatherData.weather[1].icon}.png';
}

search.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    fetchWeather(
      `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=imperial&appid=597ea5faa7bc25bc18db1409a633aa87`
    );
    fetchForcast(
      `https://api.openweathermap.org/data/2.5/forecast?q=${search.value}&units=imperial&appid=597ea5faa7bc25bc18db1409a633aa87`
      );
    searchedCity = search.value;
  }
});

// Event Listeners

searchBtn.addEventListener("click", function () {
  fetchWeather(
    `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=imperial&appid=597ea5faa7bc25bc18db1409a633aa87`
  );
  fetchForcast(
    `https://api.openweathermap.org/data/2.5/forecast?q=${search.value}&units=imperial&appid=597ea5faa7bc25bc18db1409a633aa87`
    );
  searchedCity = search.value;

});

favBtn.addEventListener("click", function (e) {
  let obj = {
    name: weatherArr[weatherArr.length - 1].name,
    url: `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=imperial&appid=597ea5faa7bc25bc18db1409a633aa87`,
    urlForcast: `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&units=imperial&appid=597ea5faa7bc25bc18db1409a633aa87`
    
  };
  favArr.push(obj); //pull from local storage
  let colDiv = document.createElement("div");
  colDiv.classList = "col";
  let pTag = document.createElement("p");
  pTag.innerText = obj.name;
  pTag.addEventListener("click", function (e) {
    fetchWeather(obj.url);
  });
  colDiv.appendChild(pTag);
  injectFav.appendChild(colDiv);

  // local storage setup             json.stringify converting arr into string format
  localStorage.setItem("favWeather", JSON.stringify(favArr));
});

fetchWeather(url);
fetchForcast(urlForcast);
