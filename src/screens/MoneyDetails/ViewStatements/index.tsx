/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { t } from 'i18next';
import { useParams } from 'react-router';
import {
  AlertIconStyled,
  FilterSelected,
  IconButtonStyled,
  MobileButtons,
} from '@/screens/Chambers/styles';
import Layout from '@/layout/MoneyLayout';
import { Spacer } from '@/layout';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { useBreakpoints } from '@/hooks';
import { type DropdownValueType } from '@/components/Dropdown';
import { useGetAccountListLazyQuery } from '@/apollo/graphql';
import {
  PaymentAccountTypeEnum,
  type PaymentFilter,
  PaymentStatusEnum,
} from '@/apollo/generated/types';
import { useTransactions } from '@/features/money/hooks';
import { Pagination } from '@/components/Pagination';
import { convert, DateFormater } from '../helper';
import StatementCard from './StatementCard';
import { StatementHeader } from './StatementHeader';
import {
  Container,
  LoadingContainer,
  Row,
  WhiteCard,
  NoRecordRow,
} from './styles';
import StatementFilter from './StatementFilter';
import { MobileContainer } from './StatementHeader/styles';
import {
  accountsDropdownMapper,
  selectedAccountFinder,
} from '../ViewTransactions/helper';
import { font } from './font';
import { StatementFooter } from './StatementFooter';

