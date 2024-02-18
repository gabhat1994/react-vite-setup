import Skeleton from 'react-loading-skeleton';
import { type FC, useCallback } from 'react';
import { Trans } from 'react-i18next';
import { t } from 'i18next';
import { CircleProgressBar } from '@/components/ProgressBar';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { Dropdown, type DropdownTargetProps } from '@/components/Dropdown';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { useToggle, useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import { ElementTypeEnum, ElementStatusEnum } from '@/apollo/generated/types';
import { usePublishNoumLayoutHelper } from '@/features/noums/hooks/spaceQuery';
import { capitalize } from 'lodash';
import {
  DropDownLabel,
  DropdownItemLayout,
} from '@/components/Dropdown/styles';
import { Tag } from '@/components';
import { useProfileCompletenessHelper } from '@/features/noums/hooks/noums/homeNoum/useProfileCompletenessHelper';
import {
  ProfileCompletionConatiner,
  ProfileCompletionContent,
  ProfileCompletionWrapper,
} from './styles';
import HomeNoumAboutMe from '../Chamber/components/modals/HomeNoumAboutMe';
import HomeNoumBusinessBrief from '../Chamber/components/modals/HomeNoumBusinessBrief';
import HomeNoumProjectWorkExperience from '../Chamber/components/modals/HomeNoumProjectWorkExperience';

export const ProfileCompletion: FC = () => {
  const { width } = useWindowDimensions();
  const isMobile = width <= breakpoints.MOBILE_MAX;
  const {
    space,
    loadingSpace,
    refetchSpaceByConfig,
    refetchSpaceById,
    showCompleteness,
    progressItems,
  } = useProfileCompletenessHelper();

  const { publishNoumLayoutHelper } = usePublishNoumLayoutHelper();
  const [isOpenAboutMe, toggleAboutMe] = useToggle(false);
  const [isBusinessBriefOpen, businessBriefToggle] = useToggle(false);
  const [isProjectWorkExperienceOpen, projectWorkExperienceToggle] =
    useToggle(false);
  const [isEducationTrainingOpen, educationTrainingToggle] = useToggle(false);

  const progressItemClicked = useCallback(
    (progressItemsID: string) => {
      switch (progressItemsID) {
        case ElementTypeEnum.Profile:
          toggleAboutMe();
          break;

        case ElementTypeEnum.BusinessBrief:
          businessBriefToggle();
          break;

        case ElementTypeEnum.ProjectWorkExperience:
          projectWorkExperienceToggle();
          break;

        case ElementTypeEnum.EducationTraining:
          educationTrainingToggle();
          break;

        default:
          break;
      }
    },
    [
      toggleAboutMe,
      businessBriefToggle,
      projectWorkExperienceToggle,
      educationTrainingToggle,
    ],
  );

  const handleSuccess = async () => {
    toggleAboutMe();
    await publishNoumLayoutHelper(space?._id!);
    refetch();
  };

  const handleBusinessBriefSuccess = async () => {
    businessBriefToggle();
    refetch();
  };

  const handleProjectWorkExperienceSuccess = async () => {
    projectWorkExperienceToggle();
    refetch();
  };

  const handleEducationTrainingSuccess = async () => {
    educationTrainingToggle();
    refetch();
  };

  const refetch = useCallback(() => {
    refetchSpaceById();
    refetchSpaceByConfig();
  }, [refetchSpaceByConfig, refetchSpaceById]);

  if (loadingSpace)
    return (
      <ProfileCompletionWrapper>
        <Skeleton
          width="100%"
          height={50}
          borderRadius={12}
          enableAnimation
          baseColor="var(--color-base-gray-100)"
        />
      </ProfileCompletionWrapper>
    );

  if (!showCompleteness || !space || progressItems.length < 1) return <></>;
  return (
    <>
      <ProfileCompletionWrapper>
        <ProfileCompletionConatiner>
          <ProfileCompletionContent>
            <Stack
              justify="space-between"
              vertical={isMobile}
              gap={16}
              align={isMobile ? 'start' : 'center'}
            >
              <Stack gap={20} align="center">
                {!isMobile && (
                  <CircleProgressBar
                    percentage={space?.percentCompleted || 0}
                    circleSize={37}
                    barSize={4}
                    color="var(--bg-progressbar-brand-primary-hightlighted)"
                    backgroudColor="var(--bg-progressbar-neutral-default)"
                  />
                )}
                <Stack vertical gap={4}>
                  <TSpan
                    font="body-l-bold"
                    colorToken="--text-card/neutral-highlighted"
                  >
                    <Trans
                      i18nKey={t(
                        'noumena.editor.noumprogress.profile_completenes',
                        {
                          completeness: space?.percentCompleted || 0,
                        },
                      )}
                      components={{
                        span: (
                          <TSpan colorToken="--text-card-brand-primary-default" />
                        ),
                      }}
                    />
                  </TSpan>
                  <TSpan
                    font="body-m-bold"
                    colorToken="--text-card-neutral-default"
                  >
                    <Trans
                      i18nKey="noumena.noumprogress.profile_complete"
                      components={{
                        bold: (
                          <TSpan colorToken="--text-card-neutral-highlighted" />
                        ),
                      }}
                    />
                  </TSpan>
                </Stack>
              </Stack>
              <Dropdown
                containerWidth="max-content"
                closeOnSelect
                onSelectOption={(v) => {
                  progressItemClicked(v.value);
                }}
                options={progressItems}
                optionsRenderer={(_, handleSelectOption) =>
                  progressItems.map((option) => (
                    <DropdownItemLayout
                      onClick={() => handleSelectOption(option)}
                      key={option.key}
                    >
                      <DropDownLabel>
                        <Icon
                          name="plus_m"
                          size={24}
                          color="--text-tablecell-header-neutral-highlighted"
                        />
                        <TSpan
                          font="body-m-bold"
                          colorToken="--text-tablecell-header-neutral-highlighted"
                        >
                          {option.label}
                        </TSpan>
                        {option.status &&
                          option.status !== ElementStatusEnum.Published && (
                            <Tag
                              tertiary
                              size="small"
                              contentFont="footnote-bold"
                            >
                              {capitalize(option.status)}
                            </Tag>
                          )}
                      </DropDownLabel>
                    </DropdownItemLayout>
                  ))
                }
                isAnimation={false}
                observerMinHeight="0"
                isMobile={false}
                isPopperStyle
              >
                {({
                  targetRef,
                  targetProps,
                  toggle,
                }: DropdownTargetProps<HTMLButtonElement>) => (
                  <Button
                    ref={targetRef}
                    onClick={toggle}
                    {...targetProps}
                    primary
                    size="small"
                    rightIcon={<Icon name="chevron_down_m" size={14} />}
                  >
                    {t('noumena.editor.noumprogress.profile.complete')}
                  </Button>
                )}
              </Dropdown>
            </Stack>
          </ProfileCompletionContent>{' '}
        </ProfileCompletionConatiner>
      </ProfileCompletionWrapper>
      <HomeNoumAboutMe
        isOpen={isOpenAboutMe}
        handleClose={toggleAboutMe}
        handleSuccess={handleSuccess}
      />
      <HomeNoumBusinessBrief
        isOpen={isBusinessBriefOpen}
        handleClose={businessBriefToggle}
        handleSuccess={handleBusinessBriefSuccess}
        position={1}
      />
      <HomeNoumProjectWorkExperience
        isOpen={isProjectWorkExperienceOpen}
        handleClose={projectWorkExperienceToggle}
        handleSuccess={handleProjectWorkExperienceSuccess}
        elementType={ElementTypeEnum.ProjectWorkExperience}
        position={2}
      />
      <HomeNoumProjectWorkExperience
        isOpen={isEducationTrainingOpen}
        handleClose={educationTrainingToggle}
        handleSuccess={handleEducationTrainingSuccess}
        elementType={ElementTypeEnum.EducationTraining}
        position={3}
      />
    </>
  );
};
