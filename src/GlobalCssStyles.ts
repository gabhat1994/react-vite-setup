import { createGlobalStyle } from 'styled-components';
import { defaultScrollBar } from './common/globalStyles';
import { sizes } from './constants/devices';

const GlobalCssStyles = createGlobalStyle`
  @media (min-width: ${sizes.LAPTOP}) {
    ${defaultScrollBar};
  }
`;

export default GlobalCssStyles;
