import { Stack } from '@/layout';
import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { ModalBody } from '@/components/ExtendedModal';

const LoadingContainer = styled(Stack)`
  background-color: var(--bg-card-neutral-hover);
  border-radius: 8px;
  width: 100%;
  padding: 8px;
`;

const SpinnerContainer = styled(Stack)`
  position: relative;
  width: 48px;
`;

const StyledMotion = styled(motion.div)`
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const GeniusAssistContainer = styled(Stack)`
  text-align: center;
`;

const StyledModalBody = styled(ModalBody)<{ hidden?: boolean }>`
  ${({ hidden }) =>
    hidden &&
    css`
      display: none;
    `}
`;

export default {
  LoadingContainer,
  SpinnerContainer,
  StyledMotion,
  Image,
  GeniusAssistContainer,
  StyledModalBody,
};
