import { type WalletElementProps } from '../types';

export type WalletheaderProps = WalletElementProps & {
  spaceId: string;
  currentTitle?: string;
  children?: JSX.Element;
  refresh?: () => void;
  canManageWallet: boolean;
  subWalletId: string;
};
