import { UserInterface } from "src/app/shared/models/user-interface";
export interface LoginData {
  email: String,
  password: String
}
export interface Token {
  type: String,
  token: String,
  refreshToken: String
}

export interface TokenResponse{
  token: Token,
  user: UserInterface
}

export interface SignUpData{
  username: String,
  email: String,
  password: String
}

export interface SignUpResponse{
  status: String,
  message: string,
  user: UserInterface
}
