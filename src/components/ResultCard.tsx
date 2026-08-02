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

        <hr className="my-6" />
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          Explanation
        </h3>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between">
            <span className="text-slate-500">Method</span>
            <span className="font-medium">
              {data.explanation.method}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">
              Baseline Confidence
            </span>
            <span className="font-medium">
              {(data.explanation.baseline_confidence * 100).toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {data.explanation.top_tweets.map((tweet, index) => {
            const positive = tweet.contribution >= 0;

            return (
              <div
                key={index}
                className="rounded-lg border border-slate-200 p-4"
              >
                <p className="mb-3 text-sm font-semibold text-slate-700">
                  #{index + 1}
                </p>

                <p className="mb-4 whitespace-pre-wrap text-sm text-slate-800">
                  {tweet.tweet}
                </p>

                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Contribution
                  </span>

                  <span
                    className={`font-medium ${
                      positive
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {positive ? "+" : ""}
                    {(tweet.contribution * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ResultCard;