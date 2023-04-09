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

export interface IServerCampaign {
  id: number;
  CampaignName: string;
  CampaignDesc: string;
  CampaignHash: string;
  CampaignUrl: string;
  DonationsAmount: number;
  Image: string;
  NonProfitRepID: string;
}
