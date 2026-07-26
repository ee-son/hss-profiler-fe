interface ProfileFormProps {
  username: string;
  language: string;
  loading: boolean;
  onUsernameChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  onAnalyze: () => void;
}

function ProfileForm({
    username,
    language,
    loading,
    onUsernameChange,
    onLanguageChange,
    onAnalyze,
  }: ProfileFormProps) {
  return (
    <section className="rounded-xl bg-white shadow-sm border border-slate-200 p-6">

      <div className="space-y-5">

        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Username
          </label>

          <input
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            type="text"
            value={username}
            disabled={loading}
            onChange={(e) => onUsernameChange(e.target.value)}
            placeholder="e.g. elonmusk"
          />
        </div>

        {/* Language */}
        <div>
          <label
            htmlFor="language"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Language
          </label>

          <select
            id="language"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            disabled={loading}
            value={language}
             onChange={(e) => onLanguageChange(e.target.value)}
          >
            <option value="id">Indonesia</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
        </div>

        {/* Button */}
        <button
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
          onClick={onAnalyze}
          disabled={loading}
        >
          Analyze
        </button>

      </div>

    </section>
  );
}

export default ProfileForm;