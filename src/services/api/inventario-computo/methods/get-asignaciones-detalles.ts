import  ApiClient  from "../../ApiClient";
import { GetAsignacionesResponse } from "../schemas/GetAsignacionesResponse";
import { GetAsignacionByEmpleadoIdResponse } from "../schemas/GetAsignacionByEmpleadoIdResponse";

export const getAsignacionesDetalles = async (empleadoId:string):Promise<GetAsignacionByEmpleadoIdResponse> => {
    const endpoint = `/api/inventario-computo/empleados-inventario-asignados/${empleadoId}`;
    const res = await ApiClient.getInstance().get(endpoint)
    return res.data
}   