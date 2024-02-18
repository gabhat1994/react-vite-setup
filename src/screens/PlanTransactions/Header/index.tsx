import { useNavigate } from 'react-router';
import { useCallback, useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TSpan } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import {
  Dropdown,
  type DropdownValueType,
  type DropdownTargetProps,
} from '@/components/Dropdown';
import { Button } from '@/components/Button';
import { useBreakpoints } from '@/hooks';
import { findMonthList, generateButtonLabel } from '../helper';
import {
  Wrapper,
  HeadingWrapper,
  HeaderWrapper,
  CarosoulWrapper,
  MonthButton,
  MonthListWrapper,
  SubHeaderContainer,
} from './styles';

interface HeaderProps {
  selectedMonth: string;
  drodDownData: DropdownValueType<string>[];
  handleMonthUpdate: (selectedValue: string) => void;
  selctedDropdownValue: DropdownValueType<string>;
  handleDropdoenUpdate: (selectedValue: DropdownValueType<string>) => void;
}

export const Header = ({
  selectedMonth,
  handleMonthUpdate,
  selctedDropdownValue,
  handleDropdoenUpdate,
  drodDownData,
}: HeaderProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isSmallerThanLaptop, isMobile } = useBreakpoints();

  const handleNavigation = useCallback(async () => {
    navigate(-1);
  }, [navigate]);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      container.scrollBy({
        left: scrollWidth,
        behavior: 'smooth',
      });
    }
  }, []);

  function slide(direction: string) {
    const container = containerRef.current;
    let scrollCompleted = 0;
    if (!container) {
      return;
    }
    const slideVar = setInterval(() => {
      if (direction === 'left') {
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
      <Wrapper isMobile={isMobile}>
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
              handleDropdoenUpdate(val);
            }}
            options={drodDownData}
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
                {selctedDropdownValue?.label}
              </Button>
            )}
          </Dropdown>
        </HeaderWrapper>
        <CarosoulWrapper>
          {!isSmallerThanLaptop && (
            <Button textOnly size="small">
              <Icon
                name="chevron_small_left_m"
                color="--icon-button-neutral-default"
                size={24}
                onClick={() => {
                  slide('left');
                }}
              />
            </Button>
          )}
          <MonthListWrapper ref={containerRef}>
            {findMonthList().map((item) => (
              <MonthButton
                key={item}
                secondary={selectedMonth === item}
                softDisabled={selectedMonth !== item}
                onClick={() => handleMonthUpdate(item)}
              >
                {generateButtonLabel(item)}
              </MonthButton>
            ))}
          </MonthListWrapper>
          {!isSmallerThanLaptop && (
            <Button textOnly size="small">
              <Icon
                name="chevron_small_right_m"
                color="--icon-button-neutral-default"
                size={24}
                onClick={() => {
                  slide('right');
                }}
              />
            </Button>
          )}
        </CarosoulWrapper>
      </Wrapper>
    </SubHeaderContainer>
  );
};
