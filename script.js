"use strict";

const currencyFormatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD"
});

function promptForBudget() {
	while (true) {
		const input = window.prompt("Enter your monthly budget:");
		if (input === null) return null;

		const budget = Number(input);
		if (input.trim() !== "" && Number.isFinite(budget) && budget >= 0) {
			return budget;
		}

		window.alert("Enter a valid budget amount of 0 or more.");
	}
}

function promptForExpenses() {
	while (true) {
		const input = window.prompt(
			"Enter expense amounts separated by commas (for example: 45.50, 12, 8.25):"
		);
		if (input === null) return null;

		const entries = input.split(",").map((amount) => amount.trim());
		const expenses = entries.map(Number);
		const isValid = entries.every((entry, index) =>
			entry !== "" && Number.isFinite(expenses[index]) && expenses[index] >= 0
		);

		if (isValid) return expenses;
		window.alert("Enter one or more valid expense amounts separated by commas.");
	}
}

function calculateTotalExpenses(expenses) {
	return expenses.reduce((total, expense) => total + expense, 0);
}

function calculateRemainingBalance(budget, totalExpenses) {
	return budget - totalExpenses;
}

function runBudgetSummary() {
	const monthlyBudget = promptForBudget();
	if (monthlyBudget === null) {
		console.log("SpendWise: budget summary cancelled.");
		return;
	}

	const expenses = promptForExpenses();
	if (expenses === null) {
		console.log("SpendWise: budget summary cancelled.");
		return;
	}

	const totalExpenses = calculateTotalExpenses(expenses);
	const remainingBalance = calculateRemainingBalance(monthlyBudget, totalExpenses);

	console.group("SpendWise budget summary");
	console.log("Monthly budget:", currencyFormatter.format(monthlyBudget));
	console.log("Expense amounts:", expenses.map((amount) => currencyFormatter.format(amount)));
	console.log("Total expenses:", currencyFormatter.format(totalExpenses));
	console.log("Remaining balance:", currencyFormatter.format(remainingBalance));
	console.groupEnd();
}

runBudgetSummary();
