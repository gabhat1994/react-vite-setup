import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import routes from '@/constants/routes';
import { TSpan } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import { type WalletType } from '@/features/money/types';
import { Button } from '@/components/Button';
import { Spacer } from '@/layout';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import Wallet from './Wallet';
import * as Styles1 from '../styles';
import { WalletWrapper } from './styles';

const Wallets = (props: {
  mainWallets: WalletType[];
  subWallets: WalletType[];
  refresh?: () => void;
}) => {
  const navigate = useNavigate();
  const handleNavigation = useCallback(async () => {
    navigate(routes.VIEW_STATEMENTS_MAIN);
  }, [navigate]);
  const { t } = useTranslation();
  const deviceType = useDeviceType();
  return (
    <WalletWrapper
      data-testid="balance"
      isMobile={deviceType === DeviceTypeEnum.MOBILE}
    >
      <Styles1.Container isMobile={false}>
        <Styles1.LeftItem isMobile={false}>
          <Styles1.CardHeader>
            <Styles1.CardInformation
              font="heading-xs-bold"
              colorToken="--text-card-header-neutral-highlighted"
              style={{
                padding:
                  deviceType === DeviceTypeEnum.MOBILE
                    ? '16px 16px 8px'
                    : '0px',
              }}
            >
              {t(`noumena.money.money-detail.wallets`)}
            </Styles1.CardInformation>
          </Styles1.CardHeader>
        </Styles1.LeftItem>
        <Styles1.RightItem isMobile={false}>
          <Button
            size="full"
            style={{
              padding:
                deviceType === DeviceTypeEnum.MOBILE ? '16px 16px 8px' : '0px',
            }}
            textOnly
            primary
            rightIcon={
              <Icon
                name="chevron_right_m"
                size={9.2}
                color="--icon-button-brand-primary-default"
              />
            }
            onClick={() => handleNavigation()}
          >
            {t(`noumena.money.money-detail.viewStatements1`)}
          </Button>
        </Styles1.RightItem>
      </Styles1.Container>
      <Wallet {...props.mainWallets[0]} isMain={true} refresh={props.refresh} />
      {deviceType !== DeviceTypeEnum.MOBILE && <Spacer height={8} />}
      {props.subWallets.length > 0 && (
        <div
          style={{
            padding:
              deviceType === DeviceTypeEnum.MOBILE ? '16px 16px 8px' : '0px',
          }}
        >
          <TSpan
            font="body-m-bold"
            colorToken="--text-card-header-neutral-default"
          >
            {t(`noumena.money.money-detail.noumWallets`)}
          </TSpan>
        </div>
      )}
      {props.subWallets.map((wallet) => (
        <>
          <Wallet key={wallet.id} {...wallet} isMain={false} />
          <Spacer height={8} />
        </>
      ))}
    </WalletWrapper>
  );
};

export default Wallets;
