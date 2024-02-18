import {
  Dropdown,
  type DropdownTargetProps,
  type DropdownValueType,
} from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { IconButton, DropdownContainer } from './styles';

export const UnregisteredUserDropDown = ({
  options,
  onSelectOption,
}: {
  onSelectOption: (item: DropdownValueType<string>) => void;
  options: DropdownValueType<string>[];
}) => (
  <DropdownContainer>
    <Dropdown
      hideIcons={false}
      closeOnSelect
      placement="bottom-end"
      onSelectOption={(option) => onSelectOption(option)}
      options={options}
      containerStyle={{
        width: '210px',
      }}
      usePortal={false}
      isAnimation={false}
      usePopStyle={true}
    >
      {({
        targetRef,
        targetProps,
        toggle,
      }: DropdownTargetProps<HTMLDivElement>) => (
        <IconButton
          ref={targetRef}
          onClick={toggle}
          {...targetProps}
          data-testid="three_dot_button"
        >
          <Icon color="--icon-button-neutral-default" name="more_m" size={24} />
        </IconButton>
      )}
    </Dropdown>
  </DropdownContainer>
);
