import { t } from 'i18next';
import { Button } from '@/components/Button';
import { Spacer } from '@/layout';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import * as Styles from '../styles';

type VerificationProps = {
  helperText: string;
  buttonText: string;
  onNavigate: () => void;
};

const Verification = ({
  helperText,
  buttonText,
  onNavigate,
}: VerificationProps) => {
  const deviceType = useDeviceType();

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
        <Styles.CardInformation
          font="body-l-bold"
          colorToken="--text-card-header-neutral-highlighted"
        >
          {t('noumena.money.wallet.verification.sub.title')}
        </Styles.CardInformation>
        <Spacer height={16} />
        <Styles.HelperText
          font="body-m"
          colorToken="--text-placeholder-neutral-default"
        >
          {helperText}
        </Styles.HelperText>
      </Styles.ContentWrapper>
      <Styles.SetupWalletButton data-testid="money-wallet-setup-button">
        <Button secondary size="full_small" onClick={onNavigate}>
          {buttonText}
        </Button>
      </Styles.SetupWalletButton>
    </Styles.CardWrapper>
  );
};

export default Verification;
