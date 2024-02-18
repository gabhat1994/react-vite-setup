import { useAuth } from '@/features/auth/contexts';
import { useMemo } from 'react';
import ProductFruitsProvider from 'react-product-fruits';

const ANONYMOUS_USER_ID = '__guest__';

export function ProductFruits() {
  const { user } = useAuth();

  const userInfo = useMemo(() => {
    const username = user?.username ?? ANONYMOUS_USER_ID;

    if (!username) {
      return null;
    }

    return {
      username,
      email: user?.email,
      firstname: user?.firstName,
      lastname: user?.lastName,
      signUpAt: user?.createdAt,
      props: { phoneNumber: user?.phone || '' },
    };
  }, [user]);

  const projectCode = process.env.VITE_FRUIT_PROJECT_CODE;

  if (!userInfo || !projectCode) {
    return null;
  }
  return (
    <ProductFruitsProvider
      projectCode={projectCode}
      language="en"
      {...userInfo}
    />
  );
}
