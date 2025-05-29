import  ApiClient  from "../../ApiClient";
import { GetEquiposResponse } from "../schemas/GetEquiposResponse";

export const deleteTipoEquipos = async (id:number):Promise<GetEquiposResponse> => {
    const endpoint = `/api/inventario-computo/tipos-equipos/${id}`;
    const res = await ApiClient.getInstance().delete(endpoint)
    return res.data
}       