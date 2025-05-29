import  ApiClient  from "../../ApiClient";
import { EquipoPost } from "../models/Equipos";
import { GetEquiposResponse } from "../schemas/GetEquiposResponse";
import { EquipoFormData } from "@/components/inventario/equipos/schemas/equipoSchema";
import { mapFormToEquipos } from "../mappers/mapFormToEquipos.";

export const putEquipos = async (data:EquipoFormData):Promise<GetEquiposResponse> => {
    const formattedData:EquipoPost = mapFormToEquipos(data);
    const endpoint = `/api/inventario-computo/equipos`;
    const res = await ApiClient.getInstance().put(endpoint,formattedData)
    return res.data
}