export const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
} as const;

export const ROLES = {
  IDLE: "idle",
  USER: "user",
  MODEL: "model",
  ERROR: "error",
  LOADING: "loading",
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];
export type Role = (typeof ROLES)[keyof typeof ROLES];
