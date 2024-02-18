import { type ChangeEvent, type FC } from 'react';
import S from './styles';
import { TextField } from '../TextField';

type AmountRangeValue = {
  min: number;
  max: number;
};

export type AmountRangeFieldProps = {
  min: number;
  max: number;
  value: AmountRangeValue;
  minValueSuffix?: string;
  maxValueSuffix?: string;
  onChange: (value: AmountRangeValue) => void;
};

const AmountRangeField: FC<AmountRangeFieldProps> = ({
  min,
  max,
  value,
  minValueSuffix = '',
  maxValueSuffix = '',
  onChange,
}) => {
  const getPercent = (val: number) => ((val - min) / (max - min)) * 100;

  const onMinChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = Math.min(+event.target.value, value.max - 1);
    newValue = Math.max(newValue, min);
    onChange({ min: newValue, max: value.max });
  };

  const onMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = Math.max(+event.target.value, value.min + 1);
    newValue = Math.min(newValue, max);
    onChange({ min: value.min, max: newValue });
  };

  return (
    <S.CustomStack fullWidth data-testid="amount-range-field">
      <S.TextContainer>
        <TextField
          value={value.min}
          max={max}
          integerOnly
          label="From"
          isCurrency
          inputSize="small"
          suffix={minValueSuffix}
          onChange={onMinChange}
        />
        <TextField
          value={value.max}
          integerOnly
          inputSize="small"
          isCurrency
          label="To"
          suffix={maxValueSuffix}
          min={min}
          onChange={onMaxChange}
        />
      </S.TextContainer>

      <S.InputContainer>
        <S.CustomInput
          type="range"
          min={min}
          max={max}
          value={value.min}
          onChange={onMinChange}
        />
        <S.CustomInput
          type="range"
          min={min}
          max={max}
          value={value.max}
          onChange={onMaxChange}
        />

        <S.Slider>
          <S.SliderTrack />
          <S.Range
            left={getPercent(value.min)}
            rangeWidth={getPercent(value.max) - getPercent(value.min) + 1}
          />
        </S.Slider>
      </S.InputContainer>
    </S.CustomStack>
  );
};

export default AmountRangeField;
