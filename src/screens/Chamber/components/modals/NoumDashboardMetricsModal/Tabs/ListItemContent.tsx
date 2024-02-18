import { type Maybe } from '@/apollo/generated/types';
import { type SpaceOutputFragment } from '@/apollo/graphql';
import { Avatar } from '@/components/Avatar/Avatar';
import { type ChamberBoxNameEnum } from '@/components/ChamberBox/types';
import { TSpan } from '@/components/Typography';
import { useAuth } from '@/features/auth/contexts';
import { Stack } from '@/layout';
import { colorsOfCategory } from '@/screens/Chambers/constants';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { getFullName } from '@/utils/fullName';
import { UserUtil } from '@/utils/user';
import { format } from 'date-fns';
import { t } from 'i18next';
import { forwardRef, useCallback, type Ref } from 'react';
import { NoumDashboardMetricsModalTabEnum } from '../types';
import {
  ContentContainer,
  LinkedTagLabel,
  LinkUnderline,
  UserDetailStack,
} from './styles';

interface IListItemContent {
  item: Maybe<SpaceOutputFragment>;
  selectedTab: NoumDashboardMetricsModalTabEnum;
  gap?: number;
}

export const ListItemContent = forwardRef(
  ({ item, gap, selectedTab }: IListItemContent, ref: Ref<HTMLDivElement>) => {
    const { isUnregistered } = useAuth();
    const handleClick = useCallback(() => {
      if (isUnregistered || item?.uid?.userStatus === 'UNREGISTERED') return;
      window.open(`/noum/${item?._id}`, '_self');
    }, [item, isUnregistered]);

    return (
      <>
        <ContentContainer
          data-testid="list_item_container"
          ref={ref}
          onClick={handleClick}
          unregistered={isUnregistered}
        >
          <Stack gap={gap} align="center">
            <Avatar url={UserUtil.getProfilePicture(item?.uid) || ''} />
            <UserDetailStack vertical>
              <TSpan
                font="body-m-bold"
                colorToken="--text-tablecell-header-neutral-highlighted"
              >
                {getFullName(
                  item?.uid?.firstName,
                  item?.uid?.middleName,
                  item?.uid?.lastName,
                )}
              </TSpan>
              <TSpan
                font="footnote"
                colorToken="--text-tablecell-header-neutral-default"
              >
                <span>{item?.uid?.title || ''}</span>
              </TSpan>
              {(selectedTab === NoumDashboardMetricsModalTabEnum.Connected ||
                selectedTab ===
                  NoumDashboardMetricsModalTabEnum.Disconnected) && (
                <TSpan
                  font="footnote"
                  colorToken="--text-timestamp-neutral-default"
                >
                  {selectedTab === NoumDashboardMetricsModalTabEnum.Connected
                    ? t('noumena.noum.dashboard.connection_date')
                    : t('noumena.noum.dashboard.disconnection_date')}
                  {format(
                    new Date(item?.approvedAt || new Date()),
                    'dd MMM yyyy',
                  )}
                </TSpan>
              )}
            </UserDetailStack>
          </Stack>
          {item?.category?.name && (
            <LinkedTagLabel
              bgColor={
                colorsOfCategory[
                  item.category.name.toLowerCase() as ChamberBoxNameEnum
                ].bgColor
              }
              color={
                colorsOfCategory[
                  item.category.name.toLowerCase() as ChamberBoxNameEnum
                ].color
              }
            >
              {capitalizeFirstLetter(item.category.name)}
            </LinkedTagLabel>
          )}
        </ContentContainer>
        <LinkUnderline />
      </>
    );
  },
);
