import type { ProfileResponse } from "../types/profile";

export const dummyProfile: ProfileResponse = {
  username: "elonmusk",
  total_tweets: 100,
  label: 1,
  class: "hate_speech",
  probability: 0.9312,
};

export const dummyErrors = {
  minTweets: "User has fewer than 50 eligible tweets.",
  userNotFound: "User not found.",
  invalidLanguage: "Language must be one of: id, en, es.",
  rateLimit: "Twitter rate limit exceeded. Please try again later.",
  unknown: "An unexpected error occurred."
};