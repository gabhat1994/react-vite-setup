import { t } from 'i18next';
import { type InputListTypes } from '@/components/Tabs/types';

export const sideBarTabs: InputListTypes[] = [
  {
    name: 'all',
    text: t('noumena.chambers.toolbox.element.all'),
    labelSize: 'auto',
  },
  {
    name: 'direct_conversation',
    text: t('noumena.chambers.toolbox.element.message.direct_conversation'),
    labelSize: 'auto',
  },
  {
    name: 'noums',
    text: t('noumena.search.filter_noums'),
    labelSize: 'auto',
  },
];
