import { GetTipoEstatusResponse } from './../schemas/GetTipoEstatusResponse';
import  ApiClient  from "../../ApiClient";

export const getEstatusEquipos = async (pageNumber?:number,pageSize?:number,filterValue?:string):Promise<GetTipoEstatusResponse> => {
        const params = pageNumber && pageSize?{pageNumber,pageSize,filterValue}:undefined;
        const res = await ApiClient.getInstance().get('/api/inventario-computo/status-equipos',{params})
        return res.data
}