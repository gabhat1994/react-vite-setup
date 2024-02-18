import { type Meta } from '@storybook/react';
import styled from 'styled-components';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { SideModal } from './SideModal';
import { type SideModalProps } from './types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  height: 100%;
  gap: 16px;
  text-align: center;
`;

export default {
  title: 'Atoms/SideModal',
  component: SideModal,
} as Meta<typeof SideModal>;

export const Primary = {
  render: (args: SideModalProps) => (
    <Wrapper>
      <SideModal {...args} topOffset={0} title="Events">
        <Container>
          <TSpan font="body-l" colorToken="--text-body-neutral-default">
            Show your best side! Customize your Chambers and express yourself by
            adding tools designed to help you grow.
          </TSpan>
          <TSpan font="body-l" colorToken="--text-body-neutral-default">
            &#128161; Remember to save the changes
          </TSpan>
          <Button primary align="center" size="full">
            Let&apos;s Start
          </Button>
        </Container>
      </SideModal>
    </Wrapper>
  ),
};
export const ModalWithCloseButton = {
  render: (args: SideModalProps) => (
    <Wrapper>
      <SideModal {...args} topOffset={0} title="Edits" showCloseButton>
        <Container>
          <TSpan font="heading-s-bold" colorToken="--text-body-neutral-default">
            You&apos;re in Edit Mode
          </TSpan>
          <TSpan font="body-l" colorToken="--text-body-neutral-default">
            Show your best side! Customize your Chambers and express yourself by
            adding tools designed to help you grow.
          </TSpan>
          <TSpan font="body-l" colorToken="--text-body-neutral-default">
            &#128161; Remember to save the changes
          </TSpan>
          <Button primary align="center" size="full">
            Let&apos;s Start
          </Button>
        </Container>
      </SideModal>
    </Wrapper>
  ),
};
