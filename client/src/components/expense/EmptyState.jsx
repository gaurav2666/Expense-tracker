import { Receipt } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Receipt className="h-9 w-9 text-primary-foreground" />

      <h3 className="mt-4 text-lg font-semibold">
        No Expenses Found
      </h3>

      <p className="text-sm text-gray-500">
        Start tracking your spending by adding your first expense.
      </p>
    </div>
  );
}