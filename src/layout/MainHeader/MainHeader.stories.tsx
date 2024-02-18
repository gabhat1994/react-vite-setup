import { type Meta, type StoryFn } from '@storybook/react';
import styled from 'styled-components';
import { type Ref, createRef } from 'react';
import { Header } from '@/components/Header';
import { MainHeaderInner } from './MainHeader';
import { type MainHeaderProps } from './types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  height: 90vh;
  background-color: var(--bg-body-neutral-alt-highlighted));
  padding: 10px 10px;
`;

export default {
  title: 'UI/Header/Main',
  component: MainHeaderInner,
  argTypes: {
    coins: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
    },
    calendars: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
    },
    notifications: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
    },
    messages: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
    },
    avatar: {
      control: { type: 'text' },
    },

    userName: {
      control: { type: 'text' },
    },
  },
} as Meta<typeof MainHeaderInner>;

const Template: StoryFn<typeof MainHeaderInner> = ({
  coins,
  calendars,
  notifications,
  messages,
  avatar,
  userName,
}: MainHeaderProps) => {
  const ref: Ref<HTMLDivElement> = createRef();
  return (
    <Wrapper ref={ref}>
      <Header>
        <MainHeaderInner
          coins={coins}
          calendars={calendars}
          notifications={notifications}
          messages={messages}
          avatar={avatar}
          userName={userName}
        />
      </Header>
    </Wrapper>
  );
};

export const MainHeaderWithProps = {
  render: Template,

  args: {
    coins: 100,
    calendars: 1,
    notifications: 1,
    messages: 1,
    avatar: 'https://www.w3schools.com/howto/img_avatar2.png',
    userName: 'Jack',
  },
};
