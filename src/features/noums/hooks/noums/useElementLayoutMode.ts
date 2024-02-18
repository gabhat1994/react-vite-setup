import { breakpointsForNoumLayoutColumn } from '@/constants/devices';
import { NoumLayoutViewMode } from '@/features/conversation/types';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { useMemo } from 'react';
import { useNoumElement } from '../../contexts/NoumElementContext';

export function useElementLayoutMode() {
  const { columnWidth } = useNoumElement();

  const deviceType = useDeviceType();
  const layoutMode = useMemo(() => {
    if (!columnWidth) {
      return undefined;
    }

    if (deviceType === DeviceTypeEnum.MOBILE) {
      return NoumLayoutViewMode.NOUMLAYOUTSMALL;
    }

    if (columnWidth < breakpointsForNoumLayoutColumn.SMALL) {
      return NoumLayoutViewMode.NOUMLAYOUTSMALL;
    }
    if (columnWidth < breakpointsForNoumLayoutColumn.BIG) {
      return NoumLayoutViewMode.NOUMLAYOUTCOMPACT;
    }
    return NoumLayoutViewMode.NOUMLAYOUTBIG;
  }, [columnWidth, deviceType]);

  return layoutMode;
}
