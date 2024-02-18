import { useCallback, useState, type FC } from 'react';
import { t } from 'i18next';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { useAddSectionsHelper } from '@/features/noums/hooks/spaceQuery';
import {
  type CreateNoumLayoutSectionInput,
  type NoumLayoutSectionType,
} from '@/apollo/generated/types';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import { EmptySections } from './Tabs/EmptySections';
import { SectionTemplates } from './Tabs/SectionTemplates';
import { SectionLayoutPickerWrapper, TabContent } from './styles';
import { listOfTabs } from './constants';
import { type SectionsLayoutPickerProps } from './types';

export const SectionLayoutPicker: FC<SectionsLayoutPickerProps> = ({
  position,
  setIsPopover,
  setIsLoading,
}) => {
  const { space } = useEditChamberState();
  const [selectedId, setSelectedId] = useState('0');
  const { addSectionsHelper } = useAddSectionsHelper();

  const handleSelectSectionType = useCallback(
    async (sectionType: NoumLayoutSectionType) => {
      if (!space?._id) return;

      setIsLoading?.(true);
      const newSectionInput: CreateNoumLayoutSectionInput = {
        noumId: space?._id,
        position,
        type: sectionType,
      };
      await addSectionsHelper(newSectionInput, space?._id);
      setIsPopover(false);
      setIsLoading?.(false);
    },
    [addSectionsHelper, space?._id, position, setIsLoading, setIsPopover],
  );

  const handleChange = useCallback(
    (id: string) => {
      if (id && id !== selectedId) {
        setSelectedId(id);
      }
    },
    [selectedId],
  );

  const tabComponent = () =>
    selectedId === '0' ? (
      <>
        <EmptySections handleSelectSectionType={handleSelectSectionType} />
      </>
    ) : (
      <SectionTemplates />
    );

  const sectionTemplate = false;

  return (
    <SectionLayoutPickerWrapper>
      <Stack fullWidth justify="center" fixedHeight={29}>
        <TSpan font="body-xl-bold">
          {t('noumena.noum_editor.popup.pick_section_layout.title')}
        </TSpan>
      </Stack>
      {sectionTemplate && (
        <Stack fullWidth>
          <BasicChipsTabsForm
            onChange={handleChange}
            inputList={listOfTabs}
            selectedId={selectedId}
            mode="isUnderline"
            fullWidth
            isWithoutImage
            fontSize="--font-input-small-size"
          />
        </Stack>
      )}
      <TabContent fullWidth>{tabComponent()}</TabContent>
    </SectionLayoutPickerWrapper>
  );
};

export default SectionLayoutPicker;
