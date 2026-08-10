import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        Admin Authentication
      </h2>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <input
            type={showApiKey ? "text" : "password"}
            value={apiKey}
            onChange={(e) =>
              onApiKeyChange(e.target.value)
            }
            placeholder="Enter admin API key"
            className="w-full rounded-lg border border-slate-300 px-4 py-2 pr-11 outline-none focus:border-slate-500"
          />

          <button
            type="button"
            onClick={() =>
              setShowApiKey((prev) => !prev)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
            aria-label={
              showApiKey
                ? "Hide API key"
                : "Show API key"
            }
          >
            {showApiKey ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        <button
          onClick={onConnect}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Loading..." : "Connect"}
        </button>
      </div>
    </section>
  );
}

export default AdminAuth;