export interface Debtor {
  id: string
  name: string
  address: string
  phone: string
  email: string
  totalDebt: number
  paidAmount: number
  remainingDebt: number
  status: 'active' | 'overdue' | 'paid' | 'pending'
  lastPaymentDate: string
  dueDate: string
  contractNumber: string
}

export const mockDebtors: Debtor[] = [
  {
    id: '1',
    name: 'Alisher Karimov',
    address: 'Toshkent shahri, Yunusobod tumani, Navoiy ko\'chasi 15',
    phone: '+998 90 123 45 67',
    email: 'alisher.karimov@example.com',
    totalDebt: 5000000,
    paidAmount: 2000000,
    remainingDebt: 3000000,
    status: 'active',
    lastPaymentDate: '2024-01-10',
    dueDate: '2024-02-15',
    contractNumber: 'CT-2024-001',
  },
  {
    id: '2',
    name: 'Dilshod Toshmatov',
    address: 'Samarqand viloyati, Samarqand shahri, Registon ko\'chasi 42',
    phone: '+998 91 234 56 78',
    email: 'dilshod.toshmatov@example.com',
    totalDebt: 7500000,
    paidAmount: 5000000,
    remainingDebt: 2500000,
    status: 'active',
    lastPaymentDate: '2024-01-15',
    dueDate: '2024-02-20',
    contractNumber: 'CT-2024-002',
  },
  {
    id: '3',
    name: 'Farhod Rahimov',
    address: 'Andijon viloyati, Andijon shahri, Navbahor ko\'chasi 78',
    phone: '+998 93 345 67 89',
    email: 'farhod.rahimov@example.com',
    totalDebt: 12000000,
    paidAmount: 8000000,
    remainingDebt: 4000000,
    status: 'overdue',
    lastPaymentDate: '2023-12-20',
    dueDate: '2024-01-10',
    contractNumber: 'CT-2023-045',
  },
  {
    id: '4',
    name: 'Gulnoza Ismoilova',
    address: 'Farg\'ona viloyati, Farg\'ona shahri, Mustaqillik ko\'chasi 25',
    phone: '+998 94 456 78 90',
    email: 'gulnoza.ismoilova@example.com',
    totalDebt: 3000000,
    paidAmount: 3000000,
    remainingDebt: 0,
    status: 'paid',
    lastPaymentDate: '2024-01-25',
    dueDate: '2024-02-01',
    contractNumber: 'CT-2024-010',
  },
  {
    id: '5',
    name: 'Hasan Aliyev',
    address: 'Toshkent shahri, Chilonzor tumani, Bunyodkor ko\'chasi 88',
    phone: '+998 95 567 89 01',
    email: 'hasan.aliyev@example.com',
    totalDebt: 9000000,
    paidAmount: 3000000,
    remainingDebt: 6000000,
    status: 'pending',
    lastPaymentDate: '2024-01-05',
    dueDate: '2024-03-01',
    contractNumber: 'CT-2024-015',
  },
  {
    id: '6',
    name: 'Iroda Valiyeva',
    address: 'Namangan viloyati, Namangan shahri, Alisher Navoiy ko\'chasi 12',
    phone: '+998 97 678 90 12',
    email: 'iroda.valiyeva@example.com',
    totalDebt: 15000000,
    paidAmount: 5000000,
    remainingDebt: 10000000,
    status: 'overdue',
    lastPaymentDate: '2023-11-15',
    dueDate: '2023-12-30',
    contractNumber: 'CT-2023-088',
  },
  {
    id: '7',
    name: 'Javohir Mirzayev',
    address: 'Qashqadaryo viloyati, Qarshi shahri, Amir Temur ko\'chasi 56',
    phone: '+998 99 789 01 23',
    email: 'javohir.mirzayev@example.com',
    totalDebt: 6000000,
    paidAmount: 4000000,
    remainingDebt: 2000000,
    status: 'active',
    lastPaymentDate: '2024-01-20',
    dueDate: '2024-02-25',
    contractNumber: 'CT-2024-020',
  },
  {
    id: '8',
    name: 'Kamola Nurova',
    address: 'Surxondaryo viloyati, Termiz shahri, Mustaqillik ko\'chasi 34',
    phone: '+998 90 890 12 34',
    email: 'kamola.nurova@example.com',
    totalDebt: 8000000,
    paidAmount: 2000000,
    remainingDebt: 6000000,
    status: 'pending',
    lastPaymentDate: '2024-01-12',
    dueDate: '2024-03-15',
    contractNumber: 'CT-2024-025',
  },
]
