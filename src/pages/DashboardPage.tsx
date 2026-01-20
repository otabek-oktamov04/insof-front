import React, { useMemo } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, Phone, Mail } from 'lucide-react'
import { mockReportsData, getTotals } from '@/data/mockReports'
import { mockAutoCallReportsData, getAutoCallTotals } from '@/data/mockAutoCallReports'
import { mockMailReportsData, getMailTotals } from '@/data/mockMailReports'

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

export default function DashboardPage() {
  // Calculate totals for all data
  const smsTotals = useMemo(() => getTotals(mockReportsData), [])
  const autoCallTotals = useMemo(() => getAutoCallTotals(mockAutoCallReportsData), [])
  const mailTotals = useMemo(() => getMailTotals(mockMailReportsData), [])

  // Get all years from data
  const allYears = useMemo(() => {
    const years = new Set([
      ...mockReportsData.map((item) => item.year),
      ...mockAutoCallReportsData.map((item) => item.year),
      ...mockMailReportsData.map((item) => item.year),
    ])
    return Array.from(years).sort((a, b) => b - a)
  }, [])

  // Combine all data by month/year
  const combinedData = useMemo(() => {
    const dataMap = new Map<string, {
      month: string
      year: number
      sms: { total: number; successful: number; unsuccessful: number }
      autoCall: { total: number; successful: number; unsuccessful: number }
      mail: { total: number; successful: number; unsuccessful: number }
    }>()

    // Process SMS data
    mockReportsData.forEach((item) => {
      const key = `${item.year}-${item.month}`
      if (!dataMap.has(key)) {
        dataMap.set(key, {
          month: item.month,
          year: item.year,
          sms: { total: 0, successful: 0, unsuccessful: 0 },
          autoCall: { total: 0, successful: 0, unsuccessful: 0 },
          mail: { total: 0, successful: 0, unsuccessful: 0 },
        })
      }
      const data = dataMap.get(key)!
      data.sms = {
        total: item.sms.sent, // Use sent as total (not needed)
        successful: item.sms.successful,
        unsuccessful: item.sms.unsuccessful,
      }
    })

    // Process AutoCall data
    mockAutoCallReportsData.forEach((item) => {
      const key = `${item.year}-${item.month}`
      if (!dataMap.has(key)) {
        dataMap.set(key, {
          month: item.month,
          year: item.year,
          sms: { total: 0, successful: 0, unsuccessful: 0 },
          autoCall: { total: 0, successful: 0, unsuccessful: 0 },
          mail: { total: 0, successful: 0, unsuccessful: 0 },
        })
      }
      const data = dataMap.get(key)!
      data.autoCall = {
        total: item.autoCall.made,
        successful: item.autoCall.successful,
        unsuccessful: item.autoCall.unsuccessful,
      }
    })

    // Process Mail data
    mockMailReportsData.forEach((item) => {
      const key = `${item.year}-${item.month}`
      if (!dataMap.has(key)) {
        dataMap.set(key, {
          month: item.month,
          year: item.year,
          sms: { total: 0, successful: 0, unsuccessful: 0 },
          autoCall: { total: 0, successful: 0, unsuccessful: 0 },
          mail: { total: 0, successful: 0, unsuccessful: 0 },
        })
      }
      const data = dataMap.get(key)!
      data.mail = {
        total: item.mail.sent,
        successful: item.mail.successful,
        unsuccessful: item.mail.unsuccessful,
      }
    })

    // Sort by year and month
    return Array.from(dataMap.values()).sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year
      return MONTHS.indexOf(b.month) - MONTHS.indexOf(a.month)
    })
  }, [])

  // Group by year
  const dataByYear = useMemo(() => {
    const grouped: Record<number, typeof combinedData> = {}
    combinedData.forEach((item) => {
      if (!grouped[item.year]) {
        grouped[item.year] = []
      }
      grouped[item.year].push(item)
    })
    return grouped
  }, [combinedData])

  // Calculate totals by year
  const totalsByYear = useMemo(() => {
    const totals: Record<number, {
      sms: { total: number; successful: number; unsuccessful: number }
      autoCall: { total: number; successful: number; unsuccessful: number }
      mail: { total: number; successful: number; unsuccessful: number }
    }> = {}

    Object.keys(dataByYear).forEach((yearStr) => {
      const year = Number(yearStr)
      const yearData = dataByYear[year]
      totals[year] = {
        sms: {
          total: yearData.reduce((sum, item) => sum + item.sms.total, 0),
          successful: yearData.reduce((sum, item) => sum + item.sms.successful, 0),
          unsuccessful: yearData.reduce((sum, item) => sum + item.sms.unsuccessful, 0),
        },
        autoCall: {
          total: yearData.reduce((sum, item) => sum + item.autoCall.total, 0),
          successful: yearData.reduce((sum, item) => sum + item.autoCall.successful, 0),
          unsuccessful: yearData.reduce((sum, item) => sum + item.autoCall.unsuccessful, 0),
        },
        mail: {
          total: yearData.reduce((sum, item) => sum + item.mail.total, 0),
          successful: yearData.reduce((sum, item) => sum + item.mail.successful, 0),
          unsuccessful: yearData.reduce((sum, item) => sum + item.mail.unsuccessful, 0),
        },
      }
    })
    return totals
  }, [dataByYear])

  // Overall totals
  const overallTotals = useMemo(() => {
    return {
      sms: {
        total: smsTotals.sent, // Use sent as total
        successful: smsTotals.successful,
        unsuccessful: smsTotals.unsuccessful,
      },
      autoCall: {
        total: autoCallTotals.made,
        successful: autoCallTotals.successful,
        unsuccessful: autoCallTotals.unsuccessful,
      },
      mail: {
        total: mailTotals.sent,
        successful: mailTotals.successful,
        unsuccessful: mailTotals.unsuccessful,
      },
    }
  }, [smsTotals, autoCallTotals, mailTotals])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('uz-UZ').format(num)
  }

  return (
    <DashboardLayout>
      <div className="w-full space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Boshqaruv Paneli</h1>
        <p className="text-sm text-muted-foreground mt-1">
          SMS, Avtozvon va Pochta statistikasi
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="banking-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">SMS Xabarnomalari</CardTitle>
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <div className="text-2xl font-bold">{formatNumber(overallTotals.sms.total)}</div>
                <div className="text-xs text-muted-foreground">Jami</div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                <div>
                  <div className="text-sm font-semibold text-success-600">
                    {formatNumber(overallTotals.sms.successful)}
                  </div>
                  <div className="text-xs text-muted-foreground">Muvaffaqiyatli</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-error-600">
                    {formatNumber(overallTotals.sms.unsuccessful)}
                  </div>
                  <div className="text-xs text-muted-foreground">Muvaffaqiyatsiz</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="banking-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Avtozvon</CardTitle>
              <Phone className="w-5 h-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <div className="text-2xl font-bold">{formatNumber(overallTotals.autoCall.total)}</div>
                <div className="text-xs text-muted-foreground">Jami</div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                <div>
                  <div className="text-sm font-semibold text-success-600">
                    {formatNumber(overallTotals.autoCall.successful)}
                  </div>
                  <div className="text-xs text-muted-foreground">Muvaffaqiyatli</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-error-600">
                    {formatNumber(overallTotals.autoCall.unsuccessful)}
                  </div>
                  <div className="text-xs text-muted-foreground">Muvaffaqiyatsiz</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="banking-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Yuborilgan Xatlar</CardTitle>
              <Mail className="w-5 h-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <div className="text-2xl font-bold">{formatNumber(overallTotals.mail.total)}</div>
                <div className="text-xs text-muted-foreground">Jami</div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                <div>
                  <div className="text-sm font-semibold text-success-600">
                    {formatNumber(overallTotals.mail.successful)}
                  </div>
                  <div className="text-xs text-muted-foreground">Muvaffaqiyatli</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-error-600">
                    {formatNumber(overallTotals.mail.unsuccessful)}
                  </div>
                  <div className="text-xs text-muted-foreground">Muvaffaqiyatsiz</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Table */}
      <Card className="banking-card">
        <CardHeader>
          <CardTitle>Batafsil Statistikalar</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            SMS xabarnomalari, Avtozvon va Yuborilgan xatlar bo'yicha oylik ma'lumotlar
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/30 border-b-2 border-border">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">
                    №
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">
                    Oy/Yil
                  </th>
                  <th colSpan={3} className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase border-l border-border">
                    SMS Xabarnomalari
                  </th>
                  <th colSpan={3} className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase border-l border-border">
                    Avtozvon
                  </th>
                  <th colSpan={3} className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase border-l border-border">
                    Yuborilgan Xatlar
                  </th>
                </tr>
                <tr className="bg-muted/20 border-b border-border">
                  <th className="px-4 py-2"></th>
                  <th className="px-4 py-2"></th>
                  <th className="px-3 py-2 text-xs font-medium text-muted-foreground">Jami</th>
                  <th className="px-3 py-2 text-xs font-medium text-muted-foreground">Muvaffaqiyatli</th>
                  <th className="px-3 py-2 text-xs font-medium text-muted-foreground">Muvaffaqiyatsiz</th>
                  <th className="px-3 py-2 text-xs font-medium text-muted-foreground border-l border-border">Jami</th>
                  <th className="px-3 py-2 text-xs font-medium text-muted-foreground">Muvaffaqiyatli</th>
                  <th className="px-3 py-2 text-xs font-medium text-muted-foreground">Muvaffaqiyatsiz</th>
                  <th className="px-3 py-2 text-xs font-medium text-muted-foreground border-l border-border">Jami</th>
                  <th className="px-3 py-2 text-xs font-medium text-muted-foreground">Muvaffaqiyatli</th>
                  <th className="px-3 py-2 text-xs font-medium text-muted-foreground">Muvaffaqiyatsiz</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {(() => {
                  let rowNumber = 0
                  return allYears.map((year) => {
                    const yearData = dataByYear[year] || []
                    const yearTotals = totalsByYear[year]
                    
                    return (
                      <React.Fragment key={year}>
                        {yearData.map((item) => {
                          rowNumber++
                          return (
                            <tr
                              key={`${item.year}-${item.month}`}
                              className={rowNumber % 2 === 0 ? 'bg-card' : 'bg-muted/20'}
                            >
                              <td className="px-4 py-3 text-sm text-muted-foreground">
                                {rowNumber}
                              </td>
                              <td className="px-4 py-3 font-medium text-sm">
                                {item.month} {item.year}
                              </td>
                              <td className="px-3 py-3 text-sm text-right font-semibold">
                                {formatNumber(item.sms.total)}
                              </td>
                              <td className="px-3 py-3 text-sm text-right text-success-600">
                                {formatNumber(item.sms.successful)}
                              </td>
                              <td className="px-3 py-3 text-sm text-right text-error-600">
                                {formatNumber(item.sms.unsuccessful)}
                              </td>
                              <td className="px-3 py-3 text-sm text-right font-semibold border-l border-border">
                                {formatNumber(item.autoCall.total)}
                              </td>
                              <td className="px-3 py-3 text-sm text-right text-success-600">
                                {formatNumber(item.autoCall.successful)}
                              </td>
                              <td className="px-3 py-3 text-sm text-right text-error-600">
                                {formatNumber(item.autoCall.unsuccessful)}
                              </td>
                              <td className="px-3 py-3 text-sm text-right font-semibold border-l border-border">
                                {formatNumber(item.mail.total)}
                              </td>
                              <td className="px-3 py-3 text-sm text-right text-success-600">
                                {formatNumber(item.mail.successful)}
                              </td>
                              <td className="px-3 py-3 text-sm text-right text-error-600">
                                {formatNumber(item.mail.unsuccessful)}
                              </td>
                            </tr>
                          )
                        })}
                        {/* Year Total Row */}
                        {yearTotals && (
                          <tr className="bg-primary/5 font-semibold border-t-2 border-primary">
                            <td className="px-4 py-3 text-sm" colSpan={2}>
                              {year} yil jami
                            </td>
                            <td className="px-3 py-3 text-sm text-right">
                              {formatNumber(yearTotals.sms.total)}
                            </td>
                            <td className="px-3 py-3 text-sm text-right text-success-600">
                              {formatNumber(yearTotals.sms.successful)}
                            </td>
                            <td className="px-3 py-3 text-sm text-right text-error-600">
                              {formatNumber(yearTotals.sms.unsuccessful)}
                            </td>
                            <td className="px-3 py-3 text-sm text-right border-l border-border">
                              {formatNumber(yearTotals.autoCall.total)}
                            </td>
                            <td className="px-3 py-3 text-sm text-right text-success-600">
                              {formatNumber(yearTotals.autoCall.successful)}
                            </td>
                            <td className="px-3 py-3 text-sm text-right text-error-600">
                              {formatNumber(yearTotals.autoCall.unsuccessful)}
                            </td>
                            <td className="px-3 py-3 text-sm text-right border-l border-border">
                              {formatNumber(yearTotals.mail.total)}
                            </td>
                            <td className="px-3 py-3 text-sm text-right text-success-600">
                              {formatNumber(yearTotals.mail.successful)}
                            </td>
                            <td className="px-3 py-3 text-sm text-right text-error-600">
                              {formatNumber(yearTotals.mail.unsuccessful)}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    )
                  })
                })()}
                {/* Overall Total Row */}
                <tr className="bg-primary/10 font-bold border-t-4 border-primary">
                  <td className="px-4 py-4 text-sm" colSpan={2}>
                    2024-2025 yil jami
                  </td>
                  <td className="px-3 py-4 text-sm text-right">
                    {formatNumber(overallTotals.sms.total)}
                  </td>
                  <td className="px-3 py-4 text-sm text-right text-success-600">
                    {formatNumber(overallTotals.sms.successful)}
                  </td>
                  <td className="px-3 py-4 text-sm text-right text-error-600">
                    {formatNumber(overallTotals.sms.unsuccessful)}
                  </td>
                  <td className="px-3 py-4 text-sm text-right border-l border-border">
                    {formatNumber(overallTotals.autoCall.total)}
                  </td>
                  <td className="px-3 py-4 text-sm text-right text-success-600">
                    {formatNumber(overallTotals.autoCall.successful)}
                  </td>
                  <td className="px-3 py-4 text-sm text-right text-error-600">
                    {formatNumber(overallTotals.autoCall.unsuccessful)}
                  </td>
                  <td className="px-3 py-4 text-sm text-right border-l border-border">
                    {formatNumber(overallTotals.mail.total)}
                  </td>
                  <td className="px-3 py-4 text-sm text-right text-success-600">
                    {formatNumber(overallTotals.mail.successful)}
                  </td>
                  <td className="px-3 py-4 text-sm text-right text-error-600">
                    {formatNumber(overallTotals.mail.unsuccessful)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      </div>
    </DashboardLayout>
  )
}
