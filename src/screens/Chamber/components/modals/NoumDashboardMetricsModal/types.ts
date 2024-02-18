export enum NoumDashboradTypeEnum {
  connections = 'connections',
}

export enum NoumDashboardMetricsModalTabEnum {
  Statistics = 'Statistics',
  Connected = 'Connected',
  Disconnected = 'Disconnected',
}

export interface NoumDashboardMetricsModalProps {
  isOpen: boolean;
  dashboardType?: NoumDashboradTypeEnum;
  defaultTab?: NoumDashboardMetricsModalTabEnum;
  handleClose: () => void;
}
