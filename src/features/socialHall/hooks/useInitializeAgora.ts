import { useCallback, useRef } from 'react';

import RtcEngine, {
  type ClientRole,
  type IAgoraRTCClient,
  type SDK_MODE,
} from '@/facade/agora';
import { type RtmClient } from '@/facade/agoraRTM';
import {
  SDK_SCREEN_SHARING_CODEC,
  SDK_VIDEO_CODEC,
} from '@/constants/socialHall';

export const useInitializeAgora = () => {
  const rtcScreenShare = useRef<IAgoraRTCClient>();
  const rtcEngine = useRef<IAgoraRTCClient>();
  const rtmEngine = useRef<RtmClient>();

  const initializeAgoraEngine = useCallback(
    async (mode: SDK_MODE, role: ClientRole): Promise<IAgoraRTCClient> => {
      rtcEngine.current = RtcEngine.createClient({
        mode,
        codec: SDK_VIDEO_CODEC,
        role,
      });
      rtcEngine.current.enableAudioVolumeIndicator();
      return rtcEngine.current;
    },
    [],
  );

  const initializeAgoraScreenShareEngine = useCallback(
    async (mode: SDK_MODE, role: ClientRole): Promise<IAgoraRTCClient> => {
      rtcScreenShare.current = RtcEngine.createClient({
        mode,
        codec: SDK_SCREEN_SHARING_CODEC,
        role,
      });
      return rtcScreenShare.current;
    },
    [],
  );

  const initializeAgoraMessagingEngine =
    useCallback(async (): Promise<RtmClient> => {
      const { default: RtmEngine } = await import('@/facade/agoraRTM');
      rtmEngine.current = RtmEngine.createInstance(
        process.env.VITE_AGORA_APP_ID ?? '',
        {
          enableLogUpload: true,
        },
      );
      return rtmEngine.current;
    }, []);

  return {
    initializeAgoraEngine,
    initializeAgoraScreenShareEngine,
    initializeAgoraMessagingEngine,
    rtcEngineInstance: rtcEngine.current,
    rtmEngineInstance: rtmEngine.current,
  };
};
