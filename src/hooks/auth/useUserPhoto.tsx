import { useQuery } from '@tanstack/react-query';
import { API } from '@/services/api/API';
import { useAuthStore } from '@/store/authStore';

export function useUserPhoto() {
  const { user, setUser } = useAuthStore();

  const { isLoading, error } = useQuery({
    queryKey: ['userPhoto', user?.Empleado?.Foto],
    queryFn: async () => {
      if (!user?.Empleado?.Foto) return null;
      
      try {
        const image = await API.file.downloadFile(user.Empleado.Foto);
        const fotoUrl = image.blockBlob.uri + image.sharedPolicy;
        
        setUser({
          ...user,
          Empleado: {
            ...user.Empleado,
            Foto: fotoUrl,
          }
        });
        
        return fotoUrl;
      } catch (error) {
        console.error('Error al cargar la foto del usuario:', error);
        setUser({
          ...user,
          Empleado: {
            ...user.Empleado,
            Foto: '',
          }
        });
        return null;
      }
    },
    enabled: !!user?.Empleado?.Foto && !user.Empleado.Foto.startsWith('http'),
    staleTime: Infinity,
    gcTime: 24 * 60 * 60 * 1000,
    retry: 1, 
  });

  return {
    photoUrl: user?.Empleado?.Foto,
    isLoading: isLoading && !!user?.Empleado?.Foto,
    error
  };
} 