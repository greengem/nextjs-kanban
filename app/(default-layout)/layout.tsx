import DashboardLayout from "@/ui/DashboardLayout"

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout>
      <div className="p-2 md:p-5">
        {children}
      </div>
    </DashboardLayout>
  )
}
