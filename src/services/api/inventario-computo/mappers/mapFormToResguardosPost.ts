
import { ResguardoPost } from "@/services/api/inventario-computo/models/Resguardos";    
import { SearchItem } from "@/components/ui/sarch-dialog";

export function mapFormToResguardos(data: SearchItem,userId:string): ResguardoPost {
   return {
    empleadoId: parseInt(data.id as string),
    estatus: 0,
    createdBy: userId,
    created: new Date(),
    modifiedBy: userId,
    modified: new Date(),
  };


}
