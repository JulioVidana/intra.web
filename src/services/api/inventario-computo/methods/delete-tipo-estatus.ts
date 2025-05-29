import  ApiClient  from "../../ApiClient";
import { GetEquiposResponse } from "../schemas/GetEquiposResponse";

export const deleteTipoEstatus = async (id:number):Promise<GetEquiposResponse> => {
    const endpoint = `/api/inventario-computo/status-equipos/${id}`;
    const res = await ApiClient.getInstance().delete(endpoint)
    return res.data
}       