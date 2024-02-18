import { type Meta } from '@storybook/react';
import styled from 'styled-components';
import { Icon } from '@/components/Icon';
import { LabelGroup, LabelWrap } from '@/components/StorybookHelpers/LabelWrap';
import { MainEventNotification } from './MainEventNotification';

export default {
  title: 'UI/SocialHall/MainEventNotification',
  component: MainEventNotification,
} as Meta<typeof MainEventNotification>;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border: 1px solid;
  display: flex;
  justify-content: center;
`;

export const All = () => (
  <>
    <LabelGroup columns={3} style={{ width: '1500px' }}>
      <LabelWrap label="Raise a hand">
        <Wrapper>
          <MainEventNotification
            isOpen={true}
            onDecline={() => {}}
            onConfirm={() => {}}
            description="You raised your hand. We will let the speaker know you want to talk"
            icon={<Icon imageIconName="raise_hand_m" size={24} />}
          />
        </Wrapper>
      </LabelWrap>
      <LabelWrap label="Invite to Stage">
        <Wrapper>
          <MainEventNotification
            isOpen={true}
            onDecline={() => {}}
            onConfirm={() => {}}
            showButtons
            description="Cate is inviting you to Stage to speak"
            icon={
              <Icon
                name="mic_on_m"
                size={24}
                color="--icon-card-placeholder-neutral-default"
              />
            }
          />
        </Wrapper>
      </LabelWrap>
      <LabelWrap label="Move to audience">
        <Wrapper>
          <MainEventNotification
            isOpen={true}
            onDecline={() => {}}
            onConfirm={() => {}}
            description="Cate moved you to the audience"
            icon={
              <Icon
                name="mic_off_m"
                size={24}
                color="--icon-card-placeholder-neutral-default"
              />
            }
          />
        </Wrapper>
      </LabelWrap>
    </LabelGroup>
  </>
);
