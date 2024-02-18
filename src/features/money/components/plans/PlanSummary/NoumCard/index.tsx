import { Button, TSpan } from '@/components';
import { Stack } from '@/layout';
import DefaultImage from '@/assets/images/chamber_default.png';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useBreakpoints } from '@/hooks';
import { type Maybe } from '@/common/types';
import { NoumImage, Wrapper } from './styles';
import { type INoumCard } from './types';

export const NoumCard = ({
  chamberName,
  valid_till,
  profileImage,
  planId,
}: INoumCard) => {
  const { t } = useTranslation();
  const navigateTo = useNavigate();
  const { isMobile } = useBreakpoints();

  const hanldeNavigation = (id: Maybe<number>) => {
    if (id) {
      navigateTo(`/noums/plan-details/${id}`);
    }
  };

  return (
    <Wrapper fullWidth padding={16} justify="space-between">
      <Stack fullWidth gap={12} align="center">
        <NoumImage src={profileImage || DefaultImage} alt="noum image" />
        {isMobile ? (
          <Stack fullWidth gap={4} vertical>
            <TSpan
              font="body-m-bold"
              colorToken="--text-card-header-neutral-highlighted"
            >
              {chamberName}
            </TSpan>
            {valid_till && (
              <TSpan
                font="footnote"
                colorToken="--text-placeholder-neutral-default"
              >
                {`Expires:  ${valid_till}`}
              </TSpan>
            )}
          </Stack>
        ) : (
          <TSpan
            font="body-m-bold"
            colorToken="--text-card-header-neutral-highlighted"
          >
            {chamberName}
          </TSpan>
        )}
      </Stack>
      <Stack fullWidth={!isMobile} gap={16} align="center" justify="flex-end">
        {isMobile ? null : (
          <TSpan
            font="footnote"
            colorToken="--text-placeholder-neutral-default"
          >
            {`Expires: ${valid_till}`}
          </TSpan>
        )}
        <Button size="small" secondary onClick={() => hanldeNavigation(planId)}>
          {t('noumena.plan_summary.membership_plan.manage')}
        </Button>
      </Stack>
    </Wrapper>
  );
};
