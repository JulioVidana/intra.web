import  ApiClient  from "../../ApiClient";
import { UploadResponse } from "../models/UploadResponse";

export const deleteFile = async (fileName:string):Promise<UploadResponse> => {
    const endpoint = `/api/File/Remove/${encodeURIComponent(fileName)}`;
    const res = await ApiClient.getInstance().get(endpoint)
    return res.data
}       