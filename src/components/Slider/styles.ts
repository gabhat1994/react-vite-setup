import { Stack } from '@/layout';
import styled from 'styled-components';

export const SliderWrapper = styled(Stack).attrs({
  align: 'center',
  justify: 'center',
})`
  width: 226px;
`;

export const SliderRangeInput = styled.input<{ percent: number }>`
  width: 218px;
  -webkit-appearance: none;
  background: var(--bg-progressbar-neutral-default);
  background-image: linear-gradient(
    var(--bg-progressbar-brand-primary-default),
    var(--bg-progressbar-brand-primary-default)
  );
  background-size: ${({ percent }) => `${percent}% 100%`};
  background-repeat: no-repeat;
  border-radius: 32px;
  margin: 0;

  ::-webkit-slider-runnable-track {
    height: 8px;
  }
  ::-webkit-slider-thumb {
    z-index: 4;
    appearance: none;
    cursor: pointer;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    position: relative;
    top: -6px;
    outline: 2px solid var(--color-base-primary-main);
    background: white;
    transition: background 0.3s ease-in-out;
  }
`;
