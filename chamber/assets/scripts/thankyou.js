var loadedInformation = JSON.parse(localStorage.getItem('member'));
const firstName = document.querySelector('#firstname');
const lastName = document.querySelector('#lastname');
const orgtitle = document.querySelector('#orgtitle');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const businessname = document.querySelector('#businessname');
const membershiptoken = document.querySelector('#membershipToken');
const businessDescription = document.querySelector('#entrytext');

firstName.innerHTML =`First Name: ${loadedInformation.firstname}`;
lastName.innerHTML = `Last Name: ${loadedInformation.lastname}`;
orgtitle.innerHTML = `Title: ${loadedInformation.org}`;
phone.innerHTML = `Phone number: ${loadedInformation.phone}`;
email.innerHTML = `Email: ${loadedInformation.email}`;
businessname.innerHTML = `Business Name: ${loadedInformation.business}`;
membershiptoken.innerHTML = `Membership Level: ${loadedInformation.membershipLevel}`;
businessDescription.innerHTML = `Business Description: ${loadedInformation.entrytext}`;



