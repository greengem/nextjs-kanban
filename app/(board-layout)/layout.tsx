import DashboardLayout from "@/ui/DashboardLayout"
import SubNavbar from '@/ui/Navbar/SubNavbar'

export default function RootLayout({
  children, modal
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <DashboardLayout>
      <SubNavbar />
      <main className='p-3 md:p-5'>
        {children}
        {modal}
      </main>
    </DashboardLayout>
  )
}
