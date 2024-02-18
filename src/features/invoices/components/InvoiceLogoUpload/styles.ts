import styled from 'styled-components';
import { Stack } from '@/layout';

const Container = styled(Stack)<{ isUploaded?: boolean }>`
  border: ${(props) =>
    props.isUploaded
      ? ' 1px solid var(--border-card-neutral-highlighted)'
      : 'none'};
  width: 100%;
  border-radius: 8px;
  padding: ${(props) => (props.isUploaded ? '16px' : '0')};
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  max-width: 160px;
  max-height: 56px;
  object-fit: contain;
`;

const SpinnerContainer = styled.div`
  padding: 16px;
  position: relative;
`;

export default {
  ImagePreview,
  Container,
  SpinnerContainer,
};
