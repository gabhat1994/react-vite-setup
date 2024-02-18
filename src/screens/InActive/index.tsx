import { ActionType } from '@/apollo/generated/types';
import { useAuth } from '@/features/auth/contexts';
import { useLaunchDarkly } from '@/hooks';
import { InActive } from './components/InActive';
import AppStyled from './styles';
import { InActiveV2 } from './components/InActive/InActiveV2';

const InActiveScreen = () => {
  const { user, signOut } = useAuth();
  const {
    flags: { newSignUp },
  } = useLaunchDarkly();

  const metaData =
    user?.metadata && user.metadata.length > 0
      ? user.metadata[user.metadata.length - 1]
      : null;

  const reason = metaData?.reason ?? '';
  const description = metaData?.moreInfo ?? '';
  if (newSignUp) {
    return <InActiveV2 />;
  }

  return (
    <AppStyled data-testid="inActive">
      {user?.userStatus === ActionType.Rejected ? (
        <InActive
          userStatus="REJECTED"
          statusReason={reason}
          description={description}
          handleLogout={signOut}
        />
      ) : (
        <></>
      )}
    </AppStyled>
  );
};

export default InActiveScreen;
