import  ApiClient  from "../../ApiClient";
import { GetResguardosResponse } from "../schemas/GetResguardosResponse";
import { SearchItem } from "@/components/ui/sarch-dialog";
import { mapFormToResguardos } from "../mappers/mapFormToResguardosPost";
export const postResguardos = async (data:SearchItem,userId:string):Promise<GetResguardosResponse> => {
    const formData = mapFormToResguardos(data,userId);
    const endpoint = '/api/inventario-computo/resguardo-equipos';
    const res = await ApiClient.getInstance().post(endpoint,formData)
    return res.data
}