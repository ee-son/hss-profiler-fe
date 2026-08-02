import type { ProfileResponse } from "../types/profile";

interface ErrorResponse {
  error: string;
}

const API_URL = "http://localhost:5000"; // masih di lokal

export async function analyzeProfile(
  username: string,
  language: string
): Promise<ProfileResponse> {
  const response = await fetch(`${API_URL}/api/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      language,
      explain: true,
    }),
  });

  const data: ProfileResponse | ErrorResponse = await response.json();

  if (!response.ok) {
    throw new Error((data as ErrorResponse).error);
  }

  return data as ProfileResponse;
}