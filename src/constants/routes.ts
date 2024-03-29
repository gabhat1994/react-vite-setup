const ROUTES = {
  LOGIN: '/login',
  COOKIE_POLICY: '/cookie-policy',
  ADMIN_LOGIN: '/admin-login',
  ACCESS: '/access',
  AUTH_USER: '/auth-user',
  EMAIL_UNSUBSCRIBE: '/unsubscribe',
  EMAIL_RESUBSCRIBED: '/resubscribed',
  SIGN_UP: '/sign-up',
  QUICK_SIGN_UP: '/quick-sign-up',
  QUICK_SIGN_UP_COMPLETED: '/quick-sign-up/completed',
  EVENT_NO_ACCESS: '/event/no-access',
  EVENT_NO_LIVE: '/event/no-live/:id',
  EVENT_FINISHED: '/event/finished',
  SIGNUP_PENDING: '/signup-pending',
  SIGN_UP_QUESTIONS: '/signup-questions',
  SIGN_UP_OTP: '/signup-otp',
  HOME: '/',
  DASHBOARD: '/dashboard',
  NOUMS: '/noums',
  GUEST_HOME: '/guest',
  NOUM: '/noum/:id',
  NOUM_MANAGE_MEMBERS: '/noum/:id/manage-members',
  EDIT_NOUM: '/noum/:id/edit',
  EDIT_NOUM_MANAGE_MEMBERS: '/noum/:id/edit/manage-members',
  NOUM_CUSTOM_PREVIEW: '/noum/:id/edit/custom_preview',
  NOUM_MANAGER_DETAILS: '/noum/:id/manager-details/:memberId',
  CHAMBERS: '/chambers',
  CHAMBER: '/chamber/:id',
  EDIT_CHAMBER: '/chamber/:id/edit',
  INACTIVE: '/inactive',
  DISCOVERY: '/discovery',
  DISCOVERY_RECOMMENDED_SHOW_ALL: '/discovery/recommended-show-all',
  DISCOVERY_FEATURED_SHOW_ALL: '/discovery/featured-show-all',
  DISCOVERY_MYCIRCLE_SHOW_ALL: '/discovery/mycircle-show-all',
  DISCOVERY_POPULAR_SHOW_ALL: '/discovery/popular-show-all',
  DISCOVERY_SPOTLIGHT_SHOW_ALL: '/discovery/spotlight-show-all',
  DISCOVERY_FAVOURITES_SHOW_ALL: '/discovery/favourites-show-all',
  DISCOVERY_RECENT_SHOW_ALL: '/discovery/recent-show-all',
  MONEY: '/money',
  MONEY_DETAILS: '/money-details',
  SEARCH: '/search',
  HOME_NOUM: '/profile',
  MY_ACCOUNT: '/my-account',
  INVITES_FRIENDS: '/my-account/invites-friends',
  ACCOUNT_SETTINGS: '/my-account/account-settings',
  NOTIFICATIONS_SETTINGS: '/my-account/notifications-settings',
  COOKIE_SETTINGS: '/my-account/cookie-policy',
  PRIVACY_POLICY: '/my-account/privacy-policy',
  TERMS_OF_USE: '/my-account/terms-of-use',
  EDIT_HOME_NOUM: '/profile/edit',
  WALLET_SETUP: '/money/setup-wallet',
  WALLET_SETUP_RETRY: '/money/setup-wallet/retry',
  PERSONAL_SOCIAL_HALL: '/meeting/:id',
  SOCIAL_HALL: '/social-hall/:id',
  SOCIAL_HALL_DETAILS: '/social-hall/:id/event/:eventId',
  COMMUNITY: '/community',
  APPLICATION_REVIEW: '/application-review',
  ACCOUNT_DETAILS: '/account-details',
  VIEW_STATEMENTS: '/view-statements/:accountType/:id',
  VIEW_STATEMENTS_MAIN: '/view-statements/',
  VIEW_TRANSACTIONS_MAIN: '/view-transactions/',
  VIEW_TRANSACTIONS: '/view-transactions/:accountType/:id',
  ARTICLES: '/articles',
  ARTICLE: '/article',
  REGISTER: '/register',
  MONEY_ARTICLE: '/money-article',
  REFERENCE: '/reference',
  NOT_FOUND: '/404',
  LINK_NOUM: '/link-noum',
  MESSAGES: '/messages',
  ACCESS_DENIED: '/access_denied',
  SESSION_EXPIRED: '/session_expired',
  ACTIVE: '/active',
  MORE_INFO: '/more_info',
  PLAN_DETAILS: '/noums/plan-details/:id',
  MY_PLAN: '/noums/my-plan',
  PLAN_TRANSACTION: '/noums/my-plan/view-transactions',
  POST: '/post/:id',
  POSTS: '/posts/:id',
  INVOICE_CREATE: '/invoice/create',
  INVOICE_EDIT: '/invoice/:id/edit',
  INVOICE_PREVIEW: '/invoice/:id/preview',
  INVOICE_DETAILS: '/invoice/:id',
  INVOICE_MANAGER: '/noums/invoice-manager',
  CONTACT_MANAGER: '/noums/contacts-manager',
  CONTRACT_MANAGER: '/noums/contract-manager',
  CONTRACT_CREATE: '/contracts/create-contract',
  CONTRACT_EDIT: '/contract/:id/edit',
  CONTRACT_PREVIEW: '/contract/:id',
  STATEMENT_OF_WORK_CREATE: '/contracts/create-sow',
  STATEMENT_OF_WORK_EDIT: '/sow/:id/edit',
  STATEMENT_OF_WORK_PREVIEW: '/sow/:id',
  CAMPAIGNS: '/noums/campaigns',
  CAMPAIGN_CREATE: '/campaign/create/:id',
  CAMPAIGN_SUMMARY: '/campaign/:id',
  CAMPAIGN_OFFER: '/campaign/offer/:id',
  CAMPAIGN_REPORT: '/campaign/report/:id',
  PROXY_ROUTE: '/proxy',
  SOCIAL_AUTH_REDIRECT: '/social/auth/redirect',
  RESET_PASSWORD: '/reset-password',
  AUTO_CREATE_OR_UNARCHIVE_NOUM: '/auto-create-or-unarchive-noum',
} as const;

export { ROUTES };
export default ROUTES;
