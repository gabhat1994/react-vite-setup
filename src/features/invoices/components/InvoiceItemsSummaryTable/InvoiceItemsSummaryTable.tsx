import { isNumber } from 'lodash';
import { TSpan } from '@/components/Typography';
import {
  type AllCurrencyEnum,
  type InvoiceLineItem,
} from '@/apollo/generated/types';
import convertToCurrency from '@/utils/currencyToCurrency';
import { Stack } from '@/layout';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import InvoiceSummaryTable from '../InvoiceTableSummary/InvoiceTableSummary';
import { InvoiceUtils } from '../../utils/invoice';
import S from './styles';

type InvoiceItemsSummaryTableProps = {
  data: InvoiceLineItem[];
  currency?: AllCurrencyEnum;
};

const InvoiceItemsSummaryTable: React.FC<InvoiceItemsSummaryTableProps> = ({
  data,
  currency,
}) => {
  const { isMobile } = useBreakpoints();

  return (
    <>
      <S.Table>
        {!isMobile && (
          <S.TableHead>
            <S.TableRow>
              <S.TableHeader align="left">DESCRIPTION</S.TableHeader>
              <S.TableHeader>QTY</S.TableHeader>
              <S.TableHeader>UNIT PRICE</S.TableHeader>
              <S.TableHeader>TAX RATE</S.TableHeader>
              <S.TableHeader>AMOUNT</S.TableHeader>
            </S.TableRow>
          </S.TableHead>
        )}

        <S.TableBody>
          {data.map((item) =>
            isMobile ? (
              <S.TableRow key={item.id}>
                <S.TableCell>
                  <Stack>
                    <TSpan
                      font="body-m-bold"
                      colorToken="--text-card-neutral-highlighted"
                    >
                      {item.description}
                    </TSpan>
                  </Stack>

                  <S.ItemDetailsRow>
                    <S.ItemDetailsRowText>Quantity:</S.ItemDetailsRowText>
                    <S.ItemDetailsRowText>{item.quantity}</S.ItemDetailsRowText>
                  </S.ItemDetailsRow>

                  <S.ItemDetailsRow>
                    <S.ItemDetailsRowText>Unit Price:</S.ItemDetailsRowText>
                    <S.ItemDetailsRowText>
                      {item.unitPrice}
                    </S.ItemDetailsRowText>
                  </S.ItemDetailsRow>

                  <S.ItemDetailsRow>
                    <S.ItemDetailsRowText>Tax Rate:</S.ItemDetailsRowText>
                    <S.ItemDetailsRowText>
                      {isNumber(item.taxRate) ? `${item.taxRate}%` : '-'}
                    </S.ItemDetailsRowText>
                  </S.ItemDetailsRow>

                  <S.ItemDetailsRow>
                    <S.ItemDetailsRowText>Amount:</S.ItemDetailsRowText>
                    <S.ItemDetailsRowText>
                      {InvoiceUtils.getItemTotalValueWithCurrency(
                        item.quantity,
                        item.unitPrice,
                        item.taxRate,
                        currency,
                      )}
                    </S.ItemDetailsRowText>
                  </S.ItemDetailsRow>
                </S.TableCell>
              </S.TableRow>
            ) : (
              <S.TableRow key={item.id}>
                <S.TableCell align="left">
                  <TSpan
                    font="body-m"
                    colorToken="--text-card-neutral-highlighted"
                  >
                    {item.description}
                  </TSpan>
                </S.TableCell>

                <S.TableCell $width="10%">
                  <TSpan
                    font="body-m"
                    colorToken="--text-card-neutral-highlighted"
                  >
                    {item.quantity}
                  </TSpan>
                </S.TableCell>

                <S.TableCell $width="10%">
                  <TSpan font="body-m" colorToken="--text-card-neutral-default">
                    {convertToCurrency(item.unitPrice, currency, 2)}
                  </TSpan>
                </S.TableCell>

                <S.TableCell $width="10%">
                  <TSpan font="body-m" colorToken="--text-card-neutral-default">
                    {isNumber(item.taxRate) ? `${item.taxRate}%` : ''}
                  </TSpan>
                </S.TableCell>

                <S.TableCell $width="10%">
                  <TSpan
                    font="body-m"
                    colorToken="--text-card-neutral-highlighted"
                  >
                    {InvoiceUtils.getItemTotalValueWithCurrency(
                      item.quantity,
                      item.unitPrice,
                      item.taxRate,
                      currency,
                    )}
                  </TSpan>
                </S.TableCell>
              </S.TableRow>
            ),
          )}
        </S.TableBody>
      </S.Table>

      <InvoiceSummaryTable lineItems={data} currency={currency} />
    </>
  );
};

export default InvoiceItemsSummaryTable;
