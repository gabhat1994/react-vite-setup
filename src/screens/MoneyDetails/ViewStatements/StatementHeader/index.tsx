import { useNavigate } from 'react-router';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { TSpan } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import { DatePicker } from '@/components/DatePicker';
import {
  Dropdown,
  type DropdownTargetProps,
  type DropdownValueType,
} from '@/components/Dropdown';
import { Button } from '@/components/Button';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { SubHeaderContainer } from '../../styles';
import { HeadingWrapper, HeaderWrapper, FilterWrapper } from './styles';

interface StatementHeaderProps {
  accounts: DropdownValueType<string>[];
  selctedDropdownValue: DropdownValueType<string>;
  handleDropdoenUpdate: Function;
  startDate: Date | undefined;
  endDate: Date | undefined;
  handleStartDate: (date?: Date) => void;
  handleEndDate: (date?: Date) => void;
}

export const StatementHeader = (props: StatementHeaderProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const device = useDeviceType();

  const handleNavigation = useCallback(async () => {
    navigate(-1);
  }, [navigate]);

  return (
    <SubHeaderContainer>
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
            {t(`noumena.money.money-detail.viewStatements`)}
          </TSpan>
        </HeadingWrapper>
        {device !== DeviceTypeEnum.MOBILE && (
          <FilterWrapper>
            <Dropdown
              hideIcons
              containerWidth="280px"
              onSelectOption={(val) => {
                props.handleDropdoenUpdate(val);
              }}
              options={props.accounts}
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
                      color="--icon-input-neutral-default"
                      size={16}
                    />
                  }
                  softDisabled
                  onClick={toggle}
                >
                  {props.selctedDropdownValue?.label}
                </Button>
              )}
            </Dropdown>
            <DatePicker
              testId="tDatePicker"
              onChange={props.handleStartDate}
              dateFormat="MM/dd/yyyy"
              required
              value={props.startDate}
              label={t(`noumena.money.money-detail.viewStatements.startdate`)}
              placement="bottom-end"
              fromYear={2021}
            />
            <DatePicker
              testId="tDatePicker"
              dateFormat="MM/dd/yyyy"
              onChange={props.handleEndDate}
              required
              value={props.endDate}
              label={t('noumena.money.money-detail.viewStatements.enddate')}
              placement="bottom-end"
            />
          </FilterWrapper>
        )}
      </HeaderWrapper>
    </SubHeaderContainer>
  );
};
