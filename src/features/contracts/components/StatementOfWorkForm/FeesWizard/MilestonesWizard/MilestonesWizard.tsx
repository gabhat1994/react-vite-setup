import { type FieldArrayWithId } from 'react-hook-form';
import { InlineEdit } from '@/components/FieldArrayWizard/InlineEdit';
import {
  type StatementOfWorkFormValues,
  useStatementOfWorkFormContext,
} from '@/features/contracts/hooks/statementOfWorkForm';
import { useFieldArrayWizard } from '@/hooks/fieldArrayWizard/useFieldArrayWizard';
import { useSynchronizeFieldArrayItems } from '@/hooks/fieldArrayWizard/useSynchronizeFieldArrayItems';
import { TSpan } from '@/components/Typography';
import { WizardTotalAmount } from '../../WizardTotalAmount/WizardTotalAmount';
import { EditMode } from './EditMode';

const newItemValues: FieldArrayWithId<
  StatementOfWorkFormValues,
  'fees.milestones'
> = {
  id: '',
  amount: 0,
  dueDate: new Date(),
};

export function MilestonesWizard() {
  const { watch } = useStatementOfWorkFormContext();

  const wizardApi = useFieldArrayWizard<
    StatementOfWorkFormValues,
    'fees.milestones'
  >({
    name: 'fees.milestones',
    initialMode: 'create',
  });

  // This wizard displays only items related to milestones chosen in the previous section.
  useSynchronizeFieldArrayItems({
    thisArray: wizardApi.fields,
    otherArray: watch('milestones'),
    append: () => wizardApi.addNewItem(newItemValues),
    remove: (index: number) => wizardApi.deleteItem(index),
  });

  if (wizardApi.fields.length === 0) {
    return (
      <TSpan>
        You haven&apos;t added any Milestones on the previous steps yet.
      </TSpan>
    );
  }

  return (
    <InlineEdit.Wizard<StatementOfWorkFormValues, 'fees.milestones'>
      name="fees.milestones"
      {...wizardApi}
      newItemValues={newItemValues}
      hasSeparators
      canAdd={false}
      canDelete={false}
      EditModeComponent={EditMode}
      SummaryComponent={WizardTotalAmount}
    />
  );
}
