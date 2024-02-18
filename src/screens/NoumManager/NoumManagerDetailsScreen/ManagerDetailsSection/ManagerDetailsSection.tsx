import { TSpan } from '@/components';
import { Avatar } from '@/components/Avatar/Avatar';
import { AvatarSize } from '@/components/Avatar/Avatar/types';
import { MemberStatusTag } from '@/features/noums/components/MemberStatusTag';
import { Stack } from '@/layout';
import React from 'react';
import { format } from 'date-fns';
import { useNoumManagerDetailsProvider } from '../providers/NoumManagerDetailsProvider';
import { CardStyled } from '../styles';
import S from './styles';

type ManagerDetailsSectionProps = {};

export const ManagerDetailsSection: React.FC<
  ManagerDetailsSectionProps
> = () => {
  const { noum, member } = useNoumManagerDetailsProvider();

  if (!noum || !member) return null;

  return (
    <CardStyled>
      <Stack vertical gap={16}>
        <TSpan font="heading-xs-bold">Manager Details</TSpan>

        <S.ColumnsWrapper>
          <S.ColumnSection>
            <S.RowTitle>Noum:</S.RowTitle>

            <S.Row>
              <Avatar url={noum.profileImage} size={AvatarSize.M} />
              <TSpan
                font="body-m-bold"
                colorToken="--text-input-neutral-filled"
              >
                {noum.name}
              </TSpan>
            </S.Row>
          </S.ColumnSection>

          <S.ColumnSection>
            <S.RowTitle>Noum Wallet:</S.RowTitle>

            <S.Row>
              <TSpan
                font="body-m-bold"
                colorToken="--text-input-neutral-filled"
              >
                Daily Limit: $500.00 / 1.000,00
              </TSpan>
            </S.Row>
          </S.ColumnSection>

          <S.ColumnSection>
            <S.RowTitle>Status:</S.RowTitle>

            <S.Row>
              <MemberStatusTag member={member} />
            </S.Row>
          </S.ColumnSection>

          <S.ColumnSection>
            <S.RowTitle>Connected:</S.RowTitle>

            <S.Row>
              <TSpan
                font="body-m-bold"
                colorToken="--text-input-neutral-filled"
              >
                {member.connectedAt
                  ? format(new Date(member.connectedAt), 'MM/dd/yyyy, hh:mm a')
                  : '-'}
              </TSpan>
            </S.Row>
          </S.ColumnSection>
        </S.ColumnsWrapper>
      </Stack>
    </CardStyled>
  );
};
