import { useState } from "react";
import { format } from "date-fns";
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORY_COLORS } from "../../lib/expense-data";
import { formatCurrency } from "../../utils/currency";


const PAGE_SIZE = 6;
export function ExpenseList({ expenses, onEdit, onDelete }){
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(expenses.length / PAGE_SIZE));
  const current = expenses.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
   <div className="overflow-hidden rounded-xl border bg-white  shadow-sm">
      <div className="flex items-center justify-between border-b border-border p-5">
        <div>
          <h3 className="text-base font-semibold">Recent Expenses</h3>
          <p className="text-xs text-muted-foreground">{expenses.length} total</p>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Category</th>
              <th className="px-5 py-3 font-medium">Note</th>
              <th className="px-5 py-3 text-right font-medium">Amount</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {current.map((e) => (
              <tr
                key={e._id}
                className="border-t border-border transition-colors hover:bg-muted/40"
              >
                <td className="px-5 py-3.5 text-sm">{format(new Date(e.date), "MMM d, yyyy")}</td>
                <td className="px-5 py-3.5">
                  <span
                       className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium"
                       style={{
                       backgroundColor: `color-mix(in oklab, ${CATEGORY_COLORS[e.category]} 18%, transparent)`
                     }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: CATEGORY_COLORS[e.category] }}
                    />
                    {e.category}
                  </span>
                </td>
                <td className="max-w-xs truncate px-5 py-3.5 text-sm text-muted-foreground">
                  {e.note || "—"}
                </td>
                <td className="px-5 py-3.5 text-right text-sm font-semibold">
                  {formatCurrency(e.amount)}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex justify-end gap-1">
                   <button onClick={() => onEdit(e)} className="rounded p-2 hover:bg-gray-100"> 
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button  className="rounded p-2 text-red-500 hover:bg-red-50"
                     onClick={() => onDelete(e)}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-px md:hidden">
        {current.map((e) => (
          <div key={e._id} className="border-t border-border p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium"
                          style={{backgroundColor: `color-mix(in oklab, ${CATEGORY_COLORS[e.category]} 18%, transparent)`}} >
                          <span className="h-1.5 w-1.5 rounded-full"
                                style={{ backgroundColor: CATEGORY_COLORS[e.category] }} />
                                {e.category}
                            </span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(e.date), "MMM d")}
                  </span>
                </div>
                {e.note && <p className="mt-2 truncate text-sm text-muted-foreground">{e.note}</p>}
              </div>
              <div className="text-right">
                <p className="text-base font-semibold">{formatCurrency(e.amount)}</p>
                <div className="mt-1 flex justify-end gap-1">
                  <button className="rounded p-1 hover:bg-gray-100"
                  onClick={() => onEdit(e)}>
                 <Pencil className="h-3.5 w-3.5" />
                 </button>
                 <button className="rounded p-1 text-red-500 hover:bg-red-50"
                 onClick={() => onDelete(e)}>
                <Trash2 className="h-3.5 w-3.5" />
                </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-between border-t border-border px-5 py-3">
          <p className="text-xs text-muted-foreground">
            Page {page} of {pageCount}
          </p>
          <div className="flex gap-1">
            <button className="rounded border p-2 disabled:opacity-50"
             onClick={() => setPage((p) => Math.max(1, p - 1))}
             disabled={page === 1}>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="rounded border p-2 disabled:opacity-50"
             onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
             disabled={page === pageCount}>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
