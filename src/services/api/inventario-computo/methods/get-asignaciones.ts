import  ApiClient  from "../../ApiClient";
import { GetAsignacionesResponse } from "../schemas/GetAsignacionesResponse";

export const getAsignaciones = async (pageNumber?:number,pageSize?:number,filterValue?:string):Promise<GetAsignacionesResponse> => {
    const params = pageNumber && pageSize?{pageNumber,pageSize,filterValue}:undefined;
    const endpoint = '/api/inventario-computo/empleados-inventario-asignados';
    const res = await ApiClient.getInstance().get(endpoint,{params})
    return res.data
}