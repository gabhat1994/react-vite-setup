import { useIsSocialHallUrl } from '@/hooks/useIsSocialHallUrl';
import { EntityType, type GlobalSearchEntity } from '@/apollo/generated/types';

import { type ISearchList } from './types';
import { StyledLink } from './styles';
import SearchContent from './SearchContent';

const SearchList = ({
  result,
  searchRouteHandler,
  isDropdown,
  query,
}: ISearchList) => {
  const isSocialHallUrl = useIsSocialHallUrl();
  return (
    <>
      {result?.map(
        (value, index) =>
          value && (
            <StyledLink
              data-testid={`search-list-item-${index}`}
              onClick={() =>
                searchRouteHandler &&
                searchRouteHandler(value as GlobalSearchEntity)
              }
              to={{
                pathname: `/noum/${
                  value?.entityType === EntityType.Event
                    ? value?.event?.noumId
                    : value?.entityType === EntityType.Post
                    ? value?.post?.noumId
                    : value?.id
                }`,
                hash:
                  value?.entityType === EntityType.Post
                    ? '#post'
                    : value?.entityType === EntityType.Event
                    ? '#event'
                    : undefined,
              }}
              target={isSocialHallUrl ? '_blank' : '_self'}
              key={value?.id}
            >
              <SearchContent
                data={value}
                status=""
                query={query}
                isDropdown={isDropdown}
              />
            </StyledLink>
          ),
      )}
    </>
  );
};

export default SearchList;
