let url = "https://api.openweathermap.org/data/2.5/weather?q=Stockton,ca,usa&units=imperial&appid=597ea5faa7bc25bc18db1409a633aa87";
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

//Converting stringified arr into JSON obj
favData = JSON.parse(localStorage.getItem("favWeather"));

if (favData && favData != null) {
  for (let i = 0; i < favData.length; i++) {
    if ((i == 0)) {
      fetchWeather(favData[i].url);

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
}

search.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    fetchWeather(
      `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=imperial&appid=597ea5faa7bc25bc18db1409a633aa87`
    );
    searchedCity = search.value;
  }
});
searchBtn.addEventListener("click", function () {
  fetchWeather(
    `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=imperial&appid=597ea5faa7bc25bc18db1409a633aa87`
  );
  searchedCity = search.value;
});

favBtn.addEventListener("click", function (e) {
  let obj = {
    name: weatherArr[weatherArr.length - 1].name,
    url: `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=imperial&appid=597ea5faa7bc25bc18db1409a633aa87`
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
