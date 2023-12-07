'use client'
import { SidebarProvider } from '@/contexts/SidebarContext'
import {NextUIProvider} from '@nextui-org/react'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </NextUIProvider>
  )
}
