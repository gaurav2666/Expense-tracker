export const CATEGORIES = [
  "Food",
  "Transport",
  "Bills",
  "Entertainment",
  "Other",
];

export const CATEGORY_COLORS = {
  Food: "#3b82f6",
  Transport: "#10b981",
  Bills: "#f97316",
  Entertainment: "#ec4899",
  Other: "#8b5cf6",
};

export const CATEGORY_BUDGETS = {
  Food: 1500,
  Transport: 500,
  Bills: 2000,
  Entertainment: 800,
  Other: 1000,
};

const today = new Date();

const d = (offset) => {
  const x = new Date(today);
  x.setDate(x.getDate() - offset);
  return x.toISOString();
};

export const seedExpenses = [
  {
    id: "1",
    amount: 45.2,
    category: "Food",
    date: d(0),
    note: "Lunch with team",
  },
  {
    id: "2",
    amount: 120,
    category: "Bills",
    date: d(1),
    note: "Internet bill",
  },
  {
    id: "3",
    amount: 18.5,
    category: "Transport",
    date: d(2),
    note: "Uber to office",
  },
  {
    id: "4",
    amount: 65,
    category: "Entertainment",
    date: d(3),
    note: "Movie night",
  },
  {
    id: "5",
    amount: 32.75,
    category: "Food",
    date: d(4),
    note: "Groceries",
  },
  {
    id: "6",
    amount: 250,
    category: "Bills",
    date: d(5),
    note: "Electricity",
  },
];