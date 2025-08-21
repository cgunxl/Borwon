import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/react'
import { ClientAnalytics } from '@/lib/analytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BwnX Platform - แพลตฟอร์มการให้คำแนะนำสิ่งที่คุณต้องการ',
  description: 'แพลตฟอร์มการให้คำแนะนำที่ดีที่สุดในการใช้ชีวิต หาเงิน และไลฟ์สไตล์ ด้วย AI และเครื่องมือที่ทันสมัย',
  keywords: 'BwnX, แนะนำ, AI, การเงิน, ไลฟ์สไตล์, เครื่องมือ, แอป',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="th">
        <body className={inter.className}>
          <ClientAnalytics />
          <Analytics />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
