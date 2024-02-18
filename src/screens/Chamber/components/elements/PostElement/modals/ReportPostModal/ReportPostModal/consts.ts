import { t } from 'i18next';
import { type ReportReasonItemProps } from '@/screens/Chamber/components/elements/PostElement/modals/ReportPostModal/ReportReasonItem/types';
import { ReportType } from '@/apollo/generated/types';

export const ReportReasonOptions: Array<Partial<ReportReasonItemProps>> = [
  {
    value: ReportType.Offensive,
    label: t('noumena.chambers.element.posts.report.reason.offensive.label'),
    description: t(
      'noumena.chambers.element.posts.report.reason.offensive.description',
    ),
    borderBottom: true,
  },
  {
    value: ReportType.Safety,
    label: t(
      'noumena.chambers.element.posts.report.reason.privacy_safety.label',
    ),
    description: t(
      'noumena.chambers.element.posts.report.reason.privacy_safety.description',
    ),
    borderBottom: true,
  },
  {
    value: ReportType.Jerk,
    label: t('noumena.chambers.element.posts.report.reason.jerk_rule.label'),
    description: t(
      'noumena.chambers.element.posts.report.reason.jerk_rule.description',
    ),
    borderBottom: true,
  },
  {
    value: ReportType.Other,
    label: t('noumena.chambers.element.posts.report.reason.other.label'),
    description: t(
      'noumena.chambers.element.posts.report.reason.other.description',
    ),
    borderBottom: false,
  },
];
