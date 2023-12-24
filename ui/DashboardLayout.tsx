import Sidebar from '@/ui/Sidebar/Sidebar'
import Navbar from '@/ui/Navbar/Navbar'

export default function DashboardLayout({ children }: { children: React.ReactNode}) {
  return (
    <>
    <Navbar />
      <div className='flex flex-1'>
        <Sidebar />
        <div className='grow min-w-0 h-full'>
          {children}
        </div>
      </div>
    </>
  )
}
