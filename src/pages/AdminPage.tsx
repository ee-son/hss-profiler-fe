import { useEffect, useState } from "react";

import AdminAuth from "../components/admin/AdminAuth";
import AdminProfileTable from "../components/admin/AdminTable";

import {
  getAdminProfiles,
  updateAdminProfile,
  deleteAdminProfile,
} from "../services/adminApi";

import type { AdminProfile } from "../types/admin";


function AdminPage() {
  const [apiKey, setApiKey] = useState("");

  const [profiles, setProfiles] = useState<
    AdminProfile[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<string | null>(
    null
  );
  const [deleting, setDeleting] = useState<string | null>(
    null
  );

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


  const loadProfiles = async () => {
    if (!apiKey.trim()) {
      setError("Admin API key is required.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const data = await getAdminProfiles(apiKey);

      setProfiles(data.profiles || []);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };


  const handleConnect = () => {
    if (!apiKey.trim()) {
      setError("Admin API key is required.");
      return;
    }

    sessionStorage.setItem(
      "admin_api_key",
      apiKey
    );

    loadProfiles();
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


  const handleDelete = async (
    username: string,
    language: string
  ) => {
    const confirmed = window.confirm(
      `Delete cached profile @${username} (${language})?`
    );

    if (!confirmed) {
      return;
    }

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
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setDeleting(null);
    }
  };


  useEffect(() => {
    const savedKey = sessionStorage.getItem(
      "admin_api_key"
    );

    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);


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
          onApiKeyChange={setApiKey}
          onConnect={handleConnect}
        />


        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}


        {message && (
          <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            {message}
          </div>
        )}


        <AdminProfileTable
          profiles={profiles}
          loading={loading}
          updating={updating}
          deleting={deleting}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          onRefresh={loadProfiles}
        />

      </div>
    </main>
  );
}


export default AdminPage;
