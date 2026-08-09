interface AdminAuthProps {
  apiKey: string;
  loading: boolean;
  onApiKeyChange: (value: string) => void;
  onConnect: () => void;
}

function AdminAuth({
  apiKey,
  loading,
  onApiKeyChange,
  onConnect,
}: AdminAuthProps) {
  return (
    <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        Admin Authentication
      </h2>

      <div className="flex gap-3">
        <input
          type="password"
          value={apiKey}
          onChange={(e) =>
            onApiKeyChange(e.target.value)
          }
          placeholder="Enter admin API key"
          className="flex-1 rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-slate-500"
        />

        <button
          onClick={onConnect}
          disabled={loading}
          className="rounded-lg bg-slate-800 px-5 py-2 font-medium text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Loading..." : "Connect"}
        </button>
      </div>
    </section>
  );
}

export default AdminAuth;