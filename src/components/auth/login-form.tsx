"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import useAuth from "@/hooks/auth/useAuth"
import RHFTextField from "../hook-form/RHFTextField"
import FormProvider from "@/components/hook-form/FormProvider";
import { AlertCircleIcon, LockKeyhole, Mail } from "lucide-react"
import { Alert, AlertTitle, AlertDescription } from "../ui/alert"

export function LoginForm() {
  const { isLoginLoading, handleSubmit, methods, onSubmit, error } = useAuth()

  return (
    <div className="flex flex-col gap-y-4">
      {error && <Alert variant="destructive" className="bg-destructive/5 border-destructive/20 text-destructive">
        <AlertCircleIcon />
        <AlertTitle>Error al iniciar sesión</AlertTitle>
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>}
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-4">
        <RHFTextField
          id="email"
          label="Correo electrónico"
          name="email"
          placeholder="Correo.ejemplo@gmail.com"
          labelVariant="stacked"
          maxLength={255}
          icon={<Mail />}
        />
        <RHFTextField
          id="password"
          label="Contraseña"
          name="password"
          placeholder="••••••••"
          labelVariant="stacked"
          maxLength={255}
          type="password"
          icon={<LockKeyhole />}
        />
        <div className="min-w-full mt-6">
          <Button 
            type="submit" 
            className={`${isLoginLoading ? "bg-gray-400" : ""} text-white w-full px-4 py-2 rounded-md`} 
            disabled={isLoginLoading}
          >
            {isLoginLoading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </div>
      </div>
    </FormProvider> 
    </div>
  )
}

