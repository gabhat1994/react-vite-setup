import { type FieldArrayWithId } from 'react-hook-form';
import { type DropdownValueType } from '@/components/Dropdown';
import { InlineEdit } from '@/components/FieldArrayWizard/InlineEdit';
import { useFieldArrayWizard } from '@/hooks/fieldArrayWizard/useFieldArrayWizard';
import { type ContractFormValues } from '@/features/contracts/hooks/contractForm';
import { EditMode } from './EditMode';
import { type LinkedStatementOfWorkItem } from '../types';

const newItemValues: FieldArrayWithId<
  ContractFormValues,
  'linkedStatementsOfWork'
> = {
  id: '',
  statementOfWorkId: '',
};

interface LinkedStatementsOfWorkWizardProps {
  options: DropdownValueType<LinkedStatementOfWorkItem, string>[];
  canAdd: boolean;
}

export function LinkedStatementsOfWorkWizard({
  options,
  canAdd,
}: LinkedStatementsOfWorkWizardProps) {
  const wizardApi = useFieldArrayWizard<
    ContractFormValues,
    'linkedStatementsOfWork'
  >({
    name: 'linkedStatementsOfWork',
    initialMode: 'preview',
  });

  return (
    <InlineEdit.Wizard<ContractFormValues, 'linkedStatementsOfWork'>
      name="linkedStatementsOfWork"
      canAdd={canAdd}
      {...wizardApi}
      newItemValues={newItemValues}
      EditModeComponent={(editModeProps) => (
        <EditMode {...editModeProps} options={options} />
      )}
    />
  );
}
