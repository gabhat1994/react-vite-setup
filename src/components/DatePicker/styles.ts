import { type ClassNames, type Styles } from 'react-day-picker';
import styles from 'react-day-picker/dist/style.module.css';
import styled, { css } from 'styled-components';
import { cssVar, rgba } from 'polished';

import Typography from '@/components/Typography';
import { type DatePickerColor, type DatePickerSize, pickDateColor } from './types';

export const classNames: ClassNames = {
  ...styles,
  day_selected: 'rdp-selected-date',
  day: 'rdp-outside-date',
  day_today: 'rdp-today',
  caption: 'rdp-caption',
  button: 'rdp-button',
  day_range_start: 'rdp-day-range-start',
  day_range_end: 'rdp-day-range-end',
  day_range_middle: 'rdp-day-range-middle',
  table: 'rdp-table',
};

export const customStyles: Styles = {
  caption: {
    color: 'var(--text-datepicker-neutral-highlighted) !important',
    height: '32px',
  },
  caption_dropdowns: {
    color: 'var(--text-datepicker-neutral-highlighted) !important',
    height: '32px',
    minWidth: '245px',
  },
  caption_label: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  head_row: {
    color: 'var(--text-datepicker-neutral-default-2)',
    fontFamily: 'var(--font-footnote-regular-font)',
    fontSize: '12px',
    fontWeight: '400',
  },
};

const customizedPicker = css`
  ._root_shmab_1 {
    --rdp-cell-size: 46px;
  }
  table button {
    height: 40px;
    padding: 0 21px;
    border-radius: 8px !important;
    border: 2px solid transparent;
  }
  .rdp-selected-date {
    font-family: var(--font-body-large-bold-font);
    font-weight: 600;
    border: none !important;
    color: var(--text-datepicker-neutral-alt-default) !important;
    width: 32px !important;
    height: 32px !important;
    padding: 0;
    margin: auto;
    background: var(--bg-datepicker-brand-primary-default);
    border-radius: 8px;

    &:hover {
      color: var(--text-datepicker-neutral-alt-default);
      background: var(--bg-datepicker-brand-primary-default);
    }
  }

  .rdp-day-range-middle {
    background-color: var(--bg-tag-brand-secondary-default);
    color: var(--text-comment-brand-primary-default) !important;

    &:hover {
      background-color: var(--bg-tag-brand-secondary-default);
      color: var(--text-comment-brand-primary-default) !important;
    }
  }

  .rdp-table {
    width: 100%;
  }

  .rdp-outside-date {
    font-weight: 400;
    border: none !important;
    color: var(--text-datepicker-neutral-highlighted);
    height: 32px !important;
    width: 100%;
    padding: 0;
    margin: auto;
  }
  .rdp-today {
    font-weight: bold;
    font-size: var(--font-body-xlarge-size);
    color: var(--text-datepicker-brand-primary-default);
    font-family: var(--font-body-large-bold-font);
  }
  .rdp-caption {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    margin: 0;
    padding: 0 0.25em;
    white-space: nowrap;
    color: currentColor;
    border: 0;
    border: 2px solid transparent;
    font-family: inherit;
    font-size: 140%;
    font-weight: bold;
    justify-content: space-between;
    display: flex;

    * {
      font-family: var(--font-body-xlarge-bold-font);
      color: var(--text-datepicker-neutral-highlighted);
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 160%;
    }
  }
  .rdp-nav-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--rdp-cell-size);
    height: var(--rdp-cell-size);
    padding: 0.25em;
    border-radius: 100%;
    &:focus {
    }
  }
  .rdp-button_reset:focus-visible {
    /* Make sure to reset outline only when :focus-visible is supported */
    outline: none;
  }

  .rdp-button {
    border: 0px solid transparent;
    font-family: var(--font-body-large-regular-font);
  }

  .rdp-button[disabled]:not(.rdp-day_selected) {
    opacity: 0.25;
  }

  .rdp-button:not([disabled]) {
    cursor: pointer;
  }

  .rdp-button:focus-visible:not([disabled]) {
    color: inherit;
  }

  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
  }
`;

export const DatePickerWrapper = styled.div<{
  color?: DatePickerColor;
  fullSize?: boolean;
  error?: boolean;
  disabled?: boolean;
  minWidth?: string;
}>`
  position: relative;
  background-color: var(--bg-input-neutral-default);
  border-radius: 8px;
  font-family: var(--font-family);
  width: ${({ fullSize }) => (fullSize ? '100%' : 'unset')};
  min-width: ${({ minWidth }) => minWidth ?? 'unset'};
  label {
    font-family: var(--font-input-medium-regular-font);
  }
  &:hover {
    background-color: ${({ disabled }) =>
      disabled
        ? 'var(--bg-input-neutral-default)'
        : 'var(--bg-input-brand-primary-hover)'};
    label {
      color: var(--text-input-neutral-default);
    }
  }

  path {
    fill: ${({ error, disabled }) =>
      error
        ? 'var(--text-input-danger-primary-default)'
        : disabled
        ? 'var(--text-input-neutral-disabled)'
        : 'var(--icon-datepicker-neutral-default)'};
  }

  ${({ color }) =>
    color
      ? `color: ${pickDateColor[color]};`
      : `var(--text-input-neutral-filled);`}
  ${customizedPicker}
`;

