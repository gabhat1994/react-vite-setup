import { addDays, format } from 'date-fns';

import {
  AdCampaignBudgetType,
  type AdCampaignFilter,
  type AdCampaignInput,
  EnumAdCampaignOfferStatus,
  AdCampaignInputStatus,
} from '@/apollo/generated/types';

import { cleanList } from '@/utils/list';
import { type CampaignOfferFragment } from '@/apollo/graphql/fragments/campaignOffer.generated';

import {
  type CampaignForOfferQuery,
  type AccountListOutputFragment,
  type CampaignAccountFragment,
  type CampaignOfferIdQuery,
  type CampaignReportFragment,
  type CampaignSummaryFragment,
} from '@/apollo/graphql';

import { getDifferenceInDays } from '@/utils/getDifferenceInDays';
import { type CampaignFilters } from './CampaignEntries/types';

const mapItem = <T>(item: T) => item;

const appendAdPrefix = (adId: string) => `ADS-${adId}`;

const castType = <T>(item: unknown) => (!item ? null : (item as T));

const formatDate = (iso: string) => format(new Date(iso), 'dd/L/uuuu h:mm a');

const formatForOfferSummary = (iso: string) =>
  format(new Date(iso), 'dd/L/uuuu');

const formatDateForSummary = (iso: string) =>
  format(new Date(iso), 'dd LLL uuuu');

const canDelete = (status: string) =>
  status === AdCampaignInputStatus.InReview ||
  status === AdCampaignInputStatus.Pending;

const removeDraftOffer = (
  data?: CampaignOfferIdQuery['getAdCampaignOffers']['data'],
) =>
  cleanList(data).filter(
    (offer) => offer.status !== EnumAdCampaignOfferStatus.Draft,
  );

const mapCampaignForOffer = (
  campaign?: CampaignForOfferQuery['getSelectedAdCampaignDetails'] | null,
) => ({
  status: campaign?.status ?? '',
  title: campaign?.title ?? '',
  adId: campaign?.adId ?? '',
  targetLocation: campaign?.audience?.targetLocation?.join(',') ?? '',
  category: campaign?.audience?.category?.join(',') ?? '',
  targetLanguage: campaign?.audience?.targetLanguage?.join(',') ?? '',
  startDate: campaign?.startDate ? formatDate(campaign.startDate) : '',
  paymentRef: {
    paymentStatus: campaign?.paymentRef?.paymentStatus ?? '',
  },
  noumId: {
    profileImage: campaign?.noumId?.profileImage ?? '',
    name: campaign?.noumId?.name ?? '',
  },
  createdBy: {
    firstName: campaign?.createdBy?.firstName ?? '',
  },
});

const isEmpty = (value: unknown): boolean =>
  value === undefined ||
  value === null ||
  (typeof value === 'string' && value.trim().length === 0) ||
  (typeof value === 'number' && (value === 0 || Number.isNaN(value))) ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === 'object' && Object.values(value).some(isEmpty));

const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() +
  string.slice(1).toLowerCase().replaceAll('_', ' ');

const mapFilter = (filter: CampaignFilters): Partial<AdCampaignFilter> => ({
  status: filter.status.length ? filter.status : undefined,
  noumIds: filter.noums.length ? filter.noums : undefined,
  campaignTitle: filter.search || '',
});

const getFilters = (): CampaignFilters => ({
  search: '',
  noums: [],
  status: [],
});

const cleanCampaignSummary = (
  campaign?: CampaignSummaryFragment | null,
): AdCampaignInput => ({
  noumId: campaign?.noumId?._id ?? '',
  title: campaign?.title ?? '',
  startDate: campaign?.startDate
    ? new Date(campaign?.startDate)
    : addDays(new Date(), 10),
  budgetAmount: campaign?.budgetAmount ?? 0,
  budgetType:
    castType(campaign?.budgetType) ?? AdCampaignBudgetType.TotalBudget,
  goals: castType(cleanList(campaign?.goals)),
  otherGoals: campaign?.otherGoals ?? undefined,
  audience: {
    category: cleanList(campaign?.audience?.category),
    targetLanguage: cleanList(campaign?.audience?.targetLanguage),
    targetLocation: cleanList(campaign?.audience?.targetLocation),
  },
});

