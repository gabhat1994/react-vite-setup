import { t } from 'i18next';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalSize,
  ModalFooter,
} from '@/components/ExtendedModal';
import { useBreakpoints } from '@/hooks';
import { Button, Icon, TSpan } from '@/components';
import { Stack } from '@/layout';
import { format } from 'date-fns';
import { Wrapper } from './styles';
import { type IPlanHistoryModal } from './types';
import { usePlanHistory } from '../hooks/usePlanHistory';
import { PlanUtil } from '../MembershipPlan/util';

export function PlanHistoryModal({ open, onClose }: IPlanHistoryModal) {
  const device = useBreakpoints();

  const { planHistory, loading, noDataFound } = usePlanHistory();

  return (
    <Modal
      open={open}
      onClose={onClose}
      size={ModalSize.L}
      isFullScreen={device.isMobile}
      enableCloseButton
      disableBackdropClick
      disableEscapeKeyDown
    >
      <ModalHeader topPadding={0}>
        {t('noumena.plan_summary.plan_history_hedaing')}
      </ModalHeader>
      <ModalBody isFullScreen={device.isMobile} loading={loading}>
        {noDataFound && (
          <TSpan font="body-l" colorToken="--text-card-neutral-default">
            {t('noumena.plan_summary.plan_history.no_plan_found')}
          </TSpan>
        )}
        <Stack fullWidth vertical gap={8}>
          {planHistory &&
            planHistory.map((item) => (
              <Wrapper key={item.subscription_id}>
                <Stack gap={4} vertical>
                  <TSpan
                    font="body-l-bold"
                    colorToken="--text-card-header-neutral-highlighted"
                  >
                    {PlanUtil.generatePlanName(item?.plan_name)}
                  </TSpan>
                  {item?.current_term_start && item?.current_term_end && (
                    <TSpan
                      font="footnote"
                      colorToken="--text-card-neutral-default"
                    >
                      {`${format(
                        new Date(Number(item?.current_term_start)),
                        'dd/MM/yyyy',
                      )} - ${format(
                        new Date(Number(item?.current_term_end)),
                        'dd/MM/yyyy',
                      )}`}
                    </TSpan>
                  )}
                </Stack>
                <Icon
                  name="chevron_right_m"
                  size={16}
                  color="--icon-button-neutral-default"
                />
              </Wrapper>
            ))}
        </Stack>
      </ModalBody>
      <ModalFooter isFullScreen={device.isMobile}>
        <Button tertiary size="full" onClick={onClose}>
          {t('noumena.plan_summary.plan_history_close')}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