const ViewStatements = () => {
  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const Ref = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(1);
  const limit = 200;
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  );
  const [selctedDropdownValue, setSelectedDropdownValue] = useState<
    DropdownValueType<string>
  >({ label: '', key: '', type: 'value', value: '' });
  const [accounts, setAccounts] = useState<DropdownValueType<string>[]>([]);
  const { id = '' } = useParams();
  const [filter, setFilters] = useState<PaymentFilter>({});

  const [gqlGetAccountList] = useGetAccountListLazyQuery({
    fetchPolicy: 'cache-and-network',
  });
  const { transactionData, refresh } = useTransactions({ filter, limit, page });

  const { isTablet, isMobile } = useBreakpoints();

  const fetchAccounts = useCallback(async () => {
    const res = await gqlGetAccountList();
    if (res.data?.getAccountList) {
      const values = accountsDropdownMapper(res?.data);
      setAccounts(values);
      selectedAccountFinder(res.data, id, setSelectedDropdownValue);
    }
  }, [gqlGetAccountList, id, selctedDropdownValue]);

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setFilters({
        accountType:
          selctedDropdownValue.key === ''
            ? [PaymentAccountTypeEnum.Wallet, PaymentAccountTypeEnum.SubWallet]
            : ([selctedDropdownValue.key] as
                | [PaymentAccountTypeEnum]
                | undefined),
        endDate: convert(endDate),
        paymentStatus: PaymentStatusEnum.Processed,
        accountId: selctedDropdownValue.value,
        startDate: convert(startDate),
      });
    }
  }, [startDate, endDate, selctedDropdownValue]);

  useEffect(() => {
    refresh();
  }, [filter, page]);

  const handleDropdoenUpdate = useCallback(
    (selectedValue: DropdownValueType<string>) => {
      setSelectedDropdownValue(selectedValue);
    },
    [filter],
  );

  const handleOpenFilterModal = () => {
    setOpenFilterModal(false);
  };

  const handleStartDate = useCallback((value?: Date) => {
    setStartDate(value);
  }, []);

  const handleEndDate = useCallback((value?: Date) => {
    setEndDate(value);
  }, []);

  const subHeader = useMemo(
    () => (
      <StatementHeader
        accounts={accounts}
        selctedDropdownValue={selctedDropdownValue}
        handleDropdoenUpdate={handleDropdoenUpdate}
        startDate={startDate}
        endDate={endDate}
        handleStartDate={handleStartDate}
        handleEndDate={handleEndDate}
      />
    ),
    [
      accounts,
      handleStartDate,
      selctedDropdownValue,
      handleDropdoenUpdate,
      startDate,
      endDate,
    ],
  );
  const onPageChange = (val: number) => {
    setPage(val);
  };

  const handleDownloadPdf = useCallback(async () => {
    const element = Ref.current;
    const fileName = 'statement';
    if (element) {
      // eslint-disable-next-line new-cap
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
        hotfixes: ['px_scaling'],
        putOnlyUsedFonts: true,
        compress: true,
      });
      doc.addFileToVFS('SuisseIntl-Regular-normal.ttf', font);
      doc.addFont(
        'SuisseIntl-Regular-normal.ttf',
        'SuisseIntl-Regular',
        'bold',
      );
      doc.setFont('SuisseIntl-Regular', 'bold');
      doc.setFontSize(16);

      doc.text(
        `${
          selctedDropdownValue.label === 'Wallets : All'
            ? 'All Wallets'
            : selctedDropdownValue.label
        }, ${DateFormater(startDate)} - ${DateFormater(endDate)}`,
        60,
        80,
        { charSpace: -1 },
      );
      doc.text(
        `${t('noumena.money.view-statements.completedstatements')}`,
        60,
        120,
        { charSpace: -1 },
      );
      let table = document.createElement('table');
      const cloned = element.cloneNode(true) as HTMLElement;
      for (let i = 0; i < cloned.children.length; i++) {
        // console.log(i, cloned.children[i]);
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td1div1 = document.createElement(`div`);
        td1div1.innerHTML = `${cloned.children[i].children[0].children[0].innerHTML}###${cloned.children[i].children[0].children[1].innerHTML}`;
        td1.appendChild(td1div1);

        tr.appendChild(td1);
        let td2 = document.createElement('td');
        td2.innerHTML = `${cloned.children[i].children[2].children[0].innerHTML}###${cloned.children[i].children[2].children[1].innerHTML}###${cloned.children[i].children[2].children[2].innerHTML}`;
        tr.appendChild(td2);
        let td3 = document.createElement('td');
        td3.innerHTML = cloned.children[i].children[3].innerHTML;
        tr.appendChild(td3);
        table.appendChild(tr);
      }

      autoTable(doc, {
        startY: 150,
        html: table,
        didParseCell: (data) => {
          switch (data.column.index) {
            case 0:
              data.cell.text = data.cell.text[0].split('###');
              break;
            case 1:
              data.cell.text = data.cell.text[0].split('###');
              break;
            default:
          }
        },
      });
      const pageCount = doc.getNumberOfPages();
      doc.addFileToVFS('SuisseIntl-Regular-normal.ttf', font);
      doc.addFont(
        'SuisseIntl-Regular-normal.ttf',
        'SuisseIntl-Regular',
        'bold',
      );
      doc.setFont('SuisseIntl-Regular', 'bold');
      doc.setFontSize(10);
      for (let i = 1; i <= pageCount; i += 1) {
        doc.setPage(i);
        doc.setTextColor(133, 128, 145);
        doc.text(
          'Noumena Statement',
          doc.internal.pageSize.width - 770,
          doc.internal.pageSize.height - 13,
          { align: 'left' },
        );
        doc.text(
          `Page ${String(i)} of ${String(pageCount)}`,
          doc.internal.pageSize.width - 27,
          doc.internal.pageSize.height - 13,
          { align: 'right' },
        );
      }
      doc.save(fileName);
    }
  }, [Ref, selctedDropdownValue, startDate, endDate]);

  return (
    <Layout
      type="Chambers"
      data-testid="money-layout"
      hideLeftMenu={true}
      subHeader={subHeader}
    >
      <Spacer height={16} />
      <Container>
        <WhiteCard isMobile={isMobile} isTablet={isTablet}>
          <Row isMobile={isMobile}>
            {!isMobile && (
              <TSpan
                font="heading-xs-bold"
                colorToken="--text-card-header-neutral-highlighted"
              >
                {selctedDropdownValue.label || 'All Wallets'},{' '}
                {DateFormater(startDate)} - {DateFormater(endDate)}
              </TSpan>
            )}
            {isMobile && (
              <>
                <TSpan
                  font="heading-xs-bold"
                  colorToken="--text-card-header-neutral-highlighted"
                >
                  {selctedDropdownValue.label === 'Wallets : All'
                    ? 'All Wallets'
                    : selctedDropdownValue.label}
                  ,{' '}
                </TSpan>
                <TSpan
                  font="heading-xs-bold"
                  colorToken="--text-card-header-neutral-highlighted"
                >
                  {DateFormater(startDate)} - {DateFormater(endDate)}
                </TSpan>
              </>
            )}
            <Button
              secondary
              icon={
                <Icon
                  name="Download"
                  size={24}
                  color="--icon-button-brand-secondary-default"
                />
              }
              size={isMobile ? 'full_small' : 'large'}
              primary
              onClick={handleDownloadPdf}
            >
              {t('noumena.money.view-statements.download')}
            </Button>
          </Row>
        </WhiteCard>
        <Spacer height={isMobile || isTablet ? 16 : 24} />
        <WhiteCard isMobile={isMobile} isTablet={isTablet} gap="0px">
          <Row
            style={
              isMobile
                ? {
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    paddingTop: '16px',
                    paddingBottom: '16px',
                  }
                : { padding: '0px' }
            }
          >
            <TSpan
              font="heading-xs-bold"
              colorToken="--text-card-header-neutral-highlighted"
            >
              {t('noumena.money.view-statements.completedstatements')}
            </TSpan>
          </Row>
          {transactionData.loading && (
            <LoadingContainer>
              <Button neutral loading />
            </LoadingContainer>
          )}
          <div style={{ width: '100%', fontFamily: "Suisse Int'l" }} ref={Ref}>
            {!transactionData.loading && transactionData.data.length > 0 ? (
              transactionData.data.map((transaction) => (
                <StatementCard
                  key={transaction?.id}
                  id={transaction?.id}
                  sourceDetail={transaction?.sourceDetail}
                  destinationDetail={transaction?.destinationDetail}
                  paymentDate={transaction?.paymentDate}
                  amount={transaction?.amount}
                  transactionReason={transaction?.transactionReason}
                  currency={transaction?.currency}
                  charges={transaction?.charges}
                  isTransactionWithOwnAccounts={
                    transaction?.createUserId === transaction?.updatedUserId
                  }
                />
              ))
            ) : (
              <NoRecordRow>
                {t('noumena.money.view-statements.nostatements')}
              </NoRecordRow>
            )}
          </div>
          {transactionData.totalCount > limit && (
            <div style={{ alignSelf: 'center' }}>
              <Spacer height={4} />
              <Pagination
                currentPage={page}
                pageSize={limit}
                totalCount={transactionData.totalCount}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </WhiteCard>
        <Spacer height={isMobile || isTablet ? 16 : 24} />
        <StatementFooter />
        <Spacer height={16} />
        {isMobile && (
          <MobileContainer style={{ position: 'fixed' }}>
            <IconButtonStyled>
              <MobileButtons
                size="large"
                neutral
                onClick={() => setOpenFilterModal(true)}
                data-testid="chamber-filtering"
                rightIcon={
                  <Icon
                    name="align_center_m"
                    size={24}
                    color="--icon-button-neutral-default"
                  />
                }
              />
              <AlertIconStyled>
                <Icon
                  name="flag_pl_m"
                  size={14}
                  color="--text-badge-danger-secondary-default"
                />
              </AlertIconStyled>
            </IconButtonStyled>
            <Spacer width={12} />
            <FilterSelected show={false} />
          </MobileContainer>
        )}
        <StatementFilter
          isOpen={openFilterModal}
          handleClose={handleOpenFilterModal}
          handleDropdoenUpdate={handleDropdoenUpdate}
          accounts={accounts}
          startDate={startDate}
          endDate={endDate}
          handleStartDate={handleStartDate}
          handleEndDate={handleEndDate}
          selctedDropdownValue={selctedDropdownValue}
          setFilters={setFilters}
        />
      </Container>
    </Layout>
  );
};
export default ViewStatements;
