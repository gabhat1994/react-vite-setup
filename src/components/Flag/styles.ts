import styled from 'styled-components';

const Container = styled.div`
  ${(props) => (props.onClick ? `cursor: pointer;` : '')};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 24px;
  height: 24px;
`;
export default Container;
