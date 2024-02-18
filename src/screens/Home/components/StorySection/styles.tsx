import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { TSpan } from '@/components/Typography';

export const StyledHomeStorySection = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 16px;
  width: 100%;
  min-width: 322px;
  min-height: 182px;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  flex: none;
  flex-grow: 0;

  @media (max-width: ${sizes.TABLET_L}) {
    margin: 0 16px;
    width: calc(100% - 32px);
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100%;
    margin: 0 0;
    border-radius: unset;
    min-width: 704px;
    min-height: 160px;
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px 19.5px;
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100vw;
    min-width: unset;
    margin: unset;
    min-height: 182px;
  }
`;

export const StyledVideoSection = styled.div.attrs(
  (props: { thumbnailUrl: string }) => props,
)`
  min-height: 240px;
  box-sizing: border-box;
  cursor: pointer;
  background: linear-gradient(
      180deg,
      rgba(93, 58, 169, 0) 0%,
      rgba(93, 58, 169, 0.66) 100%
    ),
    url(${(props) => props.thumbnailUrl});
  background-size: cover;
  border-radius: 8px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const StyledContentSection = styled.div`
  /* padding: 10px 0px; */
`;

export const StyledTime = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 160%;
  color: var(--text-card-brand-secondary-disabled);
  opacity: 0.8;
`;

export const StyledDescription = styled(TSpan)`
  display: inline-block;
  padding: 4px 0 16px 0;
  @media (max-width: ${sizes.TABLET_L}) {
    /* padding: 8px 0px; */
  }
`;
