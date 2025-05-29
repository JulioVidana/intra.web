import  ApiClient  from "../../ApiClient";
import { AsigancionesPostDeleteRequest } from "../models/AsigancionesPostDeleteRequest";
import { GetTipoEquiposResponse } from "../schemas/GetTipoEquiposResponse";

export const postAsignaciones = async (data: AsigancionesPostDeleteRequest):Promise<GetTipoEquiposResponse> => {
    const endpoint = '/api/inventario-computo/asignar-equipo';
    const res = await ApiClient.getInstance().post(endpoint,data)
    return res.data
}   