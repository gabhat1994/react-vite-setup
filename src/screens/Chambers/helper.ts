import { t } from 'i18next';
import { NoumScopeEnum } from './types';

export const getEmptyHeading = (tab: string | undefined) => {
  switch (tab) {
    case NoumScopeEnum.Owned:
      return t(`noumena.no_result_owned.heading`);
    case NoumScopeEnum.Connected:
      return t(`noumena.no_result_connected.heading`);
    case NoumScopeEnum.Following:
      return t(`noumena.no_result_following.heading`);
    case NoumScopeEnum.Archived:
      return t(`noumena.no_result_archived.heading`);
    case NoumScopeEnum.Linked:
      return t(`noumena.no_result_linked_noum.heading`);
    default:
      return t(`noumena.no_result.text`);
  }
};

export const getEmptyDescription = (tab: string | undefined) => {
  switch (tab) {
    case NoumScopeEnum.Owned:
      return t(`noumena.chamber.empty_owned.description`);
    case NoumScopeEnum.Connected:
      return t(`noumena.chamber.empty_connected.description`);
    case NoumScopeEnum.Following:
      return t(`noumena.chamber.empty_following.description`);
    case NoumScopeEnum.Archived:
      return t(`noumena.chamber.empty_archived.description`);
    default:
      return t(`noumena.chamber.empty.description`);
  }
};
