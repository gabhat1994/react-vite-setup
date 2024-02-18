import { type FC, memo, useEffect } from 'react';
import { Icon, Tag, TSpan } from '@/components';
import { Checkbox } from '@/components/Checkbox';
import { Stack } from '@/layout';
import EVENTS from '@/constants/trackingEvents';
import { trackEvent } from '@/utils/tracking';
import { useAuth } from '@/features/auth/contexts';
import { Modal, ModalSize } from '@/components/ExtendedModal';
import { useToast, useBreakpoints } from '@/hooks';
import { useGenerateTokenForCQ } from '@/features/money/hooks';
import { useTranslation } from 'react-i18next';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { RiseStep } from './styles';
import {
  RiseApplicationStepTranslationKey,
  type IRiseApplicationStep,
} from './types';
import {
  RiseIframe,
  RiseIFrameContainer,
} from '../../RightPanel/elements/RiseApplication/styles';

type ModalType = 'admin-modal';

const RiseApplicationStep: FC<IRiseApplicationStep> = memo(
  ({
    step,
    stepCompleted,
    showCheckbox,
    noOfEssays,
    canEdit,
    identityStepCompleted,
    refreshApplication,
    url,
    applicationId,
    noumId,
    isClassDeleted,
    checked,
    onCheckBoxClicked,
    essayQuestionAnswered,
  }) => {
    const { addToast } = useToast();
    const { isMobile } = useBreakpoints();
    const generateTokenForCQ = useGenerateTokenForCQ();
    const { t } = useTranslation();
    const { modalType, openModal, closeModal, contextData } = useModalManager<
      ModalType,
      string
    >();

    const onCloseClick = () => {
      refreshApplication();
      closeModal();
    };
    const { user } = useAuth();
    const isStepEssay = step === RiseApplicationStepTranslationKey.ESSAYS;
    const isStepPrinciplesYou =
      step === RiseApplicationStepTranslationKey.PRINCIPLES_YOU;

    useEffect(() => {
      if (stepCompleted && !isStepEssay && !isStepPrinciplesYou) {
        trackEvent(EVENTS.RISE.APPLICATION_STEP, {
          UUID: user?._id,
          title: t(step),
        });
      } else if (stepCompleted && !isStepEssay && isStepPrinciplesYou) {
        trackEvent(EVENTS.RISE.PRINCIPLES_YOU_CLICKED, {
          UUID: user?._id,
          title: t(step),
        });
      }
    }, [step, stepCompleted, user, isStepEssay, isStepPrinciplesYou, t]);

    const onStepClick = async () => {
      if (
        step === RiseApplicationStepTranslationKey.FINANCIAL &&
        !identityStepCompleted
      ) {
        addToast(
          'error',
          'icon',
          t('noumena.rise_program.identity.capital.error'),
        );
        return;
      }

      const { token, error } = await generateTokenForCQ();
      if (token) {
        const source = `${url}?access_token=${token}&rise_application=true&applicationId=${applicationId}&noumId=${noumId}`;
        openModal('admin-modal', source);
        return;
      }
      if (error) {
        addToast('error', 'none', error.message);
      }
    };

    const handleEssay = (check: boolean) => {
      if (!checked) {
        if (essayQuestionAnswered) {
          onCheckBoxClicked((previous) => ({ ...previous, essays: false }));
          addToast(
            'error',
            'icon',
            t('noumena.rise_program.esssay_not_answered'),
          );
        } else {
          onCheckBoxClicked((previous) => ({ ...previous, essays: check }));
          trackEvent(EVENTS.RISE.APPLICATION_STEP, {
            UUID: user?._id,
            title: 'Essays',
          });
        }
      } else {
        onCheckBoxClicked((previous) => ({ ...previous, essays: check }));
      }
    };

    const handleCheck = (check: boolean) => {
      if (isClassDeleted) {
        addToast('error', 'icon', t(`noumena.rise_program.can_user_apply`));
        return;
      }
      if (!canEdit) {
        addToast('error', 'icon', t('noumena.rise_program.not.owner.error'));
      }
      handleEssay(check);
    };

    const onRiseStepClick = () => {
      if (!url) return;
      if (isClassDeleted) {
        addToast('error', 'icon', t(`noumena.rise_program.can_user_apply`));
        return;
      }
      if (!canEdit) {
        addToast('error', 'icon', t('noumena.rise_program.not.owner.error'));
        return;
      }
      onStepClick();
    };

    return (
      <>
        <RiseStep
          showCheckbox={showCheckbox}
          hasRightBorder={!isMobile}
          hasBottomBorder={isMobile}
          onClick={onRiseStepClick}
        >
          <TSpan
            font="body-m"
            colorToken="--text-tablecell-header-neutral-highlighted"
            singleLine
          >
            {isStepEssay ? t(step, { noOfEssays }) : t(step)}
          </TSpan>
          {stepCompleted ? (
            <Tag secondary success>
              {t('noumena..rise_program.done')}
            </Tag>
          ) : (
            isStepEssay || (
              <Icon
                name="chevron_right_m"
                size={12}
                color={
                  showCheckbox
                    ? '--icon-tablecell-neutral-default'
                    : '--icon-tablecell-neutral-highlighted'
                }
                style={{ marginRight: '8px' }}
              />
            )
          )}
          {showCheckbox && (
            <>
              <Stack gap={8} justify="flex-start">
                <Checkbox
                  isChecked={checked}
                  onChange={handleCheck}
                  disableClick={!canEdit}
                  icon={
                    <Icon
                      name="tick_m"
                      size={20}
                      color="--icon-checkbox-neutral-alt-default"
                    />
                  }
                />
                <TSpan
                  font="body-m"
                  colorToken="--text-tablecell-header-neutral-default"
                  singleLine
                >
                  {t('noumena.rise_program.essay_confirmation')}
                </TSpan>
              </Stack>
            </>
          )}
        </RiseStep>
        <Modal
          open={modalType === 'admin-modal'}
          size={ModalSize.XXL}
          enableCloseButton
          onClose={onCloseClick}
        >
          <RiseIFrameContainer>
            <RiseIframe src={contextData || ''} title="rise" />
          </RiseIFrameContainer>
        </Modal>
      </>
    );
  },
);

export default RiseApplicationStep;
