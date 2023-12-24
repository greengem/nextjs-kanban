import DashboardLayout from "@/ui/DashboardLayout"

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout>
      <main className="h-full">
        {children}
      </main>
    </DashboardLayout>
  )
}
