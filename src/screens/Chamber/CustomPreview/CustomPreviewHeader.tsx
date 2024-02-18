import { forwardRef, type Ref, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import { useWindowDimensions } from '@/hooks/dimensions';
import {
  usePublishElementStateHelper,
  useUpdateNoumCustomPreviewHelper,
} from '@/features/noums/hooks/spaceQuery';
import {
  IconWrapper,
  StatusLabel,
  StyledButton,
  MobileStatusWrapper,
  EditChangeStatusText,
  ButtonsWrapper,
} from '@/components/Header/styles';
import { useLaunchDarkly } from '@/hooks';
import { ElementStatusEnum } from '@/apollo/generated/types';
import { NoumCustomPreviewDiscardChange } from '../components/modals/NoumCustomPreviewDiscardChange';
import { useEditChamberState } from '../EditChamber/provider';
import { CustomPreviewTabEnum } from './constants';
import { EditHeaderWrapperNew } from '../EditChamber/styles';
import { StatusWrapper } from './styles';

type CustomPreviewHeaderProps = {
  /* Id of the noum */
  spaceId: string;
  /* selected tab of rightside area (edit/preview) */
  selectedCustomPreviewTab: string;
  /* timestamp for last saved data */
  lastCustomPreviewSavedTime?: string;
};

export const CustomPreviewHeader = forwardRef(
  (
    {
      lastCustomPreviewSavedTime = '',
      selectedCustomPreviewTab,
      spaceId,
    }: CustomPreviewHeaderProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const {
      flags: { noumCustomPreivewV2 },
    } = useLaunchDarkly();
    const {
      hasUnsavedCustomPreview,
      updateCustomPreviewElements,
      customPreviewElements,
    } = useEditChamberState();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isOpenExitCustomPreviewModal, toggleExitCustomPreviewModal] =
      useState<boolean>(false);

    const handleClickExit = useCallback(() => {
      if (hasUnsavedCustomPreview) {
        toggleExitCustomPreviewModal(true);
      } else navigate(-1);
    }, [hasUnsavedCustomPreview, navigate]);

    const { width } = useWindowDimensions();

    const isTablet = width > 768;

    const handleCloseExitModal = useCallback(
      (isSuccess?: boolean) => {
        toggleExitCustomPreviewModal(false);
        if (isSuccess) {
          updateCustomPreviewElements?.([]);
          navigate(-1);
        }
      },
      [navigate, updateCustomPreviewElements],
    );
    const { updateNoumCustomPreviewHelper, loading } =
      useUpdateNoumCustomPreviewHelper();
    const { publishElementStateHelper } = usePublishElementStateHelper();

    const handleClickCustomPreviewSave = useCallback(async () => {
      const isSuccess = await updateNoumCustomPreviewHelper(
        spaceId,
        customPreviewElements,
      );
      await publishElementStateHelper(
        spaceId,
        ElementStatusEnum.Unsaved,
        ElementStatusEnum.Draft,
      );
      if (isSuccess) {
        navigate(-1);
      }
    }, [
      customPreviewElements,
      navigate,
      publishElementStateHelper,
      spaceId,
      updateNoumCustomPreviewHelper,
    ]);

    const RenderMobileStatus = () => (
      <StatusWrapper className="xs-block">
        {lastCustomPreviewSavedTime && (
          <MobileStatusWrapper>
            {t('noumena.noum_edit.custom_preview.header.status.last_update')}:{' '}
            {lastCustomPreviewSavedTime}
            <EditChangeStatusText colorToken="--text-top-nav-neutral-default">
              {selectedCustomPreviewTab === CustomPreviewTabEnum.Edit
                ? t(
                    'noumena.noum_edit.custom_preview.header.status.preview_saved',
                  )
                : t(
                    'noumena.noum_edit.custom_preview.header.status.all_preview_saved',
                  )}
            </EditChangeStatusText>
          </MobileStatusWrapper>
        )}
      </StatusWrapper>
    );

    const RenderStatus = ({ className: name = 'xs-hidden' }) => (
      <StatusWrapper className={`xs-${name}`}>
        {lastCustomPreviewSavedTime && (
          <StatusLabel
            labelSize="small"
            data-testid={`lastPublishedLabel_xs_${name}`}
            className={`xs-${name}`}
          >
            {t('noumena.noum_edit.custom_preview.header.status.last_update')}:{' '}
            {lastCustomPreviewSavedTime}
            <EditChangeStatusText colorToken="--text-top-nav-neutral-default">
              {selectedCustomPreviewTab === CustomPreviewTabEnum.Edit
                ? t(
                    'noumena.noum_edit.custom_preview.header.status.preview_saved',
                  )
                : t(
                    'noumena.noum_edit.custom_preview.header.status.all_preview_saved',
                  )}
            </EditChangeStatusText>
          </StatusLabel>
        )}
      </StatusWrapper>
    );

    return (
      <EditHeaderWrapperNew ref={ref} data-testid="Edit-Header">
        {noumCustomPreivewV2 ? (
          <StyledButton
            size="small"
            onClick={handleClickExit}
            secondary={hasUnsavedCustomPreview}
            intent="negative"
            tertiary={!hasUnsavedCustomPreview}
          >
            {hasUnsavedCustomPreview
              ? t(`noumena.cancel`)
              : t('noumena._new_header.done_button.text')}
          </StyledButton>
        ) : (
          <IconWrapper>
            <Icon
              name="arrow_left_m"
              size={24}
              onClick={handleClickExit}
              color="--icon-top-nav-global-element-neutral-highlighted"
            />
          </IconWrapper>
        )}
        <RenderStatus className="hidden" />
        <ButtonsWrapper gap={12}>
          <StyledButton
            data-testid="EditHeader-CustomPreview-Save"
            primary
            size="small"
            onClick={handleClickCustomPreviewSave}
            loading={loading}
            disabled={!hasUnsavedCustomPreview || loading || !spaceId}
          >
            {selectedCustomPreviewTab === CustomPreviewTabEnum.Edit
              ? t('noumena.noum_edit.custom_preview.header.button.save')
              : t('noumena.header.publish_button.text')}
          </StyledButton>
        </ButtonsWrapper>

        {isTablet ? <RenderStatus className="block" /> : <RenderMobileStatus />}
        <NoumCustomPreviewDiscardChange
          isOpen={isOpenExitCustomPreviewModal}
          spaceId={spaceId}
          handleClose={handleCloseExitModal}
        />
      </EditHeaderWrapperNew>
    );
  },
);
