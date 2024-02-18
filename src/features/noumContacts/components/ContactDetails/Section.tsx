import { type ReactNode } from 'react';
import S from './styles';

interface SectionProps {
  children: ReactNode;
  title: string;
  hasErrors: boolean;
}

export function Section({ title, children, hasErrors }: SectionProps) {
  return (
    <S.Section>
      <S.Header>
        {hasErrors && <S.ErrorIcon />}
        <S.Title>{title}</S.Title>
      </S.Header>
      <S.Content>{children}</S.Content>
    </S.Section>
  );
}
