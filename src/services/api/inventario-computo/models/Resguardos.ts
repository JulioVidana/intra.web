import { Equipos } from "./Equipos";

export interface Resguardo {
    id: number;
    empleadoId: number;
    empleado: string;
    notas: string;
    equipos?: Equipos[];
    estatus: ResguardoStatus;
    nombreDoc?:string;
    createdBy: string;
    modifiedBy: string;
    fecha: Date | null;
    created: Date;
    modified: Date;
  }

  export interface ResguardoPost {
    empleadoId: number;
    estatus: number;
    createdBy: string;
    created: Date;
    modifiedBy: string;
    modified: Date;
  }

  export enum ResguardoStatus {
    Pendiente = 'Pendiente',
    Completado = 'Completado',
    Entregado = 'Entregado',
    Desactualizado = 'Desactualizado',
    Archivado = 'Archivado',
  }
