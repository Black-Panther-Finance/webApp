'use strict';



//------------------Global Variables-----------------//

const currentDate = new Date();
const userNameElem = document.getElementById("form1");
const expensesList = document.getElementById("form2");
const desireList = document.getElementById("form3");
const secElem = document.getElementById('sectionName');
const totalElem = document.getElementById('expenseTotal');
let expUlElem = document.getElementById('expenseList');
let desUlElem = document.getElementById('desireList');

const one_day = 1000 * 60 * 60 * 24;
const present_date = new Date();
  
// // 0-11 is Month in JavaScript
// var christmas_day = new Date(present_date.getFullYear(), 11, 25)
  
// // To Calculate the result in milliseconds and then converting into days
// var Result = Math.round(christmas_day.getTime() - present_date.getTime()) / (one_day);
  
// // To remove the decimals from the (Result) resulting days value
// var Final_Result = Result.toFixed(0);
  

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

function Desire(name, cost, date, save) {
  this.name = name;
  this.cost = cost;
  this.date = date;
  this.save = save;
  Desire.all.push(this);
}

Username.all = [];
Expense.all = [];
Desire.all = [];

function expenseTotal() {
  let total = 0;
  console.log('expenseTotal')
  for(let expense of Expense.all) {
    if (expense.per === 'day') {
      total += expense.cost * 1;
    }
    if (expense.per === 'week') {
      total += expense.cost * (1/7);
    }
    if (expense.per === 'month') {
      total += expense.cost * (1/30);
    }
    if (expense.per === 'year') {
      total += expense.cost * (1/365);
    }
  }
  total = total.toFixed(2);
  totalElem.innerText = `${total}$`;
  return total;
}

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
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'X';
    deleteBtn.addEventListener('click', () => {
      liElem.remove();
      Expense.all.splice(Expense.all.indexOf(exp), 1);
      putExpenseInStorage();
      expenseTotal();
    });
    liElem.innerText = `${exp.name} - ${exp.cost}$ per ${exp.per}`;
    expUlElem.appendChild(liElem);
    liElem.appendChild(deleteBtn);
  }
  expenseTotal();
}

function renderDesire() {
  desUlElem.innerHTML = '';
  console.log('rendering desire');
  for (let des of Desire.all) {
    let liElem = document.createElement('li');
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'X';
    deleteBtn.addEventListener('click', () => {
      liElem.remove();
      Desire.all.splice(Desire.all.indexOf(des), 1);
      putDesireInStorage();
    });
    liElem.textContent = `${des.name} - ${des.cost}$ Save ${des.save}/ day to acheive by: ${des.date}`;
    desUlElem.appendChild(liElem);
    liElem.appendChild(deleteBtn);
  }
}

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

if(desUlElem){getDesireFromStorage(); }
  
function getDesireFromStorage() {
  console.log("gettin obj from storage");
  let desireInStorage = localStorage.getItem('desire');
  if(desireInStorage){
    let parsedDesire = JSON.parse(desireInStorage);
    for(let desire of parsedDesire) {
      let theDate = desire.date.split('-');
      theDate = new Date(theDate[0], theDate[1], theDate[2]);
      let result = (Math.round(theDate.getTime() - present_date.getTime()) / (one_day)).toFixed(0);
      let save = (desire.cost / result).toFixed(2);
      new Desire(desire.name, desire.cost, desire.date, save);
    }
  }
  renderDesire();
}

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

function putDesireInStorage(){
  console.log("I'm putting obj in storage" );
  let stringArray = JSON.stringify(Desire.all);
  localStorage.setItem('desire',stringArray);
}

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
  expensesList.reset();
}
  
if(expensesList){
  expensesList.addEventListener('submit', handleSubmit2);
}

  function handleSubmit3(e) {
    e.preventDefault();
    new Desire(e.target.desireObj.value, e.target.costOfDesire.value, e.target.date.value);
    console.log('desire');
    renderDesire();
    putDesireInStorage();
    desireList.reset();
  }

  if(desireList != null){
    desireList.addEventListener('submit', handleSubmit3);
  }


//-------------Call Functions----------------//

// getnameFromStorage();