export interface User {
  id: number;
  email: string;
  companyName: string;
}

export interface RegisterRequest {
  email: string;
  companyName: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
