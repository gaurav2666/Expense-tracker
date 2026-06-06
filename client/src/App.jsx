import { useState, useEffect, useRef } from "react";
import { Navbar } from "./components/expense/Navbar";
import { SummaryCards } from "./components/expense/SummaryCards";
import { ExpenseForm } from "./components/expense/ExpenseForm";
import { ExpenseChart } from "./components/expense/ExpenseChart";
import { ExpenseList } from "./components/expense/ExpenseList";
import { FilterBar } from "./components/expense/FilterBar";
import { EmptyState } from "./components/expense/EmptyState";
import { ConfirmDeleteModal } from "./components/expense/ConfirmDeleteModal";
import { BudgetTracker } from "./components/expense/BudgetTracker";
import API from "./services/api";
function App() {
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [budgets, setBudgets] = useState(() => {
  const saved = localStorage.getItem("budgets");
  return saved
    ? JSON.parse(saved)
    : {
        Food: 5000,
        Transport: 3000,
        Bills: 10000,
        Entertainment: 4000,
        Other: 2000,
      };
});
useEffect(() => {
  localStorage.setItem("budgets", JSON.stringify(budgets));}, [budgets]);

  const formRef = useRef(null);
  const [filters, setFilters] = useState({
    category: "all",
    search: "",
    date: "",
    period: "all",
  });
  useEffect(() => {
  fetchExpenses();
}, []);

const fetchExpenses = async () => {
  try {
    const { data } = await API.get("/expenses");
    setExpenses(data);
  } catch (error) {
    console.error(error);
  }
};

  const handleAdd = async (expenseData) => {
  try {
    if (editing) {
      await API.put(`/expenses/${editing._id}`, expenseData);

      setEditing(null);
    } else {
      await API.post("/expenses", expenseData);
    }

    fetchExpenses();
  } catch (error) {
    console.error(error);
  }
};

  const handleDelete = async () => {
  try {
    if (!toDelete) return;

    await API.delete(`/expenses/${toDelete._id}`);

    fetchExpenses();

    setToDelete(null);
  } catch (error) {
    console.error(error);
  }
};

const now = new Date();

const firstDayThisMonth = new Date(
  now.getFullYear(),
  now.getMonth(),
  1
);

const firstDayLastMonth = new Date(
  now.getFullYear(),
  now.getMonth() - 1,
  1
);

const lastDayLastMonth = new Date(
  now.getFullYear(),
  now.getMonth(),
  0
);

  const filteredExpenses = expenses.filter((expense) => {
  const categoryMatch =
    filters.category === "all" ||
    expense.category === filters.category;

  const searchMatch =
    filters.search === "" ||
    expense.note?.toLowerCase().includes(filters.search.toLowerCase()) ||
    expense.category.toLowerCase().includes(filters.search.toLowerCase());

  const dateMatch =
    !filters.date ||
    expense.date.startsWith(filters.date);

  let periodMatch = true;

  const expenseDate = new Date(expense.date);

  if (filters.period === "thisMonth") {
    periodMatch =
      expenseDate.getMonth() === now.getMonth() &&
      expenseDate.getFullYear() === now.getFullYear();
  }

  if (filters.period === "lastMonth") {
    const lastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1
    );

    periodMatch =
      expenseDate.getMonth() === lastMonth.getMonth() &&
      expenseDate.getFullYear() === lastMonth.getFullYear();
  }

  return (
    categoryMatch &&
    searchMatch &&
    dateMatch &&
    periodMatch
  );
});

  return (
   <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-purple-50">
      <Navbar />

      <main className="mx-auto max-w-7xl space-y-6 p-6">
        <SummaryCards expenses={expenses} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div ref={formRef}>
            <ExpenseForm
            onAdd={handleAdd}
            initial={editing}
            onCancel={() => setEditing(null)}
            isEditing={!!editing}/>
          </div>

          <div className="space-y-6 lg:col-span-2">
            <ExpenseChart expenses={expenses} />
            <BudgetTracker
            expenses={expenses}
            budgets={budgets}
            setBudgets={setBudgets}/>
          </div>
        </div>

        <FilterBar
          filters={filters}
          setFilters={setFilters}
          expenses={filteredExpenses}
        />

        {filteredExpenses.length === 0 ? (
          <EmptyState />
        ) : (
         <ExpenseList
         expenses={filteredExpenses}
         onEdit={(expense) => {
        setEditing(expense);

        setTimeout(() => {const y =
          formRef.current.getBoundingClientRect().top +
          window.pageYOffset -100;
          window.scrollTo({
            top: y, behavior: "smooth",});}, 100);
      }}
      onDelete={setToDelete}
/>
        )}
      </main>

      <ConfirmDeleteModal
        open={!!toDelete}
        onOpenChange={() => setToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default App;