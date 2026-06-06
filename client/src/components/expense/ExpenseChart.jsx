import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CATEGORIES, CATEGORY_COLORS } from "../../lib/expense-data";
import { formatCurrency } from "../../utils/currency";


export function ExpenseChart({ expenses }) {
  const byCategory = CATEGORIES.map((c) => ({
    name: c,
    value: expenses.filter((e) => e.category === c).reduce((s, e) => s + e.amount, 0),
  })).filter((d) => d.value > 0);

  const months = {};
  expenses.forEach((e) => {
    const d = new Date(e.date);
    const key = d.toLocaleString("en", { month: "short" });
    months[key] = (months[key] || 0) + e.amount;
  });
  const monthly = Object.entries(months).map(([name, total]) => ({
    name,total,}))
    .sort((a, b) =>
        new Date(`${a.name} 1, 2026`) -
        new Date(`${b.name} 1, 2026`));

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-xl border bg-white  p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-base font-semibold">Category Distribution</h3>
          <p className="text-xs text-muted-foreground">Where your money goes</p>
        </div>
        <div className="h-70">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={byCategory}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                strokeWidth={0}
              >
                {byCategory.map((entry) => (
                 <Cell
                  key={entry.name}
                  fill={CATEGORY_COLORS[entry.name]}
                  />
                ))}
              </Pie>
             <Tooltip
             contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                padding: "10px 14px",
                color: "#111827",
                fontWeight: 500,}}
                labelStyle={{
                    color: "#111827",
                    fontWeight: 700,
                    marginBottom: "4px", }}
                    itemStyle={{
                        color: "#111827",
                        fontWeight: 500,}}
                        formatter={(v) => [formatCurrency(v), "Amount"]}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          {byCategory.map((d) => (
            <div key={d.name} className="flex items-center gap-1.5 text-xs">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                    backgroundColor:
                    CATEGORY_COLORS[d.name]
                }}
              />
              <span className="text-muted-foreground">{d.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border bg-white  p-5 shadow-sm">
        <div className="mb-4">
          <h3 className="text-base font-semibold">Monthly Spending</h3>
          <p className="text-xs text-muted-foreground">Total per month</p>
        </div>
        <div className="h-70">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthly}>
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => formatCurrency(v)} />
              <Tooltip
              cursor={{ fill: "rgba(59,130,246,0.08)",}}
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid rgba(255,255,255,0.8)",
                borderRadius: "12px",
                color: "#111827",
                boxShadow:
                "0 10px 30px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.6) inset",
                backdropFilter: "blur(8px)",
                padding: "10px 14px",}}
                labelStyle={{
                    color: "#111827",
                    fontWeight: 700,}}
                    itemStyle={{
                        color: "#111827",fontWeight: 500,}}
                        formatter={(v) => formatCurrency(v)}/>
              <Bar dataKey="total" fill="var(--primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}