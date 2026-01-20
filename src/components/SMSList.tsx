import { useState, useMemo } from 'react'
import { SMS } from '@/data/mockSMS'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter, X, CheckCircle2, Clock, XCircle, Send, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SMSListProps {
  smsList: SMS[]
}

type StatusFilter = 'all' | 'sent' | 'delivered' | 'failed' | 'pending'
type TypeFilter = 'all' | 'payment_reminder' | 'overdue_notice' | 'payment_confirmation' | 'general'

export default function SMSList({ smsList }: SMSListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const statusLabels: Record<SMS['status'], string> = {
    sent: 'Yuborilgan',
    delivered: 'Yetkazilgan',
    failed: 'Xatolik',
    pending: 'Kutilmoqda',
  }

  const statusColors: Record<SMS['status'], string> = {
    sent: 'bg-primary/10 text-primary border-primary/20',
    delivered: 'bg-success-50 text-success-700 border-success-200',
    failed: 'bg-error-50 text-error-700 border-error-200',
    pending: 'bg-warning-50 text-warning-700 border-warning-200',
  }

  const statusIcons: Record<SMS['status'], React.ComponentType<{ className?: string }>> = {
    sent: Send,
    delivered: CheckCircle2,
    failed: XCircle,
    pending: Clock,
  }

  const typeLabels: Record<SMS['type'], string> = {
    payment_reminder: 'To\'lov eslatmasi',
    overdue_notice: 'Muddati o\'tgan',
    payment_confirmation: 'To\'lov tasdiqi',
    general: 'Umumiy',
  }

  const typeColors: Record<SMS['type'], string> = {
    payment_reminder: 'bg-blue-50 text-blue-700 border-blue-200',
    overdue_notice: 'bg-orange-50 text-orange-700 border-orange-200',
    payment_confirmation: 'bg-green-50 text-green-700 border-green-200',
    general: 'bg-gray-50 text-gray-700 border-gray-200',
  }

  const filteredSMS = useMemo(() => {
    return smsList.filter((sms) => {
      const matchesSearch =
        searchQuery === '' ||
        sms.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sms.recipientPhone.includes(searchQuery) ||
        sms.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sms.contractNumber.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === 'all' || sms.status === statusFilter
      const matchesType = typeFilter === 'all' || sms.type === typeFilter

      // Date filter
      let matchesDate = true
      if (startDate || endDate) {
        const smsDate = new Date(sms.sentDate)
        if (startDate) {
          const start = new Date(startDate)
          start.setHours(0, 0, 0, 0)
          if (smsDate < start) matchesDate = false
        }
        if (endDate) {
          const end = new Date(endDate)
          end.setHours(23, 59, 59, 999)
          if (smsDate > end) matchesDate = false
        }
      }

      return matchesSearch && matchesStatus && matchesType && matchesDate
    })
  }, [smsList, searchQuery, statusFilter, typeFilter, startDate, endDate])

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('uz-UZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + ' so\'m'
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Ism, telefon, xabar yoki shartnoma raqami bo'yicha qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="shrink-0"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtrlar
        </Button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="space-y-4 p-4 bg-muted/50 rounded-lg border">
          <div>
            <label className="text-sm font-medium mb-2 block">Holat</label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                Barchasi
              </Button>
              {(['sent', 'delivered', 'failed', 'pending'] as const).map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                >
                  {statusLabels[status]}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Turi</label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={typeFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('all')}
              >
                Barchasi
              </Button>
              {(['payment_reminder', 'overdue_notice', 'payment_confirmation'] as const).map((type) => (
                <Button
                  key={type}
                  variant={typeFilter === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTypeFilter(type)}
                >
                  {typeLabels[type]}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Sana oralig'i</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Boshlanish</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Tugash</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="text-sm"
                />
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setStatusFilter('all')
              setTypeFilter('all')
              setSearchQuery('')
              setStartDate('')
              setEndDate('')
              setShowFilters(false)
            }}
            className="w-full"
          >
            <X className="w-4 h-4 mr-1" />
            Tozalash
          </Button>
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Ko'rsatilmoqda: {filteredSMS.length} / {smsList.length} ta SMS
      </div>

      {/* SMS List */}
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider w-48">
                  Qabul qiluvchi
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider w-64">
                  Xabar
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider w-40">
                  Turi
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider w-40">
                  Holat
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider w-48">
                  Yuborilgan vaqti
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider w-48">
                  Yetkazilgan vaqti
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {filteredSMS.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-base">SMS topilmadi</span>
                      <span className="text-sm">Qidiruv shartlarini o'zgartiring</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredSMS.map((sms, index) => {
                  const StatusIcon = statusIcons[sms.status]
                  return (
                    <tr
                      key={sms.id}
                      className={cn(
                        'border-b border-border',
                        index % 2 === 0 ? 'bg-card' : 'bg-muted/20',
                        'hover:bg-muted/40 transition-colors'
                      )}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-sm text-foreground">{sms.recipientName}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{sms.recipientPhone}</div>
                          {sms.contractNumber && (
                            <div className="text-xs text-muted-foreground">{sms.contractNumber}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-foreground line-clamp-3 max-w-sm" title={sms.message}>
                          {sms.message}
                        </div>
                        {sms.amount && (
                          <div className="text-xs font-semibold text-primary mt-1.5">
                            {formatCurrency(sms.amount)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            'inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-semibold border',
                            typeColors[sms.type]
                          )}
                        >
                          {typeLabels[sms.type]}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border',
                            statusColors[sms.status]
                          )}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          {statusLabels[sms.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                        {formatDateTime(sms.sentDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                        {sms.deliveredDate ? formatDateTime(sms.deliveredDate) : '-'}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
