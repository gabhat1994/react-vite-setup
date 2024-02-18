import { Icon } from '@/components/Icon';
import { TextField } from '@/components/TextField';

export function TopBarSearchInput() {
  return (
    <TextField
      inputSize="small"
      leftIcon={
        <Icon name="search_m" size={24} color="--icon-input-neutral-default" />
      }
    />
  );
}
