import Sidebar from '@/ui/Sidebar/Sidebar'
import Navbar from '@/ui/Navbar/Navbar'

export default function DashboardLayout({ children }: { children: React.ReactNode}) {
  return (
    <div className='flex h-full'>
      <Sidebar />
      <div className='grow min-w-0 ml-0 md:ml-16'>
        <Navbar />
        {children}
      </div>
    </div>
  )
}
