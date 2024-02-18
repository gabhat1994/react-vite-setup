import { Button } from '@/components/Button';
import { type ButtonProps } from '../Button/types';
import { ContextMenu, type ContextMenuProps } from './ContextMenu';

export type ButtonMenuProps<ValueType = string> = Omit<
  ContextMenuProps<ValueType, HTMLButtonElement>,
  'children'
> &
  Pick<
    ButtonProps,
    | 'textOnly'
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'size'
    | 'icon'
    | 'disabled'
  > & {
    loading?: boolean;
  };

export const ButtonMenu = <ValueType extends string>({
  textOnly,
  size = 'small',
  primary,
  secondary,
  tertiary,
  neutral,
  disabled,
  icon,
  ...contextMenuProps
}: ButtonMenuProps<ValueType>) => (
  <ContextMenu<ValueType, HTMLButtonElement> {...contextMenuProps}>
    {({ targetRef, toggle }) => (
      <Button
        ref={targetRef}
        size={size}
        primary={primary}
        secondary={secondary}
        tertiary={tertiary}
        neutral={neutral}
        textOnly={textOnly}
        icon={icon}
        disabled={disabled}
        onClick={(event) => {
          event.stopPropagation();
          toggle();
        }}
      />
    )}
  </ContextMenu>
);
