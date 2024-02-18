import { useFormContext } from 'react-hook-form';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import S from './styles';
import InvoiceSummaryTable from '../InvoiceTableSummary/InvoiceTableSummary';
import EditMode from './EditMode';
import PreviewMode from './PreviewMode';
import { useInvoiceItemsWizard } from '../../hooks/useInvoiceItemsWizard';

import CreateMode from './CreateMode';
import { type InvoiceFormValues } from '../../hooks/useInvoiceForm';

type InvoiceItemsActionTableProps = {};

const InvoiceItemsWizard: React.FC<InvoiceItemsActionTableProps> = () => {
  const { watch } = useFormContext<InvoiceFormValues>();
  const {
    fields,
    addNewItem,
    cancelItemEditing,
    deleteItem,
    editItem,
    editedIndex,
    hideNewItemForm,
    mode,
    saveItem,
    showNewItemForm,
  } = useInvoiceItemsWizard();
  const { isMobile } = useBreakpoints();

  const [currency, lineItems, defaultTaxRate, defaultTaxName] = watch([
    'currency',
    'lineItems',
    'defaultTaxRate',
    'defaultTaxName',
  ]);

  return (
    <>
      <S.Table>
        <S.TableBody>
          {fields.map((field, index) =>
            mode === 'edit' && editedIndex === index ? (
              <EditMode
                key={field.id}
                index={index}
                data={field}
                onCancel={cancelItemEditing}
                onDelete={deleteItem}
                onSave={saveItem}
                currency={currency}
              />
            ) : (
              <PreviewMode
                key={field.id}
                index={index}
                data={field}
                onEdit={editItem}
                onDelete={deleteItem}
                currency={currency}
              />
            ),
          )}
        </S.TableBody>
      </S.Table>

      {(mode === 'create' || !fields.length) && (
        <CreateMode
          onAdd={addNewItem}
          onCancel={hideNewItemForm}
          onShowNewItemForm={showNewItemForm}
        />
      )}

      {!!fields.length && (
        <>
          <Stack
            padding="12px 0 0 0"
            align="start"
            justify="space-between"
            fullWidth
            vertical={isMobile}
            gap={isMobile ? 16 : 0}
          >
            <Stack fullWidth>
              <Button
                size="small"
                neutral
                onClick={() => showNewItemForm()}
                disabled={mode === 'create'}
                leftIcon={
                  <Icon
                    name="add_m"
                    size={24}
                    color="--text-button-brand-primary-default"
                  />
                }
              >
                <TSpan
                  font="button-m"
                  colorToken="--text-button-brand-primary-default"
                >
                  Add New Item
                </TSpan>
              </Button>
            </Stack>

            <InvoiceSummaryTable
              lineItems={lineItems}
              defaultTaxRate={defaultTaxRate}
              defaultTaxName={defaultTaxName}
              currency={currency}
            />
          </Stack>
        </>
      )}
    </>
  );
};

export default InvoiceItemsWizard;
