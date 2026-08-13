interface DeleteConfirmProps {
  username: string;
  language: string;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteConfirm({
  username,
  language,
  loading,
  onConfirm,
  onCancel,
}: DeleteConfirmProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-slate-800">
          Delete Profile
        </h2>

        <p className="mt-3 text-sm text-slate-600">
          Are you sure you want to delete the cached
          profile{" "}
          <span className="font-semibold">
            @{username}
          </span>{" "}
          {({
            id: "(Indonesian)",
            en: "(English)",
            es: "(Spanish)",
            } as Record<string, string>)[language]}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirm;
