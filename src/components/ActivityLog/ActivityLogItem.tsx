import { format } from 'date-fns';
import React from 'react';
import { Icon } from '@/components/Icon';
import { type IconProps } from '../Icon/Icon';
import S from './styles';

export interface ActivityLogItemProps {
  iconName: IconProps['name'];
  description: React.ReactNode;
  timestamp: string | Date;
}

export function ActivityLogItem({
  iconName,
  description,
  timestamp,
}: ActivityLogItemProps) {
  return (
    <S.Container>
      <S.IconCell>
        <Icon name={iconName} size={16} color="--color-base-primary-main" />
      </S.IconCell>
      <S.BodyCell>
        <S.Description>{description}</S.Description>
        <S.DateText>
          {format(new Date(timestamp), 'dd/MM/yyyy, hh:mm a')}
        </S.DateText>
      </S.BodyCell>
    </S.Container>
  );
}
