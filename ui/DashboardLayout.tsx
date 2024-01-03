import AppSidebar from '@/ui/Sidebar/Sidebar'
import Navbar from '@/ui/Navbar/Navbar'
export default function DashboardLayout({ children }: { children: React.ReactNode}) {
  return (
    <>
    <Navbar />
      <div className='flex grow'>
        <AppSidebar />
        {children}
      </div>
    </>
  )
}
