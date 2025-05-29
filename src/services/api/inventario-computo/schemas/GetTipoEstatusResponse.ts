import { BaseResponse } from "../../core/schema/BaseResponse"
import { TipoEstatus } from "../models/TipoEstatus"

export type GetTipoEstatusResponse= BaseResponse & { 
    data:TipoEstatus[],
}