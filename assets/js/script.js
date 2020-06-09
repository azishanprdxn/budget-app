/* Author: Zishan Ansari */
let budget;
let expense;
let expenseAmount;

let budgetText = document.getElementById('budget-text');
let expenseText = document.getElementById('expense-text');
let balanceText = document.getElementById('balance-text');

let calculate = document.getElementById('calculate');
let addExpense = document.getElementById('add-expense');

let numberPattern = /^[0-9]*$/;

let helper = document.getElementsByClassName('helper');

calculate.onclick = onCalculate;
addExpense.onclick = onAddExpense;

function onCalculate() {
  budget = document.getElementById('budget').value;
  if (budget.match(numberPattern) && budget !== '') {
    helper[0].style.opacity = '0';
    helper[0].style.paddingLeft = '6px';
    budgetText.innerHTML = budget;
    calculateExpense();
    balanceText.innerHTML = budget - expenseText.innerHTML;
  } else {
    helper[0].style.opacity = '1';
    helper[0].style.paddingLeft = '12px';
    helper[0].style.transition = '.2s';
  }
}

function onAddExpense() {
  expense = document.getElementById('expense').value;
  expenseAmount = document.getElementById('expense-amount').value;
  if (!expense) {
    helper[1].style.opacity = '1';
    helper[1].style.paddingLeft = '12px';
    helper[1].style.transition = '.2s';
  } else {
    helper[1].style.opacity = '0';
    helper[1].style.paddingLeft = '6px';
  }
  if (expenseAmount.match(numberPattern) && expenseAmount !== '') {
    helper[2].style.opacity = '0';
    helper[2].style.paddingLeft = '6px';
  } else {
    helper[2].style.opacity = '1';
    helper[2].style.paddingLeft = '12px';
    helper[2].style.transition = '.2s';
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
        <span class="dollar"></span>
        ${expenseAmount}
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
  // Get data into input boxes
  var selectedRow = tableData.parentElement.parentElement;
  document.getElementById('expense').value = selectedRow.cells[0].innerText;
  document.getElementById("expense-amount").value = selectedRow.cells[1].innerText;
  removeRow();
}

// On Delete Function
function onDelete() {
  var isConfirmed = confirm("Do you want to delete this entry?");
  if (isConfirmed) {
    removeRow();
  }
}

// Calculate Expense
function calculateExpense() {
  let totalExpense = 0;
  let expenseValue = document.getElementsByClassName('expense-value');
  for (let i = 0; i < expenseValue.length; i++) {
    totalExpense += Number(expenseValue[i].innerText);
  }
  expenseText.innerHTML = totalExpense;
}

// Remove a Row
function removeRow() {
  var tableBody = document.querySelector('tbody');
  var tableRow = document.querySelectorAll("tbody tr");
  for (var i = 0; i < tableRow.length; i++) {
    tableRow[i].onclick = function () {
      tableBody.removeChild(this);
    }
  }
}