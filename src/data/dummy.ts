import type { ProfileResponse } from "../types/profile";

export const dummyProfile: ProfileResponse = {
  success: true,
  qualified: true,
  username: "elonmusk",
  total_tweets: 100,
  label: 1,
  last_updated: "2026-09-15T00:00:00Z",
  class: "hate_speech",
  confidence: 0.9312,
  explanation: {
    baseline_confidence: 1.0,
    top_tweets: [
      {
        confidence_without: 1.0,
        contribution: 0.0,
        tweet: "This is a sample tweet for testing."
      },
      {
        confidence_without: 0.95,
        contribution: 0.05,
        tweet: "Another sample tweet for the dummy profile."
      }
    ]
  }
};

export const dummyErrors = {
  minTweets: "User has fewer than 50 eligible tweets.",
  userNotFound: "User not found.",
  invalidLanguage: "Language must be one of: id, en, es.",
  rateLimit: "Twitter rate limit exceeded. Please try again later.",
  unknown: "An unexpected error occurred."
};