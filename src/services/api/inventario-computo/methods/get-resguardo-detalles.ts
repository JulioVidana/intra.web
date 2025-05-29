import  ApiClient  from "../../ApiClient";
import { GetResguardoByIdResponse } from "../schemas/GetResguardosByIdResponse";

export const getResguardoDetalles = async (resguardoId:number):Promise<GetResguardoByIdResponse> => {
    const endpoint = `/api/inventario-computo/resguardo-equipos/${resguardoId}`;
    const res = await ApiClient.getInstance().get(endpoint)
    return res.data
}   