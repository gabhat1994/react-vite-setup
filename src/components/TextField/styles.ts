import styled, { css } from 'styled-components';
import { ellipsisText } from '@/common/globalStyles';

export type FieldValue = string | number | readonly string[] | undefined | null;
type InputSize = 'small' | 'normal';

export const LeftIcon = styled.div`
  position: absolute;
  display: inline-flex;
  left: 14px;
  top: 0;
  bottom: 0;
  align-items: center;
`;

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
        : 'var(--icon-input-neutral-default)'};
    ${(props) => (props.iconColor ? `opacity: 1 !important;` : '')};
  }
`;

const handleRight = (leftIcon: boolean, rightIcon: boolean): number => {
  if (leftIcon && rightIcon) return 90;
  if (leftIcon || rightIcon) return 64;
  return 0;
};

export const StyledTextField = styled.div<{
  value: FieldValue;
  error: boolean;
  disabled: boolean;
  inputSize?: InputSize;
  leftIcon?: boolean;
  rightIcon?: boolean;
  label?: string;
  noBorder?: boolean;
  isAlwaysFocus?: boolean;
  hideLeftIconPlace?: boolean;
  suffix?: string;
  disabledIconColor?: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 8px;
  font-family: ${({ inputSize }) =>
    inputSize === 'normal'
      ? 'var(--font-input-medium-regular-font)'
      : 'var(--font-input-small-font)'};
  width: 100%;
  background-color: ${(props) =>
    !props.disabled && props.isAlwaysFocus
      ? 'var(--bg-input-brand-primary-hover);'
      : 'var(--bg-input-neutral-default)'};

  &:hover {
    background-color: ${(props) =>
      !props.disabled ? 'var(--bg-input-brand-primary-hover);' : ''};
    label {
      color: ${(props) =>
        !props.disabled ? 'var(--text-input-brand-primary-default);' : ''};
    }
  }
  label {
    color: var(--text-input-neutral-default);
    font-size: var(--font-input-medium-size);
    font-weight: var(--font-body-medium-regular-weight);
    font-family: var(--font-input-medium-regular-font);
    left: 0;
    pointer-events: none;
    position: absolute;
    ${ellipsisText};
    top: -2px;
    right: ${(props) =>
      `${handleRight(!!props.leftIcon, !!props.rightIcon)}px`};
    transform-origin: top left;
    transform: ${(props) =>
      `translate(${props.leftIcon ? 44 : props.prefix ? 24 : 12}px, ${
        props.inputSize === 'small' ? 12 : 20
      }px)`};
    transition: all 0.2s;
    ${(props) =>
      (props.value || props.value === 0) &&
      css`
        transform: translate(12px, -9px);
        font-size: var(--font-footnote-size);
        font-weight: var(--font-footnote-regular-weight);
      `};
    ${(props) =>
      props.error &&
      css`
        color: var(--text-input-danger-primary-default) !important;
      `}
    ${(props) =>
      props.disabled &&
      css`
        color: var(--text-input-neutral-default);
      `}
  }

  input {
    font-family: var(--font-input-medium-regular-font);
    background-color: transparent;
    border: 0;
    border-radius: 8px;
    box-sizing: border-box;
    color: ${(props) =>
      props.disabled
        ? 'var(--text-input-neutral-disabled)'
        : 'var(--text-input-neutral-filled)'};
    -webkit-text-fill-color: ${(props) =>
      props.disabled
        ? 'var(--text-input-neutral-disabled);'
        : 'var(--text-input-neutral-filled);'};
    font-size: var(--font-input-medium-size);
    height: ${(props) => (props.inputSize === 'small' ? '40px' : '56px')};
    outline: none;
    display: inline-flex;
    align-items: center;
    padding: ${(props) =>
      props.inputSize === 'small' ? '4px 12px' : '16px 12px'};

    width: 100%;
    padding-left: ${(props) =>
      props.leftIcon && !props.hideLeftIconPlace && '44px'};
    ${({ rightIcon }) => rightIcon && 'padding-right: 44px;'}
    ${({ suffix }) => suffix && 'padding-right: 32px;'}
    ${ellipsisText};

    &:focus,
    &:hover {
      color: ${(props) =>
        props.disabled
          ? 'var(--text-input-neutral-disabled);'
          : 'var(--text-input-neutral-default);'};
      background-color: ${(props) =>
        !props.disabled ? 'var(--bg-input-brand-primary-hover);' : ''};
      ${(props) =>
        props.error &&
        css`
          background-color: var(--bg-input-danger-secondary-hover);
          border-radius: 8px;
        `}
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      border-radius: 8px;
      -webkit-box-shadow: 0 0 0 30px var(--bg-input-neutral-default) inset;
    }

    // placeholder style
    ::placeholder {
      color: var(--text-input-neutral-default);
      -webkit-text-fill-color: var(--text-input-neutral-default);
      opacity: 1; /* Firefox */
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: var(--text-input-neutral-default);
    }

    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: var(--text-input-neutral-default);
    }
  }

  input:focus + fieldset + label,
  input:-webkit-autofill + fieldset + label {
    top: 0;
    color: var(--text-input-brand-primary-default);
    font-size: var(--font-footnote-size);
    transform: translate(12px, -9px);
  }
  input:not(:focus) + fieldset + label {
    ${(props) =>
      (props.value || props.value === 0) &&
      css`
        top: 0;
      `}
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
        border: 2px solid var(--border-input-danger-primary-default) !important;
      `}
    ${(props) =>
      props.isAlwaysFocus &&
      !props.noBorder &&
      css`
        outline: 2px solid var(--border-input-brand-primary-default) !important;
      `}
  }

  input:focus + fieldset {
    ${(props) =>
      !props.noBorder &&
      css`
        border: 2px solid var(--border-input-brand-primary-default);
      `}
  }

  input:not(:focus) + fieldset legend {
    ${(props) =>
      !props.value && props.value !== 0
        ? css`
            padding: 0;
            width: 0;
            text-indent: -99999px;
          `
        : ''}
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

    & > span {
      font-size: var(--font-footnote-size);
      padding: 0 4px;
      visibility: hidden;
    }
  }

  ${(props) =>
    props.disabled &&
    props.disabledIconColor &&
    css`
      svg path {
        fill: var(--icon-input-neutral-default);
        opacity: 0.2;
      }
    `};

  /* only Safari - disabled input color */
  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) and (stroke-color: transparent) {
      input {
        color: ${(props) =>
          props.disabled
            ? 'var(--text-input-neutral-disabled);'
            : 'var(--text-input-neutral-filled);'};
        &:focus,
        &:hover {
          color: ${(props) =>
            props.disabled
              ? 'var(--text-input-neutral-disabled);'
              : 'var(--text-input-neutral-filled);'};
        }
      }
    }
  }
