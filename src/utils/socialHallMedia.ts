import { t } from 'i18next';
import { values } from 'lodash';

import {
  type MediaDeviceLabel,
  type ConnectedDevices,
} from '@/screens/SocialHall/types';
import { MediaInputType } from '@/screens/SocialHall/const';
import AgoraRTC, { type IMicrophoneAudioTrack } from '@/facade/agora';
import { type MediaVirtualBackground } from '@/features/socialHall/components';

import { type HTMLAudioElementSinkId } from './types';

export const SocialHallMediaUtils = {
  getDevices: async (): Promise<MediaDeviceInfo[]> => {
    let availableDevices: MediaDeviceInfo[] = [];
    try {
      availableDevices = await navigator.mediaDevices.enumerateDevices();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    return availableDevices;
  },

  getDefaultDevice: (devices: MediaDeviceLabel[]): string =>
    devices.find(({ deviceId }) => deviceId === 'default')?.deviceId || '',

  askForPermission: async () => {
    await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  },

  getAllConnectedMedia: async (): Promise<ConnectedDevices> => {
    const devices = await SocialHallMediaUtils.getDevices();

    let audioDevices: { [key: string]: MediaDeviceLabel } = {};
    let cameraDevices: { [key: string]: MediaDeviceLabel } = {};
    let speakerDevices: { [key: string]: MediaDeviceLabel } = {};

    devices.forEach((device) => {
      const uid = device.groupId || device.deviceId;
      if (!uid) {
        return;
      }
      if (device.kind === MediaInputType.AudioInput && !audioDevices[uid]) {
        audioDevices = { ...audioDevices, [uid]: device };
      }
      if (device.kind === MediaInputType.VideoInput && !cameraDevices[uid]) {
        cameraDevices = { ...cameraDevices, [uid]: device };
      }
      if (device.kind === MediaInputType.Speaker && !speakerDevices[uid]) {
        speakerDevices = { ...speakerDevices, [uid]: device };
      }
    });
    return {
      audioDevices: values(audioDevices),
      cameraDevices: values(cameraDevices),
      speakerDevices: values(speakerDevices),
    };
  },

  getDefaultMediaDeviceId: async (): Promise<{
    microphoneDeviceId: string;
    cameraDeviceId: string;
    speakerDeviceId: string;
  }> => {
    const devices = await SocialHallMediaUtils.getDevices();
    let microphoneDeviceId = '';
    let cameraDeviceId = '';
    let speakerDeviceId = 'default';

    devices.forEach((device: MediaDeviceInfo) => {
      const { kind, deviceId } = device;

      if (kind === MediaInputType.Speaker && !speakerDeviceId) {
        speakerDeviceId = deviceId;
      }
      if (kind === MediaInputType.AudioInput && !microphoneDeviceId) {
        microphoneDeviceId = deviceId;
      }

      if (kind === MediaInputType.VideoInput && !cameraDeviceId) {
        cameraDeviceId = deviceId;
      }
    });

    // create local track from user microphone
    return { microphoneDeviceId, cameraDeviceId, speakerDeviceId };
  },

  getAllVirtualBackground: (): MediaVirtualBackground[] => [
    {
      id: 'background_blur_1',
      label: t(
        'noumena.social_hall.media_settings.select_camera_background_blur',
      ),
      type: 'blur',
      blurDegree: 1,
    },
  ],

  formatDeviceLabel: (label: string): string => label.split('(')[0].trim(),

  hasRequiredMediaPermissions: async (): Promise<{
    audio: boolean;
    video: boolean;
  }> => {
    const permissions = {
      audio: false,
      video: false,
    };
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      permissions.audio = true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      permissions.video = true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    return permissions;
  },

  handleMicrophoneCheck: async (
    microphoneId: string,
  ): Promise<IMicrophoneAudioTrack | null> => {
    const audioTrack = await AgoraRTC.createMicrophoneAudioTrack({
      microphoneId,
    });
    let isActiveAudioTrack = false;
    try {
      isActiveAudioTrack = await AgoraRTC.checkAudioTrackIsActive(audioTrack);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    return isActiveAudioTrack ? audioTrack : null;
  },

  handleCameraCheck: async (
    deviceId: string,
    retries: number = 0,
  ): Promise<MediaStream | null> => {
    let stream: MediaStream | null = null;
    const maxRetries = 2;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId },
      });
    } catch (err) {
      // eslint-disable-next-line
      console.log(err);
      if (retries < maxRetries) {
        return SocialHallMediaUtils.handleCameraCheck(deviceId, retries + 1);
      }
    }
    return stream;
  },

  handleSpeakerCheck: (speakerId: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
      try {
        // Create audio context
        const audioContext = new AudioContext();

        // Create nodes
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const audioDestination = audioContext.createMediaStreamDestination();

        // Set up oscillator
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note frequency

        // Set up gain node
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Reduce volume

        // Connect nodes
        oscillator.connect(gainNode);
        gainNode.connect(audioDestination);

        // Create audio element and set output device
        const audioElement = new Audio() as HTMLAudioElementSinkId;
        audioElement.srcObject = audioDestination.stream;
        audioElement.setSinkId(speakerId).then(() => {
          // Play test tone
          oscillator.start();
          audioElement.play();

          // Stop test tone after 2 seconds
          setTimeout(() => {
            audioElement.pause();
            oscillator.stop();
            audioContext.close();
            resolve(true);
          }, 400);
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Speaker is not working', err);
        reject(err);
      }
    }),
};
