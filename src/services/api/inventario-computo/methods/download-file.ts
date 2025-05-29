import  ApiClient  from "../../ApiClient";
import { DownloadFileRes } from "../models/DownloadFileRes";

export const downloadFile = async (fileName:string):Promise<DownloadFileRes> => {
    const endpoint = `/api/File/Download/${fileName}`;
    const res = await ApiClient.getInstance().get(endpoint)
    return res.data
}