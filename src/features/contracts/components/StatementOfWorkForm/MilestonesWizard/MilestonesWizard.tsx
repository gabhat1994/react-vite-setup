import { type FieldArrayWithId } from 'react-hook-form';
import { Button } from '@/components/Button';
import { CreateEditPreview } from '@/components/FieldArrayWizard/CreateEditPreview';
import { Icon } from '@/components/Icon';
import { type StatementOfWorkFormValues } from '@/features/contracts/hooks/statementOfWorkForm';
import { useFieldArrayWizard } from '@/hooks/fieldArrayWizard/useFieldArrayWizard';
import { Section } from '../../Section/Section';
import { EditMode } from './EditMode';
import { PreviewMode } from './PreviewMode';

const newItemValues: FieldArrayWithId<StatementOfWorkFormValues, 'milestones'> =
  {
    id: '',
    name: '',
    description: '',
    dueDate: new Date(),
  };

interface MilestonesWizardProps {
  disabled?: boolean;
}

export function MilestonesWizard({ disabled = false }: MilestonesWizardProps) {
  const wizardApi = useFieldArrayWizard<
    StatementOfWorkFormValues,
    'milestones'
  >({
    name: 'milestones',
    initialMode: 'preview',
  });

  if (wizardApi.fields.length === 0 && wizardApi.mode === 'preview') {
    return (
      <Section
        title="Milestones"
        optional
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
    <Section title="Milestones" hasSeparator optional>
      <CreateEditPreview.Wizard<StatementOfWorkFormValues, 'milestones'>
        name="milestones"
        {...wizardApi}
        newItemValues={newItemValues}
        PreviewModeComponent={PreviewMode}
        EditModeComponent={EditMode}
      />
    </Section>
  );
}
