import Sidebar from '@/ui/Sidebar/Sidebar'
import Navbar from '@/ui/Navbar/Navbar'

export default function DashboardLayout({ children }: { children: React.ReactNode}) {
  return (
    <div className='flex h-full'>
      <Sidebar />
      <div className='flex-grow min-w-0'>
        <Navbar />
        {children}
      </div>
    </div>
  )
}
