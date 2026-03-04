const transactions = [];
//ADD TRANSACTION is to enable us to be adding transactions to the records and also to validate the input data before adding it to the records
function addTransaction() {
  const description = document.getElementById("description").value.trim();
  const amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value.trim();
  const date = document.getElementById("date").value;
    if(description === ""){
        window.alert("Please enter a description for the transaction");
            document.getElementById("description").focus();
            document.getElementById("description").style.borderColor = "red";
        return;
  }
  if(amount <= 0) {
        window.alert("Please enter a valid amount");
        document.getElementById("amount").focus();
        document.getElementById("amount").style.borderColor = "red";
        return;
  }
  if(type === "") {
        window.alert("Please select a transaction type");
        document.getElementById("type").focus();
        document.getElementById("type").style.borderColor = "red";
        return;
  }

  const transaction = {
    description,
    amount,
    type,
    category,
    date
  };

  transactions.push(transaction);

  renderTransactions();

  updateStats();
}
//RENDER LIST Section to help us render the transaction list on the page
function renderTransactions(list = transactions) {
  const container = document.getElementById("transactionList");
  container.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    const transaction = list[i];
//created a div
    const div = document.createElement("div");
//added a class name to the div
    div.className = "transaction";
//added some conditional stylings based on transaction type and amount
    if (transaction.type === "expense" && transaction.amount > 500) {
      div.classList.add("expense-high");
    } else if (transaction.type === "income" && transaction.amount > 2000) {
      div.classList.add("income-high");
    }
//added an inner HTML of the div in order to display transaction details and to also remove button
    div.innerHTML = `
      <span>${transaction.description} - ${transaction.category}</span>
      <span>${transaction.type === "income" ? "+" : "-"}$${transaction.amount}</span>
      <button onclick="removeTransaction(${i})">Remove</button>
    `;
    container.appendChild(div);
  }
}
// DELETE Section to be able to remove data from the records
function removeTransaction(index) {
  transactions.splice(index, 1);
  renderTransactions();
  updateStats();
}
//FILTERS Section to help us filter to show all transactions, Income recorded, 
// and Expense recorded
function showAll() {
  renderTransactions();
}
function showIncome() {
  const filtered = transactions.filter(t => t.type === "income");
  renderTransactions(filtered);
}
function showExpense() {
  const filtered = transactions.filter(t => t.type === "expense");
  renderTransactions(filtered);
}
//SORT Section to help sort the data from highest to lowest amount
function sortByAmount() {
    transactions.sort((a, b) => b.amount - a.amount);
  renderTransactions();
}
// STATISTICS Section to help get the statistics of transaction data recorded
function updateStats() {
  const statsContainer = document.getElementById("stats");
  statsContainer.innerHTML = "";
  if(transactions.length === 0){
    statsContainer.innerHTML = "<p>No transactions to display stats.</p>";
    return;
  }
  if(transactions.length > 0){
    let totalIncome = 0;
    let totalExpense = 0;
    let highestExpense = 0;
    for(let i = 0; i < transactions.length; i++){
        const t = transactions[i];
        if(t.type === "income"){
            totalIncome += t.amount;
        } else if(t.type === "expense"){
            totalExpense += t.amount;
            if(t.amount > highestExpense){
                highestExpense = t.amount;
            }
        }
    }
    const balance = totalIncome - totalExpense;
    const statHTML = `
      <div class="stat-box">
        <h3>Total Income</h3>
        <p>$${totalIncome.toFixed(2)}</p>
      </div>
      <div class="stat-box">
        <h3>Total Expense</h3>
        <p>$${totalExpense.toFixed(2)}</p>
      </div>
      <div class="stat-box">
        <h3>Balance</h3>
        <p>$${balance.toFixed(2)}</p>
      </div>
      <div class="stat-box">
        <h3>Highest Expense</h3>
        <p>$${highestExpense.toFixed(2)}</p>
      </div>
      <div class="stat-box">
        <h3>Transaction Count</h3>
        <p>${transactions.length}</p>
      </div>
    `;
    statsContainer.innerHTML = statHTML;
  }
}