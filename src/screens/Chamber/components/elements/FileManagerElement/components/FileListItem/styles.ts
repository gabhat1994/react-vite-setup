import styled from 'styled-components';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';

const Container = styled(Stack)`
  padding-top: 16px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 16px;
  min-width: 0;
  flex-basis: 100%;
`;

const IconsContainer = styled.div`
  display: flex;
`;

const FileIconContainer = styled.div`
  border: 1px solid var(--border-file-unknown-default);
  border-radius: 8px;
  width: 46px;
  height: 46px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  overflow: hidden;
  cursor: pointer;
`;

const FileName = styled(TSpan)`
  color: var(--text-card-header-neutral-highlighted);
`;

const FileDescription = styled(TSpan)`
  color: var(--text-tablecell-body-neutral-default);
`;

const Image = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
`;

const PreviewVideo = styled.video`
  border-radius: 8px;
  width: 48px;
  height: 48px;
  object-fit: cover;
`;

const SpinnerContainer = styled.div`
  position: absolute;
  left: 24px;
  top: 50%;
`;

const IconContainer = styled.div`
  width: 48px;
  height: 48px;
  position: relative;
`;

export default {
  Container,
  TextContainer,
  IconsContainer,
  LeftWrapper,
  FileName,
  FileDescription,
  FileIconContainer,
  Image,
  PreviewVideo,
  SpinnerContainer,
  IconContainer,
};
