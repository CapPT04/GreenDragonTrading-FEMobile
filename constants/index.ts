export const APP_NAME = "KafiStock";
export const APP_VERSION = "1.0.0";

export const API_URL = process.env.EXPO_PUBLIC_API_URL || "https://api.example.com";
export const API_TIMEOUT = 30000; // 30 seconds

export const STORAGE_KEYS = {
  USER_TOKEN: "@kafistock:user_token",
  USER_DATA: "@kafistock:user_data",
  THEME: "@kafistock:theme",
  LANGUAGE: "@kafistock:language",
};

export const ROUTES = {
  HOME: "/(tabs)/home",
  EXPLORE: "/(tabs)/explore",
  PROFILE: "/(tabs)/profile",
} as const;
