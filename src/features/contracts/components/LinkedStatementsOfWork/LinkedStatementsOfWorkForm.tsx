import { orderBy } from 'lodash';
import { useMemo } from 'react';
import { FormProvider } from 'react-hook-form';
import { Icon } from '@/components/Icon';
import { type DropdownValueType } from '@/components/Dropdown';
import { type StatementOfWorkBasic } from '../../types';
import { DocumentStatusTag } from '../DocumentStatusTag/DocumentStatusTag';
import { LinkedStatementsOfWorkWizard } from './LinkedStatementsOfWorkWizard/LinkedStatementsOfWorkWizard';
import { useContractFormContext } from '../../hooks/contractForm';
import { StatementOfWorkUtils } from '../../utils/statementOfWork';
import { type LinkedStatementOfWorkItem } from './types';

function mapStatementOfWorkToOption(
  statementOfWork: StatementOfWorkBasic,
): DropdownValueType<LinkedStatementOfWorkItem, string> {
  return {
    type: 'value',
    key: statementOfWork._id,
    label: statementOfWork.title,
    value: {
      ...statementOfWork,
      canEdit: StatementOfWorkUtils.isDraft(statementOfWork),
    },
    icon: <Icon name="file_m" size={24} />,
    rightIcon: (
      <DocumentStatusTag status={statementOfWork.status} size="small" />
    ),
  };
}

interface LinkedStatementsOfWorkFormProps {
  linkedSows: StatementOfWorkBasic[];
  unlinkedSows: StatementOfWorkBasic[];
}

export function LinkedStatementsOfWorkForm({
  linkedSows,
  unlinkedSows,
}: LinkedStatementsOfWorkFormProps) {
  const form = useContractFormContext();

  const options = useMemo(
    () =>
      orderBy(
        [...linkedSows, ...unlinkedSows].map(mapStatementOfWorkToOption),
        'label',
        'asc',
      ),
    [linkedSows, unlinkedSows],
  );

  const formValues = form.watch('linkedStatementsOfWork');

  const hasAvailableUnlinkedSows = options.length - formValues.length > 0;
  const hasEmptyInputs =
    formValues.filter((value) => value.statementOfWorkId === '').length > 0;

  return (
    <FormProvider {...form}>
      <LinkedStatementsOfWorkWizard
        options={options}
        canAdd={hasAvailableUnlinkedSows && !hasEmptyInputs}
      />
    </FormProvider>
  );
}
