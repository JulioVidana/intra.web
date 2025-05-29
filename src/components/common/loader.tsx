"use client"

import { Skeleton } from "../ui/skeleton"
type Type = "table" | "list" | "form" 
interface LoaderProps{
  type:Type
}

export function Loader({type}:LoaderProps) {
 
  if (type === "table") {
    return (
      <div className="space-y-4 p-4">
        {/* Título */}
        <Skeleton className="h-6 w-1/4" />
        
        {/* Tabla Skeleton */}
        <div className="border rounded-lg overflow-hidden">
          {/* Encabezados de la tabla */}
          <div className="flex bg-gray-100 p-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-1/4 mx-2" />
            ))}
          </div>
          
          {/* Filas de la tabla */}
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex p-3 border-t">
                {[...Array(4)].map((_, j) => (
                  <Skeleton key={j} className="h-5 w-1/4 mx-2" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className="space-y-4 p-4">
        {/* Título */}
        <Skeleton className="h-6 w-1/3" />
        
        {/* Lista de elementos */}
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" /> {/* Avatar */}
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" /> {/* Nombre */}
                <Skeleton className="h-4 w-1/2" /> {/* Detalle */}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "form") {
    return (
      <div className="space-y-6 p-4">
        {/* Título */}
        <Skeleton className="h-6 w-1/4" />
        
        {/* Campos del formulario */}
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-1/3" /> {/* Label */}
              <Skeleton className="h-10 w-full" /> {/* Input */}
            </div>
          ))}
        </div>

        {/* Botón */}
        <Skeleton className="h-10 w-1/4" />
      </div>
    );
  }

  return null;
}
