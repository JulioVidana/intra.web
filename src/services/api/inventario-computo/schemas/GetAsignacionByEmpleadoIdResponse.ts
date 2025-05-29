import { BaseResponse } from "../../core/schema/BaseResponse"
import { Asignaciones } from "../models/Asignaciones"

export type GetAsignacionByEmpleadoIdResponse= BaseResponse & { 
    data:Asignaciones,
}