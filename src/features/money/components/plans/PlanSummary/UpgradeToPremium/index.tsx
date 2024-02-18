import { Button, TSpan } from '@/components';
import { useBreakpoints } from '@/hooks';
import { Stack } from '@/layout';
import upgrade_to_plan from '@/assets/images/upgrade_to_plan.svg';
import { Trans } from 'react-i18next';
import { t } from 'i18next';
import { Wrapper, ChildWrapper, Image } from './styles';

type UpgradeToPremiumProps = {
  onUpgradeClick: () => void;
  hasExistingPlan: boolean;
};

export const UpgradeToPremium = ({
  onUpgradeClick,
  hasExistingPlan,
}: UpgradeToPremiumProps) => {
  const { isSmallerThanLaptop, isMobile } = useBreakpoints();

  return (
    <Wrapper
      fullWidth
      padding={isSmallerThanLaptop ? 16 : 24}
      gap={isSmallerThanLaptop ? 16 : 24}
    >
      <ChildWrapper
        fullWidth
        gap={isMobile ? 0 : 78}
        align="start"
        padding={isMobile ? 16 : 32}
      >
        <Stack align="start" gap={24} vertical fullWidth>
          <Stack
            align="start"
            gap={8}
            vertical
            maxWidth={isMobile ? undefined : 319}
          >
            <TSpan font="heading-xs-bold" colorToken="--color-base-primary-50">
              {t('noumena.plan.summary.purchase.banner.heading')}
            </TSpan>
            <TSpan
              font="body-m"
              colorToken="--text-card-neutral-highlighted"
              textAlign="justify"
            >
              <Trans
                i18nKey="noumena.plan.summary.purchase.banner.description"
                components={{ b: <TSpan font="body-m-bold" /> }}
              />
            </TSpan>
          </Stack>
          <Button
            primary
            onClick={onUpgradeClick}
            size={isMobile ? 'full_small' : 'small'}
          >
            {hasExistingPlan
              ? t('noumena.plan.summary.purchase.banner.upgrade.button.text')
              : t('noumena.plan.summary.purchase.banner.purchase.button.text')}
          </Button>
        </Stack>
        {!isMobile && <Image src={upgrade_to_plan} alt="noum-logo" />}
      </ChildWrapper>
    </Wrapper>
  );
};
