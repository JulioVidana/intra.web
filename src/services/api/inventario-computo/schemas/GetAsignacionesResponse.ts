import { BaseResponse } from "../../core/schema/BaseResponse"
import { Asignaciones } from "../models/Asignaciones"

export type GetAsignacionesResponse= BaseResponse & { 
    data:Asignaciones[],
}