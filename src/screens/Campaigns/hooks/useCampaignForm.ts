import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  AdCampaignBudgetType,
  type AdCampaignInput,
} from '@/apollo/generated/types';
import { Utils } from '../utils';

import { constants } from '../constants';

const defaultCampaign: AdCampaignInput = {
  noumId: '',
  title: '',
  startDate: '',
  goals: [],
  audience: {
    category: [],
    targetLanguage: ['English (US)'],
    targetLocation: [],
  },
  budgetAmount: 0,
  budgetType: AdCampaignBudgetType.TotalBudget,
};

export function useCampaignForm() {
  const [campaign, setCampaign] = useState(defaultCampaign);

  const deleteOtherGoalsKey = useCallback(() => {
    const clone = { ...campaign };
    delete clone.otherGoals;
    setCampaign(clone);
  }, [campaign]);

  const addOtherGoalsKey = useCallback(() => {
    setCampaign((c) => ({ ...c, otherGoals: '' }));
  }, []);

  const error = useMemo(
    () => ({
      isTitleRangeExceeded:
        campaign.title.length > constants.MAX_TITLE_CHARACTERS,
      isFieldEmpty: Object.values(campaign).some(Utils.isEmpty),
      isOtherGoalRangeExceeded: campaign.otherGoals
        ? campaign.otherGoals.length > constants.MAX_OTHER_GOAL_CHARACTERS
        : false,
      isAudienceRangeExceeded:
        Utils.getAudienceLength(campaign.audience.category || []) >
        constants.MAX_AUDIENCE_CHARACTERS,
    }),
    [campaign],
  );

  const restrictUserToSubmitCampaign = Object.values(error).some((e) => e);

  return {
    campaign,
    updateCampaign: setCampaign,
    deleteOtherGoalsKey,
    addOtherGoalsKey,
    error,
    restrictUserToSubmitCampaign,
  };
}

export const CampaignFormContext = createContext<
  ReturnType<typeof useCampaignForm>
>({
  campaign: defaultCampaign,
  updateCampaign: () => null,
  deleteOtherGoalsKey: () => null,
  addOtherGoalsKey: () => null,
  restrictUserToSubmitCampaign: true,
  error: {
    isTitleRangeExceeded: false,
    isFieldEmpty: true,
    isOtherGoalRangeExceeded: false,
    isAudienceRangeExceeded: false,
  },
});

export const useCampaignContext = () => useContext(CampaignFormContext);
