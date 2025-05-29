import { BaseResponse } from "../../core/schema/BaseResponse"
import { Resguardo } from "../models/Resguardos"

export type GetResguardoByIdResponse= BaseResponse & { 
    data:Resguardo,
}