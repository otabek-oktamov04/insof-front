import { useState, useMemo } from 'react'
import { Debtor } from '@/data/mockDebtors'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DebtorsTableProps {
  debtors: Debtor[]
  totalCount: number
}

type StatusFilter = 'all' | 'active' | 'overdue' | 'paid' | 'pending'

export default function DebtorsTable({ debtors, totalCount }: DebtorsTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [sortField, setSortField] = useState<keyof Debtor | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const statusLabels: Record<Debtor['status'], string> = {
    active: 'Faol',
    overdue: 'Muddati o\'tgan',
    paid: 'To\'langan',
    pending: 'Kutilmoqda',
  }

  const statusColors: Record<Debtor['status'], string> = {
    active: 'bg-success-100 text-success-700',
    overdue: 'bg-error-100 text-error-700',
    paid: 'bg-muted text-muted-foreground',
    pending: 'bg-warning-100 text-warning-700',
  }

  const filteredAndSortedDebtors = useMemo(() => {
    let filtered = debtors.filter((debtor) => {
      const matchesSearch =
        searchQuery === '' ||
        debtor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        debtor.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        debtor.phone.includes(searchQuery) ||
        debtor.contractNumber.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === 'all' || debtor.status === statusFilter

      return matchesSearch && matchesStatus
    })

    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortField]
        const bValue = b[sortField]

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue)
        }

        return 0
      })
    }

    return filtered
  }, [debtors, searchQuery, statusFilter, sortField, sortDirection])

  const handleSort = (field: keyof Debtor) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('uz-UZ', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount) + ' so\'m'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const SortIcon = ({ field }: { field: keyof Debtor }) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? (
      <ChevronUp className="w-4 h-4 ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 ml-1" />
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Ism, manzil, telefon yoki shartnoma raqami bo'yicha qidirish..."
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

      {/* Status Filter */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg border">
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter('all')}
          >
            Barchasi
          </Button>
          {(['active', 'overdue', 'paid', 'pending'] as const).map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter(status)}
            >
              {statusLabels[status]}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setStatusFilter('all')
              setSearchQuery('')
              setShowFilters(false)
            }}
            className="ml-auto"
          >
            <X className="w-4 h-4 mr-1" />
            Tozalash
          </Button>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Ko'rsatilmoqda: {filteredAndSortedDebtors.length} / {totalCount} ta
        </div>
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer select-none hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Ism
                    <SortIcon field="name" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Manzil
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Telefon
                </th>
                <th
                  className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer select-none hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort('totalDebt')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Jami qarz
                    <SortIcon field="totalDebt" />
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer select-none hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort('paidAmount')}
                >
                  <div className="flex items-center justify-end gap-2">
                    To'langan
                    <SortIcon field="paidAmount" />
                  </div>
                </th>
                <th
                  className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer select-none hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort('remainingDebt')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Qolgan qarz
                    <SortIcon field="remainingDebt" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Holat
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer select-none hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort('dueDate')}
                >
                  <div className="flex items-center gap-2">
                    Muddati
                    <SortIcon field="dueDate" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-card divide-y divide-border">
              {filteredAndSortedDebtors.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-base">Qarzdorlar topilmadi</span>
                      <span className="text-sm">Qidiruv shartlarini o'zgartiring</span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAndSortedDebtors.map((debtor, index) => (
                  <tr
                    key={debtor.id}
                    className={cn(
                      'border-b border-border',
                      index % 2 === 0 ? 'bg-card' : 'bg-muted/20',
                      'hover:bg-muted/40 transition-colors'
                    )}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-sm text-foreground">{debtor.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {debtor.contractNumber}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground max-w-xs">
                      <div className="truncate" title={debtor.address}>
                        {debtor.address}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {debtor.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-financial">
                      {formatCurrency(debtor.totalDebt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-financial amount-positive">
                      {formatCurrency(debtor.paidAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-financial amount-negative">
                      {formatCurrency(debtor.remainingDebt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={cn(
                          'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                          statusColors[debtor.status]
                        )}
                      >
                        {statusLabels[debtor.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {formatDate(debtor.dueDate)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
