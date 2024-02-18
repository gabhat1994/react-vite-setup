import { useMarkNoumAsRecentMutation } from '@/apollo/graphql';
import { useSkeletonIsLoadingContext } from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import { Spinner } from '@/components/Spinner';
import { useBreakpoints, useToast } from '@/hooks';
import { Spacer, Stack } from '@/layout';
import { type ApolloError } from '@apollo/client';
import * as Sentry from '@sentry/react';
import { t } from 'i18next';
import { useCallback, useEffect, useMemo, type FC } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Overlay } from '@/components/Overlay';
import { ElementUtils } from '@/utils/element';
import { SpaceUtils } from '@/utils/space';
import {
  NoumSectionContainer,
  NoumSectionLayout,
} from '../components/NoumSections/Styles';
import { RiseEssayQuestionV2 } from '../components/RiseApplicationQuestion/RiseEssayQuestionV2';
import { RiseApplicationReadMe } from '../components/RiseApplicationReadMe';
import { ColumnContainer } from '../components/SectionElementRearrange/styles';
import { useNoumContext } from './ChamberProvider';
import NoumViewElement from './NoumViewElement';
import { BodyContainer } from './styles';

export const NoumBody: FC = () => {
  const { space, loading, loadingSpace } = useNoumContext();

  const [markNoumAsRecent] = useMarkNoumAsRecentMutation();
  const { isSmallerThanLaptop } = useBreakpoints();

  const { id: spaceId } = useParams();

  const { addToast } = useToast();

  const [searchParams] = useSearchParams();
  const elementId = searchParams.get('elementId');

  const isCompleteLoading = useMemo(
    () =>
      !loading &&
      !loadingSpace &&
      !!space?._id &&
      document.querySelectorAll<HTMLSpanElement>(`[data-testid="spinner"]`)
        .length < 1,
    [loading, loadingSpace, space?._id],
  );

  const sections = useMemo(
    () => ElementUtils.sectionSortUnPublished(SpaceUtils.getSections(space)),
    [space],
  );

  const isArchived = SpaceUtils.isArchived(space);

  useEffect(() => {
    if (elementId && elementId !== '') {
      if (isCompleteLoading) {
        const element = document.getElementById(elementId);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ block: 'center', behavior: 'smooth' });
          }, 3000);
        }
      }
    } else
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
  }, [elementId, isCompleteLoading, loading, loadingSpace]);

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
          section: 'markNoumAsRecent',
        },
      });
    },
    [addToast],
  );

  const handleMarkNoumasRecent = useCallback(
    async (noumId) => {
      await markNoumAsRecent({
        variables: { noumId },
        onError: (error) => {
          handleError(error);
        },
      });
    },
    [handleError, markNoumAsRecent],
  );

  useEffect(() => {
    if (spaceId) handleMarkNoumasRecent(spaceId);
  }, [handleMarkNoumasRecent, spaceId]);

  const { isLoading } = useSkeletonIsLoadingContext();

  if (!space && (isLoading || loading)) return <Spinner />;

  return (
    <BodyContainer>
      {isArchived && <Overlay type="non-interactive" />}
      <>
        <Spacer height={16} />

        <Stack vertical gap={12} fullWidth>
          {SpaceUtils.isRiseApplicationNoum(space) && (
            <>
              <RiseApplicationReadMe />
              <RiseEssayQuestionV2 />
            </>
          )}
          {sections.map((section) => (
            <NoumSectionContainer
              key={section._id}
              isBackground={section.background}
            >
              <NoumSectionLayout
                isSmallerThanLaptop={isSmallerThanLaptop}
                noumSectionType={section.type}
                sectionAlign={section.columnsVerticalAlignType}
              >
                {section?.columns.map((col) => (
                  <ColumnContainer
                    data-testid="noum-section-column"
                    id={col._id}
                    key={col._id}
                    gap={12}
                    vertical
                    isBackground={col.background}
                  >
                    <NoumViewElement
                      tools={col.tools}
                      isCompleteLoading={isCompleteLoading}
                      elementId={elementId}
                    />
                  </ColumnContainer>
                ))}
              </NoumSectionLayout>
            </NoumSectionContainer>
          ))}
        </Stack>
      </>
    </BodyContainer>
  );
};
