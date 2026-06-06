import { AlertTriangle,Pencil } from "lucide-react";
import { CATEGORIES, CATEGORY_COLORS } from "../../lib/expense-data";
import { formatCurrency } from "../../utils/currency";

export function BudgetTracker({ expenses, budgets,setBudgets, }){
  const now = new Date();
  const month = expenses.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });

  return (
    <div className="rounded-xl border bg-white  p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">Budget Tracking</h3>
          <p className="text-xs text-muted-foreground">Monthly limits by category</p>
        </div>
      </div>

      <div className="space-y-4">
        {CATEGORIES.map((c) => {
          const spent = month.filter((e) => e.category === c).reduce((s, e) => s + e.amount, 0);
          const budget = budgets[c] || 0;
          const pct = Math.min(100, (spent / budget) * 100);
          const over = spent > budget;
          const warn = pct >= 80 && !over;

          return (
            <div key={c}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: CATEGORY_COLORS[c] }}
                  />
                  <span className="font-medium">{c}</span>
                    <button onClick={() => {
                        const value = prompt(`Enter budget for ${c}`,budget);
                        if (value !== null && !isNaN(value)) {
                            setBudgets((prev) => ({...prev,
                                [c]: Number(value),}));
                            }}
                        }
                             className="rounded p-1 text-blue-500 transition hover:bg-blue-50 hover:scale-110">
                                <Pencil className="h-3.5 w-3.5" />
                                </button>
                  {over && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
                      <AlertTriangle className="h-3 w-3" />
                      Over budget
                    </span>
                  )}
                  {warn && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-warning/15 px-2 py-0.5 text-xs font-medium text-warning-foreground">
                      Near limit
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  <span className={over ? "font-semibold text-destructive" : "font-semibold text-foreground"}>
                    {formatCurrency(spent)}
                  </span>{" "}
                  /{formatCurrency(budget)}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: over
                      ? "var(--destructive)"
                      : warn
                        ? "var(--warning)"
                        : CATEGORY_COLORS[c],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
