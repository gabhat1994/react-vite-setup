import { type FC } from 'react';
import { Separator } from '@/components/Separator/Separator';
import { Stack } from '@/layout';

type EditBlockProps = {
  separatorSize?: string;
  children?: JSX.Element;
};

const EditBlockWrapper: FC<EditBlockProps> = ({ separatorSize, children }) => (
  <>
    {separatorSize && (
      <Separator fullWidth size={separatorSize} noMargin={true} />
    )}
    <Stack
      vertical
      fullWidth
      data-testid="edit-block-wrapper"
      style={{ padding: '16px 12px' }}
      aria-label="edit_block_wrapper"
    >
      {children}
    </Stack>
  </>
);

export default EditBlockWrapper;
