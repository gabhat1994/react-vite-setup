import styled from 'styled-components';
import { type Meta } from '@storybook/react';
import { TSpan } from './Typography';

const Font = styled.div`
  margin-bottom: 8px;
`;

type TypographyStoryProps = {
  backgroundColor: string;
};

export const Inputs = {
  render: ({ backgroundColor }: TypographyStoryProps) => (
    <>
      <Font>
        <TSpan font="heading-xxl" background={backgroundColor}>
          Heading XX-Large
        </TSpan>
      </Font>
      <Font>
        <TSpan font="heading-xxl-bold" background={backgroundColor}>
          Heading XX-Large Bold
        </TSpan>
      </Font>
      <Font>
        <TSpan font="heading-xl" background={backgroundColor}>
          Heading X-Large
        </TSpan>
      </Font>
      <Font>
        <TSpan font="heading-xl-bold" background={backgroundColor}>
          Heading X-Large Bold
        </TSpan>
      </Font>
      <Font>
        <TSpan font="heading-l" background={backgroundColor}>
          Heading Large
        </TSpan>
      </Font>
      <Font>
        <TSpan font="heading-l-bold" background={backgroundColor}>
          Heading Large Bold
        </TSpan>
      </Font>
      <Font>
        <TSpan font="heading-m" background={backgroundColor}>
          Heading Medium
        </TSpan>
      </Font>
      <Font>
        <TSpan font="heading-m-bold" background={backgroundColor}>
          Heading Medium Bold
        </TSpan>
      </Font>
      <Font>
        <TSpan font="heading-s" background={backgroundColor}>
          Heading Small
        </TSpan>
      </Font>
      <Font>
        <TSpan font="heading-s-bold" background={backgroundColor}>
          Heading Small Bold
        </TSpan>
      </Font>
      <Font>
        <TSpan font="heading-xs" background={backgroundColor}>
          Heading X-Small
        </TSpan>
      </Font>
      <Font>
        <TSpan font="heading-xs-bold" background={backgroundColor}>
          Heading X-Small Bold
        </TSpan>
      </Font>
      <hr />
      <Font>
        <TSpan font="body-xl" background={backgroundColor}>
          Body X-Large
        </TSpan>
      </Font>
      <Font>
        <TSpan font="body-xl-bold" background={backgroundColor}>
          Body X-Large Bold
        </TSpan>
      </Font>
      <Font>
        <TSpan font="body-l" background={backgroundColor}>
          Body Large
        </TSpan>
      </Font>
      <Font>
        <TSpan font="body-l-bold" background={backgroundColor}>
          Body Large Bold
        </TSpan>
      </Font>
      <Font>
        <TSpan font="body-m" background={backgroundColor}>
          Body Medium
        </TSpan>
      </Font>
      <Font>
        <TSpan font="body-m-bold" background={backgroundColor}>
          Body Medium Bold
        </TSpan>
      </Font>
      <hr />
      <Font>
        <TSpan font="button-m" background={backgroundColor}>
          Button Medium
        </TSpan>
      </Font>
      <Font>
        <TSpan font="button-s" background={backgroundColor}>
          Button Small
        </TSpan>
      </Font>
      <hr />
      <Font>
        <TSpan font="link-xl" background={backgroundColor}>
          Link X-Large
        </TSpan>
      </Font>
      <Font>
        <TSpan font="link-l" background={backgroundColor}>
          Link Large
        </TSpan>
      </Font>
      <Font>
        <TSpan font="link-m" background={backgroundColor}>
          Link Medium
        </TSpan>
      </Font>
      <Font>
        <TSpan font="link-s" background={backgroundColor}>
          Link Small
        </TSpan>
      </Font>
      <hr />
      <Font>
        <TSpan font="footnote" background={backgroundColor}>
          Footnote
        </TSpan>
      </Font>
      <Font>
        <TSpan font="footnote-bold" background={backgroundColor}>
          Footnote Bold
        </TSpan>
      </Font>
      <hr />
      <Font>
        <TSpan font="input-m" background={backgroundColor}>
          Input Medium
        </TSpan>
      </Font>
      <Font>
        <TSpan font="input-s" background={backgroundColor}>
          Input Small
        </TSpan>
      </Font>
    </>
  ),
};

export default {
  title: 'Design System/Typography',
  Component: Inputs,
  argTypes: {
    backgroundColor: {
      control: {
        type: 'color',
      },
    },
  },
} as Meta<typeof Inputs>;
