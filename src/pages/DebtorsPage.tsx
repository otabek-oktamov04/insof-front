import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users } from 'lucide-react'
import DebtorsTable from '@/components/DebtorsTable'
import { mockDebtors } from '@/data/mockDebtors'

export default function DebtorsPage() {
  const totalDebtors = mockDebtors.length

  return (
    <DashboardLayout>
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-title1 mb-1">Qarzdorlar</h1>
              <p className="text-body text-muted-foreground">
                Qarzdorlar ro'yxati va boshqaruvi
              </p>
            </div>
          </div>
          <div className="ml-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold">Jami qarzdorlar:</span>
              <span className="text-lg font-bold text-primary">{totalDebtors}</span>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <Card className="banking-card">
          <CardHeader>
            <CardTitle>Qarzdorlar ro'yxati</CardTitle>
            <CardDescription>
              Barcha qarzdorlar ma'lumotlari va filtrlash imkoniyatlari
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DebtorsTable debtors={mockDebtors} totalCount={totalDebtors} />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
