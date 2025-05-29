// Definimos los tipos de estado posibles
export type EquipoStatus = 'activo' | 'baja' | 'reparacion' | 'otro';

// Interface para los estilos de estado
interface StatusStyle {
  background: string;
  text: string;
  hover: string;
}

// Mapa de estilos por estado
const STATUS_STYLES: Record<EquipoStatus, StatusStyle> = {
  activo: {
    background: 'bg-green-100',
    text: 'text-green-800',
    hover: 'hover:bg-green-100'
  },
  baja: {
    background: 'bg-red-100',
    text: 'text-red-800',
    hover: 'hover:bg-red-100'
  },
  reparacion: {
    background: 'bg-amber-100',
    text: 'text-amber-800',
    hover: 'hover:bg-amber-100'
  },
  otro: {
    background: 'bg-blue-100',
    text: 'text-blue-800',
    hover: 'hover:bg-blue-100'
  }
};

/**
 * Obtiene las clases de estilo para un estado específico
 * @param status - El estado del equipo
 * @returns string - Clases CSS concatenadas
 */
export const getStatusStyle = (status: string): string => {
  const normalizedStatus = status.toLowerCase().trim();
  let statusKey: EquipoStatus = 'otro';

  if (normalizedStatus.includes('activo')) statusKey = 'activo';
  else if (normalizedStatus.includes('baja')) statusKey = 'baja';
  else if (normalizedStatus.includes('reparación') || normalizedStatus.includes('reparacion')) statusKey = 'reparacion';

  const style = STATUS_STYLES[statusKey];
  return `${style.background} ${style.text} ${style.hover}`;
};

// Función auxiliar para verificar si un estado es válido
export const isValidStatus = (status: string): boolean => {
  const normalizedStatus = status.toLowerCase().trim();
  return Object.keys(STATUS_STYLES).some(key => 
    normalizedStatus.includes(key)
  );
};