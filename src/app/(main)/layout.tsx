import Header from "@/components/layout/Header"
import Navbar from "@/components/layout/Navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-full">
      <div className="lg:pl-64">
        <Header />
        <main className="py-2 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
      <Navbar />
    </div>
  )
}
