import { useState,useEffect } from "react";
import { CalendarIcon, Plus } from "lucide-react";
import { CATEGORIES } from "../../lib/expense-data";
import { ArrowUp, Pencil } from "lucide-react";

export function ExpenseForm({ onAdd, initial, onCancel }) {
  const [amount, setAmount] = useState(initial?.amount.toString() ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [date, setDate] = useState(initial?.date? initial.date.split("T")[0]: new Date().toISOString().split("T")[0]);
  const [note, setNote] = useState(initial?.note ?? "");
  const [errors, setErrors] = useState({});
useEffect(() => {
  if (initial) {
    setAmount(initial.amount?.toString() || "");
    setCategory(initial.category || "");
    setDate(initial.date || "");
    setNote(initial.note || "");
  }
}, [initial]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    const amt = Number(amount);
    if (!amount || isNaN(amt) || amt <= 0) next.amount = "Enter a valid amount greater than 0";
    if (!category) next.category = "Select a category";
    if (!date) next.date = "Pick a date";
    setErrors(next);
    if (Object.keys(next).length) return;

    onAdd({ amount: amt, category: category, date: date, note: note.trim() || undefined });
    if (!initial) {
      setAmount("");
      setCategory("");
      setNote("");
      setDate(new Date().toISOString().split("T")[0]);
    }
  };

  return (
   <div className={`rounded-xl bg-white p-6 transition-all duration-500 ${
    initial
    ? "border-2 border-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.25)]": "border shadow-sm"}`}>
        <div className="mb-5">
        {initial && (<div className="mb-4 flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">
            <ArrowUp className="h-4 w-4 animate-bounce" />
            <Pencil className="h-4 w-4" />Editing selected expense</div>)}
        <h2 className="text-lg font-semibold tracking-tight">
          {initial ? "Edit Expense" : "Add New Expense"}
        </h2>
        <p className="text-sm text-muted-foreground">Track your spending in seconds</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="amount" className="block text-sm font-medium"> Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                ₹
              </span>
              <input
               type="number"
               placeholder="0.00"
               className="w-full rounded border p-2 pl-7"
               value={amount}
               onChange={(e) => setAmount(e.target.value)}
               />
            </div>
            {errors.amount && <p className="text-xs text-red-500">{errors.amount}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Category</label>
            <select
            className="w-full rounded border p-2"
           value={category}
           onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            
            {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}
                </option>
            ))}
            </select>
            {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Date</label>
           <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            <input type="date"
             max={new Date().toISOString().split("T")[0]}
            className="w-full rounded border p-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}/>
            </div>
            {errors.date && (<p className="text-xs text-red-500">
            {errors.date}</p>
        )}
            
        </div>

        <div className="space-y-2">
          <label htmlFor="note" className="block text-sm font-medium">Note</label>
          <textarea rows="2"
          className="w-full rounded-xl border border-slate-200 bg-white  px-3 py-2.5 shadow-sm transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:outline-none "
          value={note}
          placeholder="What is it for?"
          onChange={(e) => setNote(e.target.value)}/>
        </div>

        <div className="flex gap-2 pt-1">
          <button
          type="submit"
          className="flex flex-1 items-center justify-center gap-2 rounded bg-blue-500 px-4 py-2 text-white cursor-pointer">
            <Plus className="mr-1.5 h-4 w-4" />
            {initial ? "Save Changes" : "Add Expense"}
          </button>
          {initial && onCancel && (
            <button
            type="button"
            onClick={onCancel}
            className="rounded border px-4 py-2 cursor-pointer">Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}