import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { TSpan } from '@/components/Typography';
import { singleLineEllipisText } from '@/common/globalStyles';

export const StyledSideBar = styled.div`
  display: none;

  @media (min-width: ${sizes.LAPTOP}) {
    display: grid;
    gap: 16px;
    width: 288px;
  }
`;

export const StyledUserInfoCard = styled.div.attrs(
  (props: { profileImageUrl: string }) => props,
)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  .image {
    width: 56px;
    height: 56px;
    background: url('${(props) => props.profileImageUrl}') center center;
    background-size: cover;
    border-radius: 12px;
  }
`;

export const UserName = styled(TSpan)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`;

export const Designation = styled(TSpan)`
  ${singleLineEllipisText}
  word-break: break-word;
  span {
    background: none;
    padding: unset;
    cursor: default;
    height: unset;
    min-height: unset;
    max-height: unset;
    width: 100%;
    max-width: 100%;
    ${singleLineEllipisText}
    word-break: break-word;
    white-space: break-spaces;
  }
`;

export const StyledCompleteInfoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  background: linear-gradient(
    135.79deg,
    var(--bg-blur-brand-primary-dark) 0%,
    var(--bg-card-brand-primary-highlighted) 48.49%,
    var(--bg-blur-brand-primary-default) 100%
  );
  border-radius: 16px;
  .disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  @media (max-width: ${sizes.TABLET}) {
    border-radius: unset;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;
    padding: 32px;
    align-items: center;
  }
`;
