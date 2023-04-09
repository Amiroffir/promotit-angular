export interface IReportItem {
  header: string;
  content: string;
}
export const campaignReportTemplate: IReportItem[] = [
  {
    header: 'Campaign Name',
    content: 'campaignName',
  },
  {
    header: 'Campaign Hash',
    content: 'campaignHash',
  },
  {
    header: 'By',
    content: 'nonProfitRepID',
  },
  {
    header: 'Website',
    content: 'campaignUrl',
  },
];

export const userReportTemplate: IReportItem[] = [
  {
    header: 'User Type',
    content: 'userType',
  },
  {
    header: 'Full Name',
    content: 'fullName',
  },
  {
    header: 'Email',
    content: 'email',
  },
];

export const tweetReportTemplate: IReportItem[] = [
  {
    header: 'Handle',
    content: 'handle',
  },
  {
    header: 'Type',
    content: 'type',
  },
  {
    header: 'Tweets Count',
    content: 'tweetsCount',
  },
];

export const deliveryReportTemplate: IReportItem[] = [
  {
    header: 'Product ID',
    content: 'pid',
  },
  {
    header: 'Full Name',
    content: 'fullName',
  },
  {
    header: 'Email',
    content: 'email',
  },
  {
    header: 'Address',
    content: 'address',
  },
  {
    header: 'Phone',
    content: 'phone',
  },
];
