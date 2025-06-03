import { User } from "../model/Authorization";

export interface LoginResponse {
    success: boolean;
    message: string;
    user: User;
  }