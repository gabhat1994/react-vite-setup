import { Spinner } from './Spinner';
import { Stack } from '../../layout/Stack';

export default {
  title: 'Atoms/Spinner',
  component: Spinner,
};

export const Spinners = () => (
  <Stack>
    <Spinner color="var(--icon-spinner-brand-primary-highlighted)" />
  </Stack>
);
