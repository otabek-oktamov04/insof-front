import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { SidebarProvider } from './contexts/SidebarContext'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import DebtorsPage from './pages/DebtorsPage'
import SMSPage from './pages/SMSPage'
import AutoCallPage from './pages/AutoCallPage'
import MailPage from './pages/MailPage'
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
            <Route
              path="/dashboard/autocall"
              element={
                <ProtectedRoute>
                  <AutoCallPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/mail"
              element={
                <ProtectedRoute>
                  <MailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </AuthProvider>
  )
}