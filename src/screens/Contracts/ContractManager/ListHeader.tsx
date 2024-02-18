import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Button } from '@/components/Button';
import { DataGrid } from '@/components/DataGrid';
import { Icon } from '@/components/Icon';
import { MultiselectField } from '@/components/MultiselectField';
import TabsForm from '@/components/Tabs/TabsForm';
import { TextField } from '@/components/TextField';
import { TSpan } from '@/components/Typography';
import { DocumentTypeFilterField } from '@/features/contracts/components/DocumentTypeFilterField/DocumentTypeFilterField';
import { Stack, StackItem } from '@/layout';
import { usePrevious } from '@/hooks/previous';
import { useContractManagerFiltersData } from './Filters/useContractManagerFiltersData';
import { type Filters, ListPOV } from './types';

interface ListHeaderProps {
  onCreateContract: () => void;
  onCreateStatementOfWork: () => void;
}

export function ListHeader({
  onCreateContract,
  onCreateStatementOfWork,
}: ListHeaderProps) {
  const { t } = useTranslation();

  const { watch, setValue } = useFormContext<Filters>();

  const [type, listPerspective] = watch(['type', 'perspective']);
  const prevListPerspective = usePrevious(listPerspective);

  const { statuses, consignors, noums } = useContractManagerFiltersData({
    listPerspective,
    documentType: type,
  });

  useEffect(() => {
    if (listPerspective !== prevListPerspective) {
      setValue('consignorIds', undefined);
      setValue('noumIds', undefined);
    }
  }, [listPerspective, prevListPerspective, setValue]);

  return (
    <>
      <Stack gap={24} vertical align="stretch">
        <Stack gap={24} justify="space-between" align="center">
          <StackItem grow>
            <TSpan font="heading-xs-bold">
              {t('noumena.contract_manager.contract_manager')}
            </TSpan>
          </StackItem>
          <Stack gap={8} justify="flex-end" align="center">
            <Button
              secondary
              size="small"
              leftIcon={<Icon name="add_m" size={24} />}
              onClick={onCreateStatementOfWork}
            >
              {t('noumena.contract_manager.cta.new_statement_of_work')}
            </Button>
            <Button
              primary
              size="small"
              leftIcon={<Icon name="add_m" size={24} />}
              onClick={onCreateContract}
            >
              {t('noumena.contract_manager.cta.new_contract')}
            </Button>
          </Stack>
        </Stack>
        <Stack gap={8} justify="stretch" align="center">
          <StackItem grow>
            <DataGrid.FilterInput<Filters, 'type'>
              name="type"
              render={({ field: { value, onChange } }) => (
                <DocumentTypeFilterField value={value} onChange={onChange} />
              )}
            />
          </StackItem>
          <StackItem basis="150px">
            <DataGrid.FilterInput<Filters, 'statuses'>
              name="statuses"
              render={({ field: { value, onChange } }) => (
                <MultiselectField
                  inputSize="small"
                  label={t('noumena.contract_manager.filters.status.label')}
                  options={statuses.options}
                  isLoading={statuses.loading}
                  value={value ?? statuses.allValues}
                  onChange={onChange}
                  maxContainerHeight="500px"
                />
              )}
            />
          </StackItem>
          <StackItem grow>
            <DataGrid.FilterInput<Filters, 'consignorIds'>
              name="consignorIds"
              render={({ field: { value, onChange } }) => (
                <MultiselectField
                  inputSize="small"
                  hideIcons={false}
                  label={t('noumena.contract_manager.filters.consignor.label')}
                  allOptionLabel="All Consignors"
                  options={consignors.options}
                  isLoading={consignors.loading}
                  value={value ?? consignors.allValues}
                  onChange={onChange}
                  maxContainerHeight="500px"
                />
              )}
            />
          </StackItem>
          <StackItem grow>
            <DataGrid.FilterInput<Filters, 'noumIds'>
              name="noumIds"
              render={({ field: { value, onChange } }) => (
                <MultiselectField
                  inputSize="small"
                  hideIcons={false}
                  label={t('noumena.contract_manager.filters.noum.label')}
                  allOptionLabel={
                    listPerspective === ListPOV.Owner
                      ? 'All Owned Noums'
                      : 'All Noums'
                  }
                  options={noums.options}
                  isLoading={noums.loading}
                  value={value ?? noums.allValues}
                  onChange={onChange}
                  maxContainerHeight="500px"
                />
              )}
            />
          </StackItem>
          <StackItem grow>
            <DataGrid.FilterInput<Filters, 'search'>
              name="search"
              render={({ field: { value, onChange } }) => (
                <TextField
                  inputSize="small"
                  value={value}
                  onChange={onChange}
                  placeholder={t('noumena.contract_manager.search.placeholder')}
                  leftIcon={
                    <Icon
                      name="search_m"
                      size={24}
                      color="--icon-input-neutral-default"
                    />
                  }
                  rightIcon={
                    <Icon
                      name="clear_m"
                      size={24}
                      color={
                        value
                          ? '--icon-input-brand-primary-default'
                          : '--color-base-transparent'
                      }
                      onClick={() => onChange('')}
                    />
                  }
                />
              )}
            />
          </StackItem>
        </Stack>
      </Stack>
      <StackItem>
        <DataGrid.FilterInput<Filters, 'perspective'>
          name="perspective"
          render={({ field: { value, onChange } }) => (
            <TabsForm
              selectedId={value}
              mode="isUnderline"
              isWithoutImage
              fontSize="--font-body-medium-bold-size"
              onChange={(newTab) => onChange(newTab as ListPOV)}
              inputList={[
                {
                  id: ListPOV.Owner,
                  name: 'mine',
                  text: 'Created by me',
                  labelSize: 'small',
                },
                {
                  id: ListPOV.CounterParty,
                  name: 'received',
                  text: 'Received',
                  labelSize: 'small',
                },
              ]}
            />
          )}
        />
      </StackItem>
    </>
  );
}
