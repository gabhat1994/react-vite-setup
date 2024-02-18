import styled, { css } from 'styled-components';
import { devices } from '@/constants/devices';
import { defaultScrollBar, noScrollBar } from '@/common/globalStyles';
import { TSpan } from '../Typography';

type FieldValue = string | number | readonly string[] | undefined;

export const StyledTextArea = styled.div<{
  value: FieldValue;
  error: boolean;
  disabled: boolean;
  label?: string;
  resize?: boolean;
  autoResize?: boolean;
  noBorder?: boolean;
  showScroll?: boolean;
  maxHeight?: number;
  lineHeight?: string;
  hasRightIcon?: boolean;
}>`
  position: relative;
  background-color: var(--bg-input-neutral-default);
  border-radius: 8px;
  font-family: var(--font-input-medium-regular-font);
  width: 100%;
  height: auto;
  padding-right: ${({ hasRightIcon }) => (hasRightIcon ? '40px' : '0px')};
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  ${({ autoResize, maxHeight }) =>
    maxHeight
      ? `max-height: ${maxHeight}px`
      : autoResize &&
        css`
          @media ${devices.MOBILE_S} {
            max-height: 164px;
          }
          @media ${devices.TABLET} {
            max-height: 98px;
          }
        `};
  ${defaultScrollBar}
  &:hover, 
  &:focus-within {
    background-color: ${(props) =>
      !props.disabled && 'var(--bg-input-brand-primary-hover);'};
    label {
      color: ${(props) =>
        !props.disabled && 'var(--text-input-brand-primary-default);'};
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      max-width: calc(100% - 30px);
    }
    fieldset {
      legend {
        max-height: 20px;
      }
    }
  }

  label {
    color: var(--text-input-neutral-default);
    font-size: var(--font-input-medium-size);
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    transform-origin: top left;
    transform: 12px, 18px;
    transition: all 0.2s;
    z-index: 50;

    ${(props) =>
      props.value
        ? css`
            transform: translate(12px, -7px);
            font-size: var(--font-footnote-size);
          `
        : `padding: 16px 12px;`};
    ${(props) =>
      props.disabled &&
      css`
        color: var(--text-input-neutral-disabled);
        opacity: 0.2;
      `}
    ${(props) =>
      props.error &&
      css`
        color: var(--text-input-danger-primary-default) !important;
        opacity: 1;
      `}
  }

  textarea {
    margin: ${(props) => (props.label ? '16px 12px' : 0)};
    transition: all 0.2s ease;
    position: relative;
    z-index: 50;
    pointer-events: all;
    background-color: transparent;
    border: 0;
    box-sizing: border-box;
    font-family: var(--font-input-medium-regular-font);
    font-size: var(--font-input-medium-size);
    resize: ${(props) => (props.resize ? 'vertical' : 'none')};
    ${(props) => props.disabled && 'opacity: 0.15;'};
    color: ${(props) =>
      props.disabled
        ? 'var(--text-input-neutral-disabled)'
        : 'var(--text-input-neutral-filled)'};
    outline: none;
    display: inline-flex;
    align-items: center;
    padding: ${(props) => (props.label ? '0 6px 0 0' : '16px 12px')};
    width: 100%;
    ${({ lineHeight }) => lineHeight && `line-height: ${lineHeight}`};
    ${(props) => (props.showScroll ? `${defaultScrollBar}` : `${noScrollBar}`)}

    ${({ autoResize, maxHeight, label }) =>
      maxHeight
        ? `max-height: ${label ? maxHeight - 32 : maxHeight}px`
        : autoResize &&
          css`
            @media ${devices.MOBILE_S} {
              max-height: 132px;
            }
            @media ${devices.TABLET} {
              max-height: 66px;
            }
          `};
    &:focus,
    &:hover {
      color: var(--text-input-neutral-filled);
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
    }
    &::placeholder {
      color: var(--text-input-neutral-default);
    }
    @media not all and (min-resolution: 0.001dpcm) {
      @supports (-webkit-appearance: none) {
        box-sizing: border-box;
        ${(props) => props.disabled && 'opacity: 0.25;'};

        &:focus,
        &:hover {
          color: var(--text-input-neutral-default);
          ${(props) =>
            props.disabled &&
            css`
              color: var(--text-input-neutral-disabled);
              background-color: transparent;
              opacity: 0.25;
            `}
        }
      }
    }
  }

  textarea:focus + fieldset + label {
    color: var(--text-input-brand-primary-default);
    font-size: var(--font-footnote-size);
    transform: translate(12px, -7px);
    padding: 0px;
  }

  fieldset {
    pointer-events: none;
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
    z-index: 50;
    ${(props) =>
      props.error &&
      css`
        border: 2px solid var(--border-input-danger-primary-default) !important;
      `};
  }

  textarea:focus + fieldset {
    border: ${({ noBorder }) =>
      !noBorder && '2px solid var(--border-input-brand-primary-default)'};
    z-index: 50;
  }

  textarea:not(:focus) + fieldset legend {
    ${(props) =>
      !props.value &&
      css`
        padding: 0;
        width: 0;
        text-indent: -99999px;
      `}
  }

  textarea::-webkit-input-placeholder {
    font-size: var(--font-input-medium-size);
    font-family: var(--font-input-medium-regular-font);
    font-weight: var(--font-input-medium-weight);
    line-height: var(--font-input-medium-lineheight);
  }

  textarea:-moz-placeholder {
    /* Firefox 18- */
    font-size: var(--font-input-medium-size);
    font-family: var(--font-input-medium-regular-font);
    font-weight: var(--font-input-medium-weight);
    line-height: var(--font-input-medium-lineheight);
  }

  textarea::-moz-placeholder {
    /* Firefox 19+ */
    font-size: var(--font-input-medium-size);
    font-family: var(--font-input-medium-regular-font);
    font-weight: var(--font-input-medium-weight);
    line-height: var(--font-input-medium-lineheight);
  }

  textarea:-ms-input-placeholder {
    font-size: var(--font-input-medium-size);
    font-family: var(--font-input-medium-regular-font);
    font-weight: var(--font-input-medium-weight);
    line-height: var(--font-input-medium-lineheight);
  }

  textarea::placeholder {
    font-size: var(--font-input-medium-size);
    font-family: var(--font-input-medium-regular-font);
    font-weight: var(--font-input-medium-weight);
    line-height: var(--font-input-medium-lineheight);
  }

  legend {
    pointer-events: none;
    visibility: hidden;
    overflow: visible;
    ${(props) =>
      !props.label &&
      css`
        width: 0;
        padding: 0;
      `}
  }

  legend span {
    font-size: var(--font-footnote-size);
    padding: 0 4px;
    visibility: hidden;
  }

  path {
    fill: var(--icon-input-neutral-default);
  }

  ${(props) =>
    props.disabled &&
    css`
      svg path {
        fill: var(--icon-input-neutral-disabled);
        opacity: 0.2;
      }
    `}
`;

export const TextAreaContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const HelperText = styled(TSpan)<{
  error: boolean;
  disabled: boolean;
  position?: string;
}>`
  justify-content: space-between;
  ${(props) =>
    props.disabled &&
    css`
      color: var(--text-input-neutral-disabled);
      opacity: 0.2;
    `}

  ${(props) =>
    props.error
      ? 'color: var(--text-input-danger-primary-default) ; opacity: 1;'
      : 'color: var(--text-input-neutral-default);'}
  align-self: ${(props) => (props.position ? props.position : 'start')};
`;

export const LengthHelperText = styled(TSpan).attrs({
  font: 'footnote',
  colorToken: '--text-input-neutral-default',
})<{ error: boolean }>`
  color: var(
    ${(props) => props.error && '--text-input-danger-primary-default'}
  );
`;

export const RightIcon = styled.div<{ iconColor?: string }>`
  position: absolute;
  right: 14px;
  top: 16px;
  align-items: center;
  z-index: 100;
`;
