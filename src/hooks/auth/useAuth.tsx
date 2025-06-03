import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { API } from '@/services/api/API'
import { AuthenticationRequest } from '@/services/api/auth/schema/AuthenticateRequest'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { User } from '@/services/api/auth/model/Authorization'
import { toastVariants } from '@/components/ui/sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { authSchema } from '@/components/auth/schema/authSchema'
import { useForm } from 'react-hook-form'
import { AuthFormData } from '@/components/auth/schema/authSchema'

export default function useAuth() {
  const { setUser, clearUser } = useAuthStore()
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  
  const methods = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { handleSubmit } = methods;

  const { mutate: login, isPending: isLoginLoading } = useMutation({
    mutationFn: API.auth.authenticate,
    onSuccess: async (data) => {
      if (!data?.success) {
        setError(data.message)
        return;
      }

      setUser(data.user as User);
      router.push("/");
    },
    onError: (error: any) => {
      toast.error('Error al iniciar sesión', {
        className: toastVariants({ variant: "error" }),
        description: error?.message || "Ocurrió un error al iniciar sesión",
      });
    }
  });

  const handleLogout = () => {
    clearUser();
    router.push('/login');
  };
  
  const onSubmit = (data: AuthFormData) => {
    const datos: AuthenticationRequest = {
      email: data.email.trim().toLowerCase(),
      password: data.password
    }
    login(datos)
  }

  return {
    login,
    isLoginLoading,
    onSubmit,
    methods,
    handleSubmit,
    handleLogout,
    error
  }
}
