import styled from 'styled-components';
import { type Property } from 'csstype';
import { defaultScrollBar } from '@/common/globalStyles';
import { sizes } from '@/constants/devices';
import { zIndex } from '@/constants/zIndex';

const PortalContainer = styled.div<{
  fullHeight?: boolean;
  position: Property.Position;
}>`
  position: ${(props) => props.position};
  top: 0;
  right: 0;
  left: 0;
  z-index: ${zIndex.modalOverOverlay};
  @media (max-width: ${sizes.TABLET}) {
    z-index: 2000000;
  }
  ${defaultScrollBar}
  ${({ fullHeight }) => fullHeight && 'height: 100%; position: fixed;'};
`;

export default PortalContainer;
