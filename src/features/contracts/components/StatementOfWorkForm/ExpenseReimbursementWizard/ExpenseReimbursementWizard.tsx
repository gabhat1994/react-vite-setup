import { type FieldArrayWithId } from 'react-hook-form';
import { Button } from '@/components/Button';
import { InlineEdit } from '@/components/FieldArrayWizard/InlineEdit';
import { Icon } from '@/components/Icon';
import { type StatementOfWorkFormValues } from '@/features/contracts/hooks/statementOfWorkForm';
import { useFieldArrayWizard } from '@/hooks/fieldArrayWizard/useFieldArrayWizard';
import { Section } from '../../Section/Section';
import { WizardTotalAmount } from '../WizardTotalAmount/WizardTotalAmount';
import { EditMode } from './EditMode';

const newItemValues: FieldArrayWithId<
  StatementOfWorkFormValues,
  'expenseReimbursement'
> = {
  id: '',
  name: '',
  amount: 0,
};

interface ExpenseReimbursementWizardProps {
  disabled?: boolean;
}

export function ExpenseReimbursementWizard({
  disabled = false,
}: ExpenseReimbursementWizardProps) {
  const wizardApi = useFieldArrayWizard<
    StatementOfWorkFormValues,
    'expenseReimbursement'
  >({
    name: 'expenseReimbursement',
    initialMode: 'create',
  });

  if (wizardApi.fields.length === 0) {
    return (
      <Section
        variant="sub-section"
        title="Expense Reimbursement"
        optional
        titleSideAddon={
          <Button
            textOnly
            size="small"
            leftIcon={<Icon name="add_m" size={24} />}
            onClick={() => wizardApi.addNewItem(newItemValues)}
            disabled={disabled}
          >
            Add Item
          </Button>
        }
      />
    );
  }

  return (
    <Section
      variant="sub-section"
      title="Expense Reimbursement"
      optional
      hasSeparator
    >
      <InlineEdit.Wizard<StatementOfWorkFormValues, 'expenseReimbursement'>
        name="expenseReimbursement"
        {...wizardApi}
        newItemValues={newItemValues}
        hasSeparators
        EditModeComponent={EditMode}
        SummaryComponent={WizardTotalAmount}
      />
    </Section>
  );
}
