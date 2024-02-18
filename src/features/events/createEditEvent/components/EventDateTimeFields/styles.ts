import styled from 'styled-components';
import { type ClassNames } from 'react-day-picker';
import styles from 'react-day-picker/dist/style.module.css';

import { Icon } from '@/components/Icon';
import { sizes } from '@/constants/devices';
import { Button } from '@/components/Button';

export const classNames: ClassNames = {
  ...styles,
  day_selected: 'event-selected-date',
  day: 'event-outside-date',
  day_today: 'event-today',
  caption: 'event-caption',
  button: 'event-button',
  nav_button: 'event_nav-button',
  head_cell: 'event_head-cell',
  head_row: 'event_head-row',
  day_disabled: 'event_date_disabled',
};

export const EventDateTimeFieldsWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-top: 0;
`;

export const ModalItem = styled.div`
  display: flex;
  flex: 0;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  min-height: 85px;
  box-sizing: border-box;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
`;

export const DatePickerItem = styled.div`
  @media (max-width: ${sizes.MOBILE_MAX}) {
    > div {
      margin-left: -16px;
    }
  }

  .event-button {
    border: 0;
    cursor: pointer;
  }

  .event-caption {
    display: none;
  }

  .event-caption + table {
    min-width: 380px;
  }

  .event-selected-date {
    background-color: var(--bg-datepicker-brand-primary-default);
    color: var(--text-datepicker-neutral-alt-default);
    width: 32px;
    height: 32px;
    border-radius: 8px;
  }

  .event_date_disabled {
    color: var(--text-datepicker-neutral-disabled);
    cursor: default;
  }

  .event_head-row {
    display: none;
  }
`;

export const ModalItemTitle = styled.div<{ width?: number }>`
  display: flex;
  flex: 1;
  max-width: ${({ width }) => width && `${width}px`};
`;

export const TimezonePickerWrapper = styled.div`
  flex: 1;
  min-height: 58px;

  & input {
    text-overflow: ellipsis;
  }
`;

export const PickerRightIcon = styled(Icon)<{ isOpen?: boolean }>`
  transition: transform 0.3s;
  ${({ isOpen }) => isOpen && 'transform: rotate(180deg)'};
`;

export const WeekDayButton = styled(Button)`
  width: 32px;
  min-height: 32px;
  max-height: 32px;
  padding: 0;
  margin-right: 8px;
`;

export const NumberField = styled.input`
  font-family: var(--font-input-small-font);
  width: 100%;
  border-radius: 8px;
  background-color: var(--bg-input-neutral-default);
  border: 0;
  padding: 16px 12px;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;
