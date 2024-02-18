import styled from 'styled-components';
import { Stack } from '@/layout/Stack';
import { mediaSizes } from '@/constants/devices';
import { Button } from '@/components/Button/Button';

const MessageContainer = styled(Stack).attrs({
  fullWidth: true,
  align: 'center',
  justify: 'center',
})`
  padding: 24px;
  background-color: var(--bg-body-neutral-alt-highlighted);
  border-radius: 8px;
  @media (max-width: ${mediaSizes.MOBILE_S_MAX}) {
    padding: 0px;
  }
`;

const NOUMCard = styled(Stack).attrs({
  gap: '8px',
  align: 'center',
})`
  height: 41px;
  box-sizing: border-box;
  padding: 0;
  margin-top: 8px;
`;

const Img = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 12px;
`;

const CustomGoal = styled.div`
  width: 100%;
  padding: 16px;
  border: 1px solid var(--border-card-neutral-default);
  border-radius: 8px;
`;

const Filter = styled(Button)`
  width: 128px;
  height: 40px;
  min-height: 40px;
`;

export default { MessageContainer, NOUMCard, Img, CustomGoal, Filter };
