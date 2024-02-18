import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import emptyAccountIcon from '@/assets/images/empty-account.svg';
import { usePlaidToken } from '@/features/money/hooks';
import { type BankType } from '@/features/money/types';
import { Spacer } from '@/layout';
import { useBreakpoints } from '@/hooks';
import { useModalManager } from '@/hooks/modal/useModalManager';
import Plaid from './Plaid';
import Bank from './Banks';
import { Container, LeftItem, RightItem } from '../styles';
import * as Styles1 from '../styles';
import * as Styles from './styles';
import { AccountNotFoundInPlaid } from './AccountNotFoundInPlaid';
import { AddFundingSource } from './AddFundingSource';

type ModalType =
  | 'plaid-token'
  | 'unable_to_connect_account'
  | 'add_funding_source';

const LinkedAccounts = (props: {
  accounts: BankType[];
  refresh: () => void;
}) => {
  const { plaidToken } = usePlaidToken();
  const { accounts } = props;
  const { openModal, closeModal, modalType } = useModalManager<ModalType>();
  const { isMobile } = useBreakpoints();
  const { t } = useTranslation();

  const accountNotFound = () => {
    openModal('unable_to_connect_account');
  };

  const openFundingSourceModal = () => {
    openModal('add_funding_source');
  };

  return (
    <Styles.LinkedAccountsWrapper
      data-testid="Linked-accounts"
      isMobile={isMobile}
    >
      <Container isMobile={false}>
        <LeftItem isMobile={false}>
          <Styles1.CardHeader
            style={{
              padding: isMobile ? '20px 16px' : '0px',
            }}
          >
            <Styles1.CardInformation
              font="heading-xs-bold"
              colorToken="--text-card-header-neutral-highlighted"
            >
              {' '}
              {t('noumena.money.money-detail.linkedAccount')}
            </Styles1.CardInformation>
          </Styles1.CardHeader>
        </LeftItem>
        {accounts.length > 0 ? (
          <RightItem
            isMobile={false}
            style={{
              padding: isMobile ? '16px 16px' : '0px',
            }}
          >
            <Button
              size="small"
              tertiary
              leftIcon={
                <Icon
                  name="add_m"
                  size={16}
                  color="--icon-button-neutral-default"
                />
              }
              onClick={() => openModal('plaid-token')}
              disabled={!plaidToken}
            >
              {t('noumena.money.money-detail.addAccount')}
            </Button>
          </RightItem>
        ) : null}
      </Container>
      {!accounts.length ? (
        <>
          <Spacer height={16} />
          <Styles.CardWrapper>
            <Styles.ContentWrapper>
              <Styles.WalletLogo src={emptyAccountIcon} alt="Account" />
              <Spacer height={16} />
              <Styles.HelperText
                font="body-l"
                colorToken="--text-placeholder-neutral-default"
              >
                {t('noumena.money.money-detail.linkFirstAccountWithPlaid')}
              </Styles.HelperText>
              <Spacer height={16} />
              <Button
                secondary
                size="small"
                leftIcon={
                  <Icon
                    name="add_m"
                    size={16}
                    color="--icon-button-brand-secondary-default"
                  />
                }
                disabled={!plaidToken}
                onClick={() => openModal('plaid-token')}
              >
                {t('noumena.money.money-detail.addAccount')}
              </Button>
              <Spacer height={24} />
            </Styles.ContentWrapper>
          </Styles.CardWrapper>
        </>
      ) : (
        accounts.map((account) => (
          <Bank
            key={account.id}
            name={account.name}
            lastFour={account.maskAccountNumber}
            id={account.id}
            refresh={() => props.refresh()}
            balance={account.balance}
            createdAt={account.createdAt}
            status={account.status}
            updatedAt={account.updatedAt}
          />
        ))
      )}
      {modalType === 'plaid-token' && plaidToken && (
        <Plaid
          open={modalType === 'plaid-token'}
          onClose={closeModal}
          plaidToken={plaidToken}
          refresh={props.refresh}
          accountNotFound={accountNotFound}
        />
      )}
      {modalType === 'unable_to_connect_account' && (
        <AccountNotFoundInPlaid
          open={modalType === 'unable_to_connect_account'}
          onClose={closeModal}
          openFundingSourceModal={openFundingSourceModal}
        />
      )}
      {modalType === 'add_funding_source' && (
        <AddFundingSource
          open={modalType === 'add_funding_source'}
          onClose={closeModal}
          refresh={props.refresh}
        />
      )}
    </Styles.LinkedAccountsWrapper>
  );
};

export default LinkedAccounts;
