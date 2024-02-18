import { Card } from '@/components/Card';
import { mediaSizes, sizes } from '@/constants/devices';
import styled from 'styled-components';
import { cssVar, rgba } from 'polished';
import { Stack } from '@/layout';

export const AllNoumPostsContainer = styled(Stack)`
  max-width: 660px;
  min-width: 660px;
  gap: 16px;
  justify-content: center;
  align-items: center;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    min-width: unset;
  }
`;

export const PostCardWrapper = styled(Card)`
  width: 100%;
  padding: 16px;
`;

export const MobileBottomActionsContainer = styled.div`
  box-sizing: border-box;
  display: none;
  button {
    border-radius: 16px;
    box-shadow: 0 2px 16px ${rgba(cssVar('--shadow-neutral-default'), 0.08)};
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    padding: 0 16px;
  }

  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    position: absolute;
    width: 100%;
    bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    position: fixed;
    padding: 0 4%;
    right: 0;
  }
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    bottom: '24px';
  }
  z-index: 2;
`;

export const AllNoumsPostsContainer = styled(Stack)<{ loading?: boolean }>`
  width: 100%;
  flex-direction: column;
  gap: 16px;
  opacity: ${({ loading }) => (loading ? 0.5 : 1)};
`;
