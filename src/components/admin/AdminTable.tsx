import type { AdminProfile } from "../../types/admin";

interface AdminTableProps {
  profiles: AdminProfile[];
  loading: boolean;
  updating: string | null;
  deleting: string | null;
  viewing: string | null;
  onUpdate: (
    username: string,
    language: string
  ) => void;
  onDelete: (
    username: string,
    language: string
  ) => void;
  onRefresh: () => void;
  onView: (
    username: string,
    language: string
  ) => void;
}

function AdminTable({
  profiles,
  loading,
  updating,
  deleting,
  viewing,
  onView,
  onUpdate,
  onDelete,
  onRefresh,
}: AdminTableProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Cached Profiles
            </h2>

            <p className="text-sm text-slate-500">
              {profiles.length} profile
              {profiles.length !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            onClick={onRefresh}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Refresh List
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-500">
          Loading profiles...
        </div>
      ) : profiles.length === 0 ? (
        <div className="p-8 text-center text-slate-500">
          No cached profiles found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">
                  Username
                </th>

                <th className="px-6 py-4 font-medium">
                  Language
                </th>

                <th className="px-6 py-4 font-medium">
                  Last Updated
                </th>

                <th className="px-6 py-4 text-right font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {profiles.map((profile) => {
                const key = `${profile.username}-${profile.language}`;

                return (
                  <tr
                    key={key}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-medium">
                      <button
                        type="button"
                        onClick={() =>
                          onView(
                            profile.username,
                            profile.language
                          )
                        }
                        disabled={viewing === key}
                        className="text-slate-800 hover:text-blue-600 hover:underline disabled:opacity-50"
                      >
                        @{profile.username}
                      </button>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {({
                        id: "Indonesian",
                        en: "English",
                        es: "Spanish",
                      } as Record<string, string>)[profile.language]}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {new Date(
                        profile.last_updated
                      ).toLocaleString("id-ID", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() =>
                            onUpdate(
                              profile.username,
                              profile.language
                            )
                          }
                          disabled={
                            updating === key ||
                            deleting === key
                          }
                          className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {updating === key
                            ? "Updating..."
                            : "Update"}
                        </button>

                        <button
                          onClick={() =>
                            onDelete(
                              profile.username,
                              profile.language
                            )
                          }
                          disabled={
                            updating === key ||
                            deleting === key
                          }
                          className="rounded-lg border bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deleting === key
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AdminTable;