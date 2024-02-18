import { lazy } from 'react';
import generate from 'uniqid';
import ROUTES from '@/constants/routes';
import { type PageRoutes } from './types';
// const OtherComponent = React.lazy(() => import('./OtherComponent'));

const Home = lazy(() => import('@/pages/Home'));
const Login = lazy(() => import('@/pages/Login'));
const CookiePolicy = lazy(() => import('@/pages/CookiePolicy'));
const AdminLogin = lazy(() => import('@/pages/AdminLogin'));
const EmailUnsubscribe = lazy(() => import('@/pages/EmailUnsubscribe'));
const EmailResubscribed = lazy(() => import('@/pages/EmailResubscribed'));
const Access = lazy(() => import('@/pages/Access'));
const Proxy = lazy(() => import('@/pages/Proxy'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Chambers = lazy(() => import('@/pages/Chambers'));
const Chamber = lazy(() => import('@/pages/Chamber'));
const Articles = lazy(() => import('@/pages/Articles'));
const Article = lazy(() => import('@/pages/Article'));
const EditChamber = lazy(() => import('@/pages/EditChamber'));
const InActiveScreen = lazy(() => import('@/pages/InActive'));
const DiscoveryScreen = lazy(() => import('@/pages/Discover'));
const InvoiceCreateScreen = lazy(() => import('@/pages/InvoiceCreate'));
const InvoicePreviewScreen = lazy(() => import('@/pages/InvoicePreview'));
const NoumManagerDetailsScreen = lazy(
  () => import('@/pages/NoumManagerDetails'),
);

const DiscoveryRecommendedShowAll = lazy(
  () => import('@/screens/Discovery/RecommendedShowAll'),
);
const DiscoveryFeaturedShowAll = lazy(
  () => import('@/screens/Discovery/FeaturedShowAll'),
);
const DiscoveryRecentShowAll = lazy(
  () => import('@/screens/Discovery/RecentShowAll'),
);
const DiscoveryFavouritesShowAll = lazy(
  () => import('@/screens/Discovery/FavouritesShowAll'),
);
const DiscoveryMyCircleShowAll = lazy(
  () => import('@/screens/Discovery/MyCircleShowAll'),
);
const DiscoveryPopularShowAll = lazy(
  () => import('@/screens/Discovery/PopularShowAll'),
);
const DiscoverySpotLightShowAll = lazy(
  () => import('@/screens/Discovery/SpotLightShowAll'),
);
const ChamberHome = lazy(() => import('@/screens/HomeNoum/HomeNoum'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('@/pages/TermsOfUse'));
const EditHomeNoum = lazy(() => import('@/screens/HomeNoum/EditHomeNoum'));
const InvitesFriends = lazy(() => import('@/pages/InviteFriends'));
const Money = lazy(() => import('@/pages/Money'));
const MoneyDetails = lazy(() => import('@/screens/MoneyDetails/index'));
const WalletSetup = lazy(() => import('@/pages/WalletSetup'));
const WalletSetupRetry = lazy(() => import('@/pages/WalletSetupRetry'));
const SocialHall = lazy(() => import('@/pages/SocialHall'));
const Community = lazy(() => import('@/screens/Community'));
const AccountDetails = lazy(() => import('@/pages/AccoubtDetails'));
const ViewStatements = lazy(() => import('@/pages/ViewStatements'));
const ViewTransactions = lazy(() => import('@/pages/ViewTransactions'));
const PlanTransactions = lazy(() => import('@/pages/PlanTransactions'));
const Register = lazy(() => import('@/screens/Register'));
const MoneyArticle = lazy(
  () => import('@/screens/Money/FinancialSolution/Content/MoneyArticle'),
);
const Reference = lazy(() => import('@/pages/Reference'));
const SocialHallDetials = lazy(() => import('@/screens/EventDetails'));
const Search = lazy(() => import('@/pages/Search'));
const UnauthenticatedAccess = lazy(
  () => import('@/pages/UnauthenticatedAccess'),
);
const ApplicationReview = lazy(() => import('@/pages/ApplicationReview'));
const GuestHome = lazy(() => import('@/pages/GuestHome'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const LinkNoum = lazy(() => import('@/pages/LinkNoum'));
const GlobalMessages = lazy(() => import('@/screens/GlobalMessages'));
const SessionExpired = lazy(() => import('@/pages/SessionExpired'));
const SignupStepPending = lazy(() => import('@/pages/SignupPending'));
const OnboardingQuestions = lazy(
  () => import('@/screens/Register/Steps/OnboardingQuestions'),
);
const MoreInfo = lazy(() => import('@/screens/Onboarding/MoreInfomation'));
const AcceptedUser = lazy(() => import('@/screens/Onboarding/AcceptedUser'));
const ShowOtp = lazy(() => import('@/screens/Register/Steps/ShowOTP'));
const CustomPreview = lazy(() => import('@/pages/CustomPreview'));
const SinglePost = lazy(() => import('@/screens/SinglePost'));
const NoumPosts = lazy(() => import('@/screens/NoumPosts'));
const ContractManager = lazy(() => import('@/pages/ContractManager'));
const InvoiceManager = lazy(() => import('@/pages/InvoiceManager'));
const ContactsManager = lazy(() => import('@/pages/ContactsManager'));
const PlanSummary = lazy(() => import('@/pages/PlanSummary'));
const PlanDetails = lazy(() => import('@/pages/PlanDetails'));
const ContractCreate = lazy(() => import('@/pages/ContractCreate'));
const ContractPreview = lazy(() => import('@/pages/ContractPreview'));
const StatementOfWorkForm = lazy(() => import('@/pages/StatementOfWorkForm'));
const StatementOfWorkPreview = lazy(
  () => import('@/pages/StatementOfWorkPreview'),
);
const CampaignManager = lazy(() => import('@/pages/CampaignManager'));

const CreateCampaign = lazy(() => import('@/pages/CreateCampaign'));

const CampaignSummary = lazy(() => import('@/pages/CampaignSummary'));

const CampaignOffer = lazy(() => import('@/pages/CampaignOffer'));
const CampaignReport = lazy(() => import('@/pages/CampaignReport'));
const QuickSignUp = lazy(() => import('@/screens/QuickSignUp'));
const QuickSignUpCompleted = lazy(
  () => import('@/screens/QuickSignUpCompleted'),
);
const SocialAuthRedirect = lazy(() => import('@/pages/SocialAuthRedirect'));
const ResetPassword = lazy(() => import('@/pages/ResetPassword'));
const AutoCreateOrUnarchiveNoumAfterCheckout = lazy(
  () => import('@/pages/AutoCreateOrUnarchiveNoumAfterCheckout'),
);
const PAGE_ROUTES: PageRoutes[] = [
  {
    path: ROUTES.LOGIN,
    Element: Login,
    requireAuth: false,
    key: generate(),
  },
  {
    path: ROUTES.COOKIE_POLICY,
    Element: CookiePolicy,
    requireAuth: false,
    key: generate(),
  },
  {
    path: ROUTES.ADMIN_LOGIN,
    Element: AdminLogin,
    requireAuth: false,
    key: generate(),
  },
  {
    path: ROUTES.ACCESS,
    Element: Access,
    requireAuth: false,
    routeAccessPolicy: 'all',
    key: generate(),
  },
  {
    path: ROUTES.AUTH_USER,
    Element: UnauthenticatedAccess,
    routeAccessPolicy: 'all',
    requireAuth: false,
    key: generate(),
  },
  {
    path: ROUTES.EMAIL_RESUBSCRIBED,
    Element: EmailResubscribed,
    routeAccessPolicy: 'all',
    resourceType: 'emailSubscription',
    requireAuth: false,
    key: generate(),
  },
  {
    path: ROUTES.EMAIL_UNSUBSCRIBE,
    Element: EmailUnsubscribe,
    routeAccessPolicy: 'all',
    resourceType: 'emailSubscription',
    requireAuth: false,
    key: generate(),
  },
  {
    path: ROUTES.SIGN_UP,
    Element: Register,
    requireAuth: false,
    key: generate(),
  },
  {
    path: ROUTES.HOME,
    Element: Home,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.GUEST_HOME,
    Element: GuestHome,
    requireAuth: true,
    routeAccessPolicy: 'unregistered-only',
    key: generate(),
  },
  {
    path: ROUTES.DASHBOARD,
    Element: Dashboard,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.NOUMS,
    Element: Chambers,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.NOUM,
    Element: Chamber,
    requireAuth: true,
    routeAccessPolicy: 'all',
    key: generate(),
    nestable: true,
  },
  {
    path: ROUTES.NOUM_MANAGER_DETAILS,
    Element: NoumManagerDetailsScreen,
    requireAuth: true,
    routeAccessPolicy: 'all',
    key: generate(),
  },
  {
    path: ROUTES.EDIT_NOUM,
    Element: EditChamber,
    requireAuth: true,
    key: generate(),
    nestable: true,
  },
  {
    path: ROUTES.NOUM_CUSTOM_PREVIEW,
    Element: CustomPreview,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.INACTIVE,
    Element: InActiveScreen,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.DISCOVERY_RECOMMENDED_SHOW_ALL,
    Element: DiscoveryRecommendedShowAll,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.DISCOVERY_RECENT_SHOW_ALL,
    Element: DiscoveryRecentShowAll,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.DISCOVERY_FEATURED_SHOW_ALL,
    Element: DiscoveryFeaturedShowAll,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.DISCOVERY_FAVOURITES_SHOW_ALL,
    Element: DiscoveryFavouritesShowAll,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.DISCOVERY_MYCIRCLE_SHOW_ALL,
    Element: DiscoveryMyCircleShowAll,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.DISCOVERY_POPULAR_SHOW_ALL,
    Element: DiscoveryPopularShowAll,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.DISCOVERY_SPOTLIGHT_SHOW_ALL,
    Element: DiscoverySpotLightShowAll,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.DISCOVERY,
    Element: DiscoveryScreen,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.HOME_NOUM,
    Element: ChamberHome,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.MY_ACCOUNT,
    Element: InvitesFriends,
    requireAuth: true,
    nestable: true,
    key: generate(),
  },
  {
    path: ROUTES.PRIVACY_POLICY,
    Element: PrivacyPolicy,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.TERMS_OF_USE,
    Element: TermsOfUse,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.EDIT_HOME_NOUM,
    Element: EditHomeNoum,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.MONEY,
    Element: Money,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.WALLET_SETUP,
    Element: WalletSetup,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.WALLET_SETUP_RETRY,
    Element: WalletSetupRetry,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.SOCIAL_HALL,
    Element: SocialHall,
    requireAuth: true,
    routeAccessPolicy: 'all',
    key: generate(),
  },
  {
    path: ROUTES.PERSONAL_SOCIAL_HALL,
    Element: SocialHall,
    requireAuth: true,
    routeAccessPolicy: 'all',
    key: generate(),
  },
  {
    path: ROUTES.SOCIAL_HALL_DETAILS,
    Element: SocialHallDetials,
    requireAuth: true,
    routeAccessPolicy: 'all',
    key: generate(),
  },
  {
    path: ROUTES.MONEY_DETAILS,
    Element: MoneyDetails,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.COMMUNITY,
    Element: Community,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.ACCOUNT_DETAILS,
    Element: AccountDetails,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.VIEW_STATEMENTS,
    Element: ViewStatements,
    requireAuth: true,
    key: generate(),
  },

  {
    path: ROUTES.APPLICATION_REVIEW,
    Element: ApplicationReview,
    requireAuth: true,
    key: generate(),
  },

  {
    path: ROUTES.VIEW_TRANSACTIONS_MAIN,
    Element: ViewTransactions,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.PLAN_TRANSACTION,
    Element: PlanTransactions,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.VIEW_STATEMENTS_MAIN,
    Element: ViewStatements,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.VIEW_TRANSACTIONS,
    Element: ViewTransactions,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.ARTICLES,
    Element: Articles,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.ARTICLE,
    Element: Article,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.REGISTER,
    Element: Register,
    requireAuth: false,
    key: generate(),
  },
  {
    path: ROUTES.MONEY_ARTICLE,
    Element: MoneyArticle,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.REFERENCE,
    Element: Reference,
    requireAuth: false,
    key: generate(),
  },
  {
    path: ROUTES.SEARCH,
    Element: Search,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.NOT_FOUND,
    Element: NotFound,
    requireAuth: true,
    routeAccessPolicy: 'all',
    key: generate(),
  },
  {
    path: ROUTES.LINK_NOUM,
    Element: LinkNoum,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.MESSAGES,
    Element: GlobalMessages,
    requireAuth: true,
    nestable: true,
    key: generate(),
  },
  {
    path: ROUTES.SESSION_EXPIRED,
    Element: SessionExpired,
    requireAuth: false,
    routeAccessPolicy: 'all',
    key: generate(),
  },
  {
    path: ROUTES.MORE_INFO,
    Element: MoreInfo,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.ACTIVE,
    Element: AcceptedUser,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.ACCESS_DENIED,
    Element: NotFound,
    requireAuth: true,
    routeAccessPolicy: 'all',
    key: generate(),
  },
  {
    path: ROUTES.EVENT_FINISHED,
    Element: NotFound,
    requireAuth: true,
    routeAccessPolicy: 'all',
    key: generate(),
  },
  {
    path: ROUTES.EVENT_NO_ACCESS,
    Element: NotFound,
    requireAuth: true,
    routeAccessPolicy: 'all',
    key: generate(),
  },
  {
    path: ROUTES.EVENT_NO_LIVE,
    Element: NotFound,
    requireAuth: true,
    routeAccessPolicy: 'all',
    key: generate(),
  },
  {
    path: ROUTES.SIGN_UP_QUESTIONS,
    Element: OnboardingQuestions,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.SIGNUP_PENDING,
    Element: SignupStepPending,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.SIGN_UP_OTP,
    Element: ShowOtp,
    requireAuth: false,
    key: generate(),
  },
  {
    path: ROUTES.POST,
    Element: SinglePost,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.POSTS,
    Element: NoumPosts,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.INVOICE_CREATE,
    Element: InvoiceCreateScreen,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.INVOICE_EDIT,
    Element: InvoiceCreateScreen,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.INVOICE_PREVIEW,
    Element: InvoicePreviewScreen,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.INVOICE_DETAILS,
    Element: InvoicePreviewScreen,
    requireAuth: true,
    routeAccessPolicy: 'all',
    key: generate(),
  },
  {
    path: ROUTES.INVOICE_MANAGER,
    Element: InvoiceManager,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.CONTACT_MANAGER,
    Element: ContactsManager,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.MY_PLAN,
    Element: PlanSummary,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.PLAN_DETAILS,
    Element: PlanDetails,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.CONTRACT_MANAGER,
    Element: ContractManager,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.CONTRACT_CREATE,
    Element: ContractCreate,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.CONTRACT_EDIT,
    Element: ContractCreate,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.CONTRACT_PREVIEW,
    Element: ContractPreview,
    requireAuth: true,
    routeAccessPolicy: 'all',
    key: generate(),
  },
  {
    path: ROUTES.STATEMENT_OF_WORK_CREATE,
    Element: StatementOfWorkForm,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.STATEMENT_OF_WORK_EDIT,
    Element: StatementOfWorkForm,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.STATEMENT_OF_WORK_PREVIEW,
    Element: StatementOfWorkPreview,
    requireAuth: true,
    routeAccessPolicy: 'all',
    key: generate(),
  },
  {
    path: ROUTES.CAMPAIGNS,
    Element: CampaignManager,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.CAMPAIGN_CREATE,
    Element: CreateCampaign,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.CAMPAIGN_SUMMARY,
    Element: CampaignSummary,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.CAMPAIGN_OFFER,
    Element: CampaignOffer,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.CAMPAIGN_REPORT,
    Element: CampaignReport,
    requireAuth: true,
    key: generate(),
  },
  {
    path: ROUTES.QUICK_SIGN_UP,
    Element: QuickSignUp,
    requireAuth: false,
    key: generate(),
  },
  {
    path: ROUTES.QUICK_SIGN_UP_COMPLETED,
    Element: QuickSignUpCompleted,
    requireAuth: true,
    routeAccessPolicy: 'unregistered-only',
    key: generate(),
  },
  {
    path: ROUTES.PROXY_ROUTE,
    Element: Proxy,
    requireAuth: false,
    key: generate(),
  },
  {
    path: ROUTES.SOCIAL_AUTH_REDIRECT,
    Element: SocialAuthRedirect,
    requireAuth: false,
    key: generate(),
  },
  {
    path: ROUTES.RESET_PASSWORD,
    Element: ResetPassword,
    requireAuth: false,
    key: generate(),
    routeAccessPolicy: 'all',
  },

  {
    path: ROUTES.AUTO_CREATE_OR_UNARCHIVE_NOUM,
    Element: AutoCreateOrUnarchiveNoumAfterCheckout,
    requireAuth: true,
    key: generate(),
  },
];

export default PAGE_ROUTES;
