import { useState } from 'react';
import styled from 'styled-components';

import {
  AttendButton,
  AttendingButton,
  EditEventButton,
  GoLiveButton,
  InvitationButton,
  JoinEventButton,
} from '.';
import { type EventButtonProps } from './types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
  background: var(--bg-card-neutral-alt-default);
  padding: 50px;
  box-sizing: border-box;
  gap: 12px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default {
  title: 'UI/Event/EventButtons',
  argTypes: {
    flex: {
      defaultValue: '',
      control: { type: 'text' },
    },
    width: {
      defaultValue: '',
      control: { type: 'text' },
    },
    iconOnly: {
      options: [true, false],
      defaultValue: undefined,
      control: { type: 'radio' },
    },
    isLoading: {
      options: [true, false],
      defaultValue: undefined,
      control: { type: 'radio' },
    },
  },
};

const AllWithProps = (props: EventButtonProps) => {
  const [isAttending, setIsAttending] = useState<boolean>(false);

  return (
    <Wrapper>
      <Row>
        <AttendButton {...props} />
      </Row>
      <Row>
        <AttendingButton
          {...props}
          isAttending={isAttending}
          onAttending={() => setIsAttending(true)}
          onNotAttending={() => setIsAttending(false)}
        />
      </Row>
      <Row>
        <EditEventButton {...props} />
      </Row>
      <Row>
        <GoLiveButton {...props} />
      </Row>
      <Row>
        <InvitationButton
          {...props}
          onDecline={() => null}
          onAccept={() => null}
        />
      </Row>
      <Row>
        <JoinEventButton {...props} />
      </Row>
    </Wrapper>
  );
};
export const All = {
  render: AllWithProps,
};
