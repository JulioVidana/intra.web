import  ApiClient  from "../../ApiClient";
import { GetResguardosResponse } from "../schemas/GetResguardosResponse";

export const deleteResguardos = async (id:number):Promise<GetResguardosResponse> => {
    const endpoint = `/api/inventario-computo/resguardo-equipos/${id}`;
    const res = await ApiClient.getInstance().delete(endpoint)
    return res.data
}