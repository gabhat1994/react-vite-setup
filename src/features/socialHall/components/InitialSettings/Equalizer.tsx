import { useLayoutEffect, useRef } from 'react';
import { type EqualizerProps } from './types';
import { EqualizerElement, EqualizerWrapper } from './styles';

export const Equalizer = ({ deviceId, setTracks }: EqualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    let microphoneSource: MediaStreamAudioSourceNode | null = null;
    // Create an audio context and an AnalyserNode
    const audioContext = new AudioContext();
    const analyserNode = audioContext.createAnalyser();
    const stopMicrophone = () => {
      if (microphoneSource) {
        const tracks = microphoneSource.mediaStream.getTracks();
        tracks.forEach((track) => track.stop());
        microphoneSource.disconnect(analyserNode);
        microphoneSource = null;
      }
    };
    if (canvasRef.current) {
      // Maximum canvasWidth/100
      const audioSensivity = 2.5;
      const canvas = canvasRef.current;

      // Get the microphone audio stream
      navigator.mediaDevices
        .getUserMedia({ audio: { deviceId } })
        .then((stream) => {
          // Connect the microphone audio stream to the AnalyserNode
          microphoneSource = audioContext.createMediaStreamSource(stream);
          if (microphoneSource) {
            setTracks((tracks) => [
              ...tracks,
              ...((
                microphoneSource as MediaStreamAudioSourceNode
              ).mediaStream.getTracks() || []),
            ]);
          }
          microphoneSource.connect(analyserNode);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error('Failed to get microphone audio:', err);
        });

      // Set up the AnalyserNode
      analyserNode.fftSize = 2048; // Set the FFT size
      const bufferLength = analyserNode.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength); // Create a buffer to hold the frequency data

      const canvasContext = canvas.getContext('2d');

      // Set up the bar colors and spacing
      const barHeight = 28;
      const barColor = '#00CA7A';

      const drawBar = () => {
        if (!canvasContext) return;
        // Get the frequency data and update the canvas
        analyserNode.getByteFrequencyData(dataArray);
        canvasContext?.clearRect(0, 0, canvas.width, canvas.height);
        const barWidth = canvas.width * (dataArray[0] / 255) * audioSensivity;
        canvasContext.fillStyle = barColor;
        canvasContext.fillRect(
          0,
          canvas.height / 2 - barHeight / 2,
          barWidth,
          barHeight,
        );
        requestAnimationFrame(drawBar);
      };

      drawBar();
    }
    return () => {
      stopMicrophone();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceId]);

  return (
    <EqualizerWrapper>
      <EqualizerElement ref={canvasRef} />
    </EqualizerWrapper>
  );
};
