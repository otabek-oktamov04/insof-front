import { useParams, useNavigate } from 'react-router-dom'
import DashboardLayout from '@/components/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  User,
  MessageSquare,
  PhoneCall,
  Mail as MailIcon,
  CheckCircle2,
  Clock,
  XCircle,
  Send,
  Phone,
  PhoneOff,
  RotateCcw,
} from 'lucide-react'
import { mockDebtors } from '@/data/mockDebtors'
import { mockSMSList } from '@/data/mockSMS'
import { mockCallsList } from '@/data/mockCalls'
import { mockMailList } from '@/data/mockMail'
import { cn } from '@/lib/utils'

export default function DebtorDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const debtor = mockDebtors.find((d) => d.id === id)

  if (!debtor) {
    return (
      <DashboardLayout>
        <div className="w-full flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Qarzdor topilmadi</h2>
            <Button onClick={() => navigate('/dashboard/debtors')}>Qarzdorlar ro'yxatiga qaytish</Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // Filter data by debtorId
  const debtorSMS = mockSMSList.filter((sms) => sms.debtorId === id)
  const debtorCalls = mockCallsList.filter((call) => call.debtorId === id)
  const debtorMail = mockMailList.filter((mail) => mail.debtorId === id)

  // Calculate statistics
  const totalSMS = debtorSMS.length
  const successfulSMS = debtorSMS.filter((sms) => sms.status === 'delivered').length
  const totalCalls = debtorCalls.length
  const totalEmails = debtorMail.length

  const statusLabels: Record<typeof debtor.status, string> = {
    active: 'Faol',
    overdue: 'Muddati o\'tgan',
    paid: 'To\'langan',
    pending: 'Kutilmoqda',
  }

  const statusColors: Record<typeof debtor.status, string> = {
    active: 'bg-success-100 text-success-700',
    overdue: 'bg-error-100 text-error-700',
    paid: 'bg-muted text-muted-foreground',
    pending: 'bg-warning-100 text-warning-700',
  }

  // SMS status labels and colors
  const smsStatusLabels: Record<'sent' | 'delivered' | 'failed' | 'pending', string> = {
    sent: 'Yuborilgan',
    delivered: 'Yetkazilgan',
    failed: 'Xatolik',
    pending: 'Kutilmoqda',
  }

  const smsStatusColors: Record<'sent' | 'delivered' | 'failed' | 'pending', string> = {
    sent: 'bg-primary/10 text-primary border-primary/20',
    delivered: 'bg-success-50 text-success-700 border-success-200',
    failed: 'bg-error-50 text-error-700 border-error-200',
    pending: 'bg-warning-50 text-warning-700 border-warning-200',
  }

  const smsStatusIcons: Record<'sent' | 'delivered' | 'failed' | 'pending', React.ComponentType<{ className?: string }>> = {
    sent: Send,
    delivered: CheckCircle2,
    failed: XCircle,
    pending: Clock,
  }

  const smsTypeLabels: Record<'payment_reminder' | 'overdue_notice' | 'payment_confirmation' | 'general', string> = {
    payment_reminder: 'To\'lov eslatmasi',
    overdue_notice: 'Muddati o\'tgan',
    payment_confirmation: 'To\'lov tasdiqi',
    general: 'Umumiy',
  }

  const smsTypeColors: Record<'payment_reminder' | 'overdue_notice' | 'payment_confirmation' | 'general', string> = {
    payment_reminder: 'bg-blue-50 text-blue-700 border-blue-200',
    overdue_notice: 'bg-orange-50 text-orange-700 border-orange-200',
    payment_confirmation: 'bg-green-50 text-green-700 border-green-200',
    general: 'bg-gray-50 text-gray-700 border-gray-200',
  }

  // Call status labels and colors
  const callStatusLabels: Record<'completed' | 'answered' | 'no_answer' | 'busy' | 'failed' | 'pending', string> = {
    completed: 'Yakunlangan',
    answered: 'Javob berilgan',
    no_answer: 'Javob berilmagan',
    busy: 'Band',
    failed: 'Xatolik',
    pending: 'Kutilmoqda',
  }

  const callStatusColors: Record<'completed' | 'answered' | 'no_answer' | 'busy' | 'failed' | 'pending', string> = {
    completed: 'bg-success-50 text-success-700 border-success-200',
    answered: 'bg-primary/10 text-primary border-primary/20',
    no_answer: 'bg-warning-50 text-warning-700 border-warning-200',
    busy: 'bg-orange-50 text-orange-700 border-orange-200',
    failed: 'bg-error-50 text-error-700 border-error-200',
    pending: 'bg-muted text-muted-foreground border-border',
  }

  const callStatusIcons: Record<'completed' | 'answered' | 'no_answer' | 'busy' | 'failed' | 'pending', React.ComponentType<{ className?: string }>> = {
    completed: CheckCircle2,
    answered: PhoneCall,
    no_answer: PhoneOff,
    busy: Phone,
    failed: XCircle,
    pending: Clock,
  }

  const callTypeLabels: Record<'payment_reminder' | 'overdue_notice' | 'payment_confirmation' | 'general', string> = {
    payment_reminder: 'To\'lov eslatmasi',
    overdue_notice: 'Muddati o\'tgan',
    payment_confirmation: 'To\'lov tasdiqi',
    general: 'Umumiy',
  }

  const callTypeColors: Record<'payment_reminder' | 'overdue_notice' | 'payment_confirmation' | 'general', string> = {
    payment_reminder: 'bg-blue-50 text-blue-700 border-blue-200',
    overdue_notice: 'bg-orange-50 text-orange-700 border-orange-200',
    payment_confirmation: 'bg-green-50 text-green-700 border-green-200',
    general: 'bg-gray-50 text-gray-700 border-gray-200',
  }

  // Mail status labels and colors
  const mailStatusLabels: Record<'sent' | 'delivered' | 'returned' | 'failed' | 'pending', string> = {
    sent: 'Yuborilgan',
    delivered: 'Yetkazilgan',
    returned: 'Qaytarilgan',
    failed: 'Xatolik',
    pending: 'Kutilmoqda',
  }

  const mailStatusColors: Record<'sent' | 'delivered' | 'returned' | 'failed' | 'pending', string> = {
    sent: 'bg-primary/10 text-primary border-primary/20',
    delivered: 'bg-success-50 text-success-700 border-success-200',
    returned: 'bg-warning-50 text-warning-700 border-warning-200',
    failed: 'bg-error-50 text-error-700 border-error-200',
    pending: 'bg-muted text-muted-foreground border-border',
  }

  const mailStatusIcons: Record<'sent' | 'delivered' | 'returned' | 'failed' | 'pending', React.ComponentType<{ className?: string }>> = {
    sent: MailIcon,
    delivered: CheckCircle2,
    returned: RotateCcw,
    failed: XCircle,
    pending: Clock,
  }

  const mailTypeLabels: Record<'payment_reminder' | 'overdue_notice' | 'payment_confirmation' | 'general', string> = {
    payment_reminder: 'To\'lov eslatmasi',
    overdue_notice: 'Muddati o\'tgan',
    payment_confirmation: 'To\'lov tasdiqi',
    general: 'Umumiy',
  }

  const mailTypeColors: Record<'payment_reminder' | 'overdue_notice' | 'payment_confirmation' | 'general', string> = {
    payment_reminder: 'bg-blue-50 text-blue-700 border-blue-200',
    overdue_notice: 'bg-orange-50 text-orange-700 border-orange-200',
    payment_confirmation: 'bg-green-50 text-green-700 border-green-200',
    general: 'bg-gray-50 text-gray-700 border-gray-200',
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
      month: 'long',
      day: 'numeric',
    })
  }

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

  const formatDuration = (seconds?: number) => {
    if (!seconds || seconds === 0) return '-'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <DashboardLayout>
      <div className="w-full space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/debtors')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-title1 mb-1">{debtor.name}</h1>
              <p className="text-body text-muted-foreground">Qarzdor ma'lumotlari va faoliyati</p>
            </div>
          </div>
        </div>

        {/* Debtor Information */}
        <Card className="banking-card">
          <CardHeader>
            <CardTitle>Asosiy ma'lumotlar</CardTitle>
            <CardDescription>Qarzdorning barcha asosiy ma'lumotlari</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">To'liq ism</label>
                  <p className="text-base font-semibold mt-1">{debtor.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Manzil</label>
                  <p className="text-base mt-1">{debtor.address}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Telefon</label>
                  <p className="text-base mt-1">{debtor.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-base mt-1">{debtor.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Shartnoma raqami</label>
                  <p className="text-base font-semibold mt-1">{debtor.contractNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Holat</label>
                  <div className="mt-1">
                    <span
                      className={cn(
                        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                        statusColors[debtor.status]
                      )}
                    >
                      {statusLabels[debtor.status]}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Oxirgi to'lov sanasi</label>
                  <p className="text-base mt-1">{formatDate(debtor.lastPaymentDate)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Muddati</label>
                  <p className="text-base mt-1">{formatDate(debtor.dueDate)}</p>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Moliyaviy ma'lumotlar</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <label className="text-sm font-medium text-muted-foreground">Jami qarz</label>
                  <p className="text-xl font-bold text-financial mt-2">{formatCurrency(debtor.totalDebt)}</p>
                </div>
                <div className="p-4 bg-success-50 rounded-lg">
                  <label className="text-sm font-medium text-muted-foreground">To'langan</label>
                  <p className="text-xl font-bold text-success-700 mt-2">{formatCurrency(debtor.paidAmount)}</p>
                </div>
                <div className="p-4 bg-error-50 rounded-lg">
                  <label className="text-sm font-medium text-muted-foreground">Qolgan qarz</label>
                  <p className="text-xl font-bold text-error-700 mt-2">{formatCurrency(debtor.remainingDebt)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="banking-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Jami SMS</p>
                  <p className="text-2xl font-bold">{totalSMS}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="banking-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Muvaffaqiyatli SMS</p>
                  <p className="text-2xl font-bold text-success-700">{successfulSMS}</p>
                  {totalSMS > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.round((successfulSMS / totalSMS) * 100)}% muvaffaqiyat
                    </p>
                  )}
                </div>
                <div className="w-12 h-12 rounded-lg bg-success-100 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-success-700" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="banking-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Avtozvon qo'ng'iroqlari</p>
                  <p className="text-2xl font-bold">{totalCalls}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <PhoneCall className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="banking-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Yuborilgan xatlar</p>
                  <p className="text-2xl font-bold">{totalEmails}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MailIcon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SMS Table */}
        <Card className="banking-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  SMS Xabarlari
                </CardTitle>
                <CardDescription>{debtorSMS.length} ta SMS yuborilgan</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {debtorSMS.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-base font-medium">SMS xabarlari yo'q</p>
                <p className="text-sm mt-1">Bu qarzdor uchun hali SMS yuborilmagan</p>
              </div>
            ) : (
              <div className="border border-border rounded-lg overflow-hidden bg-card">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/30 border-b border-border">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Xabar
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Turi
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Holat
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Yuborilgan vaqti
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Yetkazilgan vaqti
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-border">
                      {debtorSMS.map((sms, index) => {
                        const StatusIcon = smsStatusIcons[sms.status]
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
                              <div className="text-sm text-foreground line-clamp-2 max-w-md" title={sms.message}>
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
                                  smsTypeColors[sms.type]
                                )}
                              >
                                {smsTypeLabels[sms.type]}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={cn(
                                  'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border',
                                  smsStatusColors[sms.status]
                                )}
                              >
                                <StatusIcon className="w-3.5 h-3.5" />
                                {smsStatusLabels[sms.status]}
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
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Calls Table */}
        <Card className="banking-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <PhoneCall className="w-5 h-5" />
                  Avtozvon qo'ng'iroqlari
                </CardTitle>
                <CardDescription>{debtorCalls.length} ta qo'ng'iroq amalga oshirilgan</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {debtorCalls.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground">
                <PhoneCall className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-base font-medium">Qo'ng'iroqlar yo'q</p>
                <p className="text-sm mt-1">Bu qarzdor uchun hali avtozvon qo'ng'iroqlari amalga oshirilmagan</p>
              </div>
            ) : (
              <div className="border border-border rounded-lg overflow-hidden bg-card">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/30 border-b border-border">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Turi
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Holat
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Davomiyligi
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Qo'ng'iroq vaqti
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Javob berilgan vaqti
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-border">
                      {debtorCalls.map((call, index) => {
                        const StatusIcon = callStatusIcons[call.status]
                        return (
                          <tr
                            key={call.id}
                            className={cn(
                              'border-b border-border',
                              index % 2 === 0 ? 'bg-card' : 'bg-muted/20',
                              'hover:bg-muted/40 transition-colors'
                            )}
                          >
                            <td className="px-6 py-4">
                              <div>
                                <span
                                  className={cn(
                                    'inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-semibold border',
                                    callTypeColors[call.type]
                                  )}
                                >
                                  {callTypeLabels[call.type]}
                                </span>
                                {call.amount && (
                                  <div className="text-xs font-semibold text-primary mt-1.5">
                                    {formatCurrency(call.amount)}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={cn(
                                  'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border',
                                  callStatusColors[call.status]
                                )}
                              >
                                <StatusIcon className="w-3.5 h-3.5" />
                                {callStatusLabels[call.status]}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                              {formatDuration(call.duration)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                              {formatDateTime(call.callDate)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                              {call.answeredDate ? formatDateTime(call.answeredDate) : '-'}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Mail Table */}
        <Card className="banking-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MailIcon className="w-5 h-5" />
                  Pochta xatlari
                </CardTitle>
                <CardDescription>{debtorMail.length} ta xat yuborilgan</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {debtorMail.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground">
                <MailIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-base font-medium">Xatlar yo'q</p>
                <p className="text-sm mt-1">Bu qarzdor uchun hali pochta xatlari yuborilmagan</p>
              </div>
            ) : (
              <div className="border border-border rounded-lg overflow-hidden bg-card">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted/30 border-b border-border">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Manzil
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Turi
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Holat
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Yuborilgan vaqti
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Yetkazilgan vaqti
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          Kuzatuv raqami
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-card divide-y divide-border">
                      {debtorMail.map((mail, index) => {
                        const StatusIcon = mailStatusIcons[mail.status]
                        return (
                          <tr
                            key={mail.id}
                            className={cn(
                              'border-b border-border',
                              index % 2 === 0 ? 'bg-card' : 'bg-muted/20',
                              'hover:bg-muted/40 transition-colors'
                            )}
                          >
                            <td className="px-6 py-4">
                              <div className="text-sm text-foreground line-clamp-2 max-w-sm" title={mail.recipientAddress}>
                                {mail.recipientAddress}
                              </div>
                              {mail.amount && (
                                <div className="text-xs font-semibold text-primary mt-1.5">
                                  {formatCurrency(mail.amount)}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={cn(
                                  'inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-semibold border',
                                  mailTypeColors[mail.type]
                                )}
                              >
                                {mailTypeLabels[mail.type]}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={cn(
                                  'inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border',
                                  mailStatusColors[mail.status]
                                )}
                              >
                                <StatusIcon className="w-3.5 h-3.5" />
                                {mailStatusLabels[mail.status]}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                              {formatDateTime(mail.sentDate)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                              {mail.deliveredDate ? formatDateTime(mail.deliveredDate) : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                              {mail.trackingNumber || '-'}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
