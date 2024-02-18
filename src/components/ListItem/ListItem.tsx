import React from 'react';
import * as S from './styles';

interface ListItemProps {
  icon?: JSX.Element;
  title: string | JSX.Element;
  subtitle?: string | JSX.Element;
  action?: JSX.Element;
  onClick?: () => void;
}

export function ListItem({
  icon,
  title,
  subtitle,
  action,
  onClick,
}: ListItemProps) {
  return (
    <S.Container role="button" onClick={onClick}>
      {icon && <S.IconContainer>{icon}</S.IconContainer>}
      <S.BodyContainer>
        {React.isValidElement(title) ? title : <S.Title>{title}</S.Title>}
        {subtitle ? (
          React.isValidElement(subtitle) ? (
            subtitle
          ) : (
            <S.Subtitle>{subtitle}</S.Subtitle>
          )
        ) : null}
      </S.BodyContainer>
      {action && <S.ActionContainer>{action}</S.ActionContainer>}
    </S.Container>
  );
}
