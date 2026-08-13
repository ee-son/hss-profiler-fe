import type { AnalyzeProfileResponse } from "../types/profile";

interface ErrorResponse {
  error: string;
}

const API_URL = "http://localhost:5000";

export async function analyzeProfile(
  username: string,
  language: string
): Promise<AnalyzeProfileResponse> {
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

  const data: AnalyzeProfileResponse | ErrorResponse =
    await response.json();

  if (!response.ok) {
    if ("error" in data) {
      throw new Error(data.error);
    }

    throw new Error("Failed to analyze profile.");
  }

  return data as AnalyzeProfileResponse;
}