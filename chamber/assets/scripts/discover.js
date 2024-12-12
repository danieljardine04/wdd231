var lastVisted = document.querySelector('#lastVisted');


function getLastVisitInfo(){
  var currentDate = new Date().getTime();
  const returnInfo = document.createElement('h2');
  const lastVisitedSeconds = loadStorage();
  

  if(lastVisitedSeconds == ""){
    returnInfo.textContent = "Welcome! Let us know if you have any questions";
  }
  else {
    const days = Math.floor(((currentDate - lastVisitedSeconds) / 86400000)); 
    console.log(days);
    if(days < 1){
      returnInfo.textContent = "Back so soon! Awesome!"
    }
    if (days == 1){
      returnInfo.textContent = "You last visited 1 day ago."
    }
    if(days > 1) {
      returnInfo.textContent = `You last visited ${days} day ago`
    }

  }
  lastVisited.appendChild(returnInfo);

  
  storeVisit(currentDate);
}

function storeVisit(seconds){
  localStorage.setItem("lastVisit", seconds);
}

function loadStorage(){
  return JSON.parse(localStorage.getItem('lastVisit')) || "";
}

getLastVisitInfo();