import styled from 'styled-components';

import { sizes } from '@/constants/devices';
import { TSpan } from '@/components';
import { Container } from '@/components/TextField/styles';
import { EventFieldRow } from '@/features/events/styles';

export const PrivacySettingsFieldWrapper = styled(EventFieldRow)`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Flex = styled.div`
  display: flex;
`;

export const Heading = styled(Flex)`
  height: 40px;
  align-items: center;
  justify-content: space-between;
  ${Container} {
    width: auto;
    input {
      height: 40px;
      padding-right: 0;
      max-width: 150px;
    }
  }
`;

export const OptionLabelContainer = styled.div`
  display: flex;
  flex: 0 0 90%;
  flex-direction: column;
  flex: 1;
`;

export const OptionLabel = styled(TSpan)`
  display: flex;
  min-width: 40px;
  align-items: center;
`;

export const EventFieldDescription = styled(TSpan)`
  width: 65%;
  margin-left: 30px;
  @media (max-width: ${sizes.TABLET}) {
    margin-top: 8px;
    width: calc(100% - 30px);
  }
`;

export const EventFieldLabel = styled(TSpan)`
  min-width: 100%;
`;
