import { type FC } from 'react';
import * as Styles from './styles';
import { Icon } from '../Icon';

export type CheckboxProps = {
  isChecked: boolean;
  icon?: JSX.Element;
  onChange?: (value: boolean) => void;
  captureClickEvent?: boolean;
  disableClick?: boolean;
  size?: number;
  hasError?: boolean;
};

export const Checkbox: FC<CheckboxProps> = ({
  isChecked,
  icon,
  disableClick,
  captureClickEvent = true,
  onChange = () => {},
  size = 24,
  hasError,
}) => {
  const handleClick =
    (curChecked: boolean) => (e: React.MouseEvent<HTMLSpanElement>) => {
      if (captureClickEvent) {
        e.stopPropagation();
      }

      if (disableClick) {
        e.preventDefault();
      } else {
        onChange(curChecked);
      }
    };
  return (
    <Styles.CheckboxInner
      active={isChecked}
      disabled={disableClick}
      aria-hidden="true"
      data-testid="checkbox"
      onClick={handleClick(!isChecked)}
      size={size}
      hasError={hasError}
    >
      {icon || (
        <Icon
          name="tick_m"
          size={24}
          color="--icon-checkbox-neutral-alt-default"
        />
      )}
    </Styles.CheckboxInner>
  );
};
