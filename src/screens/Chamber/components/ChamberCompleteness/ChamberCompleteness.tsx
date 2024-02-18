import { type FC, useMemo, useCallback } from 'react';
import { Spinner } from '@/components/Spinner';
import {
  ElementTypeEnum,
  type Maybe,
  type SpaceProfileValue,
  SpaceTypeEnum,
  UserStatus,
} from '@/apollo/generated/types';

import {
  NoumProgress,
  type NoumProgressItemProps,
} from '@/features/noums/components/NoumProgress';
import { SpaceUtils } from '@/utils/space';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { Stack } from '@/layout';
import { useAuth } from '@/features/auth/contexts';
import { useToggle } from '@/hooks';
import { usePublishNoumLayoutHelper } from '@/features/noums/hooks/spaceQuery';
import HomeNoumAboutMe from '../modals/HomeNoumAboutMe';
import HomeNoumBusinessBrief from '../modals/HomeNoumBusinessBrief';
import HomeNoumProjectWorkExperience from '../modals/HomeNoumProjectWorkExperience';

export const ChamberCompleteness: FC = () => {
  const { space, spaceConfig, refetchSpaceByConfig, refetchSpaceById } =
    useNoumContext();

  const { masterId: mainSpaceId, loading: loadingMainSpace } = useAuth();
  const [isOpen, toggle] = useToggle(false);
  const [isBusinessBriefOpen, businessBriefToggle] = useToggle(false);
  const [isProjectWorkExperienceOpen, projectWorkExperienceToggle] =
    useToggle(false);
  const [isEducationTrainingOpen, educationTrainingToggle] = useToggle(false);
  const { publishNoumLayoutHelper } = usePublishNoumLayoutHelper();
  const prepareProgressBarItems = (
    tempProgressItems: Maybe<SpaceProfileValue>[] | undefined,
  ) => {
    const progressBarItems: NoumProgressItemProps[] = [];
    if (tempProgressItems) {
      tempProgressItems.forEach((element) => {
        if (element && element.id && element.name) {
          progressBarItems.push({ id: element.id, name: element.name });
        }
      });
    }
    return progressBarItems;
  };

  const spaceElements = useMemo(() => SpaceUtils.getElements(space), [space]);
  const progressItems: NoumProgressItemProps[] = useMemo(() => {
    if (spaceConfig && spaceConfig?.length > 0 && spaceElements.length > 0) {
      const tempProgressItems: Maybe<SpaceProfileValue>[] | undefined =
        SpaceUtils.getProgressBarItems(space, spaceConfig);
      const items = prepareProgressBarItems(tempProgressItems);
      return items;
    }
    return [];
  }, [space, spaceConfig, spaceElements]);

  const progressItemClicked = useCallback(
    (progressItemsID: string) => {
      switch (progressItemsID) {
        case ElementTypeEnum.Profile:
          toggle();
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
      toggle,
      businessBriefToggle,
      projectWorkExperienceToggle,
      educationTrainingToggle,
    ],
  );

  const handleSuccess = async () => {
    toggle();
    await publishNoumLayoutHelper(space?._id!);
    refetch();
  };

  const handleBusinessBriefSuccess = () => {
    businessBriefToggle();
    refetch();
  };

  const handleProjectWorkExperienceSuccess = () => {
    projectWorkExperienceToggle();
    refetch();
  };

  const handleEducationTrainingSuccess = () => {
    educationTrainingToggle();
    refetch();
  };

  const refetch = () => {
    refetchSpaceById();
    refetchSpaceByConfig();
  };

  if (loadingMainSpace && !mainSpaceId) {
    return (
      <Stack>
        <Spinner />
      </Stack>
    );
  }

  if (
    spaceConfig &&
    spaceConfig.length &&
    space &&
    space?.type === SpaceTypeEnum.Home &&
    space?.uid?.userStatus === UserStatus.Active
  ) {
    return (
      <>
        <NoumProgress
          profileProgressPercentage={space?.percentCompleted || 0}
          profileProgressItems={progressItems}
          onItemClicked={progressItemClicked}
          isTokensAlloted={!!space?.token?.count || false}
        />
        <HomeNoumAboutMe
          isOpen={isOpen}
          handleClose={toggle}
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
  }

  return null;
};

export default ChamberCompleteness;
