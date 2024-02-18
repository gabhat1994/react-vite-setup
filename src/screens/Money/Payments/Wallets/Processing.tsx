import { t } from 'i18next';
import { Spacer } from '@/layout';
import * as Styles from '../styles';

type ProcessingProps = {
  refetchWallet: () => void;
  allowRefetch: boolean;
};

const Processing = ({ refetchWallet, allowRefetch }: ProcessingProps) => {
  const handleRefresh = () => {
    refetchWallet();
  };
  return (
    <Styles.CardWrapper
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <Styles.CardHeader>
        <Styles.CardInformation
          font="body-l-bold"
          colorToken="--text-card-header-neutral-highlighted"
        >
          {t('noumena.money.wallet.title')}
        </Styles.CardInformation>
      </Styles.CardHeader>
      <Spacer height={16} />
      <Styles.ContentWrapper style={{ gap: '16px' }}>
        <Styles.CardInformation
          style={{ width: '100%' }}
          font="body-l-bold"
          colorToken="--text-card-header-neutral-highlighted"
        >
          {t('noumena.money.wallet.processing.titile')}
        </Styles.CardInformation>
        <Spacer height={12} />
        <Styles.HelperText
          font="body-m"
          colorToken="--text-placeholder-neutral-default"
        >
          {t('noumena.money.wallet.processing.sub.titile')}.{' '}
          {allowRefetch && (
            <>
              {' '}
              Click
              <Styles.RefreshLink onClick={handleRefresh}>
                {' '}
                refresh{' '}
              </Styles.RefreshLink>
              to view the latest status.{' '}
            </>
          )}
        </Styles.HelperText>
      </Styles.ContentWrapper>
    </Styles.CardWrapper>
  );
};

export default Processing;
