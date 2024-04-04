import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CheckLogin  from '@/components/CheckCookies'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'dYdX',
  description: 'dydx project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head><link
      rel="icon"
      href="/icon.svg"
    /></head>
      <body className="body"><CheckLogin/>
      {children}</body>
    </html>
  )
}
