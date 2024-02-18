import S from './styles';

import type * as Types from './types';

function Main({ children }: Types.TMain) {
  return <S.Main>{children}</S.Main>;
}

function Card({ children }: Types.TCard) {
  return <S.Card>{children}</S.Card>;
}

export const Layout = { Main, Card };
