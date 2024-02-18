import { SpinnerContainer } from '@/common/globalStyles';
import { Spinner } from '@/components/Spinner';
import { Infinite } from '@/components/Infinite';
import {
  NoumContainer,
  OptionContainer,
  SearchContainer,
  SelectNoumWrapper,
} from '../styles';
import { LinkUnlinkNoumsSearch } from './LinkUnlinkNoumsSearch';
import { type OptionType } from '../types';
import LinkNoumOption from './LinkNoumOption';
import { CustomStyledSpinnerContainer, StyledInner } from './styles';
import NoSearchResultsForNoums from './NoSearchResultsForNoums';

interface SelectNoumOptionsToLinkProps {
  searchStr: string;
  loading: boolean;
  pageLoader: boolean;
  infiniteState: 'loading' | 'hasNextPage' | 'end' | 'end-with-force';
  onSearchChange: (arg: string) => void;
  optionState: OptionType[];
  updateOptionState: (spaceId: string) => () => void;
  fetchMore: () => Promise<void>;
}

export const SelectNoumOptionsToLink: React.FC<
  SelectNoumOptionsToLinkProps
> = ({
  searchStr,
  infiniteState,
  onSearchChange,
  optionState,
  updateOptionState,
  fetchMore,
  pageLoader,
  loading,
}) => (
  <SelectNoumWrapper>
    <SearchContainer>
      <LinkUnlinkNoumsSearch
        searchString={searchStr}
        onSearchChange={onSearchChange}
      />
    </SearchContainer>
    <NoumContainer>
      {loading ? (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      ) : (
        <OptionContainer data-testid="link-noums-container">
          <Infinite
            onFetchMore={fetchMore}
            status={infiniteState}
            scrollbarWidth={0}
            paddingBottom="75px"
            width="100%"
          >
            {pageLoader ? (
              <StyledInner overlayVariant="light">
                <CustomStyledSpinnerContainer>
                  <Spinner />
                </CustomStyledSpinnerContainer>
              </StyledInner>
            ) : undefined}
            {optionState.length > 0 ? (
              optionState.map((item, idx) => (
                <LinkNoumOption
                  key={item.key}
                  item={item}
                  showDetail
                  showExtraDetail
                  showBorder={idx < optionState.length - 1}
                  showPadding={true}
                  updateOptionState={
                    !item.disabled ? updateOptionState(item.spaceId) : undefined
                  }
                />
              ))
            ) : (
              <NoSearchResultsForNoums />
            )}
          </Infinite>
        </OptionContainer>
      )}
    </NoumContainer>
  </SelectNoumWrapper>
);
