import { Equipos } from "./Equipos";

export interface Asignaciones {
    id: number;
    idEmpleado: number;
    numeroEmpleado: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    departamento: string;
    totalEquipos: number;
    equiposAsignados: Equipos[];
  }
  