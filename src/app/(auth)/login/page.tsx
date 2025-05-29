import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Bienvenido</h1>
          <p className="text-muted-foreground mt-2">Inicia sesión para continuar</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
