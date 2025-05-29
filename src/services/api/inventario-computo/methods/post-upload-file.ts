import  ApiClient  from "../../ApiClient";
import { UploadResponse } from "../models/UploadResponse";

export const postUploadFile = async (data:FormData):Promise<string> => {
    
    const endpoint = '/api/File/Upload';
    const res = await ApiClient.getInstance().post(endpoint,data,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return res.data
}   