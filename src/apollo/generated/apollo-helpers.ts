import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AccountListOutputKeySpecifier = ('accountName' | 'accountType' | 'balance' | 'chamber' | 'chamberId' | 'createdAt' | 'customerName' | 'id' | 'isBulkPayment' | 'isCampaignAccount' | 'maskAccountNumber' | 'masterWalletId' | 'meta' | 'microDeposits' | 'paymentChannel' | 'primary' | 'status' | 'tokenStatus' | 'updatedAt' | 'userId' | 'walletName' | AccountListOutputKeySpecifier)[];
export type AccountListOutputFieldPolicy = {
	accountName?: FieldPolicy<any> | FieldReadFunction<any>,
	accountType?: FieldPolicy<any> | FieldReadFunction<any>,
	balance?: FieldPolicy<any> | FieldReadFunction<any>,
	chamber?: FieldPolicy<any> | FieldReadFunction<any>,
	chamberId?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	customerName?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isBulkPayment?: FieldPolicy<any> | FieldReadFunction<any>,
	isCampaignAccount?: FieldPolicy<any> | FieldReadFunction<any>,
	maskAccountNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	masterWalletId?: FieldPolicy<any> | FieldReadFunction<any>,
	meta?: FieldPolicy<any> | FieldReadFunction<any>,
	microDeposits?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentChannel?: FieldPolicy<any> | FieldReadFunction<any>,
	primary?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>,
	walletName?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AccountListOutputV2KeySpecifier = ('count' | 'data' | AccountListOutputV2KeySpecifier)[];
export type AccountListOutputV2FieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AccountLogsOutputKeySpecifier = ('_id' | 'accountId' | 'operationType' | 'target' | 'updatedAt' | 'updatedBy' | 'updates' | AccountLogsOutputKeySpecifier)[];
export type AccountLogsOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	accountId?: FieldPolicy<any> | FieldReadFunction<any>,
	operationType?: FieldPolicy<any> | FieldReadFunction<any>,
	target?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedBy?: FieldPolicy<any> | FieldReadFunction<any>,
	updates?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ActiveNoumInvitationKeySpecifier = ('_id' | 'invitedAt' | ActiveNoumInvitationKeySpecifier)[];
export type ActiveNoumInvitationFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	invitedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AdCampaignAudienceOutputKeySpecifier = ('category' | 'moreText' | 'targetLanguage' | 'targetLocation' | AdCampaignAudienceOutputKeySpecifier)[];
export type AdCampaignAudienceOutputFieldPolicy = {
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	moreText?: FieldPolicy<any> | FieldReadFunction<any>,
	targetLanguage?: FieldPolicy<any> | FieldReadFunction<any>,
	targetLocation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AdCampaignCsvReportListOutputKeySpecifier = ('count' | 'data' | AdCampaignCsvReportListOutputKeySpecifier)[];
export type AdCampaignCsvReportListOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AdCampaignCsvReportOutputKeySpecifier = ('_id' | 'createdAt' | 'filters' | 'stage' | 'status' | 'type' | 'updatedAt' | AdCampaignCsvReportOutputKeySpecifier)[];
export type AdCampaignCsvReportOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	filters?: FieldPolicy<any> | FieldReadFunction<any>,
	stage?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AdCampaignOfferKeySpecifier = ('_id' | 'campaignId' | 'clicksWeekly' | 'costTotal' | 'costWeekly' | 'cpc' | 'createdAt' | 'createdBy' | 'endAt' | 'goalConnectedUsers' | 'goalNoumVisibility' | 'message' | 'oid' | 'reachTotal' | 'rejectReason' | 'sentAt' | 'startAt' | 'status' | 'updatedAt' | 'updatedBy' | AdCampaignOfferKeySpecifier)[];
export type AdCampaignOfferFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	campaignId?: FieldPolicy<any> | FieldReadFunction<any>,
	clicksWeekly?: FieldPolicy<any> | FieldReadFunction<any>,
	costTotal?: FieldPolicy<any> | FieldReadFunction<any>,
	costWeekly?: FieldPolicy<any> | FieldReadFunction<any>,
	cpc?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>,
	endAt?: FieldPolicy<any> | FieldReadFunction<any>,
	goalConnectedUsers?: FieldPolicy<any> | FieldReadFunction<any>,
	goalNoumVisibility?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	oid?: FieldPolicy<any> | FieldReadFunction<any>,
	reachTotal?: FieldPolicy<any> | FieldReadFunction<any>,
	rejectReason?: FieldPolicy<any> | FieldReadFunction<any>,
	sentAt?: FieldPolicy<any> | FieldReadFunction<any>,
	startAt?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedBy?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AdCampaignOfferGoalsConnectedUsersKeySpecifier = ('currentFollowers' | 'currentUsers' | 'predictedFollowers' | 'predictedUsers' | AdCampaignOfferGoalsConnectedUsersKeySpecifier)[];
export type AdCampaignOfferGoalsConnectedUsersFieldPolicy = {
	currentFollowers?: FieldPolicy<any> | FieldReadFunction<any>,
	currentUsers?: FieldPolicy<any> | FieldReadFunction<any>,
	predictedFollowers?: FieldPolicy<any> | FieldReadFunction<any>,
	predictedUsers?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AdCampaignOfferGoalsNoumVisibilityKeySpecifier = ('currentViews' | 'predictedViews' | AdCampaignOfferGoalsNoumVisibilityKeySpecifier)[];
export type AdCampaignOfferGoalsNoumVisibilityFieldPolicy = {
	currentViews?: FieldPolicy<any> | FieldReadFunction<any>,
	predictedViews?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AdCampaignOfferPaginatedKeySpecifier = ('count' | 'data' | AdCampaignOfferPaginatedKeySpecifier)[];
export type AdCampaignOfferPaginatedFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AdCampaignOutputKeySpecifier = ('_id' | 'adId' | 'audience' | 'budgetAmount' | 'budgetType' | 'createdAt' | 'createdBy' | 'endDate' | 'goals' | 'isDeleted' | 'noumId' | 'otherGoals' | 'paymentRef' | 'paymentRefHistory' | 'paymentRefStatus' | 'startDate' | 'status' | 'title' | 'updatedAt' | 'updatedBy' | AdCampaignOutputKeySpecifier)[];
export type AdCampaignOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	adId?: FieldPolicy<any> | FieldReadFunction<any>,
	audience?: FieldPolicy<any> | FieldReadFunction<any>,
	budgetAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	budgetType?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>,
	endDate?: FieldPolicy<any> | FieldReadFunction<any>,
	goals?: FieldPolicy<any> | FieldReadFunction<any>,
	isDeleted?: FieldPolicy<any> | FieldReadFunction<any>,
	noumId?: FieldPolicy<any> | FieldReadFunction<any>,
	otherGoals?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentRef?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentRefHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentRefStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	startDate?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedBy?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AdCampaignOutputPaginatedKeySpecifier = ('count' | 'data' | AdCampaignOutputPaginatedKeySpecifier)[];
export type AdCampaignOutputPaginatedFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AdCampaignReportMetricsOutputKeySpecifier = ('avgCPC' | 'clicks' | 'cost' | 'ctr' | 'impressions' | AdCampaignReportMetricsOutputKeySpecifier)[];
export type AdCampaignReportMetricsOutputFieldPolicy = {
	avgCPC?: FieldPolicy<any> | FieldReadFunction<any>,
	clicks?: FieldPolicy<any> | FieldReadFunction<any>,
	cost?: FieldPolicy<any> | FieldReadFunction<any>,
	ctr?: FieldPolicy<any> | FieldReadFunction<any>,
	impressions?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AdCampaignReportOutputKeySpecifier = ('_id' | 'campaignId' | 'clientMessage' | 'createdAt' | 'createdBy' | 'isDeleted' | 'metrics' | 'reportDate' | 'reportId' | 'status' | 'updatedAt' | 'updatedBy' | AdCampaignReportOutputKeySpecifier)[];
export type AdCampaignReportOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	campaignId?: FieldPolicy<any> | FieldReadFunction<any>,
	clientMessage?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>,
	isDeleted?: FieldPolicy<any> | FieldReadFunction<any>,
	metrics?: FieldPolicy<any> | FieldReadFunction<any>,
	reportDate?: FieldPolicy<any> | FieldReadFunction<any>,
	reportId?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedBy?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AdCampaignReportsOutputPaginatedKeySpecifier = ('count' | 'data' | AdCampaignReportsOutputPaginatedKeySpecifier)[];
export type AdCampaignReportsOutputPaginatedFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AdCampaignSettingsOutputKeySpecifier = ('settingsType' | 'settingsValue' | AdCampaignSettingsOutputKeySpecifier)[];
export type AdCampaignSettingsOutputFieldPolicy = {
	settingsType?: FieldPolicy<any> | FieldReadFunction<any>,
	settingsValue?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AddressOutputKeySpecifier = ('apartment' | 'city' | 'state' | 'street' | 'zipcode' | AddressOutputKeySpecifier)[];
export type AddressOutputFieldPolicy = {
	apartment?: FieldPolicy<any> | FieldReadFunction<any>,
	city?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>,
	street?: FieldPolicy<any> | FieldReadFunction<any>,
	zipcode?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AdminGroupOutputKeySpecifier = ('ADMIN' | 'MEMBER' | AdminGroupOutputKeySpecifier)[];
export type AdminGroupOutputFieldPolicy = {
	ADMIN?: FieldPolicy<any> | FieldReadFunction<any>,
	MEMBER?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AdminReportsOutputCollectionKeySpecifier = ('count' | 'data' | AdminReportsOutputCollectionKeySpecifier)[];
export type AdminReportsOutputCollectionFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AdminReportsOutputTypeKeySpecifier = ('_id' | 'files' | 'filters' | 'generatedBy' | 'reportType' | 'stage' | 'status' | AdminReportsOutputTypeKeySpecifier)[];
export type AdminReportsOutputTypeFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	files?: FieldPolicy<any> | FieldReadFunction<any>,
	filters?: FieldPolicy<any> | FieldReadFunction<any>,
	generatedBy?: FieldPolicy<any> | FieldReadFunction<any>,
	reportType?: FieldPolicy<any> | FieldReadFunction<any>,
	stage?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AllNotesOutputKeySpecifier = ('data' | 'total' | AllNotesOutputKeySpecifier)[];
export type AllNotesOutputFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AllReferralInviteeKeySpecifier = ('count' | 'data' | AllReferralInviteeKeySpecifier)[];
export type AllReferralInviteeFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AllTransactionLinksOutputKeySpecifier = ('self' | AllTransactionLinksOutputKeySpecifier)[];
export type AllTransactionLinksOutputFieldPolicy = {
	self?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AllTransactionParentResponseOutputKeySpecifier = ('environment' | 'response_desc' | AllTransactionParentResponseOutputKeySpecifier)[];
export type AllTransactionParentResponseOutputFieldPolicy = {
	environment?: FieldPolicy<any> | FieldReadFunction<any>,
	response_desc?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AllTransactionResponseOutputKeySpecifier = ('authorization_code' | 'response_code' | AllTransactionResponseOutputKeySpecifier)[];
export type AllTransactionResponseOutputFieldPolicy = {
	authorization_code?: FieldPolicy<any> | FieldReadFunction<any>,
	response_code?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AllTransactionsResultOutputKeySpecifier = ('action' | 'authorization_amount' | 'authorization_code' | 'billing_address' | 'echeck' | 'entered_by' | 'links' | 'location_id' | 'organization_id' | 'received_date' | 'response' | 'status' | 'transaction_id' | AllTransactionsResultOutputKeySpecifier)[];
export type AllTransactionsResultOutputFieldPolicy = {
	action?: FieldPolicy<any> | FieldReadFunction<any>,
	authorization_amount?: FieldPolicy<any> | FieldReadFunction<any>,
	authorization_code?: FieldPolicy<any> | FieldReadFunction<any>,
	billing_address?: FieldPolicy<any> | FieldReadFunction<any>,
	echeck?: FieldPolicy<any> | FieldReadFunction<any>,
	entered_by?: FieldPolicy<any> | FieldReadFunction<any>,
	links?: FieldPolicy<any> | FieldReadFunction<any>,
	location_id?: FieldPolicy<any> | FieldReadFunction<any>,
	organization_id?: FieldPolicy<any> | FieldReadFunction<any>,
	received_date?: FieldPolicy<any> | FieldReadFunction<any>,
	response?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AmountDueOutputKeySpecifier = ('amountDue' | 'dueDate' | 'indicatorType' | 'statementUrl' | AmountDueOutputKeySpecifier)[];
export type AmountDueOutputFieldPolicy = {
	amountDue?: FieldPolicy<any> | FieldReadFunction<any>,
	dueDate?: FieldPolicy<any> | FieldReadFunction<any>,
	indicatorType?: FieldPolicy<any> | FieldReadFunction<any>,
	statementUrl?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AnswerOptionsKeySpecifier = ('answer' | 'description' | AnswerOptionsKeySpecifier)[];
export type AnswerOptionsFieldPolicy = {
	answer?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AnswerOutputKeySpecifier = ('_id' | 'body' | 'createdAt' | 'spaceId' | 'tipDetails' | 'updatedAt' | 'user' | AnswerOutputKeySpecifier)[];
export type AnswerOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	body?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	spaceId?: FieldPolicy<any> | FieldReadFunction<any>,
	tipDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AnswersOutputResponseKeySpecifier = ('data' | 'totalCount' | AnswersOutputResponseKeySpecifier)[];
export type AnswersOutputResponseFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppActivitiesOutputKeySpecifier = ('count' | 'data' | AppActivitiesOutputKeySpecifier)[];
export type AppActivitiesOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppActivityKeySpecifier = ('_id' | 'createdAt' | 'payload' | 'sourceNoum' | 'sourceUser' | 'targetNoum' | 'targetUser' | 'targetUsers' | 'type' | 'updatedAt' | AppActivityKeySpecifier)[];
export type AppActivityFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	payload?: FieldPolicy<any> | FieldReadFunction<any>,
	sourceNoum?: FieldPolicy<any> | FieldReadFunction<any>,
	sourceUser?: FieldPolicy<any> | FieldReadFunction<any>,
	targetNoum?: FieldPolicy<any> | FieldReadFunction<any>,
	targetUser?: FieldPolicy<any> | FieldReadFunction<any>,
	targetUsers?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AppActivityPayloadKeySpecifier = ('conversation' | 'event' | 'noumMember' | 'payment' | 'post' | AppActivityPayloadKeySpecifier)[];
export type AppActivityPayloadFieldPolicy = {
	conversation?: FieldPolicy<any> | FieldReadFunction<any>,
	event?: FieldPolicy<any> | FieldReadFunction<any>,
	noumMember?: FieldPolicy<any> | FieldReadFunction<any>,
	payment?: FieldPolicy<any> | FieldReadFunction<any>,
	post?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ApplicationResultKeySpecifier = ('_id' | 'noumId' | 'parentNoumId' | 'questions' | 'resultJSON' | 'score' | 'status' | 'uid' | ApplicationResultKeySpecifier)[];
export type ApplicationResultFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	noumId?: FieldPolicy<any> | FieldReadFunction<any>,
	parentNoumId?: FieldPolicy<any> | FieldReadFunction<any>,
	questions?: FieldPolicy<any> | FieldReadFunction<any>,
	resultJSON?: FieldPolicy<any> | FieldReadFunction<any>,
	score?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ApplicationResultResponseKeySpecifier = ('count' | 'data' | ApplicationResultResponseKeySpecifier)[];
export type ApplicationResultResponseFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AssessmentPDFOutputKeySpecifier = ('assessmentPDFUrl' | 'message' | 'success' | AssessmentPDFOutputKeySpecifier)[];
export type AssessmentPDFOutputFieldPolicy = {
	assessmentPDFUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AttendeesKeySpecifier = ('chamberId' | 'invitationId' | 'invitationStatus' | 'userId' | 'userRole' | AttendeesKeySpecifier)[];
export type AttendeesFieldPolicy = {
	chamberId?: FieldPolicy<any> | FieldReadFunction<any>,
	invitationId?: FieldPolicy<any> | FieldReadFunction<any>,
	invitationStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>,
	userRole?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AttendeesMetaKeySpecifier = ('attendeesCount' | 'blockedCount' | 'pendingCount' | AttendeesMetaKeySpecifier)[];
export type AttendeesMetaFieldPolicy = {
	attendeesCount?: FieldPolicy<any> | FieldReadFunction<any>,
	blockedCount?: FieldPolicy<any> | FieldReadFunction<any>,
	pendingCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AvailableDerivativesKeySpecifier = ('category' | 'derivatives' | AvailableDerivativesKeySpecifier)[];
export type AvailableDerivativesFieldPolicy = {
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	derivatives?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AvailableNoumRoleKeySpecifier = ('_id' | 'description' | 'name' | AvailableNoumRoleKeySpecifier)[];
export type AvailableNoumRoleFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BankAccountBalanceKeySpecifier = ('balance' | 'clientAccountId' | 'id' | 'maskAccountNumber' | BankAccountBalanceKeySpecifier)[];
export type BankAccountBalanceFieldPolicy = {
	balance?: FieldPolicy<any> | FieldReadFunction<any>,
	clientAccountId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	maskAccountNumber?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BankAccountOutputKeySpecifier = ('accountNumber' | 'accountSubType' | 'accountType' | BankAccountOutputKeySpecifier)[];
export type BankAccountOutputFieldPolicy = {
	accountNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	accountSubType?: FieldPolicy<any> | FieldReadFunction<any>,
	accountType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BankDetailsOutputKeySpecifier = ('accountNumber' | 'accountSubType' | 'accountType' | BankDetailsOutputKeySpecifier)[];
export type BankDetailsOutputFieldPolicy = {
	accountNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	accountSubType?: FieldPolicy<any> | FieldReadFunction<any>,
	accountType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BankListOutputKeySpecifier = ('accountDetails' | 'accountNumber' | 'accountSubType' | 'accountType' | 'id' | 'isExpired' | 'logo' | 'name' | BankListOutputKeySpecifier)[];
export type BankListOutputFieldPolicy = {
	accountDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	accountNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	accountSubType?: FieldPolicy<any> | FieldReadFunction<any>,
	accountType?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isExpired?: FieldPolicy<any> | FieldReadFunction<any>,
	logo?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BankMetaKeySpecifier = ('name' | 'orgLogo' | 'orgName' | BankMetaKeySpecifier)[];
export type BankMetaFieldPolicy = {
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	orgLogo?: FieldPolicy<any> | FieldReadFunction<any>,
	orgName?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BasicConversationItemKeySpecifier = ('conversation' | 'last_updatedAt' | 'unread' | BasicConversationItemKeySpecifier)[];
export type BasicConversationItemFieldPolicy = {
	conversation?: FieldPolicy<any> | FieldReadFunction<any>,
	last_updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	unread?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BelvoAccessTokenKeySpecifier = ('access' | 'refresh' | BelvoAccessTokenKeySpecifier)[];
export type BelvoAccessTokenFieldPolicy = {
	access?: FieldPolicy<any> | FieldReadFunction<any>,
	refresh?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BlockedCountryKeySpecifier = ('code' | 'name' | BlockedCountryKeySpecifier)[];
export type BlockedCountryFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BlockedCountryOutputKeySpecifier = ('count' | 'data' | BlockedCountryOutputKeySpecifier)[];
export type BlockedCountryOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BusinessSearchKeySpecifier = ('createdAt' | 'customer' | 'customerId' | 'datasources' | 'id' | 'input' | 'modules' | 'user' | 'userId' | BusinessSearchKeySpecifier)[];
export type BusinessSearchFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	customer?: FieldPolicy<any> | FieldReadFunction<any>,
	customerId?: FieldPolicy<any> | FieldReadFunction<any>,
	datasources?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	input?: FieldPolicy<any> | FieldReadFunction<any>,
	modules?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BusinessSearchOutputKeySpecifier = ('city' | 'customerId' | 'geo' | 'name' | 'phone' | 'state' | 'street' | 'subcode' | 'taxId' | 'uid' | 'zip' | BusinessSearchOutputKeySpecifier)[];
export type BusinessSearchOutputFieldPolicy = {
	city?: FieldPolicy<any> | FieldReadFunction<any>,
	customerId?: FieldPolicy<any> | FieldReadFunction<any>,
	geo?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	phone?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>,
	street?: FieldPolicy<any> | FieldReadFunction<any>,
	subcode?: FieldPolicy<any> | FieldReadFunction<any>,
	taxId?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	zip?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CQFormKeySpecifier = ('completeness' | 'createdAt' | 'description' | 'details' | 'formId' | 'formType' | 'investability' | 'notes' | 'score' | 'status' | 'updatedAt' | CQFormKeySpecifier)[];
export type CQFormFieldPolicy = {
	completeness?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	details?: FieldPolicy<any> | FieldReadFunction<any>,
	formId?: FieldPolicy<any> | FieldReadFunction<any>,
	formType?: FieldPolicy<any> | FieldReadFunction<any>,
	investability?: FieldPolicy<any> | FieldReadFunction<any>,
	notes?: FieldPolicy<any> | FieldReadFunction<any>,
	score?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CQFormOutputKeySpecifier = ('createdAt' | 'forms' | 'noumId' | 'qualityIndex' | 'status' | 'uid' | 'updatedAt' | CQFormOutputKeySpecifier)[];
export type CQFormOutputFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	forms?: FieldPolicy<any> | FieldReadFunction<any>,
	noumId?: FieldPolicy<any> | FieldReadFunction<any>,
	qualityIndex?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CQGenerateSummaryKeySpecifier = ('message' | 'success' | CQGenerateSummaryKeySpecifier)[];
export type CQGenerateSummaryFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CQLogsOutputKeySpecifier = ('count' | 'data' | 'error' | CQLogsOutputKeySpecifier)[];
export type CQLogsOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	error?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CQNoteKeySpecifier = ('createdAt' | 'noteId' | 'notes' | 'uid' | 'underwriter' | 'updatedAt' | 'updatedBy' | CQNoteKeySpecifier)[];
export type CQNoteFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	noteId?: FieldPolicy<any> | FieldReadFunction<any>,
	notes?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	underwriter?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedBy?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CQNotesListKeySpecifier = ('count' | 'data' | CQNotesListKeySpecifier)[];
export type CQNotesListFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CQQualityAllKeySpecifier = ('current' | 'previous' | CQQualityAllKeySpecifier)[];
export type CQQualityAllFieldPolicy = {
	current?: FieldPolicy<any> | FieldReadFunction<any>,
	previous?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CQQualityLabelKeySpecifier = ('label' | 'value' | CQQualityLabelKeySpecifier)[];
export type CQQualityLabelFieldPolicy = {
	label?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CQQualityLogsKeySpecifier = ('createdAt' | 'noumId' | 'quality' | 'uid' | 'underwriter' | CQQualityLogsKeySpecifier)[];
export type CQQualityLogsFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	noumId?: FieldPolicy<any> | FieldReadFunction<any>,
	quality?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	underwriter?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CQQualityLogsOutputKeySpecifier = ('count' | 'data' | 'error' | CQQualityLogsOutputKeySpecifier)[];
export type CQQualityLogsOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	error?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CQScoreLogsKeySpecifier = ('createdAt' | 'reason' | 'score' | 'uid' | 'underwriter' | CQScoreLogsKeySpecifier)[];
export type CQScoreLogsFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	reason?: FieldPolicy<any> | FieldReadFunction<any>,
	score?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	underwriter?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CQSettingsKeySpecifier = ('_id' | 'settings' | 'settingsType' | CQSettingsKeySpecifier)[];
export type CQSettingsFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	settings?: FieldPolicy<any> | FieldReadFunction<any>,
	settingsType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CQSummaryReportKeySpecifier = ('data' | 'error' | CQSummaryReportKeySpecifier)[];
export type CQSummaryReportFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	error?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CQSummaryReportDataKeySpecifier = ('graph' | 'report' | CQSummaryReportDataKeySpecifier)[];
export type CQSummaryReportDataFieldPolicy = {
	graph?: FieldPolicy<any> | FieldReadFunction<any>,
	report?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CQUserListKeySpecifier = ('createdAt' | 'firstName' | 'forms' | 'lastName' | 'noumId' | 'qualityIndex' | 'status' | 'uid' | 'updatedAt' | 'userStatus' | CQUserListKeySpecifier)[];
export type CQUserListFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	forms?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	noumId?: FieldPolicy<any> | FieldReadFunction<any>,
	qualityIndex?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userStatus?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CQUserOutputKeySpecifier = ('count' | 'data' | 'error' | CQUserOutputKeySpecifier)[];
export type CQUserOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	error?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CQUserQualityUpdateOutputKeySpecifier = ('message' | 'success' | 'uid' | CQUserQualityUpdateOutputKeySpecifier)[];
export type CQUserQualityUpdateOutputFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CampaignAccountOutputKeySpecifier = ('accountName' | 'accountType' | 'customerName' | 'id' | 'maskAccountNumber' | 'primary' | 'walletName' | CampaignAccountOutputKeySpecifier)[];
export type CampaignAccountOutputFieldPolicy = {
	accountName?: FieldPolicy<any> | FieldReadFunction<any>,
	accountType?: FieldPolicy<any> | FieldReadFunction<any>,
	customerName?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	maskAccountNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	primary?: FieldPolicy<any> | FieldReadFunction<any>,
	walletName?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CapitalquotientMutationsKeySpecifier = ('addCQModelCoefficients' | 'addModifyCQNote' | 'cqHistoricalReportCreate' | 'generateCQSummaryReport' | 'generateScoreline' | 'generateUserCQ' | 'submitCQForm' | 'updateNoumenaScore' | 'updateNoumenaScoreVisibility' | 'updateUserQualityIndex' | CapitalquotientMutationsKeySpecifier)[];
export type CapitalquotientMutationsFieldPolicy = {
	addCQModelCoefficients?: FieldPolicy<any> | FieldReadFunction<any>,
	addModifyCQNote?: FieldPolicy<any> | FieldReadFunction<any>,
	cqHistoricalReportCreate?: FieldPolicy<any> | FieldReadFunction<any>,
	generateCQSummaryReport?: FieldPolicy<any> | FieldReadFunction<any>,
	generateScoreline?: FieldPolicy<any> | FieldReadFunction<any>,
	generateUserCQ?: FieldPolicy<any> | FieldReadFunction<any>,
	submitCQForm?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNoumenaScore?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNoumenaScoreVisibility?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserQualityIndex?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CapitalquotientQueriesKeySpecifier = ('cqHistoricalReportFetchAll' | 'cqHistoricalReportSignedUrl' | 'getAllCQLogsByUser' | 'getCQDetails' | 'getCQDetailsByUser' | 'getCQLogsByUser' | 'getCQModelCoefficients' | 'getCQNotesByUser' | 'getCQQualityLabels' | 'getCQQualityLogsByUser' | 'getCQSettings' | 'getCQSummaryReports' | 'getCQUsers' | 'getCQUsersPaginated' | 'getNoumenaScore' | 'getNoumenaScoreByNoumId' | 'getNoumenaScoreByUser' | 'getScoreLines' | 'pingCQ' | CapitalquotientQueriesKeySpecifier)[];
export type CapitalquotientQueriesFieldPolicy = {
	cqHistoricalReportFetchAll?: FieldPolicy<any> | FieldReadFunction<any>,
	cqHistoricalReportSignedUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	getAllCQLogsByUser?: FieldPolicy<any> | FieldReadFunction<any>,
	getCQDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	getCQDetailsByUser?: FieldPolicy<any> | FieldReadFunction<any>,
	getCQLogsByUser?: FieldPolicy<any> | FieldReadFunction<any>,
	getCQModelCoefficients?: FieldPolicy<any> | FieldReadFunction<any>,
	getCQNotesByUser?: FieldPolicy<any> | FieldReadFunction<any>,
	getCQQualityLabels?: FieldPolicy<any> | FieldReadFunction<any>,
	getCQQualityLogsByUser?: FieldPolicy<any> | FieldReadFunction<any>,
	getCQSettings?: FieldPolicy<any> | FieldReadFunction<any>,
	getCQSummaryReports?: FieldPolicy<any> | FieldReadFunction<any>,
	getCQUsers?: FieldPolicy<any> | FieldReadFunction<any>,
	getCQUsersPaginated?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumenaScore?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumenaScoreByNoumId?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumenaScoreByUser?: FieldPolicy<any> | FieldReadFunction<any>,
	getScoreLines?: FieldPolicy<any> | FieldReadFunction<any>,
	pingCQ?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CategoryWithSkillsKeySpecifier = ('_id' | 'name' | 'skills' | CategoryWithSkillsKeySpecifier)[];
export type CategoryWithSkillsFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	skills?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ChamberAuthorsKeySpecifier = ('count' | 'data' | ChamberAuthorsKeySpecifier)[];
export type ChamberAuthorsFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ChamberByIdRefKeySpecifier = ('_id' | 'fonts' | 'name' | 'profileImage' | 'profileImageThumbnail' | 'theme' | 'type' | 'uid' | ChamberByIdRefKeySpecifier)[];
export type ChamberByIdRefFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	fonts?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	profileImage?: FieldPolicy<any> | FieldReadFunction<any>,
	profileImageThumbnail?: FieldPolicy<any> | FieldReadFunction<any>,
	theme?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ChamberByUserIdRefKeySpecifier = ('_id' | 'name' | 'type' | 'uid' | 'userId' | ChamberByUserIdRefKeySpecifier)[];
export type ChamberByUserIdRefFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ChamberPostKeySpecifier = ('category' | 'content' | 'resolutions' | 'thumbnail' | ChamberPostKeySpecifier)[];
export type ChamberPostFieldPolicy = {
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	content?: FieldPolicy<any> | FieldReadFunction<any>,
	resolutions?: FieldPolicy<any> | FieldReadFunction<any>,
	thumbnail?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ChamberPostOutputKeySpecifier = ('_id' | 'chamberId' | 'comments' | 'commentsCount' | 'createdAt' | 'groupId' | 'isPinned' | 'pinnedTimestamp' | 'post' | 'postStatus' | 'reactions' | 'reactionsCount' | 'reports' | 'tags' | 'text' | 'uid' | 'updatedAt' | 'userReaction' | 'visibility' | ChamberPostOutputKeySpecifier)[];
export type ChamberPostOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	chamberId?: FieldPolicy<any> | FieldReadFunction<any>,
	comments?: FieldPolicy<any> | FieldReadFunction<any>,
	commentsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	groupId?: FieldPolicy<any> | FieldReadFunction<any>,
	isPinned?: FieldPolicy<any> | FieldReadFunction<any>,
	pinnedTimestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	post?: FieldPolicy<any> | FieldReadFunction<any>,
	postStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	reactions?: FieldPolicy<any> | FieldReadFunction<any>,
	reactionsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	reports?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	text?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userReaction?: FieldPolicy<any> | FieldReadFunction<any>,
	visibility?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ChamberPostOutputDataKeySpecifier = ('count' | 'data' | ChamberPostOutputDataKeySpecifier)[];
export type ChamberPostOutputDataFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ChameleonBankListOutputKeySpecifier = ('accountDetails' | 'accountNumber' | 'accountSubType' | 'accountType' | 'id' | 'isExpired' | 'logo' | 'name' | 'status' | ChameleonBankListOutputKeySpecifier)[];
export type ChameleonBankListOutputFieldPolicy = {
	accountDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	accountNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	accountSubType?: FieldPolicy<any> | FieldReadFunction<any>,
	accountType?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isExpired?: FieldPolicy<any> | FieldReadFunction<any>,
	logo?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CoManagerStatisticsKeySpecifier = ('eventsHosted' | 'membersInvited' | 'messagesSent' | 'postsPosted' | 'transactions' | CoManagerStatisticsKeySpecifier)[];
export type CoManagerStatisticsFieldPolicy = {
	eventsHosted?: FieldPolicy<any> | FieldReadFunction<any>,
	membersInvited?: FieldPolicy<any> | FieldReadFunction<any>,
	messagesSent?: FieldPolicy<any> | FieldReadFunction<any>,
	postsPosted?: FieldPolicy<any> | FieldReadFunction<any>,
	transactions?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CohostKeySpecifier = ('_id' | 'chamberId' | 'cohostChamberId' | 'status' | 'userId' | CohostKeySpecifier)[];
export type CohostFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	chamberId?: FieldPolicy<any> | FieldReadFunction<any>,
	cohostChamberId?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CommentOutputKeySpecifier = ('_id' | 'content' | 'createdAt' | 'replies' | 'tags' | 'uid' | 'updatedAt' | CommentOutputKeySpecifier)[];
export type CommentOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	content?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	replies?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CommentReplyReactionOutputKeySpecifier = ('commentId' | 'postId' | 'reactions' | 'threadId' | CommentReplyReactionOutputKeySpecifier)[];
export type CommentReplyReactionOutputFieldPolicy = {
	commentId?: FieldPolicy<any> | FieldReadFunction<any>,
	postId?: FieldPolicy<any> | FieldReadFunction<any>,
	reactions?: FieldPolicy<any> | FieldReadFunction<any>,
	threadId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CommentsKeySpecifier = ('_id' | 'content' | 'createdAt' | 'reactions' | 'replies' | 'tags' | 'uid' | 'updatedAt' | CommentsKeySpecifier)[];
export type CommentsFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	content?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	reactions?: FieldPolicy<any> | FieldReadFunction<any>,
	replies?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CommissionAndReimbursementKeySpecifier = ('amount' | 'description' | CommissionAndReimbursementKeySpecifier)[];
export type CommissionAndReimbursementFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ConfigOutputKeySpecifier = ('plaid' | 'stripe' | ConfigOutputKeySpecifier)[];
export type ConfigOutputFieldPolicy = {
	plaid?: FieldPolicy<any> | FieldReadFunction<any>,
	stripe?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ConnectedNoumsWithMemberKeySpecifier = ('count' | 'data' | ConnectedNoumsWithMemberKeySpecifier)[];
export type ConnectedNoumsWithMemberFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ConnectionByIdRefKeySpecifier = ('_id' | 'approvedAt' | 'message' | 'permission' | 'requestFrom' | 'requestTo' | 'requestedAt' | 'status' | 'type' | ConnectionByIdRefKeySpecifier)[];
export type ConnectionByIdRefFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	approvedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	permission?: FieldPolicy<any> | FieldReadFunction<any>,
	requestFrom?: FieldPolicy<any> | FieldReadFunction<any>,
	requestTo?: FieldPolicy<any> | FieldReadFunction<any>,
	requestedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ConnectionCheckKeySpecifier = ('_id' | 'connection' | ConnectionCheckKeySpecifier)[];
export type ConnectionCheckFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	connection?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ConnectionOutputResponseKeySpecifier = ('count' | 'data' | ConnectionOutputResponseKeySpecifier)[];
export type ConnectionOutputResponseFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ConnectionsKeySpecifier = ('userid' | ConnectionsKeySpecifier)[];
export type ConnectionsFieldPolicy = {
	userid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ContactKeySpecifier = ('_id' | 'email' | 'firstName' | 'lastName' | 'middleName' | 'phone' | ContactKeySpecifier)[];
export type ContactFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	middleName?: FieldPolicy<any> | FieldReadFunction<any>,
	phone?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ContactOutputKeySpecifier = ('additionalEmail' | 'email' | 'phone' | 'preferredCommunicationMode' | ContactOutputKeySpecifier)[];
export type ContactOutputFieldPolicy = {
	additionalEmail?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	phone?: FieldPolicy<any> | FieldReadFunction<any>,
	preferredCommunicationMode?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ContractKeySpecifier = ('_id' | 'arbitrationJurisdiction' | 'buyer' | 'contractNumber' | 'contractPDF' | 'createdAt' | 'createdBy' | 'effectiveDate' | 'isCompleted' | 'legalJurisdiction' | 'linkedNoum' | 'linkedSOWs' | 'logo' | 'seller' | 'status' | 'templateName' | 'terminationDate' | 'terminationNoticeInDays' | 'timeline' | 'timezone' | 'title' | ContractKeySpecifier)[];
export type ContractFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	arbitrationJurisdiction?: FieldPolicy<any> | FieldReadFunction<any>,
	buyer?: FieldPolicy<any> | FieldReadFunction<any>,
	contractNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	contractPDF?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>,
	effectiveDate?: FieldPolicy<any> | FieldReadFunction<any>,
	isCompleted?: FieldPolicy<any> | FieldReadFunction<any>,
	legalJurisdiction?: FieldPolicy<any> | FieldReadFunction<any>,
	linkedNoum?: FieldPolicy<any> | FieldReadFunction<any>,
	linkedSOWs?: FieldPolicy<any> | FieldReadFunction<any>,
	logo?: FieldPolicy<any> | FieldReadFunction<any>,
	seller?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	templateName?: FieldPolicy<any> | FieldReadFunction<any>,
	terminationDate?: FieldPolicy<any> | FieldReadFunction<any>,
	terminationNoticeInDays?: FieldPolicy<any> | FieldReadFunction<any>,
	timeline?: FieldPolicy<any> | FieldReadFunction<any>,
	timezone?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ContractOutputKeySpecifier = ('docuSignId' | 'documentType' | 'effectiveDate' | 'link' | 'name' | ContractOutputKeySpecifier)[];
export type ContractOutputFieldPolicy = {
	docuSignId?: FieldPolicy<any> | FieldReadFunction<any>,
	documentType?: FieldPolicy<any> | FieldReadFunction<any>,
	effectiveDate?: FieldPolicy<any> | FieldReadFunction<any>,
	link?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ContractSowTimeLineKeySpecifier = ('fromStatus' | 'timestamp' | 'toStatus' | 'userId' | ContractSowTimeLineKeySpecifier)[];
export type ContractSowTimeLineFieldPolicy = {
	fromStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	toStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ConversationActivityKeySpecifier = ('_id' | ConversationActivityKeySpecifier)[];
export type ConversationActivityFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ConversationIdOutputKeySpecifier = ('cid' | ConversationIdOutputKeySpecifier)[];
export type ConversationIdOutputFieldPolicy = {
	cid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ConversationItemKeySpecifier = ('unread' | ConversationItemKeySpecifier)[];
export type ConversationItemFieldPolicy = {
	unread?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ConversationLinkKeySpecifier = ('messages' | 'participants' | 'webhooks' | ConversationLinkKeySpecifier)[];
export type ConversationLinkFieldPolicy = {
	messages?: FieldPolicy<any> | FieldReadFunction<any>,
	participants?: FieldPolicy<any> | FieldReadFunction<any>,
	webhooks?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ConversationMetaKeySpecifier = ('accountSid' | 'attributes' | 'chatServiceSid' | 'dateCreated' | 'dateUpdated' | 'friendlyName' | 'links' | 'messagingServiceSid' | 'sid' | 'state' | 'totalUnreadConversationCount' | 'uniqueName' | 'url' | ConversationMetaKeySpecifier)[];
export type ConversationMetaFieldPolicy = {
	accountSid?: FieldPolicy<any> | FieldReadFunction<any>,
	attributes?: FieldPolicy<any> | FieldReadFunction<any>,
	chatServiceSid?: FieldPolicy<any> | FieldReadFunction<any>,
	dateCreated?: FieldPolicy<any> | FieldReadFunction<any>,
	dateUpdated?: FieldPolicy<any> | FieldReadFunction<any>,
	friendlyName?: FieldPolicy<any> | FieldReadFunction<any>,
	links?: FieldPolicy<any> | FieldReadFunction<any>,
	messagingServiceSid?: FieldPolicy<any> | FieldReadFunction<any>,
	sid?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>,
	totalUnreadConversationCount?: FieldPolicy<any> | FieldReadFunction<any>,
	uniqueName?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ConversationOutputKeySpecifier = ('_id' | 'adminUserId' | 'cid' | 'createdAt' | 'isReadOnly' | 'metaData' | 'participants' | 'sender' | 'spaceId' | 'type' | 'updatedAt' | ConversationOutputKeySpecifier)[];
export type ConversationOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	adminUserId?: FieldPolicy<any> | FieldReadFunction<any>,
	cid?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	isReadOnly?: FieldPolicy<any> | FieldReadFunction<any>,
	metaData?: FieldPolicy<any> | FieldReadFunction<any>,
	participants?: FieldPolicy<any> | FieldReadFunction<any>,
	sender?: FieldPolicy<any> | FieldReadFunction<any>,
	spaceId?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ConversationOutputAllKeySpecifier = ('count' | 'data' | 'unreadCount' | ConversationOutputAllKeySpecifier)[];
export type ConversationOutputAllFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	unreadCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ConversationsOutputKeySpecifier = ('count' | 'data' | 'unreadMessageCount' | ConversationsOutputKeySpecifier)[];
export type ConversationsOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	unreadMessageCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CookieConsentOutputKeySpecifier = ('cookieConsent' | 'cookieConsentId' | 'createdAt' | CookieConsentOutputKeySpecifier)[];
export type CookieConsentOutputFieldPolicy = {
	cookieConsent?: FieldPolicy<any> | FieldReadFunction<any>,
	cookieConsentId?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateAccountOutputKeySpecifier = ('accountIds' | CreateAccountOutputKeySpecifier)[];
export type CreateAccountOutputFieldPolicy = {
	accountIds?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateCustomerOutputKeySpecifier = ('dwollaCustomer' | 'stripeCustomer' | CreateCustomerOutputKeySpecifier)[];
export type CreateCustomerOutputFieldPolicy = {
	dwollaCustomer?: FieldPolicy<any> | FieldReadFunction<any>,
	stripeCustomer?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreatePlaidLinkOutputKeySpecifier = ('link_token' | CreatePlaidLinkOutputKeySpecifier)[];
export type CreatePlaidLinkOutputFieldPolicy = {
	link_token?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CurrencyDataKeySpecifier = ('currency' | 'value' | CurrencyDataKeySpecifier)[];
export type CurrencyDataFieldPolicy = {
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CurrencyOutputKeySpecifier = ('currency' | 'value' | CurrencyOutputKeySpecifier)[];
export type CurrencyOutputFieldPolicy = {
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CurrentUserKeySpecifier = ('eventId' | 'invitation' | 'isBlocked' | 'userId' | 'userRole' | CurrentUserKeySpecifier)[];
export type CurrentUserFieldPolicy = {
	eventId?: FieldPolicy<any> | FieldReadFunction<any>,
	invitation?: FieldPolicy<any> | FieldReadFunction<any>,
	isBlocked?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>,
	userRole?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CurrentUserPaymentLimitOutputKeySpecifier = ('achConsumedLimit' | 'achTransactionLimit' | 'achWeeklyLimit' | 'availableACHLimit' | 'availableWalletLimit' | 'enableInvoiceLimit' | 'unverifiedCustomerAvailableLimit' | 'unverifiedCustomerWeeklyLimit' | 'walletConsumedLimit' | 'walletTransactionLimit' | 'walletWeeklyLimit' | CurrentUserPaymentLimitOutputKeySpecifier)[];
export type CurrentUserPaymentLimitOutputFieldPolicy = {
	achConsumedLimit?: FieldPolicy<any> | FieldReadFunction<any>,
	achTransactionLimit?: FieldPolicy<any> | FieldReadFunction<any>,
	achWeeklyLimit?: FieldPolicy<any> | FieldReadFunction<any>,
	availableACHLimit?: FieldPolicy<any> | FieldReadFunction<any>,
	availableWalletLimit?: FieldPolicy<any> | FieldReadFunction<any>,
	enableInvoiceLimit?: FieldPolicy<any> | FieldReadFunction<any>,
	unverifiedCustomerAvailableLimit?: FieldPolicy<any> | FieldReadFunction<any>,
	unverifiedCustomerWeeklyLimit?: FieldPolicy<any> | FieldReadFunction<any>,
	walletConsumedLimit?: FieldPolicy<any> | FieldReadFunction<any>,
	walletTransactionLimit?: FieldPolicy<any> | FieldReadFunction<any>,
	walletWeeklyLimit?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerKeySpecifier = ('created_at' | 'email' | 'external_customer_id' | 'first_name' | 'last_name' | 'status' | 'uid' | 'updated_at' | CustomerKeySpecifier)[];
export type CustomerFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	external_customer_id?: FieldPolicy<any> | FieldReadFunction<any>,
	first_name?: FieldPolicy<any> | FieldReadFunction<any>,
	last_name?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerAccountsOutputKeySpecifier = ('count' | 'data' | CustomerAccountsOutputKeySpecifier)[];
export type CustomerAccountsOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerDocumentOutputKeySpecifier = ('allFailureReasons' | 'createdAt' | 'customerId' | 'documentVerificationStatus' | 'failureReason' | 'id' | 'meta' | 'providerDocUrl' | 'providerId' | 'reUpload' | 's3DocRef' | 'status' | 'type' | 'updatedAt' | CustomerDocumentOutputKeySpecifier)[];
export type CustomerDocumentOutputFieldPolicy = {
	allFailureReasons?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	customerId?: FieldPolicy<any> | FieldReadFunction<any>,
	documentVerificationStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	failureReason?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	meta?: FieldPolicy<any> | FieldReadFunction<any>,
	providerDocUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	providerId?: FieldPolicy<any> | FieldReadFunction<any>,
	reUpload?: FieldPolicy<any> | FieldReadFunction<any>,
	s3DocRef?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerKYCAccountsOutputKeySpecifier = ('count' | 'data' | CustomerKYCAccountsOutputKeySpecifier)[];
export type CustomerKYCAccountsOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerKYCAuditLogKeySpecifier = ('actionTakenBy' | 'createdAt' | 'createdBy' | 'id' | 'newStatus' | 'oldStatus' | 'provider' | 'sequence' | 'statusType' | 'updatedAt' | CustomerKYCAuditLogKeySpecifier)[];
export type CustomerKYCAuditLogFieldPolicy = {
	actionTakenBy?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	newStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	oldStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	provider?: FieldPolicy<any> | FieldReadFunction<any>,
	sequence?: FieldPolicy<any> | FieldReadFunction<any>,
	statusType?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerKYCAuditLogCountKeySpecifier = ('count' | 'data' | CustomerKYCAuditLogCountKeySpecifier)[];
export type CustomerKYCAuditLogCountFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerKYCWithAccountOutputKeySpecifier = ('accounts' | 'createdAt' | 'customerType' | 'docStatus' | 'enableTransactionLimit' | 'id' | 'msg' | 'name' | 'noumenaStatus' | 'providerStatus' | 'status' | 'transactionFlagHistory' | 'updateStatus' | 'userId' | CustomerKYCWithAccountOutputKeySpecifier)[];
export type CustomerKYCWithAccountOutputFieldPolicy = {
	accounts?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	customerType?: FieldPolicy<any> | FieldReadFunction<any>,
	docStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	enableTransactionLimit?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	msg?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	noumenaStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	providerStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	transactionFlagHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	updateStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerLimitOutputKeySpecifier = ('availableWeeklyLimit' | 'consumedWeeklyLimit' | 'transactionLimit' | 'weeklyLimit' | CustomerLimitOutputKeySpecifier)[];
export type CustomerLimitOutputFieldPolicy = {
	availableWeeklyLimit?: FieldPolicy<any> | FieldReadFunction<any>,
	consumedWeeklyLimit?: FieldPolicy<any> | FieldReadFunction<any>,
	transactionLimit?: FieldPolicy<any> | FieldReadFunction<any>,
	weeklyLimit?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerLogsOutputKeySpecifier = ('_id' | 'customerId' | 'operationType' | 'target' | 'updatedAt' | 'updatedBy' | 'updates' | CustomerLogsOutputKeySpecifier)[];
export type CustomerLogsOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	customerId?: FieldPolicy<any> | FieldReadFunction<any>,
	operationType?: FieldPolicy<any> | FieldReadFunction<any>,
	target?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedBy?: FieldPolicy<any> | FieldReadFunction<any>,
	updates?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerOutputKeySpecifier = ('accountNumber' | 'additionalEmail' | 'address' | 'applicationDate' | 'applicationIds' | 'approvedInvestmentAmount' | 'bankName' | 'chameleonAccountNumber' | 'contracts' | 'customerId' | 'debitAccountNumber' | 'debitBankName' | 'debitRoutingNumber' | 'dob' | 'docusignEffectiveDate' | 'email' | 'firstName' | 'industry' | 'initialMonthlyIncome' | 'lastName' | 'maximumIncomePaymentRate' | 'maximumInvestmentReturn' | 'middleName' | 'phone' | 'preferredCommunicationMode' | 'productCode' | 'routingNumber' | 'uid' | CustomerOutputKeySpecifier)[];
export type CustomerOutputFieldPolicy = {
	accountNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	additionalEmail?: FieldPolicy<any> | FieldReadFunction<any>,
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	applicationDate?: FieldPolicy<any> | FieldReadFunction<any>,
	applicationIds?: FieldPolicy<any> | FieldReadFunction<any>,
	approvedInvestmentAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	bankName?: FieldPolicy<any> | FieldReadFunction<any>,
	chameleonAccountNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	contracts?: FieldPolicy<any> | FieldReadFunction<any>,
	customerId?: FieldPolicy<any> | FieldReadFunction<any>,
	debitAccountNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	debitBankName?: FieldPolicy<any> | FieldReadFunction<any>,
	debitRoutingNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	dob?: FieldPolicy<any> | FieldReadFunction<any>,
	docusignEffectiveDate?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	industry?: FieldPolicy<any> | FieldReadFunction<any>,
	initialMonthlyIncome?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	maximumIncomePaymentRate?: FieldPolicy<any> | FieldReadFunction<any>,
	maximumInvestmentReturn?: FieldPolicy<any> | FieldReadFunction<any>,
	middleName?: FieldPolicy<any> | FieldReadFunction<any>,
	phone?: FieldPolicy<any> | FieldReadFunction<any>,
	preferredCommunicationMode?: FieldPolicy<any> | FieldReadFunction<any>,
	productCode?: FieldPolicy<any> | FieldReadFunction<any>,
	routingNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerPayeeListKeySpecifier = ('accountId' | 'accountType' | 'chamberId' | 'createdAt' | 'customerName' | 'id' | 'maskAccountNumber' | 'masterWalletId' | 'subAccountType' | 'updatedAt' | 'userId' | 'walletName' | CustomerPayeeListKeySpecifier)[];
export type CustomerPayeeListFieldPolicy = {
	accountId?: FieldPolicy<any> | FieldReadFunction<any>,
	accountType?: FieldPolicy<any> | FieldReadFunction<any>,
	chamberId?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	customerName?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	maskAccountNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	masterWalletId?: FieldPolicy<any> | FieldReadFunction<any>,
	subAccountType?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>,
	walletName?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerPayeeListV2KeySpecifier = ('count' | 'data' | CustomerPayeeListV2KeySpecifier)[];
export type CustomerPayeeListV2FieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerUserOutputKeySpecifier = ('SocialHallTCAccepted' | '_id' | 'bio' | 'citizenship' | 'createdAt' | 'creditCheckResult' | 'email' | 'firstName' | 'kycResult' | 'lastName' | 'location' | 'middleName' | 'phone' | 'profileUrl' | 'referralCode' | 'roles' | 'status' | 'title' | 'unreadConnectionCount' | 'updatedAt' | 'userOwnReferralCode' | 'userStatus' | 'username' | CustomerUserOutputKeySpecifier)[];
export type CustomerUserOutputFieldPolicy = {
	SocialHallTCAccepted?: FieldPolicy<any> | FieldReadFunction<any>,
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	bio?: FieldPolicy<any> | FieldReadFunction<any>,
	citizenship?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	creditCheckResult?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	kycResult?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	location?: FieldPolicy<any> | FieldReadFunction<any>,
	middleName?: FieldPolicy<any> | FieldReadFunction<any>,
	phone?: FieldPolicy<any> | FieldReadFunction<any>,
	profileUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	referralCode?: FieldPolicy<any> | FieldReadFunction<any>,
	roles?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	unreadConnectionCount?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userOwnReferralCode?: FieldPolicy<any> | FieldReadFunction<any>,
	userStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerUserRoleOutputKeySpecifier = ('roleType' | CustomerUserRoleOutputKeySpecifier)[];
export type CustomerUserRoleOutputFieldPolicy = {
	roleType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerWithAccountOutputKeySpecifier = ('accounts' | 'createdAt' | 'enableTransactionLimit' | 'id' | 'name' | 'status' | 'transactionFlagHistory' | 'userId' | CustomerWithAccountOutputKeySpecifier)[];
export type CustomerWithAccountOutputFieldPolicy = {
	accounts?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	enableTransactionLimit?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	transactionFlagHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomerWithTotalOutputKeySpecifier = ('customers' | 'total' | CustomerWithTotalOutputKeySpecifier)[];
export type CustomerWithTotalOutputFieldPolicy = {
	customers?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CustomersOutputKeySpecifier = ('data' | 'total' | CustomersOutputKeySpecifier)[];
export type CustomersOutputFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DebitAccountOutputKeySpecifier = ('accountNumber' | 'accountSubType' | 'accountType' | 'institutionId' | 'institutionName' | 'logo' | 'routingNumber' | DebitAccountOutputKeySpecifier)[];
export type DebitAccountOutputFieldPolicy = {
	accountNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	accountSubType?: FieldPolicy<any> | FieldReadFunction<any>,
	accountType?: FieldPolicy<any> | FieldReadFunction<any>,
	institutionId?: FieldPolicy<any> | FieldReadFunction<any>,
	institutionName?: FieldPolicy<any> | FieldReadFunction<any>,
	logo?: FieldPolicy<any> | FieldReadFunction<any>,
	routingNumber?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeliverablesAndMilestonesKeySpecifier = ('description' | 'dueDate' | 'title' | DeliverablesAndMilestonesKeySpecifier)[];
export type DeliverablesAndMilestonesFieldPolicy = {
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	dueDate?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeviceTokenOutputKeySpecifier = ('isActive' | 'token' | DeviceTokenOutputKeySpecifier)[];
export type DeviceTokenOutputFieldPolicy = {
	isActive?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DiscoveryKeySpecifier = ('location' | 'profileCompletion' | 'skillOwn' | 'skillSought' | 'uid' | DiscoveryKeySpecifier)[];
export type DiscoveryFieldPolicy = {
	location?: FieldPolicy<any> | FieldReadFunction<any>,
	profileCompletion?: FieldPolicy<any> | FieldReadFunction<any>,
	skillOwn?: FieldPolicy<any> | FieldReadFunction<any>,
	skillSought?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DiscoveryResponseKeySpecifier = ('count' | 'userIds' | DiscoveryResponseKeySpecifier)[];
export type DiscoveryResponseFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	userIds?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DocuSignOutputKeySpecifier = ('redirectURL' | DocuSignOutputKeySpecifier)[];
export type DocuSignOutputFieldPolicy = {
	redirectURL?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DocumentFailureReasonKeySpecifier = ('description' | 'reason' | DocumentFailureReasonKeySpecifier)[];
export type DocumentFailureReasonFieldPolicy = {
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	reason?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DocumentMetaKeySpecifier = ('name' | 'uploadFor' | DocumentMetaKeySpecifier)[];
export type DocumentMetaFieldPolicy = {
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	uploadFor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DocumentOutputKeySpecifier = ('contracts' | 'docuSignId' | 'documentType' | 'link' | 'name' | 'productCode' | DocumentOutputKeySpecifier)[];
export type DocumentOutputFieldPolicy = {
	contracts?: FieldPolicy<any> | FieldReadFunction<any>,
	docuSignId?: FieldPolicy<any> | FieldReadFunction<any>,
	documentType?: FieldPolicy<any> | FieldReadFunction<any>,
	link?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	productCode?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DunningAttemptOutputKeySpecifier = ('attempt' | 'created_at' | 'dunning_attempt_id' | 'dunning_type' | 'transaction_id' | 'txn_amount' | 'txn_status' | DunningAttemptOutputKeySpecifier)[];
export type DunningAttemptOutputFieldPolicy = {
	attempt?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	dunning_attempt_id?: FieldPolicy<any> | FieldReadFunction<any>,
	dunning_type?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction_id?: FieldPolicy<any> | FieldReadFunction<any>,
	txn_amount?: FieldPolicy<any> | FieldReadFunction<any>,
	txn_status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DwollaTransactionKeySpecifier = ('amount' | 'createdAt' | 'currency' | 'destinationAccount' | 'destinationAccountId' | 'destinationClearing' | 'destinationCustomer' | 'destinationCustomerId' | 'id' | 'sourceAccount' | 'sourceAccountId' | 'sourceClearing' | 'sourceCustomer' | 'sourceCustomerId' | 'status' | 'transactionDate' | 'updatedAt' | DwollaTransactionKeySpecifier)[];
export type DwollaTransactionFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	destinationAccount?: FieldPolicy<any> | FieldReadFunction<any>,
	destinationAccountId?: FieldPolicy<any> | FieldReadFunction<any>,
	destinationClearing?: FieldPolicy<any> | FieldReadFunction<any>,
	destinationCustomer?: FieldPolicy<any> | FieldReadFunction<any>,
	destinationCustomerId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	sourceAccount?: FieldPolicy<any> | FieldReadFunction<any>,
	sourceAccountId?: FieldPolicy<any> | FieldReadFunction<any>,
	sourceClearing?: FieldPolicy<any> | FieldReadFunction<any>,
	sourceCustomer?: FieldPolicy<any> | FieldReadFunction<any>,
	sourceCustomerId?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	transactionDate?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DwollaTransactionOutputKeySpecifier = ('count' | 'data' | DwollaTransactionOutputKeySpecifier)[];
export type DwollaTransactionOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EditAccountPasswordOutputKeySpecifier = ('message' | 'success' | EditAccountPasswordOutputKeySpecifier)[];
export type EditAccountPasswordOutputFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ElementInnerOutputKeySpecifier = ('bodyContent' | 'bodyContentJson' | 'customPreviewPosition' | 'headerContent' | 'isCustomPreviewVisible' | 'isDeleted' | 'meta' | 'percentCompleted' | 'position' | ElementInnerOutputKeySpecifier)[];
export type ElementInnerOutputFieldPolicy = {
	bodyContent?: FieldPolicy<any> | FieldReadFunction<any>,
	bodyContentJson?: FieldPolicy<any> | FieldReadFunction<any>,
	customPreviewPosition?: FieldPolicy<any> | FieldReadFunction<any>,
	headerContent?: FieldPolicy<any> | FieldReadFunction<any>,
	isCustomPreviewVisible?: FieldPolicy<any> | FieldReadFunction<any>,
	isDeleted?: FieldPolicy<any> | FieldReadFunction<any>,
	meta?: FieldPolicy<any> | FieldReadFunction<any>,
	percentCompleted?: FieldPolicy<any> | FieldReadFunction<any>,
	position?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ElementOutputKeySpecifier = ('_id' | 'bodyContent' | 'bodyContentJson' | 'bodyContentType' | 'customPreviewPosition' | 'draft' | 'elementType' | 'headerContent' | 'isCustomPreviewAdditionalInfo' | 'isCustomPreviewVisible' | 'meta' | 'originalBodyContent' | 'originalBodyContentJson' | 'originalHeaderContent' | 'percentCompleted' | 'position' | 'profanityStatus' | 'status' | 'tempStatus' | 'unSaved' | 'viewOnly' | ElementOutputKeySpecifier)[];
export type ElementOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	bodyContent?: FieldPolicy<any> | FieldReadFunction<any>,
	bodyContentJson?: FieldPolicy<any> | FieldReadFunction<any>,
	bodyContentType?: FieldPolicy<any> | FieldReadFunction<any>,
	customPreviewPosition?: FieldPolicy<any> | FieldReadFunction<any>,
	draft?: FieldPolicy<any> | FieldReadFunction<any>,
	elementType?: FieldPolicy<any> | FieldReadFunction<any>,
	headerContent?: FieldPolicy<any> | FieldReadFunction<any>,
	isCustomPreviewAdditionalInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	isCustomPreviewVisible?: FieldPolicy<any> | FieldReadFunction<any>,
	meta?: FieldPolicy<any> | FieldReadFunction<any>,
	originalBodyContent?: FieldPolicy<any> | FieldReadFunction<any>,
	originalBodyContentJson?: FieldPolicy<any> | FieldReadFunction<any>,
	originalHeaderContent?: FieldPolicy<any> | FieldReadFunction<any>,
	percentCompleted?: FieldPolicy<any> | FieldReadFunction<any>,
	position?: FieldPolicy<any> | FieldReadFunction<any>,
	profanityStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	tempStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	unSaved?: FieldPolicy<any> | FieldReadFunction<any>,
	viewOnly?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ErrorObjectKeySpecifier = ('lockDate' | 'lockInterval' | 'message' | 'retryCount' | 'success' | 'userLocked' | ErrorObjectKeySpecifier)[];
export type ErrorObjectFieldPolicy = {
	lockDate?: FieldPolicy<any> | FieldReadFunction<any>,
	lockInterval?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	retryCount?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>,
	userLocked?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventKeySpecifier = ('_id' | 'chamberId' | 'cohosts' | 'currentUser' | 'description' | 'duration' | 'eventDate' | 'eventStatusUpdatedAt' | 'hostChamberId' | 'icsFile' | 'invitations' | 'isInstantEvent' | 'privacy' | 'recurring' | 'recurringDetails' | 'socialHall' | 'socialHallId' | 'status' | 'timezone' | 'title' | 'totalAttendees' | 'userId' | EventKeySpecifier)[];
export type EventFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	chamberId?: FieldPolicy<any> | FieldReadFunction<any>,
	cohosts?: FieldPolicy<any> | FieldReadFunction<any>,
	currentUser?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	eventDate?: FieldPolicy<any> | FieldReadFunction<any>,
	eventStatusUpdatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	hostChamberId?: FieldPolicy<any> | FieldReadFunction<any>,
	icsFile?: FieldPolicy<any> | FieldReadFunction<any>,
	invitations?: FieldPolicy<any> | FieldReadFunction<any>,
	isInstantEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	privacy?: FieldPolicy<any> | FieldReadFunction<any>,
	recurring?: FieldPolicy<any> | FieldReadFunction<any>,
	recurringDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	socialHall?: FieldPolicy<any> | FieldReadFunction<any>,
	socialHallId?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	timezone?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	totalAttendees?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventActivityKeySpecifier = ('description' | 'endDate' | 'eventId' | 'startDate' | 'title' | EventActivityKeySpecifier)[];
export type EventActivityFieldPolicy = {
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	endDate?: FieldPolicy<any> | FieldReadFunction<any>,
	eventId?: FieldPolicy<any> | FieldReadFunction<any>,
	startDate?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventMetaKeySpecifier = ('acceptedEventsCount' | 'allEventsCount' | 'hostedEventsCount' | 'pastEventsCount' | 'pendingEventsCount' | EventMetaKeySpecifier)[];
export type EventMetaFieldPolicy = {
	acceptedEventsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	allEventsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	hostedEventsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	pastEventsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	pendingEventsCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventNotificationDetailsKeySpecifier = ('id' | 'invitedBy' | 'invitee' | 'time' | EventNotificationDetailsKeySpecifier)[];
export type EventNotificationDetailsFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	invitedBy?: FieldPolicy<any> | FieldReadFunction<any>,
	invitee?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventNotificationDetailsV2KeySpecifier = ('id' | 'invitedBy' | 'invitee' | 'time' | EventNotificationDetailsV2KeySpecifier)[];
export type EventNotificationDetailsV2FieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	invitedBy?: FieldPolicy<any> | FieldReadFunction<any>,
	invitee?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventOutputKeySpecifier = ('count' | 'data' | EventOutputKeySpecifier)[];
export type EventOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EventSubscriptionDataKeySpecifier = ('eventId' | 'type' | 'userId' | EventSubscriptionDataKeySpecifier)[];
export type EventSubscriptionDataFieldPolicy = {
	eventId?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ExampleTypeKeySpecifier = ('message' | ExampleTypeKeySpecifier)[];
export type ExampleTypeFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FeesCategoryKeySpecifier = ('feesData' | 'type' | FeesCategoryKeySpecifier)[];
export type FeesCategoryFieldPolicy = {
	feesData?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FeesInfoKeySpecifier = ('amount' | 'description' | 'dueDate' | 'fromDate' | 'recurringType' | FeesInfoKeySpecifier)[];
export type FeesInfoFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	dueDate?: FieldPolicy<any> | FieldReadFunction<any>,
	fromDate?: FieldPolicy<any> | FieldReadFunction<any>,
	recurringType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FileDataKeySpecifier = ('amount' | 'currency' | 'email' | 'fileHeaders' | 'filter' | 'transaction_reason' | FileDataKeySpecifier)[];
export type FileDataFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	fileHeaders?: FieldPolicy<any> | FieldReadFunction<any>,
	filter?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction_reason?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FundingSourceBalanceOutputKeySpecifier = ('balance' | 'customerType' | 'docStatus' | 'lastUpdated' | 'noumenaStatus' | 'providerStatus' | 'status' | 'total' | 'updateStatus' | FundingSourceBalanceOutputKeySpecifier)[];
export type FundingSourceBalanceOutputFieldPolicy = {
	balance?: FieldPolicy<any> | FieldReadFunction<any>,
	customerType?: FieldPolicy<any> | FieldReadFunction<any>,
	docStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	lastUpdated?: FieldPolicy<any> | FieldReadFunction<any>,
	noumenaStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	providerStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>,
	updateStatus?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FundingSourceOutputKeySpecifier = ('accountName' | 'accountNumber' | 'accountType' | 'balance' | 'createdAt' | 'customerId' | 'id' | 'maskAccountNumber' | 'paymentChannel' | 'routingNumber' | FundingSourceOutputKeySpecifier)[];
export type FundingSourceOutputFieldPolicy = {
	accountName?: FieldPolicy<any> | FieldReadFunction<any>,
	accountNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	accountType?: FieldPolicy<any> | FieldReadFunction<any>,
	balance?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	customerId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	maskAccountNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentChannel?: FieldPolicy<any> | FieldReadFunction<any>,
	routingNumber?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GenericResponseOutputKeySpecifier = ('message' | 'success' | GenericResponseOutputKeySpecifier)[];
export type GenericResponseOutputFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GlobalConfigOutputKeySpecifier = ('Currency' | 'LateFee' | 'PaymentDetails' | 'PaymentTerm' | GlobalConfigOutputKeySpecifier)[];
export type GlobalConfigOutputFieldPolicy = {
	Currency?: FieldPolicy<any> | FieldReadFunction<any>,
	LateFee?: FieldPolicy<any> | FieldReadFunction<any>,
	PaymentDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	PaymentTerm?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GlobalDataInputKeySpecifier = ('label' | 'value' | GlobalDataInputKeySpecifier)[];
export type GlobalDataInputFieldPolicy = {
	label?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GlobalSearchEntityKeySpecifier = ('entityType' | 'event' | 'id' | 'noum' | 'post' | 'user' | GlobalSearchEntityKeySpecifier)[];
export type GlobalSearchEntityFieldPolicy = {
	entityType?: FieldPolicy<any> | FieldReadFunction<any>,
	event?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	noum?: FieldPolicy<any> | FieldReadFunction<any>,
	post?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GlobalSearchEntityUserKeySpecifier = ('firstName' | 'id' | 'isNoumenaEmployee' | 'lastName' | 'middleName' | 'name' | 'status' | 'thumbnailUrl' | 'title' | GlobalSearchEntityUserKeySpecifier)[];
export type GlobalSearchEntityUserFieldPolicy = {
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isNoumenaEmployee?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	middleName?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	thumbnailUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GlobalSearchEventEntityKeySpecifier = ('createdAt' | 'description' | 'name' | 'noumId' | 'status' | GlobalSearchEventEntityKeySpecifier)[];
export type GlobalSearchEventEntityFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	noumId?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GlobalSearchNoumEntityKeySpecifier = ('isConnected' | 'isFollowing' | 'name' | 'status' | 'thumbnailUrl' | 'type' | GlobalSearchNoumEntityKeySpecifier)[];
export type GlobalSearchNoumEntityFieldPolicy = {
	isConnected?: FieldPolicy<any> | FieldReadFunction<any>,
	isFollowing?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	thumbnailUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GlobalSearchPostEntityKeySpecifier = ('content' | 'createdAt' | 'noumId' | 'noumName' | 'noumThumbnailUrl' | 'status' | 'tags' | 'type' | GlobalSearchPostEntityKeySpecifier)[];
export type GlobalSearchPostEntityFieldPolicy = {
	content?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	noumId?: FieldPolicy<any> | FieldReadFunction<any>,
	noumName?: FieldPolicy<any> | FieldReadFunction<any>,
	noumThumbnailUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GlobalSearchResultKeySpecifier = ('count' | 'data' | GlobalSearchResultKeySpecifier)[];
export type GlobalSearchResultFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GroupKeySpecifier = ('_id' | 'associatedSkills' | 'canInvite' | 'connection' | 'description' | 'groupInvitePermission' | 'groupPrivacy' | 'invitation' | 'members' | 'membersCount' | 'name' | 'profileImage' | 'role' | GroupKeySpecifier)[];
export type GroupFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	associatedSkills?: FieldPolicy<any> | FieldReadFunction<any>,
	canInvite?: FieldPolicy<any> | FieldReadFunction<any>,
	connection?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	groupInvitePermission?: FieldPolicy<any> | FieldReadFunction<any>,
	groupPrivacy?: FieldPolicy<any> | FieldReadFunction<any>,
	invitation?: FieldPolicy<any> | FieldReadFunction<any>,
	members?: FieldPolicy<any> | FieldReadFunction<any>,
	membersCount?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	profileImage?: FieldPolicy<any> | FieldReadFunction<any>,
	role?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GroupConnectionKeySpecifier = ('connection' | GroupConnectionKeySpecifier)[];
export type GroupConnectionFieldPolicy = {
	connection?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GroupEventKeySpecifier = ('data' | 'event' | GroupEventKeySpecifier)[];
export type GroupEventFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	event?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GroupInvitationKeySpecifier = ('_id' | 'connection' | 'groupId' | 'inviteFrom' | 'inviteTo' | GroupInvitationKeySpecifier)[];
export type GroupInvitationFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	connection?: FieldPolicy<any> | FieldReadFunction<any>,
	groupId?: FieldPolicy<any> | FieldReadFunction<any>,
	inviteFrom?: FieldPolicy<any> | FieldReadFunction<any>,
	inviteTo?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GroupOutputKeySpecifier = ('count' | 'data' | GroupOutputKeySpecifier)[];
export type GroupOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GroupRefKeySpecifier = ('_id' | 'associatedSkills' | 'connection' | 'description' | 'members' | 'membersCount' | 'name' | 'profileImage' | 'role' | GroupRefKeySpecifier)[];
export type GroupRefFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	associatedSkills?: FieldPolicy<any> | FieldReadFunction<any>,
	connection?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	members?: FieldPolicy<any> | FieldReadFunction<any>,
	membersCount?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	profileImage?: FieldPolicy<any> | FieldReadFunction<any>,
	role?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GroupShJoiningStatusKeySpecifier = ('status' | 'userId' | GroupShJoiningStatusKeySpecifier)[];
export type GroupShJoiningStatusFieldPolicy = {
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GroupedNoumRolePermissionChangeKeySpecifier = ('changes' | 'elementType' | GroupedNoumRolePermissionChangeKeySpecifier)[];
export type GroupedNoumRolePermissionChangeFieldPolicy = {
	changes?: FieldPolicy<any> | FieldReadFunction<any>,
	elementType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type HomeSpaceConversationOutputKeySpecifier = ('groupConversations' | 'groupConversationsCount' | 'groupConversationsUnreadMessageCount' | 'groupUnreadConversationCount' | 'privateConversation' | 'privateConversationCount' | 'privateUnreadCoversationCount' | 'privateUnreadMessageCount' | 'userAllConversationUnreadConversationCount' | 'userAllConversationUnreadMessageCount' | 'userConversations' | 'userConversationsCount' | HomeSpaceConversationOutputKeySpecifier)[];
export type HomeSpaceConversationOutputFieldPolicy = {
	groupConversations?: FieldPolicy<any> | FieldReadFunction<any>,
	groupConversationsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	groupConversationsUnreadMessageCount?: FieldPolicy<any> | FieldReadFunction<any>,
	groupUnreadConversationCount?: FieldPolicy<any> | FieldReadFunction<any>,
	privateConversation?: FieldPolicy<any> | FieldReadFunction<any>,
	privateConversationCount?: FieldPolicy<any> | FieldReadFunction<any>,
	privateUnreadCoversationCount?: FieldPolicy<any> | FieldReadFunction<any>,
	privateUnreadMessageCount?: FieldPolicy<any> | FieldReadFunction<any>,
	userAllConversationUnreadConversationCount?: FieldPolicy<any> | FieldReadFunction<any>,
	userAllConversationUnreadMessageCount?: FieldPolicy<any> | FieldReadFunction<any>,
	userConversations?: FieldPolicy<any> | FieldReadFunction<any>,
	userConversationsCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type HostedPageOutputKeySpecifier = ('hosted_id' | HostedPageOutputKeySpecifier)[];
export type HostedPageOutputFieldPolicy = {
	hosted_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ILIOutputKeySpecifier = ('approvedInvestmentAmount' | 'maximumIncomePaymentRate' | 'maximumInvestmentReturn' | ILIOutputKeySpecifier)[];
export type ILIOutputFieldPolicy = {
	approvedInvestmentAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	maximumIncomePaymentRate?: FieldPolicy<any> | FieldReadFunction<any>,
	maximumInvestmentReturn?: FieldPolicy<any> | FieldReadFunction<any>
};
export type IdentityOutputKeySpecifier = ('name' | 'reasons' | 'result' | 'value' | IdentityOutputKeySpecifier)[];
export type IdentityOutputFieldPolicy = {
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	reasons?: FieldPolicy<any> | FieldReadFunction<any>,
	result?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type IncomeDataOutputKeySpecifier = ('transactions' | IncomeDataOutputKeySpecifier)[];
export type IncomeDataOutputFieldPolicy = {
	transactions?: FieldPolicy<any> | FieldReadFunction<any>
};
export type IndustryListKeySpecifier = ('name' | 'type' | IndustryListKeySpecifier)[];
export type IndustryListFieldPolicy = {
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type IndustryListOutputKeySpecifier = ('count' | 'data' | IndustryListOutputKeySpecifier)[];
export type IndustryListOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InvitationKeySpecifier = ('_id' | 'connection' | 'inviteFrom' | 'inviteTo' | InvitationKeySpecifier)[];
export type InvitationFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	connection?: FieldPolicy<any> | FieldReadFunction<any>,
	inviteFrom?: FieldPolicy<any> | FieldReadFunction<any>,
	inviteTo?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InvitationOutputKeySpecifier = ('count' | 'data' | InvitationOutputKeySpecifier)[];
export type InvitationOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InviteesKeySpecifier = ('_id' | 'chamberId' | 'invitedBy' | 'inviteeChamberId' | 'status' | 'userId' | InviteesKeySpecifier)[];
export type InviteesFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	chamberId?: FieldPolicy<any> | FieldReadFunction<any>,
	invitedBy?: FieldPolicy<any> | FieldReadFunction<any>,
	inviteeChamberId?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InvoiceAmountOutputKeySpecifier = ('amount' | 'paidAmount' | 'remainingAmount' | InvoiceAmountOutputKeySpecifier)[];
export type InvoiceAmountOutputFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	paidAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	remainingAmount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InvoiceDetailKeySpecifier = ('amount_paid' | 'channel' | 'currency_code' | 'customer_id' | 'due_date' | 'dunning_attempts' | 'exchange_rate' | 'external_customer_id' | 'external_invoice_id' | 'external_subscription_id' | 'first_invoice' | 'generated_at' | 'invoice_id' | 'issue_date' | 'item_price_id' | 'line_items' | 'linked_payments' | 'paid_at' | 'payment_method' | 'payment_method_details' | 'plan_name' | 'plan_type' | 'price_type' | 'status' | 'sub_total' | 'subscription_id' | 'tags' | 'tax' | 'total' | 'uid' | 'updated_at' | InvoiceDetailKeySpecifier)[];
export type InvoiceDetailFieldPolicy = {
	amount_paid?: FieldPolicy<any> | FieldReadFunction<any>,
	channel?: FieldPolicy<any> | FieldReadFunction<any>,
	currency_code?: FieldPolicy<any> | FieldReadFunction<any>,
	customer_id?: FieldPolicy<any> | FieldReadFunction<any>,
	due_date?: FieldPolicy<any> | FieldReadFunction<any>,
	dunning_attempts?: FieldPolicy<any> | FieldReadFunction<any>,
	exchange_rate?: FieldPolicy<any> | FieldReadFunction<any>,
	external_customer_id?: FieldPolicy<any> | FieldReadFunction<any>,
	external_invoice_id?: FieldPolicy<any> | FieldReadFunction<any>,
	external_subscription_id?: FieldPolicy<any> | FieldReadFunction<any>,
	first_invoice?: FieldPolicy<any> | FieldReadFunction<any>,
	generated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	invoice_id?: FieldPolicy<any> | FieldReadFunction<any>,
	issue_date?: FieldPolicy<any> | FieldReadFunction<any>,
	item_price_id?: FieldPolicy<any> | FieldReadFunction<any>,
	line_items?: FieldPolicy<any> | FieldReadFunction<any>,
	linked_payments?: FieldPolicy<any> | FieldReadFunction<any>,
	paid_at?: FieldPolicy<any> | FieldReadFunction<any>,
	payment_method?: FieldPolicy<any> | FieldReadFunction<any>,
	payment_method_details?: FieldPolicy<any> | FieldReadFunction<any>,
	plan_name?: FieldPolicy<any> | FieldReadFunction<any>,
	plan_type?: FieldPolicy<any> | FieldReadFunction<any>,
	price_type?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	sub_total?: FieldPolicy<any> | FieldReadFunction<any>,
	subscription_id?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	tax?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InvoiceHistoryKeySpecifier = ('created_at' | 'current_status' | 'invoice_history_id' | 'previous_status' | 'updated_at' | InvoiceHistoryKeySpecifier)[];
export type InvoiceHistoryFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	current_status?: FieldPolicy<any> | FieldReadFunction<any>,
	invoice_history_id?: FieldPolicy<any> | FieldReadFunction<any>,
	previous_status?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InvoiceLineItemKeySpecifier = ('amount' | 'currency' | 'description' | 'id' | 'quantity' | 'taxLabel' | 'taxRate' | 'unitPrice' | InvoiceLineItemKeySpecifier)[];
export type InvoiceLineItemFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	quantity?: FieldPolicy<any> | FieldReadFunction<any>,
	taxLabel?: FieldPolicy<any> | FieldReadFunction<any>,
	taxRate?: FieldPolicy<any> | FieldReadFunction<any>,
	unitPrice?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InvoiceListKeySpecifier = ('count' | 'data' | InvoiceListKeySpecifier)[];
export type InvoiceListFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InvoiceOutputKeySpecifier = ('amount' | 'createdBy' | 'currency' | 'dueDate' | 'duplicatedFromInvoiceId' | 'duplicatedFromInvoiceNumber' | 'id' | 'invoiceFrom' | 'invoiceNumber' | 'invoiceTo' | 'invoiceURL' | 'issueDate' | 'lateFeeType' | 'lateFeeValue' | 'lineItemAmount' | 'lineItems' | 'logoUrl' | 'notes' | 'noumId' | 'paymentDetails' | 'paymentTerms' | 'status' | 'summary' | 'taxLine' | 'type' | InvoiceOutputKeySpecifier)[];
export type InvoiceOutputFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	dueDate?: FieldPolicy<any> | FieldReadFunction<any>,
	duplicatedFromInvoiceId?: FieldPolicy<any> | FieldReadFunction<any>,
	duplicatedFromInvoiceNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	invoiceFrom?: FieldPolicy<any> | FieldReadFunction<any>,
	invoiceNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	invoiceTo?: FieldPolicy<any> | FieldReadFunction<any>,
	invoiceURL?: FieldPolicy<any> | FieldReadFunction<any>,
	issueDate?: FieldPolicy<any> | FieldReadFunction<any>,
	lateFeeType?: FieldPolicy<any> | FieldReadFunction<any>,
	lateFeeValue?: FieldPolicy<any> | FieldReadFunction<any>,
	lineItemAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	lineItems?: FieldPolicy<any> | FieldReadFunction<any>,
	logoUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	notes?: FieldPolicy<any> | FieldReadFunction<any>,
	noumId?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentTerms?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	summary?: FieldPolicy<any> | FieldReadFunction<any>,
	taxLine?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InvoicePDFKeySpecifier = ('base64' | InvoicePDFKeySpecifier)[];
export type InvoicePDFFieldPolicy = {
	base64?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InvoicePDFUrlKeySpecifier = ('url' | InvoicePDFUrlKeySpecifier)[];
export type InvoicePDFUrlFieldPolicy = {
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InvoicePaymentOutputKeySpecifier = ('_id' | 'amount' | 'createdAt' | 'createdBy' | 'currency' | 'entryType' | 'invoiceId' | 'paidBy' | 'paymentDate' | 'paymentId' | 'paymentStatus' | 'updatedAt' | InvoicePaymentOutputKeySpecifier)[];
export type InvoicePaymentOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	entryType?: FieldPolicy<any> | FieldReadFunction<any>,
	invoiceId?: FieldPolicy<any> | FieldReadFunction<any>,
	paidBy?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentDate?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentId?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InvoiceSequenceOutputKeySpecifier = ('_id' | 'noumId' | 'sequence' | InvoiceSequenceOutputKeySpecifier)[];
export type InvoiceSequenceOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	noumId?: FieldPolicy<any> | FieldReadFunction<any>,
	sequence?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InvoiceTaxLineKeySpecifier = ('amount' | 'currency' | 'description' | 'id' | 'taxCode' | InvoiceTaxLineKeySpecifier)[];
export type InvoiceTaxLineFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	taxCode?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InvoiceTimelineOutputKeySpecifier = ('_id' | 'activityType' | 'amount' | 'createdAt' | 'dueDateFrom' | 'dueDateTo' | 'duplicatedFrom' | 'fromStatus' | 'invoiceId' | 'paidAmount' | 'previousPaidAmount' | 'remainingAmount' | 'toStatus' | 'updatedAt' | 'userId' | InvoiceTimelineOutputKeySpecifier)[];
export type InvoiceTimelineOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	activityType?: FieldPolicy<any> | FieldReadFunction<any>,
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	dueDateFrom?: FieldPolicy<any> | FieldReadFunction<any>,
	dueDateTo?: FieldPolicy<any> | FieldReadFunction<any>,
	duplicatedFrom?: FieldPolicy<any> | FieldReadFunction<any>,
	fromStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	invoiceId?: FieldPolicy<any> | FieldReadFunction<any>,
	paidAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	previousPaidAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	remainingAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	toStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InvoiceTimelinePaginationOutputKeySpecifier = ('count' | 'data' | InvoiceTimelinePaginationOutputKeySpecifier)[];
export type InvoiceTimelinePaginationOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InvoiceToolReportOutputKeySpecifier = ('_id' | 'createdAt' | 'filters' | 'stage' | 'status' | 'updatedAt' | InvoiceToolReportOutputKeySpecifier)[];
export type InvoiceToolReportOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	filters?: FieldPolicy<any> | FieldReadFunction<any>,
	stage?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type InvoiceToolReportOutputPaginatedKeySpecifier = ('count' | 'data' | InvoiceToolReportOutputPaginatedKeySpecifier)[];
export type InvoiceToolReportOutputPaginatedFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ItemFamilyOutputKeySpecifier = ('description' | 'item_family_id' | 'name' | 'status' | ItemFamilyOutputKeySpecifier)[];
export type ItemFamilyOutputFieldPolicy = {
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	item_family_id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ItemOutputKeySpecifier = ('description' | 'item_family_id' | 'item_id' | 'item_type' | 'name' | 'status' | ItemOutputKeySpecifier)[];
export type ItemOutputFieldPolicy = {
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	item_family_id?: FieldPolicy<any> | FieldReadFunction<any>,
	item_id?: FieldPolicy<any> | FieldReadFunction<any>,
	item_type?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type JurisdictionKeySpecifier = ('country' | 'reagion' | 'region' | 'state' | JurisdictionKeySpecifier)[];
export type JurisdictionFieldPolicy = {
	country?: FieldPolicy<any> | FieldReadFunction<any>,
	reagion?: FieldPolicy<any> | FieldReadFunction<any>,
	region?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>
};
export type KnockKeySpecifier = ('_id' | 'createDate' | 'createdAt' | 'declineMessage' | 'groupId' | 'groupInfo' | 'knockMessage' | 'knockStatus' | 'knockerAttendeeId' | 'knockerUser' | 'knockerUserId' | 'receiverAttendeeId' | 'receiverUser' | 'receiverUserId' | 'socialHallId' | KnockKeySpecifier)[];
export type KnockFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	createDate?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	declineMessage?: FieldPolicy<any> | FieldReadFunction<any>,
	groupId?: FieldPolicy<any> | FieldReadFunction<any>,
	groupInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	knockMessage?: FieldPolicy<any> | FieldReadFunction<any>,
	knockStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	knockerAttendeeId?: FieldPolicy<any> | FieldReadFunction<any>,
	knockerUser?: FieldPolicy<any> | FieldReadFunction<any>,
	knockerUserId?: FieldPolicy<any> | FieldReadFunction<any>,
	receiverAttendeeId?: FieldPolicy<any> | FieldReadFunction<any>,
	receiverUser?: FieldPolicy<any> | FieldReadFunction<any>,
	receiverUserId?: FieldPolicy<any> | FieldReadFunction<any>,
	socialHallId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type KnockEventKeySpecifier = ('_id' | 'event' | KnockEventKeySpecifier)[];
export type KnockEventFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	event?: FieldPolicy<any> | FieldReadFunction<any>
};
export type KnocksKeySpecifier = ('count' | 'data' | KnocksKeySpecifier)[];
export type KnocksFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type KycOutputKeySpecifier = ('dob' | 'photoId' | 'photoIdBack' | 'photoIdExpiry' | 'photoIdNumber' | 'photoIdType' | 'salary' | 'ssn' | KycOutputKeySpecifier)[];
export type KycOutputFieldPolicy = {
	dob?: FieldPolicy<any> | FieldReadFunction<any>,
	photoId?: FieldPolicy<any> | FieldReadFunction<any>,
	photoIdBack?: FieldPolicy<any> | FieldReadFunction<any>,
	photoIdExpiry?: FieldPolicy<any> | FieldReadFunction<any>,
	photoIdNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	photoIdType?: FieldPolicy<any> | FieldReadFunction<any>,
	salary?: FieldPolicy<any> | FieldReadFunction<any>,
	ssn?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LineItemOutputKeySpecifier = ('amount' | 'date_from' | 'date_to' | 'discount_amount' | 'entity_description' | 'entity_id' | 'entity_type' | 'external_line_item_id' | 'item_level_discount_amount' | 'line_item_id' | 'pricing_model' | 'quantity' | 'tax_exempt_reason' | 'unit_amount' | LineItemOutputKeySpecifier)[];
export type LineItemOutputFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	date_from?: FieldPolicy<any> | FieldReadFunction<any>,
	date_to?: FieldPolicy<any> | FieldReadFunction<any>,
	discount_amount?: FieldPolicy<any> | FieldReadFunction<any>,
	entity_description?: FieldPolicy<any> | FieldReadFunction<any>,
	entity_id?: FieldPolicy<any> | FieldReadFunction<any>,
	entity_type?: FieldPolicy<any> | FieldReadFunction<any>,
	external_line_item_id?: FieldPolicy<any> | FieldReadFunction<any>,
	item_level_discount_amount?: FieldPolicy<any> | FieldReadFunction<any>,
	line_item_id?: FieldPolicy<any> | FieldReadFunction<any>,
	pricing_model?: FieldPolicy<any> | FieldReadFunction<any>,
	quantity?: FieldPolicy<any> | FieldReadFunction<any>,
	tax_exempt_reason?: FieldPolicy<any> | FieldReadFunction<any>,
	unit_amount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LinkedPaymentOutputKeySpecifier = ('applied_amount' | 'applied_at' | 'linked_payment_id' | 'txn_amount' | 'txn_date' | 'txn_id' | 'txn_status' | LinkedPaymentOutputKeySpecifier)[];
export type LinkedPaymentOutputFieldPolicy = {
	applied_amount?: FieldPolicy<any> | FieldReadFunction<any>,
	applied_at?: FieldPolicy<any> | FieldReadFunction<any>,
	linked_payment_id?: FieldPolicy<any> | FieldReadFunction<any>,
	txn_amount?: FieldPolicy<any> | FieldReadFunction<any>,
	txn_date?: FieldPolicy<any> | FieldReadFunction<any>,
	txn_id?: FieldPolicy<any> | FieldReadFunction<any>,
	txn_status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ListInvoiceKeySpecifier = ('count' | 'data' | ListInvoiceKeySpecifier)[];
export type ListInvoiceFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ListNoumsKeySpecifier = ('count' | 'data' | ListNoumsKeySpecifier)[];
export type ListNoumsFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ListUserInvitesForAdminFilterKeySpecifier = ('connection' | ListUserInvitesForAdminFilterKeySpecifier)[];
export type ListUserInvitesForAdminFilterFieldPolicy = {
	connection?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ListUsersForAdminFilterKeySpecifier = ('endDate' | 'includeCurrentUser' | 'roles' | 'rolesToExclude' | 'startDate' | 'userIds' | 'userIdsToExclude' | 'userStatus' | ListUsersForAdminFilterKeySpecifier)[];
export type ListUsersForAdminFilterFieldPolicy = {
	endDate?: FieldPolicy<any> | FieldReadFunction<any>,
	includeCurrentUser?: FieldPolicy<any> | FieldReadFunction<any>,
	roles?: FieldPolicy<any> | FieldReadFunction<any>,
	rolesToExclude?: FieldPolicy<any> | FieldReadFunction<any>,
	startDate?: FieldPolicy<any> | FieldReadFunction<any>,
	userIds?: FieldPolicy<any> | FieldReadFunction<any>,
	userIdsToExclude?: FieldPolicy<any> | FieldReadFunction<any>,
	userStatus?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LocationOutputKeySpecifier = ('description' | 'placeId' | LocationOutputKeySpecifier)[];
export type LocationOutputFieldPolicy = {
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	placeId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoginOutputKeySpecifier = ('accessToken' | 'email' | 'error' | 'refreshToken' | LoginOutputKeySpecifier)[];
export type LoginOutputFieldPolicy = {
	accessToken?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	error?: FieldPolicy<any> | FieldReadFunction<any>,
	refreshToken?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LogsOutputKeySpecifier = ('additionalInfo' | 'changeOn' | 'changedBy' | 'changedByDetails' | 'moreInfo' | 'reason' | 'statusFrom' | 'statusTo' | LogsOutputKeySpecifier)[];
export type LogsOutputFieldPolicy = {
	additionalInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	changeOn?: FieldPolicy<any> | FieldReadFunction<any>,
	changedBy?: FieldPolicy<any> | FieldReadFunction<any>,
	changedByDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	moreInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	reason?: FieldPolicy<any> | FieldReadFunction<any>,
	statusFrom?: FieldPolicy<any> | FieldReadFunction<any>,
	statusTo?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MatchOutputKeySpecifier = ('_id' | 'matchScore' | 'matchUid' | 'skillOwn' | MatchOutputKeySpecifier)[];
export type MatchOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	matchScore?: FieldPolicy<any> | FieldReadFunction<any>,
	matchUid?: FieldPolicy<any> | FieldReadFunction<any>,
	skillOwn?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MatchesKeySpecifier = ('count' | 'matches' | 'uid' | MatchesKeySpecifier)[];
export type MatchesFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	matches?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MaxMinValueKeySpecifier = ('max' | 'min' | MaxMinValueKeySpecifier)[];
export type MaxMinValueFieldPolicy = {
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MemberKeySpecifier = ('_id' | 'connection' | 'role' | 'user' | MemberKeySpecifier)[];
export type MemberFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	connection?: FieldPolicy<any> | FieldReadFunction<any>,
	role?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MembersOutputKeySpecifier = ('count' | 'data' | MembersOutputKeySpecifier)[];
export type MembersOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MessageOutputKeySpecifier = ('message' | MessageOutputKeySpecifier)[];
export type MessageOutputFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('CreateSubscribe' | 'OTPVerification' | '_' | 'acceptKnock' | 'acceptRaiseHandRequest' | 'acceptSpeakerInvitation' | 'addAnswer' | 'addAppActivity' | 'addBank' | 'addComment' | 'addCommentToPost' | 'addCookieConsent' | 'addDebitAccount' | 'addDepositAccount' | 'addElements' | 'addElementsToProjectChamber' | 'addManualReferenceForNoum' | 'addNetwork' | 'addNewNoumContact' | 'addNoumFile' | 'addNoumLayoutTool' | 'addPaymentDetails' | 'addPaymentProvider' | 'addProjectChamberCategory' | 'addQuestionAnswers' | 'addReaction' | 'addReactionOnComment' | 'addReactionOnCommentReply' | 'addRemoveNoumSubscription' | 'addReplyToComment' | 'addReplyToCommentV2' | 'addReplyToCommentV3ForGenericEntity' | 'addRiseUserBank' | 'addStatementDetails' | 'addUserAddress' | 'addUserIncomeData' | 'applyForRiseApplication' | 'approveConnectionRequest' | 'approveCustomerKYC' | 'approveNoumInvitation' | 'approveNoumMemberRolePromotion' | 'archiveNoumContact' | 'archiveNoumContacts' | 'archiveNoumRole' | 'archiveUserSpaces' | 'askForNoumReference' | 'assignHost' | 'autoInvoicePayment' | 'belvoAccessToken' | 'blockUser' | 'cancelConnectionRequestToNoum' | 'cancelInvoiceReport' | 'cancelKnock' | 'cancelNoumInvitation' | 'cancelNoumLayoutChanges' | 'cancelNoumMemberRolePromotion' | 'cancelProjectNoumCampaign' | 'cancelRaiseHandByGroupId' | 'cancelSpeakerInvitation' | 'cancelSubscription' | 'capitalquotient' | 'changeNoumMembersRole' | 'changeProjectChamberStatus' | 'clearGlobalSearchIndex' | 'clearNonActiveUserEntities' | 'clearNoumContactsIndex' | 'clearNoumMembersIndex' | 'clearRecentSearchesIndex' | 'closeCalendarMainEvent' | 'closeSocialHallGroup' | 'connectToNoum' | 'createAccountDwolla' | 'createAdCampaign' | 'createAdCampaignCsvReport' | 'createAdCampaignOffer' | 'createAddress' | 'createAndUpdateSpotLightAdmin' | 'createChargebeeCustomer' | 'createCommentForGenericEntity' | 'createContractReport' | 'createConversation' | 'createCustomer' | 'createCustomerPayee' | 'createCustomerUnverified' | 'createEvent' | 'createEventInvitation' | 'createGroup' | 'createGroupInvitation' | 'createGroupRequest' | 'createInstantEvent' | 'createInternalPlan' | 'createInvitation' | 'createInvoiceDraft' | 'createInvoicePayment' | 'createInvoiceReport' | 'createInvoiceToolReport' | 'createItem' | 'createItemFamily' | 'createItemPrice' | 'createMultipleEventInvitation' | 'createNewContract' | 'createNewItem' | 'createNewSOW' | 'createNote' | 'createNotification' | 'createNotificationV2' | 'createNoumClass' | 'createNoumLayoutSection' | 'createNoumProgram' | 'createNoumRole' | 'createOpsPermission' | 'createOpsRole' | 'createOrUpdateSocialHallForEvent' | 'createOrUpdateTokenArchive' | 'createPassCode' | 'createPayment' | 'createPaymentSubscriptionPlanGlobalSetting' | 'createPaymentSubscriptionSetting' | 'createPersonal' | 'createPlaidLink' | 'createPost' | 'createPostForChamber' | 'createProduct' | 'createProjectChamber' | 'createProjectNoumCampaign' | 'createQuestion' | 'createRenewedPlaidLink' | 'createRiseReport' | 'createSignedUrl' | 'createSocialHall' | 'createSowReport' | 'createSpace' | 'createSsn' | 'createStripeCustomer' | 'createSubWallet' | 'createSubscriptionAndInvoiceFromHostedPages' | 'createSurvey' | 'createSurveyPage' | 'createTwilioToken' | 'createUpdateAdCampaignReport' | 'createUserInvoiceLineItem' | 'createUserRiseAddress' | 'createUserRiseProfile' | 'createVideoThumbnail' | 'declineKnock' | 'declineRaiseHandByGroupId' | 'declineSpeakerInvitation' | 'deleteAccount' | 'deleteAdCampaign' | 'deleteAdCampaignOffer' | 'deleteAdCampaignReport' | 'deleteAllEventsByUserId' | 'deleteCommentForGenericEntity' | 'deleteConnection' | 'deleteContract' | 'deleteEvent' | 'deleteGroup' | 'deleteIdScanCheck' | 'deleteInvoice' | 'deleteInvoicePayment' | 'deleteNote' | 'deleteNoumFile' | 'deleteOpNotification' | 'deletePaymentProvider' | 'deletePost' | 'deleteQuestion' | 'deleteReplyToComment' | 'deleteReplyToCommentV2' | 'deleteSOW' | 'deleteSpace' | 'deleteSpaceConversation' | 'deleteSurvey' | 'deleteUserBankLink' | 'deleteUserInfo' | 'deleteUserInvoiceLineItem' | 'discardNoumReference' | 'docuSignAcceptance' | 'duplicateInvoice' | 'duplicateNoumLayoutSection' | 'duplicateNoumLayoutTool' | 'editAccountPassword' | 'exitFromGroup' | 'exitFromSocialHall' | 'favouriteNoum' | 'fetchAndCreatePlans' | 'generateAdminReport' | 'generateAiImages' | 'generateAutoDebitContract' | 'generateOTPForPasswordCreation' | 'generateOTPForVerification' | 'generateOneTimeToken' | 'generateReferralCode' | 'generateReferralCodeV2' | 'generateUserS3SignedUrl' | 'getOrCreateConversation' | 'getOrCreateGlobalConversation' | 'getOrCreateSpaceConversation' | 'groupEvent' | 'handleFollow' | 'handleSOWLinking' | 'healthCheck' | 'hideNotifications' | 'hideNotificationsV2' | 'identityCheck' | 'inactivateGroupAdmin' | 'initiateMicroDepositDwolla' | 'initiateTipForAnswer' | 'inviteAsSpeaker' | 'inviteNewNonNoumenaMember' | 'inviteNonNoumenaMember' | 'inviteNoumMembers' | 'joinGroupWithoutKnocking' | 'joinSocialHall' | 'joinSocialHallV2' | 'joinWaitingList' | 'kickNoumMembers' | 'knock' | 'leaveNoumMembership' | 'leaveSocialHall' | 'linkNoums' | 'makeAccountDefault' | 'markBroadcastedNoumAsViewed' | 'markNotificationAsRead' | 'markNotificationAsReadV2' | 'markNoumAsRecent' | 'markNoumFileAsDownloaded' | 'markNoumFileAsViewed' | 'markSearchEntityAsClicked' | 'markSpaceAsEdited' | 'moveToolToNoumLayoutColumn' | 'muteSpeaker' | 'notificationHandler' | 'notificationHandlerV2' | 'notifyUserToSetupWallet' | 'pinConversation' | 'pinPost' | 'principles' | 'publicProjectChamberElementState' | 'publishElementState' | 'publishNoumLayout' | 'publishSpaceById' | 'raiseHandByGroupId' | 'raiseInvoicePayment' | 'rearrangeNoumHierarchyOrder' | 'rearrangeSectionInNoumLayout' | 'redoNoumLayoutChange' | 'rejectAdCampaignOffer' | 'rejectConnectionRequest' | 'rejectContract' | 'rejectCustomerKYC' | 'rejectNoumInvitation' | 'rejectNoumMemberRolePromotion' | 'rejectSow' | 'removeAccount' | 'removeCalendar' | 'removeComment' | 'removeCustomerPayee' | 'removeDiscoveryProfiles' | 'removeElement' | 'removeFollowersFromSpace' | 'removeFromSocialHall' | 'removeGroupMember' | 'removeInitiateMicroDepositDwolla' | 'removeNetwork' | 'removeOpsPermission' | 'removeOpsRole' | 'removePayment' | 'removeProjectChamberElement' | 'removeRaiseHandsRequest' | 'removeReaction' | 'removeRecommendation' | 'removeSectionFromNoumLayout' | 'removeSpeaker' | 'removeStatement' | 'removeSubWallet' | 'removeToolFromNoumLayout' | 'removeUnsavedAndDraftedData' | 'removeUserSpaces' | 'removedPrevState' | 'requestConnection' | 'resendContractOrSowNotification' | 'resetConnectionCount' | 'resetPassCode' | 'resetPlanConfigurations' | 'resignFromNoumCoManagerRole' | 'restoreNoumRole' | 'retryBulkReport' | 'retryTransaction' | 'rewritteNoumLayoutUnsavedChanges' | 'saveBulkPaymentFile' | 'saveCardStripe' | 'saveNoumLayoutAsDraft' | 'saveOpNotification' | 'sendConnectionInvite' | 'sendDocumentForSigning' | 'sendEmail' | 'sendInvoice' | 'sendInvoiceReminder' | 'sendMultipleConnectionInvite' | 'sendNeedMoreInfoEmail' | 'sendNotification' | 'sendOpNotification' | 'sendPostReport' | 'sendSms' | 'sendUserNotification' | 'sendUserNotificationV2' | 'setAllowResetPassCode' | 'setCustomerTransactionLimitFlag' | 'setInviteInactive' | 'setNoumLayoutToolMetaValue' | 'signContract' | 'signSow' | 'spotlightPlans' | 'spotlightSelectedPlan' | 'ssnUniqueness' | 'startCalendarMainEvent' | 'submitOnboardingQuestionnaire' | 'submitSurveyAnswer' | 'submitUserApplication' | 'syncAndUpdatePlans' | 'testToken' | 'tipTransaction' | 'toggleFastPass' | 'turnOffAutoDebit' | 'unPinConversation' | 'unarchiveNoumContacts' | 'underwriting' | 'undoNoumLayoutChange' | 'unfavouriteNoum' | 'unlinkNoumLink' | 'unlinkNoums' | 'updateAccountFlag' | 'updateAdCampaign' | 'updateBillingAddress' | 'updateChargebeeCustomer' | 'updateCommentForGenericEntity' | 'updateConnectionPermission' | 'updateConnectionPermissionV2' | 'updateConnectionStatus' | 'updateContract' | 'updateConversationParticipants' | 'updateCustomerAddressDetails' | 'updateCustomerContactDetails' | 'updateCustomerDocument' | 'updateCustomerFirstTimeFlag' | 'updateCustomerPersonalDetails' | 'updateDiscoveryFromUser' | 'updateElement' | 'updateElementByElementType' | 'updateElementPosition' | 'updateEvent' | 'updateEventStatus' | 'updateGroup' | 'updateGroupInvitation' | 'updateGroupInvitationV2' | 'updateGroupName' | 'updateGroupRequest' | 'updateInvitation' | 'updateInviteStatus' | 'updateInvoice' | 'updateInvoicePayment' | 'updateInvoiceStatus' | 'updateInvoiceTags' | 'updateLocation' | 'updateMemberRole' | 'updateNote' | 'updateNotificationEventShowStatus' | 'updateNotificationEventShowStatusV2' | 'updateNotificationInviteStatus' | 'updateNotificationInviteStatusV2' | 'updateNotificationPostShowStatus' | 'updateNotificationPostShowStatusV2' | 'updateNotificationsReadStatus' | 'updateNotificationsReadStatusV2' | 'updateNoumApplicationResult' | 'updateNoumApplicationResultForAdmin' | 'updateNoumClass' | 'updateNoumContact' | 'updateNoumCustomPreview' | 'updateNoumFile' | 'updateNoumLayoutSection' | 'updateNoumProgram' | 'updateNoumReference' | 'updateNoumReferenceStatus' | 'updateNoumRole' | 'updateNoumTransactionStatus' | 'updateNoumTransactionValidDays' | 'updateNoumVisibilitySettings' | 'updateOpNotification' | 'updateOpsPermission' | 'updateOpsRole' | 'updatePaymentConfig' | 'updatePaymentProvider' | 'updatePaymentSubscriptionSetting' | 'updatePaymentTCAcceptance' | 'updatePlanDetails' | 'updatePlanEnabled' | 'updatePlanOrder' | 'updatePlanSetting' | 'updatePlanVisiblity' | 'updatePost' | 'updatePostReadStatus' | 'updateProfileElement' | 'updateProjectChamber' | 'updateProjectChamberElementPosition' | 'updateProjectChamberElements' | 'updateQuestion' | 'updateReferralCount' | 'updateReferralMaxAllowedCount' | 'updateSOW' | 'updateSocialHall' | 'updateSocialHallAttendeesStatus' | 'updateSpace' | 'updateSurvey' | 'updateSurveyPage' | 'updateTheme' | 'updateUnreadMessageCount' | 'updateUserActionLog' | 'updateUserAddressByAdmin' | 'updateUserContact' | 'updateUserCpfNumberAndAnswer' | 'updateUserData' | 'updateUserDetailsByAdmin' | 'updateUserInvoiceLineItem' | 'updateUserKyc' | 'updateUserMediaTestingForSH' | 'updateUserPreferences' | 'updateUserProfile' | 'updateUserProfilePicture' | 'updateUserReferralAndStatus' | 'updateUserRolesForAdmin' | 'updateUserSkillSought' | 'updateUserSkills' | 'updateUserStatus' | 'updateUserType' | 'upgradeDowngradeSubscription' | 'upsertDeviceToken' | 'validateResetPasswordOTP' | 'validateSecurityQuestion' | 'verifyMicroDepositDwolla' | 'verifyUserIdentity' | 'verifyUserProfile' | 'verifyWithOneTimeAuth' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	CreateSubscribe?: FieldPolicy<any> | FieldReadFunction<any>,
	OTPVerification?: FieldPolicy<any> | FieldReadFunction<any>,
	_?: FieldPolicy<any> | FieldReadFunction<any>,
	acceptKnock?: FieldPolicy<any> | FieldReadFunction<any>,
	acceptRaiseHandRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	acceptSpeakerInvitation?: FieldPolicy<any> | FieldReadFunction<any>,
	addAnswer?: FieldPolicy<any> | FieldReadFunction<any>,
	addAppActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	addBank?: FieldPolicy<any> | FieldReadFunction<any>,
	addComment?: FieldPolicy<any> | FieldReadFunction<any>,
	addCommentToPost?: FieldPolicy<any> | FieldReadFunction<any>,
	addCookieConsent?: FieldPolicy<any> | FieldReadFunction<any>,
	addDebitAccount?: FieldPolicy<any> | FieldReadFunction<any>,
	addDepositAccount?: FieldPolicy<any> | FieldReadFunction<any>,
	addElements?: FieldPolicy<any> | FieldReadFunction<any>,
	addElementsToProjectChamber?: FieldPolicy<any> | FieldReadFunction<any>,
	addManualReferenceForNoum?: FieldPolicy<any> | FieldReadFunction<any>,
	addNetwork?: FieldPolicy<any> | FieldReadFunction<any>,
	addNewNoumContact?: FieldPolicy<any> | FieldReadFunction<any>,
	addNoumFile?: FieldPolicy<any> | FieldReadFunction<any>,
	addNoumLayoutTool?: FieldPolicy<any> | FieldReadFunction<any>,
	addPaymentDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	addPaymentProvider?: FieldPolicy<any> | FieldReadFunction<any>,
	addProjectChamberCategory?: FieldPolicy<any> | FieldReadFunction<any>,
	addQuestionAnswers?: FieldPolicy<any> | FieldReadFunction<any>,
	addReaction?: FieldPolicy<any> | FieldReadFunction<any>,
	addReactionOnComment?: FieldPolicy<any> | FieldReadFunction<any>,
	addReactionOnCommentReply?: FieldPolicy<any> | FieldReadFunction<any>,
	addRemoveNoumSubscription?: FieldPolicy<any> | FieldReadFunction<any>,
	addReplyToComment?: FieldPolicy<any> | FieldReadFunction<any>,
	addReplyToCommentV2?: FieldPolicy<any> | FieldReadFunction<any>,
	addReplyToCommentV3ForGenericEntity?: FieldPolicy<any> | FieldReadFunction<any>,
	addRiseUserBank?: FieldPolicy<any> | FieldReadFunction<any>,
	addStatementDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	addUserAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	addUserIncomeData?: FieldPolicy<any> | FieldReadFunction<any>,
	applyForRiseApplication?: FieldPolicy<any> | FieldReadFunction<any>,
	approveConnectionRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	approveCustomerKYC?: FieldPolicy<any> | FieldReadFunction<any>,
	approveNoumInvitation?: FieldPolicy<any> | FieldReadFunction<any>,
	approveNoumMemberRolePromotion?: FieldPolicy<any> | FieldReadFunction<any>,
	archiveNoumContact?: FieldPolicy<any> | FieldReadFunction<any>,
	archiveNoumContacts?: FieldPolicy<any> | FieldReadFunction<any>,
	archiveNoumRole?: FieldPolicy<any> | FieldReadFunction<any>,
	archiveUserSpaces?: FieldPolicy<any> | FieldReadFunction<any>,
	askForNoumReference?: FieldPolicy<any> | FieldReadFunction<any>,
	assignHost?: FieldPolicy<any> | FieldReadFunction<any>,
	autoInvoicePayment?: FieldPolicy<any> | FieldReadFunction<any>,
	belvoAccessToken?: FieldPolicy<any> | FieldReadFunction<any>,
	blockUser?: FieldPolicy<any> | FieldReadFunction<any>,
	cancelConnectionRequestToNoum?: FieldPolicy<any> | FieldReadFunction<any>,
	cancelInvoiceReport?: FieldPolicy<any> | FieldReadFunction<any>,
	cancelKnock?: FieldPolicy<any> | FieldReadFunction<any>,
	cancelNoumInvitation?: FieldPolicy<any> | FieldReadFunction<any>,
	cancelNoumLayoutChanges?: FieldPolicy<any> | FieldReadFunction<any>,
	cancelNoumMemberRolePromotion?: FieldPolicy<any> | FieldReadFunction<any>,
	cancelProjectNoumCampaign?: FieldPolicy<any> | FieldReadFunction<any>,
	cancelRaiseHandByGroupId?: FieldPolicy<any> | FieldReadFunction<any>,
	cancelSpeakerInvitation?: FieldPolicy<any> | FieldReadFunction<any>,
	cancelSubscription?: FieldPolicy<any> | FieldReadFunction<any>,
	capitalquotient?: FieldPolicy<any> | FieldReadFunction<any>,
	changeNoumMembersRole?: FieldPolicy<any> | FieldReadFunction<any>,
	changeProjectChamberStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	clearGlobalSearchIndex?: FieldPolicy<any> | FieldReadFunction<any>,
	clearNonActiveUserEntities?: FieldPolicy<any> | FieldReadFunction<any>,
	clearNoumContactsIndex?: FieldPolicy<any> | FieldReadFunction<any>,
	clearNoumMembersIndex?: FieldPolicy<any> | FieldReadFunction<any>,
	clearRecentSearchesIndex?: FieldPolicy<any> | FieldReadFunction<any>,
	closeCalendarMainEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	closeSocialHallGroup?: FieldPolicy<any> | FieldReadFunction<any>,
	connectToNoum?: FieldPolicy<any> | FieldReadFunction<any>,
	createAccountDwolla?: FieldPolicy<any> | FieldReadFunction<any>,
	createAdCampaign?: FieldPolicy<any> | FieldReadFunction<any>,
	createAdCampaignCsvReport?: FieldPolicy<any> | FieldReadFunction<any>,
	createAdCampaignOffer?: FieldPolicy<any> | FieldReadFunction<any>,
	createAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	createAndUpdateSpotLightAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	createChargebeeCustomer?: FieldPolicy<any> | FieldReadFunction<any>,
	createCommentForGenericEntity?: FieldPolicy<any> | FieldReadFunction<any>,
	createContractReport?: FieldPolicy<any> | FieldReadFunction<any>,
	createConversation?: FieldPolicy<any> | FieldReadFunction<any>,
	createCustomer?: FieldPolicy<any> | FieldReadFunction<any>,
	createCustomerPayee?: FieldPolicy<any> | FieldReadFunction<any>,
	createCustomerUnverified?: FieldPolicy<any> | FieldReadFunction<any>,
	createEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	createEventInvitation?: FieldPolicy<any> | FieldReadFunction<any>,
	createGroup?: FieldPolicy<any> | FieldReadFunction<any>,
	createGroupInvitation?: FieldPolicy<any> | FieldReadFunction<any>,
	createGroupRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	createInstantEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	createInternalPlan?: FieldPolicy<any> | FieldReadFunction<any>,
	createInvitation?: FieldPolicy<any> | FieldReadFunction<any>,
	createInvoiceDraft?: FieldPolicy<any> | FieldReadFunction<any>,
	createInvoicePayment?: FieldPolicy<any> | FieldReadFunction<any>,
	createInvoiceReport?: FieldPolicy<any> | FieldReadFunction<any>,
	createInvoiceToolReport?: FieldPolicy<any> | FieldReadFunction<any>,
	createItem?: FieldPolicy<any> | FieldReadFunction<any>,
	createItemFamily?: FieldPolicy<any> | FieldReadFunction<any>,
	createItemPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	createMultipleEventInvitation?: FieldPolicy<any> | FieldReadFunction<any>,
	createNewContract?: FieldPolicy<any> | FieldReadFunction<any>,
	createNewItem?: FieldPolicy<any> | FieldReadFunction<any>,
	createNewSOW?: FieldPolicy<any> | FieldReadFunction<any>,
	createNote?: FieldPolicy<any> | FieldReadFunction<any>,
	createNotification?: FieldPolicy<any> | FieldReadFunction<any>,
	createNotificationV2?: FieldPolicy<any> | FieldReadFunction<any>,
	createNoumClass?: FieldPolicy<any> | FieldReadFunction<any>,
	createNoumLayoutSection?: FieldPolicy<any> | FieldReadFunction<any>,
	createNoumProgram?: FieldPolicy<any> | FieldReadFunction<any>,
	createNoumRole?: FieldPolicy<any> | FieldReadFunction<any>,
	createOpsPermission?: FieldPolicy<any> | FieldReadFunction<any>,
	createOpsRole?: FieldPolicy<any> | FieldReadFunction<any>,
	createOrUpdateSocialHallForEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	createOrUpdateTokenArchive?: FieldPolicy<any> | FieldReadFunction<any>,
	createPassCode?: FieldPolicy<any> | FieldReadFunction<any>,
	createPayment?: FieldPolicy<any> | FieldReadFunction<any>,
	createPaymentSubscriptionPlanGlobalSetting?: FieldPolicy<any> | FieldReadFunction<any>,
	createPaymentSubscriptionSetting?: FieldPolicy<any> | FieldReadFunction<any>,
	createPersonal?: FieldPolicy<any> | FieldReadFunction<any>,
	createPlaidLink?: FieldPolicy<any> | FieldReadFunction<any>,
	createPost?: FieldPolicy<any> | FieldReadFunction<any>,
	createPostForChamber?: FieldPolicy<any> | FieldReadFunction<any>,
	createProduct?: FieldPolicy<any> | FieldReadFunction<any>,
	createProjectChamber?: FieldPolicy<any> | FieldReadFunction<any>,
	createProjectNoumCampaign?: FieldPolicy<any> | FieldReadFunction<any>,
	createQuestion?: FieldPolicy<any> | FieldReadFunction<any>,
	createRenewedPlaidLink?: FieldPolicy<any> | FieldReadFunction<any>,
	createRiseReport?: FieldPolicy<any> | FieldReadFunction<any>,
	createSignedUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	createSocialHall?: FieldPolicy<any> | FieldReadFunction<any>,
	createSowReport?: FieldPolicy<any> | FieldReadFunction<any>,
	createSpace?: FieldPolicy<any> | FieldReadFunction<any>,
	createSsn?: FieldPolicy<any> | FieldReadFunction<any>,
	createStripeCustomer?: FieldPolicy<any> | FieldReadFunction<any>,
	createSubWallet?: FieldPolicy<any> | FieldReadFunction<any>,
	createSubscriptionAndInvoiceFromHostedPages?: FieldPolicy<any> | FieldReadFunction<any>,
	createSurvey?: FieldPolicy<any> | FieldReadFunction<any>,
	createSurveyPage?: FieldPolicy<any> | FieldReadFunction<any>,
	createTwilioToken?: FieldPolicy<any> | FieldReadFunction<any>,
	createUpdateAdCampaignReport?: FieldPolicy<any> | FieldReadFunction<any>,
	createUserInvoiceLineItem?: FieldPolicy<any> | FieldReadFunction<any>,
	createUserRiseAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	createUserRiseProfile?: FieldPolicy<any> | FieldReadFunction<any>,
	createVideoThumbnail?: FieldPolicy<any> | FieldReadFunction<any>,
	declineKnock?: FieldPolicy<any> | FieldReadFunction<any>,
	declineRaiseHandByGroupId?: FieldPolicy<any> | FieldReadFunction<any>,
	declineSpeakerInvitation?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteAccount?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteAdCampaign?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteAdCampaignOffer?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteAdCampaignReport?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteAllEventsByUserId?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteCommentForGenericEntity?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteContract?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteGroup?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteIdScanCheck?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteInvoice?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteInvoicePayment?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteNote?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteNoumFile?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteOpNotification?: FieldPolicy<any> | FieldReadFunction<any>,
	deletePaymentProvider?: FieldPolicy<any> | FieldReadFunction<any>,
	deletePost?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteQuestion?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteReplyToComment?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteReplyToCommentV2?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteSOW?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteSpace?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteSpaceConversation?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteSurvey?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteUserBankLink?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteUserInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteUserInvoiceLineItem?: FieldPolicy<any> | FieldReadFunction<any>,
	discardNoumReference?: FieldPolicy<any> | FieldReadFunction<any>,
	docuSignAcceptance?: FieldPolicy<any> | FieldReadFunction<any>,
	duplicateInvoice?: FieldPolicy<any> | FieldReadFunction<any>,
	duplicateNoumLayoutSection?: FieldPolicy<any> | FieldReadFunction<any>,
	duplicateNoumLayoutTool?: FieldPolicy<any> | FieldReadFunction<any>,
	editAccountPassword?: FieldPolicy<any> | FieldReadFunction<any>,
	exitFromGroup?: FieldPolicy<any> | FieldReadFunction<any>,
	exitFromSocialHall?: FieldPolicy<any> | FieldReadFunction<any>,
	favouriteNoum?: FieldPolicy<any> | FieldReadFunction<any>,
	fetchAndCreatePlans?: FieldPolicy<any> | FieldReadFunction<any>,
	generateAdminReport?: FieldPolicy<any> | FieldReadFunction<any>,
	generateAiImages?: FieldPolicy<any> | FieldReadFunction<any>,
	generateAutoDebitContract?: FieldPolicy<any> | FieldReadFunction<any>,
	generateOTPForPasswordCreation?: FieldPolicy<any> | FieldReadFunction<any>,
	generateOTPForVerification?: FieldPolicy<any> | FieldReadFunction<any>,
	generateOneTimeToken?: FieldPolicy<any> | FieldReadFunction<any>,
	generateReferralCode?: FieldPolicy<any> | FieldReadFunction<any>,
	generateReferralCodeV2?: FieldPolicy<any> | FieldReadFunction<any>,
	generateUserS3SignedUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	getOrCreateConversation?: FieldPolicy<any> | FieldReadFunction<any>,
	getOrCreateGlobalConversation?: FieldPolicy<any> | FieldReadFunction<any>,
	getOrCreateSpaceConversation?: FieldPolicy<any> | FieldReadFunction<any>,
	groupEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	handleFollow?: FieldPolicy<any> | FieldReadFunction<any>,
	handleSOWLinking?: FieldPolicy<any> | FieldReadFunction<any>,
	healthCheck?: FieldPolicy<any> | FieldReadFunction<any>,
	hideNotifications?: FieldPolicy<any> | FieldReadFunction<any>,
	hideNotificationsV2?: FieldPolicy<any> | FieldReadFunction<any>,
	identityCheck?: FieldPolicy<any> | FieldReadFunction<any>,
	inactivateGroupAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	initiateMicroDepositDwolla?: FieldPolicy<any> | FieldReadFunction<any>,
	initiateTipForAnswer?: FieldPolicy<any> | FieldReadFunction<any>,
	inviteAsSpeaker?: FieldPolicy<any> | FieldReadFunction<any>,
	inviteNewNonNoumenaMember?: FieldPolicy<any> | FieldReadFunction<any>,
	inviteNonNoumenaMember?: FieldPolicy<any> | FieldReadFunction<any>,
	inviteNoumMembers?: FieldPolicy<any> | FieldReadFunction<any>,
	joinGroupWithoutKnocking?: FieldPolicy<any> | FieldReadFunction<any>,
	joinSocialHall?: FieldPolicy<any> | FieldReadFunction<any>,
	joinSocialHallV2?: FieldPolicy<any> | FieldReadFunction<any>,
	joinWaitingList?: FieldPolicy<any> | FieldReadFunction<any>,
	kickNoumMembers?: FieldPolicy<any> | FieldReadFunction<any>,
	knock?: FieldPolicy<any> | FieldReadFunction<any>,
	leaveNoumMembership?: FieldPolicy<any> | FieldReadFunction<any>,
	leaveSocialHall?: FieldPolicy<any> | FieldReadFunction<any>,
	linkNoums?: FieldPolicy<any> | FieldReadFunction<any>,
	makeAccountDefault?: FieldPolicy<any> | FieldReadFunction<any>,
	markBroadcastedNoumAsViewed?: FieldPolicy<any> | FieldReadFunction<any>,
	markNotificationAsRead?: FieldPolicy<any> | FieldReadFunction<any>,
	markNotificationAsReadV2?: FieldPolicy<any> | FieldReadFunction<any>,
	markNoumAsRecent?: FieldPolicy<any> | FieldReadFunction<any>,
	markNoumFileAsDownloaded?: FieldPolicy<any> | FieldReadFunction<any>,
	markNoumFileAsViewed?: FieldPolicy<any> | FieldReadFunction<any>,
	markSearchEntityAsClicked?: FieldPolicy<any> | FieldReadFunction<any>,
	markSpaceAsEdited?: FieldPolicy<any> | FieldReadFunction<any>,
	moveToolToNoumLayoutColumn?: FieldPolicy<any> | FieldReadFunction<any>,
	muteSpeaker?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationHandler?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationHandlerV2?: FieldPolicy<any> | FieldReadFunction<any>,
	notifyUserToSetupWallet?: FieldPolicy<any> | FieldReadFunction<any>,
	pinConversation?: FieldPolicy<any> | FieldReadFunction<any>,
	pinPost?: FieldPolicy<any> | FieldReadFunction<any>,
	principles?: FieldPolicy<any> | FieldReadFunction<any>,
	publicProjectChamberElementState?: FieldPolicy<any> | FieldReadFunction<any>,
	publishElementState?: FieldPolicy<any> | FieldReadFunction<any>,
	publishNoumLayout?: FieldPolicy<any> | FieldReadFunction<any>,
	publishSpaceById?: FieldPolicy<any> | FieldReadFunction<any>,
	raiseHandByGroupId?: FieldPolicy<any> | FieldReadFunction<any>,
	raiseInvoicePayment?: FieldPolicy<any> | FieldReadFunction<any>,
	rearrangeNoumHierarchyOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	rearrangeSectionInNoumLayout?: FieldPolicy<any> | FieldReadFunction<any>,
	redoNoumLayoutChange?: FieldPolicy<any> | FieldReadFunction<any>,
	rejectAdCampaignOffer?: FieldPolicy<any> | FieldReadFunction<any>,
	rejectConnectionRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	rejectContract?: FieldPolicy<any> | FieldReadFunction<any>,
	rejectCustomerKYC?: FieldPolicy<any> | FieldReadFunction<any>,
	rejectNoumInvitation?: FieldPolicy<any> | FieldReadFunction<any>,
	rejectNoumMemberRolePromotion?: FieldPolicy<any> | FieldReadFunction<any>,
	rejectSow?: FieldPolicy<any> | FieldReadFunction<any>,
	removeAccount?: FieldPolicy<any> | FieldReadFunction<any>,
	removeCalendar?: FieldPolicy<any> | FieldReadFunction<any>,
	removeComment?: FieldPolicy<any> | FieldReadFunction<any>,
	removeCustomerPayee?: FieldPolicy<any> | FieldReadFunction<any>,
	removeDiscoveryProfiles?: FieldPolicy<any> | FieldReadFunction<any>,
	removeElement?: FieldPolicy<any> | FieldReadFunction<any>,
	removeFollowersFromSpace?: FieldPolicy<any> | FieldReadFunction<any>,
	removeFromSocialHall?: FieldPolicy<any> | FieldReadFunction<any>,
	removeGroupMember?: FieldPolicy<any> | FieldReadFunction<any>,
	removeInitiateMicroDepositDwolla?: FieldPolicy<any> | FieldReadFunction<any>,
	removeNetwork?: FieldPolicy<any> | FieldReadFunction<any>,
	removeOpsPermission?: FieldPolicy<any> | FieldReadFunction<any>,
	removeOpsRole?: FieldPolicy<any> | FieldReadFunction<any>,
	removePayment?: FieldPolicy<any> | FieldReadFunction<any>,
	removeProjectChamberElement?: FieldPolicy<any> | FieldReadFunction<any>,
	removeRaiseHandsRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	removeReaction?: FieldPolicy<any> | FieldReadFunction<any>,
	removeRecommendation?: FieldPolicy<any> | FieldReadFunction<any>,
	removeSectionFromNoumLayout?: FieldPolicy<any> | FieldReadFunction<any>,
	removeSpeaker?: FieldPolicy<any> | FieldReadFunction<any>,
	removeStatement?: FieldPolicy<any> | FieldReadFunction<any>,
	removeSubWallet?: FieldPolicy<any> | FieldReadFunction<any>,
	removeToolFromNoumLayout?: FieldPolicy<any> | FieldReadFunction<any>,
	removeUnsavedAndDraftedData?: FieldPolicy<any> | FieldReadFunction<any>,
	removeUserSpaces?: FieldPolicy<any> | FieldReadFunction<any>,
	removedPrevState?: FieldPolicy<any> | FieldReadFunction<any>,
	requestConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	resendContractOrSowNotification?: FieldPolicy<any> | FieldReadFunction<any>,
	resetConnectionCount?: FieldPolicy<any> | FieldReadFunction<any>,
	resetPassCode?: FieldPolicy<any> | FieldReadFunction<any>,
	resetPlanConfigurations?: FieldPolicy<any> | FieldReadFunction<any>,
	resignFromNoumCoManagerRole?: FieldPolicy<any> | FieldReadFunction<any>,
	restoreNoumRole?: FieldPolicy<any> | FieldReadFunction<any>,
	retryBulkReport?: FieldPolicy<any> | FieldReadFunction<any>,
	retryTransaction?: FieldPolicy<any> | FieldReadFunction<any>,
	rewritteNoumLayoutUnsavedChanges?: FieldPolicy<any> | FieldReadFunction<any>,
	saveBulkPaymentFile?: FieldPolicy<any> | FieldReadFunction<any>,
	saveCardStripe?: FieldPolicy<any> | FieldReadFunction<any>,
	saveNoumLayoutAsDraft?: FieldPolicy<any> | FieldReadFunction<any>,
	saveOpNotification?: FieldPolicy<any> | FieldReadFunction<any>,
	sendConnectionInvite?: FieldPolicy<any> | FieldReadFunction<any>,
	sendDocumentForSigning?: FieldPolicy<any> | FieldReadFunction<any>,
	sendEmail?: FieldPolicy<any> | FieldReadFunction<any>,
	sendInvoice?: FieldPolicy<any> | FieldReadFunction<any>,
	sendInvoiceReminder?: FieldPolicy<any> | FieldReadFunction<any>,
	sendMultipleConnectionInvite?: FieldPolicy<any> | FieldReadFunction<any>,
	sendNeedMoreInfoEmail?: FieldPolicy<any> | FieldReadFunction<any>,
	sendNotification?: FieldPolicy<any> | FieldReadFunction<any>,
	sendOpNotification?: FieldPolicy<any> | FieldReadFunction<any>,
	sendPostReport?: FieldPolicy<any> | FieldReadFunction<any>,
	sendSms?: FieldPolicy<any> | FieldReadFunction<any>,
	sendUserNotification?: FieldPolicy<any> | FieldReadFunction<any>,
	sendUserNotificationV2?: FieldPolicy<any> | FieldReadFunction<any>,
	setAllowResetPassCode?: FieldPolicy<any> | FieldReadFunction<any>,
	setCustomerTransactionLimitFlag?: FieldPolicy<any> | FieldReadFunction<any>,
	setInviteInactive?: FieldPolicy<any> | FieldReadFunction<any>,
	setNoumLayoutToolMetaValue?: FieldPolicy<any> | FieldReadFunction<any>,
	signContract?: FieldPolicy<any> | FieldReadFunction<any>,
	signSow?: FieldPolicy<any> | FieldReadFunction<any>,
	spotlightPlans?: FieldPolicy<any> | FieldReadFunction<any>,
	spotlightSelectedPlan?: FieldPolicy<any> | FieldReadFunction<any>,
	ssnUniqueness?: FieldPolicy<any> | FieldReadFunction<any>,
	startCalendarMainEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	submitOnboardingQuestionnaire?: FieldPolicy<any> | FieldReadFunction<any>,
	submitSurveyAnswer?: FieldPolicy<any> | FieldReadFunction<any>,
	submitUserApplication?: FieldPolicy<any> | FieldReadFunction<any>,
	syncAndUpdatePlans?: FieldPolicy<any> | FieldReadFunction<any>,
	testToken?: FieldPolicy<any> | FieldReadFunction<any>,
	tipTransaction?: FieldPolicy<any> | FieldReadFunction<any>,
	toggleFastPass?: FieldPolicy<any> | FieldReadFunction<any>,
	turnOffAutoDebit?: FieldPolicy<any> | FieldReadFunction<any>,
	unPinConversation?: FieldPolicy<any> | FieldReadFunction<any>,
	unarchiveNoumContacts?: FieldPolicy<any> | FieldReadFunction<any>,
	underwriting?: FieldPolicy<any> | FieldReadFunction<any>,
	undoNoumLayoutChange?: FieldPolicy<any> | FieldReadFunction<any>,
	unfavouriteNoum?: FieldPolicy<any> | FieldReadFunction<any>,
	unlinkNoumLink?: FieldPolicy<any> | FieldReadFunction<any>,
	unlinkNoums?: FieldPolicy<any> | FieldReadFunction<any>,
	updateAccountFlag?: FieldPolicy<any> | FieldReadFunction<any>,
	updateAdCampaign?: FieldPolicy<any> | FieldReadFunction<any>,
	updateBillingAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	updateChargebeeCustomer?: FieldPolicy<any> | FieldReadFunction<any>,
	updateCommentForGenericEntity?: FieldPolicy<any> | FieldReadFunction<any>,
	updateConnectionPermission?: FieldPolicy<any> | FieldReadFunction<any>,
	updateConnectionPermissionV2?: FieldPolicy<any> | FieldReadFunction<any>,
	updateConnectionStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	updateContract?: FieldPolicy<any> | FieldReadFunction<any>,
	updateConversationParticipants?: FieldPolicy<any> | FieldReadFunction<any>,
	updateCustomerAddressDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	updateCustomerContactDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	updateCustomerDocument?: FieldPolicy<any> | FieldReadFunction<any>,
	updateCustomerFirstTimeFlag?: FieldPolicy<any> | FieldReadFunction<any>,
	updateCustomerPersonalDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	updateDiscoveryFromUser?: FieldPolicy<any> | FieldReadFunction<any>,
	updateElement?: FieldPolicy<any> | FieldReadFunction<any>,
	updateElementByElementType?: FieldPolicy<any> | FieldReadFunction<any>,
	updateElementPosition?: FieldPolicy<any> | FieldReadFunction<any>,
	updateEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	updateEventStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	updateGroup?: FieldPolicy<any> | FieldReadFunction<any>,
	updateGroupInvitation?: FieldPolicy<any> | FieldReadFunction<any>,
	updateGroupInvitationV2?: FieldPolicy<any> | FieldReadFunction<any>,
	updateGroupName?: FieldPolicy<any> | FieldReadFunction<any>,
	updateGroupRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	updateInvitation?: FieldPolicy<any> | FieldReadFunction<any>,
	updateInviteStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	updateInvoice?: FieldPolicy<any> | FieldReadFunction<any>,
	updateInvoicePayment?: FieldPolicy<any> | FieldReadFunction<any>,
	updateInvoiceStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	updateInvoiceTags?: FieldPolicy<any> | FieldReadFunction<any>,
	updateLocation?: FieldPolicy<any> | FieldReadFunction<any>,
	updateMemberRole?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNote?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNotificationEventShowStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNotificationEventShowStatusV2?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNotificationInviteStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNotificationInviteStatusV2?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNotificationPostShowStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNotificationPostShowStatusV2?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNotificationsReadStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNotificationsReadStatusV2?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNoumApplicationResult?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNoumApplicationResultForAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNoumClass?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNoumContact?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNoumCustomPreview?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNoumFile?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNoumLayoutSection?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNoumProgram?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNoumReference?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNoumReferenceStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNoumRole?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNoumTransactionStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNoumTransactionValidDays?: FieldPolicy<any> | FieldReadFunction<any>,
	updateNoumVisibilitySettings?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOpNotification?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOpsPermission?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOpsRole?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePaymentConfig?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePaymentProvider?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePaymentSubscriptionSetting?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePaymentTCAcceptance?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePlanDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePlanEnabled?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePlanOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePlanSetting?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePlanVisiblity?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePost?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePostReadStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	updateProfileElement?: FieldPolicy<any> | FieldReadFunction<any>,
	updateProjectChamber?: FieldPolicy<any> | FieldReadFunction<any>,
	updateProjectChamberElementPosition?: FieldPolicy<any> | FieldReadFunction<any>,
	updateProjectChamberElements?: FieldPolicy<any> | FieldReadFunction<any>,
	updateQuestion?: FieldPolicy<any> | FieldReadFunction<any>,
	updateReferralCount?: FieldPolicy<any> | FieldReadFunction<any>,
	updateReferralMaxAllowedCount?: FieldPolicy<any> | FieldReadFunction<any>,
	updateSOW?: FieldPolicy<any> | FieldReadFunction<any>,
	updateSocialHall?: FieldPolicy<any> | FieldReadFunction<any>,
	updateSocialHallAttendeesStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	updateSpace?: FieldPolicy<any> | FieldReadFunction<any>,
	updateSurvey?: FieldPolicy<any> | FieldReadFunction<any>,
	updateSurveyPage?: FieldPolicy<any> | FieldReadFunction<any>,
	updateTheme?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUnreadMessageCount?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserActionLog?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserAddressByAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserContact?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserCpfNumberAndAnswer?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserData?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserDetailsByAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserInvoiceLineItem?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserKyc?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserMediaTestingForSH?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserPreferences?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserProfile?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserProfilePicture?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserReferralAndStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserRolesForAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserSkillSought?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserSkills?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUserType?: FieldPolicy<any> | FieldReadFunction<any>,
	upgradeDowngradeSubscription?: FieldPolicy<any> | FieldReadFunction<any>,
	upsertDeviceToken?: FieldPolicy<any> | FieldReadFunction<any>,
	validateResetPasswordOTP?: FieldPolicy<any> | FieldReadFunction<any>,
	validateSecurityQuestion?: FieldPolicy<any> | FieldReadFunction<any>,
	verifyMicroDepositDwolla?: FieldPolicy<any> | FieldReadFunction<any>,
	verifyUserIdentity?: FieldPolicy<any> | FieldReadFunction<any>,
	verifyUserProfile?: FieldPolicy<any> | FieldReadFunction<any>,
	verifyWithOneTimeAuth?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MuteSpeakerSubscriptionDataKeySpecifier = ('actionType' | 'userId' | MuteSpeakerSubscriptionDataKeySpecifier)[];
export type MuteSpeakerSubscriptionDataFieldPolicy = {
	actionType?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NMUserOutputKeySpecifier = ('id' | NMUserOutputKeySpecifier)[];
export type NMUserOutputFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NetworkOutputKeySpecifier = ('_id' | 'accessToken' | 'connectionType' | 'expiryDate' | 'isActive' | 'userId' | NetworkOutputKeySpecifier)[];
export type NetworkOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	accessToken?: FieldPolicy<any> | FieldReadFunction<any>,
	connectionType?: FieldPolicy<any> | FieldReadFunction<any>,
	expiryDate?: FieldPolicy<any> | FieldReadFunction<any>,
	isActive?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NeuroProfileQueriesKeySpecifier = ('getNeuroQuestion' | NeuroProfileQueriesKeySpecifier)[];
export type NeuroProfileQueriesFieldPolicy = {
	getNeuroQuestion?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NewProductOutputKeySpecifier = ('_id' | 'code' | 'countryCode' | 'currencyCode' | 'description' | 'effectiveDateFrom' | 'effectiveDateTo' | 'name' | 'productOwner' | NewProductOutputKeySpecifier)[];
export type NewProductOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	countryCode?: FieldPolicy<any> | FieldReadFunction<any>,
	currencyCode?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	effectiveDateFrom?: FieldPolicy<any> | FieldReadFunction<any>,
	effectiveDateTo?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	productOwner?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoRelationBusinessOutputKeySpecifier = ('city' | 'geo' | 'id' | 'name' | 'phone' | 'state' | 'street' | 'subcode' | 'taxId' | 'zip' | NoRelationBusinessOutputKeySpecifier)[];
export type NoRelationBusinessOutputFieldPolicy = {
	city?: FieldPolicy<any> | FieldReadFunction<any>,
	geo?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	phone?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>,
	street?: FieldPolicy<any> | FieldReadFunction<any>,
	subcode?: FieldPolicy<any> | FieldReadFunction<any>,
	taxId?: FieldPolicy<any> | FieldReadFunction<any>,
	zip?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoteKeySpecifier = ('createdAt' | 'createdBy' | 'customerId' | 'deletable' | 'editable' | 'id' | 'text' | 'updatedAt' | 'updatedBy' | NoteKeySpecifier)[];
export type NoteFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>,
	customerId?: FieldPolicy<any> | FieldReadFunction<any>,
	deletable?: FieldPolicy<any> | FieldReadFunction<any>,
	editable?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	text?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedBy?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotificationKeySpecifier = ('_id' | 'adminUserId' | 'authorName' | 'commentId' | 'createdAt' | 'data' | 'event' | 'group' | 'inviteId' | 'inviteStatus' | 'postId' | 'sourceUserNoum' | 'taggedPostCommentText' | 'type' | 'unread' | 'updatedAt' | 'userId' | 'users' | NotificationKeySpecifier)[];
export type NotificationFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	adminUserId?: FieldPolicy<any> | FieldReadFunction<any>,
	authorName?: FieldPolicy<any> | FieldReadFunction<any>,
	commentId?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	event?: FieldPolicy<any> | FieldReadFunction<any>,
	group?: FieldPolicy<any> | FieldReadFunction<any>,
	inviteId?: FieldPolicy<any> | FieldReadFunction<any>,
	inviteStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	postId?: FieldPolicy<any> | FieldReadFunction<any>,
	sourceUserNoum?: FieldPolicy<any> | FieldReadFunction<any>,
	taggedPostCommentText?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	unread?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>,
	users?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotificationAdditionalDataKeySpecifier = ('adCampaign' | 'answerId' | 'category' | 'chamber' | 'chamberId' | 'connection' | 'connectionId' | 'contractId' | 'count' | 'invoiceId' | 'invoiceStatus' | 'message' | 'noumMember' | 'noumMemberId' | 'paymentSub' | 'questionId' | 'sowId' | 'topUpdatedElement' | NotificationAdditionalDataKeySpecifier)[];
export type NotificationAdditionalDataFieldPolicy = {
	adCampaign?: FieldPolicy<any> | FieldReadFunction<any>,
	answerId?: FieldPolicy<any> | FieldReadFunction<any>,
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	chamber?: FieldPolicy<any> | FieldReadFunction<any>,
	chamberId?: FieldPolicy<any> | FieldReadFunction<any>,
	connection?: FieldPolicy<any> | FieldReadFunction<any>,
	connectionId?: FieldPolicy<any> | FieldReadFunction<any>,
	contractId?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	invoiceId?: FieldPolicy<any> | FieldReadFunction<any>,
	invoiceStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	noumMember?: FieldPolicy<any> | FieldReadFunction<any>,
	noumMemberId?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentSub?: FieldPolicy<any> | FieldReadFunction<any>,
	questionId?: FieldPolicy<any> | FieldReadFunction<any>,
	sowId?: FieldPolicy<any> | FieldReadFunction<any>,
	topUpdatedElement?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotificationAdditionalDataV2KeySpecifier = ('answerId' | 'category' | 'chamber' | 'chamberId' | 'connection' | 'connectionId' | 'contractId' | 'count' | 'invoiceId' | 'invoiceStatus' | 'message' | 'paymentSub' | 'questionId' | 'sowId' | 'topUpdatedElement' | NotificationAdditionalDataV2KeySpecifier)[];
export type NotificationAdditionalDataV2FieldPolicy = {
	answerId?: FieldPolicy<any> | FieldReadFunction<any>,
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	chamber?: FieldPolicy<any> | FieldReadFunction<any>,
	chamberId?: FieldPolicy<any> | FieldReadFunction<any>,
	connection?: FieldPolicy<any> | FieldReadFunction<any>,
	connectionId?: FieldPolicy<any> | FieldReadFunction<any>,
	contractId?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	invoiceId?: FieldPolicy<any> | FieldReadFunction<any>,
	invoiceStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentSub?: FieldPolicy<any> | FieldReadFunction<any>,
	questionId?: FieldPolicy<any> | FieldReadFunction<any>,
	sowId?: FieldPolicy<any> | FieldReadFunction<any>,
	topUpdatedElement?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotificationDataAdCampaignKeySpecifier = ('campaignId' | 'offerId' | 'reportId' | NotificationDataAdCampaignKeySpecifier)[];
export type NotificationDataAdCampaignFieldPolicy = {
	campaignId?: FieldPolicy<any> | FieldReadFunction<any>,
	offerId?: FieldPolicy<any> | FieldReadFunction<any>,
	reportId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotificationOPKeySpecifier = ('attachmentLink' | 'message' | 'subject' | 'title' | 'to' | 'userId' | NotificationOPKeySpecifier)[];
export type NotificationOPFieldPolicy = {
	attachmentLink?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	subject?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	to?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotificationPaymentSubDataKeySpecifier = ('currency' | 'currencySymbol' | 'external_customer_id' | 'external_subscription_id' | 'next_billing_at' | 'noumExpiryDays' | 'noumName' | 'planId' | 'planName' | 'planPrice' | 'subscription_id' | NotificationPaymentSubDataKeySpecifier)[];
export type NotificationPaymentSubDataFieldPolicy = {
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	currencySymbol?: FieldPolicy<any> | FieldReadFunction<any>,
	external_customer_id?: FieldPolicy<any> | FieldReadFunction<any>,
	external_subscription_id?: FieldPolicy<any> | FieldReadFunction<any>,
	next_billing_at?: FieldPolicy<any> | FieldReadFunction<any>,
	noumExpiryDays?: FieldPolicy<any> | FieldReadFunction<any>,
	noumName?: FieldPolicy<any> | FieldReadFunction<any>,
	planId?: FieldPolicy<any> | FieldReadFunction<any>,
	planName?: FieldPolicy<any> | FieldReadFunction<any>,
	planPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	subscription_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotificationPaymentSubscriptionDataV2KeySpecifier = ('currency' | 'currencySymbol' | 'external_customer_id' | 'external_subscription_id' | 'next_billing_at' | 'noumExpiryDays' | 'noumName' | 'planId' | 'planName' | 'planPrice' | 'subscription_id' | NotificationPaymentSubscriptionDataV2KeySpecifier)[];
export type NotificationPaymentSubscriptionDataV2FieldPolicy = {
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	currencySymbol?: FieldPolicy<any> | FieldReadFunction<any>,
	external_customer_id?: FieldPolicy<any> | FieldReadFunction<any>,
	external_subscription_id?: FieldPolicy<any> | FieldReadFunction<any>,
	next_billing_at?: FieldPolicy<any> | FieldReadFunction<any>,
	noumExpiryDays?: FieldPolicy<any> | FieldReadFunction<any>,
	noumName?: FieldPolicy<any> | FieldReadFunction<any>,
	planId?: FieldPolicy<any> | FieldReadFunction<any>,
	planName?: FieldPolicy<any> | FieldReadFunction<any>,
	planPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	subscription_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotificationSubscriptionDataKeySpecifier = ('_id' | 'type' | 'userId' | NotificationSubscriptionDataKeySpecifier)[];
export type NotificationSubscriptionDataFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotificationV2KeySpecifier = ('_id' | 'adminUserId' | 'authorName' | 'commentId' | 'createdAt' | 'data' | 'event' | 'group' | 'inviteId' | 'inviteStatus' | 'postId' | 'type' | 'unread' | 'updatedAt' | 'userId' | 'users' | NotificationV2KeySpecifier)[];
export type NotificationV2FieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	adminUserId?: FieldPolicy<any> | FieldReadFunction<any>,
	authorName?: FieldPolicy<any> | FieldReadFunction<any>,
	commentId?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	event?: FieldPolicy<any> | FieldReadFunction<any>,
	group?: FieldPolicy<any> | FieldReadFunction<any>,
	inviteId?: FieldPolicy<any> | FieldReadFunction<any>,
	inviteStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	postId?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	unread?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>,
	users?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotificationsKeySpecifier = ('count' | 'data' | 'unreadCount' | 'unviewedCount' | NotificationsKeySpecifier)[];
export type NotificationsFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	unreadCount?: FieldPolicy<any> | FieldReadFunction<any>,
	unviewedCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotificationsV2KeySpecifier = ('count' | 'data' | 'unreadCount' | 'unviewedCount' | NotificationsV2KeySpecifier)[];
export type NotificationsV2FieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	unreadCount?: FieldPolicy<any> | FieldReadFunction<any>,
	unviewedCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotifyOutputKeySpecifier = ('success' | NotifyOutputKeySpecifier)[];
export type NotifyOutputFieldPolicy = {
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumActivityStatsKeySpecifier = ('eventsHosted' | 'membersInvited' | 'messagesSent' | 'others' | 'postsPosted' | 'transactions' | NoumActivityStatsKeySpecifier)[];
export type NoumActivityStatsFieldPolicy = {
	eventsHosted?: FieldPolicy<any> | FieldReadFunction<any>,
	membersInvited?: FieldPolicy<any> | FieldReadFunction<any>,
	messagesSent?: FieldPolicy<any> | FieldReadFunction<any>,
	others?: FieldPolicy<any> | FieldReadFunction<any>,
	postsPosted?: FieldPolicy<any> | FieldReadFunction<any>,
	transactions?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumClassKeySpecifier = ('_id' | 'description' | 'isDeleted' | 'name' | 'noumId' | 'programId' | 'questions' | 'reviewers' | 'type' | NoumClassKeySpecifier)[];
export type NoumClassFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	isDeleted?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	noumId?: FieldPolicy<any> | FieldReadFunction<any>,
	programId?: FieldPolicy<any> | FieldReadFunction<any>,
	questions?: FieldPolicy<any> | FieldReadFunction<any>,
	reviewers?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumClassListKeySpecifier = ('count' | 'data' | NoumClassListKeySpecifier)[];
export type NoumClassListFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumColorsKeySpecifier = ('investment' | 'member' | 'project' | 'social' | 'special' | 'story' | NoumColorsKeySpecifier)[];
export type NoumColorsFieldPolicy = {
	investment?: FieldPolicy<any> | FieldReadFunction<any>,
	member?: FieldPolicy<any> | FieldReadFunction<any>,
	project?: FieldPolicy<any> | FieldReadFunction<any>,
	social?: FieldPolicy<any> | FieldReadFunction<any>,
	special?: FieldPolicy<any> | FieldReadFunction<any>,
	story?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumConnectionKPIDatePointKeySpecifier = ('date' | 'values' | NoumConnectionKPIDatePointKeySpecifier)[];
export type NoumConnectionKPIDatePointFieldPolicy = {
	date?: FieldPolicy<any> | FieldReadFunction<any>,
	values?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumConnectionRequestKeySpecifier = ('_id' | 'requestedAt' | 'role' | 'user' | NoumConnectionRequestKeySpecifier)[];
export type NoumConnectionRequestFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	requestedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	role?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumConnectionsKPIKeySpecifier = ('kpi' | 'series' | NoumConnectionsKPIKeySpecifier)[];
export type NoumConnectionsKPIFieldPolicy = {
	kpi?: FieldPolicy<any> | FieldReadFunction<any>,
	series?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumContactAdminResultKeySpecifier = ('count' | 'data' | NoumContactAdminResultKeySpecifier)[];
export type NoumContactAdminResultFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumContactOutputKeySpecifier = ('_id' | 'apartmentNo' | 'city' | 'companyName' | 'connectionWithNoum' | 'country' | 'createdAt' | 'displayName' | 'fullName' | 'isConnectedWithNoum' | 'ownerId' | 'state' | 'status' | 'street' | 'title' | 'type' | 'userId' | 'zipCode' | NoumContactOutputKeySpecifier)[];
export type NoumContactOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	apartmentNo?: FieldPolicy<any> | FieldReadFunction<any>,
	city?: FieldPolicy<any> | FieldReadFunction<any>,
	companyName?: FieldPolicy<any> | FieldReadFunction<any>,
	connectionWithNoum?: FieldPolicy<any> | FieldReadFunction<any>,
	country?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	displayName?: FieldPolicy<any> | FieldReadFunction<any>,
	fullName?: FieldPolicy<any> | FieldReadFunction<any>,
	isConnectedWithNoum?: FieldPolicy<any> | FieldReadFunction<any>,
	ownerId?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	street?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>,
	zipCode?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumContactPaginatedKeySpecifier = ('count' | 'data' | NoumContactPaginatedKeySpecifier)[];
export type NoumContactPaginatedFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumContractOutputKeySpecifier = ('count' | 'data' | NoumContractOutputKeySpecifier)[];
export type NoumContractOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumContractOutputAdminKeySpecifier = ('count' | 'data' | 'sowCount' | NoumContractOutputAdminKeySpecifier)[];
export type NoumContractOutputAdminFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	sowCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumFileKeySpecifier = ('_id' | 'description' | 'downloadsCount' | 'extension' | 'fileSize' | 'fileUrl' | 'name' | 'owner' | 'status' | 'updatedAt' | 'uploadedAt' | 'viewsCount' | 'visibilityRoles' | NoumFileKeySpecifier)[];
export type NoumFileFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	downloadsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	extension?: FieldPolicy<any> | FieldReadFunction<any>,
	fileSize?: FieldPolicy<any> | FieldReadFunction<any>,
	fileUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	owner?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	uploadedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	viewsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	visibilityRoles?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumFollowKPIDatePointKeySpecifier = ('date' | 'values' | NoumFollowKPIDatePointKeySpecifier)[];
export type NoumFollowKPIDatePointFieldPolicy = {
	date?: FieldPolicy<any> | FieldReadFunction<any>,
	values?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumFollowersKPIKeySpecifier = ('kpi' | 'series' | NoumFollowersKPIKeySpecifier)[];
export type NoumFollowersKPIFieldPolicy = {
	kpi?: FieldPolicy<any> | FieldReadFunction<any>,
	series?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumGroupConversationItemKeySpecifier = ('cids' | 'conversations' | 'conversationsCount' | 'last_updatedAt' | 'noum' | 'unread' | 'unreadConversation' | NoumGroupConversationItemKeySpecifier)[];
export type NoumGroupConversationItemFieldPolicy = {
	cids?: FieldPolicy<any> | FieldReadFunction<any>,
	conversations?: FieldPolicy<any> | FieldReadFunction<any>,
	conversationsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	last_updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	noum?: FieldPolicy<any> | FieldReadFunction<any>,
	unread?: FieldPolicy<any> | FieldReadFunction<any>,
	unreadConversation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumLayoutKeySpecifier = ('_id' | 'hasRedoAction' | 'hasUndoAction' | 'sections' | 'status' | 'uniqueToolStatuses' | NoumLayoutKeySpecifier)[];
export type NoumLayoutFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	hasRedoAction?: FieldPolicy<any> | FieldReadFunction<any>,
	hasUndoAction?: FieldPolicy<any> | FieldReadFunction<any>,
	sections?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	uniqueToolStatuses?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumLayoutColumnKeySpecifier = ('_id' | 'background' | 'position' | 'tools' | NoumLayoutColumnKeySpecifier)[];
export type NoumLayoutColumnFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	background?: FieldPolicy<any> | FieldReadFunction<any>,
	position?: FieldPolicy<any> | FieldReadFunction<any>,
	tools?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumLayoutSectionKeySpecifier = ('_id' | 'background' | 'columns' | 'columnsVerticalAlignType' | 'position' | 'type' | 'visible' | NoumLayoutSectionKeySpecifier)[];
export type NoumLayoutSectionFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	background?: FieldPolicy<any> | FieldReadFunction<any>,
	columns?: FieldPolicy<any> | FieldReadFunction<any>,
	columnsVerticalAlignType?: FieldPolicy<any> | FieldReadFunction<any>,
	position?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	visible?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumLinkKeySpecifier = ('_id' | 'connectionsCount' | 'followersCount' | 'linkedAt' | 'linkedNoums' | 'linkedNoumsCount' | 'projectType' | 'status' | 'updatedAt' | NoumLinkKeySpecifier)[];
export type NoumLinkFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	connectionsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	followersCount?: FieldPolicy<any> | FieldReadFunction<any>,
	linkedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	linkedNoums?: FieldPolicy<any> | FieldReadFunction<any>,
	linkedNoumsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	projectType?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumLinkResponseKeySpecifier = ('count' | 'data' | NoumLinkResponseKeySpecifier)[];
export type NoumLinkResponseFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumMemberKeySpecifier = ('_id' | 'activeInvitation' | 'activeRequest' | 'approvedAt' | 'coManagerStatistics' | 'connectedAt' | 'connectedNoums' | 'noum' | 'noumId' | 'previousRole' | 'requestedAt' | 'role' | 'rolePromotionToApprove' | 'status' | 'updatedAt' | 'user' | NoumMemberKeySpecifier)[];
export type NoumMemberFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	activeInvitation?: FieldPolicy<any> | FieldReadFunction<any>,
	activeRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	approvedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	coManagerStatistics?: FieldPolicy<any> | FieldReadFunction<any>,
	connectedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	connectedNoums?: FieldPolicy<any> | FieldReadFunction<any>,
	noum?: FieldPolicy<any> | FieldReadFunction<any>,
	noumId?: FieldPolicy<any> | FieldReadFunction<any>,
	previousRole?: FieldPolicy<any> | FieldReadFunction<any>,
	requestedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	role?: FieldPolicy<any> | FieldReadFunction<any>,
	rolePromotionToApprove?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumMemberByIdRefKeySpecifier = ('_id' | 'approvedAt' | 'archivedAt' | 'connectedAt' | 'hasAccessToNoumWallet' | 'message' | 'noumId' | 'permission' | 'requestedAt' | 'roleId' | 'status' | 'type' | 'userId' | 'walletLimitAmount' | 'walletLimitType' | 'welcomeMessage' | NoumMemberByIdRefKeySpecifier)[];
export type NoumMemberByIdRefFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	approvedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	archivedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	connectedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	hasAccessToNoumWallet?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	noumId?: FieldPolicy<any> | FieldReadFunction<any>,
	permission?: FieldPolicy<any> | FieldReadFunction<any>,
	requestedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	roleId?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>,
	walletLimitAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	walletLimitType?: FieldPolicy<any> | FieldReadFunction<any>,
	welcomeMessage?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumMemberRoleKeySpecifier = ('_id' | 'isManager' | 'name' | 'permission' | 'rolePromotedBy' | NoumMemberRoleKeySpecifier)[];
export type NoumMemberRoleFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	isManager?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	permission?: FieldPolicy<any> | FieldReadFunction<any>,
	rolePromotedBy?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumMembershipStatusKeySpecifier = ('_id' | 'connectedAt' | 'invitationSentFrom' | 'role' | 'rolePromotionToApprove' | 'status' | NoumMembershipStatusKeySpecifier)[];
export type NoumMembershipStatusFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	connectedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	invitationSentFrom?: FieldPolicy<any> | FieldReadFunction<any>,
	role?: FieldPolicy<any> | FieldReadFunction<any>,
	rolePromotionToApprove?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumPendingConnectionKeySpecifier = ('_id' | 'noum' | 'requestedAt' | 'type' | 'user' | NoumPendingConnectionKeySpecifier)[];
export type NoumPendingConnectionFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	noum?: FieldPolicy<any> | FieldReadFunction<any>,
	requestedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumProgramKeySpecifier = ('_id' | 'createdBy' | 'description' | 'isDeleted' | 'title' | NoumProgramKeySpecifier)[];
export type NoumProgramFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	isDeleted?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumProgramListKeySpecifier = ('count' | 'data' | NoumProgramListKeySpecifier)[];
export type NoumProgramListFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumQuestionOutputKeySpecifier = ('_id' | 'answers' | 'body' | 'createdAt' | 'expiryDate' | 'questionImage' | 'spaceId' | 'updatedAt' | 'user' | NoumQuestionOutputKeySpecifier)[];
export type NoumQuestionOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	answers?: FieldPolicy<any> | FieldReadFunction<any>,
	body?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	expiryDate?: FieldPolicy<any> | FieldReadFunction<any>,
	questionImage?: FieldPolicy<any> | FieldReadFunction<any>,
	spaceId?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumReferenceKeySpecifier = ('_id' | 'capacity' | 'experienceId' | 'imageUrl' | 'providerName' | 'referenceText' | 'status' | NoumReferenceKeySpecifier)[];
export type NoumReferenceFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	capacity?: FieldPolicy<any> | FieldReadFunction<any>,
	experienceId?: FieldPolicy<any> | FieldReadFunction<any>,
	imageUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	providerName?: FieldPolicy<any> | FieldReadFunction<any>,
	referenceText?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumReferenceMetadataKeySpecifier = ('_id' | 'capacity' | 'experience' | 'experienceId' | 'providerName' | NoumReferenceMetadataKeySpecifier)[];
export type NoumReferenceMetadataFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	capacity?: FieldPolicy<any> | FieldReadFunction<any>,
	experience?: FieldPolicy<any> | FieldReadFunction<any>,
	experienceId?: FieldPolicy<any> | FieldReadFunction<any>,
	providerName?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumReferenceResponseKeySpecifier = ('count' | 'data' | NoumReferenceResponseKeySpecifier)[];
export type NoumReferenceResponseFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumRoleKeySpecifier = ('_id' | 'archivedAt' | 'createdAt' | 'description' | 'groupedPermissions' | 'hierarchyOrder' | 'isDefault' | 'name' | 'permissionIDs' | 'status' | 'updatedAt' | 'usageCount' | NoumRoleKeySpecifier)[];
export type NoumRoleFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	archivedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	groupedPermissions?: FieldPolicy<any> | FieldReadFunction<any>,
	hierarchyOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	isDefault?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	permissionIDs?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	usageCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumRoleElementHistoryLogKeySpecifier = ('from' | 'id' | 'to' | NoumRoleElementHistoryLogKeySpecifier)[];
export type NoumRoleElementHistoryLogFieldPolicy = {
	from?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	to?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumRoleHistoryLogKeySpecifier = ('field' | 'from' | 'to' | NoumRoleHistoryLogKeySpecifier)[];
export type NoumRoleHistoryLogFieldPolicy = {
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	from?: FieldPolicy<any> | FieldReadFunction<any>,
	to?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumRoleHistoryLogOutputKeySpecifier = ('count' | 'data' | NoumRoleHistoryLogOutputKeySpecifier)[];
export type NoumRoleHistoryLogOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumRoleHistoryLogsKeySpecifier = ('_id' | 'action' | 'changes' | 'createdAt' | 'permissionChanges' | NoumRoleHistoryLogsKeySpecifier)[];
export type NoumRoleHistoryLogsFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	action?: FieldPolicy<any> | FieldReadFunction<any>,
	changes?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	permissionChanges?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumRolePermissionKeySpecifier = ('elementType' | 'id' | 'level' | NoumRolePermissionKeySpecifier)[];
export type NoumRolePermissionFieldPolicy = {
	elementType?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	level?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumRolePermissionGroupKeySpecifier = ('elementType' | 'level' | 'permissionIDs' | 'permissions' | NoumRolePermissionGroupKeySpecifier)[];
export type NoumRolePermissionGroupFieldPolicy = {
	elementType?: FieldPolicy<any> | FieldReadFunction<any>,
	level?: FieldPolicy<any> | FieldReadFunction<any>,
	permissionIDs?: FieldPolicy<any> | FieldReadFunction<any>,
	permissions?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumRolePermissionItemKeySpecifier = ('id' | 'isActive' | 'requirePermissions' | NoumRolePermissionItemKeySpecifier)[];
export type NoumRolePermissionItemFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isActive?: FieldPolicy<any> | FieldReadFunction<any>,
	requirePermissions?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumSingleConnectionKPIKeySpecifier = ('connected' | 'currentConnections' | 'disconnected' | NoumSingleConnectionKPIKeySpecifier)[];
export type NoumSingleConnectionKPIFieldPolicy = {
	connected?: FieldPolicy<any> | FieldReadFunction<any>,
	currentConnections?: FieldPolicy<any> | FieldReadFunction<any>,
	disconnected?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumSingleFollowKPIKeySpecifier = ('currentFollowers' | 'followed' | 'unfollowed' | NoumSingleFollowKPIKeySpecifier)[];
export type NoumSingleFollowKPIFieldPolicy = {
	currentFollowers?: FieldPolicy<any> | FieldReadFunction<any>,
	followed?: FieldPolicy<any> | FieldReadFunction<any>,
	unfollowed?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumTransactionFeeKeySpecifier = ('chamber_id' | 'created_at' | 'history_details' | 'is_publishable' | 'noum_transaction_fee_id' | 'operation_type' | 'status' | 'subscription_id' | 'uid' | 'updated_at' | 'valid_till' | NoumTransactionFeeKeySpecifier)[];
export type NoumTransactionFeeFieldPolicy = {
	chamber_id?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	history_details?: FieldPolicy<any> | FieldReadFunction<any>,
	is_publishable?: FieldPolicy<any> | FieldReadFunction<any>,
	noum_transaction_fee_id?: FieldPolicy<any> | FieldReadFunction<any>,
	operation_type?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	subscription_id?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	valid_till?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumTransactionFeeByChamberIdRefKeySpecifier = ('chamberId' | 'created_at' | 'is_publishable' | 'status' | 'subscription_id' | 'updated_at' | 'valid_till' | NoumTransactionFeeByChamberIdRefKeySpecifier)[];
export type NoumTransactionFeeByChamberIdRefFieldPolicy = {
	chamberId?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	is_publishable?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	subscription_id?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	valid_till?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumTransactionFeeHistoryOutputKeySpecifier = ('chamber_id' | 'created_at' | 'message' | 'noum_transaction_fee_history_id' | 'operation_type' | 'status' | 'subscription_id' | 'uid' | 'updated_at' | NoumTransactionFeeHistoryOutputKeySpecifier)[];
export type NoumTransactionFeeHistoryOutputFieldPolicy = {
	chamber_id?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	noum_transaction_fee_history_id?: FieldPolicy<any> | FieldReadFunction<any>,
	operation_type?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	subscription_id?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumTypeKeySpecifier = ('name' | 'profileImage' | NoumTypeKeySpecifier)[];
export type NoumTypeFieldPolicy = {
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	profileImage?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumenaScoreOutputKeySpecifier = ('blessing' | 'capitalQuotient' | 'createdAt' | 'noumId' | 'reviewDate' | 'scoreId' | 'status' | 'uid' | 'updatedAt' | 'visibility' | NoumenaScoreOutputKeySpecifier)[];
export type NoumenaScoreOutputFieldPolicy = {
	blessing?: FieldPolicy<any> | FieldReadFunction<any>,
	capitalQuotient?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	noumId?: FieldPolicy<any> | FieldReadFunction<any>,
	reviewDate?: FieldPolicy<any> | FieldReadFunction<any>,
	scoreId?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	visibility?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NoumenaScoreOutputByNoumIdKeySpecifier = ('capitalQuotient' | 'noumId' | NoumenaScoreOutputByNoumIdKeySpecifier)[];
export type NoumenaScoreOutputByNoumIdFieldPolicy = {
	capitalQuotient?: FieldPolicy<any> | FieldReadFunction<any>,
	noumId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OTPForPasswordOutputKeySpecifier = ('message' | 'nextRequestAfter' | 'nextRequestAfterInSecond' | 'remainingRequest' | 'success' | OTPForPasswordOutputKeySpecifier)[];
export type OTPForPasswordOutputFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	nextRequestAfter?: FieldPolicy<any> | FieldReadFunction<any>,
	nextRequestAfterInSecond?: FieldPolicy<any> | FieldReadFunction<any>,
	remainingRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OTPOutputKeySpecifier = ('error' | 'success' | OTPOutputKeySpecifier)[];
export type OTPOutputFieldPolicy = {
	error?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OTPResponseOutputKeySpecifier = ('Status' | 'error' | 'message' | 'success' | OTPResponseOutputKeySpecifier)[];
export type OTPResponseOutputFieldPolicy = {
	Status?: FieldPolicy<any> | FieldReadFunction<any>,
	error?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OneTimeTokenOutputKeySpecifier = ('accessToken' | 'email' | 'refreshToken' | OneTimeTokenOutputKeySpecifier)[];
export type OneTimeTokenOutputFieldPolicy = {
	accessToken?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	refreshToken?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OpsPermissionOutputKeySpecifier = ('_id' | 'createdAt' | 'permissions' | 'roles' | 'uid' | 'updatedAt' | OpsPermissionOutputKeySpecifier)[];
export type OpsPermissionOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	permissions?: FieldPolicy<any> | FieldReadFunction<any>,
	roles?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OpsPermissionOutputAdminDataKeySpecifier = ('opsPermission' | 'user' | OpsPermissionOutputAdminDataKeySpecifier)[];
export type OpsPermissionOutputAdminDataFieldPolicy = {
	opsPermission?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OpsPermissionOutputAdminPaginateKeySpecifier = ('count' | 'data' | OpsPermissionOutputAdminPaginateKeySpecifier)[];
export type OpsPermissionOutputAdminPaginateFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OpsRoleOutputKeySpecifier = ('_id' | 'createdAt' | 'description' | 'name' | 'permissions' | 'updatedAt' | OpsRoleOutputKeySpecifier)[];
export type OpsRoleOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	permissions?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OutputListUserInvitesForAdminKeySpecifier = ('data' | 'filter' | 'hasNextPage' | 'hasPreviousPage' | 'orderBy' | 'page' | 'perPage' | 'totalItemsCount' | 'totalPagesCount' | OutputListUserInvitesForAdminKeySpecifier)[];
export type OutputListUserInvitesForAdminFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	filter?: FieldPolicy<any> | FieldReadFunction<any>,
	hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>,
	hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>,
	orderBy?: FieldPolicy<any> | FieldReadFunction<any>,
	page?: FieldPolicy<any> | FieldReadFunction<any>,
	perPage?: FieldPolicy<any> | FieldReadFunction<any>,
	totalItemsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	totalPagesCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedAttendeesDataKeySpecifier = ('count' | 'data' | 'meta' | PaginatedAttendeesDataKeySpecifier)[];
export type PaginatedAttendeesDataFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	meta?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedEventsDataKeySpecifier = ('count' | 'data' | 'meta' | PaginatedEventsDataKeySpecifier)[];
export type PaginatedEventsDataFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	meta?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedLogsOutputKeySpecifier = ('count' | 'data' | 'hasNextPage' | 'hasPreviousPage' | 'page' | 'perPage' | 'totalPagesCount' | PaginatedLogsOutputKeySpecifier)[];
export type PaginatedLogsOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>,
	hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>,
	page?: FieldPolicy<any> | FieldReadFunction<any>,
	perPage?: FieldPolicy<any> | FieldReadFunction<any>,
	totalPagesCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedNoumConnectionRequestsKeySpecifier = ('count' | 'data' | PaginatedNoumConnectionRequestsKeySpecifier)[];
export type PaginatedNoumConnectionRequestsFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedNoumFilesKeySpecifier = ('count' | 'data' | PaginatedNoumFilesKeySpecifier)[];
export type PaginatedNoumFilesFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedNoumMembersKeySpecifier = ('count' | 'data' | PaginatedNoumMembersKeySpecifier)[];
export type PaginatedNoumMembersFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedNoumPendingConnectionsKeySpecifier = ('count' | 'data' | PaginatedNoumPendingConnectionsKeySpecifier)[];
export type PaginatedNoumPendingConnectionsFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedNoumRolesKeySpecifier = ('count' | 'data' | PaginatedNoumRolesKeySpecifier)[];
export type PaginatedNoumRolesFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedSearchableNoumContactKeySpecifier = ('count' | 'data' | PaginatedSearchableNoumContactKeySpecifier)[];
export type PaginatedSearchableNoumContactFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedSearchableNoumMemberKeySpecifier = ('count' | 'data' | PaginatedSearchableNoumMemberKeySpecifier)[];
export type PaginatedSearchableNoumMemberFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedThreadsKeySpecifier = ('count' | 'data' | PaginatedThreadsKeySpecifier)[];
export type PaginatedThreadsFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedTimezoneDataKeySpecifier = ('count' | 'data' | PaginatedTimezoneDataKeySpecifier)[];
export type PaginatedTimezoneDataFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginationNotificationOpKeySpecifier = ('count' | 'data' | PaginationNotificationOpKeySpecifier)[];
export type PaginationNotificationOpFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PassCodeResetOutputKeySpecifier = ('allowReset' | PassCodeResetOutputKeySpecifier)[];
export type PassCodeResetOutputFieldPolicy = {
	allowReset?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentAccountDetailsKeySpecifier = ('data' | 'userId' | PaymentAccountDetailsKeySpecifier)[];
export type PaymentAccountDetailsFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentActivityKeySpecifier = ('amount' | 'currency' | 'destination' | 'invoice' | 'invoiceId' | 'netAmount' | 'paymentDate' | 'paymentId' | 'source' | 'transactionType' | PaymentActivityKeySpecifier)[];
export type PaymentActivityFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	destination?: FieldPolicy<any> | FieldReadFunction<any>,
	invoice?: FieldPolicy<any> | FieldReadFunction<any>,
	invoiceId?: FieldPolicy<any> | FieldReadFunction<any>,
	netAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentDate?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentId?: FieldPolicy<any> | FieldReadFunction<any>,
	source?: FieldPolicy<any> | FieldReadFunction<any>,
	transactionType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentConfigurationKeySpecifier = ('createdAt' | 'displayName' | 'name' | 'updatedAt' | 'value' | PaymentConfigurationKeySpecifier)[];
export type PaymentConfigurationFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	displayName?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentCountOutputKeySpecifier = ('count' | 'data' | PaymentCountOutputKeySpecifier)[];
export type PaymentCountOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentCustomerDetailOutputKeySpecifier = ('createdAt' | 'customerType' | 'docStatus' | 'enableTransactionLimit' | 'id' | 'msg' | 'name' | 'noumenaStatus' | 'providerStatus' | 'status' | 'transactionFlagHistory' | 'updateStatus' | 'userId' | PaymentCustomerDetailOutputKeySpecifier)[];
export type PaymentCustomerDetailOutputFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	customerType?: FieldPolicy<any> | FieldReadFunction<any>,
	docStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	enableTransactionLimit?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	msg?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	noumenaStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	providerStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	transactionFlagHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	updateStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentCustomerOutputKeySpecifier = ('customerName' | 'id' | 'paymentChannel' | 'userId' | PaymentCustomerOutputKeySpecifier)[];
export type PaymentCustomerOutputFieldPolicy = {
	customerName?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentChannel?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentDetailsOutputKeySpecifier = ('accountNumber' | 'actualPaymentDate' | 'amount' | 'createdAt' | 'createdBy' | 'currency' | 'isManual' | 'isPublished' | 'paymentChannel' | 'paymentDueDate' | 'paymentId' | 'paymentNotes' | 'paymentReason' | 'paymentStatus' | 'paymentType' | 'statementId' | 'updatedAt' | 'updatedBy' | PaymentDetailsOutputKeySpecifier)[];
export type PaymentDetailsOutputFieldPolicy = {
	accountNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	actualPaymentDate?: FieldPolicy<any> | FieldReadFunction<any>,
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	isManual?: FieldPolicy<any> | FieldReadFunction<any>,
	isPublished?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentChannel?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentDueDate?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentId?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentNotes?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentReason?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentType?: FieldPolicy<any> | FieldReadFunction<any>,
	statementId?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedBy?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentMethodOutputKeySpecifier = ('brand' | 'country' | 'exp_month' | 'exp_year' | 'funding' | 'id' | 'last4' | PaymentMethodOutputKeySpecifier)[];
export type PaymentMethodOutputFieldPolicy = {
	brand?: FieldPolicy<any> | FieldReadFunction<any>,
	country?: FieldPolicy<any> | FieldReadFunction<any>,
	exp_month?: FieldPolicy<any> | FieldReadFunction<any>,
	exp_year?: FieldPolicy<any> | FieldReadFunction<any>,
	funding?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	last4?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentOutputKeySpecifier = ('amount' | 'charges' | 'clientSecret' | 'createUserId' | 'createdAt' | 'currency' | 'customerName' | 'destination' | 'destinationAccountId' | 'destinationDetail' | 'destinationSubLedgerAccountId' | 'destinationUser' | 'dueDate' | 'errorObj' | 'history' | 'id' | 'idempotencyKey' | 'invoiceId' | 'isPublished' | 'netAmount' | 'notes' | 'paymentDate' | 'paymentId' | 'paymentStatus' | 'requestOriginator' | 'settlementPeriod' | 'source' | 'sourceAccountId' | 'sourceDetail' | 'sourceSubLedgerAccountId' | 'sourceUser' | 'tenantId' | 'transactionReason' | 'transactionType' | 'updatedAt' | 'updatedUserId' | PaymentOutputKeySpecifier)[];
export type PaymentOutputFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	charges?: FieldPolicy<any> | FieldReadFunction<any>,
	clientSecret?: FieldPolicy<any> | FieldReadFunction<any>,
	createUserId?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	customerName?: FieldPolicy<any> | FieldReadFunction<any>,
	destination?: FieldPolicy<any> | FieldReadFunction<any>,
	destinationAccountId?: FieldPolicy<any> | FieldReadFunction<any>,
	destinationDetail?: FieldPolicy<any> | FieldReadFunction<any>,
	destinationSubLedgerAccountId?: FieldPolicy<any> | FieldReadFunction<any>,
	destinationUser?: FieldPolicy<any> | FieldReadFunction<any>,
	dueDate?: FieldPolicy<any> | FieldReadFunction<any>,
	errorObj?: FieldPolicy<any> | FieldReadFunction<any>,
	history?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	idempotencyKey?: FieldPolicy<any> | FieldReadFunction<any>,
	invoiceId?: FieldPolicy<any> | FieldReadFunction<any>,
	isPublished?: FieldPolicy<any> | FieldReadFunction<any>,
	netAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	notes?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentDate?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentId?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	requestOriginator?: FieldPolicy<any> | FieldReadFunction<any>,
	settlementPeriod?: FieldPolicy<any> | FieldReadFunction<any>,
	source?: FieldPolicy<any> | FieldReadFunction<any>,
	sourceAccountId?: FieldPolicy<any> | FieldReadFunction<any>,
	sourceDetail?: FieldPolicy<any> | FieldReadFunction<any>,
	sourceSubLedgerAccountId?: FieldPolicy<any> | FieldReadFunction<any>,
	sourceUser?: FieldPolicy<any> | FieldReadFunction<any>,
	tenantId?: FieldPolicy<any> | FieldReadFunction<any>,
	transactionReason?: FieldPolicy<any> | FieldReadFunction<any>,
	transactionType?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedUserId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentProviderChargesOutputKeySpecifier = ('amount' | 'charges' | 'netAmount' | PaymentProviderChargesOutputKeySpecifier)[];
export type PaymentProviderChargesOutputFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	charges?: FieldPolicy<any> | FieldReadFunction<any>,
	netAmount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentProviderOutputKeySpecifier = ('available' | 'chargePercentage' | 'chargeValue' | 'feeAppliedTo' | 'flowOfFunds' | 'id' | 'invoiceFeeAppliedTo' | 'invoicePayment' | 'payeeCurrency' | 'payerCurrency' | 'paymentMethod' | 'preference' | 'provider' | 'settlementPeriod' | 'source' | 'target' | PaymentProviderOutputKeySpecifier)[];
export type PaymentProviderOutputFieldPolicy = {
	available?: FieldPolicy<any> | FieldReadFunction<any>,
	chargePercentage?: FieldPolicy<any> | FieldReadFunction<any>,
	chargeValue?: FieldPolicy<any> | FieldReadFunction<any>,
	feeAppliedTo?: FieldPolicy<any> | FieldReadFunction<any>,
	flowOfFunds?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	invoiceFeeAppliedTo?: FieldPolicy<any> | FieldReadFunction<any>,
	invoicePayment?: FieldPolicy<any> | FieldReadFunction<any>,
	payeeCurrency?: FieldPolicy<any> | FieldReadFunction<any>,
	payerCurrency?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentMethod?: FieldPolicy<any> | FieldReadFunction<any>,
	preference?: FieldPolicy<any> | FieldReadFunction<any>,
	provider?: FieldPolicy<any> | FieldReadFunction<any>,
	settlementPeriod?: FieldPolicy<any> | FieldReadFunction<any>,
	source?: FieldPolicy<any> | FieldReadFunction<any>,
	target?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentReportDataOutputKeySpecifier = ('bulkReportId' | 'createdAt' | 'fileData' | 'id' | 'note' | 'paymentId' | 'status' | 'transactionId' | 'updatedAt' | PaymentReportDataOutputKeySpecifier)[];
export type PaymentReportDataOutputFieldPolicy = {
	bulkReportId?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	fileData?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	note?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentId?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	transactionId?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentReportOutputKeySpecifier = ('BulkReportLogData' | 'createdAt' | 'createdBy' | 'failed' | 'id' | 'notes' | 'processed' | 'progress' | 'reqFile' | 'respFile' | 'retryDate' | 'status' | 'title' | 'total' | 'type' | 'updatedAt' | PaymentReportOutputKeySpecifier)[];
export type PaymentReportOutputFieldPolicy = {
	BulkReportLogData?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>,
	failed?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	notes?: FieldPolicy<any> | FieldReadFunction<any>,
	processed?: FieldPolicy<any> | FieldReadFunction<any>,
	progress?: FieldPolicy<any> | FieldReadFunction<any>,
	reqFile?: FieldPolicy<any> | FieldReadFunction<any>,
	respFile?: FieldPolicy<any> | FieldReadFunction<any>,
	retryDate?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentReportWithCountOutputKeySpecifier = ('count' | 'data' | PaymentReportWithCountOutputKeySpecifier)[];
export type PaymentReportWithCountOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentSubReportKeySpecifier = ('created_at' | 'filters' | 'logs' | 'message' | 'report_id' | 'report_type' | 'status' | 'url' | PaymentSubReportKeySpecifier)[];
export type PaymentSubReportFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	filters?: FieldPolicy<any> | FieldReadFunction<any>,
	logs?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	report_id?: FieldPolicy<any> | FieldReadFunction<any>,
	report_type?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentSubReportLogKeySpecifier = ('created_at' | 'report_log_id' | 'status' | PaymentSubReportLogKeySpecifier)[];
export type PaymentSubReportLogFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	report_log_id?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentSubReportPaginatedKeySpecifier = ('count' | 'data' | PaymentSubReportPaginatedKeySpecifier)[];
export type PaymentSubReportPaginatedFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentTransactionOutputKeySpecifier = ('amount' | 'charges' | 'createUserId' | 'createdAt' | 'currency' | 'customerName' | 'destination' | 'destinationAccountId' | 'destinationDetail' | 'destinationSubLedgerAccountId' | 'dueDate' | 'history' | 'id' | 'idempotencyKey' | 'isPublished' | 'netAmount' | 'notes' | 'paymentChannel' | 'paymentDate' | 'paymentId' | 'paymentStatus' | 'providerId' | 'requestOriginator' | 'sequence' | 'settlementPeriod' | 'source' | 'sourceAccountId' | 'sourceDetail' | 'sourceSubLedgerAccountId' | 'sourceUser' | 'tenantId' | 'transactionId' | 'transactionReason' | 'transactionType' | 'updatedAt' | 'updatedUserId' | PaymentTransactionOutputKeySpecifier)[];
export type PaymentTransactionOutputFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	charges?: FieldPolicy<any> | FieldReadFunction<any>,
	createUserId?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	customerName?: FieldPolicy<any> | FieldReadFunction<any>,
	destination?: FieldPolicy<any> | FieldReadFunction<any>,
	destinationAccountId?: FieldPolicy<any> | FieldReadFunction<any>,
	destinationDetail?: FieldPolicy<any> | FieldReadFunction<any>,
	destinationSubLedgerAccountId?: FieldPolicy<any> | FieldReadFunction<any>,
	dueDate?: FieldPolicy<any> | FieldReadFunction<any>,
	history?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	idempotencyKey?: FieldPolicy<any> | FieldReadFunction<any>,
	isPublished?: FieldPolicy<any> | FieldReadFunction<any>,
	netAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	notes?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentChannel?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentDate?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentId?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	providerId?: FieldPolicy<any> | FieldReadFunction<any>,
	requestOriginator?: FieldPolicy<any> | FieldReadFunction<any>,
	sequence?: FieldPolicy<any> | FieldReadFunction<any>,
	settlementPeriod?: FieldPolicy<any> | FieldReadFunction<any>,
	source?: FieldPolicy<any> | FieldReadFunction<any>,
	sourceAccountId?: FieldPolicy<any> | FieldReadFunction<any>,
	sourceDetail?: FieldPolicy<any> | FieldReadFunction<any>,
	sourceSubLedgerAccountId?: FieldPolicy<any> | FieldReadFunction<any>,
	sourceUser?: FieldPolicy<any> | FieldReadFunction<any>,
	tenantId?: FieldPolicy<any> | FieldReadFunction<any>,
	transactionId?: FieldPolicy<any> | FieldReadFunction<any>,
	transactionReason?: FieldPolicy<any> | FieldReadFunction<any>,
	transactionType?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedUserId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PdfPreviewKeySpecifier = ('base64' | PdfPreviewKeySpecifier)[];
export type PdfPreviewFieldPolicy = {
	base64?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PermissionsCountersSubOutputKeySpecifier = ('homeNoumCounters' | 'permissions' | PermissionsCountersSubOutputKeySpecifier)[];
export type PermissionsCountersSubOutputFieldPolicy = {
	homeNoumCounters?: FieldPolicy<any> | FieldReadFunction<any>,
	permissions?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PermissionsHomeCountersOutputKeySpecifier = ('data' | 'success' | PermissionsHomeCountersOutputKeySpecifier)[];
export type PermissionsHomeCountersOutputFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PersonalOutputKeySpecifier = ('accountNumber' | 'contracts' | 'customerId' | 'dob' | 'firstName' | 'industry' | 'lastName' | 'middleName' | PersonalOutputKeySpecifier)[];
export type PersonalOutputFieldPolicy = {
	accountNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	contracts?: FieldPolicy<any> | FieldReadFunction<any>,
	customerId?: FieldPolicy<any> | FieldReadFunction<any>,
	dob?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	industry?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	middleName?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PersonalOutputUserKeySpecifier = ('address' | 'averageMonthlyExpense' | 'averageMonthlyIncome' | 'bestMonthlyIncome' | 'dob' | 'email' | 'firstName' | 'incomeFromTaxReturn' | 'industry' | 'isUSResident' | 'lastName' | 'middleName' | 'phone' | 'questionAnswers' | 'ssn' | 'taxEndPeriod' | 'worstMonthlyIncome' | PersonalOutputUserKeySpecifier)[];
export type PersonalOutputUserFieldPolicy = {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	averageMonthlyExpense?: FieldPolicy<any> | FieldReadFunction<any>,
	averageMonthlyIncome?: FieldPolicy<any> | FieldReadFunction<any>,
	bestMonthlyIncome?: FieldPolicy<any> | FieldReadFunction<any>,
	dob?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	incomeFromTaxReturn?: FieldPolicy<any> | FieldReadFunction<any>,
	industry?: FieldPolicy<any> | FieldReadFunction<any>,
	isUSResident?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	middleName?: FieldPolicy<any> | FieldReadFunction<any>,
	phone?: FieldPolicy<any> | FieldReadFunction<any>,
	questionAnswers?: FieldPolicy<any> | FieldReadFunction<any>,
	ssn?: FieldPolicy<any> | FieldReadFunction<any>,
	taxEndPeriod?: FieldPolicy<any> | FieldReadFunction<any>,
	worstMonthlyIncome?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PersonalProfileOutputKeySpecifier = ('error' | 'message' | 'status' | 'success' | PersonalProfileOutputKeySpecifier)[];
export type PersonalProfileOutputFieldPolicy = {
	error?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlaidInputSchemaKeySpecifier = ('customerId' | 'days' | 'reportOrigin' | 'uid' | PlaidInputSchemaKeySpecifier)[];
export type PlaidInputSchemaFieldPolicy = {
	customerId?: FieldPolicy<any> | FieldReadFunction<any>,
	days?: FieldPolicy<any> | FieldReadFunction<any>,
	reportOrigin?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlaidOutputKeySpecifier = ('assets' | 'createdAt' | 'datasources' | 'errors' | 'id' | 'input' | 'modules' | 'transaction' | PlaidOutputKeySpecifier)[];
export type PlaidOutputFieldPolicy = {
	assets?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	datasources?: FieldPolicy<any> | FieldReadFunction<any>,
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	input?: FieldPolicy<any> | FieldReadFunction<any>,
	modules?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlaidReportListKeySpecifier = ('count' | 'data' | PlaidReportListKeySpecifier)[];
export type PlaidReportListFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlaidReportOutputKeySpecifier = ('activeBanks' | 'assets' | 'createdAt' | 'datasources' | 'errorsArr' | 'expiredBanks' | 'id' | 'input' | 'modules' | PlaidReportOutputKeySpecifier)[];
export type PlaidReportOutputFieldPolicy = {
	activeBanks?: FieldPolicy<any> | FieldReadFunction<any>,
	assets?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	datasources?: FieldPolicy<any> | FieldReadFunction<any>,
	errorsArr?: FieldPolicy<any> | FieldReadFunction<any>,
	expiredBanks?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	input?: FieldPolicy<any> | FieldReadFunction<any>,
	modules?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlanDetailKeySpecifier = ('created_at' | 'discount_percent' | 'noum_renewal' | 'noum_setup' | 'noum_validity_months' | 'per_item_fee' | 'percent_fee' | 'plan_detail_id' | 'plan_validity_months' | 'price' | 'status' | 'updated_at' | PlanDetailKeySpecifier)[];
export type PlanDetailFieldPolicy = {
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	discount_percent?: FieldPolicy<any> | FieldReadFunction<any>,
	noum_renewal?: FieldPolicy<any> | FieldReadFunction<any>,
	noum_setup?: FieldPolicy<any> | FieldReadFunction<any>,
	noum_validity_months?: FieldPolicy<any> | FieldReadFunction<any>,
	per_item_fee?: FieldPolicy<any> | FieldReadFunction<any>,
	percent_fee?: FieldPolicy<any> | FieldReadFunction<any>,
	plan_detail_id?: FieldPolicy<any> | FieldReadFunction<any>,
	plan_validity_months?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlanItemKeySpecifier = ('billing_cycles' | 'channel' | 'created_at' | 'currency_code' | 'description' | 'external_name' | 'free_quantity' | 'is_taxable' | 'item_family_id' | 'item_id' | 'item_type' | 'name' | 'object' | 'period' | 'period_unit' | 'plan_details' | 'plan_id' | 'plan_name_id' | 'plan_visibility' | 'price' | 'pricing_model' | 'spotlight' | 'status' | 'trial_period' | 'trial_period_unit' | 'updated_at' | PlanItemKeySpecifier)[];
export type PlanItemFieldPolicy = {
	billing_cycles?: FieldPolicy<any> | FieldReadFunction<any>,
	channel?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	currency_code?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	external_name?: FieldPolicy<any> | FieldReadFunction<any>,
	free_quantity?: FieldPolicy<any> | FieldReadFunction<any>,
	is_taxable?: FieldPolicy<any> | FieldReadFunction<any>,
	item_family_id?: FieldPolicy<any> | FieldReadFunction<any>,
	item_id?: FieldPolicy<any> | FieldReadFunction<any>,
	item_type?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	object?: FieldPolicy<any> | FieldReadFunction<any>,
	period?: FieldPolicy<any> | FieldReadFunction<any>,
	period_unit?: FieldPolicy<any> | FieldReadFunction<any>,
	plan_details?: FieldPolicy<any> | FieldReadFunction<any>,
	plan_id?: FieldPolicy<any> | FieldReadFunction<any>,
	plan_name_id?: FieldPolicy<any> | FieldReadFunction<any>,
	plan_visibility?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	pricing_model?: FieldPolicy<any> | FieldReadFunction<any>,
	spotlight?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	trial_period?: FieldPolicy<any> | FieldReadFunction<any>,
	trial_period_unit?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlanOutputKeySpecifier = ('plan_label' | 'plan_name' | 'plan_value' | PlanOutputKeySpecifier)[];
export type PlanOutputFieldPolicy = {
	plan_label?: FieldPolicy<any> | FieldReadFunction<any>,
	plan_name?: FieldPolicy<any> | FieldReadFunction<any>,
	plan_value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlanOutputTypeKeySpecifier = ('month' | 'once' | 'year' | PlanOutputTypeKeySpecifier)[];
export type PlanOutputTypeFieldPolicy = {
	month?: FieldPolicy<any> | FieldReadFunction<any>,
	once?: FieldPolicy<any> | FieldReadFunction<any>,
	year?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlanSettingActionItemOutputKeySpecifier = ('actionType' | 'label' | PlanSettingActionItemOutputKeySpecifier)[];
export type PlanSettingActionItemOutputFieldPolicy = {
	actionType?: FieldPolicy<any> | FieldReadFunction<any>,
	label?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlanSettingItemOutputKeySpecifier = ('action' | 'control' | 'description' | 'id' | 'label' | 'resource' | 'resourceType' | PlanSettingItemOutputKeySpecifier)[];
export type PlanSettingItemOutputFieldPolicy = {
	action?: FieldPolicy<any> | FieldReadFunction<any>,
	control?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	label?: FieldPolicy<any> | FieldReadFunction<any>,
	resource?: FieldPolicy<any> | FieldReadFunction<any>,
	resourceType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlanSettingNoumOptionsConfigureOutputKeySpecifier = ('description' | 'info' | 'type' | 'value' | PlanSettingNoumOptionsConfigureOutputKeySpecifier)[];
export type PlanSettingNoumOptionsConfigureOutputFieldPolicy = {
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	info?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlanSettingNoumOptionsOutputKeySpecifier = ('action' | 'control' | 'description' | 'id' | 'label' | 'possibleActions' | 'resource' | 'resourceType' | 'settings' | PlanSettingNoumOptionsOutputKeySpecifier)[];
export type PlanSettingNoumOptionsOutputFieldPolicy = {
	action?: FieldPolicy<any> | FieldReadFunction<any>,
	control?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	label?: FieldPolicy<any> | FieldReadFunction<any>,
	possibleActions?: FieldPolicy<any> | FieldReadFunction<any>,
	resource?: FieldPolicy<any> | FieldReadFunction<any>,
	resourceType?: FieldPolicy<any> | FieldReadFunction<any>,
	settings?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlanSettingNoumOutputKeySpecifier = ('limits' | 'tools' | PlanSettingNoumOutputKeySpecifier)[];
export type PlanSettingNoumOutputFieldPolicy = {
	limits?: FieldPolicy<any> | FieldReadFunction<any>,
	tools?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlanSettingOutputKeySpecifier = ('category' | 'created_at' | 'description' | 'enabled' | 'financialProducts' | 'homeNoumSetting' | 'item_id' | 'learningProducts' | 'menuItems' | 'metadata' | 'noumSetting' | 'noum_setup_count' | 'plan_family' | 'plan_name' | 'plan_setting_id' | 'plans' | 'sort_index' | 'spotlight' | 'transactionInfo' | 'updated_at' | 'user_count' | PlanSettingOutputKeySpecifier)[];
export type PlanSettingOutputFieldPolicy = {
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	enabled?: FieldPolicy<any> | FieldReadFunction<any>,
	financialProducts?: FieldPolicy<any> | FieldReadFunction<any>,
	homeNoumSetting?: FieldPolicy<any> | FieldReadFunction<any>,
	item_id?: FieldPolicy<any> | FieldReadFunction<any>,
	learningProducts?: FieldPolicy<any> | FieldReadFunction<any>,
	menuItems?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	noumSetting?: FieldPolicy<any> | FieldReadFunction<any>,
	noum_setup_count?: FieldPolicy<any> | FieldReadFunction<any>,
	plan_family?: FieldPolicy<any> | FieldReadFunction<any>,
	plan_name?: FieldPolicy<any> | FieldReadFunction<any>,
	plan_setting_id?: FieldPolicy<any> | FieldReadFunction<any>,
	plans?: FieldPolicy<any> | FieldReadFunction<any>,
	sort_index?: FieldPolicy<any> | FieldReadFunction<any>,
	spotlight?: FieldPolicy<any> | FieldReadFunction<any>,
	transactionInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	user_count?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlanSettingTransactionInfoDetailKeySpecifier = ('category' | 'label' | 'options' | PlanSettingTransactionInfoDetailKeySpecifier)[];
export type PlanSettingTransactionInfoDetailFieldPolicy = {
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	label?: FieldPolicy<any> | FieldReadFunction<any>,
	options?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlanSettingTransactionInfoFeeDetailsOutputKeySpecifier = ('fixed' | 'maxFee' | 'minFee' | 'percentage' | PlanSettingTransactionInfoFeeDetailsOutputKeySpecifier)[];
export type PlanSettingTransactionInfoFeeDetailsOutputFieldPolicy = {
	fixed?: FieldPolicy<any> | FieldReadFunction<any>,
	maxFee?: FieldPolicy<any> | FieldReadFunction<any>,
	minFee?: FieldPolicy<any> | FieldReadFunction<any>,
	percentage?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlanSettingTransactionInfoFeeOutputKeySpecifier = ('noumenaFee' | PlanSettingTransactionInfoFeeOutputKeySpecifier)[];
export type PlanSettingTransactionInfoFeeOutputFieldPolicy = {
	noumenaFee?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlanSettingTransactionInfoMetadataOutputKeySpecifier = ('fee' | 'provider' | 'settlementValue' | PlanSettingTransactionInfoMetadataOutputKeySpecifier)[];
export type PlanSettingTransactionInfoMetadataOutputFieldPolicy = {
	fee?: FieldPolicy<any> | FieldReadFunction<any>,
	provider?: FieldPolicy<any> | FieldReadFunction<any>,
	settlementValue?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlanSettingTransactionInfoOptionsKeySpecifier = ('destination' | 'metadata' | 'source' | PlanSettingTransactionInfoOptionsKeySpecifier)[];
export type PlanSettingTransactionInfoOptionsFieldPolicy = {
	destination?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	source?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlanSettingTransactionInfoOutputKeySpecifier = ('details' | 'isEnabled' | PlanSettingTransactionInfoOutputKeySpecifier)[];
export type PlanSettingTransactionInfoOutputFieldPolicy = {
	details?: FieldPolicy<any> | FieldReadFunction<any>,
	isEnabled?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PostKeySpecifier = ('category' | 'content' | 'resolutions' | 'thumbnail' | PostKeySpecifier)[];
export type PostFieldPolicy = {
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	content?: FieldPolicy<any> | FieldReadFunction<any>,
	resolutions?: FieldPolicy<any> | FieldReadFunction<any>,
	thumbnail?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PostActivityKeySpecifier = ('_id' | PostActivityKeySpecifier)[];
export type PostActivityFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PostOutputKeySpecifier = ('_id' | 'chamber' | 'chamberId' | 'comments' | 'commentsCount' | 'createdAt' | 'groupId' | 'isPinned' | 'pinnedTimestamp' | 'post' | 'postStatus' | 'rawJSON' | 'reactions' | 'reactionsCount' | 'reports' | 'tags' | 'text' | 'uid' | 'updatedAt' | 'userReaction' | 'visibility' | PostOutputKeySpecifier)[];
export type PostOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	chamber?: FieldPolicy<any> | FieldReadFunction<any>,
	chamberId?: FieldPolicy<any> | FieldReadFunction<any>,
	comments?: FieldPolicy<any> | FieldReadFunction<any>,
	commentsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	groupId?: FieldPolicy<any> | FieldReadFunction<any>,
	isPinned?: FieldPolicy<any> | FieldReadFunction<any>,
	pinnedTimestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	post?: FieldPolicy<any> | FieldReadFunction<any>,
	postStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	rawJSON?: FieldPolicy<any> | FieldReadFunction<any>,
	reactions?: FieldPolicy<any> | FieldReadFunction<any>,
	reactionsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	reports?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	text?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userReaction?: FieldPolicy<any> | FieldReadFunction<any>,
	visibility?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PostOutputDataKeySpecifier = ('count' | 'data' | PostOutputDataKeySpecifier)[];
export type PostOutputDataFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PreCalculateNoumLinkDataKeySpecifier = ('connectionsCount' | 'followersCount' | 'membersCount' | PreCalculateNoumLinkDataKeySpecifier)[];
export type PreCalculateNoumLinkDataFieldPolicy = {
	connectionsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	followersCount?: FieldPolicy<any> | FieldReadFunction<any>,
	membersCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PrinciplesAssessmentResultKeySpecifier = ('fullAssessmetResult' | 'shortScaleAssessmetResult' | PrinciplesAssessmentResultKeySpecifier)[];
export type PrinciplesAssessmentResultFieldPolicy = {
	fullAssessmetResult?: FieldPolicy<any> | FieldReadFunction<any>,
	shortScaleAssessmetResult?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PrinciplesMutationsKeySpecifier = ('submitPrinciplesAnswers' | PrinciplesMutationsKeySpecifier)[];
export type PrinciplesMutationsFieldPolicy = {
	submitPrinciplesAnswers?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PrinciplesQueriesKeySpecifier = ('getPrinciplesAssessmentPDF' | 'getPrinciplesAssessmentResults' | 'getPrinciplesQuestion' | 'getPrinciplesUser' | PrinciplesQueriesKeySpecifier)[];
export type PrinciplesQueriesFieldPolicy = {
	getPrinciplesAssessmentPDF?: FieldPolicy<any> | FieldReadFunction<any>,
	getPrinciplesAssessmentResults?: FieldPolicy<any> | FieldReadFunction<any>,
	getPrinciplesQuestion?: FieldPolicy<any> | FieldReadFunction<any>,
	getPrinciplesUser?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductCategoryOutputKeySpecifier = ('_id' | 'code' | 'description' | 'name' | ProductCategoryOutputKeySpecifier)[];
export type ProductCategoryOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductOutputKeySpecifier = ('_id' | 'code' | 'countryCode' | 'currencyCode' | 'description' | 'effectiveDateFrom' | 'effectiveDateTo' | 'name' | 'productOwner' | 'terms' | 'type' | ProductOutputKeySpecifier)[];
export type ProductOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	countryCode?: FieldPolicy<any> | FieldReadFunction<any>,
	currencyCode?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	effectiveDateFrom?: FieldPolicy<any> | FieldReadFunction<any>,
	effectiveDateTo?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	productOwner?: FieldPolicy<any> | FieldReadFunction<any>,
	terms?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductProfileKeySpecifier = ('_id' | 'code' | 'description' | 'name' | 'productCode' | 'productType' | ProductProfileKeySpecifier)[];
export type ProductProfileFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	productCode?: FieldPolicy<any> | FieldReadFunction<any>,
	productType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductTermOutputKeySpecifier = ('_id' | 'code' | 'description' | 'effectiveDateFrom' | 'effectiveDateTo' | 'isCustomerSpecific' | 'isMandatory' | 'name' | 'type' | ProductTermOutputKeySpecifier)[];
export type ProductTermOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	effectiveDateFrom?: FieldPolicy<any> | FieldReadFunction<any>,
	effectiveDateTo?: FieldPolicy<any> | FieldReadFunction<any>,
	isCustomerSpecific?: FieldPolicy<any> | FieldReadFunction<any>,
	isMandatory?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductTypeOutputKeySpecifier = ('_id' | 'category' | 'code' | 'description' | 'name' | ProductTypeOutputKeySpecifier)[];
export type ProductTypeOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProfileKeySpecifier = ('_id' | 'profilePicture' | 'profilePictureThumbnail' | 'secondaryEmail' | 'socialLinks' | ProfileKeySpecifier)[];
export type ProfileFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	profilePicture?: FieldPolicy<any> | FieldReadFunction<any>,
	profilePictureThumbnail?: FieldPolicy<any> | FieldReadFunction<any>,
	secondaryEmail?: FieldPolicy<any> | FieldReadFunction<any>,
	socialLinks?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProfileCheckResultKeySpecifier = ('ILILimit' | 'ISR' | 'reasons' | 'recap' | 'result' | ProfileCheckResultKeySpecifier)[];
export type ProfileCheckResultFieldPolicy = {
	ILILimit?: FieldPolicy<any> | FieldReadFunction<any>,
	ISR?: FieldPolicy<any> | FieldReadFunction<any>,
	reasons?: FieldPolicy<any> | FieldReadFunction<any>,
	recap?: FieldPolicy<any> | FieldReadFunction<any>,
	result?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProfileCompletionKeySpecifier = ('name' | 'value' | ProfileCompletionKeySpecifier)[];
export type ProfileCompletionFieldPolicy = {
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProfileOutputKeySpecifier = ('_id' | 'profilePicture' | 'profilePictureThumbnail' | 'socialLinks' | ProfileOutputKeySpecifier)[];
export type ProfileOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	profilePicture?: FieldPolicy<any> | FieldReadFunction<any>,
	profilePictureThumbnail?: FieldPolicy<any> | FieldReadFunction<any>,
	socialLinks?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProfilePictureOutputKeySpecifier = ('profilePicture' | ProfilePictureOutputKeySpecifier)[];
export type ProfilePictureOutputFieldPolicy = {
	profilePicture?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProjectChamberCategoryKeySpecifier = ('_id' | 'name' | ProjectChamberCategoryKeySpecifier)[];
export type ProjectChamberCategoryFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProjectNoumCampaignKeySpecifier = ('_id' | 'clicksToNoums' | 'connectionsDeclined' | 'connectionsMade' | 'finishedAt' | 'followersGained' | 'invitesSent' | 'refreshedAt' | 'space' | 'startedAt' | 'status' | 'targets' | 'uid' | 'views' | ProjectNoumCampaignKeySpecifier)[];
export type ProjectNoumCampaignFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	clicksToNoums?: FieldPolicy<any> | FieldReadFunction<any>,
	connectionsDeclined?: FieldPolicy<any> | FieldReadFunction<any>,
	connectionsMade?: FieldPolicy<any> | FieldReadFunction<any>,
	finishedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	followersGained?: FieldPolicy<any> | FieldReadFunction<any>,
	invitesSent?: FieldPolicy<any> | FieldReadFunction<any>,
	refreshedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	space?: FieldPolicy<any> | FieldReadFunction<any>,
	startedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	targets?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	views?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProjectNoumCampaignResponseKeySpecifier = ('count' | 'data' | ProjectNoumCampaignResponseKeySpecifier)[];
export type ProjectNoumCampaignResponseFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PublishableKeyKeySpecifier = ('publishableKey' | PublishableKeyKeySpecifier)[];
export type PublishableKeyFieldPolicy = {
	publishableKey?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('_' | 'accountLogs' | 'accountPaymentDetails' | 'accountStatmentDetails' | 'accounts' | 'allCustomers' | 'allNoumsContacts' | 'allNoumsContactsForAdmin' | 'allUsers' | 'allowPassCodeReset' | 'amountDueThisMonth' | 'audit' | 'authenticationError' | 'availableNoumRoles' | 'broadcastAudienceTargets' | 'canUserJoinEvent' | 'capitalquotient' | 'chamber' | 'chameleon' | 'check' | 'checkForAdmin' | 'checkIfSlugExists' | 'checkPassCodeExists' | 'checkPaymentRetry' | 'checkWalletExistDetail' | 'checkWalletExists' | 'config' | 'connectedNoums' | 'connections' | 'currentUser' | 'currentUserPaymentLimits' | 'customer' | 'customerAddressDetails' | 'customerApprovedILI' | 'customerBankList' | 'customerContactDetails' | 'customerContractDetails' | 'customerFirstTimeFlag' | 'customerList' | 'customerLogs' | 'customerPersonalDetails' | 'customers' | 'dailyRecommendations' | 'downloadInvoicePDF' | 'dwollaTransactions' | 'exportCsv' | 'findSpaceBySearchQuery' | 'getAccountById' | 'getAccountList' | 'getAccountListByUser' | 'getAccountListV2' | 'getAdCampaignCsvReportUrl' | 'getAdCampaignCsvReports' | 'getAdCampaignListAdmin' | 'getAdCampaignOfferOne' | 'getAdCampaignOffers' | 'getAdCampaignOffersAll' | 'getAdCampaignReportOne' | 'getAdCampaignReports' | 'getAdCampaignSettings' | 'getAdCampaignsByUser' | 'getAdEnabledNoums' | 'getAdKeywords' | 'getAdminReportByID' | 'getAdminReportSignedURL' | 'getAdminReportsByType' | 'getAllChargebeeCustomers' | 'getAllInvoices' | 'getAllNoums' | 'getAllNoumsTransactions' | 'getAllPayments' | 'getAllPlansDetails' | 'getAllSOW' | 'getAllSubscriptionsForUser' | 'getAllSurveys' | 'getAllThemes' | 'getAllTokenArchives' | 'getAllUidForChamberPosts' | 'getAllUserGroupsForAdmin' | 'getAppActivities' | 'getAvailableItemFamilies' | 'getAvailableItemsByFamily' | 'getAvailablePlans' | 'getAvailableSubscriptions' | 'getBankAccountBalance' | 'getBroadcastedProjectNoums' | 'getCampaignAccount' | 'getCardStripe' | 'getCategoryWithSkills' | 'getCommentById' | 'getCommentByIdForGenericEntity' | 'getCommentsForGenericEntity' | 'getConfig' | 'getConnectedChamberPayments' | 'getConnectedSpaces' | 'getConnectionById' | 'getConsignors' | 'getContactConnectionWithNoum' | 'getContractList' | 'getContractListForAdmin' | 'getContractReportCsvUrl' | 'getContractReports' | 'getConversation' | 'getConversationByCid' | 'getConversations' | 'getCookieConsent' | 'getCustomerAuditLogs' | 'getCustomerDetails' | 'getCustomerDocumentUrl' | 'getCustomerDocuments' | 'getCustomerLimits' | 'getCustomerLimitsV2' | 'getCustomerPayeeList' | 'getCustomerPayeeListV2' | 'getCustomerSearchList' | 'getCustomers' | 'getDefaultNoumTransactionFeeDetails' | 'getDistinctNoumAdCampaigns' | 'getDocuSignURL' | 'getDocumentByEnvelopeId' | 'getDocumentUploadUrl' | 'getElement' | 'getElementList' | 'getEventAttendees' | 'getEventById' | 'getEventCounter' | 'getEventUserRole' | 'getEvents' | 'getEventsV2' | 'getFeaturedNoums' | 'getFollowingSpaces' | 'getGlobalInvoiceConfig' | 'getHomeSpaceConversations' | 'getIDScanCheckResult' | 'getInvoiceAmount' | 'getInvoiceById' | 'getInvoiceDownloadURL' | 'getInvoiceHistory' | 'getInvoiceList' | 'getInvoiceListForAdmin' | 'getInvoicePayment' | 'getInvoicePaymentByPaymentId' | 'getInvoicePayments' | 'getInvoiceReports' | 'getInvoiceSequence' | 'getInvoiceTimeLines' | 'getInvoiceToolReportCsvUrl' | 'getInvoiceToolReports' | 'getInvoices' | 'getKYCCustomer' | 'getKYCCustomers' | 'getLinkToken' | 'getLinkedNoums' | 'getLinkedSOWs' | 'getLocation' | 'getMasterWalletBalance' | 'getNoumActivityLog' | 'getNoumActivityStats' | 'getNoumClassById' | 'getNoumClassByNoumId' | 'getNoumClassList' | 'getNoumConnectedMembers' | 'getNoumConnectionsKPIs' | 'getNoumConnectionsWithinTimeframe' | 'getNoumFollowersKPIs' | 'getNoumFollowersWithinTimeframeQuery' | 'getNoumLink' | 'getNoumLinkConnections' | 'getNoumLinkFollowers' | 'getNoumLinkedNoums' | 'getNoumLinks' | 'getNoumProgramById' | 'getNoumProgramList' | 'getNoumProgramresultById' | 'getNoumReferenceCapacites' | 'getNoumReferenceCapacity' | 'getNoumReferences' | 'getNoumTransactionFeeDetails' | 'getNoumTransactionHistory' | 'getNoumsByStatus' | 'getNoumsLinkedToContracts' | 'getNoumsLinkedToSOWs' | 'getNoumsLinkedToUserInvoices' | 'getOnboardingQuestionAndAnswers' | 'getOneSurvey' | 'getOneSurveyPage' | 'getOpNotification' | 'getOpsAdminPermissions' | 'getOpsPermission' | 'getOpsRoles' | 'getOtpStats' | 'getOwnProjectChambers' | 'getPaymentById' | 'getPaymentConfigByName' | 'getPaymentConfigs' | 'getPaymentProviderCharges' | 'getPaymentProviders' | 'getPaymentSubscriptionSetting' | 'getPaymentTransactions' | 'getPlanSettingById' | 'getPostsByChamberId' | 'getPreSignedURLForFileUpload' | 'getProjectChamberCategories' | 'getProjectChambers' | 'getProjectChambersAdmin' | 'getProjectChambersByUserId' | 'getPublishableKey' | 'getQuestionAnswers' | 'getQuestionById' | 'getQuestionnaire' | 'getQuestionsForSpace' | 'getRandomQuestionnaire' | 'getRecommendedNoums' | 'getReferredUser' | 'getRegistrationOTP' | 'getRenewalToken' | 'getRepliesByCommentId' | 'getRepliesByCommentIdForGenericEntity' | 'getReport' | 'getReportUrl' | 'getReports' | 'getRiseNoumApplicationResultAdmin' | 'getRiseNoumByClassIdForAdmin' | 'getRiseReportCsvUrl' | 'getRiseReports' | 'getRoles' | 'getSOWListForAdmin' | 'getSecurityQuestionForReset' | 'getSecurityQuestionsForReset' | 'getSelectedAdCampaignDetails' | 'getSelectedInvoiceDetails' | 'getSignedURLForFileAccess' | 'getSignedUrl' | 'getSingleContract' | 'getSingleContractUnAuthenticated' | 'getSingleSOW' | 'getSingleSOWUnAuthenticated' | 'getSingleTheme' | 'getSowReportCsvUrl' | 'getSowReports' | 'getSpaceById' | 'getSpaceByType' | 'getSpaceConfig' | 'getSpaceConnectedMembers' | 'getSpaceConnections' | 'getSpaceConnectionsV2' | 'getSpaceConversations' | 'getSpaceConversationsAsAdminQuery' | 'getSpaceFollowers' | 'getSpacesByUserId' | 'getSpotLightChambers' | 'getStripePaymentMethod' | 'getSubWalletBalance' | 'getSubWalletBalanceByUser' | 'getSubWalletEntries' | 'getSubmittedOnboardingQuestionsAndAnswers' | 'getSubscriptionById' | 'getSubscriptionPermissionsAndHomeNoumCounters' | 'getSurveyAnswers' | 'getSurveyPageAnswer' | 'getTokenArchive' | 'getUnreadMessageCount' | 'getUserAccessData' | 'getUserApplication' | 'getUserApplications' | 'getUserCampaigns' | 'getUserConnections' | 'getUserCustomerDetails' | 'getUserDeviceToken' | 'getUserEmail' | 'getUserHistory' | 'getUserInvoiceLineItem' | 'getUserInvoiceLineItemList' | 'getUserListForTagging' | 'getUserNetworks' | 'getUserNoums' | 'getUserOwnedContacts' | 'getUserPreferences' | 'getUserReferralCode' | 'getUserSpace' | 'getUserStatusUpdateLogs' | 'getUserSubmittedOnboardingQuestionsAndAnswers' | 'getUsersAddressByAdmin' | 'getUsersPosts' | 'getWalletBalance' | 'getinviteNonNoumenaMember' | 'globalSearch' | 'group' | 'groupConnectionCheck' | 'groupConnections' | 'groupMembers' | 'groupPosts' | 'groupRequestForAdmin' | 'groups' | 'healthCheck' | 'incomeData' | 'initTimezone' | 'invoicePDFPreview' | 'invoicePDFPreviewByID' | 'isSocialHallAttendee' | 'listAllOpNotification' | 'listBlockedCountries' | 'listDraftOpNotification' | 'listIndustries' | 'listSentOpNotification' | 'listUserInvitesForAdmin' | 'listUsersForAdmin' | 'myCircle' | 'myFeed' | 'myGroupsFeed' | 'neuroprofiler' | 'note' | 'notes' | 'notificationV2' | 'notifications' | 'notificationsUnreadCount' | 'notificationsV2' | 'noumContacts' | 'noumFile' | 'noumFiles' | 'noumMember' | 'noumMembers' | 'noumRoleGroupedPermissions' | 'noumRoleHistoryLog' | 'noumRolePermissions' | 'noumRoles' | 'paymentConfig' | 'payments' | 'pingSurvey' | 'popularNoums' | 'post' | 'postComments' | 'postConnectionGroupsIds' | 'preCalculateNoumLinkData' | 'preDefinedMessages' | 'previewWithSign' | 'principles' | 'product' | 'productDetails' | 'productProfiles' | 'profileCheckResult' | 'reactions' | 'receivedConnectionRequest' | 'receivedNoumConnectionInvites' | 'receivedNoumConnectionRequests' | 'recentNoums' | 'recentSearches' | 'recommendedUsersWithCompleteProfile' | 'requestedConnection' | 'searchEngine' | 'searchGroups' | 'sentNoumConnectionInvites' | 'sentNoumConnectionRequests' | 'skills' | 'socialHall' | 'socialHallAttendee' | 'socialHallById' | 'socialHallByName' | 'socialHallGroupById' | 'socialHallGroups' | 'testEvents' | 'testToken' | 'testUserData' | 'timezones' | 'tokenTransaction' | 'triggerHourlyEmailNotifcations' | 'underwriting' | 'updateOldConnectionHomeNoum' | 'uploadCustomerDocuments' | 'user' | 'userActiveKnocks' | 'userActiveSocialHallGroup' | 'userAddress' | 'userAdminGroup' | 'userBankList' | 'userBySkillId' | 'userChamProfile' | 'userCompletedApplication' | 'userConnections' | 'userConnectionsForAdmin' | 'userCreditCheck' | 'userDiscovery' | 'userFavourites' | 'userGroupInviteRequest' | 'userGroupSentRequest' | 'userGroupsUpdate' | 'userInviteRequest' | 'userJoinRequestForGroups' | 'userKyc' | 'userKycForAdmin' | 'userKycResult' | 'userLogin' | 'userMembers' | 'userMonthlyData' | 'userOwnKnocks' | 'userPosts' | 'userReferralEntry' | 'userRiseBankList' | 'userRiseProfile' | 'userSentRequest' | 'users' | 'usersGroups' | 'usersSearchAdmin' | 'validateInvoiceSequence' | 'validateReferralCode' | 'validateText' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	_?: FieldPolicy<any> | FieldReadFunction<any>,
	accountLogs?: FieldPolicy<any> | FieldReadFunction<any>,
	accountPaymentDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	accountStatmentDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	accounts?: FieldPolicy<any> | FieldReadFunction<any>,
	allCustomers?: FieldPolicy<any> | FieldReadFunction<any>,
	allNoumsContacts?: FieldPolicy<any> | FieldReadFunction<any>,
	allNoumsContactsForAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	allUsers?: FieldPolicy<any> | FieldReadFunction<any>,
	allowPassCodeReset?: FieldPolicy<any> | FieldReadFunction<any>,
	amountDueThisMonth?: FieldPolicy<any> | FieldReadFunction<any>,
	audit?: FieldPolicy<any> | FieldReadFunction<any>,
	authenticationError?: FieldPolicy<any> | FieldReadFunction<any>,
	availableNoumRoles?: FieldPolicy<any> | FieldReadFunction<any>,
	broadcastAudienceTargets?: FieldPolicy<any> | FieldReadFunction<any>,
	canUserJoinEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	capitalquotient?: FieldPolicy<any> | FieldReadFunction<any>,
	chamber?: FieldPolicy<any> | FieldReadFunction<any>,
	chameleon?: FieldPolicy<any> | FieldReadFunction<any>,
	check?: FieldPolicy<any> | FieldReadFunction<any>,
	checkForAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	checkIfSlugExists?: FieldPolicy<any> | FieldReadFunction<any>,
	checkPassCodeExists?: FieldPolicy<any> | FieldReadFunction<any>,
	checkPaymentRetry?: FieldPolicy<any> | FieldReadFunction<any>,
	checkWalletExistDetail?: FieldPolicy<any> | FieldReadFunction<any>,
	checkWalletExists?: FieldPolicy<any> | FieldReadFunction<any>,
	config?: FieldPolicy<any> | FieldReadFunction<any>,
	connectedNoums?: FieldPolicy<any> | FieldReadFunction<any>,
	connections?: FieldPolicy<any> | FieldReadFunction<any>,
	currentUser?: FieldPolicy<any> | FieldReadFunction<any>,
	currentUserPaymentLimits?: FieldPolicy<any> | FieldReadFunction<any>,
	customer?: FieldPolicy<any> | FieldReadFunction<any>,
	customerAddressDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	customerApprovedILI?: FieldPolicy<any> | FieldReadFunction<any>,
	customerBankList?: FieldPolicy<any> | FieldReadFunction<any>,
	customerContactDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	customerContractDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	customerFirstTimeFlag?: FieldPolicy<any> | FieldReadFunction<any>,
	customerList?: FieldPolicy<any> | FieldReadFunction<any>,
	customerLogs?: FieldPolicy<any> | FieldReadFunction<any>,
	customerPersonalDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	customers?: FieldPolicy<any> | FieldReadFunction<any>,
	dailyRecommendations?: FieldPolicy<any> | FieldReadFunction<any>,
	downloadInvoicePDF?: FieldPolicy<any> | FieldReadFunction<any>,
	dwollaTransactions?: FieldPolicy<any> | FieldReadFunction<any>,
	exportCsv?: FieldPolicy<any> | FieldReadFunction<any>,
	findSpaceBySearchQuery?: FieldPolicy<any> | FieldReadFunction<any>,
	getAccountById?: FieldPolicy<any> | FieldReadFunction<any>,
	getAccountList?: FieldPolicy<any> | FieldReadFunction<any>,
	getAccountListByUser?: FieldPolicy<any> | FieldReadFunction<any>,
	getAccountListV2?: FieldPolicy<any> | FieldReadFunction<any>,
	getAdCampaignCsvReportUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	getAdCampaignCsvReports?: FieldPolicy<any> | FieldReadFunction<any>,
	getAdCampaignListAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	getAdCampaignOfferOne?: FieldPolicy<any> | FieldReadFunction<any>,
	getAdCampaignOffers?: FieldPolicy<any> | FieldReadFunction<any>,
	getAdCampaignOffersAll?: FieldPolicy<any> | FieldReadFunction<any>,
	getAdCampaignReportOne?: FieldPolicy<any> | FieldReadFunction<any>,
	getAdCampaignReports?: FieldPolicy<any> | FieldReadFunction<any>,
	getAdCampaignSettings?: FieldPolicy<any> | FieldReadFunction<any>,
	getAdCampaignsByUser?: FieldPolicy<any> | FieldReadFunction<any>,
	getAdEnabledNoums?: FieldPolicy<any> | FieldReadFunction<any>,
	getAdKeywords?: FieldPolicy<any> | FieldReadFunction<any>,
	getAdminReportByID?: FieldPolicy<any> | FieldReadFunction<any>,
	getAdminReportSignedURL?: FieldPolicy<any> | FieldReadFunction<any>,
	getAdminReportsByType?: FieldPolicy<any> | FieldReadFunction<any>,
	getAllChargebeeCustomers?: FieldPolicy<any> | FieldReadFunction<any>,
	getAllInvoices?: FieldPolicy<any> | FieldReadFunction<any>,
	getAllNoums?: FieldPolicy<any> | FieldReadFunction<any>,
	getAllNoumsTransactions?: FieldPolicy<any> | FieldReadFunction<any>,
	getAllPayments?: FieldPolicy<any> | FieldReadFunction<any>,
	getAllPlansDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	getAllSOW?: FieldPolicy<any> | FieldReadFunction<any>,
	getAllSubscriptionsForUser?: FieldPolicy<any> | FieldReadFunction<any>,
	getAllSurveys?: FieldPolicy<any> | FieldReadFunction<any>,
	getAllThemes?: FieldPolicy<any> | FieldReadFunction<any>,
	getAllTokenArchives?: FieldPolicy<any> | FieldReadFunction<any>,
	getAllUidForChamberPosts?: FieldPolicy<any> | FieldReadFunction<any>,
	getAllUserGroupsForAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	getAppActivities?: FieldPolicy<any> | FieldReadFunction<any>,
	getAvailableItemFamilies?: FieldPolicy<any> | FieldReadFunction<any>,
	getAvailableItemsByFamily?: FieldPolicy<any> | FieldReadFunction<any>,
	getAvailablePlans?: FieldPolicy<any> | FieldReadFunction<any>,
	getAvailableSubscriptions?: FieldPolicy<any> | FieldReadFunction<any>,
	getBankAccountBalance?: FieldPolicy<any> | FieldReadFunction<any>,
	getBroadcastedProjectNoums?: FieldPolicy<any> | FieldReadFunction<any>,
	getCampaignAccount?: FieldPolicy<any> | FieldReadFunction<any>,
	getCardStripe?: FieldPolicy<any> | FieldReadFunction<any>,
	getCategoryWithSkills?: FieldPolicy<any> | FieldReadFunction<any>,
	getCommentById?: FieldPolicy<any> | FieldReadFunction<any>,
	getCommentByIdForGenericEntity?: FieldPolicy<any> | FieldReadFunction<any>,
	getCommentsForGenericEntity?: FieldPolicy<any> | FieldReadFunction<any>,
	getConfig?: FieldPolicy<any> | FieldReadFunction<any>,
	getConnectedChamberPayments?: FieldPolicy<any> | FieldReadFunction<any>,
	getConnectedSpaces?: FieldPolicy<any> | FieldReadFunction<any>,
	getConnectionById?: FieldPolicy<any> | FieldReadFunction<any>,
	getConsignors?: FieldPolicy<any> | FieldReadFunction<any>,
	getContactConnectionWithNoum?: FieldPolicy<any> | FieldReadFunction<any>,
	getContractList?: FieldPolicy<any> | FieldReadFunction<any>,
	getContractListForAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	getContractReportCsvUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	getContractReports?: FieldPolicy<any> | FieldReadFunction<any>,
	getConversation?: FieldPolicy<any> | FieldReadFunction<any>,
	getConversationByCid?: FieldPolicy<any> | FieldReadFunction<any>,
	getConversations?: FieldPolicy<any> | FieldReadFunction<any>,
	getCookieConsent?: FieldPolicy<any> | FieldReadFunction<any>,
	getCustomerAuditLogs?: FieldPolicy<any> | FieldReadFunction<any>,
	getCustomerDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	getCustomerDocumentUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	getCustomerDocuments?: FieldPolicy<any> | FieldReadFunction<any>,
	getCustomerLimits?: FieldPolicy<any> | FieldReadFunction<any>,
	getCustomerLimitsV2?: FieldPolicy<any> | FieldReadFunction<any>,
	getCustomerPayeeList?: FieldPolicy<any> | FieldReadFunction<any>,
	getCustomerPayeeListV2?: FieldPolicy<any> | FieldReadFunction<any>,
	getCustomerSearchList?: FieldPolicy<any> | FieldReadFunction<any>,
	getCustomers?: FieldPolicy<any> | FieldReadFunction<any>,
	getDefaultNoumTransactionFeeDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	getDistinctNoumAdCampaigns?: FieldPolicy<any> | FieldReadFunction<any>,
	getDocuSignURL?: FieldPolicy<any> | FieldReadFunction<any>,
	getDocumentByEnvelopeId?: FieldPolicy<any> | FieldReadFunction<any>,
	getDocumentUploadUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	getElement?: FieldPolicy<any> | FieldReadFunction<any>,
	getElementList?: FieldPolicy<any> | FieldReadFunction<any>,
	getEventAttendees?: FieldPolicy<any> | FieldReadFunction<any>,
	getEventById?: FieldPolicy<any> | FieldReadFunction<any>,
	getEventCounter?: FieldPolicy<any> | FieldReadFunction<any>,
	getEventUserRole?: FieldPolicy<any> | FieldReadFunction<any>,
	getEvents?: FieldPolicy<any> | FieldReadFunction<any>,
	getEventsV2?: FieldPolicy<any> | FieldReadFunction<any>,
	getFeaturedNoums?: FieldPolicy<any> | FieldReadFunction<any>,
	getFollowingSpaces?: FieldPolicy<any> | FieldReadFunction<any>,
	getGlobalInvoiceConfig?: FieldPolicy<any> | FieldReadFunction<any>,
	getHomeSpaceConversations?: FieldPolicy<any> | FieldReadFunction<any>,
	getIDScanCheckResult?: FieldPolicy<any> | FieldReadFunction<any>,
	getInvoiceAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	getInvoiceById?: FieldPolicy<any> | FieldReadFunction<any>,
	getInvoiceDownloadURL?: FieldPolicy<any> | FieldReadFunction<any>,
	getInvoiceHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	getInvoiceList?: FieldPolicy<any> | FieldReadFunction<any>,
	getInvoiceListForAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	getInvoicePayment?: FieldPolicy<any> | FieldReadFunction<any>,
	getInvoicePaymentByPaymentId?: FieldPolicy<any> | FieldReadFunction<any>,
	getInvoicePayments?: FieldPolicy<any> | FieldReadFunction<any>,
	getInvoiceReports?: FieldPolicy<any> | FieldReadFunction<any>,
	getInvoiceSequence?: FieldPolicy<any> | FieldReadFunction<any>,
	getInvoiceTimeLines?: FieldPolicy<any> | FieldReadFunction<any>,
	getInvoiceToolReportCsvUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	getInvoiceToolReports?: FieldPolicy<any> | FieldReadFunction<any>,
	getInvoices?: FieldPolicy<any> | FieldReadFunction<any>,
	getKYCCustomer?: FieldPolicy<any> | FieldReadFunction<any>,
	getKYCCustomers?: FieldPolicy<any> | FieldReadFunction<any>,
	getLinkToken?: FieldPolicy<any> | FieldReadFunction<any>,
	getLinkedNoums?: FieldPolicy<any> | FieldReadFunction<any>,
	getLinkedSOWs?: FieldPolicy<any> | FieldReadFunction<any>,
	getLocation?: FieldPolicy<any> | FieldReadFunction<any>,
	getMasterWalletBalance?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumActivityLog?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumActivityStats?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumClassById?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumClassByNoumId?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumClassList?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumConnectedMembers?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumConnectionsKPIs?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumConnectionsWithinTimeframe?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumFollowersKPIs?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumFollowersWithinTimeframeQuery?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumLink?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumLinkConnections?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumLinkFollowers?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumLinkedNoums?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumLinks?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumProgramById?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumProgramList?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumProgramresultById?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumReferenceCapacites?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumReferenceCapacity?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumReferences?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumTransactionFeeDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumTransactionHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumsByStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumsLinkedToContracts?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumsLinkedToSOWs?: FieldPolicy<any> | FieldReadFunction<any>,
	getNoumsLinkedToUserInvoices?: FieldPolicy<any> | FieldReadFunction<any>,
	getOnboardingQuestionAndAnswers?: FieldPolicy<any> | FieldReadFunction<any>,
	getOneSurvey?: FieldPolicy<any> | FieldReadFunction<any>,
	getOneSurveyPage?: FieldPolicy<any> | FieldReadFunction<any>,
	getOpNotification?: FieldPolicy<any> | FieldReadFunction<any>,
	getOpsAdminPermissions?: FieldPolicy<any> | FieldReadFunction<any>,
	getOpsPermission?: FieldPolicy<any> | FieldReadFunction<any>,
	getOpsRoles?: FieldPolicy<any> | FieldReadFunction<any>,
	getOtpStats?: FieldPolicy<any> | FieldReadFunction<any>,
	getOwnProjectChambers?: FieldPolicy<any> | FieldReadFunction<any>,
	getPaymentById?: FieldPolicy<any> | FieldReadFunction<any>,
	getPaymentConfigByName?: FieldPolicy<any> | FieldReadFunction<any>,
	getPaymentConfigs?: FieldPolicy<any> | FieldReadFunction<any>,
	getPaymentProviderCharges?: FieldPolicy<any> | FieldReadFunction<any>,
	getPaymentProviders?: FieldPolicy<any> | FieldReadFunction<any>,
	getPaymentSubscriptionSetting?: FieldPolicy<any> | FieldReadFunction<any>,
	getPaymentTransactions?: FieldPolicy<any> | FieldReadFunction<any>,
	getPlanSettingById?: FieldPolicy<any> | FieldReadFunction<any>,
	getPostsByChamberId?: FieldPolicy<any> | FieldReadFunction<any>,
	getPreSignedURLForFileUpload?: FieldPolicy<any> | FieldReadFunction<any>,
	getProjectChamberCategories?: FieldPolicy<any> | FieldReadFunction<any>,
	getProjectChambers?: FieldPolicy<any> | FieldReadFunction<any>,
	getProjectChambersAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	getProjectChambersByUserId?: FieldPolicy<any> | FieldReadFunction<any>,
	getPublishableKey?: FieldPolicy<any> | FieldReadFunction<any>,
	getQuestionAnswers?: FieldPolicy<any> | FieldReadFunction<any>,
	getQuestionById?: FieldPolicy<any> | FieldReadFunction<any>,
	getQuestionnaire?: FieldPolicy<any> | FieldReadFunction<any>,
	getQuestionsForSpace?: FieldPolicy<any> | FieldReadFunction<any>,
	getRandomQuestionnaire?: FieldPolicy<any> | FieldReadFunction<any>,
	getRecommendedNoums?: FieldPolicy<any> | FieldReadFunction<any>,
	getReferredUser?: FieldPolicy<any> | FieldReadFunction<any>,
	getRegistrationOTP?: FieldPolicy<any> | FieldReadFunction<any>,
	getRenewalToken?: FieldPolicy<any> | FieldReadFunction<any>,
	getRepliesByCommentId?: FieldPolicy<any> | FieldReadFunction<any>,
	getRepliesByCommentIdForGenericEntity?: FieldPolicy<any> | FieldReadFunction<any>,
	getReport?: FieldPolicy<any> | FieldReadFunction<any>,
	getReportUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	getReports?: FieldPolicy<any> | FieldReadFunction<any>,
	getRiseNoumApplicationResultAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	getRiseNoumByClassIdForAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	getRiseReportCsvUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	getRiseReports?: FieldPolicy<any> | FieldReadFunction<any>,
	getRoles?: FieldPolicy<any> | FieldReadFunction<any>,
	getSOWListForAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	getSecurityQuestionForReset?: FieldPolicy<any> | FieldReadFunction<any>,
	getSecurityQuestionsForReset?: FieldPolicy<any> | FieldReadFunction<any>,
	getSelectedAdCampaignDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	getSelectedInvoiceDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	getSignedURLForFileAccess?: FieldPolicy<any> | FieldReadFunction<any>,
	getSignedUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	getSingleContract?: FieldPolicy<any> | FieldReadFunction<any>,
	getSingleContractUnAuthenticated?: FieldPolicy<any> | FieldReadFunction<any>,
	getSingleSOW?: FieldPolicy<any> | FieldReadFunction<any>,
	getSingleSOWUnAuthenticated?: FieldPolicy<any> | FieldReadFunction<any>,
	getSingleTheme?: FieldPolicy<any> | FieldReadFunction<any>,
	getSowReportCsvUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	getSowReports?: FieldPolicy<any> | FieldReadFunction<any>,
	getSpaceById?: FieldPolicy<any> | FieldReadFunction<any>,
	getSpaceByType?: FieldPolicy<any> | FieldReadFunction<any>,
	getSpaceConfig?: FieldPolicy<any> | FieldReadFunction<any>,
	getSpaceConnectedMembers?: FieldPolicy<any> | FieldReadFunction<any>,
	getSpaceConnections?: FieldPolicy<any> | FieldReadFunction<any>,
	getSpaceConnectionsV2?: FieldPolicy<any> | FieldReadFunction<any>,
	getSpaceConversations?: FieldPolicy<any> | FieldReadFunction<any>,
	getSpaceConversationsAsAdminQuery?: FieldPolicy<any> | FieldReadFunction<any>,
	getSpaceFollowers?: FieldPolicy<any> | FieldReadFunction<any>,
	getSpacesByUserId?: FieldPolicy<any> | FieldReadFunction<any>,
	getSpotLightChambers?: FieldPolicy<any> | FieldReadFunction<any>,
	getStripePaymentMethod?: FieldPolicy<any> | FieldReadFunction<any>,
	getSubWalletBalance?: FieldPolicy<any> | FieldReadFunction<any>,
	getSubWalletBalanceByUser?: FieldPolicy<any> | FieldReadFunction<any>,
	getSubWalletEntries?: FieldPolicy<any> | FieldReadFunction<any>,
	getSubmittedOnboardingQuestionsAndAnswers?: FieldPolicy<any> | FieldReadFunction<any>,
	getSubscriptionById?: FieldPolicy<any> | FieldReadFunction<any>,
	getSubscriptionPermissionsAndHomeNoumCounters?: FieldPolicy<any> | FieldReadFunction<any>,
	getSurveyAnswers?: FieldPolicy<any> | FieldReadFunction<any>,
	getSurveyPageAnswer?: FieldPolicy<any> | FieldReadFunction<any>,
	getTokenArchive?: FieldPolicy<any> | FieldReadFunction<any>,
	getUnreadMessageCount?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserAccessData?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserApplication?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserApplications?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserCampaigns?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserConnections?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserCustomerDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserDeviceToken?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserEmail?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserInvoiceLineItem?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserInvoiceLineItemList?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserListForTagging?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserNetworks?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserNoums?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserOwnedContacts?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserPreferences?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserReferralCode?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserSpace?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserStatusUpdateLogs?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserSubmittedOnboardingQuestionsAndAnswers?: FieldPolicy<any> | FieldReadFunction<any>,
	getUsersAddressByAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	getUsersPosts?: FieldPolicy<any> | FieldReadFunction<any>,
	getWalletBalance?: FieldPolicy<any> | FieldReadFunction<any>,
	getinviteNonNoumenaMember?: FieldPolicy<any> | FieldReadFunction<any>,
	globalSearch?: FieldPolicy<any> | FieldReadFunction<any>,
	group?: FieldPolicy<any> | FieldReadFunction<any>,
	groupConnectionCheck?: FieldPolicy<any> | FieldReadFunction<any>,
	groupConnections?: FieldPolicy<any> | FieldReadFunction<any>,
	groupMembers?: FieldPolicy<any> | FieldReadFunction<any>,
	groupPosts?: FieldPolicy<any> | FieldReadFunction<any>,
	groupRequestForAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	groups?: FieldPolicy<any> | FieldReadFunction<any>,
	healthCheck?: FieldPolicy<any> | FieldReadFunction<any>,
	incomeData?: FieldPolicy<any> | FieldReadFunction<any>,
	initTimezone?: FieldPolicy<any> | FieldReadFunction<any>,
	invoicePDFPreview?: FieldPolicy<any> | FieldReadFunction<any>,
	invoicePDFPreviewByID?: FieldPolicy<any> | FieldReadFunction<any>,
	isSocialHallAttendee?: FieldPolicy<any> | FieldReadFunction<any>,
	listAllOpNotification?: FieldPolicy<any> | FieldReadFunction<any>,
	listBlockedCountries?: FieldPolicy<any> | FieldReadFunction<any>,
	listDraftOpNotification?: FieldPolicy<any> | FieldReadFunction<any>,
	listIndustries?: FieldPolicy<any> | FieldReadFunction<any>,
	listSentOpNotification?: FieldPolicy<any> | FieldReadFunction<any>,
	listUserInvitesForAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	listUsersForAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	myCircle?: FieldPolicy<any> | FieldReadFunction<any>,
	myFeed?: FieldPolicy<any> | FieldReadFunction<any>,
	myGroupsFeed?: FieldPolicy<any> | FieldReadFunction<any>,
	neuroprofiler?: FieldPolicy<any> | FieldReadFunction<any>,
	note?: FieldPolicy<any> | FieldReadFunction<any>,
	notes?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationV2?: FieldPolicy<any> | FieldReadFunction<any>,
	notifications?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationsUnreadCount?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationsV2?: FieldPolicy<any> | FieldReadFunction<any>,
	noumContacts?: FieldPolicy<any> | FieldReadFunction<any>,
	noumFile?: FieldPolicy<any> | FieldReadFunction<any>,
	noumFiles?: FieldPolicy<any> | FieldReadFunction<any>,
	noumMember?: FieldPolicy<any> | FieldReadFunction<any>,
	noumMembers?: FieldPolicy<any> | FieldReadFunction<any>,
	noumRoleGroupedPermissions?: FieldPolicy<any> | FieldReadFunction<any>,
	noumRoleHistoryLog?: FieldPolicy<any> | FieldReadFunction<any>,
	noumRolePermissions?: FieldPolicy<any> | FieldReadFunction<any>,
	noumRoles?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentConfig?: FieldPolicy<any> | FieldReadFunction<any>,
	payments?: FieldPolicy<any> | FieldReadFunction<any>,
	pingSurvey?: FieldPolicy<any> | FieldReadFunction<any>,
	popularNoums?: FieldPolicy<any> | FieldReadFunction<any>,
	post?: FieldPolicy<any> | FieldReadFunction<any>,
	postComments?: FieldPolicy<any> | FieldReadFunction<any>,
	postConnectionGroupsIds?: FieldPolicy<any> | FieldReadFunction<any>,
	preCalculateNoumLinkData?: FieldPolicy<any> | FieldReadFunction<any>,
	preDefinedMessages?: FieldPolicy<any> | FieldReadFunction<any>,
	previewWithSign?: FieldPolicy<any> | FieldReadFunction<any>,
	principles?: FieldPolicy<any> | FieldReadFunction<any>,
	product?: FieldPolicy<any> | FieldReadFunction<any>,
	productDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	productProfiles?: FieldPolicy<any> | FieldReadFunction<any>,
	profileCheckResult?: FieldPolicy<any> | FieldReadFunction<any>,
	reactions?: FieldPolicy<any> | FieldReadFunction<any>,
	receivedConnectionRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	receivedNoumConnectionInvites?: FieldPolicy<any> | FieldReadFunction<any>,
	receivedNoumConnectionRequests?: FieldPolicy<any> | FieldReadFunction<any>,
	recentNoums?: FieldPolicy<any> | FieldReadFunction<any>,
	recentSearches?: FieldPolicy<any> | FieldReadFunction<any>,
	recommendedUsersWithCompleteProfile?: FieldPolicy<any> | FieldReadFunction<any>,
	requestedConnection?: FieldPolicy<any> | FieldReadFunction<any>,
	searchEngine?: FieldPolicy<any> | FieldReadFunction<any>,
	searchGroups?: FieldPolicy<any> | FieldReadFunction<any>,
	sentNoumConnectionInvites?: FieldPolicy<any> | FieldReadFunction<any>,
	sentNoumConnectionRequests?: FieldPolicy<any> | FieldReadFunction<any>,
	skills?: FieldPolicy<any> | FieldReadFunction<any>,
	socialHall?: FieldPolicy<any> | FieldReadFunction<any>,
	socialHallAttendee?: FieldPolicy<any> | FieldReadFunction<any>,
	socialHallById?: FieldPolicy<any> | FieldReadFunction<any>,
	socialHallByName?: FieldPolicy<any> | FieldReadFunction<any>,
	socialHallGroupById?: FieldPolicy<any> | FieldReadFunction<any>,
	socialHallGroups?: FieldPolicy<any> | FieldReadFunction<any>,
	testEvents?: FieldPolicy<any> | FieldReadFunction<any>,
	testToken?: FieldPolicy<any> | FieldReadFunction<any>,
	testUserData?: FieldPolicy<any> | FieldReadFunction<any>,
	timezones?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenTransaction?: FieldPolicy<any> | FieldReadFunction<any>,
	triggerHourlyEmailNotifcations?: FieldPolicy<any> | FieldReadFunction<any>,
	underwriting?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOldConnectionHomeNoum?: FieldPolicy<any> | FieldReadFunction<any>,
	uploadCustomerDocuments?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	userActiveKnocks?: FieldPolicy<any> | FieldReadFunction<any>,
	userActiveSocialHallGroup?: FieldPolicy<any> | FieldReadFunction<any>,
	userAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	userAdminGroup?: FieldPolicy<any> | FieldReadFunction<any>,
	userBankList?: FieldPolicy<any> | FieldReadFunction<any>,
	userBySkillId?: FieldPolicy<any> | FieldReadFunction<any>,
	userChamProfile?: FieldPolicy<any> | FieldReadFunction<any>,
	userCompletedApplication?: FieldPolicy<any> | FieldReadFunction<any>,
	userConnections?: FieldPolicy<any> | FieldReadFunction<any>,
	userConnectionsForAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	userCreditCheck?: FieldPolicy<any> | FieldReadFunction<any>,
	userDiscovery?: FieldPolicy<any> | FieldReadFunction<any>,
	userFavourites?: FieldPolicy<any> | FieldReadFunction<any>,
	userGroupInviteRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	userGroupSentRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	userGroupsUpdate?: FieldPolicy<any> | FieldReadFunction<any>,
	userInviteRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	userJoinRequestForGroups?: FieldPolicy<any> | FieldReadFunction<any>,
	userKyc?: FieldPolicy<any> | FieldReadFunction<any>,
	userKycForAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	userKycResult?: FieldPolicy<any> | FieldReadFunction<any>,
	userLogin?: FieldPolicy<any> | FieldReadFunction<any>,
	userMembers?: FieldPolicy<any> | FieldReadFunction<any>,
	userMonthlyData?: FieldPolicy<any> | FieldReadFunction<any>,
	userOwnKnocks?: FieldPolicy<any> | FieldReadFunction<any>,
	userPosts?: FieldPolicy<any> | FieldReadFunction<any>,
	userReferralEntry?: FieldPolicy<any> | FieldReadFunction<any>,
	userRiseBankList?: FieldPolicy<any> | FieldReadFunction<any>,
	userRiseProfile?: FieldPolicy<any> | FieldReadFunction<any>,
	userSentRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	users?: FieldPolicy<any> | FieldReadFunction<any>,
	usersGroups?: FieldPolicy<any> | FieldReadFunction<any>,
	usersSearchAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	validateInvoiceSequence?: FieldPolicy<any> | FieldReadFunction<any>,
	validateReferralCode?: FieldPolicy<any> | FieldReadFunction<any>,
	validateText?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QuestionAndAnswersKeySpecifier = ('_id' | 'options' | 'question' | QuestionAndAnswersKeySpecifier)[];
export type QuestionAndAnswersFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	options?: FieldPolicy<any> | FieldReadFunction<any>,
	question?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QuestionAndAnswersOutputKeySpecifier = ('count' | 'data' | QuestionAndAnswersOutputKeySpecifier)[];
export type QuestionAndAnswersOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QuestionOutputKeySpecifier = ('id' | 'question' | QuestionOutputKeySpecifier)[];
export type QuestionOutputFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	question?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QuestionOutputResponseKeySpecifier = ('count' | 'data' | 'totalCount' | QuestionOutputResponseKeySpecifier)[];
export type QuestionOutputResponseFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QuestionsAnswerOutputKeySpecifier = ('answer' | 'qid' | 'question' | QuestionsAnswerOutputKeySpecifier)[];
export type QuestionsAnswerOutputFieldPolicy = {
	answer?: FieldPolicy<any> | FieldReadFunction<any>,
	qid?: FieldPolicy<any> | FieldReadFunction<any>,
	question?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QuestionsOutputKeySpecifier = ('options' | 'qid' | 'question' | QuestionsOutputKeySpecifier)[];
export type QuestionsOutputFieldPolicy = {
	options?: FieldPolicy<any> | FieldReadFunction<any>,
	qid?: FieldPolicy<any> | FieldReadFunction<any>,
	question?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QuestionsRiseOutputKeySpecifier = ('answer' | 'qid' | 'question' | QuestionsRiseOutputKeySpecifier)[];
export type QuestionsRiseOutputFieldPolicy = {
	answer?: FieldPolicy<any> | FieldReadFunction<any>,
	qid?: FieldPolicy<any> | FieldReadFunction<any>,
	question?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RaisePaymentOutputKeySpecifier = ('clientSecret' | 'id' | 'paymentId' | RaisePaymentOutputKeySpecifier)[];
export type RaisePaymentOutputFieldPolicy = {
	clientSecret?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RaisedHandSubscriptionDataKeySpecifier = ('actionType' | 'userId' | RaisedHandSubscriptionDataKeySpecifier)[];
export type RaisedHandSubscriptionDataFieldPolicy = {
	actionType?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ReactionKeySpecifier = ('_id' | 'category' | 'createdAt' | 'uid' | 'updatedAt' | ReactionKeySpecifier)[];
export type ReactionFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ReactionOutputKeySpecifier = ('count' | 'data' | ReactionOutputKeySpecifier)[];
export type ReactionOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RecentSearchesResultKeySpecifier = ('clickedEntities' | 'searchedQueries' | RecentSearchesResultKeySpecifier)[];
export type RecentSearchesResultFieldPolicy = {
	clickedEntities?: FieldPolicy<any> | FieldReadFunction<any>,
	searchedQueries?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RecurringDetailsKeySpecifier = ('custom' | 'frequency' | 'interval' | 'monthDates' | 'weekDays' | RecurringDetailsKeySpecifier)[];
export type RecurringDetailsFieldPolicy = {
	custom?: FieldPolicy<any> | FieldReadFunction<any>,
	frequency?: FieldPolicy<any> | FieldReadFunction<any>,
	interval?: FieldPolicy<any> | FieldReadFunction<any>,
	monthDates?: FieldPolicy<any> | FieldReadFunction<any>,
	weekDays?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ReferralKeySpecifier = ('_id' | 'fastPass' | 'maxAllowedCount' | 'ownerPartnerId' | 'ownerUserId' | 'referralCode' | 'usedBy' | 'usedCount' | ReferralKeySpecifier)[];
export type ReferralFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	fastPass?: FieldPolicy<any> | FieldReadFunction<any>,
	maxAllowedCount?: FieldPolicy<any> | FieldReadFunction<any>,
	ownerPartnerId?: FieldPolicy<any> | FieldReadFunction<any>,
	ownerUserId?: FieldPolicy<any> | FieldReadFunction<any>,
	referralCode?: FieldPolicy<any> | FieldReadFunction<any>,
	usedBy?: FieldPolicy<any> | FieldReadFunction<any>,
	usedCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ReferralInviteKeySpecifier = ('referralCode' | 'referralInviteUserId' | ReferralInviteKeySpecifier)[];
export type ReferralInviteFieldPolicy = {
	referralCode?: FieldPolicy<any> | FieldReadFunction<any>,
	referralInviteUserId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ReplyOutputKeySpecifier = ('firstReply' | 'total' | 'userIdList' | ReplyOutputKeySpecifier)[];
export type ReplyOutputFieldPolicy = {
	firstReply?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>,
	userIdList?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ReportOutputKeySpecifier = ('createdAt' | 'reportText' | 'reportType' | 'uid' | 'updatedAt' | ReportOutputKeySpecifier)[];
export type ReportOutputFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	reportText?: FieldPolicy<any> | FieldReadFunction<any>,
	reportType?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ResolutionOutputKeySpecifier = ('content' | 'resolutionType' | ResolutionOutputKeySpecifier)[];
export type ResolutionOutputFieldPolicy = {
	content?: FieldPolicy<any> | FieldReadFunction<any>,
	resolutionType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ResultOutputKeySpecifier = ('name' | 'reasons' | 'result' | 'value' | ResultOutputKeySpecifier)[];
export type ResultOutputFieldPolicy = {
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	reasons?: FieldPolicy<any> | FieldReadFunction<any>,
	result?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RiseApplicationKeySpecifier = ('alredayCreated' | 'data' | RiseApplicationKeySpecifier)[];
export type RiseApplicationFieldPolicy = {
	alredayCreated?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RiseBankListOutputKeySpecifier = ('accountNumber' | 'accountSubType' | 'accountType' | 'id' | 'logo' | 'name' | RiseBankListOutputKeySpecifier)[];
export type RiseBankListOutputFieldPolicy = {
	accountNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	accountSubType?: FieldPolicy<any> | FieldReadFunction<any>,
	accountType?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	logo?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RisePersonalProfileOutputKeySpecifier = ('error' | 'message' | 'status' | 'success' | 'user' | RisePersonalProfileOutputKeySpecifier)[];
export type RisePersonalProfileOutputFieldPolicy = {
	error?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RiseReportListOutputKeySpecifier = ('count' | 'data' | RiseReportListOutputKeySpecifier)[];
export type RiseReportListOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RiseReportOutputKeySpecifier = ('_id' | 'createdAt' | 'filters' | 'stage' | 'status' | 'type' | 'updatedAt' | RiseReportOutputKeySpecifier)[];
export type RiseReportOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	filters?: FieldPolicy<any> | FieldReadFunction<any>,
	stage?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RiseUserDataOutputKeySpecifier = ('address' | 'applicationId' | 'applicationStatus' | 'averageMonthlyExpense' | 'averageMonthlyIncome' | 'bestMonthlyIncome' | 'dob' | 'email' | 'firstName' | 'incomeFromTaxReturn' | 'industry' | 'isUSResident' | 'lastName' | 'middleName' | 'phone' | 'questionAnswers' | 'ssn' | 'taxEndPeriod' | 'worstMonthlyIncome' | RiseUserDataOutputKeySpecifier)[];
export type RiseUserDataOutputFieldPolicy = {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	applicationId?: FieldPolicy<any> | FieldReadFunction<any>,
	applicationStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	averageMonthlyExpense?: FieldPolicy<any> | FieldReadFunction<any>,
	averageMonthlyIncome?: FieldPolicy<any> | FieldReadFunction<any>,
	bestMonthlyIncome?: FieldPolicy<any> | FieldReadFunction<any>,
	dob?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	incomeFromTaxReturn?: FieldPolicy<any> | FieldReadFunction<any>,
	industry?: FieldPolicy<any> | FieldReadFunction<any>,
	isUSResident?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	middleName?: FieldPolicy<any> | FieldReadFunction<any>,
	phone?: FieldPolicy<any> | FieldReadFunction<any>,
	questionAnswers?: FieldPolicy<any> | FieldReadFunction<any>,
	ssn?: FieldPolicy<any> | FieldReadFunction<any>,
	taxEndPeriod?: FieldPolicy<any> | FieldReadFunction<any>,
	worstMonthlyIncome?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SOWKeySpecifier = ('SOWNumber' | '_id' | 'commission' | 'createdAt' | 'createdBy' | 'deliverables' | 'effectiveDate' | 'expenseReimbursement' | 'fees' | 'isCompleted' | 'linkedContract' | 'linkedNoum' | 'logo' | 'milestones' | 'scopeOfWork' | 'sowPDF' | 'status' | 'templateName' | 'timeline' | 'timezone' | 'title' | SOWKeySpecifier)[];
export type SOWFieldPolicy = {
	SOWNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	commission?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>,
	deliverables?: FieldPolicy<any> | FieldReadFunction<any>,
	effectiveDate?: FieldPolicy<any> | FieldReadFunction<any>,
	expenseReimbursement?: FieldPolicy<any> | FieldReadFunction<any>,
	fees?: FieldPolicy<any> | FieldReadFunction<any>,
	isCompleted?: FieldPolicy<any> | FieldReadFunction<any>,
	linkedContract?: FieldPolicy<any> | FieldReadFunction<any>,
	linkedNoum?: FieldPolicy<any> | FieldReadFunction<any>,
	logo?: FieldPolicy<any> | FieldReadFunction<any>,
	milestones?: FieldPolicy<any> | FieldReadFunction<any>,
	scopeOfWork?: FieldPolicy<any> | FieldReadFunction<any>,
	sowPDF?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	templateName?: FieldPolicy<any> | FieldReadFunction<any>,
	timeline?: FieldPolicy<any> | FieldReadFunction<any>,
	timezone?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SOWOutputKeySpecifier = ('count' | 'data' | SOWOutputKeySpecifier)[];
export type SOWOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SaveCardOutputKeySpecifier = ('accountType' | 'clientAccountId' | 'customerId' | 'id' | 'maskAccountNumber' | 'paymentChannel' | 'status' | SaveCardOutputKeySpecifier)[];
export type SaveCardOutputFieldPolicy = {
	accountType?: FieldPolicy<any> | FieldReadFunction<any>,
	clientAccountId?: FieldPolicy<any> | FieldReadFunction<any>,
	customerId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	maskAccountNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentChannel?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ScoreLineOutputKeySpecifier = ('createdAt' | 'description' | 'reviewDate' | 'scoreId' | 'scoreLineId' | 'type' | 'updatedAt' | 'value' | ScoreLineOutputKeySpecifier)[];
export type ScoreLineOutputFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	reviewDate?: FieldPolicy<any> | FieldReadFunction<any>,
	scoreId?: FieldPolicy<any> | FieldReadFunction<any>,
	scoreLineId?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SearchableNoumContactKeySpecifier = ('_id' | 'apartmentNo' | 'city' | 'companyName' | 'country' | 'createdAt' | 'displayName' | 'email' | 'fullName' | 'isConnectedWithNoum' | 'noum' | 'ownerId' | 'state' | 'status' | 'street' | 'title' | 'type' | 'user' | 'zipCode' | SearchableNoumContactKeySpecifier)[];
export type SearchableNoumContactFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	apartmentNo?: FieldPolicy<any> | FieldReadFunction<any>,
	city?: FieldPolicy<any> | FieldReadFunction<any>,
	companyName?: FieldPolicy<any> | FieldReadFunction<any>,
	country?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	displayName?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	fullName?: FieldPolicy<any> | FieldReadFunction<any>,
	isConnectedWithNoum?: FieldPolicy<any> | FieldReadFunction<any>,
	noum?: FieldPolicy<any> | FieldReadFunction<any>,
	ownerId?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	street?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	zipCode?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SearchableNoumMemberKeySpecifier = ('_id' | 'connectedAt' | 'previousRole' | 'role' | 'status' | 'updatedAt' | 'user' | SearchableNoumMemberKeySpecifier)[];
export type SearchableNoumMemberFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	connectedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	previousRole?: FieldPolicy<any> | FieldReadFunction<any>,
	role?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SettingsOutputKeySpecifier = ('setting_name' | 'setting_value' | 'setting_value_type' | 'settings_id' | SettingsOutputKeySpecifier)[];
export type SettingsOutputFieldPolicy = {
	setting_name?: FieldPolicy<any> | FieldReadFunction<any>,
	setting_value?: FieldPolicy<any> | FieldReadFunction<any>,
	setting_value_type?: FieldPolicy<any> | FieldReadFunction<any>,
	settings_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SignedUrlOutputKeySpecifier = ('url' | SignedUrlOutputKeySpecifier)[];
export type SignedUrlOutputFieldPolicy = {
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SkillKeySpecifier = ('_id' | 'icon' | 'name' | SkillKeySpecifier)[];
export type SkillFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	icon?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SkillsOutputKeySpecifier = ('categories' | 'createdAt' | 'updatedAt' | SkillsOutputKeySpecifier)[];
export type SkillsOutputFieldPolicy = {
	categories?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SocialGroupKeySpecifier = ('_id' | 'channelName' | 'chatRoomId' | 'chatToken' | 'host' | 'hosts' | 'invitedAsSpeakers' | 'mutedSpeakers' | 'name' | 'raiseHands' | 'requestedJoiningStatus' | 'rtmToken' | 'socialHallId' | 'speakers' | 'startTime' | 'token' | 'topic' | 'users' | 'usersRequestedJoiningStatus' | SocialGroupKeySpecifier)[];
export type SocialGroupFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	channelName?: FieldPolicy<any> | FieldReadFunction<any>,
	chatRoomId?: FieldPolicy<any> | FieldReadFunction<any>,
	chatToken?: FieldPolicy<any> | FieldReadFunction<any>,
	host?: FieldPolicy<any> | FieldReadFunction<any>,
	hosts?: FieldPolicy<any> | FieldReadFunction<any>,
	invitedAsSpeakers?: FieldPolicy<any> | FieldReadFunction<any>,
	mutedSpeakers?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	raiseHands?: FieldPolicy<any> | FieldReadFunction<any>,
	requestedJoiningStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	rtmToken?: FieldPolicy<any> | FieldReadFunction<any>,
	socialHallId?: FieldPolicy<any> | FieldReadFunction<any>,
	speakers?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>,
	topic?: FieldPolicy<any> | FieldReadFunction<any>,
	users?: FieldPolicy<any> | FieldReadFunction<any>,
	usersRequestedJoiningStatus?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SocialGroupsKeySpecifier = ('count' | 'data' | SocialGroupsKeySpecifier)[];
export type SocialGroupsFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SocialHallKeySpecifier = ('_id' | 'attendees' | 'chamberId' | 'endTime' | 'eventId' | 'groupId' | 'hasUserJoined' | 'hosts' | 'isActive' | 'name' | 'ownerUserId' | 'socialHallId' | 'startTime' | 'status' | 'type' | SocialHallKeySpecifier)[];
export type SocialHallFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	attendees?: FieldPolicy<any> | FieldReadFunction<any>,
	chamberId?: FieldPolicy<any> | FieldReadFunction<any>,
	endTime?: FieldPolicy<any> | FieldReadFunction<any>,
	eventId?: FieldPolicy<any> | FieldReadFunction<any>,
	groupId?: FieldPolicy<any> | FieldReadFunction<any>,
	hasUserJoined?: FieldPolicy<any> | FieldReadFunction<any>,
	hosts?: FieldPolicy<any> | FieldReadFunction<any>,
	isActive?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	ownerUserId?: FieldPolicy<any> | FieldReadFunction<any>,
	socialHallId?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SocialHallAttendeeKeySpecifier = ('_id' | 'agoraUserId' | 'attendeeId' | 'entryTime' | 'eventId' | 'eventRole' | 'exitTime' | 'hallGroupId' | 'isHost' | 'location' | 'rtmToken' | 'shJoiningStatus' | 'socialHallId' | 'waitingRoomChannelName' | SocialHallAttendeeKeySpecifier)[];
export type SocialHallAttendeeFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	agoraUserId?: FieldPolicy<any> | FieldReadFunction<any>,
	attendeeId?: FieldPolicy<any> | FieldReadFunction<any>,
	entryTime?: FieldPolicy<any> | FieldReadFunction<any>,
	eventId?: FieldPolicy<any> | FieldReadFunction<any>,
	eventRole?: FieldPolicy<any> | FieldReadFunction<any>,
	exitTime?: FieldPolicy<any> | FieldReadFunction<any>,
	hallGroupId?: FieldPolicy<any> | FieldReadFunction<any>,
	isHost?: FieldPolicy<any> | FieldReadFunction<any>,
	location?: FieldPolicy<any> | FieldReadFunction<any>,
	rtmToken?: FieldPolicy<any> | FieldReadFunction<any>,
	shJoiningStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	socialHallId?: FieldPolicy<any> | FieldReadFunction<any>,
	waitingRoomChannelName?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SocialHallAttendeesKeySpecifier = ('count' | 'data' | SocialHallAttendeesKeySpecifier)[];
export type SocialHallAttendeesFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SocialHallUpdatesResponseKeySpecifier = ('actionData' | 'actionType' | SocialHallUpdatesResponseKeySpecifier)[];
export type SocialHallUpdatesResponseFieldPolicy = {
	actionData?: FieldPolicy<any> | FieldReadFunction<any>,
	actionType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SocialLinkKeySpecifier = ('link' | 'name' | SocialLinkKeySpecifier)[];
export type SocialLinkFieldPolicy = {
	link?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SortByKeySpecifier = ('field' | 'order' | SortByKeySpecifier)[];
export type SortByFieldPolicy = {
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	order?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SpaceConnectionKeySpecifier = ('_id' | 'approvedAt' | 'draft' | 'message' | 'permission' | 'requestFrom' | 'requestTo' | 'requestedAt' | 'status' | 'type' | SpaceConnectionKeySpecifier)[];
export type SpaceConnectionFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	approvedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	draft?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	permission?: FieldPolicy<any> | FieldReadFunction<any>,
	requestFrom?: FieldPolicy<any> | FieldReadFunction<any>,
	requestTo?: FieldPolicy<any> | FieldReadFunction<any>,
	requestedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SpaceConnectionDraftKeySpecifier = ('permission' | SpaceConnectionDraftKeySpecifier)[];
export type SpaceConnectionDraftFieldPolicy = {
	permission?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SpaceConnectionsResponseKeySpecifier = ('count' | 'data' | SpaceConnectionsResponseKeySpecifier)[];
export type SpaceConnectionsResponseFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SpaceDraftDataKeySpecifier = ('customPreviewPosition' | 'description' | 'fonts' | 'isCustomPreviewVisible' | 'name' | 'profileImage' | 'profileImageThumbnail' | 'projectType' | 'theme' | 'title' | SpaceDraftDataKeySpecifier)[];
export type SpaceDraftDataFieldPolicy = {
	customPreviewPosition?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	fonts?: FieldPolicy<any> | FieldReadFunction<any>,
	isCustomPreviewVisible?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	profileImage?: FieldPolicy<any> | FieldReadFunction<any>,
	profileImageThumbnail?: FieldPolicy<any> | FieldReadFunction<any>,
	projectType?: FieldPolicy<any> | FieldReadFunction<any>,
	theme?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SpaceOutputKeySpecifier = ('_id' | 'activeInvitation' | 'adsMeta' | 'approvedAt' | 'archivedAt' | 'assignedRole' | 'broadcastEndedAt' | 'broadcastedAt' | 'category' | 'connectionId' | 'connectionRequests' | 'connectionRole' | 'connectionWithNoum' | 'connectionsCount' | 'createdAt' | 'description' | 'draft' | 'editorVersion' | 'elements' | 'elementsForNoumAds' | 'enableAds' | 'favouritedAt' | 'followersCount' | 'fonts' | 'headerBackgroundUrl' | 'institution' | 'isConnected' | 'isFavourited' | 'isFollowing' | 'keywords' | 'lastCustomPreviewSavedTime' | 'lastEditedBy' | 'lastUpdatedAt' | 'layout' | 'link' | 'members' | 'membershipStatus' | 'name' | 'networks' | 'noumTransactionFee' | 'percentCompleted' | 'permission' | 'profileImage' | 'profileImageThumbnail' | 'projectType' | 'publishedAt' | 'recentlyViewedAt' | 'references' | 'requestedAt' | 'slug' | 'spotLight' | 'spotLightForAll' | 'spotLightUserWhiteList' | 'status' | 'tempStatus' | 'theme' | 'title' | 'token' | 'tokenTransaction' | 'type' | 'uid' | 'unSaved' | 'unfavouritedAt' | 'updatedAt' | 'userId' | SpaceOutputKeySpecifier)[];
export type SpaceOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	activeInvitation?: FieldPolicy<any> | FieldReadFunction<any>,
	adsMeta?: FieldPolicy<any> | FieldReadFunction<any>,
	approvedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	archivedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	assignedRole?: FieldPolicy<any> | FieldReadFunction<any>,
	broadcastEndedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	broadcastedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	connectionId?: FieldPolicy<any> | FieldReadFunction<any>,
	connectionRequests?: FieldPolicy<any> | FieldReadFunction<any>,
	connectionRole?: FieldPolicy<any> | FieldReadFunction<any>,
	connectionWithNoum?: FieldPolicy<any> | FieldReadFunction<any>,
	connectionsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	draft?: FieldPolicy<any> | FieldReadFunction<any>,
	editorVersion?: FieldPolicy<any> | FieldReadFunction<any>,
	elements?: FieldPolicy<any> | FieldReadFunction<any>,
	elementsForNoumAds?: FieldPolicy<any> | FieldReadFunction<any>,
	enableAds?: FieldPolicy<any> | FieldReadFunction<any>,
	favouritedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	followersCount?: FieldPolicy<any> | FieldReadFunction<any>,
	fonts?: FieldPolicy<any> | FieldReadFunction<any>,
	headerBackgroundUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	institution?: FieldPolicy<any> | FieldReadFunction<any>,
	isConnected?: FieldPolicy<any> | FieldReadFunction<any>,
	isFavourited?: FieldPolicy<any> | FieldReadFunction<any>,
	isFollowing?: FieldPolicy<any> | FieldReadFunction<any>,
	keywords?: FieldPolicy<any> | FieldReadFunction<any>,
	lastCustomPreviewSavedTime?: FieldPolicy<any> | FieldReadFunction<any>,
	lastEditedBy?: FieldPolicy<any> | FieldReadFunction<any>,
	lastUpdatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	layout?: FieldPolicy<any> | FieldReadFunction<any>,
	link?: FieldPolicy<any> | FieldReadFunction<any>,
	members?: FieldPolicy<any> | FieldReadFunction<any>,
	membershipStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	networks?: FieldPolicy<any> | FieldReadFunction<any>,
	noumTransactionFee?: FieldPolicy<any> | FieldReadFunction<any>,
	percentCompleted?: FieldPolicy<any> | FieldReadFunction<any>,
	permission?: FieldPolicy<any> | FieldReadFunction<any>,
	profileImage?: FieldPolicy<any> | FieldReadFunction<any>,
	profileImageThumbnail?: FieldPolicy<any> | FieldReadFunction<any>,
	projectType?: FieldPolicy<any> | FieldReadFunction<any>,
	publishedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	recentlyViewedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	references?: FieldPolicy<any> | FieldReadFunction<any>,
	requestedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	slug?: FieldPolicy<any> | FieldReadFunction<any>,
	spotLight?: FieldPolicy<any> | FieldReadFunction<any>,
	spotLightForAll?: FieldPolicy<any> | FieldReadFunction<any>,
	spotLightUserWhiteList?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	tempStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	theme?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenTransaction?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	unSaved?: FieldPolicy<any> | FieldReadFunction<any>,
	unfavouritedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SpaceOutputResponseKeySpecifier = ('count' | 'data' | SpaceOutputResponseKeySpecifier)[];
export type SpaceOutputResponseFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SpaceProfileValueKeySpecifier = ('id' | 'name' | 'value' | SpaceProfileValueKeySpecifier)[];
export type SpaceProfileValueFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SpeakerInvitationKeySpecifier = ('invitee' | 'inviter' | SpeakerInvitationKeySpecifier)[];
export type SpeakerInvitationFieldPolicy = {
	invitee?: FieldPolicy<any> | FieldReadFunction<any>,
	inviter?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SpeakerInvitationSubscriptionDataKeySpecifier = ('actionType' | 'inviteeId' | 'inviterId' | SpeakerInvitationSubscriptionDataKeySpecifier)[];
export type SpeakerInvitationSubscriptionDataFieldPolicy = {
	actionType?: FieldPolicy<any> | FieldReadFunction<any>,
	inviteeId?: FieldPolicy<any> | FieldReadFunction<any>,
	inviterId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StandardResponseKeySpecifier = ('error' | 'message' | 'statusCode' | 'success' | StandardResponseKeySpecifier)[];
export type StandardResponseFieldPolicy = {
	error?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	statusCode?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StatementDetailsOutputKeySpecifier = ('accountNumber' | 'amount' | 'createdAt' | 'createdBy' | 'currency' | 'documentName' | 'documentType' | 'dueDate' | 'isPublished' | 'month' | 'pdfDocumentLink' | 'statementId' | 'statementName' | 'statementNotes' | 'updatedAt' | 'updatedBy' | 'year' | StatementDetailsOutputKeySpecifier)[];
export type StatementDetailsOutputFieldPolicy = {
	accountNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	documentName?: FieldPolicy<any> | FieldReadFunction<any>,
	documentType?: FieldPolicy<any> | FieldReadFunction<any>,
	dueDate?: FieldPolicy<any> | FieldReadFunction<any>,
	isPublished?: FieldPolicy<any> | FieldReadFunction<any>,
	month?: FieldPolicy<any> | FieldReadFunction<any>,
	pdfDocumentLink?: FieldPolicy<any> | FieldReadFunction<any>,
	statementId?: FieldPolicy<any> | FieldReadFunction<any>,
	statementName?: FieldPolicy<any> | FieldReadFunction<any>,
	statementNotes?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedBy?: FieldPolicy<any> | FieldReadFunction<any>,
	year?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StripeCardOutputKeySpecifier = ('brand' | 'country' | 'exp_month' | 'exp_year' | 'funding' | 'id' | 'last4' | StripeCardOutputKeySpecifier)[];
export type StripeCardOutputFieldPolicy = {
	brand?: FieldPolicy<any> | FieldReadFunction<any>,
	country?: FieldPolicy<any> | FieldReadFunction<any>,
	exp_month?: FieldPolicy<any> | FieldReadFunction<any>,
	exp_year?: FieldPolicy<any> | FieldReadFunction<any>,
	funding?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	last4?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubSettingCounterOptionsOutputKeySpecifier = ('current' | 'limit' | 'type' | SubSettingCounterOptionsOutputKeySpecifier)[];
export type SubSettingCounterOptionsOutputFieldPolicy = {
	current?: FieldPolicy<any> | FieldReadFunction<any>,
	limit?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubSettingCountersOutputKeySpecifier = ('noumSetup' | SubSettingCountersOutputKeySpecifier)[];
export type SubSettingCountersOutputFieldPolicy = {
	noumSetup?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubSettingNoumCountersOutputKeySpecifier = ('eventAttendees' | 'eventDuration' | 'eventHosted' | 'noumConnections' | 'storage' | SubSettingNoumCountersOutputKeySpecifier)[];
export type SubSettingNoumCountersOutputFieldPolicy = {
	eventAttendees?: FieldPolicy<any> | FieldReadFunction<any>,
	eventDuration?: FieldPolicy<any> | FieldReadFunction<any>,
	eventHosted?: FieldPolicy<any> | FieldReadFunction<any>,
	noumConnections?: FieldPolicy<any> | FieldReadFunction<any>,
	storage?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubSettingOutputKeySpecifier = ('description' | 'financialProducts' | 'homeNoumSetting' | 'item_id' | 'learningProducts' | 'menuItems' | 'metadata' | 'noumSetting' | 'permissions' | 'plan_setting_id' | 'transactionInfo' | SubSettingOutputKeySpecifier)[];
export type SubSettingOutputFieldPolicy = {
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	financialProducts?: FieldPolicy<any> | FieldReadFunction<any>,
	homeNoumSetting?: FieldPolicy<any> | FieldReadFunction<any>,
	item_id?: FieldPolicy<any> | FieldReadFunction<any>,
	learningProducts?: FieldPolicy<any> | FieldReadFunction<any>,
	menuItems?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	noumSetting?: FieldPolicy<any> | FieldReadFunction<any>,
	permissions?: FieldPolicy<any> | FieldReadFunction<any>,
	plan_setting_id?: FieldPolicy<any> | FieldReadFunction<any>,
	transactionInfo?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubWalletBalanceKeySpecifier = ('amount' | 'id' | 'masterWalletId' | SubWalletBalanceKeySpecifier)[];
export type SubWalletBalanceFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	masterWalletId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionKeySpecifier = ('events' | 'groupClosed' | 'groupDeleted' | 'knockAccepted' | 'knockUpdates' | 'muteSpeaker' | 'newAttendeeOnGroup' | 'newAttendeeOnSocialHall' | 'newGroup' | 'newKnockResponse' | 'newKnockToGroup' | 'newKnockToUser' | 'notification' | 'quitAttendeeOnGroup' | 'quitAttendeeOnSocialHall' | 'raisedHand' | 'socialHallUpdates' | 'speakerInvitation' | 'subscribeGroupEvent' | 'subscribeSocialHall' | 'updateGroupName' | SubscriptionKeySpecifier)[];
export type SubscriptionFieldPolicy = {
	events?: FieldPolicy<any> | FieldReadFunction<any>,
	groupClosed?: FieldPolicy<any> | FieldReadFunction<any>,
	groupDeleted?: FieldPolicy<any> | FieldReadFunction<any>,
	knockAccepted?: FieldPolicy<any> | FieldReadFunction<any>,
	knockUpdates?: FieldPolicy<any> | FieldReadFunction<any>,
	muteSpeaker?: FieldPolicy<any> | FieldReadFunction<any>,
	newAttendeeOnGroup?: FieldPolicy<any> | FieldReadFunction<any>,
	newAttendeeOnSocialHall?: FieldPolicy<any> | FieldReadFunction<any>,
	newGroup?: FieldPolicy<any> | FieldReadFunction<any>,
	newKnockResponse?: FieldPolicy<any> | FieldReadFunction<any>,
	newKnockToGroup?: FieldPolicy<any> | FieldReadFunction<any>,
	newKnockToUser?: FieldPolicy<any> | FieldReadFunction<any>,
	notification?: FieldPolicy<any> | FieldReadFunction<any>,
	quitAttendeeOnGroup?: FieldPolicy<any> | FieldReadFunction<any>,
	quitAttendeeOnSocialHall?: FieldPolicy<any> | FieldReadFunction<any>,
	raisedHand?: FieldPolicy<any> | FieldReadFunction<any>,
	socialHallUpdates?: FieldPolicy<any> | FieldReadFunction<any>,
	speakerInvitation?: FieldPolicy<any> | FieldReadFunction<any>,
	subscribeGroupEvent?: FieldPolicy<any> | FieldReadFunction<any>,
	subscribeSocialHall?: FieldPolicy<any> | FieldReadFunction<any>,
	updateGroupName?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionOutputKeySpecifier = ('activated_at' | 'billing_cycles' | 'billing_period' | 'billing_period_unit' | 'cancel_schedule_created_at' | 'cancelled_at' | 'card_funding_type' | 'card_last4' | 'card_masked_number' | 'card_status' | 'card_type' | 'counters' | 'created_at' | 'current_term_end' | 'current_term_start' | 'external_created_at' | 'external_customer_id' | 'external_status' | 'external_subscription_id' | 'external_updated_at' | 'home_noum_counters' | 'hosted_page_id' | 'is_cancelled' | 'item_price_id' | 'next_billing_at' | 'noum_counters' | 'plan_category' | 'plan_id' | 'plan_name' | 'plan_order' | 'plan_price' | 'plan_type' | 'plan_validity_months' | 'remaining_billing_cycles' | 'settings' | 'started_at' | 'status' | 'subscription_id' | 'trial_end' | 'trial_start' | 'uid' | 'unit_price' | 'updated_at' | 'valid_till' | SubscriptionOutputKeySpecifier)[];
export type SubscriptionOutputFieldPolicy = {
	activated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	billing_cycles?: FieldPolicy<any> | FieldReadFunction<any>,
	billing_period?: FieldPolicy<any> | FieldReadFunction<any>,
	billing_period_unit?: FieldPolicy<any> | FieldReadFunction<any>,
	cancel_schedule_created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	cancelled_at?: FieldPolicy<any> | FieldReadFunction<any>,
	card_funding_type?: FieldPolicy<any> | FieldReadFunction<any>,
	card_last4?: FieldPolicy<any> | FieldReadFunction<any>,
	card_masked_number?: FieldPolicy<any> | FieldReadFunction<any>,
	card_status?: FieldPolicy<any> | FieldReadFunction<any>,
	card_type?: FieldPolicy<any> | FieldReadFunction<any>,
	counters?: FieldPolicy<any> | FieldReadFunction<any>,
	created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	current_term_end?: FieldPolicy<any> | FieldReadFunction<any>,
	current_term_start?: FieldPolicy<any> | FieldReadFunction<any>,
	external_created_at?: FieldPolicy<any> | FieldReadFunction<any>,
	external_customer_id?: FieldPolicy<any> | FieldReadFunction<any>,
	external_status?: FieldPolicy<any> | FieldReadFunction<any>,
	external_subscription_id?: FieldPolicy<any> | FieldReadFunction<any>,
	external_updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	home_noum_counters?: FieldPolicy<any> | FieldReadFunction<any>,
	hosted_page_id?: FieldPolicy<any> | FieldReadFunction<any>,
	is_cancelled?: FieldPolicy<any> | FieldReadFunction<any>,
	item_price_id?: FieldPolicy<any> | FieldReadFunction<any>,
	next_billing_at?: FieldPolicy<any> | FieldReadFunction<any>,
	noum_counters?: FieldPolicy<any> | FieldReadFunction<any>,
	plan_category?: FieldPolicy<any> | FieldReadFunction<any>,
	plan_id?: FieldPolicy<any> | FieldReadFunction<any>,
	plan_name?: FieldPolicy<any> | FieldReadFunction<any>,
	plan_order?: FieldPolicy<any> | FieldReadFunction<any>,
	plan_price?: FieldPolicy<any> | FieldReadFunction<any>,
	plan_type?: FieldPolicy<any> | FieldReadFunction<any>,
	plan_validity_months?: FieldPolicy<any> | FieldReadFunction<any>,
	remaining_billing_cycles?: FieldPolicy<any> | FieldReadFunction<any>,
	settings?: FieldPolicy<any> | FieldReadFunction<any>,
	started_at?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	subscription_id?: FieldPolicy<any> | FieldReadFunction<any>,
	trial_end?: FieldPolicy<any> | FieldReadFunction<any>,
	trial_start?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	unit_price?: FieldPolicy<any> | FieldReadFunction<any>,
	updated_at?: FieldPolicy<any> | FieldReadFunction<any>,
	valid_till?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SubscriptionTypesKeySpecifier = ('events' | 'marketing' | 'messagesAndConnections' | 'paymentsAndOTPs' | 'postAndCommentMentions' | SubscriptionTypesKeySpecifier)[];
export type SubscriptionTypesFieldPolicy = {
	events?: FieldPolicy<any> | FieldReadFunction<any>,
	marketing?: FieldPolicy<any> | FieldReadFunction<any>,
	messagesAndConnections?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentsAndOTPs?: FieldPolicy<any> | FieldReadFunction<any>,
	postAndCommentMentions?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SuccessMessageOutputKeySpecifier = ('message' | 'success' | SuccessMessageOutputKeySpecifier)[];
export type SuccessMessageOutputFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SurveryAnswerPageKeySpecifier = ('next' | 'pageId' | 'previous' | SurveryAnswerPageKeySpecifier)[];
export type SurveryAnswerPageFieldPolicy = {
	next?: FieldPolicy<any> | FieldReadFunction<any>,
	pageId?: FieldPolicy<any> | FieldReadFunction<any>,
	previous?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SurveyKeySpecifier = ('_id' | 'active' | 'allowNavigation' | 'createdAt' | 'description' | 'pageCount' | 'pages' | 'questionCount' | 'tags' | 'title' | 'updatedAt' | SurveyKeySpecifier)[];
export type SurveyFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	active?: FieldPolicy<any> | FieldReadFunction<any>,
	allowNavigation?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	pageCount?: FieldPolicy<any> | FieldReadFunction<any>,
	pages?: FieldPolicy<any> | FieldReadFunction<any>,
	questionCount?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SurveyAnswerKeySpecifier = ('_id' | 'answers' | 'createdAt' | 'lastSubmitted' | 'pages' | 'survey' | 'uid' | 'updatedAt' | SurveyAnswerKeySpecifier)[];
export type SurveyAnswerFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	answers?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	lastSubmitted?: FieldPolicy<any> | FieldReadFunction<any>,
	pages?: FieldPolicy<any> | FieldReadFunction<any>,
	survey?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SurveyOutputGetAllKeySpecifier = ('count' | 'data' | SurveyOutputGetAllKeySpecifier)[];
export type SurveyOutputGetAllFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SurveyPageKeySpecifier = ('_id' | 'createdAt' | 'description' | 'isDeleted' | 'position' | 'questionCount' | 'questions' | 'rules' | 'survey' | 'title' | 'updatedAt' | SurveyPageKeySpecifier)[];
export type SurveyPageFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	isDeleted?: FieldPolicy<any> | FieldReadFunction<any>,
	position?: FieldPolicy<any> | FieldReadFunction<any>,
	questionCount?: FieldPolicy<any> | FieldReadFunction<any>,
	questions?: FieldPolicy<any> | FieldReadFunction<any>,
	rules?: FieldPolicy<any> | FieldReadFunction<any>,
	survey?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SurveyPageRuleKeySpecifier = ('goto' | 'operator' | 'values' | SurveyPageRuleKeySpecifier)[];
export type SurveyPageRuleFieldPolicy = {
	goto?: FieldPolicy<any> | FieldReadFunction<any>,
	operator?: FieldPolicy<any> | FieldReadFunction<any>,
	values?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SurveyPageRuleValuesKeySpecifier = ('qid' | 'value' | SurveyPageRuleValuesKeySpecifier)[];
export type SurveyPageRuleValuesFieldPolicy = {
	qid?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SurveyQuestionKeySpecifier = ('explainerText' | 'helperText' | 'id' | 'position' | 'text' | 'type' | SurveyQuestionKeySpecifier)[];
export type SurveyQuestionFieldPolicy = {
	explainerText?: FieldPolicy<any> | FieldReadFunction<any>,
	helperText?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	position?: FieldPolicy<any> | FieldReadFunction<any>,
	text?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SurveyQuestionTypeKeySpecifier = ('input' | 'multiSelect' | 'select' | SurveyQuestionTypeKeySpecifier)[];
export type SurveyQuestionTypeFieldPolicy = {
	input?: FieldPolicy<any> | FieldReadFunction<any>,
	multiSelect?: FieldPolicy<any> | FieldReadFunction<any>,
	select?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SurveyQuestionTypeInputKeySpecifier = ('label' | 'subType' | 'validation' | SurveyQuestionTypeInputKeySpecifier)[];
export type SurveyQuestionTypeInputFieldPolicy = {
	label?: FieldPolicy<any> | FieldReadFunction<any>,
	subType?: FieldPolicy<any> | FieldReadFunction<any>,
	validation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SurveyQuestionTypeMultiSelectKeySpecifier = ('defaultOptions' | 'label' | 'options' | 'presentation' | 'subType' | 'validation' | SurveyQuestionTypeMultiSelectKeySpecifier)[];
export type SurveyQuestionTypeMultiSelectFieldPolicy = {
	defaultOptions?: FieldPolicy<any> | FieldReadFunction<any>,
	label?: FieldPolicy<any> | FieldReadFunction<any>,
	options?: FieldPolicy<any> | FieldReadFunction<any>,
	presentation?: FieldPolicy<any> | FieldReadFunction<any>,
	subType?: FieldPolicy<any> | FieldReadFunction<any>,
	validation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SurveyQuestionTypeOptionKeySpecifier = ('description' | 'id' | 'position' | 'title' | SurveyQuestionTypeOptionKeySpecifier)[];
export type SurveyQuestionTypeOptionFieldPolicy = {
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	position?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SurveyQuestionTypeSelectKeySpecifier = ('defaultOption' | 'label' | 'options' | 'presentation' | 'subType' | 'validation' | SurveyQuestionTypeSelectKeySpecifier)[];
export type SurveyQuestionTypeSelectFieldPolicy = {
	defaultOption?: FieldPolicy<any> | FieldReadFunction<any>,
	label?: FieldPolicy<any> | FieldReadFunction<any>,
	options?: FieldPolicy<any> | FieldReadFunction<any>,
	presentation?: FieldPolicy<any> | FieldReadFunction<any>,
	subType?: FieldPolicy<any> | FieldReadFunction<any>,
	validation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SurveyQuestionTypeValidationKeySpecifier = ('max' | 'min' | 'required' | SurveyQuestionTypeValidationKeySpecifier)[];
export type SurveyQuestionTypeValidationFieldPolicy = {
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>,
	required?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TagKeySpecifier = ('uid' | TagKeySpecifier)[];
export type TagFieldPolicy = {
	uid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TagsOutputKeySpecifier = ('groupId' | 'uid' | TagsOutputKeySpecifier)[];
export type TagsOutputFieldPolicy = {
	groupId?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TestDataOutputKeySpecifier = ('ageCheck' | 'creditCheck' | 'fixedExpenseCheck' | 'freeLanceQuestionsCheck' | 'gamingDebtCheck' | 'identityCheck' | 'minimumEarningCheck' | 'overdrawCheck' | 'reasons' | 'result' | 'user' | TestDataOutputKeySpecifier)[];
export type TestDataOutputFieldPolicy = {
	ageCheck?: FieldPolicy<any> | FieldReadFunction<any>,
	creditCheck?: FieldPolicy<any> | FieldReadFunction<any>,
	fixedExpenseCheck?: FieldPolicy<any> | FieldReadFunction<any>,
	freeLanceQuestionsCheck?: FieldPolicy<any> | FieldReadFunction<any>,
	gamingDebtCheck?: FieldPolicy<any> | FieldReadFunction<any>,
	identityCheck?: FieldPolicy<any> | FieldReadFunction<any>,
	minimumEarningCheck?: FieldPolicy<any> | FieldReadFunction<any>,
	overdrawCheck?: FieldPolicy<any> | FieldReadFunction<any>,
	reasons?: FieldPolicy<any> | FieldReadFunction<any>,
	result?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ThemeColorsKeySpecifier = ('error' | 'gray' | 'miscColors' | 'noums' | 'primary' | 'secondary' | 'success' | ThemeColorsKeySpecifier)[];
export type ThemeColorsFieldPolicy = {
	error?: FieldPolicy<any> | FieldReadFunction<any>,
	gray?: FieldPolicy<any> | FieldReadFunction<any>,
	miscColors?: FieldPolicy<any> | FieldReadFunction<any>,
	noums?: FieldPolicy<any> | FieldReadFunction<any>,
	primary?: FieldPolicy<any> | FieldReadFunction<any>,
	secondary?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ThemeOutputKeySpecifier = ('_id' | 'colors' | 'name' | ThemeOutputKeySpecifier)[];
export type ThemeOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	colors?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ThemeOutputResponseKeySpecifier = ('count' | 'data' | ThemeOutputResponseKeySpecifier)[];
export type ThemeOutputResponseFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ThreadOutputKeySpecifier = ('_id' | 'content' | 'createdAt' | 'reactions' | 'tags' | 'uid' | ThreadOutputKeySpecifier)[];
export type ThreadOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	content?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	reactions?: FieldPolicy<any> | FieldReadFunction<any>,
	tags?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ThreadUserKeySpecifier = ('_id' | ThreadUserKeySpecifier)[];
export type ThreadUserFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TimezoneKeySpecifier = ('_id' | 'abbr' | 'isdst' | 'offset' | 'text' | 'timezone' | 'utcOffset' | 'value' | TimezoneKeySpecifier)[];
export type TimezoneFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	abbr?: FieldPolicy<any> | FieldReadFunction<any>,
	isdst?: FieldPolicy<any> | FieldReadFunction<any>,
	offset?: FieldPolicy<any> | FieldReadFunction<any>,
	text?: FieldPolicy<any> | FieldReadFunction<any>,
	timezone?: FieldPolicy<any> | FieldReadFunction<any>,
	utcOffset?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TipOutputKeySpecifier = ('amount' | 'description' | 'tipBy' | TipOutputKeySpecifier)[];
export type TipOutputFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	tipBy?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TokenKeySpecifier = ('_id' | 'count' | 'walletId' | TokenKeySpecifier)[];
export type TokenFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	walletId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TokenArchiveKeySpecifier = ('createdAt' | 'fromDate' | 'id' | 'records' | 'tillDate' | TokenArchiveKeySpecifier)[];
export type TokenArchiveFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	fromDate?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	records?: FieldPolicy<any> | FieldReadFunction<any>,
	tillDate?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TokenArchiveOutputKeySpecifier = ('count' | 'data' | TokenArchiveOutputKeySpecifier)[];
export type TokenArchiveOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TokenLedgerKeySpecifier = ('chamberId' | 'count' | 'createdAt' | 'id' | 'updatedAt' | 'walletId' | TokenLedgerKeySpecifier)[];
export type TokenLedgerFieldPolicy = {
	chamberId?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	walletId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TokenTransactionKeySpecifier = ('chamberId' | 'data' | TokenTransactionKeySpecifier)[];
export type TokenTransactionFieldPolicy = {
	chamberId?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TokenTransactionDetailsKeySpecifier = ('activityType' | 'chamberId' | 'countIssued' | 'dateOfIssue' | 'remainingCount' | TokenTransactionDetailsKeySpecifier)[];
export type TokenTransactionDetailsFieldPolicy = {
	activityType?: FieldPolicy<any> | FieldReadFunction<any>,
	chamberId?: FieldPolicy<any> | FieldReadFunction<any>,
	countIssued?: FieldPolicy<any> | FieldReadFunction<any>,
	dateOfIssue?: FieldPolicy<any> | FieldReadFunction<any>,
	remainingCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TokenTransactionHistoryKeySpecifier = ('count' | 'data' | TokenTransactionHistoryKeySpecifier)[];
export type TokenTransactionHistoryFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TokenTransactionTypeKeySpecifier = ('activityType' | 'count' | 'createdAt' | 'id' | 'message' | 'refId' | 'refType' | TokenTransactionTypeKeySpecifier)[];
export type TokenTransactionTypeFieldPolicy = {
	activityType?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	refId?: FieldPolicy<any> | FieldReadFunction<any>,
	refType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TransactionAddressOutputKeySpecifier = ('first_name' | 'last_name' | 'physical_address' | TransactionAddressOutputKeySpecifier)[];
export type TransactionAddressOutputFieldPolicy = {
	first_name?: FieldPolicy<any> | FieldReadFunction<any>,
	last_name?: FieldPolicy<any> | FieldReadFunction<any>,
	physical_address?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TransactionAddressPhysicalAddressOutputKeySpecifier = ('postal_code' | TransactionAddressPhysicalAddressOutputKeySpecifier)[];
export type TransactionAddressPhysicalAddressOutputFieldPolicy = {
	postal_code?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TransactionEcheckOutputKeySpecifier = ('account_holder' | 'account_type' | 'last_4_account_number' | 'masked_account_number' | 'routing_number' | 'sec_code' | TransactionEcheckOutputKeySpecifier)[];
export type TransactionEcheckOutputFieldPolicy = {
	account_holder?: FieldPolicy<any> | FieldReadFunction<any>,
	account_type?: FieldPolicy<any> | FieldReadFunction<any>,
	last_4_account_number?: FieldPolicy<any> | FieldReadFunction<any>,
	masked_account_number?: FieldPolicy<any> | FieldReadFunction<any>,
	routing_number?: FieldPolicy<any> | FieldReadFunction<any>,
	sec_code?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TransactionFlagHistoryForAdminKeySpecifier = ('date' | 'new' | 'old' | 'userId' | TransactionFlagHistoryForAdminKeySpecifier)[];
export type TransactionFlagHistoryForAdminFieldPolicy = {
	date?: FieldPolicy<any> | FieldReadFunction<any>,
	new?: FieldPolicy<any> | FieldReadFunction<any>,
	old?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TransactionLinksOutputKeySpecifier = ('disputes' | 'self' | 'settlements' | TransactionLinksOutputKeySpecifier)[];
export type TransactionLinksOutputFieldPolicy = {
	disputes?: FieldPolicy<any> | FieldReadFunction<any>,
	self?: FieldPolicy<any> | FieldReadFunction<any>,
	settlements?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TransactionModelKeySpecifier = ('id' | 'income' | 'month' | TransactionModelKeySpecifier)[];
export type TransactionModelFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	income?: FieldPolicy<any> | FieldReadFunction<any>,
	month?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TransactionOutputKeySpecifier = ('action' | 'authorization_amount' | 'authorization_code' | 'billing_address' | 'echeck' | 'entered_by' | 'links' | 'location_id' | 'response' | 'transaction_id' | TransactionOutputKeySpecifier)[];
export type TransactionOutputFieldPolicy = {
	action?: FieldPolicy<any> | FieldReadFunction<any>,
	authorization_amount?: FieldPolicy<any> | FieldReadFunction<any>,
	authorization_code?: FieldPolicy<any> | FieldReadFunction<any>,
	billing_address?: FieldPolicy<any> | FieldReadFunction<any>,
	echeck?: FieldPolicy<any> | FieldReadFunction<any>,
	entered_by?: FieldPolicy<any> | FieldReadFunction<any>,
	links?: FieldPolicy<any> | FieldReadFunction<any>,
	location_id?: FieldPolicy<any> | FieldReadFunction<any>,
	response?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TransactionResourceSpecificationKeySpecifier = ('end_received_date' | 'location_id' | 'start_received_date' | TransactionResourceSpecificationKeySpecifier)[];
export type TransactionResourceSpecificationFieldPolicy = {
	end_received_date?: FieldPolicy<any> | FieldReadFunction<any>,
	location_id?: FieldPolicy<any> | FieldReadFunction<any>,
	start_received_date?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TransactionResponseOutputKeySpecifier = ('authorization_code' | 'environment' | 'preauth_desc' | 'preauth_result' | 'response_code' | 'response_desc' | 'response_type' | TransactionResponseOutputKeySpecifier)[];
export type TransactionResponseOutputFieldPolicy = {
	authorization_code?: FieldPolicy<any> | FieldReadFunction<any>,
	environment?: FieldPolicy<any> | FieldReadFunction<any>,
	preauth_desc?: FieldPolicy<any> | FieldReadFunction<any>,
	preauth_result?: FieldPolicy<any> | FieldReadFunction<any>,
	response_code?: FieldPolicy<any> | FieldReadFunction<any>,
	response_desc?: FieldPolicy<any> | FieldReadFunction<any>,
	response_type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TransactionsSearchCriteriaKeySpecifier = ('home_organization_id' | 'page_index' | 'page_size' | 'resource_specific' | TransactionsSearchCriteriaKeySpecifier)[];
export type TransactionsSearchCriteriaFieldPolicy = {
	home_organization_id?: FieldPolicy<any> | FieldReadFunction<any>,
	page_index?: FieldPolicy<any> | FieldReadFunction<any>,
	page_size?: FieldPolicy<any> | FieldReadFunction<any>,
	resource_specific?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TransferDetailKeySpecifier = ('accountName' | 'accountType' | 'chamber' | 'chamberId' | 'maskNumber' | 'name' | TransferDetailKeySpecifier)[];
export type TransferDetailFieldPolicy = {
	accountName?: FieldPolicy<any> | FieldReadFunction<any>,
	accountType?: FieldPolicy<any> | FieldReadFunction<any>,
	chamber?: FieldPolicy<any> | FieldReadFunction<any>,
	chamberId?: FieldPolicy<any> | FieldReadFunction<any>,
	maskNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TwilioTokenOutputKeySpecifier = ('token' | TwilioTokenOutputKeySpecifier)[];
export type TwilioTokenOutputFieldPolicy = {
	token?: FieldPolicy<any> | FieldReadFunction<any>
};
export type URLOutputKeySpecifier = ('url' | URLOutputKeySpecifier)[];
export type URLOutputFieldPolicy = {
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UnderwritingCsvReportOutputKeySpecifier = ('count' | 'data' | UnderwritingCsvReportOutputKeySpecifier)[];
export type UnderwritingCsvReportOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UnderwritingCsvReportOutputDataKeySpecifier = ('_id' | 'createdAt' | 'filters' | 'stage' | 'status' | 'updatedAt' | UnderwritingCsvReportOutputDataKeySpecifier)[];
export type UnderwritingCsvReportOutputDataFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	filters?: FieldPolicy<any> | FieldReadFunction<any>,
	stage?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UnderwritingDervDatapointKeySpecifier = ('description' | 'key' | 'name' | 'type' | UnderwritingDervDatapointKeySpecifier)[];
export type UnderwritingDervDatapointFieldPolicy = {
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	key?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UnderwritingMutationsKeySpecifier = ('businessSearch' | 'plaidAssets' | 'plaidTransaction' | 'runScoringReport' | UnderwritingMutationsKeySpecifier)[];
export type UnderwritingMutationsFieldPolicy = {
	businessSearch?: FieldPolicy<any> | FieldReadFunction<any>,
	plaidAssets?: FieldPolicy<any> | FieldReadFunction<any>,
	plaidTransaction?: FieldPolicy<any> | FieldReadFunction<any>,
	runScoringReport?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UnderwritingQueriesKeySpecifier = ('assetReportsByUser' | 'availableDervDatapoints' | 'calculateMonthlyObligationRatio' | 'distinctScoringReportUserList' | 'lastBusinessReportForCompany' | 'lastBusinessReportForCustomer' | 'lastBusinessReportForUser' | 'lastPlaidAssetReportForUser' | 'lastPlaidTransactionReportForUser' | 'lastReportForNoRelationBusiness' | 'lastScoringReportForCustomer' | 'lastScoringReportForUser' | 'noRelationBusinessAvailable' | 'ping' | 'scoringReportsByCustomer' | 'scoringReportsByUser' | 'transactionReportsByUser' | UnderwritingQueriesKeySpecifier)[];
export type UnderwritingQueriesFieldPolicy = {
	assetReportsByUser?: FieldPolicy<any> | FieldReadFunction<any>,
	availableDervDatapoints?: FieldPolicy<any> | FieldReadFunction<any>,
	calculateMonthlyObligationRatio?: FieldPolicy<any> | FieldReadFunction<any>,
	distinctScoringReportUserList?: FieldPolicy<any> | FieldReadFunction<any>,
	lastBusinessReportForCompany?: FieldPolicy<any> | FieldReadFunction<any>,
	lastBusinessReportForCustomer?: FieldPolicy<any> | FieldReadFunction<any>,
	lastBusinessReportForUser?: FieldPolicy<any> | FieldReadFunction<any>,
	lastPlaidAssetReportForUser?: FieldPolicy<any> | FieldReadFunction<any>,
	lastPlaidTransactionReportForUser?: FieldPolicy<any> | FieldReadFunction<any>,
	lastReportForNoRelationBusiness?: FieldPolicy<any> | FieldReadFunction<any>,
	lastScoringReportForCustomer?: FieldPolicy<any> | FieldReadFunction<any>,
	lastScoringReportForUser?: FieldPolicy<any> | FieldReadFunction<any>,
	noRelationBusinessAvailable?: FieldPolicy<any> | FieldReadFunction<any>,
	ping?: FieldPolicy<any> | FieldReadFunction<any>,
	scoringReportsByCustomer?: FieldPolicy<any> | FieldReadFunction<any>,
	scoringReportsByUser?: FieldPolicy<any> | FieldReadFunction<any>,
	transactionReportsByUser?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UnderwritingScoringReportKeySpecifier = ('createdAt' | 'datasources' | 'id' | 'input' | 'modules' | 'user' | UnderwritingScoringReportKeySpecifier)[];
export type UnderwritingScoringReportFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	datasources?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	input?: FieldPolicy<any> | FieldReadFunction<any>,
	modules?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UnderwritingScoringReportInputKeySpecifier = ('address' | 'city' | 'customerId' | 'dob' | 'firstName' | 'lastName' | 'ssn' | 'state' | 'userId' | 'zipCode' | UnderwritingScoringReportInputKeySpecifier)[];
export type UnderwritingScoringReportInputFieldPolicy = {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	city?: FieldPolicy<any> | FieldReadFunction<any>,
	customerId?: FieldPolicy<any> | FieldReadFunction<any>,
	dob?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	ssn?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>,
	zipCode?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UnderwritingScoringReportListKeySpecifier = ('count' | 'data' | UnderwritingScoringReportListKeySpecifier)[];
export type UnderwritingScoringReportListFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UniqueSkillKeySpecifier = ('type' | 'values' | UniqueSkillKeySpecifier)[];
export type UniqueSkillFieldPolicy = {
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	values?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UniqueToolStatusKeySpecifier = ('isAlreadyUsed' | 'toolType' | UniqueToolStatusKeySpecifier)[];
export type UniqueToolStatusFieldPolicy = {
	isAlreadyUsed?: FieldPolicy<any> | FieldReadFunction<any>,
	toolType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UnreadNotificationCountKeySpecifier = ('Community' | 'Money' | 'Noums' | 'Other' | 'total' | UnreadNotificationCountKeySpecifier)[];
export type UnreadNotificationCountFieldPolicy = {
	Community?: FieldPolicy<any> | FieldReadFunction<any>,
	Money?: FieldPolicy<any> | FieldReadFunction<any>,
	Noums?: FieldPolicy<any> | FieldReadFunction<any>,
	Other?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('SocialHallTCAccepted' | '_id' | 'ageGroup' | 'bio' | 'chamber' | 'citizenship' | 'connections' | 'contact' | 'createdAt' | 'credentials' | 'dob' | 'email' | 'firstName' | 'freelancingExperience' | 'getInvite' | 'isAcceptedSkipMediaTesting' | 'isPhoneVerified' | 'lastCheckedNotificationsDate' | 'lastName' | 'location' | 'metadata' | 'middleName' | 'numericUserId' | 'paymentTCAccepted' | 'permissions' | 'phone' | 'profile' | 'referralCode' | 'roles' | 'sendInvite' | 'skills' | 'status' | 'title' | 'unreadConnectionCount' | 'usedReferralCodeOwnerName' | 'userAddress' | 'userOwnReferralCode' | 'userSocialHall' | 'userStatus' | 'userType' | 'username' | 'visibility' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	SocialHallTCAccepted?: FieldPolicy<any> | FieldReadFunction<any>,
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	ageGroup?: FieldPolicy<any> | FieldReadFunction<any>,
	bio?: FieldPolicy<any> | FieldReadFunction<any>,
	chamber?: FieldPolicy<any> | FieldReadFunction<any>,
	citizenship?: FieldPolicy<any> | FieldReadFunction<any>,
	connections?: FieldPolicy<any> | FieldReadFunction<any>,
	contact?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	credentials?: FieldPolicy<any> | FieldReadFunction<any>,
	dob?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	freelancingExperience?: FieldPolicy<any> | FieldReadFunction<any>,
	getInvite?: FieldPolicy<any> | FieldReadFunction<any>,
	isAcceptedSkipMediaTesting?: FieldPolicy<any> | FieldReadFunction<any>,
	isPhoneVerified?: FieldPolicy<any> | FieldReadFunction<any>,
	lastCheckedNotificationsDate?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	location?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	middleName?: FieldPolicy<any> | FieldReadFunction<any>,
	numericUserId?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentTCAccepted?: FieldPolicy<any> | FieldReadFunction<any>,
	permissions?: FieldPolicy<any> | FieldReadFunction<any>,
	phone?: FieldPolicy<any> | FieldReadFunction<any>,
	profile?: FieldPolicy<any> | FieldReadFunction<any>,
	referralCode?: FieldPolicy<any> | FieldReadFunction<any>,
	roles?: FieldPolicy<any> | FieldReadFunction<any>,
	sendInvite?: FieldPolicy<any> | FieldReadFunction<any>,
	skills?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	unreadConnectionCount?: FieldPolicy<any> | FieldReadFunction<any>,
	usedReferralCodeOwnerName?: FieldPolicy<any> | FieldReadFunction<any>,
	userAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	userOwnReferralCode?: FieldPolicy<any> | FieldReadFunction<any>,
	userSocialHall?: FieldPolicy<any> | FieldReadFunction<any>,
	userStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	userType?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>,
	visibility?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserAccessDataKeySpecifier = ('accountNumber' | 'accountSubType' | 'accountType' | 'debitAccount' | 'institutionId' | 'institutionName' | 'logo' | 'routingNumber' | UserAccessDataKeySpecifier)[];
export type UserAccessDataFieldPolicy = {
	accountNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	accountSubType?: FieldPolicy<any> | FieldReadFunction<any>,
	accountType?: FieldPolicy<any> | FieldReadFunction<any>,
	debitAccount?: FieldPolicy<any> | FieldReadFunction<any>,
	institutionId?: FieldPolicy<any> | FieldReadFunction<any>,
	institutionName?: FieldPolicy<any> | FieldReadFunction<any>,
	logo?: FieldPolicy<any> | FieldReadFunction<any>,
	routingNumber?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserActionLogKeySpecifier = ('lastCheckedMessagesDate' | 'lastCheckedNotificationsDate' | UserActionLogKeySpecifier)[];
export type UserActionLogFieldPolicy = {
	lastCheckedMessagesDate?: FieldPolicy<any> | FieldReadFunction<any>,
	lastCheckedNotificationsDate?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserBankLinkOutputKeySpecifier = ('code' | 'message' | 'status' | UserBankLinkOutputKeySpecifier)[];
export type UserBankLinkOutputFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserConfigOutputKeySpecifier = ('docScanCompleted' | 'freelancingQuestions' | 'idScanFlag' | 'identityVerified' | 'industries' | 'tempILILIMIT' | UserConfigOutputKeySpecifier)[];
export type UserConfigOutputFieldPolicy = {
	docScanCompleted?: FieldPolicy<any> | FieldReadFunction<any>,
	freelancingQuestions?: FieldPolicy<any> | FieldReadFunction<any>,
	idScanFlag?: FieldPolicy<any> | FieldReadFunction<any>,
	identityVerified?: FieldPolicy<any> | FieldReadFunction<any>,
	industries?: FieldPolicy<any> | FieldReadFunction<any>,
	tempILILIMIT?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserConnectionGroupsIdKeySpecifier = ('connectionIds' | 'groupIds' | UserConnectionGroupsIdKeySpecifier)[];
export type UserConnectionGroupsIdFieldPolicy = {
	connectionIds?: FieldPolicy<any> | FieldReadFunction<any>,
	groupIds?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserContractOutputKeySpecifier = ('accountNumber' | 'applicationId' | 'applicationName' | 'approvedInvestmentAmount' | 'documents' | 'effectiveDate' | 'initialMonthlyIncome' | 'maximumIncomePaymentRate' | 'maximumInvestmentReturn' | 'productCode' | UserContractOutputKeySpecifier)[];
export type UserContractOutputFieldPolicy = {
	accountNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	applicationId?: FieldPolicy<any> | FieldReadFunction<any>,
	applicationName?: FieldPolicy<any> | FieldReadFunction<any>,
	approvedInvestmentAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	documents?: FieldPolicy<any> | FieldReadFunction<any>,
	effectiveDate?: FieldPolicy<any> | FieldReadFunction<any>,
	initialMonthlyIncome?: FieldPolicy<any> | FieldReadFunction<any>,
	maximumIncomePaymentRate?: FieldPolicy<any> | FieldReadFunction<any>,
	maximumInvestmentReturn?: FieldPolicy<any> | FieldReadFunction<any>,
	productCode?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserCredentialsOutputKeySpecifier = ('providerType' | UserCredentialsOutputKeySpecifier)[];
export type UserCredentialsOutputFieldPolicy = {
	providerType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserDataOutputKeySpecifier = ('address' | 'applicationStatus' | 'averageMonthlyExpense' | 'averageMonthlyIncome' | 'bestMonthlyIncome' | 'dob' | 'docuSignRedirectURL' | 'email' | 'firstName' | 'incomeFromTaxReturn' | 'industry' | 'isUSResident' | 'lastName' | 'middleName' | 'phone' | 'questionAnswers' | 'ssn' | 'taxEndPeriod' | 'worstMonthlyIncome' | UserDataOutputKeySpecifier)[];
export type UserDataOutputFieldPolicy = {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	applicationStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	averageMonthlyExpense?: FieldPolicy<any> | FieldReadFunction<any>,
	averageMonthlyIncome?: FieldPolicy<any> | FieldReadFunction<any>,
	bestMonthlyIncome?: FieldPolicy<any> | FieldReadFunction<any>,
	dob?: FieldPolicy<any> | FieldReadFunction<any>,
	docuSignRedirectURL?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	incomeFromTaxReturn?: FieldPolicy<any> | FieldReadFunction<any>,
	industry?: FieldPolicy<any> | FieldReadFunction<any>,
	isUSResident?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	middleName?: FieldPolicy<any> | FieldReadFunction<any>,
	phone?: FieldPolicy<any> | FieldReadFunction<any>,
	questionAnswers?: FieldPolicy<any> | FieldReadFunction<any>,
	ssn?: FieldPolicy<any> | FieldReadFunction<any>,
	taxEndPeriod?: FieldPolicy<any> | FieldReadFunction<any>,
	worstMonthlyIncome?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserDeviceTokenOutputKeySpecifier = ('_id' | 'deviceToken' | UserDeviceTokenOutputKeySpecifier)[];
export type UserDeviceTokenOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	deviceToken?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserFavouritesKeySpecifier = ('_id' | 'favouritedAt' | 'noum' | 'order' | UserFavouritesKeySpecifier)[];
export type UserFavouritesFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	favouritedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	noum?: FieldPolicy<any> | FieldReadFunction<any>,
	order?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserFavouritesOutputKeySpecifier = ('count' | 'data' | UserFavouritesOutputKeySpecifier)[];
export type UserFavouritesOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserHistoryOutputKeySpecifier = ('_id' | 'address' | 'city' | 'country' | 'createdAt' | 'dob' | 'firstName' | 'lastName' | 'updateById' | 'updatedAt' | 'userId' | 'username' | 'zipcode' | UserHistoryOutputKeySpecifier)[];
export type UserHistoryOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	city?: FieldPolicy<any> | FieldReadFunction<any>,
	country?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	dob?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	updateById?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>,
	zipcode?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserInvoiceLineItemOutputKeySpecifier = ('count' | 'data' | UserInvoiceLineItemOutputKeySpecifier)[];
export type UserInvoiceLineItemOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserMonthlyDataOutputKeySpecifier = ('incomePaymentRate' | 'transactions' | UserMonthlyDataOutputKeySpecifier)[];
export type UserMonthlyDataOutputFieldPolicy = {
	incomePaymentRate?: FieldPolicy<any> | FieldReadFunction<any>,
	transactions?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserOutputKeySpecifier = ('SocialHallTCAccepted' | '_id' | 'ageGroup' | 'bio' | 'chamber' | 'citizenship' | 'connection' | 'connections' | 'createdAt' | 'credentials' | 'creditCheckResult' | 'dob' | 'email' | 'firstName' | 'freelancingExperience' | 'getEventUserRole' | 'isAcceptedSkipMediaTesting' | 'isPhoneVerified' | 'kycResult' | 'lastCheckedNotificationsDate' | 'lastLoginAt' | 'lastName' | 'location' | 'metadata' | 'middleName' | 'numericUserId' | 'paymentTCAccepted' | 'phone' | 'profile' | 'profileUrl' | 'referralCode' | 'roles' | 'skills' | 'status' | 'title' | 'unMaskedEmail' | 'unreadConnectionCount' | 'updatedAt' | 'usedReferralCodeOwnerName' | 'userAddress' | 'userOwnReferralCode' | 'userStatus' | 'userType' | 'username' | 'visibility' | 'visibleTo' | UserOutputKeySpecifier)[];
export type UserOutputFieldPolicy = {
	SocialHallTCAccepted?: FieldPolicy<any> | FieldReadFunction<any>,
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	ageGroup?: FieldPolicy<any> | FieldReadFunction<any>,
	bio?: FieldPolicy<any> | FieldReadFunction<any>,
	chamber?: FieldPolicy<any> | FieldReadFunction<any>,
	citizenship?: FieldPolicy<any> | FieldReadFunction<any>,
	connection?: FieldPolicy<any> | FieldReadFunction<any>,
	connections?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	credentials?: FieldPolicy<any> | FieldReadFunction<any>,
	creditCheckResult?: FieldPolicy<any> | FieldReadFunction<any>,
	dob?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	freelancingExperience?: FieldPolicy<any> | FieldReadFunction<any>,
	getEventUserRole?: FieldPolicy<any> | FieldReadFunction<any>,
	isAcceptedSkipMediaTesting?: FieldPolicy<any> | FieldReadFunction<any>,
	isPhoneVerified?: FieldPolicy<any> | FieldReadFunction<any>,
	kycResult?: FieldPolicy<any> | FieldReadFunction<any>,
	lastCheckedNotificationsDate?: FieldPolicy<any> | FieldReadFunction<any>,
	lastLoginAt?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	location?: FieldPolicy<any> | FieldReadFunction<any>,
	metadata?: FieldPolicy<any> | FieldReadFunction<any>,
	middleName?: FieldPolicy<any> | FieldReadFunction<any>,
	numericUserId?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentTCAccepted?: FieldPolicy<any> | FieldReadFunction<any>,
	phone?: FieldPolicy<any> | FieldReadFunction<any>,
	profile?: FieldPolicy<any> | FieldReadFunction<any>,
	profileUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	referralCode?: FieldPolicy<any> | FieldReadFunction<any>,
	roles?: FieldPolicy<any> | FieldReadFunction<any>,
	skills?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	unMaskedEmail?: FieldPolicy<any> | FieldReadFunction<any>,
	unreadConnectionCount?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	usedReferralCodeOwnerName?: FieldPolicy<any> | FieldReadFunction<any>,
	userAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	userOwnReferralCode?: FieldPolicy<any> | FieldReadFunction<any>,
	userStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	userType?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>,
	visibility?: FieldPolicy<any> | FieldReadFunction<any>,
	visibleTo?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserOutputAllUsersKeySpecifier = ('count' | 'data' | UserOutputAllUsersKeySpecifier)[];
export type UserOutputAllUsersFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserOutputCountKeySpecifier = ('count' | 'data' | UserOutputCountKeySpecifier)[];
export type UserOutputCountFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserOutputForGroupKeySpecifier = ('_id' | 'connection' | 'user' | UserOutputForGroupKeySpecifier)[];
export type UserOutputForGroupFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	connection?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserOutputListUsersForAdminKeySpecifier = ('data' | 'filter' | 'hasNextPage' | 'hasPreviousPage' | 'oldestUserCreatedAt' | 'page' | 'perPage' | 'search' | 'totalPagesCount' | UserOutputListUsersForAdminKeySpecifier)[];
export type UserOutputListUsersForAdminFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	filter?: FieldPolicy<any> | FieldReadFunction<any>,
	hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>,
	hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>,
	oldestUserCreatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	page?: FieldPolicy<any> | FieldReadFunction<any>,
	perPage?: FieldPolicy<any> | FieldReadFunction<any>,
	search?: FieldPolicy<any> | FieldReadFunction<any>,
	totalPagesCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserOutputVisibilityKeySpecifier = ('email' | 'location' | 'phone' | UserOutputVisibilityKeySpecifier)[];
export type UserOutputVisibilityFieldPolicy = {
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	location?: FieldPolicy<any> | FieldReadFunction<any>,
	phone?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserOutputVisibilityToKeySpecifier = ('userid' | UserOutputVisibilityToKeySpecifier)[];
export type UserOutputVisibilityToFieldPolicy = {
	userid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserPreferencesKeySpecifier = ('emailSubscriptions' | 'timezone' | 'userId' | UserPreferencesKeySpecifier)[];
export type UserPreferencesFieldPolicy = {
	emailSubscriptions?: FieldPolicy<any> | FieldReadFunction<any>,
	timezone?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserRoleOutputKeySpecifier = ('_id' | 'permissions' | 'roleType' | UserRoleOutputKeySpecifier)[];
export type UserRoleOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	permissions?: FieldPolicy<any> | FieldReadFunction<any>,
	roleType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserSearchResponseKeySpecifier = ('count' | 'data' | UserSearchResponseKeySpecifier)[];
export type UserSearchResponseFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserSelectedQuestionAndAnswersOutputKeySpecifier = ('count' | 'data' | UserSelectedQuestionAndAnswersOutputKeySpecifier)[];
export type UserSelectedQuestionAndAnswersOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserSelectedQuestionAndAnswersOutputObjectKeySpecifier = ('userId' | 'userSelection' | UserSelectedQuestionAndAnswersOutputObjectKeySpecifier)[];
export type UserSelectedQuestionAndAnswersOutputObjectFieldPolicy = {
	userId?: FieldPolicy<any> | FieldReadFunction<any>,
	userSelection?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserSelectionForQuestionAndAnswersKeySpecifier = ('_id' | 'answer' | 'questionId' | UserSelectionForQuestionAndAnswersKeySpecifier)[];
export type UserSelectionForQuestionAndAnswersFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	answer?: FieldPolicy<any> | FieldReadFunction<any>,
	questionId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserSocialHallKeySpecifier = ('_id' | 'isActive' | 'name' | 'type' | 'userId' | UserSocialHallKeySpecifier)[];
export type UserSocialHallFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	isActive?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ValidateInvoiceSequenceOutputKeySpecifier = ('message' | 'success' | ValidateInvoiceSequenceOutputKeySpecifier)[];
export type ValidateInvoiceSequenceOutputFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VerifyMicroDepositKeySpecifier = ('amount1' | 'amount2' | 'createdAt' | 'id' | 'status' | 'updatedAt' | VerifyMicroDepositKeySpecifier)[];
export type VerifyMicroDepositFieldPolicy = {
	amount1?: FieldPolicy<any> | FieldReadFunction<any>,
	amount2?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VisibilityKeySpecifier = ('email' | 'location' | 'phone' | VisibilityKeySpecifier)[];
export type VisibilityFieldPolicy = {
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	location?: FieldPolicy<any> | FieldReadFunction<any>,
	phone?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WalletDetailsKeySpecifier = ('balance' | 'walletName' | WalletDetailsKeySpecifier)[];
export type WalletDetailsFieldPolicy = {
	balance?: FieldPolicy<any> | FieldReadFunction<any>,
	walletName?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WalletExistDetailTypeKeySpecifier = ('sourceWallet' | 'sourceWalletDetail' | 'targetWallet' | 'targetWalletDetail' | WalletExistDetailTypeKeySpecifier)[];
export type WalletExistDetailTypeFieldPolicy = {
	sourceWallet?: FieldPolicy<any> | FieldReadFunction<any>,
	sourceWalletDetail?: FieldPolicy<any> | FieldReadFunction<any>,
	targetWallet?: FieldPolicy<any> | FieldReadFunction<any>,
	targetWalletDetail?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WalletExistTypeKeySpecifier = ('source' | 'sourceId' | 'success' | 'target' | 'targetId' | WalletExistTypeKeySpecifier)[];
export type WalletExistTypeFieldPolicy = {
	source?: FieldPolicy<any> | FieldReadFunction<any>,
	sourceId?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>,
	target?: FieldPolicy<any> | FieldReadFunction<any>,
	targetId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type addBankResponseKeySpecifier = ('code' | 'data' | 'message' | 'requestId' | 'status' | addBankResponseKeySpecifier)[];
export type addBankResponseFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	requestId?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type commentsWithPaginationKeySpecifier = ('count' | 'data' | commentsWithPaginationKeySpecifier)[];
export type commentsWithPaginationFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type createCustomerDocumentsOutputKeySpecifier = ('message' | 'userId' | createCustomerDocumentsOutputKeySpecifier)[];
export type createCustomerDocumentsOutputFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type createSubLedgerOutputKeySpecifier = ('accountId' | 'chamberId' | 'id' | 'name' | 'status' | createSubLedgerOutputKeySpecifier)[];
export type createSubLedgerOutputFieldPolicy = {
	accountId?: FieldPolicy<any> | FieldReadFunction<any>,
	chamberId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type distinctUserListKeySpecifier = ('userId' | distinctUserListKeySpecifier)[];
export type distinctUserListFieldPolicy = {
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type downloadDocumentOutputKeySpecifier = ('url' | downloadDocumentOutputKeySpecifier)[];
export type downloadDocumentOutputFieldPolicy = {
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type generateCsvResponseKeySpecifier = ('url' | generateCsvResponseKeySpecifier)[];
export type generateCsvResponseFieldPolicy = {
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type getOtpStatsOutputKeySpecifier = ('_id' | 'createdAt' | 'email' | 'event' | 'isLogin' | 'timestamp' | 'updatedAt' | 'verified' | getOtpStatsOutputKeySpecifier)[];
export type getOtpStatsOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	event?: FieldPolicy<any> | FieldReadFunction<any>,
	isLogin?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	verified?: FieldPolicy<any> | FieldReadFunction<any>
};
export type getUserDetailsOutputKeySpecifier = ('accountType' | 'dateOfRegistration' | 'name' | 'subWalletDetails' | 'uid' | 'walletDetails' | getUserDetailsOutputKeySpecifier)[];
export type getUserDetailsOutputFieldPolicy = {
	accountType?: FieldPolicy<any> | FieldReadFunction<any>,
	dateOfRegistration?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	subWalletDetails?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>,
	walletDetails?: FieldPolicy<any> | FieldReadFunction<any>
};
export type inviteNonNoumUserOutputKeySpecifier = ('_id' | 'isActive' | 'isVerified' | 'requestedForNoumId' | 'token' | 'uid' | inviteNonNoumUserOutputKeySpecifier)[];
export type inviteNonNoumUserOutputFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	isActive?: FieldPolicy<any> | FieldReadFunction<any>,
	isVerified?: FieldPolicy<any> | FieldReadFunction<any>,
	requestedForNoumId?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type inviteNonNoumUsersOutputKeySpecifier = ('count' | 'data' | inviteNonNoumUsersOutputKeySpecifier)[];
export type inviteNonNoumUsersOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type isUserSocialHallAttendeeKeySpecifier = ('socialHallId' | 'status' | isUserSocialHallAttendeeKeySpecifier)[];
export type isUserSocialHallAttendeeFieldPolicy = {
	socialHallId?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type keyPairKeySpecifier = ('key' | 'label' | keyPairKeySpecifier)[];
export type keyPairFieldPolicy = {
	key?: FieldPolicy<any> | FieldReadFunction<any>,
	label?: FieldPolicy<any> | FieldReadFunction<any>
};
export type payTypeKeySpecifier = ('key' | 'label' | 'reasons' | payTypeKeySpecifier)[];
export type payTypeFieldPolicy = {
	key?: FieldPolicy<any> | FieldReadFunction<any>,
	label?: FieldPolicy<any> | FieldReadFunction<any>,
	reasons?: FieldPolicy<any> | FieldReadFunction<any>
};
export type paymentConfigOutputKeySpecifier = ('paymentChannel' | 'paymentType' | paymentConfigOutputKeySpecifier)[];
export type paymentConfigOutputFieldPolicy = {
	paymentChannel?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type submitOnboardingQuestionnaireOutputKeySpecifier = ('userStatus' | submitOnboardingQuestionnaireOutputKeySpecifier)[];
export type submitOnboardingQuestionnaireOutputFieldPolicy = {
	userStatus?: FieldPolicy<any> | FieldReadFunction<any>
};
export type unreadCountOutputKeySpecifier = ('badge' | unreadCountOutputKeySpecifier)[];
export type unreadCountOutputFieldPolicy = {
	badge?: FieldPolicy<any> | FieldReadFunction<any>
};
export type uploadDocumentOutputKeySpecifier = ('documentName' | 'url' | uploadDocumentOutputKeySpecifier)[];
export type uploadDocumentOutputFieldPolicy = {
	documentName?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type validateResetPasswordOutputKeySpecifier = ('message' | 'success' | validateResetPasswordOutputKeySpecifier)[];
export type validateResetPasswordOutputFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	AccountListOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountListOutputKeySpecifier | (() => undefined | AccountListOutputKeySpecifier),
		fields?: AccountListOutputFieldPolicy,
	},
	AccountListOutputV2?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountListOutputV2KeySpecifier | (() => undefined | AccountListOutputV2KeySpecifier),
		fields?: AccountListOutputV2FieldPolicy,
	},
	AccountLogsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AccountLogsOutputKeySpecifier | (() => undefined | AccountLogsOutputKeySpecifier),
		fields?: AccountLogsOutputFieldPolicy,
	},
	ActiveNoumInvitation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ActiveNoumInvitationKeySpecifier | (() => undefined | ActiveNoumInvitationKeySpecifier),
		fields?: ActiveNoumInvitationFieldPolicy,
	},
	AdCampaignAudienceOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AdCampaignAudienceOutputKeySpecifier | (() => undefined | AdCampaignAudienceOutputKeySpecifier),
		fields?: AdCampaignAudienceOutputFieldPolicy,
	},
	AdCampaignCsvReportListOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AdCampaignCsvReportListOutputKeySpecifier | (() => undefined | AdCampaignCsvReportListOutputKeySpecifier),
		fields?: AdCampaignCsvReportListOutputFieldPolicy,
	},
	AdCampaignCsvReportOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AdCampaignCsvReportOutputKeySpecifier | (() => undefined | AdCampaignCsvReportOutputKeySpecifier),
		fields?: AdCampaignCsvReportOutputFieldPolicy,
	},
	AdCampaignOffer?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AdCampaignOfferKeySpecifier | (() => undefined | AdCampaignOfferKeySpecifier),
		fields?: AdCampaignOfferFieldPolicy,
	},
	AdCampaignOfferGoalsConnectedUsers?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AdCampaignOfferGoalsConnectedUsersKeySpecifier | (() => undefined | AdCampaignOfferGoalsConnectedUsersKeySpecifier),
		fields?: AdCampaignOfferGoalsConnectedUsersFieldPolicy,
	},
	AdCampaignOfferGoalsNoumVisibility?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AdCampaignOfferGoalsNoumVisibilityKeySpecifier | (() => undefined | AdCampaignOfferGoalsNoumVisibilityKeySpecifier),
		fields?: AdCampaignOfferGoalsNoumVisibilityFieldPolicy,
	},
	AdCampaignOfferPaginated?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AdCampaignOfferPaginatedKeySpecifier | (() => undefined | AdCampaignOfferPaginatedKeySpecifier),
		fields?: AdCampaignOfferPaginatedFieldPolicy,
	},
	AdCampaignOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AdCampaignOutputKeySpecifier | (() => undefined | AdCampaignOutputKeySpecifier),
		fields?: AdCampaignOutputFieldPolicy,
	},
	AdCampaignOutputPaginated?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AdCampaignOutputPaginatedKeySpecifier | (() => undefined | AdCampaignOutputPaginatedKeySpecifier),
		fields?: AdCampaignOutputPaginatedFieldPolicy,
	},
	AdCampaignReportMetricsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AdCampaignReportMetricsOutputKeySpecifier | (() => undefined | AdCampaignReportMetricsOutputKeySpecifier),
		fields?: AdCampaignReportMetricsOutputFieldPolicy,
	},
	AdCampaignReportOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AdCampaignReportOutputKeySpecifier | (() => undefined | AdCampaignReportOutputKeySpecifier),
		fields?: AdCampaignReportOutputFieldPolicy,
	},
	AdCampaignReportsOutputPaginated?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AdCampaignReportsOutputPaginatedKeySpecifier | (() => undefined | AdCampaignReportsOutputPaginatedKeySpecifier),
		fields?: AdCampaignReportsOutputPaginatedFieldPolicy,
	},
	AdCampaignSettingsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AdCampaignSettingsOutputKeySpecifier | (() => undefined | AdCampaignSettingsOutputKeySpecifier),
		fields?: AdCampaignSettingsOutputFieldPolicy,
	},
	AddressOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AddressOutputKeySpecifier | (() => undefined | AddressOutputKeySpecifier),
		fields?: AddressOutputFieldPolicy,
	},
	AdminGroupOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AdminGroupOutputKeySpecifier | (() => undefined | AdminGroupOutputKeySpecifier),
		fields?: AdminGroupOutputFieldPolicy,
	},
	AdminReportsOutputCollection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AdminReportsOutputCollectionKeySpecifier | (() => undefined | AdminReportsOutputCollectionKeySpecifier),
		fields?: AdminReportsOutputCollectionFieldPolicy,
	},
	AdminReportsOutputType?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AdminReportsOutputTypeKeySpecifier | (() => undefined | AdminReportsOutputTypeKeySpecifier),
		fields?: AdminReportsOutputTypeFieldPolicy,
	},
	AllNotesOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AllNotesOutputKeySpecifier | (() => undefined | AllNotesOutputKeySpecifier),
		fields?: AllNotesOutputFieldPolicy,
	},
	AllReferralInvitee?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AllReferralInviteeKeySpecifier | (() => undefined | AllReferralInviteeKeySpecifier),
		fields?: AllReferralInviteeFieldPolicy,
	},
	AllTransactionLinksOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AllTransactionLinksOutputKeySpecifier | (() => undefined | AllTransactionLinksOutputKeySpecifier),
		fields?: AllTransactionLinksOutputFieldPolicy,
	},
	AllTransactionParentResponseOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AllTransactionParentResponseOutputKeySpecifier | (() => undefined | AllTransactionParentResponseOutputKeySpecifier),
		fields?: AllTransactionParentResponseOutputFieldPolicy,
	},
	AllTransactionResponseOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AllTransactionResponseOutputKeySpecifier | (() => undefined | AllTransactionResponseOutputKeySpecifier),
		fields?: AllTransactionResponseOutputFieldPolicy,
	},
	AllTransactionsResultOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AllTransactionsResultOutputKeySpecifier | (() => undefined | AllTransactionsResultOutputKeySpecifier),
		fields?: AllTransactionsResultOutputFieldPolicy,
	},
	AmountDueOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AmountDueOutputKeySpecifier | (() => undefined | AmountDueOutputKeySpecifier),
		fields?: AmountDueOutputFieldPolicy,
	},
	AnswerOptions?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AnswerOptionsKeySpecifier | (() => undefined | AnswerOptionsKeySpecifier),
		fields?: AnswerOptionsFieldPolicy,
	},
	AnswerOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AnswerOutputKeySpecifier | (() => undefined | AnswerOutputKeySpecifier),
		fields?: AnswerOutputFieldPolicy,
	},
	AnswersOutputResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AnswersOutputResponseKeySpecifier | (() => undefined | AnswersOutputResponseKeySpecifier),
		fields?: AnswersOutputResponseFieldPolicy,
	},
	AppActivitiesOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppActivitiesOutputKeySpecifier | (() => undefined | AppActivitiesOutputKeySpecifier),
		fields?: AppActivitiesOutputFieldPolicy,
	},
	AppActivity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppActivityKeySpecifier | (() => undefined | AppActivityKeySpecifier),
		fields?: AppActivityFieldPolicy,
	},
	AppActivityPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AppActivityPayloadKeySpecifier | (() => undefined | AppActivityPayloadKeySpecifier),
		fields?: AppActivityPayloadFieldPolicy,
	},
	ApplicationResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ApplicationResultKeySpecifier | (() => undefined | ApplicationResultKeySpecifier),
		fields?: ApplicationResultFieldPolicy,
	},
	ApplicationResultResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ApplicationResultResponseKeySpecifier | (() => undefined | ApplicationResultResponseKeySpecifier),
		fields?: ApplicationResultResponseFieldPolicy,
	},
	AssessmentPDFOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AssessmentPDFOutputKeySpecifier | (() => undefined | AssessmentPDFOutputKeySpecifier),
		fields?: AssessmentPDFOutputFieldPolicy,
	},
	Attendees?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AttendeesKeySpecifier | (() => undefined | AttendeesKeySpecifier),
		fields?: AttendeesFieldPolicy,
	},
	AttendeesMeta?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AttendeesMetaKeySpecifier | (() => undefined | AttendeesMetaKeySpecifier),
		fields?: AttendeesMetaFieldPolicy,
	},
	AvailableDerivatives?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AvailableDerivativesKeySpecifier | (() => undefined | AvailableDerivativesKeySpecifier),
		fields?: AvailableDerivativesFieldPolicy,
	},
	AvailableNoumRole?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AvailableNoumRoleKeySpecifier | (() => undefined | AvailableNoumRoleKeySpecifier),
		fields?: AvailableNoumRoleFieldPolicy,
	},
	BankAccountBalance?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BankAccountBalanceKeySpecifier | (() => undefined | BankAccountBalanceKeySpecifier),
		fields?: BankAccountBalanceFieldPolicy,
	},
	BankAccountOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BankAccountOutputKeySpecifier | (() => undefined | BankAccountOutputKeySpecifier),
		fields?: BankAccountOutputFieldPolicy,
	},
	BankDetailsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BankDetailsOutputKeySpecifier | (() => undefined | BankDetailsOutputKeySpecifier),
		fields?: BankDetailsOutputFieldPolicy,
	},
	BankListOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BankListOutputKeySpecifier | (() => undefined | BankListOutputKeySpecifier),
		fields?: BankListOutputFieldPolicy,
	},
	BankMeta?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BankMetaKeySpecifier | (() => undefined | BankMetaKeySpecifier),
		fields?: BankMetaFieldPolicy,
	},
	BasicConversationItem?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BasicConversationItemKeySpecifier | (() => undefined | BasicConversationItemKeySpecifier),
		fields?: BasicConversationItemFieldPolicy,
	},
	BelvoAccessToken?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BelvoAccessTokenKeySpecifier | (() => undefined | BelvoAccessTokenKeySpecifier),
		fields?: BelvoAccessTokenFieldPolicy,
	},
	BlockedCountry?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BlockedCountryKeySpecifier | (() => undefined | BlockedCountryKeySpecifier),
		fields?: BlockedCountryFieldPolicy,
	},
	BlockedCountryOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BlockedCountryOutputKeySpecifier | (() => undefined | BlockedCountryOutputKeySpecifier),
		fields?: BlockedCountryOutputFieldPolicy,
	},
	BusinessSearch?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BusinessSearchKeySpecifier | (() => undefined | BusinessSearchKeySpecifier),
		fields?: BusinessSearchFieldPolicy,
	},
	BusinessSearchOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BusinessSearchOutputKeySpecifier | (() => undefined | BusinessSearchOutputKeySpecifier),
		fields?: BusinessSearchOutputFieldPolicy,
	},
	CQForm?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CQFormKeySpecifier | (() => undefined | CQFormKeySpecifier),
		fields?: CQFormFieldPolicy,
	},
	CQFormOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CQFormOutputKeySpecifier | (() => undefined | CQFormOutputKeySpecifier),
		fields?: CQFormOutputFieldPolicy,
	},
	CQGenerateSummary?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CQGenerateSummaryKeySpecifier | (() => undefined | CQGenerateSummaryKeySpecifier),
		fields?: CQGenerateSummaryFieldPolicy,
	},
	CQLogsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CQLogsOutputKeySpecifier | (() => undefined | CQLogsOutputKeySpecifier),
		fields?: CQLogsOutputFieldPolicy,
	},
	CQNote?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CQNoteKeySpecifier | (() => undefined | CQNoteKeySpecifier),
		fields?: CQNoteFieldPolicy,
	},
	CQNotesList?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CQNotesListKeySpecifier | (() => undefined | CQNotesListKeySpecifier),
		fields?: CQNotesListFieldPolicy,
	},
	CQQualityAll?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CQQualityAllKeySpecifier | (() => undefined | CQQualityAllKeySpecifier),
		fields?: CQQualityAllFieldPolicy,
	},
	CQQualityLabel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CQQualityLabelKeySpecifier | (() => undefined | CQQualityLabelKeySpecifier),
		fields?: CQQualityLabelFieldPolicy,
	},
	CQQualityLogs?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CQQualityLogsKeySpecifier | (() => undefined | CQQualityLogsKeySpecifier),
		fields?: CQQualityLogsFieldPolicy,
	},
	CQQualityLogsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CQQualityLogsOutputKeySpecifier | (() => undefined | CQQualityLogsOutputKeySpecifier),
		fields?: CQQualityLogsOutputFieldPolicy,
	},
	CQScoreLogs?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CQScoreLogsKeySpecifier | (() => undefined | CQScoreLogsKeySpecifier),
		fields?: CQScoreLogsFieldPolicy,
	},
	CQSettings?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CQSettingsKeySpecifier | (() => undefined | CQSettingsKeySpecifier),
		fields?: CQSettingsFieldPolicy,
	},
	CQSummaryReport?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CQSummaryReportKeySpecifier | (() => undefined | CQSummaryReportKeySpecifier),
		fields?: CQSummaryReportFieldPolicy,
	},
	CQSummaryReportData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CQSummaryReportDataKeySpecifier | (() => undefined | CQSummaryReportDataKeySpecifier),
		fields?: CQSummaryReportDataFieldPolicy,
	},
	CQUserList?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CQUserListKeySpecifier | (() => undefined | CQUserListKeySpecifier),
		fields?: CQUserListFieldPolicy,
	},
	CQUserOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CQUserOutputKeySpecifier | (() => undefined | CQUserOutputKeySpecifier),
		fields?: CQUserOutputFieldPolicy,
	},
	CQUserQualityUpdateOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CQUserQualityUpdateOutputKeySpecifier | (() => undefined | CQUserQualityUpdateOutputKeySpecifier),
		fields?: CQUserQualityUpdateOutputFieldPolicy,
	},
	CampaignAccountOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CampaignAccountOutputKeySpecifier | (() => undefined | CampaignAccountOutputKeySpecifier),
		fields?: CampaignAccountOutputFieldPolicy,
	},
	CapitalquotientMutations?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CapitalquotientMutationsKeySpecifier | (() => undefined | CapitalquotientMutationsKeySpecifier),
		fields?: CapitalquotientMutationsFieldPolicy,
	},
	CapitalquotientQueries?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CapitalquotientQueriesKeySpecifier | (() => undefined | CapitalquotientQueriesKeySpecifier),
		fields?: CapitalquotientQueriesFieldPolicy,
	},
	CategoryWithSkills?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CategoryWithSkillsKeySpecifier | (() => undefined | CategoryWithSkillsKeySpecifier),
		fields?: CategoryWithSkillsFieldPolicy,
	},
	ChamberAuthors?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChamberAuthorsKeySpecifier | (() => undefined | ChamberAuthorsKeySpecifier),
		fields?: ChamberAuthorsFieldPolicy,
	},
	ChamberByIdRef?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChamberByIdRefKeySpecifier | (() => undefined | ChamberByIdRefKeySpecifier),
		fields?: ChamberByIdRefFieldPolicy,
	},
	ChamberByUserIdRef?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChamberByUserIdRefKeySpecifier | (() => undefined | ChamberByUserIdRefKeySpecifier),
		fields?: ChamberByUserIdRefFieldPolicy,
	},
	ChamberPost?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChamberPostKeySpecifier | (() => undefined | ChamberPostKeySpecifier),
		fields?: ChamberPostFieldPolicy,
	},
	ChamberPostOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChamberPostOutputKeySpecifier | (() => undefined | ChamberPostOutputKeySpecifier),
		fields?: ChamberPostOutputFieldPolicy,
	},
	ChamberPostOutputData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChamberPostOutputDataKeySpecifier | (() => undefined | ChamberPostOutputDataKeySpecifier),
		fields?: ChamberPostOutputDataFieldPolicy,
	},
	ChameleonBankListOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChameleonBankListOutputKeySpecifier | (() => undefined | ChameleonBankListOutputKeySpecifier),
		fields?: ChameleonBankListOutputFieldPolicy,
	},
	CoManagerStatistics?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CoManagerStatisticsKeySpecifier | (() => undefined | CoManagerStatisticsKeySpecifier),
		fields?: CoManagerStatisticsFieldPolicy,
	},
	Cohost?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CohostKeySpecifier | (() => undefined | CohostKeySpecifier),
		fields?: CohostFieldPolicy,
	},
	CommentOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CommentOutputKeySpecifier | (() => undefined | CommentOutputKeySpecifier),
		fields?: CommentOutputFieldPolicy,
	},
	CommentReplyReactionOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CommentReplyReactionOutputKeySpecifier | (() => undefined | CommentReplyReactionOutputKeySpecifier),
		fields?: CommentReplyReactionOutputFieldPolicy,
	},
	Comments?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CommentsKeySpecifier | (() => undefined | CommentsKeySpecifier),
		fields?: CommentsFieldPolicy,
	},
	CommissionAndReimbursement?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CommissionAndReimbursementKeySpecifier | (() => undefined | CommissionAndReimbursementKeySpecifier),
		fields?: CommissionAndReimbursementFieldPolicy,
	},
	ConfigOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ConfigOutputKeySpecifier | (() => undefined | ConfigOutputKeySpecifier),
		fields?: ConfigOutputFieldPolicy,
	},
	ConnectedNoumsWithMember?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ConnectedNoumsWithMemberKeySpecifier | (() => undefined | ConnectedNoumsWithMemberKeySpecifier),
		fields?: ConnectedNoumsWithMemberFieldPolicy,
	},
	ConnectionByIdRef?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ConnectionByIdRefKeySpecifier | (() => undefined | ConnectionByIdRefKeySpecifier),
		fields?: ConnectionByIdRefFieldPolicy,
	},
	ConnectionCheck?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ConnectionCheckKeySpecifier | (() => undefined | ConnectionCheckKeySpecifier),
		fields?: ConnectionCheckFieldPolicy,
	},
	ConnectionOutputResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ConnectionOutputResponseKeySpecifier | (() => undefined | ConnectionOutputResponseKeySpecifier),
		fields?: ConnectionOutputResponseFieldPolicy,
	},
	Connections?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ConnectionsKeySpecifier | (() => undefined | ConnectionsKeySpecifier),
		fields?: ConnectionsFieldPolicy,
	},
	Contact?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ContactKeySpecifier | (() => undefined | ContactKeySpecifier),
		fields?: ContactFieldPolicy,
	},
	ContactOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ContactOutputKeySpecifier | (() => undefined | ContactOutputKeySpecifier),
		fields?: ContactOutputFieldPolicy,
	},
	Contract?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ContractKeySpecifier | (() => undefined | ContractKeySpecifier),
		fields?: ContractFieldPolicy,
	},
	ContractOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ContractOutputKeySpecifier | (() => undefined | ContractOutputKeySpecifier),
		fields?: ContractOutputFieldPolicy,
	},
	ContractSowTimeLine?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ContractSowTimeLineKeySpecifier | (() => undefined | ContractSowTimeLineKeySpecifier),
		fields?: ContractSowTimeLineFieldPolicy,
	},
	ConversationActivity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ConversationActivityKeySpecifier | (() => undefined | ConversationActivityKeySpecifier),
		fields?: ConversationActivityFieldPolicy,
	},
	ConversationIdOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ConversationIdOutputKeySpecifier | (() => undefined | ConversationIdOutputKeySpecifier),
		fields?: ConversationIdOutputFieldPolicy,
	},
	ConversationItem?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ConversationItemKeySpecifier | (() => undefined | ConversationItemKeySpecifier),
		fields?: ConversationItemFieldPolicy,
	},
	ConversationLink?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ConversationLinkKeySpecifier | (() => undefined | ConversationLinkKeySpecifier),
		fields?: ConversationLinkFieldPolicy,
	},
	ConversationMeta?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ConversationMetaKeySpecifier | (() => undefined | ConversationMetaKeySpecifier),
		fields?: ConversationMetaFieldPolicy,
	},
	ConversationOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ConversationOutputKeySpecifier | (() => undefined | ConversationOutputKeySpecifier),
		fields?: ConversationOutputFieldPolicy,
	},
	ConversationOutputAll?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ConversationOutputAllKeySpecifier | (() => undefined | ConversationOutputAllKeySpecifier),
		fields?: ConversationOutputAllFieldPolicy,
	},
	ConversationsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ConversationsOutputKeySpecifier | (() => undefined | ConversationsOutputKeySpecifier),
		fields?: ConversationsOutputFieldPolicy,
	},
	CookieConsentOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CookieConsentOutputKeySpecifier | (() => undefined | CookieConsentOutputKeySpecifier),
		fields?: CookieConsentOutputFieldPolicy,
	},
	CreateAccountOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateAccountOutputKeySpecifier | (() => undefined | CreateAccountOutputKeySpecifier),
		fields?: CreateAccountOutputFieldPolicy,
	},
	CreateCustomerOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateCustomerOutputKeySpecifier | (() => undefined | CreateCustomerOutputKeySpecifier),
		fields?: CreateCustomerOutputFieldPolicy,
	},
	CreatePlaidLinkOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreatePlaidLinkOutputKeySpecifier | (() => undefined | CreatePlaidLinkOutputKeySpecifier),
		fields?: CreatePlaidLinkOutputFieldPolicy,
	},
	CurrencyData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CurrencyDataKeySpecifier | (() => undefined | CurrencyDataKeySpecifier),
		fields?: CurrencyDataFieldPolicy,
	},
	CurrencyOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CurrencyOutputKeySpecifier | (() => undefined | CurrencyOutputKeySpecifier),
		fields?: CurrencyOutputFieldPolicy,
	},
	CurrentUser?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CurrentUserKeySpecifier | (() => undefined | CurrentUserKeySpecifier),
		fields?: CurrentUserFieldPolicy,
	},
	CurrentUserPaymentLimitOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CurrentUserPaymentLimitOutputKeySpecifier | (() => undefined | CurrentUserPaymentLimitOutputKeySpecifier),
		fields?: CurrentUserPaymentLimitOutputFieldPolicy,
	},
	Customer?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerKeySpecifier | (() => undefined | CustomerKeySpecifier),
		fields?: CustomerFieldPolicy,
	},
	CustomerAccountsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerAccountsOutputKeySpecifier | (() => undefined | CustomerAccountsOutputKeySpecifier),
		fields?: CustomerAccountsOutputFieldPolicy,
	},
	CustomerDocumentOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerDocumentOutputKeySpecifier | (() => undefined | CustomerDocumentOutputKeySpecifier),
		fields?: CustomerDocumentOutputFieldPolicy,
	},
	CustomerKYCAccountsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerKYCAccountsOutputKeySpecifier | (() => undefined | CustomerKYCAccountsOutputKeySpecifier),
		fields?: CustomerKYCAccountsOutputFieldPolicy,
	},
	CustomerKYCAuditLog?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerKYCAuditLogKeySpecifier | (() => undefined | CustomerKYCAuditLogKeySpecifier),
		fields?: CustomerKYCAuditLogFieldPolicy,
	},
	CustomerKYCAuditLogCount?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerKYCAuditLogCountKeySpecifier | (() => undefined | CustomerKYCAuditLogCountKeySpecifier),
		fields?: CustomerKYCAuditLogCountFieldPolicy,
	},
	CustomerKYCWithAccountOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerKYCWithAccountOutputKeySpecifier | (() => undefined | CustomerKYCWithAccountOutputKeySpecifier),
		fields?: CustomerKYCWithAccountOutputFieldPolicy,
	},
	CustomerLimitOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerLimitOutputKeySpecifier | (() => undefined | CustomerLimitOutputKeySpecifier),
		fields?: CustomerLimitOutputFieldPolicy,
	},
	CustomerLogsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerLogsOutputKeySpecifier | (() => undefined | CustomerLogsOutputKeySpecifier),
		fields?: CustomerLogsOutputFieldPolicy,
	},
	CustomerOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerOutputKeySpecifier | (() => undefined | CustomerOutputKeySpecifier),
		fields?: CustomerOutputFieldPolicy,
	},
	CustomerPayeeList?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerPayeeListKeySpecifier | (() => undefined | CustomerPayeeListKeySpecifier),
		fields?: CustomerPayeeListFieldPolicy,
	},
	CustomerPayeeListV2?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerPayeeListV2KeySpecifier | (() => undefined | CustomerPayeeListV2KeySpecifier),
		fields?: CustomerPayeeListV2FieldPolicy,
	},
	CustomerUserOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerUserOutputKeySpecifier | (() => undefined | CustomerUserOutputKeySpecifier),
		fields?: CustomerUserOutputFieldPolicy,
	},
	CustomerUserRoleOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerUserRoleOutputKeySpecifier | (() => undefined | CustomerUserRoleOutputKeySpecifier),
		fields?: CustomerUserRoleOutputFieldPolicy,
	},
	CustomerWithAccountOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerWithAccountOutputKeySpecifier | (() => undefined | CustomerWithAccountOutputKeySpecifier),
		fields?: CustomerWithAccountOutputFieldPolicy,
	},
	CustomerWithTotalOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomerWithTotalOutputKeySpecifier | (() => undefined | CustomerWithTotalOutputKeySpecifier),
		fields?: CustomerWithTotalOutputFieldPolicy,
	},
	CustomersOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CustomersOutputKeySpecifier | (() => undefined | CustomersOutputKeySpecifier),
		fields?: CustomersOutputFieldPolicy,
	},
	DebitAccountOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DebitAccountOutputKeySpecifier | (() => undefined | DebitAccountOutputKeySpecifier),
		fields?: DebitAccountOutputFieldPolicy,
	},
	DeliverablesAndMilestones?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeliverablesAndMilestonesKeySpecifier | (() => undefined | DeliverablesAndMilestonesKeySpecifier),
		fields?: DeliverablesAndMilestonesFieldPolicy,
	},
	DeviceTokenOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeviceTokenOutputKeySpecifier | (() => undefined | DeviceTokenOutputKeySpecifier),
		fields?: DeviceTokenOutputFieldPolicy,
	},
	Discovery?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DiscoveryKeySpecifier | (() => undefined | DiscoveryKeySpecifier),
		fields?: DiscoveryFieldPolicy,
	},
	DiscoveryResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DiscoveryResponseKeySpecifier | (() => undefined | DiscoveryResponseKeySpecifier),
		fields?: DiscoveryResponseFieldPolicy,
	},
	DocuSignOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DocuSignOutputKeySpecifier | (() => undefined | DocuSignOutputKeySpecifier),
		fields?: DocuSignOutputFieldPolicy,
	},
	DocumentFailureReason?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DocumentFailureReasonKeySpecifier | (() => undefined | DocumentFailureReasonKeySpecifier),
		fields?: DocumentFailureReasonFieldPolicy,
	},
	DocumentMeta?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DocumentMetaKeySpecifier | (() => undefined | DocumentMetaKeySpecifier),
		fields?: DocumentMetaFieldPolicy,
	},
	DocumentOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DocumentOutputKeySpecifier | (() => undefined | DocumentOutputKeySpecifier),
		fields?: DocumentOutputFieldPolicy,
	},
	DunningAttemptOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DunningAttemptOutputKeySpecifier | (() => undefined | DunningAttemptOutputKeySpecifier),
		fields?: DunningAttemptOutputFieldPolicy,
	},
	DwollaTransaction?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DwollaTransactionKeySpecifier | (() => undefined | DwollaTransactionKeySpecifier),
		fields?: DwollaTransactionFieldPolicy,
	},
	DwollaTransactionOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DwollaTransactionOutputKeySpecifier | (() => undefined | DwollaTransactionOutputKeySpecifier),
		fields?: DwollaTransactionOutputFieldPolicy,
	},
	EditAccountPasswordOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EditAccountPasswordOutputKeySpecifier | (() => undefined | EditAccountPasswordOutputKeySpecifier),
		fields?: EditAccountPasswordOutputFieldPolicy,
	},
	ElementInnerOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ElementInnerOutputKeySpecifier | (() => undefined | ElementInnerOutputKeySpecifier),
		fields?: ElementInnerOutputFieldPolicy,
	},
	ElementOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ElementOutputKeySpecifier | (() => undefined | ElementOutputKeySpecifier),
		fields?: ElementOutputFieldPolicy,
	},
	ErrorObject?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ErrorObjectKeySpecifier | (() => undefined | ErrorObjectKeySpecifier),
		fields?: ErrorObjectFieldPolicy,
	},
	Event?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventKeySpecifier | (() => undefined | EventKeySpecifier),
		fields?: EventFieldPolicy,
	},
	EventActivity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventActivityKeySpecifier | (() => undefined | EventActivityKeySpecifier),
		fields?: EventActivityFieldPolicy,
	},
	EventMeta?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventMetaKeySpecifier | (() => undefined | EventMetaKeySpecifier),
		fields?: EventMetaFieldPolicy,
	},
	EventNotificationDetails?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventNotificationDetailsKeySpecifier | (() => undefined | EventNotificationDetailsKeySpecifier),
		fields?: EventNotificationDetailsFieldPolicy,
	},
	EventNotificationDetailsV2?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventNotificationDetailsV2KeySpecifier | (() => undefined | EventNotificationDetailsV2KeySpecifier),
		fields?: EventNotificationDetailsV2FieldPolicy,
	},
	EventOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventOutputKeySpecifier | (() => undefined | EventOutputKeySpecifier),
		fields?: EventOutputFieldPolicy,
	},
	EventSubscriptionData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EventSubscriptionDataKeySpecifier | (() => undefined | EventSubscriptionDataKeySpecifier),
		fields?: EventSubscriptionDataFieldPolicy,
	},
	ExampleType?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExampleTypeKeySpecifier | (() => undefined | ExampleTypeKeySpecifier),
		fields?: ExampleTypeFieldPolicy,
	},
	FeesCategory?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FeesCategoryKeySpecifier | (() => undefined | FeesCategoryKeySpecifier),
		fields?: FeesCategoryFieldPolicy,
	},
	FeesInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FeesInfoKeySpecifier | (() => undefined | FeesInfoKeySpecifier),
		fields?: FeesInfoFieldPolicy,
	},
	FileData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FileDataKeySpecifier | (() => undefined | FileDataKeySpecifier),
		fields?: FileDataFieldPolicy,
	},
	FundingSourceBalanceOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FundingSourceBalanceOutputKeySpecifier | (() => undefined | FundingSourceBalanceOutputKeySpecifier),
		fields?: FundingSourceBalanceOutputFieldPolicy,
	},
	FundingSourceOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FundingSourceOutputKeySpecifier | (() => undefined | FundingSourceOutputKeySpecifier),
		fields?: FundingSourceOutputFieldPolicy,
	},
	GenericResponseOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GenericResponseOutputKeySpecifier | (() => undefined | GenericResponseOutputKeySpecifier),
		fields?: GenericResponseOutputFieldPolicy,
	},
	GlobalConfigOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GlobalConfigOutputKeySpecifier | (() => undefined | GlobalConfigOutputKeySpecifier),
		fields?: GlobalConfigOutputFieldPolicy,
	},
	GlobalDataInput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GlobalDataInputKeySpecifier | (() => undefined | GlobalDataInputKeySpecifier),
		fields?: GlobalDataInputFieldPolicy,
	},
	GlobalSearchEntity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GlobalSearchEntityKeySpecifier | (() => undefined | GlobalSearchEntityKeySpecifier),
		fields?: GlobalSearchEntityFieldPolicy,
	},
	GlobalSearchEntityUser?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GlobalSearchEntityUserKeySpecifier | (() => undefined | GlobalSearchEntityUserKeySpecifier),
		fields?: GlobalSearchEntityUserFieldPolicy,
	},
	GlobalSearchEventEntity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GlobalSearchEventEntityKeySpecifier | (() => undefined | GlobalSearchEventEntityKeySpecifier),
		fields?: GlobalSearchEventEntityFieldPolicy,
	},
	GlobalSearchNoumEntity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GlobalSearchNoumEntityKeySpecifier | (() => undefined | GlobalSearchNoumEntityKeySpecifier),
		fields?: GlobalSearchNoumEntityFieldPolicy,
	},
	GlobalSearchPostEntity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GlobalSearchPostEntityKeySpecifier | (() => undefined | GlobalSearchPostEntityKeySpecifier),
		fields?: GlobalSearchPostEntityFieldPolicy,
	},
	GlobalSearchResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GlobalSearchResultKeySpecifier | (() => undefined | GlobalSearchResultKeySpecifier),
		fields?: GlobalSearchResultFieldPolicy,
	},
	Group?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GroupKeySpecifier | (() => undefined | GroupKeySpecifier),
		fields?: GroupFieldPolicy,
	},
	GroupConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GroupConnectionKeySpecifier | (() => undefined | GroupConnectionKeySpecifier),
		fields?: GroupConnectionFieldPolicy,
	},
	GroupEvent?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GroupEventKeySpecifier | (() => undefined | GroupEventKeySpecifier),
		fields?: GroupEventFieldPolicy,
	},
	GroupInvitation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GroupInvitationKeySpecifier | (() => undefined | GroupInvitationKeySpecifier),
		fields?: GroupInvitationFieldPolicy,
	},
	GroupOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GroupOutputKeySpecifier | (() => undefined | GroupOutputKeySpecifier),
		fields?: GroupOutputFieldPolicy,
	},
	GroupRef?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GroupRefKeySpecifier | (() => undefined | GroupRefKeySpecifier),
		fields?: GroupRefFieldPolicy,
	},
	GroupShJoiningStatus?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GroupShJoiningStatusKeySpecifier | (() => undefined | GroupShJoiningStatusKeySpecifier),
		fields?: GroupShJoiningStatusFieldPolicy,
	},
	GroupedNoumRolePermissionChange?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GroupedNoumRolePermissionChangeKeySpecifier | (() => undefined | GroupedNoumRolePermissionChangeKeySpecifier),
		fields?: GroupedNoumRolePermissionChangeFieldPolicy,
	},
	HomeSpaceConversationOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | HomeSpaceConversationOutputKeySpecifier | (() => undefined | HomeSpaceConversationOutputKeySpecifier),
		fields?: HomeSpaceConversationOutputFieldPolicy,
	},
	HostedPageOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | HostedPageOutputKeySpecifier | (() => undefined | HostedPageOutputKeySpecifier),
		fields?: HostedPageOutputFieldPolicy,
	},
	ILIOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ILIOutputKeySpecifier | (() => undefined | ILIOutputKeySpecifier),
		fields?: ILIOutputFieldPolicy,
	},
	IdentityOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | IdentityOutputKeySpecifier | (() => undefined | IdentityOutputKeySpecifier),
		fields?: IdentityOutputFieldPolicy,
	},
	IncomeDataOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | IncomeDataOutputKeySpecifier | (() => undefined | IncomeDataOutputKeySpecifier),
		fields?: IncomeDataOutputFieldPolicy,
	},
	IndustryList?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | IndustryListKeySpecifier | (() => undefined | IndustryListKeySpecifier),
		fields?: IndustryListFieldPolicy,
	},
	IndustryListOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | IndustryListOutputKeySpecifier | (() => undefined | IndustryListOutputKeySpecifier),
		fields?: IndustryListOutputFieldPolicy,
	},
	Invitation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InvitationKeySpecifier | (() => undefined | InvitationKeySpecifier),
		fields?: InvitationFieldPolicy,
	},
	InvitationOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InvitationOutputKeySpecifier | (() => undefined | InvitationOutputKeySpecifier),
		fields?: InvitationOutputFieldPolicy,
	},
	Invitees?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InviteesKeySpecifier | (() => undefined | InviteesKeySpecifier),
		fields?: InviteesFieldPolicy,
	},
	InvoiceAmountOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InvoiceAmountOutputKeySpecifier | (() => undefined | InvoiceAmountOutputKeySpecifier),
		fields?: InvoiceAmountOutputFieldPolicy,
	},
	InvoiceDetail?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InvoiceDetailKeySpecifier | (() => undefined | InvoiceDetailKeySpecifier),
		fields?: InvoiceDetailFieldPolicy,
	},
	InvoiceHistory?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InvoiceHistoryKeySpecifier | (() => undefined | InvoiceHistoryKeySpecifier),
		fields?: InvoiceHistoryFieldPolicy,
	},
	InvoiceLineItem?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InvoiceLineItemKeySpecifier | (() => undefined | InvoiceLineItemKeySpecifier),
		fields?: InvoiceLineItemFieldPolicy,
	},
	InvoiceList?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InvoiceListKeySpecifier | (() => undefined | InvoiceListKeySpecifier),
		fields?: InvoiceListFieldPolicy,
	},
	InvoiceOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InvoiceOutputKeySpecifier | (() => undefined | InvoiceOutputKeySpecifier),
		fields?: InvoiceOutputFieldPolicy,
	},
	InvoicePDF?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InvoicePDFKeySpecifier | (() => undefined | InvoicePDFKeySpecifier),
		fields?: InvoicePDFFieldPolicy,
	},
	InvoicePDFUrl?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InvoicePDFUrlKeySpecifier | (() => undefined | InvoicePDFUrlKeySpecifier),
		fields?: InvoicePDFUrlFieldPolicy,
	},
	InvoicePaymentOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InvoicePaymentOutputKeySpecifier | (() => undefined | InvoicePaymentOutputKeySpecifier),
		fields?: InvoicePaymentOutputFieldPolicy,
	},
	InvoiceSequenceOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InvoiceSequenceOutputKeySpecifier | (() => undefined | InvoiceSequenceOutputKeySpecifier),
		fields?: InvoiceSequenceOutputFieldPolicy,
	},
	InvoiceTaxLine?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InvoiceTaxLineKeySpecifier | (() => undefined | InvoiceTaxLineKeySpecifier),
		fields?: InvoiceTaxLineFieldPolicy,
	},
	InvoiceTimelineOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InvoiceTimelineOutputKeySpecifier | (() => undefined | InvoiceTimelineOutputKeySpecifier),
		fields?: InvoiceTimelineOutputFieldPolicy,
	},
	InvoiceTimelinePaginationOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InvoiceTimelinePaginationOutputKeySpecifier | (() => undefined | InvoiceTimelinePaginationOutputKeySpecifier),
		fields?: InvoiceTimelinePaginationOutputFieldPolicy,
	},
	InvoiceToolReportOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InvoiceToolReportOutputKeySpecifier | (() => undefined | InvoiceToolReportOutputKeySpecifier),
		fields?: InvoiceToolReportOutputFieldPolicy,
	},
	InvoiceToolReportOutputPaginated?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | InvoiceToolReportOutputPaginatedKeySpecifier | (() => undefined | InvoiceToolReportOutputPaginatedKeySpecifier),
		fields?: InvoiceToolReportOutputPaginatedFieldPolicy,
	},
	ItemFamilyOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ItemFamilyOutputKeySpecifier | (() => undefined | ItemFamilyOutputKeySpecifier),
		fields?: ItemFamilyOutputFieldPolicy,
	},
	ItemOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ItemOutputKeySpecifier | (() => undefined | ItemOutputKeySpecifier),
		fields?: ItemOutputFieldPolicy,
	},
	Jurisdiction?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | JurisdictionKeySpecifier | (() => undefined | JurisdictionKeySpecifier),
		fields?: JurisdictionFieldPolicy,
	},
	Knock?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | KnockKeySpecifier | (() => undefined | KnockKeySpecifier),
		fields?: KnockFieldPolicy,
	},
	KnockEvent?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | KnockEventKeySpecifier | (() => undefined | KnockEventKeySpecifier),
		fields?: KnockEventFieldPolicy,
	},
	Knocks?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | KnocksKeySpecifier | (() => undefined | KnocksKeySpecifier),
		fields?: KnocksFieldPolicy,
	},
	KycOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | KycOutputKeySpecifier | (() => undefined | KycOutputKeySpecifier),
		fields?: KycOutputFieldPolicy,
	},
	LineItemOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LineItemOutputKeySpecifier | (() => undefined | LineItemOutputKeySpecifier),
		fields?: LineItemOutputFieldPolicy,
	},
	LinkedPaymentOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LinkedPaymentOutputKeySpecifier | (() => undefined | LinkedPaymentOutputKeySpecifier),
		fields?: LinkedPaymentOutputFieldPolicy,
	},
	ListInvoice?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ListInvoiceKeySpecifier | (() => undefined | ListInvoiceKeySpecifier),
		fields?: ListInvoiceFieldPolicy,
	},
	ListNoums?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ListNoumsKeySpecifier | (() => undefined | ListNoumsKeySpecifier),
		fields?: ListNoumsFieldPolicy,
	},
	ListUserInvitesForAdminFilter?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ListUserInvitesForAdminFilterKeySpecifier | (() => undefined | ListUserInvitesForAdminFilterKeySpecifier),
		fields?: ListUserInvitesForAdminFilterFieldPolicy,
	},
	ListUsersForAdminFilter?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ListUsersForAdminFilterKeySpecifier | (() => undefined | ListUsersForAdminFilterKeySpecifier),
		fields?: ListUsersForAdminFilterFieldPolicy,
	},
	LocationOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LocationOutputKeySpecifier | (() => undefined | LocationOutputKeySpecifier),
		fields?: LocationOutputFieldPolicy,
	},
	LoginOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoginOutputKeySpecifier | (() => undefined | LoginOutputKeySpecifier),
		fields?: LoginOutputFieldPolicy,
	},
	LogsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LogsOutputKeySpecifier | (() => undefined | LogsOutputKeySpecifier),
		fields?: LogsOutputFieldPolicy,
	},
	MatchOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MatchOutputKeySpecifier | (() => undefined | MatchOutputKeySpecifier),
		fields?: MatchOutputFieldPolicy,
	},
	Matches?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MatchesKeySpecifier | (() => undefined | MatchesKeySpecifier),
		fields?: MatchesFieldPolicy,
	},
	MaxMinValue?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MaxMinValueKeySpecifier | (() => undefined | MaxMinValueKeySpecifier),
		fields?: MaxMinValueFieldPolicy,
	},
	Member?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MemberKeySpecifier | (() => undefined | MemberKeySpecifier),
		fields?: MemberFieldPolicy,
	},
	MembersOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MembersOutputKeySpecifier | (() => undefined | MembersOutputKeySpecifier),
		fields?: MembersOutputFieldPolicy,
	},
	MessageOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MessageOutputKeySpecifier | (() => undefined | MessageOutputKeySpecifier),
		fields?: MessageOutputFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	MuteSpeakerSubscriptionData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MuteSpeakerSubscriptionDataKeySpecifier | (() => undefined | MuteSpeakerSubscriptionDataKeySpecifier),
		fields?: MuteSpeakerSubscriptionDataFieldPolicy,
	},
	NMUserOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NMUserOutputKeySpecifier | (() => undefined | NMUserOutputKeySpecifier),
		fields?: NMUserOutputFieldPolicy,
	},
	NetworkOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NetworkOutputKeySpecifier | (() => undefined | NetworkOutputKeySpecifier),
		fields?: NetworkOutputFieldPolicy,
	},
	NeuroProfileQueries?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NeuroProfileQueriesKeySpecifier | (() => undefined | NeuroProfileQueriesKeySpecifier),
		fields?: NeuroProfileQueriesFieldPolicy,
	},
	NewProductOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NewProductOutputKeySpecifier | (() => undefined | NewProductOutputKeySpecifier),
		fields?: NewProductOutputFieldPolicy,
	},
	NoRelationBusinessOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoRelationBusinessOutputKeySpecifier | (() => undefined | NoRelationBusinessOutputKeySpecifier),
		fields?: NoRelationBusinessOutputFieldPolicy,
	},
	Note?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoteKeySpecifier | (() => undefined | NoteKeySpecifier),
		fields?: NoteFieldPolicy,
	},
	Notification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotificationKeySpecifier | (() => undefined | NotificationKeySpecifier),
		fields?: NotificationFieldPolicy,
	},
	NotificationAdditionalData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotificationAdditionalDataKeySpecifier | (() => undefined | NotificationAdditionalDataKeySpecifier),
		fields?: NotificationAdditionalDataFieldPolicy,
	},
	NotificationAdditionalDataV2?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotificationAdditionalDataV2KeySpecifier | (() => undefined | NotificationAdditionalDataV2KeySpecifier),
		fields?: NotificationAdditionalDataV2FieldPolicy,
	},
	NotificationDataAdCampaign?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotificationDataAdCampaignKeySpecifier | (() => undefined | NotificationDataAdCampaignKeySpecifier),
		fields?: NotificationDataAdCampaignFieldPolicy,
	},
	NotificationOP?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotificationOPKeySpecifier | (() => undefined | NotificationOPKeySpecifier),
		fields?: NotificationOPFieldPolicy,
	},
	NotificationPaymentSubData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotificationPaymentSubDataKeySpecifier | (() => undefined | NotificationPaymentSubDataKeySpecifier),
		fields?: NotificationPaymentSubDataFieldPolicy,
	},
	NotificationPaymentSubscriptionDataV2?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotificationPaymentSubscriptionDataV2KeySpecifier | (() => undefined | NotificationPaymentSubscriptionDataV2KeySpecifier),
		fields?: NotificationPaymentSubscriptionDataV2FieldPolicy,
	},
	NotificationSubscriptionData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotificationSubscriptionDataKeySpecifier | (() => undefined | NotificationSubscriptionDataKeySpecifier),
		fields?: NotificationSubscriptionDataFieldPolicy,
	},
	NotificationV2?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotificationV2KeySpecifier | (() => undefined | NotificationV2KeySpecifier),
		fields?: NotificationV2FieldPolicy,
	},
	Notifications?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotificationsKeySpecifier | (() => undefined | NotificationsKeySpecifier),
		fields?: NotificationsFieldPolicy,
	},
	NotificationsV2?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotificationsV2KeySpecifier | (() => undefined | NotificationsV2KeySpecifier),
		fields?: NotificationsV2FieldPolicy,
	},
	NotifyOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotifyOutputKeySpecifier | (() => undefined | NotifyOutputKeySpecifier),
		fields?: NotifyOutputFieldPolicy,
	},
	NoumActivityStats?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumActivityStatsKeySpecifier | (() => undefined | NoumActivityStatsKeySpecifier),
		fields?: NoumActivityStatsFieldPolicy,
	},
	NoumClass?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumClassKeySpecifier | (() => undefined | NoumClassKeySpecifier),
		fields?: NoumClassFieldPolicy,
	},
	NoumClassList?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumClassListKeySpecifier | (() => undefined | NoumClassListKeySpecifier),
		fields?: NoumClassListFieldPolicy,
	},
	NoumColors?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumColorsKeySpecifier | (() => undefined | NoumColorsKeySpecifier),
		fields?: NoumColorsFieldPolicy,
	},
	NoumConnectionKPIDatePoint?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumConnectionKPIDatePointKeySpecifier | (() => undefined | NoumConnectionKPIDatePointKeySpecifier),
		fields?: NoumConnectionKPIDatePointFieldPolicy,
	},
	NoumConnectionRequest?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumConnectionRequestKeySpecifier | (() => undefined | NoumConnectionRequestKeySpecifier),
		fields?: NoumConnectionRequestFieldPolicy,
	},
	NoumConnectionsKPI?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumConnectionsKPIKeySpecifier | (() => undefined | NoumConnectionsKPIKeySpecifier),
		fields?: NoumConnectionsKPIFieldPolicy,
	},
	NoumContactAdminResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumContactAdminResultKeySpecifier | (() => undefined | NoumContactAdminResultKeySpecifier),
		fields?: NoumContactAdminResultFieldPolicy,
	},
	NoumContactOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumContactOutputKeySpecifier | (() => undefined | NoumContactOutputKeySpecifier),
		fields?: NoumContactOutputFieldPolicy,
	},
	NoumContactPaginated?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumContactPaginatedKeySpecifier | (() => undefined | NoumContactPaginatedKeySpecifier),
		fields?: NoumContactPaginatedFieldPolicy,
	},
	NoumContractOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumContractOutputKeySpecifier | (() => undefined | NoumContractOutputKeySpecifier),
		fields?: NoumContractOutputFieldPolicy,
	},
	NoumContractOutputAdmin?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumContractOutputAdminKeySpecifier | (() => undefined | NoumContractOutputAdminKeySpecifier),
		fields?: NoumContractOutputAdminFieldPolicy,
	},
	NoumFile?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumFileKeySpecifier | (() => undefined | NoumFileKeySpecifier),
		fields?: NoumFileFieldPolicy,
	},
	NoumFollowKPIDatePoint?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumFollowKPIDatePointKeySpecifier | (() => undefined | NoumFollowKPIDatePointKeySpecifier),
		fields?: NoumFollowKPIDatePointFieldPolicy,
	},
	NoumFollowersKPI?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumFollowersKPIKeySpecifier | (() => undefined | NoumFollowersKPIKeySpecifier),
		fields?: NoumFollowersKPIFieldPolicy,
	},
	NoumGroupConversationItem?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumGroupConversationItemKeySpecifier | (() => undefined | NoumGroupConversationItemKeySpecifier),
		fields?: NoumGroupConversationItemFieldPolicy,
	},
	NoumLayout?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumLayoutKeySpecifier | (() => undefined | NoumLayoutKeySpecifier),
		fields?: NoumLayoutFieldPolicy,
	},
	NoumLayoutColumn?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumLayoutColumnKeySpecifier | (() => undefined | NoumLayoutColumnKeySpecifier),
		fields?: NoumLayoutColumnFieldPolicy,
	},
	NoumLayoutSection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumLayoutSectionKeySpecifier | (() => undefined | NoumLayoutSectionKeySpecifier),
		fields?: NoumLayoutSectionFieldPolicy,
	},
	NoumLink?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumLinkKeySpecifier | (() => undefined | NoumLinkKeySpecifier),
		fields?: NoumLinkFieldPolicy,
	},
	NoumLinkResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumLinkResponseKeySpecifier | (() => undefined | NoumLinkResponseKeySpecifier),
		fields?: NoumLinkResponseFieldPolicy,
	},
	NoumMember?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumMemberKeySpecifier | (() => undefined | NoumMemberKeySpecifier),
		fields?: NoumMemberFieldPolicy,
	},
	NoumMemberByIdRef?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumMemberByIdRefKeySpecifier | (() => undefined | NoumMemberByIdRefKeySpecifier),
		fields?: NoumMemberByIdRefFieldPolicy,
	},
	NoumMemberRole?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumMemberRoleKeySpecifier | (() => undefined | NoumMemberRoleKeySpecifier),
		fields?: NoumMemberRoleFieldPolicy,
	},
	NoumMembershipStatus?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumMembershipStatusKeySpecifier | (() => undefined | NoumMembershipStatusKeySpecifier),
		fields?: NoumMembershipStatusFieldPolicy,
	},
	NoumPendingConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumPendingConnectionKeySpecifier | (() => undefined | NoumPendingConnectionKeySpecifier),
		fields?: NoumPendingConnectionFieldPolicy,
	},
	NoumProgram?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumProgramKeySpecifier | (() => undefined | NoumProgramKeySpecifier),
		fields?: NoumProgramFieldPolicy,
	},
	NoumProgramList?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumProgramListKeySpecifier | (() => undefined | NoumProgramListKeySpecifier),
		fields?: NoumProgramListFieldPolicy,
	},
	NoumQuestionOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumQuestionOutputKeySpecifier | (() => undefined | NoumQuestionOutputKeySpecifier),
		fields?: NoumQuestionOutputFieldPolicy,
	},
	NoumReference?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumReferenceKeySpecifier | (() => undefined | NoumReferenceKeySpecifier),
		fields?: NoumReferenceFieldPolicy,
	},
	NoumReferenceMetadata?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumReferenceMetadataKeySpecifier | (() => undefined | NoumReferenceMetadataKeySpecifier),
		fields?: NoumReferenceMetadataFieldPolicy,
	},
	NoumReferenceResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumReferenceResponseKeySpecifier | (() => undefined | NoumReferenceResponseKeySpecifier),
		fields?: NoumReferenceResponseFieldPolicy,
	},
	NoumRole?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumRoleKeySpecifier | (() => undefined | NoumRoleKeySpecifier),
		fields?: NoumRoleFieldPolicy,
	},
	NoumRoleElementHistoryLog?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumRoleElementHistoryLogKeySpecifier | (() => undefined | NoumRoleElementHistoryLogKeySpecifier),
		fields?: NoumRoleElementHistoryLogFieldPolicy,
	},
	NoumRoleHistoryLog?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumRoleHistoryLogKeySpecifier | (() => undefined | NoumRoleHistoryLogKeySpecifier),
		fields?: NoumRoleHistoryLogFieldPolicy,
	},
	NoumRoleHistoryLogOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumRoleHistoryLogOutputKeySpecifier | (() => undefined | NoumRoleHistoryLogOutputKeySpecifier),
		fields?: NoumRoleHistoryLogOutputFieldPolicy,
	},
	NoumRoleHistoryLogs?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumRoleHistoryLogsKeySpecifier | (() => undefined | NoumRoleHistoryLogsKeySpecifier),
		fields?: NoumRoleHistoryLogsFieldPolicy,
	},
	NoumRolePermission?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumRolePermissionKeySpecifier | (() => undefined | NoumRolePermissionKeySpecifier),
		fields?: NoumRolePermissionFieldPolicy,
	},
	NoumRolePermissionGroup?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumRolePermissionGroupKeySpecifier | (() => undefined | NoumRolePermissionGroupKeySpecifier),
		fields?: NoumRolePermissionGroupFieldPolicy,
	},
	NoumRolePermissionItem?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumRolePermissionItemKeySpecifier | (() => undefined | NoumRolePermissionItemKeySpecifier),
		fields?: NoumRolePermissionItemFieldPolicy,
	},
	NoumSingleConnectionKPI?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumSingleConnectionKPIKeySpecifier | (() => undefined | NoumSingleConnectionKPIKeySpecifier),
		fields?: NoumSingleConnectionKPIFieldPolicy,
	},
	NoumSingleFollowKPI?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumSingleFollowKPIKeySpecifier | (() => undefined | NoumSingleFollowKPIKeySpecifier),
		fields?: NoumSingleFollowKPIFieldPolicy,
	},
	NoumTransactionFee?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumTransactionFeeKeySpecifier | (() => undefined | NoumTransactionFeeKeySpecifier),
		fields?: NoumTransactionFeeFieldPolicy,
	},
	NoumTransactionFeeByChamberIdRef?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumTransactionFeeByChamberIdRefKeySpecifier | (() => undefined | NoumTransactionFeeByChamberIdRefKeySpecifier),
		fields?: NoumTransactionFeeByChamberIdRefFieldPolicy,
	},
	NoumTransactionFeeHistoryOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumTransactionFeeHistoryOutputKeySpecifier | (() => undefined | NoumTransactionFeeHistoryOutputKeySpecifier),
		fields?: NoumTransactionFeeHistoryOutputFieldPolicy,
	},
	NoumType?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumTypeKeySpecifier | (() => undefined | NoumTypeKeySpecifier),
		fields?: NoumTypeFieldPolicy,
	},
	NoumenaScoreOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumenaScoreOutputKeySpecifier | (() => undefined | NoumenaScoreOutputKeySpecifier),
		fields?: NoumenaScoreOutputFieldPolicy,
	},
	NoumenaScoreOutputByNoumId?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NoumenaScoreOutputByNoumIdKeySpecifier | (() => undefined | NoumenaScoreOutputByNoumIdKeySpecifier),
		fields?: NoumenaScoreOutputByNoumIdFieldPolicy,
	},
	OTPForPasswordOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OTPForPasswordOutputKeySpecifier | (() => undefined | OTPForPasswordOutputKeySpecifier),
		fields?: OTPForPasswordOutputFieldPolicy,
	},
	OTPOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OTPOutputKeySpecifier | (() => undefined | OTPOutputKeySpecifier),
		fields?: OTPOutputFieldPolicy,
	},
	OTPResponseOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OTPResponseOutputKeySpecifier | (() => undefined | OTPResponseOutputKeySpecifier),
		fields?: OTPResponseOutputFieldPolicy,
	},
	OneTimeTokenOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OneTimeTokenOutputKeySpecifier | (() => undefined | OneTimeTokenOutputKeySpecifier),
		fields?: OneTimeTokenOutputFieldPolicy,
	},
	OpsPermissionOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OpsPermissionOutputKeySpecifier | (() => undefined | OpsPermissionOutputKeySpecifier),
		fields?: OpsPermissionOutputFieldPolicy,
	},
	OpsPermissionOutputAdminData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OpsPermissionOutputAdminDataKeySpecifier | (() => undefined | OpsPermissionOutputAdminDataKeySpecifier),
		fields?: OpsPermissionOutputAdminDataFieldPolicy,
	},
	OpsPermissionOutputAdminPaginate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OpsPermissionOutputAdminPaginateKeySpecifier | (() => undefined | OpsPermissionOutputAdminPaginateKeySpecifier),
		fields?: OpsPermissionOutputAdminPaginateFieldPolicy,
	},
	OpsRoleOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OpsRoleOutputKeySpecifier | (() => undefined | OpsRoleOutputKeySpecifier),
		fields?: OpsRoleOutputFieldPolicy,
	},
	OutputListUserInvitesForAdmin?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OutputListUserInvitesForAdminKeySpecifier | (() => undefined | OutputListUserInvitesForAdminKeySpecifier),
		fields?: OutputListUserInvitesForAdminFieldPolicy,
	},
	PaginatedAttendeesData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedAttendeesDataKeySpecifier | (() => undefined | PaginatedAttendeesDataKeySpecifier),
		fields?: PaginatedAttendeesDataFieldPolicy,
	},
	PaginatedEventsData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedEventsDataKeySpecifier | (() => undefined | PaginatedEventsDataKeySpecifier),
		fields?: PaginatedEventsDataFieldPolicy,
	},
	PaginatedLogsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedLogsOutputKeySpecifier | (() => undefined | PaginatedLogsOutputKeySpecifier),
		fields?: PaginatedLogsOutputFieldPolicy,
	},
	PaginatedNoumConnectionRequests?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedNoumConnectionRequestsKeySpecifier | (() => undefined | PaginatedNoumConnectionRequestsKeySpecifier),
		fields?: PaginatedNoumConnectionRequestsFieldPolicy,
	},
	PaginatedNoumFiles?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedNoumFilesKeySpecifier | (() => undefined | PaginatedNoumFilesKeySpecifier),
		fields?: PaginatedNoumFilesFieldPolicy,
	},
	PaginatedNoumMembers?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedNoumMembersKeySpecifier | (() => undefined | PaginatedNoumMembersKeySpecifier),
		fields?: PaginatedNoumMembersFieldPolicy,
	},
	PaginatedNoumPendingConnections?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedNoumPendingConnectionsKeySpecifier | (() => undefined | PaginatedNoumPendingConnectionsKeySpecifier),
		fields?: PaginatedNoumPendingConnectionsFieldPolicy,
	},
	PaginatedNoumRoles?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedNoumRolesKeySpecifier | (() => undefined | PaginatedNoumRolesKeySpecifier),
		fields?: PaginatedNoumRolesFieldPolicy,
	},
	PaginatedSearchableNoumContact?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedSearchableNoumContactKeySpecifier | (() => undefined | PaginatedSearchableNoumContactKeySpecifier),
		fields?: PaginatedSearchableNoumContactFieldPolicy,
	},
	PaginatedSearchableNoumMember?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedSearchableNoumMemberKeySpecifier | (() => undefined | PaginatedSearchableNoumMemberKeySpecifier),
		fields?: PaginatedSearchableNoumMemberFieldPolicy,
	},
	PaginatedThreads?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedThreadsKeySpecifier | (() => undefined | PaginatedThreadsKeySpecifier),
		fields?: PaginatedThreadsFieldPolicy,
	},
	PaginatedTimezoneData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedTimezoneDataKeySpecifier | (() => undefined | PaginatedTimezoneDataKeySpecifier),
		fields?: PaginatedTimezoneDataFieldPolicy,
	},
	PaginationNotificationOp?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginationNotificationOpKeySpecifier | (() => undefined | PaginationNotificationOpKeySpecifier),
		fields?: PaginationNotificationOpFieldPolicy,
	},
	PassCodeResetOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PassCodeResetOutputKeySpecifier | (() => undefined | PassCodeResetOutputKeySpecifier),
		fields?: PassCodeResetOutputFieldPolicy,
	},
	PaymentAccountDetails?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentAccountDetailsKeySpecifier | (() => undefined | PaymentAccountDetailsKeySpecifier),
		fields?: PaymentAccountDetailsFieldPolicy,
	},
	PaymentActivity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentActivityKeySpecifier | (() => undefined | PaymentActivityKeySpecifier),
		fields?: PaymentActivityFieldPolicy,
	},
	PaymentConfiguration?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentConfigurationKeySpecifier | (() => undefined | PaymentConfigurationKeySpecifier),
		fields?: PaymentConfigurationFieldPolicy,
	},
	PaymentCountOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentCountOutputKeySpecifier | (() => undefined | PaymentCountOutputKeySpecifier),
		fields?: PaymentCountOutputFieldPolicy,
	},
	PaymentCustomerDetailOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentCustomerDetailOutputKeySpecifier | (() => undefined | PaymentCustomerDetailOutputKeySpecifier),
		fields?: PaymentCustomerDetailOutputFieldPolicy,
	},
	PaymentCustomerOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentCustomerOutputKeySpecifier | (() => undefined | PaymentCustomerOutputKeySpecifier),
		fields?: PaymentCustomerOutputFieldPolicy,
	},
	PaymentDetailsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentDetailsOutputKeySpecifier | (() => undefined | PaymentDetailsOutputKeySpecifier),
		fields?: PaymentDetailsOutputFieldPolicy,
	},
	PaymentMethodOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentMethodOutputKeySpecifier | (() => undefined | PaymentMethodOutputKeySpecifier),
		fields?: PaymentMethodOutputFieldPolicy,
	},
	PaymentOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentOutputKeySpecifier | (() => undefined | PaymentOutputKeySpecifier),
		fields?: PaymentOutputFieldPolicy,
	},
	PaymentProviderChargesOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentProviderChargesOutputKeySpecifier | (() => undefined | PaymentProviderChargesOutputKeySpecifier),
		fields?: PaymentProviderChargesOutputFieldPolicy,
	},
	PaymentProviderOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentProviderOutputKeySpecifier | (() => undefined | PaymentProviderOutputKeySpecifier),
		fields?: PaymentProviderOutputFieldPolicy,
	},
	PaymentReportDataOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentReportDataOutputKeySpecifier | (() => undefined | PaymentReportDataOutputKeySpecifier),
		fields?: PaymentReportDataOutputFieldPolicy,
	},
	PaymentReportOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentReportOutputKeySpecifier | (() => undefined | PaymentReportOutputKeySpecifier),
		fields?: PaymentReportOutputFieldPolicy,
	},
	PaymentReportWithCountOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentReportWithCountOutputKeySpecifier | (() => undefined | PaymentReportWithCountOutputKeySpecifier),
		fields?: PaymentReportWithCountOutputFieldPolicy,
	},
	PaymentSubReport?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentSubReportKeySpecifier | (() => undefined | PaymentSubReportKeySpecifier),
		fields?: PaymentSubReportFieldPolicy,
	},
	PaymentSubReportLog?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentSubReportLogKeySpecifier | (() => undefined | PaymentSubReportLogKeySpecifier),
		fields?: PaymentSubReportLogFieldPolicy,
	},
	PaymentSubReportPaginated?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentSubReportPaginatedKeySpecifier | (() => undefined | PaymentSubReportPaginatedKeySpecifier),
		fields?: PaymentSubReportPaginatedFieldPolicy,
	},
	PaymentTransactionOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentTransactionOutputKeySpecifier | (() => undefined | PaymentTransactionOutputKeySpecifier),
		fields?: PaymentTransactionOutputFieldPolicy,
	},
	PdfPreview?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PdfPreviewKeySpecifier | (() => undefined | PdfPreviewKeySpecifier),
		fields?: PdfPreviewFieldPolicy,
	},
	PermissionsCountersSubOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PermissionsCountersSubOutputKeySpecifier | (() => undefined | PermissionsCountersSubOutputKeySpecifier),
		fields?: PermissionsCountersSubOutputFieldPolicy,
	},
	PermissionsHomeCountersOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PermissionsHomeCountersOutputKeySpecifier | (() => undefined | PermissionsHomeCountersOutputKeySpecifier),
		fields?: PermissionsHomeCountersOutputFieldPolicy,
	},
	PersonalOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PersonalOutputKeySpecifier | (() => undefined | PersonalOutputKeySpecifier),
		fields?: PersonalOutputFieldPolicy,
	},
	PersonalOutputUser?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PersonalOutputUserKeySpecifier | (() => undefined | PersonalOutputUserKeySpecifier),
		fields?: PersonalOutputUserFieldPolicy,
	},
	PersonalProfileOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PersonalProfileOutputKeySpecifier | (() => undefined | PersonalProfileOutputKeySpecifier),
		fields?: PersonalProfileOutputFieldPolicy,
	},
	PlaidInputSchema?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlaidInputSchemaKeySpecifier | (() => undefined | PlaidInputSchemaKeySpecifier),
		fields?: PlaidInputSchemaFieldPolicy,
	},
	PlaidOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlaidOutputKeySpecifier | (() => undefined | PlaidOutputKeySpecifier),
		fields?: PlaidOutputFieldPolicy,
	},
	PlaidReportList?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlaidReportListKeySpecifier | (() => undefined | PlaidReportListKeySpecifier),
		fields?: PlaidReportListFieldPolicy,
	},
	PlaidReportOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlaidReportOutputKeySpecifier | (() => undefined | PlaidReportOutputKeySpecifier),
		fields?: PlaidReportOutputFieldPolicy,
	},
	PlanDetail?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlanDetailKeySpecifier | (() => undefined | PlanDetailKeySpecifier),
		fields?: PlanDetailFieldPolicy,
	},
	PlanItem?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlanItemKeySpecifier | (() => undefined | PlanItemKeySpecifier),
		fields?: PlanItemFieldPolicy,
	},
	PlanOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlanOutputKeySpecifier | (() => undefined | PlanOutputKeySpecifier),
		fields?: PlanOutputFieldPolicy,
	},
	PlanOutputType?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlanOutputTypeKeySpecifier | (() => undefined | PlanOutputTypeKeySpecifier),
		fields?: PlanOutputTypeFieldPolicy,
	},
	PlanSettingActionItemOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlanSettingActionItemOutputKeySpecifier | (() => undefined | PlanSettingActionItemOutputKeySpecifier),
		fields?: PlanSettingActionItemOutputFieldPolicy,
	},
	PlanSettingItemOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlanSettingItemOutputKeySpecifier | (() => undefined | PlanSettingItemOutputKeySpecifier),
		fields?: PlanSettingItemOutputFieldPolicy,
	},
	PlanSettingNoumOptionsConfigureOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlanSettingNoumOptionsConfigureOutputKeySpecifier | (() => undefined | PlanSettingNoumOptionsConfigureOutputKeySpecifier),
		fields?: PlanSettingNoumOptionsConfigureOutputFieldPolicy,
	},
	PlanSettingNoumOptionsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlanSettingNoumOptionsOutputKeySpecifier | (() => undefined | PlanSettingNoumOptionsOutputKeySpecifier),
		fields?: PlanSettingNoumOptionsOutputFieldPolicy,
	},
	PlanSettingNoumOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlanSettingNoumOutputKeySpecifier | (() => undefined | PlanSettingNoumOutputKeySpecifier),
		fields?: PlanSettingNoumOutputFieldPolicy,
	},
	PlanSettingOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlanSettingOutputKeySpecifier | (() => undefined | PlanSettingOutputKeySpecifier),
		fields?: PlanSettingOutputFieldPolicy,
	},
	PlanSettingTransactionInfoDetail?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlanSettingTransactionInfoDetailKeySpecifier | (() => undefined | PlanSettingTransactionInfoDetailKeySpecifier),
		fields?: PlanSettingTransactionInfoDetailFieldPolicy,
	},
	PlanSettingTransactionInfoFeeDetailsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlanSettingTransactionInfoFeeDetailsOutputKeySpecifier | (() => undefined | PlanSettingTransactionInfoFeeDetailsOutputKeySpecifier),
		fields?: PlanSettingTransactionInfoFeeDetailsOutputFieldPolicy,
	},
	PlanSettingTransactionInfoFeeOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlanSettingTransactionInfoFeeOutputKeySpecifier | (() => undefined | PlanSettingTransactionInfoFeeOutputKeySpecifier),
		fields?: PlanSettingTransactionInfoFeeOutputFieldPolicy,
	},
	PlanSettingTransactionInfoMetadataOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlanSettingTransactionInfoMetadataOutputKeySpecifier | (() => undefined | PlanSettingTransactionInfoMetadataOutputKeySpecifier),
		fields?: PlanSettingTransactionInfoMetadataOutputFieldPolicy,
	},
	PlanSettingTransactionInfoOptions?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlanSettingTransactionInfoOptionsKeySpecifier | (() => undefined | PlanSettingTransactionInfoOptionsKeySpecifier),
		fields?: PlanSettingTransactionInfoOptionsFieldPolicy,
	},
	PlanSettingTransactionInfoOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlanSettingTransactionInfoOutputKeySpecifier | (() => undefined | PlanSettingTransactionInfoOutputKeySpecifier),
		fields?: PlanSettingTransactionInfoOutputFieldPolicy,
	},
	Post?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PostKeySpecifier | (() => undefined | PostKeySpecifier),
		fields?: PostFieldPolicy,
	},
	PostActivity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PostActivityKeySpecifier | (() => undefined | PostActivityKeySpecifier),
		fields?: PostActivityFieldPolicy,
	},
	PostOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PostOutputKeySpecifier | (() => undefined | PostOutputKeySpecifier),
		fields?: PostOutputFieldPolicy,
	},
	PostOutputData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PostOutputDataKeySpecifier | (() => undefined | PostOutputDataKeySpecifier),
		fields?: PostOutputDataFieldPolicy,
	},
	PreCalculateNoumLinkData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PreCalculateNoumLinkDataKeySpecifier | (() => undefined | PreCalculateNoumLinkDataKeySpecifier),
		fields?: PreCalculateNoumLinkDataFieldPolicy,
	},
	PrinciplesAssessmentResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PrinciplesAssessmentResultKeySpecifier | (() => undefined | PrinciplesAssessmentResultKeySpecifier),
		fields?: PrinciplesAssessmentResultFieldPolicy,
	},
	PrinciplesMutations?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PrinciplesMutationsKeySpecifier | (() => undefined | PrinciplesMutationsKeySpecifier),
		fields?: PrinciplesMutationsFieldPolicy,
	},
	PrinciplesQueries?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PrinciplesQueriesKeySpecifier | (() => undefined | PrinciplesQueriesKeySpecifier),
		fields?: PrinciplesQueriesFieldPolicy,
	},
	ProductCategoryOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductCategoryOutputKeySpecifier | (() => undefined | ProductCategoryOutputKeySpecifier),
		fields?: ProductCategoryOutputFieldPolicy,
	},
	ProductOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductOutputKeySpecifier | (() => undefined | ProductOutputKeySpecifier),
		fields?: ProductOutputFieldPolicy,
	},
	ProductProfile?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductProfileKeySpecifier | (() => undefined | ProductProfileKeySpecifier),
		fields?: ProductProfileFieldPolicy,
	},
	ProductTermOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductTermOutputKeySpecifier | (() => undefined | ProductTermOutputKeySpecifier),
		fields?: ProductTermOutputFieldPolicy,
	},
	ProductTypeOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductTypeOutputKeySpecifier | (() => undefined | ProductTypeOutputKeySpecifier),
		fields?: ProductTypeOutputFieldPolicy,
	},
	Profile?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProfileKeySpecifier | (() => undefined | ProfileKeySpecifier),
		fields?: ProfileFieldPolicy,
	},
	ProfileCheckResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProfileCheckResultKeySpecifier | (() => undefined | ProfileCheckResultKeySpecifier),
		fields?: ProfileCheckResultFieldPolicy,
	},
	ProfileCompletion?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProfileCompletionKeySpecifier | (() => undefined | ProfileCompletionKeySpecifier),
		fields?: ProfileCompletionFieldPolicy,
	},
	ProfileOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProfileOutputKeySpecifier | (() => undefined | ProfileOutputKeySpecifier),
		fields?: ProfileOutputFieldPolicy,
	},
	ProfilePictureOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProfilePictureOutputKeySpecifier | (() => undefined | ProfilePictureOutputKeySpecifier),
		fields?: ProfilePictureOutputFieldPolicy,
	},
	ProjectChamberCategory?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProjectChamberCategoryKeySpecifier | (() => undefined | ProjectChamberCategoryKeySpecifier),
		fields?: ProjectChamberCategoryFieldPolicy,
	},
	ProjectNoumCampaign?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProjectNoumCampaignKeySpecifier | (() => undefined | ProjectNoumCampaignKeySpecifier),
		fields?: ProjectNoumCampaignFieldPolicy,
	},
	ProjectNoumCampaignResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProjectNoumCampaignResponseKeySpecifier | (() => undefined | ProjectNoumCampaignResponseKeySpecifier),
		fields?: ProjectNoumCampaignResponseFieldPolicy,
	},
	PublishableKey?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PublishableKeyKeySpecifier | (() => undefined | PublishableKeyKeySpecifier),
		fields?: PublishableKeyFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	QuestionAndAnswers?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QuestionAndAnswersKeySpecifier | (() => undefined | QuestionAndAnswersKeySpecifier),
		fields?: QuestionAndAnswersFieldPolicy,
	},
	QuestionAndAnswersOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QuestionAndAnswersOutputKeySpecifier | (() => undefined | QuestionAndAnswersOutputKeySpecifier),
		fields?: QuestionAndAnswersOutputFieldPolicy,
	},
	QuestionOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QuestionOutputKeySpecifier | (() => undefined | QuestionOutputKeySpecifier),
		fields?: QuestionOutputFieldPolicy,
	},
	QuestionOutputResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QuestionOutputResponseKeySpecifier | (() => undefined | QuestionOutputResponseKeySpecifier),
		fields?: QuestionOutputResponseFieldPolicy,
	},
	QuestionsAnswerOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QuestionsAnswerOutputKeySpecifier | (() => undefined | QuestionsAnswerOutputKeySpecifier),
		fields?: QuestionsAnswerOutputFieldPolicy,
	},
	QuestionsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QuestionsOutputKeySpecifier | (() => undefined | QuestionsOutputKeySpecifier),
		fields?: QuestionsOutputFieldPolicy,
	},
	QuestionsRiseOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QuestionsRiseOutputKeySpecifier | (() => undefined | QuestionsRiseOutputKeySpecifier),
		fields?: QuestionsRiseOutputFieldPolicy,
	},
	RaisePaymentOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RaisePaymentOutputKeySpecifier | (() => undefined | RaisePaymentOutputKeySpecifier),
		fields?: RaisePaymentOutputFieldPolicy,
	},
	RaisedHandSubscriptionData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RaisedHandSubscriptionDataKeySpecifier | (() => undefined | RaisedHandSubscriptionDataKeySpecifier),
		fields?: RaisedHandSubscriptionDataFieldPolicy,
	},
	Reaction?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ReactionKeySpecifier | (() => undefined | ReactionKeySpecifier),
		fields?: ReactionFieldPolicy,
	},
	ReactionOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ReactionOutputKeySpecifier | (() => undefined | ReactionOutputKeySpecifier),
		fields?: ReactionOutputFieldPolicy,
	},
	RecentSearchesResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RecentSearchesResultKeySpecifier | (() => undefined | RecentSearchesResultKeySpecifier),
		fields?: RecentSearchesResultFieldPolicy,
	},
	RecurringDetails?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RecurringDetailsKeySpecifier | (() => undefined | RecurringDetailsKeySpecifier),
		fields?: RecurringDetailsFieldPolicy,
	},
	Referral?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ReferralKeySpecifier | (() => undefined | ReferralKeySpecifier),
		fields?: ReferralFieldPolicy,
	},
	ReferralInvite?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ReferralInviteKeySpecifier | (() => undefined | ReferralInviteKeySpecifier),
		fields?: ReferralInviteFieldPolicy,
	},
	ReplyOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ReplyOutputKeySpecifier | (() => undefined | ReplyOutputKeySpecifier),
		fields?: ReplyOutputFieldPolicy,
	},
	ReportOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ReportOutputKeySpecifier | (() => undefined | ReportOutputKeySpecifier),
		fields?: ReportOutputFieldPolicy,
	},
	ResolutionOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ResolutionOutputKeySpecifier | (() => undefined | ResolutionOutputKeySpecifier),
		fields?: ResolutionOutputFieldPolicy,
	},
	ResultOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ResultOutputKeySpecifier | (() => undefined | ResultOutputKeySpecifier),
		fields?: ResultOutputFieldPolicy,
	},
	RiseApplication?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RiseApplicationKeySpecifier | (() => undefined | RiseApplicationKeySpecifier),
		fields?: RiseApplicationFieldPolicy,
	},
	RiseBankListOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RiseBankListOutputKeySpecifier | (() => undefined | RiseBankListOutputKeySpecifier),
		fields?: RiseBankListOutputFieldPolicy,
	},
	RisePersonalProfileOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RisePersonalProfileOutputKeySpecifier | (() => undefined | RisePersonalProfileOutputKeySpecifier),
		fields?: RisePersonalProfileOutputFieldPolicy,
	},
	RiseReportListOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RiseReportListOutputKeySpecifier | (() => undefined | RiseReportListOutputKeySpecifier),
		fields?: RiseReportListOutputFieldPolicy,
	},
	RiseReportOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RiseReportOutputKeySpecifier | (() => undefined | RiseReportOutputKeySpecifier),
		fields?: RiseReportOutputFieldPolicy,
	},
	RiseUserDataOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RiseUserDataOutputKeySpecifier | (() => undefined | RiseUserDataOutputKeySpecifier),
		fields?: RiseUserDataOutputFieldPolicy,
	},
	SOW?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SOWKeySpecifier | (() => undefined | SOWKeySpecifier),
		fields?: SOWFieldPolicy,
	},
	SOWOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SOWOutputKeySpecifier | (() => undefined | SOWOutputKeySpecifier),
		fields?: SOWOutputFieldPolicy,
	},
	SaveCardOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SaveCardOutputKeySpecifier | (() => undefined | SaveCardOutputKeySpecifier),
		fields?: SaveCardOutputFieldPolicy,
	},
	ScoreLineOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ScoreLineOutputKeySpecifier | (() => undefined | ScoreLineOutputKeySpecifier),
		fields?: ScoreLineOutputFieldPolicy,
	},
	SearchableNoumContact?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SearchableNoumContactKeySpecifier | (() => undefined | SearchableNoumContactKeySpecifier),
		fields?: SearchableNoumContactFieldPolicy,
	},
	SearchableNoumMember?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SearchableNoumMemberKeySpecifier | (() => undefined | SearchableNoumMemberKeySpecifier),
		fields?: SearchableNoumMemberFieldPolicy,
	},
	SettingsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SettingsOutputKeySpecifier | (() => undefined | SettingsOutputKeySpecifier),
		fields?: SettingsOutputFieldPolicy,
	},
	SignedUrlOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SignedUrlOutputKeySpecifier | (() => undefined | SignedUrlOutputKeySpecifier),
		fields?: SignedUrlOutputFieldPolicy,
	},
	Skill?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SkillKeySpecifier | (() => undefined | SkillKeySpecifier),
		fields?: SkillFieldPolicy,
	},
	SkillsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SkillsOutputKeySpecifier | (() => undefined | SkillsOutputKeySpecifier),
		fields?: SkillsOutputFieldPolicy,
	},
	SocialGroup?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SocialGroupKeySpecifier | (() => undefined | SocialGroupKeySpecifier),
		fields?: SocialGroupFieldPolicy,
	},
	SocialGroups?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SocialGroupsKeySpecifier | (() => undefined | SocialGroupsKeySpecifier),
		fields?: SocialGroupsFieldPolicy,
	},
	SocialHall?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SocialHallKeySpecifier | (() => undefined | SocialHallKeySpecifier),
		fields?: SocialHallFieldPolicy,
	},
	SocialHallAttendee?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SocialHallAttendeeKeySpecifier | (() => undefined | SocialHallAttendeeKeySpecifier),
		fields?: SocialHallAttendeeFieldPolicy,
	},
	SocialHallAttendees?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SocialHallAttendeesKeySpecifier | (() => undefined | SocialHallAttendeesKeySpecifier),
		fields?: SocialHallAttendeesFieldPolicy,
	},
	SocialHallUpdatesResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SocialHallUpdatesResponseKeySpecifier | (() => undefined | SocialHallUpdatesResponseKeySpecifier),
		fields?: SocialHallUpdatesResponseFieldPolicy,
	},
	SocialLink?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SocialLinkKeySpecifier | (() => undefined | SocialLinkKeySpecifier),
		fields?: SocialLinkFieldPolicy,
	},
	SortBy?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SortByKeySpecifier | (() => undefined | SortByKeySpecifier),
		fields?: SortByFieldPolicy,
	},
	SpaceConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SpaceConnectionKeySpecifier | (() => undefined | SpaceConnectionKeySpecifier),
		fields?: SpaceConnectionFieldPolicy,
	},
	SpaceConnectionDraft?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SpaceConnectionDraftKeySpecifier | (() => undefined | SpaceConnectionDraftKeySpecifier),
		fields?: SpaceConnectionDraftFieldPolicy,
	},
	SpaceConnectionsResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SpaceConnectionsResponseKeySpecifier | (() => undefined | SpaceConnectionsResponseKeySpecifier),
		fields?: SpaceConnectionsResponseFieldPolicy,
	},
	SpaceDraftData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SpaceDraftDataKeySpecifier | (() => undefined | SpaceDraftDataKeySpecifier),
		fields?: SpaceDraftDataFieldPolicy,
	},
	SpaceOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SpaceOutputKeySpecifier | (() => undefined | SpaceOutputKeySpecifier),
		fields?: SpaceOutputFieldPolicy,
	},
	SpaceOutputResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SpaceOutputResponseKeySpecifier | (() => undefined | SpaceOutputResponseKeySpecifier),
		fields?: SpaceOutputResponseFieldPolicy,
	},
	SpaceProfileValue?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SpaceProfileValueKeySpecifier | (() => undefined | SpaceProfileValueKeySpecifier),
		fields?: SpaceProfileValueFieldPolicy,
	},
	SpeakerInvitation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SpeakerInvitationKeySpecifier | (() => undefined | SpeakerInvitationKeySpecifier),
		fields?: SpeakerInvitationFieldPolicy,
	},
	SpeakerInvitationSubscriptionData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SpeakerInvitationSubscriptionDataKeySpecifier | (() => undefined | SpeakerInvitationSubscriptionDataKeySpecifier),
		fields?: SpeakerInvitationSubscriptionDataFieldPolicy,
	},
	StandardResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StandardResponseKeySpecifier | (() => undefined | StandardResponseKeySpecifier),
		fields?: StandardResponseFieldPolicy,
	},
	StatementDetailsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StatementDetailsOutputKeySpecifier | (() => undefined | StatementDetailsOutputKeySpecifier),
		fields?: StatementDetailsOutputFieldPolicy,
	},
	StripeCardOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StripeCardOutputKeySpecifier | (() => undefined | StripeCardOutputKeySpecifier),
		fields?: StripeCardOutputFieldPolicy,
	},
	SubSettingCounterOptionsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubSettingCounterOptionsOutputKeySpecifier | (() => undefined | SubSettingCounterOptionsOutputKeySpecifier),
		fields?: SubSettingCounterOptionsOutputFieldPolicy,
	},
	SubSettingCountersOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubSettingCountersOutputKeySpecifier | (() => undefined | SubSettingCountersOutputKeySpecifier),
		fields?: SubSettingCountersOutputFieldPolicy,
	},
	SubSettingNoumCountersOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubSettingNoumCountersOutputKeySpecifier | (() => undefined | SubSettingNoumCountersOutputKeySpecifier),
		fields?: SubSettingNoumCountersOutputFieldPolicy,
	},
	SubSettingOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubSettingOutputKeySpecifier | (() => undefined | SubSettingOutputKeySpecifier),
		fields?: SubSettingOutputFieldPolicy,
	},
	SubWalletBalance?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubWalletBalanceKeySpecifier | (() => undefined | SubWalletBalanceKeySpecifier),
		fields?: SubWalletBalanceFieldPolicy,
	},
	Subscription?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionKeySpecifier | (() => undefined | SubscriptionKeySpecifier),
		fields?: SubscriptionFieldPolicy,
	},
	SubscriptionOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionOutputKeySpecifier | (() => undefined | SubscriptionOutputKeySpecifier),
		fields?: SubscriptionOutputFieldPolicy,
	},
	SubscriptionTypes?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SubscriptionTypesKeySpecifier | (() => undefined | SubscriptionTypesKeySpecifier),
		fields?: SubscriptionTypesFieldPolicy,
	},
	SuccessMessageOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SuccessMessageOutputKeySpecifier | (() => undefined | SuccessMessageOutputKeySpecifier),
		fields?: SuccessMessageOutputFieldPolicy,
	},
	SurveryAnswerPage?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SurveryAnswerPageKeySpecifier | (() => undefined | SurveryAnswerPageKeySpecifier),
		fields?: SurveryAnswerPageFieldPolicy,
	},
	Survey?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SurveyKeySpecifier | (() => undefined | SurveyKeySpecifier),
		fields?: SurveyFieldPolicy,
	},
	SurveyAnswer?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SurveyAnswerKeySpecifier | (() => undefined | SurveyAnswerKeySpecifier),
		fields?: SurveyAnswerFieldPolicy,
	},
	SurveyOutputGetAll?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SurveyOutputGetAllKeySpecifier | (() => undefined | SurveyOutputGetAllKeySpecifier),
		fields?: SurveyOutputGetAllFieldPolicy,
	},
	SurveyPage?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SurveyPageKeySpecifier | (() => undefined | SurveyPageKeySpecifier),
		fields?: SurveyPageFieldPolicy,
	},
	SurveyPageRule?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SurveyPageRuleKeySpecifier | (() => undefined | SurveyPageRuleKeySpecifier),
		fields?: SurveyPageRuleFieldPolicy,
	},
	SurveyPageRuleValues?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SurveyPageRuleValuesKeySpecifier | (() => undefined | SurveyPageRuleValuesKeySpecifier),
		fields?: SurveyPageRuleValuesFieldPolicy,
	},
	SurveyQuestion?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SurveyQuestionKeySpecifier | (() => undefined | SurveyQuestionKeySpecifier),
		fields?: SurveyQuestionFieldPolicy,
	},
	SurveyQuestionType?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SurveyQuestionTypeKeySpecifier | (() => undefined | SurveyQuestionTypeKeySpecifier),
		fields?: SurveyQuestionTypeFieldPolicy,
	},
	SurveyQuestionTypeInput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SurveyQuestionTypeInputKeySpecifier | (() => undefined | SurveyQuestionTypeInputKeySpecifier),
		fields?: SurveyQuestionTypeInputFieldPolicy,
	},
	SurveyQuestionTypeMultiSelect?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SurveyQuestionTypeMultiSelectKeySpecifier | (() => undefined | SurveyQuestionTypeMultiSelectKeySpecifier),
		fields?: SurveyQuestionTypeMultiSelectFieldPolicy,
	},
	SurveyQuestionTypeOption?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SurveyQuestionTypeOptionKeySpecifier | (() => undefined | SurveyQuestionTypeOptionKeySpecifier),
		fields?: SurveyQuestionTypeOptionFieldPolicy,
	},
	SurveyQuestionTypeSelect?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SurveyQuestionTypeSelectKeySpecifier | (() => undefined | SurveyQuestionTypeSelectKeySpecifier),
		fields?: SurveyQuestionTypeSelectFieldPolicy,
	},
	SurveyQuestionTypeValidation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SurveyQuestionTypeValidationKeySpecifier | (() => undefined | SurveyQuestionTypeValidationKeySpecifier),
		fields?: SurveyQuestionTypeValidationFieldPolicy,
	},
	Tag?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TagKeySpecifier | (() => undefined | TagKeySpecifier),
		fields?: TagFieldPolicy,
	},
	TagsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TagsOutputKeySpecifier | (() => undefined | TagsOutputKeySpecifier),
		fields?: TagsOutputFieldPolicy,
	},
	TestDataOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TestDataOutputKeySpecifier | (() => undefined | TestDataOutputKeySpecifier),
		fields?: TestDataOutputFieldPolicy,
	},
	ThemeColors?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ThemeColorsKeySpecifier | (() => undefined | ThemeColorsKeySpecifier),
		fields?: ThemeColorsFieldPolicy,
	},
	ThemeOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ThemeOutputKeySpecifier | (() => undefined | ThemeOutputKeySpecifier),
		fields?: ThemeOutputFieldPolicy,
	},
	ThemeOutputResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ThemeOutputResponseKeySpecifier | (() => undefined | ThemeOutputResponseKeySpecifier),
		fields?: ThemeOutputResponseFieldPolicy,
	},
	ThreadOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ThreadOutputKeySpecifier | (() => undefined | ThreadOutputKeySpecifier),
		fields?: ThreadOutputFieldPolicy,
	},
	ThreadUser?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ThreadUserKeySpecifier | (() => undefined | ThreadUserKeySpecifier),
		fields?: ThreadUserFieldPolicy,
	},
	Timezone?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TimezoneKeySpecifier | (() => undefined | TimezoneKeySpecifier),
		fields?: TimezoneFieldPolicy,
	},
	TipOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TipOutputKeySpecifier | (() => undefined | TipOutputKeySpecifier),
		fields?: TipOutputFieldPolicy,
	},
	Token?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TokenKeySpecifier | (() => undefined | TokenKeySpecifier),
		fields?: TokenFieldPolicy,
	},
	TokenArchive?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TokenArchiveKeySpecifier | (() => undefined | TokenArchiveKeySpecifier),
		fields?: TokenArchiveFieldPolicy,
	},
	TokenArchiveOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TokenArchiveOutputKeySpecifier | (() => undefined | TokenArchiveOutputKeySpecifier),
		fields?: TokenArchiveOutputFieldPolicy,
	},
	TokenLedger?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TokenLedgerKeySpecifier | (() => undefined | TokenLedgerKeySpecifier),
		fields?: TokenLedgerFieldPolicy,
	},
	TokenTransaction?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TokenTransactionKeySpecifier | (() => undefined | TokenTransactionKeySpecifier),
		fields?: TokenTransactionFieldPolicy,
	},
	TokenTransactionDetails?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TokenTransactionDetailsKeySpecifier | (() => undefined | TokenTransactionDetailsKeySpecifier),
		fields?: TokenTransactionDetailsFieldPolicy,
	},
	TokenTransactionHistory?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TokenTransactionHistoryKeySpecifier | (() => undefined | TokenTransactionHistoryKeySpecifier),
		fields?: TokenTransactionHistoryFieldPolicy,
	},
	TokenTransactionType?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TokenTransactionTypeKeySpecifier | (() => undefined | TokenTransactionTypeKeySpecifier),
		fields?: TokenTransactionTypeFieldPolicy,
	},
	TransactionAddressOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransactionAddressOutputKeySpecifier | (() => undefined | TransactionAddressOutputKeySpecifier),
		fields?: TransactionAddressOutputFieldPolicy,
	},
	TransactionAddressPhysicalAddressOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransactionAddressPhysicalAddressOutputKeySpecifier | (() => undefined | TransactionAddressPhysicalAddressOutputKeySpecifier),
		fields?: TransactionAddressPhysicalAddressOutputFieldPolicy,
	},
	TransactionEcheckOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransactionEcheckOutputKeySpecifier | (() => undefined | TransactionEcheckOutputKeySpecifier),
		fields?: TransactionEcheckOutputFieldPolicy,
	},
	TransactionFlagHistoryForAdmin?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransactionFlagHistoryForAdminKeySpecifier | (() => undefined | TransactionFlagHistoryForAdminKeySpecifier),
		fields?: TransactionFlagHistoryForAdminFieldPolicy,
	},
	TransactionLinksOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransactionLinksOutputKeySpecifier | (() => undefined | TransactionLinksOutputKeySpecifier),
		fields?: TransactionLinksOutputFieldPolicy,
	},
	TransactionModel?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransactionModelKeySpecifier | (() => undefined | TransactionModelKeySpecifier),
		fields?: TransactionModelFieldPolicy,
	},
	TransactionOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransactionOutputKeySpecifier | (() => undefined | TransactionOutputKeySpecifier),
		fields?: TransactionOutputFieldPolicy,
	},
	TransactionResourceSpecification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransactionResourceSpecificationKeySpecifier | (() => undefined | TransactionResourceSpecificationKeySpecifier),
		fields?: TransactionResourceSpecificationFieldPolicy,
	},
	TransactionResponseOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransactionResponseOutputKeySpecifier | (() => undefined | TransactionResponseOutputKeySpecifier),
		fields?: TransactionResponseOutputFieldPolicy,
	},
	TransactionsSearchCriteria?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransactionsSearchCriteriaKeySpecifier | (() => undefined | TransactionsSearchCriteriaKeySpecifier),
		fields?: TransactionsSearchCriteriaFieldPolicy,
	},
	TransferDetail?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransferDetailKeySpecifier | (() => undefined | TransferDetailKeySpecifier),
		fields?: TransferDetailFieldPolicy,
	},
	TwilioTokenOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TwilioTokenOutputKeySpecifier | (() => undefined | TwilioTokenOutputKeySpecifier),
		fields?: TwilioTokenOutputFieldPolicy,
	},
	URLOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | URLOutputKeySpecifier | (() => undefined | URLOutputKeySpecifier),
		fields?: URLOutputFieldPolicy,
	},
	UnderwritingCsvReportOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UnderwritingCsvReportOutputKeySpecifier | (() => undefined | UnderwritingCsvReportOutputKeySpecifier),
		fields?: UnderwritingCsvReportOutputFieldPolicy,
	},
	UnderwritingCsvReportOutputData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UnderwritingCsvReportOutputDataKeySpecifier | (() => undefined | UnderwritingCsvReportOutputDataKeySpecifier),
		fields?: UnderwritingCsvReportOutputDataFieldPolicy,
	},
	UnderwritingDervDatapoint?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UnderwritingDervDatapointKeySpecifier | (() => undefined | UnderwritingDervDatapointKeySpecifier),
		fields?: UnderwritingDervDatapointFieldPolicy,
	},
	UnderwritingMutations?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UnderwritingMutationsKeySpecifier | (() => undefined | UnderwritingMutationsKeySpecifier),
		fields?: UnderwritingMutationsFieldPolicy,
	},
	UnderwritingQueries?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UnderwritingQueriesKeySpecifier | (() => undefined | UnderwritingQueriesKeySpecifier),
		fields?: UnderwritingQueriesFieldPolicy,
	},
	UnderwritingScoringReport?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UnderwritingScoringReportKeySpecifier | (() => undefined | UnderwritingScoringReportKeySpecifier),
		fields?: UnderwritingScoringReportFieldPolicy,
	},
	UnderwritingScoringReportInput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UnderwritingScoringReportInputKeySpecifier | (() => undefined | UnderwritingScoringReportInputKeySpecifier),
		fields?: UnderwritingScoringReportInputFieldPolicy,
	},
	UnderwritingScoringReportList?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UnderwritingScoringReportListKeySpecifier | (() => undefined | UnderwritingScoringReportListKeySpecifier),
		fields?: UnderwritingScoringReportListFieldPolicy,
	},
	UniqueSkill?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UniqueSkillKeySpecifier | (() => undefined | UniqueSkillKeySpecifier),
		fields?: UniqueSkillFieldPolicy,
	},
	UniqueToolStatus?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UniqueToolStatusKeySpecifier | (() => undefined | UniqueToolStatusKeySpecifier),
		fields?: UniqueToolStatusFieldPolicy,
	},
	UnreadNotificationCount?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UnreadNotificationCountKeySpecifier | (() => undefined | UnreadNotificationCountKeySpecifier),
		fields?: UnreadNotificationCountFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	UserAccessData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserAccessDataKeySpecifier | (() => undefined | UserAccessDataKeySpecifier),
		fields?: UserAccessDataFieldPolicy,
	},
	UserActionLog?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserActionLogKeySpecifier | (() => undefined | UserActionLogKeySpecifier),
		fields?: UserActionLogFieldPolicy,
	},
	UserBankLinkOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserBankLinkOutputKeySpecifier | (() => undefined | UserBankLinkOutputKeySpecifier),
		fields?: UserBankLinkOutputFieldPolicy,
	},
	UserConfigOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserConfigOutputKeySpecifier | (() => undefined | UserConfigOutputKeySpecifier),
		fields?: UserConfigOutputFieldPolicy,
	},
	UserConnectionGroupsId?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserConnectionGroupsIdKeySpecifier | (() => undefined | UserConnectionGroupsIdKeySpecifier),
		fields?: UserConnectionGroupsIdFieldPolicy,
	},
	UserContractOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserContractOutputKeySpecifier | (() => undefined | UserContractOutputKeySpecifier),
		fields?: UserContractOutputFieldPolicy,
	},
	UserCredentialsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserCredentialsOutputKeySpecifier | (() => undefined | UserCredentialsOutputKeySpecifier),
		fields?: UserCredentialsOutputFieldPolicy,
	},
	UserDataOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserDataOutputKeySpecifier | (() => undefined | UserDataOutputKeySpecifier),
		fields?: UserDataOutputFieldPolicy,
	},
	UserDeviceTokenOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserDeviceTokenOutputKeySpecifier | (() => undefined | UserDeviceTokenOutputKeySpecifier),
		fields?: UserDeviceTokenOutputFieldPolicy,
	},
	UserFavourites?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserFavouritesKeySpecifier | (() => undefined | UserFavouritesKeySpecifier),
		fields?: UserFavouritesFieldPolicy,
	},
	UserFavouritesOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserFavouritesOutputKeySpecifier | (() => undefined | UserFavouritesOutputKeySpecifier),
		fields?: UserFavouritesOutputFieldPolicy,
	},
	UserHistoryOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserHistoryOutputKeySpecifier | (() => undefined | UserHistoryOutputKeySpecifier),
		fields?: UserHistoryOutputFieldPolicy,
	},
	UserInvoiceLineItemOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserInvoiceLineItemOutputKeySpecifier | (() => undefined | UserInvoiceLineItemOutputKeySpecifier),
		fields?: UserInvoiceLineItemOutputFieldPolicy,
	},
	UserMonthlyDataOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserMonthlyDataOutputKeySpecifier | (() => undefined | UserMonthlyDataOutputKeySpecifier),
		fields?: UserMonthlyDataOutputFieldPolicy,
	},
	UserOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserOutputKeySpecifier | (() => undefined | UserOutputKeySpecifier),
		fields?: UserOutputFieldPolicy,
	},
	UserOutputAllUsers?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserOutputAllUsersKeySpecifier | (() => undefined | UserOutputAllUsersKeySpecifier),
		fields?: UserOutputAllUsersFieldPolicy,
	},
	UserOutputCount?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserOutputCountKeySpecifier | (() => undefined | UserOutputCountKeySpecifier),
		fields?: UserOutputCountFieldPolicy,
	},
	UserOutputForGroup?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserOutputForGroupKeySpecifier | (() => undefined | UserOutputForGroupKeySpecifier),
		fields?: UserOutputForGroupFieldPolicy,
	},
	UserOutputListUsersForAdmin?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserOutputListUsersForAdminKeySpecifier | (() => undefined | UserOutputListUsersForAdminKeySpecifier),
		fields?: UserOutputListUsersForAdminFieldPolicy,
	},
	UserOutputVisibility?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserOutputVisibilityKeySpecifier | (() => undefined | UserOutputVisibilityKeySpecifier),
		fields?: UserOutputVisibilityFieldPolicy,
	},
	UserOutputVisibilityTo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserOutputVisibilityToKeySpecifier | (() => undefined | UserOutputVisibilityToKeySpecifier),
		fields?: UserOutputVisibilityToFieldPolicy,
	},
	UserPreferences?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserPreferencesKeySpecifier | (() => undefined | UserPreferencesKeySpecifier),
		fields?: UserPreferencesFieldPolicy,
	},
	UserRoleOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserRoleOutputKeySpecifier | (() => undefined | UserRoleOutputKeySpecifier),
		fields?: UserRoleOutputFieldPolicy,
	},
	UserSearchResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserSearchResponseKeySpecifier | (() => undefined | UserSearchResponseKeySpecifier),
		fields?: UserSearchResponseFieldPolicy,
	},
	UserSelectedQuestionAndAnswersOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserSelectedQuestionAndAnswersOutputKeySpecifier | (() => undefined | UserSelectedQuestionAndAnswersOutputKeySpecifier),
		fields?: UserSelectedQuestionAndAnswersOutputFieldPolicy,
	},
	UserSelectedQuestionAndAnswersOutputObject?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserSelectedQuestionAndAnswersOutputObjectKeySpecifier | (() => undefined | UserSelectedQuestionAndAnswersOutputObjectKeySpecifier),
		fields?: UserSelectedQuestionAndAnswersOutputObjectFieldPolicy,
	},
	UserSelectionForQuestionAndAnswers?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserSelectionForQuestionAndAnswersKeySpecifier | (() => undefined | UserSelectionForQuestionAndAnswersKeySpecifier),
		fields?: UserSelectionForQuestionAndAnswersFieldPolicy,
	},
	UserSocialHall?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserSocialHallKeySpecifier | (() => undefined | UserSocialHallKeySpecifier),
		fields?: UserSocialHallFieldPolicy,
	},
	ValidateInvoiceSequenceOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ValidateInvoiceSequenceOutputKeySpecifier | (() => undefined | ValidateInvoiceSequenceOutputKeySpecifier),
		fields?: ValidateInvoiceSequenceOutputFieldPolicy,
	},
	VerifyMicroDeposit?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | VerifyMicroDepositKeySpecifier | (() => undefined | VerifyMicroDepositKeySpecifier),
		fields?: VerifyMicroDepositFieldPolicy,
	},
	Visibility?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | VisibilityKeySpecifier | (() => undefined | VisibilityKeySpecifier),
		fields?: VisibilityFieldPolicy,
	},
	WalletDetails?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WalletDetailsKeySpecifier | (() => undefined | WalletDetailsKeySpecifier),
		fields?: WalletDetailsFieldPolicy,
	},
	WalletExistDetailType?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WalletExistDetailTypeKeySpecifier | (() => undefined | WalletExistDetailTypeKeySpecifier),
		fields?: WalletExistDetailTypeFieldPolicy,
	},
	WalletExistType?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WalletExistTypeKeySpecifier | (() => undefined | WalletExistTypeKeySpecifier),
		fields?: WalletExistTypeFieldPolicy,
	},
	addBankResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | addBankResponseKeySpecifier | (() => undefined | addBankResponseKeySpecifier),
		fields?: addBankResponseFieldPolicy,
	},
	commentsWithPagination?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | commentsWithPaginationKeySpecifier | (() => undefined | commentsWithPaginationKeySpecifier),
		fields?: commentsWithPaginationFieldPolicy,
	},
	createCustomerDocumentsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | createCustomerDocumentsOutputKeySpecifier | (() => undefined | createCustomerDocumentsOutputKeySpecifier),
		fields?: createCustomerDocumentsOutputFieldPolicy,
	},
	createSubLedgerOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | createSubLedgerOutputKeySpecifier | (() => undefined | createSubLedgerOutputKeySpecifier),
		fields?: createSubLedgerOutputFieldPolicy,
	},
	distinctUserList?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | distinctUserListKeySpecifier | (() => undefined | distinctUserListKeySpecifier),
		fields?: distinctUserListFieldPolicy,
	},
	downloadDocumentOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | downloadDocumentOutputKeySpecifier | (() => undefined | downloadDocumentOutputKeySpecifier),
		fields?: downloadDocumentOutputFieldPolicy,
	},
	generateCsvResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | generateCsvResponseKeySpecifier | (() => undefined | generateCsvResponseKeySpecifier),
		fields?: generateCsvResponseFieldPolicy,
	},
	getOtpStatsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | getOtpStatsOutputKeySpecifier | (() => undefined | getOtpStatsOutputKeySpecifier),
		fields?: getOtpStatsOutputFieldPolicy,
	},
	getUserDetailsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | getUserDetailsOutputKeySpecifier | (() => undefined | getUserDetailsOutputKeySpecifier),
		fields?: getUserDetailsOutputFieldPolicy,
	},
	inviteNonNoumUserOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | inviteNonNoumUserOutputKeySpecifier | (() => undefined | inviteNonNoumUserOutputKeySpecifier),
		fields?: inviteNonNoumUserOutputFieldPolicy,
	},
	inviteNonNoumUsersOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | inviteNonNoumUsersOutputKeySpecifier | (() => undefined | inviteNonNoumUsersOutputKeySpecifier),
		fields?: inviteNonNoumUsersOutputFieldPolicy,
	},
	isUserSocialHallAttendee?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | isUserSocialHallAttendeeKeySpecifier | (() => undefined | isUserSocialHallAttendeeKeySpecifier),
		fields?: isUserSocialHallAttendeeFieldPolicy,
	},
	keyPair?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | keyPairKeySpecifier | (() => undefined | keyPairKeySpecifier),
		fields?: keyPairFieldPolicy,
	},
	payType?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | payTypeKeySpecifier | (() => undefined | payTypeKeySpecifier),
		fields?: payTypeFieldPolicy,
	},
	paymentConfigOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | paymentConfigOutputKeySpecifier | (() => undefined | paymentConfigOutputKeySpecifier),
		fields?: paymentConfigOutputFieldPolicy,
	},
	submitOnboardingQuestionnaireOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | submitOnboardingQuestionnaireOutputKeySpecifier | (() => undefined | submitOnboardingQuestionnaireOutputKeySpecifier),
		fields?: submitOnboardingQuestionnaireOutputFieldPolicy,
	},
	unreadCountOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | unreadCountOutputKeySpecifier | (() => undefined | unreadCountOutputKeySpecifier),
		fields?: unreadCountOutputFieldPolicy,
	},
	uploadDocumentOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | uploadDocumentOutputKeySpecifier | (() => undefined | uploadDocumentOutputKeySpecifier),
		fields?: uploadDocumentOutputFieldPolicy,
	},
	validateResetPasswordOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | validateResetPasswordOutputKeySpecifier | (() => undefined | validateResetPasswordOutputKeySpecifier),
		fields?: validateResetPasswordOutputFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;