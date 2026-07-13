export interface ProfileResponse {
  username: string;
  total_tweets: number;
  label: 0 | 1;
  class: "hate_speech" | "non_hate_speech";
  probability: number;
}

export interface ErrorResponse {
  error: string;
}