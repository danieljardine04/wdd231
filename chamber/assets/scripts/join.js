const membershipSection = document.querySelector('#membership');
const mydialog = document.querySelector('#mydialog');
const mytitle = document.querySelector('#mydialog h2');
const myclose = document.querySelector('#mydialog button');
const myinfo = document.querySelector('#mydialog p');
const submitButton = document.querySelector('#submit');
const formEl = document.querySelector('#form');
var membershipLevelString = "";

myclose.addEventListener("click", () => mydialog.close());




const membershipLevel = [
  {
    name: "Non Profit",
    id: "#non",
    buttonid: "#nonbutton",
    description: "The non Profit level does not require any payment, your business card will be added to the Directory Page List with your information and a link to get to your site.",
    membership: 0
  },
  {
    name: "Bronze",
    id: "#bronze",
    buttonid: "#bronzebutton",
    description: "The Bronze membership level costs $6 a month, with a bronze membership you will be able to see your business on the Directory Page Grid with your card as well as the Directory page list",
    membership: 1
  },
  {
    name: "Silver",
    id: "#silver",
    buttonid: "#silverbutton",
    description: "The silver membership level costs $10 a month, with a silver membership you will be able to see your business on the directory page, as well as on the spotlight section of the Home Page.",
    membership: 2
  },
  {
    name: "Gold",
    id: "#gold",
    buttonid: "#goldbutton",
    description: "The Gold membership level costs $15 a month, you receive everything a silver level membership will receive, plus a higher priority of seeing your business on the Home Page spotlight section.",
    membership: 3
  }
]

var radioButtons = document.querySelectorAll('input[name="membership"]');

function MemberInformation(firstname, lastname, org, email, phone, business, membershipLevel, entrytext){
  this.firstname = firstname;
  this.lastname = lastname;
  this.org = org;
  this.email = email;
  this.phone = phone;
  this.business = business;
  this.membershipLevel = membershipLevel;
  this.entrytext = entrytext
}



function displayMembershipOptions(membership){
  membership.forEach((member) => {
    const dialogButton = document.querySelector(member.buttonid);
    dialogButton.addEventListener('click', () => showDialog(member));

  })
}

function showDialog(data){
  mytitle.innerHTML = data.name;
  myinfo.innerHTML = data.description;
  mydialog.showModal();
}



displayMembershipOptions(membershipLevel);

formEl.addEventListener('submit', () => {
  const selectedButton = radioButtons.forEach((button) => {
                                                if(button.checked){
                                                  membershipLevelString = button.value;
                                                  
                                                }
                                              })

  const member = new MemberInformation(formEl.elements['fname'].value,
                                       formEl.elements['lname'].value,
                                       formEl.elements['title'].value, 
                                       formEl.elements['email'].value,
                                       formEl.elements['phone'].value,
                                       formEl.elements['bname'].value,
                                       membershipLevelString,
                                       formEl.elements['entrytext'].value);
  saveInformation(member);
  console.log(member);

})

function saveInformation(member){
  localStorage.setItem('member', JSON.stringify(member));
}