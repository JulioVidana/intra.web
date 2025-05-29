import  ApiClient  from "../../ApiClient";
import { GetEquiposResponse } from "../schemas/GetEquiposResponse";
import { TipoEstatusFormData } from "@/components/inventario/catalogos/tipoEstatus/schemas/tipoEstatusSchema";
import { mapFormToTipoEstatus } from "@/services/api/inventario-computo/mappers/mapFormToTipoEstatus";
import { TipoEstatusPost } from "@/services/api/inventario-computo/models/TipoEstatus";

export const postTipoEstatus = async (data:TipoEstatusFormData):Promise<GetEquiposResponse> => {
    const formattedData:TipoEstatusPost = mapFormToTipoEstatus(data);
    const endpoint = '/api/inventario-computo/status-equipos';
    const res = await ApiClient.getInstance().post(endpoint,formattedData)
    return res.data
}