import { CalendarIcon, RotateCcw, Search } from "lucide-react";
import { CATEGORIES } from "../../lib/expense-data";
import { Download } from "lucide-react";
import { exportExpensesToCSV } from "../../utils/exportCSV";

export function FilterBar({ filters, setFilters,expenses, }) {
  const reset = () =>
  setFilters({
    category: "all",
    search: "",
    date: "",
    period: "all",
  });

  return (
    <div className="rounded-xl border bg-white  p-4 shadow-sm">
        <div className="mb-4 flex flex-wrap gap-2">
  <button
    onClick={() =>
      setFilters({ ...filters, period: "all" })
    }
    className={`cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium ${
      filters.period === "all"
        ? "bg-blue-500 text-white"
        : "border bg-white"
    }`}
  >
    All Time
  </button>

  <button
    onClick={() =>
      setFilters({ ...filters, period: "thisMonth" })
    }
    className={`cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium ${
      filters.period === "thisMonth"
        ? "bg-blue-500 text-white"
        : "border bg-white"
    }`}
  >
    This Month
  </button>

  <button
    onClick={() =>
      setFilters({ ...filters, period: "lastMonth" })
    }
    className={`cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium ${
      filters.period === "lastMonth"
        ? "bg-blue-500 text-white"
        : "border bg-white"
    }`}
  >
    Last Month
  </button>
</div>
      <div className="grid gap-3 md:grid-cols-[1fr_180px_240px_auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          
          <input
          type="text"
          placeholder="Search expenses..."
          className="w-full rounded border p-2 pl-9"
          value={filters.search}
          onChange={(e) =>
            setFilters({
                ...filters,
                search: e.target.value,  })
                 }
                 />
        </div>

        <select
        className="rounded border p-2"
        value={filters.category}
        onChange={(e) =>
            setFilters({
                ...filters,
                category: e.target.value,
             })
             }>
                <option value="all">
                     All Categories
                     </option>
                     {CATEGORIES.map((c) => (
                         <option key={c} value={c}>
                              {c}
                              </option>
                            ))}
                            </select>

        <div className="flex items-center gap-2 rounded border p-2">
             <CalendarIcon className="h-4 w-4" />
             
             <input
             type="date"
             value={filters.date || ""}
             onChange={(e) =>
                setFilters({
                    ...filters,
                    date: e.target.value,
                })
            }/>
            </div>

        <button
         onClick={reset}
         className="flex items-center gap-2 rounded border px-3 py-2">
            <RotateCcw className="h-4 w-4" />
            Reset
            </button>
             <button
             onClick={() => exportExpensesToCSV(expenses)}
             className="flex items-center gap-2 rounded-lg border border-blue-200 bg-linear-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-lg hover:shadow-blue-200 active:scale-95">
                <Download className="h-4 w-4" />Export CSV
                </button>
           </div>
    </div>
    
  );
}
