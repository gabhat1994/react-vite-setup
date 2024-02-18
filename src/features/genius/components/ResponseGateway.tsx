import React, { useMemo } from 'react';
import { useGeniusContext } from '../contexts/GeniusContextProvider';
import { ImageResponseRenderer } from './renderers/ImageResponseRenderer';
import { TextResponseRenderer } from './renderers/TextResponseRenderer';

type ResponseGatewayProps = {};

export const ResponseGateway: React.FC<ResponseGatewayProps> = () => {
  const { type } = useGeniusContext();

  const renderer = useMemo(() => {
    switch (type) {
      case 'image':
        return <ImageResponseRenderer />;
      case 'text':
        return <TextResponseRenderer />;

      default:
        return null;
    }
  }, [type]);

  return <div>{renderer}</div>;
};
