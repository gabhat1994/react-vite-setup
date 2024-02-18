import { SpaceStatusEnum } from '@/apollo/generated/types';
import { type SpaceOutputFragment } from '@/apollo/graphql';
import OwnerDefaultImage from '@/assets/images/profile_default.png';
import ChamberBox from '@/components/ChamberBox/ChamberBox';
import { ChamberBoxNameEnum } from '@/components/ChamberBox/types';
import { Infinite } from '@/components/Infinite';
import { Spinner } from '@/components/Spinner';
import { TSpan } from '@/components/Typography';
import { useAuth } from '@/features/auth/contexts';
import { useGuestHome } from '@/hooks/guest/useGuestHome';
import GuestLayout from '@/layout/GuestLayout';
import { Spacer } from '@/layout/Stack';
import {
  ChamberItem,
  ChambersListContainer,
} from '@/screens/Chamber/components/ChambersList/styles';
import { getFullName } from '@/utils/fullName';
import { t } from 'i18next';
import { useNavigate } from 'react-router';
import GuestHomeEmpty from './Empty';
import { Container, SpinnerContainer, TitleWrapper } from './styles';

const NOUMS_PER_PAGE = 10;

const renderChamberBox = (chamber: SpaceOutputFragment) => {
  const uid = chamber?.uid;
  const chamberId = chamber?._id;
  return (
    <ChamberBox
      id={chamberId}
      url={chamber?.profileImage ?? undefined}
      chamberUrl={`/noum/${chamberId}`}
      ownerImageURL={uid?.profile?.profilePicture || OwnerDefaultImage}
      title={uid?.title || ''}
      chamberTitle={chamber.name || ''}
      name={
        (chamber.category?.name?.toLowerCase() as ChamberBoxNameEnum) ||
        ChamberBoxNameEnum.member
      }
      ownedby={
        getFullName(uid?.firstName, uid?.middleName, uid?.lastName) ?? undefined
      }
      archived={chamber.status === SpaceStatusEnum.Archived}
      followers={chamber.followersCount || 0}
      location={uid?.location ?? undefined}
    />
  );
};

const GuestHome = (): JSX.Element => {
  const {
    noums: chambers,
    loading,
    infiniteState,
    fetchMoreNoums,
  } = useGuestHome(true, NOUMS_PER_PAGE);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <GuestLayout type="Home">
      <Container>
        {loading ? (
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        ) : chambers && chambers.length > 0 ? (
          <>
            {' '}
            <TitleWrapper>
              <TSpan
                font="heading-xs-bold"
                colorToken="--text-body-header-neutral-default"
              >
                {t('noumena.guest.home.page.title.text')}
              </TSpan>
              <Spacer height={16} />
            </TitleWrapper>
            <Infinite
              onFetchMore={fetchMoreNoums}
              status={infiniteState}
              scrollbarWidth={0}
              paddingBottom="75px"
            >
              <ChambersListContainer data-testid="guest-chambers-list">
                {chambers.map(
                  (chamber, index) =>
                    chamber &&
                    chamber.status !== SpaceStatusEnum.Deleted && (
                      <ChamberItem
                        key={`${chamber._id ? chamber._id + index : index}`}
                        onClick={() => navigate(`/noum/${chamber?._id}`)}
                      >
                        {renderChamberBox(chamber)}
                      </ChamberItem>
                    ),
                )}
              </ChambersListContainer>
            </Infinite>
          </>
        ) : (
          user && !loading && <GuestHomeEmpty />
        )}
      </Container>
    </GuestLayout>
  );
};

export default GuestHome;
