import { authenticate } from "./auth/methods/authenticate";
import { getEstatusEquipos } from "./inventario-computo/methods/get-estatus-equipos";
import { getTipoEquipos } from "./inventario-computo/methods/get-tipo-equipos";
import { getEquipos } from "./inventario-computo/methods/get-equipos";
import { postEquipos } from "./inventario-computo/methods/post-equipos";
import { putEquipos } from "./inventario-computo/methods/put-equipos";
import { postTipoEquipos } from "./inventario-computo/methods/post-tipo-equipos";
import { putTipoEquipos } from "./inventario-computo/methods/put-tipo-equipos";
import { deleteEquipos } from "./inventario-computo/methods/delete-equipos";
import { deleteTipoEquipos } from "./inventario-computo/methods/delete-tipo-equipos";
import { getAsignaciones } from "./inventario-computo/methods/get-asignaciones";
import { getAsignacionesDetalles } from "./inventario-computo/methods/get-asignaciones-detalles";
import { deleteAsignaciones } from "./inventario-computo/methods/delete-asignaciones";
import { postAsignaciones } from "./inventario-computo/methods/post-asignaciones";
import { postTipoEstatus } from "./inventario-computo/methods/post-tipo-estatus";
import { putTipoEstatus } from "./inventario-computo/methods/put-tipo-estatus";
import { deleteTipoEstatus } from "./inventario-computo/methods/delete-tipo-estatus";
import { getEmpleados } from "./empleados/methods/get-empleados";
import { getResguardos } from "./inventario-computo/methods/get-resguardos";
import { postResguardos } from "./inventario-computo/methods/post-resguardos";
import { putResguardos } from "./inventario-computo/methods/put-resguardos";
import { deleteResguardos } from "./inventario-computo/methods/delete-resguardos";
import { getResguardoDetalles } from "./inventario-computo/methods/get-resguardo-detalles";
import { putActualizarResguardo } from "./inventario-computo/methods/put-actualizar-resguardo";
import { getResguardoHistorial } from "./inventario-computo/methods/get-resguardo-historial";
import { postUploadFile } from "./inventario-computo/methods/post-upload-file";
import { deleteFile } from "./inventario-computo/methods/delete-file";
import { downloadFile } from "./inventario-computo/methods/download-file";
import { logOff } from "./auth/methods/log-off";
export const API = {
    auth: {
        authenticate,
        logOff
    },
    inventarioComputo: {
        getTipoEquipos,
        getEstatusEquipos,
        postTipoEstatus,
        putTipoEstatus,
        deleteTipoEstatus,
        getEquipos,
        postEquipos,
        putEquipos,
        postTipoEquipos,
        putTipoEquipos,
        deleteEquipos,
        deleteTipoEquipos,
        getAsignaciones,
        getAsignacionesDetalles,
        deleteAsignaciones,
        postAsignaciones,
        getResguardos,
        getResguardoHistorial,
        postResguardos,
        putResguardos,
        deleteResguardos,
        getResguardoDetalles,
        putActualizarResguardo
    },
    empleados: {
        getEmpleados
    },
    file: {
        postUploadFile,
        deleteFile,
        downloadFile,
    }
}