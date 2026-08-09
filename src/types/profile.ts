export interface ExplanationTweet {
  tweet: string;
  contribution: number;
  confidence_without: number;
}

export interface Explanation {
  baseline_confidence: number;
  top_tweets: ExplanationTweet[];
}

export interface ProfileResponse {
  username: string;
  total_tweets: number;
  label: 0 | 1;
  last_updated: string;
  class: "hate_speech" | "non_hate_speech";
  confidence: number;
  explanation: Explanation;
}