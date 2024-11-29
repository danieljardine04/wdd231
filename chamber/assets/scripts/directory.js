var paraEl = document.getElementById('currentyear');
var paragraphEl = document.getElementById('lastModified');
paraEl.textContent = "©2024 Lake George Chamber of Commerce";
paragraphEl.textContent = document.lastModified;
const url = "https://danieljardine04.github.io/wdd231/chamber/assets/data/members.json";
const gridButton = document.querySelector('#grid-button');
const listButton = document.querySelector('#list-button');
const sectionEl = document.querySelector('.content');
const listEl = document.createElement('ul');
var isList = false;

const mainnav = document.querySelector('.navigation');
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', function(){
  mainnav.classList.toggle('show');
  hambutton.classList.toggle('show');
});

gridButton.addEventListener("click", ()=> {
    isList = false;
    listButton.classList.remove('button');
    gridButton.classList.add('button');
    getMemberData(url);
});

listButton.addEventListener("click", ()=>{
  isList = true;
  gridButton.classList.remove('button');
  listButton.classList.add('button');
  getMemberData(url);
})



async function getMemberData(link){
  const response = await fetch(link);
  const data = await response.json();
  displayMembers(data.members);
}

function displayMembers(members){
  sectionEl.innerHTML = "";
  listEl.innerHTML = "";
  members.forEach((member) => {
    const divEl = document.createElement('div');
    const businessName = document.createElement('h2');
    const address = document.createElement('p');
    const website = document.createElement('a');
    const portrait = document.createElement('img');

    businessName.textContent = member.name;
    website.textContent = "Website";
    website.setAttribute('href', member.website);
    portrait.setAttribute('src', member.image);
    portrait.setAttribute('alt', `Picture of ${member.name}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340px');
    portrait.setAttribute('height', '440px');
    
    if(isList == true){
      const listItem = document.createElement('li');
      address.textContent = `${member.address1} ${member.address2}`

      listItem.appendChild(businessName);
      listItem.appendChild(address);
      listItem.appendChild(website);
      listEl.appendChild(listItem);
      divEl.appendChild(listEl);
      sectionEl.classList.remove('grid-style')
      sectionEl.classList.add('list-style');
    }
    else{
      address.textContent = `${member.address1} \n ${member.address2}`
      divEl.appendChild(businessName);
      divEl.appendChild(portrait);
      divEl.appendChild(address);
      divEl.appendChild(website);
      sectionEl.classList.remove('list-style');
      sectionEl.classList.add('grid-style');

    }
    sectionEl.appendChild(divEl);
  })
}

getMemberData(url);

