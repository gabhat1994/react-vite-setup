import { type ChangeEvent } from 'react';
import { Separator } from '@/components/Separator/Separator';
import { Spacer, Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { Radiobox } from '@/components/Radiobox';
import { Icon } from '@/components/Icon';
import { AdCampaignBudgetType } from '@/apollo/generated/types';
import S from '../styles';
import { useCampaignContext } from '../../hooks/useCampaignForm';

export function CampaignBudget() {
  const { campaign, updateCampaign } = useCampaignContext();

  const isTotalDailyBudget =
    campaign.budgetType === AdCampaignBudgetType.TotalDailyBudget;
  const isTotalBudget =
    campaign.budgetType === AdCampaignBudgetType.TotalBudget;

  const handleBudgetTypeChange = (type: AdCampaignBudgetType) => {
    updateCampaign(($campaign) => ({ ...$campaign, budgetType: type }));
  };

  const handleBudgetChange = (event: ChangeEvent<HTMLInputElement>) => {
    const budget = parseInt(event.target.value.replace(/\D/g, '') || '0', 10);

    if (budget > 99999) return;
    updateCampaign(($campaign) => ({
      ...$campaign,
      budgetAmount: budget,
    }));
  };

  return (
    <S.Container>
      <S.FormTitle>Total Budget</S.FormTitle>
      <Spacer height={14} />
      <Separator fullWidth size="thin" />
      <Spacer height={14} />
      <TSpan font="body-m" colorToken="--text-card-neutral-default">
        Average amount of money that you have set to be spent on your
        advertising campaign. It is used to control the pace of your advertising
        spend, ensuring that your budget is not exceeded.
      </TSpan>
      <Spacer height={16} />
      <Stack gap={16} align="center">
        <Stack
          gap={8}
          align="center"
          onClick={() =>
            handleBudgetTypeChange(AdCampaignBudgetType.TotalBudget)
          }
        >
          <Radiobox
            isChecked={isTotalBudget}
            icon={
              <Icon
                name="radio_btn_m"
                size={isTotalBudget ? 12 : 0}
                color={
                  isTotalBudget
                    ? '--icon-radiobutton-brand-primary-default'
                    : '--icon-radiobutton-inactive-default'
                }
              />
            }
          />
          <TSpan
            font="body-m-bold"
            colorToken="--text-option-selector-neutral-pressed"
          >
            Total Budget
          </TSpan>
        </Stack>
        <Stack
          gap={8}
          align="center"
          onClick={() =>
            handleBudgetTypeChange(AdCampaignBudgetType.TotalDailyBudget)
          }
        >
          <Radiobox
            isChecked={isTotalDailyBudget}
            icon={
              <Icon
                name="radio_btn_m"
                size={isTotalDailyBudget ? 12 : 0}
                color={
                  isTotalDailyBudget
                    ? '--icon-radiobutton-brand-primary-default'
                    : '--icon-radiobutton-inactive-default'
                }
              />
            }
          />
          <TSpan
            font="body-m-bold"
            colorToken="--text-option-selector-neutral-pressed"
          >
            Total Daily Budget
          </TSpan>
        </Stack>
      </Stack>
      <Spacer height={16} />
      <S.CurrencyContainer>
        <S.CurrencyInput
          value={campaign.budgetAmount || ''}
          onChange={handleBudgetChange}
          type="text"
          placeholder="0"
        />
        <TSpan
          font="body-m"
          colorToken="--text-tablecell-header-neutral-default"
        >
          USD
        </TSpan>
      </S.CurrencyContainer>
      <Spacer height={16} />
    </S.Container>
  );
}
