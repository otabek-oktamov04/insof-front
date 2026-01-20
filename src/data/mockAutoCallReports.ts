export interface AutoCallReportData {
  month: string
  year: number
  autoCall: {
    needed: number // How many calls we need to make
    made: number // How many we actually made
    notMade: number // How many we couldn't make (lack of info, etc.)
    successful: number // Successfully answered
    unsuccessful: number // Made but not answered/failed
  }
}

export const mockAutoCallReportsData: AutoCallReportData[] = [
  {
    month: 'Yanvar',
    year: 2024,
    autoCall: { needed: 150, made: 120, notMade: 30, successful: 45, unsuccessful: 75 },
  },
  {
    month: 'Fevral',
    year: 2024,
    autoCall: { needed: 180000, made: 165432, notMade: 14568, successful: 82345, unsuccessful: 83087 },
  },
  {
    month: 'Mart',
    year: 2024,
    autoCall: { needed: 175000, made: 162345, notMade: 12655, successful: 78923, unsuccessful: 83422 },
  },
  {
    month: 'Aprel',
    year: 2024,
    autoCall: { needed: 160000, made: 142567, notMade: 17433, successful: 62345, unsuccessful: 80222 },
  },
  {
    month: 'May',
    year: 2024,
    autoCall: { needed: 170000, made: 156789, notMade: 13211, successful: 72345, unsuccessful: 84444 },
  },
  {
    month: 'Iyun',
    year: 2024,
    autoCall: { needed: 155000, made: 138234, notMade: 16766, successful: 61234, unsuccessful: 77000 },
  },
  {
    month: 'Iyul',
    year: 2024,
    autoCall: { needed: 165000, made: 149876, notMade: 15124, successful: 67890, unsuccessful: 81986 },
  },
  {
    month: 'Avgust',
    year: 2024,
    autoCall: { needed: 180000, made: 167890, notMade: 12110, successful: 78901, unsuccessful: 88989 },
  },
  {
    month: 'Sentabr',
    year: 2024,
    autoCall: { needed: 190000, made: 175432, notMade: 14568, successful: 82345, unsuccessful: 93087 },
  },
  {
    month: 'Oktyabr',
    year: 2024,
    autoCall: { needed: 200000, made: 182345, notMade: 17655, successful: 91234, unsuccessful: 91111 },
  },
  {
    month: 'Noyabr',
    year: 2024,
    autoCall: { needed: 185000, made: 171234, notMade: 13766, successful: 80123, unsuccessful: 91111 },
  },
  {
    month: 'Dekabr',
    year: 2024,
    autoCall: { needed: 195000, made: 180567, notMade: 14433, successful: 85678, unsuccessful: 94889 },
  },
  {
    month: 'Yanvar',
    year: 2025,
    autoCall: { needed: 200000, made: 188765, notMade: 11235, successful: 92345, unsuccessful: 96420 },
  },
  {
    month: 'Fevral',
    year: 2025,
    autoCall: { needed: 210000, made: 195432, notMade: 14568, successful: 94567, unsuccessful: 100865 },
  },
  {
    month: 'Mart',
    year: 2025,
    autoCall: { needed: 205000, made: 192345, notMade: 12655, successful: 90123, unsuccessful: 102222 },
  },
]

// Calculate totals
export const getAutoCallTotals = (data: AutoCallReportData[]) => {
  return data.reduce(
    (acc, item) => ({
      needed: acc.needed + item.autoCall.needed,
      made: acc.made + item.autoCall.made,
      notMade: acc.notMade + item.autoCall.notMade,
      successful: acc.successful + item.autoCall.successful,
      unsuccessful: acc.unsuccessful + item.autoCall.unsuccessful,
    }),
    {
      needed: 0,
      made: 0,
      notMade: 0,
      successful: 0,
      unsuccessful: 0,
    }
  )
}
