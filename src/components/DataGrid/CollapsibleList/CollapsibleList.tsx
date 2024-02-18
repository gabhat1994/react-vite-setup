import React from 'react';
import { Accordion } from '@/components/Accordion';
import { Stack } from '@/layout';
import { useDataGrid } from '../DataGridContext';
import { type AnyObject } from '../types';
import { RowSelectionCheckbox } from '../RowSelection/Checkbox';
import { CollapsibleListSkeleton } from './CollapsibleListSkeleton';

interface CollapsibleListProps<T> {
  data?: T[];
  loading?: boolean;
  keyExtractor: (item: T) => string;
  enableRowSelection?: boolean;
  rowsPerPage?: number;
  renderLeft: (item: T) => JSX.Element;
  renderRight: (item: T) => JSX.Element;
  renderContent: (item: T) => JSX.Element;
}

export function CollapsibleList<DataItem extends AnyObject>({
  data = [],
  loading,
  keyExtractor,
  renderLeft,
  renderRight,
  renderContent,
  rowsPerPage = 10,
  enableRowSelection = false,
}: CollapsibleListProps<DataItem>) {
  const { rowSelection } = useDataGrid<DataItem>();
  const [expandedId, setExpandedId] = React.useState<string>();

  return (
    <Stack vertical fullWidth>
      {loading ? (
        <CollapsibleListSkeleton rowsCount={rowsPerPage} />
      ) : (
        <>
          {data.map((item) => (
            <Accordion
              key={keyExtractor(item)}
              expanded={expandedId === keyExtractor(item)}
              onToggle={() => {
                if (expandedId === keyExtractor(item)) {
                  setExpandedId(undefined);
                } else {
                  setExpandedId(keyExtractor(item));
                }
              }}
              title=""
              headerPadding="8px 0"
              left={
                <>
                  {enableRowSelection && (
                    <RowSelectionCheckbox
                      isChecked={rowSelection.isSelected(keyExtractor(item))}
                      onChange={(checked) =>
                        checked
                          ? rowSelection.selectOne(keyExtractor(item))
                          : rowSelection.removeOne(keyExtractor(item))
                      }
                    />
                  )}
                  {renderLeft(item)}
                </>
              }
              right={renderRight(item)}
            >
              {renderContent(item)}
            </Accordion>
          ))}
        </>
      )}
    </Stack>
  );
}
