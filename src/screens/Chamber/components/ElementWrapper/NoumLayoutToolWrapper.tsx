import { memo, useMemo } from 'react';
import { Stack } from '@/layout';
import { type NoumLayoutToolWrapperProps } from './types';

const NoumLayoutToolWrapper = memo((props: NoumLayoutToolWrapperProps) => {
  const { meta, children } = props;
  const cssAlign = useMemo(
    () => meta?.align?.toLowerCase() || 'center',
    [meta?.align],
  );
  return (
    <Stack fullWidth justify={cssAlign} data-testid="noum-layout-tool-wrapper">
      {children}
    </Stack>
  );
});

export default NoumLayoutToolWrapper;
