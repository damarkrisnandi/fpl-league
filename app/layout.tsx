import HeaderMain from '@/components/layout/header'
import './globals.css'
import { Inter } from 'next/font/google'
import BottomNav from '@/components/layout/bottomNav'
import { getLeagueData } from '@/services'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FPLMGM',
  description: 'Fantasy Premier League Matematika Gadjah Mada',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  
  let league: any = { league: { name: 'FPLMGM'}};
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderMain title={'FPLMGM'}/>
        {children}
        {/* <BottomNav /> */}
      </body>
    </html>
  )
}
