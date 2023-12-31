import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 'no',
    themeColor: '18181B',
  };
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={`${inter.className} h-screen antialiased`}>
        <Toaster />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
