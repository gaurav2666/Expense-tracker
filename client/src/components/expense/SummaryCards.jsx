import { TrendingUp, ArrowUpRight, PieChart, Receipt } from "lucide-react";
import { formatCurrency } from "../../utils/currency";
export function SummaryCards({ expenses }) {

  const now = new Date();
  const monthExp = expenses.filter((e) => {
  const d = new Date(e.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const total = monthExp.reduce((s, e) => s + e.amount, 0);
  const highest = expenses.reduce((m, e) => (e.amount > m ? e.amount : m), 0);
  const catTotals = {};
  expenses.forEach((e) => (catTotals[e.category] = (catTotals[e.category] || 0) + e.amount));
  const topCat = Object.entries(catTotals).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

  const stats = [
    {
      label: "Total Spent This Month",
      value: formatCurrency(total),
      hint: `${monthExp.length} transactions`,
      icon: TrendingUp,
      tint: "from-blue-100 to-blue-50",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Highest Expense",
      value: formatCurrency(highest),
      hint: "Single transaction",
      icon: ArrowUpRight,
      tint: "from-warning/20 to-warning/5",
      iconColor: "text-warning",
      bgColor: "bg-amber-50",
    },
    {
      label: "Top Spending Category",
      value: topCat,
      hint: `${formatCurrency(catTotals[topCat] ?? 0)} total`,
      icon: PieChart,
      tint: "from-chart-4/20 to-chart-4/5",
      iconColor: "text-chart-4",
      bgColor: "bg-pink-50",
    },
    {
      label: "Total Transactions",
      value: String(expenses.length),
      hint: "All time",
      icon: Receipt,
      tint: "from-success/20 to-success/5",
      iconColor: "text-success",
      bgColor: "bg-emerald-50",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 cursor-pointer">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
         <div
         key={s.label}
         className={`group relative overflow-hidden rounded-xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 ${s.bgColor}`}
>
            <div className="relative">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                  {s.label}
                </p>
                <div className={`rounded-lg bg-background/60 p-2 ${s.iconColor}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-bold tracking-tight">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}