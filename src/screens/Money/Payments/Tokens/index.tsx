import { t } from 'i18next';
import { useState, useMemo } from 'react';
import { Icon } from '@/components/Icon';
import { Spacer } from '@/layout';
import { TSpan } from '@/components/Typography';
import { useGetTokenQuery } from '@/apollo/graphql';
import { Button } from '@/components/Button';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import TokenModal from './TokenModal';
import * as Styles from '../styles';

const Tokens = () => {
  const [open, setOpen] = useState(false);
  const deviceType = useDeviceType();
  const { data, loading } = useGetTokenQuery();
  const info = useMemo(() => {
    if (data?.getSpaceByType && data?.getSpaceByType[0]) {
      return data?.getSpaceByType[0];
    }
    return {
      token: {
        count: '--',
      },
    };
  }, [data]);
  return (
    <Styles.CardWrapper style={{ padding: 0 }}>
      <Styles.CardHeader style={{ padding: '16px 16px 16px 16px' }}>
        <Styles.CardInformation
          font="body-l-bold"
          colorToken="--text-card-header-neutral-highlighted"
        >
          {t('noumena.money.wallet.tokens')}
        </Styles.CardInformation>
        <Button
          size="small"
          style={{ width: '40px', height: '40px' }}
          data-testid="stepTwoBackButton"
          leftIcon={
            <Icon
              name="arrow_right_m"
              size={24}
              color="--icon-button-neutral-default"
            />
          }
          tertiary
          onClick={() => setOpen(true)}
        />
      </Styles.CardHeader>
      <Spacer height={deviceType === DeviceTypeEnum.MOBILE ? 8 : 10} />
      <Styles.HelperTextWrapper
        font="body-m"
        colorToken="--text-card-neutral-default"
        style={{ paddingLeft: '16px', alignSelf: 'flex-start' }}
      >
        {t('noumena.money.tokens.subheading')}
      </Styles.HelperTextWrapper>
      <TSpan
        style={{ paddingLeft: '16px', paddingBottom: '16px' }}
        font="heading-m"
        colorToken="--text-card-neutral-highlighted"
      >
        {loading ? '...' : info.token?.count}
      </TSpan>
      <TokenModal open={open} onClose={() => setOpen(false)} />
    </Styles.CardWrapper>
  );
};

export default Tokens;
