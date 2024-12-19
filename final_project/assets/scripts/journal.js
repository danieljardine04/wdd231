
var buttonEl = document.getElementById("create");
var divEl = document.querySelector(".container");
var journalsEl = document.querySelector(".journals");
var entriesEl = document.querySelector(".entries");
var submitButton = document.getElementById('submitButton');
var identifier = document.querySelector('.identifier');
var currentJournal = 0;
var idCount = 0;


var journalHolder = [];

function createJournal(){
  if(journalHolder.length == 0){
    saveJournal();
    saveCurrentJournal();
  }
  console.log("The Journey begins");
  if(!localStorage.getItem('journalid')){
    localStorage.setItem('journalid', JSON.stringify(0));
  }
  let journal = []
  // let form = document.createElement('form');
  let label = document.createElement('label');
  let input = document.createElement('input');
  let button = document.createElement('button'); 
  
  label.textContent = "What would you like to name your Journal.";
  input.setAttribute('type', 'text');
  button.textContent = "Create Journal";
  

  divEl.appendChild(label);
  divEl.appendChild(input);
  divEl.appendChild(button)
  // divEl.appendChild(form);

  button.addEventListener("click", function() {
    console.log("Hello can you see me?")
    buttonEl.classList.remove('incognito');
    var journalEntry = {
      name: input.value,
      entries: [],
      id: idCount
    };
    journal.push(journalEntry);
    journalHolder.push(journal);
    idCount++
    saveJournal();
    saveCurrentJournal();
    console.log("I made it here");
    addJournal();
    console.log("Completed");
    divEl.innerHTML = "";

  });
}

function addJournal(){
  if(journalsEl){
    journalsEl.innerHTML = "";
  journalHolder.forEach(journal => {
    var div = document.createElement("div");
    var h2 = document.createElement("h2");
    var a = document.createElement("a");
    var openButton = document.createElement('button');
    

    div.classList.add("card");
    h2.textContent = journal[0].name;
    // console.log(journal[0].entries[0].name);
    a.setAttribute('href', "./entries.html");
    openButton.textContent = "Open Journal";

    a.appendChild(openButton);
    div.appendChild(h2);
    div.appendChild(a);
    journalsEl.appendChild(div);

    openButton.addEventListener("click", function(){
      if(currentJournal !== journal[0].id){
        currentJournal = journal[0].id;
        saveCurrentJournal();
        
      }
      console.log(currentJournal.name);
      
      
      
      console.log("Here is your journal Title: " + journalTitle);
      
      addEntries();
      
    })
    saveJournal();
     

  })
}
}


function saveJournal(){
  localStorage.setItem('journals', JSON.stringify(journalHolder));

}

function saveCurrentJournal(){
  localStorage.setItem('currentJournal', JSON.stringify(currentJournal));
  localStorage.setItem('journalid', JSON.stringify(idCount));
}

function loadJournals(){
  var journal = JSON.parse(localStorage.getItem('journals'));
  if(!journal){
    journal = [];
  } else{
    journalHolder = journal;
    addJournal();
    console.log(journal[0][0]);
  }
}

function loadCurrentJournal(){
  var cJournal = JSON.parse(localStorage.getItem('currentJournal'));
  var journalId = JSON.parse(localStorage.getItem('journalid'));
  if(!cJournal){
    localStorage.setItem("currentJournal", JSON.stringify(0));
    currentJournal = cJournal

  }else {
    currentJournal = cJournal;
    idCount = journalId;
  }
  if(!journalId){
    journalId = 0;
  } else {
    idCount = journalId;
  }
}

function addEntries(){
  var journalTitle = document.createElement('h1');
  entriesEl.innerHTML = "";
  identifier.innerHTML = "";
  
  journalTitle.textContent = `Welcome to your ${journalHolder[currentJournal][0].name} Journal!`;
  identifier.appendChild(journalTitle);
  var entries = journalHolder[currentJournal][0].entries;
  for(i = 0; i < entries.length; i++) {
    var entry = entries[i];
    let entrydiv = document.createElement("div");
    let entryName = document.createElement("h3");
    let entrySummary = document.createElement("p");
    let entryCity = document.createElement('p');
    let entryState = document.createElement('p');


    entrydiv.classList.add("entry");
    entryName.textContent = entry.name;
    entrySummary.textContent = entry.summary;
    entryCity.textContent = entry.city;
    entryState.textContent = entry.state;
    entrydiv.appendChild(entryName);
    entrydiv.appendChild(entrySummary);
    entrydiv.appendChild(entryCity);
    entrydiv.appendChild(entryState);
    entriesEl.appendChild(entrydiv);

  }
}

function addJournalEntry(){
  loadJournals();
  if(journalHolder[currentJournal][0]){
    identifier.innerHTML = ""
    const entryTitle = document.createElement('h2');
    entryTitle.textContent = `Create your journal entry for your ${journalHolder[currentJournal][0].name} name`;
    identifier.appendChild(entryTitle);
    let inputName = document.getElementById('entryName');
    let entryText = document.getElementById('entryText');
    let cityLocation = document.getElementById('cityLocation');
    let stateLocation = document.getElementById('stateLocation');
    let entry = {
      name: inputName.value,
      summary: entryText.value,
      city: cityLocation.value,
      state: stateLocation.value
    }
    var entries = journalHolder[currentJournal][0].entries;
    console.log(entries)
    console.log("You should have a journal here")
    entries.push(entry);
    saveJournal();
    console.log("GoodJob!");
    
    
  }
}
if(submitButton){
  console.log("Yo you made it");
  
  submitButton.addEventListener("click", function(){
    console.log("You pressed the submit button")
     addJournalEntry();
     console.log("Journal Entry complete my dude");
   })
}

if(buttonEl){
  buttonEl.addEventListener("click", function(){
    buttonEl.classList.add("incognito");
    createJournal();
  });

}

loadJournals();
loadCurrentJournal();
if(entriesEl){
  addEntries();
}
