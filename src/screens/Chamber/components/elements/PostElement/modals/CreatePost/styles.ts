import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import { Button } from '@/components/Button';
import { defaultScrollBar, ellipsisText } from '@/common/globalStyles';

export const PostButton = styled(Button)`
  width: 146px;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    min-height: 40px;
    width: 90px;
  }
`;

export const EditorContainer = styled(Stack)<{ isRTE?: boolean }>`
  min-height: 168px;
  max-height: ${({ isRTE }) => (isRTE ? `100vh` : `500px`)};
  ${defaultScrollBar};
  @media (max-width: ${sizes.MOBILE_MAX}) {
    height: 100%;
    max-height: unset;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  gap: 16px;
`;

export const VisibilitySelect = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  & > div {
    width: 211px !important;
    min-height: unset;
    input {
      height: 40px;
      @media (max-width: ${sizes.MOBILE_MAX}) {
        height: 56px;
      }
      ${ellipsisText}
    }
  }
`;

export const ImageContainers = styled(Stack)`
  gap: 12px;
  width: 100%;
  min-height: 130px;
  overflow-x: auto;
  ${defaultScrollBar};

  @media (max-width: ${sizes.MOBILE_MAX}) {
    &::-webkit-scrollbar {
      height: 0;
    }
  }
`;

export const StyledTextAreaContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 2px;
`;
