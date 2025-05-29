import { AuthenticationRequest } from "../schema/AuthenticateRequest";
import  ApiClient  from "../../ApiClient";

export const authenticate = async (body:AuthenticationRequest):Promise<any> => {
    const res = await ApiClient.getInstance().post('/Account/Login', body)
    return res
}