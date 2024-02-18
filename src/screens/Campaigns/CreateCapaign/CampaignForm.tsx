import { cleanList } from '@/utils/list';

import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Icon } from '@/components/Icon';
import { useMemo, useState } from 'react';
import { useToast } from '@/hooks';
import { CampaignFormContext } from '../hooks/useCampaignForm';
import S from './styles';
import Styles from '../CampaignSummary/styles';
import { CampaignTitle } from './Forms/CampaignTitle';
import { CampaignGoals } from './Forms/CampaignGoals';
import { CampaignAudience } from './Forms/CampaignAudience';
import { CampaignBudget } from './Forms/CampaignBudget';
import { type CampaignFormProps } from './types';
import { Header, Actions } from '../components/CampaignHeader';
import { useCampaignFormServices } from '../hooks/useCampaignFormServices';
import { CampaignDetails } from '../CampaignSummary/CampaignDetails';

export function CampaignForm({
  isMobile,
  isTablet,
  currentStep,
  totalSteps,
  onStepChange,
}: CampaignFormProps) {
  // Hook for queries / mutation

  const devices = useBreakpoints();

  const { addErrorToast } = useToast();

  const [showPreview, setShowPreview] = useState(false);

  const {
    noums,
    campaign,
    createCampaignFn,
    createCampaignState,
    handleDelete,
  } = useCampaignFormServices({
    onCreated: onStepChange,
  });

  const { restrictUserToSubmitCampaign } = campaign;

  const noumData = cleanList(noums?.data?.getOwnProjectChambers?.data);

  const noumForPreview = useMemo(
    () => noumData.find((noum) => noum._id === campaign?.campaign?.noumId),
    [campaign?.campaign?.noumId, noumData],
  );

  const handlePreview = () => {
    if (!restrictUserToSubmitCampaign && !createCampaignState.loading) {
      setShowPreview(true);
      return;
    }
    addErrorToast('Please fill up all the fields for preview');
  };

  return (
    <>
      {!showPreview ? (
        <>
          <Header
            isMobile={isMobile}
            isTablet={isTablet}
            heading="New Campaign"
            currentStep={currentStep}
            totalSteps={totalSteps}
            rightAction={
              <Actions.FormAction
                isMobile={isMobile}
                isTablet={isTablet}
                submitDisabled={
                  restrictUserToSubmitCampaign || createCampaignState.loading
                }
                deleteDisabled={createCampaignState.loading}
                loading={createCampaignState.loading}
                onSubmitRequest={createCampaignFn}
                onDelete={handleDelete}
              />
            }
          />
          <S.FormContainer>
            <CampaignFormContext.Provider value={campaign}>
              <S.Forms>
                <CampaignTitle
                  noums={noumData ?? []}
                  isMobile={devices.isMobile}
                />
                <CampaignGoals />
                <CampaignAudience isMobile={devices.isMobile} />
                <CampaignBudget />
              </S.Forms>
            </CampaignFormContext.Provider>
          </S.FormContainer>
          {(devices.isMobile || devices.isTablet) && (
            <div style={{ padding: '16px' }}>
              <S.PreviewContainer onClick={handlePreview}>
                <Icon name="preview_m" size={22} />
              </S.PreviewContainer>
            </div>
          )}
        </>
      ) : (
        <>
          <S.PreviewHeader>
            <S.PreviewBackButton
              neutral
              size="small"
              leftIcon={<Icon name="arrow_left_m" size={22} />}
              onClick={() => setShowPreview(false)}
            />
          </S.PreviewHeader>
          <Styles.Main>
            <CampaignDetails
              title={campaign?.campaign?.title}
              status=""
              audience={campaign?.campaign?.audience}
              startDate={campaign?.campaign?.startDate}
              noumId={noumForPreview}
              goals={campaign?.campaign?.goals}
              budgetAmount={campaign?.campaign?.budgetAmount}
              budgetType={campaign?.campaign?.budgetType}
              otherGoals={campaign?.campaign?.otherGoals}
            />
          </Styles.Main>
        </>
      )}
    </>
  );
}
