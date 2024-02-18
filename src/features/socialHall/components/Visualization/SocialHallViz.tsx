import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useEffect, useRef, useState } from 'react';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import {
  type SocialHallOutput,
  type SocialHallParticle,
  type SocialHallVizProps,
} from './types';
import { CirclePacking } from './CirclePacking';
import SocialHallNavigation from './helpers/socialHallNavigation';

export const SocialHallViz = (props: SocialHallVizProps): JSX.Element => {
  const { onMemberPressed, minHeight, minWidth } = props;
  const device = useDeviceType();

  const cache = useRef<SocialHallOutput>({
    width: minWidth,
    height: minHeight,
    particles: [],
  });
  const [socialHallData, setSocialHallData] = useState<
    Array<SocialHallParticle>
  >([]);

  useEffect(() => {
    const {
      width: newWidth,
      height: newHeight,
      particles,
    } = new SocialHallNavigation({
      ...props,
      cache: cache.current,
    }).generateCoords();
    setSocialHallData(particles);
    cache.current = { width: newWidth, height: newHeight, particles };
  }, [props]);
  return (
    <TransformWrapper initialScale={1} minScale={1} maxScale={1}>
      <TransformComponent
        wrapperStyle={{
          width: '100%',
          height: '100%',
          fontFamily: "Suisse Int'l",
          borderRadius: device === DeviceTypeEnum.MOBILE ? '0' : '16px',
        }}
      >
        <div
          style={{
            background: 'var(--bg-shmap-brand-secondary-default)',
            minHeight: `${minHeight}px`,
            minWidth: `${minWidth}px`,
          }}
        >
          <svg width={cache.current.width} height={cache.current.height}>
            {socialHallData.map((particle: SocialHallParticle) => (
              <CirclePacking
                key={particle.id}
                onMemberPressed={onMemberPressed}
                particle={particle}
              />
            ))}
          </svg>
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};
