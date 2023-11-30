import Sidebar from '@/ui/Sidebar/Sidebar'
import Navbar from '@/ui/Navbar/Navbar'
import SubNavbar from '@/ui/Navbar/SubNavbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-grow overflow-x-hidden'>
        <Navbar />
        <SubNavbar />
        <main className='p-3 md:p-5'>
          {children}
        </main>
      </div>
    </div>
  )
}
