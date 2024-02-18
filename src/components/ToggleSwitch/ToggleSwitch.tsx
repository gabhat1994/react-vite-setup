import { type ChangeEvent, type ReactNode, useState } from 'react';
import { Input, Label, Switch } from './styles';

type ToggleSwitchProps = {
  onChange: (switchState: boolean) => void;
  left?: ReactNode;
  value?: boolean;
};

function ToggleSwitch({ onChange, left, value }: ToggleSwitchProps) {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onChange(e.target.checked);
  };

  return (
    <Label>
      <span>{left}</span>
      <Input
        checked={value ?? checked}
        type="checkbox"
        onChange={handleChange}
      />
      <Switch />
    </Label>
  );
}

export default ToggleSwitch;
