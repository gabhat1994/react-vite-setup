import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import { footnoteBold } from '@/components/Typography/Typography';

export const Screen = styled.div`
  font-family: var(--font-family);
  max-width: 343px;
  @media screen and (orientation: landscape) and (max-width: ${sizes.TABLET_L}) {
    margin-top: 150px;
  }
`;

export const LinkContainer = styled(Stack)`
  width: 100%;
  margin-top: 15px;

  div span {
    cursor: pointer;
    color: var(--text-button-brand-secondary-default);
  }
`;

export const RecaptchaNote = styled.div`
  /* position: absolute; */
  max-width: 20rem;
  margin-top: 10px;
  margin-bottom: 10px;
  bottom: 0%;
  width: 100%;
  text-align: center;
  color: var(--text-body-neutral-disabled);
  ${footnoteBold}

  @media screen and (orientation: landscape) and (max-width: ${sizes.TABLET_L}) {
    position: relative;
    margin-top: 20px;
  }
  @media (max-height: 600px) {
    position: relative;
    margin-top: 150px;
  }
`;

export const StyledTabPanel = styled.div`
  width: 100%;
  height: 100%;
  font-family: var(--font-family);
`;
