import { Button, Icon, TSpan } from '@/components';
import { useBreakpoints } from '@/hooks';
import { Stack } from '@/layout';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { type Maybe } from 'graphql/jsutils/Maybe';
import { useNoumPlanDetails } from '../hooks/useNoumPlanDetails';
import { Card } from './Card';
import { Progress } from './Progress';
import { Wrapper, Body, EmptyNoumData } from './styles';

type NoumsSectionProps = {
  planId?: string;
  usedSetupSlots: Maybe<number>;
  totalSetupSlots: Maybe<number>;
  onAddNoum: () => void;
  allowNoumCreate: boolean;
};

export const NoumsSection = ({
  planId,
  usedSetupSlots,
  totalSetupSlots,
  onAddNoum,
  allowNoumCreate,
}: NoumsSectionProps) => {
  const { isSmallerThanLaptop } = useBreakpoints();
  const { t } = useTranslation();
  const { noums, noDataFound, loading, refresh } = useNoumPlanDetails({
    subscription_id: Number(planId),
  });

  if (loading) {
    return (
      <Wrapper
        fullWidth
        padding={isSmallerThanLaptop ? 16 : 24}
        gap={isSmallerThanLaptop ? 16 : 24}
      >
        <Skeleton count={1} borderRadius={8} height={60} />
      </Wrapper>
    );
  }

  return (
    <Wrapper
      fullWidth
      padding={isSmallerThanLaptop ? 16 : 24}
      gap={isSmallerThanLaptop ? 16 : 24}
    >
      <Stack fullWidth gap={16} align="center">
        <Stack fullWidth gap={16}>
          <TSpan
            font="heading-xs-bold"
            colorToken="--text-card-header-neutral-highlighted"
          >
            {t('noumena.plan_details.noum_section.heading')}
          </TSpan>
          <Progress totalSlots={totalSetupSlots} usedSlots={usedSetupSlots} />
        </Stack>
        {allowNoumCreate && (
          <Button
            secondary
            size="small"
            leftIcon={<Icon name="add_m" size={24} />}
            onClick={onAddNoum}
          >
            {t('noumena.plan_details.noum_section.creat_noum')}
          </Button>
        )}
      </Stack>
      <Body>
        {noDataFound && (
          <EmptyNoumData>
            <Icon
              name="social_hall_m"
              size={96}
              color="--icon-card-placeholder-neutral-default"
            />
            <TSpan
              font="body-m"
              colorToken="--text-placeholder-neutral-default"
            >
              {t('noumena.money.myplans.nonoumdata')}
            </TSpan>
          </EmptyNoumData>
        )}

        {noums.map((item) => (
          <Card
            key={item?.chamber_id?._id}
            profileImage={item?.chamber_id?.profileImage}
            noumName={item?.chamber_id?.name}
            noumId={item?.chamber_id?._id}
            onRemoveNoum={refresh}
            subscriptionId={Number(planId)}
          />
        ))}
      </Body>
    </Wrapper>
  );
};
