export interface Equipos {
    id: number;
    statusId: number;
    statusNombre: string;
    tiposEquiposId: number;
    tipoEquipoNombre: string;
    subEquiposId?: number;
    subEquipoNombre: string;
    claveSIIF: string;
    descripcion: string;
    clave: string;
    numSerie: string;
    observaciones: string;
    caracteristicas: string;
    ubicacion: string;
    fechaBaja: string;
    createdBy: string;
    modifiedBy: string;
    created: string;
    modified: string;
  }
  
  export interface EquipoPost{
    id?: number;
    statusId: number;
    tiposEquiposId: number;
    subEquiposId?: number;
    claveSIIF: string;
    descripcion: string;
    clave: string;
    numSerie: string;
    caracteristicas: string;
    ubicacion: string;
    observaciones?: string;
    fechaBaja?: Date;
    createdBy: string;
    created: string;
    modifiedBy: string;
    modified: string;
  } 
