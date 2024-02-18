import { type DeepPartial } from 'react-hook-form';

export type PickRequiredRestDeepPartial<T, K extends keyof T> = Required<
  Pick<T, K>
> &
  DeepPartial<Omit<T, K>>;

export type PickRequired<T, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>;

export interface HTMLAudioElementSinkId extends HTMLAudioElement {
  setSinkId(sinkId: string): Promise<void>;
}
