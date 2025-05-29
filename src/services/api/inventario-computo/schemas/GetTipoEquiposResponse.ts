import { TipoEquipos } from "../models/TipoEquipos"
import { BaseResponse } from "../../core/schema/BaseResponse"

export type GetTipoEquiposResponse= BaseResponse & { 
    data:TipoEquipos[],
}