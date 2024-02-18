import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { groupBy, isEmpty } from 'lodash';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import ROUTES from '@/constants/routes';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { Spacer } from '@/layout';
import { TSpan } from '@/components/Typography';
import { useTransactionHistory } from '@/features/money/hooks';
import { TransactionCardUtil } from '@/features/money/utils';
import { DateWrapper } from '../../ViewTransactions/styles';
import { DateFormaterStringInput } from '../../ViewTransactions/helper';
import * as Styles from '../styles';

const limit = 5;
const page = 1;

const Transactions = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const filter = {
    endDate: new Date().toISOString().split('T')[0],
    startDate: '',
  };
  const device = useDeviceType();
  const isSmallScreen =
    DeviceTypeEnum.MOBILE === device || DeviceTypeEnum.TABLET === device;
  const {
    data: { transactions },
  } = useTransactionHistory({ filter, limit, page });

  const handleNavigationToTransactions = useCallback(async () => {
    navigate(ROUTES.VIEW_TRANSACTIONS_MAIN);
  }, [navigate]);

  const groupedByDay = groupBy(transactions, (item) =>
    DateFormaterStringInput(item?.createdAt!),
  );

  return (
    <Styles.CardWrapper
      isMobile={device === DeviceTypeEnum.MOBILE}
      isTablet={device === DeviceTypeEnum.TABLET}
    >
      <Styles.CardHeader
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Styles.CardInformation
          font="heading-xs-bold"
          colorToken="--text-card-header-neutral-highlighted"
        >
          {t(`noumena.money.money-detail.transactions`)}
        </Styles.CardInformation>
        {!!transactions.length && !isSmallScreen && (
          <>
            <Button
              style={{ justifyContent: 'flex-end', width: 'fit-content' }}
              textOnly
              primary
              rightIcon={
                <Icon
                  name="chevron_small_right_m"
                  size={24}
                  color="--icon-button-brand-primary-default"
                />
              }
              onClick={() => handleNavigationToTransactions()}
            >
              {t(`noumena.money.money-detail.showAll`)}
            </Button>
          </>
        )}
      </Styles.CardHeader>
      {Object.keys(groupedByDay).map((key: string) => (
        <>
          <DateWrapper
            style={{
              paddingLeft: device === DeviceTypeEnum.TABLET ? '16px' : '0px',
            }}
          >
            {key.split(',')[0]}
          </DateWrapper>
          {groupedByDay[key as string].length > 0 &&
            groupedByDay[key as string].map((transaction) => (
              <>
                {TransactionCardUtil.getTransactionCardComponent(
                  transaction.context,
                  transaction,
                )}
                <Styles.Separator />
              </>
            ))}
        </>
      ))}
      {isEmpty(groupedByDay) && (
        <Styles.NoTransactions>
          <TSpan
            font="body-l"
            colorToken="--text-placeholder-neutral-default"
            textAlign="center"
            $fill
          >
            {t('noumena.money-detail.trsanactions.noTransactionsFound')}
          </TSpan>
        </Styles.NoTransactions>
      )}
      {!!transactions.length && isSmallScreen && (
        <>
          {' '}
          <Spacer height={16} />{' '}
          <Styles.SeeAllButton onClick={() => handleNavigationToTransactions()}>
            {t('noumena.container.subwallet.seeAllTransactions')}
          </Styles.SeeAllButton>
        </>
      )}
    </Styles.CardWrapper>
  );
};

export default Transactions;
