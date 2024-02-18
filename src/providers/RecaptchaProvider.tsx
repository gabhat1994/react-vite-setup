import {
  createContext,
  type FC,
  type ReactNode,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import styled from 'styled-components';
import { type Maybe } from '@/common/types';

export const RecaptchaContext = createContext<{
  token: Maybe<string>;
  refresh: () => void;
  returnNewReCaptcha: () => Promise<string>;
}>({
  token: null,
  refresh: () => {},
  // @ts-ignore
  returnNewReCaptcha: () => new Promise(() => {}),
});

export const RecaptchaProvider: FC<{
  children: ReactNode;
  siteKey?: string;
}> = (props) => {
  const siteKey = props.siteKey || process.env.VITE_SITEKEY_PUBLIC;

  const [token, setToken] = useState<Maybe<string>>(null);

  const onChange = useCallback((value?: Maybe<string>) => {
    // TODO TRACK WITH SENTRY
    setToken(typeof value === 'string' ? value : null);
  }, []);

  const onInitiate: () => void = useCallback(
    () =>
      // TODO TRACK WITH SENTRY
      window?.grecaptcha
        ?.execute?.(siteKey, { action: 'homepage' })
        .then(onChange)
        .catch(() => {
          onChange(null);
          // TODO TRACK WITH SENTRY
          window?.grecaptcha?.reset?.();
          onInitiate();
        }),
    [siteKey, onChange],
  );

  const returnNewReCaptcha = useCallback(async () => {
    await window?.grecaptcha?.reset?.();
    const value: string = await window?.grecaptcha?.execute?.(siteKey, {
      action: 'homepage',
    });
    onChange(value);
    return value;
  }, [siteKey, onChange]);

  const onExpired = useCallback(() => {
    // TODO TRACK WITH SENTRY
    if (window?.grecaptcha?.reset) {
      window?.grecaptcha?.reset();
    }
    onInitiate();
  }, [onInitiate]);

  const handleLoaded = useCallback(() => {
    window?.grecaptcha?.ready(() => {
      onExpired();
    });
  }, [onExpired]);

  useEffect(() => {
    // add recaptcha scripts to the document as a child
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    // on load run `handleLoaded` to start recaptcha
    script.addEventListener('load', handleLoaded);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [siteKey, handleLoaded]);

  const value = useMemo(
    () => ({ token, refresh: onExpired, returnNewReCaptcha }),
    [onExpired, returnNewReCaptcha, token],
  );

  return (
    <RecaptchaContext.Provider value={value}>
      {props.children}
      <StyledRecaptch
        data-testid="recaptcha"
        className="g-recaptcha"
        data-sitekey={siteKey!}
        data-size="invisible"
      />
    </RecaptchaContext.Provider>
  );
};

const StyledRecaptch = styled.div`
  display: none;
`;

export default RecaptchaProvider;
