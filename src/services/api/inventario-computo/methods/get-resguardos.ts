import  ApiClient  from "../../ApiClient";
import { GetResguardosResponse } from "../schemas/GetResguardosResponse";

export const getResguardos = async (pageNumber?:number,pageSize?:number,filterValue?:string):Promise<GetResguardosResponse> => {
    const params = pageNumber && pageSize?{pageNumber,pageSize,filterValue}:undefined;
    const endpoint = '/api/inventario-computo/resguardo-equipos';
    const res = await ApiClient.getInstance().get(endpoint,{params})
    return res.data
}