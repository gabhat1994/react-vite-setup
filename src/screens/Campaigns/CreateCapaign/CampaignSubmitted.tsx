import { useNavigate } from 'react-router';

import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { Button } from '@/components/Button';
import ROUTES from '@/constants/routes';

import { Header } from '../components/CampaignHeader';
import { type CampaignSubmittedProps } from './types';
import S from './styles';

export function CampaignSubmitted({
  isMobile,
  isTablet,
  currentStep,
  totalSteps,
  onSeeDetails,
}: CampaignSubmittedProps) {
  const navigate = useNavigate();

  const handleSeeCampaigns = () => navigate(ROUTES.CAMPAIGNS);

  return (
    <>
      <Header
        isMobile={isMobile}
        isTablet={isTablet}
        heading="Campaign"
        currentStep={currentStep}
        totalSteps={totalSteps}
      />

      <S.RequestSubmitted>
        <Icon name="success_cq_xxxl" size={130} />
        <TSpan
          font="heading-xs-bold"
          colorToken="text-body-header-neutral-default"
          textAlign="center"
        >
          Campaign Request Submitted Successfully
        </TSpan>
        <TSpan
          font="body-l"
          colorToken="--text-body-neutral-default"
          textAlign="center"
        >
          We&apos;ve got your request and will take care of it in under{' '}
          <TSpan
            colorToken="--text-body-neutral-highlighted"
            textAlign="center"
          >
            72 hours
          </TSpan>
          . You&apos;ll receive an offer soon.
        </TSpan>
        <Stack vertical={isMobile} fullWidth={isMobile} gap={16}>
          <Button
            size={isMobile ? 'full' : undefined}
            primary
            onClick={onSeeDetails}
          >
            See Details
          </Button>
          <Button
            size={isMobile ? 'full' : undefined}
            secondary
            onClick={handleSeeCampaigns}
          >
            See Your Campaigns
          </Button>
        </Stack>
      </S.RequestSubmitted>
    </>
  );
}
