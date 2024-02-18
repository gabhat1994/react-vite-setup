import { ButtonMenu, type ButtonMenuProps } from '../ContextMenu';
import { type DropdownValueType } from '../Dropdown';
import { Icon } from '../Icon';
import { type IconProps } from '../Icon/Icon';

export type ActionsMenuItem<ValueType> = Pick<
  DropdownValueType<ValueType>,
  'key' | 'label' | 'intent' | 'value'
> & { iconName?: IconProps['name'] };

type ActionsMenuProps<ValueType> = Pick<
  ButtonMenuProps<ValueType>,
  'onClick' | 'size'
> & { menuOptions: ActionsMenuItem<ValueType>[] };

export function ActionsMenu<ValueType extends string = string>({
  onClick,
  size,
  menuOptions,
}: ActionsMenuProps<ValueType>) {
  return (
    <ButtonMenu<ValueType>
      size={size}
      onClick={onClick}
      neutral
      menuOptions={menuOptions.map(
        ({ key, label, value, iconName, intent }) => ({
          type: 'value',
          key,
          label,
          value,
          icon: (
            <Icon
              name={iconName}
              size={24}
              color={
                intent === 'danger'
                  ? '--icon-tablecell-danger-primary-default'
                  : intent === 'brand-primary'
                  ? '--icon-tablecell-brand-primary-default'
                  : '--icon-tablecell-neutral-highlighted'
              }
            />
          ),
          intent,
        }),
      )}
      icon={<Icon name="more_m" size={24} />}
    />
  );
}
