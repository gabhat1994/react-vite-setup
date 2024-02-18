import { type FC, useState } from 'react';
import S from './styles';
import { TextField } from '../TextField';
import AmountRangeField, {
  type AmountRangeFieldProps,
} from '../AmountRangeField/AmountRangeField';
import Popover from '../Popover/Popover';
import { TSpan } from '../Typography';
import { type ITextField } from '../TextField/types';

export type AmountRangePopoverProps = Omit<ITextField, 'value' | 'onChange'> &
  AmountRangeFieldProps & {
    renderValue: string;
  };

const AmountRangePopover: FC<AmountRangePopoverProps> = ({
  min,
  max,
  value,
  onChange,
  minValueSuffix = '',
  maxValueSuffix = '',
  renderValue,
  ...textFieldProps
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <S.Container fullWidth>
      <Popover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position="bottom"
        renderContent={({ childDimensions }) => (
          <S.PopoverContent $width={childDimensions.width}>
            <TSpan
              font="body-m-bold"
              colorToken="--text-datepicker-neutral-highlighted"
            >
              Select Amount Range
            </TSpan>
            <AmountRangeField
              min={min}
              max={max}
              value={value}
              minValueSuffix={minValueSuffix}
              maxValueSuffix={maxValueSuffix}
              onChange={onChange}
            />
          </S.PopoverContent>
        )}
      >
        <TextField
          value={renderValue}
          max={max}
          integerOnly
          onFocus={() => setIsOpen(true)}
          inputSize="small"
          contentEditable={false}
          {...textFieldProps}
        />
      </Popover>
    </S.Container>
  );
};

export default AmountRangePopover;
