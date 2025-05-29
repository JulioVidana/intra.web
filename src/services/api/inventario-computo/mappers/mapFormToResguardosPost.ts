
import { ResguardoPost } from "@/services/api/inventario-computo/models/Resguardos";    
import { SearchItem } from "@/components/ui/sarch-dialog";

export function mapFormToResguardos(data: SearchItem): ResguardoPost {
   return {
    empleadoId: parseInt(data.id as string),
    estatus: 0,
    createdBy: "1",
    created: new Date(),
    modifiedBy: "1",
    modified: new Date(),
  };


}
