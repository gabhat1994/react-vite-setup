import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Stack } from '@/layout';
import { t } from 'i18next';
import { type DropdownValueType } from '@/components/Dropdown';

type MultiSelectListModalProps<
  Key extends string,
  Data extends unknown = Key,
> = {
  isOpen: boolean;
  label: string;
  options: DropdownValueType<Data, Key>[];
  onClose: () => void;
  handleChange: (item: DropdownValueType<Data, Key>) => void;
  onSubmit: () => void;
};

export function MultiSelectListModal<
  Key extends string = string,
  Data extends unknown = Key,
>({
  isOpen,
  options,
  label,
  onClose,
  handleChange,
  onSubmit,
}: MultiSelectListModalProps<Key, Data>) {
  const closeHandler = () => {
    onSubmit();
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      isFullScreen
      testId="chamber-filter"
      onClose={onClose}
      disableBackdropClick
      forceHideCloseButton
    >
      <ModalHeader isFullScreen justifyContent="flex-start">
        {label}
      </ModalHeader>
      <ModalBody maxHeight="unset">
        {options.map((item) => (
          <Stack
            key={item.key}
            gap={16}
            onClick={() => handleChange(item)}
            padding="20px 0"
            borderBottom
            fullWidth
            justify="space-between"
          >
            <TSpan
              font="body-l"
              colorToken="--text-tablecell-header-neutral-highlighted"
            >
              {item.label}
            </TSpan>
            {item.rightIcon}
          </Stack>
        ))}
      </ModalBody>
      <ModalFooter justifyContent="center">
        <Button
          testId="chamber-filter-apply-button"
          onClick={closeHandler}
          primary
          size="full"
        >
          {t(`noumena.multiselect_list_filter_save`)}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
