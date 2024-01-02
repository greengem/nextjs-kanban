import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className} h-screen antialiased`}>
        <Toaster />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
