import { IndianRupee } from "lucide-react";
export function Navbar() {
  return (
<header className="sticky top-0 z-40 border-b border-slate-700 bg-linear-to-r from-slate-900 via-blue-950 to-slate-900 backdrop-blur-xl shadow-lg">      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-blue-500 shadow-md">
            <IndianRupee className="h-5 w-5 text-white" />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">
              Expense Tracker
            </h1>

            <p className="text-xs font-medium text-slate-500">
              Personal Finance Dashboard
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-medium text-slate-600">
            Tracking Expenses
          </span>
        </div>

      </div>
    </header>
  );
}