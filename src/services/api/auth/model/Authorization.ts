export type Authorization={
    id:string,
    nombre:string,
    rol:string
}
export interface Empleado {
    Nombre: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    Foto: string;
  }
  
  export interface User {
    Id: string;
    Email: string;
    Empleado: Empleado;
    roles: string[];

  }
  
 
  