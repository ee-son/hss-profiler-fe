import { useEffect, useState } from "react";

import AdminAuth from "../components/admin/AdminAuth";
import AdminProfileTable from "../components/admin/AdminTable";
import DeleteConfirm from "../components/admin/DeleteConfirm";
import ProfileView from "../components/admin/ProfileView";

import {
  getAdminProfiles,
  getAdminProfile,
  updateAdminProfile,
  deleteAdminProfile,
} from "../services/adminApi";

import type { AdminProfile } from "../types/admin";
import type { ProfileResponse } from "../types/profile";

function AdminPage() {
  const [apiKey, setApiKey] = useState("");

  const [authorized, setAuthorized] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [profiles, setProfiles] = useState<
    AdminProfile[]
  >([]);

  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  const [totalProfiles, setTotalProfiles] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState<
    "username" | "language"| "last_updated"
  >("username");

  const [sortOrder, setSortOrder] = useState<
    "asc" | "desc"
  >("asc");

  const [selectedProfile, setSelectedProfile] =
  useState<ProfileResponse | null>(null);

  const [viewing, setViewing] = useState<string | null>(
    null
  );

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<string | null>(
    null
  );

  const [deleting, setDeleting] = useState<string | null>(
    null
  );
  const [deleteTarget, setDeleteTarget] = useState<{
    username: string;
    language: string;
  } | null>(null);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [fadeError, setFadeError] = useState(false);
  const [fadeMessage, setFadeMessage] = useState(false);

  const loadProfiles = async () => {
    if (!apiKey.trim()) {
      setAuthorized(false);
      setProfiles([]);
      setError("Admin API key is required.");
      return;
    }

    setAuthorized(false);
    setProfiles([]);
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const data = await getAdminProfiles(apiKey, {
        page,
        per_page: perPage,
        search,
        sort_by: sortBy,
        sort_order: sortOrder,
      });

      setProfiles(data.profiles || []);

      setTotalProfiles(data.pagination.total);
      setTotalPages(data.pagination.total_pages);

      setAuthorized(true);
      setMessage("Profiles refreshed successfully.");
    } catch (err) {
      setAuthorized(false);
      setProfiles([]);

      sessionStorage.removeItem(
        "admin_api_key"
      );

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid admin API key.");
      }
    } finally {
      setLoading(false);
      setCheckingAuth(false);
    }
  };

  const handleConnect = async () => {
    if (!apiKey.trim()) {
      setError("Admin API key is required.");
      return;
    }

    setAuthorized(false);
    setProfiles([]);
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const data = await getAdminProfiles(apiKey, {
        page,
        per_page: perPage,
        search,
        sort_by: sortBy,
        sort_order: sortOrder,
      });

      sessionStorage.setItem(
        "admin_api_key",
        apiKey
      );

      setProfiles(data.profiles || []);

      setTotalProfiles(data.pagination.total);
      setTotalPages(data.pagination.total_pages);

      setAuthorized(true);
      setMessage("Connected successfully.");
    } catch (err) {
      setAuthorized(false);
      setProfiles([]);

      sessionStorage.removeItem(
        "admin_api_key"
      );

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid admin API key.");
      }
    } finally {
      setLoading(false);
      setCheckingAuth(false);
    }
  };

  const handleApiKeyChange = (value: string) => {
    setApiKey(value);
  };

  const handleView = async (
    username: string,
    language: string
  ) => {
    const key = `${username}-${language}`;

    setViewing(key);
    setError("");

    try {
      const data = await getAdminProfile(
        apiKey,
        username,
        language
      );

      setSelectedProfile(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load profile.");
      }
    } finally {
      setViewing(null);
    }
  };

  const handleUpdate = async (
    username: string,
    language: string
  ) => {
    const key = `${username}-${language}`;

    setUpdating(key);
    setError("");
    setMessage("");

    try {
      const data = await updateAdminProfile(
        apiKey,
        username,
        language
      );

      setMessage(
        `Profile @${username} updated successfully.`
      );

      setProfiles((current) =>
        current.map((profile) =>
          profile.username === username &&
          profile.language === language
            ? {
                ...profile,
                last_updated:
                  data.last_updated,
              }
            : profile
        )
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = (
    username: string,
    language: string
  ) => {
    setDeleteTarget({
      username,
      language,
    });
  };

  const handlePageChange = (
    newPage: number
  ) => {
    if (
      newPage < 1 ||
      newPage > totalPages
    ) {
      return;
    }

    setPage(newPage);
  };

  const handleSearchChange = (
    value: string
  ) => {
    setSearch(value);
    setPage(1);
  };

  const handleSort = (
    column: "username" | "language" | "last_updated"
  ) => {
    if (sortBy === column) {
      setSortOrder((current) =>
        current === "asc"
          ? "desc"
          : "asc"
      );
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }

    setPage(1);
  };

  // Delete confirmation using modal/dialogue
  const confirmDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    const {
      username,
      language,
    } = deleteTarget;

    const key = `${username}-${language}`;

    setDeleting(key);
    setError("");
    setMessage("");

    try {
      await deleteAdminProfile(
        apiKey,
        username,
        language
      );

      setProfiles((current) =>
        current.filter(
          (profile) =>
            !(
              profile.username === username &&
              profile.language === language
            )
        )
      );

      setMessage(
        `Profile @${username} deleted successfully.`
      );

      setDeleteTarget(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "An unexpected error occurred."
        );
      }
    } finally {
      setDeleting(null);
    }
  };

  // Use effect api key
  useEffect(() => {
    const savedKey = sessionStorage.getItem(
      "admin_api_key"
    );

    if (!savedKey) {
      setCheckingAuth(false);
      return;
    }

    setApiKey(savedKey);

    getAdminProfiles(savedKey, {
      page,
      per_page: perPage,
      search,
      sort_by: sortBy,
      sort_order: sortOrder,
    })
      .then((data) => {
        setProfiles(data.profiles || []);
        setTotalProfiles(data.pagination.total);
        setTotalPages(data.pagination.total_pages);
        setAuthorized(true);
      })
      .catch(() => {
        sessionStorage.removeItem(
          "admin_api_key"
        );

        setApiKey("");
        setProfiles([]);
        setAuthorized(false);
      })
      .finally(() => {
        setCheckingAuth(false);
      });
  }, []);

  // Use effect pagination, search, and sorting
  useEffect(() => {
    if (!authorized || !apiKey.trim()) {
      return;
    }

    const load = async () => {
      setLoading(true);

      try {
        const data = await getAdminProfiles(apiKey, {
          page,
          per_page: perPage,
          search,
          sort_by: sortBy,
          sort_order: sortOrder,
        });

        setProfiles(data.profiles || []);

        setTotalProfiles(
          data.pagination.total
        );

        setTotalPages(
          data.pagination.total_pages
        );
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load profiles.");
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [
    page,
    search,
    sortBy,
    sortOrder,
  ]);

  // Use effect error
  useEffect(() => {
    if (!error) {
      setFadeError(false);
      return;
    }

    setFadeError(false);

    const fadeTimer = setTimeout(() => {
      setFadeError(true);
    }, 2000);

    const removeTimer = setTimeout(() => {
      setError("");
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [error]);

  // Use effect message
  useEffect(() => {
    if (!message) {
      setFadeMessage(false);
      return;
    }

    setFadeMessage(false);

    const fadeTimer = setTimeout(() => {
      setFadeMessage(true);
    }, 2000);

    const removeTimer = setTimeout(() => {
      setMessage("");
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [message]);

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Manage cached HSS profiles.
          </p>
        </div>

        <AdminAuth
          apiKey={apiKey}
          loading={loading}
          onApiKeyChange={handleApiKeyChange}
          onConnect={handleConnect}
        />

        {error && (
          <div
            className={`mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 transition-opacity duration-1000 ${
              fadeError
                ? "opacity-0"
                : "opacity-100"
            }`}
          >
            {error}
          </div>
        )}

        {message && (
          <div
            className={`mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 transition-opacity duration-1000 ${
              fadeMessage
                ? "opacity-0"
                : "opacity-100"
            }`}
          >
            {message}
          </div>
        )}

        {!checkingAuth && authorized && (
          <AdminProfileTable
            profiles={profiles}
            loading={loading}
            updating={updating}
            deleting={deleting}
            viewing={viewing}
            search={search}
            sortBy={sortBy}
            sortOrder={sortOrder}
            page={page}
            totalPages={totalPages}
            totalProfiles={totalProfiles}
            onView={handleView}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onRefresh={loadProfiles}
            onSearchChange={handleSearchChange}
            onSort={handleSort}
            onPageChange={handlePageChange}
          />
        )}

        <ProfileView
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />

        {deleteTarget && (
          <DeleteConfirm
            username={deleteTarget.username}
            language={deleteTarget.language}
            loading={
              deleting ===
              `${deleteTarget.username}-${deleteTarget.language}`
            }
            onConfirm={confirmDelete}
            onCancel={() => {
              if (!deleting) {
                setDeleteTarget(null);
              }
            }}
          />
        )}
      </div>
    </main>
  );
}

export default AdminPage;
