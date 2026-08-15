import type { AdminProfile } from "../../types/admin";

interface AdminTableProps {
  profiles: AdminProfile[];

  loading: boolean;
  updating: string | null;
  deleting: string | null;
  viewing: string | null;

  search: string;

  sortBy: "username" | "language" | "last_updated";
  sortOrder: "asc" | "desc";

  page: number;
  totalProfiles: number;
  totalPages: number;

  onSearchChange: (value: string) => void;

  onSort: (
    column: "username" | "language" | "last_updated"
  ) => void;

  onPageChange: (
    newPage: number
  ) => void;

  onView: (
    username: string,
    language: string
  ) => void;

  onUpdate: (
    username: string,
    language: string
  ) => void;

  onDelete: (
    username: string,
    language: string
  ) => void;

  onRefresh: () => void;
}

function AdminProfileTable({
  profiles,
  loading,
  updating,
  deleting,
  viewing,

  search,
  sortBy,
  sortOrder,

  page,
  totalProfiles,
  totalPages,

  onSearchChange,
  onSort,
  onPageChange,

  onView,
  onUpdate,
  onDelete,
  onRefresh,
}: AdminTableProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Cached Profiles
            </h2>

            <p className="text-sm text-slate-500">
              {totalProfiles} profile
              {totalProfiles !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) =>
                onSearchChange(e.target.value)
              }
              placeholder="Search username..."
              className="w-64 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              onClick={onRefresh}
              disabled={loading}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Refresh List
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-500">
          Loading profiles...
        </div>
      ) : totalProfiles === 0 ? (
        <div className="p-8 text-center text-slate-500">
          No cached profiles found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-4 font-medium">
                  <button
                    type="button"
                    onClick={() => onSort("username")}
                    className="flex items-center gap-1 hover:text-slate-800"
                  >
                    Username
                    {sortBy === "username" && (
                      <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                    )}
                  </button>
                </th>

                <th className="px-6 py-4 font-medium">
                  <button
                    type="button"
                    onClick={() => onSort("language")}
                    className="flex items-center gap-1 hover:text-slate-800"
                  >
                    Language
                    {sortBy === "language" && (
                      <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                    )}
                  </button>
                </th>

                <th className="px-6 py-4 font-medium">
                  <button
                    type="button"
                    onClick={() => onSort("last_updated")}
                    className="flex items-center gap-1 hover:text-slate-800"
                  >
                    Last Updated

                    {sortBy === "last_updated" && (
                      <span>
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </button>
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
          <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
            <p className="text-sm text-slate-500">
              Page {page} of {totalPages}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onPageChange(page - 1)}
                disabled={page <= 1 || loading}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              <span className="px-2 text-sm text-slate-600">
                {page}
              </span>

              <button
                type="button"
                onClick={() => onPageChange(page + 1)}
                disabled={page >= totalPages || loading}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminProfileTable;