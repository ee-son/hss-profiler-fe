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
  success: true;
  qualified: true;
  username: string;
  total_tweets: number;
  label: 0 | 1;
  last_updated: string;
  class: "hate_speech" | "non_hate_speech";
  confidence: number;
  explanation: Explanation;
}

export interface InsufficientTweetsResponse {
  success: false;
  qualified: false;
  message: string;
  tweet_count: number;
}

export type AnalyzeProfileResponse =
  | ProfileResponse
  | InsufficientTweetsResponse;