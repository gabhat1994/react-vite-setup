import { type FieldArrayWithId } from 'react-hook-form';
import { Button } from '@/components/Button';
import { CreateEditPreview } from '@/components/FieldArrayWizard/CreateEditPreview';
import { Icon } from '@/components/Icon';
import { type StatementOfWorkFormValues } from '@/features/contracts/hooks/statementOfWorkForm';
import { useFieldArrayWizard } from '@/hooks/fieldArrayWizard/useFieldArrayWizard';
import { Section } from '../../Section/Section';
import { EditMode } from './EditMode';
import { PreviewMode } from './PreviewMode';

const newItemValues: Partial<
  FieldArrayWithId<StatementOfWorkFormValues, 'deliverables'>
> = {
  id: '',
  name: '',
  description: '',
  dueDate: undefined,
};

interface DeliverablesWizardProps {
  disabled?: boolean;
}

export function DeliverablesWizard({
  disabled = false,
}: DeliverablesWizardProps) {
  const wizardApi = useFieldArrayWizard<
    StatementOfWorkFormValues,
    'deliverables'
  >({
    name: 'deliverables',
    initialMode: 'preview',
  });

  if (wizardApi.fields.length === 0 && wizardApi.mode === 'preview') {
    return (
      <Section
        title="Deliverables"
        titleSideAddon={
          <Button
            textOnly
            size="small"
            leftIcon={<Icon name="add_m" size={24} />}
            onClick={() => wizardApi.showNewItemForm()}
            disabled={disabled}
          >
            Add Item
          </Button>
        }
      />
    );
  }

  return (
    <Section title="Deliverables" hasSeparator>
      <CreateEditPreview.Wizard<StatementOfWorkFormValues, 'deliverables'>
        name="deliverables"
        {...wizardApi}
        newItemValues={newItemValues}
        PreviewModeComponent={PreviewMode}
        EditModeComponent={EditMode}
      />
    </Section>
  );
}
