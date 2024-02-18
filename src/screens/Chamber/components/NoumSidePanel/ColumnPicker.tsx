import { t } from 'i18next';
import { Fragment, useState } from 'react';
import { Dropdown, type DropdownTargetProps } from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { Separator } from '@/components/Separator/Separator';
import { TSpan } from '@/components/Typography/Typography';
import { Stack } from '@/layout/Stack';
import {
  NoumLayoutSectionType,
  NoumLayoutStatus,
} from '@/apollo/generated/types';
import { useUpdateNoumSectionHelper } from '@/features/noums/hooks/spaceQuery';
import ColumnOptions from './ColumnOptions';
import { DropdownPicker } from './styles';
import { useEditChamberState } from '../../EditChamber/provider';

const ColumnPicker: React.FC = () => {
  const {
    section,
    space,
    setSectionStatus: setsectionStatus,
    setSectionSideBarOptions,
    sectionSideBarOptions,
    useHeightRef,
    setHeight,
    height,
    setLayoutLoading,
  } = useEditChamberState();
  const { updateNoumSectionHelper } = useUpdateNoumSectionHelper();
  const [isFocused, setIsFocused] = useState(false);

  const onChange = async (value: NoumLayoutSectionType) => {
    setHeight?.(height || useHeightRef?.current?.offsetHeight!);
    setSectionSideBarOptions({
      selectedLayout: { id: section?._id!, layoutType: value },
    });
    setLayoutLoading?.(true);
    setTimeout(async () => {
      const isSuccess = await updateNoumSectionHelper(space?._id!, {
        sectionId: section?._id,
        type: value,
      });
      setsectionStatus?.(NoumLayoutStatus.Unsaved);
      if (!isSuccess) {
        setSectionSideBarOptions({
          selectedLayout: { id: section?._id!, layoutType: section?.type! },
        });
        setsectionStatus?.(undefined);
      }
      setHeight?.(undefined);
      setIsFocused(false);
      setLayoutLoading?.(false);
    }, 500);
  };

  const options = Object.values(NoumLayoutSectionType);

  return (
    <Stack vertical padding="0 12px" fullWidth gap={8}>
      <TSpan
        font="footnote-bold"
        colorToken="--text-card-neutral-highlighted"
        overflow="ellipsis"
      >
        {t('noumena.noum_editor.edit_Section.section_layout')}
      </TSpan>
      <Stack fullWidth>
        <Dropdown
          hideIcons
          options={[]}
          isShowEmptyText={false}
          containerWidth="218px"
          isAnimation={false}
          containerStyle={{ overflow: 'auto' }}
          optionsRenderer={() =>
            options.map((type, index) => (
              <Fragment key={type}>
                <ColumnOptions
                  key={type}
                  onChange={onChange}
                  option={type as NoumLayoutSectionType}
                  isSelected={
                    type ===
                      sectionSideBarOptions?.selectedLayout?.layoutType ??
                    type === section?.type
                  }
                />
                {options.length - 1 !== index && <Separator fullWidth />}
              </Fragment>
            ))
          }
          isOpen={isFocused}
        >
          {({
            targetProps,
            targetRef,
          }: DropdownTargetProps<HTMLDivElement>) => (
            <DropdownPicker
              style={{ width: '100%' }}
              ref={targetRef}
              {...targetProps}
              onClick={() => setIsFocused(!isFocused)}
            >
              <ColumnOptions
                option={
                  section?.type ||
                  sectionSideBarOptions?.selectedLayout?.layoutType ||
                  NoumLayoutSectionType.SingleColumn
                }
              />
              <Icon
                name="chevron_down_m"
                size={16}
                color="--icon-button-neutral-default"
              />
            </DropdownPicker>
          )}
        </Dropdown>
      </Stack>
    </Stack>
  );
};

export default ColumnPicker;
