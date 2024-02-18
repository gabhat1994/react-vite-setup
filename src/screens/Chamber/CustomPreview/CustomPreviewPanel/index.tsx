import SideModal from '@/components/SideModal/SideModal';
import { useBreakpoints } from '@/hooks';
import { Trans } from 'react-i18next';
import { t } from 'i18next';
import { Stack } from '@/layout';
import { Separator } from '@/components/Separator/Separator';
import { type SideModalProps } from '@/components/SideModal/types';
import { TSpan } from '@/components';
import { StyledTSpan } from '../styles';
import { DescriptionWrapper } from './styles';
import CustomPreviewPanelDnd from '../CustomPreviewPanelDnd';

export const CustomPreviewPanel = ({ open }: SideModalProps) => {
  const { isDesktop } = useBreakpoints();

  return (
    <SideModal
      className="noums_container"
      placement="right"
      nonBlockingModal={isDesktop}
      disableEscapeKeyDown
      isBackgroundOpacity={!isDesktop}
      height="100%"
      padding={0}
      width="250px"
      title={t('noumena.noum_edit.custom_preview.side_panel.title')}
      titleFont="body-m-bold"
      open={open}
      overflowY="auto"
    >
      <Stack
        vertical
        fullWidth
        align="stretch"
        aria-label="custom_preview_panel"
      >
        <Separator noMargin fullWidth />
        <DescriptionWrapper aria-label="custom_preview_panel_description">
          <TSpan font="body-m">
            <Trans
              i18nKey={t('noumena.noum_edit.custom_previews.descriptiontop')}
              components={{
                span: <StyledTSpan />,
              }}
            />
          </TSpan>
        </DescriptionWrapper>
        <Separator noMargin fullWidth />
        <CustomPreviewPanelDnd />
      </Stack>
    </SideModal>
  );
};
