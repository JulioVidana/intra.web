import { BaseResponse } from "../../core/schema/BaseResponse"
import { Resguardo } from "../models/Resguardos"

export type GetResguardosResponse= BaseResponse & { 
    data:Resguardo[],
}