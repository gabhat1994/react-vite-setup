import { type Maybe } from '@/apollo/generated/types';
import { type SpaceOutputFragment } from '@/apollo/graphql';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from 'react';

export enum WalletViewMode {
  DEFAULT = 'default',
  FULLDATA = 'full-data',
}

interface IWalletElementContext {
  loading: boolean;
  space: SpaceOutputFragment | undefined;
  spaceId: Maybe<string> | undefined;
  viewMode: WalletViewMode;
  setViewMode: (value: WalletViewMode) => void;
}

const initialValue: IWalletElementContext = {
  loading: false,
  space: undefined,
  spaceId: undefined,
  viewMode: WalletViewMode.DEFAULT,
  setViewMode: () => {},
};

const WalletElementContext = createContext<IWalletElementContext>(initialValue);

export const WalletElementProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const deviceType = useDeviceType();
  const { loading, space } = useNoumContext();
  const [viewMode, changeViewMode] = useState<WalletViewMode>(
    WalletViewMode.DEFAULT,
  );
  const setViewMode = useCallback(
    (value: WalletViewMode) => {
      if (deviceType === DeviceTypeEnum.MOBILE) {
        changeViewMode(value);
      } else {
        changeViewMode(WalletViewMode.DEFAULT);
      }
    },
    [deviceType],
  );

  useEffect(() => {
    if (deviceType === DeviceTypeEnum.MOBILE)
      changeViewMode(WalletViewMode.FULLDATA);
  }, [deviceType]);

  useEffect(() => {
    if (deviceType !== DeviceTypeEnum.MOBILE)
      changeViewMode(WalletViewMode.DEFAULT);
  }, [deviceType]);

  const value = useMemo(
    () => ({
      loading,
      spaceId: space?._id,
      space,
      viewMode,
      setViewMode,
    }),
    [loading, space, viewMode, setViewMode],
  );

  return (
    <WalletElementContext.Provider value={value}>
      {children}
    </WalletElementContext.Provider>
  );
};
