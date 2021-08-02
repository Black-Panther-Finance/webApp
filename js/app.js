'use strict';



//------------------Global Variables-----------------//

const userName = document.getElementById("form1").value;
const expensesList = document.getElementById("form2").value;
const desireList = document.getElementById("form3").value;
const ulElem1 = document.getElementById('expenseList');
const showExpenseList = document.getElementById('desireList');





//---------------Constructor Functions------------------//
function UserData(firstName, lastName, expenses, costPer, desireObject, costOfDesire, timeOfFullFillment) {
   this.firstName = firstName;
   this.lastName = lastName;
   this.expenses = expenses;
   this.costPer = costPer;
   this.desireObject = desireObject;
   this.costOfDesire = costOfDesire;
   this.timeOfFullFillment = timeOfFullFillment;
}

UserData.allData = [];

UserData.prototype.renderExpense = function(){

    let liElem = document.createElement('li');
    liElem.textContent = `${expense.expense} ${expense.cost} per month`;
    ulElem1.appendChild(liElem);
}



UserData.prototype.renderDesire = function(){}




//----------------Global Functions----------------//


  function _addNewExpense(expenses,costPer) {
    let newExpense = new UserData(expenses,costPer); 
      UserData.allData.push(newExpense);
      newExpense.renderExpense();
  }
  







 function checkDetailsInStorage() {
  let detailsInStorage = localStorage.getItem('userDetails');
  if(detailsInStorage){
    let parsedDetails = JSON.parse(detailsInStorage);
    console.log(parsedDetails);





   let stringArray = JSON.stringify();
   localStorage.setItem('userDetails',stringArray);
  }else {
    let stringArray = JSON.stringify();
    localStorage.setItem('userDetails',stringArray)

  }

 }

//---------------Rendering Header/Body/Footer---------//



//--------------Event Listeners------------------//
function handleClick(event) {
  event.preventDefault();
  let firstName = event.target.firstName.value;
  let lastName = event.target.lastName.value;
  putNamesInStorage();
}

document.getElementById("login").addEventListener("submit", handleClick);

function handleClick(event) {
  event.preventDefault();
  let expenses = event.target.expenseName.value;
  let cost = event.target.cost.value;
  putExpensesInStorage();
}

document.getElementById("expenses").addEventListener("submit", handleClick);

function handleClick(event) {
  event.preventDefault();
  let desireObject = event.target.desireObject.value;
  let costOfDesire = event.target.costOfDesire.value;
  putDesireInStorage();
}

document.getElementById("desire").addEventListener("submit", handleClick);



//-------------Call Functions----------------//

checkDetailsInStorage();