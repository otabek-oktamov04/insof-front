import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  Users,
  MessageSquare,
  Building2,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  LayoutDashboard,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useSidebar } from '@/contexts/SidebarContext'

interface MenuItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  path: string
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Boshqaruv Paneli',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    id: 'debtors',
    label: 'Qarzdorlar',
    icon: Users,
    path: '/dashboard/debtors',
  },
  {
    id: 'sms',
    label: 'SMS Xizmati',
    icon: MessageSquare,
    path: '/dashboard/sms',
  },
  {
    id: 'autocall',
    label: 'Avtozvon',
    icon: Phone,
    path: '/dashboard/autocall',
  },
  {
    id: 'mail',
    label: 'Pochta',
    icon: Mail,
    path: '/dashboard/mail',
  },
]

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { isCollapsed, toggleSidebar } = useSidebar()

  const handleNavigation = (path: string) => {
    navigate(path)
    setIsMobileOpen(false)
  }

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="bg-background"
        >
          {isMobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full border-r z-40',
          'transform transition-all duration-300 ease-in-out',
          'lg:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full',
          isCollapsed ? 'w-20' : 'w-64',
          className
        )}
        style={{
          background: 'var(--color-sidebar)',
          borderColor: 'var(--color-sidebar-border)',
        }}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div 
            className={cn(
              'flex items-center border-b transition-all',
              isCollapsed ? 'justify-center px-2 py-4' : 'gap-3 px-6 py-6'
            )}
            style={{ borderColor: 'var(--color-sidebar-border)' }}
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <h2 className="text-title3 font-semibold truncate">Bank Tizimi</h2>
                <p className="text-xs text-muted-foreground truncate">Boshqaruv paneli</p>
              </div>
            )}
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-2 py-6 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.path)
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className={cn(
                        'w-full flex items-center rounded-lg transition-all duration-200',
                        'hover:bg-accent hover:text-accent-foreground',
                        active ? 'shadow-sm' : '',
                        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                        isCollapsed ? 'justify-center px-2 py-3' : 'gap-3 px-4 py-3'
                      )}
                      style={{
                        backgroundColor: active ? 'var(--color-sidebar-primary)' : 'transparent',
                        color: active ? 'var(--color-sidebar-primary-foreground)' : 'var(--color-sidebar-foreground)',
                      }}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <Icon className="w-5 h-5 shrink-0" />
                      {!isCollapsed && (
                        <span className="text-left text-sm font-medium truncate">{item.label}</span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div 
            className={cn(
              'border-t transition-all',
              isCollapsed ? 'px-2 py-4' : 'px-4 py-4'
            )}
            style={{ borderColor: 'var(--color-sidebar-border)' }}
          >
            {!isCollapsed && (
              <div className="text-xs text-muted-foreground text-center">
                © 2024 Bank Tizimi
              </div>
            )}
            {/* Collapse Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className={cn(
                'w-full mt-2 hover:bg-accent',
                isCollapsed ? 'justify-center' : 'justify-start'
              )}
              title={isCollapsed ? 'Yoyish' : 'Yig\'ish'}
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
