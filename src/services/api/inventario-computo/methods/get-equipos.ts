import  ApiClient  from "../../ApiClient";
import { GetEquiposResponse } from "../schemas/GetEquiposResponse";

export const getEquipos = async (pageNumber?:number,pageSize?:number,filterValue?:string,isAsignados?:boolean):Promise<GetEquiposResponse> => {
    const params = pageNumber && pageSize?{pageNumber,pageSize,filterValue,isAsignados}:undefined;
    const endpoint = '/api/inventario-computo/equipos';
    const res = await ApiClient.getInstance().get(endpoint,{params})
    return res.data
}