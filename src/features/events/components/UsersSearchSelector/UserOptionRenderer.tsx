import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { t } from 'i18next';

import { Spinner } from '@/components/Spinner';
import { useWindowDimensions } from '@/hooks/dimensions';

import { UserOptionItem } from './UserOptionItem';
import { type UserOptionRendererProps } from './types';
import {
  UsersOptionRendererContainer,
  UsersOptionsContainer,
  ItemGroupName,
  SpinnerContainer,
} from './styles';
import type { IUserDropdown } from '../../types/context';

export const UserOptionRenderer: React.FC<UserOptionRendererProps> = ({
  options,
  multiselect,
  activeItem,
  onlyFavorites,
  fetchMoreStatus,
  onSelect,
  onFetchMore,
  renderSearch,
  members,
  cohosts,
}) => {
  const observerRef = useRef<HTMLDivElement>(null);

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (!observerRef.current) return undefined;

    const observer = new IntersectionObserver((entities) => {
      if (entities.some((entity) => entity.isIntersecting)) {
        onFetchMore();
      }
    });

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [onFetchMore]);

  const showCheck = useMemo(() => {
    if (width < 768) return multiselect;

    return false;
  }, [multiselect, width]);

  const [favoriteMemberOptions, connectedMemberOptions, otherMemberOptions]: [
    IUserDropdown[],
    IUserDropdown[],
    IUserDropdown[],
  ] = useMemo(() => {
    const fOptions: IUserDropdown[] = [];
    const cOptions: IUserDropdown[] = [];
    const oOptions: IUserDropdown[] = [];

    options.forEach((o) => {
      if (o.type === 'value' && onlyFavorites) {
        fOptions.push(o);
      } else if (o.type === 'value' && o.value.isConnected) {
        cOptions.push(o);
      } else if (o.type === 'value' && !o.value.isConnected) {
        oOptions.push(o);
      }
    });

    return [fOptions, cOptions, oOptions];
  }, [onlyFavorites, options]);

  const onClickItem = useCallback(
    (v: IUserDropdown) => {
      if (v.disabled) return;
      onSelect(v);
    },
    [onSelect],
  );

  return (
    <UsersOptionRendererContainer>
      {width < 768 && renderSearch && renderSearch()}
      <UsersOptionsContainer vertical scrollbarWidth={5} overflow="auto">
        {!!favoriteMemberOptions.length && (
          <ItemGroupName
            font="footnote-bold"
            colorToken="--text-tablecell-body-neutral-default"
          >
            {t('noumena.event.modal.hosts.favorite_members')}
          </ItemGroupName>
        )}

        {favoriteMemberOptions.map((option) => (
          <UserOptionItem
            key={option.key}
            option={option}
            activeItem={activeItem}
            showCheck={Boolean(showCheck)}
            onSelect={onClickItem}
            members={members}
            cohosts={cohosts}
          />
        ))}
        {!!connectedMemberOptions.length && (
          <ItemGroupName
            font="footnote-bold"
            colorToken="--text-tablecell-body-neutral-default"
          >
            {t('noumena.event.modal.hosts.connected_members')}
          </ItemGroupName>
        )}

        {connectedMemberOptions.map((option) => (
          <UserOptionItem
            key={option.key}
            option={option}
            activeItem={activeItem}
            showCheck={Boolean(showCheck)}
            onSelect={onClickItem}
            members={members}
            cohosts={cohosts}
          />
        ))}
        {!!otherMemberOptions.length && (
          <ItemGroupName
            font="footnote-bold"
            colorToken="--text-tablecell-body-neutral-default"
          >
            {t('noumena.event.modal.hosts.other_members')}
          </ItemGroupName>
        )}
        {otherMemberOptions.map((option) => (
          <UserOptionItem
            key={option.key}
            option={option}
            activeItem={activeItem}
            showCheck={Boolean(showCheck)}
            onSelect={onClickItem}
            members={members}
            cohosts={cohosts}
          />
        ))}
        {fetchMoreStatus === 'hasNextPage' && (
          <SpinnerContainer ref={observerRef}>
            <Spinner />
          </SpinnerContainer>
        )}
      </UsersOptionsContainer>
    </UsersOptionRendererContainer>
  );
};
