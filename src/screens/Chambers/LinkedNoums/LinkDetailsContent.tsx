import { t } from 'i18next';
import { forwardRef, type Ref } from 'react';
import { Avatar } from '@/components/Avatar/Avatar';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { type ChamberBoxNameEnum } from '@/components/ChamberBox/types';
import { formatRelativeVariant } from '@/utils/date';
import { LinkContainer, LinkedTagLabel, LinkUnderline } from '../styles';
import { colorsOfCategory } from '../constants';
import { LinkedNoumEnum } from '../types';
import type ILinkRequest from './types';

const LinkDetailsContent = forwardRef(
  (
    { name, title, profileImage, category, updateAt, tabId }: ILinkRequest,
    ref: Ref<HTMLDivElement>,
  ) => (
    <>
      <LinkContainer ref={ref}>
        <Stack justify="space-between" align="center">
          <Stack gap={12} align="center">
            <Avatar url={profileImage} />
            <Stack vertical style={{ width: 'calc(100% - 52px)' }}>
              <TSpan
                singleLine
                font="body-m-bold"
                colorToken="--text-tablecell-header-neutral-highlighted"
              >
                {name}
              </TSpan>
              <TSpan
                font="footnote"
                colorToken="--text-tablecell-header-neutral-default"
              >
                <span>{title}</span>
              </TSpan>
              {updateAt && (
                <TSpan
                  font="footnote"
                  colorToken="--text-timestamp-neutral-default"
                >
                  {tabId === LinkedNoumEnum.Connection
                    ? t('noumena.chamber.link.connection_date')
                    : t('noumena.chamber.link.following_date')}
                  {formatRelativeVariant(updateAt, 'date', 'long', 'other')}
                </TSpan>
              )}
            </Stack>
          </Stack>
          {category && (
            <LinkedTagLabel
              bgColor={
                colorsOfCategory[category.toLowerCase() as ChamberBoxNameEnum]
                  .bgColor
              }
              color={
                colorsOfCategory[category.toLowerCase() as ChamberBoxNameEnum]
                  .color
              }
            >
              {capitalizeFirstLetter(category ?? '')}
            </LinkedTagLabel>
          )}
        </Stack>
      </LinkContainer>
      <LinkUnderline />
    </>
  ),
);

export default LinkDetailsContent;
