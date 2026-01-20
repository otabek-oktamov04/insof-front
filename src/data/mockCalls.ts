export interface Call {
  id: string
  recipientName: string
  recipientPhone: string
  status: 'completed' | 'answered' | 'no_answer' | 'busy' | 'failed' | 'pending'
  callDate: string
  answeredDate: string | null
  duration?: number // Duration in seconds
  type: 'payment_reminder' | 'overdue_notice' | 'payment_confirmation' | 'general'
  debtorId: string
  contractNumber: string
  amount?: number
  templateId?: string
}

export const mockCallsList: Call[] = [
  {
    id: '1',
    recipientName: 'Alisher Karimov',
    recipientPhone: '+998 90 123 45 67',
    status: 'answered',
    callDate: '2024-01-20T10:30:00',
    answeredDate: '2024-01-20T10:30:05',
    duration: 45,
    type: 'payment_reminder',
    debtorId: '1',
    contractNumber: 'CT-2024-001',
    amount: 3000000,
    templateId: '1',
  },
  {
    id: '2',
    recipientName: 'Farhod Rahimov',
    recipientPhone: '+998 93 345 67 89',
    status: 'no_answer',
    callDate: '2024-01-15T14:20:00',
    answeredDate: null,
    duration: 0,
    type: 'overdue_notice',
    debtorId: '3',
    contractNumber: 'CT-2023-045',
    amount: 4000000,
    templateId: '3',
  },
  {
    id: '3',
    recipientName: 'Dilshod Toshmatov',
    recipientPhone: '+998 91 234 56 78',
    status: 'completed',
    callDate: '2024-01-18T09:15:00',
    answeredDate: '2024-01-18T09:15:03',
    duration: 60,
    type: 'payment_reminder',
    debtorId: '2',
    contractNumber: 'CT-2024-002',
    amount: 2500000,
    templateId: '1',
  },
  {
    id: '4',
    recipientName: 'Hasan Aliyev',
    recipientPhone: '+998 95 567 89 01',
    status: 'busy',
    callDate: '2024-01-19T11:45:00',
    answeredDate: null,
    duration: 0,
    type: 'payment_reminder',
    debtorId: '5',
    contractNumber: 'CT-2024-015',
    amount: 6000000,
    templateId: '1',
  },
  {
    id: '5',
    recipientName: 'Iroda Valiyeva',
    recipientPhone: '+998 97 678 90 12',
    status: 'failed',
    callDate: '2024-01-16T16:30:00',
    answeredDate: null,
    duration: 0,
    type: 'overdue_notice',
    debtorId: '6',
    contractNumber: 'CT-2023-088',
    amount: 10000000,
    templateId: '3',
  },
  {
    id: '6',
    recipientName: 'Javohir Mirzayev',
    recipientPhone: '+998 99 789 01 23',
    status: 'pending',
    callDate: '2024-01-21T08:00:00',
    answeredDate: null,
    duration: 0,
    type: 'payment_reminder',
    debtorId: '7',
    contractNumber: 'CT-2024-020',
    amount: 2000000,
    templateId: '1',
  },
  {
    id: '7',
    recipientName: 'Kamola Nurova',
    recipientPhone: '+998 90 890 12 34',
    status: 'answered',
    callDate: '2024-01-20T13:20:00',
    answeredDate: '2024-01-20T13:20:04',
    duration: 52,
    type: 'payment_reminder',
    debtorId: '8',
    contractNumber: 'CT-2024-025',
    amount: 6000000,
    templateId: '1',
  },
  {
    id: '8',
    recipientName: 'Gulnoza Ismoilova',
    recipientPhone: '+998 94 456 78 90',
    status: 'completed',
    callDate: '2024-01-25T10:00:00',
    answeredDate: '2024-01-25T10:00:02',
    duration: 38,
    type: 'payment_confirmation',
    debtorId: '4',
    contractNumber: 'CT-2024-010',
    templateId: '2',
  },
]
