import  ApiClient  from "../../ApiClient";
import { GetTipoEquiposResponse } from "../schemas/GetTipoEquiposResponse";

export const getTipoEquipos = async (pageNumber?:number,pageSize?:number,filterValue?:string):Promise<GetTipoEquiposResponse> => {
    const params = pageNumber && pageSize?{pageNumber,pageSize,filterValue}:undefined;
    const endpoint = '/api/inventario-computo/tipos-equipos';
    const res = await ApiClient.getInstance().get(endpoint,{params})
    return res.data
}