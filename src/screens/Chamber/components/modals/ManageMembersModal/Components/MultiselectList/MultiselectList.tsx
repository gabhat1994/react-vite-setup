import { useCallback, useMemo } from 'react';
import { intersection } from 'lodash';
import { MultiselectUtil } from '@/utils/multiselect';
import { cleanList } from '@/utils/list';
import { Stack } from '@/layout';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { TickCheckbox } from '@/components/Checkbox';
import {
  type DropdownProps,
  type DropdownValueType,
  isValueType,
} from '@/components/Dropdown';
import { TSpan } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import { MultiSelectListModal } from './MultiSelectListModal';

type MultiselectValue<Key extends string> = Key[];
type ModalType = 'multiselect-list';

type MultiselectListProps<
  Key extends string,
  Data extends unknown = Key,
> = Omit<
  DropdownProps<Data, HTMLInputElement, string, Key>,
  'children' | 'options'
> & {
  label: string;
  options: DropdownValueType<Data, Key>[];
  value: MultiselectValue<Key>;
  onChange: (selectedOptions: MultiselectValue<Key>) => void;
  onSubmit: () => void;
};

export function MultiselectList<
  Key extends string = string,
  Data extends unknown = Key,
>({
  options,
  value,
  label,
  onChange,
  onSubmit,
}: MultiselectListProps<Key, Data>) {
  const { modalType, openModal, closeModal } = useModalManager<ModalType>();
  const valueOptions = useMemo(() => options.filter(isValueType), [options]);

  const selectedValues = useMemo(() => {
    const allValueOptionKeys = valueOptions.map((option) => option.key);

    return intersection(allValueOptionKeys, value);
  }, [value, valueOptions]);

  const selectedOptions = useMemo(
    () => valueOptions.filter((option) => selectedValues.includes(option.key)),
    [selectedValues, valueOptions],
  );

  const calculatedOptions = useMemo<DropdownValueType<Data, Key>[]>(
    () =>
      cleanList([
        ...options.map((option) => ({
          ...option,
          rightIcon: (
            <TickCheckbox
              isChecked={selectedOptions.includes(option)}
              captureClickEvent={false}
            />
          ),
        })),
      ]),
    [options, selectedOptions],
  );

  const handleChange = (item: DropdownValueType<Data, Key>) => {
    const newValue = MultiselectUtil.toggleOne(selectedValues, item.key);

    onChange(newValue);
  };

  const labelHandler = useCallback(
    (
      selectedStatuses: Key[],
      defaultValues: DropdownValueType<Data, Key>[],
    ) => {
      if (selectedStatuses.length === defaultValues.length) {
        return 'All';
      }
      if (selectedStatuses.length === 0) {
        return label;
      }
      return selectedStatuses
        .map((key) => defaultValues.find((item) => item.key === key)?.label)
        .join(',');
    },
    [label],
  );

  return (
    <>
      <Stack
        justify="space-between"
        fullWidth
        borderBottom
        padding="13px 0px"
        align="center"
        onClick={() => openModal('multiselect-list')}
      >
        <Stack vertical gap={4}>
          <TSpan
            font="body-m-bold"
            colorToken="--text-tablecell-header-neutral-highlighted"
          >
            {label}
          </TSpan>
          <TSpan colorToken="--text-tablecell-body-neutral-default">
            {labelHandler(selectedValues, options)}
          </TSpan>
        </Stack>
        <Icon name="chevron_right_m" size={12} />
      </Stack>

      <MultiSelectListModal
        isOpen={modalType === 'multiselect-list'}
        onClose={closeModal}
        label={label}
        options={calculatedOptions}
        handleChange={handleChange}
        onSubmit={onSubmit}
      />
    </>
  );
}
