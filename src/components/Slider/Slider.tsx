import { type FC, useCallback, useMemo, useState } from 'react';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { SliderRangeInput, SliderWrapper } from './styles';

type SliderProps = {
  min?: number;
  max?: number;
  initialValue?: number;
  changedValue?: number;
  onChange?: (value: number) => void;
  onChangeEnd?: () => void;
};

const Slider: FC<SliderProps> = ({
  min = 0,
  max = 100,
  initialValue = 30,
  onChange,
  changedValue,
  onChangeEnd,
}) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      setValue(newValue);
      onChange?.(newValue);
    },
    [onChange],
  );

  const percent = useMemo(
    () => (((changedValue || value) - min) * 100) / (max - min),
    [changedValue, max, min, value],
  );

  return (
    <SliderWrapper>
      <SliderRangeInput
        type="range"
        min={min}
        max={max}
        onChange={handleChange}
        value={changedValue || value}
        percent={percent}
        onMouseUp={onChangeEnd}
      />
      <Stack fullWidth justify="end">
        <TSpan font="footnote">{changedValue || value}%</TSpan>
      </Stack>
    </SliderWrapper>
  );
};

export default Slider;
