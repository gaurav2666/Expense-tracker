import { AlertTriangle } from "lucide-react";

export function ConfirmDeleteModal({
  open,
  onOpenChange,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-96 rounded-xl bg-white  p-6 shadow-lg">

        <div className="mb-4 flex justify-center">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>

        <h2 className="text-center text-lg font-semibold">
          Delete this expense?
        </h2>

        <p className="mt-2 text-center text-sm text-gray-500">
          This action cannot be undone. The expense will be permanently removed.
        </p>

        <div className="mt-6 flex justify-center gap-3">

          <button
            onClick={() => onOpenChange(false)}
            className="rounded border px-4 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Delete
          </button>

        </div>
      </div>
    </div>
  );
}