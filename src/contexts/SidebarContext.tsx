import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface SidebarContextType {
  isCollapsed: boolean
  toggleSidebar: () => void
  sidebarWidth: number
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

const SIDEBAR_COLLAPSED_KEY = 'sidebar_collapsed'
const SIDEBAR_WIDTH_EXPANDED = 256 // 64 * 4 = 256px (w-64)
const SIDEBAR_WIDTH_COLLAPSED = 80 // 20 * 4 = 80px

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_COLLAPSED_KEY)
    return saved === 'true'
  })

  useEffect(() => {
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(isCollapsed))
  }, [isCollapsed])

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev)
  }

  return (
    <SidebarContext.Provider
      value={{
        isCollapsed,
        toggleSidebar,
        sidebarWidth: isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
