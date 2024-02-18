import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useAuth } from '@/features/auth/contexts';
import { useWindowDimensions } from '@/hooks';
import { Header } from '@/components/Header';
import { MainHeader } from '@/layout/MainHeader';
import { UserUtil } from '@/utils/user';
import { Icon } from '@/components/Icon';
import { breakpoints } from '@/constants/devices';
import { TSpan } from '@/components/Typography/Typography';
import { Stack, StackItem } from '@/layout/Stack';
import { GlobalSearch } from '@/features/globalSearch/components/GlobalSearch';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
import { AppLayout } from '@/layout/AppLayout';
import {
  Container,
  Main,
  Content,
  Head,
  HeadName,
  HeadIcon,
  RightContent,
} from './styles';
import { type LayoutProps } from './types';

const SearchLayout: React.FC<LayoutProps> = ({
  children,
  rightContent,
  setResult,
  selectedTab,
  onGoBack,
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  const {
    flags: { newAppNavigation },
  } = useLaunchDarkly();

  const { width } = useWindowDimensions();
  const isLaptop = width > breakpoints.MOBILE_L;

  const mobileHeadView = () => (
    <Stack padding={16} vertical>
      <Head>
        <HeadIcon onClick={handleBackClick}>
          <Icon
            color="--icon-button-neutral-default"
            name="arrow_left_m"
            size={24}
          />
        </HeadIcon>
        <HeadName>
          <TSpan font="body-l-bold" colorToken="--text-appbar-neutral-default">
            {t('noumena.search.search_head.text')}
          </TSpan>
        </HeadName>
      </Head>
      <GlobalSearch setResults={setResult} type={selectedTab} />
    </Stack>
  );

  if (newAppNavigation) {
    return (
      <AppLayout.Layout
        background="neutral-alt"
        onGoBack={onGoBack}
        topNavbar={
          !isLaptop ? (
            mobileHeadView()
          ) : (
            <AppLayout.TopBar
              onSearchChange={setResult}
              searchTypeFilter={selectedTab}
            />
          )
        }
        sideNav={<AppLayout.SideNavigation />}
      >
        <AppLayout.MainContent>
          <Stack gap={24} align="start" justify="stretch" fullWidth>
            <StackItem grow>{children}</StackItem>

            {!!rightContent && (
              <RightContent data-testid="layout-right-content">
                {rightContent}
              </RightContent>
            )}
          </Stack>
        </AppLayout.MainContent>
      </AppLayout.Layout>
    );
  }

  return (
    <Container data-testid="layout-container">
      {!isLaptop ? (
        mobileHeadView()
      ) : (
        <Header isBorderRadius={false}>
          <MainHeader
            avatar={UserUtil.getProfilePicture(user) || undefined}
            userName={user?.firstName || undefined}
            setSearchResult={setResult}
            searchFilter={selectedTab}
          />
        </Header>
      )}
      <Main data-testid="layout-main">
        <Content>{children}</Content>
        <RightContent>{rightContent}</RightContent>
      </Main>
    </Container>
  );
};
export default SearchLayout;
