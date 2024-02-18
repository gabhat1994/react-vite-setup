import { useMemo, useState } from 'react';
import { useFormContext, type FieldArrayWithId } from 'react-hook-form';

import { useGetUserInvoiceLineItemListQuery } from '@/apollo/graphql';
import { Button } from '@/components/Button';
import {
  type DropdownItemType,
  type DropdownValueType,
} from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { SelectField } from '@/components/SelectField';
import { TSpan } from '@/components/Typography';
import { cleanList } from '@/utils/list';
import { type InvoiceFormValues } from '../../hooks/useInvoiceForm';
import InvoiceItemForm from '../InvoiceItemForm/InvoiceItemForm';
import { SavedItemsModalWizard } from '../SavedItemsModalWizard/SavedItemsModalWizard';
import { ADD_ONE_TIME_ITEM, CREATE_SERVICE_OR_PRODUCT } from './constants';
import S from './styles';

type CreateModeProps = {
  onAdd(
    values: FieldArrayWithId<InvoiceFormValues, 'lineItems', 'id'>,
    shouldSaveNewItem?: boolean,
  ): Promise<void>;
  onShowNewItemForm(): void;
  onCancel(): void;
};

const CreateMode: React.FC<CreateModeProps> = ({
  onAdd,
  onCancel,
  onShowNewItemForm,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>();
  const {
    watch,
    formState: { errors },
  } = useFormContext<InvoiceFormValues>();
  const [showSavedItemsModal, setShowSavedItemsModal] = useState(false);
  const [currency] = watch(['currency']);

  const { data, loading } = useGetUserInvoiceLineItemListQuery({
    variables: {
      filter: {
        limit: 10,
        offset: 0,
        search: '',
      },
    },
  });

  const list = cleanList(data?.getUserInvoiceLineItemList?.data);

  const lineItemsOptions = useMemo<DropdownItemType<string>[]>(
    () =>
      list.map((item) => ({
        key: item.id,
        label: item.description,
        type: 'value',
        value: item.id,
      })),
    [list],
  );

  const stickyHeaderOptions = useMemo<DropdownValueType<string>[]>(
    () => [
      {
        type: 'value',
        value: ADD_ONE_TIME_ITEM,
        key: ADD_ONE_TIME_ITEM,
        label: 'Add One-Time Item',
        icon: <Icon name="add_m" size={24} />,
      },
      {
        type: 'value',
        value: CREATE_SERVICE_OR_PRODUCT,
        key: CREATE_SERVICE_OR_PRODUCT,
        label: 'Create New Product or Service',
        icon: <Icon name="add_m" size={24} />,
      },
    ],
    [],
  );

  const options: DropdownItemType<string>[] = lineItemsOptions.length
    ? [
        {
          type: 'header',
          label: 'Your Products & Services',
          childLabels: ['Add One-Time Item', 'Create New Product or Service'],
          rightIcon: (
            <Button
              size="small"
              neutral
              textOnly
              onClick={() => setShowSavedItemsModal(true)}
              leftIcon={<Icon name="edit_m" size={16} />}
            >
              <TSpan font="footnote-bold">Edit</TSpan>
            </Button>
          ),
        },
        ...lineItemsOptions,
      ]
    : [];

  return (
    <>
      {selectedOption !== ADD_ONE_TIME_ITEM &&
        selectedOption !== CREATE_SERVICE_OR_PRODUCT && (
          <S.SelectFieldWrapper fullSize>
            <SelectField
              key={String(showSavedItemsModal)}
              inputSize="small"
              label="Find or add an item..."
              value={selectedOption}
              stickyHeaderOptions={stickyHeaderOptions}
              error={!!errors.lineItems}
              calRefTop={false}
              forceListFromBottom
              helperText="You have to add at least one item"
              leftIcon={
                <Icon
                  name="search_m"
                  color="--icon-input-neutral-default"
                  size={20}
                />
              }
              isLoading={loading}
              onChange={(option) => {
                if (
                  option.value === ADD_ONE_TIME_ITEM ||
                  option.value === CREATE_SERVICE_OR_PRODUCT
                ) {
                  setSelectedOption(option.value);
                  return;
                }

                const foundItem = list.find((item) => item.id === option.value);

                if (foundItem) {
                  onAdd({
                    id: foundItem.id,
                    description: foundItem.description,
                    quantity: foundItem.quantity,
                    taxRate: foundItem.taxRate ?? undefined,
                    unitPrice: foundItem.unitPrice,
                    currency: foundItem.currency,
                    taxName: foundItem.taxLabel ?? undefined,
                  });
                  setSelectedOption(option.value);
                }
              }}
              usePortal
              options={options}
            />
          </S.SelectFieldWrapper>
        )}

      {(selectedOption === ADD_ONE_TIME_ITEM ||
        selectedOption === CREATE_SERVICE_OR_PRODUCT) && (
        <InvoiceItemForm
          onCancel={() => {
            onCancel();
            setSelectedOption(undefined);
          }}
          values={{
            id: 'NEW',
            quantity: 0,
            description: '',
            taxRate: undefined,
            unitPrice: 0,
            currency,
            taxName: '',
          }}
          mode="create"
          currency={currency}
          onSave={async ({ item, createAnother }) => {
            await onAdd(item, selectedOption === CREATE_SERVICE_OR_PRODUCT);
            onCancel();

            if (createAnother) {
              onShowNewItemForm();
            }
          }}
        />
      )}
      <SavedItemsModalWizard
        items={list}
        isOpenModal={showSavedItemsModal}
        onClose={() => setShowSavedItemsModal(false)}
      />
    </>
  );
};
export default CreateMode;
