const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json"
const cards = document.querySelector("#cards");

async function getProphetData(link){
  const response = await fetch(link);
  const data = await response.json();
  displayProphets(data.prophets);
}

getProphetData(url);

function displayProphets(prophets){
  prophets.forEach((prophet) => {
    const card = document.createElement('section');
    const fullName = document.createElement('h2');
    const portrait = document.createElement('img');

    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Picture of ${fullName}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    card.appendChild(fullName);
    card.appendChild(portrait);
    cards.appendChild(card);

  })
}