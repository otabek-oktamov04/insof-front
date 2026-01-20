import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { validateToken } from '@/services/mockEldap'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Lock, Shield, ArrowRight, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login, isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  // Handle ELDAP callback
  useEffect(() => {
    const token = searchParams.get('token')
    const error = searchParams.get('error')

    if (token) {
      const authResponse = validateToken(token)
      if (authResponse) {
        login(authResponse.token)
        navigate('/dashboard', { replace: true })
      }
    } else if (error) {
      console.error('ELDAP authentication error:', error)
    }
  }, [searchParams, login, navigate])

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleEldapLogin = () => {
    setIsLoading(true)
    // Import dynamically to avoid circular dependencies
    import('@/services/mockEldap').then(({ initiateEldapLogin }) => {
      initiateEldapLogin()
    })
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'var(--color-background)',
      }}
    >
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-title1 mb-2">Bank Tizimi</h1>
          <p className="text-body text-muted-foreground">
            Moliyaviy xizmatlaringizga xavfsiz kirish
          </p>
        </div>

        {/* Login Card */}
        <Card className="banking-card">
          <CardHeader>
            <CardTitle className="text-title2">Xush kelibsiz</CardTitle>
            <CardDescription>
              Hisobingizga kirish uchun ELDAP hisob ma'lumotlaringizdan foydalaning
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Security Notice */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 border border-border">
              <Lock className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">Xavfsiz autentifikatsiya</p>
                <p className="text-xs text-muted-foreground">
                  Sizning hisob ma'lumotlaringiz ELDAP tizimi orqali xavfsiz autentifikatsiya qilinadi.
                  Kirish jarayonini yakunlash uchun siz qayta yo'naltirilasiz.
                </p>
              </div>
            </div>

            {/* ELDAP Login Button */}
            <Button
              onClick={handleEldapLogin}
              className="w-full h-12 text-base font-semibold"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ELDAP ga ulanilmoqda...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5 mr-2" />
                  ELDAP orqali kirish
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>

            {/* Help Text */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Kirishda muammo bormi?{' '}
                <a
                  href="#"
                  className="text-primary hover:underline font-medium"
                  onClick={(e) => {
                    e.preventDefault()
                    // Handle help/contact
                  }}
                >
                  Qo'llab-quvvatlash bilan bog'lanish
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 Bank Tizimi. Barcha huquqlar himoyalangan.
          </p>
        </div>
      </div>
    </div>
  )
}
