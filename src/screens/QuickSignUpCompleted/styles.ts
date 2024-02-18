import styled from 'styled-components';

export const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  gap: 24px;
  margin: 0 auto;
  width: 450px;
  left: calc(50% - 450px / 2);
  top: calc(50% - 367px / 2 + 0.5px);
  background: #ffffff;
  border: 1px solid #f7f7f8;
  border-radius: 16px;
`;

export const WrapperChildren = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 16px;
  width: 100%;
  height: 239px;
`;

export const WrapperIcon = styled.div`
  border-radius: 200px;
  background-color: var(--bg-body-neutral-alt-default);
  border: 1px solid var(--bg-body-neutral-alt-default);
  align-self: center;
  width: 96px;
  height: 96px;
  flex-grow: 0;
  align-items: center;
`;
