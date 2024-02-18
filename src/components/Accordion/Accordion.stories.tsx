import { useCallback, useMemo, useEffect, useState, createRef } from 'react';
import styled from 'styled-components';
import { type Meta } from '@storybook/react';

import { Button } from '@/components/Button';
import { type AccordionProps } from './types';
import { Accordion } from './Accordion';

type TExpanded = Record<string, boolean | undefined>;

type TAccordion = React.ElementRef<typeof Accordion>;
interface IMockData {
  name: string;
  title: string;
  content: string[];
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 680px;
  margin: 0 auto;
`;

const AccordionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 30px;
`;

const ButtonWrapper = styled.div`
  padding-top: 20px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  text-align: left;
  padding: 12px 20px;
  background-color: #f7f7f8;
  box-sizing: border-box;
  margin-top: 2px;
`;

export default {
  title: 'Atoms/Accordion',
  component: Accordion,
  argTypes: {
    borders: {
      options: ['top', 'right', 'bottom', 'left'],
      defaultValue: ['bottom'],
      control: { type: 'check' },
    },
    disabled: {
      options: [true, false, undefined],
      defaultValue: undefined,
      control: { type: 'radio' },
    },
    expanded: {
      options: [true, false, undefined],
      defaultValue: undefined,
      control: { type: 'radio' },
    },
    expandedOffsetBottom: {
      defaultValue: 0,
      control: { type: 'number', min: 0, max: 100, step: 5 },
    },
    expandedOffsetTop: {
      defaultValue: 0,
      control: { type: 'number', min: 0, max: 100, step: 5 },
    },
    offsetBottom: {
      defaultValue: 0,
      control: { type: 'number', min: 0, max: 100, step: 5 },
    },
    offsetTop: {
      defaultValue: 0,
      control: { type: 'number', min: 0, max: 100, step: 5 },
    },
    preExpanded: {
      options: [true, false, undefined],
      defaultValue: undefined,
      control: { type: 'radio' },
    },
    shadowOnExpand: {
      options: [true, false],
      defaultValue: undefined,
      control: { type: 'radio' },
    },
    subtitle: {
      control: { type: 'text' },
    },
    title: {
      control: { type: 'text' },
    },
    width: {
      defaultValue: '100%',
      control: { type: 'text' },
    },
  },
} as Meta<typeof Accordion>;

const PrimaryWithHooks = (props: AccordionProps) => {
  const [expanded, setExpanded] = useState<TExpanded | undefined>();

  useEffect(() => {
    if (expanded === undefined) {
      setExpanded({
        accordion1: props.expanded,
        accordion2: props.expanded,
      });
    }
  }, [expanded, props.expanded]);

  const onToggle = useCallback((name: string, isExpanded: boolean) => {
    setExpanded((e) => ({ ...(e || {}), [name]: isExpanded }));
  }, []);

  const accordionData: IMockData[] = useMemo(
    () => [
      {
        name: 'accordion1',
        title: 'Accordion 1',
        content: [
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
          'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium',
          'Nam libero tempore, cum soluta nobis est eligendi',
        ],
      },
      {
        name: 'accordion2',
        title: 'Accordion 2',
        content: [
          'Ut enim ad minima veniam, quis nostrum exercitationem',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        ],
      },
    ],
    [],
  );

  const refs = useMemo(
    () =>
      Array.from({ length: accordionData.length }).map(() =>
        createRef<TAccordion>(),
      ),
    [accordionData.length],
  );

  const onManualToggle = useCallback(
    (index: number) => {
      refs?.[index]?.current?.toggle();
    },
    [refs],
  );

  return (
    <Wrapper>
      {accordionData.map((datum, index) => (
        <AccordionWrapper key={datum.name}>
          <Accordion
            {...props}
            ref={refs[index]}
            title={props.title || datum.title}
            width={
              Number.isNaN(+(props.width || ''))
                ? props.width
                : +(props.width || '')
            }
            expanded={expanded?.[datum.name]}
            onToggle={(isExpanded: boolean) => onToggle(datum.name, isExpanded)}
          >
            {datum.content.map((content) => (
              <ContentWrapper key={`${datum.name}-${content.length}`}>
                {content}
              </ContentWrapper>
            ))}
          </Accordion>
          <ButtonWrapper>
            <Button
              textOnly
              title="Control toggle out side of the accordion"
              onClick={() => onManualToggle(index)}
            >
              Toggle
            </Button>
          </ButtonWrapper>
        </AccordionWrapper>
      ))}
    </Wrapper>
  );
};

export const Primary = {
  render: PrimaryWithHooks,
};
