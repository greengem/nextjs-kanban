import DashboardLayout from "@/ui/DashboardLayout"
import SubNavbar from '@/ui/Navbar/SubNavbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout>
      <SubNavbar />
      <main className='p-3 md:p-5'>
        {children}
      </main>
    </DashboardLayout>
  )
}
