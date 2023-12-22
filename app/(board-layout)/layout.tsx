import DashboardLayout from "@/ui/DashboardLayout"

export default function RootLayout({
  children, modal
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <DashboardLayout>
      <main>
        {children}
        {modal}
      </main>
    </DashboardLayout>
  )
}
