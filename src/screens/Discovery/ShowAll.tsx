import { useLocation } from 'react-router';
import ListLayout from '@/layout/ListLayout';
import { Infinite } from '@/components/Infinite';
import { ChambersList } from '@/screens/Chamber/components/ChambersList/ChambersList';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout/Stack';
import { Spinner } from '@/components/Spinner';
import { RecommendedNoumsTabs } from '@/features/discovery/components';
import { useWindowDimensions } from '@/hooks/dimensions';
import { sizes } from '@/constants/devices';
import { SpinnerContainer } from '../Chambers/styles';
import { Container, ShowAllHeader } from './styles';
import { type ShowAllProps } from './types';

interface StateProps {
  title?: string;
  description?: string;
}

const ShowAll = ({
  loading,
  fetchMoreNoums,
  infiniteState,
  noums,
  category,
  showTabs,
}: ShowAllProps): JSX.Element => {
  const location = useLocation();
  const { title, description } = (location.state || {}) as StateProps;
  const windowSize = useWindowDimensions();
  const isFullScreen = windowSize.width > parseInt(sizes.LAPTOP_M, 10);
  return (
    <ListLayout type="Discovery">
      <Container>
        <ShowAllHeader>
          <TSpan
            font="heading-xs-bold"
            colorToken="--text-body-header-neutral-default"
          >
            {title}
          </TSpan>
          <Spacer height={4} />
          <TSpan font="body-l" colorToken="--text-body-neutral-default">
            {description}
          </TSpan>
        </ShowAllHeader>
        {showTabs && <RecommendedNoumsTabs />}
        {loading ? (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        ) : (
          <Infinite
            onFetchMore={fetchMoreNoums}
            status={infiniteState}
            scrollbarWidth={0}
            paddingBottom="75px"
          >
            <ChambersList
              category={category}
              chambers={noums || []}
              fourColumnItem={isFullScreen}
            />
          </Infinite>
        )}
      </Container>
    </ListLayout>
  );
};

export default ShowAll;
