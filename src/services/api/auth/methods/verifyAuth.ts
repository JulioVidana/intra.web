import ApiClient from "../../ApiClient"
import { LoginResponse } from "../schema/AuthenticateResponse"

export const verifyAuth = async (): Promise<LoginResponse> => {
  const res = await ApiClient.getInstance().get('/Account/VerifyAuth')
  return res.data
}