import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import { groupBy, isEmpty } from 'lodash';
import * as Styles from '@/screens/Money/Payments/Tokens/styles';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { PaymentAccountTypeEnum } from '@/apollo/generated/types';
import { useGetConnectedChamberPaymentsQuery } from '@/apollo/graphql';

import { Pagination } from '@/components/Pagination';
import { DateFormaterStringInput } from '@/screens/MoneyDetails/ViewTransactions/helper';
import { Spacer } from '@/layout';
import { cleanList } from '@/utils/list';
import { TransactionCardUtil, TransactionUtil } from '@/features/money/utils';

import { useAuth } from '@/features/auth/contexts';

const TransactionWindow = (props: {
  open: boolean;
  onClose: Function;
  userId: string;
  chamberId: string;
  connectedNoumWalletId?: string;
}) => {
  const pageSize = 10;
  const { t } = useTranslation();
  const { user } = useAuth();
  const [page, setPage] = useState<number>(1);

  const { data, loading } = useGetConnectedChamberPaymentsQuery({
    fetchPolicy: 'network-only',
    variables: {
      filter: {
        chamberId: props.chamberId || '',
        userId: props.userId,
        endDate: new Date().toISOString().split('T')[0],
        startDate: '',
        accountId: props.connectedNoumWalletId,
        accountType: [PaymentAccountTypeEnum.SubWallet],
      },
      limit: 10,
      page,
    },
  });

  const transactionCount = data?.getConnectedChamberPayments?.count || 0;

  const transactionsData = useMemo(
    () => cleanList(data?.getConnectedChamberPayments?.data),
    [data?.getConnectedChamberPayments?.data],
  );

  const connectedNoumTransactions = useMemo(
    () =>
      TransactionUtil.getAllTransactions({
        transactionsData,
        loggedInUserId: user?._id || '',
      }),
    [transactionsData, user?._id],
  );

  const onPageChange = (val: number) => {
    setPage(val);
  };

  const groupedByDay = groupBy(connectedNoumTransactions, (item) =>
    DateFormaterStringInput(item?.createdAt!),
  );

  return (
    <Modal
      enableCloseButton
      size={ModalSize.L}
      disableBackdropClick
      disableEscapeKeyDown
      onClose={() => props.onClose()}
      open={props.open}
    >
      {loading ? (
        <>
          <ModalBody align="center">
            <Button loading neutral />
          </ModalBody>
        </>
      ) : (
        <>
          <ModalHeader>{t(`noumena.connected_noum_transactions`)}</ModalHeader>
          <ModalBody hideScrollbar overflowY="scroll">
            {Object.keys(groupedByDay).map((key: string) => (
              <div key={key} style={{ width: '100%' }}>
                <Styles.Container>
                  <Styles.DateContainer>
                    <TSpan
                      font="body-s"
                      colorToken="--text-card-neutral-default"
                    >
                      {new Date().getUTCFullYear() === Number(key.split(',')[1])
                        ? key.split(',')[0]
                        : key}
                    </TSpan>
                  </Styles.DateContainer>
                </Styles.Container>
                {groupedByDay[key].length > 0 &&
                  groupedByDay[key].map((transaction) =>
                    TransactionCardUtil.getTransactionCardComponent(
                      transaction.context,
                      transaction,
                    ),
                  )}
                <Spacer height={8} />
              </div>
            ))}
            {isEmpty(groupedByDay) && (
              <TSpan
                font="body-l"
                colorToken="--text-modal-neutral-default"
                textAlign="center"
              >
                {t('noumena.money.noTransactions')}
              </TSpan>
            )}
            {transactionCount > pageSize && (
              <div style={{ alignSelf: 'center' }}>
                <Spacer height={4} />
                <Pagination
                  currentPage={page}
                  pageSize={pageSize}
                  totalCount={transactionCount}
                  onPageChange={onPageChange}
                />
              </div>
            )}
          </ModalBody>
        </>
      )}
    </Modal>
  );
};

export default TransactionWindow;
