import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

const Link = styled(RouterLink)<{ underline: boolean }>`
  text-decoration: ${(props) => (props.underline ? 'underline' : 'none')};
`;

export default {
  Link,
};
