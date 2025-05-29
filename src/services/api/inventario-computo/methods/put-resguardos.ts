import  ApiClient  from "../../ApiClient";
import { GetResguardosResponse } from "../schemas/GetResguardosResponse";
import { Resguardo } from "../models/Resguardos";

export const putResguardos = async (data:Resguardo):Promise<GetResguardosResponse> => {
    const endpoint = '/api/inventario-computo/resguardo-equipos/actualizar-estatus';
    const res = await ApiClient.getInstance().put(endpoint,data)
    return res.data
}