`;

export const HelperText = styled.p<{
  error: boolean;
  disabled: boolean;
  absolute?: boolean;
}>`
  font-size: var(--font-footnote-size);
  font-family: var(--font-body-medium-regular-font);
  justify-content: space-between;
  color: var(
    ${(props) =>
      props.error
        ? '--text-input-danger-primary-default'
        : '--text-input-neutral-default'}
  );
  margin: 2px 0 0 12px;
  position: ${(props) => (props.absolute ? 'absolute' : 'relative')};
  ${(props) =>
    props.disabled &&
    css`
      color: var(--text-input-neutral-default);
    `}
`;

export const LengthHelperText = styled.span<{ error: boolean }>`
  color: var(
    ${(props) =>
      props.error
        ? '--text-input-danger-primary-default'
        : '--text-input-neutral-default'}
  );
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

const prefixSuffixCommon = css`
  padding: 0;
  margin: 0;
  color: var(--text-input-neutral-default);
  align-items: center;
  display: inline-flex;
  top: 0;
  bottom: 0;
`;

export const Prefix = styled.div`
  ${prefixSuffixCommon}
  padding-left: 12px;

  + input {
    padding-left: 4px;
  }
`;

export const Suffix = styled.div`
  ${prefixSuffixCommon}
  position: absolute;
  right: 12px;
`;
