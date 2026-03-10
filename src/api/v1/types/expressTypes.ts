export type UserRole = "officer" | "manager" | "admin";

export interface AuthUser {
  uid: string;
  email?: string;
  role?: UserRole;
}