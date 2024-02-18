import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { differenceInMinutes } from 'date-fns';
import { type TNetworkStatus } from '@/providers';
import { useToast } from './toast';

const MAX_BANDWIDTH_ALERT = 1; // MB/s

export default function useBandwidthDetection(netStatus: TNetworkStatus) {
  const { t } = useTranslation();
  const [lastAlertDate, setLastAlertDate] = useState<Date | null>(null);
  const { addToast, removeToast } = useToast();
  const lowBandwidthTooltipId = useRef<string | null>(null);

  const removeBandwidthAlert = useCallback(() => {
    if (!lowBandwidthTooltipId.current) {
      return;
    }
    removeToast(lowBandwidthTooltipId.current);
    lowBandwidthTooltipId.current = null;
  }, [removeToast]);

  const checkBandwidth = useCallback(() => {
    const downlink = navigator.connection?.downlink;
    if (!downlink && downlink !== 0) {
      return;
    }
    if (
      !lowBandwidthTooltipId.current &&
      downlink <= MAX_BANDWIDTH_ALERT &&
      netStatus !== 'offline' &&
      (lastAlertDate === null ||
        differenceInMinutes(lastAlertDate, new Date()) >= 60)
    ) {
      lowBandwidthTooltipId.current = addToast(
        'error',
        'icon',
        t('noumena.network.low_bandwidth'),
        false,
      );
      setLastAlertDate(new Date());
    } else if (
      lowBandwidthTooltipId.current &&
      (downlink > MAX_BANDWIDTH_ALERT || netStatus === 'offline')
    ) {
      removeBandwidthAlert();
    }
  }, [netStatus, lastAlertDate, addToast, t, removeBandwidthAlert]);

  useEffect(() => {
    checkBandwidth();
  }, [checkBandwidth, netStatus]);

  useEffect(() => {
    navigator.connection?.addEventListener('change', checkBandwidth);

    return () =>
      navigator.connection?.removeEventListener('change', checkBandwidth);
  }, [checkBandwidth]);
}
