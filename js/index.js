//* currday HTML
const currDayName = document.getElementById("currDayName");
const currDayNumber = document.getElementById("currdayNumber");
const currMonth = document.getElementById("currMonth");

const currLocation = document.getElementById("currLocation");
const currTemp = document.getElementById("currTemp");
const currConditionImg = document.getElementById("currConditionImg");
const currConditionText = document.getElementById("currConditionText");

const currHumidity = document.getElementById("currHumidity");
const currWind = document.getElementById("currWind");
const currWindDirection = document.getElementById("currWindDirection");

//* nextday HTML
const nextDayName = document.getElementById("nextDayName");

const nextConditionImg = document.getElementById("nextConditionImg");
const nextMaxTemp = document.getElementById("nextMaxTemp");
const nextMinTemp = document.getElementById("nextMinTemp");
const nextConditionText = document.getElementById("nextConditionText");

//* after tommorrow HTML
const afterNextDayName = document.getElementById("afterNextDayName");
const afterNextConditionImg = document.getElementById("afterNextConditionImg");
const afterNextMaxTemp = document.getElementById("afterNextMaxTemp");
const afterNextMinTemp = document.getElementById("afterNextMinTemp");
const afterNextConditionText = document.getElementById(
  "afterNextConditionText"
);

//* search input HTML
const searchLocationInput = document.getElementById("searchLocationInput");

// ^ Main JS

// & current Position
navigator.geolocation.getCurrentPosition((currPosition) => {
  let currLatitude = currPosition.coords.latitude;
  let currLongitude = currPosition.coords.longitude;

  getWeatherData(currLatitude + "," + currLongitude);
});

searchLocationInput.addEventListener("input", (e) => {
  let currLocationValue = e.target.value;

  getWeatherData(currLocationValue);
});

async function getWeatherData(query) {
  const apiKey = "55ac44221d834348bb065608241910";
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?q=${query}&days=3&key=${apiKey}`
  );
  let data = await response.json();

  console.log(data);
  displayCurrWeatherData(data);
  displayNextDayWeatherData(data);
  displayAfterNextDayWeatherData(data);
}

function displayCurrWeatherData(data) {
  let currDate = data.current.last_updated;
  let newDate = new Date(currDate);

  let currDateName = newDate.toLocaleString("en-us", {
    weekday: "long",
  });
  let currMonthName = newDate.toLocaleString("en-us", {
    month: "long",
  });
  let currDayNo = newDate.getDate();

  currDayName.innerHTML = currDateName;
  currMonth.innerHTML = currMonthName;
  currDayNumber.innerHTML = currDayNo;

  currLocation.innerHTML = data.location.name;
  currTemp.innerHTML = data.current.temp_c;

  let currIconSrc = `https:${data.current.condition.icon}`;
  currConditionImg.setAttribute("src", currIconSrc);
  currConditionText.innerHTML = data.current.condition.text;

  currHumidity.innerHTML = data.current.humidity;
  currWind.innerHTML = data.current.wind_kph + ` km/hr`;
  currWindDirection.innerHTML = data.current.wind_dir;
}

function displayNextDayWeatherData(data) {
  let nextDayData = data.forecast.forecastday[1];
  let nexDayDate = new Date(nextDayData.date);

  let nextDayDateName = nexDayDate.toLocaleString("en-us", { weekday: "long" });
  let nextDayIconSrc = `https:${data.current.condition.icon}`;

  nextDayName.innerHTML = nextDayDateName;

  nextConditionImg.setAttribute("src", nextDayIconSrc);
  nextMaxTemp.innerHTML = nextDayData.day.maxtemp_c;
  nextMinTemp.innerHTML = nextDayData.day.mintemp_c;

  nextConditionText.innerHTML = nextDayData.day.condition.text;
}

function displayAfterNextDayWeatherData(data) {
  let nextDayData = data.forecast.forecastday[2];
  let nexDayDate = new Date(nextDayData.date);

  let nextDayDateName = nexDayDate.toLocaleString("en-us", { weekday: "long" });
  let nextDayIconSrc = `https:${data.current.condition.icon}`;

  afterNextDayName.innerHTML = nextDayDateName;

  afterNextConditionImg.setAttribute("src", nextDayIconSrc);
  afterNextMaxTemp.innerHTML = nextDayData.day.maxtemp_c;
  afterNextMinTemp.innerHTML = nextDayData.day.mintemp_c;

  afterNextConditionText.innerHTML = nextDayData.day.condition.text;
}
