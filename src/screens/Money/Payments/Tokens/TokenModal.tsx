import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { isEmpty, groupBy } from 'lodash';
import { Modal, ModalBody, ModalSize } from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { useGetTokenTransactionQuery } from '@/apollo/graphql';
import mainWallet from '@/assets/images/main-wallet.svg';
import { formatDateString } from '@/utils/getTimeStampForDisplaying';
import { Button } from '@/components/Button';
import { DeviceTypeEnum, useDeviceType, useWindowDimensions } from '@/hooks';
import * as Styles from './styles';

const TokenModal = (props: { open: boolean; onClose: Function }) => {
  const deviceType = useDeviceType();
  const { t } = useTranslation();
  const { data, loading } = useGetTokenTransactionQuery();
  const { height } = useWindowDimensions();
  const isMobile = deviceType === DeviceTypeEnum.MOBILE;
  const info = useMemo(() => {
    if (data?.getSpaceByType && data?.getSpaceByType[0]) {
      return data?.getSpaceByType[0];
    }
    return {
      token: {
        count: 0,
      },
      tokenTransaction: {
        data: [],
      },
    };
  }, [data]);

  const groupedByDay = groupBy(info.tokenTransaction?.data, (item) =>
    formatDateString(new Date(item?.createdAt)),
  );

  return (
    <Modal
      size={ModalSize.L}
      disableBackdropClick
      disableEscapeKeyDown
      enableCloseButton
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
          <Styles.BalanceWrapper>
            <TSpan font="body-xl" colorToken="--text-card-neutral-default">
              {t(`noumena.money.tokenHeader`)}
            </TSpan>
            <TSpan
              font="heading-xxl"
              textAlign="center"
              colorToken="--text-card-header-neutral-highlighted"
            >
              {info.token?.count}
            </TSpan>
          </Styles.BalanceWrapper>
          {!isEmpty(groupedByDay) && (
            <ModalBody
              style={{ display: 'block' }}
              align="center"
              minHeight={isMobile ? height - 106 : 'auto'}
            >
              {Object.keys(groupedByDay).map((key: string) => (
                <div key={key}>
                  <Styles.Container>
                    <Styles.DateContainer>
                      <TSpan
                        font="body-m-bold"
                        colorToken="--text-card-header-neutral-default"
                      >
                        {key}
                      </TSpan>
                    </Styles.DateContainer>
                  </Styles.Container>
                  {groupedByDay[key].length > 0 &&
                    groupedByDay[key as string].map((transaction) => (
                      <Styles.WalletContainer key={transaction?.createdAt}>
                        <Styles.Container>
                          <Styles.LeftItem>
                            <Styles.ProfileWarpper>
                              <Styles.Profile src={mainWallet} alt="profile" />
                              <Styles.TextContainer>
                                <TSpan
                                  font="body-l-bold"
                                  colorToken="--text-tablecell-header-neutral-highlighted"
                                >
                                  {t('noumena.default.brand_name')}
                                </TSpan>
                                <TSpan
                                  font="body-m"
                                  colorToken="--text-tablecell-body-neutral-default"
                                >
                                  {transaction?.message}
                                </TSpan>
                              </Styles.TextContainer>
                            </Styles.ProfileWarpper>
                          </Styles.LeftItem>
                          <Styles.RightItem>
                            {(transaction?.count || 0) >= 0 ? (
                              <TSpan
                                font="body-xl-bold"
                                colorToken="--text-tablecell-success-primary-default"
                              >
                                + {transaction?.count}
                              </TSpan>
                            ) : (
                              <TSpan
                                font="body-xl-bold"
                                colorToken="--text-tablecell-danger-primary-default"
                              >
                                {transaction?.count}
                              </TSpan>
                            )}
                          </Styles.RightItem>
                        </Styles.Container>
                      </Styles.WalletContainer>
                    ))}
                </div>
              ))}
            </ModalBody>
          )}
          {isEmpty(groupedByDay) && (
            <ModalBody align="center">
              <TSpan
                font="body-l"
                textAlign="center"
                colorToken="--text-modal-neutral-default"
              >
                {t('noumena.money.noTransactions')}
              </TSpan>
            </ModalBody>
          )}
        </>
      )}
    </Modal>
  );
};

export default TokenModal;
