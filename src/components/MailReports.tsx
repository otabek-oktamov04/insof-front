import { useState, useMemo } from 'react'
import { mockMailReportsData, getMailTotals } from '@/data/mockMailReports'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, TrendingUp, AlertCircle } from 'lucide-react'

const MONTHS = [
  'Yanvar',
  'Fevral',
  'Mart',
  'Aprel',
  'May',
  'Iyun',
  'Iyul',
  'Avgust',
  'Sentabr',
  'Oktyabr',
  'Noyabr',
  'Dekabr',
]

// Get current year and month
const getCurrentYearAndMonth = () => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonthIndex = now.getMonth() // 0-11
  const currentMonth = MONTHS[currentMonthIndex]
  
  // Check if current month exists in data, otherwise use latest available
  const hasCurrentMonth = mockMailReportsData.some(
    (item) => item.year === currentYear && item.month === currentMonth
  )
  
  if (hasCurrentMonth) {
    return { year: currentYear, month: currentMonth }
  }
  
  // Fallback to latest year and month in data
  const latestData = mockMailReportsData.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year
    const monthA = MONTHS.indexOf(a.month)
    const monthB = MONTHS.indexOf(b.month)
    return monthB - monthA
  })[0]
  
  return { year: latestData.year, month: latestData.month }
}

