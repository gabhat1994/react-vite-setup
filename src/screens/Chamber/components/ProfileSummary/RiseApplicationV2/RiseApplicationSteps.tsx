import { memo } from 'react';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import {
  ApplicationResultStatus,
  ApplicationResultStatusAdmin,
} from '@/apollo/generated/types';
import { useBreakpoints } from '@/hooks';
import { Stack } from '@/layout';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { useRiseApplicationContext } from './RiseApplicationProvider/context';
import {
  RISE_CQ_STEPS,
  RISE_CQ_STEPS_TAB_FIRST_ROW,
  RISE_CQ_STEPS_TAB_SECOND_ROW,
} from './helper';
import {
  RiseStepWrapper,
  RiseStepWrapperTablet,
  TabletWrapper,
} from './styles';
import RiseApplicationStep from './RiseApplicationStep';
import { RiseApplicationStepTranslationKey } from './types';
import RiseApplicationInfoText from './RiseApplicationInfoText';
import RiseApplicationStatus from './RiseApplicationStatus';

export const RiseApplicationSteps = memo(() => {
  const { space, isOwner } = useNoumContext();
  const { isConnected } = useNoumUserConnectionContext();
  const { isTablet, isDesktop, isMobile } = useBreakpoints();
  const {
    status,
    noOfEssays,
    refresh,
    essayQuestionAnswered,
    isStepCompleted,
    isClassDeleted,
    checked,
    setChecked,
    identityCompletion,
    applicationId,
  } = useRiseApplicationContext();

  if (!status) {
    return null;
  }

  const showSteps =
    status === ApplicationResultStatus.Inprogress || isConnected;

  return (
    <Stack vertical gap={16} padding={isMobile ? '16px' : '0px'}>
      {!isDesktop &&
        isOwner &&
        status === ApplicationResultStatusAdmin.Inprogress && (
          <RiseApplicationInfoText />
        )}
      {showSteps && (isDesktop || isMobile) && (
        <RiseStepWrapper isMobile={isMobile}>
          {RISE_CQ_STEPS.map(({ step, url, showCheckbox }) => (
            <RiseApplicationStep
              key={step}
              step={step}
              noOfEssays={noOfEssays}
              refreshApplication={refresh}
              url={url}
              stepCompleted={isStepCompleted(step)}
              isClassDeleted={isClassDeleted}
              canEdit={isOwner}
              essayQuestionAnswered={essayQuestionAnswered}
              noumId={space?._id || ''}
              identityStepCompleted={identityCompletion}
              showCheckbox={showCheckbox}
              onCheckBoxClicked={setChecked}
              applicationId={applicationId}
              checked={
                step === RiseApplicationStepTranslationKey.PRINCIPLES_YOU
                  ? checked.principlesYou
                  : checked.essays
              }
            />
          ))}
        </RiseStepWrapper>
      )}
      {showSteps && isTablet && (
        <RiseStepWrapperTablet vertical gap={-1} align="stretch" fullWidth>
          <TabletWrapper>
            {RISE_CQ_STEPS_TAB_FIRST_ROW.map(({ step, url, showCheckbox }) => (
              <RiseApplicationStep
                key={step}
                step={step}
                noOfEssays={noOfEssays}
                refreshApplication={refresh}
                url={url}
                stepCompleted={isStepCompleted(step)}
                isClassDeleted={isClassDeleted}
                canEdit={isOwner}
                essayQuestionAnswered={essayQuestionAnswered}
                noumId={space?._id || ''}
                identityStepCompleted={identityCompletion}
                showCheckbox={showCheckbox}
                onCheckBoxClicked={setChecked}
                applicationId={applicationId}
                checked={
                  step === RiseApplicationStepTranslationKey.PRINCIPLES_YOU
                    ? checked.principlesYou
                    : checked.essays
                }
              />
            ))}
          </TabletWrapper>
          <TabletWrapper>
            {RISE_CQ_STEPS_TAB_SECOND_ROW.map(({ step, url, showCheckbox }) => (
              <RiseApplicationStep
                key={step}
                step={step}
                noOfEssays={noOfEssays}
                refreshApplication={refresh}
                url={url}
                stepCompleted={isStepCompleted(step)}
                isClassDeleted={isClassDeleted}
                canEdit={isOwner}
                essayQuestionAnswered={essayQuestionAnswered}
                noumId={space?._id || ''}
                identityStepCompleted={identityCompletion}
                showCheckbox={showCheckbox}
                onCheckBoxClicked={setChecked}
                applicationId={applicationId}
                checked={
                  step === RiseApplicationStepTranslationKey.PRINCIPLES_YOU
                    ? checked.principlesYou
                    : checked.essays
                }
              />
            ))}
          </TabletWrapper>
        </RiseStepWrapperTablet>
      )}
      {(isConnected ||
        (isOwner && status !== ApplicationResultStatusAdmin.Inprogress)) &&
        !isDesktop && (
          <RiseApplicationStatus status={status} isOwner={isOwner} />
        )}
    </Stack>
  );
});
