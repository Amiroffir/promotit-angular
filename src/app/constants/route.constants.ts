export enum AppRoutes {
  userNavigator = '',
  admin = 'admin',
  nonProfit = 'non-profit',
  socialActivist = 'social-activist',
  businessOwner = 'business-owner',
  unauthorized = 'unauthorized',
  thankYou = 'thank-you',
  getRole = 'get-role',
}

export interface ISidebarItem {
  name: string;
  route: string;
  icon?: string;
}
