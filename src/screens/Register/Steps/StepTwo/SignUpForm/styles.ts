import styled from 'styled-components';
import { Stack } from '@/layout';

export const FormStyled = styled.div`
  width: 100%;
  min-height: 80vh;
`;

export const CheckboxStyle = styled.div<{ checked: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  height: 24px;
  width: 100%;
  input[type='checkbox'] {
    appearance: none;
    background-color: ${(p) =>
      p.checked ? 'var(--bg-checkbox-brand-primary-default)' : 'transparent'};
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 24px;
    height: 24px;
    border: 0.15em solid
      ${(p) =>
        p.checked ? 'transparent' : ' var(--border-checkbox-neutral-default)'};
    border-radius: 0.15em;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
  }
  input[type='checkbox']::before {
    content: '';
    width: 16px;
    height: 16px;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 0.5em 0.5em var(--form-control-color);
    background-color: var(--bg-checkbox-neutral-alt-default);
  }
  input[type='checkbox']:checked::before {
    transform: scale(1);
    transform-origin: bottom left;
    clip-path: polygon(
      13.762px 4.202px,
      13.798px 5.262px,
      6.798px 12.762px,
      6.263px 13px,
      5.72px 12.78px,
      2.22px 9.28px,
      2.22px 8.22px,
      3.28px 8.22px,
      6.231px 11.171px,
      12.702px 4.238px,
      13.762px 4.202px
    );
  }
`;

export const FullWidthStack = styled(Stack)`
  width: 100%;
`;

export const Form = styled.form`
  width: 100%;
`;
