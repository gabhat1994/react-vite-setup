import {
  NoumLayoutStatusFilter,
  SpaceTypeEnum,
} from '@/apollo/generated/types';
import {
  useGetSpaceByIdQuery,
  useGetSpaceConfigQuery,
  useGetSpaceForViewQuery,
} from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';
import { useToast } from '@/hooks/toast';
import { useThemeContext } from '@/providers';
import { DefaultFonts } from '@/screens/Chamber/components/ThemePanel/constants';
import { SpaceUtils } from '@/utils/space';
import { t } from 'i18next';
import { useEffect } from 'react';

export const useNoumDetails = (
  noumId: string,
  noumLayoutStatus = NoumLayoutStatusFilter.Published,
) => {
  const { addToast } = useToast();
  const { user, masterId: userHomeNoumId } = useAuth();
  const { setSelectedThemeId, setSelectedFonts, selectedThemeId } =
    useThemeContext();

  const {
    data: spaceForViewData,
    loading: loadingSpaceForView,
    refetch: refetchSpaceForView,
  } = useGetSpaceForViewQuery({
    onError: (err) => {
      addToast(
        'error',
        'none',
        err.message || t('noumena.chamber.error.get_by_id'),
      );
    },
    skip: !noumId || noumLayoutStatus !== NoumLayoutStatusFilter.Published,
    variables: {
      noumId,
      userHomeNoumId: noumId === userHomeNoumId ? '' : userHomeNoumId,
      editorV2Enabled: true,
      status: noumLayoutStatus,
    },
    fetchPolicy: 'cache-and-network',
  });

  const {
    data: spaceForEditData,
    loading: loadingSpaceForEdit,
    refetch: refetchSpaceForEdit,
  } = useGetSpaceByIdQuery({
    onError: (err) => {
      addToast(
        'error',
        'none',
        err.message || t('noumena.chamber.error.get_by_id'),
      );
    },
    skip: !noumId || noumLayoutStatus !== NoumLayoutStatusFilter.Unpublished,
    variables: {
      noumId,
      userHomeNoumId: noumId === userHomeNoumId ? '' : userHomeNoumId,
      editorV2Enabled: true,
      status: noumLayoutStatus,
    },
    fetchPolicy: 'cache-and-network',
  });

  const space =
    (noumLayoutStatus === NoumLayoutStatusFilter.Published
      ? spaceForViewData?.getSpaceById
      : spaceForEditData?.getSpaceById) ?? undefined;

  const {
    data: spaceConfigData,
    loading: loadingSpaceConfig,
    refetch: refetchSpaceByConfig,
  } = useGetSpaceConfigQuery({
    variables: { type: space?.type as SpaceTypeEnum },
    skip: !space?.type,
  });

  const spaceConfig = spaceConfigData?.getSpaceConfig ?? undefined;

  useEffect(() => {
    if (space?.type === SpaceTypeEnum.Project) {
      if (space && space.theme?._id && space._id === noumId) {
        setSelectedThemeId(SpaceUtils.getAppliedTheme(space, true));
      } else {
        setSelectedThemeId(undefined);
      }
      const spaceFonts = SpaceUtils.getAppliedFont(space, true);
      if (
        spaceFonts &&
        typeof spaceFonts === 'object' &&
        Object.keys(spaceFonts).length > 0 &&
        space._id === noumId
      ) {
        setSelectedFonts(spaceFonts);
      } else {
        setSelectedFonts(DefaultFonts);
      }
    }
  }, [noumId, setSelectedFonts, setSelectedThemeId, selectedThemeId, space]);

  const loading =
    loadingSpaceForView || loadingSpaceForEdit || loadingSpaceConfig;
  const refetchSpaceById =
    noumLayoutStatus === NoumLayoutStatusFilter.Published
      ? refetchSpaceForView
      : refetchSpaceForEdit;

  const isOwner = space?.uid?._id === user?._id;

  return {
    space,
    loading,
    loadingSpace: loadingSpaceForView || loadingSpaceForEdit,
    spaceConfig,
    isOwner,
    refetchSpaceByConfig,
    refetchSpaceById,
  };
};
