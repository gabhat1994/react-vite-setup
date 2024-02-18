import { type CampaignReportForCampaignSummaryFragment } from '@/apollo/graphql';
import { type CampaignOfferFragment } from '@/apollo/graphql/fragments/campaignOffer.generated';

export type OffersAndReportsProps = {
  heading: 'Offers' | 'Reports';
  type: 'offer' | 'report';
  noDataNote: string;
  count: number;
  list:
    | Pick<CampaignOfferFragment, '_id' | 'createdAt' | 'status' | 'oid'>[]
    | Pick<
        CampaignReportForCampaignSummaryFragment,
        '_id' | 'createdAt' | 'reportId'
      >[];
  onView: (id: string) => void;
  onToggleOldOffers?: (checked: boolean) => void;
};

export enum GOALS {
  INCREASE_NOUM_VISIBILITY = 'Increase my Noum visibility',
  GET_QUICK_QUESTIONS_ANSWERS = 'Get answers to Quick Questions',
  GAIN_CONNECTED_USERS_AND_FOLLOWERS = 'Gain connected users and followers',
  OTHER = 'OTHER',
}

export enum BudgetType {
  TOTAL_BUDGET = 'Total Budget',
  TOTAL_DAILY_BUDGET = 'Total Daily Budget',
}
