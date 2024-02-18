import { type FieldArrayWithId } from 'react-hook-form';
import { type AllCurrencyEnum } from '@/apollo/generated/types';
import S from './styles';

import InvoiceItemForm from '../InvoiceItemForm/InvoiceItemForm';
import { type InvoiceFormValues } from '../../hooks/useInvoiceForm';

type Values = FieldArrayWithId<InvoiceFormValues, 'lineItems', 'id'>;
type EditModeProps = {
  index: number;
  data: Values;
  currency?: AllCurrencyEnum;
  onDelete(index: number): void;
  onCancel(): void;
  onSave(index: number, values: Values): void;
};

const EditMode: React.FC<EditModeProps> = ({
  data,
  index,
  currency,
  onSave,
  onCancel,
  onDelete,
}) => {
  const handleSave = ({ item }: { item: Values; createAnother?: boolean }) => {
    onSave(index, item);
  };

  const handleDelete = () => {
    onDelete(index);
  };

  return (
    <S.TableRow>
      <td colSpan={4}>
        <InvoiceItemForm
          mode="edit"
          values={data}
          onCancel={onCancel}
          onDelete={handleDelete}
          onSave={handleSave}
          currency={currency}
        />
      </td>
    </S.TableRow>
  );
};
export default EditMode;
