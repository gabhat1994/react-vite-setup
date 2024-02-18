import { sizes } from '@/constants/devices';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
  width: 100%;
  background-color: white;
  position: relative;
`;

export const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
`;

export const ContinueButton = styled.div`
  width: 100%;
  margin-top: 32px;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    position: absolute;
    margin-top: 0;
    top: calc(100% - 65px);
  }
`;
export const ReturnToNoumenaWrapper = styled.div`
  width: 100%;
  margin-top: 32px;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    position: absolute;
    margin-top: 0;
    top: calc(100% - 65px);
  }
`;

export const WrapperIcon = styled.div`
  border-radius: 200px;
  background-color: var(--bg-body-neutral-alt-default);
  border: 1px solid var(--bg-body-neutral-alt-default);
  align-self: center;
  width: 96px;
  height: 96px;
  flex-grow: 0;
  align-items: center;
`;
