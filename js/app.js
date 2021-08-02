'use strict';



//------------------Global Variables-----------------//

let userNameElem = document.getElementById("form1");
const expensesList = document.getElementById("form2");
const desireList = document.getElementById("form3");
const ulElem1 = document.getElementById('expenseList');
const showExpenseList = document.getElementById('desireList');
const secElem = document.getElementById('sectionName')




//---------------Constructor Functions------------------//

// 1) make total for expenses!!!!
// 2) edit expenses? - s

function UserData(firstName = '', lastName = '', expenses = 0, costPer = 0, desireObject = '', costOfDesire = 0, timeOfFullFillment) {
   this.firstName = firstName;
   this.lastName = lastName;
   this.expenses = expenses;
   this.costPer = costPer;
   this.desireObject = desireObject;
   this.costOfDesire = costOfDesire;
   this.timeOfFullFillment = timeOfFullFillment;

}

UserData.allData = []; 


UserData.prototype.renderName = function() {
  let h3Elem = document.getElementById('h3')
  h3Elem.textContent = `${this.firstName} ${this.lastName}`;
  secElem.appendChild(h3Elem);
}


UserData.prototype.renderExpense = function(){
    let liElem = document.createElement('li');
    liElem.textContent = `${expense.expense} ${expense.cost} per month`;
    ulElem1.appendChild(liElem);
  
}



UserData.prototype.renderDesire = function(){}




//----------------Global Functions----------------//


  // function _addNewExpense(expenses,costPer) {
  //   let newExpense = new UserData(expenses,costPer); 
  //     UserData.allData.push(newExpense);
  //     newExpense.renderExpense();
  // }
  

  function _nameHandler(firstName, lastName) {
    console.log(firstName, lastName);
    let newName = new UserData(firstName,lastName); 
    UserData.allData.push(newName);
    newName.renderName(); 
  }




// handel setting storage before going to the next page.

//  function checkDetailsInStorage() {
//   let detailsInStorage = localStorage.getItem('userDetails');
//   if(detailsInStorage){
//     let parsedDetails = JSON.parse(detailsInStorage);
//     console.log(parsedDetails);
    




//    let stringArray = JSON.stringify();
//    localStorage.setItem('userDetails',stringArray);
//   }else 


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

  
  
    function putUserDataInStorage(){
    let stringArray = JSON.stringify(UserData.allData);
    localStorage.setItem('userDetails',stringArray);

  }

//  }

//---------------Rendering Header/Body/Footer---------//



//--------------Event Listeners------------------//
function handleSubmit1(e) {
  e.preventDefault();
  console.log("i'm here");

  let firstName = e.target.firstName.value;
  let lastName = e.target.lastName.value;
  _nameHandler(firstName, lastName);
  putUserDataInStorage();
}

  if(userNameElem){
    userNameElem.addEventListener('submit', handleSubmit1)
  }


  // function handleSubmit2(event) {
  //   event.preventDefault();
  //   let expenses = event.target.expenseName.value;
  //   let cost = event.target.cost.value;
  //   _addNewExpense();
  // }
    
  // if(expensesList != null){
  //   expensesList.addEventListener("submit", handleSubmit2);
  // }

  // function handleSubmit3(event) {
  //   event.preventDefault();
  //   let desireObject = event.target.desireObject.value;
  //   let costOfDesire = event.target.costOfDesire.value;
  //   putDesireInStorage();
  // }

  // if(desireList != null){
  //   desireList.addEventListener('submit', handleSubmit3);
  // }


//-------------Call Functions----------------//

// checkDetailsInStorage();