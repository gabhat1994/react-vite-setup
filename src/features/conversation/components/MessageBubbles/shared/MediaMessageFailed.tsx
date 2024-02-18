import React from 'react';

import imagePlaceholder from '@/assets/images/no-image.svg';
import { type MessageProps } from '../types';
import { FailedMediaWrapper, StyledImage } from '../styles';

export const MediaMessageFailed: React.FC<Pick<MessageProps, 'status'>> = ({
  status,
}) => {
  if (status !== 'failed') return null;

  return (
    <FailedMediaWrapper data-testid="media-message-failed">
      <StyledImage src={imagePlaceholder} alt="placeholder" />
    </FailedMediaWrapper>
  );
};
