let url =
  "https://api.openweathermap.org/data/2.5/weather?q=Stockton,ca,usa&units=imperial&appid=597ea5faa7bc25bc18db1409a633aa87";
let = urlForcast =
  "https://api.openweathermap.org/data/2.5/forecast?q=stockton&units=imperial&appid=597ea5faa7bc25bc18db1409a633aa87";
// c3f0a91bddaf387d60a31b1c24fef012

// Main Weather variables
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
  favBtn = document.getElementById("favBtn"),
  injectFav = document.getElementById("injectFav"),
  favArr = [],
  weatherArr = [],
  searchedCity = "",
  weatherId = 0;

// Forcast Variables

// Day 1
let date1 = document.getElementById("date1"),
  dOfWeek1 = document.getElementById("dOfWeek1"),
  middayTemp1 = document.getElementById("middayTemp1"),
  description1 = document.getElementById("description1"),
  icon1 = document.getElementById("icon1");

// Day 2

let date2 = document.getElementById("date2"),
  dOfWeek2 = document.getElementById("dOfWeek2"),
  middayTemp2 = document.getElementById("middayTemp2"),
  description2 = document.getElementById("description2"),
  icon2 = document.getElementById("icon2");

// Day 3
let date3 = document.getElementById("date3"),
  dOfWeek3 = document.getElementById("dOfWeek3"),
  middayTemp3 = document.getElementById("middayTemp3"),
  description3 = document.getElementById("description3"),
  icon3 = document.getElementById("icon3");

// Day 4
let date4 = document.getElementById("date4"),
  dOfWeek4 = document.getElementById("dOfWeek4"),
  middayTemp4 = document.getElementById("middayTemp4"),
  description4 = document.getElementById("description4"),
  icon4 = document.getElementById("icon4");

// Day 5
let date5 = document.getElementById("date5"),
  dOfWeek5 = document.getElementById("dOfWeek5"),
  middayTemp5 = document.getElementById("middayTemp5"),
  description5 = document.getElementById("description5"),
  icon5 = document.getElementById("icon5");

//Converting stringified arr into JSON obj
favData = JSON.parse(localStorage.getItem("favWeather"));
// creating the favorite on the offCanvas
if (favData && favData != null) {
  favArr = favData;
  for (let i = 0; i < favData.length; i++) {
    if (i == 0) {
      fetchWeather(favData[i].url);

      let deleteBtn = document.createElement("img");
      deleteBtn.setAttribute("id", favData[i].id);
      deleteBtn.setAttribute("src", "/assets/trash.png");
     
      // elements
      let row = document.createElement("div");
      row.classList = "row";
    
      let col1 = document.createElement("div");
      col1.classList = "col-1";
    
      let col2 = document.createElement("div");
      let pTag = document.createElement("p");
      pTag.setAttribute("id",favData[i].id);
      pTag.innerText = favData[i].name;
      col2.classList = "col-6 ";
      col1.appendChild(pTag);
      row.appendChild(col2);
      col2.appendChild(deleteBtn);
      row.appendChild(col1);
      injectFav.appendChild(row);
      deleteBtn.addEventListener("click", function(event){
        for (let i = 0; i < favArr.length; i++){
          if((event.target.id && favArr[i].id) && parseInt(event.target.id) === favArr[i].id){
              favArr.splice(i, 1);
              localStorage.setItem("favWeather", JSON.stringify(favArr));
              location.reload();
          }
        }
      });
    } 
  }
}
////////////////////////////////////////////// Functions //////////////////////////////////////////////////////////////////
function fetchForcast(urlForcast) {
  fetch(urlForcast)
    .then((response) => response.json())
    .then((data) => {
      
      getForcast(data);
    });
}
function getForcast(forcastData) {
  // Day 1
  // dOfWeek1.innerText = forcastData.list[5].dt_txt.getDay();
  date1.innerText = forcastData.list[6].dt_txt;
  middayTemp1.innerText = parseInt(forcastData.list[6].main.temp) + "°";
  description1.innerText = forcastData.list[6].weather[0].description;
  icon1.src = `http://openweathermap.org/img/wn/${forcastData.list[6].weather[0].icon}@2x.png`;
  // Day 2
  date2.innerText = forcastData.list[14].dt_txt;
  middayTemp2.innerText = parseInt(forcastData.list[14].main.temp) + "°";
  description2.innerText = forcastData.list[14].weather[0].description;
  icon2.src = `http://openweathermap.org/img/wn/${forcastData.list[14].weather[0].icon}@2x.png`;
  // Day 3
  date3.innerText = forcastData.list[22].dt_txt;
  middayTemp3.innerText = parseInt(forcastData.list[22].main.temp) + "°";
  description3.innerText = forcastData.list[22].weather[0].description;
  icon3.src = `http://openweathermap.org/img/wn/${forcastData.list[22].weather[0].icon}@2x.png`;
  // // Day 4
  date4.innerText = forcastData.list[30].dt_txt;
  middayTemp4.innerText = parseInt(forcastData.list[30].main.temp) + "°";
  description4.innerText = forcastData.list[30].weather[0].description;
  icon4.src = `http://openweathermap.org/img/wn/${forcastData.list[30].weather[0].icon}@2x.png`;
  // // Day 5
  date5.innerText = forcastData.list[38].dt_txt;
  middayTemp5.innerText = parseInt(forcastData.list[38].main.temp) + "°";
  description5.innerText = forcastData.list[38].weather[0].description;
  icon5.src = `http://openweathermap.org/img/wn/${forcastData.list[38].weather[0].icon}@2x.png`;
}
function fetchWeather(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      getWeather(data);
    });
}
function getWeather(weatherData) {
  weatherId = weatherData.id;
  
  weatherArr.push(weatherData);
  let main = weatherData.main;
  place.innerText = `${weatherData.name}, ${weatherData.sys.country}`;
  temp.innerText = `${parseInt(main.temp)}°`;
  temp_min.innerText = `L / ${parseInt(main.temp_min)}°`;
  temp_max.innerText = `H / ${parseInt(main.temp_max)}°`;
  feels_like.innerText = `Feels like / ${parseInt(main.feels_like)}°`;
  speed.innerText = `Mph / ${parseInt(weatherData.wind.speed)}`;
  deg.innerText = `Degrees / ${parseInt(weatherData.wind.deg)}`;
  // tempIcon.src = `http://openweathermap.org/img/wn/${weatherData.list.weather[0].icon}@2x.png`;


  let current = weatherData.weather[0].main;

  switch (current) {
    case "Snow":
      document.getElementById("wrapper-bg").style.backgroundImage =
        "url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')";
      break;
    case "Clouds":
      document.getElementById("wrapper-bg").style.backgroundImage =
        "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')";
      break;
    case "Fog":
      document.getElementById("wrapper-bg").style.backgroundImage =
        "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')";
      break;
    case "Rain":
      document.getElementById("wrapper-bg").style.backgroundImage =
        "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')";
      break;
    case "Clear":
      document.getElementById("wrapper-bg").style.backgroundImage =
        "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
      break;
    case "Thunderstorm":
      document.getElementById("wrapper-bg").style.backgroundImage =
        "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')";
      break;
    default:
      document.getElementById("wrapper-bg").style.backgroundImage =
        "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
      break;
  }
}

