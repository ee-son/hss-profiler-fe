import type { ProfileResponse } from "../types/profile";

interface ResultCardProps {
  data: ProfileResponse;
}

function ResultCard({ data }: ResultCardProps) {
  const isHateSpeech = data.label === 1;

  return (
    <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-slate-800">
        Profiling Result
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span className="text-slate-500">Username</span>
          <span className="font-medium">@{data.username}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Tweets Analyzed</span>
          <span className="font-medium">{data.total_tweets}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-slate-500">Prediction</span>

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold text-white ${
              isHateSpeech
                ? "bg-red-500"
                : "bg-emerald-500"
            }`}
          >
            {isHateSpeech ? "Hate Speech" : "Non Hate Speech"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Confidence</span>
          <span className="font-medium">
            {(data.confidence * 100).toFixed(2)}%
          </span>
        </div>

      </div>
    </section>
  );
}

export default ResultCard;