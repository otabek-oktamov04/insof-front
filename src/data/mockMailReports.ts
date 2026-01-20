export interface MailReportData {
  month: string
  year: number
  mail: {
    needed: number // How many mails we need to send
    sent: number // How many we actually sent
    notSent: number // How many we couldn't send (lack of info, etc.)
    successful: number // Successfully delivered
    unsuccessful: number // Sent but failed/returned
  }
}

export const mockMailReportsData: MailReportData[] = [
  {
    month: 'Yanvar',
    year: 2024,
    mail: { needed: 50, sent: 45, notSent: 5, successful: 42, unsuccessful: 3 },
  },
  {
    month: 'Fevral',
    year: 2024,
    mail: { needed: 12000, sent: 11234, notSent: 766, successful: 10567, unsuccessful: 667 },
  },
  {
    month: 'Mart',
    year: 2024,
    mail: { needed: 11500, sent: 10890, notSent: 610, successful: 10234, unsuccessful: 656 },
  },
  {
    month: 'Aprel',
    year: 2024,
    mail: { needed: 10500, sent: 9876, notSent: 624, successful: 9234, unsuccessful: 642 },
  },
  {
    month: 'May',
    year: 2024,
    mail: { needed: 11000, sent: 10345, notSent: 655, successful: 9765, unsuccessful: 580 },
  },
  {
    month: 'Iyun',
    year: 2024,
    mail: { needed: 10000, sent: 9456, notSent: 544, successful: 8901, unsuccessful: 555 },
  },
  {
    month: 'Iyul',
    year: 2024,
    mail: { needed: 10800, sent: 10123, notSent: 677, successful: 9567, unsuccessful: 556 },
  },
  {
    month: 'Avgust',
    year: 2024,
    mail: { needed: 12000, sent: 11345, notSent: 655, successful: 10678, unsuccessful: 667 },
  },
  {
    month: 'Sentabr',
    year: 2024,
    mail: { needed: 12500, sent: 11890, notSent: 610, successful: 11234, unsuccessful: 656 },
  },
  {
    month: 'Oktyabr',
    year: 2024,
    mail: { needed: 13000, sent: 12345, notSent: 655, successful: 11678, unsuccessful: 667 },
  },
  {
    month: 'Noyabr',
    year: 2024,
    mail: { needed: 11800, sent: 11123, notSent: 677, successful: 10567, unsuccessful: 556 },
  },
  {
    month: 'Dekabr',
    year: 2024,
    mail: { needed: 12800, sent: 12134, notSent: 666, successful: 11456, unsuccessful: 678 },
  },
  {
    month: 'Yanvar',
    year: 2025,
    mail: { needed: 13500, sent: 12890, notSent: 610, successful: 12234, unsuccessful: 656 },
  },
  {
    month: 'Fevral',
    year: 2025,
    mail: { needed: 14000, sent: 13345, notSent: 655, successful: 12678, unsuccessful: 667 },
  },
  {
    month: 'Mart',
    year: 2025,
    mail: { needed: 13200, sent: 12567, notSent: 633, successful: 11901, unsuccessful: 666 },
  },
]

// Calculate totals
export const getMailTotals = (data: MailReportData[]) => {
  return data.reduce(
    (acc, item) => ({
      needed: acc.needed + item.mail.needed,
      sent: acc.sent + item.mail.sent,
      notSent: acc.notSent + item.mail.notSent,
      successful: acc.successful + item.mail.successful,
      unsuccessful: acc.unsuccessful + item.mail.unsuccessful,
    }),
    {
      needed: 0,
      sent: 0,
      notSent: 0,
      successful: 0,
      unsuccessful: 0,
    }
  )
}
