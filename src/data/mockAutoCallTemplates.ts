export type AutoCallTemplateType = 
  | 'payment_reminder' 
  | 'payment_confirmation' 
  | 'debt_notification' 
  | 'custom'

export interface AutoCallTemplate {
  id: string
  type: AutoCallTemplateType
  name: string
  audioUrl?: string // URL to audio file
  audioFile?: File // For upload
  duration?: number // Duration in seconds
  variables?: string[] // Available variables like {name}, {amount}, etc.
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export const autoCallTemplateTypes: Record<AutoCallTemplateType, { label: string; description: string; defaultVariables: string[] }> = {
  payment_reminder: {
    label: 'To\'lov eslatmasi',
    description: 'Qarzdorlarga to\'lov eslatmasi qo\'ng\'iroq qilish uchun',
    defaultVariables: ['{name}', '{amount}', '{dueDate}', '{account}']
  },
  payment_confirmation: {
    label: 'To\'lov tasdiqlash',
    description: 'To\'lov qabul qilinganini tasdiqlash uchun',
    defaultVariables: ['{name}', '{amount}', '{date}', '{transactionId}']
  },
  debt_notification: {
    label: 'Qarz xabarnomasi',
    description: 'Qarz haqida xabar berish uchun',
    defaultVariables: ['{name}', '{totalDebt}', '{overdueAmount}', '{daysOverdue}']
  },
  custom: {
    label: 'Maxsus shablon',
    description: 'O\'zingizning maxsus audio shabloningiz',
    defaultVariables: ['{name}', '{amount}', '{date}']
  }
}

export const mockAutoCallTemplates: AutoCallTemplate[] = [
  {
    id: '1',
    type: 'payment_reminder',
    name: 'Asosiy to\'lov eslatmasi',
    audioUrl: '/audio/payment-reminder-1.mp3',
    duration: 45,
    variables: ['{name}', '{amount}', '{dueDate}', '{account}'],
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    type: 'payment_confirmation',
    name: 'To\'lov tasdiqlash',
    audioUrl: '/audio/payment-confirmation-1.mp3',
    duration: 30,
    variables: ['{name}', '{amount}', '{date}', '{transactionId}'],
    isActive: true,
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z'
  },
  {
    id: '3',
    type: 'debt_notification',
    name: 'Qarz xabarnomasi',
    audioUrl: '/audio/debt-notification-1.mp3',
    duration: 60,
    variables: ['{name}', '{totalDebt}', '{overdueAmount}', '{daysOverdue}'],
    isActive: true,
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z'
  }
]
