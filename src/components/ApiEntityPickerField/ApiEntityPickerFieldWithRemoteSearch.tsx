import { type PickRequired } from '@/utils/types';
import ApiEntityPickerField from './ApiEntityPickerField';
import { type ApiEntityPickerFieldProps } from './types';

export type ApiEntityPickerFieldWithRemoteSearchProps<
  Key extends string,
  Data extends unknown = Key,
> = PickRequired<ApiEntityPickerFieldProps<Key, Data>, 'onInputChange'>;

function ApiEntityPickerFieldWithRemoteSearch<
  Key extends string,
  Data extends unknown = Key,
>({ ...rest }: ApiEntityPickerFieldWithRemoteSearchProps<Key, Data>) {
  return <ApiEntityPickerField<Key, Data> {...rest} />;
}

export default ApiEntityPickerFieldWithRemoteSearch;
