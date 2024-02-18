import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { type Transition } from 'history';
import { Stack } from '@/layout';
import { useAuth } from '@/features/auth/contexts';
import { useLaunchDarkly, useToast, useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import { TextArea } from '@/components/TextArea';
import { isValidURL, getSocialNameFromLink } from '@/utils/url';
import {
  useSendNeedMoreInfoEmailMutation,
  useUpdateUserProfileMutation,
} from '@/apollo/graphql';
import routes from '@/constants/routes';
import EVENTS from '@/constants/trackingEvents';
import { trackEvent } from '@/utils/tracking';
import { TextField } from '@/components/TextField';
import { OnboardingScreenLayout } from '@/screens/Register/OnboardingScreenLayout';
import useBlocker from '@/hooks/useBlocker';
import type { LogsOutput } from '@/apollo/generated/types';
import {
  Title,
  Description,
  ContinueButton,
  HeadTag,
  FieldDescription,
} from './styles';
import MoreInfomationV2 from './MoreInfomationV2';

export const MoreInfo = () => {
  const { width } = useWindowDimensions();
  const isMobile = useMemo(() => width <= breakpoints.MOBILE_MAX, [width]);
  const [link, setLink] = useState<string>('');
  const [answer, setAnswer] = useState<string>();
  const [linkError, setLinkError] = useState<boolean>(false);
  const [answerError, setAnswerError] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [updateProfile, { loading }] = useUpdateUserProfileMutation();
  const { t } = useTranslation();
  const {
    user,
    refetchUserData,
    currentUserLoading,
    updateUserAdditionalInformation,
  } = useAuth();
  const [triggerMoreInfoEmail] = useSendNeedMoreInfoEmailMutation();
  const TEXT_LIMIT = 1000;
  const tx = useRef<Transition>();
  const { flags } = useLaunchDarkly();

  const userEventData = useMemo(() => ({ UUID: user?._id }), [user]);
  const isValidInput = useMemo(() => {
    if (
      (answer && answer?.length > TEXT_LIMIT) ||
      (link && !isValidURL(link)) ||
      (!answer && !link)
    ) {
      return false;
    }
    return true;
  }, [link, answer]);

  useEffect(() => {
    const handleTabClose = (event: Event) => {
      /* need to call new API endpoint for mail triggering
         only when user has submitted data for more info and closing the tab
      */
      if (!isSubmit) {
        event.preventDefault();
        triggerMoreInfoEmail();
      }
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, [isSubmit, triggerMoreInfoEmail]);

  const handleBlockNavigation = useCallback((transition: Transition) => {
    tx.current = transition;
    transition.retry();
  }, []);
  useBlocker(handleBlockNavigation, !isSubmit);

  const onUpdateProfileSuccess = useCallback(
    async (metadata: LogsOutput[]) => {
      if (metadata?.length) {
        updateUserAdditionalInformation(metadata);
      }
      await refetchUserData();
      if (!loading && !currentUserLoading) navigate(routes.SIGNUP_PENDING);
    },
    [
      currentUserLoading,
      loading,
      navigate,
      refetchUserData,
      updateUserAdditionalInformation,
    ],
  );
  const handleSubmit = useCallback(async () => {
    if (!isValidInput) {
      return;
    }
    trackEvent(EVENTS.ONBOARDING.MORE_VERIFICATION.SUBMIT);
    setIsSubmit(true);
    try {
      const { data } = await updateProfile({
        variables: {
          input: {
            additionalInfo: answer || undefined,
            ...(link.length
              ? {
                  profile: {
                    socialLinks: link
                      ? [
                          {
                            name: getSocialNameFromLink(link)?.includes('www')
                              ? 'www1'
                              : getSocialNameFromLink(link),
                            link,
                          },
                        ]
                      : undefined,
                  },
                }
              : {}),
          },
        },
      });
      if (data?.updateUserProfile?.metadata) {
        onUpdateProfileSuccess(data.updateUserProfile.metadata as LogsOutput[]);
      }
    } catch (err) {
      addToast('error', 'icon', t('noumena.onboarding_profile_update_error'));
    }
  }, [
    isValidInput,
    updateProfile,
    answer,
    link,
    addToast,
    onUpdateProfileSuccess,
    t,
  ]);

  if (flags.newSignUp) {
    return <MoreInfomationV2 />;
  }

  return (
    <OnboardingScreenLayout>
      <Stack vertical align="start" gap={8} maxWidth={344}>
        <HeadTag
          colorToken="--text-tag-brand-primary-default"
          font="body-m-bold"
        >
          {t('noumena.onboarding.more_info_additional_verification')}
        </HeadTag>
        <Title
          colorToken="--text-body-header-neutral-default"
          font={isMobile ? 'heading-s-bold' : 'heading-m-bold'}
        >
          {t('noumena.onboarding.more_info_title')}
        </Title>
        <Description colorToken="--text-body-neutral-default" font="body-l">
          {t('noumena.onboarding.more_info_description')}
        </Description>

        <FieldDescription
          colorToken="--text-tablecell-header-neutral-highlighted"
          font="body-l-bold"
        >
          {t('noumena.onboarding.more_info_answer_description')}
        </FieldDescription>
        <TextArea
          showScroll
          label={t('noumena.onboarding.more_info_answer_label')}
          resize={false}
          value={answer}
          maxLength={TEXT_LIMIT}
          maxHeight={300}
          onChange={(e) => {
            setAnswer(e.target.value);
            if (e.target.value.length > TEXT_LIMIT) {
              setAnswerError(true);
            } else {
              setAnswerError(false);
            }
          }}
          error={answerError}
          onFocus={() =>
            trackEvent(
              EVENTS.ONBOARDING.MORE_VERIFICATION.TELL_US_MORE,
              userEventData,
            )
          }
        />

        <FieldDescription
          colorToken="--text-tablecell-header-neutral-highlighted"
          font="body-l-bold"
        >
          {t(`noumena.onboarding.more_info_answer_link_description`)}
        </FieldDescription>
        <TextField
          helperText={t('noumena.onboarding.more_info_answer_link_helper_text')}
          placeholder={t(
            'noumena.onboarding.more_info_answer_link_placeholder',
          )}
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
            if (!e.target.value) {
              setLinkError(false);
              return;
            }
            if (isValidURL(e.target.value)) {
              setLinkError(false);
            } else {
              setLinkError(true);
            }
          }}
          error={linkError}
          onFocus={() =>
            trackEvent(EVENTS.ONBOARDING.MORE_VERIFICATION.LINK, userEventData)
          }
        />

        <ContinueButton
          primary={isValidInput}
          testId="submit_button"
          onClick={handleSubmit}
          disabled={!isValidInput || loading || currentUserLoading}
          loading={loading || currentUserLoading}
        >
          {t('noumena.submit')}
        </ContinueButton>
      </Stack>
    </OnboardingScreenLayout>
  );
};
export default MoreInfo;
