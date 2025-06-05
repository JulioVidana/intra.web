import { LoginForm } from "@/components/auth/login-form";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión",
  description: "Accede a la intranet de ISAF para gestionar tus actividades y recursos.",
};

export default async function LoginPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('intisafsonjack')?.value

  if (token) {
    redirect('/')
  }
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 bg-card space-y-4 rounded-lg shadow-lg">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex items-center gap-4">
              <Image
                className="h-10 w-auto"
                width={155}
                height={50}
                src="/logo/logo-isaf-min.png"
                alt="Logo"
              />
              <Separator orientation="vertical" className="h-8" />
              <span className="text-xl font-semibold text-primary">Intranet</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">Inicia sesión para continuar</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
