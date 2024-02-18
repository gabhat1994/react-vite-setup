import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { DocumentTypeFilterField } from '@/features/contracts/components/DocumentTypeFilterField/DocumentTypeFilterField';
import { Stack } from '@/layout';
import { type InputListTypes } from '@/components/Tabs/types';
import {
  type Filters,
  NoumDocumentStatus,
  type FilterType,
} from '../../../types';
import { TypeContainer } from './styles';

export const InputFilters = ({ filterType, isOwner, isEmpty }: FilterType) => {
  const { t } = useTranslation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { control, setValue } = useFormContext<Filters>();
  const [isWrap, setIsWrap] = useState(false);

  useLayoutEffect(() => {
    setTimeout(() => {
      setIsWrap(
        wrapperRef.current ? wrapperRef.current.clientWidth < 650 : false,
      );
    }, 200);
  }, []);

  useEffect(() => {
    if (filterType) setValue('type', filterType);
  }, [filterType, setValue]);

  const inputList = useMemo(() => {
    const list = [
      {
        id: NoumDocumentStatus.All,
        name: 'all',
        text: t('noumena.noum.contract_manager.tabs.all'),
        labelSize: 'auto' as InputListTypes['labelSize'],
      },
      {
        id: NoumDocumentStatus.Sent,
        name: 'sent',
        text: t('noumena.noum.contract_manager.tabs.sent'),
        labelSize: 'auto' as InputListTypes['labelSize'],
      },
      {
        id: NoumDocumentStatus.Signed,
        name: 'signed',
        text: t('noumena.noum.contract_manager.tabs.signed'),
        labelSize: 'auto' as InputListTypes['labelSize'],
      },
    ];
    if (isOwner) {
      const ownerTab = {
        id: NoumDocumentStatus.Drafts,
        name: 'drafts',
        text: t('noumena.noum.contract_manager.tabs.drafts'),
        labelSize: 'auto' as InputListTypes['labelSize'],
      };
      list.splice(2, 0, ownerTab);
    }
    return list;
  }, [isOwner, t]);

  return (
    <Stack
      ref={wrapperRef}
      align="center"
      justify="space-between"
      wrap={isWrap ? 'reverse' : 'unset'}
      gap="12px"
      fullWidth
    >
      {!isEmpty && (
        <Controller<Filters>
          name="status"
          control={control}
          render={({ field: { value, onChange } }) => (
            <BasicChipsTabsForm
              tabWidth="46px"
              onChange={(tab) => onChange(tab as Filters['status'])}
              inputList={inputList}
              selectedId={value}
              mode="isUnderline"
              isWithoutImage
              isMobile={false}
              fontSize="--font-button-small-size"
            />
          )}
        />
      )}
      <TypeContainer iswrapped={isWrap || !!isEmpty}>
        <Controller
          name="type"
          render={({ field: { value, onChange } }) => (
            <DocumentTypeFilterField value={value} onChange={onChange} />
          )}
        />
      </TypeContainer>
    </Stack>
  );
};
