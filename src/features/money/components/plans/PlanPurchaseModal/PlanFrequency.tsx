import { Stack } from '@/layout';
import { TSpan, Tag } from '@/components';
import { Radiobox } from '@/components/Radiobox';
import { type PlanItemBasicFragment } from '@/apollo/graphql/fragments/planSettingsForComparision.generated';
import { PlanFilerUtils, PlanPriceUtils } from '@/features/money/utils';
import { useMemo, useState } from 'react';
import { Trans } from 'react-i18next';
import { FrequencyCardWrapper } from './styles';
import { type UserAction } from './types';

type PlanFrequencyProps = {
  planWithFrequencies: PlanItemBasicFragment[];
  onSelectFrequency: (frequency: PlanItemBasicFragment) => void;
  userAction: UserAction;
  onCheckOtherPlansClick: () => void;
};

export const PlanFrequency = ({
  planWithFrequencies,
  onSelectFrequency,
  userAction,
  onCheckOtherPlansClick,
}: PlanFrequencyProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredFrequencies = useMemo(
    () =>
      userAction === 'try'
        ? PlanFilerUtils.filterFrequencyForTrail(planWithFrequencies)
        : planWithFrequencies,
    [planWithFrequencies, userAction],
  );

  const activeAndSortedFrequencies = useMemo(
    () =>
      filteredFrequencies
        .filter((frequency) => frequency.status === 'active')
        .sort(PlanPriceUtils.sortFrequencies),
    [filteredFrequencies],
  );

  return (
    <Stack fullWidth vertical gap={16}>
      <TSpan font="body-l-bold" colorToken="text-modal-neutral-highlighted">
        Pick your Plan’s Period:
      </TSpan>
      <Stack vertical fullWidth gap={8}>
        {activeAndSortedFrequencies.map((plan, index) => {
          const price = PlanPriceUtils.getPlanPrice(plan);
          const frequency = PlanPriceUtils.getPlanFrequencyText(plan);
          const discount = plan?.plan_details?.[0]?.discount_percent;
          return (
            <FrequencyCardWrapper
              key={plan.period_unit}
              hightLight={index === selectedIndex}
            >
              <Stack vertical>
                <TSpan font="body-l-bold">{frequency}</TSpan>
                <TSpan
                  font="body-m"
                  colorToken="--text-tablecell-body-neutral-default"
                >
                  ${PlanPriceUtils.convertCentsToDollars(price)} / month
                </TSpan>
              </Stack>
              <Stack align="center" gap={8}>
                {discount && (
                  <Tag success contentFont="footnote-bold">
                    Save {discount}%
                  </Tag>
                )}
                <Radiobox
                  isChecked={index === selectedIndex}
                  onChange={() => {
                    setSelectedIndex(index);
                    onSelectFrequency(plan);
                  }}
                />
              </Stack>
            </FrequencyCardWrapper>
          );
        })}
      </Stack>
      <TSpan font="footnote" colorToken="--text-modal-neutral-highlighted">
        <Trans
          i18nKey="noumena.plans.customization.plans.note"
          components={{
            link1: (
              <TSpan
                font="link-s"
                cursor="pointer"
                onClick={onCheckOtherPlansClick}
              />
            ),
          }}
        />
      </TSpan>
    </Stack>
  );
};
