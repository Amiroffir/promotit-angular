import { Observable } from 'rxjs';
import { ITweet } from '../../admin/models/tweet.model';
import { ISystemUser } from '../../admin/models/user.model';
import { ICampaign } from '../../campaigns/models/campaign.model';
import { IDelivery, IProduct } from '../../products/models/product.model';

export interface IReportItem {
  header: string;
  content: string;
}

export type DataObservable = Observable<
  ITweet[] | ICampaign[] | IDelivery[] | ISystemUser[]
>;

export type ObservableCardItems = Observable<(ICampaign | IProduct)[]>; //This is a fix for the error: Type 'Observable<ICampaign[] | IProduct[]>' is not assignable to type '(ICampaign[] & NgIterable<ICampaign>) | null | undefined'. Which is probably a bug in the Angular compiler as for my understanding.

export type CardDetails = IProduct | ICampaign | null;

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
