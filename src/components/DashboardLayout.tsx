import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { useSidebar } from '@/contexts/SidebarContext'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { sidebarWidth } = useSidebar()
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--color-background)' }}>
      <Sidebar />
      <main
        className="flex-1 w-full transition-all duration-300"
        style={{ marginLeft: isDesktop ? `${sidebarWidth}px` : '0' }}
      >
        <div className="p-4 lg:p-6 w-full">
          {children}
        </div>
      </main>
    </div>
  )
}
