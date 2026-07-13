import { useState } from "react";

import Header from "./components/Header";
import ProfileForm from "./components/ProfileForm";
import ResultCard from "./components/ResultCard";
import Loading from "./components/Loading";
import ErrorCard from "./components/ErrorCard";

import { dummyProfile, dummyErrors } from "./data/dummy";
import type { ProfileResponse } from "./types/profile";

function App() {
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("id");

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [result, setResult] = useState<ProfileResponse | null>(null);

  const [error, setError] = useState("");

  const handleAnalyze = () => {
    setStatus("loading");

    setTimeout(() => {
      // Simulasi berhasil
      setResult({
        ...dummyProfile,
        username: username || dummyProfile.username,
      });

      setError(dummyErrors.userNotFound);
      setStatus("error");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="mx-auto max-w-2xl">
        <Header />

        <ProfileForm
          username={username}
          language={language}
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

export default App;