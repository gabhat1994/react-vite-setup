import { memo } from 'react';
import { Icon, TSpan } from '@/components';
import { Stack } from '@/layout';
import { ElementUtils } from '@/utils/element';
import { Separator } from '@/components/Separator/Separator';
import { Avatar } from '@/components/Avatar/Avatar';
import { useTranslation } from 'react-i18next';
import { ButtonUtils } from '@/components/Button/utils';
import { type DragableElementProps } from './types';
import {
  DNDContainer,
  DnDHandlerButton,
  IconButton,
  ToolNameSpan,
  WrapperIcons,
} from './styles';

export const DragableElement = memo(
  ({
    element,
    isDragging,
    provided,
    handleCPVisibilityChange,
    visiblityChangeButtonData: { isEnabled, tooltipMessage },
  }: DragableElementProps) => {
    const { t } = useTranslation();
    const isCustomPreviewVisible = ElementUtils.isCustomPreviewVisible(element);
    const onClickVisibilityChange = () => {
      if (element?._id && isEnabled)
        handleCPVisibilityChange?.(element._id, !isCustomPreviewVisible);
    };

    return (
      <DNDContainer
        ref={provided?.innerRef}
        {...provided?.draggableProps}
        isDragging={isDragging}
        data-testid={element._id}
      >
        <Stack fullWidth justify="space-between" align="center" padding={12}>
          <Stack gap={8} maxWidth={194} overflow="visible" align="center">
            <WrapperIcons {...provided?.dragHandleProps}>
              <DnDHandlerButton
                textOnly
                tooltipText={t(
                  'noumena.noum_edit.custom_preview.side_panel.drag_to_move',
                )}
                tooltipPosition="top-right"
                icon={
                  <Icon
                    name="order_m"
                    size={24}
                    color="--icon-button-neutral-default"
                  />
                }
                size="small"
              />
            </WrapperIcons>
            <TSpan>
              {ElementUtils.isImageElement(element) &&
              ElementUtils.isImageAndVideoNotEmpty(element) ? (
                <Avatar
                  url={ElementUtils.getBodyContent(element, true)}
                  borderRadius={0}
                  size="M"
                />
              ) : (
                <Icon
                  name={ElementUtils.getIconName(element)}
                  size={24}
                  color="--icon-button-neutral-default"
                />
              )}
            </TSpan>
            <ToolNameSpan
              font="footnote"
              colorToken="--text-card-neutral-highlighted"
            >
              {element.elementType}
            </ToolNameSpan>
          </Stack>
          <IconButton
            onClick={onClickVisibilityChange}
            textOnly
            {...ButtonUtils.getTooltipProps({
              message: tooltipMessage || '',
              position: 'bottom-left',
              visible: true,
            })}
            size="small"
            icon={
              <Icon
                name={
                  isEnabled
                    ? isCustomPreviewVisible
                      ? 'eye_on_m'
                      : 'eye_off_m'
                    : 'info_m'
                }
                size={24}
                color={
                  isCustomPreviewVisible && isEnabled
                    ? '--icon-button-brand-primary-hover'
                    : '--icon-card-neutral-default'
                }
              />
            }
          />
        </Stack>
        <Separator noMargin fullWidth />
      </DNDContainer>
    );
  },
);
