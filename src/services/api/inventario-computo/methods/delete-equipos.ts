import  ApiClient  from "../../ApiClient";
import { GetEquiposResponse } from "../schemas/GetEquiposResponse";

export const deleteEquipos = async (id:number):Promise<GetEquiposResponse> => {
    const endpoint = `/api/inventario-computo/equipos/${id}`;
    const res = await ApiClient.getInstance().delete(endpoint)
    return res.data
}       