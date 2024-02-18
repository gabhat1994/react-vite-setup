import { Button } from '@/components/Button';
import Typography, { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import styled from 'styled-components';

interface TagLabelProps {
  bgColor: string;
  color: string;
}

export const Container = styled(Stack)`
  flex-direction: column;
  width: 100%;

  button {
    padding: 8px;
  }

  label {
    width: 100%;
    input {
      display: none;
    }
    div {
      margin: 0px -8px;
    }
  }
`;

export const LinkUnderline = styled.div`
  min-width: 100%;
  height: 1px;
  background-color: var(--bg-separator-neutral-default);
`;

export const ContentContainer = styled.div<{ unregistered: boolean }>`
  padding: 12px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const LinkedTagLabel = styled.div<TagLabelProps>`
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 0 6px;
  height: 22px;
  ${Typography.footnoteTypography.footnoteBold}
`;

export const TabSectionHead = styled(Stack)<{ autoWidth?: boolean }>`
  ${Typography.bodyTypography.bodyMedium};
  width: 100%;
  form {
    overflow-x: auto;
    display: flex;
    flex-direction: row;
    padding-bottom: 16px;
  }
  form div {
    ${({ autoWidth }) => (autoWidth ? `width: auto;` : `flex: 1;`)};
  }
  label div {
    text-align: center;
    ${({ autoWidth }) => autoWidth && `padding: 9px 12px;`};
  }
`;

export const UserDetailStack = styled(Stack)`
  flex: 1;
`;

export const TextOnlySpan = styled(TSpan)`
  padding: 12px;
`;

export const TimeStampSpan = styled(TSpan)``;

export const NoResultsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const InviteButton = styled(Button)`
  height: 40px;
  max-height: 40px;
  min-height: 40px;
`;
