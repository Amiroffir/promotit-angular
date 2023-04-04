export interface ICampaign {
  id: number;
  campaignName: string;
  campaignDesc: string;
  campaignHash: string;
  campaignUrl: string;
  donationsAmount: number;
  image: string;
  nonProfitRepID: string;
  [key: string]: any;
}
