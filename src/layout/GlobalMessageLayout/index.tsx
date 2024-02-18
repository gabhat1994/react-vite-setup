import { type FC, useContext } from 'react';
import { Header } from '@/components/Header';
import { MainHeader } from '@/layout/MainHeader';
import { Spinner } from '@/components/Spinner';
import { useAuth } from '@/features/auth/contexts';
import { useLaunchDarkly, useWindowDimensions } from '@/hooks';
import { UserUtil } from '@/utils/user';
import SideBar from '@/screens/GlobalMessages/SideBar/SideBar';
import { breakpoints } from '@/constants/devices';
import { ConversationViewContext } from '@/features/conversation/contexts/ConversationViewContext';
import { NewConversationContext } from '@/features/conversation/contexts/NewConversationContext';
import { ViewMode } from '@/features/conversation/types';
import { useNavigate } from 'react-router';
import * as S from './styles';
import { AppLayout } from '../AppLayout';

export const GlobalMessageLayout: FC<{
  children?: React.ReactNode;
}> = (props) => {
  const { children } = props;

  const { user } = useAuth();
  const { width } = useWindowDimensions();
  const { flags } = useLaunchDarkly();
  const navigate = useNavigate();

  const { viewMode } = useContext(ConversationViewContext);
  const { loading: isCreatingNewConversation } = useContext(
    NewConversationContext,
  );

  const isMobile = width <= breakpoints.MOBILE_MAX;

  const mainContent = (
    <S.Container>
      <S.Content>
        {(viewMode !== ViewMode.FULLCONVERSATION || !isMobile) && <SideBar />}
        {!isMobile && <S.Divider />}
        <S.Children>{children}</S.Children>
      </S.Content>
    </S.Container>
  );

  if (flags.newAppNavigation) {
    return (
      <AppLayout.Layout
        onGoBack={() => navigate(-1)}
        background="neutral-alt"
        topNavbar={<AppLayout.TopBar />}
        sideNav={<AppLayout.SideNavigation />}
      >
        {mainContent}
      </AppLayout.Layout>
    );
  }

  return (
    <S.Layout>
      {isCreatingNewConversation && (
        <S.LoadingWrapper>
          <Spinner />
        </S.LoadingWrapper>
      )}

      <Header isBorderRadius={false}>
        <MainHeader
          avatar={UserUtil.getProfilePicture(user) || undefined}
          userName={user?.firstName || undefined}
        />
      </Header>
      {mainContent}
    </S.Layout>
  );
};
