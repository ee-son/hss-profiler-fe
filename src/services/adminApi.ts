import type {
  AdminProfilesResponse,
  AdminUpdateResponse,
} from "../types/admin";

const API_URL = "http://localhost:5000";

const getHeaders = (apiKey: string) => ({
  "X-Admin-Key": apiKey,
});

export interface AdminProfileQuery {
  page?: number;
  per_page?: number;
  search?: string;
  sort_by?: "username" | "language" | "last_updated";
  sort_order?: "asc" | "desc";
}


export async function getAdminProfiles(
  apiKey: string,
  params: AdminProfileQuery = {}
): Promise<AdminProfilesResponse> {
  const query = new URLSearchParams();

  if (params.page !== undefined) {
    query.set("page", String(params.page));
  }

  if (params.per_page !== undefined) {
    query.set("per_page", String(params.per_page));
  }

  if (params.search) {
    query.set("search", params.search);
  }

  if (params.sort_by) {
    query.set("sort_by", params.sort_by);
  }

  if (params.sort_order) {
    query.set("sort_order", params.sort_order);
  }

  const queryString = query.toString();

  const response = await fetch(
    `${API_URL}/api/admin/profiles${
      queryString ? `?${queryString}` : ""
    }`,
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
