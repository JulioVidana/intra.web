import { BaseResponse } from "../../core/schema/BaseResponse"
import { Empleado } from "../models/Empleados"

export type GetEmpleadosResponse= BaseResponse & { 
    data:Empleado[],
}