var paraEl = document.getElementById('currentyear');
var paragraphEl = document.getElementById('lastModified');
paraEl.textContent = "©2024 Daniel Jardine New York";
paragraphEl.textContent = document.lastModified;
var listEl = document.querySelector('.course');
var courseSection = document.querySelector('.class-card');

const mainnav = document.querySelector('.navigation');
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', function(){
  mainnav.classList.toggle('show');
  hambutton.classList.toggle('show');
});

const courses = ["All", "CSE", "WDD"];


// listEl.forEach(function(listItem){
  //   listItem.addEventListener('click', function(event){
    //     event.preventDefault();
    
    
    //   })
    // })
    
    const courseCards = [
      {
        name: "CSE 110",
        type: "CSE" 
      },
      {
        name: "WDD 130",
        type: "WDD"
      },
      {
        name: "CSE 111",
        type: "CSE"
      },
      {
        name: "CSE 210",
        type: "CSE"
      }, 
      {
        name: "WDD 131", 
        type: "WDD"
      },
      {
        name: "WDD 231", 
        type: "WDD"
      }
    ]
    
    courses.forEach(course => {
      const listItem = document.createElement('li');
      const h3El = document.createElement("h3");
      listItem.appendChild(h3El);
      listEl.appendChild(listItem);
      h3El.textContent = course;
      listItem.addEventListener('click', function(event){
        checkSelected(course);
        event.preventDefault();
        filtercards(course);
        
        
      })
      
    });
    
filtercards("All");

function makeCourseCards(cards){
  courseSection.innerHTML = "";
  cards.forEach(function(card){
    let divEl = document.createElement("div");
    let name = document.createElement('h3');
  
    name.textContent = card.name;
    divEl.classList.add('class-card');
    divEl.appendChild(name);
    courseSection.appendChild(divEl);
    
  })
}

function filtercards(type){
  newCourses = [];
  courseCards.forEach(card => {
    if(type == card.type){
      newCourses.push(card);
      makeCourseCards(newCourses);
    }
    else if(type == "All"){
      makeCourseCards(courseCards);
      
    }
  })
  

  
}