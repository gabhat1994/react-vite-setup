import * as Sentry from '@sentry/react';
import { useCallback, useMemo } from 'react';
import { t } from 'i18next';
import { type ApolloError } from '@apollo/client/errors';
import { sizes } from '@/constants/devices';
import { useWindowDimensions } from '@/hooks/dimensions';
import {
  GetSpaceForViewDocument,
  type GetSpaceForViewQuery,
  useFavouriteNoumMutation,
  useUnfavouriteNoumMutation,
  type GetSpaceForViewQueryVariables,
} from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';
import { useToast } from '@/hooks';
import { IconWrapper } from '@/features/homeNoums/components/HomeChamberOptions';
import { NoumLayoutStatusFilter } from '@/apollo/generated/types';
import { FavouriteIcon } from './styles';
import { useNoumContext } from '../../ViewChamber/ChamberProvider';

const mobileSize = parseInt(sizes.MOBILE_L, 10);

const Favourite = () => {
  const { space } = useNoumContext();
  const { masterId } = useAuth();
  const windowSize = useWindowDimensions();
  const isMobile = windowSize.width <= mobileSize;
  const isFavouriteNoum = space?.isFavourited;
  const [markAsFavourite, { loading: favouriteLoading }] =
    useFavouriteNoumMutation();
  const [markAsUnFavourite, { loading: unFavouriteLoading }] =
    useUnfavouriteNoumMutation();

  const variables: GetSpaceForViewQueryVariables = useMemo(
    () => ({
      noumId: space?._id || '',
      userHomeNoumId: space?._id === masterId ? '' : masterId,
      status: NoumLayoutStatusFilter.Published,
      editorV2Enabled: true,
    }),
    [masterId, space],
  );

  const { addToast } = useToast();

  const handleError = useCallback(
    (error: ApolloError) => {
      const { networkError, graphQLErrors } = error;
      addToast(
        'error',
        'none',
        `${t('noumena.toast_error.text')}: ${
          error ? error.message : networkError
        }`,
      );
      const [err] = graphQLErrors;
      Sentry.captureException(new Error(err?.message ?? networkError), {
        tags: {
          section: 'markNoumAsFavourite',
        },
      });
    },
    [addToast],
  );

  const handleSuccess = useCallback(
    (markType: string) => {
      addToast('success', 'none', t(`noumena.chamber.favourites_${markType}`));
    },
    [addToast],
  );

  const handleMarkAsFavourite = useCallback(async () => {
    await markAsFavourite({
      variables: { noumId: space?._id || '' },
      onError: (error) => {
        handleError(error);
      },
      onCompleted: () => {
        handleSuccess('added');
      },
      update: (cache, result) => {
        cache.updateQuery<GetSpaceForViewQuery>(
          {
            query: GetSpaceForViewDocument,
            variables,
          },
          (data) => ({
            ...data,
            getSpaceById: {
              ...data?.getSpaceById,
              isFavourited: result.data?.favouriteNoum,
            },
          }),
        );
      },
    });
  }, [handleError, handleSuccess, markAsFavourite, space, variables]);

  const handleMarkAsUnFavourite = useCallback(async () => {
    await markAsUnFavourite({
      variables: { noumId: space?._id || '' },
      onError: (error) => {
        handleError(error);
      },
      onCompleted: () => {
        handleSuccess('removed');
      },
      update: (cache, result) => {
        cache.updateQuery<GetSpaceForViewQuery>(
          {
            query: GetSpaceForViewDocument,
            variables,
          },
          (data) => ({
            ...data,
            getSpaceById: {
              ...data?.getSpaceById,
              isFavourited: !result.data?.unfavouriteNoum,
            },
          }),
        );
      },
    });
  }, [handleError, handleSuccess, markAsUnFavourite, space, variables]);

  return (
    <IconWrapper
      disabled={favouriteLoading || unFavouriteLoading}
      isMobile={isMobile}
    >
      <FavouriteIcon
        className="favrouites"
        isMobile={isMobile}
        name={isFavouriteNoum ? 'star_filled_m' : 'add_to_favourites'}
        color={isFavouriteNoum ? '--icon-button-neutral-pressed' : ''}
        size={24}
        onClick={
          isFavouriteNoum ? handleMarkAsUnFavourite : handleMarkAsFavourite
        }
      />
    </IconWrapper>
  );
};

export default Favourite;
