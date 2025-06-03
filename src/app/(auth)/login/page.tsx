import { LoginForm } from "@/components/auth/login-form";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('intisafsonjack')?.value

  if (token) {
    redirect('/')
  }
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <div className="flex justify-center">
          <div className="w-[200px] h-[100px] relative">
  <Image
    src="/logo/logo-isaf.png"
    alt="Logo"
    fill
    className="object-contain"
    sizes="300px"
    priority
  />
</div>



          </div>
          <p className="text-muted-foreground text-sm">Inicia sesión para continuar</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
