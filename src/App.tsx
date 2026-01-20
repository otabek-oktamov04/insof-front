import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { SidebarProvider } from './contexts/SidebarContext'
import LoginPage from './pages/LoginPage'
import DebtorsPage from './pages/DebtorsPage'
import SMSPage from './pages/SMSPage'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard/debtors"
              element={
                <ProtectedRoute>
                  <DebtorsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/sms"
              element={
                <ProtectedRoute>
                  <SMSPage />
                </ProtectedRoute>
              }
            />
            <Route path="/dashboard" element={<Navigate to="/dashboard/debtors" replace />} />
            <Route path="/" element={<Navigate to="/dashboard/debtors" replace />} />
            <Route path="*" element={<Navigate to="/dashboard/debtors" replace />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </AuthProvider>
  )
}