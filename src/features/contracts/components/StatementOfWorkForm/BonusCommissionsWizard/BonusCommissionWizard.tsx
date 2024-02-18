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
  'bonusCommission'
> = {
  id: '',
  name: '',
  amount: 0,
};

interface BonusCommissionWizardProps {
  disabled?: boolean;
}

export function BonusCommissionWizard({
  disabled = false,
}: BonusCommissionWizardProps) {
  const wizardApi = useFieldArrayWizard<
    StatementOfWorkFormValues,
    'bonusCommission'
  >({
    name: 'bonusCommission',
    initialMode: 'create',
  });

  if (wizardApi.fields.length === 0) {
    return (
      <Section
        variant="sub-section"
        title="Bonus / Commission"
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
      title="Bonus / Commission"
      optional
      hasSeparator
    >
      <InlineEdit.Wizard<StatementOfWorkFormValues, 'bonusCommission'>
        name="bonusCommission"
        {...wizardApi}
        newItemValues={newItemValues}
        hasSeparators
        EditModeComponent={EditMode}
        SummaryComponent={WizardTotalAmount}
      />
    </Section>
  );
}
