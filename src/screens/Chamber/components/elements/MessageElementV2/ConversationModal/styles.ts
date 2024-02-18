import { ModalBody, ModalHeader } from '@/components/ExtendedModal';
import styled from 'styled-components';

const ModalHeaderStyled = styled(ModalHeader).attrs({
  titleCss: {
    maxWidth: '100%',
    width: '100%',
  },
})`
  padding-top: 0;
  padding-bottom: 0;
`;

const ModalBodyStyled = styled(ModalBody)``;

export default {
  ModalHeaderStyled,
  ModalBodyStyled,
};
