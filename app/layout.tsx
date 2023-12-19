import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'
import FetchImages from '@/lib/FetchImages'

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const imageUrl = await FetchImages();

  return (
    <html lang="en">
      <body 
        className={`${inter.className} text-white bg-no-repeat bg-cover bg-center min-h-screen antialiased`} 
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <Toaster />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
