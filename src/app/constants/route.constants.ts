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

export const sidebarItems = {
  home: { title: 'Home', route: '' },
  about: { title: 'About', route: '/about' },
  contact: { title: 'Contact Us', route: '/contact-us' },
  logout: { title: 'Logout' },
};
