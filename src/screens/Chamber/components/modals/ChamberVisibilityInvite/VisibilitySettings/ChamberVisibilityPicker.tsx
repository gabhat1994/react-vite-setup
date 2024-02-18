import { ProjectChamberType } from '@/apollo/generated/types';
import { Dropdown } from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { TextField } from '@/components/TextField';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { visibilityOptions } from '../data';
import * as S from '../styles';
import { type VisibilityDropdownProps } from '../types';

const mapOptionIcon = (option: ProjectChamberType) => {
  switch (option) {
    case ProjectChamberType.Public:
      return <Icon name="public_XL" size={40} />;
    case ProjectChamberType.Private:
      return <Icon name="lock_xl" size={40} />;
    case ProjectChamberType.Secret:
      return <Icon name="private_XL" size={40} />;
    default:
      return null;
  }
};

interface ChamberVisibilityPickerProps {
  value: ProjectChamberType | undefined;
  onChange(option: VisibilityDropdownProps): void;
}

export function ChamberVisibilityPicker({
  value,
  onChange,
}: ChamberVisibilityPickerProps) {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const selectableOptions: VisibilityDropdownProps[] = useMemo(
    () =>
      visibilityOptions.map((o) => ({
        ...o,
        icon: mapOptionIcon(o.value),
        selected: o.value === value,
      })),
    [value],
  );

  const selectedOption = selectableOptions.find(
    (option) => option.value === value,
  );

  return (
    <S.DropdownContainer>
      <S.DropdownWrapper fullWidth>
        <Dropdown
          hideIcons={false}
          closeOnSelect
          placement="bottom-end"
          options={selectableOptions}
          onSelectOption={onChange}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          usePortal={false}
          calRefTop={false}
          isAnimation={false}
          usePopStyle
          iconColumnWidth={40}
        >
          {({ inputProps, inputRef, toggle }) => (
            <TextField
              readOnly
              ref={inputRef}
              {...inputProps}
              value={
                typeof selectedOption?.label === 'string'
                  ? selectedOption.label
                  : ''
              }
              label={t('noumena.chamber_edit.visibility.visibility_setting')}
              helperText={
                value &&
                t(
                  `noumena.chamber_edit.visibility.${value.toLowerCase()}_description`,
                )
              }
              spellCheck="false"
              rightIcon={
                isOpen ? (
                  <Icon
                    color="--icon-input-neutral-default"
                    name="chevron_up_m"
                    size={16}
                    onClick={toggle}
                  />
                ) : (
                  <Icon
                    color="--icon-input-neutral-default"
                    name="chevron_down_m"
                    size={16}
                    onClick={toggle}
                  />
                )
              }
            />
          )}
        </Dropdown>
      </S.DropdownWrapper>
    </S.DropdownContainer>
  );
}
