import { generatePath, useNavigate } from 'react-router';
import { useCallback, useState } from 'react';

import SinglePageLayout from '@/layout/SinglePageLayout';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import ROUTES from '@/constants/routes';

import { CampaignForm } from './CampaignForm';
import { CampaignSubmitted } from './CampaignSubmitted';

export function CreateCampaign() {
  const device = useBreakpoints();
  const navigate = useNavigate();
  const [campaignStep, setCampaignStep] = useState(1);
  const [campaignId, setCampaignId] = useState('new');

  const seeDetails = useCallback(() => {
    navigate(generatePath(ROUTES.CAMPAIGN_SUMMARY, { id: campaignId }));
  }, [campaignId, navigate]);

  const handleOnCreate = useCallback((id: string) => {
    setCampaignId(id);
    setCampaignStep(2);
  }, []);

  return (
    <SinglePageLayout>
      {campaignStep === 1 && (
        <CampaignForm
          isMobile={device.isMobile}
          isTablet={device.isTablet}
          currentStep={campaignStep}
          totalSteps={3}
          onStepChange={handleOnCreate}
        />
      )}
      {campaignStep === 2 && (
        <CampaignSubmitted
          isMobile={device.isMobile}
          isTablet={device.isTablet}
          currentStep={campaignStep}
          onSeeDetails={seeDetails}
          totalSteps={3}
        />
      )}
    </SinglePageLayout>
  );
}
