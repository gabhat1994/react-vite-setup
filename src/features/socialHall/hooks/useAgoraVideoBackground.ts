import { useEffect, useState, useRef } from 'react';
import AgoraRTC, { type ICameraVideoTrack } from '@/facade/agora';
import VirtualBackgroundExtension, {
  type IVirtualBackgroundProcessor,
  type VirtualBackgroundEffectOptions,
} from '@/facade/agoraVirtualBackground';
import { useSocialHallContext } from '@/providers/SocialHallProvider';

export const useAgoraVideoBackground = () => {
  const { virtualBackground } = useSocialHallContext();
  const [extensionActive, setExtensionActive] = useState(false);
  const ext = useRef(new VirtualBackgroundExtension());
  const processor = useRef<IVirtualBackgroundProcessor>();

  const enableBackground = async (localVideoTrack: ICameraVideoTrack) => {
    if (processor.current && localVideoTrack) {
      localVideoTrack
        .pipe(processor.current)
        .pipe(localVideoTrack.processorDestination);
      processor.current.setOptions(
        virtualBackground as VirtualBackgroundEffectOptions,
      );
      await processor.current.enable();
      setExtensionActive(true);
    }
  };

  const disableBackground = async (localVideoTrack: ICameraVideoTrack) => {
    if (processor.current && localVideoTrack) {
      localVideoTrack.unpipe();
      await processor.current.disable();
      setExtensionActive(false);
    }
  };

  useEffect(() => {
    const initExtension = async () => {
      AgoraRTC.registerExtensions([ext.current]);
      processor.current = ext.current.createProcessor();
      await processor.current.init('');
    };
    initExtension();
  }, []);

  return {
    extensionActive,
    enableBackground,
    disableBackground,
  };
};
