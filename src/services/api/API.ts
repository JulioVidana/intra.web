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
export const API = {
    auth: {
        authenticate
    },
    inventarioComputo: {
        getTipoEquipos,
        getEstatusEquipos,
        getEquipos,
        postEquipos,
        putEquipos,
        postTipoEquipos,
        putTipoEquipos,
        deleteEquipos,
        deleteTipoEquipos
    }
}