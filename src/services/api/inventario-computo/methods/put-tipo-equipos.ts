import  ApiClient  from "../../ApiClient";
import { GetEquiposResponse } from "../schemas/GetEquiposResponse";
import { mapFormToTipoEquipos } from "../mappers/mapFormToTipoEquipos";
import { TipoEquipoPost } from "../models/TipoEquipos";
import { TipoEquipoFormData } from "@/components/inventario/catalogos/tipoEquipos/schemas/tipoEquipoSchema";

export const putTipoEquipos = async (data:TipoEquipoFormData):Promise<GetEquiposResponse> => {
    const formattedData:TipoEquipoPost = mapFormToTipoEquipos(data);
    const endpoint = `/api/inventario-computo/tipos-equipos`;
    const res = await ApiClient.getInstance().put(endpoint,formattedData)
    return res.data
}   