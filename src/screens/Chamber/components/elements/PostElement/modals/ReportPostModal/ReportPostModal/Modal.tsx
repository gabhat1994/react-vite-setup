import React, { type ChangeEvent, useCallback, useMemo, useState } from 'react';
import { t } from 'i18next';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { useAuth } from '@/features/auth/contexts';
import { useToast, useToggle, useWindowDimensions } from '@/hooks';
import { Button } from '@/components/Button';
import { breakpoints } from '@/constants/devices';
import { ActionType, ReportType } from '@/apollo/generated/types';
import { useSendPostReportMutation } from '@/apollo/graphql';
import { UserUtil } from '@/utils/user';
import { ReportReasonOptions } from '@/screens/Chamber/components/elements/PostElement/modals/ReportPostModal/ReportPostModal/consts';
import { ReportReasonItem } from '../ReportReasonItem';
import { ReportSuccessModal } from '../ReportSuccessModal';
import { type ReportPostProps } from './types';

export const ReportPostModal: React.FC<ReportPostProps> = ({
  postId,
  onClose,
}) => {
  const windowSize = useWindowDimensions();
  const { user } = useAuth();
  const { addToast } = useToast();

  const isMobile = windowSize.width < breakpoints.TABLET;

  const [isReported, toggleIsReported] = useToggle(false);
  const [reportType, setReportType] = useState<ReportType | undefined>();

  const [reportText, setReportText] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [sendPostReport, { loading: reporting }] = useSendPostReportMutation();

  const isValid = useMemo(() => {
    if (!reportType) return false;
    if (reportType !== ReportType.Other) return true;
    return reportType === ReportType.Other && !!reportText;
  }, [reportType, reportText]);

  const handleReport = useCallback(async () => {
    if (user?.userStatus === ActionType.Pending || UserUtil.isInactive(user)) {
      addToast(
        'primary',
        'none',
        t('noumena.community.userIsNotActive.report'),
      );
      return;
    }
    if (!postId) {
      addToast(
        'error',
        'none',
        t('noumena.chambers.element.posts.error.report.post_id_required'),
      );
    } else if (!reportType) {
      addToast(
        'error',
        'none',
        t('noumena.chambers.element.posts.error.report.report_type_required'),
      );
    } else if (reportType === ReportType.Other && !reportText) {
      addToast(
        'error',
        'none',
        t('noumena.chambers.element.posts.error.report.report_text_required'),
      );
    } else {
      await sendPostReport({
        variables: {
          input: {
            postId,
            reportType,
            reportText,
          },
        },
      })
        .then(() => {
          toggleIsReported();
          addToast(
            'success',
            'icon',
            t('noumena.chambers.element.posts.success.report'),
          );
        })
        .catch(() => {
          addToast(
            'error',
            'none',
            t('noumena.chambers.element.posts.error.report_failed'),
          );
        });
    }
  }, [
    user,
    postId,
    reportType,
    reportText,
    addToast,
    sendPostReport,
    toggleIsReported,
  ]);

  const handleChangeReportText = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value) {
        setError(false);
      } else {
        setError(true);
      }
      setReportText(e.target.value);
    },
    [setReportText],
  );

  if (isReported) return <ReportSuccessModal onClose={onClose} />;

  return (
    <Modal
      open
      testId="report_post"
      onClose={onClose}
      disableBackdropClick={reporting}
      disableEscapeKeyDown={reporting}
      spacingMode="gap-content"
      enableCloseButton
      size={ModalSize.L}
    >
      <ModalHeader
        rightMobileContainer={
          <Button
            key="report_submit_btn"
            testId="report_submit_btn"
            disabled={!isValid}
            primary
            loading={reporting}
            size="small"
            onClick={handleReport}
          >
            {t('noumena.report')}
          </Button>
        }
        data-testid="report_header"
        justifyContent={isMobile ? 'right' : 'center'}
      >
        {t('noumena.chambers.element.posts.report.title')}
      </ModalHeader>
      <ModalBody data-testid="report_reason_wrapper">
        {ReportReasonOptions.map((option) => (
          <ReportReasonItem
            key={option.label}
            value={option.value}
            label={option.label || ''}
            description={option.description || ''}
            onSelect={setReportType}
            isChecked={reportType === option.value}
            reportText={reportText}
            onChangeText={handleChangeReportText}
            isOtherChecked={
              reportType === ReportType.Other &&
              option.value === ReportType.Other
            }
            error={error}
          />
        ))}
      </ModalBody>
      <ModalFooter>
        {!isMobile && (
          <Button
            key="report_submit_btn"
            testId="report_submit_btn"
            disabled={!isValid}
            primary
            loading={reporting}
            size="full"
            onClick={handleReport}
          >
            {t('noumena.report')}
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};