// function dateBuilder(d){
//   let months = [
//     "January", "February", "March", "April","May", "June",
//     "July", "August", "September", "October", "November", "December"
//   ]
//   let days = [
//     "Sunday", "Monday","Tuesday", "Wednesday",
//     "Thursday", "Friday", "Saturday"
//   ]

//   let date = new Date(d);
//   let day = days[d.getDay()];
//   let month = d.getDate();
//   let year = d.getFullYear();

//   return `${day} ${date} ${month} ${year}`;
// }

////////////////////////////////////////////// Event Listeners//////////////////////////////////////////////////////////////////
search.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
    if (search.value == "") {
      alert("Please enter a city name");
    } else {
      fetchWeather(
        `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=imperial&appid=597ea5faa7bc25bc18db1409a633aa87`
      );
      fetchForcast(
        `https://api.openweathermap.org/data/2.5/forecast?q=${search.value}&units=imperial&appid=597ea5faa7bc25bc18db1409a633aa87`
      );
      searchedCity = search.value;
    }
  }
});

searchBtn.addEventListener("click", function () {
  if (search.value == "") {
    alert("Please enter a city name");
  } else {
    fetchWeather(
      `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=imperial&appid=597ea5faa7bc25bc18db1409a633aa87`
    );
    fetchForcast(
      `https://api.openweathermap.org/data/2.5/forecast?q=${search.value}&units=imperial&appid=597ea5faa7bc25bc18db1409a633aa87`
    );
    searchedCity = search.value;
  }
});

favBtn.addEventListener("click", function (e) {
  
  if(searchedCity == "undefined"){
    console.log("invalid");
  }
  else{

  
  let obj = {
    name: weatherArr[weatherArr.length - 1].name,
    url: `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=imperial&appid=597ea5faa7bc25bc18db1409a633aa87`,
    urlForcast: `https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&units=imperial&appid=597ea5faa7bc25bc18db1409a633aa87`,
    id: weatherId
  };
 
  favArr.push(obj); //push from local storage
  
  let pTag = document.createElement("p");
  pTag.setAttribute("id",weatherId);
  pTag.innerText = obj.name;

  // delete Fav
  let deleteBtn = document.createElement("img");
  deleteBtn.setAttribute("id", weatherId);
  deleteBtn.setAttribute("src", "/assets/trash.png");
 
  // elements
  let row = document.createElement("div");
  row.classList = "row";

  let col1 = document.createElement("div");
  col1.classList = "col-1";

  let col2 = document.createElement("div");
  col2.classList = "col-6 ";
  col1.appendChild(pTag);
  row.appendChild(col2);
  col2.appendChild(deleteBtn);
  row.appendChild(col1);
  injectFav.appendChild(row);
  deleteBtn.addEventListener("click", function(event){
    for (let i = 0; i < favArr.length; i++){
      if((event.target.id && favArr[i].id) && parseInt(event.target.id) === favArr[i].id){
          favArr.splice(i, 1);
          localStorage.setItem("favWeather", JSON.stringify(favArr));
          location.reload();
      }
    }
  });

  pTag.addEventListener("click", function (e) {
    fetchWeather(obj.url);
    fetchForcast(obj.urlForcast);
  });
  
  col1.appendChild(pTag);
  row.appendChild(col2);
  col2.appendChild(deleteBtn);
  row.appendChild(col1);
  injectFav.appendChild(row);

  // Creating local storage       json.stringify converting arr into string format
  localStorage.setItem("favWeather", JSON.stringify(favArr));
}
});


fetchWeather(url);
fetchForcast(urlForcast);
