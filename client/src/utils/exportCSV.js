export const exportExpensesToCSV = (expenses) => {
  const headers = ["Date", "Category", "Amount", "Note"];

  const rows = expenses.map((expense) => [
    new Date(expense.date).toLocaleDateString("en-IN"),
    expense.category,
    expense.amount,
    expense.note || "",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", "expenses.csv");

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};