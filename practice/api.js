const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const lat = 49.75;
const lon = 6.64;
const API_key = "49daffc5e5547ad25fd610e19b50c935";

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`;
const url1 = `https://api.openweathermap.org/geo/1.0/direct?q=Trier&limit&appid=${API_key}`;

async function apiFetch(link){
  try{
    const response = await fetch(link);
    if(response.ok){
      const data = await response.json();
      displayResults(data);
      console.log(data);
    } else {
      throw Error(await response.text());
    }  
  }
  catch (error) {
    console.log(error);
}
} 

apiFetch(url);

function displayResults(data){
  currentTemp.innerHTML = `${data.main.temp}&deg;F`
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  let desc = data.weather[0].description;
  weatherIcon.setAttribute('src', iconsrc);
  weatherIcon.setAttribute("alt", data.weather[0].description);
  captionDesc.textContent = `${desc}`;
}