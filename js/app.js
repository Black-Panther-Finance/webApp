'use strict';



//------------------Global Variables-----------------//
const userName = document.getElementById("");
const passWord = document.getElementById("");
const userEmail = document.getElementById("");
const form = document.querySelector("form");



//---------------Constructor Functions------------------//


function checkInputs() {
  if (userName.value === "") {
    showError(userName, "Valid user name is required")
  } else {
    showSuccess(userName);
  }
  if (passWord.value.trim() === "") {
    showError(passWord, "Valid password is required")
  } else {
    showSuccess(passWord);
  }
  if (userEmail.value.trim() === "") {
    showError(userEmail, "Valid email is required")
  } else {
    showSuccess(userEmail);
  }

}
document.querySelector("button")
  .addEventListener('submit', (e) => {
    e.preventDefault()

    checkInputs()
  });

function showSuccess(input) {
  let parent = input.parentElement;
  let messageElem = parent.querySelector("");
  messageElem.style.visibility = "hidden";
  parent.classList.remove("error");
  parent.classList.add("success");
}
function showSuccess(input, message) {
  let parent = input.parentElement;
  let messageElem = parent.querySelector("");
  messageElem.style.visibility = "hidden";
  messageElem.innerText = message;
  parent.classList.add("error");
  parent.classList.remove("success");
}

//----------------Constructor Related Stuffs---------//



//----------------Global Functions----------------//




//---------------Rendering Header/Body/Footer---------//



//--------------Event Listeners------------------//



//-------------Call Functions----------------//