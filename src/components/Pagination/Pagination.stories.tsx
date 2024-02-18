import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { type Meta } from '@storybook/react';

import { Card } from '@/components/Card';
import { Pagination, type PaginationProps } from '.';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 680px;
  margin: 0 auto;
  gap: 5px;
  padding: 15px 30px;
  background-color: var(--bg-card-neutral-default);
`;

export default {
  title: 'Atoms/Pagination',
  component: Pagination,
  argTypes: {
    breakLabel: {
      defaultValue: '...',
      control: { type: 'text' },
    },
    disabled: {
      options: [true, false, undefined],
      defaultValue: undefined,
      control: { type: 'radio' },
    },
    pageSize: {
      control: { type: 'number', min: 1 },
    },
    renderOnOnePageCount: {
      options: [true, false, undefined],
      defaultValue: undefined,
      control: { type: 'radio' },
    },
    siblingCount: {
      control: { type: 'number' },
    },
    totalCount: {
      defaultValue: 100,
      control: { type: 'number', min: 1, step: 1 },
    },
  },
} as Meta<typeof Pagination>;

const PrimaryWithHooks = (props: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const allData: string[] = useMemo(
    () =>
      Array.from({ length: props.totalCount }, (_, idx) => idx + 1).map(
        (i) => `Item ${i}`,
      ),
    [props.totalCount],
  );

  const currentPageData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * (props.pageSize || 10);
    const lastPageIndex = firstPageIndex + (props.pageSize || 10);

    return allData.slice(firstPageIndex, lastPageIndex);
  }, [allData, currentPage, props.pageSize]);

  return (
    <Wrapper>
      {currentPageData.map((pageData: string) => (
        <Card key={pageData}>{pageData}</Card>
      ))}
      <Pagination
        {...props}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </Wrapper>
  );
};

export const Primary = {
  render: PrimaryWithHooks,
};
