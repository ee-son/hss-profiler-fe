import { useState } from "react";

import Header from "../components/Header";
import ProfileForm from "../components/ProfileForm";
import ResultCard from "../components/ResultCard";
import Loading from "../components/Loading";
import ErrorCard from "../components/ErrorCard";

import { analyzeProfile } from "../services/api";
import type { ProfileResponse } from "../types/profile";

function HomePage() {
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("id");

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [result, setResult] = useState<ProfileResponse | null>(null);

  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!username.trim()) {
    setError("Username is required.");
    setStatus("error");
    return;
  }

    setError("");
    setResult(null);
    setStatus("loading");

    try {
      const data = await analyzeProfile(username, language);

      setResult(data);
      setStatus("success");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }

      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="mx-auto max-w-2xl">
        <Header />

        <ProfileForm
          username={username}
          language={language}
          loading={status === "loading"}
          onUsernameChange={setUsername}
          onLanguageChange={setLanguage}
          onAnalyze={handleAnalyze}
        />

        {status === "loading" && <Loading />}

        {status === "success" && result && (
          <ResultCard data={result} />
        )}

        {status === "error" && (
          <ErrorCard message={error} />
        )}
      </div>
    </main>
  );
}

export default HomePage;