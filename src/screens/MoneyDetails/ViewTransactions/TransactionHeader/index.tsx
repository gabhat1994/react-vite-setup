import { useNavigate } from 'react-router';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TSpan } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import {
  Dropdown,
  type DropdownTargetProps,
  type DropdownValueType,
} from '@/components/Dropdown';
import { Button } from '@/components/Button';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { findMonthList } from '../helper';
import {
  Wrapper,
  HeadingWrapper,
  HeaderWrapper,
  CarosoulWrapper,
  MonthButton,
  MonthListWrapper,
} from './styles';
import { SubHeaderContainer } from '../../styles';

interface TransactionHeaderProps {
  accounts: DropdownValueType<string>[];
  selectedMonth: string;
  selctedDropdownValue: DropdownValueType<string>;
  handleDropdoenUpdate: Function;
  handleMonthUpdate: Function;
}

export const TransactionHeader = (props: TransactionHeaderProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const device = useDeviceType();

  const handleNavigation = useCallback(async () => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    const container: HTMLElement | null =
      document.getElementById('monthslist') || null;
    if (container) {
      const scrollWidth = container.scrollWidth - container.clientWidth;
      container.scrollLeft = scrollWidth;
    }
  }, []);

  function slide(direction: string) {
    const container: HTMLElement | null =
      document.getElementById('monthslist') || null;
    let scrollCompleted = 0;
    const slideVar = setInterval(() => {
      if (direction === 'left' && container !== undefined) {
        container!.scrollLeft -= 90;
      } else {
        container!.scrollLeft += 90;
      }
      scrollCompleted += 70;
      if (scrollCompleted >= 200) {
        window.clearInterval(slideVar);
      }
    }, 50);
  }

  return (
    <SubHeaderContainer>
      <Wrapper isMobile={device === DeviceTypeEnum.MOBILE}>
        <HeaderWrapper>
          <HeadingWrapper>
            <Icon
              name="arrow_left_m"
              size={24}
              color="--icon-button-neutral-default"
              onClick={() => handleNavigation()}
            />
            <TSpan
              font="heading-xs-bold"
              colorToken="--text-appbar-neutral-default"
              style={{ paddingLeft: '10px' }}
            >
              {t('noumena.money.view_transaction')}
            </TSpan>
          </HeadingWrapper>
          <Dropdown
            hideIcons
            containerWidth="280px"
            onSelectOption={(val) => {
              props.handleDropdoenUpdate(val);
            }}
            options={props.accounts}
            placement="bottom-end"
          >
            {({
              targetRef,
              toggle,
            }: DropdownTargetProps<HTMLButtonElement>) => (
              <Button
                ref={targetRef}
                size="small"
                rightIcon={
                  <Icon
                    name="chevron_down_m"
                    size={16}
                    color="--icon-input-neutral-default"
                  />
                }
                softDisabled
                onClick={toggle}
              >
                {props.selctedDropdownValue?.label}
              </Button>
            )}
          </Dropdown>
        </HeaderWrapper>
        <CarosoulWrapper>
          <Button
            style={{
              background: 'var(--bg-button-neutral-alt-default)',
              minHeight: '35px',
              display:
                device === DeviceTypeEnum.MOBILE ||
                device === DeviceTypeEnum.TABLET
                  ? 'none'
                  : '',
            }}
          >
            <Icon
              name="chevron_small_left_m"
              color="--icon-button-neutral-default"
              size={24}
              onClick={() => {
                slide('left');
              }}
            />
          </Button>
          <MonthListWrapper id="monthslist">
            {findMonthList().map((item) => (
              <MonthButton
                id={item}
                isSelected={props.selectedMonth === item}
                onClick={() => props.handleMonthUpdate(item)}
              >
                {item.split(' ')[1] === String(new Date().getUTCFullYear())
                  ? item.split(' ')[0]
                  : item}
              </MonthButton>
            ))}
          </MonthListWrapper>
          <Button
            onClick={() => {
              slide('right');
            }}
            style={{
              background: 'var(--bg-button-neutral-alt-default)',
              minHeight: '35px',
              display:
                device === DeviceTypeEnum.MOBILE ||
                device === DeviceTypeEnum.TABLET
                  ? 'none'
                  : '',
            }}
          >
            <Icon
              name="chevron_small_right_m"
              size={24}
              color="--icon-button-neutral-default"
            />
          </Button>
        </CarosoulWrapper>
      </Wrapper>
    </SubHeaderContainer>
  );
};
