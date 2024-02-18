import { t } from 'i18next';
import { NoumLayoutSectionType } from '@/apollo/generated/types';
import { type InputListTypes } from '@/components/Tabs/types';

export const columnsLayout = [
  { layoutSectionType: NoumLayoutSectionType.SingleColumn, column: [1] },
  {
    layoutSectionType: NoumLayoutSectionType.SingleColumn_700Px,
    column: [-1, 3, -1],
  },
  {
    layoutSectionType: NoumLayoutSectionType.ThreeEqualColumns,
    column: [1, 1, 1],
  },
  { layoutSectionType: NoumLayoutSectionType.TwoEqualColumns, column: [2, 2] },
  {
    layoutSectionType: NoumLayoutSectionType.TwoColumnsRightWider,
    column: [2, 1],
  },
  {
    layoutSectionType: NoumLayoutSectionType.TwoColumnsLeftWider,
    column: [1, 2],
  },
];

export const listOfTabs: InputListTypes[] = [
  {
    name: 'empty_sections',
    text: t('noumena.noum_editor.popup.pick_section_layout.tab.empty_sections'),
    labelSize: 'auto',
  },
  {
    name: 'section_templates',
    text: t(
      'noumena.noum_editor.popup.pick_section_layout.tab.section_templates',
    ),
    labelSize: 'auto',
  },
];
