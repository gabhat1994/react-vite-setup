import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { type WalletType } from '@/features/money/types';
import mainWallet from '@/assets/images/main-wallet.svg';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import { Icon } from '@/components/Icon';
import {
  Dropdown,
  type DropdownTargetProps,
  type DropdownValueType,
} from '@/components/Dropdown';
import ROUTES from '@/constants/routes';
import { useGetNoumProfileLazyQuery } from '@/apollo/graphql';
import { PaymentAccountTypeEnum } from '@/apollo/generated/types';
import { TransactionModal } from '@/features/TransactionModal';
import { TransactionModalType } from '@/features/TransactionModal/types';
import { Button } from '@/components/Button';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { BalanceComponentWallet } from '../common';
import { Container, LeftItem, RightItem, DropdownPicker } from '../styles';
import {
  WalletContainer,
  ProfileWarpper,
  Profile,
  BalanceContainer,
  IconContainer,
} from './styles';

const Wallet = (
  props: WalletType & { isMain: boolean; refresh?: () => void },
) => {
  const [gqlGetNoumProfile] = useGetNoumProfileLazyQuery({
    fetchPolicy: 'cache-and-network',
  });
  const deviceType = useDeviceType();
  const [src, setSrc] = useState(mainWallet);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const options: DropdownValueType<string>[] = [
    {
      key: 'view',
      label: (
        <TSpan
          font="body-m-bold"
          colorToken="--text-tablecell-header-neutral-highlighted"
        >
          {t(`noumena.money.money-detail.viewDetails`)}
        </TSpan>
      ),
      type: 'value',
      value: 'view',
    },
  ];
  const handleNavigation = useCallback(async () => {
    navigate(ROUTES.ACCOUNT_DETAILS);
  }, [navigate]);
  useEffect(() => {
    if (props.chamberId) {
      gqlGetNoumProfile({
        variables: {
          id: props.chamberId,
        },
        onCompleted: (data) => {
          setSrc(data.getSpaceById?.profileImage || mainWallet);
        },
      });
    }
  }, [gqlGetNoumProfile, props.chamberId]);

  const setToDefaultWalletImage = useCallback(() => {
    setSrc(mainWallet);
  }, []);

  return (
    <WalletContainer isMobile={deviceType === DeviceTypeEnum.MOBILE}>
      <Container isMobile={false}>
        <LeftItem isMobile={false}>
          <ProfileWarpper>
            <Profile
              src={src}
              alt="profile"
              onError={setToDefaultWalletImage}
            />
            <TSpan
              font="body-l-bold"
              colorToken="--text-tablecell-header-neutral-highlighted"
            >
              {props.walletName}
            </TSpan>
          </ProfileWarpper>
        </LeftItem>
        <RightItem isMobile={false}>
          <BalanceContainer>
            <BalanceComponentWallet
              label={
                deviceType === DeviceTypeEnum.MOBILE
                  ? t('noumena.money.money-detail.balanceLabel')
                  : t('noumena.money.money-detail.availableBalanceLabel')
              }
              amount={props.balance}
              size="small"
            />
            <Spacer width={16} />
            <IconContainer>
              {props.isMain ? (
                <Dropdown
                  hideIcons
                  containerHeight="50px"
                  options={options}
                  usePortal={true}
                  onSelectOption={(val) => {
                    switch (val.key) {
                      case 'view':
                        handleNavigation();
                        break;
                      case 'add':
                        setOpen(true);
                        break;
                      default:
                    }
                  }}
                >
                  {({
                    targetProps,
                    targetRef,
                  }: DropdownTargetProps<HTMLDivElement>) => (
                    <>
                      <DropdownPicker
                        key="123"
                        ref={targetRef}
                        {...targetProps}
                      >
                        <Button
                          textOnly
                          size="small"
                          icon={
                            <Icon
                              name="more_m"
                              size={24}
                              color="--icon-button-neutral-default"
                            />
                          }
                        />
                      </DropdownPicker>
                    </>
                  )}
                </Dropdown>
              ) : (
                <Button
                  textOnly
                  size="small"
                  icon={
                    <Icon
                      name="chevron_right_m"
                      color="--icon-button-neutral-default"
                      size={9.2}
                      onClick={() => {
                        navigate(
                          `/view-statements/${PaymentAccountTypeEnum.SubWallet}/${props.id}`,
                        );
                      }}
                    />
                  }
                />
              )}
            </IconContainer>
          </BalanceContainer>
        </RightItem>
      </Container>
      {open && (
        <TransactionModal
          type={TransactionModalType.TRANSFER}
          open={open}
          handleClose={() => setOpen(false)}
          onSuccessfulTransaction={props.refresh}
        />
      )}
    </WalletContainer>
  );
};

export default Wallet;
