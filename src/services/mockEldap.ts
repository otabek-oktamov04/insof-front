/**
 * Mock ELDAP Authentication Service
 * Simulates the ELDAP authentication flow
 */

const MOCK_ELDAP_URL = 'https://mock-eldap.example.com/auth'
const MOCK_CALLBACK_URL = `${window.location.origin}/auth/callback`

export interface EldapAuthResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

/**
 * Initiates ELDAP authentication by redirecting to mock ELDAP system
 * In a real implementation, this would redirect to the actual ELDAP system
 * For mock, we simulate the authentication flow
 */
export function initiateEldapLogin(): void {
  // Store the current URL to redirect back after authentication
  const returnUrl = window.location.href
  sessionStorage.setItem('eldap_return_url', returnUrl)
  
  // In a real implementation, this would redirect to the actual ELDAP system:
  // window.location.href = `${ELDAP_AUTH_URL}?callback=${MOCK_CALLBACK_URL}&return_url=${returnUrl}`
  
  // For mock: Simulate ELDAP authentication and redirect back with token
  // This simulates what would happen after user authenticates on ELDAP system
  console.log('Initiating ELDAP login...')
  console.log('Mock: Simulating redirect to ELDAP system')
  
  // Simulate the authentication process
  setTimeout(() => {
    const mockToken = generateMockToken()
    // Redirect back to login page with token (simulating ELDAP callback)
    const callbackUrl = new URL(window.location.origin + '/login')
    callbackUrl.searchParams.set('token', mockToken)
    callbackUrl.searchParams.set('success', 'true')
    
    window.location.href = callbackUrl.toString()
  }, 1500) // Simulate 1.5 second authentication delay
}

/**
 * Handles the callback from ELDAP system
 * Extracts token from URL parameters
 */
export function handleEldapCallback(): { token: string | null; error: string | null } {
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token')
  const error = urlParams.get('error')
  const success = urlParams.get('success')

  if (error) {
    return { token: null, error }
  }

  if (success === 'true' && token) {
    // Clean up URL
    window.history.replaceState({}, document.title, window.location.pathname)
    return { token, error: null }
  }

  return { token: null, error: 'Authentication failed' }
}

/**
 * Generates a mock JWT token for testing
 */
function generateMockToken(): string {
  // Mock JWT token structure (not a real JWT, just for demonstration)
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(
    JSON.stringify({
      sub: 'user123',
      name: 'Foydalanuvchi',
      email: 'foydalanuvchi@example.com',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiry
    })
  )
  const signature = 'mock_signature'
  return `${header}.${payload}.${signature}`
}

/**
 * Validates and decodes the mock token
 */
export function validateToken(token: string): EldapAuthResponse | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      return null
    }

    const payload = JSON.parse(atob(parts[1]))
    
    // Check expiry
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null
    }

    return {
      token,
      user: {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
      },
    }
  } catch (error) {
    console.error('Token validation error:', error)
    return null
  }
}
