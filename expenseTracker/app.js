const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

//function for localStorage
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("please add a text and an amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValue();
    updateLocalStorage();

    text.value = "";
    amount.value = "";
  }
}

//generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

//adding the Transaction to the DOM list
function addTransactionDOM(transaction) {
  //first check sign of value (positive or negative)
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  //add a class based on value entered
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `${transaction.text}<span> ${sign}${Math.abs(
    transaction.amount
  )} </span><button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })"><i class="fa fa-trash"></i></button>`;

  list.appendChild(item);
}

//update the  balance, income and expense
function updateValue() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  //update html content
  balance.innerText = `₵${total}`;
  money_plus.innerText = `₵${income}`;
  money_minus.innerText = `₵${expense}`;
}

//remove transaction
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
}

//updating transaction in local storage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//start listing the items
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValue();
}

init();

form.addEventListener("submit", addTransaction);
