import type { Frequency } from "@/apollo/generated/types";

export interface CustomEventPickerProps<Value, Change> {
  value: Value;
  onChange: (value: Change) => void;
}

export interface IntervalInputProps
  extends CustomEventPickerProps<number, number> {
  heading: string;
}

export type EventCustomRepeatPickerProps = {
  onClose: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  frequency: Frequency | string;
  isNoumEditor?: boolean;
};