export const DateField = styled.span<{
  color?: DatePickerColor;
  label?: string;
  borderOnFocus?: boolean;
  value?: Date;
  isOpen?: boolean;
  error?: boolean;
  disabled?: boolean;
  wrapperBorder: string;
  fieldBorder: string;
  size?: DatePickerSize;
  hasPlaceholder?: boolean;
  displayedValue?: boolean;
}>`
  ${Typography.inputTypography.inputMedium}
  white-space: nowrap;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: ${({ displayedValue }) =>
    displayedValue ? 'space-between' : 'end'};
  padding: ${({ size }) => (size === 'small' ? `8px 16px` : ` 16px 12px;`)};
  width: 100%;
  height: ${({ size }) => (size === 'small' ? '40px' : '56px')};
  gap: 8px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ wrapperBorder }) => wrapperBorder};
  border-radius: 8px;
  box-sizing: border-box;
  position: relative;
  z-index: 49;
  background-color: ${({ error }) =>
    error ? `var(--bg-input-danger-secondary-hover)` : 'transparent'};
  font-size: var(--font-input-medium-size);
  color: ${({ error, color, disabled }) =>
    error
      ? 'var(--text-input-danger-primary-default)'
      : disabled
      ? 'var(--text-input-neutral-disabled)'
      : color
      ? pickDateColor[color]
      : 'var(--text-input-neutral-filled)'};
  outline: none;

  &:focus,
  &:hover {
    color: ${({ error, disabled }) =>
      error
        ? 'var(--text-input-danger-primary-default)'
        : disabled
        ? 'var(--text-input-neutral-disabled)'
        : 'var(--text-input-neutral-filled)'};
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    border-radius: 8px;
  }

  @media not all and (min-resolution: 0.001dpcm) {
    @supports (-webkit-appearance: none) {
      box-sizing: border-box;
      &:focus,
      &:hover {
        color: var(--bg-input-neutral-default);
      }
    }
  }

  & + fieldset {
    pointer-events: none;
    border-radius: 8px;
    border-width: 2px;
    border-style: solid;
    border-color: ${({ fieldBorder }) => fieldBorder};
    bottom: 0;
    box-sizing: border-box;
    left: -2px;
    padding-left: 4px;
    pointer-events: none;
    position: absolute;
    right: -2px;
    top: -10px;
    z-index: 49;
    ${(props) =>
      !props.isOpen &&
      css`
        ${!props.value &&
        css`
          padding: 0;
          width: 0;
          text-indent: -99999px;
        `}
      `}

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
    & + label {
      color: var(--text-input-neutral-default);
      font-size: var(--font-input-medium-size);
      left: 0;
      pointer-events: none;
      position: absolute;
      text-overflow: ellipsis;
      white-space: nowrap;
      top: 0;
      transform-origin: top left;
      transform: 12px, 18px;
      transition: all 0.2s;
      z-index: 49;
      ${(props) =>
        props.error &&
        css`
          color: var(--text-input-danger-primary-default) !important;
        `}
      ${(props) =>
        props.isOpen &&
        css`
          color: var(--text-input-neutral-default);
          font-size: var(--font-footnote-size);
          transform: translate(12px, -7px);
          padding: 0px !important;
        `}

      ${(props) =>
        props.value || props.hasPlaceholder
          ? css`
              transform: translate(12px, -7px);
              font-size: var(--font-footnote-size);
              padding: 0px !important;
            `
          : `padding: ${props.size === 'small' ? `8px 16px` : ` 16px 12px;`}`};
    }
  }
`;

export const HelperText = styled.p<{ error?: boolean; disabled?: boolean }>`
  font-size: var(--font-footnote-size);
  font-family: var(--font-family);
  color: ${({ error }) =>
    error
      ? 'var(--text-input-danger-primary-default)'
      : 'var(--text-input-neutral-default)'};
  margin: 2px 0 0 12px;
  ${({ disabled }) =>
    disabled &&
    css`
      color: var(--text-input-neutral-default);
      opacity: 0.2;
    `}
`;

export const PickerPopupWrapper = styled.div`
  inset: 0;
  z-index: 100;
  position: absolute;
  background-color: var(--bg-datepicker-neutral-alt-default);
  font-family: var(--font-family);
  border-radius: 8px;
  box-shadow: 0 4px 32px ${rgba(cssVar('--shadow-neutral-default'), 0.08)};
`;
