import Skeleton from 'react-loading-skeleton';
import { Trans } from 'react-i18next';
import { type FC, useCallback, useEffect, useMemo, useState } from 'react';
import { t } from 'i18next';
import * as Sentry from '@sentry/react';
import { useAuth } from '@/features/auth/contexts';
import {
  useGenerateOneTimeTokenMutation,
  useUpdatePrivacyMutation,
} from '@/apollo/graphql';
import { Icon } from '@/components/Icon';
import { useCQ } from '@/features/money/hooks';
import { Dropdown, type DropdownValueType } from '@/components/Dropdown';
import { TSpan } from '@/components/Typography';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
import { trackEvent } from '@/utils/tracking';
import { Stack } from '@/layout';
import { Radiobox } from '@/components/Radiobox';
import { useNoumContext } from '../../ViewChamber/ChamberProvider';
import {
  TagWrapper,
  TagInComplete,
  TooltipWrapper,
  InCompleteIconContainer,
} from './styles';
import { Privacy } from './types';

export const CQToken: FC = () => {
  const { user } = useAuth();
  const { flags } = useLaunchDarkly();
  const cqURl = process.env.VITE_CQ_URL;
  const [generateOneTimeTokenMutation] = useGenerateOneTimeTokenMutation();
  const [updatePrivacyMutation] = useUpdatePrivacyMutation();
  const { isOwner, space } = useNoumContext();
  const { cqData } = useCQ(space?._id || '', !isOwner);
  const [privacy, setPrivacy] = useState<string>();

  const isCQComplete = useMemo(
    () => cqData.status === 'InComplete',
    [cqData.status],
  );

  useEffect(() => {
    setPrivacy(cqData?.visibility);
  }, [cqData]);

  const options: DropdownValueType<string>[] = [
    {
      key: 'public',
      label: t(`noumena.money.cq.public`),
      type: 'value',
      value: 'Public',
      icon: <Icon name="eye_on_m" size={24} />,
      description: t(`noumena.money.public.description`),
      rightIcon: (
        <Radiobox
          isChecked={privacy === Privacy.PUBLIC}
          icon={
            <Icon
              name="flag_pl_m"
              size={privacy === Privacy.PUBLIC ? 12 : 0}
              color={
                privacy === Privacy.PUBLIC
                  ? '--icon-radiobutton-brand-primary-default'
                  : '--icon-radiobutton-inactive-default'
              }
            />
          }
        />
      ),
    },
    {
      key: 'private',
      label: t(`noumena.money.cq.private`),
      type: 'value',
      value: 'Private',
      icon: <Icon name="lock_m" size={24} />,
      description: t(`noumena.money.private.description`),
      rightIcon: (
        <Radiobox
          isChecked={privacy === Privacy.PRIVATE}
          icon={
            <Icon
              name="flag_pl_m"
              size={privacy === Privacy.PRIVATE ? 12 : 0}
              color={
                privacy === Privacy.PRIVATE
                  ? '--icon-radiobutton-brand-primary-default'
                  : '--icon-radiobutton-inactive-default'
              }
            />
          }
        />
      ),
    },
    {
      key: 'update CQ',
      label: (
        <Stack gap={8} align="center">
          {t(`noumena.money.update.cq`)}{' '}
          {isCQComplete && <TagInComplete>{cqData.status}</TagInComplete>}
        </Stack>
      ),
      type: 'value',
      value: 'update CQ',
      icon: <Icon name="edit_m" size={24} />,
      description: t(`noumena.money.cq.incomplete_displayText`),
    },
  ];

  const handleNavigation = useCallback(async () => {
    const res = await generateOneTimeTokenMutation({
      variables: {},
      onError: ({ networkError = null, graphQLErrors = [] }) => {
        const [err] = graphQLErrors;
        Sentry.captureException(new Error(err?.message ?? networkError), {
          tags: {
            section: 'deleteQuestionMutation',
          },
        });
      },
      onCompleted: () => {
        trackEvent('CQStart', {
          UUID: user?._id,
        });
      },
    });
    const token = res.data?.generateOneTimeToken;
    const formedUrl: string = `${cqURl}?access_token=${token}`;
    window.open(formedUrl, '_blank');
  }, [cqURl, generateOneTimeTokenMutation, user?._id]);

  const updatePrivacy = useCallback(
    async (option) => {
      switch (option) {
        case 'update CQ':
          handleNavigation();
          break;
        default:
          setPrivacy(option);
          await updatePrivacyMutation({
            variables: {
              input: {
                noumId: cqData.noumId || '',
                visibility: option.toUpperCase(),
              },
            },
            onError: ({ networkError = null, graphQLErrors = [] }) => {
              const [err] = graphQLErrors;
              Sentry.captureException(new Error(err?.message ?? networkError), {
                tags: {
                  section: 'deleteQuestionMutation',
                },
              });
            },
          });
          break;
      }
    },
    [cqData.noumId, handleNavigation, updatePrivacyMutation],
  );

  if (cqData.fetching)
    return (
      <Skeleton
        width={195}
        height={23}
        borderRadius={12}
        enableAnimation
        baseColor="var(--color-base-gray-100)"
      />
    );

  return (
    <>
      {flags.cqInHomeNoumsProfile && (
        <>
          {isOwner ? (
            <Dropdown
              options={options}
              usePortal
              renderContainerFromBottom
              containerWidth="max-content"
              onSelectOption={(option) => {
                updatePrivacy(option.value);
              }}
              observerMinHeight="0"
              isRenderFromBottomContentCentered
            >
              {({ inputProps, inputRef, toggle }) => (
                <>
                  <TagWrapper
                    {...inputProps}
                    ref={inputRef}
                    onClick={toggle}
                    gap={7}
                    align="center"
                    padding="2px 6px"
                  >
                    <TooltipWrapper
                      data-title={
                        privacy === Privacy.PUBLIC
                          ? t('noumena.money.cq.public')
                          : t('noumena.money.cq.private')
                      }
                    >
                      <Icon
                        name={
                          privacy === Privacy.PUBLIC ? 'eye_on_m' : 'lock_m'
                        }
                        size={16}
                        color="--icon-card-neutral-default"
                      />
                    </TooltipWrapper>

                    <Stack gap={4} align="center">
                      <TSpan
                        font="footnote-bold"
                        colorToken="--text-badge-neutral-default"
                      >
                        {t('noumena.money.cq')}
                      </TSpan>
                      {isCQComplete && (
                        <TooltipWrapper
                          data-title={t(
                            'noumena.money.incompleteCQ.description',
                          )}
                          isLeft
                        >
                          <InCompleteIconContainer>
                            <Icon
                              name="alert_xs"
                              size={10}
                              color="--icon-badge-neutral-alt-default"
                            />
                          </InCompleteIconContainer>
                        </TooltipWrapper>
                      )}
                      <Trans count={Number(cqData.score)}>
                        <TSpan
                          font="footnote-bold"
                          colorToken={
                            isCQComplete
                              ? '--bg-badge-danger-warning-primary'
                              : '--text-badge-neutral-default'
                          }
                        >
                          {{ count: cqData.score }}
                        </TSpan>
                      </Trans>
                    </Stack>
                    <Icon
                      name="chevron_down_m"
                      size={14}
                      color="--icon-card-neutral-default"
                    />
                  </TagWrapper>
                </>
              )}
            </Dropdown>
          ) : (
            <>
              {privacy === Privacy.PUBLIC ? (
                <TagWrapper gap={7} align="center" padding="2px 6px">
                  {!cqData.fetching && (
                    <Stack gap={4} align="center">
                      <TSpan
                        font="footnote-bold"
                        colorToken="--text-badge-neutral-default"
                      >
                        {t('noumena.money.cq')}
                      </TSpan>
                      <Trans count={Number(cqData.score)}>
                        <TSpan
                          font="footnote-bold"
                          colorToken="--text-badge-neutral-default"
                        >
                          {{ count: cqData.score }}
                        </TSpan>
                      </Trans>
                    </Stack>
                  )}
                </TagWrapper>
              ) : null}
            </>
          )}
        </>
      )}
    </>
  );
};
