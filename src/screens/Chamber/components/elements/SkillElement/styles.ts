import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { noScrollBar } from '@/common/globalStyles';

export const SkillListContainer = styled.div`
  flex-direction: row;
  width: 100%;
  overflow-x: auto;
  flex-wrap: nowrap;
  gap: 12px;
  > span {
    display: inline-flex;
  }
`;

export const SkillItem = styled.div`
  display: inline-flex;
  margin: 6px;
  span {
    cursor: default;
  }
`;

export const Wrapper = styled.div`
  height: 100%;
  position: relative;
  @media (max-width: ${sizes.TABLET}) {
    width: 736px;
    margin-left: 16px;
    margin-right: 16px;
  }
  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 343px;
    margin-left: 16px;
    margin-right: 16px;
  }
`;

export const ChipWrapper = styled.div`
  padding-right: 8px;
  padding-bottom: 8px;
  display: inline-flex;
`;
export const ChipsSection = styled.div`
  flex-direction: row;
  width: 100%;
  overflow-x: auto;
  flex-wrap: nowrap;
  ${noScrollBar}
`;

export const ModalFooter = styled.div`
  margin-top: 24px;
  height: 56px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  display: flex;
`;

export const CollapseWrap = styled.div`
  cursor: pointer;
`;

export const MySkillsWrap = styled.div``;