const cleanOffer = (
  offer?: CampaignOfferFragment | null,
): { estimatedDuration: number } & Required<CampaignOfferFragment> => ({
  __typename: offer?.__typename ?? 'AdCampaignOffer',
  _id: offer?._id ?? '',
  startAt: formatForOfferSummary(offer?.startAt ?? new Date().toISOString()),
  clicksWeekly: offer?.clicksWeekly ?? 0,
  costTotal: offer?.costTotal ?? 0,
  cpc: offer?.cpc ?? 0,
  status: offer?.status ?? EnumAdCampaignOfferStatus.Sent,
  costWeekly: offer?.costWeekly ?? 0,
  reachTotal: offer?.reachTotal ?? 0,
  createdAt: offer?.createdAt ?? new Date().toISOString(),
  message: offer?.message ?? '',
  updatedAt: offer?.updatedAt,
  endAt: formatForOfferSummary(offer?.endAt ?? new Date().toISOString()),
  oid: offer?.oid ?? 0,
  estimatedDuration:
    offer?.startAt && offer?.endAt
      ? getDifferenceInDays(offer.endAt, offer.startAt)
      : 0,

  createdBy: {
    firstName: offer?.createdBy?.firstName ?? '',
    lastName: offer?.createdBy?.lastName ?? '',
    profile: {
      profilePicture: offer?.createdBy?.profile?.profilePicture ?? '',
    },
  },
  goalConnectedUsers: {
    __typename:
      offer?.goalConnectedUsers?.__typename ??
      'AdCampaignOfferGoalsConnectedUsers',
    currentFollowers: offer?.goalConnectedUsers?.currentFollowers ?? 0,
    currentUsers: offer?.goalConnectedUsers?.currentUsers ?? 0,
    predictedFollowers: offer?.goalConnectedUsers?.predictedFollowers ?? 0,
    predictedUsers: offer?.goalConnectedUsers?.predictedUsers ?? 0,
  },
  goalNoumVisibility: {
    __typename:
      offer?.goalNoumVisibility?.__typename ??
      'AdCampaignOfferGoalsNoumVisibility',
    currentViews: offer?.goalNoumVisibility?.currentViews ?? 0,
    predictedViews: offer?.goalNoumVisibility?.predictedViews ?? 0,
  },
});

const cleanReport = (report?: CampaignReportFragment | null) => ({
  createdAt: report?.reportDate
    ? formatForOfferSummary(report?.reportDate)
    : 'NA',
  clientMessage: report?.clientMessage ?? '',
  reportId: report?.reportId ?? '',
  metrics: {
    avgCPC: report?.metrics?.avgCPC ?? 0,
    clicks: report?.metrics?.clicks ?? 0,
    cost: report?.metrics?.clicks ?? 0,
    ctr: report?.metrics?.ctr ?? 0,
    impressions: report?.metrics?.impressions ?? 0,
  },
  createdBy: {
    firstName: report?.createdBy?.firstName ?? '',
    lastName: report?.createdBy?.lastName ?? '',
    profile: {
      profilePicture: report?.createdBy?.profile?.profilePicture ?? '',
    },
  },
});

const mapCampaignAcount = (account?: CampaignAccountFragment | null) =>
  ({
    ...account,
    __typename: 'AccountListOutput',
  } as AccountListOutputFragment);

/*
  Hide Reject Button cases
  1. Offer status is other than "SENT"
*/
const hideReject = (offerStatus: EnumAdCampaignOfferStatus) =>
  offerStatus !== EnumAdCampaignOfferStatus.Sent;

/*
	Hide Payment flow
	1. Campaign Status is In Acceptance, Paid, Complete, Live
	2. Offer status is rejected
*/
const hidePayment = (
  campaignStatus: string,
  offerStatus: EnumAdCampaignOfferStatus,
) =>
  offerStatus === EnumAdCampaignOfferStatus.Rejected ||
  campaignStatus === AdCampaignInputStatus.InAcceptance ||
  campaignStatus === AdCampaignInputStatus.Paid ||
  campaignStatus === AdCampaignInputStatus.Completed ||
  campaignStatus === AdCampaignInputStatus.Live;

/*
  Update Accept And Pay Button Text if campaign payment is failed and offer status is accepted
*/

const isRepayment = (
  campaignStatus: string,
  offerStatus: EnumAdCampaignOfferStatus,
) =>
  campaignStatus === AdCampaignInputStatus.PaymentFailed &&
  offerStatus === EnumAdCampaignOfferStatus.Accepted;

const updateOfferAppearance = (status: EnumAdCampaignOfferStatus) =>
  status !== EnumAdCampaignOfferStatus.Sent;

const numberWithCommas = (num: number): string =>
  Intl.NumberFormat('en-US').format(num);

const getAudienceLength = (category: string[]) =>
  category.length ? category.join(',').length : 0;

const truncateString = (value: string, length: number) => {
  if (value.length < length) return value;
  const slicedValue = `${value.slice(0, length)}...`;
  return slicedValue;
};

export const Utils = {
  mapItem,
  isEmpty,
  capitalizeFirstLetter,
  mapFilter,
  appendAdPrefix,
  canDelete,
  cleanCampaignSummary,
  castType,
  getFilters,
  formatDate,
  cleanOffer,
  mapCampaignForOffer,
  removeDraftOffer,
  cleanReport,
  mapCampaignAcount,
  updateOfferAppearance,
  numberWithCommas,
  formatDateForSummary,
  hideReject,
  hidePayment,
  isRepayment,
  getAudienceLength,
  truncateString,
};
