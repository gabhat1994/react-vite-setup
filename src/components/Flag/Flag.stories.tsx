import { type Meta } from '@storybook/react';
import styled from 'styled-components';

import Flag from './Flag';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 12px;
`;

const IconText = styled.h5`
  padding: 4px;
  text-align: center;
  width: 100%;
`;

export default {
  title: 'Atoms/Flag',
  component: Flag,
} as Meta<typeof Flag>;

export const Primary = () => (
  <>
    <Wrapper>
      <IconWrapper>
        <Flag flag="flag_gb" size={24} />
        <IconText>flag-gb</IconText>
      </IconWrapper>
      <IconWrapper>
        <Flag flag="flag_us" size={24} />
        <IconText>flag-us</IconText>
      </IconWrapper>
      <IconWrapper>
        <Flag flag="flag_au" size={24} />
        <IconText>flag-au</IconText>
      </IconWrapper>
      <IconWrapper>
        <Flag flag="flag_pl" size={24} />
        <IconText>flag-pl</IconText>
      </IconWrapper>
      <IconWrapper>
        <Flag flag="flag_de" size={24} />
        <IconText>flag-de</IconText>
      </IconWrapper>
    </Wrapper>
  </>
);
