export interface SMS {
  id: string
  recipientName: string
  recipientPhone: string
  message: string
  status: 'sent' | 'delivered' | 'failed' | 'pending'
  sentDate: string
  deliveredDate: string | null
  type: 'payment_reminder' | 'overdue_notice' | 'payment_confirmation' | 'general'
  debtorId: string
  contractNumber: string
  amount?: number
}

export const mockSMSList: SMS[] = [
  {
    id: '1',
    recipientName: 'Alisher Karimov',
    recipientPhone: '+998 90 123 45 67',
    message: 'Hurmatli Alisher Karimov! Sizning qarzingiz 3,000,000 so\'m. To\'lov muddati: 15.02.2024. Iltimos, o\'z vaqtida to\'lovni amalga oshiring.',
    status: 'delivered',
    sentDate: '2024-01-20T10:30:00',
    deliveredDate: '2024-01-20T10:30:15',
    type: 'payment_reminder',
    debtorId: '1',
    contractNumber: 'CT-2024-001',
    amount: 3000000,
  },
  {
    id: '2',
    recipientName: 'Farhod Rahimov',
    recipientPhone: '+998 93 345 67 89',
    message: 'Hurmatli Farhod Rahimov! Sizning qarzingiz muddati o\'tgan. Qarz miqdori: 4,000,000 so\'m. Iltimos, tez orada bog\'laning.',
    status: 'delivered',
    sentDate: '2024-01-15T14:20:00',
    deliveredDate: '2024-01-15T14:20:08',
    type: 'overdue_notice',
    debtorId: '3',
    contractNumber: 'CT-2023-045',
    amount: 4000000,
  },
  {
    id: '3',
    recipientName: 'Dilshod Toshmatov',
    recipientPhone: '+998 91 234 56 78',
    message: 'Hurmatli Dilshod Toshmatov! Sizning qarzingiz 2,500,000 so\'m. To\'lov muddati: 20.02.2024. Rahmat!',
    status: 'sent',
    sentDate: '2024-01-18T09:15:00',
    deliveredDate: null,
    type: 'payment_reminder',
    debtorId: '2',
    contractNumber: 'CT-2024-002',
    amount: 2500000,
  },
  {
    id: '4',
    recipientName: 'Hasan Aliyev',
    recipientPhone: '+998 95 567 89 01',
    message: 'Hurmatli Hasan Aliyev! Sizning qarzingiz 6,000,000 so\'m. To\'lov muddati: 01.03.2024. Iltimos, o\'z vaqtida to\'lovni amalga oshiring.',
    status: 'delivered',
    sentDate: '2024-01-19T11:45:00',
    deliveredDate: '2024-01-19T11:45:12',
    type: 'payment_reminder',
    debtorId: '5',
    contractNumber: 'CT-2024-015',
    amount: 6000000,
  },
  {
    id: '5',
    recipientName: 'Iroda Valiyeva',
    recipientPhone: '+998 97 678 90 12',
    message: 'Hurmatli Iroda Valiyeva! Sizning qarzingiz muddati o\'tgan. Qarz miqdori: 10,000,000 so\'m. Iltimos, tez orada bog\'laning.',
    status: 'failed',
    sentDate: '2024-01-16T16:30:00',
    deliveredDate: null,
    type: 'overdue_notice',
    debtorId: '6',
    contractNumber: 'CT-2023-088',
    amount: 10000000,
  },
  {
    id: '6',
    recipientName: 'Javohir Mirzayev',
    recipientPhone: '+998 99 789 01 23',
    message: 'Hurmatli Javohir Mirzayev! Sizning qarzingiz 2,000,000 so\'m. To\'lov muddati: 25.02.2024. Rahmat!',
    status: 'pending',
    sentDate: '2024-01-21T08:00:00',
    deliveredDate: null,
    type: 'payment_reminder',
    debtorId: '7',
    contractNumber: 'CT-2024-020',
    amount: 2000000,
  },
  {
    id: '7',
    recipientName: 'Kamola Nurova',
    recipientPhone: '+998 90 890 12 34',
    message: 'Hurmatli Kamola Nurova! Sizning qarzingiz 6,000,000 so\'m. To\'lov muddati: 15.03.2024. Iltimos, o\'z vaqtida to\'lovni amalga oshiring.',
    status: 'delivered',
    sentDate: '2024-01-20T13:20:00',
    deliveredDate: '2024-01-20T13:20:05',
    type: 'payment_reminder',
    debtorId: '8',
    contractNumber: 'CT-2024-025',
    amount: 6000000,
  },
  {
    id: '8',
    recipientName: 'Gulnoza Ismoilova',
    recipientPhone: '+998 94 456 78 90',
    message: 'Hurmatli Gulnoza Ismoilova! Sizning to\'lovingiz qabul qilindi. Rahmat!',
    status: 'delivered',
    sentDate: '2024-01-25T10:00:00',
    deliveredDate: '2024-01-25T10:00:03',
    type: 'payment_confirmation',
    debtorId: '4',
    contractNumber: 'CT-2024-010',
  },
]
