import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/ExtendedModal';
import { Button } from '@/components/Button';
import { DatePicker } from '@/components/DatePicker';
import { Icon } from '@/components/Icon';
import { Spacer } from '@/layout';
import { Dropdown, type DropdownTargetProps } from '@/components/Dropdown';
import { PaymentAccountTypeEnum } from '@/apollo/generated/types';
import { convert } from '../../helper';
import { type StatementFilterProps } from './types';
import { ModalHead, ModalBody, ModalContent, CloseButtonWrap } from './styles';

const StatementFilter: React.FC<StatementFilterProps> = ({
  isOpen,
  handleClose,
  accounts,
  selctedDropdownValue,
  handleDropdoenUpdate,
  startDate,
  endDate,
  handleStartDate,
  handleEndDate,
  setFilters,
}) => {
  const { t } = useTranslation();

  const onApplySortAndFilter = useCallback(() => {
    setFilters({
      accountType:
        selctedDropdownValue.key === ''
          ? [PaymentAccountTypeEnum.Wallet, PaymentAccountTypeEnum.SubWallet]
          : [`${selctedDropdownValue.key}`],
      endDate: convert(endDate),
      accountId: `${selctedDropdownValue.value}`,
      startDate: convert(startDate),
    });
    handleClose();
  }, [
    endDate,
    handleClose,
    selctedDropdownValue.key,
    selctedDropdownValue.value,
    setFilters,
    startDate,
  ]);

  const onResetFilter = useCallback(() => {
    handleDropdoenUpdate({
      label: 'Wallets : All',
      key: '',
      type: 'value',
      value: '',
    });
    setFilters({
      accountType: [
        PaymentAccountTypeEnum.Wallet,
        PaymentAccountTypeEnum.SubWallet,
      ],
      startDate: convert(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      ),
      accountId: ``,
      endDate: convert(
        new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      ),
    });
    handleClose();
  }, [handleClose, handleDropdoenUpdate, setFilters]);

  return (
    <Modal
      isFullScreen
      open={isOpen}
      testId="chamber-filter"
      onClose={handleClose}
    >
      <ModalContent>
        <ModalHead>
          <CloseButtonWrap>
            <Button
              testId="chamber-filter-close-button"
              onClick={() => {
                handleClose();
              }}
              size="small"
              neutral
              softDisabled
              rightIcon={
                <Icon
                  name="close_m"
                  color="--icon-button-neutral-default"
                  size={16}
                />
              }
            />
          </CloseButtonWrap>
          <Spacer height={16} />
        </ModalHead>
        <ModalBody>
          <Dropdown
            hideIcons
            isAnimation={false}
            placement="bottom-start"
            options={accounts}
            usePortal={false}
            usePopStyle
            onSelectOption={(val) => {
              handleDropdoenUpdate(val);
            }}
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

          <DatePicker
            testId="tDatePicker"
            onChange={handleStartDate}
            dateFormat="MM/dd/yyyy"
            required
            value={startDate}
            label={t(`noumena.money.money-detail.viewStatements.startdate`)}
            placement="bottom-end"
            fromYear={2021}
          />
          <DatePicker
            testId="tDatePicker"
            dateFormat="MM/dd/yyyy"
            onChange={handleEndDate}
            required
            value={endDate}
            label={t('noumena.money.money-detail.viewStatements.enddate')}
            placement="bottom-end"
          />
        </ModalBody>
        <Spacer height={24} />

        <Button
          testId="chamber-filter-reset-button"
          size="large"
          leftIcon={
            <Icon
              name="close_m"
              size={16}
              color="--icon-button-brand-primary-default"
            />
          }
          color="primary"
          neutral
          onClick={onResetFilter}
        >
          {t(`noumena.chambers.filter_modal_button_reset_filter`)}
        </Button>
        <Spacer height={24} />

        <Button
          testId="chamber-filter-apply-button"
          onClick={onApplySortAndFilter}
          primary
        >
          {t(`noumena.chambers.filter_modal_button_apply_filter`)}
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default StatementFilter;
