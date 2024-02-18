import { useMemo, useState } from 'react';

import { Spacer } from '@/layout';
import { Separator } from '@/components/Separator/Separator';
import { Checkbox } from '@/components/Checkbox';
import { Icon } from '@/components/Icon';
import { AdCampaignGoalEnum } from '@/apollo/generated/types';
import { TextField } from '@/components/TextField';

import { cleanList } from '@/utils/list';
import S from '../styles';
import { useCampaignContext } from '../../hooks/useCampaignForm';
import { Utils } from '../../utils';
import { constants } from '../../constants';

export function CampaignGoals() {
  const {
    campaign,
    updateCampaign,
    deleteOtherGoalsKey,
    addOtherGoalsKey,
    error: { isOtherGoalRangeExceeded },
  } = useCampaignContext();
  const [goalsValue, setGoalsSet] = useState(new Set<AdCampaignGoalEnum>([]));

  const goalsSet = useMemo(
    () =>
      goalsValue.size
        ? goalsValue
        : new Set(
            cleanList(Utils.castType<AdCampaignGoalEnum[]>(campaign.goals)),
          ),
    [campaign.goals, goalsValue],
  );

  const handleGoals = (goal: AdCampaignGoalEnum, isAdded: boolean) => {
    const clone = new Set(goalsSet);
    if (isAdded) {
      clone.add(goal);
    } else {
      clone.delete(goal);
    }
    setGoalsSet(clone);
    updateCampaign(($campaign) => ({ ...$campaign, goals: Array.from(clone) }));
  };

  return (
    <S.Container>
      <S.FormTitle>Goals</S.FormTitle>
      <Spacer height={14} />
      <Separator fullWidth size="thin" />
      <Spacer height={14} />
      <S.GoalOptionContainer>
        <S.GoalOption>
          <Checkbox
            data-testid="check-box-one"
            isChecked={
              !!goalsSet.has(AdCampaignGoalEnum.IncreaseNoumVisibility)
            }
            onChange={(isAdded) => {
              handleGoals(AdCampaignGoalEnum.IncreaseNoumVisibility, isAdded);
            }}
            icon={
              <Icon
                name="tick_m"
                size={23.5}
                color="--icon-checkbox-neutral-alt-default"
              />
            }
          />
          <S.Option>Increase my Noum visibility</S.Option>
        </S.GoalOption>
        <S.GoalOption>
          <Checkbox
            data-testid="check-box-one"
            isChecked={
              !!goalsSet.has(AdCampaignGoalEnum.GainConnectedUsersAndFollowers)
            }
            onChange={(isAdded) => {
              handleGoals(
                AdCampaignGoalEnum.GainConnectedUsersAndFollowers,
                isAdded,
              );
            }}
            icon={
              <Icon
                name="tick_m"
                size={23.5}
                color="--icon-checkbox-neutral-alt-default"
              />
            }
          />
          <S.Option>Gain connected users and followers</S.Option>
        </S.GoalOption>
        <S.GoalOption>
          <Checkbox
            data-testid="check-box-one"
            isChecked={
              !!goalsSet.has(AdCampaignGoalEnum.GetQuickQuestionsAnswers)
            }
            onChange={(isAdded) => {
              handleGoals(AdCampaignGoalEnum.GetQuickQuestionsAnswers, isAdded);
            }}
            icon={
              <Icon
                name="tick_m"
                size={23.5}
                color="--icon-checkbox-neutral-alt-default"
              />
            }
          />
          <S.Option>Get answers to Quick Questions</S.Option>
        </S.GoalOption>
        <S.GoalOption>
          <Checkbox
            data-testid="check-box-one"
            isChecked={!!goalsSet.has(AdCampaignGoalEnum.Other)}
            onChange={(isAdded) => {
              if (isAdded) addOtherGoalsKey();
              else deleteOtherGoalsKey();
              handleGoals(AdCampaignGoalEnum.Other, isAdded);
            }}
            icon={
              <Icon
                name="tick_m"
                size={23.5}
                color="--icon-checkbox-neutral-alt-default"
              />
            }
          />
          <S.Option>Other</S.Option>
        </S.GoalOption>
      </S.GoalOptionContainer>
      <Spacer height={14} />
      {goalsSet.has(AdCampaignGoalEnum.Other) && (
        <TextField
          inputSize="small"
          label="Tell us more about your goals"
          maxLength={
            !isOtherGoalRangeExceeded
              ? constants.MAX_OTHER_GOAL_CHARACTERS
              : undefined
          }
          error={isOtherGoalRangeExceeded}
          helperText={
            isOtherGoalRangeExceeded
              ? `Goals should not exceed ${constants.MAX_OTHER_GOAL_CHARACTERS} characters`
              : ''
          }
          value={campaign.otherGoals ?? ''}
          onChange={(e) => {
            updateCampaign(($campaign) => ({
              ...$campaign,
              otherGoals: e.target.value,
            }));
          }}
        />
      )}
    </S.Container>
  );
}
