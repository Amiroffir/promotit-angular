export interface ISystemUser {
  userType: string;
  userID: number;
  fullName: string;
  email: string;
}

export interface IUserExtendedDetails {
  fullName: string;
  email: string;
  address: string;
  phone: string;
  earningStatus: number;
  twitterHandle: string;
  lastEarningsUpdate: string;
}
