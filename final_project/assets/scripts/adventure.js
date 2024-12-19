
const geoUrl = "https://api.radar.io/v1/search/autocomplete?query=Juiz+de+Fora,MG"
const API_key = "prj_live_pk_c137b1ba2353a0d71842d028f22bfa2bf0bd2143";
const map = document.querySelector('#map');
const searchBar = document.querySelector('#searchBar');
const placesVisited = document.querySelector('#placesVisited');
var selectedJournalEntry = document.querySelector('#newAreas');
var journalHolder = JSON.parse(localStorage.getItem("journals"));
const showHere = document.querySelector('#showHere');
const entryDialog = document.querySelector('#entrydialog');
const titleDialog = document.querySelector('#entrydialog h2');
const summaryDialog = document.querySelector('#summary');
const locationDialog = document.querySelector('#location');
const registerButton = document.querySelector('#register');
const closeDialog = document.querySelector('#close');



places = [];

fetch(geoUrl, {
  method: 'GET',
  headers: {
    "Authorization" : API_key,
    'Conent-Type': ' application/json'
  }
})
.then(response => {
  if(!response.ok){
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}).then(data => {
  console.log(data.addresses[0]);
}).catch(error => {
  console.error(`Error:`, error);
})


 function getCoordinates(url){
   return fetch(url, {
    method: 'GET',
    headers: {
      "Authorization" : API_key,
      'Conent-Type': ' application/json'
    }
  })
  .then(response => {
    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  }).then(data => {
    result = `${data.addresses[0].latitude},${data.addresses[0].longitude}`;
    return result;
  }).catch(error => {
    console.error(`Error:`, error);
  })
}

getCoordinates(geoUrl);

function displayMarkers(){

  if(!journalHolder){
    console.log("the journals item does not exist");
    return; 
  }
  journalHolder.forEach((journal) => {
    console.log("You made it inside the for Each loop");
    console.log(journal);
    for(let i = 0; i < journal[0].entries.length; i++){
      const journalEntry = journal[0].entries[i];
      const place = `${journalEntry.city}, ${journalEntry.state}`;
      const cityPlace = makeUrlFormat(journalEntry.city.trim());
      const statePlace = makeUrlFormat(journalEntry.state.trim());
      const placeUrl = `https://api.radar.io/v1/search/autocomplete?query=${cityPlace},${statePlace}`

      
      if(places.includes(place)){
        continue;
      } else {
        places.push(place);
        (async () => {
          try {
            const placeCoordinates = await getCoordinates(placeUrl);
            createMarker(placeCoordinates, place);
          } catch (error) {
            console.error('Error fetching coordinates:', error);
          }
        })();
        
      }
      console.log(journal[0].entries[i]);
    }
  }) 

}

function changeMapCenter(cordinates){
  map.setAttribute('center', cordinates);
  map.setAttribute('zoom', "10");
}

function makeUrlFormat(string){
  var result = "";
  for(var i = 0; i < string.length; i++){
    if(string[i] == " "){
      result += "+";
    }
    else{
      result += string[i];
    }
  }
  return result;
}


  searchBar.addEventListener("search", () => {
    searchValue = searchBar.value;
    var spliter = searchValue.split(',');
    console.log(spliter[0]);
    console.log(spliter[1]);
    const city = makeUrlFormat(spliter[0]);
    const state = makeUrlFormat(spliter[1].trim());
    console.log("City: "+ city);
    console.log("State: " + state);
    newUrl = `https://api.radar.io/v1/search/autocomplete?query=${city},${state}`;
    console.log(newUrl);
    (async () => {
      try {
        const coordinates = await getCoordinates(newUrl);
        console.log(coordinates);
        changeMapCenter(coordinates); // Logs "latitude,longitude"
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    })();
    getJournalInfo(searchValue);
    console.log("You finished the Search");
  })

  function createMarker(coord, title){
    const marker = document.createElement('gmp-advanced-marker');
    marker.setAttribute('position', coord);
    marker.setAttribute('title', title);
    map.appendChild(marker);

  }

  function getJournalInfo(placeValue){
    placesVisited.innerHTML = ""
    if(!journalHolder){
      console.log("the journals item does not exist");
      return; 
    }
    journalHolder.forEach((journal) => {
      console.log("You made it inside the for Each loop");
      console.log(journal);
      for(let i = 0; i < journal[0].entries.length; i++){
        const journalEntry = journal[0].entries[i];
        const place = `${journalEntry.city}, ${journalEntry.state}`;
        if(place == placeValue){
          const div = document.createElement('div');
          const journalTitle = document.createElement('h3');
          const location = document.createElement('p');
          const journalButton = document.createElement('button');

          div.classList.add('journalEntry');
          journalTitle.textContent = journalEntry.name;
          location.textContent = place;
          journalButton.textContent = "Open Journal Entry!";

          journalButton.addEventListener("click", () => showDialog(journalEntry))
          div.appendChild(journalTitle);
          div.appendChild(location);
          div.appendChild(journalButton);
          placesVisited.appendChild(div);
        }
      }
  })
}

function showDialog(entry){
  titleDialog.innerHTML = entry.name;
  summaryDialog.innerHTML = entry.summary;
  locationDialog.innerHTML = `Location: ${entry.city}, ${entry.state}`;
  registerButton.innerHTML = "Register"
  registerButton.addEventListener("click", () => registerEntry(entry));
  closeDialog.addEventListener("click", () => entryDialog.close());
  entryDialog.showModal();
}

function registerEntry(journalEntry){
  selectedJournalEntry.innerHTML = "";
  const h2El = document.createElement('h2');
  const h3El = document.createElement('h3');
  const summaryEl = document.createElement('p');
  const locationEl = document.createElement('p');
  
  h2El.textContent = "Your Registered Journal Entry!"
  h3El.textContent = journalEntry.name;
  summaryEl.textContent = journalEntry.summary;
  locationEl.textContent = `Location: ${journalEntry.city}, ${journalEntry.state}`;

  selectedJournalEntry.appendChild(h2El);
  selectedJournalEntry.appendChild(h3El);
  selectedJournalEntry.appendChild(summaryEl);
  selectedJournalEntry.appendChild(locationEl);
}


displayMarkers();