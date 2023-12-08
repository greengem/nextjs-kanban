'use client'
import { SidebarProvider } from '@/contexts/SidebarContext'
import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
            <NextThemesProvider 
              attribute="class" 
              defaultTheme="purple"
              themes={[
                'red',
                'amber',
                'orange',
                'yellow',
                'lime',
                'green',
                'emerald',
                'teal',
                'cyan',
                'sky',
                'blue',
                'indigo',
                'violet',
                'purple',
                'fuchsia',
                'pink',
                'rose'
              ]}
            >
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
