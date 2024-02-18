export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  ISODate: any;
  InputAny: any;
  JSON: any;
  JSONObject: any;
  Json: any;
  Object: any;
  StringOrBoolean: string | boolean;
  StringOrInteger: string | number;
  TypeAny: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AccountListInput = {
  accountType?: InputMaybe<AccountType>;
  customerName?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  page: Scalars['Int'];
  self: Scalars['Boolean'];
};

export type AccountListOutput = {
  __typename?: 'AccountListOutput';
  accountName?: Maybe<Scalars['String']>;
  accountType?: Maybe<AccountType>;
  balance?: Maybe<Scalars['Float']>;
  chamber?: Maybe<ChamberByIdRef>;
  chamberId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  customerName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isBulkPayment?: Maybe<Scalars['Boolean']>;
  isCampaignAccount?: Maybe<Scalars['Boolean']>;
  maskAccountNumber?: Maybe<Scalars['String']>;
  masterWalletId?: Maybe<Scalars['String']>;
  meta?: Maybe<BankMeta>;
  microDeposits?: Maybe<Array<Maybe<VerifyMicroDeposit>>>;
  paymentChannel?: Maybe<PaymentChannelsEnum>;
  primary: Scalars['Boolean'];
  status?: Maybe<Scalars['String']>;
  tokenStatus?: Maybe<BankTokenStatus>;
  updatedAt?: Maybe<Scalars['String']>;
  userId?: Maybe<UserOutput>;
  walletName?: Maybe<Scalars['String']>;
};

export type AccountListOutputV2 = {
  __typename?: 'AccountListOutputV2';
  count: Scalars['Int'];
  data: Array<Maybe<AccountListOutput>>;
};

export type AccountLogsOutput = {
  __typename?: 'AccountLogsOutput';
  _id?: Maybe<Scalars['String']>;
  accountId?: Maybe<Scalars['String']>;
  operationType?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  updatedBy?: Maybe<UserOutput>;
  updates?: Maybe<Scalars['JSON']>;
};

export type AccountRoutingInput = {
  accountNumber: Scalars['String'];
  accountType: DwollaAccountType;
  name: Scalars['String'];
  routingNumber: Scalars['String'];
};

export enum AccountType {
  Bank = 'BANK',
  Card = 'CARD',
  SubWallet = 'SUB_WALLET',
  Wallet = 'WALLET'
}

export type ActiveNoumInvitation = {
  __typename?: 'ActiveNoumInvitation';
  _id: Scalars['ID'];
  invitedAt: Scalars['ISODate'];
};

export type AdCampaignAudienceInput = {
  category?: InputMaybe<Array<Scalars['String']>>;
  moreText?: InputMaybe<Scalars['String']>;
  targetLanguage: Array<InputMaybe<Scalars['String']>>;
  targetLocation: Array<InputMaybe<Scalars['String']>>;
};

export type AdCampaignAudienceOutput = {
  __typename?: 'AdCampaignAudienceOutput';
  category?: Maybe<Array<Maybe<Scalars['String']>>>;
  moreText?: Maybe<Scalars['String']>;
  targetLanguage?: Maybe<Array<Maybe<Scalars['String']>>>;
  targetLocation?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum AdCampaignBudgetType {
  TotalBudget = 'TOTAL_BUDGET',
  TotalDailyBudget = 'TOTAL_DAILY_BUDGET'
}

export type AdCampaignCsvReportCreateInput = {
  fileHeaders: Scalars['String'];
  filters: Array<InputMaybe<CommonFilter>>;
  search?: InputMaybe<Scalars['String']>;
};

export type AdCampaignCsvReportListOutput = {
  __typename?: 'AdCampaignCsvReportListOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<RiseReportOutput>>>;
};

export type AdCampaignCsvReportOutput = {
  __typename?: 'AdCampaignCsvReportOutput';
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['ISODate']>;
  filters?: Maybe<Scalars['JSONObject']>;
  stage?: Maybe<CsvReportStage>;
  status?: Maybe<CsvReportStatus>;
  type?: Maybe<RiseReportTypes>;
  updatedAt?: Maybe<Scalars['ISODate']>;
};

export type AdCampaignFilter = {
  campaignTitle: Scalars['String'];
  noumIds?: InputMaybe<Array<Scalars['ID']>>;
  status?: InputMaybe<Array<Scalars['String']>>;
};

export enum AdCampaignGoalEnum {
  GainConnectedUsersAndFollowers = 'GAIN_CONNECTED_USERS_AND_FOLLOWERS',
  GetQuickQuestionsAnswers = 'GET_QUICK_QUESTIONS_ANSWERS',
  IncreaseNoumVisibility = 'INCREASE_NOUM_VISIBILITY',
  Other = 'OTHER'
}

export type AdCampaignInput = {
  audience: AdCampaignAudienceInput;
  budgetAmount: Scalars['Float'];
  budgetType: AdCampaignBudgetType;
  goals?: InputMaybe<Array<AdCampaignGoalEnum>>;
  noumId: Scalars['ID'];
  otherGoals?: InputMaybe<Scalars['String']>;
  startDate: Scalars['ISODate'];
  title: Scalars['String'];
};

export enum AdCampaignInputStatus {
  Completed = 'COMPLETED',
  InAcceptance = 'IN_ACCEPTANCE',
  InReview = 'IN_REVIEW',
  Live = 'LIVE',
  Paid = 'PAID',
  PaymentFailed = 'PAYMENT_FAILED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type AdCampaignOffer = {
  __typename?: 'AdCampaignOffer';
  _id: Scalars['ID'];
  campaignId: Scalars['ID'];
  clicksWeekly?: Maybe<Scalars['Int']>;
  costTotal?: Maybe<Scalars['Float']>;
  costWeekly?: Maybe<Scalars['Float']>;
  cpc?: Maybe<Scalars['Float']>;
  createdAt: Scalars['ISODate'];
  createdBy?: Maybe<UserOutput>;
  endAt?: Maybe<Scalars['ISODate']>;
  goalConnectedUsers?: Maybe<AdCampaignOfferGoalsConnectedUsers>;
  goalNoumVisibility?: Maybe<AdCampaignOfferGoalsNoumVisibility>;
  message?: Maybe<Scalars['String']>;
  oid: Scalars['Int'];
  reachTotal?: Maybe<Scalars['Int']>;
  rejectReason?: Maybe<Scalars['String']>;
  sentAt?: Maybe<Scalars['ISODate']>;
  startAt?: Maybe<Scalars['ISODate']>;
  status: EnumAdCampaignOfferStatus;
  updatedAt: Scalars['ISODate'];
  updatedBy?: Maybe<UserOutput>;
};

export type AdCampaignOfferGoalsConnectedUsers = {
  __typename?: 'AdCampaignOfferGoalsConnectedUsers';
  currentFollowers?: Maybe<Scalars['Int']>;
  currentUsers?: Maybe<Scalars['Int']>;
  predictedFollowers?: Maybe<Scalars['Int']>;
  predictedUsers?: Maybe<Scalars['Int']>;
};

export type AdCampaignOfferGoalsConnectedUsersInput = {
  currentFollowers: Scalars['Int'];
  currentUsers: Scalars['Int'];
  predictedFollowers: Scalars['Int'];
  predictedUsers: Scalars['Int'];
};

export type AdCampaignOfferGoalsNoumVisibility = {
  __typename?: 'AdCampaignOfferGoalsNoumVisibility';
  currentViews?: Maybe<Scalars['Int']>;
  predictedViews?: Maybe<Scalars['Int']>;
};

export type AdCampaignOfferGoalsNoumVisibilityInput = {
  currentViews: Scalars['Int'];
  predictedViews: Scalars['Int'];
};

export type AdCampaignOfferInput = {
  campaignId: Scalars['ID'];
  clicksWeekly: Scalars['Int'];
  costTotal: Scalars['Float'];
  costWeekly: Scalars['Float'];
  cpc: Scalars['Float'];
  endAt: Scalars['ISODate'];
  goalConnectedUsers: AdCampaignOfferGoalsConnectedUsersInput;
  goalNoumVisibility: AdCampaignOfferGoalsNoumVisibilityInput;
  message?: InputMaybe<Scalars['String']>;
  offerId?: InputMaybe<Scalars['ID']>;
  reachTotal: Scalars['Int'];
  send?: InputMaybe<Scalars['Boolean']>;
  startAt: Scalars['ISODate'];
};

export type AdCampaignOfferPaginated = {
  __typename?: 'AdCampaignOfferPaginated';
  count: Scalars['Int'];
  data: Array<AdCampaignOffer>;
};

export type AdCampaignOutput = {
  __typename?: 'AdCampaignOutput';
  _id?: Maybe<Scalars['String']>;
  adId?: Maybe<Scalars['String']>;
  audience?: Maybe<AdCampaignAudienceOutput>;
  budgetAmount?: Maybe<Scalars['Float']>;
  budgetType?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISODate'];
  createdBy?: Maybe<UserOutput>;
  endDate?: Maybe<Scalars['ISODate']>;
  goals?: Maybe<Array<Maybe<Scalars['String']>>>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  noumId?: Maybe<SpaceOutput>;
  otherGoals?: Maybe<Scalars['String']>;
  paymentRef?: Maybe<PaymentOutput>;
  paymentRefHistory?: Maybe<Array<Maybe<Scalars['String']>>>;
  paymentRefStatus?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['ISODate']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISODate'];
  updatedBy?: Maybe<UserOutput>;
};

export type AdCampaignOutputPaginated = {
  __typename?: 'AdCampaignOutputPaginated';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<AdCampaignOutput>>>;
};

export type AdCampaignReportInput = {
  _id?: InputMaybe<Scalars['ID']>;
  campaignId: Scalars['ID'];
  clientMessage?: InputMaybe<Scalars['String']>;
  metrics: AdCampaignReportMetricsInput;
  reportDate: Scalars['ISODate'];
  status: AdCampaignReportStatus;
};

export type AdCampaignReportMetricsInput = {
  avgCPC: Scalars['Float'];
  clicks: Scalars['Float'];
  cost: Scalars['Float'];
  ctr: Scalars['Float'];
  impressions: Scalars['Float'];
};

export type AdCampaignReportMetricsOutput = {
  __typename?: 'AdCampaignReportMetricsOutput';
  avgCPC?: Maybe<Scalars['Float']>;
  clicks?: Maybe<Scalars['Float']>;
  cost?: Maybe<Scalars['Float']>;
  ctr?: Maybe<Scalars['Float']>;
  impressions?: Maybe<Scalars['Float']>;
};

export type AdCampaignReportOutput = {
  __typename?: 'AdCampaignReportOutput';
  _id?: Maybe<Scalars['ID']>;
  campaignId?: Maybe<Scalars['String']>;
  clientMessage?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['ISODate']>;
  createdBy?: Maybe<UserOutput>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  metrics?: Maybe<AdCampaignReportMetricsOutput>;
  reportDate?: Maybe<Scalars['ISODate']>;
  reportId?: Maybe<Scalars['ID']>;
  status?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['ISODate']>;
  updatedBy?: Maybe<UserOutput>;
};

export enum AdCampaignReportStatus {
  Draft = 'DRAFT',
  Sent = 'SENT'
}

export type AdCampaignReportsOutputPaginated = {
  __typename?: 'AdCampaignReportsOutputPaginated';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<AdCampaignReportOutput>>>;
};

export type AdCampaignSettingsInput = {
  settingsType: AdCampaignSettingsType;
};

export type AdCampaignSettingsOutput = {
  __typename?: 'AdCampaignSettingsOutput';
  settingsType?: Maybe<Scalars['String']>;
  settingsValue?: Maybe<Scalars['JSONObject']>;
};

export enum AdCampaignSettingsType {
  AdCampaignStatus = 'AD_CAMPAIGN_STATUS'
}

export type AdEnabledNoumFilter = {
  slug?: InputMaybe<Scalars['String']>;
};

export type AddNewNoumContactInput = {
  apartmentNo?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  companyName?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  displayName: Scalars['String'];
  email?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['ID']>;
  zipCode?: InputMaybe<Scalars['String']>;
};

export type AddNoumFileInput = {
  description?: InputMaybe<Scalars['String']>;
  fileSize: Scalars['Int'];
  fileUrl: Scalars['String'];
  filesManagerElementId: Scalars['ID'];
  name: Scalars['String'];
  visibilityRoles: Array<Scalars['ID']>;
};

export type AddNoumLayoutToolInput = {
  bodyContent?: InputMaybe<Scalars['String']>;
  bodyContentJson?: InputMaybe<Scalars['JSONObject']>;
  bodyContentType: BodyContentEnum;
  columnId: Scalars['ID'];
  elementType: ElementTypeEnum;
  headerContent?: InputMaybe<Scalars['String']>;
  meta?: InputMaybe<Scalars['JSONObject']>;
  position?: InputMaybe<Scalars['Int']>;
};

export type AddPaymentProviderInput = {
  available: Scalars['Boolean'];
  chargePercentage: Scalars['Float'];
  chargeValue: Scalars['Float'];
  feeAppliedTo?: InputMaybe<FeeApplied>;
  flowOfFunds: FlowofFundsEnum;
  invoiceFeeAppliedTo?: InputMaybe<FeeApplied>;
  payeeCurrency: CurrencyEnum;
  payerCurrency: CurrencyEnum;
  paymentMethod: PaymentProviderMethodEnum;
  preference: Scalars['Int'];
  provider: PaymentChannelsEnum;
  settlementPeriod: SettlementPeriodEnum;
  source: PaymentProviderSourceEnum;
  target: PaymentProviderSourceEnum;
};

export type AddressInput = {
  apartment?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  zipcode?: InputMaybe<Scalars['String']>;
};

export type AddressInputRise = {
  apartment?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  zipcode?: InputMaybe<Scalars['String']>;
};

export type AddressOutput = {
  __typename?: 'AddressOutput';
  apartment?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  zipcode?: Maybe<Scalars['String']>;
};

export type AdminGroupOutput = {
  __typename?: 'AdminGroupOutput';
  ADMIN?: Maybe<GroupOutput>;
  MEMBER?: Maybe<GroupOutput>;
};

export enum AdminInviteListInviteStatus {
  Received = 'received',
  Requested = 'requested'
}

export enum AdminReportType {
  AdCampaign = 'AD_CAMPAIGN',
  Contract = 'CONTRACT',
  CqFormFieldResponse = 'CQ_FORM_FIELD_RESPONSE',
  CqFormFieldScore = 'CQ_FORM_FIELD_SCORE',
  CqHistorical = 'CQ_HISTORICAL',
  CqUserData = 'CQ_USER_DATA',
  Invoice = 'INVOICE',
  RiseClassApplication = 'RISE_CLASS_APPLICATION',
  Sow = 'SOW'
}

export type AdminReportsOutputCollection = {
  __typename?: 'AdminReportsOutputCollection';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<AdminReportsOutputType>>>;
};

export type AdminReportsOutputType = {
  __typename?: 'AdminReportsOutputType';
  _id?: Maybe<Scalars['ID']>;
  files?: Maybe<Array<Maybe<Scalars['String']>>>;
  filters?: Maybe<Scalars['Json']>;
  generatedBy?: Maybe<Scalars['String']>;
  reportType?: Maybe<AdminReportType>;
  stage?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export enum AllCurrencyEnum {
  Aed = 'AED',
  Afn = 'AFN',
  All = 'ALL',
  Amd = 'AMD',
  Ang = 'ANG',
  Aoa = 'AOA',
  Ars = 'ARS',
  Aud = 'AUD',
  Awg = 'AWG',
  Azn = 'AZN',
  Bam = 'BAM',
  Bbd = 'BBD',
  Bdt = 'BDT',
  Bgn = 'BGN',
  Bhd = 'BHD',
  Bif = 'BIF',
  Bmd = 'BMD',
  Bnd = 'BND',
  Bob = 'BOB',
  Brl = 'BRL',
  Bsd = 'BSD',
  Btn = 'BTN',
  Bwp = 'BWP',
  Byn = 'BYN',
  Bzd = 'BZD',
  Cad = 'CAD',
  Cdf = 'CDF',
  Chf = 'CHF',
  Clp = 'CLP',
  Cny = 'CNY',
  Cop = 'COP',
  Crc = 'CRC',
  Cup = 'CUP',
  Cve = 'CVE',
  Czk = 'CZK',
  Djf = 'DJF',
  Dkk = 'DKK',
  Dop = 'DOP',
  Dzd = 'DZD',
  Egp = 'EGP',
  Ern = 'ERN',
  Etb = 'ETB',
  Eur = 'EUR',
  Fjd = 'FJD',
  Fkp = 'FKP',
  Gbp = 'GBP',
  Gel = 'GEL',
  Ghs = 'GHS',
  Gip = 'GIP',
  Gmd = 'GMD',
  Gnf = 'GNF',
  Gtq = 'GTQ',
  Gyd = 'GYD',
  Hkd = 'HKD',
  Hnl = 'HNL',
  Hrk = 'HRK',
  Htg = 'HTG',
  Huf = 'HUF',
  Idr = 'IDR',
  Ils = 'ILS',
  Inr = 'INR',
  Iqd = 'IQD',
  Irr = 'IRR',
  Isk = 'ISK',
  Jmd = 'JMD',
  Jod = 'JOD',
  Jpy = 'JPY',
  Kes = 'KES',
  Kgs = 'KGS',
  Khr = 'KHR',
  Kmf = 'KMF',
  Kpw = 'KPW',
  Krw = 'KRW',
  Kwd = 'KWD',
  Kyd = 'KYD',
  Kzt = 'KZT',
  Lak = 'LAK',
  Lbp = 'LBP',
  Lkr = 'LKR',
  Lrd = 'LRD',
  Lsl = 'LSL',
  Lyd = 'LYD',
  Mad = 'MAD',
  Mdl = 'MDL',
  Mga = 'MGA',
  Mkd = 'MKD',
  Mmk = 'MMK',
  Mnt = 'MNT',
  Mop = 'MOP',
  Mro = 'MRO',
  Mur = 'MUR',
  Mvr = 'MVR',
  Mwk = 'MWK',
  Mxn = 'MXN',
  Myr = 'MYR',
  Mzn = 'MZN',
  Nad = 'NAD',
  Ngn = 'NGN',
  Nio = 'NIO',
  Nok = 'NOK',
  Npr = 'NPR',
  Nzd = 'NZD',
  Omr = 'OMR',
  Pab = 'PAB',
  Pen = 'PEN',
  Pgk = 'PGK',
  Php = 'PHP',
  Pkr = 'PKR',
  Pln = 'PLN',
  Pyg = 'PYG',
  Qar = 'QAR',
  Ron = 'RON',
  Rsd = 'RSD',
  Rub = 'RUB',
  Rwf = 'RWF',
  Sar = 'SAR',
  Sbd = 'SBD',
  Scr = 'SCR',
  Sdg = 'SDG',
  Sek = 'SEK',
  Sgd = 'SGD',
  Shp = 'SHP',
  Sll = 'SLL',
  Sos = 'SOS',
  Srd = 'SRD',
  Std = 'STD',
  Svc = 'SVC',
  Syp = 'SYP',
  Szl = 'SZL',
  Thb = 'THB',
  Tjs = 'TJS',
  Tmt = 'TMT',
  Tnd = 'TND',
  Top = 'TOP',
  Try = 'TRY',
  Ttd = 'TTD',
  Twd = 'TWD',
  Tzs = 'TZS',
  Uah = 'UAH',
  Ugx = 'UGX',
  Usd = 'USD',
  Uyu = 'UYU',
  Uzs = 'UZS',
  Vef = 'VEF',
  Vnd = 'VND',
  Vuv = 'VUV',
  Wst = 'WST',
  Xaf = 'XAF',
  Xcd = 'XCD',
  Xof = 'XOF',
  Xpf = 'XPF',
  Yer = 'YER',
  Zar = 'ZAR',
  Zmw = 'ZMW',
  Zwl = 'ZWL'
}

export type AllNotesOutput = {
  __typename?: 'AllNotesOutput';
  data?: Maybe<Array<Maybe<Note>>>;
  total?: Maybe<Scalars['Int']>;
};

export type AllNoumsContactsInput = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<NoumContactStatus>;
};

export type AllReferralInvitee = {
  __typename?: 'AllReferralInvitee';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<ReferralInvite>>>;
};

export type AllTransactionLinksOutput = {
  __typename?: 'AllTransactionLinksOutput';
  self?: Maybe<Scalars['String']>;
};

export type AllTransactionParentResponseOutput = {
  __typename?: 'AllTransactionParentResponseOutput';
  environment?: Maybe<Scalars['String']>;
  response_desc?: Maybe<Scalars['String']>;
};

export type AllTransactionResponseOutput = {
  __typename?: 'AllTransactionResponseOutput';
  authorization_code?: Maybe<Scalars['Int']>;
  response_code?: Maybe<Scalars['String']>;
};

export type AllTransactionsResultOutput = {
  __typename?: 'AllTransactionsResultOutput';
  action?: Maybe<Scalars['String']>;
  authorization_amount?: Maybe<Scalars['Int']>;
  authorization_code?: Maybe<Scalars['Int']>;
  billing_address?: Maybe<TransactionAddressOutput>;
  echeck?: Maybe<TransactionEcheckOutput>;
  entered_by?: Maybe<Scalars['String']>;
  links?: Maybe<TransactionLinksOutput>;
  location_id?: Maybe<Scalars['String']>;
  organization_id?: Maybe<Scalars['String']>;
  received_date?: Maybe<Scalars['String']>;
  response?: Maybe<AllTransactionResponseOutput>;
  status?: Maybe<Scalars['String']>;
  transaction_id?: Maybe<Scalars['String']>;
};

export type AmountDueOutput = {
  __typename?: 'AmountDueOutput';
  amountDue?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['String']>;
  indicatorType?: Maybe<IndicatorEnum>;
  statementUrl?: Maybe<Scalars['String']>;
};

export type AnswerOptions = {
  __typename?: 'AnswerOptions';
  answer?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type AnswerOutput = {
  __typename?: 'AnswerOutput';
  _id?: Maybe<Scalars['ID']>;
  body?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['ISODate']>;
  spaceId?: Maybe<Scalars['ID']>;
  tipDetails?: Maybe<Array<TipOutput>>;
  updatedAt?: Maybe<Scalars['ISODate']>;
  user?: Maybe<UserOutput>;
};

export type AnswersOutputResponse = {
  __typename?: 'AnswersOutputResponse';
  data?: Maybe<Array<Maybe<AnswerOutput>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type AppActivitiesOutput = {
  __typename?: 'AppActivitiesOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<AppActivity>>>;
};

export type AppActivity = {
  __typename?: 'AppActivity';
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  payload?: Maybe<AppActivityPayload>;
  sourceNoum?: Maybe<SpaceOutput>;
  sourceUser?: Maybe<UserOutput>;
  targetNoum?: Maybe<SpaceOutput>;
  /** @deprecated Use targetUsers instead */
  targetUser?: Maybe<UserOutput>;
  targetUsers?: Maybe<Array<Maybe<UserOutput>>>;
  type?: Maybe<AppActivityTypes>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type AppActivityFilter = {
  sourceNoum?: InputMaybe<Scalars['ID']>;
  sourceUser?: InputMaybe<Scalars['ID']>;
  targetNoum?: InputMaybe<Scalars['ID']>;
  targetUser?: InputMaybe<Scalars['ID']>;
  targetUsers?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<AppActivityTypes>;
  types?: InputMaybe<Array<InputMaybe<AppActivityTypes>>>;
};

export type AppActivityInput = {
  payload?: InputMaybe<AppActivityPayloadInput>;
  sourceNoum?: InputMaybe<Scalars['ID']>;
  sourceUser?: InputMaybe<Scalars['ID']>;
  targetNoum?: InputMaybe<Scalars['ID']>;
  targetUser?: InputMaybe<Scalars['ID']>;
  type?: InputMaybe<AppActivityTypes>;
};

export type AppActivityPayload = {
  __typename?: 'AppActivityPayload';
  conversation?: Maybe<ConversationActivity>;
  event?: Maybe<EventActivity>;
  noumMember?: Maybe<NoumMember>;
  payment?: Maybe<PaymentActivity>;
  post?: Maybe<PostActivity>;
};

export type AppActivityPayloadInput = {
  conversation?: InputMaybe<Scalars['ID']>;
  event?: InputMaybe<EventActivityInput>;
  noumMember?: InputMaybe<Scalars['ID']>;
  payment?: InputMaybe<PaymentActivityInput>;
  post?: InputMaybe<Scalars['ID']>;
};

export enum AppActivityTypes {
  EventHosted = 'EVENT_HOSTED',
  MembersInvited = 'MEMBERS_INVITED',
  MessageSent = 'MESSAGE_SENT',
  Other = 'OTHER',
  PostCreation = 'POST_CREATION',
  Transaction = 'TRANSACTION'
}

export type ApplicationFilter = {
  status?: InputMaybe<ApplicationResultStatusAdmin>;
};

export type ApplicationResult = {
  __typename?: 'ApplicationResult';
  _id: Scalars['ID'];
  noumId?: Maybe<SpaceOutput>;
  parentNoumId?: Maybe<SpaceOutput>;
  questions?: Maybe<Array<Maybe<Scalars['JSONObject']>>>;
  resultJSON?: Maybe<Scalars['JSONObject']>;
  score?: Maybe<Scalars['Int']>;
  status?: Maybe<ApplicationResultStatusAdmin>;
  uid?: Maybe<UserOutput>;
};

export type ApplicationResultInput = {
  notifyReviewer?: InputMaybe<NotifyReviewerInput>;
  resultJSON?: InputMaybe<Scalars['JSONObject']>;
  score?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<ApplicationResultStatus>;
};

export type ApplicationResultInputAdmin = {
  resultJSON?: InputMaybe<Scalars['JSONObject']>;
  score?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<ApplicationResultStatusAdmin>;
};

export type ApplicationResultResponse = {
  __typename?: 'ApplicationResultResponse';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<ApplicationResult>>>;
};

export enum ApplicationResultStatus {
  Inprogress = 'INPROGRESS',
  Submitted = 'SUBMITTED'
}

export enum ApplicationResultStatusAdmin {
  Approved = 'APPROVED',
  Inprogress = 'INPROGRESS',
  Inreview = 'INREVIEW',
  Rejected = 'REJECTED',
  Submitted = 'SUBMITTED'
}

export type AskForReferencePayload = {
  capacity: NoumReferenceCapacity;
  providerEmail: Scalars['String'];
  providerName: Scalars['String'];
};

export type AssessmentPdfOutput = {
  __typename?: 'AssessmentPDFOutput';
  assessmentPDFUrl?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Attendees = {
  __typename?: 'Attendees';
  chamberId?: Maybe<ChamberByIdRef>;
  invitationId?: Maybe<Scalars['ID']>;
  invitationStatus?: Maybe<InvitationStatus>;
  userId?: Maybe<UserOutput>;
  userRole?: Maybe<UserRole>;
};

export type AttendeesMeta = {
  __typename?: 'AttendeesMeta';
  attendeesCount?: Maybe<Scalars['Int']>;
  blockedCount?: Maybe<Scalars['Int']>;
  pendingCount?: Maybe<Scalars['Int']>;
};

export enum AttendeesType {
  All = 'ALL',
  Connected = 'CONNECTED',
  Others = 'OTHERS'
}

export type AvailableDerivatives = {
  __typename?: 'AvailableDerivatives';
  category?: Maybe<Scalars['String']>;
  derivatives?: Maybe<Array<Maybe<UnderwritingDervDatapoint>>>;
};

export type AvailableNoumRole = {
  __typename?: 'AvailableNoumRole';
  _id: Scalars['ID'];
  description: Scalars['String'];
  name: Scalars['String'];
};

export type AvailablePlansFilterInput = {
  familyName?: InputMaybe<Scalars['String']>;
  planStatus?: InputMaybe<Plan_Status>;
  planVisibility?: InputMaybe<Scalars['Boolean']>;
};

export type BankAccountBalance = {
  __typename?: 'BankAccountBalance';
  balance?: Maybe<CurrencyData>;
  clientAccountId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  maskAccountNumber?: Maybe<Scalars['String']>;
};

export type BankAccountOutput = {
  __typename?: 'BankAccountOutput';
  accountNumber?: Maybe<Scalars['String']>;
  accountSubType?: Maybe<Scalars['String']>;
  accountType?: Maybe<Scalars['String']>;
};

export type BankDetailsOutput = {
  __typename?: 'BankDetailsOutput';
  accountNumber?: Maybe<Scalars['String']>;
  accountSubType?: Maybe<Scalars['String']>;
  accountType?: Maybe<Scalars['String']>;
};

export type BankListOutput = {
  __typename?: 'BankListOutput';
  accountDetails?: Maybe<Array<Maybe<BankDetailsOutput>>>;
  accountNumber?: Maybe<Scalars['String']>;
  accountSubType?: Maybe<Scalars['String']>;
  accountType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isExpired?: Maybe<Scalars['Boolean']>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type BankMeta = {
  __typename?: 'BankMeta';
  name?: Maybe<Scalars['String']>;
  orgLogo?: Maybe<Scalars['String']>;
  orgName?: Maybe<Scalars['String']>;
};

export enum BankTokenStatus {
  Active = 'ACTIVE',
  Expired = 'EXPIRED',
  Pending = 'PENDING'
}

export type BasicConversationItem = ConversationItem & {
  __typename?: 'BasicConversationItem';
  conversation?: Maybe<ConversationOutput>;
  last_updatedAt?: Maybe<Scalars['Date']>;
  unread?: Maybe<Scalars['Int']>;
};

export type BelvoAccessToken = {
  __typename?: 'BelvoAccessToken';
  access?: Maybe<Scalars['String']>;
  refresh?: Maybe<Scalars['String']>;
};

export type BillingAddressInpuType = {
  city?: InputMaybe<Scalars['String']>;
  company_name?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  country_code?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  line1?: InputMaybe<Scalars['String']>;
  line2?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  postal_code?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  state_code?: InputMaybe<Scalars['String']>;
  user_id: Scalars['String'];
};

export type BlockedCountry = {
  __typename?: 'BlockedCountry';
  code?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type BlockedCountryOutput = {
  __typename?: 'BlockedCountryOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<BlockedCountry>>>;
};

export enum BodyContentEnum {
  Doc = 'DOC',
  Html = 'HTML',
  Image = 'IMAGE',
  Json = 'JSON',
  Text = 'TEXT',
  Url = 'URL',
  Video = 'VIDEO'
}

export type BusinessSearch = {
  __typename?: 'BusinessSearch';
  createdAt?: Maybe<Scalars['String']>;
  customer?: Maybe<CustomerOutput>;
  customerId?: Maybe<Scalars['String']>;
  datasources?: Maybe<Scalars['Json']>;
  id?: Maybe<Scalars['ID']>;
  input?: Maybe<BusinessSearchOutput>;
  modules?: Maybe<Scalars['Json']>;
  user?: Maybe<UserOutput>;
  userId?: Maybe<Scalars['ID']>;
};

export type BusinessSearchInput = {
  city?: InputMaybe<Scalars['String']>;
  customerId?: InputMaybe<Scalars['String']>;
  geo?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  subcode?: InputMaybe<Scalars['String']>;
  taxId?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['ID']>;
  zip?: InputMaybe<Scalars['String']>;
};

export type BusinessSearchOutput = {
  __typename?: 'BusinessSearchOutput';
  city?: Maybe<Scalars['String']>;
  customerId?: Maybe<Scalars['String']>;
  geo?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  subcode?: Maybe<Scalars['String']>;
  taxId?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export enum Conversationtypeenumforadmin {
  All = 'ALL',
  Others = 'OTHERS',
  Self = 'SELF'
}

export type CqForm = {
  __typename?: 'CQForm';
  completeness?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  details?: Maybe<Scalars['Json']>;
  formId?: Maybe<Scalars['String']>;
  formType?: Maybe<Scalars['String']>;
  investability?: Maybe<Scalars['Int']>;
  notes?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type CqFormAdminInput = {
  form?: InputMaybe<Scalars['Json']>;
  noumId: Scalars['ID'];
  qualityIndex?: InputMaybe<Cq_Quality>;
  status?: InputMaybe<Scalars['String']>;
  uid: Scalars['ID'];
};

export type CqFormInput = {
  form?: InputMaybe<Scalars['Json']>;
  noumId: Scalars['ID'];
  status?: InputMaybe<Scalars['String']>;
};

export type CqFormOutput = {
  __typename?: 'CQFormOutput';
  createdAt?: Maybe<Scalars['String']>;
  forms?: Maybe<Array<Maybe<CqForm>>>;
  noumId?: Maybe<Scalars['ID']>;
  qualityIndex?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type CqGenerateSummary = {
  __typename?: 'CQGenerateSummary';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type CqLogsOutput = {
  __typename?: 'CQLogsOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<CqScoreLogs>>>;
  error?: Maybe<Scalars['String']>;
};

export type CqNote = {
  __typename?: 'CQNote';
  createdAt?: Maybe<Scalars['String']>;
  noteId?: Maybe<Scalars['ID']>;
  notes?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['ID']>;
  underwriter?: Maybe<UserOutput>;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<UserOutput>;
};

export type CqNoteInput = {
  noteId?: InputMaybe<Scalars['String']>;
  notes: Scalars['String'];
  uid: Scalars['ID'];
};

export type CqNotesList = {
  __typename?: 'CQNotesList';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<CqNote>>>;
};

export type CqQualityAll = {
  __typename?: 'CQQualityAll';
  current?: Maybe<Cq_Quality>;
  previous?: Maybe<Cq_Quality>;
};

export type CqQualityLabel = {
  __typename?: 'CQQualityLabel';
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type CqQualityLogs = {
  __typename?: 'CQQualityLogs';
  createdAt?: Maybe<Scalars['String']>;
  noumId?: Maybe<Scalars['ID']>;
  quality?: Maybe<CqQualityAll>;
  uid?: Maybe<Scalars['ID']>;
  underwriter?: Maybe<UserOutput>;
};

export type CqQualityLogsOutput = {
  __typename?: 'CQQualityLogsOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<CqQualityLogs>>>;
  error?: Maybe<Scalars['String']>;
};

export type CqScoreLogs = {
  __typename?: 'CQScoreLogs';
  createdAt?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  score?: Maybe<Scalars['Int']>;
  uid?: Maybe<Scalars['ID']>;
  underwriter?: Maybe<UserOutput>;
};

export type CqSettings = {
  __typename?: 'CQSettings';
  _id?: Maybe<Scalars['ID']>;
  settings?: Maybe<Scalars['Json']>;
  settingsType?: Maybe<Cq_Settings>;
};

export type CqSummaryReport = {
  __typename?: 'CQSummaryReport';
  data?: Maybe<CqSummaryReportData>;
  error?: Maybe<Scalars['String']>;
};

export type CqSummaryReportData = {
  __typename?: 'CQSummaryReportData';
  graph?: Maybe<Scalars['Json']>;
  report?: Maybe<Scalars['Json']>;
};

export type CqUserList = {
  __typename?: 'CQUserList';
  createdAt?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  forms?: Maybe<Array<Maybe<CqForm>>>;
  lastName?: Maybe<Scalars['String']>;
  noumId?: Maybe<Scalars['String']>;
  qualityIndex?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  uid?: Maybe<UserOutput>;
  updatedAt?: Maybe<Scalars['String']>;
  userStatus?: Maybe<Scalars['String']>;
};

export type CqUserOutput = {
  __typename?: 'CQUserOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<CqUserList>>>;
  error?: Maybe<Scalars['String']>;
};

export type CqUserQualityUpdateInput = {
  noumId?: InputMaybe<Scalars['String']>;
  qualityIndex?: InputMaybe<Cq_Quality>;
  source?: InputMaybe<Cq_Quality_Updation_Source>;
  uid?: InputMaybe<Scalars['String']>;
};

export type CqUserQualityUpdateOutput = {
  __typename?: 'CQUserQualityUpdateOutput';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
  uid?: Maybe<Scalars['String']>;
};

export enum Cq_Quality {
  CouldBeFinanceable = 'COULD_BE_FINANCEABLE',
  Financeable = 'FINANCEABLE',
  InternalUser = 'INTERNAL_USER',
  Investable = 'INVESTABLE',
  NotFinanceable = 'NOT_FINANCEABLE',
  NotSet = 'NOT_SET'
}

export enum Cq_Quality_Updation_Source {
  External = 'EXTERNAL',
  Internal = 'INTERNAL'
}

export enum Cq_Settings {
  BusinessPlanUpload = 'BUSINESS_PLAN_UPLOAD',
  BusinessQuestionnare = 'BUSINESS_QUESTIONNARE',
  FinanceCapital = 'FINANCE_CAPITAL',
  FinancialCashflowQuestionnare = 'FINANCIAL_CASHFLOW_QUESTIONNARE',
  FinancialCreditQuestionnare = 'FINANCIAL_CREDIT_QUESTIONNARE',
  Identity = 'IDENTITY',
  NativeCapital = 'NATIVE_CAPITAL',
  RiseBusinessQuestionnare = 'RISE_BUSINESS_QUESTIONNARE',
  RiseFinanceCapitalQuestionnare = 'RISE_FINANCE_CAPITAL_QUESTIONNARE'
}

export enum Cq_Status {
  InComplete = 'IN_COMPLETE',
  Processed = 'PROCESSED',
  Submitted = 'SUBMITTED'
}

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type CampaignAccountOutput = {
  __typename?: 'CampaignAccountOutput';
  accountName?: Maybe<Scalars['String']>;
  accountType?: Maybe<AccountType>;
  customerName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  maskAccountNumber?: Maybe<Scalars['String']>;
  primary?: Maybe<Scalars['Boolean']>;
  walletName?: Maybe<Scalars['String']>;
};

export enum CampaignAudienceTarget {
  EntireCommunity = 'ENTIRE_COMMUNITY',
  FollowersOfMyNoums = 'FOLLOWERS_OF_MY_NOUMS',
  MyCircle = 'MY_CIRCLE',
  MyNoums = 'MY_NOUMS'
}

export type CapitalquotientMutations = {
  __typename?: 'CapitalquotientMutations';
  addCQModelCoefficients?: Maybe<Scalars['Boolean']>;
  addModifyCQNote?: Maybe<CqNote>;
  cqHistoricalReportCreate?: Maybe<Scalars['Boolean']>;
  generateCQSummaryReport?: Maybe<CqGenerateSummary>;
  generateScoreline?: Maybe<ScoreLineOutput>;
  generateUserCQ?: Maybe<CqFormOutput>;
  submitCQForm?: Maybe<CqFormOutput>;
  updateNoumenaScore?: Maybe<NoumenaScoreOutput>;
  updateNoumenaScoreVisibility?: Maybe<NoumenaScoreOutput>;
  updateUserQualityIndex?: Maybe<CqUserQualityUpdateOutput>;
};


export type CapitalquotientMutationsAddCqModelCoefficientsArgs = {
  input?: InputMaybe<Scalars['String']>;
};


export type CapitalquotientMutationsAddModifyCqNoteArgs = {
  input?: InputMaybe<CqNoteInput>;
};


export type CapitalquotientMutationsCqHistoricalReportCreateArgs = {
  date: Scalars['String'];
};


export type CapitalquotientMutationsGenerateCqSummaryReportArgs = {
  secret?: InputMaybe<Scalars['String']>;
};


export type CapitalquotientMutationsGenerateScorelineArgs = {
  input?: InputMaybe<ScoreLineInput>;
};


export type CapitalquotientMutationsGenerateUserCqArgs = {
  input?: InputMaybe<CqFormAdminInput>;
};


export type CapitalquotientMutationsSubmitCqFormArgs = {
  input?: InputMaybe<CqFormInput>;
};


export type CapitalquotientMutationsUpdateNoumenaScoreArgs = {
  input?: InputMaybe<NoumenaScoreInput>;
};


export type CapitalquotientMutationsUpdateNoumenaScoreVisibilityArgs = {
  input?: InputMaybe<NoumenaScoreVisibilityInput>;
};


export type CapitalquotientMutationsUpdateUserQualityIndexArgs = {
  input?: InputMaybe<CqUserQualityUpdateInput>;
};

export type CapitalquotientQueries = {
  __typename?: 'CapitalquotientQueries';
  cqHistoricalReportFetchAll?: Maybe<UnderwritingCsvReportOutput>;
  cqHistoricalReportSignedUrl?: Maybe<Scalars['String']>;
  getAllCQLogsByUser?: Maybe<CqLogsOutput>;
  getCQDetails?: Maybe<CqFormOutput>;
  getCQDetailsByUser?: Maybe<CqFormOutput>;
  getCQLogsByUser?: Maybe<CqLogsOutput>;
  getCQModelCoefficients?: Maybe<Scalars['Json']>;
  getCQNotesByUser?: Maybe<CqNotesList>;
  getCQQualityLabels?: Maybe<Array<Maybe<CqQualityLabel>>>;
  getCQQualityLogsByUser?: Maybe<CqQualityLogsOutput>;
  getCQSettings?: Maybe<CqSettings>;
  getCQSummaryReports?: Maybe<CqSummaryReport>;
  getCQUsers?: Maybe<Array<Maybe<CqUserList>>>;
  getCQUsersPaginated?: Maybe<CqUserOutput>;
  getNoumenaScore?: Maybe<NoumenaScoreOutput>;
  getNoumenaScoreByNoumId?: Maybe<NoumenaScoreOutputByNoumId>;
  getNoumenaScoreByUser?: Maybe<NoumenaScoreOutput>;
  getScoreLines?: Maybe<Array<Maybe<ScoreLineOutput>>>;
  pingCQ?: Maybe<Scalars['String']>;
};


export type CapitalquotientQueriesCqHistoricalReportFetchAllArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type CapitalquotientQueriesCqHistoricalReportSignedUrlArgs = {
  id: Scalars['ID'];
};


export type CapitalquotientQueriesGetAllCqLogsByUserArgs = {
  userId?: InputMaybe<Scalars['String']>;
};


export type CapitalquotientQueriesGetCqDetailsByUserArgs = {
  userId: Scalars['ID'];
};


export type CapitalquotientQueriesGetCqLogsByUserArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['String']>;
};


export type CapitalquotientQueriesGetCqNotesByUserArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<SortUnderwritingReportEnum>;
  userId: Scalars['ID'];
};


export type CapitalquotientQueriesGetCqQualityLogsByUserArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['String']>;
};


export type CapitalquotientQueriesGetCqSettingsArgs = {
  settingsType?: InputMaybe<Cq_Settings>;
};


export type CapitalquotientQueriesGetCqSummaryReportsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type CapitalquotientQueriesGetCqUsersArgs = {
  status?: InputMaybe<Scalars['String']>;
};


export type CapitalquotientQueriesGetCqUsersPaginatedArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Cq_Status>;
};


export type CapitalquotientQueriesGetNoumenaScoreByNoumIdArgs = {
  noumId: Scalars['ID'];
};


export type CapitalquotientQueriesGetNoumenaScoreByUserArgs = {
  userId: Scalars['ID'];
};


export type CapitalquotientQueriesGetScoreLinesArgs = {
  scoreId: Scalars['ID'];
};

export type CategoryWithSkills = {
  __typename?: 'CategoryWithSkills';
  _id: Scalars['ID'];
  name: Scalars['String'];
  skills?: Maybe<Array<Maybe<Skill>>>;
};

export type ChamberAuthors = {
  __typename?: 'ChamberAuthors';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<UserOutput>>>;
};

export type ChamberByIdRef = {
  __typename?: 'ChamberByIdRef';
  _id: Scalars['ID'];
  fonts?: Maybe<Scalars['JSONObject']>;
  name?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['String']>;
  profileImageThumbnail?: Maybe<Scalars['String']>;
  theme?: Maybe<ThemeOutput>;
  type?: Maybe<Scalars['String']>;
  uid?: Maybe<UserOutput>;
};

export type ChamberByUserIdRef = {
  __typename?: 'ChamberByUserIdRef';
  _id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  uid?: Maybe<UserOutput>;
  userId?: Maybe<Scalars['ID']>;
};

export type ChamberFiltersAdmin = {
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  ownerIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  search?: InputMaybe<Scalars['String']>;
  spotLight?: InputMaybe<Scalars['Boolean']>;
  spotLightForAll?: InputMaybe<Scalars['Boolean']>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

export type ChamberPaginationInput = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type ChamberPost = {
  __typename?: 'ChamberPost';
  category?: Maybe<PostCategory>;
  content?: Maybe<Scalars['TypeAny']>;
  resolutions?: Maybe<Array<Maybe<ResolutionOutput>>>;
  thumbnail?: Maybe<Scalars['TypeAny']>;
};

export type ChamberPostContentInput = {
  category?: InputMaybe<PostCategory>;
  content?: InputMaybe<Scalars['InputAny']>;
  thumbnail?: InputMaybe<Scalars['InputAny']>;
};

export type ChamberPostInput = {
  chamberId: Scalars['ID'];
  groupId?: InputMaybe<Scalars['ID']>;
  post?: InputMaybe<ChamberPostContentInput>;
  tags?: InputMaybe<Array<InputMaybe<TagsInput>>>;
  text?: InputMaybe<Scalars['String']>;
  visibility?: InputMaybe<PostVisibility>;
};

export type ChamberPostOutput = {
  __typename?: 'ChamberPostOutput';
  _id: Scalars['ID'];
  chamberId?: Maybe<Scalars['ID']>;
  comments?: Maybe<Array<Maybe<Comments>>>;
  commentsCount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Date']>;
  groupId?: Maybe<Scalars['ID']>;
  isPinned?: Maybe<Scalars['Boolean']>;
  pinnedTimestamp?: Maybe<Scalars['Date']>;
  post?: Maybe<ChamberPost>;
  postStatus?: Maybe<PostStatus>;
  reactions?: Maybe<Array<Maybe<Reaction>>>;
  reactionsCount?: Maybe<Scalars['Int']>;
  reports?: Maybe<Array<Maybe<ReportOutput>>>;
  tags?: Maybe<Array<Maybe<TagsOutput>>>;
  text?: Maybe<Scalars['String']>;
  uid?: Maybe<UserOutput>;
  updatedAt?: Maybe<Scalars['Date']>;
  userReaction?: Maybe<ReactionCategory>;
  visibility?: Maybe<PostVisibility>;
};

export type ChamberPostOutputData = {
  __typename?: 'ChamberPostOutputData';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<ChamberPostOutput>>>;
};

export type ChambersMicroservicePaginationPayload = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type ChameleonBankListOutput = {
  __typename?: 'ChameleonBankListOutput';
  accountDetails?: Maybe<Array<Maybe<BankAccountOutput>>>;
  accountNumber?: Maybe<Scalars['String']>;
  accountSubType?: Maybe<Scalars['String']>;
  accountType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isExpired?: Maybe<Scalars['Boolean']>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type ChangeNoumMemberRoleInput = {
  memberIDs: Array<Scalars['ID']>;
  roleId: Scalars['ID'];
  walletLimitAmount?: InputMaybe<Scalars['Int']>;
  walletLimitType?: InputMaybe<WalletLimitType>;
};

export type CoManagerStatistics = {
  __typename?: 'CoManagerStatistics';
  eventsHosted: Scalars['Int'];
  membersInvited: Scalars['Int'];
  messagesSent: Scalars['Int'];
  postsPosted: Scalars['Int'];
  transactions: Scalars['Int'];
};

export type CoManagerStatisticsInput = {
  endDate?: InputMaybe<Scalars['ISODate']>;
  startDate?: InputMaybe<Scalars['ISODate']>;
};

export type Cohost = {
  __typename?: 'Cohost';
  _id?: Maybe<Scalars['ID']>;
  chamberId?: Maybe<ChamberByIdRef>;
  cohostChamberId?: Maybe<Scalars['ID']>;
  status?: Maybe<InvitationStatus>;
  userId?: Maybe<UserOutput>;
};

export type CohostInput = {
  chamberId?: InputMaybe<Scalars['ID']>;
  userId: Scalars['ID'];
};

export type CommentOutput = {
  __typename?: 'CommentOutput';
  _id: Scalars['ID'];
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  replies?: Maybe<ReplyOutput>;
  tags?: Maybe<Array<Maybe<TagsOutput>>>;
  uid?: Maybe<UserOutput>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type CommentReplyReactionOutput = {
  __typename?: 'CommentReplyReactionOutput';
  commentId: Scalars['ID'];
  postId: Scalars['ID'];
  reactions?: Maybe<Array<Maybe<Reaction>>>;
  threadId?: Maybe<Scalars['ID']>;
};

export type Comments = {
  __typename?: 'Comments';
  _id: Scalars['ID'];
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  reactions?: Maybe<Array<Maybe<Reaction>>>;
  replies?: Maybe<ReplyOutput>;
  tags?: Maybe<Array<Maybe<TagsOutput>>>;
  uid?: Maybe<UserOutput>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type CommissionAndReimbursement = {
  __typename?: 'CommissionAndReimbursement';
  amount?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
};

export type CommissionAndReimbursementInput = {
  amount?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
};

export type CommonFilter = {
  column: Scalars['String'];
  operator: FilterOperator;
  values: Array<Scalars['String']>;
};

export type ConfigOutput = {
  __typename?: 'ConfigOutput';
  plaid?: Maybe<PublishableKey>;
  stripe?: Maybe<PublishableKey>;
};

export type ConnectedNoumsInput = {
  filter?: InputMaybe<ProjectChamberFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SortType>;
};

export type ConnectedNoumsWithMember = {
  __typename?: 'ConnectedNoumsWithMember';
  count: Scalars['Int'];
  data: Array<SpaceOutput>;
};

export type ConnectedNoumsWithMemberInput = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type ConnectionByIdRef = {
  __typename?: 'ConnectionByIdRef';
  _id: Scalars['ID'];
  approvedAt?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  permission?: Maybe<ConnectionPermissionTypeEnum>;
  requestFrom?: Maybe<SpaceOutput>;
  requestTo?: Maybe<SpaceOutput>;
  requestedAt?: Maybe<Scalars['String']>;
  status?: Maybe<ConnectionRequestTypeEnum>;
  type?: Maybe<ConnectionTypeEnum>;
};

export type ConnectionCheck = {
  __typename?: 'ConnectionCheck';
  _id?: Maybe<Scalars['ID']>;
  connection?: Maybe<ConnectionType>;
};

export type ConnectionOutputResponse = {
  __typename?: 'ConnectionOutputResponse';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<SpaceConnection>>>;
};

export type ConnectionPermissionInput = {
  connectionsPermissions: Array<InputMaybe<PermissionInput>>;
};

export enum ConnectionPermissionType {
  Disconnect = 'DISCONNECT',
  Favorite = 'FAVORITE',
  Guest = 'GUEST'
}

export enum ConnectionPermissionTypeEnum {
  Disconnect = 'DISCONNECT',
  Favorite = 'FAVORITE',
  Guest = 'GUEST'
}

export enum ConnectionRequestStatus {
  Invited = 'INVITED',
  Requested = 'REQUESTED'
}

export enum ConnectionRequestTypeEnum {
  Approved = 'APPROVED',
  Archived = 'ARCHIVED',
  Cancelled = 'CANCELLED',
  Declined = 'DECLINED',
  Invited = 'INVITED',
  Removed = 'REMOVED',
  Requested = 'REQUESTED'
}

export enum ConnectionType {
  Connected = 'connected',
  None = 'none',
  Received = 'received',
  Requested = 'requested',
  Sent = 'sent'
}

export enum ConnectionTypeEnum {
  Facebook = 'FACEBOOK',
  Instagram = 'INSTAGRAM',
  Linkedin = 'LINKEDIN'
}

export type Connections = {
  __typename?: 'Connections';
  userid?: Maybe<UserOutput>;
};

export type Contact = {
  __typename?: 'Contact';
  _id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type ContactInput = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  middleName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type ContactOutput = {
  __typename?: 'ContactOutput';
  additionalEmail?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  preferredCommunicationMode?: Maybe<ModeEnum>;
};

export type Contactfilter = {
  userIds?: InputMaybe<Array<Scalars['String']>>;
};

export type Contract = {
  __typename?: 'Contract';
  _id: Scalars['ID'];
  arbitrationJurisdiction?: Maybe<Jurisdiction>;
  buyer?: Maybe<NoumContactOutput>;
  contractNumber: Scalars['Int'];
  contractPDF: PdfPreview;
  createdAt: Scalars['ISODate'];
  createdBy?: Maybe<UserOutput>;
  effectiveDate?: Maybe<Scalars['ISODate']>;
  isCompleted: Scalars['Boolean'];
  legalJurisdiction?: Maybe<Jurisdiction>;
  linkedNoum: SpaceOutput;
  linkedSOWs: Array<Sow>;
  logo?: Maybe<Scalars['String']>;
  seller?: Maybe<NoumContactOutput>;
  status: ContractStatus;
  templateName?: Maybe<Scalars['String']>;
  terminationDate?: Maybe<Scalars['ISODate']>;
  terminationNoticeInDays?: Maybe<Scalars['Int']>;
  timeline?: Maybe<Array<ContractSowTimeLine>>;
  timezone?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type ContractFilter = {
  consignors?: InputMaybe<Array<Scalars['ID']>>;
  noumId?: InputMaybe<Scalars['String']>;
  noumIds?: InputMaybe<Array<Scalars['ID']>>;
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Array<ContractStatus>>;
};

export type ContractFilterForAdmin = {
  noums?: InputMaybe<Array<Scalars['ID']>>;
  rangeFilter?: InputMaybe<Array<CommonFilter>>;
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Array<ContractStatus>>;
};

export type ContractInput = {
  arbitrationJurisdiction?: InputMaybe<JurisdictionInput>;
  buyer?: InputMaybe<Scalars['ID']>;
  effectiveDate?: InputMaybe<Scalars['ISODate']>;
  legalJurisdiction?: InputMaybe<JurisdictionInput>;
  linkedNoum?: InputMaybe<Scalars['ID']>;
  logo?: InputMaybe<Scalars['String']>;
  seller?: InputMaybe<Scalars['ID']>;
  templateName?: InputMaybe<Scalars['String']>;
  terminationDate?: InputMaybe<Scalars['ISODate']>;
  terminationNoticeInDays?: InputMaybe<Scalars['Int']>;
  timezone?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export enum ContractListingPov {
  CounterParty = 'COUNTER_PARTY',
  Owner = 'OWNER'
}

export enum ContractOrSow {
  Contract = 'CONTRACT',
  Sow = 'SOW'
}

export type ContractOutput = {
  __typename?: 'ContractOutput';
  docuSignId?: Maybe<Scalars['String']>;
  documentType?: Maybe<Scalars['String']>;
  effectiveDate?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ContractReportFiltersInput = {
  fileHeaders: Scalars['String'];
  rangeFilters: Array<InputMaybe<CommonFilter>>;
  search?: InputMaybe<Scalars['String']>;
  status: Array<InputMaybe<ContractStatus>>;
};

export enum ContractSow {
  Contract = 'Contract',
  Sow = 'SOW'
}

export type ContractSowTimeLine = {
  __typename?: 'ContractSowTimeLine';
  fromStatus?: Maybe<Scalars['String']>;
  timestamp: Scalars['ISODate'];
  toStatus: Scalars['String'];
  userId?: Maybe<Scalars['ID']>;
};

export enum ContractStatus {
  Amended = 'AMENDED',
  Draft = 'DRAFT',
  Issued = 'ISSUED',
  Signed = 'SIGNED'
}

export type ConversationActivity = {
  __typename?: 'ConversationActivity';
  _id?: Maybe<Scalars['ID']>;
};

export type ConversationIdOutput = {
  __typename?: 'ConversationIdOutput';
  cid: Scalars['String'];
};

export type ConversationInput = {
  accountSid?: InputMaybe<Scalars['String']>;
  attributes?: InputMaybe<Scalars['String']>;
  chatServiceSid?: InputMaybe<Scalars['String']>;
  dateCreated?: InputMaybe<Scalars['String']>;
  dateUpdated?: InputMaybe<Scalars['String']>;
  friendlyName?: InputMaybe<Scalars['String']>;
  links?: InputMaybe<ConversationLinksInput>;
  messagingServiceSid?: InputMaybe<Scalars['String']>;
  sid: Scalars['String'];
  state?: InputMaybe<Scalars['String']>;
  uniqueName?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type ConversationItem = {
  unread?: Maybe<Scalars['Int']>;
};

export type ConversationLink = {
  __typename?: 'ConversationLink';
  messages?: Maybe<Scalars['String']>;
  participants?: Maybe<Scalars['String']>;
  webhooks?: Maybe<Scalars['String']>;
};

export type ConversationLinksInput = {
  messages?: InputMaybe<Scalars['String']>;
  participants?: InputMaybe<Scalars['String']>;
  webhooks?: InputMaybe<Scalars['String']>;
};

export type ConversationMeta = {
  __typename?: 'ConversationMeta';
  accountSid?: Maybe<Scalars['String']>;
  attributes?: Maybe<Scalars['String']>;
  chatServiceSid?: Maybe<Scalars['String']>;
  dateCreated?: Maybe<Scalars['String']>;
  dateUpdated?: Maybe<Scalars['String']>;
  friendlyName?: Maybe<Scalars['String']>;
  links?: Maybe<ConversationLink>;
  messagingServiceSid?: Maybe<Scalars['String']>;
  sid: Scalars['String'];
  state?: Maybe<Scalars['String']>;
  totalUnreadConversationCount?: Maybe<Scalars['Int']>;
  uniqueName?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type ConversationOutput = {
  __typename?: 'ConversationOutput';
  _id?: Maybe<Scalars['ID']>;
  adminUserId?: Maybe<UserOutput>;
  cid?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  isReadOnly?: Maybe<Scalars['Boolean']>;
  metaData?: Maybe<ConversationMeta>;
  participants?: Maybe<Array<Maybe<UserOutput>>>;
  sender?: Maybe<UserOutput>;
  spaceId?: Maybe<Scalars['ID']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type ConversationOutputAll = {
  __typename?: 'ConversationOutputAll';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<ConversationItem>>>;
  unreadCount?: Maybe<Scalars['Int']>;
};

export enum ConversationTypeEnumForAdmin {
  All = 'ALL',
  Others = 'OTHERS',
  Self = 'SELF'
}

export type ConversationsOutput = {
  __typename?: 'ConversationsOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<ConversationOutput>>>;
  unreadMessageCount?: Maybe<Scalars['Int']>;
};

export type CookieConsentInput = {
  cookieConsent: Scalars['Boolean'];
  cookieConsentId: Scalars['String'];
};

export type CookieConsentOutput = {
  __typename?: 'CookieConsentOutput';
  cookieConsent?: Maybe<Scalars['Boolean']>;
  cookieConsentId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
};

export type CreateAccountOutput = {
  __typename?: 'CreateAccountOutput';
  accountIds: Array<Maybe<Scalars['String']>>;
};

export type CreateAdminReportInput = {
  filters?: InputMaybe<Scalars['String']>;
  reportType: AdminReportType;
};

export type CreateCustomerInput = {
  address1: Scalars['String'];
  businessClassification?: InputMaybe<Scalars['String']>;
  businessName?: InputMaybe<Scalars['String']>;
  businessType?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  dateOfBirth: Scalars['String'];
  ein?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  postalCode: Scalars['String'];
  ssn: Scalars['String'];
  state: Scalars['String'];
};

export type CreateCustomerOutput = {
  __typename?: 'CreateCustomerOutput';
  dwollaCustomer?: Maybe<Scalars['String']>;
  stripeCustomer?: Maybe<Scalars['String']>;
};

export type CreateCustomerPayee = {
  accountId?: InputMaybe<Scalars['String']>;
  accountNumber?: InputMaybe<Scalars['String']>;
  masterWalletId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  routingNumber?: InputMaybe<Scalars['String']>;
};

export type CreateElementInput = {
  bodyContent?: InputMaybe<Scalars['String']>;
  bodyContentJson?: InputMaybe<Scalars['JSONObject']>;
  bodyContentType: BodyContentEnum;
  elementId?: InputMaybe<Scalars['ID']>;
  elementType: ElementTypeEnum;
  headerContent?: InputMaybe<Scalars['String']>;
  percentCompleted?: InputMaybe<Scalars['Int']>;
  position?: InputMaybe<Scalars['Int']>;
  status: ElementStatusEnum;
};

export type CreateEventInput = {
  chamberId: Scalars['ID'];
  cohosts: Array<InputMaybe<CohostInput>>;
  description: Scalars['String'];
  duration?: InputMaybe<Scalars['Int']>;
  eventDate: Scalars['Date'];
  eventEndDate?: InputMaybe<Scalars['Date']>;
  invitations: Array<InputMaybe<InvitationInput>>;
  isInstantEvent?: InputMaybe<Scalars['Boolean']>;
  privacy: Privacy;
  recurring?: InputMaybe<Scalars['Boolean']>;
  recurringDetails?: InputMaybe<RecurringDetailsInput>;
  timezone: Scalars['String'];
  title: Scalars['String'];
};

export type CreateInstantEventInput = {
  chamberId: Scalars['ID'];
  description?: InputMaybe<Scalars['String']>;
  invitations: Array<InputMaybe<InvitationInput>>;
  title: Scalars['String'];
};

export type CreateNewContractInput = {
  linkedNoum: Scalars['ID'];
  templateName?: InputMaybe<Scalars['String']>;
  timezone?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type CreateNewSowInput = {
  commission?: InputMaybe<Array<CommissionAndReimbursementInput>>;
  deliverables?: InputMaybe<Array<DeliverablesAndMilestonesInput>>;
  effectiveDate?: InputMaybe<Scalars['ISODate']>;
  expenseReimbursement?: InputMaybe<Array<CommissionAndReimbursementInput>>;
  fees?: InputMaybe<FeesCategoryInput>;
  linkedContract?: InputMaybe<Scalars['ID']>;
  linkedNoum: Scalars['ID'];
  milestones?: InputMaybe<Array<DeliverablesAndMilestonesInput>>;
  scopeOfWork?: InputMaybe<Scalars['String']>;
  templateName?: InputMaybe<Scalars['String']>;
  timezone?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type CreateNoumLayoutSectionInput = {
  noumId: Scalars['ID'];
  position: Scalars['Int'];
  type: NoumLayoutSectionType;
};

export type CreateNoumRoleInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  permissionIDs: Array<Scalars['ID']>;
};

export type CreatePassCodeInput = {
  passCode: Scalars['String'];
  securityQuestions: Array<SecurityQuestion>;
};

export type CreatePlaidLinkOutput = {
  __typename?: 'CreatePlaidLinkOutput';
  link_token: Scalars['String'];
};

export type CreateProductInput = {
  code?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  currencyCode?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  effectiveDateFrom?: InputMaybe<Scalars['String']>;
  effectiveDateTo?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  productOwner?: InputMaybe<Scalars['String']>;
  typeCode: Scalars['String'];
};

export enum CsvReportStage {
  Converted = 'CONVERTED',
  Fetched = 'FETCHED',
  Finished = 'FINISHED',
  Initialized = 'INITIALIZED',
  Mapped = 'MAPPED',
  Started = 'STARTED',
  Uploaded = 'UPLOADED'
}

export enum CsvReportStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Progress = 'PROGRESS'
}

export type CurrencyData = {
  __typename?: 'CurrencyData';
  currency?: Maybe<CurrencyEnum>;
  value?: Maybe<Scalars['Float']>;
};

export enum CurrencyEnum {
  Usd = 'USD'
}

export type CurrencyInput = {
  currency: CurrencyEnum;
  value: Scalars['Float'];
};

export type CurrencyOutput = {
  __typename?: 'CurrencyOutput';
  currency: CurrencyEnum;
  value: Scalars['Float'];
};

export type CurrentUser = {
  __typename?: 'CurrentUser';
  eventId: Scalars['ID'];
  invitation?: Maybe<Invitees>;
  isBlocked?: Maybe<Scalars['Boolean']>;
  userId: Scalars['ID'];
  userRole?: Maybe<UserRole>;
};

export type CurrentUserPaymentLimitOutput = {
  __typename?: 'CurrentUserPaymentLimitOutput';
  achConsumedLimit?: Maybe<Scalars['Float']>;
  achTransactionLimit?: Maybe<Scalars['Float']>;
  achWeeklyLimit?: Maybe<Scalars['Float']>;
  availableACHLimit?: Maybe<Scalars['Float']>;
  availableWalletLimit?: Maybe<Scalars['Float']>;
  enableInvoiceLimit?: Maybe<Scalars['Float']>;
  unverifiedCustomerAvailableLimit?: Maybe<Scalars['Float']>;
  unverifiedCustomerWeeklyLimit?: Maybe<Scalars['Float']>;
  walletConsumedLimit?: Maybe<Scalars['Float']>;
  walletTransactionLimit?: Maybe<Scalars['Float']>;
  walletWeeklyLimit?: Maybe<Scalars['Float']>;
};

export type Customer = {
  __typename?: 'Customer';
  created_at?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  external_customer_id: Scalars['String'];
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  uid: Scalars['String'];
  updated_at?: Maybe<Scalars['String']>;
};

export type CustomerAccountsOutput = {
  __typename?: 'CustomerAccountsOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<CustomerWithAccountOutput>>;
};

export type CustomerAddressInput = {
  apartment?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  customerId?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  zipcode?: InputMaybe<Scalars['String']>;
};

export type CustomerDocumentOutput = {
  __typename?: 'CustomerDocumentOutput';
  allFailureReasons?: Maybe<Array<Maybe<DocumentFailureReason>>>;
  createdAt?: Maybe<Scalars['String']>;
  customerId?: Maybe<Scalars['String']>;
  documentVerificationStatus?: Maybe<KycProviderDocVerifyStatusEnum>;
  failureReason?: Maybe<DocumentFailureReason>;
  id?: Maybe<Scalars['String']>;
  meta?: Maybe<Array<Maybe<DocumentMeta>>>;
  providerDocUrl?: Maybe<Scalars['String']>;
  providerId?: Maybe<Scalars['String']>;
  reUpload?: Maybe<Scalars['Boolean']>;
  s3DocRef?: Maybe<Scalars['String']>;
  status?: Maybe<KycProviderDocStatusEnum>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type CustomerInputType = {
  email?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  /** User ID */
  uid?: InputMaybe<Scalars['String']>;
};

export type CustomerKycAccountsOutput = {
  __typename?: 'CustomerKYCAccountsOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<CustomerKycWithAccountOutput>>;
};

export type CustomerKycAuditLog = {
  __typename?: 'CustomerKYCAuditLog';
  actionTakenBy?: Maybe<KycActionTakenEnum>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<UserOutput>;
  id?: Maybe<Scalars['String']>;
  newStatus?: Maybe<Scalars['String']>;
  oldStatus?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  sequence?: Maybe<Scalars['Int']>;
  statusType?: Maybe<StatusUpdateTypeEnum>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type CustomerKycAuditLogCount = {
  __typename?: 'CustomerKYCAuditLogCount';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<CustomerKycAuditLog>>;
};

export type CustomerKycFilter = {
  rangeFilters?: InputMaybe<Array<InputMaybe<PaymentCustomerCommonFilter>>>;
  tab?: InputMaybe<CustomerTab>;
};

export type CustomerKycWithAccountOutput = {
  __typename?: 'CustomerKYCWithAccountOutput';
  accounts?: Maybe<Array<Maybe<AccountListOutput>>>;
  createdAt?: Maybe<Scalars['String']>;
  customerType?: Maybe<Scalars['String']>;
  docStatus?: Maybe<KycDocumentStatusEnum>;
  enableTransactionLimit?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  msg?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  noumenaStatus?: Maybe<KycNoumenaStatusEnum>;
  providerStatus?: Maybe<KycProviderStatusEnum>;
  status?: Maybe<Scalars['String']>;
  transactionFlagHistory?: Maybe<Array<Maybe<TransactionFlagHistoryForAdmin>>>;
  updateStatus?: Maybe<KycUpdateStatusEnum>;
  userId?: Maybe<UserOutput>;
};

export type CustomerLimitOutput = {
  __typename?: 'CustomerLimitOutput';
  availableWeeklyLimit: Scalars['Float'];
  consumedWeeklyLimit: Scalars['Float'];
  transactionLimit: Scalars['Float'];
  weeklyLimit: Scalars['Float'];
};

export type CustomerLogsOutput = {
  __typename?: 'CustomerLogsOutput';
  _id?: Maybe<Scalars['String']>;
  customerId?: Maybe<Scalars['String']>;
  operationType?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  updatedBy?: Maybe<UserOutput>;
  updates?: Maybe<Scalars['JSON']>;
};

export type CustomerOutput = {
  __typename?: 'CustomerOutput';
  accountNumber?: Maybe<Scalars['String']>;
  additionalEmail?: Maybe<Scalars['String']>;
  address?: Maybe<AddressOutput>;
  applicationDate?: Maybe<Scalars['String']>;
  applicationIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  approvedInvestmentAmount?: Maybe<Scalars['String']>;
  bankName?: Maybe<Scalars['String']>;
  chameleonAccountNumber?: Maybe<Array<Maybe<Scalars['String']>>>;
  contracts?: Maybe<Array<Maybe<UserContractOutput>>>;
  customerId?: Maybe<Scalars['String']>;
  debitAccountNumber?: Maybe<Scalars['String']>;
  debitBankName?: Maybe<Scalars['String']>;
  debitRoutingNumber?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['Date']>;
  docusignEffectiveDate?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  industry?: Maybe<Scalars['String']>;
  initialMonthlyIncome?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  maximumIncomePaymentRate?: Maybe<Scalars['String']>;
  maximumInvestmentReturn?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  preferredCommunicationMode?: Maybe<Scalars['String']>;
  productCode?: Maybe<Scalars['String']>;
  routingNumber?: Maybe<Scalars['String']>;
  uid?: Maybe<CustomerUserOutput>;
};

export type CustomerPayeeList = {
  __typename?: 'CustomerPayeeList';
  accountId: Scalars['String'];
  accountType?: Maybe<AccountType>;
  chamberId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  customerName: Scalars['String'];
  id: Scalars['String'];
  maskAccountNumber?: Maybe<Scalars['String']>;
  masterWalletId?: Maybe<Scalars['String']>;
  subAccountType?: Maybe<SubAccountType>;
  updatedAt?: Maybe<Scalars['String']>;
  userId?: Maybe<UserOutput>;
  walletName?: Maybe<Scalars['String']>;
};

export type CustomerPayeeListV2 = {
  __typename?: 'CustomerPayeeListV2';
  count: Scalars['Int'];
  data: Array<Maybe<CustomerPayeeList>>;
};

export type CustomerPersonalInput = {
  customerId?: InputMaybe<Scalars['String']>;
  dob?: InputMaybe<Scalars['Date']>;
  firstName?: InputMaybe<Scalars['String']>;
  industry?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  middleName?: InputMaybe<Scalars['String']>;
};

export type CustomerSearch = {
  accountNumber?: InputMaybe<Scalars['String']>;
  applicationId?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  contractSignedFrom?: InputMaybe<Scalars['String']>;
  contractSignedTo?: InputMaybe<Scalars['String']>;
  customerId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  middleName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['ID']>;
};

export enum CustomerTab {
  ApprovedRejected = 'APPROVED_REJECTED',
  PendingAction = 'PENDING_ACTION',
  PendingVerification = 'PENDING_VERIFICATION'
}

export type CustomerUserOutput = {
  __typename?: 'CustomerUserOutput';
  SocialHallTCAccepted?: Maybe<Scalars['Boolean']>;
  _id: Scalars['ID'];
  bio?: Maybe<Scalars['String']>;
  citizenship?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  creditCheckResult?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  kycResult?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  profileUrl?: Maybe<Scalars['String']>;
  referralCode?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<CustomerUserRoleOutput>>>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  unreadConnectionCount?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Date']>;
  userOwnReferralCode?: Maybe<Scalars['String']>;
  userStatus?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type CustomerUserRoleOutput = {
  __typename?: 'CustomerUserRoleOutput';
  roleType?: Maybe<Scalars['String']>;
};

export type CustomerWithAccountOutput = {
  __typename?: 'CustomerWithAccountOutput';
  accounts?: Maybe<Array<Maybe<AccountListOutput>>>;
  createdAt?: Maybe<Scalars['String']>;
  enableTransactionLimit?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  transactionFlagHistory?: Maybe<Array<Maybe<TransactionFlagHistoryForAdmin>>>;
  userId?: Maybe<UserOutput>;
};

export type CustomerWithTotalOutput = {
  __typename?: 'CustomerWithTotalOutput';
  customers?: Maybe<Array<Maybe<CustomerOutput>>>;
  total?: Maybe<Scalars['String']>;
};

export type CustomersFilter = {
  endDate?: InputMaybe<Scalars['String']>;
  search?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['String']>;
};

export type CustomersOutput = {
  __typename?: 'CustomersOutput';
  data?: Maybe<Array<Maybe<CustomerOutput>>>;
  total?: Maybe<Scalars['Int']>;
};

export type DebitAccountOutput = {
  __typename?: 'DebitAccountOutput';
  accountNumber?: Maybe<Scalars['String']>;
  accountSubType?: Maybe<Scalars['String']>;
  accountType?: Maybe<Scalars['String']>;
  institutionId?: Maybe<Scalars['String']>;
  institutionName?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  routingNumber?: Maybe<Scalars['String']>;
};

export type DefaultNoumTransactionFeeDetailInput = {
  /** Noum ID */
  chamber_id?: InputMaybe<Scalars['String']>;
  /** User ID */
  uid?: InputMaybe<Scalars['String']>;
};

export type DeleteAccountInput = {
  deletePII: Scalars['Boolean'];
  reason?: InputMaybe<Scalars['String']>;
};

export type DeliverablesAndMilestones = {
  __typename?: 'DeliverablesAndMilestones';
  description?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['ISODate']>;
  title?: Maybe<Scalars['String']>;
};

export type DeliverablesAndMilestonesInput = {
  description?: InputMaybe<Scalars['String']>;
  dueDate?: InputMaybe<Scalars['ISODate']>;
  title?: InputMaybe<Scalars['String']>;
};

export type DeviceToken = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  token?: InputMaybe<Scalars['String']>;
};

export type DeviceTokenOutput = {
  __typename?: 'DeviceTokenOutput';
  isActive?: Maybe<Scalars['Boolean']>;
  token?: Maybe<Scalars['String']>;
};

export type DialsInput = {
  interestRate?: InputMaybe<Scalars['String']>;
  investingAmnt?: InputMaybe<Scalars['String']>;
  maxInvestingAmnt?: InputMaybe<Scalars['String']>;
};

export type Discovery = {
  __typename?: 'Discovery';
  location?: Maybe<Scalars['String']>;
  profileCompletion?: Maybe<Array<Maybe<ProfileCompletion>>>;
  skillOwn?: Maybe<Array<Scalars['ID']>>;
  skillSought?: Maybe<Array<Scalars['ID']>>;
  uid?: Maybe<User>;
};

export type DiscoveryResponse = {
  __typename?: 'DiscoveryResponse';
  count?: Maybe<Scalars['Int']>;
  userIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type DocuSignOutput = {
  __typename?: 'DocuSignOutput';
  redirectURL?: Maybe<Scalars['String']>;
};

export type DocumentFailureReason = {
  __typename?: 'DocumentFailureReason';
  description?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
};

export type DocumentInput = {
  name: Scalars['String'];
  uploadFor: UploadFor;
};

export type DocumentMeta = {
  __typename?: 'DocumentMeta';
  name?: Maybe<Scalars['String']>;
  uploadFor?: Maybe<UploadFor>;
};

export type DocumentOutput = {
  __typename?: 'DocumentOutput';
  contracts?: Maybe<Array<Maybe<UserContractOutput>>>;
  docuSignId?: Maybe<Scalars['String']>;
  documentType?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  productCode?: Maybe<Scalars['String']>;
};

export enum DocumentType {
  IdCard = 'ID_CARD',
  License = 'LICENSE',
  Passport = 'PASSPORT'
}

export type DunningAttemptOutput = {
  __typename?: 'DunningAttemptOutput';
  attempt?: Maybe<Scalars['Float']>;
  created_at?: Maybe<Scalars['String']>;
  dunning_attempt_id: Scalars['Float'];
  dunning_type?: Maybe<Scalars['String']>;
  transaction_id?: Maybe<Scalars['String']>;
  txn_amount?: Maybe<Scalars['Float']>;
  txn_status?: Maybe<Scalars['String']>;
};

export enum DwollaAccountType {
  Checking = 'checking',
  Savings = 'savings'
}

export type DwollaCardCreate = {
  href: Scalars['String'];
};

export enum DwollaPaymentStatus {
  Cancelled = 'cancelled',
  Failed = 'failed',
  Pending = 'pending',
  Processed = 'processed'
}

export type DwollaTransaction = {
  __typename?: 'DwollaTransaction';
  amount?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['String']>;
  currency?: Maybe<CurrencyEnum>;
  destinationAccount?: Maybe<FundingSourceOutput>;
  destinationAccountId?: Maybe<Scalars['String']>;
  destinationClearing?: Maybe<Scalars['String']>;
  destinationCustomer?: Maybe<PaymentCustomerOutput>;
  destinationCustomerId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  sourceAccount?: Maybe<FundingSourceOutput>;
  sourceAccountId?: Maybe<Scalars['String']>;
  sourceClearing?: Maybe<Scalars['String']>;
  sourceCustomer?: Maybe<PaymentCustomerOutput>;
  sourceCustomerId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  transactionDate?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type DwollaTransactionOutput = {
  __typename?: 'DwollaTransactionOutput';
  count: Scalars['Int'];
  data?: Maybe<Array<Maybe<DwollaTransaction>>>;
};

export enum Enum_Page_Rule_Operator {
  And = 'AND',
  Or = 'OR'
}

export enum Enum_Question_Input_Subtype {
  Date = 'DATE',
  DateRange = 'DATE_RANGE',
  Email = 'EMAIL',
  Number = 'NUMBER',
  Text = 'TEXT'
}

export enum Enum_Question_Multi_Select_Subtype {
  Checkbox = 'CHECKBOX',
  Dropdown = 'DROPDOWN'
}

export enum Enum_Question_Select_Presentation {
  TitleAndDescription = 'TITLE_AND_DESCRIPTION',
  TitleOnly = 'TITLE_ONLY'
}

export enum Enum_Question_Select_Subtype {
  Dropdown = 'DROPDOWN',
  Radio = 'RADIO'
}

export enum Enum_Survey_Status_Input {
  Active = 'ACTIVE',
  All = 'ALL',
  Inactive = 'INACTIVE'
}

export enum Enum_Transactions_Accounts {
  Bank = 'BANK',
  Card = 'CARD',
  ExternalBank = 'EXTERNAL_BANK',
  OthersBank = 'OTHERS_BANK',
  OthersWallet = 'OTHERS_WALLET',
  Wallet = 'WALLET'
}

export enum Enum_Transaction_Category {
  Ach = 'ACH',
  CreditCard = 'CREDIT_CARD',
  Wallets = 'WALLETS'
}

export enum Enum_Transaction_Provider {
  Dwolla = 'DWOLLA',
  Stripe = 'STRIPE'
}

export enum Enum_Transaction_Settlement {
  NextDay = 'NEXT_DAY',
  Standard = 'STANDARD'
}

export type EditAccountPasswordOutput = {
  __typename?: 'EditAccountPasswordOutput';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ElementInnerOutput = {
  __typename?: 'ElementInnerOutput';
  bodyContent?: Maybe<Scalars['String']>;
  bodyContentJson?: Maybe<Scalars['JSONObject']>;
  customPreviewPosition?: Maybe<Scalars['Int']>;
  headerContent?: Maybe<Scalars['String']>;
  isCustomPreviewVisible?: Maybe<Scalars['Boolean']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  meta?: Maybe<Scalars['JSONObject']>;
  percentCompleted?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
};

export type ElementInput = {
  bodyContent?: InputMaybe<Scalars['String']>;
  bodyContentJson?: InputMaybe<Scalars['JSONObject']>;
  bodyContentType?: InputMaybe<BodyContentEnum>;
  elementId?: InputMaybe<Scalars['ID']>;
  elementType?: InputMaybe<ElementTypeEnum>;
  headerContent?: InputMaybe<Scalars['String']>;
  meta?: InputMaybe<Scalars['JSONObject']>;
  percentCompleted?: InputMaybe<Scalars['Int']>;
  position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<ElementStatusEnum>;
};

export type ElementOutput = {
  __typename?: 'ElementOutput';
  _id?: Maybe<Scalars['ID']>;
  bodyContent?: Maybe<Scalars['String']>;
  bodyContentJson?: Maybe<Scalars['JSONObject']>;
  bodyContentType?: Maybe<BodyContentEnum>;
  customPreviewPosition?: Maybe<Scalars['Int']>;
  draft?: Maybe<ElementInnerOutput>;
  elementType?: Maybe<Scalars['String']>;
  headerContent?: Maybe<Scalars['String']>;
  isCustomPreviewAdditionalInfo?: Maybe<Scalars['Boolean']>;
  isCustomPreviewVisible?: Maybe<Scalars['Boolean']>;
  meta?: Maybe<Scalars['JSONObject']>;
  originalBodyContent?: Maybe<Scalars['String']>;
  originalBodyContentJson?: Maybe<Scalars['JSONObject']>;
  originalHeaderContent?: Maybe<Scalars['String']>;
  percentCompleted?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
  profanityStatus?: Maybe<NoumElementProfanityStatus>;
  status?: Maybe<Scalars['String']>;
  tempStatus?: Maybe<ElementStatusEnum>;
  unSaved?: Maybe<ElementInnerOutput>;
  viewOnly?: Maybe<Scalars['Boolean']>;
};

export type ElementPositionInput = {
  _id: Scalars['ID'];
  position: Scalars['Int'];
};

export enum ElementStatusEnum {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
  Unsaved = 'UNSAVED'
}

export enum ElementStatusEnumForStateChange {
  Draft = 'DRAFT',
  Unsaved = 'UNSAVED'
}

export enum ElementTypeEnum {
  AchievementAward = 'ACHIEVEMENT_AWARD',
  BusinessBrief = 'BUSINESS_BRIEF',
  Calendar = 'CALENDAR',
  Connection = 'CONNECTION',
  ContractManager = 'CONTRACT_MANAGER',
  EducationTraining = 'EDUCATION_TRAINING',
  Events = 'EVENTS',
  FilesManager = 'FILES_MANAGER',
  Home = 'HOME',
  Image = 'IMAGE',
  Instagram = 'INSTAGRAM',
  Invitation = 'INVITATION',
  Message = 'MESSAGE',
  PersonalInterest = 'PERSONAL_INTEREST',
  Profile = 'PROFILE',
  ProjectWorkExperience = 'PROJECT_WORK_EXPERIENCE',
  PublicationDesignPatterns = 'PUBLICATION_DESIGN_PATTERNS',
  QuickQuestions = 'QUICK_QUESTIONS',
  Skills = 'SKILLS',
  SocialInterest = 'SOCIAL_INTEREST',
  Text = 'TEXT',
  Usernetwork = 'USERNETWORK',
  Userposts = 'USERPOSTS',
  Video = 'VIDEO',
  Wallet = 'WALLET'
}

export type EmailParams = {
  emailParams?: InputMaybe<Scalars['JSON']>;
  from?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  template?: InputMaybe<Template>;
  text?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export enum EntityType {
  Event = 'Event',
  HomeNoum = 'HomeNoum',
  NoumContact = 'NoumContact',
  Post = 'Post',
  ProjectNoum = 'ProjectNoum'
}

export enum EnumAdCampaignOfferStatus {
  Accepted = 'ACCEPTED',
  Deleted = 'DELETED',
  Draft = 'DRAFT',
  Rejected = 'REJECTED',
  Sent = 'SENT'
}

export type ErrorObject = {
  __typename?: 'ErrorObject';
  lockDate?: Maybe<Scalars['String']>;
  lockInterval?: Maybe<Scalars['Int']>;
  message: Scalars['String'];
  retryCount?: Maybe<Scalars['Int']>;
  success: Scalars['Boolean'];
  userLocked: Scalars['Boolean'];
};

export type Event = {
  __typename?: 'Event';
  _id: Scalars['ID'];
  chamberId?: Maybe<ChamberByIdRef>;
  cohosts: Array<Cohost>;
  currentUser?: Maybe<CurrentUser>;
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  eventDate?: Maybe<Scalars['Date']>;
  eventStatusUpdatedAt?: Maybe<Scalars['Date']>;
  hostChamberId?: Maybe<Scalars['ID']>;
  icsFile?: Maybe<Scalars['String']>;
  invitations: Array<Invitees>;
  isInstantEvent?: Maybe<Scalars['Boolean']>;
  privacy?: Maybe<Privacy>;
  recurring?: Maybe<Scalars['Boolean']>;
  recurringDetails?: Maybe<RecurringDetails>;
  socialHall?: Maybe<SocialHall>;
  socialHallId?: Maybe<Scalars['ID']>;
  status?: Maybe<EventsStatus>;
  timezone?: Maybe<Timezone>;
  title: Scalars['String'];
  totalAttendees?: Maybe<Scalars['Int']>;
  userId?: Maybe<UserOutput>;
};

export type EventActivity = {
  __typename?: 'EventActivity';
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Date']>;
  eventId?: Maybe<Scalars['ID']>;
  startDate?: Maybe<Scalars['Date']>;
  title?: Maybe<Scalars['String']>;
};

export type EventActivityInput = {
  description?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['Date']>;
  eventId?: InputMaybe<Scalars['ID']>;
  startDate?: InputMaybe<Scalars['Date']>;
  title?: InputMaybe<Scalars['String']>;
};

export type EventAttendeesFilter = {
  attendeesType?: InputMaybe<AttendeesType>;
  cohosts?: InputMaybe<Scalars['Boolean']>;
  invitationStatus?: InputMaybe<Array<InputMaybe<InvitationStatus>>>;
  invitees?: InputMaybe<Scalars['Boolean']>;
};

export type EventMeta = {
  __typename?: 'EventMeta';
  acceptedEventsCount?: Maybe<Scalars['Int']>;
  allEventsCount?: Maybe<Scalars['Int']>;
  hostedEventsCount?: Maybe<Scalars['Int']>;
  pastEventsCount?: Maybe<Scalars['Int']>;
  pendingEventsCount?: Maybe<Scalars['Int']>;
};

export type EventNotificationDetails = {
  __typename?: 'EventNotificationDetails';
  id?: Maybe<Event>;
  invitedBy?: Maybe<User>;
  invitee?: Maybe<User>;
  time?: Maybe<Scalars['Int']>;
};

export type EventNotificationDetailsV2 = {
  __typename?: 'EventNotificationDetailsV2';
  id?: Maybe<Event>;
  invitedBy?: Maybe<User>;
  invitee?: Maybe<User>;
  time?: Maybe<Scalars['Int']>;
};

export type EventOutput = {
  __typename?: 'EventOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<Event>>>;
};

export type EventSocialHallInput = {
  chamberId: Scalars['ID'];
  endTime?: InputMaybe<Scalars['Date']>;
  eventId: Scalars['ID'];
  hosts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  isActive: Scalars['Boolean'];
  name?: InputMaybe<Scalars['String']>;
  startTime?: InputMaybe<Scalars['Date']>;
  userId?: InputMaybe<Scalars['ID']>;
};

export enum EventStatus {
  Attending = 'Attending',
  Finished = 'Finished',
  Hosting = 'Hosting',
  Invited = 'Invited',
  NotAttending = 'NotAttending'
}

export type EventSubscriptionData = {
  __typename?: 'EventSubscriptionData';
  eventId: Scalars['ID'];
  type: EventSubscriptionType;
  userId?: Maybe<Scalars['ID']>;
};

export enum EventSubscriptionType {
  Cancelled = 'CANCELLED',
  CancelInvite = 'CANCEL_INVITE',
  EventExpired = 'EVENT_EXPIRED',
  EventUpdated = 'EVENT_UPDATED',
  GoLive = 'GO_LIVE',
  Live = 'LIVE',
  NewEvent = 'NEW_EVENT',
  PostEvent = 'POST_EVENT',
  PostEventEnded = 'POST_EVENT_ENDED',
  PreEvent = 'PRE_EVENT',
  PreLive = 'PRE_LIVE',
  UserBlockedFromEvent = 'USER_BLOCKED_FROM_EVENT'
}

export enum EventsFilter {
  Attending = 'ATTENDING',
  Expired = 'EXPIRED',
  Hosting = 'HOSTING',
  Invitation = 'INVITATION',
  Upcoming = 'UPCOMING'
}

export enum EventsStatus {
  Cancelled = 'CANCELLED',
  Expired = 'EXPIRED',
  GoLive = 'GO_LIVE',
  Live = 'LIVE',
  PostEvent = 'POST_EVENT',
  PostEventEnded = 'POST_EVENT_ENDED',
  PreEvent = 'PRE_EVENT',
  PreLive = 'PRE_LIVE',
  Upcoming = 'UPCOMING'
}

/** ExampleType is only for demonstration purposes */
export type ExampleType = {
  __typename?: 'ExampleType';
  message?: Maybe<Scalars['String']>;
};

export type ExportCsvFilter = {
  endDate?: InputMaybe<Scalars['String']>;
  maxAmount?: InputMaybe<Scalars['Float']>;
  minAmount?: InputMaybe<Scalars['Float']>;
  paymentStatus?: InputMaybe<DwollaPaymentStatus>;
  rangeFilters?: InputMaybe<Array<InputMaybe<PaymentCustomerCommonFilter>>>;
  search?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['String']>;
  tab?: InputMaybe<CustomerTab>;
};

export enum ExportFileType {
  ReqFile = 'REQ_FILE',
  ResFile = 'RES_FILE'
}

export enum File_Access_Category {
  GlobalSettings = 'GLOBAL_SETTINGS'
}

export enum FeeApplied {
  Receiver = 'RECEIVER',
  Sender = 'SENDER'
}

export type FeesCategory = {
  __typename?: 'FeesCategory';
  feesData?: Maybe<Array<Maybe<FeesInfo>>>;
  type?: Maybe<FeesCategoryTypes>;
};

export type FeesCategoryInput = {
  feesData?: InputMaybe<Array<InputMaybe<FeesInfoInput>>>;
  type?: InputMaybe<FeesCategoryTypes>;
};

export enum FeesCategoryTypes {
  Inadvance = 'INADVANCE',
  Installments = 'INSTALLMENTS',
  Lumpsum = 'LUMPSUM',
  Milestones = 'MILESTONES',
  Recurring = 'RECURRING'
}

export type FeesInfo = {
  __typename?: 'FeesInfo';
  amount?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['ISODate']>;
  fromDate?: Maybe<Scalars['String']>;
  recurringType?: Maybe<FeesRecurringType>;
};

export type FeesInfoInput = {
  amount?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
  dueDate?: InputMaybe<Scalars['ISODate']>;
  fromDate?: InputMaybe<Scalars['String']>;
  recurringType?: InputMaybe<FeesRecurringType>;
};

export enum FeesRecurringType {
  Halfyearly = 'HALFYEARLY',
  Monthly = 'MONTHLY',
  Quarterly = 'QUARTERLY',
  Yearly = 'YEARLY'
}

export type FileAccessInput = {
  category: File_Access_Category;
  fileName: Scalars['String'];
};

export type FileData = {
  __typename?: 'FileData';
  amount?: Maybe<Scalars['Float']>;
  currency?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  fileHeaders?: Maybe<Scalars['String']>;
  filter?: Maybe<Scalars['String']>;
  transaction_reason?: Maybe<Scalars['String']>;
};

export type FileInput = {
  fileName: Scalars['String'];
  mime: Scalars['String'];
};

export type FileUploadInput = {
  fileName: Scalars['String'];
  fileType: Scalars['String'];
};

export type FilterEvents = {
  eventFilter?: InputMaybe<EventsFilter>;
};

export enum FilterNoumRoleByValue {
  Active = 'Active',
  All = 'All',
  Archived = 'Archived',
  Custom = 'Custom',
  Default = 'Default'
}

export enum FilterOperator {
  Btw = 'btw',
  Btwe = 'btwe',
  Eq = 'eq',
  Gt = 'gt',
  Gte = 'gte',
  In = 'in',
  Lt = 'lt',
  Lte = 'lte',
  Neq = 'neq'
}

export type FilterType = {
  column?: InputMaybe<Scalars['String']>;
  operator?: InputMaybe<FilterOperator>;
  values?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export enum FlowofFundsEnum {
  Inbound = 'Inbound',
  Outbound = 'Outbound',
  Transfer = 'Transfer'
}

export enum FollowActionEnum {
  Follow = 'FOLLOW',
  Unfollow = 'UNFOLLOW'
}

export enum FollowSource {
  FeaturedPage = 'FEATURED_PAGE'
}

export enum Frequency {
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY',
  Yearly = 'YEARLY'
}

export type FundingSourceBalanceOutput = {
  __typename?: 'FundingSourceBalanceOutput';
  balance?: Maybe<CurrencyData>;
  customerType?: Maybe<Scalars['String']>;
  docStatus?: Maybe<Scalars['String']>;
  lastUpdated?: Maybe<Scalars['String']>;
  noumenaStatus?: Maybe<Scalars['String']>;
  providerStatus?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  total?: Maybe<CurrencyData>;
  updateStatus?: Maybe<Scalars['String']>;
};

export type FundingSourceIdInput = {
  fundingSourceId: Scalars['String'];
};

export type FundingSourceListInput = {
  destCustomerId?: InputMaybe<Scalars['String']>;
  paymentProviderId: Scalars['String'];
};

export type FundingSourceOutput = {
  __typename?: 'FundingSourceOutput';
  accountName?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  accountType?: Maybe<Scalars['String']>;
  balance?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['String']>;
  customerId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  maskAccountNumber?: Maybe<Scalars['String']>;
  paymentChannel?: Maybe<PaymentChannelsEnum>;
  routingNumber?: Maybe<Scalars['String']>;
};

export type GenericResponseOutput = {
  __typename?: 'GenericResponseOutput';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type GetAllNoumFilter = {
  category?: InputMaybe<Scalars['ID']>;
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  projectType?: InputMaybe<ProjectChamberType>;
  search?: InputMaybe<Scalars['String']>;
  spaceIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  status?: InputMaybe<SpaceStatusEnum>;
  statuses?: InputMaybe<Array<InputMaybe<SpaceStatusEnum>>>;
  type?: InputMaybe<Array<InputMaybe<SpaceTypeEnum>>>;
};

export type GetAllSowFilter = {
  consignors?: InputMaybe<Array<Scalars['ID']>>;
  linkedContract?: InputMaybe<Scalars['ID']>;
  noumId?: InputMaybe<Scalars['String']>;
  noumIds?: InputMaybe<Array<Scalars['ID']>>;
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Array<SowStatus>>;
  unlinked?: InputMaybe<Scalars['Boolean']>;
};

export enum GetConversationsFilterType {
  All = 'ALL',
  HomeNoum = 'HOME_NOUM',
  ProjectNoum = 'PROJECT_NOUM'
}

export type GetLinkedSoWsFilter = {
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Array<SowStatus>>;
};

export type GetNoumConnectionRequestsInput = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type GetNoumFilesInput = {
  filesManagerElementId: Scalars['ID'];
  filterType?: InputMaybe<NoumFilesFilterType>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
};

export type GlobalConfigOutput = {
  __typename?: 'GlobalConfigOutput';
  Currency?: Maybe<Array<Maybe<GlobalDataInput>>>;
  LateFee?: Maybe<Array<Maybe<GlobalDataInput>>>;
  PaymentDetails?: Maybe<Array<Maybe<GlobalDataInput>>>;
  PaymentTerm?: Maybe<Array<Maybe<GlobalDataInput>>>;
};

export type GlobalDataInput = {
  __typename?: 'GlobalDataInput';
  label?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type GlobalSearchEntity = {
  __typename?: 'GlobalSearchEntity';
  entityType: EntityType;
  event?: Maybe<GlobalSearchEventEntity>;
  id: Scalars['ID'];
  noum?: Maybe<GlobalSearchNoumEntity>;
  post?: Maybe<GlobalSearchPostEntity>;
  user: GlobalSearchEntityUser;
};

export type GlobalSearchEntityUser = {
  __typename?: 'GlobalSearchEntityUser';
  firstName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isNoumenaEmployee: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<GlobalSearchUserEntityStatus>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type GlobalSearchEventEntity = {
  __typename?: 'GlobalSearchEventEntity';
  createdAt: Scalars['ISODate'];
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  noumId?: Maybe<Scalars['ID']>;
  status?: Maybe<EventStatus>;
};

export type GlobalSearchNoumEntity = {
  __typename?: 'GlobalSearchNoumEntity';
  isConnected: Scalars['Boolean'];
  isFollowing: Scalars['Boolean'];
  name: Scalars['String'];
  status?: Maybe<NoumStatus>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type GlobalSearchPostEntity = {
  __typename?: 'GlobalSearchPostEntity';
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISODate'];
  noumId?: Maybe<Scalars['ID']>;
  noumName?: Maybe<Scalars['String']>;
  noumThumbnailUrl?: Maybe<Scalars['String']>;
  status?: Maybe<NoumStatus>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  type?: Maybe<PostType>;
};

export type GlobalSearchResult = {
  __typename?: 'GlobalSearchResult';
  count: Scalars['Int'];
  data: Array<GlobalSearchEntity>;
};

export enum GlobalSearchUserEntityStatus {
  NonNoumenaMember = 'NonNoumenaMember',
  NoumenaMember = 'NoumenaMember',
  UnauthenticatedUser = 'UnauthenticatedUser'
}

export type Group = {
  __typename?: 'Group';
  _id?: Maybe<Scalars['ID']>;
  associatedSkills?: Maybe<Array<Scalars['ID']>>;
  canInvite?: Maybe<Scalars['Boolean']>;
  connection?: Maybe<ConnectionType>;
  description?: Maybe<Scalars['String']>;
  groupInvitePermission?: Maybe<Scalars['String']>;
  groupPrivacy?: Maybe<Scalars['String']>;
  invitation?: Maybe<GroupInvitation>;
  members?: Maybe<Array<Maybe<Member>>>;
  membersCount?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['String']>;
  role?: Maybe<Array<Maybe<MemberRoles>>>;
};

export type GroupConnection = {
  __typename?: 'GroupConnection';
  connection?: Maybe<ConnectionType>;
};

export type GroupEvent = {
  __typename?: 'GroupEvent';
  data?: Maybe<Scalars['Object']>;
  event: Scalars['String'];
};

export type GroupInput = {
  associatedSkills?: InputMaybe<Array<Scalars['ID']>>;
  description?: InputMaybe<Scalars['String']>;
  groupInvitePermission?: InputMaybe<GroupInvitePermission>;
  groupPrivacy?: InputMaybe<GroupPrivacy>;
  name?: InputMaybe<Scalars['String']>;
  profileImage?: InputMaybe<Scalars['String']>;
};

export type GroupInvitation = {
  __typename?: 'GroupInvitation';
  _id?: Maybe<Scalars['ID']>;
  connection?: Maybe<ConnectionType>;
  groupId?: Maybe<Group>;
  inviteFrom?: Maybe<UserOutput>;
  inviteTo?: Maybe<UserOutput>;
};

export enum GroupInvitePermission {
  ClosedAdminOnly = 'CLOSED_ADMIN_ONLY',
  ClosedAnyone = 'CLOSED_ANYONE',
  Open = 'OPEN'
}

export type GroupOutput = {
  __typename?: 'GroupOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<Group>>>;
};

export enum GroupPrivacy {
  PrivateHidden = 'PRIVATE_HIDDEN',
  PrivateVisible = 'PRIVATE_VISIBLE',
  Public = 'PUBLIC'
}

export type GroupRef = {
  __typename?: 'GroupRef';
  _id: Scalars['ID'];
  associatedSkills?: Maybe<Array<Scalars['ID']>>;
  connection?: Maybe<ConnectionType>;
  description?: Maybe<Scalars['String']>;
  members?: Maybe<Array<Maybe<Member>>>;
  membersCount?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['String']>;
  role?: Maybe<Array<Maybe<MemberRoles>>>;
};

export enum GroupReportTitle {
  BulkPayment = 'BULK_PAYMENT',
  Customers = 'CUSTOMERS',
  DwollaMassPayment = 'DWOLLA_MASS_PAYMENT',
  DwollaTransactionExport = 'DWOLLA_TRANSACTION_EXPORT',
  Payments = 'PAYMENTS',
  PaymentKycCustomers = 'PAYMENT_KYC_CUSTOMERS'
}

export type GroupShJoiningStatus = {
  __typename?: 'GroupShJoiningStatus';
  status?: Maybe<SocialHallAttendeeStatus>;
  userId?: Maybe<Scalars['ID']>;
};

export type GroupedNoumRolePermissionChange = {
  __typename?: 'GroupedNoumRolePermissionChange';
  changes: Array<NoumRoleElementHistoryLog>;
  elementType?: Maybe<PermissibleElementType>;
};

export type HideNotificationInput = {
  connectionId?: InputMaybe<Scalars['ID']>;
  noumMemberId?: InputMaybe<Scalars['ID']>;
  type?: InputMaybe<Array<InputMaybe<NotificationType>>>;
};

export type HideNotificationInputV2 = {
  connectionId?: InputMaybe<Scalars['ID']>;
  type?: InputMaybe<Array<InputMaybe<NotificationTypeV2>>>;
};

export type HomeSpaceConversationOutput = {
  __typename?: 'HomeSpaceConversationOutput';
  groupConversations?: Maybe<Array<Maybe<ConversationOutput>>>;
  groupConversationsCount?: Maybe<Scalars['Int']>;
  groupConversationsUnreadMessageCount?: Maybe<Scalars['Int']>;
  groupUnreadConversationCount?: Maybe<Scalars['Int']>;
  privateConversation?: Maybe<Array<Maybe<ConversationOutput>>>;
  privateConversationCount?: Maybe<Scalars['Int']>;
  privateUnreadCoversationCount?: Maybe<Scalars['Int']>;
  privateUnreadMessageCount?: Maybe<Scalars['Int']>;
  userAllConversationUnreadConversationCount?: Maybe<Scalars['Int']>;
  userAllConversationUnreadMessageCount?: Maybe<Scalars['Int']>;
  userConversations?: Maybe<Array<Maybe<ConversationOutput>>>;
  userConversationsCount?: Maybe<Scalars['Int']>;
};

export type HostedPageOutput = {
  __typename?: 'HostedPageOutput';
  hosted_id?: Maybe<Scalars['String']>;
};

export type IliOutput = {
  __typename?: 'ILIOutput';
  approvedInvestmentAmount?: Maybe<Scalars['String']>;
  maximumIncomePaymentRate?: Maybe<Scalars['String']>;
  maximumInvestmentReturn?: Maybe<Scalars['String']>;
};

export enum Internal_Plan_Type {
  FreePlan = 'FREE_PLAN',
  NoumenaInternal = 'NOUMENA_INTERNAL'
}

export enum Item_Price_Period_Unit {
  Month = 'MONTH',
  Year = 'YEAR'
}

export type IdentityOutput = {
  __typename?: 'IdentityOutput';
  name?: Maybe<Scalars['String']>;
  reasons?: Maybe<Array<Maybe<Scalars['String']>>>;
  result?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type IncomeDataOutput = {
  __typename?: 'IncomeDataOutput';
  transactions?: Maybe<Array<Maybe<TransactionModel>>>;
};

export enum IndicatorEnum {
  DueAlready = 'DUE_ALREADY',
  DueLong = 'DUE_LONG',
  DueShort = 'DUE_SHORT'
}

export type IndustryList = {
  __typename?: 'IndustryList';
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type IndustryListOutput = {
  __typename?: 'IndustryListOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<IndustryList>>>;
};

export type InputNoumClass = {
  description?: InputMaybe<Scalars['String']>;
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  noumId: Scalars['ID'];
  programId: Scalars['ID'];
  questions?: InputMaybe<Array<InputMaybe<Scalars['JSONObject']>>>;
  reviewers?: InputMaybe<Array<Scalars['ID']>>;
  type?: InputMaybe<Scalars['String']>;
};

export type InputNoumProgram = {
  description: Scalars['String'];
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
};

export enum InstitutionsEnum {
  Ma = 'MA',
  Noumena = 'NOUMENA'
}

export type Invitation = {
  __typename?: 'Invitation';
  _id: Scalars['ID'];
  connection?: Maybe<Scalars['String']>;
  inviteFrom?: Maybe<UserOutput>;
  inviteTo?: Maybe<UserOutput>;
};

export type InvitationInput = {
  chamberId?: InputMaybe<Scalars['ID']>;
  userId: Scalars['ID'];
};

export type InvitationOutput = {
  __typename?: 'InvitationOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<GroupInvitation>>>;
};

export enum InvitationStatus {
  Accepted = 'ACCEPTED',
  Blocked = 'BLOCKED',
  Cancelled = 'CANCELLED',
  Expired = 'EXPIRED',
  None = 'NONE',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type InviteNonNoumenaMemberInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  invitationMessage?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  noumId: Scalars['ID'];
};

export type InviteNoumMembers = {
  invitationMessage?: InputMaybe<Scalars['String']>;
  members: Array<InvitedNouMember>;
  noumId: Scalars['ID'];
  walletLimitAmount?: InputMaybe<Scalars['Int']>;
  walletLimitType?: InputMaybe<WalletLimitType>;
};

export type InvitedNouMember = {
  roleId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type Invitees = {
  __typename?: 'Invitees';
  _id: Scalars['ID'];
  chamberId?: Maybe<ChamberByIdRef>;
  invitedBy?: Maybe<UserOutput>;
  inviteeChamberId?: Maybe<Scalars['ID']>;
  status?: Maybe<InvitationStatus>;
  userId?: Maybe<UserOutput>;
};

export enum InvoiceActivityType {
  DueDateChanged = 'DueDateChanged',
  InvoiceCreated = 'InvoiceCreated',
  InvoiceEdited = 'InvoiceEdited',
  InvoiceSent = 'InvoiceSent',
  Paid = 'Paid',
  PaymentFailed = 'PaymentFailed',
  PaymentUpdated = 'PaymentUpdated',
  Reminder = 'Reminder',
  StatusChanged = 'StatusChanged'
}

export type InvoiceAmountOutput = {
  __typename?: 'InvoiceAmountOutput';
  amount?: Maybe<Scalars['Float']>;
  paidAmount?: Maybe<Scalars['Float']>;
  remainingAmount?: Maybe<Scalars['Float']>;
};

export type InvoiceDetail = {
  __typename?: 'InvoiceDetail';
  amount_paid?: Maybe<Scalars['Float']>;
  channel?: Maybe<Scalars['String']>;
  currency_code?: Maybe<Scalars['String']>;
  customer_id?: Maybe<Scalars['String']>;
  due_date?: Maybe<Scalars['String']>;
  dunning_attempts?: Maybe<Array<DunningAttemptOutput>>;
  exchange_rate?: Maybe<Scalars['Float']>;
  external_customer_id?: Maybe<Scalars['String']>;
  external_invoice_id?: Maybe<Scalars['String']>;
  external_subscription_id?: Maybe<Scalars['String']>;
  first_invoice?: Maybe<Scalars['Boolean']>;
  generated_at?: Maybe<Scalars['String']>;
  invoice_id?: Maybe<Scalars['Float']>;
  issue_date?: Maybe<Scalars['String']>;
  item_price_id?: Maybe<Scalars['String']>;
  line_items?: Maybe<Array<LineItemOutput>>;
  linked_payments?: Maybe<Array<LinkedPaymentOutput>>;
  paid_at?: Maybe<Scalars['String']>;
  payment_method?: Maybe<Scalars['String']>;
  payment_method_details?: Maybe<Scalars['String']>;
  plan_name?: Maybe<Scalars['String']>;
  plan_type?: Maybe<Scalars['String']>;
  price_type?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  sub_total?: Maybe<Scalars['Float']>;
  subscription_id?: Maybe<SubscriptionOutput>;
  tags?: Maybe<Array<Scalars['String']>>;
  tax?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
  uid?: Maybe<UserOutput>;
  updated_at?: Maybe<Scalars['String']>;
};

export type InvoiceDraftInput = {
  currency?: InputMaybe<AllCurrencyEnum>;
  dueDate?: InputMaybe<Scalars['ISODate']>;
  invoiceFrom?: InputMaybe<Scalars['String']>;
  invoiceLabel?: InputMaybe<Scalars['String']>;
  invoiceNumber?: InputMaybe<Scalars['String']>;
  invoiceTo?: InputMaybe<Scalars['String']>;
  issueDate?: InputMaybe<Scalars['ISODate']>;
  lateFeeType?: InputMaybe<LateFeeType>;
  lateFeeValue?: InputMaybe<Scalars['Float']>;
  lineItems?: InputMaybe<Array<InputMaybe<InvoiceLineItemInput>>>;
  logoUrl?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  noumId: Scalars['ID'];
  paymentDetails?: InputMaybe<PaymentDetails>;
  paymentTerms?: InputMaybe<PaymentTerms>;
  summary?: InputMaybe<Scalars['String']>;
};

export type InvoiceFetchInput = {
  subscription_id?: InputMaybe<Scalars['Float']>;
  uid?: InputMaybe<Scalars['String']>;
};

export type InvoiceGetAllFilters = {
  date_from?: InputMaybe<Scalars['String']>;
  date_to?: InputMaybe<Scalars['String']>;
  plans?: InputMaybe<Array<Scalars['String']>>;
  status?: InputMaybe<Array<Status_Invoice>>;
  subscription_id?: InputMaybe<Scalars['Float']>;
  uid?: InputMaybe<Scalars['String']>;
};

export type InvoiceGetAllInput = {
  filters?: InputMaybe<InvoiceGetAllFilters>;
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  sort_key?: InputMaybe<Scalars['String']>;
  sort_value?: InputMaybe<Sort>;
};

export type InvoiceHistory = {
  __typename?: 'InvoiceHistory';
  created_at: Scalars['String'];
  current_status: Scalars['String'];
  invoice_history_id: Scalars['Float'];
  previous_status?: Maybe<Scalars['String']>;
  updated_at: Scalars['String'];
};

export type InvoiceLineItem = {
  __typename?: 'InvoiceLineItem';
  amount: Scalars['Float'];
  currency: AllCurrencyEnum;
  description: Scalars['String'];
  id: Scalars['ID'];
  quantity: Scalars['Int'];
  taxLabel?: Maybe<Scalars['String']>;
  taxRate?: Maybe<Scalars['Float']>;
  unitPrice: Scalars['Float'];
};

export type InvoiceLineItemInput = {
  currency: AllCurrencyEnum;
  description: Scalars['String'];
  quantity: Scalars['Int'];
  taxLabel?: InputMaybe<Scalars['String']>;
  taxRate?: InputMaybe<Scalars['Float']>;
  unitPrice: Scalars['Float'];
};

export type InvoiceList = {
  __typename?: 'InvoiceList';
  count: Scalars['Int'];
  data?: Maybe<Array<Maybe<InvoiceOutput>>>;
};

export type InvoiceOutput = {
  __typename?: 'InvoiceOutput';
  amount?: Maybe<Scalars['Float']>;
  createdBy?: Maybe<UserOutput>;
  currency?: Maybe<AllCurrencyEnum>;
  dueDate?: Maybe<Scalars['ISODate']>;
  duplicatedFromInvoiceId?: Maybe<Scalars['String']>;
  duplicatedFromInvoiceNumber?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  invoiceFrom?: Maybe<NoumContactOutput>;
  invoiceNumber?: Maybe<Scalars['String']>;
  invoiceTo?: Maybe<NoumContactOutput>;
  invoiceURL?: Maybe<Scalars['String']>;
  issueDate?: Maybe<Scalars['ISODate']>;
  lateFeeType?: Maybe<LateFeeType>;
  lateFeeValue?: Maybe<Scalars['Float']>;
  lineItemAmount?: Maybe<Scalars['Float']>;
  lineItems?: Maybe<Array<Maybe<InvoiceLineItem>>>;
  logoUrl?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  noumId?: Maybe<SpaceOutput>;
  paymentDetails?: Maybe<PaymentDetails>;
  paymentTerms?: Maybe<PaymentTerms>;
  status?: Maybe<InvoiceStatusEnum>;
  summary?: Maybe<Scalars['String']>;
  taxLine?: Maybe<Array<Maybe<InvoiceTaxLine>>>;
  type?: Maybe<Scalars['String']>;
};

export type InvoicePdf = {
  __typename?: 'InvoicePDF';
  base64?: Maybe<Scalars['String']>;
};

export type InvoicePdfInput = {
  footer?: InputMaybe<PdfFooter>;
  invoiceDetails?: InputMaybe<PdfInvoiceDetail>;
  items?: InputMaybe<Array<InputMaybe<PdfLineItem>>>;
  logo?: InputMaybe<PdfLogo>;
  receiver?: InputMaybe<PdfContactDetail>;
  sender?: InputMaybe<PdfContactDetail>;
  subject?: InputMaybe<Scalars['String']>;
  summary?: InputMaybe<PdfSummary>;
  title?: InputMaybe<Scalars['String']>;
};

export type InvoicePdfUrl = {
  __typename?: 'InvoicePDFUrl';
  url?: Maybe<Scalars['String']>;
};

export type InvoicePaymentInput = {
  amount: Scalars['Float'];
  invoiceId: Scalars['ID'];
  paidBy: Scalars['String'];
  paymentDate: Scalars['ISODate'];
  paymentId?: InputMaybe<Scalars['String']>;
};

export type InvoicePaymentOutput = {
  __typename?: 'InvoicePaymentOutput';
  _id?: Maybe<Scalars['ID']>;
  amount?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['ISODate']>;
  createdBy?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  entryType?: Maybe<Scalars['String']>;
  invoiceId?: Maybe<Scalars['ID']>;
  paidBy?: Maybe<Scalars['String']>;
  paymentDate?: Maybe<Scalars['ISODate']>;
  paymentId?: Maybe<Scalars['String']>;
  paymentStatus?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['ISODate']>;
};

export type InvoiceQueryInput = {
  customers?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  invoiceType?: InputMaybe<Array<InputMaybe<InvoiceType>>>;
  limit?: InputMaybe<Scalars['Int']>;
  noums?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  offset?: InputMaybe<Scalars['Int']>;
  rangeFilter?: InputMaybe<Array<InputMaybe<CommonFilter>>>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<InvoiceSort>;
  status?: InputMaybe<Array<InputMaybe<InvoiceStatusEnum>>>;
};

export type InvoiceQueryInputForAdmin = {
  limit?: InputMaybe<Scalars['Int']>;
  noums?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  offset?: InputMaybe<Scalars['Int']>;
  rangeFilter?: InputMaybe<Array<InputMaybe<CommonFilter>>>;
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Array<InputMaybe<InvoiceStatusEnum>>>;
};

export type InvoiceSearchInput = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  search?: InputMaybe<Scalars['String']>;
};

export type InvoiceSequenceOutput = {
  __typename?: 'InvoiceSequenceOutput';
  _id?: Maybe<Scalars['String']>;
  noumId?: Maybe<Scalars['String']>;
  sequence: Scalars['String'];
};

export type InvoiceSort = {
  column?: InputMaybe<InvoiceSortColumn>;
  type?: InputMaybe<InvoiceSortType>;
};

export enum InvoiceSortColumn {
  IssueDate = 'ISSUE_DATE'
}

export enum InvoiceSortType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum InvoiceStatusEnum {
  Cancelled = 'CANCELLED',
  Draft = 'DRAFT',
  Issued = 'ISSUED',
  Overdue = 'OVERDUE',
  Paid = 'PAID',
  PartiallyPaid = 'PARTIALLY_PAID',
  WriteOff = 'WRITE_OFF'
}

export enum InvoiceStatusEnumInput {
  Cancelled = 'CANCELLED',
  Overdue = 'OVERDUE',
  Paid = 'PAID',
  PartiallyPaid = 'PARTIALLY_PAID',
  WriteOff = 'WRITE_OFF'
}

export type InvoiceTaxLine = {
  __typename?: 'InvoiceTaxLine';
  amount: Scalars['Float'];
  currency: AllCurrencyEnum;
  description: Scalars['String'];
  id: Scalars['ID'];
  taxCode: Scalars['Float'];
};

export type InvoiceTimelineOutput = {
  __typename?: 'InvoiceTimelineOutput';
  _id: Scalars['ID'];
  activityType: InvoiceActivityType;
  amount?: Maybe<Scalars['Float']>;
  createdAt: Scalars['ISODate'];
  dueDateFrom?: Maybe<Scalars['ISODate']>;
  dueDateTo?: Maybe<Scalars['ISODate']>;
  duplicatedFrom?: Maybe<Scalars['String']>;
  fromStatus?: Maybe<InvoiceStatusEnum>;
  invoiceId: Scalars['ID'];
  paidAmount?: Maybe<Scalars['Float']>;
  previousPaidAmount?: Maybe<Scalars['Float']>;
  remainingAmount?: Maybe<Scalars['Float']>;
  toStatus?: Maybe<InvoiceStatusEnum>;
  updatedAt: Scalars['ISODate'];
  userId?: Maybe<UserOutput>;
};

export type InvoiceTimelinePaginationOutput = {
  __typename?: 'InvoiceTimelinePaginationOutput';
  count: Scalars['Int'];
  data?: Maybe<Array<Maybe<InvoiceTimelineOutput>>>;
};

export type InvoiceToolReportFiltersInput = {
  fileHeaders: Scalars['String'];
  rangeFilters: Array<InputMaybe<CommonFilter>>;
  status: Array<InputMaybe<InvoiceStatusEnum>>;
};

export type InvoiceToolReportOutput = {
  __typename?: 'InvoiceToolReportOutput';
  _id?: Maybe<Scalars['ID']>;
  createdAt: Scalars['ISODate'];
  filters: Scalars['JSONObject'];
  stage: InvoiceToolReportStage;
  status: InvoiceToolReportStatus;
  updatedAt: Scalars['ISODate'];
};

export type InvoiceToolReportOutputPaginated = {
  __typename?: 'InvoiceToolReportOutputPaginated';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<InvoiceToolReportOutput>>>;
};

export enum InvoiceToolReportStage {
  Converted = 'CONVERTED',
  Fetched = 'FETCHED',
  Finished = 'FINISHED',
  Initialized = 'INITIALIZED',
  Mapped = 'MAPPED',
  Started = 'STARTED',
  Uploaded = 'UPLOADED'
}

export enum InvoiceToolReportStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Progress = 'PROGRESS'
}

export type InvoiceTransactionInput = {
  amount: Scalars['Float'];
  currency: CurrencyEnum;
  destinationAccountId: Scalars['ID'];
  destinationUserId: Scalars['ID'];
  enableTransactionLimit?: InputMaybe<Scalars['Boolean']>;
  invoiceId: Scalars['ID'];
  noumId: Scalars['ID'];
  passCode: Scalars['String'];
  requestOriginator: RequestOriginatorsEnum;
  sourceAccountId: Scalars['String'];
  transactionReason: Scalars['String'];
};

export enum InvoiceType {
  Issued = 'Issued',
  Received = 'Received'
}

export type ItemFamilyInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type ItemFamilyOutput = {
  __typename?: 'ItemFamilyOutput';
  description?: Maybe<Scalars['String']>;
  item_family_id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type ItemInput = {
  category: Plan_Category_Enum;
  description?: InputMaybe<Scalars['String']>;
  item_family_id: Internal_Plan_Type;
  item_type: Subscription_Plan_Type;
  name: Scalars['String'];
};

export type ItemOutput = {
  __typename?: 'ItemOutput';
  description?: Maybe<Scalars['String']>;
  item_family_id: Scalars['String'];
  item_id: Scalars['String'];
  item_type: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type ItemPriceInput = {
  billing_cycles?: InputMaybe<Scalars['Float']>;
  currency_code?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  discount_percent?: InputMaybe<Scalars['Float']>;
  item_id: Scalars['String'];
  name: Scalars['String'];
  noum_renewal?: InputMaybe<Scalars['Float']>;
  noum_setup?: InputMaybe<Scalars['Float']>;
  noum_validity_months?: InputMaybe<Scalars['Float']>;
  per_item_fee?: InputMaybe<Scalars['Float']>;
  percent_fee?: InputMaybe<Scalars['Float']>;
  period?: InputMaybe<Scalars['Float']>;
  period_unit?: InputMaybe<Item_Price_Period_Unit>;
  plan_validity_months?: InputMaybe<Scalars['Float']>;
  price?: InputMaybe<Scalars['Float']>;
  pricing_model?: InputMaybe<Scalars['String']>;
};

export type Jurisdiction = {
  __typename?: 'Jurisdiction';
  country?: Maybe<Scalars['String']>;
  /** @deprecated Use region instead. */
  reagion?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
};

export type JurisdictionInput = {
  country?: InputMaybe<Scalars['String']>;
  reagion?: InputMaybe<Scalars['String']>;
  region?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
};

export enum KycActionTakenEnum {
  OpsAdmin = 'OPS_ADMIN',
  Provider = 'PROVIDER',
  System = 'SYSTEM',
  User = 'USER'
}

export enum KycCustomerTypeEnum {
  Unverified = 'UNVERIFIED',
  Verified = 'VERIFIED'
}

export enum KycDocumentStatusEnum {
  Na = 'NA',
  Pending = 'PENDING',
  PendingReUpload = 'PENDING_RE_UPLOAD',
  ReUploaded = 'RE_UPLOADED',
  SentToProvider = 'SENT_TO_PROVIDER',
  Uploaded = 'UPLOADED'
}

export enum KycNoumenaStatusEnum {
  Approved = 'APPROVED',
  PendingReview = 'PENDING_REVIEW',
  Rejected = 'REJECTED'
}

export enum KycProviderDocStatusEnum {
  Pending = 'PENDING',
  Reviewed = 'REVIEWED'
}

export enum KycProviderDocVerifyStatusEnum {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export enum KycProviderStatusEnum {
  Deactivated = 'DEACTIVATED',
  Document = 'DOCUMENT',
  Retry = 'RETRY',
  Suspended = 'SUSPENDED',
  Unverified = 'UNVERIFIED',
  Verified = 'VERIFIED'
}

export enum KycUpdateStatusEnum {
  RequestReUpdate = 'REQUEST_RE_UPDATE',
  ReUpdated = 'RE_UPDATED'
}

export type Knock = {
  __typename?: 'Knock';
  _id: Scalars['ID'];
  createDate?: Maybe<Scalars['Date']>;
  createdAt?: Maybe<Scalars['Date']>;
  declineMessage?: Maybe<Scalars['String']>;
  groupId?: Maybe<Scalars['ID']>;
  groupInfo?: Maybe<SocialGroup>;
  knockMessage?: Maybe<Scalars['String']>;
  knockStatus?: Maybe<KnockType>;
  knockerAttendeeId?: Maybe<Scalars['ID']>;
  knockerUser?: Maybe<UserOutput>;
  knockerUserId: Scalars['ID'];
  receiverAttendeeId?: Maybe<Scalars['ID']>;
  receiverUser?: Maybe<UserOutput>;
  receiverUserId?: Maybe<Scalars['ID']>;
  socialHallId?: Maybe<Scalars['ID']>;
};

export type KnockEvent = {
  __typename?: 'KnockEvent';
  _id: Scalars['ID'];
  event: Scalars['String'];
};

export type KnockInput = {
  groupId?: InputMaybe<Scalars['ID']>;
  hallAttendeeId?: InputMaybe<Scalars['ID']>;
  knockMessage?: InputMaybe<Scalars['String']>;
};

export enum KnockType {
  Accepted = 'ACCEPTED',
  Cancelled = 'CANCELLED',
  Declined = 'DECLINED',
  Pending = 'PENDING',
  Timeout = 'TIMEOUT'
}

export type Knocks = {
  __typename?: 'Knocks';
  count: Scalars['Int'];
  data?: Maybe<Array<Maybe<Knock>>>;
};

export type KycInput = {
  dob?: InputMaybe<Scalars['String']>;
  photoId?: InputMaybe<Scalars['String']>;
  photoIdBack?: InputMaybe<Scalars['String']>;
  photoIdExpiry?: InputMaybe<Scalars['String']>;
  photoIdNumber?: InputMaybe<Scalars['String']>;
  photoIdType?: InputMaybe<Scalars['String']>;
  salary?: InputMaybe<Scalars['String']>;
  ssn?: InputMaybe<Scalars['String']>;
};

export type KycOutput = {
  __typename?: 'KycOutput';
  dob?: Maybe<Scalars['String']>;
  photoId?: Maybe<Scalars['String']>;
  photoIdBack?: Maybe<Scalars['String']>;
  photoIdExpiry?: Maybe<Scalars['String']>;
  photoIdNumber?: Maybe<Scalars['String']>;
  photoIdType?: Maybe<Scalars['String']>;
  salary?: Maybe<Scalars['String']>;
  ssn?: Maybe<Scalars['String']>;
};

export enum LanguageCode {
  Tw = 'TW',
  Ar = 'ar',
  De = 'de',
  En = 'en',
  Es = 'es',
  Fr = 'fr',
  Hi = 'hi',
  It = 'it',
  Ja = 'ja',
  Ko = 'ko',
  Pt = 'pt',
  Zh = 'zh'
}

export enum LateFeeType {
  Percentage = 'Percentage',
  Value = 'Value'
}

export type LineItemOutput = {
  __typename?: 'LineItemOutput';
  amount?: Maybe<Scalars['Float']>;
  date_from?: Maybe<Scalars['String']>;
  date_to?: Maybe<Scalars['String']>;
  discount_amount?: Maybe<Scalars['String']>;
  entity_description?: Maybe<Scalars['String']>;
  entity_id?: Maybe<Scalars['String']>;
  entity_type?: Maybe<Scalars['String']>;
  external_line_item_id?: Maybe<Scalars['String']>;
  item_level_discount_amount?: Maybe<Scalars['String']>;
  line_item_id: Scalars['Float'];
  pricing_model?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Float']>;
  tax_exempt_reason?: Maybe<Scalars['String']>;
  unit_amount?: Maybe<Scalars['Float']>;
};

export type LinkedPaymentOutput = {
  __typename?: 'LinkedPaymentOutput';
  applied_amount?: Maybe<Scalars['Float']>;
  applied_at?: Maybe<Scalars['String']>;
  linked_payment_id: Scalars['Float'];
  txn_amount?: Maybe<Scalars['Float']>;
  txn_date?: Maybe<Scalars['String']>;
  txn_id?: Maybe<Scalars['String']>;
  txn_status?: Maybe<Scalars['String']>;
};

export type ListInvoice = {
  __typename?: 'ListInvoice';
  count: Scalars['Float'];
  data: Array<InvoiceDetail>;
};

export type ListNoums = {
  __typename?: 'ListNoums';
  count: Scalars['Float'];
  data: Array<NoumTransactionFee>;
};

export type ListUserInvitesForAdminFilter = {
  __typename?: 'ListUserInvitesForAdminFilter';
  connection?: Maybe<AdminInviteListInviteStatus>;
};

export type ListUserInvitesForAdminFilterInput = {
  connection?: InputMaybe<AdminInviteListInviteStatus>;
};

export type ListUsersForAdminFilter = {
  __typename?: 'ListUsersForAdminFilter';
  endDate?: Maybe<Scalars['Date']>;
  includeCurrentUser?: Maybe<Scalars['Boolean']>;
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  rolesToExclude?: Maybe<Array<Maybe<Scalars['String']>>>;
  startDate?: Maybe<Scalars['Date']>;
  userIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  userIdsToExclude?: Maybe<Array<Maybe<Scalars['ID']>>>;
  userStatus?: Maybe<Scalars['String']>;
};

export type ListUsersForAdminFilterInput = {
  endDate?: InputMaybe<Scalars['Date']>;
  includeCurrentUser?: InputMaybe<Scalars['Boolean']>;
  roles?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  rolesToExclude?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  startDate?: InputMaybe<Scalars['Date']>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  userIdsToExclude?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  userStatus?: InputMaybe<Scalars['String']>;
};

export type LocationOutput = {
  __typename?: 'LocationOutput';
  description?: Maybe<Scalars['String']>;
  placeId?: Maybe<Scalars['String']>;
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  accessToken?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};

export type LogsOutput = {
  __typename?: 'LogsOutput';
  additionalInfo?: Maybe<Scalars['String']>;
  changeOn?: Maybe<Scalars['Date']>;
  changedBy?: Maybe<Scalars['String']>;
  changedByDetails?: Maybe<UserOutput>;
  moreInfo?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  statusFrom?: Maybe<Scalars['String']>;
  statusTo?: Maybe<Scalars['String']>;
};

export type ManualNoumReferencePayload = {
  capacity: NoumReferenceCapacity;
  imageUrl?: InputMaybe<Scalars['String']>;
  providerName: Scalars['String'];
  referenceText: Scalars['String'];
};

export type MatchOutput = {
  __typename?: 'MatchOutput';
  _id?: Maybe<Scalars['ID']>;
  matchScore?: Maybe<Scalars['Int']>;
  matchUid?: Maybe<UserOutput>;
  skillOwn?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type Matches = {
  __typename?: 'Matches';
  count?: Maybe<Scalars['Int']>;
  matches?: Maybe<Array<Maybe<MatchOutput>>>;
  uid?: Maybe<UserOutput>;
};

export type MaxMinInput = {
  max?: InputMaybe<Scalars['Int']>;
  min?: InputMaybe<Scalars['Int']>;
};

export type MaxMinValue = {
  __typename?: 'MaxMinValue';
  max?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Int']>;
};

export type Member = {
  __typename?: 'Member';
  _id: Scalars['ID'];
  connection?: Maybe<ConnectionType>;
  role?: Maybe<Array<Maybe<MemberRoles>>>;
  user?: Maybe<UserOutput>;
};

export enum MemberRoles {
  Admin = 'ADMIN',
  Member = 'MEMBER'
}

export type MembersOutput = {
  __typename?: 'MembersOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<Member>>>;
};

export type MessageOutput = {
  __typename?: 'MessageOutput';
  message?: Maybe<Scalars['String']>;
};

export type MicroDepositAmountInput = {
  amount1: CurrencyInput;
  amount2: CurrencyInput;
};

export enum ModeEnum {
  Phone = 'PHONE',
  PrimaryEmail = 'PRIMARY_EMAIL',
  SecondaryEmail = 'SECONDARY_EMAIL'
}

export type MoveToolToNoumLayoutColumnInput = {
  columnId: Scalars['ID'];
  position: Scalars['Int'];
  toolId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateSubscribe: Array<SubscriptionOutput>;
  OTPVerification?: Maybe<OtpResponseOutput>;
  _?: Maybe<Scalars['Boolean']>;
  acceptKnock?: Maybe<SocialGroup>;
  acceptRaiseHandRequest?: Maybe<SocialGroup>;
  acceptSpeakerInvitation?: Maybe<SocialGroup>;
  addAnswer?: Maybe<NoumQuestionOutput>;
  addAppActivity?: Maybe<AppActivity>;
  addBank?: Maybe<Array<Maybe<ChameleonBankListOutput>>>;
  addComment?: Maybe<PostOutput>;
  addCommentToPost?: Maybe<CommentOutput>;
  addCookieConsent?: Maybe<CookieConsentOutput>;
  addDebitAccount?: Maybe<Scalars['Boolean']>;
  addDepositAccount?: Maybe<Scalars['Boolean']>;
  addElements?: Maybe<Array<Maybe<ElementOutput>>>;
  addElementsToProjectChamber?: Maybe<Array<ElementOutput>>;
  addManualReferenceForNoum: NoumReference;
  addNetwork?: Maybe<NetworkOutput>;
  addNewNoumContact: NoumContactOutput;
  addNoumFile: NoumFile;
  addNoumLayoutTool: ElementOutput;
  addPaymentDetails?: Maybe<PaymentDetailsOutput>;
  addPaymentProvider?: Maybe<MessageOutput>;
  addProjectChamberCategory: ProjectChamberCategory;
  addQuestionAnswers?: Maybe<Scalars['Boolean']>;
  addReaction?: Maybe<PostOutput>;
  addReactionOnComment?: Maybe<CommentReplyReactionOutput>;
  addReactionOnCommentReply?: Maybe<CommentReplyReactionOutput>;
  addRemoveNoumSubscription: NoumTransactionFee;
  addReplyToComment?: Maybe<PostOutput>;
  addReplyToCommentV2?: Maybe<ThreadOutput>;
  addReplyToCommentV3ForGenericEntity?: Maybe<CommentOutput>;
  addRiseUserBank?: Maybe<AddBankResponse>;
  addStatementDetails?: Maybe<StatementDetailsOutput>;
  addUserAddress?: Maybe<AddressOutput>;
  addUserIncomeData?: Maybe<Scalars['Boolean']>;
  applyForRiseApplication?: Maybe<RiseApplication>;
  approveConnectionRequest: Scalars['Boolean'];
  approveCustomerKYC?: Maybe<PaymentCustomerDetailOutput>;
  approveNoumInvitation: Scalars['Boolean'];
  approveNoumMemberRolePromotion: Scalars['Boolean'];
  archiveNoumContact: Scalars['Boolean'];
  archiveNoumContacts: Scalars['Boolean'];
  archiveNoumRole: Scalars['Boolean'];
  archiveUserSpaces?: Maybe<Scalars['Boolean']>;
  askForNoumReference: NoumReference;
  assignHost?: Maybe<SocialHallAttendee>;
  autoInvoicePayment: PaymentOutput;
  belvoAccessToken?: Maybe<BelvoAccessToken>;
  blockUser?: Maybe<Scalars['Boolean']>;
  cancelConnectionRequestToNoum: Scalars['Boolean'];
  cancelInvoiceReport: Scalars['Boolean'];
  cancelKnock?: Maybe<Knock>;
  cancelNoumInvitation: Scalars['Boolean'];
  cancelNoumLayoutChanges: Scalars['Boolean'];
  cancelNoumMemberRolePromotion: Scalars['Boolean'];
  cancelProjectNoumCampaign?: Maybe<ProjectNoumCampaign>;
  cancelRaiseHandByGroupId?: Maybe<SocialGroup>;
  cancelSpeakerInvitation?: Maybe<SocialGroup>;
  cancelSubscription: Scalars['Boolean'];
  capitalquotient?: Maybe<CapitalquotientMutations>;
  changeNoumMembersRole: Scalars['Boolean'];
  changeProjectChamberStatus?: Maybe<SpaceOutput>;
  clearGlobalSearchIndex: Scalars['Boolean'];
  clearNonActiveUserEntities: Scalars['Boolean'];
  clearNoumContactsIndex: Scalars['Boolean'];
  clearNoumMembersIndex: Scalars['Boolean'];
  clearRecentSearchesIndex?: Maybe<Scalars['Boolean']>;
  closeCalendarMainEvent?: Maybe<Scalars['Boolean']>;
  closeSocialHallGroup?: Maybe<Scalars['Boolean']>;
  connectToNoum: SpaceOutput;
  createAccountDwolla?: Maybe<MessageOutput>;
  createAdCampaign?: Maybe<AdCampaignOutput>;
  createAdCampaignCsvReport: Scalars['Boolean'];
  createAdCampaignOffer: AdCampaignOffer;
  createAddress?: Maybe<Scalars['Boolean']>;
  createAndUpdateSpotLightAdmin?: Maybe<Array<Maybe<SpaceOutput>>>;
  createChargebeeCustomer: Customer;
  createCommentForGenericEntity?: Maybe<CommentOutput>;
  createContractReport?: Maybe<Scalars['Boolean']>;
  /** @deprecated Use getOrCreateConversation. */
  createConversation?: Maybe<ConversationIdOutput>;
  createCustomer?: Maybe<CreateCustomerOutput>;
  createCustomerPayee?: Maybe<MessageOutput>;
  createCustomerUnverified?: Maybe<CreateCustomerOutput>;
  createEvent?: Maybe<Event>;
  createEventInvitation?: Maybe<Event>;
  createGroup?: Maybe<Group>;
  createGroupInvitation?: Maybe<UserOutputForGroup>;
  createGroupRequest?: Maybe<GroupInvitation>;
  createInstantEvent?: Maybe<Event>;
  createInternalPlan?: Maybe<PlanSettingOutput>;
  createInvitation?: Maybe<UserOutput>;
  createInvoiceDraft?: Maybe<InvoiceOutput>;
  createInvoicePayment?: Maybe<InvoicePaymentOutput>;
  createInvoiceReport: Scalars['Boolean'];
  createInvoiceToolReport?: Maybe<Scalars['Boolean']>;
  createItem: ItemOutput;
  createItemFamily: ItemFamilyOutput;
  createItemPrice: Scalars['String'];
  createMultipleEventInvitation: Array<CurrentUser>;
  createNewContract: Contract;
  createNewItem: Scalars['String'];
  createNewSOW: Sow;
  createNote?: Maybe<Note>;
  createNotification?: Maybe<Scalars['Boolean']>;
  createNotificationV2?: Maybe<Scalars['Boolean']>;
  createNoumClass?: Maybe<NoumClass>;
  createNoumLayoutSection: NoumLayoutSection;
  createNoumProgram?: Maybe<NoumProgram>;
  createNoumRole: NoumRole;
  createOpsPermission?: Maybe<OpsPermissionOutput>;
  createOpsRole?: Maybe<OpsRoleOutput>;
  createOrUpdateSocialHallForEvent?: Maybe<SocialHall>;
  createOrUpdateTokenArchive?: Maybe<Scalars['Boolean']>;
  createPassCode?: Maybe<MessageOutput>;
  createPayment?: Maybe<PaymentOutput>;
  createPaymentSubscriptionPlanGlobalSetting: Scalars['Boolean'];
  createPaymentSubscriptionSetting: Scalars['Boolean'];
  createPersonal?: Maybe<PersonalProfileOutput>;
  createPlaidLink?: Maybe<CreatePlaidLinkOutput>;
  createPost?: Maybe<PostOutput>;
  createPostForChamber?: Maybe<PostOutput>;
  createProduct?: Maybe<NewProductOutput>;
  createProjectChamber?: Maybe<SpaceOutput>;
  createProjectNoumCampaign?: Maybe<ProjectNoumCampaign>;
  createQuestion?: Maybe<NoumQuestionOutput>;
  createRenewedPlaidLink?: Maybe<CreatePlaidLinkOutput>;
  createRiseReport: Scalars['Boolean'];
  createSignedUrl?: Maybe<Scalars['String']>;
  createSocialHall?: Maybe<SocialHall>;
  createSowReport?: Maybe<Scalars['Boolean']>;
  createSpace?: Maybe<SpaceOutput>;
  createSsn?: Maybe<Scalars['Boolean']>;
  createStripeCustomer?: Maybe<CreateCustomerOutput>;
  createSubWallet?: Maybe<CreateSubLedgerOutput>;
  createSubscriptionAndInvoiceFromHostedPages: SubscriptionOutput;
  createSurvey: Survey;
  createSurveyPage: SurveyPage;
  createTwilioToken?: Maybe<TwilioTokenOutput>;
  createUpdateAdCampaignReport?: Maybe<AdCampaignReportOutput>;
  createUserInvoiceLineItem?: Maybe<InvoiceLineItem>;
  createUserRiseAddress?: Maybe<RiseUserDataOutput>;
  createUserRiseProfile?: Maybe<RisePersonalProfileOutput>;
  createVideoThumbnail: Scalars['String'];
  declineKnock?: Maybe<Knock>;
  declineRaiseHandByGroupId?: Maybe<SocialGroup>;
  declineSpeakerInvitation?: Maybe<SocialGroup>;
  deleteAccount?: Maybe<Scalars['Boolean']>;
  deleteAdCampaign?: Maybe<AdCampaignOutput>;
  deleteAdCampaignOffer: GenericResponseOutput;
  deleteAdCampaignReport?: Maybe<AdCampaignReportOutput>;
  deleteAllEventsByUserId?: Maybe<Scalars['Boolean']>;
  deleteCommentForGenericEntity?: Maybe<CommentOutput>;
  deleteConnection?: Maybe<UserOutput>;
  deleteContract: Scalars['Boolean'];
  deleteEvent?: Maybe<Event>;
  deleteGroup?: Maybe<GroupOutput>;
  deleteIdScanCheck?: Maybe<Scalars['Boolean']>;
  deleteInvoice?: Maybe<InvoiceOutput>;
  deleteInvoicePayment?: Maybe<InvoicePaymentOutput>;
  deleteNote?: Maybe<Scalars['Boolean']>;
  deleteNoumFile: Scalars['Boolean'];
  deleteOpNotification?: Maybe<Scalars['Boolean']>;
  deletePaymentProvider?: Maybe<MessageOutput>;
  deletePost?: Maybe<Scalars['Boolean']>;
  deleteQuestion?: Maybe<Scalars['Boolean']>;
  deleteReplyToComment?: Maybe<PostOutput>;
  deleteReplyToCommentV2?: Maybe<Scalars['Boolean']>;
  deleteSOW?: Maybe<Scalars['Boolean']>;
  deleteSpace?: Maybe<Scalars['Boolean']>;
  deleteSpaceConversation?: Maybe<Scalars['Boolean']>;
  deleteSurvey: Scalars['Boolean'];
  deleteUserBankLink?: Maybe<UserBankLinkOutput>;
  deleteUserInfo?: Maybe<Scalars['Boolean']>;
  deleteUserInvoiceLineItem?: Maybe<InvoiceLineItem>;
  discardNoumReference: NoumReference;
  docuSignAcceptance?: Maybe<DocuSignOutput>;
  duplicateInvoice?: Maybe<InvoiceOutput>;
  duplicateNoumLayoutSection: NoumLayoutSection;
  duplicateNoumLayoutTool: ElementOutput;
  editAccountPassword?: Maybe<EditAccountPasswordOutput>;
  exitFromGroup?: Maybe<SocialGroup>;
  exitFromSocialHall?: Maybe<SocialHallAttendee>;
  favouriteNoum?: Maybe<Scalars['Boolean']>;
  fetchAndCreatePlans: Array<PlanItem>;
  generateAdminReport?: Maybe<Scalars['Boolean']>;
  generateAiImages: Array<Scalars['String']>;
  generateAutoDebitContract?: Maybe<DocuSignOutput>;
  generateOTPForPasswordCreation?: Maybe<OtpForPasswordOutput>;
  generateOTPForVerification?: Maybe<OtpResponseOutput>;
  generateOneTimeToken?: Maybe<Scalars['String']>;
  generateReferralCode?: Maybe<Referral>;
  generateReferralCodeV2?: Maybe<Referral>;
  generateUserS3SignedUrl?: Maybe<SignedUrlOutput>;
  getOrCreateConversation?: Maybe<ConversationIdOutput>;
  getOrCreateGlobalConversation?: Maybe<ConversationOutput>;
  getOrCreateSpaceConversation?: Maybe<ConversationOutput>;
  groupEvent?: Maybe<Scalars['Boolean']>;
  handleFollow?: Maybe<SpaceOutput>;
  handleSOWLinking: Sow;
  healthCheck?: Maybe<Scalars['String']>;
  hideNotifications?: Maybe<Scalars['Boolean']>;
  hideNotificationsV2?: Maybe<Scalars['Boolean']>;
  identityCheck?: Maybe<Scalars['String']>;
  inactivateGroupAdmin?: Maybe<Scalars['Boolean']>;
  initiateMicroDepositDwolla?: Maybe<AccountListOutput>;
  initiateTipForAnswer?: Maybe<Scalars['Boolean']>;
  inviteAsSpeaker?: Maybe<SocialGroup>;
  inviteNewNonNoumenaMember: Scalars['Boolean'];
  inviteNonNoumenaMember?: Maybe<NmUserOutput>;
  inviteNoumMembers: Scalars['Boolean'];
  joinGroupWithoutKnocking?: Maybe<SocialGroup>;
  joinSocialHall?: Maybe<SocialHallAttendee>;
  joinSocialHallV2?: Maybe<SocialHallAttendee>;
  joinWaitingList?: Maybe<Scalars['Boolean']>;
  kickNoumMembers: Scalars['Boolean'];
  knock?: Maybe<Knock>;
  leaveNoumMembership: Scalars['Boolean'];
  leaveSocialHall?: Maybe<SocialHallAttendee>;
  linkNoums?: Maybe<NoumLink>;
  makeAccountDefault?: Maybe<MessageOutput>;
  markBroadcastedNoumAsViewed?: Maybe<Scalars['Boolean']>;
  markNotificationAsRead?: Maybe<Notification>;
  markNotificationAsReadV2?: Maybe<NotificationV2>;
  markNoumAsRecent: Scalars['Boolean'];
  markNoumFileAsDownloaded: Scalars['Boolean'];
  markNoumFileAsViewed: Scalars['Boolean'];
  markSearchEntityAsClicked: Scalars['Boolean'];
  markSpaceAsEdited?: Maybe<SpaceOutput>;
  moveToolToNoumLayoutColumn: Scalars['Boolean'];
  muteSpeaker?: Maybe<SocialGroup>;
  notificationHandler?: Maybe<Scalars['Boolean']>;
  notificationHandlerV2?: Maybe<Scalars['Boolean']>;
  notifyUserToSetupWallet?: Maybe<NotifyOutput>;
  pinConversation?: Maybe<Scalars['Boolean']>;
  pinPost?: Maybe<PostOutput>;
  principles?: Maybe<PrinciplesMutations>;
  publicProjectChamberElementState?: Maybe<SpaceOutput>;
  publishElementState?: Maybe<SpaceOutput>;
  publishNoumLayout: Scalars['Boolean'];
  publishSpaceById?: Maybe<SpaceOutput>;
  raiseHandByGroupId?: Maybe<SocialGroup>;
  raiseInvoicePayment?: Maybe<RaisePaymentOutput>;
  rearrangeNoumHierarchyOrder: Scalars['Boolean'];
  rearrangeSectionInNoumLayout: Scalars['Boolean'];
  redoNoumLayoutChange: NoumLayout;
  rejectAdCampaignOffer: GenericResponseOutput;
  rejectConnectionRequest: Scalars['Boolean'];
  rejectContract: Scalars['Boolean'];
  rejectCustomerKYC?: Maybe<PaymentCustomerDetailOutput>;
  rejectNoumInvitation: Scalars['Boolean'];
  rejectNoumMemberRolePromotion: Scalars['Boolean'];
  rejectSow: Scalars['Boolean'];
  removeAccount?: Maybe<MessageOutput>;
  removeCalendar?: Maybe<Scalars['Boolean']>;
  removeComment?: Maybe<PostOutput>;
  removeCustomerPayee?: Maybe<MessageOutput>;
  removeDiscoveryProfiles?: Maybe<Scalars['Boolean']>;
  removeElement?: Maybe<SpaceOutput>;
  removeFollowersFromSpace?: Maybe<SpaceOutput>;
  removeFromSocialHall?: Maybe<Scalars['Boolean']>;
  removeGroupMember?: Maybe<Array<Maybe<Member>>>;
  removeInitiateMicroDepositDwolla?: Maybe<AccountListOutput>;
  removeNetwork?: Maybe<Scalars['Boolean']>;
  removeOpsPermission?: Maybe<Scalars['Boolean']>;
  removeOpsRole?: Maybe<Scalars['Boolean']>;
  removePayment?: Maybe<Scalars['Boolean']>;
  removeProjectChamberElement: SpaceOutput;
  removeRaiseHandsRequest?: Maybe<SocialGroup>;
  removeReaction?: Maybe<PostOutput>;
  removeRecommendation?: Maybe<Matches>;
  removeSectionFromNoumLayout: Scalars['Boolean'];
  removeSpeaker?: Maybe<SocialGroup>;
  removeStatement?: Maybe<Scalars['Boolean']>;
  removeSubWallet?: Maybe<MessageOutput>;
  removeToolFromNoumLayout: Scalars['Boolean'];
  removeUnsavedAndDraftedData?: Maybe<SpaceOutput>;
  removeUserSpaces?: Maybe<Scalars['Boolean']>;
  removedPrevState?: Maybe<SpaceOutput>;
  requestConnection?: Maybe<SpaceConnection>;
  resendContractOrSowNotification: Scalars['Boolean'];
  resetConnectionCount?: Maybe<User>;
  resetPassCode?: Maybe<MessageOutput>;
  resetPlanConfigurations?: Maybe<Scalars['Boolean']>;
  resignFromNoumCoManagerRole: Scalars['Boolean'];
  restoreNoumRole: Scalars['Boolean'];
  retryBulkReport?: Maybe<MessageOutput>;
  retryTransaction?: Maybe<MessageOutput>;
  rewritteNoumLayoutUnsavedChanges: NoumLayout;
  saveBulkPaymentFile?: Maybe<MessageOutput>;
  saveCardStripe?: Maybe<StripeCardOutput>;
  saveNoumLayoutAsDraft: Scalars['Boolean'];
  saveOpNotification?: Maybe<NotificationOp>;
  sendConnectionInvite?: Maybe<SpaceConnection>;
  sendDocumentForSigning: Scalars['Boolean'];
  sendEmail?: Maybe<Scalars['Boolean']>;
  sendInvoice?: Maybe<InvoiceOutput>;
  sendInvoiceReminder?: Maybe<Scalars['Boolean']>;
  sendMultipleConnectionInvite?: Maybe<Array<Maybe<SpaceConnection>>>;
  sendNeedMoreInfoEmail?: Maybe<Scalars['Boolean']>;
  sendNotification?: Maybe<Scalars['Boolean']>;
  sendOpNotification?: Maybe<NotificationOp>;
  sendPostReport?: Maybe<PostOutput>;
  sendSms?: Maybe<Scalars['Boolean']>;
  sendUserNotification?: Maybe<Scalars['Boolean']>;
  sendUserNotificationV2?: Maybe<Scalars['Boolean']>;
  setAllowResetPassCode?: Maybe<MessageOutput>;
  setCustomerTransactionLimitFlag?: Maybe<MessageOutput>;
  setInviteInactive?: Maybe<Scalars['Boolean']>;
  setNoumLayoutToolMetaValue: ElementOutput;
  signContract: Scalars['Boolean'];
  signSow: Scalars['Boolean'];
  spotlightPlans: Scalars['Boolean'];
  spotlightSelectedPlan: Scalars['Boolean'];
  ssnUniqueness?: Maybe<PersonalProfileOutput>;
  startCalendarMainEvent?: Maybe<SocialGroup>;
  submitOnboardingQuestionnaire?: Maybe<SubmitOnboardingQuestionnaireOutput>;
  submitSurveyAnswer: Scalars['Boolean'];
  submitUserApplication?: Maybe<RiseUserDataOutput>;
  syncAndUpdatePlans?: Maybe<Array<Maybe<PlanSettingOutput>>>;
  testToken?: Maybe<Scalars['Boolean']>;
  tipTransaction: PaymentOutput;
  toggleFastPass?: Maybe<Referral>;
  turnOffAutoDebit?: Maybe<Scalars['Boolean']>;
  unPinConversation?: Maybe<Scalars['Boolean']>;
  unarchiveNoumContacts: Scalars['Boolean'];
  underwriting?: Maybe<UnderwritingMutations>;
  undoNoumLayoutChange: NoumLayout;
  unfavouriteNoum?: Maybe<Scalars['Boolean']>;
  unlinkNoumLink?: Maybe<NoumLink>;
  unlinkNoums?: Maybe<NoumLink>;
  updateAccountFlag?: Maybe<MessageOutput>;
  updateAdCampaign?: Maybe<AdCampaignOutput>;
  updateBillingAddress: Customer;
  updateChargebeeCustomer: Customer;
  updateCommentForGenericEntity?: Maybe<CommentOutput>;
  updateConnectionPermission?: Maybe<Array<Maybe<SpaceConnection>>>;
  updateConnectionPermissionV2: Scalars['Boolean'];
  updateConnectionStatus?: Maybe<SpaceConnection>;
  updateContract: Contract;
  updateConversationParticipants?: Maybe<Scalars['Boolean']>;
  updateCustomerAddressDetails?: Maybe<AddressOutput>;
  updateCustomerContactDetails?: Maybe<ContactOutput>;
  updateCustomerDocument?: Maybe<CustomerDocumentOutput>;
  updateCustomerFirstTimeFlag?: Maybe<Scalars['Boolean']>;
  updateCustomerPersonalDetails?: Maybe<PersonalOutput>;
  updateDiscoveryFromUser?: Maybe<Scalars['Boolean']>;
  updateElement?: Maybe<SpaceOutput>;
  updateElementByElementType?: Maybe<SpaceOutput>;
  updateElementPosition?: Maybe<SpaceOutput>;
  updateEvent?: Maybe<Event>;
  updateEventStatus?: Maybe<Event>;
  updateGroup?: Maybe<Group>;
  updateGroupInvitation?: Maybe<InvitationOutput>;
  updateGroupInvitationV2?: Maybe<Group>;
  updateGroupName?: Maybe<SocialGroup>;
  updateGroupRequest?: Maybe<InvitationOutput>;
  updateInvitation?: Maybe<Array<Maybe<Invitation>>>;
  updateInviteStatus?: Maybe<Event>;
  updateInvoice?: Maybe<InvoiceOutput>;
  updateInvoicePayment?: Maybe<InvoicePaymentOutput>;
  updateInvoiceStatus?: Maybe<InvoiceOutput>;
  updateInvoiceTags: InvoiceDetail;
  updateLocation?: Maybe<SocialHallAttendee>;
  updateMemberRole?: Maybe<Member>;
  updateNote?: Maybe<Note>;
  updateNotificationEventShowStatus?: Maybe<Scalars['Boolean']>;
  updateNotificationEventShowStatusV2?: Maybe<Scalars['Boolean']>;
  updateNotificationInviteStatus?: Maybe<Scalars['Boolean']>;
  updateNotificationInviteStatusV2?: Maybe<Scalars['Boolean']>;
  updateNotificationPostShowStatus?: Maybe<Scalars['Boolean']>;
  updateNotificationPostShowStatusV2?: Maybe<Scalars['Boolean']>;
  updateNotificationsReadStatus?: Maybe<Notifications>;
  updateNotificationsReadStatusV2?: Maybe<NotificationsV2>;
  updateNoumApplicationResult?: Maybe<ApplicationResult>;
  updateNoumApplicationResultForAdmin?: Maybe<ApplicationResult>;
  updateNoumClass?: Maybe<NoumClass>;
  updateNoumContact: NoumContactOutput;
  updateNoumCustomPreview?: Maybe<SpaceOutput>;
  updateNoumFile: NoumFile;
  updateNoumLayoutSection: NoumLayoutSection;
  updateNoumProgram?: Maybe<NoumProgram>;
  updateNoumReference: NoumReference;
  updateNoumReferenceStatus: NoumReference;
  updateNoumRole: NoumRole;
  updateNoumTransactionStatus: Scalars['Boolean'];
  updateNoumTransactionValidDays: Scalars['Boolean'];
  updateNoumVisibilitySettings?: Maybe<SpaceOutput>;
  updateOpNotification?: Maybe<NotificationOp>;
  updateOpsPermission?: Maybe<OpsPermissionOutput>;
  updateOpsRole?: Maybe<OpsRoleOutput>;
  updatePaymentConfig?: Maybe<PaymentConfiguration>;
  updatePaymentProvider?: Maybe<MessageOutput>;
  updatePaymentSubscriptionSetting: SettingsOutput;
  updatePaymentTCAcceptance?: Maybe<UserOutput>;
  updatePlanDetails?: Maybe<PlanDetail>;
  updatePlanEnabled: Scalars['Boolean'];
  updatePlanOrder: Scalars['Boolean'];
  updatePlanSetting: Scalars['Boolean'];
  updatePlanVisiblity: Scalars['Boolean'];
  updatePost?: Maybe<PostOutput>;
  updatePostReadStatus?: Maybe<UnreadCountOutput>;
  updateProfileElement?: Maybe<SpaceOutput>;
  updateProjectChamber?: Maybe<SpaceOutput>;
  updateProjectChamberElementPosition: SpaceOutput;
  updateProjectChamberElements: SpaceOutput;
  updateQuestion?: Maybe<NoumQuestionOutput>;
  updateReferralCount?: Maybe<ReferralInvite>;
  updateReferralMaxAllowedCount?: Maybe<Referral>;
  updateSOW: Sow;
  updateSocialHall?: Maybe<SocialHall>;
  updateSocialHallAttendeesStatus?: Maybe<SocialHallAttendee>;
  updateSpace?: Maybe<SpaceOutput>;
  updateSurvey: Survey;
  updateSurveyPage: SurveyPage;
  updateTheme?: Maybe<ThemeOutput>;
  updateUnreadMessageCount?: Maybe<UnreadCountOutput>;
  updateUserActionLog?: Maybe<UserActionLog>;
  updateUserAddressByAdmin?: Maybe<User>;
  updateUserContact?: Maybe<User>;
  updateUserCpfNumberAndAnswer?: Maybe<RiseUserDataOutput>;
  updateUserData?: Maybe<User>;
  updateUserDetailsByAdmin?: Maybe<User>;
  updateUserInvoiceLineItem?: Maybe<InvoiceLineItem>;
  updateUserKyc?: Maybe<KycOutput>;
  updateUserMediaTestingForSH?: Maybe<Scalars['Boolean']>;
  updateUserPreferences: UserPreferences;
  updateUserProfile?: Maybe<User>;
  updateUserProfilePicture?: Maybe<User>;
  updateUserReferralAndStatus?: Maybe<User>;
  updateUserRolesForAdmin?: Maybe<UserOutput>;
  updateUserSkillSought?: Maybe<Discovery>;
  updateUserSkills?: Maybe<Discovery>;
  updateUserStatus?: Maybe<UserOutput>;
  updateUserType?: Maybe<SuccessMessageOutput>;
  upgradeDowngradeSubscription: Scalars['JSON'];
  upsertDeviceToken?: Maybe<Array<Maybe<DeviceTokenOutput>>>;
  validateResetPasswordOTP?: Maybe<ValidateResetPasswordOutput>;
  validateSecurityQuestion?: Maybe<MessageOutput>;
  verifyMicroDepositDwolla?: Maybe<AccountListOutput>;
  verifyUserIdentity?: Maybe<Scalars['String']>;
  verifyUserProfile?: Maybe<Scalars['Boolean']>;
  verifyWithOneTimeAuth?: Maybe<OneTimeTokenOutput>;
};


export type MutationCreateSubscribeArgs = {
  subscriptionInput: SubscriptionInputType;
};


export type MutationOtpVerificationArgs = {
  email?: InputMaybe<Scalars['String']>;
  otp?: InputMaybe<Scalars['Int']>;
  phone?: InputMaybe<Scalars['String']>;
};


export type MutationAcceptKnockArgs = {
  knockId: Scalars['ID'];
};


export type MutationAcceptRaiseHandRequestArgs = {
  groupId: Scalars['ID'];
  requestedByUserId: Scalars['ID'];
};


export type MutationAcceptSpeakerInvitationArgs = {
  groupId: Scalars['ID'];
};


export type MutationAddAnswerArgs = {
  answerBody: Scalars['String'];
  questionId: Scalars['ID'];
};


export type MutationAddAppActivityArgs = {
  input: AppActivityInput;
};


export type MutationAddBankArgs = {
  publicToken?: InputMaybe<Scalars['String']>;
};


export type MutationAddCommentArgs = {
  _id: Scalars['ID'];
  content?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<TagsInput>>>;
};


export type MutationAddCommentToPostArgs = {
  _id: Scalars['ID'];
  content?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<TagsInput>>>;
};


export type MutationAddCookieConsentArgs = {
  input: CookieConsentInput;
};


export type MutationAddDebitAccountArgs = {
  accountNumber: Scalars['String'];
  accountSubType: Scalars['String'];
  bankId: Scalars['String'];
};


export type MutationAddDepositAccountArgs = {
  accountNumber: Scalars['String'];
  accountSubType: Scalars['String'];
  bankId: Scalars['String'];
};


export type MutationAddElementsArgs = {
  input?: InputMaybe<Array<InputMaybe<CreateElementInput>>>;
  isCalledFromNoumEditor2?: InputMaybe<Scalars['Boolean']>;
  spaceId: Scalars['ID'];
};


export type MutationAddElementsToProjectChamberArgs = {
  input?: InputMaybe<Array<ProjectElementInput>>;
  spaceId: Scalars['ID'];
};


export type MutationAddManualReferenceForNoumArgs = {
  experienceId: Scalars['ID'];
  reference: ManualNoumReferencePayload;
};


export type MutationAddNetworkArgs = {
  input?: InputMaybe<NetworkInput>;
  spaceId: Scalars['ID'];
};


export type MutationAddNewNoumContactArgs = {
  input: AddNewNoumContactInput;
};


export type MutationAddNoumFileArgs = {
  input: AddNoumFileInput;
};


export type MutationAddNoumLayoutToolArgs = {
  input: AddNoumLayoutToolInput;
};


export type MutationAddPaymentDetailsArgs = {
  input?: InputMaybe<PaymentInput>;
};


export type MutationAddPaymentProviderArgs = {
  input: AddPaymentProviderInput;
};


export type MutationAddProjectChamberCategoryArgs = {
  input: ProjectChamberCategoryInput;
};


export type MutationAddQuestionAnswersArgs = {
  input?: InputMaybe<Array<InputMaybe<QuestionsInput>>>;
};


export type MutationAddReactionArgs = {
  _id: Scalars['ID'];
  type?: InputMaybe<ReactionCategory>;
};


export type MutationAddReactionOnCommentArgs = {
  commentId: Scalars['ID'];
  postId: Scalars['ID'];
  type: ReactionCategory;
};


export type MutationAddReactionOnCommentReplyArgs = {
  commentId: Scalars['ID'];
  postId: Scalars['ID'];
  threadId: Scalars['ID'];
  type: ReactionCategory;
};


export type MutationAddRemoveNoumSubscriptionArgs = {
  noumInput: NoumTransactionInputType;
};


export type MutationAddReplyToCommentArgs = {
  commentId?: InputMaybe<Scalars['ID']>;
  content?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<TagsInput>>>;
};


export type MutationAddReplyToCommentV2Args = {
  commentId?: InputMaybe<Scalars['ID']>;
  content?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<TagsInput>>>;
};


export type MutationAddReplyToCommentV3ForGenericEntityArgs = {
  _id: Scalars['String'];
  content?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<TagsInput>>>;
};


export type MutationAddRiseUserBankArgs = {
  applicationId?: InputMaybe<Scalars['String']>;
  publicToken?: InputMaybe<Scalars['String']>;
};


export type MutationAddStatementDetailsArgs = {
  input?: InputMaybe<StatementInput>;
};


export type MutationAddUserAddressArgs = {
  input?: InputMaybe<AddressInput>;
};


export type MutationAddUserIncomeDataArgs = {
  input?: InputMaybe<UserIncomeData>;
};


export type MutationApplyForRiseApplicationArgs = {
  noumId: Scalars['ID'];
};


export type MutationApproveConnectionRequestArgs = {
  connectionRequestId: Scalars['ID'];
};


export type MutationApproveCustomerKycArgs = {
  id: Scalars['String'];
  msg: Scalars['String'];
};


export type MutationApproveNoumInvitationArgs = {
  noumId: Scalars['ID'];
};


export type MutationApproveNoumMemberRolePromotionArgs = {
  noumId: Scalars['ID'];
};


export type MutationArchiveNoumContactArgs = {
  contactId: Scalars['ID'];
};


export type MutationArchiveNoumContactsArgs = {
  contactIDs: Array<Scalars['ID']>;
};


export type MutationArchiveNoumRoleArgs = {
  noumRoleId: Scalars['ID'];
};


export type MutationArchiveUserSpacesArgs = {
  userIDs: Array<Scalars['ID']>;
};


export type MutationAskForNoumReferenceArgs = {
  experienceId: Scalars['ID'];
  reference?: InputMaybe<AskForReferencePayload>;
};


export type MutationAssignHostArgs = {
  socialHallId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};


export type MutationAutoInvoicePaymentArgs = {
  input: InvoiceTransactionInput;
};


export type MutationBelvoAccessTokenArgs = {
  input?: InputMaybe<BelvoAccessTokenInput>;
};


export type MutationBlockUserArgs = {
  eventId: Scalars['ID'];
  isBlocked?: InputMaybe<Scalars['Boolean']>;
  userId: Scalars['ID'];
};


export type MutationCancelConnectionRequestToNoumArgs = {
  noumId: Scalars['ID'];
};


export type MutationCancelInvoiceReportArgs = {
  report_id: Scalars['Float'];
};


export type MutationCancelKnockArgs = {
  knockId: Scalars['ID'];
};


export type MutationCancelNoumInvitationArgs = {
  memberId: Scalars['ID'];
};


export type MutationCancelNoumLayoutChangesArgs = {
  noumId: Scalars['ID'];
};


export type MutationCancelNoumMemberRolePromotionArgs = {
  memberId: Scalars['ID'];
};


export type MutationCancelProjectNoumCampaignArgs = {
  campaignId: Scalars['ID'];
};


export type MutationCancelRaiseHandByGroupIdArgs = {
  groupId: Scalars['ID'];
};


export type MutationCancelSpeakerInvitationArgs = {
  groupId: Scalars['ID'];
  invitedUserId: Scalars['ID'];
};


export type MutationCancelSubscriptionArgs = {
  reason?: InputMaybe<Scalars['String']>;
  subscription_id: Scalars['Float'];
};


export type MutationChangeNoumMembersRoleArgs = {
  input: ChangeNoumMemberRoleInput;
};


export type MutationChangeProjectChamberStatusArgs = {
  spaceId: Scalars['ID'];
  status?: InputMaybe<SpaceStatusEnum>;
};


export type MutationCloseCalendarMainEventArgs = {
  socialHallId: Scalars['ID'];
};


export type MutationCloseSocialHallGroupArgs = {
  socialHallId: Scalars['ID'];
};


export type MutationConnectToNoumArgs = {
  noumId: Scalars['ID'];
};


export type MutationCreateAccountDwollaArgs = {
  plaidToken: Scalars['String'];
};


export type MutationCreateAdCampaignArgs = {
  input?: InputMaybe<AdCampaignInput>;
};


export type MutationCreateAdCampaignCsvReportArgs = {
  filters?: InputMaybe<AdCampaignCsvReportCreateInput>;
};


export type MutationCreateAdCampaignOfferArgs = {
  input: AdCampaignOfferInput;
};


export type MutationCreateAddressArgs = {
  input?: InputMaybe<AddressInput>;
};


export type MutationCreateAndUpdateSpotLightAdminArgs = {
  chamberIds: Array<Scalars['ID']>;
  markSpotLight: Scalars['Boolean'];
  spotLightForAll: Scalars['Boolean'];
  userIds?: InputMaybe<Array<Scalars['ID']>>;
};


export type MutationCreateChargebeeCustomerArgs = {
  customer: CustomerInputType;
};


export type MutationCreateCommentForGenericEntityArgs = {
  content?: InputMaybe<Scalars['String']>;
  entityId: Scalars['String'];
  entityType?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<TagsInput>>>;
};


export type MutationCreateContractReportArgs = {
  filters: ContractReportFiltersInput;
};


export type MutationCreateConversationArgs = {
  _id: Scalars['ID'];
  input?: InputMaybe<ConversationInput>;
};


export type MutationCreateCustomerArgs = {
  input: CreateCustomerInput;
};


export type MutationCreateCustomerPayeeArgs = {
  input: CreateCustomerPayee;
};


export type MutationCreateEventArgs = {
  input?: InputMaybe<CreateEventInput>;
};


export type MutationCreateEventInvitationArgs = {
  _id: Scalars['ID'];
  acceptAll?: InputMaybe<Scalars['Boolean']>;
  chamberId?: InputMaybe<Scalars['ID']>;
  userId: Scalars['ID'];
};


export type MutationCreateGroupInvitationArgs = {
  input?: InputMaybe<SendGroupInviteInput>;
};


export type MutationCreateGroupRequestArgs = {
  _id: Scalars['ID'];
};


export type MutationCreateInstantEventArgs = {
  input: CreateInstantEventInput;
};


export type MutationCreateInternalPlanArgs = {
  details: ItemInput;
};


export type MutationCreateInvitationArgs = {
  input?: InputMaybe<SendInviteInput>;
};


export type MutationCreateInvoiceDraftArgs = {
  input?: InputMaybe<InvoiceDraftInput>;
};


export type MutationCreateInvoicePaymentArgs = {
  input: InvoicePaymentInput;
};


export type MutationCreateInvoiceReportArgs = {
  input: PaymentSubReportGenerateInput;
};


export type MutationCreateInvoiceToolReportArgs = {
  filters: InvoiceToolReportFiltersInput;
};


export type MutationCreateItemArgs = {
  details: ItemInput;
};


export type MutationCreateItemFamilyArgs = {
  details: ItemFamilyInput;
};


export type MutationCreateItemPriceArgs = {
  details: ItemPriceInput;
};


export type MutationCreateMultipleEventInvitationArgs = {
  _id: Scalars['ID'];
  chamberIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  userIds: Array<Scalars['ID']>;
};


export type MutationCreateNewContractArgs = {
  input: CreateNewContractInput;
};


export type MutationCreateNewSowArgs = {
  input: CreateNewSowInput;
};


export type MutationCreateNoteArgs = {
  customerId: Scalars['String'];
  text: Scalars['String'];
};


export type MutationCreateNotificationArgs = {
  input?: InputMaybe<Scalars['String']>;
};


export type MutationCreateNotificationV2Args = {
  input?: InputMaybe<Scalars['String']>;
};


export type MutationCreateNoumClassArgs = {
  input: InputNoumClass;
};


export type MutationCreateNoumLayoutSectionArgs = {
  input: CreateNoumLayoutSectionInput;
};


export type MutationCreateNoumProgramArgs = {
  input: InputNoumProgram;
};


export type MutationCreateNoumRoleArgs = {
  input: CreateNoumRoleInput;
};


export type MutationCreateOpsPermissionArgs = {
  opsPermission?: InputMaybe<OpsPermissionInputCreate>;
};


export type MutationCreateOpsRoleArgs = {
  opsRole?: InputMaybe<OpsRoleInputCreate>;
};


export type MutationCreateOrUpdateSocialHallForEventArgs = {
  input?: InputMaybe<EventSocialHallInput>;
};


export type MutationCreateOrUpdateTokenArchiveArgs = {
  tillDate: Scalars['Date'];
};


export type MutationCreatePassCodeArgs = {
  input: CreatePassCodeInput;
};


export type MutationCreatePaymentArgs = {
  input: CreatePaymentInput;
};


export type MutationCreatePaymentSubscriptionSettingArgs = {
  settingsInput: SettingsInput;
};


export type MutationCreatePersonalArgs = {
  input?: InputMaybe<PersonalInput>;
};


export type MutationCreatePlaidLinkArgs = {
  androidPackageName?: InputMaybe<Scalars['String']>;
};


export type MutationCreatePostArgs = {
  input?: InputMaybe<PostInput>;
};


export type MutationCreatePostForChamberArgs = {
  input?: InputMaybe<PostInput>;
};


export type MutationCreateProductArgs = {
  input?: InputMaybe<CreateProductInput>;
};


export type MutationCreateProjectChamberArgs = {
  input?: InputMaybe<ProjectChamberInput>;
};


export type MutationCreateProjectNoumCampaignArgs = {
  spaceId: Scalars['ID'];
  targets: Array<CampaignAudienceTarget>;
};


export type MutationCreateQuestionArgs = {
  input: QuestionInput;
};


export type MutationCreateRenewedPlaidLinkArgs = {
  input: RenewedPlaidToken;
};


export type MutationCreateRiseReportArgs = {
  filters?: InputMaybe<RiseReportFiltersInput>;
};


export type MutationCreateSignedUrlArgs = {
  fileName?: InputMaybe<Scalars['String']>;
  fileType?: InputMaybe<Scalars['String']>;
};


export type MutationCreateSocialHallArgs = {
  input?: InputMaybe<SocialHallInput>;
};


export type MutationCreateSowReportArgs = {
  filters: SowReportFiltersInput;
};


export type MutationCreateSpaceArgs = {
  input?: InputMaybe<SpaceInput>;
};


export type MutationCreateSsnArgs = {
  isUSResident?: InputMaybe<Scalars['Boolean']>;
  ssn?: InputMaybe<Scalars['String']>;
};


export type MutationCreateSubWalletArgs = {
  input?: InputMaybe<CreateSubLedgerInput>;
};


export type MutationCreateSubscriptionAndInvoiceFromHostedPagesArgs = {
  hosted_id: Scalars['String'];
};


export type MutationCreateSurveyArgs = {
  input: SurveyInputCreate;
};


export type MutationCreateSurveyPageArgs = {
  input: SurveyPageInputCreate;
};


export type MutationCreateUpdateAdCampaignReportArgs = {
  input?: InputMaybe<AdCampaignReportInput>;
};


export type MutationCreateUserInvoiceLineItemArgs = {
  input?: InputMaybe<InvoiceLineItemInput>;
};


export type MutationCreateUserRiseAddressArgs = {
  input?: InputMaybe<AddressInputRise>;
};


export type MutationCreateUserRiseProfileArgs = {
  input?: InputMaybe<PersonalInput>;
};


export type MutationCreateVideoThumbnailArgs = {
  url: Scalars['String'];
};


export type MutationDeclineKnockArgs = {
  knockId: Scalars['ID'];
};


export type MutationDeclineRaiseHandByGroupIdArgs = {
  groupId: Scalars['ID'];
  requestedByUserId: Scalars['ID'];
};


export type MutationDeclineSpeakerInvitationArgs = {
  groupId: Scalars['ID'];
};


export type MutationDeleteAccountArgs = {
  input?: InputMaybe<DeleteAccountInput>;
};


export type MutationDeleteAdCampaignArgs = {
  campaignId: Scalars['ID'];
};


export type MutationDeleteAdCampaignOfferArgs = {
  offerId: Scalars['String'];
};


export type MutationDeleteAdCampaignReportArgs = {
  campaignId: Scalars['ID'];
  reportId: Scalars['ID'];
};


export type MutationDeleteAllEventsByUserIdArgs = {
  userId: Scalars['ID'];
};


export type MutationDeleteCommentForGenericEntityArgs = {
  _id: Scalars['ID'];
};


export type MutationDeleteConnectionArgs = {
  _id: Scalars['ID'];
};


export type MutationDeleteContractArgs = {
  contractId: Scalars['ID'];
};


export type MutationDeleteEventArgs = {
  _id: Scalars['ID'];
};


export type MutationDeleteGroupArgs = {
  _id: Scalars['ID'];
};


export type MutationDeleteInvoiceArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteInvoicePaymentArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteNoteArgs = {
  noteId: Scalars['ID'];
};


export type MutationDeleteNoumFileArgs = {
  fileId: Scalars['ID'];
};


export type MutationDeleteOpNotificationArgs = {
  _id?: InputMaybe<Scalars['ID']>;
};


export type MutationDeletePaymentProviderArgs = {
  id: Scalars['String'];
};


export type MutationDeletePostArgs = {
  _id: Scalars['ID'];
};


export type MutationDeleteQuestionArgs = {
  questionId: Scalars['ID'];
};


export type MutationDeleteReplyToCommentArgs = {
  commentId?: InputMaybe<Scalars['String']>;
  postId: Scalars['ID'];
  replyId?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteReplyToCommentV2Args = {
  commentId?: InputMaybe<Scalars['String']>;
  postId: Scalars['ID'];
  replyId?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteSowArgs = {
  _id: Scalars['ID'];
};


export type MutationDeleteSpaceArgs = {
  spaceId: Scalars['ID'];
};


export type MutationDeleteSpaceConversationArgs = {
  spaceId: Scalars['ID'];
};


export type MutationDeleteSurveyArgs = {
  _id: Scalars['String'];
};


export type MutationDeleteUserBankLinkArgs = {
  publicToken?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteUserInvoiceLineItemArgs = {
  _id: Scalars['ID'];
};


export type MutationDiscardNoumReferenceArgs = {
  referenceId: Scalars['ID'];
};


export type MutationDocuSignAcceptanceArgs = {
  input?: InputMaybe<DialsInput>;
};


export type MutationDuplicateInvoiceArgs = {
  invoiceId: Scalars['ID'];
};


export type MutationDuplicateNoumLayoutSectionArgs = {
  sectionId: Scalars['ID'];
};


export type MutationDuplicateNoumLayoutToolArgs = {
  toolId: Scalars['ID'];
};


export type MutationEditAccountPasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationExitFromGroupArgs = {
  groupId: Scalars['ID'];
};


export type MutationExitFromSocialHallArgs = {
  fromLeaveCTA?: InputMaybe<Scalars['Boolean']>;
  socialHallId: Scalars['ID'];
};


export type MutationFavouriteNoumArgs = {
  noumId: Scalars['ID'];
};


export type MutationGenerateAdminReportArgs = {
  input: CreateAdminReportInput;
};


export type MutationGenerateAiImagesArgs = {
  prompt: Scalars['String'];
};


export type MutationGenerateOtpForVerificationArgs = {
  email?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};


export type MutationGenerateReferralCodeArgs = {
  productKey?: InputMaybe<Scalars['String']>;
};


export type MutationGenerateReferralCodeV2Args = {
  productKey?: InputMaybe<Scalars['String']>;
};


export type MutationGenerateUserS3SignedUrlArgs = {
  bucketName?: InputMaybe<Scalars['String']>;
  file: FileInput;
};


export type MutationGetOrCreateConversationArgs = {
  _id?: InputMaybe<Scalars['ID']>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};


export type MutationGetOrCreateGlobalConversationArgs = {
  _id?: InputMaybe<Scalars['ID']>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};


export type MutationGetOrCreateSpaceConversationArgs = {
  spaceId: Scalars['ID'];
  userIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};


export type MutationGroupEventArgs = {
  eventName: Scalars['String'];
  groupId: Scalars['ID'];
  input?: InputMaybe<Scalars['Object']>;
};


export type MutationHandleFollowArgs = {
  action: FollowActionEnum;
  source?: InputMaybe<FollowSource>;
  spaceId: Scalars['ID'];
};


export type MutationHandleSowLinkingArgs = {
  contractId: Scalars['ID'];
  link?: InputMaybe<Scalars['Boolean']>;
  sowId: Scalars['ID'];
};


export type MutationHideNotificationsArgs = {
  input?: InputMaybe<HideNotificationInput>;
};


export type MutationHideNotificationsV2Args = {
  input?: InputMaybe<HideNotificationInputV2>;
};


export type MutationInactivateGroupAdminArgs = {
  user: Scalars['ID'];
};


export type MutationInitiateMicroDepositDwollaArgs = {
  input: AccountRoutingInput;
};


export type MutationInitiateTipForAnswerArgs = {
  input: TipsInput;
};


export type MutationInviteAsSpeakerArgs = {
  groupId: Scalars['ID'];
  invitedUserIds: Array<Scalars['ID']>;
};


export type MutationInviteNewNonNoumenaMemberArgs = {
  input: InviteNonNoumenaMemberInput;
};


export type MutationInviteNonNoumenaMemberArgs = {
  input?: InputMaybe<NmUserInput>;
};


export type MutationInviteNoumMembersArgs = {
  input: InviteNoumMembers;
};


export type MutationJoinGroupWithoutKnockingArgs = {
  groupId: Scalars['ID'];
};


export type MutationJoinSocialHallArgs = {
  input?: InputMaybe<SocialHallAttendeeInput>;
};


export type MutationJoinSocialHallV2Args = {
  name?: InputMaybe<Scalars['String']>;
};


export type MutationJoinWaitingListArgs = {
  email?: InputMaybe<Scalars['String']>;
};


export type MutationKickNoumMembersArgs = {
  memberIDs: Array<Scalars['ID']>;
};


export type MutationKnockArgs = {
  input?: InputMaybe<KnockInput>;
};


export type MutationLeaveNoumMembershipArgs = {
  noumId: Scalars['ID'];
};


export type MutationLeaveSocialHallArgs = {
  socialHallId: Scalars['ID'];
};


export type MutationLinkNoumsArgs = {
  linkedNoumIDs: Array<Scalars['ID']>;
};


export type MutationMakeAccountDefaultArgs = {
  id: Scalars['String'];
};


export type MutationMarkBroadcastedNoumAsViewedArgs = {
  spaceId: Scalars['ID'];
};


export type MutationMarkNotificationAsReadArgs = {
  _id: Scalars['ID'];
};


export type MutationMarkNotificationAsReadV2Args = {
  _id: Scalars['ID'];
};


export type MutationMarkNoumAsRecentArgs = {
  noumId: Scalars['ID'];
};


export type MutationMarkNoumFileAsDownloadedArgs = {
  fileId: Scalars['ID'];
};


export type MutationMarkNoumFileAsViewedArgs = {
  fileId: Scalars['ID'];
};


export type MutationMarkSearchEntityAsClickedArgs = {
  id: Scalars['ID'];
};


export type MutationMarkSpaceAsEditedArgs = {
  spaceId: Scalars['ID'];
};


export type MutationMoveToolToNoumLayoutColumnArgs = {
  input: MoveToolToNoumLayoutColumnInput;
};


export type MutationMuteSpeakerArgs = {
  actionType: MuteSpeakerType;
  groupId: Scalars['ID'];
  speakerId: Scalars['ID'];
};


export type MutationNotificationHandlerArgs = {
  input?: InputMaybe<NotificationInput>;
};


export type MutationNotificationHandlerV2Args = {
  input?: InputMaybe<NotificationInputV2>;
};


export type MutationNotifyUserToSetupWalletArgs = {
  userId: Scalars['ID'];
};


export type MutationPinConversationArgs = {
  cid?: InputMaybe<Scalars['String']>;
};


export type MutationPinPostArgs = {
  postId?: InputMaybe<Scalars['ID']>;
};


export type MutationPublicProjectChamberElementStateArgs = {
  currentState: ElementStatusEnum;
  prevStates: Array<ElementStatusEnum>;
  spaceId: Scalars['ID'];
};


export type MutationPublishElementStateArgs = {
  currentState: ElementStatusEnum;
  elementIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  prevStates: Array<ElementStatusEnum>;
  spaceId: Scalars['ID'];
};


export type MutationPublishNoumLayoutArgs = {
  noumId: Scalars['ID'];
};


export type MutationPublishSpaceByIdArgs = {
  spaceId?: InputMaybe<Scalars['ID']>;
};


export type MutationRaiseHandByGroupIdArgs = {
  groupId: Scalars['ID'];
};


export type MutationRaiseInvoicePaymentArgs = {
  input: RaiseInvoicePaymentInput;
};


export type MutationRearrangeNoumHierarchyOrderArgs = {
  reorderedRoleIDs: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationRearrangeSectionInNoumLayoutArgs = {
  input: RearrangeSectionInNoumLayoutInput;
};


export type MutationRedoNoumLayoutChangeArgs = {
  noumId: Scalars['ID'];
};


export type MutationRejectAdCampaignOfferArgs = {
  offerId: Scalars['String'];
  reason?: InputMaybe<Scalars['String']>;
};


export type MutationRejectConnectionRequestArgs = {
  connectionRequestId: Scalars['ID'];
};


export type MutationRejectContractArgs = {
  documentId: Scalars['ID'];
};


export type MutationRejectCustomerKycArgs = {
  id: Scalars['String'];
  msg: Scalars['String'];
};


export type MutationRejectNoumInvitationArgs = {
  noumId: Scalars['ID'];
};


export type MutationRejectNoumMemberRolePromotionArgs = {
  noumId: Scalars['ID'];
};


export type MutationRejectSowArgs = {
  documentId: Scalars['ID'];
};


export type MutationRemoveAccountArgs = {
  id: Scalars['String'];
};


export type MutationRemoveCalendarArgs = {
  chamberId: Scalars['ID'];
};


export type MutationRemoveCommentArgs = {
  _id: Scalars['ID'];
  commentId: Scalars['ID'];
};


export type MutationRemoveCustomerPayeeArgs = {
  id: Scalars['String'];
};


export type MutationRemoveDiscoveryProfilesArgs = {
  input?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};


export type MutationRemoveElementArgs = {
  elementId: Scalars['ID'];
  spaceId: Scalars['ID'];
};


export type MutationRemoveFollowersFromSpaceArgs = {
  spaceId: Scalars['ID'];
  userIds?: InputMaybe<Array<Scalars['ID']>>;
};


export type MutationRemoveFromSocialHallArgs = {
  socialHallId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationRemoveGroupMemberArgs = {
  _id?: InputMaybe<Scalars['ID']>;
  groupId: Scalars['ID'];
};


export type MutationRemoveInitiateMicroDepositDwollaArgs = {
  id: Scalars['String'];
};


export type MutationRemoveNetworkArgs = {
  networkId: Scalars['ID'];
  spaceId: Scalars['ID'];
};


export type MutationRemoveOpsPermissionArgs = {
  permissionId: Scalars['ID'];
};


export type MutationRemoveOpsRoleArgs = {
  roleId: Scalars['ID'];
};


export type MutationRemovePaymentArgs = {
  paymentId?: InputMaybe<Scalars['String']>;
};


export type MutationRemoveProjectChamberElementArgs = {
  elementId: Scalars['ID'];
  spaceId: Scalars['ID'];
};


export type MutationRemoveRaiseHandsRequestArgs = {
  socialHallId: Scalars['ID'];
};


export type MutationRemoveReactionArgs = {
  _id: Scalars['ID'];
  type?: InputMaybe<ReactionCategory>;
};


export type MutationRemoveRecommendationArgs = {
  _id: Scalars['ID'];
};


export type MutationRemoveSectionFromNoumLayoutArgs = {
  sectionId: Scalars['ID'];
};


export type MutationRemoveSpeakerArgs = {
  groupId: Scalars['ID'];
  speakerId: Scalars['ID'];
};


export type MutationRemoveStatementArgs = {
  statementId?: InputMaybe<Scalars['String']>;
};


export type MutationRemoveSubWalletArgs = {
  chamberId: Scalars['String'];
};


export type MutationRemoveToolFromNoumLayoutArgs = {
  toolId: Scalars['ID'];
};


export type MutationRemoveUnsavedAndDraftedDataArgs = {
  spaceId?: InputMaybe<Scalars['ID']>;
};


export type MutationRemoveUserSpacesArgs = {
  userIDs: Array<Scalars['ID']>;
};


export type MutationRemovedPrevStateArgs = {
  spaceId: Scalars['ID'];
  state: ElementStatusEnumForStateChange;
};


export type MutationRequestConnectionArgs = {
  message?: InputMaybe<Scalars['String']>;
  ownSpaceId: Scalars['ID'];
  requestedSpaceId: Scalars['ID'];
};


export type MutationResendContractOrSowNotificationArgs = {
  documentId: Scalars['ID'];
  sendTo?: InputMaybe<Array<Parties>>;
  type: ContractSow;
};


export type MutationResetPassCodeArgs = {
  input: ResetPassCodeInput;
};


export type MutationResignFromNoumCoManagerRoleArgs = {
  input: ResignFromNoumCoManagerRoleInput;
};


export type MutationRestoreNoumRoleArgs = {
  noumRoleId: Scalars['ID'];
};


export type MutationRetryBulkReportArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type MutationRetryTransactionArgs = {
  id: Scalars['String'];
};


export type MutationRewritteNoumLayoutUnsavedChangesArgs = {
  input: RewritteNoumLayoutUnsavedChangesInput;
};


export type MutationSaveBulkPaymentFileArgs = {
  documentName: Scalars['String'];
  title?: InputMaybe<ReportImportTitle>;
};


export type MutationSaveCardStripeArgs = {
  paymentId: Scalars['String'];
};


export type MutationSaveNoumLayoutAsDraftArgs = {
  noumId: Scalars['ID'];
};


export type MutationSaveOpNotificationArgs = {
  input?: InputMaybe<NotificationOpInput>;
};


export type MutationSendConnectionInviteArgs = {
  invitedSpaceId: Scalars['ID'];
  message?: InputMaybe<Scalars['String']>;
  ownSpaceId: Scalars['ID'];
};


export type MutationSendDocumentForSigningArgs = {
  documentId: Scalars['ID'];
  senderNote?: InputMaybe<Scalars['String']>;
  type: ContractSow;
};


export type MutationSendEmailArgs = {
  input?: InputMaybe<EmailParams>;
};


export type MutationSendInvoiceArgs = {
  id: Scalars['ID'];
};


export type MutationSendInvoiceReminderArgs = {
  customMessage?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};


export type MutationSendMultipleConnectionInviteArgs = {
  invitedSpaceIds: Array<Scalars['ID']>;
  message?: InputMaybe<Scalars['String']>;
  ownSpaceId: Scalars['ID'];
};


export type MutationSendNotificationArgs = {
  input?: InputMaybe<Scalars['String']>;
};


export type MutationSendOpNotificationArgs = {
  input?: InputMaybe<NotificationOpInput>;
};


export type MutationSendPostReportArgs = {
  input?: InputMaybe<ReportInput>;
};


export type MutationSendSmsArgs = {
  input?: InputMaybe<SmsParams>;
};


export type MutationSendUserNotificationArgs = {
  input?: InputMaybe<Scalars['String']>;
};


export type MutationSendUserNotificationV2Args = {
  input?: InputMaybe<Scalars['String']>;
};


export type MutationSetAllowResetPassCodeArgs = {
  userId: Scalars['String'];
};


export type MutationSetCustomerTransactionLimitFlagArgs = {
  flag: Scalars['Boolean'];
  id: Scalars['String'];
};


export type MutationSetInviteInactiveArgs = {
  token: Scalars['String'];
};


export type MutationSetNoumLayoutToolMetaValueArgs = {
  input: SetNoumLayoutToolMetaValueInput;
};


export type MutationSignContractArgs = {
  documentId: Scalars['ID'];
};


export type MutationSignSowArgs = {
  documentId: Scalars['ID'];
};


export type MutationSpotlightPlansArgs = {
  enabled: Scalars['Boolean'];
  plan_setting_id: Scalars['Float'];
};


export type MutationSpotlightSelectedPlanArgs = {
  spotlightInput: SpotlightPlanInput;
};


export type MutationStartCalendarMainEventArgs = {
  socialHallId: Scalars['ID'];
};


export type MutationSubmitOnboardingQuestionnaireArgs = {
  input?: InputMaybe<Array<InputMaybe<SubmitOnboardingQuestionnaire>>>;
};


export type MutationSubmitSurveyAnswerArgs = {
  input: SurveyAnswerInputCreate;
};


export type MutationSubmitUserApplicationArgs = {
  appContinue?: InputMaybe<ApplicationStatus>;
  applicationId?: InputMaybe<Scalars['String']>;
};


export type MutationTestTokenArgs = {
  data?: InputMaybe<Scalars['String']>;
};


export type MutationTipTransactionArgs = {
  input: TipTransactionInput;
};


export type MutationToggleFastPassArgs = {
  active: Scalars['Boolean'];
  code: Scalars['String'];
};


export type MutationUnPinConversationArgs = {
  cid?: InputMaybe<Scalars['String']>;
};


export type MutationUnarchiveNoumContactsArgs = {
  contactIDs: Array<Scalars['ID']>;
};


export type MutationUndoNoumLayoutChangeArgs = {
  noumId: Scalars['ID'];
};


export type MutationUnfavouriteNoumArgs = {
  noumId: Scalars['ID'];
};


export type MutationUnlinkNoumLinkArgs = {
  noumLinkId: Scalars['ID'];
};


export type MutationUnlinkNoumsArgs = {
  linkedNoumIDs: Array<Scalars['ID']>;
  noumLinkId: Scalars['ID'];
};


export type MutationUpdateAccountFlagArgs = {
  input?: InputMaybe<UpdateAccountFlagInput>;
};


export type MutationUpdateAdCampaignArgs = {
  input?: InputMaybe<UpdateAdCampaignInput>;
};


export type MutationUpdateBillingAddressArgs = {
  billingAddress: BillingAddressInpuType;
};


export type MutationUpdateChargebeeCustomerArgs = {
  customer: CustomerInputType;
};


export type MutationUpdateCommentForGenericEntityArgs = {
  _id: Scalars['String'];
  content?: InputMaybe<Scalars['String']>;
  entityType?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<TagsInput>>>;
};


export type MutationUpdateConnectionPermissionArgs = {
  input: ConnectionPermissionInput;
};


export type MutationUpdateConnectionPermissionV2Args = {
  permissions: Array<PermissionInputV2>;
};


export type MutationUpdateConnectionStatusArgs = {
  connectionId: Scalars['ID'];
  status?: InputMaybe<ConnectionRequestTypeEnum>;
};


export type MutationUpdateContractArgs = {
  contractId: Scalars['ID'];
  input: ContractInput;
};


export type MutationUpdateConversationParticipantsArgs = {
  cid: Scalars['String'];
  uid: Scalars['ID'];
};


export type MutationUpdateCustomerAddressDetailsArgs = {
  input?: InputMaybe<CustomerAddressInput>;
};


export type MutationUpdateCustomerContactDetailsArgs = {
  additionalEmail?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<ModeEnum>;
  phone?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateCustomerDocumentArgs = {
  input: UpdateCustomerDocumentInput;
};


export type MutationUpdateCustomerPersonalDetailsArgs = {
  input?: InputMaybe<CustomerPersonalInput>;
};


export type MutationUpdateDiscoveryFromUserArgs = {
  input?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateElementArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<Array<ElementInput>>;
};


export type MutationUpdateElementByElementTypeArgs = {
  elementType: ElementTypeEnum;
  input: ElementInput;
  spaceType: SpaceTypeEnum;
};


export type MutationUpdateElementPositionArgs = {
  input?: InputMaybe<Array<InputMaybe<ElementPositionInput>>>;
  spaceId: Scalars['ID'];
};


export type MutationUpdateEventArgs = {
  input?: InputMaybe<UpdateEventInput>;
};


export type MutationUpdateEventStatusArgs = {
  _id: Scalars['ID'];
  status: EventsStatus;
};


export type MutationUpdateGroupArgs = {
  _id: Scalars['ID'];
  input?: InputMaybe<GroupInput>;
};


export type MutationUpdateGroupInvitationArgs = {
  input?: InputMaybe<UpdateGroupInvitation>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateGroupInvitationV2Args = {
  input?: InputMaybe<UpdateGroupInvitation>;
};


export type MutationUpdateGroupNameArgs = {
  groupId: Scalars['ID'];
  input?: InputMaybe<SocialGroupInput>;
};


export type MutationUpdateGroupRequestArgs = {
  input?: InputMaybe<UpdateGroupInvitation>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateInvitationArgs = {
  input?: InputMaybe<UpdateInvitation>;
};


export type MutationUpdateInviteStatusArgs = {
  _id: Scalars['ID'];
  acceptAll?: InputMaybe<Scalars['Boolean']>;
  status: InvitationStatus;
};


export type MutationUpdateInvoiceArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<UpdateInvoiceDraftInput>;
};


export type MutationUpdateInvoicePaymentArgs = {
  id: Scalars['ID'];
  input: UpdateInvoicePaymentInput;
};


export type MutationUpdateInvoiceStatusArgs = {
  id: Scalars['ID'];
  status?: InputMaybe<InvoiceStatusEnumInput>;
};


export type MutationUpdateInvoiceTagsArgs = {
  invoiceInput: UpdateInvoiceTagsInput;
};


export type MutationUpdateLocationArgs = {
  input?: InputMaybe<UpdateSocialHallAttendeeInput>;
  socialHallAttendeeId: Scalars['ID'];
};


export type MutationUpdateMemberRoleArgs = {
  _id: Scalars['ID'];
  groupId: Scalars['ID'];
};


export type MutationUpdateNoteArgs = {
  noteId: Scalars['ID'];
  text: Scalars['String'];
};


export type MutationUpdateNotificationEventShowStatusArgs = {
  eventId: Scalars['ID'];
  userId?: InputMaybe<Scalars['ID']>;
};


export type MutationUpdateNotificationEventShowStatusV2Args = {
  eventId: Scalars['ID'];
  userId?: InputMaybe<Scalars['ID']>;
};


export type MutationUpdateNotificationInviteStatusArgs = {
  input?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateNotificationInviteStatusV2Args = {
  input?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateNotificationPostShowStatusArgs = {
  _id?: InputMaybe<Scalars['ID']>;
};


export type MutationUpdateNotificationPostShowStatusV2Args = {
  _id?: InputMaybe<Scalars['ID']>;
};


export type MutationUpdateNotificationsReadStatusArgs = {
  _id?: InputMaybe<Scalars['ID']>;
};


export type MutationUpdateNotificationsReadStatusV2Args = {
  _id?: InputMaybe<Scalars['ID']>;
};


export type MutationUpdateNoumApplicationResultArgs = {
  _id: Scalars['ID'];
  input: ApplicationResultInput;
};


export type MutationUpdateNoumApplicationResultForAdminArgs = {
  _id: Scalars['ID'];
  input: ApplicationResultInputAdmin;
};


export type MutationUpdateNoumClassArgs = {
  id: Scalars['ID'];
  input: UpdateNoumClass;
};


export type MutationUpdateNoumContactArgs = {
  input: UpdateNoumContactInput;
};


export type MutationUpdateNoumCustomPreviewArgs = {
  elements?: InputMaybe<Array<NoumCustomPreviewElementInput>>;
  noumId: Scalars['ID'];
};


export type MutationUpdateNoumFileArgs = {
  input: UpdateNoumFileInput;
};


export type MutationUpdateNoumLayoutSectionArgs = {
  input: UpdateNoumLayoutSectionInput;
};


export type MutationUpdateNoumProgramArgs = {
  id?: InputMaybe<Scalars['ID']>;
  input: UpdateNoumProgram;
};


export type MutationUpdateNoumReferenceArgs = {
  payload: UpdateNoumReferencePayload;
  referenceId: Scalars['ID'];
};


export type MutationUpdateNoumReferenceStatusArgs = {
  referenceId: Scalars['ID'];
  status: NoumReferenceStatus;
};


export type MutationUpdateNoumRoleArgs = {
  input: UpdateNoumRoleInput;
};


export type MutationUpdateNoumTransactionStatusArgs = {
  input: NoumTransactionUpdateStatusInput;
};


export type MutationUpdateNoumTransactionValidDaysArgs = {
  input: NoumTransactionUpdateValidInput;
};


export type MutationUpdateNoumVisibilitySettingsArgs = {
  spaceId: Scalars['ID'];
  visibility: ProjectChamberType;
};


export type MutationUpdateOpNotificationArgs = {
  _id?: InputMaybe<Scalars['ID']>;
  input?: InputMaybe<NotificationOpInput>;
};


export type MutationUpdateOpsPermissionArgs = {
  opsPermission?: InputMaybe<OpsPermissionInputUpdate>;
};


export type MutationUpdateOpsRoleArgs = {
  opsRole?: InputMaybe<OpsRoleInputUpdate>;
};


export type MutationUpdatePaymentConfigArgs = {
  name: Scalars['String'];
  value: Scalars['String'];
};


export type MutationUpdatePaymentProviderArgs = {
  input: UpdatePaymentProviderInput;
};


export type MutationUpdatePaymentSubscriptionSettingArgs = {
  settingsInput: SettingsUpdateInput;
};


export type MutationUpdatePaymentTcAcceptanceArgs = {
  paymentTCAcceptanceInput: Scalars['Boolean'];
};


export type MutationUpdatePlanDetailsArgs = {
  details: PlanDetailUpdateInput;
};


export type MutationUpdatePlanEnabledArgs = {
  enabled: Scalars['Boolean'];
  planSettingId: Scalars['Float'];
};


export type MutationUpdatePlanOrderArgs = {
  input: PlanSettingUpdateOrder;
};


export type MutationUpdatePlanSettingArgs = {
  data: PlanSettingUpdateInput;
  planSettingId: Scalars['Float'];
};


export type MutationUpdatePlanVisiblityArgs = {
  period_unit: Scalars['String'];
  plan_id: Scalars['Float'];
  visiblity: Scalars['Boolean'];
};


export type MutationUpdatePostArgs = {
  _id: Scalars['ID'];
  input?: InputMaybe<PostInput>;
};


export type MutationUpdateProjectChamberArgs = {
  input?: InputMaybe<ProjectChamberUpdateInput>;
  spaceId: Scalars['ID'];
};


export type MutationUpdateProjectChamberElementPositionArgs = {
  input?: InputMaybe<Array<ElementPositionInput>>;
  spaceId: Scalars['ID'];
};


export type MutationUpdateProjectChamberElementsArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<Array<ProjectElementInput>>;
};


export type MutationUpdateQuestionArgs = {
  input?: InputMaybe<QuestionUpdateInput>;
  questionId: Scalars['ID'];
};


export type MutationUpdateReferralCountArgs = {
  inviteeUserId?: InputMaybe<Scalars['String']>;
  referralCode?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateReferralMaxAllowedCountArgs = {
  maxAllowedCount?: InputMaybe<Scalars['Int']>;
  referralId?: InputMaybe<Scalars['ID']>;
};


export type MutationUpdateSowArgs = {
  SOWId: Scalars['ID'];
  input: UpdateSowInput;
};


export type MutationUpdateSocialHallArgs = {
  hallId?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<UpdateSocialHallInput>;
};


export type MutationUpdateSocialHallAttendeesStatusArgs = {
  id: Scalars['ID'];
  socialHallId: Scalars['ID'];
  status?: InputMaybe<SocialHallAttendeeStatus>;
};


export type MutationUpdateSpaceArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<SpaceUpdateInput>;
};


export type MutationUpdateSurveyArgs = {
  _id: Scalars['String'];
  input: SurveyInputUpdate;
};


export type MutationUpdateSurveyPageArgs = {
  _id: Scalars['String'];
  input: PageInputUpdate;
};


export type MutationUpdateThemeArgs = {
  input?: InputMaybe<ThemeInput>;
  themeId: Scalars['ID'];
};


export type MutationUpdateUnreadMessageCountArgs = {
  cid?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserActionLogArgs = {
  input?: InputMaybe<UserActionLogInput>;
};


export type MutationUpdateUserAddressByAdminArgs = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  input: AddressInput;
};


export type MutationUpdateUserContactArgs = {
  input?: InputMaybe<Array<InputMaybe<ContactInput>>>;
};


export type MutationUpdateUserCpfNumberAndAnswerArgs = {
  cpf?: InputMaybe<Scalars['String']>;
  questionAnswer?: InputMaybe<Array<InputMaybe<QuestionsRiseInput>>>;
};


export type MutationUpdateUserDataArgs = {
  input?: InputMaybe<UpdateUserDataInput>;
};


export type MutationUpdateUserDetailsByAdminArgs = {
  input?: InputMaybe<UpdateUserByAdminInput>;
};


export type MutationUpdateUserInvoiceLineItemArgs = {
  _id: Scalars['ID'];
  input: UpdateInvoiceLineItemInput;
};


export type MutationUpdateUserKycArgs = {
  input?: InputMaybe<KycInput>;
};


export type MutationUpdateUserMediaTestingForShArgs = {
  accept: Scalars['Boolean'];
};


export type MutationUpdateUserPreferencesArgs = {
  input: UserPreferencesInput;
};


export type MutationUpdateUserProfileArgs = {
  input?: InputMaybe<UserProfileInput>;
};


export type MutationUpdateUserProfilePictureArgs = {
  profilePictureLink?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserReferralAndStatusArgs = {
  referralCode?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserRolesForAdminArgs = {
  _id: Scalars['ID'];
  roles?: InputMaybe<Array<Scalars['ID']>>;
};


export type MutationUpdateUserSkillSoughtArgs = {
  input?: InputMaybe<Array<Scalars['ID']>>;
};


export type MutationUpdateUserSkillsArgs = {
  input?: InputMaybe<Array<Scalars['ID']>>;
};


export type MutationUpdateUserStatusArgs = {
  input?: InputMaybe<UserInput>;
};


export type MutationUpdateUserTypeArgs = {
  input?: InputMaybe<UpdateUserDataInput>;
};


export type MutationUpgradeDowngradeSubscriptionArgs = {
  details: SubscriptionUpgradeDowngradeInput;
};


export type MutationUpsertDeviceTokenArgs = {
  input?: InputMaybe<DeviceToken>;
};


export type MutationValidateResetPasswordOtpArgs = {
  newPassword: Scalars['String'];
  otp: Scalars['String'];
};


export type MutationValidateSecurityQuestionArgs = {
  securityQuestion: SecurityQuestion;
};


export type MutationVerifyMicroDepositDwollaArgs = {
  input?: InputMaybe<VerifyMicroDepositInput>;
};


export type MutationVerifyUserIdentityArgs = {
  input?: InputMaybe<UserIdentityInput>;
};


export type MutationVerifyWithOneTimeAuthArgs = {
  token?: InputMaybe<Scalars['ID']>;
};

export type MuteSpeakerSubscriptionData = {
  __typename?: 'MuteSpeakerSubscriptionData';
  actionType?: Maybe<MuteSpeakerType>;
  userId?: Maybe<Scalars['ID']>;
};

export enum MuteSpeakerType {
  Mute = 'MUTE',
  Unmute = 'UNMUTE'
}

export type NmUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  message?: InputMaybe<Scalars['String']>;
  noumDetails: NoumDetalisInput;
  requestedForNoumId: Scalars['ID'];
};

export type NmUserOutput = {
  __typename?: 'NMUserOutput';
  id: Scalars['ID'];
};

export enum Noum_Fee_Operation_Type {
  Activation = 'ACTIVATION',
  Archived = 'ARCHIVED',
  OpsAdmin = 'OPS_ADMIN',
  Renewal = 'RENEWAL',
  Scheduled = 'SCHEDULED'
}

export type NetworkInput = {
  accessToken: Scalars['String'];
  connectionType: ConnectionTypeEnum;
  isActive?: InputMaybe<Scalars['Boolean']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type NetworkOutput = {
  __typename?: 'NetworkOutput';
  _id?: Maybe<Scalars['ID']>;
  accessToken?: Maybe<Scalars['String']>;
  connectionType?: Maybe<ConnectionTypeEnum>;
  expiryDate?: Maybe<Scalars['String']>;
  isActive?: Maybe<Scalars['Boolean']>;
  userId?: Maybe<Scalars['String']>;
};

export type NeuroProfileQueries = {
  __typename?: 'NeuroProfileQueries';
  getNeuroQuestion?: Maybe<Scalars['Json']>;
};


export type NeuroProfileQueriesGetNeuroQuestionArgs = {
  input?: InputMaybe<NeuroQuestionInput>;
  shortQuestionnare?: InputMaybe<Scalars['Boolean']>;
};

export type NeuroQuestionInput = {
  answer_id: Scalars['String'];
  questionaireId: Scalars['String'];
};

export type NewProductOutput = {
  __typename?: 'NewProductOutput';
  _id?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  currencyCode?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  effectiveDateFrom?: Maybe<Scalars['String']>;
  effectiveDateTo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  productOwner?: Maybe<Scalars['ID']>;
};

export type NoRelationBusinessOutput = {
  __typename?: 'NoRelationBusinessOutput';
  city?: Maybe<Scalars['String']>;
  geo?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  subcode?: Maybe<Scalars['String']>;
  taxId?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type Note = {
  __typename?: 'Note';
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<UserOutput>;
  customerId?: Maybe<Scalars['String']>;
  deletable?: Maybe<Scalars['Boolean']>;
  editable?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  text?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<UserOutput>;
};

export type NotesInput = {
  createdBy?: InputMaybe<Scalars['ID']>;
  customerId?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<SortNoteEnum>;
  updatedBy?: InputMaybe<Scalars['ID']>;
};

export type Notification = {
  __typename?: 'Notification';
  _id: Scalars['ID'];
  adminUserId?: Maybe<UserOutput>;
  authorName?: Maybe<Scalars['String']>;
  commentId?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  data?: Maybe<NotificationAdditionalData>;
  event?: Maybe<EventNotificationDetails>;
  group?: Maybe<GroupRef>;
  inviteId?: Maybe<Scalars['ID']>;
  inviteStatus?: Maybe<NotificationInviteStatus>;
  postId?: Maybe<Scalars['ID']>;
  sourceUserNoum?: Maybe<NoumType>;
  taggedPostCommentText?: Maybe<Scalars['String']>;
  type?: Maybe<NotificationType>;
  unread?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['Date']>;
  userId?: Maybe<UserOutput>;
  users?: Maybe<Array<Maybe<UserOutput>>>;
};

export type NotificationAdditionalData = {
  __typename?: 'NotificationAdditionalData';
  adCampaign?: Maybe<NotificationDataAdCampaign>;
  answerId?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  chamber?: Maybe<ChamberByIdRef>;
  chamberId?: Maybe<Scalars['String']>;
  connection?: Maybe<ConnectionByIdRef>;
  connectionId?: Maybe<Scalars['String']>;
  contractId?: Maybe<Contract>;
  count?: Maybe<Scalars['Int']>;
  invoiceId?: Maybe<InvoiceOutput>;
  invoiceStatus?: Maybe<NotificationInvoiceStatusEnum>;
  message?: Maybe<Scalars['String']>;
  noumMember?: Maybe<NoumMember>;
  noumMemberId?: Maybe<Scalars['String']>;
  paymentSub?: Maybe<NotificationPaymentSubData>;
  questionId?: Maybe<Scalars['String']>;
  sowId?: Maybe<Sow>;
  topUpdatedElement?: Maybe<Scalars['String']>;
};

export type NotificationAdditionalDataV2 = {
  __typename?: 'NotificationAdditionalDataV2';
  answerId?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
  chamber?: Maybe<ChamberByIdRef>;
  chamberId?: Maybe<Scalars['String']>;
  connection?: Maybe<ConnectionByIdRef>;
  connectionId?: Maybe<Scalars['String']>;
  contractId?: Maybe<Contract>;
  count?: Maybe<Scalars['Int']>;
  invoiceId?: Maybe<InvoiceOutput>;
  invoiceStatus?: Maybe<NotificationInvoiceStatusEnumV2>;
  message?: Maybe<Scalars['String']>;
  paymentSub?: Maybe<NotificationPaymentSubscriptionDataV2>;
  questionId?: Maybe<Scalars['String']>;
  sowId?: Maybe<Sow>;
  topUpdatedElement?: Maybe<Scalars['String']>;
};

export enum NotificationCategory {
  Community = 'Community',
  Money = 'Money',
  Noums = 'Noums',
  Other = 'Other'
}

export enum NotificationCategoryV2 {
  Community = 'Community',
  Money = 'Money',
  Noums = 'Noums',
  Other = 'Other'
}

export type NotificationDataAdCampaign = {
  __typename?: 'NotificationDataAdCampaign';
  campaignId?: Maybe<Scalars['String']>;
  offerId?: Maybe<Scalars['String']>;
  reportId?: Maybe<Scalars['String']>;
};

export type NotificationFilter = {
  category?: InputMaybe<NotificationCategory>;
  type?: InputMaybe<Array<InputMaybe<NotificationType>>>;
};

export type NotificationFilterV2 = {
  category?: InputMaybe<NotificationCategoryV2>;
  type?: InputMaybe<Array<InputMaybe<NotificationTypeV2>>>;
};

export type NotificationInput = {
  answerId?: InputMaybe<Scalars['ID']>;
  category?: InputMaybe<NotificationCategory>;
  chamberId?: InputMaybe<Scalars['ID']>;
  connectionId?: InputMaybe<Scalars['ID']>;
  message?: InputMaybe<Scalars['String']>;
  noumMemberId?: InputMaybe<Scalars['ID']>;
  paymentSub?: InputMaybe<NotificationPaymentSubInput>;
  questionId?: InputMaybe<Scalars['ID']>;
  sourceUserIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  sourceUserNoum?: InputMaybe<NoumInput>;
  taggedPostCommentText?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<NotificationType>;
  userIds?: InputMaybe<Array<Scalars['ID']>>;
};

export type NotificationInputV2 = {
  answerId?: InputMaybe<Scalars['ID']>;
  category?: InputMaybe<NotificationCategoryV2>;
  chamberId?: InputMaybe<Scalars['ID']>;
  connectionId?: InputMaybe<Scalars['ID']>;
  message?: InputMaybe<Scalars['String']>;
  questionId?: InputMaybe<Scalars['ID']>;
  sourceUserIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<NotificationTypeV2>;
  userIds?: InputMaybe<Array<Scalars['ID']>>;
};

export enum NotificationInviteStatus {
  Connected = 'connected',
  Invited = 'invited',
  None = 'none',
  Rejected = 'rejected',
  Requested = 'requested'
}

export enum NotificationInviteStatusV2 {
  Connected = 'connected',
  Invited = 'invited',
  None = 'none',
  Rejected = 'rejected',
  Requested = 'requested'
}

export enum NotificationInvoiceStatusEnum {
  Cancelled = 'CANCELLED',
  Draft = 'DRAFT',
  Issued = 'ISSUED',
  Overdue = 'OVERDUE',
  Paid = 'PAID',
  PartiallyPaid = 'PARTIALLY_PAID',
  WriteOff = 'WRITE_OFF'
}

export enum NotificationInvoiceStatusEnumV2 {
  Cancelled = 'CANCELLED',
  Draft = 'DRAFT',
  Issued = 'ISSUED',
  Overdue = 'OVERDUE',
  Paid = 'PAID',
  PartiallyPaid = 'PARTIALLY_PAID',
  WriteOff = 'WRITE_OFF'
}

export type NotificationOp = {
  __typename?: 'NotificationOP';
  attachmentLink?: Maybe<Array<Maybe<Scalars['String']>>>;
  message?: Maybe<Scalars['String']>;
  subject?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type NotificationOpInput = {
  attachmentLink?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  message?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type NotificationPaymentSubData = {
  __typename?: 'NotificationPaymentSubData';
  currency?: Maybe<Scalars['String']>;
  currencySymbol?: Maybe<Scalars['String']>;
  external_customer_id?: Maybe<Scalars['String']>;
  external_subscription_id?: Maybe<Scalars['String']>;
  next_billing_at?: Maybe<Scalars['String']>;
  noumExpiryDays?: Maybe<Scalars['Int']>;
  noumName?: Maybe<Scalars['String']>;
  planId?: Maybe<Scalars['String']>;
  planName?: Maybe<Scalars['String']>;
  planPrice?: Maybe<Scalars['Int']>;
  subscription_id?: Maybe<Scalars['Int']>;
};

export type NotificationPaymentSubInput = {
  currency?: InputMaybe<Scalars['String']>;
  currencySymbol?: InputMaybe<Scalars['String']>;
  external_customer_id?: InputMaybe<Scalars['String']>;
  external_subscription_id?: InputMaybe<Scalars['String']>;
  next_billing_at?: InputMaybe<Scalars['String']>;
  planId?: InputMaybe<Scalars['String']>;
  planName?: InputMaybe<Scalars['String']>;
  planPrice?: InputMaybe<Scalars['Int']>;
  subscription_id?: InputMaybe<Scalars['Int']>;
};

export type NotificationPaymentSubscriptionDataV2 = {
  __typename?: 'NotificationPaymentSubscriptionDataV2';
  currency?: Maybe<Scalars['String']>;
  currencySymbol?: Maybe<Scalars['String']>;
  external_customer_id?: Maybe<Scalars['String']>;
  external_subscription_id?: Maybe<Scalars['String']>;
  next_billing_at?: Maybe<Scalars['String']>;
  noumExpiryDays?: Maybe<Scalars['Int']>;
  noumName?: Maybe<Scalars['String']>;
  planId?: Maybe<Scalars['String']>;
  planName?: Maybe<Scalars['String']>;
  planPrice?: Maybe<Scalars['Int']>;
  subscription_id?: Maybe<Scalars['Int']>;
};

export type NotificationSubscriptionData = {
  __typename?: 'NotificationSubscriptionData';
  _id: Scalars['ID'];
  type: NotificationType;
  userId?: Maybe<Scalars['ID']>;
};

export enum NotificationType {
  DwollaDocumentReUploaded = 'DwollaDocumentReUploaded',
  DwollaDocumentRequired = 'DwollaDocumentRequired',
  DwollaDocumentUploadFail = 'DwollaDocumentUploadFail',
  DwollaDocumentUploadSuccess = 'DwollaDocumentUploadSuccess',
  DwollaDocumentUploaded = 'DwollaDocumentUploaded',
  DwollaMicroDepositComplete = 'DwollaMicroDepositComplete',
  DwollaMicroDepositVerified = 'DwollaMicroDepositVerified',
  DwollaWallet = 'DwollaWallet',
  OpsAdminApproval = 'OpsAdminApproval',
  OpsAdminRejection = 'OpsAdminRejection',
  UploadKycDocument = 'UploadKYCDocument',
  AmemdedInvoiceClient = 'amemdedInvoiceClient',
  AmemdedInvoiceFreelancer = 'amemdedInvoiceFreelancer',
  CampaignExpired = 'campaignExpired',
  CampaignRefreshed = 'campaignRefreshed',
  Comment = 'comment',
  CommentMentioned = 'commentMentioned',
  CommentReplied = 'commentReplied',
  CommentRepliedMentioned = 'commentRepliedMentioned',
  CommentReplyThread = 'commentReplyThread',
  Connected = 'connected',
  ConnectionDisconnected = 'connectionDisconnected',
  ConnectionInviteAccepted = 'connectionInviteAccepted',
  ConnectionInviteDeclined = 'connectionInviteDeclined',
  ConnectionInvited = 'connectionInvited',
  ConnectionInvitedReminder = 'connectionInvitedReminder',
  ConnectionRequestAccepted = 'connectionRequestAccepted',
  ConnectionRequestDeclined = 'connectionRequestDeclined',
  ConnectionRequested = 'connectionRequested',
  ConnectionRequestedReminder = 'connectionRequestedReminder',
  ContractIssuedCounterParty = 'contractIssuedCounterParty',
  ContractIssuedOwner = 'contractIssuedOwner',
  ContractRejectedCounterParty = 'contractRejectedCounterParty',
  ContractRejectedOwner = 'contractRejectedOwner',
  ContractSendForSigning = 'contractSendForSigning',
  ContractSignedCounterParty = 'contractSignedCounterParty',
  ContractSignedOwner = 'contractSignedOwner',
  CqScoreUpdate = 'cqScoreUpdate',
  EventCohostInvitee = 'eventCohostInvitee',
  EventDateModified = 'eventDateModified',
  EventDeleted = 'eventDeleted',
  EventInvitee = 'eventInvitee',
  EventLive = 'eventLive',
  EventReminder = 'eventReminder',
  EventStarting = 'eventStarting',
  FavoriteConnection = 'favoriteConnection',
  GroupInvite = 'groupInvite',
  GuestConnection = 'guestConnection',
  InstantEventInvitee = 'instantEventInvitee',
  Invite = 'invite',
  InviteAccepted = 'inviteAccepted',
  InviteReminder = 'inviteReminder',
  InvoiceOnDraftState = 'invoiceOnDraftState',
  InvoicePaymentFailedClient = 'invoicePaymentFailedClient',
  InvoicePaymentFailedFreelancer = 'invoicePaymentFailedFreelancer',
  InvoiceStatusChangedClient = 'invoiceStatusChangedClient',
  InvoiceStatusChangedFreelancer = 'invoiceStatusChangedFreelancer',
  JoinRequest = 'joinRequest',
  Like = 'like',
  ManagerInviteAcceptedOwner = 'managerInviteAcceptedOwner',
  ManagerInviteDeclinedOwner = 'managerInviteDeclinedOwner',
  ManagerInviteExpired = 'managerInviteExpired',
  ManagerInviteExpiredOwner = 'managerInviteExpiredOwner',
  ManagerInvited = 'managerInvited',
  ManagerResignedAndDisconnectedOwner = 'managerResignedAndDisconnectedOwner',
  ManagerResignedOwner = 'managerResignedOwner',
  ManagerTerminated = 'managerTerminated',
  ManagerTerminatedAndDisconnected = 'managerTerminatedAndDisconnected',
  ManagerTerminatedAndDisconnectedOwner = 'managerTerminatedAndDisconnectedOwner',
  ManagerTerminatedOwner = 'managerTerminatedOwner',
  MemberInvitedToNoum = 'memberInvitedToNoum',
  MemberRoleUpdated = 'memberRoleUpdated',
  NewAdminConnection = 'newAdminConnection',
  NewGroupPost = 'newGroupPost',
  NewIndividualPost = 'newIndividualPost',
  NewReferralConnection = 'newReferralConnection',
  NoumArchived = 'noumArchived',
  NoumArchivedManager = 'noumArchivedManager',
  NoumConnection = 'noumConnection',
  NoumFollowed = 'noumFollowed',
  NoumPublished = 'noumPublished',
  NoumUnarchived = 'noumUnarchived',
  NoumUnfollowed = 'noumUnfollowed',
  PaymentSubscriptionNoumExpired = 'paymentSubscriptionNoumExpired',
  PaymentSubscriptionNoumToBeExpired = 'paymentSubscriptionNoumToBeExpired',
  PaymentSubscriptionNoumUnusedRenewSlots = 'paymentSubscriptionNoumUnusedRenewSlots',
  PaymentSubscriptionNoumUnusedSetupSlots = 'paymentSubscriptionNoumUnusedSetupSlots',
  PaymentSubscriptionUpcomingPayment = 'paymentSubscriptionUpcomingPayment',
  PostEvent = 'postEvent',
  PostMentioned = 'postMentioned',
  PostRejected = 'postRejected',
  PreEvent = 'preEvent',
  QuestionAnswered = 'questionAnswered',
  QuestionCreated = 'questionCreated',
  ReminderInvoiceClient = 'reminderInvoiceClient',
  ReminderInvoiceFreelancer = 'reminderInvoiceFreelancer',
  RiseApplicationFormSubmissionReview = 'riseApplicationFormSubmissionReview',
  RiseApplicationStatusChanged = 'riseApplicationStatusChanged',
  RiseApplicationSubmitted = 'riseApplicationSubmitted',
  RiseApplicationSubmittedToConnectedUser = 'riseApplicationSubmittedToConnectedUser',
  SendAdCampaignOffer = 'sendAdCampaignOffer',
  SendAdCampaignReport = 'sendAdCampaignReport',
  SowIssuedCounterParty = 'sowIssuedCounterParty',
  SowIssuedOwner = 'sowIssuedOwner',
  SowRejectedCounterParty = 'sowRejectedCounterParty',
  SowRejectedOwner = 'sowRejectedOwner',
  SowSendForSigning = 'sowSendForSigning',
  SowSignedCounterParty = 'sowSignedCounterParty',
  SowSignedOwner = 'sowSignedOwner',
  SpaceConversation = 'spaceConversation',
  TokenRewarded = 'tokenRewarded',
  UserActive = 'userActive',
  UserDeactivated = 'userDeactivated',
  UserDisconnectFromProjectNoum = 'userDisconnectFromProjectNoum',
  UserInactive = 'userInactive',
  UserPending = 'userPending',
  UserRejected = 'userRejected',
  UserUnregisgtered = 'userUnregisgtered',
  WalletSetupRequest = 'walletSetupRequest'
}

export enum NotificationTypeV2 {
  DwollaDocumentReUploaded = 'DwollaDocumentReUploaded',
  DwollaDocumentRequired = 'DwollaDocumentRequired',
  DwollaDocumentUploadFail = 'DwollaDocumentUploadFail',
  DwollaDocumentUploadSuccess = 'DwollaDocumentUploadSuccess',
  DwollaDocumentUploaded = 'DwollaDocumentUploaded',
  DwollaWallet = 'DwollaWallet',
  AmemdedInvoiceClient = 'amemdedInvoiceClient',
  AmemdedInvoiceFreelancer = 'amemdedInvoiceFreelancer',
  CampaignExpired = 'campaignExpired',
  CampaignRefreshed = 'campaignRefreshed',
  Comment = 'comment',
  CommentMentioned = 'commentMentioned',
  CommentReplied = 'commentReplied',
  CommentRepliedMentioned = 'commentRepliedMentioned',
  CommentReplyThread = 'commentReplyThread',
  Connected = 'connected',
  ConnectionDisconnected = 'connectionDisconnected',
  ConnectionInviteAccepted = 'connectionInviteAccepted',
  ConnectionInviteDeclined = 'connectionInviteDeclined',
  ConnectionInvited = 'connectionInvited',
  ConnectionInvitedReminder = 'connectionInvitedReminder',
  ConnectionRequestAccepted = 'connectionRequestAccepted',
  ConnectionRequestDeclined = 'connectionRequestDeclined',
  ConnectionRequested = 'connectionRequested',
  ConnectionRequestedReminder = 'connectionRequestedReminder',
  ContractIssuedCounterParty = 'contractIssuedCounterParty',
  ContractIssuedOwner = 'contractIssuedOwner',
  ContractRejectedCounterParty = 'contractRejectedCounterParty',
  ContractRejectedOwner = 'contractRejectedOwner',
  ContractSendForSigning = 'contractSendForSigning',
  ContractSignedCounterParty = 'contractSignedCounterParty',
  ContractSignedOwner = 'contractSignedOwner',
  CqScoreUpdate = 'cqScoreUpdate',
  EventCohostInvitee = 'eventCohostInvitee',
  EventDateModified = 'eventDateModified',
  EventDeleted = 'eventDeleted',
  EventInvitee = 'eventInvitee',
  EventLive = 'eventLive',
  EventReminder = 'eventReminder',
  EventStarting = 'eventStarting',
  FavoriteConnection = 'favoriteConnection',
  GroupInvite = 'groupInvite',
  GuestConnection = 'guestConnection',
  InstantEventInvitee = 'instantEventInvitee',
  Invite = 'invite',
  InviteAccepted = 'inviteAccepted',
  InviteReminder = 'inviteReminder',
  InvoiceOnDraftState = 'invoiceOnDraftState',
  InvoiceOnDraftStateFreelancer = 'invoiceOnDraftStateFreelancer',
  InvoicePaymentFailedClient = 'invoicePaymentFailedClient',
  InvoicePaymentFailedFreelancer = 'invoicePaymentFailedFreelancer',
  InvoiceStatusChangedClient = 'invoiceStatusChangedClient',
  InvoiceStatusChangedFreelancer = 'invoiceStatusChangedFreelancer',
  JoinRequest = 'joinRequest',
  Like = 'like',
  NewAdminConnection = 'newAdminConnection',
  NewGroupPost = 'newGroupPost',
  NewIndividualPost = 'newIndividualPost',
  NewReferralConnection = 'newReferralConnection',
  NoumArchived = 'noumArchived',
  NoumConnection = 'noumConnection',
  NoumFollowed = 'noumFollowed',
  NoumPublished = 'noumPublished',
  NoumUnarchived = 'noumUnarchived',
  NoumUnfollowed = 'noumUnfollowed',
  PaymentSubscriptionNoumExpired = 'paymentSubscriptionNoumExpired',
  PaymentSubscriptionNoumToBeExpired = 'paymentSubscriptionNoumToBeExpired',
  PaymentSubscriptionNoumUnusedRenewSlots = 'paymentSubscriptionNoumUnusedRenewSlots',
  PaymentSubscriptionNoumUnusedSetupSlots = 'paymentSubscriptionNoumUnusedSetupSlots',
  PaymentSubscriptionUpcomingPayment = 'paymentSubscriptionUpcomingPayment',
  PostEvent = 'postEvent',
  PostMentioned = 'postMentioned',
  PostRejected = 'postRejected',
  PreEvent = 'preEvent',
  QuestionAnswered = 'questionAnswered',
  QuestionCreated = 'questionCreated',
  ReminderInvoiceClient = 'reminderInvoiceClient',
  ReminderInvoiceFreelancer = 'reminderInvoiceFreelancer',
  RiseApplicationFormSubmissionReview = 'riseApplicationFormSubmissionReview',
  RiseApplicationStatusChanged = 'riseApplicationStatusChanged',
  RiseApplicationSubmitted = 'riseApplicationSubmitted',
  RiseApplicationSubmittedToConnectedUser = 'riseApplicationSubmittedToConnectedUser',
  SowIssuedCounterParty = 'sowIssuedCounterParty',
  SowIssuedOwner = 'sowIssuedOwner',
  SowRejectedCounterParty = 'sowRejectedCounterParty',
  SowRejectedOwner = 'sowRejectedOwner',
  SowSendForSigning = 'sowSendForSigning',
  SowSignedCounterParty = 'sowSignedCounterParty',
  SowSignedOwner = 'sowSignedOwner',
  SpaceConversation = 'spaceConversation',
  TokenRewarded = 'tokenRewarded',
  UserActive = 'userActive',
  UserDeactivated = 'userDeactivated',
  UserDisconnectFromProjectNoum = 'userDisconnectFromProjectNoum',
  UserInactive = 'userInactive',
  UserPending = 'userPending',
  UserRejected = 'userRejected',
  UserUnregisgtered = 'userUnregisgtered'
}

export type NotificationV2 = {
  __typename?: 'NotificationV2';
  _id: Scalars['ID'];
  adminUserId?: Maybe<UserOutput>;
  authorName?: Maybe<Scalars['String']>;
  commentId?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  data?: Maybe<NotificationAdditionalDataV2>;
  event?: Maybe<EventNotificationDetailsV2>;
  group?: Maybe<GroupRef>;
  inviteId?: Maybe<Scalars['ID']>;
  inviteStatus?: Maybe<NotificationInviteStatusV2>;
  postId?: Maybe<Scalars['ID']>;
  type?: Maybe<NotificationTypeV2>;
  unread?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['Date']>;
  userId?: Maybe<UserOutput>;
  users?: Maybe<Array<Maybe<UserOutput>>>;
};

export type Notifications = {
  __typename?: 'Notifications';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<Notification>>>;
  unreadCount?: Maybe<Scalars['Int']>;
  unviewedCount?: Maybe<Scalars['Int']>;
};

export type NotificationsV2 = {
  __typename?: 'NotificationsV2';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<NotificationV2>>>;
  unreadCount?: Maybe<Scalars['Int']>;
  unviewedCount?: Maybe<Scalars['Int']>;
};

export type NotifyOutput = {
  __typename?: 'NotifyOutput';
  success?: Maybe<Scalars['Boolean']>;
};

export type NotifyReviewerInput = {
  formType?: InputMaybe<Scalars['String']>;
};

export type NoumActivityLogFilter = {
  type?: InputMaybe<AppActivityTypes>;
  types?: InputMaybe<Array<InputMaybe<AppActivityTypes>>>;
  userId?: InputMaybe<Scalars['ID']>;
};

export type NoumActivityStats = {
  __typename?: 'NoumActivityStats';
  eventsHosted: Scalars['Int'];
  membersInvited: Scalars['Int'];
  messagesSent: Scalars['Int'];
  others: Scalars['Int'];
  postsPosted: Scalars['Int'];
  transactions: Scalars['Int'];
};

export type NoumActivityStatsFilter = {
  endDate?: InputMaybe<Scalars['Date']>;
  startDate?: InputMaybe<Scalars['Date']>;
};

export type NoumClass = {
  __typename?: 'NoumClass';
  _id: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  noumId?: Maybe<SpaceOutput>;
  programId?: Maybe<NoumProgram>;
  questions?: Maybe<Array<Maybe<Scalars['JSONObject']>>>;
  reviewers?: Maybe<Array<Maybe<SpaceOutput>>>;
  type?: Maybe<Scalars['String']>;
};

export type NoumClassList = {
  __typename?: 'NoumClassList';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<NoumClass>>>;
};

export type NoumClassQuery = {
  description?: InputMaybe<Scalars['String']>;
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  noumId?: InputMaybe<Scalars['ID']>;
  programId?: InputMaybe<Scalars['ID']>;
  reviewers?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<Scalars['String']>;
};

export type NoumColors = {
  __typename?: 'NoumColors';
  investment?: Maybe<Scalars['JSONObject']>;
  member?: Maybe<Scalars['JSONObject']>;
  project?: Maybe<Scalars['JSONObject']>;
  social?: Maybe<Scalars['JSONObject']>;
  special?: Maybe<Scalars['JSONObject']>;
  story?: Maybe<Scalars['JSONObject']>;
};

export type NoumColorsInput = {
  investment?: InputMaybe<Scalars['JSONObject']>;
  member?: InputMaybe<Scalars['JSONObject']>;
  project?: InputMaybe<Scalars['JSONObject']>;
  social?: InputMaybe<Scalars['JSONObject']>;
  special?: InputMaybe<Scalars['JSONObject']>;
  story?: InputMaybe<Scalars['JSONObject']>;
};

export type NoumConnectionKpiDatePoint = {
  __typename?: 'NoumConnectionKPIDatePoint';
  date?: Maybe<Scalars['ISODate']>;
  values?: Maybe<NoumSingleConnectionKpi>;
};

export type NoumConnectionRequest = {
  __typename?: 'NoumConnectionRequest';
  _id: Scalars['ID'];
  requestedAt: Scalars['ISODate'];
  role: NoumMemberRole;
  user?: Maybe<UserOutput>;
};

export type NoumConnectionsKpi = {
  __typename?: 'NoumConnectionsKPI';
  kpi?: Maybe<NoumSingleConnectionKpi>;
  series?: Maybe<Array<Maybe<NoumConnectionKpiDatePoint>>>;
};

export enum NoumConnectionsWithinTimeframeType {
  Connected = 'Connected',
  Disconnected = 'Disconnected'
}

export type NoumContactAdminResult = {
  __typename?: 'NoumContactAdminResult';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<NoumContactOutput>>>;
};

export type NoumContactOutput = {
  __typename?: 'NoumContactOutput';
  _id: Scalars['ID'];
  apartmentNo?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  connectionWithNoum?: Maybe<SpaceConnection>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISODate'];
  displayName: Scalars['String'];
  fullName?: Maybe<Scalars['String']>;
  /** @deprecated Please use connectionWithNoum instead. */
  isConnectedWithNoum: Scalars['Boolean'];
  ownerId: UserOutput;
  state?: Maybe<Scalars['String']>;
  status: NoumContactStatus;
  street?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type: NoumContactType;
  userId: UserOutput;
  zipCode?: Maybe<Scalars['String']>;
};


export type NoumContactOutputConnectionWithNoumArgs = {
  noumId: Scalars['ID'];
};

export type NoumContactPaginated = {
  __typename?: 'NoumContactPaginated';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<NoumContactOutput>>>;
};

export enum NoumContactStatus {
  Active = 'Active',
  Archived = 'Archived'
}

export enum NoumContactType {
  External = 'External',
  Internal = 'Internal'
}

export type NoumContractOutput = {
  __typename?: 'NoumContractOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Contract>>;
};

export type NoumContractOutputAdmin = {
  __typename?: 'NoumContractOutputAdmin';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Contract>>;
  sowCount?: Maybe<Scalars['Int']>;
};

export type NoumCustomPreviewElementInput = {
  _id: Scalars['ID'];
  customPosition?: InputMaybe<Scalars['Int']>;
  isCustomPreviewVisible?: InputMaybe<Scalars['Boolean']>;
};

export type NoumDetalisInput = {
  owner: Scalars['String'];
  profileUrl: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
};

export enum NoumEditorVersion {
  V1 = 'V1',
  V2 = 'V2'
}

export enum NoumElementProfanityStatus {
  Accepted = 'ACCEPTED',
  Error = 'ERROR',
  NotVerified = 'NOT_VERIFIED',
  Rejected = 'REJECTED',
  Verifying = 'VERIFYING'
}

export type NoumFile = {
  __typename?: 'NoumFile';
  _id: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  downloadsCount: Scalars['Int'];
  extension?: Maybe<Scalars['String']>;
  fileSize: Scalars['Int'];
  fileUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  owner?: Maybe<UserOutput>;
  status: NoumFileStatus;
  updatedAt?: Maybe<Scalars['ISODate']>;
  uploadedAt: Scalars['ISODate'];
  viewsCount: Scalars['Int'];
  visibilityRoles: Array<Scalars['ID']>;
};

export enum NoumFileRole {
  Favorite = 'Favorite',
  Guest = 'Guest'
}

export enum NoumFileStatus {
  Active = 'Active',
  Deleted = 'Deleted'
}

export enum NoumFilesFilterType {
  All = 'All',
  UploadedByMe = 'UploadedByMe'
}

export type NoumFollowKpiDatePoint = {
  __typename?: 'NoumFollowKPIDatePoint';
  date?: Maybe<Scalars['ISODate']>;
  values?: Maybe<NoumSingleFollowKpi>;
};

export enum NoumFollowWithinTimeframeType {
  Following = 'Following',
  Unfollowed = 'Unfollowed'
}

export type NoumFollowersKpi = {
  __typename?: 'NoumFollowersKPI';
  kpi?: Maybe<NoumSingleFollowKpi>;
  series?: Maybe<Array<Maybe<NoumFollowKpiDatePoint>>>;
};

export type NoumGetAllFilters = {
  date_from?: InputMaybe<Scalars['String']>;
  date_to?: InputMaybe<Scalars['String']>;
  is_publishable?: InputMaybe<Scalars['Boolean']>;
  plans?: InputMaybe<Array<Scalars['String']>>;
  status?: InputMaybe<Array<Status_Noum>>;
  uid?: InputMaybe<Scalars['String']>;
};

export type NoumGroupConversationItem = ConversationItem & {
  __typename?: 'NoumGroupConversationItem';
  cids?: Maybe<Array<Maybe<Scalars['String']>>>;
  conversations?: Maybe<Array<Maybe<BasicConversationItem>>>;
  conversationsCount?: Maybe<Scalars['Int']>;
  last_updatedAt?: Maybe<Scalars['Date']>;
  noum?: Maybe<ChamberByIdRef>;
  unread?: Maybe<Scalars['Int']>;
  unreadConversation?: Maybe<Scalars['Int']>;
};

export type NoumInput = {
  name?: InputMaybe<Scalars['String']>;
  profileImage?: InputMaybe<Scalars['String']>;
};

export enum NoumKpiGranularity {
  Daily = 'Daily',
  Monthly = 'Monthly',
  Yearly = 'Yearly'
}

export type NoumLayout = {
  __typename?: 'NoumLayout';
  _id: Scalars['ID'];
  hasRedoAction: Scalars['Boolean'];
  hasUndoAction: Scalars['Boolean'];
  sections: Array<NoumLayoutSection>;
  status: NoumLayoutStatus;
  uniqueToolStatuses: Array<UniqueToolStatus>;
};

export type NoumLayoutColumn = {
  __typename?: 'NoumLayoutColumn';
  _id: Scalars['ID'];
  background: Scalars['Boolean'];
  position: Scalars['Int'];
  tools: Array<ElementOutput>;
};

export type NoumLayoutSection = {
  __typename?: 'NoumLayoutSection';
  _id: Scalars['ID'];
  background: Scalars['Boolean'];
  columns: Array<NoumLayoutColumn>;
  columnsVerticalAlignType: NoumLayoutSectionVerticalAlignType;
  position: Scalars['Int'];
  type: NoumLayoutSectionType;
  visible: Scalars['Boolean'];
};

export enum NoumLayoutSectionType {
  SingleColumn = 'SINGLE_COLUMN',
  SingleColumn_700Px = 'SINGLE_COLUMN_700PX',
  ThreeEqualColumns = 'THREE_EQUAL_COLUMNS',
  TwoColumnsLeftWider = 'TWO_COLUMNS_LEFT_WIDER',
  TwoColumnsRightWider = 'TWO_COLUMNS_RIGHT_WIDER',
  TwoEqualColumns = 'TWO_EQUAL_COLUMNS'
}

export enum NoumLayoutSectionVerticalAlignType {
  Bottom = 'BOTTOM',
  Center = 'CENTER',
  Top = 'TOP'
}

export enum NoumLayoutStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
  Unsaved = 'UNSAVED'
}

export enum NoumLayoutStatusFilter {
  Published = 'PUBLISHED',
  Unpublished = 'UNPUBLISHED'
}

export type NoumLink = {
  __typename?: 'NoumLink';
  _id: Scalars['ID'];
  connectionsCount: Scalars['Int'];
  followersCount: Scalars['Int'];
  linkedAt: Scalars['ISODate'];
  linkedNoums: Array<Maybe<SpaceOutput>>;
  linkedNoumsCount: Scalars['Int'];
  projectType: ProjectChamberType;
  status: NoumLinkStatus;
  updatedAt?: Maybe<Scalars['ISODate']>;
};

export type NoumLinkResponse = {
  __typename?: 'NoumLinkResponse';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<NoumLink>>>;
};

export enum NoumLinkSorting {
  Newest = 'Newest',
  Oldest = 'Oldest'
}

export enum NoumLinkStatus {
  Archived = 'Archived',
  Linked = 'Linked',
  Unlinked = 'Unlinked'
}

export type NoumMember = {
  __typename?: 'NoumMember';
  _id: Scalars['ID'];
  activeInvitation?: Maybe<ActiveNoumInvitation>;
  activeRequest?: Maybe<NoumConnectionRequest>;
  approvedAt?: Maybe<Scalars['ISODate']>;
  coManagerStatistics?: Maybe<CoManagerStatistics>;
  connectedAt?: Maybe<Scalars['ISODate']>;
  connectedNoums: ConnectedNoumsWithMember;
  noum?: Maybe<SpaceOutput>;
  noumId: Scalars['ID'];
  previousRole?: Maybe<NoumMemberRole>;
  requestedAt?: Maybe<Scalars['ISODate']>;
  role: NoumMemberRole;
  rolePromotionToApprove?: Maybe<NoumMemberRole>;
  status: NoumMemberStatus;
  updatedAt?: Maybe<Scalars['ISODate']>;
  user?: Maybe<UserOutput>;
};


export type NoumMemberActiveInvitationArgs = {
  noumId: Scalars['ID'];
};


export type NoumMemberActiveRequestArgs = {
  noumId: Scalars['ID'];
};


export type NoumMemberCoManagerStatisticsArgs = {
  input?: InputMaybe<CoManagerStatisticsInput>;
};


export type NoumMemberConnectedNoumsArgs = {
  input?: InputMaybe<ConnectedNoumsWithMemberInput>;
};

export type NoumMemberByIdRef = {
  __typename?: 'NoumMemberByIdRef';
  _id: Scalars['ID'];
  approvedAt?: Maybe<Scalars['ISODate']>;
  archivedAt?: Maybe<Scalars['ISODate']>;
  connectedAt?: Maybe<Scalars['ISODate']>;
  hasAccessToNoumWallet?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  noumId: Scalars['ID'];
  permission?: Maybe<ConnectionPermissionTypeEnum>;
  requestedAt?: Maybe<Scalars['ISODate']>;
  roleId: Scalars['ID'];
  status?: Maybe<NoumMemberStatus>;
  type?: Maybe<ConnectionTypeEnum>;
  userId: Scalars['ID'];
  walletLimitAmount?: Maybe<Scalars['Int']>;
  walletLimitType?: Maybe<Scalars['String']>;
  welcomeMessage?: Maybe<Scalars['String']>;
};

export type NoumMemberRole = {
  __typename?: 'NoumMemberRole';
  _id: Scalars['ID'];
  isManager: Scalars['Boolean'];
  name: Scalars['String'];
  permission: Scalars['String'];
  rolePromotedBy?: Maybe<UserOutput>;
};

export enum NoumMemberStatus {
  Cancelled = 'CANCELLED',
  Connected = 'CONNECTED',
  Expired = 'EXPIRED',
  Invited = 'INVITED',
  Kicked = 'KICKED',
  Left = 'LEFT',
  Rejected = 'REJECTED',
  Requested = 'REQUESTED'
}

export type NoumMembersInput = {
  limit?: InputMaybe<Scalars['Int']>;
  noumId: Scalars['ID'];
  offset?: InputMaybe<Scalars['Int']>;
  roleId?: InputMaybe<Scalars['ID']>;
  searchTerm?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<NoumMemberStatus>;
};

export type NoumMembershipStatus = {
  __typename?: 'NoumMembershipStatus';
  _id: Scalars['ID'];
  connectedAt?: Maybe<Scalars['ISODate']>;
  invitationSentFrom?: Maybe<UserOutput>;
  role: NoumMemberRole;
  rolePromotionToApprove?: Maybe<NoumMemberRole>;
  status: NoumMemberStatus;
};

export type NoumPendingConnection = {
  __typename?: 'NoumPendingConnection';
  _id: Scalars['ID'];
  noum: SpaceOutput;
  requestedAt: Scalars['ISODate'];
  type: NoumPendingConnectionType;
  user: UserOutput;
};

export enum NoumPendingConnectionType {
  ConnectionRequest = 'CONNECTION_REQUEST',
  InvitationRequest = 'INVITATION_REQUEST'
}

export type NoumProgram = {
  __typename?: 'NoumProgram';
  _id: Scalars['ID'];
  createdBy?: Maybe<UserOutput>;
  description?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
};

export type NoumProgramList = {
  __typename?: 'NoumProgramList';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<NoumProgram>>>;
};

export type NoumProgramQuery = {
  description?: InputMaybe<Scalars['String']>;
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
};

export type NoumQuestionOutput = {
  __typename?: 'NoumQuestionOutput';
  _id?: Maybe<Scalars['ID']>;
  answers?: Maybe<Array<Maybe<AnswerOutput>>>;
  body?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['ISODate']>;
  expiryDate?: Maybe<Scalars['ISODate']>;
  questionImage?: Maybe<Scalars['String']>;
  spaceId?: Maybe<SpaceOutput>;
  updatedAt?: Maybe<Scalars['ISODate']>;
  user?: Maybe<UserOutput>;
};

export type NoumReference = {
  __typename?: 'NoumReference';
  _id: Scalars['ID'];
  capacity: NoumReferenceCapacity;
  experienceId: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  providerName: Scalars['String'];
  referenceText?: Maybe<Scalars['String']>;
  status: NoumReferenceStatus;
};

export enum NoumReferenceCapacity {
  Client = 'CLIENT',
  Colleague = 'COLLEAGUE',
  CoWorker = 'CO_WORKER',
  Employer = 'EMPLOYER',
  Guide = 'GUIDE',
  Manager = 'MANAGER',
  Supervisor = 'SUPERVISOR'
}

export type NoumReferenceMetadata = {
  __typename?: 'NoumReferenceMetadata';
  _id: Scalars['ID'];
  capacity: NoumReferenceCapacity;
  experience?: Maybe<Scalars['JSONObject']>;
  experienceId: Scalars['ID'];
  providerName: Scalars['String'];
};

export type NoumReferenceResponse = {
  __typename?: 'NoumReferenceResponse';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<NoumReference>>>;
};

export enum NoumReferenceStatus {
  Accepted = 'Accepted',
  Discarded = 'Discarded',
  Draft = 'Draft',
  Pending = 'Pending',
  Rejected = 'Rejected'
}

export type NoumRole = {
  __typename?: 'NoumRole';
  _id: Scalars['ID'];
  archivedAt?: Maybe<Scalars['ISODate']>;
  createdAt: Scalars['ISODate'];
  description: Scalars['String'];
  groupedPermissions: Array<NoumRolePermissionGroup>;
  hierarchyOrder: Scalars['Int'];
  isDefault: Scalars['Boolean'];
  name: Scalars['String'];
  permissionIDs: Array<Scalars['ID']>;
  status: NoumRoleStatus;
  updatedAt?: Maybe<Scalars['ISODate']>;
  usageCount: Scalars['Int'];
};

export type NoumRoleElementHistoryLog = {
  __typename?: 'NoumRoleElementHistoryLog';
  from: Scalars['Boolean'];
  id: Scalars['ID'];
  to: Scalars['Boolean'];
};

export enum NoumRoleHistoryActionType {
  Archived = 'Archived',
  Created = 'Created',
  Updated = 'Updated'
}

export type NoumRoleHistoryLog = {
  __typename?: 'NoumRoleHistoryLog';
  field: Scalars['String'];
  from: Scalars['StringOrInteger'];
  to: Scalars['StringOrInteger'];
};

export type NoumRoleHistoryLogInput = {
  limit?: InputMaybe<Scalars['Int']>;
  noumRoleId: Scalars['ID'];
  offset?: InputMaybe<Scalars['Int']>;
};

export type NoumRoleHistoryLogOutput = {
  __typename?: 'NoumRoleHistoryLogOutput';
  count: Scalars['Int'];
  data: Array<NoumRoleHistoryLogs>;
};

export type NoumRoleHistoryLogs = {
  __typename?: 'NoumRoleHistoryLogs';
  _id: Scalars['ID'];
  action: NoumRoleHistoryActionType;
  changes: Array<NoumRoleHistoryLog>;
  createdAt: Scalars['ISODate'];
  permissionChanges: Array<GroupedNoumRolePermissionChange>;
};

export type NoumRoleOrderInput = {
  order: SortOperator;
  sortBy: NoumRoleSortBy;
};

export type NoumRolePermission = {
  __typename?: 'NoumRolePermission';
  elementType?: Maybe<PermissibleElementType>;
  id: Scalars['ID'];
  level: NoumRolePermissionLevel;
};

export type NoumRolePermissionGroup = {
  __typename?: 'NoumRolePermissionGroup';
  elementType?: Maybe<PermissibleElementType>;
  level: NoumRolePermissionLevel;
  permissionIDs: Array<Scalars['ID']>;
  permissions: Array<NoumRolePermissionItem>;
};

export type NoumRolePermissionItem = {
  __typename?: 'NoumRolePermissionItem';
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  requirePermissions: Array<Scalars['ID']>;
};

export enum NoumRolePermissionLevel {
  Element = 'Element',
  Noum = 'Noum'
}

export enum NoumRoleSortBy {
  HierarchyOrder = 'HIERARCHY_ORDER',
  RecentlyUpdated = 'RECENTLY_UPDATED'
}

export enum NoumRoleStatus {
  Active = 'Active',
  Archived = 'Archived'
}

export type NoumSingleConnectionKpi = {
  __typename?: 'NoumSingleConnectionKPI';
  connected: Scalars['Int'];
  currentConnections: Scalars['Int'];
  disconnected: Scalars['Int'];
};

export type NoumSingleFollowKpi = {
  __typename?: 'NoumSingleFollowKPI';
  currentFollowers: Scalars['Int'];
  followed: Scalars['Int'];
  unfollowed: Scalars['Int'];
};

export enum NoumStatus {
  OwnedByYou = 'OwnedByYou',
  You = 'You'
}

export type NoumTransactionDetailInputType = {
  /** Noum ID */
  chamber_id?: InputMaybe<Scalars['String']>;
  /** Selected Noum Transaction Fee ID */
  noum_transaction_fee_id?: InputMaybe<Scalars['Float']>;
  plan_category?: InputMaybe<Plan_Category_Enum>;
  plan_type?: InputMaybe<Subscription_Plan_Type>;
  status?: InputMaybe<Status_Noum>;
  /** Selected Subscription ID */
  subscription_id?: InputMaybe<Scalars['Float']>;
  /** User ID */
  uid?: InputMaybe<Scalars['String']>;
};

export type NoumTransactionFee = {
  __typename?: 'NoumTransactionFee';
  chamber_id?: Maybe<ChamberByIdRef>;
  created_at?: Maybe<Scalars['String']>;
  history_details?: Maybe<Array<NoumTransactionFeeHistoryOutput>>;
  is_publishable?: Maybe<Scalars['Boolean']>;
  noum_transaction_fee_id?: Maybe<Scalars['Float']>;
  operation_type?: Maybe<Scalars['String']>;
  status?: Maybe<Status_Noum>;
  subscription_id?: Maybe<SubscriptionOutput>;
  uid?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
  valid_till?: Maybe<Scalars['String']>;
};

export type NoumTransactionFeeByChamberIdRef = {
  __typename?: 'NoumTransactionFeeByChamberIdRef';
  chamberId?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  is_publishable?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Status_Noum>;
  subscription_id?: Maybe<SubscriptionOutput>;
  updated_at?: Maybe<Scalars['String']>;
  valid_till?: Maybe<Scalars['String']>;
};

export type NoumTransactionFeeHistoryOutput = {
  __typename?: 'NoumTransactionFeeHistoryOutput';
  chamber_id: Scalars['String'];
  created_at: Scalars['String'];
  message?: Maybe<Scalars['String']>;
  noum_transaction_fee_history_id: Scalars['Float'];
  operation_type: Scalars['String'];
  status: Scalars['String'];
  subscription_id: Scalars['Float'];
  uid: Scalars['String'];
  updated_at: Scalars['String'];
};

export type NoumTransactionInputType = {
  chamber_id: Scalars['String'];
  operation_type: Noum_Fee_Operation_Type;
  subscription_id?: InputMaybe<Scalars['Float']>;
};

export type NoumTransactionPaginationInput = {
  filters?: InputMaybe<NoumGetAllFilters>;
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  sort_key?: InputMaybe<Scalars['String']>;
  sort_value?: InputMaybe<Sort>;
};

export type NoumTransactionStatusInputType = {
  /** Noum ID */
  chamber_id?: InputMaybe<Scalars['String']>;
  /** Selected Noum Transaction Fee ID */
  noum_transaction_fee_id?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<Status_Noum>;
  /** Selected Subscription ID */
  subscription_id?: InputMaybe<Scalars['Float']>;
};

export type NoumTransactionUpdateStatusInput = {
  chamber_id?: InputMaybe<Scalars['String']>;
  is_publishable?: InputMaybe<Scalars['Boolean']>;
  noum_transaction_fee_id?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<Status_Noum>;
};

export type NoumTransactionUpdateValidInput = {
  days: Scalars['Float'];
  noum_transaction_fee_id: Scalars['Float'];
};

export type NoumType = {
  __typename?: 'NoumType';
  name?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['String']>;
};

export type NoumenaScoreInput = {
  blessing?: InputMaybe<Scalars['String']>;
  capitalQuotient?: InputMaybe<Scalars['String']>;
  noumId: Scalars['ID'];
  status?: InputMaybe<Scalars['String']>;
  uid: Scalars['ID'];
  visibility?: InputMaybe<Scalars['String']>;
};

export type NoumenaScoreOutput = {
  __typename?: 'NoumenaScoreOutput';
  blessing?: Maybe<Scalars['String']>;
  capitalQuotient?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  noumId?: Maybe<Scalars['ID']>;
  reviewDate?: Maybe<Scalars['String']>;
  scoreId?: Maybe<Scalars['ID']>;
  status?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['String']>;
  visibility?: Maybe<Scalars['String']>;
};

export type NoumenaScoreOutputByNoumId = {
  __typename?: 'NoumenaScoreOutputByNoumId';
  capitalQuotient?: Maybe<Scalars['String']>;
  noumId?: Maybe<Scalars['ID']>;
};

export type NoumenaScoreVisibilityInput = {
  noumId: Scalars['ID'];
  visibility?: InputMaybe<Scalars['String']>;
};

export enum NoumenaUserType {
  Noumena = 'NOUMENA',
  User = 'USER'
}

export type OtpForPasswordOutput = {
  __typename?: 'OTPForPasswordOutput';
  message?: Maybe<Scalars['String']>;
  nextRequestAfter?: Maybe<Scalars['String']>;
  nextRequestAfterInSecond?: Maybe<Scalars['Int']>;
  remainingRequest?: Maybe<Scalars['Int']>;
  success: Scalars['Boolean'];
};

export type OtpOutput = {
  __typename?: 'OTPOutput';
  error?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type OtpResponseOutput = {
  __typename?: 'OTPResponseOutput';
  Status?: Maybe<Scalars['Int']>;
  error?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type OffsetLimit = {
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};

export type OneTimeTokenOutput = {
  __typename?: 'OneTimeTokenOutput';
  accessToken?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};

export type OpsPermissionInputCreate = {
  permissions: Array<InputMaybe<Scalars['String']>>;
  roles: Array<InputMaybe<Scalars['String']>>;
  uid: Scalars['String'];
};

export type OpsPermissionInputUpdate = {
  permissionId: Scalars['ID'];
  permissions?: InputMaybe<Array<Scalars['String']>>;
  roles?: InputMaybe<Array<Scalars['String']>>;
  uid?: InputMaybe<Scalars['ID']>;
};

/** Type type starts here */
export type OpsPermissionOutput = {
  __typename?: 'OpsPermissionOutput';
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  permissions?: Maybe<Array<Maybe<Scalars['String']>>>;
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  uid?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type OpsPermissionOutputAdminData = {
  __typename?: 'OpsPermissionOutputAdminData';
  opsPermission: Array<Maybe<OpsPermissionOutput>>;
  user: User;
};

export type OpsPermissionOutputAdminPaginate = {
  __typename?: 'OpsPermissionOutputAdminPaginate';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<OpsPermissionOutputAdminData>>>;
};

export type OpsRoleInputCreate = {
  description: Scalars['String'];
  name: Scalars['String'];
  permissions: Array<Scalars['String']>;
};

export type OpsRoleInputUpdate = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  permissions?: InputMaybe<Array<Scalars['String']>>;
  roleId: Scalars['ID'];
};

export type OpsRoleOutput = {
  __typename?: 'OpsRoleOutput';
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<Scalars['String']>>>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type OrderBy = {
  field?: InputMaybe<UserSortableFields>;
  order?: InputMaybe<OrderByValues>;
};

export type OutputListUserInvitesForAdmin = {
  __typename?: 'OutputListUserInvitesForAdmin';
  data?: Maybe<Array<Maybe<Invitation>>>;
  filter?: Maybe<ListUserInvitesForAdminFilter>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  orderBy?: Maybe<SortBy>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  totalItemsCount?: Maybe<Scalars['Int']>;
  totalPagesCount?: Maybe<Scalars['Int']>;
};

export enum Parties {
  CounterParty = 'COUNTER_PARTY',
  Owner = 'OWNER'
}

export enum Payment_Sub_Report_Type {
  OpsInvoices = 'OPS_INVOICES'
}

export enum Payment_Sub_Status_Report {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Initialized = 'INITIALIZED',
  Progress = 'PROGRESS'
}

export type PdfContactDetail = {
  address?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type PdfFooter = {
  text?: InputMaybe<Scalars['String']>;
};

export type PdfInvoiceDetail = {
  currency?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['String']>;
  due?: InputMaybe<Scalars['String']>;
  latefee?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['String']>;
  terms?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type PdfLineItem = {
  amount?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['String']>;
  tax?: InputMaybe<Scalars['String']>;
};

export type PdfLogo = {
  height?: InputMaybe<Scalars['Int']>;
  image?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type PdfSummary = {
  subTotal?: InputMaybe<Scalars['String']>;
  taxes?: InputMaybe<Array<InputMaybe<PdfTax>>>;
  total?: InputMaybe<Scalars['String']>;
};

export type PdfTax = {
  title?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export enum Plan_Category_Enum {
  Free = 'FREE',
  Internal = 'INTERNAL',
  Membership = 'MEMBERSHIP',
  Payasgo = 'PAYASGO'
}

export enum Plan_Setting_Action_Type {
  Create = 'CREATE',
  Delete = 'DELETE',
  Modify = 'MODIFY',
  View = 'VIEW'
}

export enum Plan_Status {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type PageInputUpdate = {
  description: Scalars['String'];
  position: Scalars['Float'];
  questions: Array<SurveyQuestionInput>;
  rules: Array<SurveyPageInputRule>;
  title: Scalars['String'];
};

export type PaginatedAttendeesData = {
  __typename?: 'PaginatedAttendeesData';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<Attendees>>>;
  meta?: Maybe<AttendeesMeta>;
};

export type PaginatedEventsData = {
  __typename?: 'PaginatedEventsData';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<Event>>>;
  meta?: Maybe<EventMeta>;
};

export type PaginatedLogsOutput = {
  __typename?: 'PaginatedLogsOutput';
  count?: Maybe<Scalars['Int']>;
  data: Array<LogsOutput>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  totalPagesCount?: Maybe<Scalars['Int']>;
};

export type PaginatedNoumConnectionRequests = {
  __typename?: 'PaginatedNoumConnectionRequests';
  count: Scalars['Int'];
  data: Array<NoumConnectionRequest>;
};

export type PaginatedNoumFiles = {
  __typename?: 'PaginatedNoumFiles';
  count: Scalars['Int'];
  data: Array<NoumFile>;
};

export type PaginatedNoumMembers = {
  __typename?: 'PaginatedNoumMembers';
  count: Scalars['Int'];
  data: Array<NoumMember>;
};

export type PaginatedNoumPendingConnections = {
  __typename?: 'PaginatedNoumPendingConnections';
  count: Scalars['Int'];
  data: Array<NoumPendingConnection>;
};

export type PaginatedNoumRoles = {
  __typename?: 'PaginatedNoumRoles';
  count: Scalars['Int'];
  data: Array<NoumRole>;
};

export type PaginatedSearchableNoumContact = {
  __typename?: 'PaginatedSearchableNoumContact';
  count: Scalars['Int'];
  data: Array<SearchableNoumContact>;
};

export type PaginatedSearchableNoumMember = {
  __typename?: 'PaginatedSearchableNoumMember';
  count: Scalars['Int'];
  data: Array<SearchableNoumMember>;
};

export type PaginatedThreads = {
  __typename?: 'PaginatedThreads';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<ThreadOutput>>>;
};

export type PaginatedTimezoneData = {
  __typename?: 'PaginatedTimezoneData';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<Timezone>>>;
};

export type PaginationNotificationOp = {
  __typename?: 'PaginationNotificationOp';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<NotificationOp>>>;
};

export type Params = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type PassCodeResetOutput = {
  __typename?: 'PassCodeResetOutput';
  allowReset?: Maybe<Scalars['Boolean']>;
};

export type PaymentAccountDetails = {
  __typename?: 'PaymentAccountDetails';
  data?: Maybe<Array<Maybe<AccountListOutput>>>;
  userId: Scalars['ID'];
};

export enum PaymentAccountTypeEnum {
  Bank = 'BANK',
  Card = 'CARD',
  Payee = 'PAYEE',
  SubWallet = 'SUB_WALLET',
  Wallet = 'WALLET'
}

export type PaymentActivity = {
  __typename?: 'PaymentActivity';
  amount?: Maybe<Scalars['Float']>;
  currency?: Maybe<Scalars['String']>;
  destination?: Maybe<Scalars['String']>;
  invoice?: Maybe<InvoiceOutput>;
  invoiceId?: Maybe<Scalars['String']>;
  netAmount?: Maybe<Scalars['Float']>;
  paymentDate?: Maybe<Scalars['Date']>;
  paymentId?: Maybe<Scalars['ID']>;
  source?: Maybe<Scalars['String']>;
  transactionType?: Maybe<Scalars['String']>;
};

export type PaymentActivityInput = {
  amount?: InputMaybe<Scalars['Float']>;
  currency?: InputMaybe<Scalars['String']>;
  destination?: InputMaybe<Scalars['String']>;
  invoiceId?: InputMaybe<Scalars['String']>;
  netAmount?: InputMaybe<Scalars['Float']>;
  paymentDate?: InputMaybe<Scalars['Date']>;
  paymentId?: InputMaybe<Scalars['ID']>;
  source?: InputMaybe<Scalars['String']>;
  transactionType?: InputMaybe<Scalars['String']>;
};

export type PaymentConfiguration = {
  __typename?: 'PaymentConfiguration';
  createdAt?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type PaymentCountOutput = {
  __typename?: 'PaymentCountOutput';
  count: Scalars['Int'];
  data?: Maybe<Array<Maybe<PaymentOutput>>>;
};

export enum PaymentCustomerColumnName {
  Date = 'DATE',
  DocStatus = 'DOC_STATUS',
  Name = 'NAME',
  NoumenaStatus = 'NOUMENA_STATUS',
  ProviderStatus = 'PROVIDER_STATUS',
  UpdateStatus = 'UPDATE_STATUS',
  UserId = 'USER_ID'
}

export type PaymentCustomerCommonFilter = {
  column: PaymentCustomerColumnName;
  operator: PaymentFilterOperator;
  values: Array<Scalars['String']>;
};

export type PaymentCustomerDetailOutput = {
  __typename?: 'PaymentCustomerDetailOutput';
  createdAt?: Maybe<Scalars['String']>;
  customerType?: Maybe<Scalars['String']>;
  docStatus?: Maybe<KycDocumentStatusEnum>;
  enableTransactionLimit?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['String']>;
  msg?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  noumenaStatus?: Maybe<KycNoumenaStatusEnum>;
  providerStatus?: Maybe<KycProviderStatusEnum>;
  status?: Maybe<Scalars['String']>;
  transactionFlagHistory?: Maybe<Array<Maybe<TransactionFlagHistoryForAdmin>>>;
  updateStatus?: Maybe<KycUpdateStatusEnum>;
  userId?: Maybe<UserOutput>;
};

export type PaymentCustomerOutput = {
  __typename?: 'PaymentCustomerOutput';
  customerName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  paymentChannel?: Maybe<PaymentChannelsEnum>;
  userId?: Maybe<UserOutput>;
};

export enum PaymentDetails {
  Ach = 'ACH',
  Card = 'CARD',
  Wallet = 'WALLET'
}

export type PaymentDetailsOutput = {
  __typename?: 'PaymentDetailsOutput';
  accountNumber?: Maybe<Scalars['String']>;
  actualPaymentDate?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<UserOutput>;
  currency?: Maybe<Scalars['String']>;
  isManual?: Maybe<Scalars['Boolean']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  paymentChannel?: Maybe<Scalars['String']>;
  paymentDueDate?: Maybe<Scalars['String']>;
  paymentId?: Maybe<Scalars['String']>;
  paymentNotes?: Maybe<Scalars['String']>;
  paymentReason?: Maybe<Scalars['String']>;
  paymentStatus?: Maybe<Scalars['String']>;
  paymentType?: Maybe<Scalars['String']>;
  statementId?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<UserOutput>;
};

export type PaymentFilter = {
  accountId?: InputMaybe<Scalars['String']>;
  accountType?: InputMaybe<Array<InputMaybe<PaymentAccountTypeEnum>>>;
  chamberId?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['String']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  paymentStatus?: InputMaybe<PaymentStatusEnum>;
  search?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export enum PaymentFilterOperator {
  And = 'and',
  Btw = 'btw',
  Btwe = 'btwe',
  Eq = 'eq',
  Gt = 'gt',
  Gte = 'gte',
  ILike = 'iLike',
  In = 'in',
  Like = 'like',
  Lt = 'lt',
  Lte = 'lte',
  Ne = 'ne',
  NotIn = 'notIn',
  Or = 'or'
}

export type PaymentInput = {
  accountNumber?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
  isManual?: InputMaybe<Scalars['Boolean']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  paymentChannel?: InputMaybe<Scalars['String']>;
  paymentDueDate?: InputMaybe<Scalars['String']>;
  paymentId?: InputMaybe<Scalars['String']>;
  paymentNotes?: InputMaybe<Scalars['String']>;
  paymentReason?: InputMaybe<Scalars['String']>;
  paymentStatus?: InputMaybe<Scalars['String']>;
  paymentType?: InputMaybe<Scalars['String']>;
  statementId?: InputMaybe<Scalars['String']>;
};

export type PaymentMethodOutput = {
  __typename?: 'PaymentMethodOutput';
  brand?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  exp_month?: Maybe<Scalars['Int']>;
  exp_year?: Maybe<Scalars['Int']>;
  funding?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  last4?: Maybe<Scalars['String']>;
};

export type PaymentOutput = {
  __typename?: 'PaymentOutput';
  amount?: Maybe<Scalars['Float']>;
  charges?: Maybe<Scalars['Float']>;
  clientSecret?: Maybe<Scalars['String']>;
  createUserId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  customerName?: Maybe<Scalars['String']>;
  destination?: Maybe<Scalars['String']>;
  destinationAccountId?: Maybe<Scalars['String']>;
  destinationDetail?: Maybe<TransferDetail>;
  destinationSubLedgerAccountId?: Maybe<Scalars['String']>;
  destinationUser?: Maybe<UserOutput>;
  dueDate?: Maybe<Scalars['String']>;
  errorObj?: Maybe<ErrorObject>;
  history?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  idempotencyKey?: Maybe<Scalars['String']>;
  invoiceId?: Maybe<Scalars['ID']>;
  isPublished?: Maybe<Scalars['String']>;
  netAmount?: Maybe<Scalars['Float']>;
  notes?: Maybe<Scalars['String']>;
  paymentDate?: Maybe<Scalars['String']>;
  paymentId?: Maybe<Scalars['String']>;
  paymentStatus?: Maybe<Scalars['String']>;
  requestOriginator?: Maybe<Scalars['String']>;
  settlementPeriod?: Maybe<SettlementPeriodEnum>;
  source?: Maybe<Scalars['String']>;
  sourceAccountId?: Maybe<Scalars['String']>;
  sourceDetail?: Maybe<TransferDetail>;
  sourceSubLedgerAccountId?: Maybe<Scalars['String']>;
  sourceUser?: Maybe<UserOutput>;
  tenantId?: Maybe<Scalars['String']>;
  transactionReason?: Maybe<Scalars['String']>;
  transactionType?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  updatedUserId?: Maybe<Scalars['String']>;
};

export type PaymentProviderChargesInput = {
  amount: Scalars['Float'];
  destinationAccountId: Scalars['String'];
  enableNoumFees?: InputMaybe<Scalars['Boolean']>;
  invoicePayment?: InputMaybe<Scalars['Boolean']>;
  settlementPeriod: SettlementPeriodEnum;
  sourceAccountId: Scalars['String'];
};

export type PaymentProviderChargesOutput = {
  __typename?: 'PaymentProviderChargesOutput';
  amount?: Maybe<Scalars['Float']>;
  charges?: Maybe<Scalars['Float']>;
  netAmount?: Maybe<Scalars['Float']>;
};

export type PaymentProviderInput = {
  payeeCurrency?: InputMaybe<CurrencyEnum>;
  payerCurrency?: InputMaybe<CurrencyEnum>;
  paymentMethod?: InputMaybe<PaymentProviderMethodEnum>;
  settlementPeriod?: InputMaybe<SettlementPeriodEnum>;
  source?: InputMaybe<PaymentProviderSourceEnum>;
  target?: InputMaybe<PaymentProviderSourceEnum>;
};

export enum PaymentProviderMethodEnum {
  Ach = 'ACH',
  Card = 'CARD',
  Wallet = 'WALLET'
}

export type PaymentProviderOutput = {
  __typename?: 'PaymentProviderOutput';
  available?: Maybe<Scalars['Boolean']>;
  chargePercentage?: Maybe<Scalars['Float']>;
  chargeValue?: Maybe<Scalars['Float']>;
  feeAppliedTo?: Maybe<FeeApplied>;
  flowOfFunds?: Maybe<FlowofFundsEnum>;
  id: Scalars['String'];
  invoiceFeeAppliedTo?: Maybe<FeeApplied>;
  invoicePayment?: Maybe<Scalars['Boolean']>;
  payeeCurrency?: Maybe<CurrencyEnum>;
  payerCurrency?: Maybe<CurrencyEnum>;
  paymentMethod?: Maybe<PaymentProviderMethodEnum>;
  preference?: Maybe<Scalars['Int']>;
  provider?: Maybe<PaymentChannelsEnum>;
  settlementPeriod?: Maybe<SettlementPeriodEnum>;
  source?: Maybe<PaymentProviderSourceEnum>;
  target?: Maybe<PaymentProviderSourceEnum>;
};

export enum PaymentProviderSourceEnum {
  Bank = 'BANK',
  Card = 'CARD',
  Noum = 'NOUM'
}

export type PaymentReportDataOutput = {
  __typename?: 'PaymentReportDataOutput';
  bulkReportId?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['String']>;
  fileData?: Maybe<FileData>;
  id?: Maybe<Scalars['ID']>;
  note?: Maybe<Scalars['String']>;
  paymentId?: Maybe<Scalars['ID']>;
  status?: Maybe<Scalars['String']>;
  transactionId?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type PaymentReportOutput = {
  __typename?: 'PaymentReportOutput';
  BulkReportLogData?: Maybe<Array<Maybe<PaymentReportDataOutput>>>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<UserOutput>;
  failed?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  processed?: Maybe<Scalars['Int']>;
  progress?: Maybe<Scalars['Float']>;
  reqFile?: Maybe<Scalars['String']>;
  respFile?: Maybe<Scalars['String']>;
  retryDate?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type PaymentReportWithCountOutput = {
  __typename?: 'PaymentReportWithCountOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<PaymentReportOutput>>;
};

export enum PaymentStatusEnum {
  AwaitingProcessing = 'AWAITING_PROCESSING',
  Cancelled = 'CANCELLED',
  Processed = 'PROCESSED',
  Rejected = 'REJECTED',
  SubmittedToPgtwy = 'SUBMITTED_TO_PGTWY'
}

export type PaymentSubReport = {
  __typename?: 'PaymentSubReport';
  created_at: Scalars['String'];
  filters: Scalars['String'];
  logs: Array<PaymentSubReportLog>;
  message?: Maybe<Scalars['String']>;
  report_id: Scalars['Float'];
  report_type: Payment_Sub_Report_Type;
  status: Payment_Sub_Status_Report;
  url?: Maybe<Scalars['String']>;
};

export type PaymentSubReportGenerateInput = {
  dateFrom: Scalars['String'];
  dateTo: Scalars['String'];
  type: Payment_Sub_Report_Type;
};

export type PaymentSubReportLog = {
  __typename?: 'PaymentSubReportLog';
  created_at: Scalars['DateTime'];
  report_log_id: Scalars['Float'];
  status: Payment_Sub_Status_Report;
};

export type PaymentSubReportPaginated = {
  __typename?: 'PaymentSubReportPaginated';
  count: Scalars['Float'];
  data: Array<PaymentSubReport>;
};

export enum PaymentTerms {
  FullPaymentAdvance = 'FullPaymentAdvance',
  InstallmentPayment = 'InstallmentPayment',
  MilestonePayment = 'MilestonePayment'
}

export type PaymentTransactionOutput = {
  __typename?: 'PaymentTransactionOutput';
  amount?: Maybe<Scalars['Float']>;
  charges?: Maybe<Scalars['Float']>;
  createUserId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  customerName?: Maybe<Scalars['String']>;
  destination?: Maybe<Scalars['String']>;
  destinationAccountId?: Maybe<Scalars['String']>;
  destinationDetail?: Maybe<TransferDetail>;
  destinationSubLedgerAccountId?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['String']>;
  history?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  idempotencyKey?: Maybe<Scalars['String']>;
  isPublished?: Maybe<Scalars['String']>;
  netAmount?: Maybe<Scalars['Float']>;
  notes?: Maybe<Scalars['String']>;
  paymentChannel?: Maybe<Scalars['String']>;
  paymentDate?: Maybe<Scalars['String']>;
  paymentId?: Maybe<Scalars['String']>;
  paymentStatus?: Maybe<Scalars['String']>;
  providerId?: Maybe<Scalars['String']>;
  requestOriginator?: Maybe<Scalars['String']>;
  sequence?: Maybe<Scalars['Int']>;
  settlementPeriod?: Maybe<SettlementPeriodEnum>;
  source?: Maybe<Scalars['String']>;
  sourceAccountId?: Maybe<Scalars['String']>;
  sourceDetail?: Maybe<TransferDetail>;
  sourceSubLedgerAccountId?: Maybe<Scalars['String']>;
  sourceUser?: Maybe<UserOutput>;
  tenantId?: Maybe<Scalars['String']>;
  transactionId?: Maybe<Scalars['String']>;
  transactionReason?: Maybe<Scalars['String']>;
  transactionType?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  updatedUserId?: Maybe<Scalars['String']>;
};

export type PdfPreview = {
  __typename?: 'PdfPreview';
  base64: Scalars['String'];
};

export enum PermissibleElementType {
  Calendar = 'Calendar',
  ContractTool = 'ContractTool',
  FileManager = 'FileManager',
  Image = 'Image',
  InvoiceTool = 'InvoiceTool',
  Messages = 'Messages',
  Payment = 'Payment',
  Posts = 'Posts',
  QuickQuestions = 'QuickQuestions',
  Text = 'Text',
  Video = 'Video'
}

export type PermissionInput = {
  connectionId: Scalars['ID'];
  permission: ConnectionPermissionTypeEnum;
};

export type PermissionInputV2 = {
  connectionId: Scalars['ID'];
  roleId: Scalars['ID'];
};

export type PermissionsCountersSubOutput = {
  __typename?: 'PermissionsCountersSubOutput';
  homeNoumCounters?: Maybe<SubSettingNoumCountersOutput>;
  permissions?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type PermissionsHomeCountersOutput = {
  __typename?: 'PermissionsHomeCountersOutput';
  data: PermissionsCountersSubOutput;
  success: Scalars['Boolean'];
};

export type PersonalInput = {
  dob?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  industry?: InputMaybe<Scalars['String']>;
  isUSResident?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  middleName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  ssn?: InputMaybe<Scalars['String']>;
};

export type PersonalOutput = {
  __typename?: 'PersonalOutput';
  accountNumber?: Maybe<Scalars['String']>;
  contracts?: Maybe<Array<Maybe<UserContractOutput>>>;
  customerId?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['Date']>;
  firstName?: Maybe<Scalars['String']>;
  industry?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
};

export type PersonalOutputUser = {
  __typename?: 'PersonalOutputUser';
  address?: Maybe<AddressOutput>;
  averageMonthlyExpense?: Maybe<Scalars['String']>;
  averageMonthlyIncome?: Maybe<Scalars['String']>;
  bestMonthlyIncome?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  incomeFromTaxReturn?: Maybe<Scalars['String']>;
  industry?: Maybe<Scalars['String']>;
  isUSResident?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  questionAnswers?: Maybe<Array<Maybe<QuestionsAnswerOutput>>>;
  ssn?: Maybe<Scalars['String']>;
  taxEndPeriod?: Maybe<Scalars['String']>;
  worstMonthlyIncome?: Maybe<Scalars['String']>;
};

export type PersonalProfileOutput = {
  __typename?: 'PersonalProfileOutput';
  error?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type PlaidInput = {
  customerId?: InputMaybe<Scalars['String']>;
  days?: InputMaybe<Scalars['Int']>;
  reportOrigin?: InputMaybe<Scalars['String']>;
  uid?: InputMaybe<Scalars['String']>;
};

export type PlaidInputSchema = {
  __typename?: 'PlaidInputSchema';
  customerId?: Maybe<Scalars['String']>;
  days?: Maybe<Scalars['Int']>;
  reportOrigin?: Maybe<Scalars['String']>;
  uid?: Maybe<Scalars['String']>;
};

export type PlaidOutput = {
  __typename?: 'PlaidOutput';
  assets?: Maybe<Scalars['Json']>;
  createdAt?: Maybe<Scalars['String']>;
  datasources?: Maybe<Scalars['Json']>;
  errors?: Maybe<Scalars['Json']>;
  id: Scalars['ID'];
  input?: Maybe<PlaidInputSchema>;
  modules?: Maybe<Scalars['Json']>;
  transaction?: Maybe<Scalars['Json']>;
};

export type PlaidReportList = {
  __typename?: 'PlaidReportList';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<PlaidReportOutput>>>;
};

export type PlaidReportOutput = {
  __typename?: 'PlaidReportOutput';
  activeBanks?: Maybe<Scalars['Json']>;
  assets?: Maybe<Scalars['Json']>;
  createdAt?: Maybe<Scalars['String']>;
  datasources?: Maybe<Scalars['Json']>;
  errorsArr?: Maybe<Scalars['Json']>;
  expiredBanks?: Maybe<Scalars['Json']>;
  id: Scalars['ID'];
  input?: Maybe<PlaidInputSchema>;
  modules?: Maybe<Scalars['Json']>;
};

export type PlanDetail = {
  __typename?: 'PlanDetail';
  created_at: Scalars['String'];
  discount_percent?: Maybe<Scalars['Float']>;
  noum_renewal?: Maybe<Scalars['Float']>;
  noum_setup?: Maybe<Scalars['Float']>;
  noum_validity_months?: Maybe<Scalars['Float']>;
  per_item_fee?: Maybe<Scalars['Float']>;
  percent_fee?: Maybe<Scalars['Float']>;
  plan_detail_id?: Maybe<Scalars['Float']>;
  plan_validity_months?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  status?: Maybe<Scalars['String']>;
  updated_at: Scalars['String'];
};

export type PlanDetailUpdateInput = {
  discount_percent?: InputMaybe<Scalars['Float']>;
  noum_renewal?: InputMaybe<Scalars['Float']>;
  noum_setup?: InputMaybe<Scalars['Float']>;
  noum_validity_months?: InputMaybe<Scalars['Float']>;
  per_item_fee?: InputMaybe<Scalars['Float']>;
  percent_fee?: InputMaybe<Scalars['Float']>;
  plan_detail_id: Scalars['Float'];
  plan_name_id: Scalars['String'];
  plan_validity_months?: InputMaybe<Scalars['Float']>;
  price?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<Plan_Status>;
};

export type PlanItem = {
  __typename?: 'PlanItem';
  billing_cycles?: Maybe<Scalars['Float']>;
  channel?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['String']>;
  currency_code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  external_name?: Maybe<Scalars['String']>;
  free_quantity?: Maybe<Scalars['Float']>;
  is_taxable?: Maybe<Scalars['Boolean']>;
  item_family_id?: Maybe<Scalars['String']>;
  item_id?: Maybe<Scalars['String']>;
  item_type?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  object?: Maybe<Scalars['String']>;
  period?: Maybe<Scalars['Float']>;
  period_unit?: Maybe<Scalars['String']>;
  plan_details?: Maybe<Array<PlanDetail>>;
  plan_id?: Maybe<Scalars['Float']>;
  plan_name_id?: Maybe<Scalars['String']>;
  plan_visibility: Scalars['Boolean'];
  price?: Maybe<Scalars['Float']>;
  pricing_model?: Maybe<Scalars['String']>;
  spotlight?: Maybe<Scalars['Boolean']>;
  status?: Maybe<Scalars['String']>;
  trial_period?: Maybe<Scalars['Int']>;
  trial_period_unit?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['String']>;
};

export type PlanOutput = {
  __typename?: 'PlanOutput';
  plan_label: Scalars['String'];
  plan_name: Scalars['String'];
  plan_value: PlanOutputType;
};

export type PlanOutputType = {
  __typename?: 'PlanOutputType';
  month?: Maybe<Array<PlanItem>>;
  once?: Maybe<Array<PlanItem>>;
  year?: Maybe<Array<PlanItem>>;
};

export type PlanSettingActionItemInput = {
  actionType: Plan_Setting_Action_Type;
  label: Scalars['String'];
};

export type PlanSettingActionItemOutput = {
  __typename?: 'PlanSettingActionItemOutput';
  actionType: Plan_Setting_Action_Type;
  label: Scalars['String'];
};

export type PlanSettingItemInput = {
  action?: InputMaybe<Array<InputMaybe<Plan_Setting_Action_Type>>>;
  control: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  label: Scalars['String'];
  resource: Scalars['String'];
  resourceType: Scalars['String'];
};

export type PlanSettingItemOutput = {
  __typename?: 'PlanSettingItemOutput';
  action?: Maybe<Array<Maybe<Plan_Setting_Action_Type>>>;
  control: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  label: Scalars['String'];
  resource: Scalars['String'];
  resourceType: Scalars['String'];
};

export type PlanSettingNoumInput = {
  limits: Array<PlanSettingNoumOptionsInput>;
  tools: Array<PlanSettingNoumOptionsInput>;
};

export type PlanSettingNoumOptionsConfigureInput = {
  description?: InputMaybe<Scalars['String']>;
  info?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  value: Scalars['Float'];
};

export type PlanSettingNoumOptionsConfigureOutput = {
  __typename?: 'PlanSettingNoumOptionsConfigureOutput';
  description?: Maybe<Scalars['String']>;
  info?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  value: Scalars['Float'];
};

export type PlanSettingNoumOptionsInput = {
  action?: InputMaybe<Array<Plan_Setting_Action_Type>>;
  control: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  label: Scalars['String'];
  possibleActions?: InputMaybe<Array<PlanSettingActionItemInput>>;
  resource: Scalars['String'];
  resourceType: Scalars['String'];
  settings?: InputMaybe<Array<PlanSettingNoumOptionsConfigureInput>>;
};

export type PlanSettingNoumOptionsOutput = {
  __typename?: 'PlanSettingNoumOptionsOutput';
  action?: Maybe<Array<Plan_Setting_Action_Type>>;
  control: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  label: Scalars['String'];
  possibleActions?: Maybe<Array<PlanSettingActionItemOutput>>;
  resource: Scalars['String'];
  resourceType: Scalars['String'];
  settings?: Maybe<Array<PlanSettingNoumOptionsConfigureOutput>>;
};

export type PlanSettingNoumOutput = {
  __typename?: 'PlanSettingNoumOutput';
  limits: Array<PlanSettingNoumOptionsOutput>;
  tools: Array<PlanSettingNoumOptionsOutput>;
};

export type PlanSettingOutput = {
  __typename?: 'PlanSettingOutput';
  category?: Maybe<Plan_Category_Enum>;
  created_at: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  enabled: Scalars['Boolean'];
  financialProducts: Array<PlanSettingItemOutput>;
  homeNoumSetting: PlanSettingNoumOutput;
  item_id: Scalars['String'];
  learningProducts: Array<PlanSettingItemOutput>;
  menuItems: Array<PlanSettingItemOutput>;
  metadata?: Maybe<Scalars['String']>;
  noumSetting: PlanSettingNoumOutput;
  noum_setup_count?: Maybe<Scalars['Int']>;
  plan_family?: Maybe<Scalars['String']>;
  plan_name?: Maybe<Scalars['String']>;
  plan_setting_id: Scalars['Float'];
  plans: Array<PlanItem>;
  sort_index: Scalars['Float'];
  spotlight: Scalars['Boolean'];
  transactionInfo: PlanSettingTransactionInfoOutput;
  updated_at: Scalars['String'];
  user_count?: Maybe<Scalars['Int']>;
};

export type PlanSettingTransactionInfoDetail = {
  __typename?: 'PlanSettingTransactionInfoDetail';
  category: Enum_Transaction_Category;
  label?: Maybe<Scalars['String']>;
  options: Array<Maybe<PlanSettingTransactionInfoOptions>>;
};

export type PlanSettingTransactionInfoDetailInput = {
  category: Enum_Transaction_Category;
  label?: InputMaybe<Scalars['String']>;
  options: Array<PlanSettingTransactionInfoOptionsInput>;
};

export type PlanSettingTransactionInfoFeeDetailsInput = {
  fixed: Scalars['Float'];
  maxFee: Scalars['Float'];
  minFee: Scalars['Float'];
  percentage: Scalars['Float'];
};

export type PlanSettingTransactionInfoFeeDetailsOutput = {
  __typename?: 'PlanSettingTransactionInfoFeeDetailsOutput';
  fixed: Scalars['Float'];
  maxFee: Scalars['Float'];
  minFee: Scalars['Float'];
  percentage: Scalars['Float'];
};

export type PlanSettingTransactionInfoFeeInput = {
  noumenaFee: PlanSettingTransactionInfoFeeDetailsInput;
};

export type PlanSettingTransactionInfoFeeOutput = {
  __typename?: 'PlanSettingTransactionInfoFeeOutput';
  noumenaFee: PlanSettingTransactionInfoFeeDetailsOutput;
};

export type PlanSettingTransactionInfoInput = {
  details: Array<PlanSettingTransactionInfoDetailInput>;
  isEnabled: Scalars['Boolean'];
};

export type PlanSettingTransactionInfoMetadataInput = {
  fee: PlanSettingTransactionInfoFeeInput;
  provider: Array<Enum_Transaction_Provider>;
  settlementValue: Enum_Transaction_Settlement;
};

export type PlanSettingTransactionInfoMetadataOutput = {
  __typename?: 'PlanSettingTransactionInfoMetadataOutput';
  fee: PlanSettingTransactionInfoFeeOutput;
  provider?: Maybe<Array<Maybe<Enum_Transaction_Provider>>>;
  settlementValue: Enum_Transaction_Settlement;
};

export type PlanSettingTransactionInfoOptions = {
  __typename?: 'PlanSettingTransactionInfoOptions';
  destination: Enum_Transactions_Accounts;
  metadata: Array<PlanSettingTransactionInfoMetadataOutput>;
  source: Enum_Transactions_Accounts;
};

export type PlanSettingTransactionInfoOptionsInput = {
  destination: Enum_Transactions_Accounts;
  metadata: Array<PlanSettingTransactionInfoMetadataInput>;
  source: Enum_Transactions_Accounts;
};

export type PlanSettingTransactionInfoOutput = {
  __typename?: 'PlanSettingTransactionInfoOutput';
  details?: Maybe<Array<Maybe<PlanSettingTransactionInfoDetail>>>;
  isEnabled?: Maybe<Scalars['Boolean']>;
};

export type PlanSettingUpdateInput = {
  category: Plan_Category_Enum;
  financialProducts: Array<PlanSettingItemInput>;
  homeNoumSetting: PlanSettingNoumInput;
  learningProducts: Array<PlanSettingItemInput>;
  menuItems: Array<PlanSettingItemInput>;
  metadata?: InputMaybe<Scalars['String']>;
  noumSetting: PlanSettingNoumInput;
  transactionInfo: PlanSettingTransactionInfoInput;
};

export type PlanSettingUpdateOrder = {
  sortOrder: Array<Scalars['Float']>;
};

export type Post = {
  __typename?: 'Post';
  category?: Maybe<PostCategory>;
  content?: Maybe<Scalars['String']>;
  resolutions?: Maybe<Array<Maybe<ResolutionOutput>>>;
  thumbnail?: Maybe<Scalars['String']>;
};

export type PostActivity = {
  __typename?: 'PostActivity';
  _id?: Maybe<Scalars['ID']>;
};

export enum PostCategory {
  Image = 'IMAGE',
  Invite = 'INVITE',
  Video = 'VIDEO'
}

export type PostContentInput = {
  category?: InputMaybe<PostCategory>;
  content?: InputMaybe<Scalars['String']>;
  thumbnail?: InputMaybe<Scalars['String']>;
};

export type PostFilter = {
  uid?: InputMaybe<Scalars['ID']>;
  uids?: InputMaybe<Array<Scalars['ID']>>;
  visibility?: InputMaybe<Array<InputMaybe<PostVisibility>>>;
};

export type PostInput = {
  chamberId?: InputMaybe<Scalars['ID']>;
  groupId?: InputMaybe<Scalars['ID']>;
  post?: InputMaybe<PostContentInput>;
  rawJSON?: InputMaybe<Scalars['InputAny']>;
  tags?: InputMaybe<Array<InputMaybe<TagsInput>>>;
  text?: InputMaybe<Scalars['String']>;
  visibility?: InputMaybe<PostVisibility>;
};

export type PostOutput = {
  __typename?: 'PostOutput';
  _id: Scalars['ID'];
  chamber?: Maybe<ChamberByIdRef>;
  chamberId?: Maybe<Scalars['ID']>;
  comments?: Maybe<Array<Maybe<Comments>>>;
  commentsCount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Date']>;
  groupId?: Maybe<Scalars['ID']>;
  isPinned?: Maybe<Scalars['Boolean']>;
  pinnedTimestamp?: Maybe<Scalars['Date']>;
  post?: Maybe<Post>;
  postStatus?: Maybe<PostStatus>;
  rawJSON?: Maybe<Scalars['TypeAny']>;
  reactions?: Maybe<Array<Maybe<Reaction>>>;
  reactionsCount?: Maybe<Scalars['Int']>;
  reports?: Maybe<Array<Maybe<ReportOutput>>>;
  tags?: Maybe<Array<Maybe<TagsOutput>>>;
  text?: Maybe<Scalars['String']>;
  uid?: Maybe<UserOutput>;
  updatedAt?: Maybe<Scalars['Date']>;
  userReaction?: Maybe<ReactionCategory>;
  visibility?: Maybe<PostVisibility>;
};

export type PostOutputData = {
  __typename?: 'PostOutputData';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<PostOutput>>>;
};

export enum PostStatus {
  Accepted = 'ACCEPTED',
  BeingReviewed = 'BEING_REVIEWED',
  Deleted = 'DELETED',
  Rejected = 'REJECTED'
}

export enum PostType {
  CommunityPost = 'CommunityPost',
  ProjectPost = 'ProjectPost'
}

export enum PostVisibility {
  All = 'ALL',
  Connection = 'CONNECTION',
  Follower = 'FOLLOWER',
  Group = 'GROUP'
}

export type PreCalculateNoumLinkData = {
  __typename?: 'PreCalculateNoumLinkData';
  connectionsCount: Scalars['Int'];
  followersCount: Scalars['Int'];
  membersCount: Scalars['Int'];
};

export type PrincipleAnswerInput = {
  answerNumber?: InputMaybe<Scalars['Int']>;
  questionNumber?: InputMaybe<Scalars['Int']>;
};

export type PrinciplesAssessmentResult = {
  __typename?: 'PrinciplesAssessmentResult';
  fullAssessmetResult?: Maybe<Scalars['Json']>;
  shortScaleAssessmetResult?: Maybe<Scalars['Json']>;
};

export type PrinciplesMutations = {
  __typename?: 'PrinciplesMutations';
  submitPrinciplesAnswers?: Maybe<Scalars['Json']>;
};


export type PrinciplesMutationsSubmitPrinciplesAnswersArgs = {
  answers?: InputMaybe<Array<InputMaybe<PrincipleAnswerInput>>>;
  principleUserId?: InputMaybe<Scalars['String']>;
};

export type PrinciplesQueries = {
  __typename?: 'PrinciplesQueries';
  getPrinciplesAssessmentPDF?: Maybe<AssessmentPdfOutput>;
  getPrinciplesAssessmentResults?: Maybe<PrinciplesAssessmentResult>;
  getPrinciplesQuestion?: Maybe<Scalars['Json']>;
  getPrinciplesUser?: Maybe<Scalars['String']>;
};


export type PrinciplesQueriesGetPrinciplesAssessmentPdfArgs = {
  uid?: InputMaybe<Scalars['String']>;
};


export type PrinciplesQueriesGetPrinciplesAssessmentResultsArgs = {
  uid?: InputMaybe<Scalars['String']>;
};


export type PrinciplesQueriesGetPrinciplesQuestionArgs = {
  principleUserId?: InputMaybe<Scalars['String']>;
};


export type PrinciplesQueriesGetPrinciplesUserArgs = {
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
};

export enum Privacy {
  Connected = 'CONNECTED',
  Invitation = 'INVITATION',
  Public = 'PUBLIC'
}

export type ProductCategoryOutput = {
  __typename?: 'ProductCategoryOutput';
  _id?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export enum ProductKey {
  Noumenati = 'NOUMENATI'
}

export type ProductOutput = {
  __typename?: 'ProductOutput';
  _id?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  currencyCode?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  effectiveDateFrom?: Maybe<Scalars['String']>;
  effectiveDateTo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  productOwner?: Maybe<Scalars['String']>;
  terms?: Maybe<Array<Maybe<ProductTermOutput>>>;
  type?: Maybe<ProductTypeOutput>;
};

export type ProductProfile = {
  __typename?: 'ProductProfile';
  _id?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  productCode?: Maybe<Scalars['String']>;
  productType?: Maybe<Scalars['String']>;
};

export type ProductTermOutput = {
  __typename?: 'ProductTermOutput';
  _id?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  effectiveDateFrom?: Maybe<Scalars['String']>;
  effectiveDateTo?: Maybe<Scalars['String']>;
  isCustomerSpecific?: Maybe<Scalars['Boolean']>;
  isMandatory?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type ProductTypeOutput = {
  __typename?: 'ProductTypeOutput';
  _id?: Maybe<Scalars['ID']>;
  category?: Maybe<ProductCategoryOutput>;
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Profile = {
  __typename?: 'Profile';
  _id?: Maybe<Scalars['ID']>;
  profilePicture?: Maybe<Scalars['String']>;
  profilePictureThumbnail?: Maybe<Scalars['String']>;
  secondaryEmail?: Maybe<Scalars['String']>;
  socialLinks?: Maybe<Array<Maybe<SocialLink>>>;
};

export type ProfileCheckInput = {
  name?: InputMaybe<Scalars['String']>;
  reasons?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  result?: InputMaybe<Scalars['String']>;
};

export type ProfileCheckResult = {
  __typename?: 'ProfileCheckResult';
  ILILimit?: Maybe<Scalars['String']>;
  ISR?: Maybe<Array<Maybe<Scalars['String']>>>;
  reasons?: Maybe<Array<Maybe<Scalars['String']>>>;
  recap?: Maybe<Array<Maybe<Scalars['String']>>>;
  result?: Maybe<Scalars['String']>;
};

export type ProfileCompletion = {
  __typename?: 'ProfileCompletion';
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Boolean']>;
};

export type ProfileInput = {
  profilePicture?: InputMaybe<Scalars['String']>;
  secondaryEmail?: InputMaybe<Scalars['String']>;
  socialLinks?: InputMaybe<Array<InputMaybe<SocialLinkInput>>>;
};

export type ProfileOutput = {
  __typename?: 'ProfileOutput';
  _id?: Maybe<Scalars['ID']>;
  profilePicture?: Maybe<Scalars['String']>;
  profilePictureThumbnail?: Maybe<Scalars['String']>;
  socialLinks?: Maybe<Array<Maybe<SocialLink>>>;
};

export type ProfilePictureOutput = {
  __typename?: 'ProfilePictureOutput';
  profilePicture?: Maybe<Scalars['String']>;
};

export enum ProjectChamberCategoriesEnum {
  Admin = 'ADMIN',
  Web = 'WEB'
}

export type ProjectChamberCategory = {
  __typename?: 'ProjectChamberCategory';
  _id: Scalars['ID'];
  name: Scalars['String'];
};

export type ProjectChamberCategoryInput = {
  name: Scalars['String'];
};

export type ProjectChamberFilter = {
  category?: InputMaybe<Scalars['ID']>;
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  projectType?: InputMaybe<ProjectChamberType>;
  search?: InputMaybe<Scalars['String']>;
  spaceIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  status?: InputMaybe<SpaceStatusEnum>;
  statusNotIn?: InputMaybe<Array<InputMaybe<SpaceStatusEnum>>>;
  type?: InputMaybe<SpaceTypeEnum>;
};

export type ProjectChamberInput = {
  category: Scalars['ID'];
  description?: InputMaybe<Scalars['String']>;
  elements?: InputMaybe<Array<InputMaybe<ProjectElementInput>>>;
  institution: InstitutionsEnum;
  name: Scalars['String'];
  permission?: InputMaybe<SpacePermissionEnum>;
  profileImage?: InputMaybe<Scalars['String']>;
  projectType?: InputMaybe<ProjectChamberType>;
  status: SpaceStatusEnum;
  title?: InputMaybe<Scalars['String']>;
};

export enum ProjectChamberType {
  Private = 'PRIVATE',
  Public = 'PUBLIC',
  Secret = 'SECRET'
}

export enum ProjectChamberTypeForFilter {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type ProjectChamberUpdateInput = {
  category?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  fonts?: InputMaybe<Scalars['JSONObject']>;
  headerBackgroundUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  profileImage?: InputMaybe<Scalars['String']>;
  projectType?: InputMaybe<ProjectChamberType>;
  theme?: InputMaybe<Scalars['ID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ProjectElementInput = {
  bodyContent?: InputMaybe<Scalars['String']>;
  bodyContentJson?: InputMaybe<Scalars['JSONObject']>;
  bodyContentType?: InputMaybe<BodyContentEnum>;
  elementId?: InputMaybe<Scalars['ID']>;
  elementType?: InputMaybe<ElementTypeEnum>;
  headerContent?: InputMaybe<Scalars['String']>;
  percentCompleted?: InputMaybe<Scalars['Int']>;
  position?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<ElementStatusEnum>;
};

export type ProjectNoumCampaign = {
  __typename?: 'ProjectNoumCampaign';
  _id?: Maybe<Scalars['ID']>;
  clicksToNoums?: Maybe<Scalars['Int']>;
  connectionsDeclined?: Maybe<Scalars['Int']>;
  connectionsMade?: Maybe<Scalars['Int']>;
  finishedAt?: Maybe<Scalars['ISODate']>;
  followersGained?: Maybe<Scalars['Int']>;
  invitesSent?: Maybe<Scalars['Int']>;
  refreshedAt?: Maybe<Scalars['ISODate']>;
  space?: Maybe<SpaceOutput>;
  startedAt?: Maybe<Scalars['ISODate']>;
  status?: Maybe<ProjectNoumCampaignStatus>;
  targets?: Maybe<Array<Maybe<CampaignAudienceTarget>>>;
  uid?: Maybe<UserOutput>;
  views?: Maybe<Scalars['Int']>;
};

export type ProjectNoumCampaignFilter = {
  spaceId?: InputMaybe<Scalars['ID']>;
  status?: InputMaybe<ProjectNoumCampaignStatus>;
};

export type ProjectNoumCampaignResponse = {
  __typename?: 'ProjectNoumCampaignResponse';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<ProjectNoumCampaign>>>;
};

export enum ProjectNoumCampaignStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Finished = 'FINISHED',
  Refreshed = 'REFRESHED'
}

export type PromptOptionsInput = {
  frequency_penalty?: InputMaybe<Scalars['Float']>;
  max_tokens?: InputMaybe<Scalars['Int']>;
  model?: InputMaybe<Scalars['String']>;
  presence_penalty?: InputMaybe<Scalars['Float']>;
  temperature?: InputMaybe<Scalars['Float']>;
  top_p?: InputMaybe<Scalars['Int']>;
};

export enum ProviderVariant {
  FacebookToken = 'FACEBOOK_TOKEN',
  GoogleToken = 'GOOGLE_TOKEN',
  LinkedinToken = 'LINKEDIN_TOKEN',
  Password = 'PASSWORD'
}

export type PublishableKey = {
  __typename?: 'PublishableKey';
  publishableKey?: Maybe<Scalars['String']>;
};

export enum PushNotificationTypes {
  ConnectionApproved = 'CONNECTION_APPROVED',
  ConnectionRejected = 'CONNECTION_REJECTED',
  Conversation = 'CONVERSATION',
  CqScoreUpdated = 'CQ_SCORE_UPDATED',
  EventDeleted = 'EVENT_DELETED',
  EventInvitee = 'EVENT_INVITEE',
  EventLive = 'EVENT_LIVE',
  EventReminder = 'EVENT_REMINDER',
  EventStarting = 'EVENT_STARTING',
  GroupInvite = 'GROUP_INVITE',
  GroupJoinRequest = 'GROUP_JOIN_REQUEST',
  GroupPost = 'GROUP_POST',
  IndividualInvite = 'INDIVIDUAL_INVITE',
  InstantEventInvitee = 'INSTANT_EVENT_INVITEE',
  NewIndividualPost = 'NEW_INDIVIDUAL_POST',
  NoumConnection = 'NOUM_CONNECTION',
  PostComment = 'POST_COMMENT',
  PostCommentMentioned = 'POST_COMMENT_MENTIONED',
  PostCommentThread = 'POST_COMMENT_THREAD',
  PostCommentThreadMentioned = 'POST_COMMENT_THREAD_MENTIONED',
  PostMentioned = 'POST_MENTIONED',
  TokenRewarded = 'TOKEN_REWARDED',
  UserActive = 'USER_ACTIVE',
  UserDeactivated = 'USER_DEACTIVATED',
  UserInactive = 'USER_INACTIVE',
  UserPending = 'USER_PENDING',
  UserRejected = 'USER_REJECTED',
  UserUnregistered = 'USER_UNREGISTERED',
  AmemdedInvoice = 'amemdedInvoice',
  CampaignExpired = 'campaignExpired',
  CampaignRefreshed = 'campaignRefreshed',
  Connected = 'connected',
  ConnectionDisconnected = 'connectionDisconnected',
  ConnectionInviteAccepted = 'connectionInviteAccepted',
  ConnectionInviteDeclined = 'connectionInviteDeclined',
  ConnectionInvited = 'connectionInvited',
  ConnectionRequestAccepted = 'connectionRequestAccepted',
  ConnectionRequestDeclined = 'connectionRequestDeclined',
  ConnectionRequested = 'connectionRequested',
  FavoriteConnection = 'favoriteConnection',
  GuestConnection = 'guestConnection',
  InviteAccepted = 'inviteAccepted',
  InvoiceOnDraftState = 'invoiceOnDraftState',
  InvoiceOnDraftStateFreelancer = 'invoiceOnDraftStateFreelancer',
  InvoicePaymentFailedClient = 'invoicePaymentFailedClient',
  InvoicePaymentFailedFreelancer = 'invoicePaymentFailedFreelancer',
  InvoiceStatusChanged = 'invoiceStatusChanged',
  ManagerInviteDeclined = 'managerInviteDeclined',
  ManagerInviteExpired = 'managerInviteExpired',
  ManagerInvited = 'managerInvited',
  ManagerTerminated = 'managerTerminated',
  MemberInvitedToNoum = 'memberInvitedToNoum',
  NoumArchived = 'noumArchived',
  NoumFollowed = 'noumFollowed',
  NoumPublished = 'noumPublished',
  NoumUnarchived = 'noumUnarchived',
  NoumUnfollowed = 'noumUnfollowed',
  QuestionAnswered = 'questionAnswered',
  QuestionCreated = 'questionCreated',
  SpaceConversation = 'spaceConversation'
}

export enum PushNotificationTypesV2 {
  ConnectionApproved = 'CONNECTION_APPROVED',
  ConnectionRejected = 'CONNECTION_REJECTED',
  Conversation = 'CONVERSATION',
  ConversationRead = 'CONVERSATION_READ',
  CqScoreUpdated = 'CQ_SCORE_UPDATED',
  EventInvitee = 'EVENT_INVITEE',
  EventLive = 'EVENT_LIVE',
  EventReminder = 'EVENT_REMINDER',
  EventStarting = 'EVENT_STARTING',
  GroupInvite = 'GROUP_INVITE',
  GroupJoinRequest = 'GROUP_JOIN_REQUEST',
  GroupPost = 'GROUP_POST',
  IndividualInvite = 'INDIVIDUAL_INVITE',
  InstantEventInvitee = 'INSTANT_EVENT_INVITEE',
  NewIndividualPost = 'NEW_INDIVIDUAL_POST',
  NoumConnection = 'NOUM_CONNECTION',
  PostComment = 'POST_COMMENT',
  PostCommentMentioned = 'POST_COMMENT_MENTIONED',
  PostCommentThread = 'POST_COMMENT_THREAD',
  PostCommentThreadMentioned = 'POST_COMMENT_THREAD_MENTIONED',
  PostMentioned = 'POST_MENTIONED',
  TokenRewarded = 'TOKEN_REWARDED',
  UserActive = 'USER_ACTIVE',
  UserDeactivated = 'USER_DEACTIVATED',
  UserInactive = 'USER_INACTIVE',
  UserPending = 'USER_PENDING',
  UserRejected = 'USER_REJECTED',
  UserUnregistered = 'USER_UNREGISTERED',
  AmemdedInvoiceClient = 'amemdedInvoiceClient',
  AmemdedInvoiceFreelancer = 'amemdedInvoiceFreelancer',
  CampaignExpired = 'campaignExpired',
  CampaignRefreshed = 'campaignRefreshed',
  Connected = 'connected',
  ConnectionDisconnected = 'connectionDisconnected',
  ConnectionInviteAccepted = 'connectionInviteAccepted',
  ConnectionInviteDeclined = 'connectionInviteDeclined',
  ConnectionInvited = 'connectionInvited',
  ConnectionRequestAccepted = 'connectionRequestAccepted',
  ConnectionRequestDeclined = 'connectionRequestDeclined',
  ConnectionRequested = 'connectionRequested',
  EventDateModified = 'eventDateModified',
  EventDeleted = 'eventDeleted',
  FavoriteConnection = 'favoriteConnection',
  GuestConnection = 'guestConnection',
  InviteAccepted = 'inviteAccepted',
  InvoiceOnDraftState = 'invoiceOnDraftState',
  InvoicePaymentFailedClient = 'invoicePaymentFailedClient',
  InvoicePaymentFailedFreelancer = 'invoicePaymentFailedFreelancer',
  InvoiceStatusChangedClient = 'invoiceStatusChangedClient',
  InvoiceStatusChangedFreelancer = 'invoiceStatusChangedFreelancer',
  NoumArchived = 'noumArchived',
  NoumFollowed = 'noumFollowed',
  NoumPublished = 'noumPublished',
  NoumUnarchived = 'noumUnarchived',
  NoumUnfollowed = 'noumUnfollowed',
  QuestionAnswered = 'questionAnswered',
  QuestionCreated = 'questionCreated',
  RiseApplicationStatusChanged = 'riseApplicationStatusChanged',
  RiseApplicationSubmitted = 'riseApplicationSubmitted',
  RiseApplicationSubmittedToConnectedUser = 'riseApplicationSubmittedToConnectedUser',
  SendAdCampaignOffer = 'sendAdCampaignOffer',
  SendAdCampaignReport = 'sendAdCampaignReport',
  SpaceConversation = 'spaceConversation',
  UserDisconnectFromProjectNoum = 'userDisconnectFromProjectNoum'
}

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']>;
  accountLogs?: Maybe<Array<Maybe<AccountLogsOutput>>>;
  accountPaymentDetails?: Maybe<Array<Maybe<PaymentDetailsOutput>>>;
  accountStatmentDetails?: Maybe<Array<Maybe<StatementDetailsOutput>>>;
  accounts?: Maybe<Scalars['String']>;
  allCustomers?: Maybe<Array<Maybe<CustomerOutput>>>;
  allNoumsContacts: PaginatedSearchableNoumContact;
  allNoumsContactsForAdmin?: Maybe<NoumContactAdminResult>;
  allUsers: UserOutputAllUsers;
  allowPassCodeReset?: Maybe<PassCodeResetOutput>;
  amountDueThisMonth?: Maybe<AmountDueOutput>;
  audit?: Maybe<Scalars['String']>;
  authenticationError?: Maybe<Scalars['String']>;
  availableNoumRoles: Array<AvailableNoumRole>;
  broadcastAudienceTargets: Array<Scalars['String']>;
  canUserJoinEvent?: Maybe<Scalars['Boolean']>;
  capitalquotient?: Maybe<CapitalquotientQueries>;
  chamber?: Maybe<Scalars['String']>;
  chameleon?: Maybe<Scalars['String']>;
  check?: Maybe<Scalars['String']>;
  checkForAdmin?: Maybe<Scalars['Boolean']>;
  checkIfSlugExists?: Maybe<Scalars['Boolean']>;
  checkPassCodeExists: Scalars['Boolean'];
  checkPaymentRetry?: Maybe<Scalars['Boolean']>;
  checkWalletExistDetail?: Maybe<WalletExistDetailType>;
  checkWalletExists?: Maybe<WalletExistType>;
  config?: Maybe<UserConfigOutput>;
  connectedNoums: SpaceOutputResponse;
  connections?: Maybe<Array<Maybe<UserOutput>>>;
  currentUser?: Maybe<User>;
  currentUserPaymentLimits?: Maybe<CurrentUserPaymentLimitOutput>;
  customer?: Maybe<Scalars['String']>;
  customerAddressDetails?: Maybe<AddressOutput>;
  customerApprovedILI?: Maybe<IliOutput>;
  customerBankList?: Maybe<Array<Maybe<BankListOutput>>>;
  customerContactDetails?: Maybe<ContactOutput>;
  customerContractDetails?: Maybe<Array<Maybe<ContractOutput>>>;
  customerFirstTimeFlag?: Maybe<Scalars['Boolean']>;
  customerList?: Maybe<CustomerWithTotalOutput>;
  customerLogs?: Maybe<Array<Maybe<CustomerLogsOutput>>>;
  customerPersonalDetails?: Maybe<PersonalOutput>;
  customers?: Maybe<CustomersOutput>;
  dailyRecommendations?: Maybe<Matches>;
  downloadInvoicePDF: InvoicePdfUrl;
  dwollaTransactions?: Maybe<DwollaTransactionOutput>;
  exportCsv: MessageOutput;
  findSpaceBySearchQuery?: Maybe<SpaceOutput>;
  getAccountById?: Maybe<AccountListOutput>;
  getAccountList?: Maybe<Array<AccountListOutput>>;
  getAccountListByUser?: Maybe<Array<AccountListOutput>>;
  getAccountListV2: AccountListOutputV2;
  getAdCampaignCsvReportUrl: Scalars['String'];
  getAdCampaignCsvReports?: Maybe<AdCampaignCsvReportListOutput>;
  getAdCampaignListAdmin: AdCampaignOutputPaginated;
  getAdCampaignOfferOne: AdCampaignOffer;
  getAdCampaignOffers: AdCampaignOfferPaginated;
  getAdCampaignOffersAll: AdCampaignOfferPaginated;
  getAdCampaignReportOne: AdCampaignReportOutput;
  getAdCampaignReports?: Maybe<AdCampaignReportsOutputPaginated>;
  getAdCampaignSettings?: Maybe<AdCampaignSettingsOutput>;
  getAdCampaignsByUser?: Maybe<AdCampaignOutputPaginated>;
  getAdEnabledNoums?: Maybe<SpaceOutputResponse>;
  getAdKeywords?: Maybe<Scalars['JSONObject']>;
  getAdminReportByID?: Maybe<AdminReportsOutputType>;
  getAdminReportSignedURL?: Maybe<Scalars['String']>;
  getAdminReportsByType?: Maybe<AdminReportsOutputCollection>;
  getAllChargebeeCustomers: Array<Customer>;
  getAllInvoices: ListInvoice;
  getAllNoums?: Maybe<SpaceOutputResponse>;
  getAllNoumsTransactions: ListNoums;
  getAllPayments?: Maybe<PaymentCountOutput>;
  getAllPlansDetails?: Maybe<Array<Maybe<PlanSettingOutput>>>;
  getAllSOW: SowOutput;
  getAllSubscriptionsForUser: Array<SubscriptionOutput>;
  getAllSurveys: SurveyOutputGetAll;
  getAllThemes?: Maybe<ThemeOutputResponse>;
  getAllTokenArchives?: Maybe<TokenArchiveOutput>;
  getAllUidForChamberPosts?: Maybe<ChamberAuthors>;
  getAllUserGroupsForAdmin?: Maybe<AdminGroupOutput>;
  getAppActivities?: Maybe<AppActivitiesOutput>;
  getAvailableItemFamilies: Array<ItemFamilyOutput>;
  getAvailableItemsByFamily: Array<ItemOutput>;
  getAvailablePlans: Array<PlanOutput>;
  getAvailableSubscriptions: Array<SubscriptionOutput>;
  getBankAccountBalance?: Maybe<BankAccountBalance>;
  getBroadcastedProjectNoums?: Maybe<SpaceOutputResponse>;
  getCampaignAccount?: Maybe<CampaignAccountOutput>;
  getCardStripe?: Maybe<Array<Maybe<StripeCardOutput>>>;
  getCategoryWithSkills?: Maybe<Array<Maybe<CategoryWithSkills>>>;
  getCommentById?: Maybe<Comments>;
  getCommentByIdForGenericEntity?: Maybe<Comments>;
  getCommentsForGenericEntity?: Maybe<CommentsWithPagination>;
  getConfig?: Maybe<ConfigOutput>;
  getConnectedChamberPayments?: Maybe<PaymentCountOutput>;
  getConnectedSpaces?: Maybe<SpaceOutputResponse>;
  getConnectionById?: Maybe<SpaceConnection>;
  getConsignors?: Maybe<Array<NoumContactOutput>>;
  getContactConnectionWithNoum?: Maybe<SpaceConnection>;
  getContractList: NoumContractOutput;
  getContractListForAdmin?: Maybe<NoumContractOutputAdmin>;
  getContractReportCsvUrl: Scalars['String'];
  getContractReports?: Maybe<InvoiceToolReportOutputPaginated>;
  getConversation?: Maybe<ConversationIdOutput>;
  getConversationByCid?: Maybe<ConversationOutput>;
  getConversations?: Maybe<ConversationOutputAll>;
  getCookieConsent?: Maybe<CookieConsentOutput>;
  getCustomerAuditLogs?: Maybe<CustomerKycAuditLogCount>;
  getCustomerDetails?: Maybe<CustomerOutput>;
  getCustomerDocumentUrl?: Maybe<UrlOutput>;
  getCustomerDocuments?: Maybe<Array<Maybe<CustomerDocumentOutput>>>;
  getCustomerLimits?: Maybe<CustomerLimitOutput>;
  getCustomerLimitsV2?: Maybe<CustomerLimitOutput>;
  getCustomerPayeeList?: Maybe<Array<Maybe<CustomerPayeeList>>>;
  getCustomerPayeeListV2?: Maybe<CustomerPayeeListV2>;
  getCustomerSearchList?: Maybe<Array<Maybe<Scalars['String']>>>;
  getCustomers?: Maybe<CustomerAccountsOutput>;
  getDefaultNoumTransactionFeeDetails: NoumTransactionFee;
  getDistinctNoumAdCampaigns?: Maybe<Array<Maybe<AdCampaignOutput>>>;
  getDocuSignURL?: Maybe<DocuSignOutput>;
  getDocumentByEnvelopeId?: Maybe<Scalars['String']>;
  getDocumentUploadUrl?: Maybe<UploadDocumentOutput>;
  getElement?: Maybe<ElementOutput>;
  getElementList?: Maybe<Array<Scalars['String']>>;
  getEventAttendees?: Maybe<PaginatedAttendeesData>;
  getEventById?: Maybe<Event>;
  getEventCounter?: Maybe<EventMeta>;
  getEventUserRole?: Maybe<CurrentUser>;
  getEvents?: Maybe<PaginatedEventsData>;
  getEventsV2?: Maybe<EventOutput>;
  getFeaturedNoums?: Maybe<SpaceOutputResponse>;
  getFollowingSpaces?: Maybe<SpaceOutputResponse>;
  getGlobalInvoiceConfig?: Maybe<GlobalConfigOutput>;
  getHomeSpaceConversations?: Maybe<HomeSpaceConversationOutput>;
  getIDScanCheckResult?: Maybe<Scalars['Boolean']>;
  getInvoiceAmount?: Maybe<InvoiceAmountOutput>;
  getInvoiceById?: Maybe<InvoiceOutput>;
  getInvoiceDownloadURL: Scalars['String'];
  getInvoiceHistory: Array<InvoiceHistory>;
  getInvoiceList?: Maybe<InvoiceList>;
  getInvoiceListForAdmin?: Maybe<InvoiceList>;
  getInvoicePayment?: Maybe<InvoicePaymentOutput>;
  getInvoicePaymentByPaymentId?: Maybe<InvoicePaymentOutput>;
  getInvoicePayments?: Maybe<Array<Maybe<InvoicePaymentOutput>>>;
  getInvoiceReports: PaymentSubReportPaginated;
  getInvoiceSequence: InvoiceSequenceOutput;
  getInvoiceTimeLines?: Maybe<InvoiceTimelinePaginationOutput>;
  getInvoiceToolReportCsvUrl: Scalars['String'];
  getInvoiceToolReports?: Maybe<InvoiceToolReportOutputPaginated>;
  getInvoices: Array<InvoiceDetail>;
  getKYCCustomer?: Maybe<PaymentCustomerDetailOutput>;
  getKYCCustomers?: Maybe<CustomerKycAccountsOutput>;
  getLinkToken?: Maybe<Scalars['String']>;
  getLinkedNoums?: Maybe<SpaceOutputResponse>;
  getLinkedSOWs: SowOutput;
  getLocation?: Maybe<Array<Maybe<LocationOutput>>>;
  getMasterWalletBalance?: Maybe<FundingSourceBalanceOutput>;
  getNoumActivityLog?: Maybe<AppActivitiesOutput>;
  getNoumActivityStats?: Maybe<NoumActivityStats>;
  getNoumClassById?: Maybe<NoumClass>;
  getNoumClassByNoumId?: Maybe<NoumClass>;
  getNoumClassList?: Maybe<NoumClassList>;
  getNoumConnectedMembers?: Maybe<SpaceOutputResponse>;
  getNoumConnectionsKPIs?: Maybe<NoumConnectionsKpi>;
  getNoumConnectionsWithinTimeframe?: Maybe<SpaceOutputResponse>;
  getNoumFollowersKPIs?: Maybe<NoumFollowersKpi>;
  getNoumFollowersWithinTimeframeQuery?: Maybe<SpaceOutputResponse>;
  getNoumLink?: Maybe<NoumLink>;
  getNoumLinkConnections?: Maybe<SpaceOutputResponse>;
  getNoumLinkFollowers?: Maybe<SpaceOutputResponse>;
  getNoumLinkedNoums?: Maybe<SpaceOutputResponse>;
  getNoumLinks?: Maybe<NoumLinkResponse>;
  getNoumProgramById?: Maybe<NoumProgram>;
  getNoumProgramList?: Maybe<NoumProgramList>;
  getNoumProgramresultById?: Maybe<ApplicationResult>;
  /** @deprecated getNoumReferenceCapacites query is deprecated. Use getNoumReferenceCapacity instead. */
  getNoumReferenceCapacites: Array<NoumReferenceCapacity>;
  getNoumReferenceCapacity: Array<NoumReferenceCapacity>;
  getNoumReferences?: Maybe<NoumReferenceResponse>;
  getNoumTransactionFeeDetails: Array<NoumTransactionFee>;
  getNoumTransactionHistory: Array<NoumTransactionFeeHistoryOutput>;
  getNoumsByStatus: Array<NoumTransactionFee>;
  getNoumsLinkedToContracts?: Maybe<Array<SpaceOutput>>;
  getNoumsLinkedToSOWs?: Maybe<Array<SpaceOutput>>;
  getNoumsLinkedToUserInvoices?: Maybe<Array<SpaceOutput>>;
  getOnboardingQuestionAndAnswers?: Maybe<QuestionAndAnswersOutput>;
  getOneSurvey: Survey;
  getOneSurveyPage: SurveyPage;
  getOpNotification?: Maybe<NotificationOp>;
  getOpsAdminPermissions?: Maybe<OpsPermissionOutputAdminPaginate>;
  getOpsPermission?: Maybe<OpsPermissionOutput>;
  getOpsRoles?: Maybe<Array<Maybe<OpsRoleOutput>>>;
  getOtpStats?: Maybe<Array<Maybe<GetOtpStatsOutput>>>;
  getOwnProjectChambers?: Maybe<SpaceOutputResponse>;
  getPaymentById?: Maybe<PaymentOutput>;
  getPaymentConfigByName?: Maybe<PaymentConfiguration>;
  getPaymentConfigs?: Maybe<Array<Maybe<PaymentConfiguration>>>;
  getPaymentProviderCharges?: Maybe<PaymentProviderChargesOutput>;
  getPaymentProviders?: Maybe<Array<Maybe<PaymentProviderOutput>>>;
  getPaymentSubscriptionSetting: Array<SettingsOutput>;
  getPaymentTransactions?: Maybe<Array<Maybe<PaymentTransactionOutput>>>;
  getPlanSettingById?: Maybe<PlanSettingOutput>;
  getPostsByChamberId?: Maybe<PostOutputData>;
  getPreSignedURLForFileUpload?: Maybe<Scalars['String']>;
  getProjectChamberCategories?: Maybe<Array<ProjectChamberCategory>>;
  getProjectChambers?: Maybe<SpaceOutputResponse>;
  getProjectChambersAdmin?: Maybe<SpaceOutputResponse>;
  getProjectChambersByUserId?: Maybe<Array<SpaceOutput>>;
  getPublishableKey: Scalars['String'];
  getQuestionAnswers?: Maybe<AnswersOutputResponse>;
  getQuestionById?: Maybe<NoumQuestionOutput>;
  getQuestionnaire: Array<QuestionOutput>;
  getQuestionsForSpace?: Maybe<QuestionOutputResponse>;
  getRandomQuestionnaire: Array<QuestionOutput>;
  getRecommendedNoums?: Maybe<SpaceOutputResponse>;
  getReferredUser?: Maybe<UserOutput>;
  getRegistrationOTP?: Maybe<OtpOutput>;
  getRenewalToken?: Maybe<Scalars['String']>;
  getRepliesByCommentId?: Maybe<PaginatedThreads>;
  getRepliesByCommentIdForGenericEntity?: Maybe<PaginatedThreads>;
  getReport?: Maybe<PaymentReportOutput>;
  getReportUrl?: Maybe<UrlOutput>;
  getReports: PaymentReportWithCountOutput;
  getRiseNoumApplicationResultAdmin?: Maybe<ApplicationResult>;
  getRiseNoumByClassIdForAdmin?: Maybe<ApplicationResultResponse>;
  getRiseReportCsvUrl: Scalars['String'];
  getRiseReports?: Maybe<RiseReportListOutput>;
  getRoles?: Maybe<Array<Maybe<UserRoleOutput>>>;
  getSOWListForAdmin?: Maybe<SowOutput>;
  getSecurityQuestionForReset: QuestionOutput;
  getSecurityQuestionsForReset: Array<QuestionOutput>;
  getSelectedAdCampaignDetails?: Maybe<AdCampaignOutput>;
  getSelectedInvoiceDetails: Array<InvoiceDetail>;
  getSignedURLForFileAccess?: Maybe<Scalars['String']>;
  getSignedUrl?: Maybe<Scalars['String']>;
  getSingleContract?: Maybe<Contract>;
  /** @deprecated Use getSingleContract instead */
  getSingleContractUnAuthenticated: Contract;
  getSingleSOW?: Maybe<Sow>;
  /** @deprecated Use getSingleSOW instead */
  getSingleSOWUnAuthenticated: Sow;
  getSingleTheme?: Maybe<ThemeOutput>;
  getSowReportCsvUrl: Scalars['String'];
  getSowReports?: Maybe<InvoiceToolReportOutputPaginated>;
  getSpaceById?: Maybe<SpaceOutput>;
  getSpaceByType?: Maybe<Array<Maybe<SpaceOutput>>>;
  getSpaceConfig?: Maybe<Array<Maybe<SpaceProfileValue>>>;
  /** @deprecated getSpaceConnectedMembers query is deprecated. Use getNoumConnectedMembers instead. */
  getSpaceConnectedMembers?: Maybe<SpaceOutputResponse>;
  /** @deprecated getSpaceConnections query is deprecated. Use getSpaceConnectionsV2 instead */
  getSpaceConnections?: Maybe<Array<Maybe<SpaceConnection>>>;
  getSpaceConnectionsV2?: Maybe<SpaceConnectionsResponse>;
  getSpaceConversations?: Maybe<ConversationsOutput>;
  getSpaceConversationsAsAdminQuery?: Maybe<ConversationsOutput>;
  getSpaceFollowers?: Maybe<SpaceOutputResponse>;
  getSpacesByUserId?: Maybe<Array<Maybe<SpaceOutput>>>;
  getSpotLightChambers?: Maybe<SpaceOutputResponse>;
  getStripePaymentMethod?: Maybe<Array<Maybe<PaymentMethodOutput>>>;
  getSubWalletBalance?: Maybe<SubWalletBalance>;
  getSubWalletBalanceByUser?: Maybe<SubWalletBalance>;
  getSubWalletEntries?: Maybe<Array<Maybe<SubWalletBalance>>>;
  getSubmittedOnboardingQuestionsAndAnswers?: Maybe<UserSelectedQuestionAndAnswersOutput>;
  getSubscriptionById: SubscriptionOutput;
  getSubscriptionPermissionsAndHomeNoumCounters?: Maybe<PermissionsHomeCountersOutput>;
  getSurveyAnswers: SurveyAnswer;
  getSurveyPageAnswer: SurveyAnswer;
  getTokenArchive?: Maybe<TokenArchive>;
  getUnreadMessageCount?: Maybe<Scalars['Int']>;
  getUserAccessData?: Maybe<UserAccessData>;
  getUserApplication?: Maybe<RiseUserDataOutput>;
  getUserApplications?: Maybe<Array<Maybe<RiseUserDataOutput>>>;
  getUserCampaigns?: Maybe<ProjectNoumCampaignResponse>;
  getUserConnections?: Maybe<Array<Maybe<UserOutput>>>;
  getUserCustomerDetails: Customer;
  getUserDeviceToken?: Maybe<UserDeviceTokenOutput>;
  getUserEmail?: Maybe<Scalars['String']>;
  getUserHistory?: Maybe<Array<Maybe<UserHistoryOutput>>>;
  getUserInvoiceLineItem?: Maybe<InvoiceLineItem>;
  getUserInvoiceLineItemList: UserInvoiceLineItemOutput;
  getUserListForTagging: Array<UserOutput>;
  getUserNetworks?: Maybe<Array<Maybe<NetworkOutput>>>;
  getUserNoums?: Maybe<SpaceOutputResponse>;
  getUserOwnedContacts: NoumContactPaginated;
  getUserPreferences?: Maybe<UserPreferences>;
  getUserReferralCode?: Maybe<Referral>;
  getUserSpace?: Maybe<Array<Maybe<SpaceOutput>>>;
  getUserStatusUpdateLogs: PaginatedLogsOutput;
  getUserSubmittedOnboardingQuestionsAndAnswers?: Maybe<UserSelectedQuestionAndAnswersOutputObject>;
  getUsersAddressByAdmin?: Maybe<Array<Maybe<AddressOutput>>>;
  getUsersPosts?: Maybe<PostOutputData>;
  getWalletBalance?: Maybe<FundingSourceBalanceOutput>;
  getinviteNonNoumenaMember?: Maybe<InviteNonNoumUsersOutput>;
  globalSearch: GlobalSearchResult;
  group?: Maybe<Group>;
  groupConnectionCheck?: Maybe<Array<Maybe<ConnectionCheck>>>;
  groupConnections?: Maybe<MembersOutput>;
  groupMembers?: Maybe<Group>;
  /** @deprecated groupPosts query is deprecated. */
  groupPosts?: Maybe<PostOutputData>;
  groupRequestForAdmin?: Maybe<InvitationOutput>;
  groups?: Maybe<GroupOutput>;
  healthCheck?: Maybe<Scalars['String']>;
  incomeData?: Maybe<IncomeDataOutput>;
  initTimezone?: Maybe<Timezone>;
  invoicePDFPreview: InvoicePdf;
  invoicePDFPreviewByID: InvoicePdf;
  isSocialHallAttendee?: Maybe<Array<Maybe<IsUserSocialHallAttendee>>>;
  listAllOpNotification?: Maybe<PaginationNotificationOp>;
  listBlockedCountries?: Maybe<BlockedCountryOutput>;
  listDraftOpNotification?: Maybe<PaginationNotificationOp>;
  listIndustries: IndustryListOutput;
  listSentOpNotification?: Maybe<PaginationNotificationOp>;
  listUserInvitesForAdmin?: Maybe<OutputListUserInvitesForAdmin>;
  listUsersForAdmin?: Maybe<UserOutputListUsersForAdmin>;
  myCircle?: Maybe<SpaceOutputResponse>;
  myFeed?: Maybe<PostOutputData>;
  /** @deprecated myGroupsFeed query is deprecated. */
  myGroupsFeed?: Maybe<PostOutputData>;
  neuroprofiler?: Maybe<NeuroProfileQueries>;
  note?: Maybe<Note>;
  notes?: Maybe<AllNotesOutput>;
  notificationV2?: Maybe<Notification>;
  notifications?: Maybe<Notifications>;
  notificationsUnreadCount?: Maybe<UnreadNotificationCount>;
  notificationsV2?: Maybe<NotificationsV2>;
  noumContacts: PaginatedSearchableNoumContact;
  noumFile?: Maybe<NoumFile>;
  noumFiles: PaginatedNoumFiles;
  noumMember?: Maybe<NoumMember>;
  noumMembers: PaginatedSearchableNoumMember;
  noumRoleGroupedPermissions: Array<NoumRolePermissionGroup>;
  noumRoleHistoryLog: NoumRoleHistoryLogOutput;
  noumRolePermissions: Array<NoumRolePermission>;
  noumRoles: PaginatedNoumRoles;
  paymentConfig?: Maybe<PaymentConfigOutput>;
  payments?: Maybe<PaymentCountOutput>;
  pingSurvey: Scalars['String'];
  popularNoums?: Maybe<SpaceOutputResponse>;
  post?: Maybe<PostOutput>;
  postComments?: Maybe<CommentsWithPagination>;
  postConnectionGroupsIds?: Maybe<UserConnectionGroupsId>;
  preCalculateNoumLinkData?: Maybe<PreCalculateNoumLinkData>;
  preDefinedMessages: Array<Scalars['String']>;
  previewWithSign?: Maybe<PdfPreview>;
  principles?: Maybe<PrinciplesQueries>;
  product?: Maybe<Scalars['String']>;
  productDetails?: Maybe<ProductOutput>;
  productProfiles?: Maybe<Array<Maybe<ProductProfile>>>;
  profileCheckResult?: Maybe<ProfileCheckResult>;
  reactions?: Maybe<ReactionOutput>;
  receivedConnectionRequest?: Maybe<ConnectionOutputResponse>;
  receivedNoumConnectionInvites: PaginatedNoumPendingConnections;
  receivedNoumConnectionRequests: PaginatedNoumPendingConnections;
  recentNoums: SpaceOutputResponse;
  recentSearches: RecentSearchesResult;
  recommendedUsersWithCompleteProfile?: Maybe<UserOutputAllUsers>;
  requestedConnection?: Maybe<ConnectionOutputResponse>;
  /** searchEngine query is only for demonstration/healthcheck purposes */
  searchEngine?: Maybe<ExampleType>;
  searchGroups?: Maybe<GroupOutput>;
  sentNoumConnectionInvites: PaginatedNoumPendingConnections;
  sentNoumConnectionRequests: PaginatedNoumPendingConnections;
  skills?: Maybe<SkillsOutput>;
  socialHall?: Maybe<SocialHall>;
  socialHallAttendee?: Maybe<SocialHallAttendees>;
  socialHallById?: Maybe<SocialHall>;
  socialHallByName?: Maybe<SocialHall>;
  socialHallGroupById?: Maybe<SocialGroup>;
  socialHallGroups?: Maybe<SocialGroups>;
  testEvents?: Maybe<Scalars['String']>;
  testToken?: Maybe<TokenLedger>;
  testUserData?: Maybe<TestDataOutput>;
  timezones?: Maybe<PaginatedTimezoneData>;
  tokenTransaction?: Maybe<TokenTransactionHistory>;
  triggerHourlyEmailNotifcations?: Maybe<Scalars['Boolean']>;
  underwriting?: Maybe<UnderwritingQueries>;
  updateOldConnectionHomeNoum?: Maybe<Scalars['Boolean']>;
  uploadCustomerDocuments?: Maybe<UploadDocumentOutput>;
  user?: Maybe<UserOutput>;
  userActiveKnocks?: Maybe<Knocks>;
  userActiveSocialHallGroup?: Maybe<SocialGroup>;
  userAddress?: Maybe<AddressOutput>;
  userAdminGroup?: Maybe<Array<Maybe<Scalars['ID']>>>;
  userBankList?: Maybe<Array<Maybe<ChameleonBankListOutput>>>;
  userBySkillId?: Maybe<DiscoveryResponse>;
  userChamProfile?: Maybe<UserDataOutput>;
  userCompletedApplication?: Maybe<RiseUserDataOutput>;
  userConnections?: Maybe<UserOutputAllUsers>;
  userConnectionsForAdmin?: Maybe<UserOutputAllUsers>;
  userCreditCheck?: Maybe<Scalars['String']>;
  userDiscovery?: Maybe<Discovery>;
  userFavourites: UserFavouritesOutput;
  userGroupInviteRequest?: Maybe<InvitationOutput>;
  userGroupSentRequest?: Maybe<InvitationOutput>;
  userGroupsUpdate?: Maybe<Scalars['Boolean']>;
  userInviteRequest?: Maybe<Array<Maybe<Invitation>>>;
  userJoinRequestForGroups?: Maybe<InvitationOutput>;
  userKyc?: Maybe<KycOutput>;
  userKycForAdmin?: Maybe<KycOutput>;
  userKycResult?: Maybe<Scalars['String']>;
  userLogin?: Maybe<LoginOutput>;
  userMembers: PaginatedNoumMembers;
  userMonthlyData?: Maybe<UserMonthlyDataOutput>;
  userOwnKnocks?: Maybe<Knocks>;
  userPosts?: Maybe<PostOutputData>;
  userReferralEntry?: Maybe<Referral>;
  userRiseBankList?: Maybe<Array<Maybe<RiseBankListOutput>>>;
  userRiseProfile?: Maybe<RiseUserDataOutput>;
  userSentRequest?: Maybe<Array<Maybe<Invitation>>>;
  users: Array<UserOutput>;
  usersGroups?: Maybe<UserOutputCount>;
  usersSearchAdmin?: Maybe<UserSearchResponse>;
  validateInvoiceSequence: ValidateInvoiceSequenceOutput;
  validateReferralCode?: Maybe<Scalars['Boolean']>;
  validateText?: Maybe<Scalars['Boolean']>;
};


export type QueryAccountLogsArgs = {
  accountId?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  targets?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryAccountPaymentDetailsArgs = {
  accountNumber: Scalars['String'];
  isPublished?: InputMaybe<Scalars['Boolean']>;
};


export type QueryAccountStatmentDetailsArgs = {
  accountNumber: Scalars['String'];
  isPublished?: InputMaybe<Scalars['Boolean']>;
};


export type QueryAllNoumsContactsArgs = {
  input: AllNoumsContactsInput;
};


export type QueryAllNoumsContactsForAdminArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  search?: InputMaybe<Scalars['String']>;
};


export type QueryAllUsersArgs = {
  activeUserOnly?: InputMaybe<Scalars['Boolean']>;
  chamberId?: InputMaybe<Scalars['ID']>;
  filter?: InputMaybe<SearchUserFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  oldConnectionFlow?: InputMaybe<Scalars['Boolean']>;
  search?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<UserRelationType>;
};


export type QueryCanUserJoinEventArgs = {
  eventId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type QueryCheckForAdminArgs = {
  uid: Scalars['ID'];
};


export type QueryCheckIfSlugExistsArgs = {
  slug: Scalars['String'];
};


export type QueryCheckPaymentRetryArgs = {
  id: Scalars['String'];
};


export type QueryCheckWalletExistDetailArgs = {
  invoiceId?: InputMaybe<Scalars['ID']>;
  noumId: Scalars['ID'];
  sourceUserId: Scalars['ID'];
  targetUserId: Scalars['ID'];
};


export type QueryCheckWalletExistsArgs = {
  targetUserId: Scalars['ID'];
};


export type QueryConnectedNoumsArgs = {
  input?: InputMaybe<ConnectedNoumsInput>;
};


export type QueryConnectionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryCustomerBankListArgs = {
  customerId?: InputMaybe<Scalars['String']>;
};


export type QueryCustomerContractDetailsArgs = {
  customerId?: InputMaybe<Scalars['String']>;
};


export type QueryCustomerListArgs = {
  end?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<CustomerSearch>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  start?: InputMaybe<Scalars['String']>;
};


export type QueryCustomerLogsArgs = {
  customerId?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  targets?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryCustomerPersonalDetailsArgs = {
  customerId?: InputMaybe<Scalars['String']>;
};


export type QueryCustomersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<CustomerSearch>;
};


export type QueryDailyRecommendationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryDownloadInvoicePdfArgs = {
  id: Scalars['ID'];
};


export type QueryDwollaTransactionsArgs = {
  filter?: InputMaybe<ExportCsvFilter>;
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type QueryExportCsvArgs = {
  fileHeaders: Scalars['String'];
  filter?: InputMaybe<ExportCsvFilter>;
  title: ReportExportTitle;
};


export type QueryFindSpaceBySearchQueryArgs = {
  type?: InputMaybe<SpaceTypeEnum>;
  uid?: InputMaybe<Scalars['ID']>;
};


export type QueryGetAccountByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetAccountListArgs = {
  query: AccountListInput;
};


export type QueryGetAccountListByUserArgs = {
  userId: Scalars['String'];
};


export type QueryGetAccountListV2Args = {
  query: AccountListInput;
};


export type QueryGetAdCampaignCsvReportUrlArgs = {
  id: Scalars['ID'];
};


export type QueryGetAdCampaignCsvReportsArgs = {
  pagination?: InputMaybe<ChamberPaginationInput>;
};


export type QueryGetAdCampaignListAdminArgs = {
  filters: Array<InputMaybe<CommonFilter>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryGetAdCampaignOfferOneArgs = {
  id: Scalars['String'];
};


export type QueryGetAdCampaignOffersArgs = {
  campaignId: Scalars['String'];
  pagination?: InputMaybe<ChamberPaginationInput>;
};


export type QueryGetAdCampaignOffersAllArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetAdCampaignReportOneArgs = {
  id: Scalars['String'];
};


export type QueryGetAdCampaignReportsArgs = {
  campaignId: Scalars['ID'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};


export type QueryGetAdCampaignSettingsArgs = {
  input?: InputMaybe<AdCampaignSettingsInput>;
};


export type QueryGetAdCampaignsByUserArgs = {
  filter?: InputMaybe<AdCampaignFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetAdEnabledNoumsArgs = {
  filter?: InputMaybe<AdEnabledNoumFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetAdKeywordsArgs = {
  options?: InputMaybe<PromptOptionsInput>;
  promptText: Scalars['String'];
};


export type QueryGetAdminReportByIdArgs = {
  reportId: Scalars['ID'];
};


export type QueryGetAdminReportSignedUrlArgs = {
  reportPath: Scalars['String'];
};


export type QueryGetAdminReportsByTypeArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  reportType: AdminReportType;
};


export type QueryGetAllInvoicesArgs = {
  input: InvoiceGetAllInput;
};


export type QueryGetAllNoumsArgs = {
  fetchOwn?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<GetAllNoumFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetAllNoumsTransactionsArgs = {
  input: NoumTransactionPaginationInput;
};


export type QueryGetAllPaymentsArgs = {
  filter?: InputMaybe<PaymentFilter>;
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type QueryGetAllPlansDetailsArgs = {
  forPurchase: Scalars['Boolean'];
};


export type QueryGetAllSowArgs = {
  filter?: InputMaybe<GetAllSowFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  viewingAs?: InputMaybe<ContractListingPov>;
};


export type QueryGetAllSurveysArgs = {
  input: SurveyInputGetAll;
};


export type QueryGetAllThemesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetAllTokenArchivesArgs = {
  filter?: InputMaybe<TokenArchiveFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetAllUidForChamberPostsArgs = {
  chamberId: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetAllUserGroupsForAdminArgs = {
  ADMIN?: InputMaybe<Params>;
  MEMBER?: InputMaybe<Params>;
  uid: Scalars['ID'];
};


export type QueryGetAppActivitiesArgs = {
  filter: AppActivityFilter;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetAvailableItemsByFamilyArgs = {
  familyName: Scalars['String'];
  planType: Scalars['String'];
};


export type QueryGetAvailablePlansArgs = {
  input: AvailablePlansFilterInput;
};


export type QueryGetBankAccountBalanceArgs = {
  id: Scalars['String'];
};


export type QueryGetBroadcastedProjectNoumsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetCategoryWithSkillsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryGetCommentByIdArgs = {
  commentId: Scalars['ID'];
  postId: Scalars['ID'];
};


export type QueryGetCommentByIdForGenericEntityArgs = {
  commentId: Scalars['ID'];
};


export type QueryGetCommentsForGenericEntityArgs = {
  entityId: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sortOrder?: InputMaybe<SortOrder>;
};


export type QueryGetConnectedChamberPaymentsArgs = {
  filter?: InputMaybe<PaymentFilter>;
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type QueryGetConnectedSpacesArgs = {
  filter?: InputMaybe<ProjectChamberFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SortType>;
  uid?: InputMaybe<Scalars['ID']>;
};


export type QueryGetConnectionByIdArgs = {
  connectionId: Scalars['ID'];
};


export type QueryGetConsignorsArgs = {
  pov: ContractListingPov;
};


export type QueryGetContactConnectionWithNoumArgs = {
  contactId: Scalars['ID'];
  noumId: Scalars['ID'];
};


export type QueryGetContractListArgs = {
  filter?: InputMaybe<ContractFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  viewingAs?: InputMaybe<ContractListingPov>;
};


export type QueryGetContractListForAdminArgs = {
  filter?: InputMaybe<ContractFilterForAdmin>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetContractReportCsvUrlArgs = {
  id: Scalars['ID'];
};


export type QueryGetContractReportsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetConversationArgs = {
  spaceId?: InputMaybe<Scalars['ID']>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};


export type QueryGetConversationByCidArgs = {
  cid?: InputMaybe<Scalars['String']>;
};


export type QueryGetConversationsArgs = {
  filter?: InputMaybe<SearchFilterForConversation>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetCookieConsentArgs = {
  cookieConsentId: Scalars['String'];
};


export type QueryGetCustomerAuditLogsArgs = {
  customerId?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetCustomerDocumentUrlArgs = {
  id: Scalars['String'];
  uploadFor: UploadFor;
};


export type QueryGetCustomerDocumentsArgs = {
  customerId: Scalars['String'];
};


export type QueryGetCustomerLimitsV2Args = {
  destinationAccountId: Scalars['ID'];
  invoicePayment?: InputMaybe<Scalars['Boolean']>;
  sourceAccountId: Scalars['ID'];
};


export type QueryGetCustomerPayeeListV2Args = {
  query: SearchInput;
};


export type QueryGetCustomersArgs = {
  filter?: InputMaybe<CustomersFilter>;
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type QueryGetDefaultNoumTransactionFeeDetailsArgs = {
  defaulInput: DefaultNoumTransactionFeeDetailInput;
};


export type QueryGetDocumentByEnvelopeIdArgs = {
  envelopeId?: InputMaybe<Scalars['String']>;
};


export type QueryGetDocumentUploadUrlArgs = {
  input: UploadDcoumentInput;
};


export type QueryGetElementArgs = {
  elementId: Scalars['ID'];
  spaceId: Scalars['ID'];
  status?: InputMaybe<ElementStatusEnum>;
};


export type QueryGetElementListArgs = {
  type?: InputMaybe<SpaceTypeEnum>;
};


export type QueryGetEventAttendeesArgs = {
  _id: Scalars['ID'];
  filter?: InputMaybe<EventAttendeesFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetEventByIdArgs = {
  _id: Scalars['ID'];
};


export type QueryGetEventCounterArgs = {
  chamberId: Scalars['ID'];
  filter?: InputMaybe<FilterEvents>;
};


export type QueryGetEventUserRoleArgs = {
  eventId: Scalars['ID'];
  userId?: InputMaybe<Scalars['ID']>;
};


export type QueryGetEventsArgs = {
  chamberId: Scalars['ID'];
  filter?: InputMaybe<FilterEvents>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sortOrder?: InputMaybe<SortOrder>;
};


export type QueryGetEventsV2Args = {
  chamberId: Scalars['ID'];
  filter?: InputMaybe<FilterEvents>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sortOrder?: InputMaybe<SortOrder>;
};


export type QueryGetFeaturedNoumsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetFollowingSpacesArgs = {
  filter?: InputMaybe<ProjectChamberFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SortType>;
  uid?: InputMaybe<Scalars['ID']>;
};


export type QueryGetHomeSpaceConversationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  spaceId?: InputMaybe<Scalars['ID']>;
  uid?: InputMaybe<Scalars['ID']>;
};


export type QueryGetInvoiceAmountArgs = {
  id?: InputMaybe<Scalars['ID']>;
  invoiceId: Scalars['ID'];
};


export type QueryGetInvoiceByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetInvoiceDownloadUrlArgs = {
  invoice_id: Scalars['String'];
};


export type QueryGetInvoiceHistoryArgs = {
  id: Scalars['Float'];
};


export type QueryGetInvoiceListArgs = {
  filter: InvoiceQueryInput;
};


export type QueryGetInvoiceListForAdminArgs = {
  filter: InvoiceQueryInputForAdmin;
};


export type QueryGetInvoicePaymentArgs = {
  id: Scalars['ID'];
};


export type QueryGetInvoicePaymentByPaymentIdArgs = {
  paymentId: Scalars['String'];
};


export type QueryGetInvoicePaymentsArgs = {
  invoiceId: Scalars['ID'];
};


export type QueryGetInvoiceReportsArgs = {
  limit: Scalars['Float'];
  skip: Scalars['Float'];
};


export type QueryGetInvoiceSequenceArgs = {
  noumId: Scalars['ID'];
};


export type QueryGetInvoiceTimeLinesArgs = {
  invoiceId: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetInvoiceToolReportCsvUrlArgs = {
  id: Scalars['ID'];
};


export type QueryGetInvoiceToolReportsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetInvoicesArgs = {
  input?: InputMaybe<InvoiceFetchInput>;
};


export type QueryGetKycCustomerArgs = {
  id: Scalars['String'];
};


export type QueryGetKycCustomersArgs = {
  filter?: InputMaybe<CustomerKycFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetLinkedNoumsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  noumLinkId: Scalars['ID'];
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetLinkedSoWsArgs = {
  contractId: Scalars['ID'];
  filter?: InputMaybe<GetLinkedSoWsFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetLocationArgs = {
  search: Scalars['String'];
};


export type QueryGetMasterWalletBalanceArgs = {
  userId: Scalars['ID'];
};


export type QueryGetNoumActivityLogArgs = {
  filter?: InputMaybe<NoumActivityLogFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  noumId: Scalars['ID'];
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetNoumActivityStatsArgs = {
  filter?: InputMaybe<NoumActivityStatsFilter>;
  noumId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type QueryGetNoumClassByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetNoumClassByNoumIdArgs = {
  noumId: Scalars['ID'];
};


export type QueryGetNoumClassListArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<NoumClassQuery>;
};


export type QueryGetNoumConnectedMembersArgs = {
  includeNoumOwner?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  noumId: Scalars['ID'];
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SortType>;
};


export type QueryGetNoumConnectionsKpIsArgs = {
  from?: InputMaybe<Scalars['ISODate']>;
  granularity?: InputMaybe<NoumKpiGranularity>;
  noumId: Scalars['ID'];
  to?: InputMaybe<Scalars['ISODate']>;
};


export type QueryGetNoumConnectionsWithinTimeframeArgs = {
  connectionType?: InputMaybe<NoumConnectionsWithinTimeframeType>;
  from?: InputMaybe<Scalars['ISODate']>;
  limit?: InputMaybe<Scalars['Int']>;
  noumId: Scalars['ID'];
  offset?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<Scalars['ISODate']>;
};


export type QueryGetNoumFollowersKpIsArgs = {
  from?: InputMaybe<Scalars['ISODate']>;
  granularity?: InputMaybe<NoumKpiGranularity>;
  noumId: Scalars['ID'];
  to?: InputMaybe<Scalars['ISODate']>;
};


export type QueryGetNoumFollowersWithinTimeframeQueryArgs = {
  followStatus?: InputMaybe<NoumFollowWithinTimeframeType>;
  from?: InputMaybe<Scalars['ISODate']>;
  limit?: InputMaybe<Scalars['Int']>;
  noumId: Scalars['ID'];
  offset?: InputMaybe<Scalars['Int']>;
  to?: InputMaybe<Scalars['ISODate']>;
};


export type QueryGetNoumLinkArgs = {
  noumLinkId: Scalars['ID'];
};


export type QueryGetNoumLinkConnectionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  noumLinkId: Scalars['ID'];
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SortType>;
};


export type QueryGetNoumLinkFollowersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  noumLinkId: Scalars['ID'];
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SortType>;
};


export type QueryGetNoumLinkedNoumsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  noumId: Scalars['ID'];
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetNoumLinksArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sorting?: InputMaybe<NoumLinkSorting>;
};


export type QueryGetNoumProgramByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetNoumProgramListArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<NoumProgramQuery>;
};


export type QueryGetNoumProgramresultByIdArgs = {
  noumId: Scalars['ID'];
};


export type QueryGetNoumReferencesArgs = {
  experienceId: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<Array<InputMaybe<NoumReferenceStatus>>>;
};


export type QueryGetNoumTransactionFeeDetailsArgs = {
  noumDetailInput: NoumTransactionDetailInputType;
};


export type QueryGetNoumTransactionHistoryArgs = {
  id: Scalars['Float'];
};


export type QueryGetNoumsByStatusArgs = {
  input: NoumTransactionStatusInputType;
};


export type QueryGetNoumsLinkedToContractsArgs = {
  pov: ContractListingPov;
};


export type QueryGetNoumsLinkedToSoWsArgs = {
  pov: ContractListingPov;
};


export type QueryGetOnboardingQuestionAndAnswersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetOneSurveyArgs = {
  _id: Scalars['String'];
};


export type QueryGetOneSurveyPageArgs = {
  _id: Scalars['String'];
};


export type QueryGetOpNotificationArgs = {
  _id?: InputMaybe<Scalars['ID']>;
};


export type QueryGetOpsAdminPermissionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryGetOpsPermissionArgs = {
  userId: Scalars['ID'];
};


export type QueryGetOtpStatsArgs = {
  email: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
  startDate?: InputMaybe<Scalars['String']>;
};


export type QueryGetOwnProjectChambersArgs = {
  filter?: InputMaybe<ProjectChamberFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SortType>;
};


export type QueryGetPaymentByIdArgs = {
  _id?: InputMaybe<Scalars['ID']>;
};


export type QueryGetPaymentConfigByNameArgs = {
  name: Scalars['String'];
};


export type QueryGetPaymentProviderChargesArgs = {
  query?: InputMaybe<PaymentProviderChargesInput>;
};


export type QueryGetPaymentProvidersArgs = {
  filter?: InputMaybe<UpdatePaymentProviderInput>;
};


export type QueryGetPaymentTransactionsArgs = {
  id: Scalars['String'];
};


export type QueryGetPlanSettingByIdArgs = {
  planSettingId: Scalars['Float'];
};


export type QueryGetPostsByChamberIdArgs = {
  chamberId: Scalars['ID'];
  filter?: InputMaybe<PostFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SortType>;
};


export type QueryGetPreSignedUrlForFileUploadArgs = {
  fileUploadInput: FileUploadInput;
};


export type QueryGetProjectChamberCategoriesArgs = {
  type?: InputMaybe<ProjectChamberCategoriesEnum>;
};


export type QueryGetProjectChambersArgs = {
  fetchOwn?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<ProjectChamberFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetProjectChambersAdminArgs = {
  filter?: InputMaybe<ChamberFiltersAdmin>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sortOrder?: InputMaybe<SortType>;
};


export type QueryGetProjectChambersByUserIdArgs = {
  userId: Scalars['ID'];
};


export type QueryGetQuestionAnswersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  questionId: Scalars['ID'];
  spaceId: Scalars['ID'];
};


export type QueryGetQuestionByIdArgs = {
  questionId: Scalars['ID'];
};


export type QueryGetQuestionsForSpaceArgs = {
  filter?: InputMaybe<QuestionsFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<SortType>;
  spaceId: Scalars['ID'];
};


export type QueryGetRecommendedNoumsArgs = {
  filter?: InputMaybe<SpaceCategoryFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetReferredUserArgs = {
  _id: Scalars['ID'];
};


export type QueryGetRegistrationOtpArgs = {
  email: Scalars['String'];
};


export type QueryGetRenewalTokenArgs = {
  institutionId?: InputMaybe<Scalars['String']>;
};


export type QueryGetRepliesByCommentIdArgs = {
  commentId?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sortOrder?: InputMaybe<SortOperator>;
};


export type QueryGetRepliesByCommentIdForGenericEntityArgs = {
  commentId: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetReportArgs = {
  id: Scalars['ID'];
};


export type QueryGetReportUrlArgs = {
  fileType?: InputMaybe<ExportFileType>;
  id: Scalars['ID'];
};


export type QueryGetReportsArgs = {
  query?: InputMaybe<ReportFilters>;
};


export type QueryGetRiseNoumApplicationResultAdminArgs = {
  id: Scalars['ID'];
};


export type QueryGetRiseNoumByClassIdForAdminArgs = {
  classId: Scalars['ID'];
  filter?: InputMaybe<ApplicationFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetRiseReportCsvUrlArgs = {
  id: Scalars['ID'];
};


export type QueryGetRiseReportsArgs = {
  pagination?: InputMaybe<ChamberPaginationInput>;
  type: RiseReportTypes;
};


export type QueryGetSowListForAdminArgs = {
  filter?: InputMaybe<SowFilterForAdmin>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetSelectedAdCampaignDetailsArgs = {
  campaignId: Scalars['ID'];
};


export type QueryGetSelectedInvoiceDetailsArgs = {
  input?: InputMaybe<SelectedInvoiceInput>;
};


export type QueryGetSignedUrlForFileAccessArgs = {
  fileAccessInput: FileAccessInput;
};


export type QueryGetSignedUrlArgs = {
  fileName?: InputMaybe<Scalars['String']>;
};


export type QueryGetSingleContractArgs = {
  _id: Scalars['ID'];
};


export type QueryGetSingleContractUnAuthenticatedArgs = {
  _id: Scalars['ID'];
};


export type QueryGetSingleSowArgs = {
  _id: Scalars['ID'];
};


export type QueryGetSingleSowUnAuthenticatedArgs = {
  _id: Scalars['ID'];
};


export type QueryGetSingleThemeArgs = {
  _id: Scalars['ID'];
};


export type QueryGetSowReportCsvUrlArgs = {
  id: Scalars['ID'];
};


export type QueryGetSowReportsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetSpaceByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetSpaceByTypeArgs = {
  type: SpaceTypeEnum;
};


export type QueryGetSpaceConfigArgs = {
  type: SpaceTypeEnum;
};


export type QueryGetSpaceConnectedMembersArgs = {
  includeNoumOwner?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  spaceId: Scalars['ID'];
  spaceType?: InputMaybe<SpaceTypeEnum>;
};


export type QueryGetSpaceConnectionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  spaceId: Scalars['ID'];
  status?: InputMaybe<ConnectionRequestTypeEnum>;
};


export type QueryGetSpaceConnectionsV2Args = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  spaceId: Scalars['ID'];
  status?: InputMaybe<Array<InputMaybe<ConnectionRequestTypeEnum>>>;
};


export type QueryGetSpaceConversationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  spaceId: Scalars['ID'];
};


export type QueryGetSpaceConversationsAsAdminQueryArgs = {
  filter?: InputMaybe<SearchChamberAdminFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  spaceId: Scalars['ID'];
};


export type QueryGetSpaceFollowersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  spaceId?: InputMaybe<Scalars['ID']>;
};


export type QueryGetSpotLightChambersArgs = {
  filter?: InputMaybe<SpotlightChamberFilters>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetSubWalletBalanceArgs = {
  chamberId: Scalars['String'];
};


export type QueryGetSubWalletBalanceByUserArgs = {
  chamberId: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryGetSubWalletEntriesArgs = {
  chamberId: Scalars['String'];
};


export type QueryGetSubmittedOnboardingQuestionsAndAnswersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetSubscriptionByIdArgs = {
  subscription_id: Scalars['Float'];
};


export type QueryGetSubscriptionPermissionsAndHomeNoumCountersArgs = {
  homeNoumId: Scalars['String'];
};


export type QueryGetSurveyAnswersArgs = {
  survey: Scalars['String'];
};


export type QueryGetSurveyPageAnswerArgs = {
  page: Scalars['String'];
  survey: Scalars['String'];
};


export type QueryGetTokenArchiveArgs = {
  _id?: InputMaybe<Scalars['ID']>;
};


export type QueryGetUserApplicationArgs = {
  applicationId?: InputMaybe<Scalars['String']>;
};


export type QueryGetUserApplicationsArgs = {
  uid?: InputMaybe<Scalars['String']>;
};


export type QueryGetUserCampaignsArgs = {
  filter?: InputMaybe<ProjectNoumCampaignFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetUserConnectionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  uid: Scalars['ID'];
};


export type QueryGetUserDeviceTokenArgs = {
  uid?: InputMaybe<Scalars['ID']>;
};


export type QueryGetUserHistoryArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetUserInvoiceLineItemArgs = {
  _id: Scalars['ID'];
};


export type QueryGetUserInvoiceLineItemListArgs = {
  filter: InvoiceSearchInput;
};


export type QueryGetUserListForTaggingArgs = {
  search?: InputMaybe<Scalars['String']>;
};


export type QueryGetUserNetworksArgs = {
  uid?: InputMaybe<Scalars['ID']>;
};


export type QueryGetUserNoumsArgs = {
  filter?: InputMaybe<UserNoumsFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  uid?: InputMaybe<Scalars['ID']>;
};


export type QueryGetUserOwnedContactsArgs = {
  filter?: InputMaybe<Contactfilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetUserReferralCodeArgs = {
  uid?: InputMaybe<Scalars['ID']>;
};


export type QueryGetUserSpaceArgs = {
  userId: Scalars['ID'];
};


export type QueryGetUserStatusUpdateLogsArgs = {
  _id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetUserSubmittedOnboardingQuestionsAndAnswersArgs = {
  userId?: InputMaybe<Scalars['ID']>;
};


export type QueryGetUsersAddressByAdminArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  userStatus?: InputMaybe<UserStatus>;
};


export type QueryGetUsersPostsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetinviteNonNoumenaMemberArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  noumId: Scalars['ID'];
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGlobalSearchArgs = {
  entityType?: InputMaybe<EntityType>;
  excludeEntityTypes?: InputMaybe<Array<InputMaybe<EntityType>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  userStatus?: InputMaybe<GlobalSearchUserEntityStatus>;
  userStatuses?: InputMaybe<Array<InputMaybe<GlobalSearchUserEntityStatus>>>;
};


export type QueryGroupArgs = {
  _id: Scalars['ID'];
};


export type QueryGroupConnectionCheckArgs = {
  _id: Scalars['ID'];
  userIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};


export type QueryGroupConnectionsArgs = {
  _id: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryGroupMembersArgs = {
  _id?: InputMaybe<Scalars['ID']>;
};


export type QueryGroupPostsArgs = {
  groupId: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGroupRequestForAdminArgs = {
  _id: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGroupsArgs = {
  filter?: InputMaybe<SearchGroupInvite>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryIncomeDataArgs = {
  customerId?: InputMaybe<Scalars['String']>;
};


export type QueryInitTimezoneArgs = {
  timezone: Scalars['String'];
};


export type QueryInvoicePdfPreviewArgs = {
  data?: InputMaybe<InvoicePdfInput>;
};


export type QueryInvoicePdfPreviewByIdArgs = {
  id: Scalars['ID'];
};


export type QueryIsSocialHallAttendeeArgs = {
  socialHallIds: Array<Scalars['ID']>;
};


export type QueryListAllOpNotificationArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryListBlockedCountriesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryListDraftOpNotificationArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryListIndustriesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryListSentOpNotificationArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryListUserInvitesForAdminArgs = {
  filter?: InputMaybe<ListUserInvitesForAdminFilterInput>;
  orderBy?: InputMaybe<OrderBy>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  userId: Scalars['ID'];
};


export type QueryListUsersForAdminArgs = {
  filter?: InputMaybe<ListUsersForAdminFilterInput>;
  orderBy?: InputMaybe<OrderBy>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryMyCircleArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryMyFeedArgs = {
  filter?: InputMaybe<MyFeedFilters>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryMyGroupsFeedArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryNoteArgs = {
  noteId: Scalars['ID'];
};


export type QueryNotesArgs = {
  input?: InputMaybe<NotesInput>;
};


export type QueryNotificationV2Args = {
  _id: Scalars['ID'];
};


export type QueryNotificationsArgs = {
  filter?: InputMaybe<NotificationFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryNotificationsUnreadCountArgs = {
  type?: InputMaybe<Array<InputMaybe<NotificationType>>>;
};


export type QueryNotificationsV2Args = {
  filter?: InputMaybe<NotificationFilterV2>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryNoumContactsArgs = {
  input: SearchNoumContactsInput;
};


export type QueryNoumFileArgs = {
  id: Scalars['ID'];
};


export type QueryNoumFilesArgs = {
  input: GetNoumFilesInput;
};


export type QueryNoumMemberArgs = {
  memberId: Scalars['ID'];
};


export type QueryNoumMembersArgs = {
  input?: InputMaybe<NoumMembersInput>;
};


export type QueryNoumRoleHistoryLogArgs = {
  input: NoumRoleHistoryLogInput;
};


export type QueryNoumRolesArgs = {
  filterBy?: InputMaybe<FilterNoumRoleByValue>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<NoumRoleOrderInput>;
};


export type QueryPaymentsArgs = {
  filter?: InputMaybe<PaymentFilter>;
  limit: Scalars['Int'];
  page: Scalars['Int'];
};


export type QueryPopularNoumsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryPostArgs = {
  _id?: InputMaybe<Scalars['ID']>;
};


export type QueryPostCommentsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  postId: Scalars['ID'];
};


export type QueryPostConnectionGroupsIdsArgs = {
  _id?: InputMaybe<Scalars['ID']>;
};


export type QueryPreCalculateNoumLinkDataArgs = {
  linkedNoumIDs: Array<Scalars['ID']>;
};


export type QueryPreviewWithSignArgs = {
  _id: Scalars['ID'];
  contactId: Scalars['ID'];
  entity: ContractOrSow;
};


export type QueryProductDetailsArgs = {
  code: Scalars['String'];
};


export type QueryReactionsArgs = {
  _id?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryReceivedConnectionRequestArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  spaceId?: InputMaybe<Scalars['ID']>;
  status?: InputMaybe<ConnectionRequestStatus>;
};


export type QueryReceivedNoumConnectionInvitesArgs = {
  input: ChambersMicroservicePaginationPayload;
};


export type QueryReceivedNoumConnectionRequestsArgs = {
  input: ChambersMicroservicePaginationPayload;
};


export type QueryRecentNoumsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryRecommendedUsersWithCompleteProfileArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryRequestedConnectionArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  requestFrom?: InputMaybe<Scalars['ID']>;
  status?: InputMaybe<ConnectionRequestStatus>;
};


export type QuerySearchGroupsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<SearchGroupsSortBy>;
};


export type QuerySentNoumConnectionInvitesArgs = {
  input: ChambersMicroservicePaginationPayload;
};


export type QuerySentNoumConnectionRequestsArgs = {
  input: ChambersMicroservicePaginationPayload;
};


export type QuerySocialHallArgs = {
  type: Scalars['String'];
};


export type QuerySocialHallAttendeeArgs = {
  includeGroupUsers?: InputMaybe<Scalars['Boolean']>;
  limit: Scalars['Int'];
  location?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  offset: Scalars['Int'];
  socialHallId: Scalars['ID'];
};


export type QuerySocialHallByIdArgs = {
  id?: InputMaybe<Scalars['ID']>;
};


export type QuerySocialHallByNameArgs = {
  name: Scalars['String'];
};


export type QuerySocialHallGroupByIdArgs = {
  id: Scalars['ID'];
};


export type QuerySocialHallGroupsArgs = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  socialHallId: Scalars['ID'];
};


export type QueryTestTokenArgs = {
  chamberId: Scalars['ID'];
};


export type QueryTestUserDataArgs = {
  uid: Scalars['ID'];
};


export type QueryTimezonesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryTokenTransactionArgs = {
  chamberId: Scalars['ID'];
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};


export type QueryUpdateOldConnectionHomeNoumArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryUploadCustomerDocumentsArgs = {
  input: UploadDcoumentInput;
};


export type QueryUserArgs = {
  _id: Scalars['ID'];
};


export type QueryUserActiveKnocksArgs = {
  socialHallId?: InputMaybe<Scalars['ID']>;
};


export type QueryUserActiveSocialHallGroupArgs = {
  socialHallId?: InputMaybe<Scalars['ID']>;
};


export type QueryUserAdminGroupArgs = {
  userId?: InputMaybe<Scalars['ID']>;
};


export type QueryUserBySkillIdArgs = {
  column: Scalars['String'];
  operator: FilterOperator;
  skillIds: Array<Scalars['ID']>;
};


export type QueryUserConnectionsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  uid: Scalars['ID'];
};


export type QueryUserConnectionsForAdminArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  uid: Scalars['ID'];
};


export type QueryUserFavouritesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryUserGroupInviteRequestArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryUserGroupSentRequestArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryUserGroupsUpdateArgs = {
  input?: InputMaybe<Scalars['String']>;
};


export type QueryUserInviteRequestArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryUserJoinRequestForGroupsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryUserKycForAdminArgs = {
  userId: Scalars['ID'];
};


export type QueryUserLoginArgs = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};


export type QueryUserMembersArgs = {
  input?: InputMaybe<SearchMembersInput>;
};


export type QueryUserOwnKnocksArgs = {
  socialHallId?: InputMaybe<Scalars['ID']>;
};


export type QueryUserPostsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  uid: Scalars['ID'];
};


export type QueryUserReferralEntryArgs = {
  productKey?: InputMaybe<Scalars['String']>;
};


export type QueryUserSentRequestArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryUsersArgs = {
  filter?: InputMaybe<SearchUserFilter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryUsersGroupsArgs = {
  filter?: InputMaybe<SearchUserFilter>;
  groupId: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};


export type QueryUsersSearchAdminArgs = {
  input?: InputMaybe<SearchUserFilterAdmin>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sortOrder?: InputMaybe<SortType>;
};


export type QueryValidateInvoiceSequenceArgs = {
  invoiceId?: InputMaybe<Scalars['ID']>;
  noumId: Scalars['ID'];
  sequence: Scalars['String'];
};


export type QueryValidateReferralCodeArgs = {
  referralCode?: InputMaybe<Scalars['String']>;
};


export type QueryValidateTextArgs = {
  languageCode?: InputMaybe<LanguageCode>;
  text: Scalars['String'];
};

export type QuestionAndAnswers = {
  __typename?: 'QuestionAndAnswers';
  _id?: Maybe<Scalars['ID']>;
  options?: Maybe<Array<Maybe<AnswerOptions>>>;
  question?: Maybe<Scalars['String']>;
};

export type QuestionAndAnswersOutput = {
  __typename?: 'QuestionAndAnswersOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<QuestionAndAnswers>>>;
};

export type QuestionInput = {
  body: Scalars['String'];
  expiryDate?: InputMaybe<Scalars['String']>;
  questionImage?: InputMaybe<Scalars['String']>;
  spaceId: Scalars['ID'];
};

export type QuestionOutput = {
  __typename?: 'QuestionOutput';
  id: Scalars['String'];
  question: Scalars['String'];
};

export type QuestionOutputResponse = {
  __typename?: 'QuestionOutputResponse';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<NoumQuestionOutput>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

export enum QuestionStatusEnum {
  Active = 'ACTIVE',
  Answered = 'ANSWERED',
  Closed = 'CLOSED',
  Tipped = 'TIPPED'
}

export type QuestionUpdateInput = {
  body?: InputMaybe<Scalars['String']>;
  expiryDate?: InputMaybe<Scalars['String']>;
  questionImage?: InputMaybe<Scalars['String']>;
};

export type QuestionsAnswerOutput = {
  __typename?: 'QuestionsAnswerOutput';
  answer?: Maybe<Scalars['String']>;
  qid?: Maybe<Scalars['Int']>;
  question?: Maybe<Scalars['String']>;
};

export type QuestionsFilter = {
  status?: InputMaybe<QuestionStatusEnum>;
};

export type QuestionsInput = {
  answer?: InputMaybe<Scalars['String']>;
  qid?: InputMaybe<Scalars['Int']>;
  question?: InputMaybe<Scalars['String']>;
};

export type QuestionsOutput = {
  __typename?: 'QuestionsOutput';
  options?: Maybe<Array<Maybe<Scalars['String']>>>;
  qid?: Maybe<Scalars['Int']>;
  question?: Maybe<Scalars['String']>;
};

export type QuestionsRiseInput = {
  answer?: InputMaybe<Scalars['String']>;
  qid?: InputMaybe<Scalars['Int']>;
  question?: InputMaybe<Scalars['String']>;
};

export type QuestionsRiseOutput = {
  __typename?: 'QuestionsRiseOutput';
  answer?: Maybe<Scalars['String']>;
  qid?: Maybe<Scalars['Int']>;
  question?: Maybe<Scalars['String']>;
};

export type RaiseInvoicePaymentInput = {
  amount: Scalars['Float'];
  destinationAccountId: Scalars['String'];
  invoiceId: Scalars['ID'];
  passCode?: InputMaybe<Scalars['String']>;
  requestOriginator: RequestOriginator;
  sourceAccountId: Scalars['String'];
};

export type RaisePaymentOutput = {
  __typename?: 'RaisePaymentOutput';
  clientSecret?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  paymentId?: Maybe<Scalars['ID']>;
};

export type RaisedHandSubscriptionData = {
  __typename?: 'RaisedHandSubscriptionData';
  actionType?: Maybe<RaisedHandType>;
  userId?: Maybe<Scalars['ID']>;
};

export enum RaisedHandType {
  /** all users in group */
  Accepted = 'ACCEPTED',
  /** all users in group */
  Cancelled = 'CANCELLED',
  /** all users in group */
  Declined = 'DECLINED',
  /** all users in group */
  Raised = 'RAISED'
}

export type Reaction = {
  __typename?: 'Reaction';
  _id: Scalars['ID'];
  category?: Maybe<ReactionCategory>;
  createdAt?: Maybe<Scalars['Date']>;
  uid?: Maybe<UserOutput>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export enum ReactionCategory {
  Dislike = 'DISLIKE',
  Like = 'LIKE',
  Love = 'LOVE'
}

export type ReactionOutput = {
  __typename?: 'ReactionOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<Reaction>>>;
};

export type RearrangeSectionInNoumLayoutInput = {
  position: Scalars['Int'];
  sectionId: Scalars['ID'];
};

export type RecentSearchesResult = {
  __typename?: 'RecentSearchesResult';
  clickedEntities: GlobalSearchResult;
  searchedQueries: Array<Maybe<Scalars['String']>>;
};

export type RecurringDetails = {
  __typename?: 'RecurringDetails';
  custom?: Maybe<Scalars['Boolean']>;
  frequency?: Maybe<Frequency>;
  interval?: Maybe<Scalars['Int']>;
  monthDates?: Maybe<Array<Maybe<Scalars['Int']>>>;
  weekDays?: Maybe<Array<Maybe<WeekDays>>>;
};

export type RecurringDetailsInput = {
  custom?: InputMaybe<Scalars['Boolean']>;
  frequency?: InputMaybe<Frequency>;
  interval?: InputMaybe<Scalars['Int']>;
  monthDates?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  weekDays?: InputMaybe<Array<InputMaybe<WeekDays>>>;
};

export type Referral = {
  __typename?: 'Referral';
  _id?: Maybe<Scalars['ID']>;
  fastPass?: Maybe<Scalars['Boolean']>;
  maxAllowedCount?: Maybe<Scalars['Int']>;
  ownerPartnerId?: Maybe<Scalars['ID']>;
  ownerUserId?: Maybe<UserOutput>;
  referralCode?: Maybe<Scalars['String']>;
  usedBy?: Maybe<Array<Maybe<UserOutput>>>;
  usedCount?: Maybe<Scalars['Int']>;
};

export type ReferralInvite = {
  __typename?: 'ReferralInvite';
  referralCode?: Maybe<Scalars['String']>;
  referralInviteUserId?: Maybe<UserOutput>;
};

export type RenewedPlaidToken = {
  androidPackageName?: InputMaybe<Scalars['String']>;
  institutionId: Scalars['String'];
};

export type ReplyOutput = {
  __typename?: 'ReplyOutput';
  firstReply?: Maybe<ThreadOutput>;
  total?: Maybe<Scalars['Int']>;
  userIdList?: Maybe<Array<Maybe<ThreadUser>>>;
};

export enum ReportExportTitle {
  Customers = 'CUSTOMERS',
  DwollaTransactionExport = 'DWOLLA_TRANSACTION_EXPORT',
  Payments = 'PAYMENTS',
  PaymentKycCustomers = 'PAYMENT_KYC_CUSTOMERS'
}

export type ReportFilters = {
  createdBy?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['String']>;
  limit: Scalars['Int'];
  offset: Scalars['Int'];
  startDate?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<GroupReportTitle>;
  type?: InputMaybe<ReportTypeEnum>;
};

export enum ReportImportTitle {
  BulkPayment = 'BULK_PAYMENT',
  DwollaMassPayment = 'DWOLLA_MASS_PAYMENT'
}

export type ReportInput = {
  postId?: InputMaybe<Scalars['ID']>;
  reportText?: InputMaybe<Scalars['String']>;
  reportType?: InputMaybe<ReportType>;
};

export type ReportOutput = {
  __typename?: 'ReportOutput';
  createdAt?: Maybe<Scalars['Date']>;
  reportText?: Maybe<Scalars['String']>;
  reportType?: Maybe<ReportType>;
  uid?: Maybe<UserOutput>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export enum ReportType {
  Jerk = 'JERK',
  Offensive = 'OFFENSIVE',
  Other = 'OTHER',
  Safety = 'SAFETY'
}

export enum ReportTypeEnum {
  Download = 'Download',
  Upload = 'Upload'
}

export enum RequestOriginator {
  NoumenaMobile = 'NOUMENA_MOBILE',
  NoumenaOpsPortal = 'NOUMENA_OPS_PORTAL',
  NoumenaPartnerPortal = 'NOUMENA_PARTNER_PORTAL',
  NoumenaWeb = 'NOUMENA_WEB'
}

export enum RequestOriginatorsEnum {
  Chameleon = 'CHAMELEON',
  NoumenaMobile = 'NOUMENA_MOBILE',
  NoumenaOpsPortal = 'NOUMENA_OPS_PORTAL',
  NoumenaPartnerPortal = 'NOUMENA_PARTNER_PORTAL',
  NoumenaWeb = 'NOUMENA_WEB'
}

export type ResetPassCodeInput = {
  passCode: Scalars['String'];
  securityQuestion: SecurityQuestion;
};

export type ResignFromNoumCoManagerRoleInput = {
  disconnectFromNoum: Scalars['Boolean'];
  noumIDs: Array<Scalars['ID']>;
};

export type ResolutionOutput = {
  __typename?: 'ResolutionOutput';
  content?: Maybe<Scalars['String']>;
  resolutionType?: Maybe<Scalars['String']>;
};

export type ResultOutput = {
  __typename?: 'ResultOutput';
  name?: Maybe<Scalars['String']>;
  reasons?: Maybe<Array<Maybe<Scalars['String']>>>;
  result?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type RewritteNoumLayoutUnsavedChangesInput = {
  noumId: Scalars['ID'];
  sections: Scalars['JSONObject'];
};

export type RiseApplication = {
  __typename?: 'RiseApplication';
  alredayCreated?: Maybe<Scalars['Boolean']>;
  data?: Maybe<SpaceOutput>;
};

export type RiseBankListOutput = {
  __typename?: 'RiseBankListOutput';
  accountNumber?: Maybe<Scalars['String']>;
  accountSubType?: Maybe<Scalars['String']>;
  accountType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type RisePersonalProfileOutput = {
  __typename?: 'RisePersonalProfileOutput';
  error?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  success?: Maybe<Scalars['Boolean']>;
  user?: Maybe<RiseUserDataOutput>;
};

export type RiseReportFiltersInput = {
  fileHeaders: Scalars['String'];
  riseClassId: Scalars['String'];
  riseReportType: RiseReportTypes;
  status: Array<InputMaybe<ApplicationResultStatusAdmin>>;
};

export type RiseReportListOutput = {
  __typename?: 'RiseReportListOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<RiseReportOutput>>>;
};

export type RiseReportOutput = {
  __typename?: 'RiseReportOutput';
  _id: Scalars['ID'];
  createdAt: Scalars['ISODate'];
  filters: Scalars['JSONObject'];
  stage: CsvReportStage;
  status: CsvReportStatus;
  type: RiseReportTypes;
  updatedAt: Scalars['ISODate'];
};

export type RiseReportPaginationInput = {
  pagination?: InputMaybe<ChamberPaginationInput>;
  type: RiseReportTypes;
};

export enum RiseReportTypes {
  RiseClassApplications = 'RISE_CLASS_APPLICATIONS'
}

export type RiseUserDataOutput = {
  __typename?: 'RiseUserDataOutput';
  address?: Maybe<AddressOutput>;
  applicationId?: Maybe<Scalars['String']>;
  applicationStatus?: Maybe<Scalars['String']>;
  averageMonthlyExpense?: Maybe<Scalars['String']>;
  averageMonthlyIncome?: Maybe<Scalars['String']>;
  bestMonthlyIncome?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  incomeFromTaxReturn?: Maybe<Scalars['String']>;
  industry?: Maybe<Scalars['String']>;
  isUSResident?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  questionAnswers?: Maybe<Array<Maybe<QuestionsRiseOutput>>>;
  ssn?: Maybe<Scalars['String']>;
  taxEndPeriod?: Maybe<Scalars['String']>;
  worstMonthlyIncome?: Maybe<Scalars['String']>;
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Sow = {
  __typename?: 'SOW';
  SOWNumber: Scalars['Int'];
  _id: Scalars['ID'];
  commission?: Maybe<Array<Maybe<CommissionAndReimbursement>>>;
  createdAt: Scalars['ISODate'];
  createdBy?: Maybe<UserOutput>;
  deliverables?: Maybe<Array<Maybe<DeliverablesAndMilestones>>>;
  effectiveDate?: Maybe<Scalars['ISODate']>;
  expenseReimbursement?: Maybe<Array<Maybe<CommissionAndReimbursement>>>;
  fees?: Maybe<FeesCategory>;
  isCompleted: Scalars['Boolean'];
  linkedContract?: Maybe<Contract>;
  linkedNoum: SpaceOutput;
  logo?: Maybe<Scalars['String']>;
  milestones?: Maybe<Array<Maybe<DeliverablesAndMilestones>>>;
  scopeOfWork?: Maybe<Scalars['String']>;
  sowPDF?: Maybe<PdfPreview>;
  status: SowStatus;
  templateName?: Maybe<Scalars['String']>;
  timeline?: Maybe<Array<ContractSowTimeLine>>;
  timezone?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type SowOutput = {
  __typename?: 'SOWOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Sow>>;
};

export enum SowStatus {
  Amended = 'AMENDED',
  Draft = 'DRAFT',
  Issued = 'ISSUED',
  Signed = 'SIGNED'
}

export enum Status_Invoice {
  InternalVoided = 'INTERNAL_VOIDED',
  NotPaid = 'NOT_PAID',
  Paid = 'PAID',
  PaymentDue = 'PAYMENT_DUE',
  Pending = 'PENDING',
  Posted = 'POSTED',
  Voided = 'VOIDED'
}

export enum Status_Noum {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Delinquent = 'DELINQUENT',
  Inactive = 'INACTIVE',
  Suspended = 'SUSPENDED'
}

export enum Subscription_Plan_Type {
  Charge = 'CHARGE',
  Plan = 'PLAN'
}

export type SaveCardOutput = {
  __typename?: 'SaveCardOutput';
  accountType?: Maybe<Scalars['String']>;
  clientAccountId?: Maybe<Scalars['String']>;
  customerId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  maskAccountNumber?: Maybe<Scalars['String']>;
  paymentChannel?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type ScoreLineInput = {
  description?: InputMaybe<Scalars['String']>;
  scoreId: Scalars['ID'];
  type?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type ScoreLineOutput = {
  __typename?: 'ScoreLineOutput';
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  reviewDate?: Maybe<Scalars['String']>;
  scoreId?: Maybe<Scalars['ID']>;
  scoreLineId?: Maybe<Scalars['ID']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type SearchChamberAdminFilter = {
  type?: InputMaybe<Conversationtypeenumforadmin>;
  uid?: InputMaybe<Scalars['ID']>;
};

export type SearchFilterForConversation = {
  type?: InputMaybe<GetConversationsFilterType>;
};

export type SearchGroupInvite = {
  canInvite?: InputMaybe<Scalars['Boolean']>;
  canInviteUser?: InputMaybe<Scalars['ID']>;
};

export enum SearchGroupsSortBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC'
}

export type SearchInput = {
  limit: Scalars['Int'];
  page: Scalars['Int'];
  search?: InputMaybe<Scalars['String']>;
};

export type SearchMembersInput = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  roleIDs?: InputMaybe<Array<Scalars['ID']>>;
  roleId?: InputMaybe<Scalars['ID']>;
  searchTerm?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<NoumMemberStatus>;
  statuses?: InputMaybe<Array<NoumMemberStatus>>;
};

export type SearchNoumContactsInput = {
  limit?: InputMaybe<Scalars['Int']>;
  noumId: Scalars['ID'];
  offset?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<NoumContactStatus>;
};

export type SearchUserFilter = {
  connectionType?: InputMaybe<ConnectionPermissionType>;
  excludeUsersByStatus?: InputMaybe<Array<InputMaybe<UserStatus>>>;
  includeNonMembers?: InputMaybe<Scalars['Boolean']>;
  includeNoumOwner?: InputMaybe<Scalars['Boolean']>;
  includeSelf?: InputMaybe<Scalars['Boolean']>;
  userIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type SearchUserFilterAdmin = {
  filters?: InputMaybe<Array<InputMaybe<FilterType>>>;
};

export type SearchableNoumContact = {
  __typename?: 'SearchableNoumContact';
  _id: Scalars['ID'];
  apartmentNo?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  companyName?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISODate'];
  displayName: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  isConnectedWithNoum: Scalars['Boolean'];
  noum: ChamberByIdRef;
  ownerId: Scalars['ID'];
  state?: Maybe<Scalars['String']>;
  status: NoumContactStatus;
  street?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  type: NoumContactType;
  user: UserOutput;
  zipCode?: Maybe<Scalars['String']>;
};


export type SearchableNoumContactIsConnectedWithNoumArgs = {
  noumId?: InputMaybe<Scalars['ID']>;
};

export type SearchableNoumMember = {
  __typename?: 'SearchableNoumMember';
  _id: Scalars['ID'];
  connectedAt?: Maybe<Scalars['ISODate']>;
  previousRole?: Maybe<NoumMemberRole>;
  role: NoumMemberRole;
  status: NoumMemberStatus;
  updatedAt?: Maybe<Scalars['ISODate']>;
  user: UserOutput;
};

export type SecurityQuestion = {
  answer?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type SelectedInvoiceInput = {
  invoice_id?: InputMaybe<Scalars['Float']>;
};

export type SendGroupInviteInput = {
  groupId: Scalars['ID'];
  inviteTo: Scalars['ID'];
};

export type SendInviteInput = {
  groupId?: InputMaybe<Scalars['String']>;
  inviteTo?: InputMaybe<Scalars['String']>;
  inviteType: InviteType;
};

export type SetNoumLayoutToolMetaValueInput = {
  metaValues: Scalars['JSONObject'];
  toolId: Scalars['ID'];
};

export type SettingsInput = {
  setting_name: Scalars['String'];
  setting_value: Scalars['String'];
  setting_value_type: Scalars['String'];
};

export type SettingsOutput = {
  __typename?: 'SettingsOutput';
  setting_name: Scalars['String'];
  setting_value: Scalars['String'];
  setting_value_type: Scalars['String'];
  settings_id: Scalars['Float'];
};

export type SettingsUpdateInput = {
  setting_value: Scalars['String'];
  settings_id: Scalars['Float'];
};

export enum SettlementPeriodEnum {
  Instant = 'INSTANT',
  Nextday = 'NEXTDAY',
  Sameday = 'SAMEDAY'
}

export type SignedUrlOutput = {
  __typename?: 'SignedUrlOutput';
  url?: Maybe<Scalars['String']>;
};

export type Skill = {
  __typename?: 'Skill';
  _id: Scalars['ID'];
  icon: Scalars['String'];
  name: Scalars['String'];
};

export type SkillsOutput = {
  __typename?: 'SkillsOutput';
  categories?: Maybe<Array<Maybe<Skill>>>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type SmsParams = {
  body: Scalars['String'];
  from?: InputMaybe<Scalars['String']>;
  to: Scalars['String'];
};

export type SocialGroup = {
  __typename?: 'SocialGroup';
  _id: Scalars['ID'];
  channelName?: Maybe<Scalars['String']>;
  chatRoomId?: Maybe<Scalars['String']>;
  chatToken?: Maybe<Scalars['String']>;
  host?: Maybe<UserOutput>;
  hosts?: Maybe<Array<Maybe<Scalars['ID']>>>;
  invitedAsSpeakers?: Maybe<Array<Maybe<SpeakerInvitation>>>;
  mutedSpeakers?: Maybe<Array<Maybe<Scalars['ID']>>>;
  name?: Maybe<Scalars['String']>;
  raiseHands?: Maybe<Array<Maybe<Scalars['ID']>>>;
  requestedJoiningStatus?: Maybe<Array<Maybe<Scalars['ID']>>>;
  rtmToken?: Maybe<Scalars['String']>;
  socialHallId?: Maybe<Scalars['ID']>;
  speakers?: Maybe<Array<Maybe<Scalars['ID']>>>;
  startTime?: Maybe<Scalars['Date']>;
  token?: Maybe<Scalars['String']>;
  topic?: Maybe<Array<Maybe<Scalars['String']>>>;
  users?: Maybe<Array<Maybe<UserOutput>>>;
  usersRequestedJoiningStatus?: Maybe<Array<Maybe<GroupShJoiningStatus>>>;
};

export type SocialGroupInput = {
  name: Scalars['String'];
};

export type SocialGroups = {
  __typename?: 'SocialGroups';
  count: Scalars['Int'];
  data?: Maybe<Array<Maybe<SocialGroup>>>;
};

export type SocialHall = {
  __typename?: 'SocialHall';
  _id: Scalars['ID'];
  attendees?: Maybe<Array<Maybe<UserOutput>>>;
  chamberId?: Maybe<Scalars['ID']>;
  endTime?: Maybe<Scalars['Date']>;
  eventId?: Maybe<Scalars['ID']>;
  groupId?: Maybe<Scalars['ID']>;
  hasUserJoined?: Maybe<Scalars['Boolean']>;
  hosts?: Maybe<Array<Maybe<UserOutput>>>;
  isActive: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  ownerUserId?: Maybe<UserOutput>;
  socialHallId?: Maybe<Scalars['ID']>;
  startTime?: Maybe<Scalars['Date']>;
  status?: Maybe<Scalars['Boolean']>;
  type?: Maybe<SocialHallType>;
};

export enum SocialHallActionType {
  Groupnamechanged = 'GROUPNAMECHANGED'
}

export type SocialHallAttendee = {
  __typename?: 'SocialHallAttendee';
  _id: Scalars['ID'];
  agoraUserId?: Maybe<Scalars['Int']>;
  attendeeId?: Maybe<UserOutput>;
  entryTime?: Maybe<Scalars['Date']>;
  eventId?: Maybe<Scalars['ID']>;
  eventRole?: Maybe<CurrentUser>;
  exitTime?: Maybe<Scalars['Date']>;
  hallGroupId?: Maybe<Scalars['ID']>;
  isHost?: Maybe<Scalars['Boolean']>;
  location: Array<Maybe<Scalars['Float']>>;
  rtmToken?: Maybe<Scalars['String']>;
  shJoiningStatus?: Maybe<SocialHallAttendeeStatus>;
  socialHallId: Scalars['ID'];
  waitingRoomChannelName?: Maybe<Scalars['String']>;
};

export type SocialHallAttendeeInput = {
  location?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  socialHallId: Scalars['ID'];
  socialHallTCAccepted?: InputMaybe<Scalars['Boolean']>;
};

export enum SocialHallAttendeeStatus {
  Approved = 'Approved',
  Default = 'Default',
  Rejected = 'Rejected',
  Requested = 'Requested'
}

export type SocialHallAttendees = {
  __typename?: 'SocialHallAttendees';
  count: Scalars['Int'];
  data?: Maybe<Array<Maybe<SocialHallAttendee>>>;
};

export type SocialHallInput = {
  endTime?: InputMaybe<Scalars['Date']>;
  hosts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  startTime?: InputMaybe<Scalars['Date']>;
  type: SocialHallType;
};

export enum SocialHallType {
  Mentoring = 'MENTORING',
  Networking = 'NETWORKING',
  NoumEvent = 'NOUM_EVENT',
  Personal = 'PERSONAL',
  Promoting = 'PROMOTING',
  Recruitment = 'RECRUITMENT'
}

export type SocialHallUpdatesResponse = {
  __typename?: 'SocialHallUpdatesResponse';
  actionData?: Maybe<Scalars['Object']>;
  actionType?: Maybe<SocialHallActionType>;
};

export type SocialLink = {
  __typename?: 'SocialLink';
  link?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type SocialLinkInput = {
  link?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type SortBy = {
  __typename?: 'SortBy';
  field?: Maybe<UserSortableFields>;
  order?: Maybe<OrderByValues>;
};

export enum SortNoteEnum {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC'
}

export enum SortOperator {
  Asc = 'asc',
  Desc = 'desc'
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SortType = {
  column?: InputMaybe<Scalars['String']>;
  operator?: InputMaybe<SortOperator>;
  order?: InputMaybe<Scalars['Int']>;
};

export enum SortUnderwritingReportEnum {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC'
}

export type SowFilterForAdmin = {
  noums?: InputMaybe<Array<Scalars['ID']>>;
  rangeFilter?: InputMaybe<Array<CommonFilter>>;
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Array<SowStatus>>;
};

export type SowReportFiltersInput = {
  fileHeaders: Scalars['String'];
  rangeFilters: Array<InputMaybe<CommonFilter>>;
  search?: InputMaybe<Scalars['String']>;
  status: Array<InputMaybe<SowStatus>>;
};

export type SpaceCategoryFilter = {
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  spaceType?: InputMaybe<SpaceTypeEnum>;
};

export type SpaceConnection = {
  __typename?: 'SpaceConnection';
  _id?: Maybe<Scalars['ID']>;
  approvedAt?: Maybe<Scalars['String']>;
  draft?: Maybe<SpaceConnectionDraft>;
  message?: Maybe<Scalars['String']>;
  permission?: Maybe<ConnectionPermissionTypeEnum>;
  requestFrom?: Maybe<SpaceOutput>;
  requestTo?: Maybe<SpaceOutput>;
  requestedAt?: Maybe<Scalars['String']>;
  status?: Maybe<ConnectionRequestTypeEnum>;
  type?: Maybe<ConnectionTypeEnum>;
};

export type SpaceConnectionDraft = {
  __typename?: 'SpaceConnectionDraft';
  permission?: Maybe<ConnectionPermissionTypeEnum>;
};

export type SpaceConnectionsResponse = {
  __typename?: 'SpaceConnectionsResponse';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<SpaceConnection>>>;
};

export type SpaceDraftData = {
  __typename?: 'SpaceDraftData';
  customPreviewPosition?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  fonts?: Maybe<Scalars['JSONObject']>;
  isCustomPreviewVisible?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['String']>;
  profileImageThumbnail?: Maybe<Scalars['String']>;
  projectType?: Maybe<ProjectChamberType>;
  theme?: Maybe<ThemeOutput>;
  title?: Maybe<Scalars['String']>;
};

export type SpaceInput = {
  description?: InputMaybe<Scalars['String']>;
  elements?: InputMaybe<Array<InputMaybe<ElementInput>>>;
  institution: InstitutionsEnum;
  name: Scalars['String'];
  permission?: InputMaybe<SpacePermissionEnum>;
  profileImage?: InputMaybe<Scalars['String']>;
  status: SpaceStatusEnum;
  title?: InputMaybe<Scalars['String']>;
  type: SpaceTypeEnum;
};

export type SpaceOutput = {
  __typename?: 'SpaceOutput';
  _id?: Maybe<Scalars['ID']>;
  activeInvitation?: Maybe<ActiveNoumInvitation>;
  adsMeta?: Maybe<Scalars['JSONObject']>;
  approvedAt?: Maybe<Scalars['ISODate']>;
  archivedAt?: Maybe<Scalars['ISODate']>;
  assignedRole?: Maybe<NoumRole>;
  broadcastEndedAt?: Maybe<Scalars['ISODate']>;
  broadcastedAt?: Maybe<Scalars['ISODate']>;
  category?: Maybe<ProjectChamberCategory>;
  connectionId?: Maybe<Scalars['ID']>;
  connectionRequests?: Maybe<PaginatedNoumConnectionRequests>;
  connectionRole?: Maybe<Scalars['String']>;
  connectionWithNoum?: Maybe<SpaceConnection>;
  connectionsCount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['ISODate']>;
  description?: Maybe<Scalars['String']>;
  draft?: Maybe<SpaceDraftData>;
  editorVersion?: Maybe<NoumEditorVersion>;
  /** @deprecated elements are deprecated, use layout instead */
  elements?: Maybe<Array<Maybe<ElementOutput>>>;
  elementsForNoumAds?: Maybe<Array<Maybe<ElementOutput>>>;
  enableAds?: Maybe<Scalars['Boolean']>;
  favouritedAt?: Maybe<Scalars['ISODate']>;
  followersCount?: Maybe<Scalars['Int']>;
  fonts?: Maybe<Scalars['JSONObject']>;
  headerBackgroundUrl?: Maybe<Scalars['String']>;
  institution?: Maybe<Scalars['String']>;
  isConnected?: Maybe<Scalars['Boolean']>;
  isFavourited?: Maybe<Scalars['Boolean']>;
  isFollowing?: Maybe<Scalars['Boolean']>;
  keywords?: Maybe<Array<Maybe<Scalars['String']>>>;
  lastCustomPreviewSavedTime?: Maybe<Scalars['ISODate']>;
  lastEditedBy?: Maybe<UserOutput>;
  lastUpdatedAt?: Maybe<Scalars['ISODate']>;
  layout?: Maybe<NoumLayout>;
  link?: Maybe<NoumLink>;
  members?: Maybe<PaginatedNoumMembers>;
  membershipStatus?: Maybe<NoumMembershipStatus>;
  name?: Maybe<Scalars['String']>;
  networks?: Maybe<Array<Maybe<NetworkOutput>>>;
  noumTransactionFee?: Maybe<NoumTransactionFeeByChamberIdRef>;
  percentCompleted?: Maybe<Scalars['Int']>;
  permission?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['String']>;
  profileImageThumbnail?: Maybe<Scalars['String']>;
  projectType?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['ISODate']>;
  recentlyViewedAt?: Maybe<Scalars['ISODate']>;
  references?: Maybe<Array<Maybe<NoumReference>>>;
  requestedAt?: Maybe<Scalars['ISODate']>;
  slug?: Maybe<Scalars['String']>;
  spotLight?: Maybe<Scalars['Boolean']>;
  spotLightForAll?: Maybe<Scalars['Boolean']>;
  spotLightUserWhiteList?: Maybe<Array<Maybe<Scalars['ID']>>>;
  status?: Maybe<Scalars['String']>;
  tempStatus?: Maybe<ElementStatusEnum>;
  theme?: Maybe<ThemeOutput>;
  title?: Maybe<Scalars['String']>;
  token?: Maybe<Token>;
  tokenTransaction?: Maybe<TokenTransaction>;
  type?: Maybe<Scalars['String']>;
  uid?: Maybe<UserOutput>;
  unSaved?: Maybe<SpaceDraftData>;
  unfavouritedAt?: Maybe<Scalars['ISODate']>;
  updatedAt?: Maybe<Scalars['ISODate']>;
  userId?: Maybe<Scalars['ID']>;
};


export type SpaceOutputConnectionRequestsArgs = {
  input?: InputMaybe<GetNoumConnectionRequestsInput>;
};


export type SpaceOutputConnectionWithNoumArgs = {
  noumId: Scalars['ID'];
};


export type SpaceOutputLayoutArgs = {
  editorV2Enabled?: InputMaybe<Scalars['Boolean']>;
  status?: InputMaybe<NoumLayoutStatusFilter>;
};


export type SpaceOutputMembersArgs = {
  input?: InputMaybe<SearchMembersInput>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type SpaceOutputResponse = {
  __typename?: 'SpaceOutputResponse';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<SpaceOutput>>>;
};

export enum SpacePermissionEnum {
  All = 'ALL',
  Conversation = 'CONVERSATION',
  None = 'NONE',
  PostComment = 'POST_COMMENT',
  PostCreate = 'POST_CREATE',
  PostLike = 'POST_LIKE'
}

export type SpaceProfileValue = {
  __typename?: 'SpaceProfileValue';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Int']>;
};

export enum SpaceStatusEnum {
  Archived = 'ARCHIVED',
  Deleted = 'DELETED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export enum SpaceTypeEnum {
  Home = 'HOME',
  Project = 'PROJECT',
  RiseApplication = 'RISE_APPLICATION',
  Social = 'SOCIAL',
  Work = 'WORK'
}

export type SpaceUpdateInput = {
  adsMeta?: InputMaybe<Scalars['JSONObject']>;
  category?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  enableAds?: InputMaybe<Scalars['Boolean']>;
  headerBackgroundUrl?: InputMaybe<Scalars['String']>;
  institution?: InputMaybe<InstitutionsEnum>;
  keywords?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name?: InputMaybe<Scalars['String']>;
  permission?: InputMaybe<SpacePermissionEnum>;
  profileImage?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<SpaceStatusEnum>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<SpaceTypeEnum>;
};

export type SpeakerInvitation = {
  __typename?: 'SpeakerInvitation';
  invitee?: Maybe<UserOutput>;
  inviter?: Maybe<UserOutput>;
};

export type SpeakerInvitationSubscriptionData = {
  __typename?: 'SpeakerInvitationSubscriptionData';
  actionType?: Maybe<SpeakerInvitationType>;
  inviteeId?: Maybe<Scalars['ID']>;
  inviterId?: Maybe<Scalars['ID']>;
};

export enum SpeakerInvitationType {
  /** all users in group */
  Accepted = 'ACCEPTED',
  /** only to user who was invited */
  Cancelled = 'CANCELLED',
  /** only to host who invited the user */
  Declined = 'DECLINED',
  /** only invited user */
  Invited = 'INVITED',
  /** all users in group */
  SpeakerRemoved = 'SPEAKER_REMOVED'
}

export type SpotlightChamberFilters = {
  categoryIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  projectType?: InputMaybe<ProjectChamberTypeForFilter>;
  search?: InputMaybe<Scalars['String']>;
};

export type SpotlightPlanInput = {
  period_unit: Item_Price_Period_Unit;
  plan_id: Scalars['Float'];
  spotlight: Scalars['Boolean'];
};

export type StandardResponse = {
  __typename?: 'StandardResponse';
  error?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  statusCode?: Maybe<Scalars['Int']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type StatementDetailsOutput = {
  __typename?: 'StatementDetailsOutput';
  accountNumber?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  createdBy?: Maybe<UserOutput>;
  currency?: Maybe<Scalars['String']>;
  documentName?: Maybe<Scalars['String']>;
  documentType?: Maybe<Scalars['String']>;
  dueDate?: Maybe<Scalars['String']>;
  isPublished?: Maybe<Scalars['Boolean']>;
  month?: Maybe<Scalars['String']>;
  pdfDocumentLink?: Maybe<Scalars['String']>;
  statementId?: Maybe<Scalars['String']>;
  statementName?: Maybe<Scalars['String']>;
  statementNotes?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  updatedBy?: Maybe<UserOutput>;
  year?: Maybe<Scalars['String']>;
};

export type StatementInput = {
  accountNumber?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
  documentType?: InputMaybe<Scalars['String']>;
  dueDate?: InputMaybe<Scalars['String']>;
  isPublished?: InputMaybe<Scalars['Boolean']>;
  month?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  pdfDocumentLink?: InputMaybe<Scalars['String']>;
  statementId?: InputMaybe<Scalars['String']>;
  statementName?: InputMaybe<Scalars['String']>;
  statementNotes?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['String']>;
};

export enum Status {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export enum StatusUpdateTypeEnum {
  Document = 'DOCUMENT',
  Noumena = 'NOUMENA',
  Provider = 'PROVIDER',
  ProviderDocument = 'PROVIDER_DOCUMENT',
  ProviderDocumentVerification = 'PROVIDER_DOCUMENT_VERIFICATION',
  Retry = 'RETRY'
}

export type StripeCardOutput = {
  __typename?: 'StripeCardOutput';
  brand?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  exp_month?: Maybe<Scalars['Int']>;
  exp_year?: Maybe<Scalars['Int']>;
  funding?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  last4?: Maybe<Scalars['String']>;
};

export enum SubAccountType {
  External = 'EXTERNAL',
  Internal = 'INTERNAL'
}

export type SubSettingCounterOptionsOutput = {
  __typename?: 'SubSettingCounterOptionsOutput';
  current: Scalars['Float'];
  limit: Scalars['Float'];
  type?: Maybe<Scalars['String']>;
};

export type SubSettingCountersOutput = {
  __typename?: 'SubSettingCountersOutput';
  noumSetup: SubSettingCounterOptionsOutput;
};

export type SubSettingNoumCountersOutput = {
  __typename?: 'SubSettingNoumCountersOutput';
  eventAttendees: SubSettingCounterOptionsOutput;
  eventDuration: SubSettingCounterOptionsOutput;
  eventHosted: SubSettingCounterOptionsOutput;
  noumConnections: SubSettingCounterOptionsOutput;
  storage: SubSettingCounterOptionsOutput;
};

export type SubSettingOutput = {
  __typename?: 'SubSettingOutput';
  description?: Maybe<Scalars['String']>;
  financialProducts: Array<PlanSettingItemOutput>;
  homeNoumSetting: PlanSettingNoumOutput;
  item_id: Scalars['String'];
  learningProducts: Array<PlanSettingItemOutput>;
  menuItems: Array<PlanSettingItemOutput>;
  metadata?: Maybe<Scalars['String']>;
  noumSetting: PlanSettingNoumOutput;
  permissions?: Maybe<Array<Maybe<Scalars['String']>>>;
  plan_setting_id: Scalars['Float'];
  transactionInfo: Array<PlanSettingTransactionInfoOutput>;
};

export type SubWalletBalance = {
  __typename?: 'SubWalletBalance';
  amount?: Maybe<CurrencyData>;
  id?: Maybe<Scalars['String']>;
  masterWalletId?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  events?: Maybe<EventSubscriptionData>;
  groupClosed: Scalars['ID'];
  groupDeleted: Scalars['ID'];
  knockAccepted: Scalars['ID'];
  knockUpdates: KnockEvent;
  muteSpeaker?: Maybe<MuteSpeakerSubscriptionData>;
  newAttendeeOnGroup: Scalars['ID'];
  newAttendeeOnSocialHall: Scalars['ID'];
  newGroup: Scalars['ID'];
  newKnockResponse: Scalars['ID'];
  newKnockToGroup: Scalars['ID'];
  newKnockToUser: Scalars['ID'];
  notification?: Maybe<NotificationSubscriptionData>;
  quitAttendeeOnGroup: Scalars['ID'];
  quitAttendeeOnSocialHall: Scalars['ID'];
  raisedHand?: Maybe<RaisedHandSubscriptionData>;
  socialHallUpdates?: Maybe<SocialHallUpdatesResponse>;
  speakerInvitation?: Maybe<SpeakerInvitationSubscriptionData>;
  subscribeGroupEvent?: Maybe<GroupEvent>;
  subscribeSocialHall?: Maybe<Scalars['Boolean']>;
  updateGroupName: Scalars['ID'];
};


export type SubscriptionEventsArgs = {
  userId: Scalars['ID'];
};


export type SubscriptionGroupDeletedArgs = {
  groupId?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionKnockUpdatesArgs = {
  socialHallId?: InputMaybe<Scalars['ID']>;
};


export type SubscriptionMuteSpeakerArgs = {
  groupId: Scalars['ID'];
};


export type SubscriptionNewAttendeeOnGroupArgs = {
  groupId: Scalars['ID'];
};


export type SubscriptionNewAttendeeOnSocialHallArgs = {
  socialHallId: Scalars['ID'];
};


export type SubscriptionNewKnockResponseArgs = {
  knockId: Scalars['ID'];
};


export type SubscriptionNewKnockToGroupArgs = {
  groupId: Scalars['ID'];
};


export type SubscriptionNewKnockToUserArgs = {
  hallAttendeeId: Scalars['ID'];
};


export type SubscriptionNotificationArgs = {
  userId: Scalars['ID'];
};


export type SubscriptionQuitAttendeeOnGroupArgs = {
  groupId: Scalars['ID'];
};


export type SubscriptionQuitAttendeeOnSocialHallArgs = {
  socialHallId: Scalars['ID'];
};


export type SubscriptionRaisedHandArgs = {
  groupId: Scalars['ID'];
};


export type SubscriptionSocialHallUpdatesArgs = {
  socialHallId: Scalars['ID'];
};


export type SubscriptionSpeakerInvitationArgs = {
  groupId: Scalars['ID'];
};


export type SubscriptionSubscribeGroupEventArgs = {
  groupId: Scalars['ID'];
};


export type SubscriptionSubscribeSocialHallArgs = {
  socialHallId: Scalars['ID'];
};


export type SubscriptionUpdateGroupNameArgs = {
  groupId: Scalars['ID'];
};

export type SubscriptionInput = {
  events?: InputMaybe<Scalars['Boolean']>;
  marketing?: InputMaybe<Scalars['Boolean']>;
  messagesAndConnections?: InputMaybe<Scalars['Boolean']>;
  paymentsAndOTPs?: InputMaybe<Scalars['Boolean']>;
  postAndCommentMentions?: InputMaybe<Scalars['Boolean']>;
};

export type SubscriptionInputType = {
  billing_cycles: Scalars['Float'];
  id?: InputMaybe<Scalars['String']>;
  trial_end?: InputMaybe<Scalars['String']>;
  user_id: Scalars['String'];
};

export type SubscriptionOutput = {
  __typename?: 'SubscriptionOutput';
  activated_at?: Maybe<Scalars['String']>;
  billing_cycles?: Maybe<Scalars['Float']>;
  billing_period: Scalars['String'];
  billing_period_unit: Scalars['String'];
  cancel_schedule_created_at?: Maybe<Scalars['String']>;
  cancelled_at?: Maybe<Scalars['String']>;
  card_funding_type?: Maybe<Scalars['String']>;
  card_last4?: Maybe<Scalars['String']>;
  card_masked_number?: Maybe<Scalars['String']>;
  card_status?: Maybe<Scalars['String']>;
  card_type?: Maybe<Scalars['String']>;
  counters?: Maybe<SubSettingCountersOutput>;
  created_at?: Maybe<Scalars['String']>;
  current_term_end?: Maybe<Scalars['String']>;
  current_term_start?: Maybe<Scalars['String']>;
  external_created_at?: Maybe<Scalars['String']>;
  external_customer_id?: Maybe<Scalars['String']>;
  external_status?: Maybe<Scalars['String']>;
  external_subscription_id?: Maybe<Scalars['String']>;
  external_updated_at?: Maybe<Scalars['String']>;
  home_noum_counters?: Maybe<SubSettingNoumCountersOutput>;
  hosted_page_id?: Maybe<Scalars['String']>;
  is_cancelled?: Maybe<Scalars['Boolean']>;
  item_price_id?: Maybe<Scalars['String']>;
  next_billing_at?: Maybe<Scalars['String']>;
  noum_counters?: Maybe<SubSettingNoumCountersOutput>;
  plan_category?: Maybe<Plan_Category_Enum>;
  plan_id: Scalars['Float'];
  plan_name?: Maybe<Scalars['String']>;
  plan_order?: Maybe<Scalars['Float']>;
  plan_price?: Maybe<Scalars['Float']>;
  plan_type?: Maybe<Scalars['String']>;
  plan_validity_months?: Maybe<Scalars['Float']>;
  remaining_billing_cycles?: Maybe<Scalars['String']>;
  settings?: Maybe<SubSettingOutput>;
  started_at?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  subscription_id: Scalars['Float'];
  trial_end?: Maybe<Scalars['String']>;
  trial_start?: Maybe<Scalars['String']>;
  uid: Scalars['String'];
  unit_price?: Maybe<Scalars['Float']>;
  updated_at?: Maybe<Scalars['String']>;
  valid_till?: Maybe<Scalars['String']>;
};

export type SubscriptionTypes = {
  __typename?: 'SubscriptionTypes';
  events?: Maybe<Scalars['Boolean']>;
  marketing?: Maybe<Scalars['Boolean']>;
  messagesAndConnections?: Maybe<Scalars['Boolean']>;
  paymentsAndOTPs?: Maybe<Scalars['Boolean']>;
  postAndCommentMentions?: Maybe<Scalars['Boolean']>;
};

export type SubscriptionUpgradeDowngradeInput = {
  archivable_noums?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  plan_id: Scalars['Float'];
  redirectURL?: InputMaybe<Scalars['String']>;
  subscription_id: Scalars['Float'];
};

export type SuccessMessageOutput = {
  __typename?: 'SuccessMessageOutput';
  message?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type SurveryAnswerPage = {
  __typename?: 'SurveryAnswerPage';
  next?: Maybe<Scalars['String']>;
  pageId: Scalars['String'];
  previous?: Maybe<Scalars['String']>;
};

export type Survey = {
  __typename?: 'Survey';
  _id: Scalars['ID'];
  active: Scalars['Boolean'];
  allowNavigation: Scalars['Boolean'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  pageCount: Scalars['Float'];
  pages: Array<SurveyPage>;
  questionCount: Scalars['Float'];
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type SurveyAnswer = {
  __typename?: 'SurveyAnswer';
  _id: Scalars['ID'];
  answers: Scalars['JSON'];
  createdAt: Scalars['String'];
  lastSubmitted: SurveyPage;
  pages: Array<SurveryAnswerPage>;
  survey: Survey;
  uid: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type SurveyAnswerInputCreate = {
  answers: Scalars['JSON'];
  page: Scalars['String'];
  survey: Scalars['String'];
  uid: Scalars['String'];
};

export type SurveyInputCreate = {
  description: Scalars['String'];
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
};

export type SurveyInputGetAll = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
  status?: InputMaybe<Enum_Survey_Status_Input>;
};

export type SurveyInputUpdate = {
  active?: InputMaybe<Scalars['Boolean']>;
  allowNavigation?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  title?: InputMaybe<Scalars['String']>;
};

export type SurveyOutputGetAll = {
  __typename?: 'SurveyOutputGetAll';
  count: Scalars['Float'];
  data: Array<Survey>;
};

export type SurveyPage = {
  __typename?: 'SurveyPage';
  _id: Scalars['ID'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  isDeleted: Scalars['Boolean'];
  position: Scalars['Float'];
  questionCount: Scalars['Float'];
  questions: Array<SurveyQuestion>;
  rules: Array<SurveyPageRule>;
  survey: Survey;
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type SurveyPageInputCreate = {
  description: Scalars['String'];
  position: Scalars['Float'];
  questions: Array<SurveyQuestionInput>;
  rules: Array<SurveyPageInputRule>;
  survey: Scalars['String'];
  title: Scalars['String'];
};

export type SurveyPageInputRule = {
  goto: Scalars['String'];
  operator: Enum_Page_Rule_Operator;
  values: Array<SurveyPageInputRuleValues>;
};

export type SurveyPageInputRuleValues = {
  qid: Scalars['String'];
  value: Scalars['String'];
};

export type SurveyPageRule = {
  __typename?: 'SurveyPageRule';
  goto: Scalars['String'];
  operator: Enum_Page_Rule_Operator;
  values: Array<SurveyPageRuleValues>;
};

export type SurveyPageRuleValues = {
  __typename?: 'SurveyPageRuleValues';
  qid: Scalars['String'];
  value: Scalars['String'];
};

export type SurveyQuestion = {
  __typename?: 'SurveyQuestion';
  explainerText?: Maybe<Scalars['String']>;
  helperText?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  position: Scalars['Float'];
  text: Scalars['String'];
  type: SurveyQuestionType;
};

export type SurveyQuestionInput = {
  explainerText?: InputMaybe<Scalars['String']>;
  helperText?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  position: Scalars['Float'];
  text: Scalars['String'];
  type: SurveyQuestionInputType;
};

export type SurveyQuestionInputType = {
  input?: InputMaybe<SurveyQuestionInputTypeI>;
  multiSelect?: InputMaybe<SurveyQuestionInputTypeMs>;
  select?: InputMaybe<SurveyQuestionInputTypeS>;
};

export type SurveyQuestionInputTypeI = {
  label: Scalars['String'];
  subType: Enum_Question_Input_Subtype;
  validation: SurveyQuestionInputTypeValidation;
};

export type SurveyQuestionInputTypeMs = {
  defaultOptions: Array<Scalars['String']>;
  label: Scalars['String'];
  options: Array<SurveyQuestionInputTypeOption>;
  presentation: Enum_Question_Select_Presentation;
  subType: Enum_Question_Multi_Select_Subtype;
  validation: SurveyQuestionInputTypeValidation;
};

export type SurveyQuestionInputTypeOption = {
  description: Scalars['String'];
  id: Scalars['String'];
  position: Scalars['Float'];
  title: Scalars['String'];
};

export type SurveyQuestionInputTypeS = {
  defaultOption: Scalars['String'];
  label: Scalars['String'];
  options: Array<SurveyQuestionInputTypeOption>;
  presentation: Enum_Question_Select_Presentation;
  subType: Enum_Question_Select_Subtype;
  validation: SurveyQuestionInputTypeValidation;
};

export type SurveyQuestionInputTypeValidation = {
  max?: InputMaybe<Scalars['Float']>;
  min?: InputMaybe<Scalars['Float']>;
  required: Scalars['Boolean'];
};

export type SurveyQuestionType = {
  __typename?: 'SurveyQuestionType';
  input?: Maybe<SurveyQuestionTypeInput>;
  multiSelect?: Maybe<SurveyQuestionTypeMultiSelect>;
  select?: Maybe<SurveyQuestionTypeSelect>;
};

export type SurveyQuestionTypeInput = {
  __typename?: 'SurveyQuestionTypeInput';
  label: Scalars['String'];
  subType: Enum_Question_Input_Subtype;
  validation: SurveyQuestionTypeValidation;
};

export type SurveyQuestionTypeMultiSelect = {
  __typename?: 'SurveyQuestionTypeMultiSelect';
  defaultOptions: Array<Scalars['String']>;
  label: Scalars['String'];
  options: Array<SurveyQuestionTypeOption>;
  presentation: Enum_Question_Select_Presentation;
  subType: Enum_Question_Multi_Select_Subtype;
  validation: SurveyQuestionTypeValidation;
};

export type SurveyQuestionTypeOption = {
  __typename?: 'SurveyQuestionTypeOption';
  description: Scalars['String'];
  id: Scalars['String'];
  position: Scalars['Float'];
  title: Scalars['String'];
};

export type SurveyQuestionTypeSelect = {
  __typename?: 'SurveyQuestionTypeSelect';
  defaultOption: Scalars['String'];
  label: Scalars['String'];
  options: Array<SurveyQuestionTypeOption>;
  presentation: Enum_Question_Select_Presentation;
  subType: Enum_Question_Select_Subtype;
  validation: SurveyQuestionTypeValidation;
};

export type SurveyQuestionTypeValidation = {
  __typename?: 'SurveyQuestionTypeValidation';
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  required: Scalars['Boolean'];
};

export type Tag = {
  __typename?: 'Tag';
  uid?: Maybe<UserOutput>;
};

export type TagsInput = {
  groupId?: InputMaybe<Scalars['ID']>;
  uid: Scalars['ID'];
};

export type TagsOutput = {
  __typename?: 'TagsOutput';
  groupId?: Maybe<Scalars['ID']>;
  uid?: Maybe<UserOutput>;
};

export enum Template {
  ConnectionDisconnected = 'connectionDisconnected',
  Invite = 'invite',
  OtpEmail = 'otpEmail',
  PersonalEventInvite = 'personalEventInvite',
  Resetpassword = 'resetpassword',
  RiseResetpassword = 'riseResetpassword',
  RiseWelcome = 'riseWelcome',
  UserActivation = 'userActivation',
  UserDeleted = 'userDeleted',
  UserRejection = 'userRejection',
  UserWithoutReferral = 'userWithoutReferral',
  Welcome = 'welcome'
}

export type TestDataOutput = {
  __typename?: 'TestDataOutput';
  ageCheck?: Maybe<ResultOutput>;
  creditCheck?: Maybe<Scalars['String']>;
  fixedExpenseCheck?: Maybe<ResultOutput>;
  freeLanceQuestionsCheck?: Maybe<ResultOutput>;
  gamingDebtCheck?: Maybe<ResultOutput>;
  identityCheck?: Maybe<Scalars['String']>;
  minimumEarningCheck?: Maybe<ResultOutput>;
  overdrawCheck?: Maybe<ResultOutput>;
  reasons?: Maybe<Array<Maybe<Scalars['String']>>>;
  result?: Maybe<Scalars['String']>;
  user?: Maybe<PersonalOutputUser>;
};

export type ThemeColors = {
  __typename?: 'ThemeColors';
  error?: Maybe<Scalars['JSONObject']>;
  gray?: Maybe<Scalars['JSONObject']>;
  miscColors?: Maybe<Scalars['JSONObject']>;
  noums?: Maybe<NoumColors>;
  primary?: Maybe<Scalars['JSONObject']>;
  secondary?: Maybe<Scalars['JSONObject']>;
  success?: Maybe<Scalars['JSONObject']>;
};

export type ThemeColorsInput = {
  error?: InputMaybe<Scalars['JSONObject']>;
  gray?: InputMaybe<Scalars['JSONObject']>;
  miscColors?: InputMaybe<Scalars['JSONObject']>;
  noums?: InputMaybe<NoumColorsInput>;
  primary?: InputMaybe<Scalars['JSONObject']>;
  secondary?: InputMaybe<Scalars['JSONObject']>;
  success?: InputMaybe<Scalars['JSONObject']>;
};

export type ThemeInput = {
  colors?: InputMaybe<ThemeColorsInput>;
  name?: InputMaybe<Scalars['String']>;
};

export type ThemeOutput = {
  __typename?: 'ThemeOutput';
  _id: Scalars['ID'];
  colors?: Maybe<ThemeColors>;
  name: Scalars['String'];
};

export type ThemeOutputResponse = {
  __typename?: 'ThemeOutputResponse';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<ThemeOutput>>>;
};

export type ThreadOutput = {
  __typename?: 'ThreadOutput';
  _id?: Maybe<Scalars['ID']>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  reactions?: Maybe<Array<Maybe<Reaction>>>;
  tags?: Maybe<Array<Maybe<TagsOutput>>>;
  uid?: Maybe<UserOutput>;
};

export type ThreadUser = {
  __typename?: 'ThreadUser';
  _id?: Maybe<UserOutput>;
};

export type Timezone = {
  __typename?: 'Timezone';
  _id: Scalars['ID'];
  abbr?: Maybe<Scalars['String']>;
  isdst?: Maybe<Scalars['Boolean']>;
  offset?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  timezone?: Maybe<Scalars['String']>;
  utcOffset?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type TipOutput = {
  __typename?: 'TipOutput';
  amount?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  tipBy?: Maybe<UserOutput>;
};

export type TipTransactionInput = {
  amount: Scalars['Float'];
  currency: CurrencyEnum;
  destinationUserId: Scalars['ID'];
  passCode: Scalars['String'];
  requestOriginator: RequestOriginatorsEnum;
  transactionReason: Scalars['String'];
};

export type TipsInput = {
  amount: Scalars['Float'];
  answerId: Scalars['ID'];
  currency: CurrencyEnum;
  description: Scalars['String'];
  passCode: Scalars['String'];
  requestOriginator: RequestOriginator;
};

export type Token = {
  __typename?: 'Token';
  _id: Scalars['ID'];
  count: Scalars['Int'];
  walletId?: Maybe<Scalars['ID']>;
};

export type TokenArchive = {
  __typename?: 'TokenArchive';
  createdAt?: Maybe<Scalars['Date']>;
  fromDate?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  records?: Maybe<Array<Maybe<TokenTransactionDetails>>>;
  tillDate?: Maybe<Scalars['Date']>;
};

export type TokenArchiveFilter = {
  tillDate?: InputMaybe<Scalars['Date']>;
};

export type TokenArchiveOutput = {
  __typename?: 'TokenArchiveOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<TokenArchive>>>;
};

export type TokenLedger = {
  __typename?: 'TokenLedger';
  chamberId?: Maybe<Scalars['ID']>;
  count?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  updatedAt?: Maybe<Scalars['Date']>;
  walletId?: Maybe<Scalars['ID']>;
};

export type TokenTransaction = {
  __typename?: 'TokenTransaction';
  chamberId: Scalars['ID'];
  data?: Maybe<Array<Maybe<TokenTransactionType>>>;
};

export type TokenTransactionDetails = {
  __typename?: 'TokenTransactionDetails';
  activityType?: Maybe<Scalars['String']>;
  chamberId?: Maybe<ChamberByIdRef>;
  countIssued?: Maybe<Scalars['Int']>;
  dateOfIssue?: Maybe<Scalars['Date']>;
  remainingCount?: Maybe<Scalars['Int']>;
};

export type TokenTransactionHistory = {
  __typename?: 'TokenTransactionHistory';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<TokenTransactionType>>>;
};

export type TokenTransactionType = {
  __typename?: 'TokenTransactionType';
  activityType?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  message?: Maybe<Scalars['String']>;
  refId?: Maybe<Scalars['String']>;
  refType?: Maybe<Scalars['String']>;
};

export type TransactionAccountInput = {
  accountNumber: Scalars['String'];
  accountType: Scalars['String'];
  routingNumber: Scalars['String'];
};

export type TransactionAddressInput = {
  addressLineOne?: InputMaybe<Scalars['String']>;
  addressLineTwo?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  postalCode: Scalars['Int'];
};

export type TransactionAddressOutput = {
  __typename?: 'TransactionAddressOutput';
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  physical_address?: Maybe<TransactionAddressPhysicalAddressOutput>;
};

export type TransactionAddressPhysicalAddressOutput = {
  __typename?: 'TransactionAddressPhysicalAddressOutput';
  postal_code?: Maybe<Scalars['String']>;
};

export type TransactionEcheckOutput = {
  __typename?: 'TransactionEcheckOutput';
  account_holder?: Maybe<Scalars['String']>;
  account_type?: Maybe<Scalars['String']>;
  last_4_account_number?: Maybe<Scalars['Int']>;
  masked_account_number?: Maybe<Scalars['String']>;
  routing_number?: Maybe<Scalars['Int']>;
  sec_code?: Maybe<Scalars['String']>;
};

export type TransactionFlagHistoryForAdmin = {
  __typename?: 'TransactionFlagHistoryForAdmin';
  date?: Maybe<Scalars['String']>;
  new?: Maybe<Scalars['String']>;
  old?: Maybe<Scalars['String']>;
  userId?: Maybe<UserOutput>;
};

export type TransactionInput = {
  account: TransactionAccountInput;
  address: TransactionAddressInput;
  amount: Scalars['Float'];
};

export type TransactionLinksOutput = {
  __typename?: 'TransactionLinksOutput';
  disputes?: Maybe<Scalars['String']>;
  self?: Maybe<Scalars['String']>;
  settlements?: Maybe<Scalars['String']>;
};

export type TransactionModel = {
  __typename?: 'TransactionModel';
  id?: Maybe<Scalars['String']>;
  income?: Maybe<Scalars['Float']>;
  month?: Maybe<Scalars['String']>;
};

export type TransactionOutput = {
  __typename?: 'TransactionOutput';
  action?: Maybe<Scalars['String']>;
  authorization_amount?: Maybe<Scalars['Float']>;
  authorization_code?: Maybe<Scalars['Int']>;
  billing_address?: Maybe<TransactionAddressOutput>;
  echeck?: Maybe<TransactionEcheckOutput>;
  entered_by?: Maybe<Scalars['String']>;
  links?: Maybe<TransactionLinksOutput>;
  location_id?: Maybe<Scalars['String']>;
  response?: Maybe<TransactionResponseOutput>;
  transaction_id?: Maybe<Scalars['String']>;
};

export type TransactionResourceSpecification = {
  __typename?: 'TransactionResourceSpecification';
  end_received_date?: Maybe<Scalars['String']>;
  location_id?: Maybe<Scalars['String']>;
  start_received_date?: Maybe<Scalars['String']>;
};

export type TransactionResponseOutput = {
  __typename?: 'TransactionResponseOutput';
  authorization_code?: Maybe<Scalars['Int']>;
  environment?: Maybe<Scalars['String']>;
  preauth_desc?: Maybe<Scalars['String']>;
  preauth_result?: Maybe<Scalars['String']>;
  response_code?: Maybe<Scalars['String']>;
  response_desc?: Maybe<Scalars['String']>;
  response_type?: Maybe<Scalars['String']>;
};

export enum TransactionTypeEnum {
  Disbursed = 'DISBURSED',
  Latefee = 'LATEFEE',
  Munthlypymt = 'MUNTHLYPYMT',
  Mynthlyserfee = 'MYNTHLYSERFEE',
  Trueuppymt = 'TRUEUPPYMT',
  Volpayment = 'VOLPAYMENT',
  Withdrawl = 'WITHDRAWL'
}

export type TransactionsSearchCriteria = {
  __typename?: 'TransactionsSearchCriteria';
  home_organization_id?: Maybe<Scalars['String']>;
  page_index?: Maybe<Scalars['Int']>;
  page_size?: Maybe<Scalars['Int']>;
  resource_specific?: Maybe<TransactionResourceSpecification>;
};

export type TransferDetail = {
  __typename?: 'TransferDetail';
  accountName?: Maybe<Scalars['String']>;
  accountType?: Maybe<Scalars['String']>;
  chamber?: Maybe<ChamberByIdRef>;
  chamberId?: Maybe<Scalars['String']>;
  maskNumber?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type TwilioTokenOutput = {
  __typename?: 'TwilioTokenOutput';
  token?: Maybe<Scalars['String']>;
};

export type UrlOutput = {
  __typename?: 'URLOutput';
  url?: Maybe<Scalars['String']>;
};

export type UnderwritingCsvReportOutput = {
  __typename?: 'UnderwritingCsvReportOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<UnderwritingCsvReportOutputData>>>;
};

export type UnderwritingCsvReportOutputData = {
  __typename?: 'UnderwritingCsvReportOutputData';
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  filters?: Maybe<Scalars['Json']>;
  stage?: Maybe<UnderwritingCsvReportStage>;
  status?: Maybe<UnderwritingCsvReportStatus>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export enum UnderwritingCsvReportStage {
  Converted = 'converted',
  Fetched = 'fetched',
  Finished = 'finished',
  Initialized = 'initialized',
  Mapped = 'mapped',
  Started = 'started',
  Uploaded = 'uploaded'
}

export enum UnderwritingCsvReportStatus {
  Completed = 'completed',
  Failed = 'failed',
  Progress = 'progress'
}

export type UnderwritingDervDatapoint = {
  __typename?: 'UnderwritingDervDatapoint';
  description?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type UnderwritingMutations = {
  __typename?: 'UnderwritingMutations';
  businessSearch?: Maybe<Array<Maybe<BusinessSearch>>>;
  plaidAssets?: Maybe<PlaidReportOutput>;
  plaidTransaction?: Maybe<PlaidReportOutput>;
  runScoringReport?: Maybe<UnderwritingScoringReport>;
};


export type UnderwritingMutationsBusinessSearchArgs = {
  input?: InputMaybe<BusinessSearchInput>;
};


export type UnderwritingMutationsPlaidAssetsArgs = {
  input?: InputMaybe<PlaidInput>;
};


export type UnderwritingMutationsPlaidTransactionArgs = {
  input?: InputMaybe<PlaidInput>;
};


export type UnderwritingMutationsRunScoringReportArgs = {
  input?: InputMaybe<UnderwritingRunScoringReportInput>;
};

export type UnderwritingQueries = {
  __typename?: 'UnderwritingQueries';
  assetReportsByUser?: Maybe<PlaidReportList>;
  availableDervDatapoints?: Maybe<Array<Maybe<AvailableDerivatives>>>;
  calculateMonthlyObligationRatio?: Maybe<Scalars['Json']>;
  distinctScoringReportUserList?: Maybe<Array<Maybe<DistinctUserList>>>;
  /** Get the last business report for a given company name. */
  lastBusinessReportForCompany?: Maybe<BusinessSearch>;
  /** Get the last business report for a given customer. */
  lastBusinessReportForCustomer?: Maybe<BusinessSearch>;
  /** Get the last business report for a given user. */
  lastBusinessReportForUser?: Maybe<BusinessSearch>;
  lastPlaidAssetReportForUser?: Maybe<PlaidReportOutput>;
  lastPlaidTransactionReportForUser?: Maybe<PlaidReportOutput>;
  /** Get the report for business name which doesn't have any relation */
  lastReportForNoRelationBusiness?: Maybe<BusinessSearch>;
  /** Get the last underwriting report for a given customer. */
  lastScoringReportForCustomer?: Maybe<UnderwritingScoringReport>;
  /** Get the last underwriting report for a given user. */
  lastScoringReportForUser?: Maybe<UnderwritingScoringReport>;
  /** Get the total available business names which doesn't have any relation */
  noRelationBusinessAvailable?: Maybe<Array<Maybe<Scalars['String']>>>;
  ping?: Maybe<Scalars['String']>;
  /** Get the underwriting report history for a given customer. */
  scoringReportsByCustomer?: Maybe<UnderwritingScoringReportList>;
  /** Get the underwriting report history for a given user. */
  scoringReportsByUser?: Maybe<UnderwritingScoringReportList>;
  transactionReportsByUser?: Maybe<PlaidReportList>;
};


export type UnderwritingQueriesAssetReportsByUserArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<SortUnderwritingReportEnum>;
  userId: Scalars['ID'];
};


export type UnderwritingQueriesCalculateMonthlyObligationRatioArgs = {
  userId: Scalars['ID'];
};


export type UnderwritingQueriesLastBusinessReportForCompanyArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type UnderwritingQueriesLastBusinessReportForCustomerArgs = {
  customerId?: InputMaybe<Scalars['String']>;
};


export type UnderwritingQueriesLastBusinessReportForUserArgs = {
  userId: Scalars['ID'];
};


export type UnderwritingQueriesLastPlaidAssetReportForUserArgs = {
  input?: InputMaybe<PlaidInput>;
};


export type UnderwritingQueriesLastPlaidTransactionReportForUserArgs = {
  input?: InputMaybe<PlaidInput>;
};


export type UnderwritingQueriesLastReportForNoRelationBusinessArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type UnderwritingQueriesLastScoringReportForCustomerArgs = {
  customerId: Scalars['ID'];
};


export type UnderwritingQueriesLastScoringReportForUserArgs = {
  userId: Scalars['ID'];
};


export type UnderwritingQueriesScoringReportsByCustomerArgs = {
  customerId: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<SortUnderwritingReportEnum>;
};


export type UnderwritingQueriesScoringReportsByUserArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<SortUnderwritingReportEnum>;
  userId: Scalars['ID'];
};


export type UnderwritingQueriesTransactionReportsByUserArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<SortUnderwritingReportEnum>;
  userId: Scalars['ID'];
};

export type UnderwritingRunScoringReportInput = {
  address: Scalars['String'];
  city: Scalars['String'];
  customerId?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  ssn: Scalars['String'];
  state: Scalars['String'];
  userId: Scalars['ID'];
  zipCode: Scalars['String'];
};

export type UnderwritingScoringReport = {
  __typename?: 'UnderwritingScoringReport';
  createdAt?: Maybe<Scalars['String']>;
  datasources?: Maybe<Scalars['Json']>;
  id?: Maybe<Scalars['ID']>;
  input?: Maybe<UnderwritingScoringReportInput>;
  modules?: Maybe<Scalars['Json']>;
  user?: Maybe<UserOutput>;
};

export type UnderwritingScoringReportInput = {
  __typename?: 'UnderwritingScoringReportInput';
  address: Scalars['String'];
  city: Scalars['String'];
  customerId?: Maybe<Scalars['String']>;
  dob: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  ssn: Scalars['String'];
  state: Scalars['String'];
  userId?: Maybe<Scalars['String']>;
  zipCode: Scalars['String'];
};

export type UnderwritingScoringReportList = {
  __typename?: 'UnderwritingScoringReportList';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<UnderwritingScoringReport>>>;
};

export type UniqueSkill = {
  __typename?: 'UniqueSkill';
  type?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type UniqueToolStatus = {
  __typename?: 'UniqueToolStatus';
  isAlreadyUsed: Scalars['Boolean'];
  toolType: ElementTypeEnum;
};

export type UnreadNotificationCount = {
  __typename?: 'UnreadNotificationCount';
  Community?: Maybe<Scalars['Int']>;
  Money?: Maybe<Scalars['Int']>;
  Noums?: Maybe<Scalars['Int']>;
  Other?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type UpdateAccountFlagInput = {
  accountId: Scalars['ID'];
  isBulkPayment?: InputMaybe<Scalars['Boolean']>;
  isCampaignAccount?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateAdCampaignInput = {
  campaignId: Scalars['ID'];
  offerId?: InputMaybe<Scalars['String']>;
  paymentRef?: InputMaybe<Scalars['ID']>;
  status?: InputMaybe<AdCampaignInputStatus>;
};

export type UpdateCustomerDocumentInput = {
  documents: Array<DocumentInput>;
  type: DocumentType;
};

export type UpdateEventInput = {
  _id: Scalars['ID'];
  chamberId: Scalars['ID'];
  cohosts: Array<InputMaybe<CohostInput>>;
  description: Scalars['String'];
  duration?: InputMaybe<Scalars['Int']>;
  eventDate: Scalars['Date'];
  eventEndDate?: InputMaybe<Scalars['Date']>;
  frequency?: InputMaybe<Frequency>;
  icsFile?: InputMaybe<Scalars['String']>;
  invitations: Array<InputMaybe<InvitationInput>>;
  privacy: Privacy;
  recurring?: InputMaybe<Scalars['Boolean']>;
  recurringDetails?: InputMaybe<RecurringDetailsInput>;
  recurringEndDate?: InputMaybe<Scalars['Date']>;
  repeat?: InputMaybe<Scalars['Boolean']>;
  timezone: Scalars['String'];
  title: Scalars['String'];
  weekDays?: InputMaybe<WeekDays>;
};

export type UpdateGroupInvitation = {
  accept?: InputMaybe<Scalars['Boolean']>;
  inviteId: Scalars['ID'];
};

export type UpdateInvitation = {
  accept?: InputMaybe<Scalars['Boolean']>;
  inviteId?: InputMaybe<Scalars['String']>;
};

export type UpdateInvoiceDraftInput = {
  currency?: InputMaybe<AllCurrencyEnum>;
  dueDate?: InputMaybe<Scalars['ISODate']>;
  invoiceFrom?: InputMaybe<Scalars['String']>;
  invoiceNumber?: InputMaybe<Scalars['String']>;
  invoiceTo?: InputMaybe<Scalars['String']>;
  issueDate?: InputMaybe<Scalars['ISODate']>;
  lateFeeType?: InputMaybe<LateFeeType>;
  lateFeeValue?: InputMaybe<Scalars['Float']>;
  lineItems?: InputMaybe<Array<InputMaybe<InvoiceLineItemInput>>>;
  logoUrl?: InputMaybe<Scalars['String']>;
  notes?: InputMaybe<Scalars['String']>;
  noumId?: InputMaybe<Scalars['ID']>;
  paymentDetails?: InputMaybe<PaymentDetails>;
  paymentTerms?: InputMaybe<PaymentTerms>;
  summary?: InputMaybe<Scalars['String']>;
};

export type UpdateInvoiceLineItemInput = {
  currency?: InputMaybe<AllCurrencyEnum>;
  description?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Int']>;
  taxLabel?: InputMaybe<Scalars['String']>;
  taxRate?: InputMaybe<Scalars['Float']>;
  unitPrice?: InputMaybe<Scalars['Float']>;
};

export type UpdateInvoicePaymentInput = {
  amount?: InputMaybe<Scalars['Float']>;
  invoiceId?: InputMaybe<Scalars['ID']>;
  paidBy?: InputMaybe<Scalars['String']>;
  paymentDate?: InputMaybe<Scalars['ISODate']>;
  paymentId?: InputMaybe<Scalars['String']>;
};

export type UpdateInvoiceTagsInput = {
  invoice_id: Scalars['Float'];
  tags: Array<Scalars['String']>;
};

export type UpdateNoumClass = {
  description?: InputMaybe<Scalars['String']>;
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  questions?: InputMaybe<Array<InputMaybe<Scalars['JSONObject']>>>;
  reviewers?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<Scalars['String']>;
};

export type UpdateNoumContactInput = {
  apartmentNo?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  companyName?: InputMaybe<Scalars['String']>;
  contactId: Scalars['ID'];
  country?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  zipCode?: InputMaybe<Scalars['String']>;
};

export type UpdateNoumFileInput = {
  description?: InputMaybe<Scalars['String']>;
  fileId: Scalars['ID'];
  fileUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  visibilityRoles?: InputMaybe<Array<Scalars['ID']>>;
};

export type UpdateNoumLayoutSectionColumnInput = {
  background?: InputMaybe<Scalars['Boolean']>;
  columnId: Scalars['ID'];
};

export type UpdateNoumLayoutSectionInput = {
  background?: InputMaybe<Scalars['Boolean']>;
  columns?: InputMaybe<Array<InputMaybe<UpdateNoumLayoutSectionColumnInput>>>;
  columnsVerticalAlignType?: InputMaybe<NoumLayoutSectionVerticalAlignType>;
  sectionId?: InputMaybe<Scalars['ID']>;
  type?: InputMaybe<NoumLayoutSectionType>;
};

export type UpdateNoumProgram = {
  description?: InputMaybe<Scalars['String']>;
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateNoumReferencePayload = {
  capacity?: InputMaybe<NoumReferenceCapacity>;
  imageUrl?: InputMaybe<Scalars['String']>;
  providerName?: InputMaybe<Scalars['String']>;
  referenceText?: InputMaybe<Scalars['String']>;
};

export type UpdateNoumRoleInput = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  noumRoleId: Scalars['ID'];
  permissionIDs?: InputMaybe<Array<Scalars['ID']>>;
};

export type UpdatePaymentProviderInput = {
  available?: InputMaybe<Scalars['Boolean']>;
  chargePercentage?: InputMaybe<Scalars['Float']>;
  chargeValue?: InputMaybe<Scalars['Float']>;
  feeAppliedTo?: InputMaybe<FeeApplied>;
  flowOfFunds?: InputMaybe<FlowofFundsEnum>;
  id?: InputMaybe<Scalars['String']>;
  invoiceFeeAppliedTo?: InputMaybe<FeeApplied>;
  invoicePayment?: InputMaybe<Scalars['Boolean']>;
  payeeCurrency?: InputMaybe<CurrencyEnum>;
  payerCurrency?: InputMaybe<CurrencyEnum>;
  paymentMethod?: InputMaybe<PaymentProviderMethodEnum>;
  preference?: InputMaybe<Scalars['Int']>;
  provider?: InputMaybe<PaymentChannelsEnum>;
  settlementPeriod?: InputMaybe<SettlementPeriodEnum>;
  source?: InputMaybe<PaymentProviderSourceEnum>;
  target?: InputMaybe<PaymentProviderSourceEnum>;
};

export type UpdateSowInput = {
  commission?: InputMaybe<Array<CommissionAndReimbursementInput>>;
  deliverables?: InputMaybe<Array<DeliverablesAndMilestonesInput>>;
  effectiveDate?: InputMaybe<Scalars['ISODate']>;
  expenseReimbursement?: InputMaybe<Array<CommissionAndReimbursementInput>>;
  fees?: InputMaybe<FeesCategoryInput>;
  linkedContract?: InputMaybe<Scalars['ID']>;
  linkedNoum?: InputMaybe<Scalars['ID']>;
  milestones?: InputMaybe<Array<DeliverablesAndMilestonesInput>>;
  scopeOfWork?: InputMaybe<Scalars['String']>;
  templateName?: InputMaybe<Scalars['String']>;
  timezone?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateSocialHallAttendeeInput = {
  location?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

export type UpdateSocialHallInput = {
  endTime?: InputMaybe<Scalars['Date']>;
  hosts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  startTime?: InputMaybe<Scalars['Date']>;
};

export type UpdateUserDataInput = {
  _id: Scalars['ID'];
  userType?: InputMaybe<NoumenaUserType>;
};

export enum UploadFor {
  Back = 'BACK',
  Front = 'FRONT',
  Merged = 'MERGED'
}

export type User = {
  __typename?: 'User';
  SocialHallTCAccepted?: Maybe<Scalars['Boolean']>;
  _id: Scalars['ID'];
  ageGroup?: Maybe<MaxMinValue>;
  bio?: Maybe<Scalars['String']>;
  chamber?: Maybe<ChamberByUserIdRef>;
  citizenship?: Maybe<Scalars['String']>;
  connections?: Maybe<Array<Maybe<Connections>>>;
  contact?: Maybe<Array<Maybe<Contact>>>;
  createdAt?: Maybe<Scalars['Date']>;
  credentials?: Maybe<Array<Maybe<UserCredentialsOutput>>>;
  dob?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  freelancingExperience?: Maybe<MaxMinValue>;
  getInvite?: Maybe<Array<Maybe<Invitation>>>;
  isAcceptedSkipMediaTesting?: Maybe<Scalars['Boolean']>;
  isPhoneVerified?: Maybe<Scalars['Boolean']>;
  lastCheckedNotificationsDate?: Maybe<Scalars['Date']>;
  lastName?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  metadata?: Maybe<Array<Maybe<LogsOutput>>>;
  middleName?: Maybe<Scalars['String']>;
  numericUserId?: Maybe<Scalars['Float']>;
  paymentTCAccepted?: Maybe<Scalars['Boolean']>;
  permissions?: Maybe<Array<Maybe<Scalars['String']>>>;
  phone?: Maybe<Scalars['String']>;
  profile?: Maybe<Profile>;
  referralCode?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<UserRoleOutput>>>;
  sendInvite?: Maybe<Array<Maybe<Invitation>>>;
  skills?: Maybe<Array<Maybe<Skill>>>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  unreadConnectionCount?: Maybe<Scalars['Int']>;
  usedReferralCodeOwnerName?: Maybe<Scalars['String']>;
  userAddress?: Maybe<AddressOutput>;
  userOwnReferralCode?: Maybe<Scalars['String']>;
  userSocialHall?: Maybe<UserSocialHall>;
  userStatus?: Maybe<Scalars['String']>;
  userType?: Maybe<NoumenaUserType>;
  username?: Maybe<Scalars['String']>;
  visibility?: Maybe<Visibility>;
};

export type UserAccessData = {
  __typename?: 'UserAccessData';
  accountNumber?: Maybe<Scalars['String']>;
  accountSubType?: Maybe<Scalars['String']>;
  accountType?: Maybe<Scalars['String']>;
  debitAccount?: Maybe<DebitAccountOutput>;
  institutionId?: Maybe<Scalars['String']>;
  institutionName?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  routingNumber?: Maybe<Scalars['String']>;
};

export type UserActionLog = {
  __typename?: 'UserActionLog';
  lastCheckedMessagesDate?: Maybe<Scalars['Date']>;
  lastCheckedNotificationsDate?: Maybe<Scalars['Date']>;
};

export type UserActionLogInput = {
  lastCheckedMessagesDate?: InputMaybe<Scalars['Date']>;
  lastCheckedNotificationsDate?: InputMaybe<Scalars['Date']>;
};

export type UserBankLinkOutput = {
  __typename?: 'UserBankLinkOutput';
  code?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type UserConfigOutput = {
  __typename?: 'UserConfigOutput';
  docScanCompleted?: Maybe<Scalars['Boolean']>;
  freelancingQuestions?: Maybe<Array<Maybe<QuestionsOutput>>>;
  idScanFlag?: Maybe<Scalars['Boolean']>;
  identityVerified?: Maybe<Scalars['Boolean']>;
  industries?: Maybe<Array<Maybe<Scalars['String']>>>;
  tempILILIMIT?: Maybe<Scalars['String']>;
};

export type UserConnectionGroupsId = {
  __typename?: 'UserConnectionGroupsId';
  connectionIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  groupIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type UserContractOutput = {
  __typename?: 'UserContractOutput';
  accountNumber?: Maybe<Scalars['String']>;
  applicationId?: Maybe<Scalars['String']>;
  applicationName?: Maybe<Scalars['String']>;
  approvedInvestmentAmount?: Maybe<Scalars['String']>;
  documents?: Maybe<Array<Maybe<DocumentOutput>>>;
  effectiveDate?: Maybe<Scalars['Date']>;
  initialMonthlyIncome?: Maybe<Scalars['String']>;
  maximumIncomePaymentRate?: Maybe<Scalars['String']>;
  maximumInvestmentReturn?: Maybe<Scalars['String']>;
  productCode?: Maybe<Scalars['String']>;
};

export type UserCredentialsOutput = {
  __typename?: 'UserCredentialsOutput';
  providerType?: Maybe<ProviderVariant>;
};

export type UserDataOutput = {
  __typename?: 'UserDataOutput';
  address?: Maybe<AddressOutput>;
  applicationStatus?: Maybe<Scalars['String']>;
  averageMonthlyExpense?: Maybe<Scalars['String']>;
  averageMonthlyIncome?: Maybe<Scalars['String']>;
  bestMonthlyIncome?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  docuSignRedirectURL?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  incomeFromTaxReturn?: Maybe<Scalars['String']>;
  industry?: Maybe<Scalars['String']>;
  isUSResident?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  questionAnswers?: Maybe<Array<Maybe<QuestionsAnswerOutput>>>;
  ssn?: Maybe<Scalars['String']>;
  taxEndPeriod?: Maybe<Scalars['String']>;
  worstMonthlyIncome?: Maybe<Scalars['String']>;
};

export type UserDeviceTokenOutput = {
  __typename?: 'UserDeviceTokenOutput';
  _id?: Maybe<Scalars['ID']>;
  deviceToken?: Maybe<Array<Maybe<DeviceTokenOutput>>>;
};

export type UserFavourites = {
  __typename?: 'UserFavourites';
  _id: Scalars['ID'];
  favouritedAt: Scalars['ISODate'];
  noum: SpaceOutput;
  order: Scalars['Int'];
};

export type UserFavouritesOutput = {
  __typename?: 'UserFavouritesOutput';
  count: Scalars['Int'];
  data: Array<UserFavourites>;
};

export type UserHistoryOutput = {
  __typename?: 'UserHistoryOutput';
  _id?: Maybe<Scalars['ID']>;
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  dob?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  updateById?: Maybe<User>;
  updatedAt?: Maybe<Scalars['Date']>;
  userId?: Maybe<User>;
  username?: Maybe<Scalars['String']>;
  zipcode?: Maybe<Scalars['String']>;
};

export type UserIdentityInput = {
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  dobMonth?: InputMaybe<Scalars['String']>;
  dobYear?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['String']>;
};

export type UserIncomeData = {
  averageMonthlyExpense?: InputMaybe<Scalars['String']>;
  averageMonthlyIncome?: InputMaybe<Scalars['String']>;
  bestMonthlyIncome?: InputMaybe<Scalars['String']>;
  incomeFromTaxReturn?: InputMaybe<Scalars['String']>;
  taxEndPeriod?: InputMaybe<Scalars['String']>;
  worstMonthlyIncome?: InputMaybe<Scalars['String']>;
};

export type UserInvoiceLineItemOutput = {
  __typename?: 'UserInvoiceLineItemOutput';
  count: Scalars['Int'];
  data?: Maybe<Array<Maybe<InvoiceLineItem>>>;
};

export type UserMonthlyDataOutput = {
  __typename?: 'UserMonthlyDataOutput';
  incomePaymentRate?: Maybe<Scalars['String']>;
  transactions?: Maybe<Array<Maybe<TransactionModel>>>;
};

export type UserNoumsFilter = {
  categoryIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  categoryNotIn?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  projectType?: InputMaybe<ProjectChamberType>;
  search?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<SpaceStatusEnum>;
};

export type UserOutput = {
  __typename?: 'UserOutput';
  SocialHallTCAccepted?: Maybe<Scalars['Boolean']>;
  _id: Scalars['ID'];
  ageGroup?: Maybe<MaxMinValue>;
  bio?: Maybe<Scalars['String']>;
  chamber?: Maybe<ChamberByUserIdRef>;
  citizenship?: Maybe<Scalars['String']>;
  connection?: Maybe<ConnectionType>;
  connections?: Maybe<Array<Maybe<UserOutputVisibilityTo>>>;
  createdAt?: Maybe<Scalars['Date']>;
  credentials?: Maybe<Array<Maybe<UserCredentialsOutput>>>;
  creditCheckResult?: Maybe<Scalars['String']>;
  dob?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  freelancingExperience?: Maybe<MaxMinValue>;
  getEventUserRole?: Maybe<CurrentUser>;
  isAcceptedSkipMediaTesting?: Maybe<Scalars['Boolean']>;
  isPhoneVerified?: Maybe<Scalars['Boolean']>;
  kycResult?: Maybe<Scalars['String']>;
  lastCheckedNotificationsDate?: Maybe<Scalars['Date']>;
  lastLoginAt?: Maybe<Scalars['Date']>;
  lastName?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  metadata?: Maybe<Array<Maybe<LogsOutput>>>;
  middleName?: Maybe<Scalars['String']>;
  numericUserId?: Maybe<Scalars['Float']>;
  paymentTCAccepted?: Maybe<Scalars['Boolean']>;
  phone?: Maybe<Scalars['String']>;
  profile?: Maybe<ProfileOutput>;
  profileUrl?: Maybe<Scalars['String']>;
  referralCode?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<UserRoleOutput>>>;
  skills?: Maybe<Array<Maybe<Skill>>>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  unMaskedEmail?: Maybe<Scalars['String']>;
  unreadConnectionCount?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Date']>;
  usedReferralCodeOwnerName?: Maybe<Scalars['String']>;
  userAddress?: Maybe<AddressOutput>;
  userOwnReferralCode?: Maybe<Scalars['String']>;
  userStatus?: Maybe<Scalars['String']>;
  userType?: Maybe<NoumenaUserType>;
  username?: Maybe<Scalars['String']>;
  visibility?: Maybe<UserOutputVisibility>;
  visibleTo?: Maybe<Array<Maybe<UserOutputVisibilityTo>>>;
};


export type UserOutputGetEventUserRoleArgs = {
  eventId?: InputMaybe<Scalars['ID']>;
};

export type UserOutputAllUsers = {
  __typename?: 'UserOutputAllUsers';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<UserOutput>>>;
};

export type UserOutputCount = {
  __typename?: 'UserOutputCount';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<UserOutputForGroup>>>;
};

export type UserOutputForGroup = {
  __typename?: 'UserOutputForGroup';
  _id?: Maybe<Scalars['ID']>;
  connection?: Maybe<ConnectionType>;
  user?: Maybe<UserOutput>;
};

export type UserOutputListUsersForAdmin = {
  __typename?: 'UserOutputListUsersForAdmin';
  data?: Maybe<Array<Maybe<UserOutput>>>;
  filter?: Maybe<ListUsersForAdminFilter>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  oldestUserCreatedAt?: Maybe<Scalars['Date']>;
  page?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
  totalPagesCount?: Maybe<Scalars['Int']>;
};

export type UserOutputVisibility = {
  __typename?: 'UserOutputVisibility';
  email?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type UserOutputVisibilityTo = {
  __typename?: 'UserOutputVisibilityTo';
  userid?: Maybe<Scalars['String']>;
};

export type UserPreferences = {
  __typename?: 'UserPreferences';
  emailSubscriptions: SubscriptionTypes;
  timezone?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type UserPreferencesInput = {
  emailSubscriptions?: InputMaybe<SubscriptionInput>;
  timezone?: InputMaybe<Scalars['String']>;
};

export type UserProfileInput = {
  SocialHallTCAccepted?: InputMaybe<Scalars['Boolean']>;
  additionalInfo?: InputMaybe<Scalars['String']>;
  ageGroup?: InputMaybe<MaxMinInput>;
  bio?: InputMaybe<Scalars['String']>;
  citizenship?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  freelancingExperience?: InputMaybe<MaxMinInput>;
  lastCheckedNotificationsDate?: InputMaybe<Scalars['Date']>;
  lastName?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  middleName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<ProfileInput>;
  profileUrl?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  visibility?: InputMaybe<VisibilityInput>;
};

export enum UserRelationType {
  Admin = 'ADMIN',
  All = 'ALL',
  Connected = 'CONNECTED',
  Others = 'OTHERS'
}

export enum UserRole {
  Cohost = 'COHOST',
  Host = 'HOST',
  None = 'NONE',
  Participant = 'PARTICIPANT'
}

export type UserRoleOutput = {
  __typename?: 'UserRoleOutput';
  _id: Scalars['ID'];
  permissions?: Maybe<Array<Maybe<Scalars['String']>>>;
  roleType?: Maybe<Scalars['String']>;
};

export type UserSearchResponse = {
  __typename?: 'UserSearchResponse';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<UserOutput>>>;
};

export type UserSelectedQuestionAndAnswersOutput = {
  __typename?: 'UserSelectedQuestionAndAnswersOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<UserSelectedQuestionAndAnswersOutputObject>>>;
};

export type UserSelectedQuestionAndAnswersOutputObject = {
  __typename?: 'UserSelectedQuestionAndAnswersOutputObject';
  userId?: Maybe<Scalars['ID']>;
  userSelection?: Maybe<Array<Maybe<UserSelectionForQuestionAndAnswers>>>;
};

export type UserSelectionForQuestionAndAnswers = {
  __typename?: 'UserSelectionForQuestionAndAnswers';
  _id?: Maybe<Scalars['ID']>;
  answer?: Maybe<Scalars['String']>;
  questionId?: Maybe<Scalars['ID']>;
};

export type UserSocialHall = {
  __typename?: 'UserSocialHall';
  _id?: Maybe<Scalars['ID']>;
  isActive: Scalars['Boolean'];
  name?: Maybe<Scalars['String']>;
  type?: Maybe<SocialHallType>;
  userId?: Maybe<Scalars['ID']>;
};

export enum UserSortableFields {
  Bio = 'bio',
  CreatedAt = 'createdAt',
  Email = 'email',
  FirstName = 'firstName',
  LastName = 'lastName',
  Location = 'location',
  MiddleName = 'middleName',
  Phone = 'phone',
  Status = 'status',
  Title = 'title',
  UpdatedAt = 'updatedAt',
  UserStatus = 'userStatus',
  Username = 'username'
}

export enum UserStatus {
  Active = 'ACTIVE',
  Deactivated = 'DEACTIVATED',
  Deleted = 'DELETED',
  Inactive = 'INACTIVE',
  Inreview = 'INREVIEW',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
  Unregistered = 'UNREGISTERED'
}

export enum UserType {
  Admin = 'ADMIN',
  All = 'ALL',
  Connected = 'CONNECTED'
}

export type ValidateInvoiceSequenceOutput = {
  __typename?: 'ValidateInvoiceSequenceOutput';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type VerifyMicroDeposit = {
  __typename?: 'VerifyMicroDeposit';
  amount1?: Maybe<CurrencyOutput>;
  amount2?: Maybe<CurrencyOutput>;
  createdAt?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type VerifyMicroDepositInput = {
  id: Scalars['String'];
  microDeposits: MicroDepositAmountInput;
};

export type Visibility = {
  __typename?: 'Visibility';
  email?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type VisibilityInput = {
  email?: InputMaybe<VisibilityType>;
  location?: InputMaybe<VisibilityType>;
  phone?: InputMaybe<VisibilityType>;
};

export enum VisibilityType {
  All = 'ALL',
  Connections = 'CONNECTIONS',
  User = 'USER'
}

export type WalletDetails = {
  __typename?: 'WalletDetails';
  balance?: Maybe<Scalars['String']>;
  walletName?: Maybe<Scalars['String']>;
};

export type WalletExistDetailType = {
  __typename?: 'WalletExistDetailType';
  sourceWallet: Scalars['Boolean'];
  sourceWalletDetail?: Maybe<AccountListOutput>;
  targetWallet: Scalars['Boolean'];
  targetWalletDetail?: Maybe<Array<Maybe<AccountListOutput>>>;
};

export type WalletExistType = {
  __typename?: 'WalletExistType';
  source: Scalars['Boolean'];
  sourceId?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  target: Scalars['Boolean'];
  targetId?: Maybe<Scalars['String']>;
};

export enum WalletLimitType {
  Annual = 'ANNUAL',
  Daily = 'DAILY',
  NoLimit = 'NO_LIMIT'
}

export enum WeekDays {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export enum ActionType {
  Active = 'ACTIVE',
  Deactivated = 'DEACTIVATED',
  Inactive = 'INACTIVE',
  Inreview = 'INREVIEW',
  Pending = 'PENDING',
  Registered = 'REGISTERED',
  Rejected = 'REJECTED',
  Unregistered = 'UNREGISTERED'
}

export type AddBankResponse = {
  __typename?: 'addBankResponse';
  code?: Maybe<Scalars['String']>;
  data?: Maybe<Array<Maybe<RiseBankListOutput>>>;
  message?: Maybe<Scalars['String']>;
  requestId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export enum ApplicationStatus {
  Approved = 'APPROVED',
  Close = 'CLOSE',
  Completed = 'COMPLETED',
  Expired = 'EXPIRED',
  InProgress = 'IN_PROGRESS',
  Rejected = 'REJECTED'
}

export type BelvoAccessTokenInput = {
  company_benefit_content?: InputMaybe<Scalars['String']>;
  company_benefit_header?: InputMaybe<Scalars['String']>;
  company_icon?: InputMaybe<Scalars['String']>;
  company_logo?: InputMaybe<Scalars['String']>;
  company_name?: InputMaybe<Scalars['String']>;
  opportunity_loss?: InputMaybe<Scalars['String']>;
};

export enum BelvoError {
  Report = 'REPORT',
  Retry = 'RETRY'
}

export type CommentsWithPagination = {
  __typename?: 'commentsWithPagination';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<Comments>>>;
};

export enum ConnectionTypeEnum {
  Connection = 'CONNECTION',
  Invite = 'INVITE'
}

export type CreateCustomerDocumentsOutput = {
  __typename?: 'createCustomerDocumentsOutput';
  message?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type CreatePaymentInput = {
  amount: Scalars['Float'];
  currency: CurrencyEnum;
  destinationAccountId: Scalars['String'];
  errorObj?: InputMaybe<Scalars['Boolean']>;
  idempotencyKey: Scalars['String'];
  passCode: Scalars['String'];
  requestOriginator: RequestOriginatorsEnum;
  saveCard?: InputMaybe<Scalars['Boolean']>;
  settlementPeriod: SettlementPeriodEnum;
  sourceAccountId: Scalars['String'];
  tenantId: Scalars['String'];
  transactionReason?: InputMaybe<Scalars['String']>;
  transactionType: TransactionTypeEnum;
};

export type CreateSubLedgerInput = {
  amount: Scalars['Float'];
  chamberId: Scalars['String'];
  currency?: InputMaybe<CurrencyEnum>;
  name: Scalars['String'];
};

export type CreateSubLedgerOutput = {
  __typename?: 'createSubLedgerOutput';
  accountId?: Maybe<Scalars['String']>;
  chamberId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type DistinctUserList = {
  __typename?: 'distinctUserList';
  userId?: Maybe<UserOutput>;
};

export type DownloadDocumentOutput = {
  __typename?: 'downloadDocumentOutput';
  url?: Maybe<Scalars['String']>;
};

export type GenerateCsvInput = {
  otherParam?: InputMaybe<Scalars['String']>;
};

export type GenerateCsvResponse = {
  __typename?: 'generateCsvResponse';
  url: Scalars['String'];
};

export type GetOtpStatsOutput = {
  __typename?: 'getOtpStatsOutput';
  _id?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  email?: Maybe<Scalars['String']>;
  event?: Maybe<Scalars['String']>;
  isLogin?: Maybe<Scalars['Boolean']>;
  timestamp?: Maybe<Scalars['Float']>;
  updatedAt?: Maybe<Scalars['Date']>;
  verified?: Maybe<Scalars['Boolean']>;
};

export type GetUserDetailsOutput = {
  __typename?: 'getUserDetailsOutput';
  accountType?: Maybe<AccountType>;
  dateOfRegistration?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  subWalletDetails?: Maybe<WalletDetails>;
  uid?: Maybe<UserOutput>;
  walletDetails?: Maybe<WalletDetails>;
};

export type InviteNonNoumUserOutput = {
  __typename?: 'inviteNonNoumUserOutput';
  _id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  isVerified?: Maybe<Scalars['Boolean']>;
  requestedForNoumId?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  uid?: Maybe<UserOutput>;
};

export type InviteNonNoumUsersOutput = {
  __typename?: 'inviteNonNoumUsersOutput';
  count?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Maybe<InviteNonNoumUserOutput>>>;
};

export enum InviteType {
  Group = 'GROUP',
  Private = 'PRIVATE'
}

export type IsUserSocialHallAttendee = {
  __typename?: 'isUserSocialHallAttendee';
  socialHallId?: Maybe<Scalars['ID']>;
  status?: Maybe<Scalars['Boolean']>;
};

export type KeyPair = {
  __typename?: 'keyPair';
  key?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
};

export type MyFeedFilters = {
  usersType?: InputMaybe<Array<InputMaybe<UserType>>>;
};

export enum OperationType {
  Activation = 'ACTIVATION',
  Archived = 'ARCHIVED',
  Renewal = 'RENEWAL'
}

export enum OrderByValues {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PayType = {
  __typename?: 'payType';
  key?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  reasons?: Maybe<Array<Maybe<KeyPair>>>;
};

export enum PaymentChannelsEnum {
  Dwolla = 'DWOLLA',
  Stripe = 'STRIPE'
}

export type PaymentConfigOutput = {
  __typename?: 'paymentConfigOutput';
  paymentChannel?: Maybe<Array<Maybe<KeyPair>>>;
  paymentType?: Maybe<Array<Maybe<PayType>>>;
};

export type StripePaymentMethodInput = {
  transactionId: Scalars['String'];
};

export type SubmitOnboardingQuestionnaire = {
  answer: Scalars['String'];
  countryCode?: InputMaybe<Scalars['String']>;
  questionId: Scalars['ID'];
};

export type SubmitOnboardingQuestionnaireOutput = {
  __typename?: 'submitOnboardingQuestionnaireOutput';
  userStatus?: Maybe<Scalars['String']>;
};

export type UnreadCountOutput = {
  __typename?: 'unreadCountOutput';
  badge?: Maybe<Scalars['Int']>;
};

/** Input type Starts here */
export type UpdateUserByAdminInput = {
  address?: InputMaybe<AddressInput>;
  country?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  kyc?: InputMaybe<KycInput>;
  lastName?: InputMaybe<Scalars['String']>;
  userId: Scalars['ID'];
  username?: InputMaybe<Scalars['String']>;
};

export type UploadDcoumentInput = {
  contentType?: InputMaybe<Scalars['String']>;
  documentName?: InputMaybe<Scalars['String']>;
};

export type UploadDocumentOutput = {
  __typename?: 'uploadDocumentOutput';
  documentName?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type UserInput = {
  _id: Scalars['ID'];
  action: ActionType;
  moreInfo?: InputMaybe<Scalars['String']>;
  reason: Scalars['String'];
};

export type ValidateResetPasswordOutput = {
  __typename?: 'validateResetPasswordOutput';
  message?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};
