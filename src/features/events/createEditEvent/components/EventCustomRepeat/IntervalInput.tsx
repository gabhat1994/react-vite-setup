import {
  ModalItem,
  ModalItemTitle,
  NumberField,
} from '../EventDateTimeFields/styles';
import type { IntervalInputProps } from './types';

export const IntervalInput = ({
  value,
  heading,
  onChange,
}: IntervalInputProps) => (
  <ModalItem>
    <ModalItemTitle>{heading}</ModalItemTitle>
    <ModalItemTitle width={47}>
      <NumberField
        name="title"
        value={value}
        type="number"
        min={1}
        required
        onChange={(e) => onChange(parseInt(e.target.value || '', 10))}
        style={{ textAlign: 'center' }}
      />
    </ModalItemTitle>
  </ModalItem>
);
