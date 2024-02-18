import { Icon } from '@/components/Icon';
import { useLaunchDarkly } from '@/hooks';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { useCallback, type MouseEventHandler } from 'react';
import { LogoIcon, LogoSubtitle, LogoText, LogoWrapper } from './styles';

interface LogoProps {
  handleLogoClick?: MouseEventHandler<HTMLDivElement>;
  iconOnly?: boolean;
  className?: string;
}

export const Logo = ({
  handleLogoClick: onClick,
  className,
  iconOnly,
}: LogoProps) => {
  const { isMobile } = useBreakpoints();

  const {
    flags: { newSignUp },
  } = useLaunchDarkly();

  const handleLogoClick = useCallback(
    (event) => {
      onClick?.(event);
    },
    [onClick],
  );

  const LogoV2 = () => (
    <LogoText>
      <Icon
        name="brand_name"
        color="--bg-brand-name-brand-primary-default"
        size={90}
        height="11.61"
        width="90.93"
      />
      <LogoSubtitle>
        <Icon
          name="brand_subtitle_desktop"
          color="--bg-brand-subtitle-brand-primary-default"
          height="10"
          width="52"
          size={52}
        />
      </LogoSubtitle>
    </LogoText>
  );

  const LogoV1 = () => (
    <LogoText>
      {!isMobile ? (
        <>
          <Icon
            name="brand_name"
            color="--bg-brand-name-brand-primary-default"
            size={90}
            height="11.61"
            width="90.93"
          />
          <LogoSubtitle>
            <Icon
              name="brand_subtitle_desktop"
              color="--bg-brand-subtitle-brand-primary-default"
              height="10"
              width="52"
              size={52}
            />
          </LogoSubtitle>
        </>
      ) : (
        <Icon
          name="brand_subtitle_mobile"
          color="--bg-brand-name-brand-primary-default"
          width="27"
          height="18"
          size={27}
        />
      )}
    </LogoText>
  );

  return (
    <LogoWrapper
      data-testid="logo"
      onClick={handleLogoClick}
      className={className}
    >
      <LogoIcon>
        <Icon
          name="brand_logo"
          height={isMobile ? '26' : '28'}
          width={isMobile ? '25.03' : '26.95'}
          size={isMobile ? 26 : 28}
          color="--bg-brand-logo-brand-primary-default"
        />
      </LogoIcon>
      {!iconOnly && (newSignUp ? <LogoV2 /> : <LogoV1 />)}
    </LogoWrapper>
  );
};
