import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LogOut, User, Shield } from 'lucide-react'
import BankingCardExample from '@/components/examples/BankingCardExample'

export default function DashboardPage() {
  const { logout, token } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  // Decode token to get user info (mock)
  const getUserInfo = () => {
    if (!token) return null
    try {
      const parts = token.split('.')
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]))
        return {
          name: payload.name || 'Foydalanuvchi',
          email: payload.email || 'foydalanuvchi@example.com',
        }
      }
    } catch (error) {
      console.error('Error decoding token:', error)
    }
    return null
  }

  const userInfo = getUserInfo()

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'var(--color-background)',
        padding: 'var(--spacing-base)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-title1 mb-2">Boshqaruv paneli</h1>
            {userInfo && (
              <p className="text-body text-muted-foreground">
                Xush kelibsiz, {userInfo.name}
              </p>
            )}
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Chiqish
          </Button>
        </div>

        {/* User Info Card */}
        {userInfo && (
          <Card className="banking-card mb-6">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle>{userInfo.name}</CardTitle>
                  <CardDescription>{userInfo.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>ELDAP orqali autentifikatsiya qilindi</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Banking Example Content */}
        <BankingCardExample />
      </div>
    </div>
  )
}