export default function MailReports() {
  const { year: defaultYear, month: defaultMonth } = getCurrentYearAndMonth()
  const [selectedYear, setSelectedYear] = useState<number>(defaultYear)
  const [selectedMonth, setSelectedMonth] = useState<string | 'all'>(defaultMonth)

  // Get unique years from data
  const availableYears = useMemo(() => {
    const years = new Set(mockMailReportsData.map((item) => item.year))
    return Array.from(years).sort((a, b) => b - a)
  }, [])

  // Get available months for selected year
  const availableMonths = useMemo(() => {
    const months = new Set(
      mockMailReportsData.filter((item) => item.year === selectedYear).map((item) => item.month)
    )
    return Array.from(months).sort((a, b) => {
      return MONTHS.indexOf(a) - MONTHS.indexOf(b)
    })
  }, [selectedYear])

  const filteredData = useMemo(() => {
    let data = mockMailReportsData.filter((item) => item.year === selectedYear)
    
    if (selectedMonth !== 'all') {
      data = data.filter((item) => item.month === selectedMonth)
    }
    
    // Sort by month order
    return data.sort((a, b) => {
      return MONTHS.indexOf(a.month) - MONTHS.indexOf(b.month)
    })
  }, [selectedYear, selectedMonth])
  
  // Calculate totals for filtered data
  const totals = useMemo(() => getMailTotals(filteredData), [filteredData])
  
  // Check if showing single month or multiple
  const isSingleMonth = selectedMonth !== 'all' && filteredData.length === 1

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('uz-UZ').format(num)
  }

  const calculatePercentage = (value: number, total: number) => {
    if (total === 0) return 0
    return Math.round((value / total) * 100)
  }
  
  if (filteredData.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12 text-muted-foreground">
          Tanlangan filtrlarda ma'lumot topilmadi
        </div>
      </div>
    )
  }
  
  const sendRate = calculatePercentage(totals.sent, totals.needed)

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Pochta Hisobotlari</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {selectedMonth === 'all' 
              ? `${selectedYear} yil statistikasi` 
              : `${selectedMonth} ${selectedYear} oyi statistikasi`}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Year Filter */}
          <select
            value={selectedYear}
            onChange={(e) => {
              const newYear = Number(e.target.value)
              setSelectedYear(newYear)
            }}
            className="px-3 py-2 rounded-lg text-sm font-medium border border-border bg-background hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
          >
            {availableYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          {/* Month Filter */}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 rounded-lg text-sm font-medium border border-border bg-background hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
          >
            <option value="all">Barcha oylar</option>
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Simplified Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="banking-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Jami yuborilishi kerak bo'lgan xatlar</CardTitle>
              <Mail className="w-5 h-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2">{formatNumber(totals.needed)}</div>
            <div className="text-sm text-muted-foreground">Jami kerakli xatlar</div>
          </CardContent>
        </Card>

        <Card className="banking-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Yuborilgan</CardTitle>
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2 text-blue-600">{formatNumber(totals.sent)}</div>
            <div className="text-sm text-muted-foreground mb-2">
              Shulardan istemolchiga yuborilgani
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Yuborish foizi</span>
              <span className="text-sm font-semibold">{sendRate}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${sendRate}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="banking-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Yuborilmagan</CardTitle>
              <AlertCircle className="w-5 h-5 text-warning-700" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-2 text-warning-700">
              {formatNumber(totals.notSent)}
            </div>
            <div className="text-sm text-muted-foreground">
              Hatolik sabab yuborilmagan
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Simple Visual Chart */}
      <Card className="banking-card">
        <CardHeader>
          <CardTitle>Statistika</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isSingleMonth ? (
              // Single month view
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{selectedMonth} {selectedYear}</span>
                  <span className="text-muted-foreground">
                    {sendRate}% yuborilgan
                  </span>
                </div>
                <div className="relative w-full h-12 bg-muted rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-primary/10"></div>
                  <div
                    className="absolute left-0 top-0 h-full bg-blue-500 flex items-center justify-end pr-3 transition-all"
                    style={{ width: `${sendRate}%` }}
                  >
                    <span className="text-xs font-medium text-white">
                      {formatNumber(totals.sent)}
                    </span>
                  </div>
                  {totals.notSent > 0 && (
                    <div
                      className="absolute right-0 top-0 h-full bg-warning-500/80 flex items-center justify-start pl-3 transition-all"
                      style={{ width: `${calculatePercentage(totals.notSent, totals.needed)}%` }}
                    >
                      <span className="text-xs font-medium text-white">
                        {formatNumber(totals.notSent)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Multiple months view
              <div className="space-y-3">
                {filteredData.map((item, index) => {
                  const itemSendRate = calculatePercentage(item.mail.sent, item.mail.needed)
                  return (
                    <div key={`${item.month}-${item.year}-${index}`} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.month} {item.year}</span>
                        <span className="text-muted-foreground">
                          {itemSendRate}% yuborilgan
                        </span>
                      </div>
                      <div className="relative w-full h-10 bg-muted rounded-lg overflow-hidden">
                        <div className="absolute inset-0 bg-primary/10"></div>
                        <div
                          className="absolute left-0 top-0 h-full bg-blue-500 flex items-center justify-end pr-2 transition-all"
                          style={{ width: `${itemSendRate}%` }}
                        >
                          {itemSendRate > 15 && (
                            <span className="text-xs font-medium text-white">
                              {formatNumber(item.mail.sent)}
                            </span>
                          )}
                        </div>
                        {item.mail.notSent > 0 && (
                          <div
                            className="absolute right-0 top-0 h-full bg-warning-500/80 flex items-center justify-start pl-2 transition-all"
                            style={{ width: `${calculatePercentage(item.mail.notSent, item.mail.needed)}%` }}
                          >
                            {calculatePercentage(item.mail.notSent, item.mail.needed) > 15 && (
                              <span className="text-xs font-medium text-white">
                                {formatNumber(item.mail.notSent)}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Table */}
      <Card className="banking-card">
        <CardHeader>
          <CardTitle>Batafsil Ma'lumot</CardTitle>
        </CardHeader>
        <CardContent>
          {isSingleMonth ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Jami yuborilishi kerak bo'lgan xatlar</div>
                  <div className="text-lg font-semibold">{formatNumber(totals.needed)}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Yuborilgan</div>
                  <div className="text-lg font-semibold text-blue-600">{formatNumber(totals.sent)}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Yuborilmagan</div>
                  <div className="text-lg font-semibold text-warning-700">
                    {formatNumber(totals.notSent)}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Muvaffaqiyatli</div>
                  <div className="text-lg font-semibold text-success-600">
                    {formatNumber(totals.successful)}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Muvaffaqiyatsiz</div>
                  <div className="text-lg font-semibold text-error-600">
                    {formatNumber(totals.unsuccessful)}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Yuborish foizi</div>
                  <div className="text-lg font-semibold">{sendRate}%</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted/30 border-b-2 border-border">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">
                      Oy
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">
                      Kerakli
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">
                      Yuborilgan
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">
                      Yuborilmagan
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">
                      Muvaffaqiyatli
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">
                      Muvaffaqiyatsiz
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">
                      Yuborish %
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredData.map((item, index) => {
                    const itemSendRate = calculatePercentage(item.mail.sent, item.mail.needed)
                    return (
                      <tr
                        key={`${item.month}-${item.year}-${index}`}
                        className={index % 2 === 0 ? 'bg-card' : 'bg-muted/20'}
                      >
                        <td className="px-4 py-3 font-medium text-sm">{item.month}</td>
                        <td className="px-4 py-3 text-sm text-right font-semibold">
                          {formatNumber(item.mail.needed)}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-blue-600 font-medium">
                          {formatNumber(item.mail.sent)}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-warning-700 font-medium">
                          {formatNumber(item.mail.notSent)}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-success-600 font-medium">
                          {formatNumber(item.mail.successful)}
                        </td>
                        <td className="px-4 py-3 text-sm text-right text-error-600 font-medium">
                          {formatNumber(item.mail.unsuccessful)}
                        </td>
                        <td className="px-4 py-3 text-sm text-right font-medium">
                          {itemSendRate}%
                        </td>
                      </tr>
                    )
                  })}
                  <tr className="bg-primary/5 font-semibold border-t-2 border-primary">
                    <td className="px-4 py-3 text-sm">JAMI</td>
                    <td className="px-4 py-3 text-sm text-right">{formatNumber(totals.needed)}</td>
                    <td className="px-4 py-3 text-sm text-right text-blue-600">{formatNumber(totals.sent)}</td>
                    <td className="px-4 py-3 text-sm text-right text-warning-700">{formatNumber(totals.notSent)}</td>
                    <td className="px-4 py-3 text-sm text-right text-success-600">{formatNumber(totals.successful)}</td>
                    <td className="px-4 py-3 text-sm text-right text-error-600">{formatNumber(totals.unsuccessful)}</td>
                    <td className="px-4 py-3 text-sm text-right">{sendRate}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
