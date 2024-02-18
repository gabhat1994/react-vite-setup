import styled from 'styled-components';
import { Stack } from '@/layout';
import { TSpan } from '../Typography';

const CustomStack = styled(Stack)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const InputContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 16px 0;
  width: 100%;
  position: relative;
`;

const TextContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  padding: 16px 0 0 0;
`;

const CustomInput = styled.input`
  pointer-events: none;
  position: absolute;
  height: 0px;
  width: 100%;
  z-index: 4;

  ::-webkit-slider-thumb {
    appearance: none;
    cursor: pointer;
    height: 20px;
    width: 20px;
    margin-top: 6px;
    border-radius: 50%;
    pointer-events: all;
    position: relative;
    outline: 2px solid var(--color-base-primary-main);
    box-shadow: inset 0 0 0 30px #fff;
  }
`;

const Slider = styled.div`
  position: relative;
  width: 100%;
`;

type RangeProps = {
  left: number;
  rangeWidth: number;
};

const Range = styled.div.attrs<RangeProps>((props) => ({
  style: {
    left: `${props.left}%`,
    width: `${props.rangeWidth}%`,
  },
}))<RangeProps>`
  position: absolute;
  border-radius: 4px;
  height: 10px;
  background-color: var(--color-base-primary-main);
  z-index: 2;
`;

const SliderTrack = styled.div`
  position: absolute;
  border-radius: 4px;
  height: 10px;
  background-color: var(--bg-progressbar-neutral-default);
  width: 100%;
  z-index: 1;
`;

const LabelContainer = styled.div<{ offsetLeft: number }>`
  background-color: var(--bg-tag-brand-secondary-default);
  border-radius: 8px;
  padding: 4px;
  height: 22px;
  position: absolute;
  left: ${({ offsetLeft }) => offsetLeft}px;
`;

const ValueLabel = styled(TSpan).attrs({
  font: 'footnote-bold',
  colorToken: '--text-tag-brand-primary-default',
})``;

const LabelsWrapper = styled(Stack).attrs({
  fullWidth: true,
})`
  position: relative;
  margin-top: 8px;
  min-height: 32px;
`;

export default {
  CustomStack,
  InputContainer,
  TextContainer,
  CustomInput,
  Slider,
  Range,
  SliderTrack,
  ValueLabel,
  LabelContainer,
  LabelsWrapper,
};
