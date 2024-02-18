import { type FieldArrayWithId } from 'react-hook-form';
import { InlineEdit } from '@/components/FieldArrayWizard/InlineEdit';
import { type StatementOfWorkFormValues } from '@/features/contracts/hooks/statementOfWorkForm';
import { useFieldArrayWizard } from '@/hooks/fieldArrayWizard/useFieldArrayWizard';
import { WizardTotalAmount } from '../../WizardTotalAmount/WizardTotalAmount';
import { EditMode } from './EditMode';

const newItemValues: FieldArrayWithId<
  StatementOfWorkFormValues,
  'fees.instalments'
> = {
  id: '',
  amount: 0,
  dueDate: new Date(),
};

export function InstalmentsWizard() {
  const wizardApi = useFieldArrayWizard<
    StatementOfWorkFormValues,
    'fees.instalments'
  >({
    name: 'fees.instalments',
    initialMode: 'create',
  });

  return (
    <InlineEdit.Wizard<StatementOfWorkFormValues, 'fees.instalments'>
      name="fees.instalments"
      {...wizardApi}
      newItemValues={newItemValues}
      hasSeparators
      EditModeComponent={EditMode}
      SummaryComponent={WizardTotalAmount}
    />
  );
}
