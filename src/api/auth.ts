import { getJson, postJson } from "./client";
import type { LoginRequest, RegisterRequest, User } from "../types/auth";

interface UserResponseBody {
  id: number;
  email: string;
  company_name: string;
}

function toUser(body: UserResponseBody): User {
  return {
    id: body.id,
    email: body.email,
    companyName: body.company_name,
  };
}

export async function registerAccount(request: RegisterRequest): Promise<User> {
  const body = await postJson<UserResponseBody>("/api/auth/register", {
    email: request.email,
    company_name: request.companyName,
    password: request.password,
  });
  return toUser(body);
}

export async function login(request: LoginRequest): Promise<User> {
  const body = await postJson<UserResponseBody>("/api/auth/login", request);
  return toUser(body);
}

export async function logout(): Promise<void> {
  await postJson("/api/auth/logout", {});
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const body = await getJson<UserResponseBody>("/api/auth/me");
    return toUser(body);
  } catch {
    return null;
  }
}
