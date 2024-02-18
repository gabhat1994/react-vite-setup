import { useTranslation } from 'react-i18next';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalSize,
} from '@/components/ExtendedModal';

import { Spinner } from '@/components/Spinner';
import { Stack } from '@/layout';
import { type NoumAdsModalProps } from './types';
import { useNoumAds } from './useNoumAds';
import { EnabledView } from './EnabledView';
import { DisabledView } from './DisabledView';
import { DisableConfirmationView } from './DisableConfirmationView';
import { EnableAndDisableAction } from './EnableAndDisableAction';
import { DisableConfirmmationAction } from './DisableConfirmmationAction';

export const NoumAdsModal = ({
  isOpen,
  onClose,
  refetchSpaceById,
  campaignId,
}: NoumAdsModalProps) => {
  const { t } = useTranslation();
  const { devices, slug, setting, keyword, space, infoBox, isOpsUser, view } =
    useNoumAds({
      campaignId,
      isOpen,
      onSave: () => {
        refetchSpaceById?.();
        onClose();
      },
    });

  return (
    <Modal
      testId="noum-ads-modal"
      open={isOpen}
      onClose={onClose}
      enableAnimation
      enableCloseButton={!isOpsUser}
      size={
        setting.enableNoumAds
          ? devices.isMobile
            ? ModalSize.XXL
            : ModalSize.XL
          : ModalSize.M
      }
      disableBackdropClick
      disableEscapeKeyDown
    >
      <div style={{ padding: devices.isMobile ? '16px' : undefined }}>
        <ModalHeader
          justifyContent={devices.isMobile ? 'flex-start' : 'center'}
        >
          {t(
            view.showDisableConfirmationView
              ? 'noumena.chamber_edit.manage_noum_ads.turn.off.title'
              : 'noumena.chamber_edit.manage_noum_ads.title',
          )}
        </ModalHeader>
      </div>

      {space.isLoadingFromOps && (
        <Stack
          align="center"
          justify="center"
          fullWidth
          style={{ height: '230px' }}
        >
          <Spinner />
        </Stack>
      )}

      {space.isLoadingFromOps || (
        <ModalBody style={{ padding: devices.isMobile ? 0 : undefined }}>
          {view.showEnabledView && (
            <EnabledView
              isMobile={devices.isMobile}
              toggleValue={setting.enableNoumAds}
              handleToggle={setting.toggle}
              url={setting.slug ?? ''}
              updateUrl={setting.updateSlug}
              isSlugAvailable={slug.isAvailable}
              isSlugChecked={slug.isSlugCheckingCalled}
              loading={slug.loading}
              showInfoBox={slug.showInfoBox}
              showInfoState={infoBox.show}
              updateInfoBoxState={infoBox.update}
              suggestions={keyword.suggestions}
              selectedKeywords={keyword.selected}
              onAdd={keyword.add}
              onRemove={keyword.remove}
            />
          )}

          {view.showDisableConfirmationView && (
            <DisableConfirmationView
              isMobile={devices.isMobile}
              url={setting.slug || ''}
            />
          )}

          {view.showDisabledView && (
            <DisabledView
              toggleValue={setting.enableNoumAds}
              handleToggle={setting.toggle}
              isMobile={devices.isMobile}
            />
          )}
        </ModalBody>
      )}

      {space.isLoadingFromOps || (
        <ModalFooter>
          {!view.showDisableConfirmationView && (
            <EnableAndDisableAction
              hideCancelButton={isOpsUser}
              onClose={onClose}
              onSave={space.update}
              loading={space.isUpdating || slug.loading}
              disableActionButton={
                space.isUpdating ||
                slug.loading ||
                slug.isTaken ||
                (!setting.slug && setting.enableNoumAds)
              }
            />
          )}

          {view.showDisableConfirmationView && (
            <DisableConfirmmationAction
              onClose={setting.disagreeDisablingSEO}
              onDisable={setting.agreeDisablingSEO}
            />
          )}
        </ModalFooter>
      )}
    </Modal>
  );
};

export default NoumAdsModal;
