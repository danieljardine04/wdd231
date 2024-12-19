var paraEl = document.getElementById('currentyear');
var paragraphEl = document.getElementById('lastModified');
paraEl.textContent = "©2024 Daniel Jardine New York";
paragraphEl.textContent = document.lastModified;

const mainnav = document.querySelector('.navigation');
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', function(){
  mainnav.classList.toggle('show');
  hambutton.classList.toggle('show');
});