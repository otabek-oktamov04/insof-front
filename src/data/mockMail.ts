export interface Mail {
  id: string
  recipientName: string
  recipientAddress: string
  status: 'sent' | 'delivered' | 'returned' | 'failed' | 'pending'
  sentDate: string
  deliveredDate: string | null
  type: 'payment_reminder' | 'overdue_notice' | 'payment_confirmation' | 'general'
  debtorId: string
  contractNumber: string
  amount?: number
  trackingNumber?: string
}

export const mockMailList: Mail[] = [
  {
    id: '1',
    recipientName: 'Alisher Karimov',
    recipientAddress: 'Toshkent sh., Yunusobod t., Navoiy ko\'chasi, 15-uy',
    status: 'delivered',
    sentDate: '2024-01-20T10:30:00',
    deliveredDate: '2024-01-25T14:20:00',
    type: 'payment_reminder',
    debtorId: '1',
    contractNumber: 'CT-2024-001',
    amount: 3000000,
    trackingNumber: 'PO-2024-001234',
  },
  {
    id: '2',
    recipientName: 'Farhod Rahimov',
    recipientAddress: 'Samarqand sh., Registon ko\'chasi, 42-uy',
    status: 'delivered',
    sentDate: '2024-01-15T14:20:00',
    deliveredDate: '2024-01-20T10:15:00',
    type: 'overdue_notice',
    debtorId: '3',
    contractNumber: 'CT-2023-045',
    amount: 4000000,
    trackingNumber: 'PO-2024-001235',
  },
  {
    id: '3',
    recipientName: 'Dilshod Toshmatov',
    recipientAddress: 'Andijon sh., Navoiy ko\'chasi, 78-uy',
    status: 'sent',
    sentDate: '2024-01-18T09:15:00',
    deliveredDate: null,
    type: 'payment_reminder',
    debtorId: '2',
    contractNumber: 'CT-2024-002',
    amount: 2500000,
    trackingNumber: 'PO-2024-001236',
  },
  {
    id: '4',
    recipientName: 'Hasan Aliyev',
    recipientAddress: 'Farg\'ona sh., Mustaqillik ko\'chasi, 25-uy',
    status: 'delivered',
    sentDate: '2024-01-19T11:45:00',
    deliveredDate: '2024-01-24T16:30:00',
    type: 'payment_reminder',
    debtorId: '5',
    contractNumber: 'CT-2024-015',
    amount: 6000000,
    trackingNumber: 'PO-2024-001237',
  },
  {
    id: '5',
    recipientName: 'Iroda Valiyeva',
    recipientAddress: 'Namangan sh., Alisher Navoiy ko\'chasi, 12-uy',
    status: 'returned',
    sentDate: '2024-01-16T16:30:00',
    deliveredDate: null,
    type: 'overdue_notice',
    debtorId: '6',
    contractNumber: 'CT-2023-088',
    amount: 10000000,
    trackingNumber: 'PO-2024-001238',
  },
  {
    id: '6',
    recipientName: 'Javohir Mirzayev',
    recipientAddress: 'Qarshi sh., Amir Temur ko\'chasi, 33-uy',
    status: 'pending',
    sentDate: '2024-01-21T08:00:00',
    deliveredDate: null,
    type: 'payment_reminder',
    debtorId: '7',
    contractNumber: 'CT-2024-020',
    amount: 2000000,
    trackingNumber: 'PO-2024-001239',
  },
  {
    id: '7',
    recipientName: 'Kamola Nurova',
    recipientAddress: 'Bukhara sh., Buxoro ko\'chasi, 56-uy',
    status: 'delivered',
    sentDate: '2024-01-20T13:20:00',
    deliveredDate: '2024-01-25T11:45:00',
    type: 'payment_reminder',
    debtorId: '8',
    contractNumber: 'CT-2024-025',
    amount: 6000000,
    trackingNumber: 'PO-2024-001240',
  },
  {
    id: '8',
    recipientName: 'Gulnoza Ismoilova',
    recipientAddress: 'Nukus sh., Karakalpakstan ko\'chasi, 89-uy',
    status: 'delivered',
    sentDate: '2024-01-25T10:00:00',
    deliveredDate: '2024-01-30T09:20:00',
    type: 'payment_confirmation',
    debtorId: '4',
    contractNumber: 'CT-2024-010',
    trackingNumber: 'PO-2024-001241',
  },
]
