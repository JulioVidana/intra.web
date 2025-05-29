/**
 * Opciones predefinidas para el formato de fecha en español (México)
 */
export const DATE_FORMAT_OPTIONS = {
    shortDateTime: {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
    shortDate: {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
    longDate: {
      day: "2-digit",
      month: "long",
      year: "numeric",
    },
    time: {
      hour: "2-digit",
      minute: "2-digit",
    },
  } as const;
  
  type DateFormatType = keyof typeof DATE_FORMAT_OPTIONS;
  
  /**
   * Formatea una fecha según el formato especificado
   * @param dateString - Fecha en formato string, puede ser null o undefined
   * @param formatType - Tipo de formato a utilizar (shortDateTime, shortDate, longDate, time)
   * @param locale - Configuración regional (por defecto es-MX)
   * @returns string - Fecha formateada o "N/A" si la fecha no es válida
   */
  export const formatDate = (
    dateString: string | null | undefined,
    formatType: DateFormatType = "shortDateTime",
    locale: string = "es-MX"
  ): string => {
    if (!dateString) return "N/A";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(locale, DATE_FORMAT_OPTIONS[formatType]);
    } catch (e) {
      console.warn(`Error al formatear la fecha: ${dateString}`, e);
      return dateString;
    }
  };
  
  /**
   * Verifica si una fecha es válida
   * @param dateString - Fecha en formato string
   * @returns boolean
   */
  export const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  };