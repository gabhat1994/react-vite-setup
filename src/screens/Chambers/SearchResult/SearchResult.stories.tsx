import styled from 'styled-components';

import { type Meta } from '@storybook/react';

import { SearchResult } from './SearchResult';
import { type SearchResultProps } from './types';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const data: string[] = ['Text 1', 'Text 2'];

export default {
  title: 'UI/SearchResult',
  component: SearchResult,
  argTypes: {
    offsetTop: {
      defaultValue: 100,
      control: { type: 'number' },
    },
    noResultText: {
      defaultValue: 'No results found',
      control: { type: 'text' },
    },
    noResultSubText: {
      defaultValue:
        'No results matching your criteria. Try adjusting your filters.',
      control: { type: 'text' },
    },
    isNoum: {
      options: [true, false, undefined],
      defaultValue: undefined,
      control: { type: 'radio' },
    },
  },
} as Meta<typeof SearchResult>;

export const Primary = {
  render: (props: SearchResultProps) => (
    <Wrapper>
      <SearchResult {...props}>
        {data.map((datum) => (
          <div>{datum}</div>
        ))}
      </SearchResult>
    </Wrapper>
  ),
};
