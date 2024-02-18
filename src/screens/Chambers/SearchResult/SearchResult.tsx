import { t } from 'i18next';

import { useSkeletonIsLoadingContext } from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import Empty from '@/screens/Chambers/Empty';
import { type SearchResultProps } from './types';
import { NoResultWrapper, NoResultText, NoResultSubText } from './styles';

export function SearchResult({
  isNoum,
  offsetTop = 300,
  noResultText,
  noResultSubText,
  children,
  tab,
  isFilterApplied,
}: SearchResultProps): JSX.Element {
  const { isLoading } = useSkeletonIsLoadingContext();

  if (isNoum || isLoading) return <>{children}</>;

  if (!isFilterApplied && tab) return <Empty tab={tab} />;
  if ((!!noResultText || !!noResultSubText) && tab) return <Empty tab={tab} />;

  return (
    <NoResultWrapper data-testid="no-result-wrapper" offsetTop={offsetTop}>
      {!!noResultText || !!noResultSubText ? (
        <>
          <NoResultText
            font="heading-xs-bold"
            colorToken="--text-card-header-neutral-highlighted"
            data-testid="no-result-message"
          >
            {noResultText}
          </NoResultText>
          <NoResultSubText
            font="footnote"
            colorToken="--text-card-neutral-default"
            data-testid="no-result-sub-message"
          >
            {noResultSubText}
          </NoResultSubText>
        </>
      ) : (
        <NoResultText
          font="heading-xs-bold"
          colorToken="--text-card-header-neutral-highlighted"
          data-testid="no-result-default-message"
        >
          {t('noumena.no_result.text')}
        </NoResultText>
      )}
    </NoResultWrapper>
  );
}
