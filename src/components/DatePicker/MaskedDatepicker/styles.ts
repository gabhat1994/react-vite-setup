import styled, { css } from 'styled-components';
import {
  type Dispatch,
  type ReactNode,
  type RefObject,
  type SetStateAction,
} from 'react';
import { ellipsisText } from '@/common/globalStyles';

type InputSize = 'small' | 'normal';

export const RightIcon = styled.div<{ iconColor?: string }>`
  position: absolute;
  display: inline-flex;
  right: 14px;
  top: 0;
  bottom: 0;
  align-items: center;
  svg path {
    fill: ${(props) =>
      props.iconColor
        ? `${props.iconColor} !important`
        : 'var(--color-base-gray-main)'};
    ${(props) => (props.iconColor ? `opacity: 1 !important;` : '')};
  }
`;

const handleRight = (leftIcon: boolean, rightIcon: boolean): number => {
  if (leftIcon && rightIcon) return 90;
  if (leftIcon || rightIcon) return 64;
  return 0;
};

export const StyledTextField = styled.div<{
  error: boolean;
  disabled: boolean;
  inputSize?: InputSize;
  leftIcon?: boolean;
  rightIcon?: boolean;
  label?: string;
  noBorder?: boolean;
  isAlwaysFocus?: boolean;
  ref?:
    | RefObject<HTMLSpanElement>
    | ((instance: HTMLSpanElement | null) => void)
    | null
    | Dispatch<SetStateAction<HTMLInputElement | null>>
    | undefined;
}>`
  position: relative;
  border-radius: 8px;
  font-family: var(--font-family);
  position: relative;
  width: 100%;
  background-color: ${(props) =>
    !props.disabled && props.isAlwaysFocus
      ? 'var(--color-base-primary-95);'
      : 'var(--color-base-gray-90)'};
  &:hover {
    background-color: ${(props) =>
      !props.disabled ? 'var(--color-base-primary-95);' : ''};
    label {
      color: ${(props) =>
        !props.disabled ? 'var(--color-base-primary-main);' : ''};
    }
  }
  label {
    color: var(--color-base-gray-main);
    font-size: var(--font-input-medium-size);
    font-weight: var(--font-body-medium-regular-weight);
    left: 0;
    pointer-events: none;
    position: absolute;
    ${ellipsisText};
    top: -4px;
    right: ${(props) =>
      `${handleRight(!!props.leftIcon, !!props.rightIcon)}px`};
    transform-origin: top left;
    transform: ${(props) =>
      `translate(${props.leftIcon ? 44 : 12}px, ${
        props.inputSize === 'small' ? 12 : 20
      }px)`};
    transition: all 0.2s;
    ${(props) =>
      props.error &&
      css`
        color: var(--color-base-error-main) !important;
      `}
    ${(props) =>
      props.disabled &&
      css`
        color: var(--color-base-gray-0);
        opacity: 0.2;
      `}
  }
  input {
    background-color: transparent;
    border: 0;
    box-sizing: border-box;
    color: ${(props) =>
      props.disabled
        ? 'var(--color-base-gray-70);'
        : 'var(--color-base-gray-0);'};
    -webkit-text-fill-color: ${(props) =>
      props.disabled
        ? 'var(--color-base-gray-70);'
        : 'var(--color-base-gray-0);'};
    font-size: var(--font-input-medium-size);
    height: ${(props) => (props.inputSize === 'small' ? '40px' : '56px')};
    outline: none;
    display: inline-flex;
    align-items: center;
    padding: ${(props) =>
      props.inputSize === 'small' ? '4px 12px' : '16px 12px'};
    width: 100%;
    padding-left: ${(props) => props.leftIcon && '44px'};
    ${({ rightIcon }) => rightIcon && 'padding-right: 44px;'}
    ${ellipsisText};
    &:focus,
    &:hover {
      color: ${(props) =>
        props.disabled
          ? 'var(--color-base-gray-70);'
          : 'var(--color-base-gray-0);'};
      background-color: ${(props) =>
        !props.disabled ? 'var(--color-base-primary-95);' : ''};
      ${(props) =>
        props.error &&
        css`
          background-color: var(--color-base-error-100);
          border-radius: 8px;
        `}
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      border-radius: 8px;
    }
    // placeholder style
    ::placeholder {
      color: var(--color-base-gray-main);
      opacity: 1; /* Firefox */
    }
    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: var(--color-base-gray-main);
    }
    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: var(--color-base-gray-main);
    }
  }
  input + fieldset + label {
    top: 0;
    color: var(--color-base-primary-main);
    font-size: var(--font-footnote-size);
    transform: translate(12px, -7px);
  }
  fieldset {
    border-radius: 8px;
    border: 0;
    bottom: 0;
    box-sizing: border-box;
    left: -2px;
    padding-left: 4px;
    pointer-events: none;
    position: absolute;
    right: -2px;
    top: -9px;
    ${(props) =>
      props.error &&
      !props.noBorder &&
      css`
        border: 2px solid var(--color-base-error-main) !important;
      `}
    ${(props) =>
      props.isAlwaysFocus &&
      !props.noBorder &&
      css`
        border: 2px solid var(--color-base-primary-main) !important;
      `}
  }
  input:focus + fieldset {
    ${(props) =>
      !props.noBorder &&
      css`
        border: 2px solid var(--color-base-primary-main);
      `}
  }
  legend {
    pointer-events: none;
    visibility: hidden;
    overflow: hidden;
    ${(props) =>
      !props.label &&
      css`
        width: 0;
        padding: 0;
      `}
  }
  span {
    font-size: var(--font-footnote-size);
    padding: 0 4px;
    visibility: hidden;
  }
  ${(props) =>
    props.disabled &&
    css`
      svg path {
        fill: var(--color-base-gray-0);
        opacity: 0.2;
      }
    `};
  /* only Safari - disabled input color */
  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) and (stroke-color: transparent) {
      input {
        color: ${(props) =>
          props.disabled
            ? 'var(--color-base-gray-50);'
            : 'var(--color-base-gray-0);'};
        &:focus,
        &:hover {
          color: ${(props) =>
            props.disabled
              ? 'var(--color-base-gray-50);'
              : 'var(--color-base-gray-0);'};
        }
      }
    }
  }
`;

export const Container = styled.div<{
  fullWidth: boolean;
  centerHelperText: boolean;
}>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '')};
  ${({ centerHelperText }) =>
    centerHelperText &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `}
`;

export interface ITextField {
  helperText?: string;
  error?: boolean;
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  inputSize?: InputSize;
  noBorder?: boolean;
  rightIconColor?: string;
  isAlwaysFocus?: boolean;
  hideLengthHelperText?: boolean;
  fullWidth?: boolean;
  numberOnly?: boolean;
  isCurrency?: boolean;
  centerHelperText?: boolean;
  value?: Date | undefined;
  id?: string;
  maxLength?: number;
  disabled?: boolean;
}
