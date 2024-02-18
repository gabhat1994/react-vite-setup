import { groupBy } from 'lodash';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  type DropdownHeaderType,
  type DropdownItemType,
  type DropdownValueType,
} from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { type SearchableNoumContact } from '@/features/noumContacts/types';
import { useAuth } from '@/features/auth/contexts';
import { cleanList } from '@/utils/list';
import { ADD_OPTION_VALUE } from '../constants';
import { mapToDropdownValue } from '../mapper';

interface UseContactSelectorOptionsProps {
  data: SearchableNoumContact[] | undefined;
  excludedIds: string[] | undefined;
  excludeCurrentUser?: boolean;
  addContactDisabled?: boolean;
}

export function useContactSelectorOptions({
  data,
  excludedIds,
  excludeCurrentUser,
  addContactDisabled,
}: UseContactSelectorOptionsProps) {
  const { t } = useTranslation();
  const { user: currentUser } = useAuth();
  const contacts = useMemo(() => {
    const cleanContacts = cleanList(data).map((c) => ({
      ...c,
      // TODO: Remove when backend adds this flag.
      isRecent: false,
    }));

    const cleanExcludedIds = cleanList(excludedIds);

    return cleanContacts.filter((c) => !cleanExcludedIds.includes(c._id));
  }, [data, excludedIds]);

  const headerOptions = useMemo<
    DropdownValueType<SearchableNoumContact | string, string>[]
  >(
    () =>
      cleanList([
        !addContactDisabled
          ? {
              type: 'value',
              value: ADD_OPTION_VALUE,
              key: ADD_OPTION_VALUE,
              label: t('noumena.noum_contacts.contact_selector.add_new'),
              icon: <Icon name="add_m" size={24} />,
            }
          : undefined,
      ]),
    [addContactDisabled, t],
  );

  const options = useMemo<
    DropdownItemType<SearchableNoumContact, string>[]
  >(() => {
    if (contacts.length === 0) {
      return [];
    }

    // TODO: Remove once BE sends isCurrentUser in the response.
    const contactsWithIsCurrentUser: SearchableNoumContact[] = contacts
      .map((contact) => ({
        ...contact,
        isCurrentUser: contact.user._id === currentUser?._id,
      }))
      .filter((contact) => !excludeCurrentUser || !contact.isCurrentUser);

    // TODO: Update logic here when we add Co-Manager role.
    const noumOwner = contactsWithIsCurrentUser.find(
      (contact) => contact.isCurrentUser,
    );

    const contactsWithoutCurrentUser = contactsWithIsCurrentUser.filter(
      (contact) => contact._id !== noumOwner?._id,
    );
    const contactsByRecent = groupBy(contactsWithoutCurrentUser, 'isRecent');
    const recentContacts = contactsByRecent.true;
    const otherContacts = contactsByRecent.false;

    const results: DropdownItemType<SearchableNoumContact, string>[] = [];

    if (noumOwner) {
      results.push({
        key: 'noum_owner',
        type: 'header',
        label: t('noumena.noum_contacts.contact_selector.noum_owner'),
      } as DropdownHeaderType);

      results.push(mapToDropdownValue(noumOwner));
    }

    if (recentContacts && recentContacts.length > 0) {
      results.push({
        key: 'recent',
        type: 'header',
        label: t('noumena.noum_contacts.contact_selector.recent_contacts'),
      } as DropdownHeaderType);

      results.push(...recentContacts.map(mapToDropdownValue));
    }

    if (otherContacts && otherContacts.length > 0) {
      results.push({
        key: 'saved',
        type: 'header',
        label: t('noumena.noum_contacts.contact_selector.saved_contacts'),
      } as DropdownHeaderType);

      results.push(...otherContacts.map(mapToDropdownValue));
    }

    return results;
  }, [contacts, currentUser?._id, excludeCurrentUser, t]);

  return {
    contacts,
    options,
    headerOptions,
  };
}
