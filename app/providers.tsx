'use client'
import { SidebarProvider } from '@/contexts/SidebarContext'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {children}
    </SidebarProvider>
  )
}
