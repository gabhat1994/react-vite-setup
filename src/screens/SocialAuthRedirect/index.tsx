import { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { IdentityServices } from '@/services/rest/identity';
import { Spinner } from '@/components';
import accessLocalStorage from '@/constants/accessLocalStorage';
import routes from '@/constants/routes';
import { setLocalStorage } from '@/utils/localStorage';
import { useAuth } from '@/features/auth/contexts';
import { useToast } from '@/hooks';
import { ERROR_CODE_MAP, ErrorCodeEnum, Modes, PARAMS } from './constants';

interface AccessTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const SocialAuthRedirect = () => {
  const [searchParams] = useSearchParams();
  const { signIn, signUp } = useAuth();
  const { addErrorToast } = useToast();
  const navigate = useNavigate();
  const mode = searchParams.get(PARAMS.Mode);
  const accessToken = searchParams.get(PARAMS.AccessToken);
  const refreshToken = searchParams.get(PARAMS.RefreshToken);
  const errorCode = searchParams.get(PARAMS.ErrorCode) as ErrorCodeEnum;

  const handleError = useCallback(
    (isGeneric?: boolean) => {
      const route = mode === Modes.Login ? routes.LOGIN : routes.SIGN_UP;

      if (isGeneric) {
        addErrorToast(ERROR_CODE_MAP.generic);
        navigate(routes.LOGIN, { replace: true });
        return;
      }

      if (
        errorCode === ErrorCodeEnum.USER_CANCELLED ||
        errorCode === ErrorCodeEnum.USER_CANCELLED_AUTHORIZE ||
        errorCode === ErrorCodeEnum.USER_CANCELLED_LOGIN
      ) {
        navigate(route, { replace: true });
        return;
      }

      if (errorCode === ErrorCodeEnum.USER_NOT_EXISTS) {
        addErrorToast(ERROR_CODE_MAP[errorCode]);
        navigate(routes.SIGN_UP, { replace: true });
        return;
      }

      if (errorCode === ErrorCodeEnum.CONTACT_SUPPORT) {
        addErrorToast(ERROR_CODE_MAP[errorCode]);
        navigate(routes.LOGIN, { replace: true });
        return;
      }

      // Handle new error codes that are not yet handled in FE
      addErrorToast(ERROR_CODE_MAP.generic);
      navigate(route, { replace: true });
    },
    [addErrorToast, errorCode, mode, navigate],
  );

  useEffect(() => {
    async function handleSocialLogin() {
      if (errorCode) {
        handleError();
        return;
      }
      if (!mode || !refreshToken) {
        handleError(true);
        return;
      }
      const response = await IdentityServices.refreshToken(refreshToken);
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response as AccessTokenResponse;
      if (!newAccessToken || !newRefreshToken) {
        addErrorToast(ERROR_CODE_MAP.generic);
        navigate(routes.LOGIN, { replace: true });
      } else if (mode === Modes.Signup) {
        setLocalStorage(accessLocalStorage.ACCESS_TOKEN, newAccessToken);
        setLocalStorage(accessLocalStorage.REFRESH_TOKEN, newRefreshToken);
        signUp();
      } else if (mode === Modes.Login) {
        signIn({ accessToken: newAccessToken, refreshToken: newRefreshToken });
      }
    }
    handleSocialLogin();
  }, [
    accessToken,
    addErrorToast,
    errorCode,
    handleError,
    mode,
    navigate,
    refreshToken,
    signIn,
    signUp,
  ]);

  return <Spinner />;
};
