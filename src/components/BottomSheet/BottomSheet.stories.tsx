import { type Meta } from '@storybook/react';
import styled from 'styled-components';
import { t } from 'i18next';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { BottomSheet } from './BottomSheet';
import { type IBottomSheet } from './types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 16px;
  text-align: center;
`;

export default {
  title: 'Atoms/BottomSheet',
  component: BottomSheet,
} as Meta<typeof BottomSheet>;

export const Primary = {
  render: (args: IBottomSheet) => (
    <Wrapper>
      <BottomSheet {...args}>
        <Container>
          <TSpan
            font="heading-s-bold"
            colorToken="--text-card-brand-primary-default"
          >
            You&apos;re in Edit Mode
          </TSpan>
          <TSpan font="body-l" colorToken="--text-card-brand-primary-default">
            {t(`noumena.container.chamber_edit_mode.body`)}
          </TSpan>
          <TSpan font="body-l" colorToken="--text-card-brand-primary-default">
            {t(`noumena.container.chamber_edit_mode.body.remember`)}
          </TSpan>
          <Button primary align="center" size="full">
            Let&apos;s Start
          </Button>
        </Container>
      </BottomSheet>
    </Wrapper>
  ),
};
