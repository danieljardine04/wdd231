const currentDiv = document.querySelector('.currentEvents');
const weatherDiv = document.querySelector('.weather');
const spotlightDiv = document.querySelector('.spotlight');

const weatherIcon = document.querySelector('#weatherIcon');


const lat = 43.25;
const lon = -73.42;
const API_key = "49daffc5e5547ad25fd610e19b50c935";

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_key}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=13&appid=${API_key}`
const dataUrl = "https://danieljardine04.github.io/wdd231/chamber/assets/data/members.json";


const specialMembers = [];

async function getMembers(link){
  const response = await fetch(link)
  const data = await response.json();
  console.log(data.members);
  fillSpecialMembers(data.members);
}

function fillSpecialMembers(data){
  spotlightDiv.innerHTML = "";
  data.forEach((member) => {
    if(member.membership >= 2){
      specialMembers.push(member);
    }
  })
  console.log(specialMembers);
  getRandomMembers(specialMembers);
}

function getRandomMembers(members){
  const randomMembers = [];
  for(var i = 0; i < 3 ; i++){
    const randomMember = Math.floor(Math.random() * members.length);
    console.log(randomMember);
    randomMembers.push(members[randomMember]);
    members.splice(randomMember, 1);
  }
    console.log(randomMembers);
    displaySpecialMembers(randomMembers);
}

function displaySpecialMembers(members){
  members.forEach((member) => {
    const section = document.createElement('div');
    const compName = document.createElement('h3');
    const logo = document.createElement('img');
    const phone = document.createElement('p');
    const address = document.createElement('p');
    const membership = document.createElement('p');

    compName.textContent = member.name;
    logo.setAttribute('src', member.image);
    logo.setAttribute('height', "150px");
    logo.setAttribute('alt', `A picture of ${member.name}`);
    logo.setAttribute('width', '150px');
    logo.setAttribute('border-radius', "50%");
    phone.textContent = member.phone;
    address.textContent = member.address1 + "\n" + member.address2;
    membership.textContent = member.membership > 2 ? "Membership: Gold" : "Membership: Silver";

    section.appendChild(compName);
    section.appendChild(logo);
    section.appendChild(phone);
    section.appendChild(address);
    section.appendChild(membership);
    spotlightDiv.appendChild(section);
  })
}

getMembers(dataUrl);





async function apiFetch(link){
  try{
    const response = await fetch(link);
    if(response.ok){
      const data = await response.json();
      console.log(data);
      displayResults(data);
    } else {
      throw Error(await response.text());
    }  
  }
  catch (error) {
    console.log(error);
}
} 
apiFetch(weatherUrl);
apiFetch(forecastUrl);

function displayResults(data){

  if(data.list){
    const daily = data.list;
    const dailySection = document.querySelector('.dailySection');
    for(var i = 0; i < daily.length; i++){
      if(i % 4 == 0){
        
        const dailyDiv = document.createElement('div');
        const dailyName = document.createElement('h3');
        const dailyTemp = document.createElement('p');

        dailyName.textContent = getDailyName(daily[i].dt_txt);
        dailyTemp.textContent = `Temperature: ${daily[i].main.temp}°F`;

        dailyDiv.appendChild(dailyName);
        dailyDiv.appendChild(dailyTemp);
        dailySection.appendChild(dailyDiv);
        
      }
    }
    
  }
  if(data.weather) {
    const currentDiv = document.querySelector('.currentWeather');
    const currentTemp = document.createElement('p');
    const description = document.createElement('p');
    

    currentTemp.innerHTML = `Temperature ${data.main.temp}&deg;F`;
    
    description.textContent = data.weather[0].description;

    currentDiv.appendChild(currentTemp);
    currentDiv.appendChild(description);
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute("alt", data.weather[0].description);


  }
}

function getDailyName(name){
  var result = "";
  const dateTime = name.split(" ");
  var date = dateTime[0].split("-");
  switch(date[1]){
    case "1":
      result += "January";
      break;
    case "2":
      result += "February";
      break;
    case "3":
      result += "March";
      break;
    case "4":
      result += "April";
      break;
    case "5":
      result += "May";
      break;
    case "6":
      result += "June";
      break;
    case "7":
      result += "July";
      break;
    case "8": 
      result += "August";
      break;
    case "9": 
      result += "September"
      break;
    case "10":
      result += "October";
      break; 
    case "11":
       result += "November";
       break;
    case "12":
      result += "December";
      break;
  }
  result += ` ${date[2]}, ${date[0]} ${dateTime[1]}`;
  return result;
}

getDailyName("2024-11-29 18:00:00");