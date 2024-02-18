import { type Meta } from '@storybook/react';
import styled from 'styled-components';
import { t } from 'i18next';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Modal } from './Modal';
import { type IModal } from './types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  height: 100%;
  gap: 16px;
  text-align: center;
`;

export default {
  title: 'Atoms/Modal',
  component: Modal,
} as Meta<typeof Modal>;

export const Primary = {
  render: (args: IModal) => (
    <Wrapper>
      <Modal {...args}>
        <Container>
          <TSpan
            font="heading-s-bold"
            colorToken="--text-modal-neutral-highlighted"
          >
            You&apos;re in Edit Mode
          </TSpan>
          <TSpan font="body-l" colorToken="--text-modal-neutral-default">
            {t(`noumena.container.chamber_edit_mode.body`)}
          </TSpan>
          <TSpan font="body-l" colorToken="--text-modal-neutral-default">
            {t(`noumena.container.chamber_edit_mode.body.remember`)}
          </TSpan>
          <Button primary align="center" size="full">
            Let&apos;s Start
          </Button>
        </Container>
      </Modal>
    </Wrapper>
  ),
};
