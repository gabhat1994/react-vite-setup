import {
  Dropdown,
  type DropdownTargetProps,
  type DropdownItemType,
  type DropdownValueType,
} from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { DropdownWrapper, IconButton } from './styles';

export const HeaderDropDownMenu = ({
  options,
  onSelectOption,
}: {
  onSelectOption: (item: DropdownValueType<string>) => void;
  options: DropdownItemType<string>[];
}) => (
  <DropdownWrapper data-testid="dropdown_wrapper">
    <Dropdown
      hideIcons={false}
      closeOnSelect
      placement="bottom-end"
      onSelectOption={(option) => onSelectOption(option)}
      options={options}
      containerWidth="280px"
      usePortal={false}
      calRefTop={false}
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
  </DropdownWrapper>
);
