import Sidebar from '@/ui/Sidebar/Sidebar'
import Navbar from '@/ui/Navbar/Navbar'
import SubNavbar from '@/ui/Navbar/SubNavbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex-1'>
        <Navbar />
        <SubNavbar />
        <main className='p-5'>
          {children}
        </main>
      </div>
    </div>
  )
}
