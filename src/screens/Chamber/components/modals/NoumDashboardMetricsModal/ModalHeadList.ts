import { t } from 'i18next';
import { type InputListTypes } from '@/components/Tabs/types';
import {
  NoumDashboardMetricsModalTabEnum,
  NoumDashboradTypeEnum,
} from './types';

interface ModalHeadListProps {
  dashboardType?: NoumDashboradTypeEnum;
}

export const getModalHeadList = ({ dashboardType }: ModalHeadListProps) => {
  const lists = [
    {
      name: NoumDashboardMetricsModalTabEnum.Statistics,
      text: t('noumena.noum.dashboard.tab.statistics'),
      labelSize: 'small',
    },
  ];
  switch (dashboardType) {
    case NoumDashboradTypeEnum.connections:
      lists.push(
        {
          name: NoumDashboardMetricsModalTabEnum.Connected,
          text: t('noumena.noum.dashboard.tab.connected'),
          labelSize: 'small',
        },
        {
          name: NoumDashboardMetricsModalTabEnum.Disconnected,
          text: t('noumena.noum.dashboard.tab.disconnected'),
          labelSize: 'small',
        },
      );
      break;
    default:
      break;
  }
  return lists as InputListTypes[];
};
