import { AuthenticationRequest } from "../schema/AuthenticateRequest";
import  ApiClient  from "../../ApiClient";
import { LoginResponse } from "../schema/AuthenticateResponse";

export const authenticate = async (body:AuthenticationRequest):Promise<LoginResponse> => {
    const res = await ApiClient.getInstance().post('/Account/Login', body)
    return res.data
}
