export interface AuthResponse {
  access_token: string;
}

export interface User {
  userId: number;
  email: string;
  role: string;
}
