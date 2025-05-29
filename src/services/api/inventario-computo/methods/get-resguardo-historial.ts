import { GetResguardosResponse } from '../schemas/GetResguardosResponse';
import  ApiClient  from "../../ApiClient";

export const getResguardoHistorial = async (EmpleadoId:number):Promise<GetResguardosResponse> => {
    const endpoint = `/api/inventario-computo/resguardo-equipos/historial/${EmpleadoId}`;
    const res = await ApiClient.getInstance().get(endpoint)
    return res.data
}   