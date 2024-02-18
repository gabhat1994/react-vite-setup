import { type UserOutput } from '@/apollo/generated/types';
import { Avatar } from '@/components/Avatar/Avatar';
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
import { UserUtil } from '@/utils/user';
import { AvatarWrapper } from './styles';

type AuthorOptionsRendererProps = {
  options: DropdownItemType<string | UserOutput>[];
  activeItem?: DropdownValueType<string | UserOutput>;
  activeItemKeys?: string[];
  handleSelectOption: (value: DropdownValueType<string | UserOutput>) => void;
};

const AuthorOptionsRenderer = ({
  options,
  handleSelectOption,
  activeItem,
  activeItemKeys,
}: AuthorOptionsRendererProps) => {
  const isActive = (option: DropdownValueType<UserOutput | string>) =>
    activeItem?.key === option.key || !!activeItemKeys?.includes(option.key);

  return (
    <Infinite
      data-testid="author-users-list"
      maxHeight="200px"
      paddingRight="0"
    >
      {options.map((option) =>
        option.type === 'value' ? (
          <DropdownItemLayout
            isBottomBorder
            key={option.key}
            active={isActive(option)}
            tabIndex={0}
            onClick={() => handleSelectOption(option)}
          >
            <DropDownLabel selected={isActive(option)}>
              <AvatarWrapper>
                {typeof option.value !== 'string' && (
                  <Avatar
                    url={UserUtil.getProfilePicture(option.value)}
                    size="M"
                  />
                )}
              </AvatarWrapper>
              <DropdownValueWrapper>
                <DropdownValueLabel>{option.label}</DropdownValueLabel>
              </DropdownValueWrapper>
            </DropDownLabel>

            <Checkbox
              onChange={() => handleSelectOption(option)}
              icon={
                <Icon
                  name="tick_m"
                  size={isActive(option) ? 24 : 0}
                  color="--icon-checkbox-neutral-alt-default"
                />
              }
              isChecked={isActive(option)}
            />
          </DropdownItemLayout>
        ) : null,
      )}
    </Infinite>
  );
};

export default AuthorOptionsRenderer;
