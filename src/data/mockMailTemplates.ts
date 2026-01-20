export type MailTemplateType = 
  | 'payment_reminder' 
  | 'payment_confirmation' 
  | 'debt_notification' 
  | 'custom'

export interface MailTemplate {
  id: string
  type: MailTemplateType
  name: string
  content: string
  variables?: string[] // Available variables like {name}, {amount}, etc.
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export const mailTemplateTypes: Record<MailTemplateType, { label: string; description: string; defaultVariables: string[] }> = {
  payment_reminder: {
    label: 'To\'lov eslatmasi',
    description: 'Qarzdorlarga to\'lov eslatmasi xat yuborish uchun',
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

export const mockMailTemplates: MailTemplate[] = [
  {
    id: '1',
    type: 'payment_reminder',
    name: 'Asosiy to\'lov eslatmasi',
    content: 'Hurmatli {name}!\n\nSizning {account} hisobingizda {amount} so\'m qarz mavjud.\nTo\'lov muddati: {dueDate}\n\nIltimos, o\'z vaqtida to\'lovni amalga oshiring.\n\nHurmat bilan,\nMoliya bo\'limi',
    variables: ['{name}', '{amount}', '{dueDate}', '{account}'],
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    type: 'payment_confirmation',
    name: 'To\'lov tasdiqlash',
    content: 'Hurmatli {name}!\n\n{amount} so\'m miqdoridagi to\'lovingiz {date} sanada muvaffaqiyatli qabul qilindi.\nTranzaksiya raqami: {transactionId}\n\nRahmat!\n\nHurmat bilan,\nMoliya bo\'limi',
    variables: ['{name}', '{amount}', '{date}', '{transactionId}'],
    isActive: true,
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z'
  },
  {
    id: '3',
    type: 'debt_notification',
    name: 'Qarz xabarnomasi',
    content: 'Hurmatli {name}!\n\nSizning umumiy qarzingiz {totalDebt} so\'m.\nMuddat o\'tgan qarz: {overdueAmount} so\'m ({daysOverdue} kun).\n\nIltimos, tez orada bog\'laning.\n\nHurmat bilan,\nMoliya bo\'limi',
    variables: ['{name}', '{totalDebt}', '{overdueAmount}', '{daysOverdue}'],
    isActive: true,
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z'
  }
]
