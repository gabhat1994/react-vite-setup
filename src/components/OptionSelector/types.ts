export type OptionSelectorSize = 'small' | 'large';

export interface OptionSelectorOption<T extends string> {
  value: T;
  label: string;
  leftElement?: React.ReactElement;
  rightElement?: React.ReactElement;
  footerElement?: React.ReactElement;
}
