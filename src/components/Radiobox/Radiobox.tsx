import { type FC } from 'react';
import * as Styles from './styles';

export type RadioboxProps = {
  isChecked: boolean;
  text?: string;
  icon?: JSX.Element;
  onChange?: (value: boolean) => void;
  disableClick?: boolean;
};

export const Radiobox: FC<RadioboxProps> = ({
  isChecked,
  icon,
  text = '',
  disableClick,
  onChange = () => {},
}) => {
  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (disableClick) e.preventDefault();
    else onChange(!isChecked);
  };
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label>
      <Styles.RadioboxOuter
        autoFocus={false}
        type="radio"
        data-testid="radio_box_outer"
        onChange={() => onChange(!isChecked)}
      />
      <Styles.RadioboxInner
        active={isChecked}
        aria-hidden="true"
        onClick={handleClick}
        data-testid="radio_box"
      >
        {icon || (
          <Styles.RadioTick
            colorToken={
              isChecked
                ? '--icon-radiobutton-brand-primary-default'
                : '--icon-checkbox-neutral-alt-default'
            }
          />
        )}
      </Styles.RadioboxInner>
      {text}
    </label>
  );
};
