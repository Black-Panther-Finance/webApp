'use strict';



//------------------Global Variables-----------------//

const userNameElem = document.getElementById("form1");
const expensesList = document.getElementById("form2");
const desireList = document.getElementById("form3");
const secElem = document.getElementById('sectionName');
let expUlElem = document.getElementById('expenseList');
let desUlElem = document.getElementById('desire');

// experimental ----------------------------------------

function Username(first, last) {
  this.first = first;
  this.last = last;
  Username.all.push(this);
}

function Expense(name, cost, per) {
  this.name = name;
  this.cost = cost;
  this.per = per;
  Expense.all.push(this);
}

function Desire(name, cost, date) {
  this.name = name;
  this.cost = cost;
  this.date = date;
  Desire.all.push(this);
}

Username.all = [];
Expense.all = [];
Desire.all = [];

//---------------Constructor Functions------------------//

// 1) make total for expenses!!!!
// 2) edit expenses? - s

// function UserData(firstName = '', lastName = '', expenses, cost, desireObject, costOfDesire, timeOfFullFillment) {
//    this.firstName = firstName;
//    this.lastName = lastName;
//    this.expenses = expenses;
//    this.cost = cost;
//    this.desireObject = desireObject;
//    this.costOfDesire = costOfDesire;
//    this.timeOfFullFillment = timeOfFullFillment;

// }

// UserData.allData = []; 

function renderName(name) {
  let h3Elem = document.createElement('h3')
  h3Elem.textContent = `Hi ${name.first} ${name.last}`;
  secElem.appendChild(h3Elem);
  console.log('rendername');
}

function renderExpense(){
  expUlElem.innerHTML = '';
  console.log("im rendering expenses");
  for (let exp of Expense.all) {
    let liElem = document.createElement('li');
    liElem.textContent = `${exp.name} ${exp.cost} per ${exp.per}`;
    expUlElem.appendChild(liElem);
  }
}

// UserData.prototype.renderDesire = function(){
//   let liElem = document.createElement('li');
//     liElem.textContent = `${this.desireObject} ${this.costOfDesire}`;
//     desUlElem.appendChild(liElem);
  
// }

//----------------Global Functions----------------//

// function _nameHandler(firstName, lastName) {
//   console.log(firstName, lastName);
//   let newName = new UserData(firstName,lastName); 
//   UserData.allData.push(newName);
//   // newName.renderName(); 
// }

// function _addNewExpense(expenses,cost) {
//   let newExpense = new UserData(expenses,cost); 
//   console.log(newExpense);
//     UserData.allData.push(newExpense);
//     newExpense.renderExpense();
// }
  

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
  console.log("I'm getting name from storage");
  let nameFromStorage = localStorage.getItem('username');
  if (nameFromStorage) {
    let name = JSON.parse(nameFromStorage);
    console.log(name);
    name = new Username(name.first, name.last);
    console.log(Username.first);
    renderName(name);
  }
}

if(expUlElem){
  getExpensesFromStorage();
}

function getExpensesFromStorage() {
  console.log("I'm getting expenses from storage");
 let expensesInStorage = localStorage.getItem('expense');
 if(expensesInStorage){
   let parsedExpenses = JSON.parse(expensesInStorage);
   console.log(parsedExpenses);
   console.log(Expense.all);
   for(let expenses of parsedExpenses) {
    new Expense(expenses.name, expenses.cost, expenses.per);
    }
  }
  renderExpense();
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

function putUsernameInStorage(name){
  console.log("I'm putting name in storage");
  let stringArray = JSON.stringify(name);
  localStorage.setItem('username',stringArray);
}

function putExpenseInStorage(){
  console.log("I'm putting expense in storage");
  let stringArray = JSON.stringify(Expense.all);
  localStorage.setItem('expense',stringArray);
}

// function putUsernameInStorage(){
//   let stringArray = JSON.stringify(Username);
//   localStorage.setItem('username',stringArray);
// }

//  }

//---------------Rendering Header/Body/Footer---------//



//--------------Event Listeners------------------//
function handleSubmit1(e) {
  e.preventDefault();
  let name = new Username(e.target.firstName.value, e.target.lastName.value);
  // Username.first = e.target.firstName.value;
  // Username.last = e.target.lastName.value;
  putUsernameInStorage(name);
  window.location = 'expenses.html';
}

if(userNameElem){
  userNameElem.addEventListener('submit', handleSubmit1);
  console.log('usernameelement')
}

function handleSubmit2(e) {
  e.preventDefault();
  new Expense(e.target.expenses.value, e.target.cost.value, e.target.per.value);
  console.log('expenses');
  renderExpense();
  putExpenseInStorage();
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