import type {
  AdminProfilesResponse,
  AdminUpdateResponse,
} from "../types/admin";

const API_URL = "http://localhost:5000";

const getHeaders = (apiKey: string) => ({
  "X-Admin-Key": apiKey,
});

export async function getAdminProfiles(
  apiKey: string
): Promise<AdminProfilesResponse> {
  const response = await fetch(
    `${API_URL}/api/admin/profiles`,
    {
      headers: getHeaders(apiKey),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to load profiles."
    );
  }

  return data;
}

export async function getAdminProfile(
  apiKey: string,
  username: string,
  language: string
) {
  const response = await fetch(
    `${API_URL}/api/admin/profiles/${encodeURIComponent(
      username
    )}/${language}`,
    {
      method: "GET",
      headers: getHeaders(apiKey),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to load profile."
    );
  }

  return data;
}

export async function updateAdminProfile(
  apiKey: string,
  username: string,
  language: string
): Promise<AdminUpdateResponse> {
  const response = await fetch(
    `${API_URL}/api/admin/profiles/${encodeURIComponent(
      username
    )}/${language}`,
    {
      method: "POST",
      headers: getHeaders(apiKey),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to update profile."
    );
  }

  return data;
}

export async function deleteAdminProfile(
  apiKey: string,
  username: string,
  language: string
) {
  const response = await fetch(
    `${API_URL}/api/admin/profiles/${encodeURIComponent(
      username
    )}/${language}`,
    {
      method: "DELETE",
      headers: getHeaders(apiKey),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to delete profile."
    );
  }

  return data;
}
