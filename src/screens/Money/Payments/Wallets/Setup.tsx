import { type FC, useCallback, useEffect, useState } from 'react';
import { t } from 'i18next';
import { useNavigate } from 'react-router';
import { Button } from '@/components/Button';
import ROUTES from '@/constants/routes';
import { useGetCurrentUserStatusLazyQuery } from '@/apollo/graphql';
import { DeviceTypeEnum, useDeviceType, useToast } from '@/hooks';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
import { Icon } from '@/components/Icon';
import { Spacer } from '@/layout';
import * as Styles from '../styles';

const Setup: FC = () => {
  const {
    flags: { payments },
  } = useLaunchDarkly();
  const [gqlCurrentUserStatus, { loading }] =
    useGetCurrentUserStatusLazyQuery();
  const navigate = useNavigate();
  const deviceType = useDeviceType();
  const { addToast } = useToast();
  const [isActiveUser, setIsActiveUser] = useState(false);
  const handleSetUpWallet = useCallback(() => {
    if (isActiveUser) {
      navigate(ROUTES.WALLET_SETUP);
      return;
    }
    addToast(
      'error',
      'none',
      `${t('noumena.money.setup_wallet.not.authorized')}`,
    );
  }, [isActiveUser, addToast, navigate]);
  useEffect(() => {
    gqlCurrentUserStatus({
      fetchPolicy: 'network-only',
      onCompleted(data) {
        if (
          data.currentUser?.userStatus &&
          data.currentUser.userStatus === 'ACTIVE'
        ) {
          setIsActiveUser(true);
        }
      },
    });
  }, [gqlCurrentUserStatus]);
  return (
    <Styles.CardWrapper style={{ height: '100%' }}>
      <Styles.CardHeader>
        <Styles.CardInformation
          font="body-l-bold"
          colorToken="--text-card-header-neutral-highlighted"
        >
          {t('noumena.money.wallet.title')}
        </Styles.CardInformation>
      </Styles.CardHeader>
      <Styles.ContentWrapper
        style={
          deviceType === DeviceTypeEnum.TABLET
            ? { height: '100%', width: '50%', alignSelf: 'center' }
            : undefined
        }
      >
        <Icon
          name="wallet_m"
          size={96}
          color="--icon-card-placeholder-neutral-default"
        />
        <Spacer height={16} />
        <Styles.HelperText
          font="body-m"
          colorToken="--text-placeholder-neutral-default"
        >
          {t('noumena.money.wallet.helperText')}
        </Styles.HelperText>
      </Styles.ContentWrapper>
      <Styles.SetupWalletButton data-testid="money-wallet-setup-button">
        <Button
          secondary
          onClick={handleSetUpWallet}
          size="full_small"
          loading={loading}
          disabled={!payments}
        >
          {t('noumena.money.wallet.button.setup.wallet')}
        </Button>
      </Styles.SetupWalletButton>
    </Styles.CardWrapper>
  );
};

export default Setup;
