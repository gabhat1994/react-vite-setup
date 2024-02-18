import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { type Transition } from 'history';
import { Stack } from '@/layout';
import { useAuth } from '@/features/auth/contexts';
import { useToast, useBreakpoints } from '@/hooks';
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
import useBlocker from '@/hooks/useBlocker';
import NewAuthLayout from '@/layout/NewAuthLayout';
import { Main, Footer } from '@/layout/NewAuthLayout/childrenStyles';
import type { LogsOutput } from '@/apollo/generated/types';
import { Button } from '@/components';
import { Title, Description, FieldDescription } from './styles';
import { OutlineBox } from './stylesV2';

const MoreInfomationV2 = () => {
  const { isMobile } = useBreakpoints();
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
        onUpdateProfileSuccess(
          data?.updateUserProfile?.metadata as LogsOutput[],
        );
      }
    } catch (err) {
      addToast(
        'error',
        'icon',
        `${t('noumena.onboarding_profile_update_error')}`,
      );
    }
  }, [
    isValidInput,
    updateProfile,
    answer,
    link,
    addToast,
    t,
    onUpdateProfileSuccess,
  ]);

  return (
    <NewAuthLayout>
      <Main justify={isMobile ? 'flex-start' : 'center'}>
        <OutlineBox>
          <Stack fullWidth vertical gap={16}>
            <Title
              colorToken="--text-body-header-neutral-default"
              font={isMobile ? 'heading-s-bold' : 'heading-m-bold'}
              textAlign="center"
            >
              {t('noumena.onboarding.more_info_title')}
            </Title>
            <Description
              colorToken="--text-body-neutral-default"
              font="body-l"
              textAlign="center"
            >
              {t('noumena.onboarding.more_info_description')}
            </Description>
          </Stack>
          <Stack vertical align="start" gap={8}>
            <FieldDescription
              colorToken="--text-tablecell-header-neutral-highlighted"
              font="body-l-bold"
            >
              {t('noumena.onboarding.more_info_answer_description')}
            </FieldDescription>
            <TextArea
              maxLengthPosition="end"
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
              helperText={t(
                'noumena.onboarding.more_info_answer_link_helper_text',
              )}
              label={t('noumena.onboarding.more_info_answer_link_placeholder')}
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
                trackEvent(
                  EVENTS.ONBOARDING.MORE_VERIFICATION.LINK,
                  userEventData,
                )
              }
            />
          </Stack>
          <Footer>
            <Button
              primary={isValidInput}
              testId="submit_button"
              onClick={handleSubmit}
              disabled={!isValidInput || loading || currentUserLoading}
              loading={loading || currentUserLoading}
              size="full"
            >
              {t('noumena.submit')}
            </Button>
          </Footer>
        </OutlineBox>
      </Main>
    </NewAuthLayout>
  );
};

export default MoreInfomationV2;
