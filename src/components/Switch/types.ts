import { type ChangeEventHandler } from 'react';

export interface ISwitch {
  id: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  disabled?: boolean;
  checked?: boolean;
}
