export interface ReportData {
  month: string
  year: number
  sms: {
    needed: number // How many SMS we need to send
    sent: number // How many we actually sent
    notSent: number // How many we couldn't send (lack of info, etc.)
    successful: number // Successfully delivered
    unsuccessful: number // Sent but failed
  }
}

export const mockReportsData: ReportData[] = [
  {
    month: 'Yanvar',
    year: 2024,
    sms: { needed: 100, sent: 75, notSent: 25, successful: 63, unsuccessful: 12 },
  },
  {
    month: 'Fevral',
    year: 2024,
    sms: { needed: 250000, sent: 231638, notSent: 18362, successful: 220987, unsuccessful: 10651 },
  },
  {
    month: 'Mart',
    year: 2024,
    sms: { needed: 250000, sent: 235856, notSent: 14144, successful: 224489, unsuccessful: 11367 },
  },
  {
    month: 'Aprel',
    year: 2024,
    sms: { needed: 200000, sent: 125750, notSent: 74250, successful: 67900, unsuccessful: 57850 },
  },
  {
    month: 'May',
    year: 2024,
    sms: { needed: 250000, sent: 208647, notSent: 41353, successful: 167606, unsuccessful: 41041 },
  },
  {
    month: 'Iyun',
    year: 2024,
    sms: { needed: 150000, sent: 106230, notSent: 43770, successful: 83638, unsuccessful: 22592 },
  },
  {
    month: 'Iyul',
    year: 2024,
    sms: { needed: 180000, sent: 131329, notSent: 48671, successful: 96823, unsuccessful: 34506 },
  },
  {
    month: 'Avgust',
    year: 2024,
    sms: { needed: 280000, sent: 218691, notSent: 61309, successful: 164935, unsuccessful: 53756 },
  },
  {
    month: 'Sentabr',
    year: 2024,
    sms: { needed: 320000, sent: 239827, notSent: 80173, successful: 166813, unsuccessful: 73014 },
  },
  {
    month: 'Oktyabr',
    year: 2024,
    sms: { needed: 400000, sent: 253133, notSent: 146867, successful: 124437, unsuccessful: 128696 },
  },
  {
    month: 'Noyabr',
    year: 2024,
    sms: { needed: 300000, sent: 240142, notSent: 59858, successful: 176822, unsuccessful: 63320 },
  },
  {
    month: 'Dekabr',
    year: 2024,
    sms: { needed: 400000, sent: 266761, notSent: 133239, successful: 154673, unsuccessful: 112088 },
  },
  {
    month: 'Yanvar',
    year: 2025,
    sms: { needed: 350000, sent: 278508, notSent: 71492, successful: 219516, unsuccessful: 58992 },
  },
  {
    month: 'Fevral',
    year: 2025,
    sms: { needed: 380000, sent: 231228, notSent: 148772, successful: 102179, unsuccessful: 129049 },
  },
  {
    month: 'Mart',
    year: 2025,
    sms: { needed: 350000, sent: 281501, notSent: 68499, successful: 223783, unsuccessful: 57718 },
  },
]

// Calculate totals
export const getTotals = (data: ReportData[]) => {
  return data.reduce(
    (acc, item) => ({
      needed: acc.needed + item.sms.needed,
      sent: acc.sent + item.sms.sent,
      notSent: acc.notSent + item.sms.notSent,
      successful: acc.successful + item.sms.successful,
      unsuccessful: acc.unsuccessful + item.sms.unsuccessful,
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
