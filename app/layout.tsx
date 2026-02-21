import type { Metadata, Viewport } from 'next'
import { Share_Tech_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AeroBackground } from '@/components/aero-background'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const shareTechMono = Share_Tech_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-share-tech',
})

export const metadata: Metadata = {
  title: 'MEDIA PLAYER v1.0',
  description: 'A productivity timer inspired by Windows Media Player and Frutiger Aero design',
}

export const viewport: Viewport = {
  themeColor: '#42A5F5',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={shareTechMono.variable}>
      <body className="font-sans antialiased min-h-screen overflow-x-hidden">
        <ThemeProvider>
          <AeroBackground />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
