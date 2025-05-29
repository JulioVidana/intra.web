import  ApiClient  from "../../ApiClient";
import { GetAsignacionesResponse } from "../schemas/GetAsignacionesResponse";
import { AsigancionesPostDeleteRequest } from "../models/AsigancionesPostDeleteRequest";

export const deleteAsignaciones = async (data:AsigancionesPostDeleteRequest):Promise<GetAsignacionesResponse> => {
    const endpoint = `/api/inventario-computo/asignar-equipo/`;
    const res = await ApiClient.getInstance().delete(endpoint, {data})
    return res.data
}           