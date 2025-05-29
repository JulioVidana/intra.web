import  ApiClient  from "../../ApiClient";
import { Empleado } from "../models/Empleados";

export const getEmpleados = async (pageNumber?:number,pageSize?:number,filterValue?:string):Promise<Empleado[]> => {
    const params = pageNumber && pageSize?{pageNumber,pageSize,filterValue}:undefined;
    const endpoint = '/api/empleados/activos';
    const res = await ApiClient.getInstance().get(endpoint,{params})
    return res.data
}   