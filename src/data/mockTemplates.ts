export type TemplateType = 
  | 'payment_reminder' 
  | 'payment_confirmation' 
  | 'debt_notification' 
  | 'custom'

export interface SMSTemplate {
  id: string
  type: TemplateType
  name: string
  content: string
  variables?: string[] // Available variables like {name}, {amount}, etc.
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export const templateTypes: Record<TemplateType, { label: string; description: string; defaultVariables: string[] }> = {
  payment_reminder: {
    label: 'To\'lov eslatmasi',
    description: 'Qarzdorlarga to\'lov eslatmasi yuborish uchun',
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
    description: 'O\'zingizning maxsus shabloningiz',
    defaultVariables: ['{name}', '{amount}', '{date}']
  }
}

export const mockTemplates: SMSTemplate[] = [
  {
    id: '1',
    type: 'payment_reminder',
    name: 'Asosiy to\'lov eslatmasi',
    content: 'Hurmatli {name}, sizning {account} hisobingizda {amount} so\'m qarz mavjud. Iltimos, {dueDate} gacha to\'lovni amalga oshiring.',
    variables: ['{name}', '{amount}', '{dueDate}', '{account}'],
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    type: 'payment_confirmation',
    name: 'To\'lov tasdiqlash',
    content: 'Hurmatli {name}, {amount} so\'m miqdoridagi to\'lovingiz {date} sanada muvaffaqiyatli qabul qilindi. Tranzaksiya raqami: {transactionId}',
    variables: ['{name}', '{amount}', '{date}', '{transactionId}'],
    isActive: true,
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z'
  },
  {
    id: '3',
    type: 'debt_notification',
    name: 'Qarz xabarnomasi',
    content: 'Hurmatli {name}, sizning umumiy qarzingiz {totalDebt} so\'m. Muddat o\'tgan qarz: {overdueAmount} so\'m ({daysOverdue} kun).',
    variables: ['{name}', '{totalDebt}', '{overdueAmount}', '{daysOverdue}'],
    isActive: true,
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z'
  }
]
