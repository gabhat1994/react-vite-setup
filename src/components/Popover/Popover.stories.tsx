import { type Meta } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';
import { TextField } from '../TextField';

import Popover, { BasicPopoverContent } from './Popover';

const Container = styled.div`
  background-color: #fff;
  padding: 32px;
  width: 80%;
  min-height: 100vh;
`;

export default {
  title: 'Atoms/Popover',
  component: Popover,
  argTypes: {},
} as Meta<typeof Popover>;

export const Basic = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <Popover
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        renderContent={({ childDimensions }) => (
          <BasicPopoverContent $width={childDimensions.width}>
            Content
          </BasicPopoverContent>
        )}
        position="bottom"
      >
        <TextField
          label="Open popover on focus"
          onFocus={() => setIsOpen(true)}
          inputSize="small"
        />
      </Popover>
    </Container>
  );
};
