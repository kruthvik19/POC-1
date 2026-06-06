export interface User {
  id?: string;
  username: string;
  role?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
