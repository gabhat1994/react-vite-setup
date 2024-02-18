import {
  createContext,
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router';
import { captureException } from '@sentry/react';
import { type ThemeOutput } from '@/apollo/generated/types';
import { useAuth } from '@/features/auth/contexts';
import { useToast } from '@/hooks/toast';
import {
  useGetAllThemesQuery,
  useUpdateProjectChamberMutation,
} from '@/apollo/graphql';
import { generateStyleFromTheme } from '@/utils/generateStyle';
import { generateFonts } from '@/utils/generateFont';
import { type TFonts } from '@/common/types';
import { DefaultFonts } from '@/screens/Chamber/components/ThemePanel/constants';
import { UserUtil } from '@/utils/user';

type TThemeContext = {
  themes: Array<ThemeOutput | null | undefined>;
  isFetchingThemes: boolean;
  selectedThemeId: string | undefined;
  selectedFonts: TFonts;
  setSelectedThemeId: Dispatch<SetStateAction<string | undefined>>;
  isSettingTheme: boolean;
  onChangeTheme: (noumId: string, id?: string) => void;
  onChangeFonts: (noumId: string, fonts: TFonts) => void;
  setSelectedFonts: Dispatch<SetStateAction<TFonts>>;
  onReset: (noumId: string) => void;
};

const ThemeContext = createContext<TThemeContext>({
  themes: [],
  isFetchingThemes: false,
  selectedThemeId: undefined,
  setSelectedThemeId: () => {},
  isSettingTheme: false,
  onChangeTheme: () => {},
  selectedFonts: DefaultFonts,
  setSelectedFonts: () => {},
  onChangeFonts: () => {},
  onReset: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();
  const { addToast } = useToast();

  const isAuthenticated = useMemo(
    () => !!user?._id && !UserUtil.isUnauthenticated(user),
    [user],
  );

  const { loading, data: themesData } = useGetAllThemesQuery({
    onError: (error) => {
      captureException(error, {
        tags: {
          section: 'fetchAllThemes',
        },
      });
      addToast('error', 'none', `${error.message}`);
    },
    skip: !isAuthenticated,
  });

  const themes = useMemo(
    () =>
      (themesData?.getAllThemes?.data ?? []).reduce(
        (arr: Array<ThemeOutput | null | undefined>, element) => {
          if (element?.name === 'Default') {
            return [element, ...arr];
          }
          return [...arr, element];
        },
        [],
      ),
    [themesData?.getAllThemes?.data],
  );

  const [selectedThemeId, setSelectedThemeId] = useState<string | undefined>(
    themes[0]?._id,
  );

  const [selectedFonts, setSelectedFonts] = useState<TFonts>(DefaultFonts);
  const selectedTheme = useMemo(
    () => themes.find((theme) => theme?._id === selectedThemeId),
    [themes, selectedThemeId],
  );

  const [setNoumTheme, { loading: isSettingTheme }] =
    useUpdateProjectChamberMutation();

  const onChangeTheme = useCallback(
    (noumId: string, id?: string) => {
      if (isSettingTheme) return;
      if (id && noumId) {
        setNoumTheme({
          variables: { id: noumId, input: { theme: id } },
          onCompleted: (data) => {
            if (data) {
              setSelectedThemeId(id);
            }
          },
        });
      }
    },
    [setNoumTheme, isSettingTheme],
  );

  const onChangeFonts = useCallback(
    (noumId: string, fonts: TFonts) => {
      if (isSettingTheme) return;
      if (fonts && noumId && Object.keys(fonts).length) {
        setNoumTheme({
          variables: { id: noumId, input: { fonts } },
          onCompleted: (data) => {
            if (data) {
              const font = {
                ...fonts,
                footnote: fonts?.body,
                input: fonts?.body,
                link: fonts?.body,
                systeminfo: fonts?.body,
              };
              setSelectedFonts(font);
            }
          },
        });
      }
    },
    [setNoumTheme, isSettingTheme],
  );
  const onReset = useCallback(
    (noumId: string) => {
      setNoumTheme({
        variables: {
          id: noumId,
          input: { fonts: DefaultFonts, theme: themes[0]?._id },
        },
        onCompleted: (data) => {
          if (data) {
            setSelectedFonts(DefaultFonts);
            setSelectedThemeId(themes[0]?._id);
          }
        },
      });
    },
    [setNoumTheme, themes],
  );
  const payload: TThemeContext = useMemo(
    () => ({
      themes,
      isFetchingThemes: loading,
      selectedThemeId,
      setSelectedThemeId,
      isSettingTheme,
      onChangeTheme,
      setSelectedFonts,
      selectedFonts,
      onChangeFonts,
      onReset,
    }),
    [
      themes,
      loading,
      selectedThemeId,
      isSettingTheme,
      onChangeTheme,
      selectedFonts,
      onChangeFonts,
      onReset,
    ],
  );

  const canApplyTheme = useMemo(
    () =>
      location.pathname.startsWith('/post/') ||
      location.pathname.startsWith('/noum/'),
    [location.pathname],
  );

  useEffect(() => {
    const noumStyleId = 'noum-custom-style';
    if (selectedTheme?.name && canApplyTheme) {
      document.getElementById(noumStyleId)?.remove();
      const style = document.createElement('style');
      style.id = noumStyleId;
      document.head.appendChild(style);
      style.innerHTML = generateStyleFromTheme(selectedTheme);
    } else if (!canApplyTheme) {
      setSelectedThemeId(undefined);
      document.getElementById(noumStyleId)?.remove();
    }
  }, [canApplyTheme, selectedTheme]);

  useEffect(() => {
    const noumFontStyleId = 'noum-custom-font';
    if (selectedFonts && canApplyTheme) {
      document.getElementById(noumFontStyleId)?.remove();
      const style = document.createElement('style');
      style.id = noumFontStyleId;
      document.head.appendChild(style);
      style.innerHTML = generateFonts(selectedFonts);
    } else if (!canApplyTheme) {
      setSelectedFonts(DefaultFonts);
      document.getElementById(noumFontStyleId)?.remove();
    }
  }, [canApplyTheme, selectedFonts]);

  return (
    <ThemeContext.Provider value={payload}>{children}</ThemeContext.Provider>
  );
};
