export interface ICampaign {
  id: number;
  campaignName: string;
  campaignDesc: string;
  campaignHash: string;
  campaignUrl: string;
  donationsAmount: number;
  image: string;
  nonProfitRepID: string;
  [key: string]: any; // This is allowing to access any property of the object
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
