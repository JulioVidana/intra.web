import { BaseResponse } from "../../core/schema/BaseResponse"
import { Equipos } from "../models/Equipos"

export type GetEquiposResponse= BaseResponse & { 
    data:Equipos[],
}