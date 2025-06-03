import { AuthenticationRequest } from "../schema/AuthenticateRequest";
import  ApiClient  from "../../ApiClient";
import { LoginResponse } from "../schema/AuthenticateResponse";

export const logOff = async ():Promise<LoginResponse> => {
    const res = await ApiClient.getInstance().post('/Account/LogOff')
    return res.data
}