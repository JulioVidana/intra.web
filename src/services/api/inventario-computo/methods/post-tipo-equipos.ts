import  ApiClient  from "../../ApiClient";
import { GetEquiposResponse } from "../schemas/GetEquiposResponse";
import { TipoEquipoFormData } from "@/components/inventario/catalogos/tipoEquipos/schemas/tipoEquipoSchema";
import { mapFormToTipoEquipos } from "../mappers/mapFormToTipoEquipos";
import { TipoEquipoPost } from "../models/TipoEquipos";

export const postTipoEquipos = async (data:TipoEquipoFormData):Promise<GetEquiposResponse> => {
    const formattedData:TipoEquipoPost = mapFormToTipoEquipos(data);
    const endpoint = '/api/inventario-computo/tipos-equipos';
    const res = await ApiClient.getInstance().post(endpoint,formattedData)
    return res.data
}