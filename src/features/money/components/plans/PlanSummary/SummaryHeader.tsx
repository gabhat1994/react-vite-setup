import { useNavigate } from 'react-router';
import { StickyFormHeader } from '@/components/FormHeader/StickyFormHeader/StickyFormHeader';
import { useModalManager } from '@/hooks/modal/useModalManager';
import {
  Dropdown,
  DropdownPicker,
  type DropdownValueType,
  type DropdownTargetProps,
} from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { useBreakpoints } from '@/hooks';
import { useCallback } from 'react';
import { t } from 'i18next';
import ROUTES from '@/constants/routes';
import * as PlanSummaryHeaderButton from './PlanSummaryHeaderButton';
import { PlanHistoryModal } from './PlanHistoryModal';
import { options } from './helper';

type ModalType = 'plan-history';

export const PlanSummaryHeader = () => {
  const { isMobile } = useBreakpoints();
  const navigate = useNavigate();

  const { modalType, openModal, closeModal } = useModalManager<ModalType>();

  const handleModal = () => {
    openModal('plan-history');
  };

  const handleSelction = useCallback(
    (e: DropdownValueType<string>) => {
      if (e.value === 'plan-history') {
        openModal('plan-history');
      } else {
        navigate(ROUTES.PLAN_TRANSACTION);
      }
    },
    [navigate, openModal],
  );

  return (
    <>
      <StickyFormHeader
        title={t('noumena.plan_summary.title')}
        buttons={
          !isMobile ? (
            <>
              <PlanSummaryHeaderButton.ShowHistoryButton
                onClick={handleModal}
              />
              <PlanSummaryHeaderButton.AllTransactionButton
                onClick={() => navigate(ROUTES.PLAN_TRANSACTION)}
              />
            </>
          ) : (
            <Dropdown
              hideIcons
              options={options}
              usePortal={true}
              containerWidth="200px"
              onSelectOption={handleSelction}
              placement="auto-start"
              calRefTop={false}
              usePopStyle={true}
            >
              {({
                targetProps,
                targetRef,
                toggle,
              }: DropdownTargetProps<HTMLDivElement>) => (
                <>
                  <DropdownPicker
                    ref={targetRef}
                    {...targetProps}
                    onClick={toggle}
                  >
                    <Icon
                      name="more_m"
                      color="--icon-button-neutral-default"
                      size={24}
                    />
                  </DropdownPicker>
                </>
              )}
            </Dropdown>
          )
        }
      />
      {modalType === 'plan-history' && (
        <PlanHistoryModal
          open={modalType === 'plan-history'}
          onClose={closeModal}
        />
      )}
    </>
  );
};
