import { SwitchButton, SwitchLabel, SwitchWrapper } from './styles';
import { type ISwitch } from './types';

export const Switch: React.FC<ISwitch> = (props) => (
  <SwitchWrapper>
    <SwitchButton type="checkbox" {...props} />
    <SwitchLabel htmlFor={props.id} disabled={props.disabled} />
  </SwitchWrapper>
);
