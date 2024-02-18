import styled from 'styled-components';
import { type Meta } from '@storybook/react';

import { Color } from './Color';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

export default {
  title: 'Design System/Colors',
  component: Color,
} as Meta<typeof Color>;

export const Primary = () => (
  <>
    <Wrapper>
      <Color color="--color-base-primary-10" />
      <Color color="--color-base-primary-30" />
      <Color color="--color-base-primary-50" />
      <Color color="--color-base-primary-60" />
      <Color color="--color-base-primary-70" />
      <Color color="--color-base-primary-80" />
      <Color color="--color-base-primary-85" />
      <Color color="--color-base-primary-90" />
      <Color color="--color-base-primary-100" />
    </Wrapper>

    <Wrapper>
      <Color color="--color-base-success-10" />
      <Color color="--color-base-success-30" />
      <Color color="--color-base-success-50" />
      <Color color="--color-base-success-70" />
      <Color color="--color-base-success-80" />
      <Color color="--color-base-success-90" />
      <Color color="--color-base-success-100" />
    </Wrapper>

    <Wrapper>
      <Color color="--color-base-error-10" />
      <Color color="--color-base-error-30" />
      <Color color="--color-base-error-50" />
      <Color color="--color-base-error-70" />
      <Color color="--color-base-error-80" />
      <Color color="--color-base-error-90" />
      <Color color="--color-base-error-100" />
    </Wrapper>

    <Wrapper>
      <Color color="--color-base-warning-10" />
      <Color color="--color-base-warning-30" />
      <Color color="--color-base-warning-50" />
      <Color color="--color-base-warning-70" />
      <Color color="--color-base-warning-90" />
    </Wrapper>

    <Wrapper>
      <Color color="--color-base-gray-0" />
      <Color color="--color-base-gray-30" />
      <Color color="--color-base-gray-50" />
      <Color color="--color-base-gray-60" />
      <Color color="--color-base-gray-80" />
      <Color color="--color-base-gray-90" />
      <Color color="--color-base-gray-100" />
    </Wrapper>
  </>
);
