import { type LDFlagChangeset, type LDUser } from 'launchdarkly-js-client-sdk';
import {
  useFlags,
  useLDClient,
  withLDProvider,
} from 'launchdarkly-react-client-sdk';

import {
  type ComponentType,
  createContext,
  type FC,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { camelCase } from 'lodash';
import {
  defaultFeatureFlags,
  featureFlagNames,
  type FeatureFlagsMap,
} from './config';

export const LaunchDarklyContext = createContext<{
  user: object | null;
  flags: FeatureFlagsMap;
  setUser: (user: LDUser) => void;
  identifyUser: (user: LDUser) => void;
  initialized: boolean;
  setInitialized: (value: boolean) => void;
  init: () => void;
}>({
  user: null,
  flags: defaultFeatureFlags,
  setUser: () => {},
  identifyUser: () => {},
  initialized: false,
  setInitialized: () => {},
  init: () => {},
});

export const LaunchDarklyProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<LDUser>({});
  const [initialized, setInitialized] = useState(false);
  const client = useLDClient();
  const ldFlags = useFlags<FeatureFlagsMap>();
  const [flags, setFlags] = useState<FeatureFlagsMap>(ldFlags);
  const init = useCallback(() => {
    if (client) {
      const ldUser = client?.getUser();
      setUser({ ...ldUser });
      setInitialized(true);
      setFlags({ ...ldFlags });
    }
  }, [client, ldFlags]);

  const identifyUser = useCallback(
    (userData: LDUser) => {
      client?.identify(userData);
      setUser(userData);
    },
    [client],
  );

  useEffect(() => {
    init();
    client?.on('change', (settings: LDFlagChangeset) => {
      const newFlags = { ...ldFlags };
      Object.keys(settings).forEach((flagKey) => {
        const camelCaseKey = featureFlagNames.find(
          (flagName) => flagName === camelCase(flagKey),
        );
        if (camelCaseKey) {
          newFlags[camelCaseKey] = settings[flagKey].current;
        }
      });
      setFlags(newFlags);
    });
  }, [client, init, ldFlags]);

  const payload = useMemo(
    () => ({
      user,
      setUser,
      initialized,
      setInitialized,
      init,
      flags,
      identifyUser,
    }),
    [user, initialized, init, flags, identifyUser],
  );

  return (
    <LaunchDarklyContext.Provider value={payload}>
      {children}
    </LaunchDarklyContext.Provider>
  );
};

export const LDProvider = withLDProvider({
  clientSideID: process.env.VITE_LD_KEY ?? '',
})(LaunchDarklyProvider as unknown as ComponentType<{}>) as FC<{
  children: ReactNode;
}>;
