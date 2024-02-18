import { type FieldArrayWithId } from 'react-hook-form';
import { isNumber } from 'lodash';
import { TSpan } from '@/components/Typography';
import EllipsisMenu from '@/screens/Chambers/EllipsisMenu';
import { Tag } from '@/components/Tag';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Stack } from '@/layout';
import { useModalManager } from '@/hooks/modal/useModalManager';
import convertToCurrency from '@/utils/currencyToCurrency';
import { type AllCurrencyEnum } from '@/apollo/generated/types';
import DeleteLineItemModal from '../DeleteLineItemModal/DeleteLineItemModal';
import { type InvoiceFormValues } from '../../hooks/useInvoiceForm';
import { InvoiceUtils } from '../../utils/invoice';
import { tableItemContextMenuOptions } from './utils';
import S from './styles';

type ModalType = 'deleteItem';

type EditModeProps = {
  index: number;
  data: FieldArrayWithId<InvoiceFormValues, 'lineItems', 'id'>;
  currency?: AllCurrencyEnum;
  onEdit(index: number): void;
  onDelete(index: number): void;
};

const PreviewMode: React.FC<EditModeProps> = ({
  data,
  onDelete,
  onEdit,
  index,
  currency,
}) => {
  const { isMobile } = useBreakpoints();
  const { openModal, closeModal, modalType } = useModalManager<ModalType>();

  const handleClickContextMenu = (value: string) => {
    switch (value) {
      case 'edit':
        onEdit(index);
        break;
      case 'delete':
        openModal('deleteItem');
        break;
      default:
        break;
    }
  };

  return (
    <>
      {isMobile ? (
        <S.TableRow>
          <S.TableCell>
            <Stack fullWidth justify="space-between" align="center">
              <TSpan
                font="body-m-bold"
                colorToken="--text-card-neutral-highlighted"
              >
                {data.description}
              </TSpan>
              <EllipsisMenu
                neutral
                onClick={(value) => handleClickContextMenu(value)}
                menuOptions={tableItemContextMenuOptions}
              />
            </Stack>

            <S.ItemDetailsRow>
              <S.ItemDetailsRowText>Quantity:</S.ItemDetailsRowText>
              <S.ItemDetailsRowText>{data.quantity}</S.ItemDetailsRowText>
            </S.ItemDetailsRow>

            <S.ItemDetailsRow>
              <S.ItemDetailsRowText>Unit Price:</S.ItemDetailsRowText>
              <S.ItemDetailsRowText>{data.unitPrice}</S.ItemDetailsRowText>
            </S.ItemDetailsRow>

            <S.ItemDetailsRow>
              <S.ItemDetailsRowText>Tax Rate:</S.ItemDetailsRowText>
              <S.ItemDetailsRowText>
                {isNumber(data.taxRate) ? data.taxRate : '-'}
              </S.ItemDetailsRowText>
            </S.ItemDetailsRow>

            <S.ItemDetailsRow>
              <S.ItemDetailsRowText>Amount:</S.ItemDetailsRowText>
              <S.ItemDetailsRowText>
                {InvoiceUtils.getItemTotalValueWithCurrency(
                  data.quantity,
                  data.unitPrice,
                  data.taxRate,
                  currency,
                )}
              </S.ItemDetailsRowText>
            </S.ItemDetailsRow>
          </S.TableCell>
        </S.TableRow>
      ) : (
        <S.TableRow>
          <S.TableCell fitContents={false}>
            <TSpan font="body-m" colorToken="--text-card-neutral-highlighted">
              {data.description} x {data.quantity}
            </TSpan>
          </S.TableCell>

          <S.TableCell fitContents={true}>
            {isNumber(data.taxRate) ? (
              <TSpan font="body-m" colorToken="--text-card-neutral-highlighted">
                <Tag tertiary size="small">
                  {data.taxRate}% tax
                </Tag>
              </TSpan>
            ) : null}
          </S.TableCell>

          <S.TableCell fitContents={true}>
            <TSpan font="body-m" colorToken="--text-card-neutral-highlighted">
              {convertToCurrency(data.unitPrice, currency, 2)}
            </TSpan>
          </S.TableCell>

          <S.TableCell fitContents={true}>
            <EllipsisMenu
              neutral
              onClick={(value) => handleClickContextMenu(value)}
              menuOptions={tableItemContextMenuOptions}
            />
          </S.TableCell>
        </S.TableRow>
      )}
      <DeleteLineItemModal
        isOpenModal={modalType === 'deleteItem'}
        onConfirm={() => onDelete(index)}
        onClose={() => closeModal()}
      />
    </>
  );
};

export default PreviewMode;
