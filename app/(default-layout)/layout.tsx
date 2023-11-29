import Sidebar from '@/ui/Sidebar/Sidebar'
import Navbar from '@/ui/Navbar/Navbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <div className='flex-grow overflow-auto'>
        <Navbar />
        <main className="p-5">
          {children}
        </main>
      </div>
    </div>
  )
}
