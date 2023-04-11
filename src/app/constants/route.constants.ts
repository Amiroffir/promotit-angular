export enum AppRoutes {
  userNavigator = '',
  about = '/about',
  contactUs = '/contact-us',
  admin = 'admin',
  nonProfit = 'non-profit',
  socialActivist = 'social-activist',
  businessOwner = 'business-owner',
  unauthorized = 'unauthorized',
  thankYou = 'thank-you',
  getRole = 'get-role',
}

export const sidebarItems = {
  home: { title: 'Home', route: '' },
  about: { title: 'About', route: AppRoutes.about },
  contact: { title: 'Contact Us', route: AppRoutes.contactUs },
  logout: { title: 'Logout' },
};
