'use strict';



//------------------Global Variables-----------------//

let userNameElem = document.getElementById("form1");
let expensesList = document.getElementById("form2");
const desireList = document.getElementById("form3");
const secElem = document.getElementById('sectionName');
let expUlElem = document.getElementById('expenseList');
let desUlElem = document.getElementById('desire');



//---------------Constructor Functions------------------//

// 1) make total for expenses!!!!
// 2) edit expenses? - s

function UserData(firstName = '', lastName = '', expenses, cost, desireObject, costOfDesire, timeOfFullFillment) {
   this.firstName = firstName;
   this.lastName = lastName;
   this.expenses = expenses;
   this.cost = cost;
   this.desireObject = desireObject;
   this.costOfDesire = costOfDesire;
   this.timeOfFullFillment = timeOfFullFillment;

}

UserData.allData = []; 

UserData.prototype.renderName = function() {
  let h3Elem = document.createElement('h3')
  h3Elem.textContent = `Hi ${this.firstName} ${this.lastName}`;
  secElem.appendChild(h3Elem);
}


UserData.prototype.renderExpense = function(){
    let liElem = document.createElement('li');
    liElem.textContent = `${this.expenses} ${this.cost} per month`;
    expUlElem.appendChild(liElem);
  
}
// UserData.prototype.renderDesire = function(){
//   let liElem = document.createElement('li');
//     liElem.textContent = `${this.desireObject} ${this.costOfDesire}`;
//     desUlElem.appendChild(liElem);
  
// }

//----------------Global Functions----------------//

function _nameHandler(firstName, lastName) {
  console.log(firstName, lastName);
  let newName = new UserData(firstName,lastName); 
  UserData.allData.push(newName);
  // newName.renderName(); 
}

  function _addNewExpense(expenses,cost) {
    let newExpense = new UserData(expenses,cost); 
      UserData.allData.push(newExpense);
      newExpense.renderExpense();
  }
  

  // function _desHandler(desireObject, costOfDesire) {
  //   console.log(desireObject, costOfDesire);
  //   let newDesire = new UserData(desireObject, costOfDesire); 
  //   UserData.allData.push(newDesire);
  //   // newName.renderName(); 
  // }

// handel setting storage before going to the next page.
//    let stringArray = JSON.stringify();
//    localStorage.setItem('userDetails',stringArray);
//   }else 

if(secElem){getnameFromStorage(); }

function getnameFromStorage() {
  let nameFromStorage = localStorage.getItem('userDetails');
  if (nameFromStorage) {
    let parsedName = JSON.parse(nameFromStorage);
    console.log(parsedName);
    for(let name of parsedName) {
      let newName = new UserData(name.firstName, name.lastName );
      UserData.allData.push(newName);
      newName.renderName();
    }
  }
}

if(expUlElem){getExpensesFromStorage(); }

function getExpensesFromStorage() {
 let expensesInStorage = localStorage.getItem('userDetails');
 if(expensesInStorage){
   let parsedExpenses = JSON.parse(expensesInStorage);
   console.log(parsedExpenses);
   for(let expenses of parsedExpenses) {
    let newExpense = new UserData(expenses.expenses, expenses.cost);
    UserData.allData.push(newExpense);
    newExpense.renderExpense();
    }
  }
}

// if(desUlElem){getDesireFromStorage(); }

// function getDesireFromStorage() {
//  let desireInStorage = localStorage.getItem('userDetails');
//  if(desireInStorage){
//    let parsedDesire = JSON.parse(desireInStorage);
//    console.log(parsedDesire);
//    for(let desire of parsedDesire) {
//     let newDesire = new UserData(desire.desireObject, desire.costOfDesire );
//     UserData.allData.push(newDesire);
//     newDesire.renderDesire();
//     }
//   }
// }

    function putUserDataInStorage(){
    let stringArray = JSON.stringify(UserData.allData);
    localStorage.setItem('userDetails',stringArray);

  }

//  }

//---------------Rendering Header/Body/Footer---------//

console.log("i'm here");

//--------------Event Listeners------------------//
function handleSubmit1(e) {
  // e.preventDefault();
  let firstName = e.target.firstName.value;
  let lastName = e.target.lastName.value;
  console.log(firstName);
  _nameHandler(firstName, lastName);
  putUserDataInStorage();
}

  if(userNameElem){
    userNameElem.addEventListener('submit', handleSubmit1);

  }


  function handleSubmit2(e) {
    // e.preventDefault();
    let expenses = e.target.expenses.value;
    let cost = e.target.cost.value;
    console.log(expenses);
    _addNewExpense(expenses, cost);
    putUserDataInStorage();
  }
    
  if(expensesList){
    expensesList.addEventListener('submit', handleSubmit2);
  }

  // function handleSubmit3(event) {
  //   event.preventDefault();
  //   let desireObject = event.target.desireObject.value;
  //   let costOfDesire = event.target.costOfDesire.value;
  //   _desHandler(desireObject, costOfDesire);
  //   putUserDataInStorage();
  // }

  // if(desireList != null){
  //   desireList.addEventListener('submit', handleSubmit3);
  // }


//-------------Call Functions----------------//

// getnameFromStorage();