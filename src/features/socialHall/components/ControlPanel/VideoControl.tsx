import { useMemo } from 'react';
import { t } from 'i18next';
import { Icon } from '@/components/Icon';
import { Spinner } from '@/components/Spinner';
import { ControlPanelIcon, ErrorWrapper } from './styles';
import { type VideoControlProps } from './types';

export const VideoControl = ({
  onToggle,
  isCameraEnable,
  isError = false,
  isLoading = false,
}: VideoControlProps) => {
  const color = useMemo((): {
    bgColor: string | undefined;
    hoverColor: string | undefined;
    iconColor: string;
  } => {
    if (isError) {
      return {
        bgColor: 'var(--bg-button-neutral-disabled)',
        iconColor: '--icon-button-neutral-disabled',
        hoverColor: 'var(--bg-button-neutral-disabled)',
      };
    }
    if (!isCameraEnable && !isLoading) {
      return {
        bgColor: 'var(--bg-button-danger-secondary-default)',
        iconColor: '--icon-button-danger-secondary-default',
        hoverColor: 'var(--bg-button-danger-secondary-hover)',
      };
    }

    return {
      bgColor: undefined,
      iconColor: '--icon-button-neutral-default',
      hoverColor: undefined,
    };
  }, [isError, isCameraEnable, isLoading]);

  const title = useMemo(() => {
    if (isError) {
      return t('noumena.social_hall.media_permission_more_info');
    }
    return isCameraEnable
      ? t('noumena.social_hall.Control_panel.Camera_on')
      : t('noumena.social_hall.Control_panel.Camera_off');
  }, [isCameraEnable, isError]);

  const onToggleHandler = () => {
    if (!isLoading) {
      onToggle();
    }
  };

  return (
    <ControlPanelIcon
      cursorAllowed
      onClick={() => onToggleHandler()}
      data-title={title}
      bgColor={color.bgColor}
      hoverColor={color.hoverColor}
    >
      {isError && (
        <ErrorWrapper>
          <Icon
            size={11}
            name="alert_xs"
            color="--icon-badge-neutral-alt-default"
          />
        </ErrorWrapper>
      )}
      {isLoading && <Spinner />}
      {!isError && !isLoading && (
        <Icon
          size={24}
          name={isCameraEnable ? 'webcam_on_m' : 'webcam_off_m'}
          color={color.iconColor}
        />
      )}
      {isError && (
        <Icon size={24} name="webcam_off_m" color={color.iconColor} />
      )}
    </ControlPanelIcon>
  );
};
