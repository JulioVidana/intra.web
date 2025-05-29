import  ApiClient  from "../../ApiClient";
import { GetEquiposResponse } from "../schemas/GetEquiposResponse";
import { mapFormToTipoEstatus } from "../mappers/mapFormToTipoEstatus";
import { TipoEstatusPost } from "../models/TipoEstatus";
import { TipoEstatusFormData } from "@/components/inventario/catalogos/tipoEstatus/schemas/tipoEstatusSchema";

export const putTipoEstatus = async (data:TipoEstatusFormData):Promise<GetEquiposResponse> => {
    const formattedData:TipoEstatusPost = mapFormToTipoEstatus(data);
    const endpoint = `/api/inventario-computo/status-equipos`;
    const res = await ApiClient.getInstance().put(endpoint,formattedData)
    return res.data
}       