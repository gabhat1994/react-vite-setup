import { type PostVisibility } from '@/apollo/generated/types';
import { Checkbox } from '@/components/Checkbox';
import {
  type DropdownItemType,
  type DropdownValueType,
} from '@/components/Dropdown';
import {
  DropdownItemLayout,
  DropDownLabel,
  DropdownValueWrapper,
  DropdownValueLabel,
} from '@/components/Dropdown/styles';
import { Icon } from '@/components/Icon';
import { Infinite } from '@/components/Infinite';
import { CheckWrap } from './styles';

type VisibilityOptionsRendererProps = {
  options: DropdownItemType<PostVisibility>[];
  activeItem: PostVisibility[];
  handleSelectOption: (value: DropdownValueType<PostVisibility>) => void;
};

const VisibilityOptionsRenderer = ({
  options,
  handleSelectOption,
  activeItem,
}: VisibilityOptionsRendererProps) => (
  <Infinite
    data-testid="author-users-list"
    maxHeight="200px"
    paddingRight={options && options.length > 2 ? '8px' : '0'}
  >
    {options.map((option) =>
      option.type === 'value' ? (
        <DropdownItemLayout
          isBottomBorder
          key={option.key}
          active={activeItem.includes(option.value)}
          tabIndex={0}
          onClick={() => handleSelectOption(option)}
        >
          <CheckWrap>
            <Checkbox
              onChange={() => handleSelectOption(option)}
              icon={
                <Icon
                  name="tick_m"
                  size={activeItem.includes(option.value) ? 24 : 0}
                  color="--icon-checkbox-neutral-alt-default"
                />
              }
              isChecked={activeItem.includes(option.value)}
            />
          </CheckWrap>

          <DropDownLabel selected={activeItem.includes(option.value)}>
            <DropdownValueWrapper>
              <DropdownValueLabel>{option.label}</DropdownValueLabel>
            </DropdownValueWrapper>
          </DropDownLabel>
        </DropdownItemLayout>
      ) : null,
    )}
  </Infinite>
);

export default VisibilityOptionsRenderer;
