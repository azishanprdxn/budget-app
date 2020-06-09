/* Author: Zishan Ansari */
let budget;
let expense;
let expenseAmount;

// Texts
let budgetText = document.getElementById('budget-text');
let expenseText = document.getElementById('expense-text');
let balanceText = document.getElementById('balance-text');

//  Buttons
let calculate = document.getElementById('calculate');
let addExpense = document.getElementById('add-expense');

// Regex for Numbers
let numberPattern = /^[0-9]*$/;

// Helpers for Validation
let helperLength = document.getElementsByClassName('helper').length;
let helperArray = [];
for (let i = 0; i < helperLength; i++) {
  helperArray.push(document.getElementsByClassName('helper')[i]);
}

// On Clicks
calculate.onclick = onCalculate;
addExpense.onclick = onAddExpense;

// On Calculate Function
function onCalculate() {
  budget = document.getElementById('budget').value;
  if (budget.match(numberPattern) && budget !== '') {
    hideHelper(0);
    budgetText.innerHTML = budget;
    calculateExpense();
    balanceText.innerHTML = budget - expenseText.innerHTML;
  } else {
    showHelper(0);
  }
}

// On Add Expense Function
function onAddExpense() {
  expense = document.getElementById('expense').value;
  expenseAmount = document.getElementById('expense-amount').value;
  if (!expense) {
    showHelper(1);
  } else {
    hideHelper(1);
  }
  if (expenseAmount.match(numberPattern) && expenseAmount !== '') {
    hideHelper(2);
  } else {
    showHelper(2);
  }
  if (!expense || !(expenseAmount.match(numberPattern) && expenseAmount !== '')) {
    return;
  } else {
    document.getElementById('entered-data').innerHTML +=
      `<tr>
      <td>
        ${expense}
      </td>
      <td class="expense-value">
        <span class="dollar"></span>${expenseAmount}
      </td>
      <td>
        <span class="fa fa-pencil-square-o edit-icon" title="Edit" onclick='onEdit(this)'></span>
        <span class="fa fa-trash delete-icon" title="Delete" onclick='onDelete()'></span>
      </td>
    </tr>`
      ;
    document.getElementById('expense').value = '';
    document.getElementById("expense-amount").value = '';
    calculateExpense();
  }
}

// On Edit Function
function onEdit(tableData) {
  let selectedRow = tableData.parentElement.parentElement;
  document.getElementById('expense').value = selectedRow.cells[0].innerText;
  document.getElementById("expense-amount").value = selectedRow.cells[1].innerText;
  removeRow();
}

// On Delete Function
function onDelete() {
  let isConfirmed = confirm("Do you want to delete this entry?");
  if (isConfirmed) {
    removeRow();
  }
}

// Calculate Expense
let calculateExpense = () => {
  let totalExpense = 0;
  let expenseValue = document.getElementsByClassName('expense-value');
  for (let i = 0; i < expenseValue.length; i++) {
    totalExpense += Number(expenseValue[i].innerText);
  }
  expenseText.innerHTML = totalExpense;
}

// Removes a Row
let removeRow = () => {
  let tableBody = document.querySelector('tbody');
  let tableRow = document.querySelectorAll("tbody tr");
  for (let i = 0; i < tableRow.length; i++) {
    tableRow[i].onclick = function () {
      tableBody.removeChild(this);
    }
  }
}

// Show Helper Function
let showHelper = (index) => {
  for (let i = 0; i < helperLength; i++) {
    helperArray[index].style.opacity = '1';
    helperArray[index].style.paddingLeft = '12px';
    helperArray[index].style.transition = '.2s';
  }
}

// Hide Helper Function
let hideHelper = (index) => {
  for (let i = 0; i < helperLength; i++) {
    helperArray[index].style.opacity = '0';
    helperArray[index].style.paddingLeft = '6px';
    helperArray[index].style.transition = '.2s';
  }
}